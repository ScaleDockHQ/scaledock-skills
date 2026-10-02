# Vercel and Turborepo

The Vercel-first order, the needs table, platform defaults, the Vercel project with Services, `turbo.json`, and Remote Cache.

## Vercel first

When Supabase (database, auth, RLS-bound files, realtime) does not cover a need, pick in this order:

1. A first-party Vercel product.
2. A Marketplace integration.
3. A third-party service through Vercel Connect.
4. A plain env secret.

Record any exception in an ADR.

| Need | Use |
| --- | --- |
| LLM calls, embeddings, images | AI SDK through Vercel AI Gateway |
| Durable jobs, long-running agents | Workflow SDK (`DurableAgent`) |
| Schedules | Vercel Cron Jobs to `apps/api` routes, verified with a `CRON_SECRET` of at least 32 characters |
| Fan-out, event streaming | Vercel Queues |
| Untrusted or generated code | Vercel Sandbox |
| Public or private assets not tied to RLS | Vercel Blob; RLS-bound files stay in Supabase Storage |
| Config and kill switches | Edge Config |
| Feature flags | Flags SDK with Edge Config |
| Cross-invocation function cache | Runtime Cache (`getCache` from `@vercel/functions`) |
| Work after the response | `after()` in Next, `waitUntil` elsewhere |
| Bot protection | BotID on sign-in, sign-up and public forms |
| Rate limits and WAF | Vercel Firewall (`@vercel/firewall` in code) |
| Analytics, Core Web Vitals | Web Analytics, Speed Insights |
| Logs, traces | Vercel Observability, `@vercel/otel`, Sentry through the Marketplace |
| Gradual rollouts | Rolling Releases |
| Chat bots | Chat SDK, with the platform app created through Vercel Connect |
| New agent products | Propose eve first; do not install it without asking |
| Agents on deployments and logs | Vercel MCP server in `.mcp.json` |

## Platform defaults

- Fluid Compute on Node.js; never `runtime = "edge"`.
- Function region `fra1` unless I say otherwise.
- Only `apps/api` starts workflows. Each service sets its own `WORKFLOW_QUEUE_NAMESPACE`.
- An `apps/api` without workflows runs its Hono app through `@hono/node-server` `getRequestListener(app.fetch)` in `server.ts`. An `apps/api` with workflows hosts the same Hono app on Nitro with the `workflow/nitro` module, because the Workflow SDK needs a build integration.

## Vercel project

One project with Services.

- **Each service** has a `root`, an `installCommand` of `pnpm install --frozen-lockfile --filter '{.}...'`, a `buildCommand` and `turbo-ignore`.
- **Rewrites:**
  - `/api`.
  - `/mcp`, plus both `/.well-known/oauth-protected-resource` paths.
  - `/docs`.
  - `/app`.
- **`git.deploymentEnabled`:** deny `*`, `**` and `changeset-release/**`. Allow `main`, and `develop` once it exists.
- **`crons`** for `apps/api`.
- **Config file:** `vercel.json` with `$schema` until `@vercel/config` types `services` and per-service rewrites, then `vercel.ts`.

## `turbo.json`

Check the keys against the installed docs:

```jsonc
{
  "$schema": "https://turborepo.com/schema.json",
  "agentGuidance": true,
  "futureFlags": {
    "globalConfiguration": true,
    "affectedUsingTaskInputs": true,
    "errorsOnlyShowHash": true,
    "longerSignatureKey": true
  },
  "global": {
    "envMode": "strict",
    "cacheMaxAge": "14d",
    "remoteCache": { "enabled": true, "signature": true },
    "env": ["CI", "NODE_ENV"],
    "passThroughEnv": ["SUPABASE_*", "VERCEL_*", "PORTLESS*", "REUI_LICENSE_KEY", "GITHUB_ACTIONS", "TURBO_REMOTE_CACHE_SIGNATURE_KEY"],
    "inputs": ["packages/typescript-config/**", "packages/ox-config/**", "pnpm-workspace.yaml"]
  },
  "tasks": { /* transit, build, lint, lint:root, typecheck, test, dev and dev:portless (persistent, uncached) */ }
}
```

- **Outputs:** `.next/**` (minus cache and dev), `.source/**` and `dist/**`.
- **Boundaries:** every workspace has `boundaries` tags.

## Remote Cache

- **Locally:** `turbo login` and `turbo link`.
- **In CI:** OIDC with the `TURBO_TEAM` variable and signed artifacts. `TURBO_REMOTE_CACHE_SIGNATURE_KEY` is a team Shared Environment Variable and a GitHub secret.
