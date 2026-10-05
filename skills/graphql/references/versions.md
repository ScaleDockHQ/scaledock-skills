# Versions and upgrades

Read this when choosing a target edition, reading a schema or service written for an older edition, upgrading, or deciding whether to use something from the working draft. Sources: the spec index at spec.graphql.org, the text of each edition, the GitHub release notes, the September 2025 and October 2021 changelogs, and the GraphQL over HTTP README and draft, listed in [Sources](../SKILL.md#sources).

## Version lines

GraphQL is published as dated editions. The index at spec.graphql.org lists the Working Draft as "Prerelease", September 2025 as "Latest Release", and the older editions below it with their release notes. The foundation does not declare any edition unsupported, so the statuses below follow the repo's contract: the latest release is current, the previous Foundation-ratified edition is supported, and older editions are legacy.

| Id                        | Line                             | Status    | Revision                                                 | Posture | Summary                                                                                                  |
| ------------------------- | -------------------------------- | --------- | -------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `draft-preview`           | GraphQL working draft            | preview   | spec.graphql.org/draft, Mon, Sep 28, 2026                | track   | Directive extensions, deprecated directives, empty selection sets, operation execution wording.          |
| `september2025`           | GraphQL September 2025           | current   | September 2025 edition, released 2025-09-03              |         | The default target. OneOf input objects, schema coordinates, executable descriptions, wider deprecation. |
| `october2021`             | GraphQL October 2021             | supported | October 2021 edition, released 2021-10-26                |         | First edition ratified by the GraphQL Foundation. Valid target for a named consumer.                     |
| `june2018`                | GraphQL June 2018                | legacy    | June 2018 edition, released 2018-06-10                   |         | First edition no longer a "Draft RFC"; introduced SDL and subscriptions.                                 |
| `october2016`             | GraphQL October 2016 and earlier | legacy    | October 2016, April 2016, October 2015, July 2015 drafts |         | Working drafts published by Facebook before SDL was specified.                                           |
| `graphql-over-http-draft` | GraphQL over HTTP draft          | current   | Stage 2 (Draft), Current Working Draft, main at e287465  | build   | The only line of the `graphql-over-http` family; no tagged release yet.                                  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

## Which version to use

- Default to GraphQL September 2025 for schemas, services and documents.
- Drop to GraphQL October 2021 only for a named consumer (a client code generator, gateway or older server library) that rejects September 2025 additions. In that case do not use `@oneOf`, do not deprecate arguments or input fields, and do not rely on executable descriptions.
- Treat a June 2018 or older schema or service as input to an upgrade.
- Do not emit anything that exists only in the working draft (posture: track). Watch it for the next edition.
- For HTTP, build against the GraphQL over HTTP draft (posture: build). It is a Stage 2 draft and "can change before reaching Accepted stage" (README), so keep the legacy `application/json` path working (GoH § 5.1).

## What changed

### GraphQL September 2025

From the changelog's notable contributions and the spec text:

- OneOf input objects and the `@oneOf` directive, with `__Type.isOneOf` (§ 3.10.1, § 3.13.5, § 4.2.2; #825).
- Schema coordinates such as `Type.field(arg:)` and `@directive(arg:)` (§ 2.14; #794).
- Descriptions on operations, fragments and variable definitions; they must not affect execution, validation or the response (§ 2.2, § 6; #1170).
- `@deprecated` now applies to `ARGUMENT_DEFINITION` and `INPUT_FIELD_DEFINITION`, its `reason` is `String!`, introspection `args` and `inputFields` take `includeDeprecated`, and `__InputValue` gains `isDeprecated` and `deprecationReason` (§ 3.13.3, § 4.2; #805, #1040). `includeDeprecated` is `Boolean! = false` in § 4.2 (#1142); the September 2025 Appendix D still printed `Boolean = false`, which the draft corrects (#1192).
- Required arguments and input fields cannot be deprecated, and an implementing field cannot be deprecated unless the interface field is (§ 3.6, § 3.13.3; #1053).
- Full Unicode range in source text and strings, with `\u{...}` variable-width escapes (§ 2.10.4; #849).
- New validation rule Operation Type Existence (§ 5.2.1.1; #955), and `@skip` and `@include` are forbidden on the root selection of a subscription (§ 5.2.4.1; #860).
- Default value coercion rules and the InputObjectDefaultValueHasCycle check (§ 3.10; #793).
- `extensions` on the request (§ 6; #976).
- Terminology: "field error" became "execution error"; "response position", "execution result" and "request error result" are defined; "response key" became "response name" (§ 7.1; #1152, #1159, #1147).
- ID must always serialize as a String (§ 3.5.5; #1086). Selection sets cannot be empty (#1025). Stable ordering of introspection lists is recommended (§ 4.2; #1092).
- Appendix D lists all specified type system definitions (#1037).

### GraphQL October 2021

From the October 2021 changelog:

- Repeatable directives and `__Directive.isRepeatable` (§ 3.13; #472).
- Interfaces implementing interfaces (§ 3.7; #373).
- Custom scalar specification URLs: `@specifiedBy` and `__Type.specifiedByURL` (§ 3.5, § 3.13.4; #649, #848).
- Directives on variable definitions and the `VARIABLE_DEFINITION` location (#510).
- `__typename` is not valid at the subscription root (§ 4.1; #776).
- Descriptions on the schema definition (#466), number literal lookahead restrictions (#601), no unbreakable Non-Null cycles in input objects (#701), Float excludes NaN and Infinity (#780), "query error" renamed "request error" (#803).

### GraphQL June 2018

From the June 2018 release notes: the type system definition language (SDL) and schema validation, error `path` (#230), subscriptions (#267), block strings (#327), relicensing to OWFa 1.0, `errors` before `data` in the response (#384), `extensions` on errors (#407), and clear rules for `null` variables and default values (#418).

### GraphQL October 2016 and earlier

The October 2016 release notes list a `null` literal (#83), unique directives per location (#229), and `null` versus not-provided for defaults (#221). These editions are working drafts and had no specified SDL.

## Upgrading

### GraphQL October 2021 to GraphQL September 2025

1. Change the version marker: cite the September 2025 edition in documentation, and update tooling to a release that implements it.
2. Replace removed or renamed fields: rename "field error" to "execution error" in docs and error-handling code. Change `@deprecated(reason: null)` to omit `reason` or give a string, because `reason` is `String!` (§ 3.13.3). Make introspection queries pass non-null `includeDeprecated` values (§ 4.2).
3. Validate against the target: re-run schema validation (a deprecated required argument or input field, or a deprecated implementing field whose interface field is not deprecated, is now invalid), and re-run document validation for Operation Type Existence and `@skip`/`@include` at subscription roots (§ 5.2.1.1, § 5.2.4.1).
4. Keep behaviour unchanged: adopt `@oneOf` only for new inputs or as a planned breaking change, since turning an existing input object into a OneOf rejects inputs that were valid (§ 5 Type System Evolution).

### GraphQL June 2018 to GraphQL October 2021

1. Change the version marker: cite the October 2021 edition.
2. Replace removed or renamed fields: replace custom scalar documentation links with `@specifiedBy(url:)` and expose `specifiedByURL`; add `isRepeatable` to `__Directive` in introspection.
3. Validate against the target: remove `__typename` from subscription root selections (§ 4.1), and check input objects for unbreakable Non-Null cycles.
4. Keep behaviour unchanged: repeatable directives and interfaces implementing interfaces are additive; existing schemas stay valid.

### GraphQL October 2016 and earlier to GraphQL June 2018

1. Change the version marker: cite the June 2018 edition, then continue with the next upgrades.
2. Replace removed or renamed fields: move any non-standard top-level error properties into `extensions` (§ 7.1.6), and add `path` to execution errors.
3. Validate against the target: write the schema in SDL and run schema validation; check `null` and default value handling of variables and arguments.
4. Keep behaviour unchanged: keep response field order matching request order (§ 7.2.2).

### GraphQL over HTTP: legacy servers and clients to the draft

1. Change the version marker: support responses in `application/graphql-response+json` and send it in `Accept` (GoH § 4.2, § 5.1).
2. Replace removed or renamed fields: none in the body; keep `query`, `operationName`, `variables`, `extensions` (GoH § 4.1).
3. Validate against the target: return the status codes in GoH § 5.4 (422 for validation failures, 2xx when `data` is non-null), and 405 with `Allow` for GET mutations.
4. Keep behaviour unchanged: keep answering `Accept: application/json` clients with `Content-Type: application/json` on 2xx responses (GoH § 5.1).

## Preview: GraphQL working draft

The draft at spec.graphql.org/draft (dated Mon, Sep 28, 2026) contains these changes since September 2025, from the commit history and the spec text:

- Directives on directive definitions and directive extensions (`extend directive @name @dir`), the `DIRECTIVE_DEFINITION` location, `@deprecated` on directives, and `__Schema.directives(includeDeprecated:)` with `__Directive.isDeprecated` and `deprecationReason` (§ 3.13, § 3.13.6, § 4.2; #1206).
- Empty selection sets: an object, interface or union field must have a subselection, which may be `{}` (§ 5.3.3; #1227).
- OneOf inhabitability: InputObjectHasUnbreakableCycle replaces the Non-Null chain rule, so cycles through OneOf input objects are also invalid (§ 3.10; #1211).
- "Operation execution" is defined; the subscription source stream is created in ExecuteRequest(), so failures there are request errors (§ 6; #894). Each error must have a unique response path (§ 6.4.4; #1183, #1238).

Posture is track: do not emit directive extensions, deprecated directives or empty selection sets. When a new edition is released, make it current, make September 2025 supported, decide from the release notes whether October 2021 stays supported or becomes legacy, and add an upgrade section.
