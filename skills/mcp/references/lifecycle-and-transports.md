# Base protocol, lifecycle and transports

Read this when building the message layer, version handling, stdio or Streamable HTTP, cancellation, progress or subscriptions. Rules are from MCP 2026-07-28 unless a section says otherwise; citations name the page and heading. The legacy handshake at the end applies only to the supported 2025-11-25 and 2025-06-18 lines.

## JSON-RPC messages

All messages MUST follow JSON-RPC 2.0 and MUST be UTF-8 encoded (Base Protocol, Messages; Transports, Messages).

| Message      | Rules                                                                                                                                                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Request      | MUST have a string or integer `id`, never `null`, not reused while the sender's earlier request with that `id` is unanswered.                                                                                                                                                           |
| Result       | Same `id` as the request; MUST carry `result`, and `result` MUST carry `resultType` (`"complete"` or `"input_required"`, plus advertised extension values). Unknown `resultType` values MUST be treated as invalid; a missing one from an older server MUST be treated as `"complete"`. |
| Error        | Same `id` (unless it could not be read); `error.code` is an integer, `error.message` is required, `error.data` is optional.                                                                                                                                                             |
| Notification | No `id`; the receiver MUST NOT respond.                                                                                                                                                                                                                                                 |

Direction is fixed: clients send requests and notifications, servers send responses and notifications. Servers MUST NOT initiate JSON-RPC requests (Message Patterns, Overview; Transports, Messages). JSON-RPC batches are not part of MCP since 2025-06-18 (2025-06-18 Key Changes, Major 1).

### Error codes

Standard codes: `-32700` parse error, `-32600` invalid request, `-32601` method not found, `-32602` invalid params, `-32603` internal error (schema). MCP partitions the JSON-RPC server range (Base Protocol, Error Codes):

- `-32000` to `-32019` are legacy: MUST NOT be newly allocated, SHOULD NOT be used by new implementations, and receivers MUST NOT assume a meaning (except `-32002`).
- `-32020` to `-32099` are reserved for the specification. Defined: `-32020` `HeaderMismatch`, `-32021` `MissingRequiredClientCapability`, `-32022` `UnsupportedProtocolVersion`. Implementations MUST NOT emit undefined codes from this range.
- Do not emit `-32002` (resource not found up to 2025-11-25, now `-32602`) or `-32042` (URL elicitation required, 2025-11-25 only).
- Application errors SHOULD use codes outside `-32768` to `-32000`.

## Statelessness and `_meta`

MCP 2026-07-28 is stateless: each request carries everything needed to process it (Base Protocol, Statelessness).

- Servers MUST NOT rely on prior requests on the same connection for capabilities, version or identity.
- State spanning requests MUST be referenced by an explicit identifier the client passes on each request. An open stdio process is not a session.
- Servers SHOULD NOT require the same connection or process for related operations.

Per-request fields in `params._meta` (Base Protocol, General fields: `_meta`):

| Key                                          | Required | Notes                                                       |
| -------------------------------------------- | -------- | ----------------------------------------------------------- |
| `io.modelcontextprotocol/protocolVersion`    | Yes      | For example `"2026-07-28"`.                                 |
| `io.modelcontextprotocol/clientCapabilities` | Yes      | Capabilities relevant to this request.                      |
| `io.modelcontextprotocol/clientInfo`         | No       | Clients SHOULD send it on every request.                    |
| `io.modelcontextprotocol/logLevel`           | No       | Opts the request into `notifications/message` (deprecated). |
| `progressToken`                              | No       | Opts the request into `notifications/progress`.             |

- A request missing a required field is malformed: reject with `-32602`, and on HTTP with `400 Bad Request`.
- If a request needs a capability the client did not declare, return `MissingRequiredClientCapabilityError` (`-32021`) with `data.requiredCapabilities`; on HTTP, `400`.
- Servers SHOULD put `io.modelcontextprotocol/serverInfo` in every result's `_meta`. `clientInfo` and `serverInfo` are self-reported: SHOULD NOT change behaviour or drive security decisions.
- Notifications on a `subscriptions/listen` stream MUST carry `io.modelcontextprotocol/subscriptionId`.
- `traceparent`, `tracestate` and `baggage` are reserved for OpenTelemetry and MUST follow W3C Trace Context and W3C Baggage.
- Key names: optional dot-separated prefix ending in `/` (reverse DNS recommended), then a name that begins and ends with an alphanumeric. A prefix whose second label is `modelcontextprotocol` or `mcp` is reserved for MCP.

## Versioning and discovery

- Every request declares its version; there is no handshake (Versioning and Compatibility).
- A server that does not implement the requested version MUST return `UnsupportedProtocolVersionError` (`-32022`) with `data.supported` and `data.requested`. The client SHOULD retry with a mutually supported version or surface an error.
- Servers MUST implement `server/discover`. The result has `supportedVersions`, `capabilities`, optional `instructions`, `serverInfo` in `_meta`, and caching hints. Clients MAY call it first; it is not required (Discovery).
- Capabilities: servers advertise in `server/discover`; clients declare in each request's `_meta`. Implemented server features must be advertised (Architecture, Capability Negotiation).
- Extensions are negotiated in `capabilities.extensions`; see [`extensions-and-registry.md`](extensions-and-registry.md).

### Detecting legacy peers (dual-era clients)

- **stdio**: send `server/discover` first with the preferred modern version. A `DiscoverResult` means modern; a recognized modern error such as `UnsupportedProtocolVersionError` means modern with other versions (do not fall back); any other error or a timeout means legacy, so fall back to `initialize`. The fallback MUST NOT be keyed to one error code (stdio, Backward Compatibility). Probing is RECOMMENDED even for modern-only clients.
- **Streamable HTTP**: send a modern request. On `400`, inspect the body: a recognized modern JSON-RPC error means modern; an empty or unrecognized body means fall back to `initialize` (Streamable HTTP, Backward Compatibility). On `400`, `404` or `405` without a modern error body, a client MAY also try the 2024-11-05 HTTP+SSE GET (Streamable HTTP, HTTP+SSE Transport (2024-11-05)).
- Cache the era per server process (stdio) or origin (HTTP); re-probe if it later fails (Versioning and Compatibility).

## stdio

From the stdio page:

- The client launches the server as a subprocess. The server reads from `stdin` and writes to `stdout`; one JSON-RPC message per line, delimited by newlines, with no embedded newlines.
- The server MUST NOT write anything to `stdout` that is not a valid MCP message; the client MUST NOT write anything else to `stdin`. The server MAY log UTF-8 to `stderr`, and the client SHOULD NOT treat `stderr` output as an error.
- The server MUST NOT write JSON-RPC requests. Notifications on `stdout` relate to an in-flight request or to an active `subscriptions/listen`; clients MUST correlate the latter by `subscriptionId`.
- Cancellation: the client MUST send `notifications/cancelled` with the request ID.
- Shutdown: close the server's `stdin`, wait, then force termination (`SIGTERM` then `SIGKILL` on POSIX; `TerminateProcess` or Job Objects on Windows). Servers SHOULD exit promptly on end-of-file.
- If the server exits unexpectedly the client SHOULD restart it; in-flight requests are lost and subscriptions must be re-sent.
- Custom transports over a reliable byte stream (Unix sockets, TCP) SHOULD reuse this framing (Transports, Custom Transports).

## Streamable HTTP

From the Streamable HTTP page (2026-07-28):

**Endpoint and security.** One MCP endpoint path that accepts POST. Servers MUST validate `Origin` on every connection and answer an invalid one with 403. Local servers SHOULD bind to `127.0.0.1`, not `0.0.0.0`. Servers SHOULD authenticate every connection; for HTTP authorization, use the `mcp-authorization` skill.

**Sending.** Every client message is a new POST. The client MUST send `Accept` listing `application/json` and `text/event-stream`, the request metadata headers, and a body that is a single request or notification, never a response. A notification gets `202 Accepted` with no body, or an HTTP error. A request gets `Content-Type: application/json` or `text/event-stream`; clients MUST support both.

**Receiving on SSE.** The stream is scoped to the request: the server MAY send related notifications (progress, log messages) before the final response, MUST NOT send JSON-RPC requests, and the response SHOULD end the stream. Servers SHOULD send `X-Accel-Buffering: no`, and may send `:` comment lines as keep-alives on long streams. `Last-Event-ID` resumption is not supported.

**Cancellation.** Closing the response stream is cancellation; the server MUST treat it so, SHOULD stop work, and MUST NOT send further messages for that request.

**Headers.**

| Header                 | Value                                    | Required for                                  |
| ---------------------- | ---------------------------------------- | --------------------------------------------- |
| `MCP-Protocol-Version` | Same as `_meta` `protocolVersion`        | Every POST                                    |
| `Mcp-Method`           | `method`                                 | Every request                                 |
| `Mcp-Name`             | `params.name` or `params.uri`            | `tools/call`, `resources/read`, `prompts/get` |
| `Mcp-Param-{Name}`     | Tool argument marked with `x-mcp-header` | `tools/call` when the argument has a value    |

- Header names are compared case-insensitively; values are case-sensitive.
- Values that are not plain visible ASCII (non-ASCII, control characters, leading or trailing whitespace), and values that match the sentinel pattern, MUST be sent as `=?base64?{Base64 of UTF-8}?=`. Servers MUST decode before comparing.
- Servers that read the body MUST reject a missing required header, a header that does not match the body, or invalid characters with `400` and `HeaderMismatch` (`-32020`). Compare integers numerically. Intermediaries return an HTTP error and need not return JSON-RPC.
- Intermediaries that enforce policy on mirrored headers SHOULD reject requests whose version predates header validation.
- Unsupported version: `400` with `UnsupportedProtocolVersionError`. Unknown method: `404` with `-32601`.
- Clients MUST support `x-mcp-header`: reject (exclude from the tool list) any tool whose annotation breaks the rules (empty, not an RFC 9110 token, not unique case-insensitively, not on a string, integer or boolean, not reachable through `properties` only). Omit the header when the argument is absent or `null`. On `HeaderMismatch`, SHOULD re-list tools and retry.

**Older traffic.** A 2026-07-28-only server SHOULD answer GET or DELETE with `405`, and ignore `Mcp-Session-Id` and `Last-Event-ID` (Streamable HTTP, Earlier Streamable HTTP Revisions).

## Message patterns

### Request and response

The server answers each request with a result or error, optionally preceded by notifications scoped to it (Message Patterns, Request and Response).

### Multi round-trip requests

Covered for servers in [`server-features.md`](server-features.md) and for clients in [`client-features.md`](client-features.md).

### Subscriptions

From the Subscriptions page:

- `subscriptions/listen` with `params.notifications`: `toolsListChanged`, `promptsListChanged`, `resourcesListChanged` (booleans) and `resourceSubscriptions` (URIs). The server MUST NOT send types the client did not request.
- The first message MUST be `notifications/subscriptions/acknowledged`, listing the subset the server honours; no notification for that subscription may precede it. The client SHOULD compare it with what it asked for.
- The subscription ID is the JSON-RPC `id` of the listen request, carried in `_meta` on every notification.
- `notifications/progress` and `notifications/message` never go on the listen stream (Key Changes, Major 4).
- Ending: the client closes the stream (HTTP) or sends `notifications/cancelled` (stdio). A server ending it SHOULD send a `resultType: "complete"` response to the listen request first; an end without one is an unexpected disconnect the client MAY reconnect after. After a stdio reconnect the client MUST re-send `subscriptions/listen`.

### Cancellation

From the Cancellation page:

- `notifications/cancelled` carries `requestId` and an optional `reason`. It MUST only reference requests the client issued and believes are in progress.
- Servers SHOULD stop work, free resources and not respond; they MAY ignore unknown or finished requests. Clients SHOULD ignore a late response. Both sides MUST handle the race gracefully, and invalid cancellations SHOULD be ignored.
- Servers MUST NOT send `notifications/cancelled` except for a `subscriptions/listen` they tear down.
- Implementations SHOULD set timeouts on every request, cancel on timeout, and enforce a maximum even if progress resets the clock.

### Progress

From the Progress page: `progressToken` in `_meta` is a string or integer unique across active requests. `notifications/progress` carries the token, `progress`, optional `total` and `message`. `progress` MUST increase with each notification; values MAY be floats. Notifications MUST reference only active requests and MUST stop after completion. Both sides SHOULD rate limit.

## Legacy handshake (MCP 2025-11-25 and MCP 2025-06-18)

For a named peer on a supported legacy line, from the 2025-11-25 Lifecycle and Transports pages:

- Initialization MUST be the first interaction. The client sends `initialize` with `protocolVersion`, `capabilities` and `clientInfo`; the server answers with its version, capabilities, `serverInfo` and optional `instructions`; the client then MUST send `notifications/initialized`. The client SHOULD NOT send requests other than `ping` before the `initialize` response, and the server SHOULD NOT send requests other than `ping` and logging before `notifications/initialized`.
- Version negotiation: the client sends its latest version; the server MUST echo it if supported, otherwise send another version it supports. The client SHOULD disconnect if it does not support the reply.
- On HTTP, clients MUST send `MCP-Protocol-Version` with the negotiated version on later requests; a server with no header and no other signal SHOULD assume 2025-03-26, and MUST answer an invalid version with `400`.
- Sessions: a server MAY assign `MCP-Session-Id` on the `InitializeResult` response (visible ASCII, cryptographically secure). Clients MUST echo it; a `404` for a session means start a new `initialize`; clients SHOULD DELETE the session when done.
- Servers MAY send JSON-RPC requests (sampling, elicitation, roots) on SSE streams, and clients MAY open a GET SSE stream. Clients SHOULD cancel with `notifications/cancelled`, because a disconnect is not a cancellation in these revisions.
- 2025-11-25 SSE streams support polling: the server MAY close the connection and the client reconnects, respecting `retry`; resumption uses `Last-Event-ID` on GET.
