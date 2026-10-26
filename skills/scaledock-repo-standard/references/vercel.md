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
- `apps/api` starts workflows; a workflow may start child workflows with `start()`. The one exception is a streaming chat surface, which may start its workflow from a runtime package the app imports, so a chat turn skips a network hop (CentraKit ADR 0026); record it in an ADR. Each service sets its own `WORKFLOW_QUEUE_NAMESPACE`.
- Workflow 5 traces each invocation as its own root (`WORKFLOW_TRACE_MODE=linked`, the default). Dashboards and alerts query the `workflow.execute <fn>` and `step.execute <fn>` spans.
- An `apps/api` without workflows runs its Hono app through `@hono/node-server` `getRequestListener(app.fetch)` in `server.ts`. An `apps/api` with workflows hosts the same Hono app on Nitro with the `workflow/nitro` module, because the Workflow SDK needs a build integration.

## Vercel project

One project with Services.

- **Each service** has a `root`, an `installCommand` that installs the whole workspace from the repo root (`cd ../.. && pnpm install --frozen-lockfile`), a `buildCommand`, and an `ignoreCommand` of `npx -y turbo@<pin> query affected --packages <name> --exit-code`.
  - Never `--filter '{.}...'` per service: the filtered installs failed with an ENOENT on the shared store in SignalDock.
  - `turbo query affected --exit-code` replaces `turbo-ignore`, matching [`ci.md`](ci.md).
  - pnpm comes from `devEngines` with `onFail: "download"` ([`toolchain.md`](toolchain.md)), not Corepack.
- **Rewrites:**
  - `/api`.
  - `/mcp`, plus both `/.well-known/oauth-protected-resource` paths.
  - `/docs`.
  - `/app` and `/app/(.*)`. A universal Expo app is a Node service whose `server.mts` serves the `expo export --platform web` output and `expo-server` SSR; never add a catch-all rewrite to it. A native-only `apps/mobile` has no service.
- **Images under Services.** A Next app served under another service's host through a rewrite (docs under `/docs`, with `assetPrefix`) can get a 404 from `/_next/image`, because the request reaches the host app instead. Give that app its own domain, or set `images.unoptimized` on it with a comment. Record the choice and the reason in `docs/agents/nextjs.md`. The report's manual steps include a `curl -I` of a production image after deploy.
- **`git.deploymentEnabled`:** deny `*`, `**` and `changeset-release/**`. Allow `main`, and `develop` once it exists.
- **`crons`** for `apps/api`.
- **Config file:** `vercel.ts`, typed with `VercelConfig` from `@vercel/config/v1`. Write rewrites with the `routes` helpers, and Services under `experimentalServices` (`type`, `root`, `entrypoint`). That key is marked private, so when a deploy rejects it, fall back to `vercel.json` with `$schema` and record a `gap` row. The public `services` key (`root`, `framework` or `entrypoint`, `ignoreCommand`, `bindings`, routed with `destination: { service }`) in `vercel.json` deploys today (SignalDock), so `vercel.json` with `services` is an accepted form, not a gap. Switch to `vercel.ts` once the installed `@vercel/config` types every key the repo uses.
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
    "affectedUsingTaskInputs": true,
    "filterUsingTasks": true,
    "watchUsingTaskInputs": true,
    "pruneIncludesGlobalFiles": true,
    "githubActionsRemoteBaseRefFallback": true,
    "errorsOnlyShowHash": true,
    "longerSignatureKey": true,
    "strictTaskEntrypointSelection": true,
  },
  "envMode": "strict",
  "remoteCache": { "enabled": true, "signature": true },
  "globalPassThroughEnv": [
    "CI",
    "NODE_ENV",
    "SUPABASE_*",
    "VERCEL_*",
    "PORTLESS*",
    "REUI_LICENSE_KEY",
    "GITHUB_ACTIONS",
    "TURBO_REMOTE_CACHE_SIGNATURE_KEY",
  ],
  "globalDependencies": [
    "packages/typescript-config/**",
    "oxlint.config.ts",
    "oxfmt.config.ts",
    "pnpm-workspace.yaml",
  ],
  "tasks": {
    "transit": {
      "dependsOn": ["^transit"],
      "inputs": [
        "$TURBO_DEFAULT$",
        "!**/*.md",
        "!**/*.mdx",
        "!**/*.test.*",
        "!tests/**",
      ],
    },
    "build": {
      "dependsOn": ["^build"],
      "env": ["NODE_ENV"],
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
    "typecheck": {
      "dependsOn": ["transit"],
      "inputs": ["$TURBO_DEFAULT$", "!**/*.md", "!**/*.mdx"],
    },
    "test": {
      "dependsOn": ["transit"],
      "inputs": ["$TURBO_DEFAULT$", "!**/*.md", "!**/*.mdx"],
    },
    "dev": { "cache": false, "persistent": true },
    "dev:portless": { "cache": false, "persistent": true },
  },
}
```

- **Top-level keys, no `global` block.** Keep `globalEnv`, `globalPassThroughEnv`, `globalDependencies`, `envMode` and `remoteCache` at the top level, and leave the `globalConfiguration` future flag and its `global` block off. `turbo/no-undeclared-env-vars` (`eslint-plugin-turbo`, run through oxlint) reads only the top-level keys, so the `global` block reports every declared variable as undeclared (CentraKit, better-supabase, Lienlink). Revisit when the plugin reads `global`.
- **Marketplace env.** A Marketplace integration adds variables to every Vercel environment. For each one, either list it (or its prefix) in `globalPassThroughEnv` or a task's `env` with the code that reads it, or delete it from the project. Never leave a variable that nothing declares.
- **Signed Remote Cache** (`"signature": true`) only once `TURBO_REMOTE_CACHE_SIGNATURE_KEY` exists in CI and on Vercel. Create the key first, then turn on signing in the same PR that uses it.
- **`CI` and `NODE_ENV` pass through.** Keep them in `globalPassThroughEnv`, not `globalEnv`, so they do not split every task hash between CI and local runs. `NODE_ENV` is hashed only where it changes the output, in `build.env`.
- **`transit`** is a task with no script. Turbo keeps scriptless nodes in the graph, so packages need no `"transit": "true"` script. Tasks that read source from dependencies depend on it, so they rerun when a dependency changes without waiting for its build.
  - When a package's `exports` point at `dist/`, its consumers read the build, not the source: their tasks depend on `^build` instead of `transit` (PermDock ADR 0021).
  - A task that reads generated code (Supabase types, the OpenAPI document, typed routes) depends on the task that generates it. Name that edge explicitly, such as `@workspace/api-client#generate`, instead of a blanket `^generate` that runs the task in every dependency.
- **Workspace `turbo.json` files** extend `//` with `"extends": ["//"]`, add their `tags`, and list per-task `env` keys and `inputs` exclusions. Expo apps exclude `ios/**`, `android/**` and `assets/**` from `lint`, `typecheck` and `test` inputs, and add `test:components`.
  - Start an overridden `dependsOn` or `inputs` list with `"$TURBO_EXTENDS$"`. It appends to the inherited list; without it the workspace list replaces the root one.
- **Narrow inputs.** `transit`, `typecheck` and the test tasks leave out docs (`!**/*.md`, `!**/*.mdx`), and `transit` also leaves out tests. A test task that reads files outside its package, such as `supabase/` schemas and seeds, lists those folders with `$TURBO_ROOT$/...` instead of widening to the repo. After changing inputs, run `turbo run <task> --dry=json` and count the inputs; a SaaS `test:unit` dropped from 15,695 to 4,021 (CentraKit).
- **Local cache across worktrees.** Linked git worktrees share the main worktree's local cache when `turbo.json` sets no `cacheDir`. Do not set `cacheDir` or `TURBO_CACHE_DIR`.
- **Stale lint results.** A cached lint result can hide new errors after a dependency bump. Run the lint gate once with `--force` after an oxlint or Ultracite bump.
- **Boundaries:** every workspace has `boundaries` tags.
- **Generated inputs:** a task that reads files another task generates (the `supabase:types` output, Uniwind artifacts) excludes them from its static `inputs` and adds `{ "mode": "jit", "globs": [...] }`, so the hash reflects the generated content.
- **Scoped runs:** with `affectedUsingTaskInputs` and `filterUsingTasks`, `--affected` and `--filter` both select by task `inputs` and combine. CI and agents pass `--json` or `--log-file` where the installed version supports them, and read the structured output instead of scraping logs.
- **Strict entrypoints:** with `strictTaskEntrypointSelection`, a requested task starts only in packages that define a command for it, so `turbo run test` no longer builds Next.js apps that have no `test` script. Count the `build` tasks in `turbo run <tasks> --dry=json` before and after ([`ci.md`](ci.md)).
- **Pruned images:** `turbo prune <app> --production` for a Docker build leaves dev dependencies out.
- **Not adopted:** the experimental Cargo, Python and setup flags. Turn one on only with an ADR.

## Remote Cache

- **Locally:** `turbo login` and `turbo link`.
- **In CI:** OIDC with the `TURBO_TEAM` variable and signed artifacts. `TURBO_REMOTE_CACHE_SIGNATURE_KEY` is a team Shared Environment Variable and a GitHub secret.
  - An unset `vars.TURBO_TEAM` makes the setup action skip the Remote Cache step silently; Turbo then logs "Remote caching disabled" and every job rebuilds.
