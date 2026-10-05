# Validation and execution

Read this when implementing or reviewing a validator or executor, or when a response looks wrong. Section numbers are from the September 2025 edition.

## When to validate

- Execution should only occur for valid requests; known validation errors are reported in `errors` and the request fails without execution (§ 5, § 6.1.1).
- A service may skip validation only for a request known to have been valid and unchanged since, for example a document validated at build time or memoized (§ 5, § 6.1.1).
- Any change that can make a previously valid request invalid is a breaking change (§ 5, Type System Evolution).

## Validation rules

| Area       | Rule (section)                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Documents  | Executable Definitions: no type system definitions or extensions (§ 5.1.1).                                                                                                                                                                                                                                                                                    |
| Operations | Operation Type Existence: the root type for the operation's kind exists (§ 5.2.1.1). Operation Name Uniqueness (§ 5.2.2.1). Lone Anonymous Operation: an anonymous operation is the only one (§ 5.2.3.1). Single Root Field: a subscription selects exactly one root field, not an introspection field, with no `@skip` or `@include` at the root (§ 5.2.4.1). |
| Fields     | Field Selections: the field exists on the type in scope (§ 5.3.1). Field Selection Merging: same response name means same field name and arguments when the parent types can overlap, and always the same response shape (§ 5.3.2). Leaf Field Selections (§ 5.3.3).                                                                                           |
| Arguments  | Argument Names exist (§ 5.4.1), are unique (§ 5.4.2), and every required argument (Non-Null, no default) is given and not the `null` literal (§ 5.4.3).                                                                                                                                                                                                        |
| Fragments  | Unique names (§ 5.5.1.1), type exists (§ 5.5.1.2), on object, interface or union (§ 5.5.1.3), every fragment used (§ 5.5.1.4), spread target defined (§ 5.5.2.1), no cycles (§ 5.5.2.2), spread is possible: the possible types of the fragment and parent intersect (§ 5.5.2.3).                                                                              |
| Values     | Literals coerce to the expected type (§ 5.6.1); input field names exist (§ 5.6.2) and are unique (§ 5.6.3); required input fields are given (§ 5.6.4).                                                                                                                                                                                                         |
| Directives | Defined (§ 5.7.1), in a valid location (§ 5.7.2), non-repeatable ones unique per location (§ 5.7.3).                                                                                                                                                                                                                                                           |
| Variables  | Unique (§ 5.8.1), of input types (§ 5.8.2), every use defined (§ 5.8.3), every definition used (§ 5.8.4), every usage allowed (§ 5.8.5).                                                                                                                                                                                                                       |

Notes on the harder rules:

- **Field merging** (§ 5.3.2): `{ a: name, a: nickname }` is invalid; `{ name(x: 1) name(x: 2) }` is invalid; two fields on different concrete object types may differ in name or arguments but must return compatible shapes (SameResponseShape compares nullability, list depth and the scalar or enum type).
- **Variable usage** (§ 5.8.5): a nullable variable may flow into a Non-Null position only if the variable has a non-null default or the argument or input field has a default. A OneOf input field counts as a Non-Null position, so variables used there must be non-nullable. Lists are compared item by item.
- **Fragment cycles** (§ 5.5.2.2): a fragment that spreads itself, directly or through other fragments, is invalid.

## Request execution

A request carries the schema, the document, an optional operation name, optional variable values, an optional initial value, and an optional `extensions` map (§ 6). Implementations should not add other request properties; `extensions` is the reserved place for implementation-specific data, and keys should use unique prefixes (§ 6).

ExecuteRequest() (§ 6.1):

1. GetOperation(): with no operation name the document must contain exactly one operation, otherwise a request error is raised; a named operation that is missing is a request error.
2. CoerceVariableValues() (§ 6.1.2): for each variable, use the provided value; if none is provided and a default exists (including `null`), use the coerced default; a Non-Null variable that is missing or `null` is a request error; a value that cannot be coerced is a request error. Any request error here means the operation does not execute.
3. Dispatch: query runs the root selection set normally (§ 6.2.1); mutation runs it serially (§ 6.2.2); subscription creates the source stream and maps each event to an execution result (§ 6.2.3).

## Subscriptions

- A subscription produces a response stream: one execution result per event on the source stream, executed with the event as the initial value (§ 6.2.3, § 6.2.3.2).
- An event stream that errors completes with that error; cancelling a stream completes it; unsubscribing cancels the response and source streams (§ 6.2.3, § 6.2.3.3).
- Delivery, acknowledgement, buffering and other quality of service are left to the service (§ 6.2.3, Delivery Agnostic). Subscriptions are stateful; plan for state loss when a machine fails (§ 6.2.3).

## Field collection and execution

- CollectFields() walks the selection set depth first, skipping fields excluded by `@skip`/`@include` and fragments whose type condition does not apply, and groups fields by response name in first-seen order (§ 6.3.2). Selections for the same response name are merged before their subfields execute (§ 6.3.2).
- ExecuteCollectedFields() builds a result map in that order (§ 6.3.3). Normal execution may run fields in any order, including in parallel, because non-mutation fields must be side-effect free and idempotent (§ 6.3.4).
- Serial execution (top-level mutation fields only) runs each field, including its whole subtree, to completion before the next, in document order (§ 6.3.4).
- ExecuteField() coerces arguments, resolves the value, then completes it (§ 6.4). A request error raised while coercing arguments is treated as an execution error (§ 6.4.1). Default argument values may be coerced once and cached (§ 6.4.1).
- ResolveFieldValue() is application code and is often asynchronous; list items may also resolve asynchronously (§ 6.4.2).

## Value completion

CompleteValue() (§ 6.4.3):

1. Non-Null: complete the inner type; if the result is null, raise an execution error.
2. A null (or undefined-like) result returns null.
3. List: a non-collection is an execution error; otherwise complete each item with the item type.
4. Scalar or enum: CoerceResult(); it never sees null (§ 6.4.3, Coercing Results).
5. Object: collect subfields. Interface or union: first resolve the concrete Object type (ResolveAbstractType), then collect subfields and execute them normally.

## Errors and null propagation

- An execution error is raised at a response position during field execution, resolution or coercion. The position becomes null and the error is added to `errors` (§ 6.4.4).
- If that position is Non-Null, the null propagates to the parent position: a field's parent selection set, or a list's whole list. It stops at the first nullable position; if every position up to the root is Non-Null, `data` is null (§ 6.3.3, § 6.4.4).
- Only one error is added per response position; a null caused by an already reported error adds nothing (§ 6.4.4).
- Sibling positions that have not finished may be cancelled once an error propagates (§ 6.3.3).
- Request errors (parse, validation, operation selection, variable coercion) happen before execution and produce a request error result with no `data` (§ 7.1.3, § 7.1.6).

Example: `friends: [User!]` where one `User` fails. The item is Non-Null, so the error nulls the whole `friends` list, not just one item (§ 3.11, § 6.4.4).

## Common mistakes

- Running mutations in parallel: top-level mutation fields are serial (§ 6.2.2).
- Returning `data: null` with no `errors`: every null `data` comes from an error (§ 7.1.5, § 6.4.4).
- Adding one error per propagated parent: report the error once, at the position that raised it, with the full path even if that position is absent from `data` (§ 6.4.4, § 7.1.6).
- Executing a document with a type extension in it (§ 5.1.1).
