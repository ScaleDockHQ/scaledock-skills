# Server features

Read this when exposing tools, resources or prompts, adding completion, pagination, caching hints or logging, or returning an `InputRequiredResult`. Rules are from MCP 2026-07-28; citations name the page and heading.

## Capabilities

Advertise each feature in `server/discover` `capabilities` (Discovery; Architecture, Capability Negotiation):

| Capability    | Sub-capabilities           | Methods                                                        |
| ------------- | -------------------------- | -------------------------------------------------------------- |
| `tools`       | `listChanged`              | `tools/list`, `tools/call`                                     |
| `resources`   | `listChanged`, `subscribe` | `resources/list`, `resources/read`, `resources/templates/list` |
| `prompts`     | `listChanged`              | `prompts/list`, `prompts/get`                                  |
| `completions` |                            | `completion/complete`                                          |
| `logging`     |                            | `notifications/message` (deprecated)                           |
| `extensions`  | per extension              | see [`extensions-and-registry.md`](extensions-and-registry.md) |

For tools, resources and prompts the list (Tools, Resources and Prompts, Capabilities):

- MUST be the set currently available to the requesting client, MAY be empty and MAY change over time;
- MUST NOT vary per connection or as a side effect of other requests;
- MAY vary by the authorization on the request (for example by granted scopes).

`listChanged` notifications (`notifications/tools/list_changed`, `notifications/prompts/list_changed`, `notifications/resources/list_changed`) SHOULD be sent only to clients that opened `subscriptions/listen` with the matching filter.

## Tools

From the Tools page:

- Tools are model-controlled. There SHOULD always be a human in the loop who can deny an invocation; applications SHOULD show which tools are exposed, indicate invocations, and confirm operations.
- `tools/list` is paginated and cacheable. Servers SHOULD return tools in a deterministic order.
- Tool fields: `name`, optional `title`, `description`, optional `icons`, `inputSchema`, optional `outputSchema`, optional `annotations`.
- Names SHOULD be 1 to 128 characters of `A-Z a-z 0-9 _ - .`, case-sensitive, unique within the server. Aggregators SHOULD disambiguate collisions (for example by prefixing) and SHOULD NOT rely on `serverInfo.name` for it.
- `inputSchema` MUST be a valid JSON Schema object, never `null`. For no parameters, `{ "type": "object", "additionalProperties": false }` is recommended. Schemas default to JSON Schema 2020-12.
- `annotations` (`readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`, `title`) are hints; clients MUST treat them as untrusted unless the server is trusted (Tools, Data Types; schema `ToolAnnotations`).
- `x-mcp-header` mirrors a primitive argument into `Mcp-Param-{Name}` on HTTP. Servers SHOULD NOT mark passwords, keys, tokens or PII, because headers are visible to intermediaries.

### Results

- Unstructured `content`: `text`, `image` and `audio` (base64 `data` plus `mimeType`), `resource_link`, and embedded `resource`. All support `annotations` (`audience`, `priority` 0.0 to 1.0, `lastModified`). Resource links need not appear in `resources/list`. Servers that embed resources SHOULD implement `resources`.
- `structuredContent` may be any JSON value. With `outputSchema`, servers MUST return conforming `structuredContent` and clients SHOULD validate it. For compatibility, also return the serialized JSON in a text block (SHOULD).
- Errors: protocol errors (unknown tool, a request that fails the `CallToolRequest` schema, server errors) are JSON-RPC errors such as `-32602`. Tool execution errors (API failures, input validation, business rules) are results with `isError: true` so the model can self-correct. Clients SHOULD pass execution errors to the model.

### Stateful tools

There is no protocol session. Keep cross-call state behind a handle returned by a creation tool and passed as an argument. Check the caller's authorization against the handle on every call; for unauthenticated servers, use high-entropy, expiring handles. State the retention policy in the tool description, and return a tool execution error for an expired handle (Tools, Stateful Tools, non-normative).

### Security

Servers MUST validate all tool inputs, implement access controls, rate limit invocations and sanitize outputs. Clients SHOULD confirm sensitive operations, show inputs before calling, validate results before passing them to the model, follow the `$ref` rules, set timeouts and log usage (Tools, Security Considerations).

## Resources

From the Resources page:

- Resources are application-driven and identified by an RFC 3986 URI. Fields: `uri`, `name`, optional `title`, `description`, `icons`, `mimeType`, `size`.
- `resources/list` and `resources/templates/list` are paginated and cacheable; `resources/read` is cacheable. Templates use RFC 6570 `uriTemplate`.
- `resources/read` returns `contents`: `text` or base64 `blob`, each with `uri` and optional `mimeType`. Servers MAY return several contents, or an `InputRequiredResult`.
- `subscribe: true` means the server sends `notifications/resources/updated` for URIs listed in `resourceSubscriptions` on a `subscriptions/listen` stream.
- URI schemes: use `https://` only when the client can fetch the resource directly; `file://` need not map to a real filesystem and MAY use XDG MIME types such as `inode/directory`; custom schemes MUST follow RFC 3986.
- Errors: unknown resource MUST be `-32602`; internal errors SHOULD be `-32603`; never an empty `contents` array for a missing resource. Clients SHOULD also accept `-32002` from older servers.
- Security: servers MUST validate every URI, MUST properly encode binary data, and MUST sanitize paths against traversal for `file://`; access controls and permission checks SHOULD apply.

## Prompts

From the Prompts page:

- Prompts are user-controlled (for example slash commands); content is defined by the server.
- `prompts/list` is paginated and cacheable. A prompt has `name`, optional `title`, `description`, `icons` and `arguments` (`name`, `description`, `required`).
- `prompts/get` takes `name` and `arguments` and returns `messages` with `role` (`user` or `assistant`) and one content block (text, image, audio, resource link, embedded resource). It MAY return an `InputRequiredResult`.
- Errors: invalid name or missing required argument `-32602`; internal `-32603`.
- Implementations MUST validate prompt inputs and outputs against injection and unauthorized resource access.

## Completion

From the Completion page: declare `completions`. `completion/complete` takes `ref` (`ref/prompt` with `name`, or `ref/resource` with a URI or URI template), `argument` (`name`, `value`) and optional `context.arguments` with already-resolved values. The result is `completion.values` (at most 100, ranked by relevance), optional `total`, and `hasMore`. Servers SHOULD rate limit; clients SHOULD debounce. Implementations MUST validate inputs, rate limit, control access to sensitive suggestions and prevent information disclosure through completions.

## Pagination

From the Pagination page: `tools/list`, `resources/list`, `resources/templates/list` and `prompts/list` paginate with an opaque `cursor` and `nextCursor`. The server decides the page size; clients MUST NOT assume one. Clients MUST treat cursors as opaque, and an empty string is a valid cursor, not the end. Invalid cursors SHOULD get `-32602`.

## Caching hints

From the Caching page:

- Servers MUST include `ttlMs` (integer, at least 0) and `cacheScope` (`"public"` or `"private"`) on complete results of `server/discover`, `tools/list`, `prompts/list`, `resources/list`, `resources/templates/list` and `resources/read`. `input_required` results carry no hints.
- `"public"`: no user-specific data; any cache may share it across users. `"private"`: reuse only within the same authorization context. Every page of one list request MUST use the same `cacheScope`.
- Servers MUST apply per-primitive access controls and MUST NOT rely on `cacheScope` alone, because a `"public"` result from an authenticated call may be shared across tokens.

Client-side cache rules are in [`client-features.md`](client-features.md).

## Returning `InputRequiredResult` (MRTR)

From the Multi Round-Trip Requests page:

- Only `tools/call`, `prompts/get` and `resources/read` MAY return `resultType: "input_required"`; no other request may.
- The result MUST include at least one of `inputRequests` (a map of server-chosen keys, unique within the request, to `elicitation/create`, `sampling/createMessage` or `roots/list` requests) and `requestState` (an opaque string).
- Servers MUST NOT include input requests for capabilities the client did not declare, and MUST NOT assume the client will fulfil them or retry. They MAY ask again on a retry.
- Treat `requestState` as attacker-controlled. If it influences authorization, resource access or business logic, protect its integrity (HMAC or AEAD) and reject state that fails. Include the authenticated principal, a short expiry and a digest of the originating method and parameters (SHOULD). Enforce single use server-side where it matters.
- On the retry, ignore unrecognized `inputResponses`; if needed information is missing, respond with a new `InputRequiredResult` rather than an error.

## Logging (deprecated)

Logging is Deprecated as of 2026-07-28: new implementations SHOULD NOT adopt it; log to `stderr` on stdio or use OpenTelemetry (Logging; Deprecated Features). If kept: declare `logging`; emit `notifications/message` (`level` from RFC 5424 `debug` to `emergency`, optional `logger`, `data`) only for requests that set `io.modelcontextprotocol/logLevel`, only at or above that level, and only on that request's response stream. An unknown level SHOULD get `-32602`. Log messages MUST NOT contain credentials, personal data or internal details that aid attacks.

## Icons

Tools, resources, prompts and `Implementation` MAY carry `icons` (`src` HTTPS or `data:` URI, optional `mimeType`, `sizes`, `theme`). Consumers MUST treat icons as untrusted: reject unsafe schemes (`javascript:`, `file:`, `ftp:`, `ws:`, local app schemes), fetch without credentials, verify same origin, and validate content by magic bytes. Rendering clients MUST support `image/png` and `image/jpeg` (Base Protocol, `icons`).
