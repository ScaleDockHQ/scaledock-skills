# Versions and upgrades

Read this when choosing which MCP revision to build to, reading a server or client written for an older revision, upgrading one, picking an extension or `server.json` version, or checking the draft. Sources: the MCP Versioning page, the Key Changes (changelog) page and Deprecated Features page of each revision, the draft changelog, the Tasks and Skills extension repositories, and the registry `server.json` changelog, listed in [Sources](../SKILL.md#sources). MCP pages have no stable section numbers, so citations name the revision, the page and the heading.

## Version lines

MCP versions are date strings. The revision marked Current may still receive backwards-compatible changes; past revisions are Final and do not change (Versioning, Revisions). The Versioning page names 2026-07-28 as Current.

| Id                       | Line                               | Status    | Revision                                            | Posture | Summary                                                                                                                       |
| ------------------------ | ---------------------------------- | --------- | --------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `draft-preview`          | MCP draft                          | preview   | `/specification/draft`, checked 2026-10-05          | track   | The next revision in progress. Its changelog is empty; its text differs from 2026-07-28 only editorially.                     |
| `2026-07-28`             | MCP 2026-07-28                     | current   | 2026-07-28 (Current)                                |         | Stateless: no `initialize`, no sessions, per-request `_meta`, `server/discover`, MRTR, `subscriptions/listen`, caching hints. |
| `2025-11-25`             | MCP 2025-11-25                     | supported | 2025-11-25 (Final)                                  |         | Last handshake-based revision: icons, URL-mode elicitation, sampling with tools, experimental core tasks.                     |
| `2025-06-18`             | MCP 2025-06-18                     | supported | 2025-06-18 (Final)                                  |         | No batching, structured tool output, elicitation, resource links, `title`, `MCP-Protocol-Version` header.                     |
| `2025-03-26`             | MCP 2025-03-26                     | legacy    | 2025-03-26 (Final)                                  |         | Streamable HTTP replaces HTTP+SSE; JSON-RPC batching; tool annotations; audio content; `completions` capability.              |
| `2024-11-05`             | MCP 2024-11-05                     | legacy    | 2024-11-05 (Final)                                  |         | First revision: stdio and the HTTP+SSE transport (two endpoints and an `endpoint` event).                                     |
| `tasks-2026-07-28`       | MCP Tasks extension 2026-07-28     | current   | ext-tasks `specification/2026-07-28` (Stable)       |         | `io.modelcontextprotocol/tasks`: durable task handles for `tools/call`, polled with `tasks/get`.                              |
| `skills-stable`          | Skills over MCP extension (stable) | current   | ext-skills `specification/stable`, SEP-2640 (Final) |         | `io.modelcontextprotocol/skills`: serve Agent Skills as resources with `skills/list` and `skills/get`.                        |
| `server-json-2025-12-11` | server.json 2025-12-11             | current   | schema 2025-12-11, registry release v1.8.1          |         | The MCP Registry `server.json` format, with remote URL template variables.                                                    |

The last three rows are separately versioned families: `tasks` (the Tasks extension), `skills` (the Skills extension) and `registry` (the `server.json` format). Each has exactly one current line. Extensions evolve independently of the core protocol and are disabled by default (Extensions Overview, Evolution and SDK Implementation).

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The Versioning page calls 2026-07-28 and later **modern** (version, identity and capabilities per request) and 2025-11-25 and earlier **legacy** (an `initialize` handshake). An implementation that supports both is **dual-era** (2026-07-28 Versioning and Compatibility, Terminology). "Legacy" in that sense covers the supported 2025-11-25 and 2025-06-18 lines too; the status column above is this skill's authoring status.

## Which version to use

- Build new servers and clients to MCP 2026-07-28, with its schema (`LATEST_PROTOCOL_VERSION = "2026-07-28"`).
- Keep MCP 2025-11-25 or MCP 2025-06-18 behaviour only for a named peer that still speaks it. A dual-era server MAY serve both eras on one endpoint: requests with modern `_meta` are served statelessly, and an `initialize` request selects legacy semantics for that stdio process or HTTP session (2026-07-28 Versioning and Compatibility, Backward Compatibility with Initialization-Based Versions).
- A modern-only server SHOULD name its supported versions in the error it returns to `initialize`, because legacy clients cannot fall forward (same section).
- Treat MCP 2025-03-26 and MCP 2024-11-05 as input to an upgrade. A server that must still accept requests without `MCP-Protocol-Version` MAY treat them as 2025-03-26; otherwise it MUST reject them (2026-07-28 Streamable HTTP, Protocol Version Header).
- Use the Tasks extension at its 2026-07-28 spec, the Skills extension at its stable spec, and `server.json` at `$schema` `https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json`.
- Follow the draft only to see what is coming. Its posture is **track**: emit nothing from it.

## What changed

### MCP draft

The draft changelog says "Changes since the most recent release will accumulate here" and lists none. Compared with 2026-07-28 the draft only rewords text: the `x-mcp-header` integer range is phrased as IEEE 754 safe integers, the `Icon.mimeType` description is reworded, and client registration examples use `[::1]` and `127.0.0.1` loopback redirect URIs. Its schema still declares `LATEST_PROTOCOL_VERSION = "2026-07-28"`.

### MCP 2026-07-28

From the 2026-07-28 Key Changes page:

- **No sessions** (Major 1, SEP-2567): `Mcp-Session-Id` is gone; list results no longer vary per connection; cross-call state uses server-minted handles passed as tool arguments.
- **Stateless requests** (Major 2, SEP-2575): no `initialize` or `notifications/initialized`. Every request carries `io.modelcontextprotocol/protocolVersion` and `io.modelcontextprotocol/clientCapabilities` in `_meta`; clients SHOULD send `clientInfo`, servers SHOULD send `serverInfo` in result `_meta`; mismatches return `UnsupportedProtocolVersionError`.
- **`server/discover`** (Major 3): servers MUST implement it; clients MAY call it first, and dual-era stdio clients use it as a probe.
- **`subscriptions/listen`** (Major 4) replaces the HTTP GET stream and `resources/subscribe`/`resources/unsubscribe`.
- **Removed** (Major 5): `ping`, `logging/setLevel` (now `io.modelcontextprotocol/logLevel` per request) and `notifications/roots/list_changed`.
- **Tasks leave the core** (Major 6, SEP-2663) for the `io.modelcontextprotocol/tasks` extension, which polls with `tasks/get`, adds `tasks/update`, and drops `tasks/result` and `tasks/list`.
- **Multi Round-Trip Requests** (Major 7, SEP-2322): servers no longer send `sampling/createMessage`, `elicitation/create` or `roots/list` requests; they return `InputRequiredResult` and the client retries with `inputResponses`.
- **`resultType`** is required on every result (Major 8); clients MUST treat a missing one from older servers as `"complete"`.
- **No SSE resumability** (Major 9): no `Last-Event-ID` or event IDs; a broken stream loses the request, and clients MUST re-issue it with a new ID.
- Minor: `extensions` in capabilities; OpenTelemetry `traceparent`, `tracestate`, `baggage` in `_meta`; deterministic `tools/list` order; required `Mcp-Method` and `Mcp-Name` headers and `x-mcp-header` parameter headers (SEP-2243); required `ttlMs` and `cacheScope` on cacheable results (SEP-2549); resource not found moves from `-32002` to `-32602`; `iss` validation, `application_type` and issuer-bound credentials in authorization; any JSON Schema 2020-12 keyword in `inputSchema` and `outputSchema`, any JSON value in `structuredContent`, `$ref` rules (SEP-2106); URL elicitation loses `elicitationId` and `notifications/elicitation/complete`; error code partition with `HeaderMismatch` `-32020`, `MissingRequiredClientCapability` `-32021`, `UnsupportedProtocolVersion` `-32022`.
- Deprecated (eligible for removal in the first revision on or after 2027-07-28): Roots, Sampling and Logging (SEP-2577); Dynamic Client Registration. The HTTP+SSE transport and `includeContext: "thisServer"`/`"allServers"` are reclassified as Deprecated (SEP-2596) (Deprecated Features).

### MCP 2025-11-25

From the 2025-11-25 Key Changes page: icons on tools, resources, resource templates and prompts (SEP-973); tool name guidance (SEP-986); titled, untitled, single- and multi-select enums in elicitation (SEP-1330) and defaults for all primitive types (SEP-1034); URL mode elicitation (SEP-1036); `tools` and `toolChoice` in sampling (SEP-1577); experimental tasks in the core (SEP-1686); optional `description` on `Implementation`; HTTP 403 for an invalid `Origin`; input validation errors as tool execution errors (SEP-1303); SSE polling where servers may disconnect and clients reconnect, honouring `retry` (SEP-1699); JSON Schema 2020-12 as the default dialect (SEP-1613). Authorization changes are in the `mcp-authorization` skill.

### MCP 2025-06-18

From the 2025-06-18 Key Changes page: JSON-RPC batching removed (PR #416); structured tool output (PR #371); elicitation (PR #382); resource links in tool results (PR #603); `MCP-Protocol-Version` header required on HTTP requests after initialization (PR #548); lifecycle operation rules raised from SHOULD to MUST; `_meta` on more types; `context` in completion requests (PR #598); `title` for display names so `name` is the programmatic identifier (PR #663); a Security Best Practices page. The MCP server becomes an OAuth resource server (see `mcp-authorization`).

### MCP 2025-03-26

From the 2025-03-26 Key Changes page: an OAuth 2.1 authorization framework (PR #133); Streamable HTTP replaces HTTP+SSE (PR #206); JSON-RPC batching (PR #228); tool annotations such as read-only and destructive (PR #185); `message` on progress notifications; audio content; the `completions` capability.

### MCP 2024-11-05

The first revision. Transports are stdio and HTTP with SSE: the server provides an SSE endpoint and a POST endpoint, and MUST send an `endpoint` event with the URI the client POSTs to (2024-11-05 Transports, HTTP with SSE). No authorization specification.

### Extension and registry families

- **Tasks extension 2026-07-28**: Stable schema in ext-tasks (README, Schemas); the `draft` spec differs only in a link. It replaces the 2025-11-25 core tasks: `tools/call` is the only supported method, `resultType: "task"` marks a `CreateTaskResult`, there is no `tasks/list` and no `tasks/result` (Tasks, Supported Methods, Polymorphic Results, Security Considerations).
- **Skills extension (stable)**: written against base revision 2026-07-28 or later (Skills, Protocol Revision); SEP-2640 Final, merged 2026-09-13 (ext-skills README). Changes land in a draft revision through the decision log.
- **server.json 2025-12-11**: adds `{curly_brace}` URL template variables with a `variables` map on remotes (PR #570). The unreleased draft also accepts a URL that starts with a template variable, such as `{baseUrl}/mcp`, and adds `cargo` with `https://crates.io` (server.json CHANGELOG, Draft; draft `server.schema.json`). Earlier schema versions are 2025-10-17 (optional `version` on MCPB packages), 2025-10-11 (`version` optional for OCI and MCPB, `fileSha256` required for MCPB), 2025-09-29 (registry-managed `status` and `io.modelcontextprotocol.registry/official` removed from `server.json`), 2025-09-16 (field names from snake_case to camelCase) and 2025-07-09 (server.json CHANGELOG).

## Upgrading

### MCP 2025-11-25 to MCP 2026-07-28

1. Change the version marker: put `io.modelcontextprotocol/protocolVersion: "2026-07-28"` and `io.modelcontextprotocol/clientCapabilities` in every request's `_meta`, and on HTTP send `MCP-Protocol-Version: 2026-07-28` with the same value (Key Changes, Major 2; Streamable HTTP, Protocol Version Header).
2. Replace removed or renamed behaviour:
   - Drop `initialize`, `notifications/initialized` and `ping`. Servers implement `server/discover` and advertise capabilities there (Major 2, 3, 5).
   - Servers: stop minting `Mcp-Session-Id`; answer GET and DELETE on the MCP endpoint with 405; ignore `Mcp-Session-Id` and `Last-Event-ID` (Streamable HTTP, Earlier Streamable HTTP Revisions). Move per-connection state to explicit handles bound to the authenticated user (Tools, Stateful Tools; Security Best Practices, State Handle Hijacking).
   - Servers: replace every server-initiated `sampling/createMessage`, `elicitation/create` and `roots/list` with an `InputRequiredResult` on `tools/call`, `prompts/get` or `resources/read`, and integrity-protect `requestState` (MRTR). Clients: fulfil `inputRequests` and retry with a new JSON-RPC `id`, echoing `requestState`.
   - Replace the GET stream, `resources/subscribe` and `resources/unsubscribe` with `subscriptions/listen` (Major 4).
   - Replace `logging/setLevel` with `io.modelcontextprotocol/logLevel` per request, and emit `notifications/message` only on that request's stream (Logging, Per-request log level).
   - Add `resultType: "complete"` to every result, and `ttlMs` and `cacheScope` to `server/discover`, list and `resources/read` results (Major 8; Caching, Cacheable Results).
   - HTTP clients: send `Mcp-Method` on every POST and `Mcp-Name` on `tools/call`, `resources/read` and `prompts/get`, and mirror `x-mcp-header` parameters (Streamable HTTP, Standard Request Headers).
   - On stdio, cancel with `notifications/cancelled`; on HTTP, close the response stream instead (Cancellation, Transport-Specific Cancellation).
   - Return `-32602` for an unknown resource instead of `-32002`, and stop emitting `-32042` (Base Protocol, Error Codes).
   - URL elicitation: drop `elicitationId` and `notifications/elicitation/complete`; learn the outcome on the retried request (Key Changes, Minor 11).
   - Core tasks: move to the Tasks extension (see the Tasks upgrade below).
   - Plan to leave Roots, Sampling and Logging, which are Deprecated (Deprecated Features).
3. Validate against the target: messages validate against `schema/2026-07-28/schema.ts`, and the Verify list in `SKILL.md` passes.
4. Keep behaviour unchanged: the same tools, resources and prompts are reachable with the same results. If 2025-11-25 clients remain, keep a dual-era server that still answers `initialize`.

### MCP 2025-06-18 to MCP 2025-11-25

1. Change the version marker: negotiate `2025-11-25` in `initialize` and send it in `MCP-Protocol-Version`.
2. Replace removed or renamed behaviour:
   - Return input validation failures as tool execution errors (`isError: true`), not protocol errors (Key Changes, Minor 5).
   - Answer an invalid `Origin` with HTTP 403 (Minor 3).
   - Elicitation: use the standards-based `EnumSchema` (`oneOf`/`anyOf` with `const` and `title`) and defaults (Major 5; Minor 9).
   - Clients: tolerate servers closing SSE streams early and reconnect, honouring `retry` (Minor 6, 7).
   - Treat schemas without `$schema` as JSON Schema 2020-12 (Minor 10).
3. Validate against `schema/2025-11-25/schema.ts`.
4. Keep behaviour unchanged: new features (icons, URL elicitation, sampling tools, tasks) are optional; add them only when needed.

### MCP 2025-03-26 to MCP 2025-06-18

1. Change the version marker: negotiate `2025-06-18` and send `MCP-Protocol-Version` on every later HTTP request (Key Changes, Major 8).
2. Replace removed or renamed behaviour:
   - Stop sending and accepting JSON-RPC batches (arrays) (Major 1).
   - Add `title` for display and keep `name` as the identifier (Other schema changes 3).
   - Respect the negotiated protocol version and use only negotiated capabilities, now MUST (Major 9).
   - Optionally add `outputSchema` with `structuredContent`, resource links and elicitation.
3. Validate against `schema/2025-06-18/schema.ts`.
4. Keep behaviour unchanged: a batch that used to run several calls becomes several separate requests with the same results.

### MCP 2024-11-05 to MCP 2025-03-26

1. Change the version marker: negotiate `2025-03-26` in `initialize`.
2. Replace removed or renamed behaviour:
   - Move from HTTP+SSE (SSE endpoint, POST endpoint, `endpoint` event) to one Streamable HTTP MCP endpoint (Key Changes, Major 2). Servers that still serve old clients keep both until they are gone (2026-07-28 Streamable HTTP, HTTP+SSE Transport (2024-11-05)).
   - Declare `completions` if the server answers `completion/complete` (Other schema changes).
   - Optionally add tool annotations, audio content and progress `message`.
3. Validate against `schema/2025-03-26/schema.ts`.
4. Keep behaviour unchanged: the same tools and resources answer the same way over the new transport.

### MCP 2025-03-26 or MCP 2024-11-05 to MCP 2026-07-28

Apply the checklists above in order. The steps that change the most are the transport move (2025-03-26), the end of batching (2025-06-18), and the stateless rewrite with MRTR, `subscriptions/listen` and caching hints (2026-07-28). Validate against the 2026-07-28 Verify list in `SKILL.md`.

### Core tasks (MCP 2025-11-25) to the Tasks extension 2026-07-28

1. Declare `io.modelcontextprotocol/tasks` in `capabilities.extensions` (client per request, server in `server/discover`) instead of the core `tasks` capability (Tasks, Capability Negotiation).
2. Stop sending a `task` field on requests: the server alone decides per request whether to return `CreateTaskResult` with `resultType: "task"`.
3. Replace `tasks/result` with polling `tasks/get` until a terminal status; send client input with `tasks/update`; drop `tasks/list`; cancel with `tasks/cancel`, never `notifications/cancelled` (Tasks, Task Polling, Task Update Requests, Task Cancellation).
4. On HTTP, set `Mcp-Name` to `params.taskId` on `tasks/get`, `tasks/update` and `tasks/cancel` (Tasks, Streamable HTTP: Routing Headers).
5. Keep behaviour unchanged: a client may still drive the polling internally and surface only the final result (Tasks, Backwards Compatibility).

### server.json from an older schema to 2025-12-11

1. Change `$schema` to `https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json`.
2. Replace removed or renamed fields, by the version you start from (server.json CHANGELOG):
   - Before 2025-09-16: rename every snake_case field to camelCase.
   - Before 2025-09-29: remove `status` and `_meta["io.modelcontextprotocol.registry/official"]`; the registry manages them.
   - Before 2025-10-11: OCI packages carry the version in `identifier` and may drop `version`; MCPB packages need `fileSha256`.
   - From 2025-10-11 on: no field changes; the 2025-10-17 and 2025-12-11 entries say existing servers keep working. Use `variables` only when a remote URL needs templating.
3. Validate against the 2025-12-11 schema, and against the official registry requirements if publishing there.
4. Keep behaviour unchanged: clients install the same package or reach the same remote URL.

## Preview: MCP draft

The draft lives at `/specification/draft` with its schema at `schema/draft/schema.ts`. Posture: **track**. As of 2026-10-05 its changelog lists no changes and its normative text matches 2026-07-28, so there is nothing new to build. Never send `draft` as a protocol version. Watch the draft changelog, the Deprecated Features page (Roots, Sampling, Logging and Dynamic Client Registration become eligible for removal in the first revision on or after 2027-07-28) and the extension repositories' `draft` folders. When the draft ships as a dated revision: add it as current, make 2026-07-28 supported, reconsider whether 2025-06-18 stays supported, and add an upgrade section.
