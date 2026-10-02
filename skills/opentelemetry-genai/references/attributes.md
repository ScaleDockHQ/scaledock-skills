# GenAI attributes and content capture

Sources: the Gen AI attribute registry and the Generative client AI spans doc, at commit `b31e9e8`. All `gen_ai.*` attributes have Development status. `error.type`, `server.address` and `server.port` come from the core semantic conventions and are Stable.

## Well-known values

For `gen_ai.operation.name`, `gen_ai.provider.name`, `gen_ai.output.type` and `gen_ai.token.modality`: if a well-known value applies, it must be used; otherwise a custom value may be used (registry).

| Attribute               | Well-known values                                                                                                                                                                                                                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gen_ai.operation.name` | `chat`, `create_agent`, `create_memory`, `create_memory_store`, `delete_memory`, `delete_memory_store`, `embeddings`, `execute_tool`, `fetch_response`, `generate_content`, `invoke_agent`, `invoke_workflow`, `plan`, `retrieval`, `search_memory`, `text_completion`, `update_memory`, `upsert_memory` |
| `gen_ai.provider.name`  | `anthropic`, `aws.bedrock`, `azure.ai.inference`, `azure.ai.openai`, `cohere`, `deepseek`, `gcp.gemini`, `gcp.gen_ai`, `gcp.vertex_ai`, `groq`, `ibm.watsonx.ai`, `mistral_ai`, `moonshot_ai`, `openai`, `perplexity`, `x_ai`                                                                            |
| `gen_ai.output.type`    | `image`, `json`, `speech`, `text`                                                                                                                                                                                                                                                                        |
| `gen_ai.token.modality` | `audio`, `image`, `text`, `unknown`                                                                                                                                                                                                                                                                      |

`gcp.gemini` is for the `generativelanguage.googleapis.com` endpoint, `gcp.vertex_ai` for `aiplatform.googleapis.com`, and `gcp.gen_ai` when the backend is unknown.

## Attribute groups

| Group      | Attributes                                                                                                                                                                                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Operation  | `gen_ai.operation.name`, `gen_ai.provider.name`, `gen_ai.output.type`, `gen_ai.conversation.id`, `gen_ai.conversation.compacted`                                                                                                                                |
| Request    | `gen_ai.request.model`, `max_tokens`, `temperature`, `top_p`, `top_k`, `frequency_penalty`, `presence_penalty`, `stop_sequences`, `seed`, `choice.count`, `stream`, `reasoning.level`, `previous_response.id`, `encoding_formats` (all under `gen_ai.request.`) |
| Response   | `gen_ai.response.id`, `gen_ai.response.model`, `gen_ai.response.finish_reasons`, `gen_ai.response.time_to_first_chunk`                                                                                                                                          |
| Usage      | `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`, `gen_ai.usage.cache_read.input_tokens`, `gen_ai.usage.cache_write.input_tokens`, `gen_ai.usage.reasoning.output_tokens`, and per-modality `gen_ai.usage.{text,image,audio}.*`                        |
| Agent      | `gen_ai.agent.id`, `gen_ai.agent.name`, `gen_ai.agent.description`, `gen_ai.agent.version`, `gen_ai.main_agent.*`, `gen_ai.workflow.name`                                                                                                                       |
| Tool       | `gen_ai.tool.name`, `gen_ai.tool.call.id`, `gen_ai.tool.description`, `gen_ai.tool.type`, `gen_ai.tool.definitions`, `gen_ai.tool.call.arguments`, `gen_ai.tool.call.result`                                                                                    |
| Prompt     | `gen_ai.prompt.name`, `gen_ai.prompt.version`, `gen_ai.prompt.variable.<key>`                                                                                                                                                                                   |
| Content    | `gen_ai.system_instructions`, `gen_ai.input.messages`, `gen_ai.output.messages`                                                                                                                                                                                 |
| Data       | `gen_ai.data_source.id`, `gen_ai.embeddings.dimension.count`, `gen_ai.retrieval.*`, `gen_ai.memory.*`                                                                                                                                                           |
| Skills     | `gen_ai.skill.name`, `gen_ai.skill.description`, `gen_ai.skill.resource.name`, `gen_ai.skill.source.uri`                                                                                                                                                        |
| Evaluation | `gen_ai.evaluation.name`, `gen_ai.evaluation.score.value`, `gen_ai.evaluation.score.label`, `gen_ai.evaluation.explanation`                                                                                                                                     |

Check the registry for each attribute's type and notes before use; the table only groups names.

## Content capture

Instructions, user messages and model outputs are sensitive and often large. Instrumentations should not capture them by default, and should provide an opt-in (spans, Full (buffered) content). Three patterns:

1. **Default: do not record** instructions, inputs or outputs.
2. **Record on the span** with `gen_ai.system_instructions`, `gen_ai.input.messages` and `gen_ai.output.messages`. Suited to manageable volume where privacy rules do not apply or the storage complies with them, for example pre-production.
3. **Store externally and record references.** Recommended in production when volume is a concern or sensitive data must be handled securely, because external storage allows separate access controls.

Rules for pattern 2:

- The messages follow the input and output JSON schemas in the repository (`model/gen-ai/gen-ai-input-messages.json`, `gen-ai-output-messages.json`).
- If a language cannot yet record structured attributes on spans, serialize the value to a JSON string on the span, and record the structured form on events.
- An instrumentation may offer truncation of individual message contents that preserves the JSON structure.

Rules for pattern 3:

- Instrumentations may support an in-process upload hook. It runs independently of the content opt-in flags and regardless of the sampling decision, receives the objects before JSON serialization plus the span, and may modify them.
- If attributes are also recorded, record them after the hook, with any modifications it made.
- The spec has a TODO for a common way to record references to external content; until it lands, document your own reference attribute.

## Message shape

```json
[
  {
    "role": "user",
    "parts": [{ "type": "text", "content": "Weather in Paris?" }]
  },
  {
    "role": "assistant",
    "parts": [
      {
        "type": "tool_call",
        "id": "call_VSPygqKTWdrhaFErNvMV18Yl",
        "name": "get_weather",
        "arguments": { "location": "Paris" }
      }
    ]
  },
  {
    "role": "tool",
    "parts": [
      {
        "type": "tool_call_response",
        "id": "call_VSPygqKTWdrhaFErNvMV18Yl",
        "response": "rainy, 57°F"
      }
    ]
  }
]
```

This is the `gen_ai.input.messages` example from the spans doc.

## TypeScript: build inference attributes

```ts
type Attributes = Record<string, string | number | boolean | string[]>;

type InferenceCall = {
  operation: "chat" | "generate_content" | "text_completion";
  provider: string;
  model?: string;
  serverAddress?: string;
  serverPort?: number;
  maxTokens?: number;
  temperature?: number;
};

type InferenceResult = {
  id?: string;
  model?: string;
  finishReasons?: string[];
  inputTokens?: number;
  outputTokens?: number;
};

export function spanName(call: InferenceCall): string {
  return call.model ? `${call.operation} ${call.model}` : call.operation;
}

export function requestAttributes(call: InferenceCall): Attributes {
  const attrs: Attributes = {
    "gen_ai.operation.name": call.operation,
    "gen_ai.provider.name": call.provider,
  };
  if (call.model) attrs["gen_ai.request.model"] = call.model;
  if (call.maxTokens !== undefined)
    attrs["gen_ai.request.max_tokens"] = call.maxTokens;
  if (call.temperature !== undefined)
    attrs["gen_ai.request.temperature"] = call.temperature;
  if (call.serverAddress) {
    attrs["server.address"] = call.serverAddress;
    if (call.serverPort !== undefined) attrs["server.port"] = call.serverPort;
  }
  return attrs;
}

export function responseAttributes(result: InferenceResult): Attributes {
  const attrs: Attributes = {};
  if (result.id) attrs["gen_ai.response.id"] = result.id;
  if (result.model) attrs["gen_ai.response.model"] = result.model;
  if (result.finishReasons)
    attrs["gen_ai.response.finish_reasons"] = result.finishReasons;
  if (result.inputTokens !== undefined)
    attrs["gen_ai.usage.input_tokens"] = result.inputTokens;
  if (result.outputTokens !== undefined)
    attrs["gen_ai.usage.output_tokens"] = result.outputTokens;
  return attrs;
}
```

Start the span with `spanName(call)`, kind `CLIENT` and `requestAttributes(call)`; add `responseAttributes(result)` before ending it. On failure set `error.type` and end the span.
