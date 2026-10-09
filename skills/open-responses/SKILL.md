---
name: open-responses
description: >-
  Open Responses: build, call or test a multi-provider LLM API that follows the Open Responses
  specification, the open, vendor-neutral spec based on the OpenAI Responses API, at release
  2026-04-24 (current), with 2026-01-15 still supported. Use when implementing a server, router,
  proxy or client for POST /v1/responses: items (message, function_call, function_call_output,
  reasoning, item_reference, compaction), the agentic tool loop, tools, tool_choice and allowed_tools,
  previous_response_id, truncation, service_tier, the error object, semantic streaming events over
  server-sent events (response.created, response.output_item.added, response.output_text.delta,
  response.completed, [DONE]), WebSocket mode with response.create, previous_response_not_found and
  the 60-minute limit, POST /v1/responses/compact, assistant phase, slug-prefixed extension items,
  tools and events, and the compliance test suite. Triggers: Open Responses, openresponses.org,
  Responses API compatible, OpenResponses compliance.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Open Responses

Open Responses is an open, vendor-neutral specification for large language model APIs, based on the OpenAI Responses API, published at openresponses.org with dated releases of a specification, an API reference and an OpenAPI document. It defines a shared schema, semantic streaming events and extensible tooling so clients and providers interoperate. With this skill the agent implements or reviews an Open Responses server, router or client, and checks it against the compliance suite.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. "Spec" is the 2026-04-24 specification and "Reference" its API reference; section names are their headings. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: server (provider or self-hosted model), router or proxy in front of several providers, or client.
- Transports: HTTP JSON, HTTP streaming over server-sent events, and optionally WebSocket mode.
- Tools: developer functions only, or also hosted tools and implementor extension types.
- Target version: Open Responses 2026-04-24 (default). Open Responses 2026-01-15 is supported: valid for peers that have not adopted WebSocket mode, compaction or `phase`. No preview exists. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources), check the changelog and `public/openapi/` in the repository for a newer dated release, and update the pins.

## Invariants

1. **JSON in, JSON or SSE out.** Clients send `application/json` bodies with `Authorization` and `Content-Type`; non-streaming servers return only `application/json`; streaming servers return `text/event-stream` (Spec § HTTP Requests, § HTTP Responses).
2. **SSE framing.** Each `event:` field matches the `type` in its JSON `data`, `id` SHOULD NOT be used, and the stream ends with the literal `[DONE]` (Spec § HTTP Responses).
3. **Items are typed, addressable state machines.** Every item has `id`, `type` and `status`; `in_progress`, `incomplete` and `completed` are the base states; an `incomplete` item is the last item and makes the response `incomplete`; a `completed` item never changes again (Spec § Items are state machines, § Extending Items).
4. **Stream items in lifecycle order.** `response.output_item.added` first, with every non-nullable field set; streamed content inside `response.content_part.added` … `response.<type>.delta` … `response.<type>.done` … `response.content_part.done`; then `response.output_item.done` (Spec § Items are streamable).
5. **Errors are structured and fail the stream.** Error objects carry `type`, optional `code`, `param` and `message`; an error while streaming is followed by `response.failed` (Spec § Errors).
6. **`previous_response_id` means `previous.input + previous.output + input`,** in that semantic order, even under truncation or compaction (Spec § previous_response_id).
7. **`allowed_tools` is a hard limit.** Calls to tools outside it are rejected or suppressed by the server, never executed (Spec § allowed_tools).
8. **`truncation: "disabled"` never drops input;** an oversized context fails with an error instead (Spec § truncation; Reference § TruncationEnum).
9. **WebSocket mode is sequential.** Each turn starts with `response.create`, no `stream`, `stream_options` or `background`; one in-flight response per connection; same events as SSE; `store: false` continuation only from connection-local state, else `previous_response_not_found` (Spec § WebSocket Transport, § WebSocket Continuation).
10. **Extensions are slug-prefixed and ignorable.** Custom items, hosted tools and streaming events use `slug:name`; extended events carry `type` and `sequence_number` and never change core semantics; clients tolerate unknown types (Spec § Items are extensible, § Extending Open Responses).

## Workflow

1. **Pick the version.** Target 2026-04-24; keep 2026-01-15 behavior working for peers that do not send WebSocket, compaction or `phase`.
   -> [`references/versions.md`](references/versions.md)
   ✓ The implementation states which dated OpenAPI document it validates against.
2. **Model the request and response.** `model`, `input` (string or items), `instructions`, `tools`, `tool_choice`, `previous_response_id`, `store`, `truncation`, `reasoning`, `text`, sampling and limits; the `response` object with `status`, `output`, `usage`, `error` and `incomplete_details` (Reference § Request Parameters, § Response Parameters).
   -> [`references/api.md`](references/api.md)
   ✓ A non-streaming response validates against `ResponseResource` in the pinned OpenAPI document.
3. **Run the agentic loop.** Emit `function_call` items for developer tools and accept `function_call_output` with the matching `call_id`; execute hosted tools in-provider; honor `tool_choice` and `allowed_tools` (Spec § Agentic Loop, § Tools, § tool_choice, § allowed_tools).
   -> [`references/api.md`](references/api.md)
   ✓ A tool round trip with `previous_response_id` and only the new items reproduces the full-context result.
4. **Stream.** Emit state machine events (`response.created`, `response.in_progress`, `response.completed`, `response.failed`, `response.incomplete`) and delta events in item and content-part order over SSE, ending with `[DONE]` (Spec § Streaming, § Items are streamable).
   -> [`references/streaming.md`](references/streaming.md)
   ✓ `sequence_number` increases monotonically and every added item and part is closed.
5. **Add WebSocket mode and compaction** (only if offered). `response.create` turns, connection-local continuation, cache eviction on failure, the 60-minute limit, error envelopes, and `POST /v1/responses/compact` (Spec § WebSocket Transport to § WebSocket Errors; Reference § Compaction Endpoint).
   -> [`references/streaming.md`](references/streaming.md)
   ✓ After compaction, a new WebSocket response starts without `previous_response_id`.
6. **Extend without breaking portability.** Prefix custom items, tools and events with your slug, give hosted tools their own item type, and keep extra fields optional (Spec § Extending Open Responses).
   -> [`references/extensions-and-compliance.md`](references/extensions-and-compliance.md)
   ✓ A client that ignores every slug-prefixed type still reconstructs the canonical response.
7. **Run the compliance suite.** The browser tests at openresponses.org/compliance and the CLI tests for WebSocket (Compliance).
   -> [`references/extensions-and-compliance.md`](references/extensions-and-compliance.md)
   ✓ All browser-runnable tests pass, and the WebSocket CLI tests pass when WebSocket mode is offered.
8. **Upgrade** (only when asked). Move a 2026-01-15 implementation to 2026-04-24.
   -> [`references/versions.md`](references/versions.md)
   ✓ The 2026-04-24 compliance tests pass and 2026-01-15 requests still succeed.

## Verify before done

- [ ] Request bodies are JSON; non-streaming responses are `application/json`; streams are `text/event-stream` ending in `[DONE]` with `event` equal to `type` (Spec § HTTP Requests, § HTTP Responses).
- [ ] Every item has `id`, `type` and `status`, and every streamed item and content part is opened and closed in order (Spec § Items).
- [ ] Every streaming error is followed by `response.failed` (Spec § Errors).
- [ ] `allowed_tools` and `truncation: "disabled"` are enforced, not advisory (Spec § allowed_tools, § truncation).
- [ ] WebSocket turns are sequential, reject HTTP-only fields, and return `previous_response_not_found` and `websocket_connection_limit_reached` as error envelopes (Spec § WebSocket Transport to § WebSocket Errors).
- [ ] Non-standard types are slug-prefixed and clients ignore unknown ones (Spec § Extending Open Responses).
- [ ] The compliance suite passes against the deployed base URL (Compliance).

## Reference index

- **`references/versions.md`**: the 2026-04-24 and 2026-01-15 releases, what changed, and the upgrade checklist. Load for steps 1 and 8.
- **`references/api.md`**: endpoints, request and response fields, items, content, reasoning, tools, `tool_choice`, `allowed_tools`, `previous_response_id`, `truncation`, `service_tier`, errors and the compaction endpoint. Load for steps 2 and 3.
- **`references/streaming.md`**: SSE framing, the full event list, item and content-part ordering, and WebSocket mode with continuation, compaction, reconnects and errors. Load for steps 4 and 5.
- **`references/extensions-and-compliance.md`**: extended items, hosted tools, extended events and fields, and the compliance tests and CLI. Load for steps 6 and 7.

## Related skills

- `server-sent-events` for the `text/event-stream` format the streaming transport uses: `npx skills add ScaleDockHQ/scaledock-skills --skill server-sent-events`.
- `websocket` for the RFC 6455 protocol under WebSocket mode: `npx skills add ScaleDockHQ/scaledock-skills --skill websocket`.
- `openapi` for the dated OpenAPI documents the compliance suite validates against: `npx skills add ScaleDockHQ/scaledock-skills --skill openapi`.
- `json-schema` for function tool `parameters`: `npx skills add ScaleDockHQ/scaledock-skills --skill json-schema`.
- `mcp` for Model Context Protocol servers as externally hosted tools: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp`.
- `opentelemetry-genai` for tracing model calls made through the API: `npx skills add ScaleDockHQ/scaledock-skills --skill opentelemetry-genai`.
- `ag-ui` for streaming agent events on to a user interface: `npx skills add ScaleDockHQ/scaledock-skills --skill ag-ui`.

## Sources

Status uses the publisher's own maturity term. Checked is the date the source was last read.

- [Open Responses Specification 2026-04-24](https://www.openresponses.org/specification/2026-04-24): Released (dated specification), 2026-04-24, checked 2026-10-09.
- [Open Responses API Reference 2026-04-24](https://www.openresponses.org/reference/2026-04-24): Released (dated reference), 2026-04-24, checked 2026-10-09.
- [Open Responses OpenAPI 2026-04-24](https://www.openresponses.org/openapi/2026-04-24/openapi.json): Released (immutable dated OpenAPI 3.1 document), info.version 2026-04-24, checked 2026-10-09.
- [Open Responses Acceptance Tests](https://www.openresponses.org/compliance): Compliance suite, 10 browser and 7 CLI tests as of 2026-04-24, checked 2026-10-09.
- [Open Responses Changelog](https://github.com/openresponses/openresponses/blob/main/CHANGELOG.md): Changelog, latest entry 2026-04-24, checked 2026-10-09.
- [openresponses/openresponses](https://github.com/openresponses/openresponses): Repository (TypeSpec source, dated OpenAPI releases, compliance CLI), main as of 2026-10-09, checked 2026-10-09.
- [Open Responses Specification 2026-01-15](https://www.openresponses.org/specification/2026-01-15): Released (dated specification), 2026-01-15, checked 2026-10-09.
- [Open Responses OpenAPI 2026-01-15](https://www.openresponses.org/openapi/2026-01-15/openapi.json): Released (immutable dated OpenAPI 3.1 document), info.version 2026-01-15, checked 2026-10-09.
