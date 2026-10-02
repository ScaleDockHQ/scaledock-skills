# AI

How every surface calls models: one client, AI Gateway, `packages/ai`, validation, UI, long runs and telemetry.

- **One client.** The AI SDK is the only LLM client. Never import OpenAI, Anthropic or Google SDKs directly, and never add `@ai-sdk/<provider>` packages unless I ask.
- **AI Gateway for every model call.** Use plain `"provider/model"` strings, authenticated by `VERCEL_OIDC_TOKEN`. Never `AI_GATEWAY_API_KEY` or provider keys. Fallbacks go through gateway provider options, and default models live in `platform_settings`.
- **`packages/ai`** owns models, prompts, tools and evals. Features never build prompts inline.
- **Validation.** Structured output and tool inputs use Valibot (Standard Schema). Model output is validated before it becomes a row.
- **UI.** AI Elements with shadcn primitives, and `useChat` streaming on Node. Tools with side effects need approval, through PermDock `approval-required` when permissions are in play.
- **Long runs and telemetry.** Long or resumable runs use `DurableAgent`, and untrusted code runs in Sandbox. Telemetry goes to OpenTelemetry; never log prompts that contain PII.
