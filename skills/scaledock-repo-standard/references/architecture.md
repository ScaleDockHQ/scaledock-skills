# Architecture

The folder tree, Turbo boundaries, contract first, errors, one library per concern, env, standard services, code rules, and naming and layout.

Applies to product repos. Library repos apply the `packages/` layout, boundaries, code rules and naming. Tooling repos apply only the naming rules.

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
tests/         integration, fixtures, optional e2e (Playwright + axe + @next/playwright)
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
  - **Lazy imports.** A dynamic `import()` is allowed only for a measured startup cost (a CLI command, a client panel) or an optional peer. It carries a comment that names the reason. An optional peer's import catches the missing-module error and falls back, or fails with a message that names the package to install.
  - No `Date` in `domain`, `contract` or `services`. A `Date` appears only where a third-party API demands one, converted from or to `Temporal` on that line, with a comment naming the API.
  - No hand-written `useMemo`, `useCallback` or `memo`; the React Compiler memoizes.

## Naming and layout

Applies to every repo kind. Database names are in [`data-conventions.md`](data-conventions.md).

- **One name per concept** across every adapter, example and doc.
  - The declarative definition has one name, and every runtime instance an adapter creates has one short name (better-supabase: `betterSupabase` and `bs`).
  - Never let near-mirror names sit side by side (`sb` next to `bs`), and never name an instance after its framework (`next`, `browser`, `server`, `mcp`).
- **Same operation, same method name** in every adapter. A Next adapter's `server()` next to a server adapter's `context()` for the same operation is a bug, and so is `handle` in one adapter and `handler` in another.
- **Factories and types.**
  - `define*` returns a declarative value, and `create*` returns a runtime instance.
  - Every adapter factory returns `<Prefix><Thing>`, with one prefix for the library.
  - Options types are `<Thing>Options`, with no verb prefix (`DefineSupabaseOptions` and `CreateQueriesOptions` are drift).
  - A `./client` subpath exports `createClient`, not a name after the platform such as `createBrowser`.
- **Acronyms are written as words:** `toOrpcError`, `OpenApi`, `McpServer`.
- **Objects keyed by user data** (tables, query keys) put their own members behind a `$` prefix (`$key`, `$tableName`), so a table named `key` cannot collide with them. A name is never both a property and a method.
- **Generic propagation.** Every adapter factory carries every type parameter of the definition. A type test per adapter proves that a refinement on the definition, such as `.claims(schema)`, reaches the handler (`auth.claims`).
- **Server and client layout.**
  - One folder per concern: `lib/supabase/index.ts`, `server.ts` and `client.ts`, matching Supabase's Next.js guide. Never `.server.ts` or `.client.ts` suffixes.
  - A Next `server.ts` starts with `import "server-only"`.
  - Generators never write a path that two adapters would both claim. Hono and oRPC create `bs` in their entry file, and each edge function gets its own `server.ts`.
- **Enforcement.**
  - `docs:drift` fails on old instance names, old file paths, and API members that are not in `api/exports.json` (or the repo's exported API list).
  - It walks files with `fs.glob`, excludes `node_modules` and `.next`, and skips the Naming page.
  - A breaking rename ships a docs "Naming" page and a changeset, each ending in a table from the old name to the new one.
