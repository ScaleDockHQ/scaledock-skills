# Data binding and actions

Read this when binding component properties to data, updating or syncing the data model, adding validation, or wiring buttons to the agent or to local functions. Sources: Protocol v0.9.1 (Data model representation, Data model updates, Client-side logic & validation, Defining actions, The `formatString` function), `common_types.json`, the Basic Catalog Implementation Guide and the Actions concept page, with Protocol v1.0 for the preview, listed in [Sources](../SKILL.md#sources).

## Dynamic values

Any property that can be bound is a `Dynamic*` type: a literal, a `DataBinding` `{"path": "<JSON Pointer>"}`, or a `FunctionCall` `{"call": "<name>", "args": {...}}` (Protocol v0.9.1, Common types; `common_types.json`). In v0.9 a `FunctionCall` may carry `returnType`; inside a typed dynamic value it must match (for example `"string"` in a `DynamicString`), and it defaults to `"boolean"`.

```json
{ "id": "greeting", "component": "Text", "text": { "path": "/user/name" } }
```

## Paths and scopes

Protocol v0.9.1, Path resolution & scope:

- Bindings are JSON Pointers (RFC 6901). Paths that start with `/` are absolute and resolve from the data model root anywhere in the tree.
- A container whose `children` is a template creates a child scope per array item. Inside it, a path without a leading `/` is relative: `firstName` under `/users` resolves to `/users/0/firstName`, `/users/1/firstName` and so on. Absolute paths still reach the root. Relative paths are an A2UI extension to RFC 6901.
- A non-numeric index on an array segment is an error.
- While streaming, a path may resolve to `undefined` because its data has not arrived; render an empty value or a loading state.
- When a non-string value is shown as text: numbers and booleans use their standard form, `null` or `undefined` become `""`, objects and arrays are JSON-stringified (Type conversion).

## Updating the data model

- The agent sends `updateDataModel` with upsert semantics, at a `path` (default `/`, the whole model) (Protocol v0.9.1, Server to client updates). In v0.9, omitting `value` removes the key; in v1.0 `value` is required and `null` removes it.
- Send structure once and change content with small data updates; components need not be resent (Protocol v0.9.1, `updateDataModel`).

## Two-way binding

Protocol v0.9.1, Two-way binding & input components:

- `TextField`, `CheckBox`, `Slider`, `ChoicePicker` and `DateTimeInput` read their value from the bound path and write to it immediately on user input.
- The local data model is the single source of truth, so every component bound to the same path updates as the user types.
- Two-way binding is local: keystrokes and toggles do not trigger network requests. State reaches the agent only when a user action fires.

## Actions

Protocol v0.9.1, Defining actions; `common_types.json` `Action`:

- `{"event": {"name": "...", "context": {...}}}` dispatches an `action` message to the agent. `name` is required. `context` values may be literals or bindings; the schema says to use literals for static ids and paths only for values bound to the data model.
- `{"functionCall": {"call": "...", "args": {...}}}` runs a local renderer function, such as `openUrl`, and sends nothing to the agent.
- When an event fires, the renderer resolves every binding in `context` and sends the result as the `action.context` (Example: form submission pattern).

```json
{
  "id": "submit_button",
  "component": "Button",
  "child": "submit_label",
  "action": {
    "event": {
      "name": "submit_form",
      "context": { "formId": "f-123", "email": { "path": "/formData/email" } }
    }
  }
}
```

## Data model sync (`sendDataModel`)

Protocol v0.9.1, Client to server updates; `client_data_model.json`:

- With `sendDataModel: true` on `createSurface`, the renderer appends the surface's full data model to the metadata of every message it sends to the agent that created the surface, as `a2uiClientDataModel` `{"version": "v0.9.1", "surfaces": {"<surfaceId>": {...}}}`.
- It is sent only with a renderer-to-agent message such as an action or a user query; passive changes do not trigger a request.
- The agent treats it as the renderer's state at the time of the action.
- It goes only to the surface's creator. In a multi-agent setup the orchestrator must strip surfaces the target sub-agent does not own (Actions, Data Model Isolation and Orchestrator Routing; Preventing Data Leakage via Metadata Stripping).

## Functions and checks

Protocol v0.9.1, Client-side logic & validation; Basic Catalog Implementation Guide:

- Functions are named in the catalog and implemented by the renderer; the agent references them by name, which avoids sending executable code.
- Inputs and buttons take `checks`: an array of `CheckRule` objects `{"condition": <DynamicBoolean>, "message": "..."}`, both required in v0.9. Each failing check shows its message. A button with a failing check is disabled.
- Compose conditions with `and` and `or`, which take `values` (at least two), and `not`, which takes `value` (basic catalog schema).

```json
"checks": [
  { "condition": { "call": "required", "args": { "value": { "path": "/formData/zip" } } }, "message": "Zip code is required" },
  { "condition": { "call": "regex", "args": { "value": { "path": "/formData/zip" }, "pattern": "^[0-9]{5}$" } }, "message": "Must be a 5-digit zip code" }
]
```

## `formatString`

Protocol v0.9.1, The `formatString` function; Evolution Guide v0.9 § 5.3:

- `${...}` interpolation works only inside a `formatString` call, never in plain string properties.
- `${/user/name}` is absolute, `${firstName}` relative to the current template scope.
- Function calls use parentheses with named arguments: `${formatDate(value:${/currentDate}, format:'yyyy-MM-dd')}`; arguments are quoted literals, numbers, booleans or nested `${...}` expressions.
- Escape a literal `${` as `\${`.

```json
{
  "id": "welcome",
  "component": "Text",
  "text": {
    "call": "formatString",
    "args": { "value": "Hello, ${/user/firstName}!" },
    "returnType": "string"
  }
}
```

## v1.0 changes (preview, build behind a flag)

Protocol v1.0, Common types, Reserved Protocol Directives, Component Validation & Check Rules, The `@index` function, Functions in A2UI Content Execution:

- Bindings are `{"@path": "..."}` and calls `{"@call": "...", "args": {...}}`; objects with plain `path` or `call` keys are literal data. Other keys matching `^@([^@]|$)` are rejected; double the prefix (`"@@path"`) for a literal key. `ChildList` templates keep `path` unprefixed. `returnType` is no longer written on wire-level calls.
- `{"@call": "@index"}` (or `${@index(offset: 1)}` in `formatString`) returns the 0-based template index plus `offset`; outside a template it MUST be treated as an error.
- A `CheckRule` condition evaluates to a `ValidationResult` (`valid` required; `code`, `message`, `severity` of `error`, `warning` or `info`); `message` on the rule is an optional fallback.
- Event actions may set `userMessage`, a human-readable description of what the user did.
- A `FunctionCall` the renderer has not registered is sent to the agent as `callAgentFunction`. While it is pending the binding shows a loading or previous value; on failure a binding resolves to `null`, a check is invalid, and an action pipeline stops.
- `openUrl` declares `requiresUserActivation: true`.
