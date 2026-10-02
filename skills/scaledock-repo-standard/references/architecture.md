# Architecture

The folder tree, Turbo boundaries, contract first, errors, one library per concern, env, standard services, and code rules.

## Folder structure

```
apps/
  app/         Next.js product app at /app (or / without marketing); always named "app"
  api/         Hono shell + oRPC OpenAPIHandler at /api, Scalar at /api/docs, crons, webhooks, workflows
  mcp/         Hono shell + MCP SDK at /mcp and /.well-known/oauth-protected-resource
  docs/        Fumadocs on Next.js at /docs (its own docs MCP at /docs/mcp)
  marketing/   optional Next.js site at /
  cli/         product CLI (npm bin), when CLI kind is "product"
packages/
  domain/      Valibot schemas and pure rules; no I/O, "sideEffects": false
  contract/    oRPC contract with openapi() meta; ./mcp is the curated MCP subset; ./openapi document info
  services/    commands and queries over one typed Context
  supabase/    better-supabase generated schema, clients, server and admin contexts
  policy/      PermDock definitions and policy
  ai/          model registry, prompts, tools, evals
  email/       react-email templates and renderEmail
  ui/          shadcn + ReUI components, tokens, hooks; per-file exports, no barrel
  next-config/ createNextConfig(), security headers, monorepo env loader
  ox-config/   ONE package: oxlint presets, oxfmt config, ignores, anti-slop plugin
  typescript-config/  base.json, library.json, react-library.json, next.json
  cli/         library CLI (@{{SCOPE}}/cli), when CLI kind is "library"
tests/         e2e (Playwright + axe + @next/playwright), integration, fixtures
supabase/      config.toml, schemas/, migrations/, seeds/, tests/ (pgTAP)
scripts/       repo scripts (TypeScript run directly by Node)
docs/agents/   "things agents get wrong" topic files
docs/decisions/ ADRs (0000-template.md, README.md with an index)
server.json    MCP Registry manifest (when there is an mcp surface)
```

Files are kebab-case. Tests live in each workspace's `tests/` folder, never beside the source.

## Architecture rules

- **Thin apps.** Apps are thin adapters over `services` with one typed context, and they never import each other.
- **Turbo boundaries.** Every workspace has a tag:
  - `domain` imports only `config`.
  - `contract` imports `domain`.
  - `services` imports `supabase`, `policy`, `ai`, `email` and `domain`.
  - `ui` never imports apps, `services`, `supabase` or `policy`.
  - `supabase` imports nothing internal.
  - `cli` imports only `contract`, `domain` and `config`.
  - Every app has an explicit allow list.
- **Contract first.** Every API procedure lives in `packages/contract` with `openapi()` meta, and models carry Valibot `title`, `description` and `examples`. MCP tools are opt-in through `packages/contract/src/mcp.ts` and never mirror REST one-to-one. Hono is only the HTTP shell.
- **Errors.** RFC 9457 Problem Details everywhere (`type`, `title`, `status`, `detail`, `instance` and a stable `code`). The API returns `application/problem+json`. MCP tool errors return `isError: true` with the same problem as text and `structuredContent`. The CLI prints the problem's `detail`, or the whole problem with `--json`.
- **Valibot everywhere** (env, domain, contract, forms, MCP tool schemas, AI output, CLI config). No Zod in our code; a dependency's own Zod is fine.
- **One library per concern**, enforced with `no-restricted-imports`:

  | Concern               | Library                                                    |
  | --------------------- | ---------------------------------------------------------- |
  | Schemas               | Valibot (`@valibot/to-json-schema` for JSON Schema)        |
  | Typed results         | better-result                                              |
  | Remote data           | RSC first, TanStack Query in client islands                |
  | Forms                 | TanStack Form with Standard Schema                         |
  | URL state             | nuqs                                                       |
  | Cross-screen UI state | TanStack Store                                             |
  | Dates                 | date-fns                                                   |
  | Icons                 | Hugeicons (unless I name another set)                      |
  | Email                 | react-email                                                |
  | LLMs                  | AI SDK                                                     |
  | MCP                   | `@modelcontextprotocol/server` and `/client`, latest major |
  | CLI                   | citty, @clack/prompts, c12, tinyexec (latest of each)      |

  Never add `@radix-ui/*` or vaul.

- **Env.** Each app has one `env.ts` (t3-env with Valibot), the only file that reads `process.env`. Read `NEXT_PUBLIC_*` literally. Derive every public URL from `NEXT_PUBLIC_SITE_URL`.
- **Standard services**, each behind one wrapper so features never import a vendor SDK:
  - Sentry behind `lib/monitoring` (`@sentry/nextjs`, or Sentry's Hono or Node SDK in services).
  - Vercel Web Analytics and Speed Insights in the root layouts.
  - Resend through `packages/email`.
  - Stripe per organization: price IDs in the database, webhooks verified in `apps/api`, operational settings in `platform_settings`.
- **Code rules.** Imports at the top. Exhaustive `switch` with a `never` default. Only erasable syntax. Every `as T` has a `SAFETY:` comment; prefer a guard or a schema parse. Comments state constraints only.
