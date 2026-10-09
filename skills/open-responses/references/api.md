# Open Responses API: requests, items, tools and errors

Read this when shaping requests and responses, items, the tool loop or errors. "Spec" is the 2026-04-24 specification, "Reference" the 2026-04-24 API reference, and "OpenAPI" the 2026-04-24 OpenAPI document, all in [Sources](../SKILL.md#sources). For streaming and WebSocket mode, see `streaming.md`.

## Endpoints

| Method and path              | Purpose                                                           | Since      |
| ---------------------------- | ----------------------------------------------------------------- | ---------- |
| `POST /v1/responses`         | Create a response, JSON or streamed; also the WebSocket resource  | 2026-01-15 |
| `POST /v1/responses/compact` | Return a compacted input window (`object: "response.compaction"`) | 2026-04-24 |

The OpenAPI paths are `/responses` and `/responses/compact` relative to a base URL ending in `/v1` (OpenAPI `servers`, `paths`).

## HTTP

From Spec § HTTP Requests and § HTTP Responses:

- Requests carry `Authorization` (identifies the developer) and `Content-Type`. Clients MUST send `application/json` bodies. The Reference also lists `application/x-www-form-urlencoded` as accepted, so a server may accept it, but a client sends JSON.
- Non-streaming responses MUST be `application/json` only. Streaming responses MUST be `text/event-stream` (see `streaming.md`).

## Request body

From Reference § Request Parameters:

| Field                                                                                                                  | Notes                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `model`                                                                                                                | Model ID.                                                                                          |
| `input`                                                                                                                | A string (one user message) or an array of items.                                                  |
| `instructions`                                                                                                         | Extra system or developer instructions for this request.                                           |
| `previous_response_id`                                                                                                 | Continue from a prior response (below).                                                            |
| `tools`, `tool_choice`, `parallel_tool_calls`, `max_tool_calls`                                                        | Tool definitions and control (below).                                                              |
| `stream`, `stream_options` (`include_obfuscation`), `background`                                                       | Transport behavior; not allowed on WebSocket.                                                      |
| `store`                                                                                                                | Whether to store the response for later retrieval or continuation.                                 |
| `include`                                                                                                              | `reasoning.encrypted_content`, `message.output_text.logprobs`.                                     |
| `reasoning`                                                                                                            | `effort` (`none`, `low`, `medium`, `high`, `xhigh`) and `summary` (`concise`, `detailed`, `auto`). |
| `text`                                                                                                                 | `format` and `verbosity` (`low`, `medium`, `high`).                                                |
| `temperature` (0 to 2), `top_p` (0 to 1), `presence_penalty`, `frequency_penalty`, `top_logprobs`, `max_output_tokens` | Sampling and limits.                                                                               |
| `truncation`                                                                                                           | `auto` or `disabled` (below).                                                                      |
| `service_tier`                                                                                                         | `auto`, `default`, `flex`, `priority` (below).                                                     |
| `metadata`                                                                                                             | Up to 16 key-value pairs; keys up to 64 characters, values up to 512.                              |
| `safety_identifier`, `prompt_cache_key`                                                                                | Abuse monitoring identifier and prompt cache key.                                                  |

## Response object

From Reference § Response Parameters: `id`, `object: "response"`, `created_at`, `completed_at`, `status`, `incomplete_details` (`reason`), `model`, `previous_response_id`, `instructions`, `output` (items), `error`, `tools`, `tool_choice`, `truncation`, `parallel_tool_calls`, `text`, sampling values, `reasoning`, `usage`, `max_output_tokens`, `max_tool_calls`, `store`, `background`, `service_tier`, `metadata`, `prompt_cache_key`. All are required keys in the schema; nullable ones are `null` when not applicable.

Responses are state machines: `queued` → `in_progress` → `completed`, `failed` or `incomplete` (Spec § State machines, § Streaming).

## Items

From Spec § Items and Reference § ItemParam, § ItemField:

- Items are the unit of context, used as both input and output, discriminated by `type`.
- Input items: `message` with `role` `user`, `system`, `developer` or `assistant`; `function_call`; `function_call_output`; `reasoning`; `item_reference` (`id` of an earlier item); `compaction` (`encrypted_content` from the compact endpoint).
- Output items: `message`, `function_call`, `function_call_output`, `reasoning`, `compaction`.
- Required on every item: `id` (unique enough to reference unambiguously), `type`, `status` (Spec § Extending Items, Required item fields).
- Item statuses: `in_progress` (being sampled), `incomplete` (token budget exhausted; terminal; MUST be the last item, and the response MUST be `incomplete`), `completed` (terminal; no further updates) (Spec § Items are state machines). For `function_call_output` all three are allowed, but developers should send `completed` (Reference § FunctionCallOutputStatusEnum).
- Assistant `phase` (2026-04-24): `commentary` or `final_answer` on assistant messages; when sending history back, preserve and resend it on every assistant message; never on user messages (Reference § AssistantMessageItemParam).

### Content

From Spec § Content and Reference:

- User content: `input_text`, `input_image` (`image_url`, `detail` `low`/`high`/`auto`), `input_file` (`filename`, `file_data` or `file_url`); a user message may also be a plain string (OpenAPI `UserMessageItemParam`).
- Model content: `output_text` (with `annotations`, optional `logprobs` since 2026-04-24) and `refusal`. Clients can assume a model message contains `output_text`.

### Reasoning

From Spec § Reasoning: a `reasoning` item may carry `content` (raw trace, optional), `encrypted_content` (opaque, round-trippable; clients never inspect it) and `summary` (`summary_text` parts safe to show users). All three are optional; providers choose which to support. Request `reasoning.encrypted_content` in `include` to rehydrate it on a later request.

## Agentic loop and tools

From Spec § Agentic Loop, § Tools and § The Agentic loop:

- The model samples; if it calls a tool, the tool runs and its result is fed back; the loop repeats until the model stops; the server returns the output items.
- Externally hosted tools (developer `function` tools; MCP servers) run outside the provider. For functions, control returns to the developer: the response contains a `function_call` item (`call_id`, `name`, JSON-string `arguments`), and the developer sends a `function_call_output` item (`call_id`, `output`) in the next request.
- Internally hosted tools run inside the provider without yielding control, and stream their results back.
- A function tool is `{ "type": "function", "name", "description", "parameters" (JSON Schema), "strict" }` (Reference § FunctionToolParam).

### tool_choice and allowed_tools

From Spec § tool_choice and § allowed_tools:

- `"auto"` (default): call tools or answer. `"required"`: MUST call at least one tool. `"none"`: MUST NOT call tools. `{ "type": "function", "name": "fn" }`: must call that function.
- `{ "type": "allowed_tools", "tools": [...] }` keeps the full `tools` list in context (for caching) but restricts what may be called. Servers MUST enforce it: a call outside the list MUST be rejected or suppressed (treated as a model error, turned into a direct reply, or a provider fallback). Using it as a routing hint MUST NOT weaken enforcement.

## previous_response_id

From Spec § previous_response_id: the server MUST load the prior response's input and output and sample over `previous_response.input + previous_response.output + input`. Providers MAY truncate or compact but MUST keep that semantic order. Send only the new items (tool outputs, the next user message).

## truncation and service_tier

From Spec § truncation, § service_tier and Reference § TruncationEnum:

- `auto`: the server MAY drop earlier context to fit, SHOULD keep system messages and recent turns.
- `disabled`: the server MUST NOT truncate; an oversized context MUST fail (the Reference says with a 400 error).
- `service_tier` is a priority hint; servers SHOULD document the tiers they support and what each implies.

## Errors

From Spec § Errors and § Error Types:

```json
{
  "error": {
    "message": "The requested model 'fake-model' does not exist.",
    "type": "invalid_request_error",
    "param": "model",
    "code": "model_not_found"
  }
}
```

| `type`              | Status | Meaning                                          |
| ------------------- | ------ | ------------------------------------------------ |
| `server_error`      | 500    | Internal failure; retrying later may succeed.    |
| `invalid_request`   | 400    | Malformed or unsupported request; fix and retry. |
| `not_found`         | 404    | Resource or ID does not exist.                   |
| `model_error`       | 500    | The model failed on a valid request.             |
| `too_many_requests` | 429    | Rate limited; back off and retry.                |

The spec's own example uses `invalid_request_error` while the table says `invalid_request`; accept both when parsing. Errors during streaming are emitted as events and followed by `response.failed`.

## Compaction endpoint

From Reference § Compaction Endpoint (added 2026-04-24) and Spec § WebSocket Compaction:

- Request: `model` (required), `input`, `previous_response_id`, `instructions`, `prompt_cache_key`. A request without `model` is rejected (Compliance, Compaction Missing Required Model).
- Response: `id`, `object: "response.compaction"`, `output` (the compacted items, including `compaction` items with `encrypted_content`), `created_at`, `usage`.
- The result is a compacted input window, not a response ID: start the next response from `output` plus the newest user or tool items, without `previous_response_id`.
