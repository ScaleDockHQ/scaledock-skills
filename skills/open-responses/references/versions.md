# Versions and upgrades

Read this when choosing which Open Responses release to target, reading a peer on an older release, or upgrading. Sources: the dated specifications, reference and OpenAPI documents, the changelog and the repository, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id           | Line                      | Status    | Revision                                        | Posture | Summary                                                                   |
| ------------ | ------------------------- | --------- | ----------------------------------------------- | ------- | ------------------------------------------------------------------------- |
| `2026-04-24` | Open Responses 2026-04-24 | current   | Specification, reference and OpenAPI 2026-04-24 |         | Adds WebSocket mode, the compaction endpoint and assistant `phase`.       |
| `2026-01-15` | Open Responses 2026-01-15 | supported | Specification, reference and OpenAPI 2026-01-15 |         | The launch release: schema, semantic streaming, items, tools, extensions. |

Statuses: **current** is the default target; **supported** is released and still valid when a peer needs it. No legacy line and no preview exist: the repository's `public/openapi/` holds only the two dated releases, the undated `openapi.json` on `main` equals 2026-04-24, and the changelog has no unreleased entry (checked 2026-10-09).

Open Responses versions by release date. Dated releases in `public/openapi/<YYYY-MM-DD>/` are immutable, and a new release is cut by updating the version in the TypeSpec source (Repository README § Generating the schema). Each release has a matching `/specification/<date>` and `/reference/<date>` page.

## Which version to use

- Target 2026-04-24 for new servers and clients.
- 2026-04-24 is additive over 2026-01-15: the OpenAPI document adds six schemas (`CompactResource`, `CompactResponseMethodPublicBody`, `CompactionBody`, `CompactionSummaryItemParam`, `WebSocketErrorEvent`, `WebSocketResponseCreateEvent`) and removes none. A 2026-01-15 client works against a 2026-04-24 server, unless it requires `logprobs` on output text, which became optional.
- Keep accepting 2026-01-15 requests: do not require `phase`, and treat `logprobs` as optional on output text.
- When refreshing, check the changelog and `public/openapi/` for a new dated folder; a new date is a new version line.

## What changed

### 2026-04-24

From the changelog and the 2026-04-24 specification and reference:

- WebSocket transport for `/v1/responses`: turns start with `response.create`, and servers reuse the HTTP streaming events (Spec § WebSocket Transport).
- Sequential turns, `previous_response_id` continuation, connection-local state for `store: false`, reconnect recovery, the 60-minute limit, and structured error events (Spec § WebSocket Continuation to § WebSocket Errors).
- `POST /v1/responses/compact` with its request and response schemas, and the rule for continuing over WebSocket after compaction (Reference § Compaction Endpoint; Spec § WebSocket Compaction).
- Optional assistant-message `phase`: `commentary` or `final_answer` (Reference § AssistantMessageItemParam).
- `logprobs` optional in output-text objects and streaming events.
- `createResponse` operation ID corrected and the `ResponseResource` example completed.

### 2026-01-15

From the changelog: the launch release, with the shared schema, semantic streaming events, item lifecycle rules and extensible tooling.

## Upgrading

### 2026-01-15 to 2026-04-24

Server:

1. Accept `phase` on assistant input messages and, if the model produces it, emit it on output assistant messages; never on user messages.
2. Allow `logprobs` to be absent on `output_text` and on text streaming events; `include: ["message.output_text.logprobs"]` is how a client asks for them (Reference § IncludeEnum).
3. Optionally add `POST /v1/responses/compact`: require `model`, return `object: "response.compaction"` with compacted `output` and `usage`, and accept `compaction` items as input.
4. Optionally add WebSocket mode at `/v1/responses`: `response.create` turns, sequential processing, the same events, connection-local `store: false` state, eviction after failed continuations, the 60-minute limit and the error envelope.
5. Re-run the compliance suite, including the CLI WebSocket tests if WebSocket mode is offered.

Client:

1. Preserve and resend `phase` on every assistant message in history.
2. Treat `logprobs` as optional.
3. For long sessions, use `/v1/responses/compact` and start a new chain from its output.
4. On WebSocket, handle `previous_response_not_found` and `websocket_connection_limit_reached` by restarting with full or compacted context.

## Preview

None. When refreshing, a dated folder in `public/openapi/` without a matching changelog entry, or an "unreleased" changelog section, would be a preview: record it with an `-preview` id and a posture.
