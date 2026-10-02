# API (`apps/api`)

The Hono shell, oRPC with Scalar, the request context, crons, webhooks and workflows.

Applies to product repos with the `api` surface. Expo apps send every command through it with the contract client.

The `scaledock-http-api` skill builds on this reference, and the `openapi`, `openapi-overlay`, `problem-details`, `ratelimit-headers` and `standard-schema` spec skills own the format rules (see [`skills.md`](skills.md)). PermDock's `permdock openapi emit` writes the document's security schemes and per-operation `security`.

- **Shell.** A Hono app in `src/app.ts`:
  - `secureHeaders` and a request ID.
  - A CORS allow list. In production it is same-origin through the Services rewrites.
  - A JSON 404, and a Problem Details `onError` that reports to Sentry.
  - `/api/health`.
  - Responses with user data send `Cache-Control: private, no-store`.
- **oRPC** (latest; the pre-release line while the latest major is in beta):
  - `OpenAPIHandler` under `/api`, with the `@orpc/valibot` JSON Schema converter.
  - `OpenAPIReferenceHandlerPlugin` serves Scalar at `/api/docs` and the spec at `/api/openapi.json`. Improve Scalar through contract meta, not Scalar config.
  - The document's `info`, `tags`, `servers` and security schemes live in `@{{SCOPE}}/contract/openapi`. Use the newest OpenAPI version the installed oRPC emits.
  - The snapshot `apps/api/openapi.json` is committed, and CI fails on drift.
- **Request context.** One `createRequestSupabaseContext(request, { env, auth: "user" })` per request, plus one PermDock instance, handed to `services`.
- **Other routes:**
  - Crons at `/api/cron/<name>`, protected by `CRON_SECRET`.
  - Webhooks at `/api/webhooks/<provider>`, with the signature verified and idempotency keyed on the provider event ID.
  - Workflows start only here.
