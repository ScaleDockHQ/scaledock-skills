# Multi-tenancy, data and permissions

URL tenancy, guards, tenant tables, Supabase, better-supabase, the audit log, and PermDock. Auth across surfaces is in [`auth.md`](auth.md), and column types, IDs and naming are in [`data-conventions.md`](data-conventions.md).

Applies to product repos with Database or Roles and permissions set to yes. Offline sync on Expo is in [`offline-sync.md`](offline-sync.md).

## Which package owns what

- **`@supabase/server`** verifies bearer tokens over JWKS and builds the request context: `createRequestSupabaseContext(request, { env, auth: "user" })`. Nothing else verifies tokens.
- **`@supabase/ssr`** owns web session cookies, and only the proxy refreshes them.
- **better-supabase** wraps those contexts with the generated types and `Result` repositories through its framework subpaths. Apps import the subpath, not `@supabase/server` directly.
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

- Provisioned through the Marketplace. Look up the minimum Supabase CLI version at run time; the local stack, `pg-delta` and asymmetric local keys need a recent one.
- **Local stack.** `config.toml` sets `[experimental] stack = true`. The stack runs as native processes, without Docker, and each directory gets its own, so worktrees, agent sandboxes and CI runners each start one. Docker still works where it exists.
- **Declarative schemas on `pg-delta`.** `config.toml` sets `[experimental.pgdelta] enabled = true`.
  - The files in `supabase/schemas/` are the source of truth, in the per-schema layout (`schemas/public/tables/<table>.sql`). `pg-delta` orders statements by their dependencies, so files are not numbered and `[db.migrations] schema_paths` is not set.
  - Migrations come from `pnpm supabase:diff` (`supabase db schema declarative sync -f <name>`) and are reviewed. Never `supabase db diff`, and never change the schema in Studio, the SQL editor or `psql`; the diff does not see those changes.
  - Data changes (including storage buckets) go in seeds or hand-written migrations. Objects `pg-delta` does not track go in `supabase/schemas/_custom/`, delivered by a versioned migration that sorts before the migration that depends on them.
- **Config in code.** Auth, API and storage settings live in `config.toml`. `pnpm supabase:pull` (`supabase config pull`) brings a dashboard change back into the file; no setting lives only in the dashboard.
- `[remotes.main]` and `[remotes.develop]`. The GitHub integration applies migrations; never `db push` from CI.
- ES256 signing key from `pnpm supabase:signing-key`, gitignored. Legacy HS256 tokens are rejected by `@supabase/server`.
- RLS on every table, with pgTAP tests.
- Regenerate the types for `public` and `graphql_public` together.

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
