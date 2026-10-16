# Multi-tenancy, data and permissions

URL tenancy, guards, tenant tables, Supabase, Stripe data, better-supabase, the audit log, and PermDock. Auth across surfaces is in [`auth.md`](auth.md), and column types, IDs and naming are in [`data-conventions.md`](data-conventions.md).

Applies to product repos with Database or Roles and permissions set to yes. Offline sync on Expo is in [`offline-sync.md`](offline-sync.md).

## Which package owns what

- **`@supabase/server`** (1.x) verifies bearer tokens over JWKS and builds the request context: `withSupabase({ auth: "user" }, handler)`, or `createSupabaseContext(request, { auth: "user" })` where the caller shapes the error response. Nothing else verifies tokens.
  - Composable steps use `pipeline` from `@supabase/middleware` with the `@supabase/server/middleware/*` entries; the primitives (`verifyCredentials`, `createContextClient`, `createAdminClient`) live in `@supabase/server/core`.
  - It reads `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEYS`, `SUPABASE_SECRET_KEYS` and `SUPABASE_JWKS` (or `SUPABASE_JWKS_URL`). Use the plural, named-key forms; the singular ones are fallbacks.
  - Code written against 0.x follows its `MIGRATION.md` (`allow` became `auth`, `"public"` became `"publishable"`, `claims` became `jwtClaims`).
- **`@supabase/ssr`** owns web session cookies, and only the proxy refreshes them. Server code hands the refreshed access token to `verifyCredentials` from `@supabase/server/core`; never trust `getSession()` on the server.
- **better-supabase** wraps those contexts with the generated types and `Result` repositories through its framework subpaths. Apps import the subpath, not `@supabase/server` directly.
  - The definition is named `betterSupabase`, and every runtime instance an adapter creates is named `bs`, in code and docs alike. Adapter factories return `Better<Thing>` (`BetterNext`, `BetterClient`, `BetterPostgres`), and the `./client` subpath exports `createClient`.
  - Each app keeps its instances in `lib/supabase/` as described in the naming rules in [`architecture.md`](architecture.md).
- **`packages/supabase`** re-exports the typed clients and holds the one `createAdminContext()` (`server` subpath), the only place `sb_secret_` is read.
- **`@supabase/supabase-js`** follows better-supabase's peer range. The next major is published on the `next` tag; adopt it only once that peer range allows it, and record a `blocked` row until then.

## Multi-tenant (default: yes)

- **URL tenancy:** `app/[locale]/(app)/[orgSlug]/...`. No organization cookie and no organization header. Expo apps keep the selected organization in app state and pass its ID to every read and command; RLS still decides access.
- **Proxy.** `proxy.ts` handles session refresh, auth redirects and locale only. It skips the refresh on prefetch requests.
- **Guards.** `requireOrganizationAccess({ orgSlug, permission })` runs in Suspense islands. Unknown slugs call `notFound()`. System routes live outside `[orgSlug]` under a system permission scope.
- **Tables.**
  - Every tenant table has `organization_id` and an `*_organization_idx` index.
  - RLS uses `organization_id in (select public.org_ids_with_permission('key'))`.
  - Cache tags are scoped by `organizationId`.
- **Roles** are tenant-scoped in PermDock. JWT claims stay compact and are hints only.
- **Lifecycle:** create, switch, delete, invite and transfer ownership. An optional portal lives at `/{orgSlug}/portal`.

## Supabase

- Provisioned through the Marketplace. The local stack and `pg-delta` need Supabase CLI 2.119.0 or later; look up the latest at run time and use it.
- **A local project per agent.** `config.toml` sets `[experimental] stack = true`, committed so every worktree gets it. New repos run `SUPABASE_EXPERIMENTAL_STACK=1 supabase init`; existing repos add the flag and follow Supabase's port-removal checklist before the first start.
  - Each worktree, agent sandbox and CI runner starts its own project, on ports the CLI picks and remembers. Never hard-code ports or share a project between checkouts.
  - **Native runtime first.** `supabase start --runtime native` runs every service as a plain process on macOS 14 or later on Apple silicon and on Linux (amd64 or arm64, glibc 2.35 or later). Docker or Podman is the fallback only where native is unsupported.
  - Services other than Postgres sleep until their first request. Pass `--eager` only when a task needs everything up front.
  - The experimental engine keeps its data apart from a legacy local project, so the first start after switching begins from migrations and seeds.
- **Declarative schemas on `pg-delta`.** `config.toml` sets `[experimental.pgdelta] enabled = true`. Postgres 14 to 18 only. With `stack = true`, the two shadow databases run on the native runtime too.
  - The files in `supabase/schemas/` are the source of truth, in the per-schema layout (`schemas/public/tables/<table>.sql`). `pg-delta` orders statements by their dependencies, so files are not numbered and `[db.migrations] schema_paths` is not set.
  - Migrations come from `pnpm supabase:diff` (`supabase db schema declarative sync -f <name> --no-apply`) and are reviewed before `supabase migration up`. Never `supabase db diff`, and never change the schema in Studio, the SQL editor or `psql`; sync reads only the files.
  - Rewrite every statement the CLI flags as destructive before applying it. A renamed column comes out as a drop and an add, which loses its data.
  - When a change is already live on the linked project, run `supabase db pull` to record it in the migration history, then `supabase db pull --declarative` to refresh the files. Otherwise the next sync generates it again and `db push` fails.
  - `pg_cron` jobs and `pgmq` queues are schema: `pg-delta` changes them through the extension's own functions, and flags drops as destructive.
  - Data changes (including storage buckets) go in seeds or hand-written migrations. Objects `pg-delta` does not track go in `supabase/schemas/_custom/`, delivered by a versioned migration that sorts before the migration that depends on them.
- **Config in code.** Auth, API and storage settings live in `config.toml`. `pnpm supabase:pull` (`supabase config pull`) brings a dashboard change back into the file; no setting lives only in the dashboard.
- `[remotes.main]` and `[remotes.develop]`. The GitHub integration applies migrations; never `db push` from CI.
- ES256 signing key from `pnpm supabase:signing-key`, gitignored. Legacy HS256 tokens are rejected by `@supabase/server`.
- **Realtime.** Postgres Changes subscriptions set `select` to the columns the UI needs, and filter on the server with AND filters across columns (`status=eq.open,team=eq.billing`) or `postgresChangesFilter()`. Delivery is best effort, so never copy data with Postgres Changes. Replication goes through Supabase Pipelines, whose publications use row filters and column lists because Pipelines bypasses RLS.
- **Storage.** Remove objects through the Storage API, never with `delete from storage.objects`, and never set `storage.allow_delete_query`. List with `listV2`.
- RLS on every table, with pgTAP tests.
- Regenerate the types for `public` and `graphql_public` together.

## Stripe data

- **Stripe Data Pipeline** syncs Stripe into the `stripe_sdp` schema of each Supabase project. Connect it in the Stripe Dashboard under Reporting, Data management, Data Pipeline, with Supabase as the destination. Stripe connects as the scoped `stripe_sdp` role with short-lived JWTs over SSL; never give it a database password.
- **Reads come from Postgres.** Entitlement checks, billing pages and revenue metrics (MRR, churn) join `stripe_sdp` tables in SQL. No Stripe API call on a request path.
- **`stripe_sdp` belongs to Stripe.** It stays out of `supabase/schemas/` and out of the exposed API schemas. Apps read it through `security_invoker` views or functions in `public`, scoped by `organization_id` under RLS, with pgTAP tests like any other table.
- **Webhooks only for side effects** that must fire at once, such as provisioning after checkout. They are verified in `apps/api` and never write a copy of Stripe data.
- **Locally,** Data Pipeline cannot reach the stack, so seeds create a fixture `stripe_sdp` schema with the tables the views read.

## better-supabase

- `pnpm db:gen` writes `database.types.ts` and the typed schema.
- Repositories return a `Result`, never throw, and run as the caller.
- Use the framework subpaths (`/next`, `/hono`, `/orpc`, `/mcp`, `/query`, `/server`, `/env`, `/storage`, `/realtime`).
- `better-supabase doctor` runs in `verify`.

## Audit log

- `audit_events`, with organization RLS.
- An `audit_row_change()` trigger on every domain table, listing ignored and redacted columns.
- A pgTAP case per table.

## PermDock

- `packages/policy` holds `definePermissions`, `resource` and `definePolicy`.
- One frozen instance per request through `permdock/next`, `/hono`, `/orpc` or `/mcp`. The UI uses `permdock/react`.
- Memberships come from the verified subject.
- `permdock rls generate`, `permdock collect --check` and `permdock doctor` run in `verify`.
- Never add a permission without its feature.
