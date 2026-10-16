# Vercel and Turborepo

The Vercel-first order, the needs table, platform defaults, the Vercel project with Services, `turbo.json`, and Remote Cache.

Applies to product repos, and to library repos that deploy a docs site. Tooling repos skip it.

## Vercel first

When Supabase (database, auth, RLS-bound files, realtime) does not cover a need, pick in this order:

1. A first-party Vercel product.
2. A Marketplace integration.
3. A third-party service through Vercel Connect.
4. A plain env secret.

Record any exception in an ADR.

| Need                                      | Use                                                                                                                                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LLM calls, embeddings, images             | AI SDK through Vercel AI Gateway                                                                                                                                                |
| Durable jobs                              | Workflow SDK 5 (`workflow`)                                                                                                                                                     |
| Long-running agents                       | `WorkflowAgent` from `@ai-sdk/workflow`, on the Workflow SDK                                                                                                                    |
| Schedules                                 | Vercel Cron Jobs to `apps/api` routes, verified with a `CRON_SECRET` of at least 32 characters                                                                                  |
| Fan-out, event streaming                  | Vercel Queues                                                                                                                                                                   |
| Generated JS or TS against app operations | Run SDK (`run`): QuickJS with narrow `hostFunctions` that authorize every call                                                                                                  |
| Untrusted code that needs an OS           | Vercel Sandbox                                                                                                                                                                  |
| Agent workspaces that outlive a sandbox   | Vercel Drives mounted into Sandbox (`Drive.getOrCreate`, `mounts`)                                                                                                              |
| Always-on pull workers                    | Prefer Queues and Workflow; Vercel Daemons (beta) only with an ADR                                                                                                              |
| A service that needs system libraries     | A container (`Dockerfile.vercel`, listening on `$PORT`), only with an ADR                                                                                                       |
| Public or private assets not tied to RLS  | Vercel Blob; RLS-bound files stay in Supabase Storage                                                                                                                           |
| Config                                    | Edge Config                                                                                                                                                                     |
| Feature flags, kill switches              | Vercel Flags through the Flags SDK (`flags/next`, `vercelAdapter()` from `@flags-sdk/vercel`), managed with `vercel flags`; precompute in `proxy.ts` keeps flagged pages static |
| Cross-invocation function cache           | Runtime Cache (`getCache` from `@vercel/functions`)                                                                                                                             |
| Work after the response                   | `after()` in Next, `waitUntil` elsewhere                                                                                                                                        |
| Bot protection                            | BotID on sign-in, sign-up and public forms                                                                                                                                      |
| Rate limits and WAF                       | Vercel Firewall (`@vercel/firewall` in code)                                                                                                                                    |
| Analytics, Core Web Vitals                | Web Analytics, Speed Insights                                                                                                                                                   |
| Logs, traces                              | Vercel Observability, `@vercel/otel`, Sentry through the Marketplace; Supabase clients with `tracePropagation: true`                                                            |
| Gradual deployment rollouts               | Rolling Releases; per-feature rollouts use Vercel Flags                                                                                                                         |
| Chat bots                                 | Chat SDK, with the platform app created through Vercel Connect                                                                                                                  |
| New agent products                        | Propose eve first; do not install it without asking                                                                                                                             |
| Generative UI from model output           | Propose json-render (`@json-render/react`) first; do not install it without asking                                                                                              |
| Agents on deployments and logs            | Vercel MCP server in `.mcp.json`                                                                                                                                                |

## Platform defaults

- Fluid Compute on Node.js; never `runtime = "edge"`. Containers and Daemons also run on Fluid, so they never justify leaving Node for a service Node can serve.
- Function region `fra1` unless the user names another.
- Only `apps/api` starts workflows; a workflow may start child workflows with `start()`. Each service sets its own `WORKFLOW_QUEUE_NAMESPACE`.
- Workflow 5 traces each invocation as its own root (`WORKFLOW_TRACE_MODE=linked`, the default). Dashboards and alerts query the `workflow.execute <fn>` and `step.execute <fn>` spans.
- An `apps/api` without workflows runs its Hono app through `@hono/node-server` `getRequestListener(app.fetch)` in `server.ts`. An `apps/api` with workflows hosts the same Hono app on Nitro with the `workflow/nitro` module, because the Workflow SDK needs a build integration.

## Vercel project

One project with Services.

- **Each service** has a `root`, an `installCommand` of `pnpm install --frozen-lockfile --filter '{.}...'`, a `buildCommand` and `turbo-ignore`.
- **Rewrites:**
  - `/api`.
  - `/mcp`, plus both `/.well-known/oauth-protected-resource` paths.
  - `/docs`.
  - `/app` and `/app/(.*)`. A universal Expo app is a Node service whose `server.mts` serves the `expo export --platform web` output and `expo-server` SSR; never add a catch-all rewrite to it. A native-only `apps/mobile` has no service.
- **`git.deploymentEnabled`:** deny `*`, `**` and `changeset-release/**`. Allow `main`, and `develop` once it exists.
- **`crons`** for `apps/api`.
- **Config file:** `vercel.ts`, typed with `VercelConfig` from `@vercel/config/v1`. Write rewrites with the `routes` helpers, and Services under `experimentalServices` (`type`, `root`, `entrypoint`). That key is marked private, so when a deploy rejects it, fall back to `vercel.json` with `$schema` and record a `gap` row. Vercel's docs show the public `services` key (`root`, `framework` or `entrypoint`, `bindings`, routed with `destination: { service }`) in `vercel.json`; switch `vercel.ts` to it once the installed `@vercel/config` types it.
- **Service-to-service calls** use a service binding (`{ "type": "service", "service": "<name>", "format": "url", "env": "<NAME>_INTERNAL_URL" }`), never a public URL, and a service without a rewrite stays internal. While `@vercel/config` has no `bindings`, record a `gap` row instead of hard-coding URLs.

## Runtime and toolchain choices

- **Node:** Functions run the newest major Vercel lists. Node 26 has Temporal built in and enters LTS in October 2026; adopt it in `.node-version`, `engines` and the project setting on the day Vercel lists it. Sandbox already runs `runtime: "node26"`.
- **Vite+:** evaluated and deferred. It has no remote cache and pins its own oxlint, oxfmt, Vitest and tsdown versions, so it would replace Turborepo's Remote Cache and the catalog pins. Do not propose it again; a repo that adopts it anyway needs an ADR.

## `turbo.json`

Check the keys against the installed docs:

```jsonc
{
  "$schema": "https://turborepo.dev/schema.json",
  "agentGuidance": true,
  "futureFlags": {
    "globalConfiguration": true,
    "affectedUsingTaskInputs": true,
    "filterUsingTasks": true,
    "watchUsingTaskInputs": true,
    "pruneIncludesGlobalFiles": true,
    "githubActionsRemoteBaseRefFallback": true,
    "errorsOnlyShowHash": true,
    "longerSignatureKey": true,
    "strictTaskEntrypointSelection": true,
  },
  "global": {
    "envMode": "strict",
    "cacheMaxAge": "14d",
    "cacheMaxSize": "10GB",
    "remoteCache": { "enabled": true, "signature": true },
    "env": ["CI", "NODE_ENV"],
    "passThroughEnv": [
      "SUPABASE_*",
      "VERCEL_*",
      "PORTLESS*",
      "REUI_LICENSE_KEY",
      "GITHUB_ACTIONS",
      "TURBO_REMOTE_CACHE_SIGNATURE_KEY",
    ],
    "inputs": [
      "packages/typescript-config/**",
      "oxlint.config.ts",
      "oxfmt.config.ts",
      "pnpm-workspace.yaml",
    ],
  },
  "tasks": {
    "transit": { "dependsOn": ["^transit"] },
    "build": {
      "dependsOn": ["^build"],
      "outputs": [
        ".next/**",
        "!.next/cache/**",
        "!.next/dev/**",
        ".source/**",
        "dist/**",
      ],
    },
    "lint": { "dependsOn": ["transit"] },
    "//#lint:root": {},
    "typecheck": { "dependsOn": ["transit"] },
    "test": { "dependsOn": ["transit"] },
    "dev": { "cache": false, "persistent": true },
    "dev:portless": { "cache": false, "persistent": true },
  },
}
```

- **`transit`** is a no-op script (`"transit": "true"`) in every package. Tasks that read source from dependencies depend on it, so they rerun when a dependency changes without waiting for its build.
- **Workspace `turbo.json` files** extend `//` with `"extends": ["//"]`, add their `tags`, and list per-task `env` keys and `inputs` exclusions. Expo apps exclude `ios/**`, `android/**` and `assets/**` from `lint`, `typecheck` and `test` inputs, and add `test:components`.
- **Boundaries:** every workspace has `boundaries` tags.
- **Generated inputs:** a task that reads files another task generates (the `supabase:types` output, Uniwind artifacts) excludes them from its static `inputs` and adds `{ "mode": "jit", "globs": [...] }`, so the hash reflects the generated content.
- **Scoped runs:** with `affectedUsingTaskInputs` and `filterUsingTasks`, `--affected` and `--filter` both select by task `inputs` and combine. CI and agents pass `--json` or `--log-file` where the installed version supports them, and read the structured output instead of scraping logs.
- **Pruned images:** `turbo prune <app> --production` for a Docker build leaves dev dependencies out.
- **Not adopted:** the experimental Cargo, Python and setup flags. Turn one on only with an ADR.

## Remote Cache

- **Locally:** `turbo login` and `turbo link`.
- **In CI:** OIDC with the `TURBO_TEAM` variable and signed artifacts. `TURBO_REMOTE_CACHE_SIGNATURE_KEY` is a team Shared Environment Variable and a GitHub secret.
