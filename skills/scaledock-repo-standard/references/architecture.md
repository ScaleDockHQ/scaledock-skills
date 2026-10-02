# Architecture

The folder tree, Turbo boundaries, contract first, errors, one library per concern, env, standard services, and code rules.

Applies to product repos. Library repos apply the `packages/` layout, boundaries and code rules; tooling repos skip it.

## Folder structure

```
apps/
  app/         product app at /app (or / without marketing); always named "app". Next.js, or universal Expo with Framework expo
  mobile/      native-only Expo app (iOS and Android), with the mobile surface beside a Next.js app
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
  ui/          shadcn + ReUI components, tokens, hooks; per-file exports, no barrel. Uniwind primitives with .web.tsx twins when app is Expo
  ui-native/   Uniwind primitives for apps/mobile, when ui stays on shadcn
  sync/        PowerSync schema, connector, sync streams and local stack, when Offline is yes
  next-config/ createNextConfig(), security headers, monorepo env loader
  ox-config/   ONE package: oxlint presets, oxfmt config, ignores, anti-slop plugin
  typescript-config/  base.json, library.json, react-library.json, next.json, expo.json (with Expo)
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
  - `typescript-config` and `ox-config` carry the `tooling` tag. Every workspace may import `tooling` as a dev dependency, and the rules below list only runtime imports.
  - `domain` imports nothing internal.
  - `contract` imports `domain`.
  - `services` imports `supabase`, `policy`, `ai`, `email` and `domain`.
  - `ui` and `ui-native` never import apps, `services`, `supabase`, `sync` or `policy`.
  - `supabase` imports nothing internal. `sync` imports only `supabase` and `domain`.
  - `cli` imports only `contract` and `domain`.
  - Every app has an explicit allow list. Expo apps may import `services` only for the shared read functions, never `services/commands`, which need secrets.
- **Contract first.** Every API procedure lives in `packages/contract` with `openapi()` meta, and models carry Valibot `title`, `description` and `examples`. MCP tools are opt-in through `packages/contract/src/mcp.ts` and never mirror REST one-to-one. Hono is only the HTTP shell.
- **Errors.** RFC 9457 Problem Details everywhere (`type`, `title`, `status`, `detail`, `instance` and a stable `code`). The API returns `application/problem+json`. MCP tool errors return `isError: true` with the same problem as text and `structuredContent`. The CLI prints the problem's `detail`, or the whole problem with `--json`.
- **Valibot everywhere** (env, domain, contract, forms, MCP tool schemas, AI output, CLI config). No Zod in our code; a dependency's own Zod is fine.
- **One library per concern**, enforced with `no-restricted-imports`:

  | Concern               | Library                                                                       | On Expo                   |
  | --------------------- | ----------------------------------------------------------------------------- | ------------------------- |
  | Schemas               | Valibot (`@valibot/to-json-schema` for JSON Schema)                           | Same                      |
  | Typed results         | better-result                                                                 | Same                      |
  | Remote data           | RSC first, TanStack Query in client islands                                   | TanStack Query            |
  | Forms                 | TanStack Form with Standard Schema                                            | Same                      |
  | URL state             | nuqs                                                                          | Expo Router search params |
  | Cross-screen UI state | TanStack Store                                                                | Same                      |
  | Dates                 | `Temporal` from `@{{SCOPE}}/domain/temporal` (rules in `data-conventions.md`) | Same                      |
  | Icons                 | Hugeicons (unless the user names another set)                                 | `expo-symbols`            |
  | Styling               | Tailwind v4                                                                   | Uniwind                   |
  | Lists                 | ReUI `data-grid`                                                              | Legend List               |
  | Native controls       | n/a                                                                           | `@expo/ui`                |
  | Copy                  | next-intl                                                                     | i18next                   |
  | Offline data          | n/a                                                                           | PowerSync                 |
  | Email                 | react-email                                                                   | n/a                       |
  | LLMs                  | AI SDK                                                                        | Same, through `apps/api`  |
  | MCP                   | `@modelcontextprotocol/server` and `/client`, latest major                    | n/a                       |
  | CLI                   | citty, @clack/prompts, c12, tinyexec (latest of each)                         | n/a                       |

  Never add `@radix-ui/*` or vaul. On Expo, never add JS stacks, JS tab bars, JS bottom sheets or `TouchableOpacity`.

- **Temporal.** `Temporal` is the only date library; never date-fns, dayjs, luxon or moment.
  - `packages/domain/src/temporal.ts` is the one module that imports `temporal-polyfill`, and it re-exports `Temporal`. Every other file imports `Temporal` from there, never from the polyfill or the global.
  - Node 26, Chromium and Firefox ship it natively, but Safari, Hermes and Vercel's current Node do not. When all runtimes the repo targets ship it, `temporal.ts` re-exports the global and the polyfill is removed, a one-file change.
  - Expo imports the same module, so Hermes gets the polyfill too.

- **Env.** Each app has one `env.ts` (t3-env with Valibot), the only file that reads `process.env`. Read `NEXT_PUBLIC_*` and `EXPO_PUBLIC_*` literally. Derive every public URL from `NEXT_PUBLIC_SITE_URL`.
- **Standard services**, each behind one wrapper so features never import a vendor SDK:
  - Sentry behind `lib/monitoring` (`@sentry/nextjs`, `@sentry/react-native` on Expo, or Sentry's Hono or Node SDK in services).
  - Push notifications on Expo: the app registers an `expo-notifications` token through the API, and `apps/api` sends through `expo-server-sdk`.
  - Vercel Web Analytics and Speed Insights in the root layouts.
  - Resend through `packages/email`.
  - Stripe per organization: price IDs in the database, webhooks verified in `apps/api`, operational settings in `platform_settings`.
- **Code rules.** Imports at the top. Exhaustive `switch` with a `never` default. Only erasable syntax. Every `as T` has a `SAFETY:` comment; prefer a guard or a schema parse. Comments state constraints only.
  - No `Date` in `domain`, `contract` or `services`. A `Date` appears only where a third-party API demands one, converted from or to `Temporal` on that line, with a comment naming the API.
  - No hand-written `useMemo`, `useCallback` or `memo`; the React Compiler memoizes.
