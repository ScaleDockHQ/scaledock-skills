# opentelemetry-genai

An agent skill for the OpenTelemetry semantic conventions for generative AI: tracing model calls, tools and agents with `gen_ai.*` spans, attributes, events and metrics.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill opentelemetry-genai
```

Then ask your agent to "add OpenTelemetry GenAI spans to our LLM client" or "instrument our agent loop and tool calls with OpenTelemetry".

## What it covers

- Inference, embeddings, retrieval, execute_tool, create_agent, invoke_agent, invoke_workflow and MCP spans, with names and span kinds.
- Required and recommended `gen_ai.*` attributes, well-known values, and token usage attributes.
- When and how to capture prompts and completions: off by default, on spans, or in external storage.
- Client, server, agent and tool metrics, token metrics, and the GenAI events.
- Development status, pinning to a commit and schema URL, and `OTEL_SEMCONV_STABILITY_OPT_IN`.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OpenTelemetry GenAI semantic conventions](https://github.com/open-telemetry/semantic-conventions-genai/blob/b31e9e8ea26ac1c086d3313d474e31d7c3f391ae/docs/gen-ai/README.md): Development, commit b31e9e8 (schema `gen-ai-dev/1.42.0-dev`), with its spans, agent spans, events, metrics, MCP and registry docs.
- [GenAI README in semantic conventions v1.41.1](https://github.com/open-telemetry/semantic-conventions/blob/v1.41.1/docs/gen-ai/README.md): the opt-in transition plan.
- [Semantic conventions v1.44.0](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.44.0): the core conventions the GenAI registry depends on.

## License

MIT
