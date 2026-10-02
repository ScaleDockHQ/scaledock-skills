# GenAI metrics and events

Sources: Generative AI metrics, Generative AI inference token metrics, Generative AI events and Generative AI exceptions, at commit `b31e9e8`. All have Development status.

## Client operation metrics

| Metric                                          | Instrument | Unit | Advised buckets                                                                        |
| ----------------------------------------------- | ---------- | ---- | -------------------------------------------------------------------------------------- |
| `gen_ai.client.operation.duration`              | Histogram  | `s`  | 0.01, 0.02, 0.04, 0.08, 0.16, 0.32, 0.64, 1.28, 2.56, 5.12, 10.24, 20.48, 40.96, 81.92 |
| `gen_ai.client.operation.time_to_first_chunk`   | Histogram  | `s`  | same as above                                                                          |
| `gen_ai.client.operation.time_per_output_chunk` | Histogram  | `s`  | same as above                                                                          |

`gen_ai.client.operation.duration` attributes: Required `gen_ai.operation.name`; Conditionally Required `error.type`, `gen_ai.provider.name`, `gen_ai.request.model` and `server.port`; Recommended `gen_ai.response.model` and `server.address`.

## Token metrics

| Metric                                                   | Instrument | Unit      | Use                                                 |
| -------------------------------------------------------- | ---------- | --------- | --------------------------------------------------- |
| `gen_ai.client.inference.usage.input_tokens`             | Counter    | `{token}` | Input tokens, including cached tokens               |
| `gen_ai.client.inference.usage.output_tokens`            | Counter    | `{token}` | Output tokens, including reasoning tokens           |
| `gen_ai.client.inference.usage.cache_read.input_tokens`  | Counter    | `{token}` | Subset of input tokens served from a provider cache |
| `gen_ai.client.inference.usage.cache_write.input_tokens` | Counter    | `{token}` | Subset of input tokens written to a provider cache  |
| `gen_ai.client.inference.usage.reasoning.output_tokens`  | Counter    | `{token}` | Subset of output tokens used for reasoning          |
| `gen_ai.client.inference.operation.input_tokens`         | Histogram  | `{token}` | Per-operation distribution only                     |
| `gen_ai.client.inference.operation.output_tokens`        | Histogram  | `{token}` | Per-operation distribution only                     |

Rules (token metrics, Inference token metrics):

- The usage counters are the primary instruments for consumption and cost approximation. Each is broken down by `gen_ai.token.modality`, which is Required on them, alongside `gen_ai.operation.name` and `gen_ai.provider.name`.
- The `cache_read`, `cache_write` and `reasoning` counters are subsets of the input and output counters; do not add them to the totals.
- The per-operation histograms are for percentiles and outliers, never for totals or cost. They are deliberately not broken down by modality, because percentiles across modalities do not add up. Advised buckets: 1, 4, 16, 64, 256, 1024, 4096, 16384, 65536, 262144, 1048576, 4194304, 16777216, 67108864.
- Report a token metric when the operation uses tokens and the count is readily available. When a system reports both used and billable tokens, report billable tokens.

## Server, agent, workflow and tool metrics

| Metric                                | Instrument | Unit               |
| ------------------------------------- | ---------- | ------------------ |
| `gen_ai.server.request.duration`      | Histogram  | `s`                |
| `gen_ai.server.time_per_output_token` | Histogram  | `s`                |
| `gen_ai.server.time_to_first_token`   | Histogram  | `s`                |
| `gen_ai.invoke_workflow.duration`     | Histogram  | `s`                |
| `gen_ai.invoke_agent.duration`        | Histogram  | `s`                |
| `gen_ai.invoke_agent.inference_calls` | Histogram  | `{inference_call}` |
| `gen_ai.invoke_agent.tool_calls`      | Histogram  | `{tool_call}`      |
| `gen_ai.execute_tool.duration`        | Histogram  | `s`                |

Server metrics are for model servers. `gen_ai.invoke_agent.duration` measures one in-process agent invocation end to end. Each metric has its own advised buckets in the metrics doc; read them there before configuring views.

## Events

| Event                                       | Requirement | Purpose                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gen_ai.client.inference.operation.details` | Opt-In      | The details of a completion request, including chat history and parameters; lets you store inputs and outputs independently from traces. It uses the inference span's attributes.                                                                                                                                |
| `gen_ai.evaluation.result`                  | Recommended | The result of evaluating GenAI output. Required `gen_ai.evaluation.name`; Conditionally Required `gen_ai.evaluation.score.value`, `gen_ai.evaluation.score.label` and `error.type`. Parent it to the evaluated span, or set `gen_ai.response.id` when no span ID is available.                                   |
| `gen_ai.client.operation.exception`         | Recommended | An exception during a client operation, such as an API error, rate limit or timeout. Severity WARN (severity number 13). `exception.type` or `exception.message` is required (each one when the other is missing); `exception.stacktrace` is Recommended. `exception.message` may contain sensitive information. |

The exception event may be populated with the attributes of the client span if the instrumentation offers that option.
