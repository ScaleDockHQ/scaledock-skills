# Introspection, response format and errors

Read this when implementing introspection, writing a client that reads a schema, or building or parsing responses. Section numbers are from the September 2025 edition.

## Meta-fields

- `__typename: String!` is available on any object, interface or union selection, except at the root of a subscription. It returns the concrete Object type name (§ 4.1).
- `__schema: __Schema!` and `__type(name: String!): __Type` are available on the query root type only (§ 4.2).
- Meta-fields are implicit and do not appear in any type's field list (§ 4.1, § 4.2).

## The introspection schema

From § 4.2 (Appendix D repeats it; use the § 4.2 form, which has `Boolean!` for `includeDeprecated`):

```graphql
type __Schema {
  description: String
  types: [__Type!]!
  queryType: __Type!
  mutationType: __Type
  subscriptionType: __Type
  directives: [__Directive!]!
}

type __Type {
  kind: __TypeKind!
  name: String
  description: String
  specifiedByURL: String
  fields(includeDeprecated: Boolean! = false): [__Field!]
  interfaces: [__Type!]
  possibleTypes: [__Type!]
  enumValues(includeDeprecated: Boolean! = false): [__EnumValue!]
  inputFields(includeDeprecated: Boolean! = false): [__InputValue!]
  ofType: __Type
  isOneOf: Boolean
}

type __Field {
  name: String!
  description: String
  args(includeDeprecated: Boolean! = false): [__InputValue!]!
  type: __Type!
  isDeprecated: Boolean!
  deprecationReason: String
}

type __InputValue {
  name: String!
  description: String
  type: __Type!
  defaultValue: String
  isDeprecated: Boolean!
  deprecationReason: String
}

type __EnumValue {
  name: String!
  description: String
  isDeprecated: Boolean!
  deprecationReason: String
}

type __Directive {
  name: String!
  description: String
  isRepeatable: Boolean!
  locations: [__DirectiveLocation!]!
  args(includeDeprecated: Boolean! = false): [__InputValue!]!
}
```

`__TypeKind` is `SCALAR`, `OBJECT`, `INTERFACE`, `UNION`, `ENUM`, `INPUT_OBJECT`, `LIST`, `NON_NULL`. `__DirectiveLocation` has the executable locations `QUERY`, `MUTATION`, `SUBSCRIPTION`, `FIELD`, `FRAGMENT_DEFINITION`, `FRAGMENT_SPREAD`, `INLINE_FRAGMENT`, `VARIABLE_DEFINITION` and the type system locations `SCHEMA`, `SCALAR`, `OBJECT`, `FIELD_DEFINITION`, `ARGUMENT_DEFINITION`, `INTERFACE`, `UNION`, `ENUM`, `ENUM_VALUE`, `INPUT_OBJECT`, `INPUT_FIELD_DEFINITION` (§ 4.2.6).

## What each field returns

- `__Schema.types` returns every named type in the schema, including any type reachable from an introspection field; `directives` returns every directive, built-ins included (§ 4.2.1).
- `__Type` returns only the fields valid for its kind; all others must be null (§ 4.2.2):
  - SCALAR: `name`, `description`, `specifiedByURL` (custom scalars only, otherwise null).
  - OBJECT: `fields`, `interfaces` (empty list if none).
  - INTERFACE: `fields`, `interfaces`, `possibleTypes` (Object types only).
  - UNION: `possibleTypes` (Object types only).
  - ENUM: `enumValues`, at least one, unique names.
  - INPUT_OBJECT: `inputFields`, and `isOneOf` true for OneOf input objects, false otherwise.
  - LIST: `ofType` of any kind. NON_NULL: `ofType` of any kind except NON_NULL.
- `includeDeprecated` defaults to false; true also returns deprecated items (§ 4.2.2 to § 4.2.6).
- `__InputValue.defaultValue` is the default encoded in GraphQL syntax, or null (§ 4.2.4).
- Descriptions may be CommonMark; tools that display them should use a CommonMark renderer (§ 4.2).
- Introspection should keep source order for fields, input fields, arguments, enum values, directives, union members and interfaces (§ 4.2, Stable Ordering).

## Response format

A response is one of (§ 7.1):

| Kind                 | When                                      | Entries                                                                                                      |
| -------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Execution result     | A query or mutation was executed          | `data` (required); `errors` only if errors were raised, as a non-empty list; optional `extensions` (§ 7.1.1) |
| Response stream      | A subscription was executed               | A stream of execution results (§ 7.1.2)                                                                      |
| Request error result | A request error happened before execution | `errors` (required, non-empty); no `data`; optional `extensions` (§ 7.1.3)                                   |

- No other top-level entries are allowed, and clients must ignore any they find (§ 7.1.8).
- `errors` may be serialized first so its presence is obvious (§ 7.1.1, § 7.1.3).
- `extensions` at the top level, if set, is a map with no other restrictions (§ 7.1.7).

## Errors

- **Request errors** happen before execution: parse or validation errors, an operation that cannot be determined, or invalid variable values. They are typically the client's fault, produce no `data`, and halt the request (§ 7.1.6).
- **Execution errors** (called "field errors" before September 2025) happen at a response position during execution, and produce partial `data`. They are typically the service's fault (§ 7.1.6).

Each error is a map (§ 7.1.6):

- `message` (required): a string for the developer.
- `locations` (should, when it maps to the document): a list of `{ "line", "column" }`, both starting at 1.
- `path` (must, when it maps to a response position): a response path of response names (strings, using the alias) and 0-based list indices (integers) (§ 7.1.4). When a Non-Null error propagated, `path` still points to the position that raised it.
- `extensions` (optional): a map for implementation data such as a code. Services should not add other entries to the error map (§ 7.1.6).

```json
{
  "errors": [
    {
      "message": "Name for character with ID 1002 could not be fetched.",
      "locations": [{ "line": 6, "column": 7 }],
      "path": ["hero", "heroFriends", 1, "name"],
      "extensions": { "code": "CAN_NOT_FETCH_BY_ID" }
    }
  ],
  "data": {
    "hero": {
      "name": "R2-D2",
      "heroFriends": [
        { "id": "1000", "name": "Luke Skywalker" },
        { "id": "1002", "name": null },
        { "id": "1003", "name": "Leia Organa" }
      ]
    }
  }
}
```

If `name` were `String!`, the same error would make that whole friend `null` instead (§ 7.1.6, Example № 210).

## Serialization

- No serialization format is required; a format must support map, list, string and null, and should support boolean, int, float and enum (§ 7.2).
- JSON mapping: map to object, list to array, null to null, String and Enum to string, Boolean to `true`/`false`, Int and Float to number (§ 7.2.1).
- Keep response map entries in the order the fields were requested, as produced by CollectFields(), even in JSON (§ 7.2.2, § 3.6 Field Ordering).

## Common mistakes

- Putting `code` next to `message` instead of under `extensions` (§ 7.1.6, Counter Example № 212).
- Returning `"data": null` for a validation failure: a request error result has no `data` key (§ 7.1.3).
- Including unreferenced built-in scalars in `__Schema.types`: only referenced ones are included (§ 3.5).
- Using the field name instead of the alias in `path` (§ 7.1.4).
