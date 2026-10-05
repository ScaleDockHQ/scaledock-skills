# Conditions, contextual tuples and modular models

Sources: the Conditions, Concepts, Contextual Tuples and Modular Models pages, `openfga/api` `authzmodel.proto`, the `openfga/language` grammar and `mod-to-json.go`, and PR #3313, listed in [Sources](../SKILL.md#sources).

## Conditions

A condition is a function with one or more typed parameters and a boolean expression in Google's Common Expression Language (CEL). A conditional relationship tuple holds only if its condition evaluates to true (Concepts, What is a Condition? and What Is A Conditional Relationship Tuple?). Use conditions for attribute checks: temporal access, IP allowlists, usage and feature limits, resource attributes (Conditions, Overview).

### Defining

```dsl.openfga
model
  schema 1.1

type user

type document
  relations
    define viewer: [user with non_expired_grant]

condition non_expired_grant(current_time: timestamp, grant_time: timestamp, grant_duration: duration) {
  current_time < grant_time + grant_duration
}
```

`user with non_expired_grant` means every `user` tuple on `document#viewer` must carry that condition (Conditions, Defining conditions in models).

In JSON, conditions sit in a top-level `conditions` map keyed by name, each with `name`, `expression` and `parameters` (`{"type_name": "TYPE_NAME_TIMESTAMP"}`), and the restriction is `{"type": "user", "condition": "non_expired_grant"}` (Conditions, WriteAuthzModelViewer example).

### Parameter types

From Conditions, Supported parameter types, and the `TypeName` enum in authzmodel.proto:

| DSL         | API `type_name`       | Value                                        |
| ----------- | --------------------- | -------------------------------------------- |
| `int`       | `TYPE_NAME_INT`       | 64-bit signed integer, `-1` or `"-1"`        |
| `uint`      | `TYPE_NAME_UINT`      | 64-bit unsigned integer                      |
| `double`    | `TYPE_NAME_DOUBLE`    | 64-bit float; strings parsed as Go `float64` |
| `bool`      | `TYPE_NAME_BOOL`      | boolean                                      |
| `string`    | `TYPE_NAME_STRING`    | string                                       |
| `duration`  | `TYPE_NAME_DURATION`  | Go duration string, `"120s"`, `"2m"`         |
| `timestamp` | `TYPE_NAME_TIMESTAMP` | RFC 3339, `"2023-01-01T00:00:00Z"`           |
| `ipaddress` | `TYPE_NAME_IPADDRESS` | IP address string, `"192.168.0.1"`           |
| `any`       | `TYPE_NAME_ANY`       | any value                                    |
| `list<T>`   | `TYPE_NAME_LIST`      | list of T                                    |
| `map<T>`    | `TYPE_NAME_MAP`       | string keys, values of T                     |

The Conditions page also lists `bytes`, but the API `TypeName` enum has no bytes value; do not use it.

### Writing and evaluating

- A conditional tuple carries `condition: {name, context}`; the context holds the values known at write time, such as `grant_time` and `grant_duration` (Conditions, Writing conditional relationship tuples).
- Check, ListObjects and ListUsers take a request `context` with the remaining values, such as `current_time` (Conditions, Queries with condition context).
- The tuple context and the request context are merged; **the tuple's value wins** when both set the same parameter (Conditions, note). Never rely on a request value to override a stored one.
- Provide a value for every parameter of every condition the query may reach, so every tuple can be evaluated (openfga_service.proto, Check and ListObjects descriptions).
- When deleting a tuple, any `condition` sent with it is ignored (openfga_service.proto, Write description).

### Limits

- Tuple condition context: at most 32 KB. Query requests: overall request limit 512 KB (Conditions, Limitations).
- CEL evaluation cost: at most 100 by default, to protect the server (Conditions, Limitations).
- Expression: at most 512 bytes; at most 25 conditions per model and 25 parameters per condition; names up to 50 characters with no `:`, `#`, `@` or whitespace (authzmodel.proto, `Condition`).
- `list<T>` and `map<T>` take at most 5 generic types (authzmodel.proto, `ConditionParamTypeRef.generic_types`).

### Dynamic conditions (experimental)

Server v1.21.0 adds `[user with $expression]` behind the `inline_expressions` flag, disabled by default. Each tuple then carries `condition: {name: "$expression", context: {expression, parameters}}`, and Check fails with an error if a parameter is missing from the request context or has the wrong type (PR #3313; OpenFGALexer.g4, `DOLLAR_EXPRESSION`). Do not emit `$expression` unless the deployment enables the flag.

## Contextual tuples

Contextual tuples are sent with Check, BatchCheck, ListObjects, ListUsers and Expand, treated as stored tuples for that one request, and never persisted (Contextual Tuples, How Contextual Tuples Work).

Use them:

1. To avoid syncing data, for example group memberships from an identity token.
2. To choose which of several relationships applies, for example the organization the user is logged into.
3. For runtime-only facts; for values compared against thresholds (time, location), a condition is the better fit.

Rules (Contextual Tuples, Important Considerations; openfga.proto, `ContextualTupleKeys`):

- At most 100 contextual tuples per request.
- A contextual tuple with the same user, relation and object as a stored one takes precedence; the stored one is ignored.
- They are validated against the model like stored tuples, and may carry a `condition`.
- Access derived from token claims lasts until the token expires, even if the underlying membership changes.

## Modular models (schema 1.2)

Modular models split one model across files and modules so teams can own their parts, for example with code owners (Modular Models, introduction).

### Files

- **`fga.mod`**: YAML with `schema` (must be `'1.2'`) and `contents` (the list of `.fga` files) (Modular Models, `fga.mod`; mod-to-json.go).
- **Module files**: start with `module <name>` instead of `model` / `schema`. A file holds exactly one module; a module may span several files (Modular Models, Modules; validate-dsl.ts, `raiseMultipleModulesInSingleFile`).

```yaml
schema: "1.2"
contents:
  - core.fga
  - issue-tracker/projects.fga
  - issue-tracker/tickets.fga
  - wiki.fga
```

```dsl.openfga
module issue-tracker

extend type organization
  relations
    define can_create_project: admin

type project
  relations
    define organization: [organization]
    define viewer: member from organization
```

### Type extensions

`extend type <name>` adds relations to a type that another module defines (Modular Models, Type Extensions):

- The extended type must exist (the tooling reports "extended type … does not exist", module-to-model.go).
- A file extends a given type at most once.
- An added relation must not already exist on the type or in another extension.

### Deploying and viewing

- Write with `fga model write --store-id=$FGA_STORE_ID --file fga.mod`. The result is one model that is queried like any other (Modular Models, Putting it all together).
- `fga model get` prints the combined DSL with `# module: …, file: …` and `# extended by: …` comments (Modular Models, Viewing the model).
- Tests use `model_file: fga.mod`; split tests per module into separate `.fga.yaml` files that share tuples through `tuple_file` or `tuple_files` (Testing Models, Testing with Modular Models).
