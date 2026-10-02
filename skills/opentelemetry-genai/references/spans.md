# GenAI spans

Sources: Generative client AI spans, GenAI agent and framework spans, and the MCP semantic conventions, all at commit `b31e9e8`. Every span here has Development status.

A GenAI span represents a logical operation as observed by the caller. It covers the operation from initiation until the response is fully received, or until it ends in an error or cancellation, including automatic retries (spans, Spans).

## Span types

| Span                      | `gen_ai.operation.name`                                       | Span name                                                            | Span kind                                          |
| ------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------- |
| Inference                 | `chat`, `generate_content`, `text_completion`                 | `{gen_ai.operation.name} {gen_ai.request.model}`                     | `CLIENT`; `INTERNAL` allowed for in-process models |
| Embeddings                | `embeddings`                                                  | `{gen_ai.operation.name} {gen_ai.request.model}`                     | `CLIENT`                                           |
| Retrieval                 | `retrieval`                                                   | `{gen_ai.operation.name} {gen_ai.data_source.id}`                    | `CLIENT`                                           |
| Fetch response            | `fetch_response`                                              | See the spans doc                                                    | `CLIENT`                                           |
| Memory                    | `create_memory`, `search_memory`, and the other memory values | See the spans doc                                                    | `CLIENT`; `INTERNAL` allowed in-process            |
| Execute tool              | `execute_tool`                                                | `execute_tool {gen_ai.tool.name}`                                    | `INTERNAL`                                         |
| Create agent              | `create_agent`                                                | `create_agent {gen_ai.agent.name}`                                   | `CLIENT`                                           |
| Invoke agent (remote)     | `invoke_agent`                                                | `invoke_agent {gen_ai.agent.name}`, or `invoke_agent` without a name | `CLIENT`                                           |
| Invoke agent (in process) | `invoke_agent`                                                | as above                                                             | `INTERNAL`                                         |
| Invoke workflow           | `invoke_workflow`                                             | `invoke_workflow {gen_ai.workflow.name}`                             | `INTERNAL`                                         |
| Plan                      | `plan`                                                        | `plan {gen_ai.agent.name}`, or `plan`                                | `INTERNAL`                                         |

The spans doc recommends `CLIENT` for inference when the model usually runs in another process or the call goes over an instrumented protocol such as HTTP. System-specific conventions may define other span names but must follow the general span-name guidelines.

## Inference span

Required: `gen_ai.operation.name`, `gen_ai.provider.name`.

Conditionally Required:

- `error.type` if the operation ended in an error;
- `gen_ai.request.model` if available;
- `gen_ai.conversation.id` if and only if the library has one readily available or the application provides one;
- `gen_ai.output.type` for the requested content type, such as `text`, `json` or `image`;
- `gen_ai.prompt.name` and `gen_ai.prompt.version` when a named prompt template is used;
- `gen_ai.request.choice.count` if in the request and not 1; `gen_ai.request.seed` if the request has one; `gen_ai.request.stream` and `gen_ai.request.top_k` when they apply;
- `server.port` if `server.address` is set.

Recommended: request parameters (`gen_ai.request.max_tokens`, `temperature`, `top_p`, `frequency_penalty`, `presence_penalty`, `stop_sequences`, `reasoning.level`), response fields (`gen_ai.response.id`, `gen_ai.response.model`, `gen_ai.response.finish_reasons`, `gen_ai.response.time_to_first_chunk` for streaming), usage counts (`gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens` and the cache, reasoning and modality breakdowns), and `server.address`.

Opt-In: `gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions`, `gen_ai.tool.definitions`, `gen_ai.prompt.variable.<key>`.

## Embeddings span

Required: `gen_ai.operation.name`, `gen_ai.provider.name`. Conditionally Required: `error.type`, `gen_ai.request.model`, `server.port`. Recommended: `gen_ai.embeddings.dimension.count`, `gen_ai.request.encoding_formats`, `gen_ai.response.model`, `gen_ai.usage.input_tokens`, `server.address`.

## Execute tool span

- Instrumentations that can instrument tool calls should, unless another instrumentation reliably covers all tool types. Application developers are encouraged to instrument their own tool calls manually.
- Required: `gen_ai.operation.name` (`execute_tool`) and `gen_ai.tool.name`.
- Conditionally Required: `error.type`, `gen_ai.agent.name` when applicable, `gen_ai.conversation.id` if available.
- Recommended: `gen_ai.tool.call.id`, `gen_ai.tool.description`, `gen_ai.tool.type` (for example `function`, `extension`, `datastore`).
- Opt-In: `gen_ai.tool.call.arguments`, `gen_ai.tool.call.result`.
- Specialized tools such as agent skills get the applicable refinement in the agent spans doc (load skill, read skill resource, command execution). Do not record two spans for one call.

## Agent spans

- **Create agent** (`CLIENT`): agent creation, usually on remote agent services. Required: `gen_ai.operation.name`, `gen_ai.provider.name`. Conditionally Required: `gen_ai.agent.id`, `gen_ai.agent.name`, `gen_ai.agent.description`, `gen_ai.agent.version` when provided, `gen_ai.request.model`, `error.type`, `server.port`.
- **Invoke agent client** (`CLIENT`): an agent invoked over a remote service, for example a hosted assistants or agents API. Required: `gen_ai.operation.name`, `gen_ai.provider.name`. Conditionally Required includes the agent ID, name, description and version, `gen_ai.conversation.id` and `gen_ai.data_source.id`.
- **Invoke agent internal** (`INTERNAL`): an agent running in the same process, for example a framework agent. Required: `gen_ai.operation.name`.
- **Invoke workflow** (`INTERNAL`): a user-facing entry point that coordinates several agents or GenAI calls, such as a graph or orchestrator. Not reported for a standalone agent invocation, or when the workflow is an internal detail of another operation.

## MCP spans

- Client spans are `CLIENT` and server spans are `SERVER`. The name is `{mcp.method.name} {target}`, or `{mcp.method.name}` when no low-cardinality target exists.
- `mcp.method.name` is Required. `gen_ai.tool.name` is Conditionally Required when the operation concerns a tool, and `gen_ai.prompt.name` when it concerns a prompt.
- Set `gen_ai.operation.name` to `execute_tool` only when the operation is a tool call. MCP tool-call spans are compatible with `execute_tool` spans; if an outer GenAI instrumentation already traces the tool execution, the MCP instrumentation adds its attributes to that span instead of creating another.
- Metrics: `mcp.client.operation.duration`, `mcp.server.operation.duration`, `mcp.client.session.duration`, `mcp.server.session.duration`.

## Example: inference span as data

```json
{
  "name": "chat gpt-4",
  "kind": "CLIENT",
  "attributes": {
    "gen_ai.operation.name": "chat",
    "gen_ai.provider.name": "openai",
    "gen_ai.request.model": "gpt-4",
    "gen_ai.request.max_tokens": 200,
    "gen_ai.request.temperature": 0.0,
    "gen_ai.response.id": "chatcmpl-123",
    "gen_ai.response.model": "gpt-4-0613",
    "gen_ai.response.finish_reasons": ["stop"],
    "gen_ai.usage.input_tokens": 100,
    "gen_ai.usage.output_tokens": 180,
    "server.address": "api.openai.com",
    "server.port": 443
  }
}
```

The values come from the example columns of the spans doc; the server address is illustrative.
