# AI

How every surface calls models: one client, AI Gateway, `packages/ai`, validation, approvals, UI, long runs and telemetry.

Applies to product repos with AI features. Expo apps never call models directly; they go through `apps/api`.

- **One client.** The AI SDK (`ai` 7) is the only LLM client. Never import OpenAI, Anthropic or Google SDKs directly, and never add `@ai-sdk/<provider>` packages unless the user asks. The non-provider packages `@ai-sdk/workflow`, `@ai-sdk/otel` and `@ai-sdk/react` are allowed.
- **AI Gateway for every model call.** Use plain `"provider/model"` strings, authenticated by `VERCEL_OIDC_TOKEN`. Never `AI_GATEWAY_API_KEY` or provider keys. Fallbacks go through gateway provider options, and default models live in `platform_settings`.
- **`packages/ai`** owns models, prompts, tools and evals. Features never build prompts inline.
- **Validation.** Structured output, tool inputs and tool `contextSchema` use Valibot (Standard Schema). Model output is validated before it becomes a row.
- **Tools.** Secrets and tenant IDs reach tools through `contextSchema` and `toolsContext`, never the prompt. Every agent and call sets `timeout` (`totalMs`, `stepMs`, `toolMs`).
- **Approvals.** Tools with side effects declare `toolApproval` (`"user-approval"` or a function) on the agent or call, through PermDock `approval-required` when permissions are in play. High-risk tools use signed approvals so a client cannot forge one.
- **UI.** shadcn AI Elements patterns (copied into `packages/ui`, built on Trace, Code Block and Message) and `useChat` streaming on Node.
  - An SSE or streamed chat response sets `Content-Encoding: none`, so a compressing proxy does not buffer the stream until it ends.
- **Long runs.** Long or resumable runs use `WorkflowAgent` from `@ai-sdk/workflow`. A streaming chat surface may start its workflow from a runtime package the app imports, instead of through `apps/api` (see [`vercel.md`](vercel.md)). Model-written JavaScript or TypeScript (code mode) runs in the Run SDK behind narrow host functions; code that needs an OS, package installs or process isolation runs in Sandbox.
- **Telemetry.** Register once with `registerTelemetry(new OpenTelemetry())` from `@ai-sdk/otel`, and give each call a `telemetry.functionId`. Never log prompts that contain PII.
- **Upgrades.** Move from AI SDK 6 with `npx @ai-sdk/codemod v7` and the `migrate-ai-sdk-v6-to-v7` skill.
