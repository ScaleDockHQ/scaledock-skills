# Open Responses streaming and WebSocket mode

Read this when streaming responses over server-sent events or offering WebSocket mode. "Spec" is the 2026-04-24 specification, "Reference" its API reference, and "OpenAPI" the 2026-04-24 OpenAPI document, all in [Sources](../SKILL.md#sources).

## SSE framing

From Spec § HTTP Responses (Streaming HTTP Responses):

- Set `stream: true`. The server MUST answer `Content-Type: text/event-stream` with each data object JSON-encoded.
- The `event` field MUST equal the `type` in the body; servers SHOULD NOT use `id`.
- The terminal event MUST be the literal string `[DONE]`.

```text
event: response.output_text.delta
data: {"type":"response.output_text.delta","sequence_number":10,"item_id":"msg_07...","output_index":0,"content_index":0,"delta":" a"}
```

`sequence_number` orders events; `output_index`, `item_id` and `content_index` locate the item and content part.

## Two kinds of events

From Spec § Semantic events and § Streaming: every event is either

- a **state machine event**, a status change of the response: `response.queued`, `response.created`, `response.in_progress`, `response.completed`, `response.failed`, `response.incomplete`; or
- a **delta event**, a change to an object since its last update: items and parts added, text appended, parts and items done.

Events defined in the OpenAPI document (2026-04-24, unchanged from 2026-01-15 apart from the WebSocket messages):

| Group          | Events                                                                                                                                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Response       | `response.queued`, `response.created`, `response.in_progress`, `response.completed`, `response.failed`, `response.incomplete`                                                                                           |
| Items          | `response.output_item.added`, `response.output_item.done`                                                                                                                                                               |
| Content parts  | `response.content_part.added`, `response.content_part.done`                                                                                                                                                             |
| Text           | `response.output_text.delta`, `response.output_text.done`, `response.output_text.annotation.added`                                                                                                                      |
| Refusal        | `response.refusal.delta`, `response.refusal.done`                                                                                                                                                                       |
| Function calls | `response.function_call_arguments.delta`, `response.function_call_arguments.done`                                                                                                                                       |
| Reasoning      | `response.reasoning.delta`, `response.reasoning.done`, `response.reasoning_summary_part.added`, `response.reasoning_summary_part.done`, `response.reasoning_summary_text.delta`, `response.reasoning_summary_text.done` |
| Errors         | `error`                                                                                                                                                                                                                 |

## Item and content-part order

From Spec § Items are streamable:

1. `response.output_item.added` first, echoing the item with as much detail as is known (at least `role` for a message, `name` for a `function_call`); every non-nullable field has a value, using zero values where needed.
2. For streamable content, `response.content_part.added`, then any number of `response.<content_type>.delta`, then `response.<content_type>.done`, then `response.content_part.done`. An item MAY have several content parts.
3. `response.output_item.done` with the final item.

All streamable objects follow this added, delta, done pattern (Spec § Streaming, Delta Events). An error during streaming is followed by `response.failed` (Spec § Errors).

## WebSocket mode (2026-04-24)

From Spec § WebSocket Transport and Reference § WebSocket Mode:

- Servers MAY expose `/v1/responses` over a persistent WebSocket. It is a transport, not a new object model.
- Clients MUST start each turn with `{ "type": "response.create", ... }` carrying the normal create body, without `stream`, `stream_options` or `background`.
- Servers MUST send the same streaming event objects as SSE; ordering, `sequence_number`, item and part lifecycles and terminal events mean the same.
- One in-flight response per connection: servers MAY accept several `response.create` messages but MUST process them sequentially and MUST NOT multiplex; clients that need parallel runs SHOULD open more connections.

### Continuation

From Spec § WebSocket Continuation:

- Same `previous_response_id` semantics as HTTP; a follow-up SHOULD send only new items plus `previous_response_id`.
- Servers SHOULD keep the latest response state in connection-local memory, which lets `store: false` and zero-data-retention deployments continue on the same socket.
- With `store: true`, servers MAY hydrate older IDs from storage. With `store: false` and no connection-local state, the server MUST fail the turn with `previous_response_not_found`.
- If a continuation fails with a 4xx or 5xx error, the server MUST evict that `previous_response_id` from the connection cache; later attempts to continue from it on that connection MUST fail with `previous_response_not_found`.

### Compaction over WebSocket

From Spec § WebSocket Compaction: `/responses/compact` returns a compacted input window, not a response ID. Clients MUST then start a new response with `previous_response_id` omitted or `null`, using the compacted output as base input plus the latest user or tool items.

### Reconnects

From Spec § WebSocket Reconnects:

- Connections are limited to 60 minutes; at the limit the server MUST return an error with code `websocket_connection_limit_reached`, and clients SHOULD open a new connection.
- Recovery: with `store: true` and a valid ID, continue with `previous_response_id` and new items; otherwise (`store: false`, zero data retention, `previous_response_not_found`) start a new response with the full context, or with the compacted window plus the latest items.

### Errors

From Spec § WebSocket Errors and Reference § WebSocket Mode, Error Message:

```json
{
  "type": "error",
  "status": 400,
  "error": {
    "code": "previous_response_not_found",
    "message": "Previous response with id 'resp_abc' not found.",
    "param": "previous_response_id"
  }
}
```

Failures MUST use this envelope with `status` and `error.code`. Clients SHOULD handle at least `previous_response_not_found` and `websocket_connection_limit_reached`.
