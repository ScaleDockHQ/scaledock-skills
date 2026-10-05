# Versions and upgrades

Read this when choosing which GenAI conventions to emit, reading telemetry from an instrumentation that still emits the old conventions, upgrading one, or refreshing the pin. Sources: the `semantic-conventions-genai` repository at commit `b31e9e8` and its `model/manifest.yaml`, the GenAI docs at semantic conventions v1.36.0, the semantic conventions CHANGELOG for v1.37.0 to v1.42.0, and the opt-in transition plan in the GenAI README at v1.41.1, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id     | Line                                    | Status  | Revision                                                                 | Posture | Summary                                                                                                |
| ------ | --------------------------------------- | ------- | ------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------ |
| `dev`  | GenAI conventions (development)         | current | commit `b31e9e8` (2026-09-30), schema `gen-ai-dev/1.42.0-dev` on v1.44.0 | build   | The latest experimental conventions, in their own repository. What `gen_ai_latest_experimental` means. |
| `1.36` | semantic conventions v1.36.0 or earlier | legacy  | semantic conventions v1.36.0 (2025-07-05)                                |         | `gen_ai.system`, per-message events. What existing instrumentations emit by default.                   |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Every GenAI document in both lines has Development status (v1.36.0 GenAI README, Status; GenAI README at the pin), so there is no stable line yet and the current line carries the draft posture build. The two lines are the ones the transition plan names: "v1.36.0 or prior" and "the latest experimental" (v1.41.1 GenAI README, transition plan). The GenAI conventions released in core semantic conventions v1.37.0 to v1.41.1 are steps between them, listed under [What changed](#what-changed); they are not lines of their own.

The `semantic-conventions-genai` repository has no releases or tags as of 2026-10-05. Its manifest on the default branch still declares `schema_url: https://opentelemetry.io/schemas/gen-ai-dev/1.42.0-dev` and `stability: development`, and the commits after the pin (`6d9cf45`, `e07f4eb`, 2026-10-02) update tooling only.

## Which version to use

- New instrumentations with no users on the old conventions emit GenAI conventions (development) directly, and record the schema URL and commit.
- Existing instrumentations that emit semantic conventions v1.36.0 or earlier keep emitting them by default, and emit the development conventions only when `OTEL_SEMCONV_STABILITY_OPT_IN` contains `gen_ai_latest_experimental`; see [`versioning.md`](versioning.md#otel_semconv_stability_opt_in). Never add new v1.36.0-style signals.
- A backend that ingests from both kinds of instrumentation receives both: `gen_ai.system` and the per-message events from producers without the opt-in, and the current attributes from the rest.
- There is no preview: see [Preview](#preview).

## What changed

Each item cites the semantic conventions CHANGELOG entry for the release that made it, with its issue number.

### GenAI conventions (development)

Changes since v1.36.0, newest first:

- v1.42.0: the GenAI conventions move to the dedicated `semantic-conventions-genai` repository, listed as a breaking change (#3696). The GenAI page on opentelemetry.io is now a "Moved" page.
- v1.41.0: the `execute_tool` span name requires the tool name, `execute_tool {gen_ai.tool.name}` (breaking, #3595). Also new: separate client and internal `invoke_agent` spans (#2632), the `invoke_workflow` operation (#2912), `gen_ai.usage.reasoning.output_tokens` (#3194), the `gen_ai.client.operation.exception` event (#3436), time-to-first-chunk and time-per-output-chunk metrics (#3113), streaming attributes on inference spans (#3598), and `gen_ai.response.model` on embeddings spans (#3499).
- v1.40.0: retrieval spans (#2907), `gen_ai.agent.version` (#3428), cache token attributes `gen_ai.usage.cache_read.input_tokens` and `gen_ai.usage.cache_creation.input_tokens` (#1959), and the sampling-relevant flag on span attributes (#2994).
- v1.38.0: `gen_ai.tool.definitions` on agent and inference spans and `gen_ai.tool.call.arguments` and `gen_ai.tool.call.result` on `execute_tool` spans, the evaluation event, span kind guidance for `invoke_agent` (#2837), reasoning message parts (#1965), `gen_ai.embeddings.dimension.count` (#2361), and multimodal message parts (#1556).
- v1.37.0 (breaking): chat history moves from per-message events to the `gen_ai.system_instructions`, `gen_ai.input.messages` and `gen_ai.output.messages` attributes, on spans or on the new `gen_ai.client.inference.operation.details` event, not recorded by default when content capture is off. The `gen_ai.system.message`, `gen_ai.user.message`, `gen_ai.assistant.message`, `gen_ai.tool.message` and `gen_ai.choice` events are deprecated (#2010, #2179, #1913, #1621, #1912). `gen_ai.system` is renamed `gen_ai.provider.name`, `gen_ai.openai.*` loses the `gen_ai` prefix, and `az.ai.*` becomes `azure.ai.*` (#2046).

### semantic conventions v1.36.0 or earlier

- Inference spans carry `gen_ai.system` with `gen_ai.operation.name`, `gen_ai.request.*`, `gen_ai.response.*` and `gen_ai.usage.input_tokens` and `gen_ai.usage.output_tokens` (v1.36.0 GenAI spans).
- Content is recorded as one event per message: `gen_ai.system.message`, `gen_ai.user.message`, `gen_ai.assistant.message`, `gen_ai.tool.message` and `gen_ai.choice` (v1.36.0 GenAI events).

## Upgrading

### 1.36 to dev

Use this for an instrumentation, a dashboard or a backend mapping built on semantic conventions v1.36.0 or earlier.

1. Change the version marker: emit the schema URL `https://opentelemetry.io/schemas/gen-ai-dev/1.42.0-dev` and record commit `b31e9e8`. In an existing instrumentation, emit the new conventions only behind `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental`, and stop emitting the old ones when it is set ([`versioning.md`](versioning.md#otel_semconv_stability_opt_in)).
2. Replace removed or renamed signals: `gen_ai.system` becomes `gen_ai.provider.name`; `gen_ai.openai.*` becomes `openai.*` and `az.ai.*` becomes `azure.ai.*`; the per-message events become the Opt-In `gen_ai.system_instructions`, `gen_ai.input.messages` and `gen_ai.output.messages` attributes; `execute_tool` spans are named `execute_tool {gen_ai.tool.name}`; agent spans follow the client and internal split.
3. Validate against the target: check every span, attribute, event and metric name against the registry and docs at the pinned commit, including Required attributes such as `gen_ai.operation.name` and `gen_ai.provider.name` ([`attributes.md`](attributes.md), [`spans.md`](spans.md)).
4. Keep behaviour unchanged: content capture stays off unless the user enabled it, token counts and durations keep their meaning, and users who did not opt in see the same telemetry as before.

## Preview

None is listed. The current line is itself a development line with no releases, and as of 2026-10-05 the GenAI repository has published no tag, release candidate or stable schema. When it publishes a first tag or a stable version: pin the tag, make it current, make the development commit pin legacy if they differ, and add an upgrade section. The transition plan says it will be updated before the GenAI conventions are marked stable; re-read it then.
