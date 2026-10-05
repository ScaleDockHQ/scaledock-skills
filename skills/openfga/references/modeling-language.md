# Modeling language

The OpenFGA Configuration Language in its DSL and JSON forms. Sources: the Configuration Language, Concepts and Get Started with Modeling pages, the `openfga/language` grammar (`OpenFGAParser.g4`, `OpenFGALexer.g4`) and validator (`validate-dsl.ts`), and `openfga/api` `authzmodel.proto`, listed in [Sources](../SKILL.md#sources).

## DSL and JSON

The model can be written in DSL or JSON. The API accepts JSON, which closely tracks the Zanzibar paper; the DSL is syntactic sugar that compiles to JSON before it reaches the API. The DSL is used in the Playground, the CLI and the IDE extensions (Configuration Language, introduction). Keep the DSL in source control and let tooling produce JSON.

## Concepts

| Term                 | Meaning                                                                                               | Source                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Type                 | A string naming a class of objects, such as `document`.                                               | Concepts, What Is A Type?                            |
| Type definition      | All the relations a user or object can have with objects of that type.                                | Concepts, What Is A Type Definition?                 |
| Authorization model  | One or more type definitions (and conditions). Immutable; each write gets a new id.                   | Concepts; Immutable Authorization Models             |
| Store                | Holds model versions and tuples. Data cannot be shared across stores; keep related data in one store. | Concepts, What Is A Store?                           |
| Object               | `type:id`, such as `document:new-roadmap`.                                                            | Concepts, What Is An Object?                         |
| User                 | `type:id`, a userset `type:id#relation`, or type-bound public access `type:*`.                        | Concepts, What Is A User?                            |
| Relation             | A name defined on a type, such as `editor`.                                                           | Concepts, What Is A Relation?                        |
| Relationship tuple   | `user`, `relation`, `object`, and an optional `condition`.                                            | Concepts, What Is A Relationship Tuple?              |
| Direct relationship  | The tuple (X, R, Y) exists and R's type restrictions allow it.                                        | Concepts, What Are Direct And Implied Relationships? |
| Implied relationship | X is related to Y through another relation or object, as the model allows.                            | same                                                 |

## Grammar

From `OpenFGAParser.g4`:

```text
main         := (modelHeader | moduleHeader) typeDefs conditions
modelHeader  := "model" NEWLINE "schema" SCHEMA_VERSION
moduleHeader := "module" identifier
typeDef      := ["extend"] "type" name [NEWLINE "relations" relationDeclaration+]
relationDeclaration := "define" relationName ":" relationDef
relationDef  := (directAssignment | rewrite | "(" ... ")") [partials]
partials     := ("or" x)+ | ("and" x)+ | "but not" x
directAssignment := "[" typeRestriction ("," typeRestriction)* "]"
typeRestriction  := type [":*" | "#" relation] ["with" (conditionName | "$expression")]
rewrite      := relation ["from" tuplesetRelation]
condition    := "condition" name "(" param ":" type ("," ...)* ")" "{" celExpression "}"
```

Consequences of the grammar:

- One operator kind per level. `a or b and c` does not parse; group with parentheses: `(a or b) and c`. `but not` takes exactly one subtrahend (`relationDefPartials`).
- Direct assignment `[...]` can appear only at the start of a definition or inside parentheses, not after an operator (`relationDefPartials` accepts `relationDefGrouping | relationRecurseNoDirect`).
- `#` starts a comment line; comments are allowed above types, relations and conditions (`multiLineComment`).
- Conditions follow all type definitions in the file.
- `model`, `schema`, `type`, `relation`, `module` and `extend` are keywords but are accepted as identifiers (`identifier`). Type and relation names may also contain `/`, `.` and `-` between word characters (`EXTENDED_IDENTIFIER`).

## Type restrictions

`define viewer: [user, user:*, team#member, user with non_expired_grant]` (Configuration Language, Direct Relationship Type Restrictions; Conditions):

| Entry            | Tuples it allows                                                       |
| ---------------- | ---------------------------------------------------------------------- |
| `user`           | `user:anne` as user                                                    |
| `user:*`         | `user:*` as user: every object of type `user`, including future ones   |
| `team#member`    | `team:product#member` as user: everyone who is a `member` of that team |
| `user with cond` | `user:anne` with `condition: {name: "cond", context: {...}}`           |

- No restrictions means no direct relationships: tuples for that relation cannot be written (Configuration Language).
- `[...]` in the DSL is `this` in JSON, and the entries go in `metadata.relations.<relation>.directly_related_user_types` as `{type}`, `{type, wildcard: {}}`, `{type, relation}` or `{type, condition}`; `relation` and `wildcard` are mutually exclusive (Configuration Language; Conditions; authzmodel.proto, `RelationReference`).
- A restriction cannot combine `:*` and `#relation` (validate-dsl.ts, `raiseAssignableTypeWildcardRelation`), and a type cannot be listed twice in the same restriction (`raiseDuplicateTypeRestriction`).
- Every type and `type#relation` named must exist in the model (`raiseInvalidType`, `raiseInvalidTypeRelation`).
- An assignable relation must list at least one type (`raiseAssignableRelationMustHaveTypes`).

## Rewrites and operators

| DSL                  | JSON              | Zanzibar           | Meaning                                                              |
| -------------------- | ----------------- | ------------------ | -------------------------------------------------------------------- |
| `[user, ...]`        | `this`            | `this`             | Directly assigned users.                                             |
| `editor`             | `computedUserset` | `computed_userset` | Users with `editor` on the same object.                              |
| `viewer from parent` | `tupleToUserset`  | `tuple_to_userset` | Users with `viewer` on every object related to this one as `parent`. |
| `a or b`             | `union`           | `union`            | In any of the sets.                                                  |
| `a and b`            | `intersection`    | `intersection`     | In all of the sets.                                                  |
| `a but not b`        | `difference`      | `exclusion`        | In the base set and not in the subtracted set.                       |

Source: Configuration Language, Equivalent Zanzibar Concepts and the operator sections.

### Same-object references

`define viewer: [user] or editor` makes every editor a viewer; `define can_rename: editor` cannot be assigned directly and is only inherited (Configuration Language, Referencing Other Relations On The Same Object). This is the shape for permissions: roles are assignable, `can_*` relations are computed.

### Related-object references (`from`)

`define viewer: [user] or viewer from parent_folder` with `define parent_folder: [folder]` gives viewers of a folder view of its documents (Configuration Language, Referencing Relations On Related Objects). Rules:

- The tupleset (`parent_folder`) must be a relation on the same type (`raiseInvalidTypeRelation`).
- It must be directly assignable, not a union, intersection or exclusion, and its restrictions must not include `type:*` or `type#relation` (Configuration Language, caution; validate-dsl.ts, `raiseTupleUsersetRequiresDirect`). At evaluation OpenFGA only follows concrete objects `type:id` written to the tupleset (Parent-Child Objects, caution).
- The computed relation (`viewer`) must exist on at least one of the tupleset's types (`raiseInvalidRelationOnTupleset`).

### Nesting

Parentheses group operators, and direct relationships can sit inside them (Configuration Language, Grouping and nesting operators). The page's JSON example is, in DSL:

```dsl.openfga
type folder
  relations
    define organization: [organization]
    define parent: [folder]
    define viewer: ([user] or viewer from parent) and member from organization
```

## Validation rules

From `validate-dsl.ts` and the API protos:

- `schema_version` is required; accepted values are `1.1` and `1.2` by the language validator, and `1.0`, `1.1`, `1.2` by the API (`raiseSchemaVersionRequired`, `raiseInvalidSchemaVersion`; openfga_service.proto).
- `self` and `this` are reserved type and relation names (`raiseReservedTypeName`, `raiseReservedRelationName`).
- Type names and relation names must be unique (`raiseDuplicateTypeName`, `raiseDuplicateType`).
- Every relation needs an entry point: some path that ends in a directly assignable type. A cycle with no assignable step is an error (`raiseNoEntryPoint`, `raiseNoEntryPointLoop`).
- Each condition must be used by a type restriction, and its map key must equal its `name` (`raiseUnusedCondition`, `raiseDifferentNestedConditionName`).
- Limits from `openfga.proto` and `authzmodel.proto`: type up to 254 characters with no `:`, `#`, `@` or whitespace; relation up to 50 characters with the same exclusions; object up to 256 characters; user up to 512 bytes; condition and parameter names up to 50 characters; at most 25 conditions per model and 25 parameters per condition; expression up to 512 bytes.
- Relations use alphanumerics, `_` and `-`; separate words with `_` and drop prepositions ("can create a document" becomes `can_create_document`) (Get Started with Modeling, 03, info).

## Modeling process

From Get Started with Modeling:

1. Pick the most important feature and write its rules in plain language: "a user can {action} a {type} if …". Think from the objects, and forget how the current system works.
2. List the object types. The nouns become types; start with groups and containers (`team`, `group`, `organization`). A user that is itself the object of a relation is also a type.
3. List the relations: roles and relationships between objects, and the permissions (`can_{action}`).
4. Define the relations. Permissions such as `can_share` have no type restrictions and are built from other relations with `or`, `and`, `but not` and `from`.
5. Test with tuples that represent real cases with fake data, and assertions of both "has" and "does not have".
6. Iterate with the next feature.

## Common mistakes

- Treating `type:*` as a pattern: `document:*` as an object, or `org:*#member` as a user, is invalid (Public Access, Wildcard syntax usage).
- Giving `can_*` permissions type restrictions, which lets tuples grant the permission without the role (Get Started with Modeling, 04).
- Using a computed relation, or one that allows usersets or `type:*`, as a tupleset.
- Mixing `or` and `and` without parentheses.
- Expecting Read to return implied relationships: it only returns stored tuples (Relationship Queries, Read).
