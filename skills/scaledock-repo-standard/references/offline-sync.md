# Offline sync with PowerSync

PowerSync on native, `packages/sync`, sync streams, the client database, writes, the local stack, and tests.

Applies to Expo surfaces with Offline set to yes. Web never uses it.

## Scope

- **Native only.** iOS and Android read from a local SQLite database that PowerSync keeps in sync with Supabase. A universal app's web build reads Supabase directly, because it is online and already has a live connection.
- **One read, two sources.** Each feature hook has a `.native.ts` twin that reads PowerSync; the web hook and the SSR loader call the shared `services` query function. Both return the same domain type from `types.ts`.
- **RLS still decides.** Sync streams select only rows the user may read, and every write goes back through Supabase or the API as the signed-in user.

## `packages/sync`

Per-file exports, no barrel:

- `schema`: the PowerSync table schema, derived from the generated database types for every synced table.
- `tables`: the list of synced tables.
- `connector`: `fetchCredentials` (the Supabase access token) and `uploadData` (applies the queued CRUD batch through Supabase, or the API for commands).
- `database`: opens the database with op-sqlite.
- `react`: the provider and hooks, with `@powersync/react` and its TanStack Query integration.
- `pending`: the state of the upload queue, for the app's sync status UI.
- `env`: the PowerSync URL, through t3-env.
- `powersync/sync-config.yaml`: the sync streams.
- `powersync/local/docker-compose.yaml`: the local PowerSync service.

`sync` imports only `supabase` and `domain` (see [`architecture.md`](architecture.md)).

## Sync streams

- One stream per access path, scoped by organization through the same permission lookups RLS uses.
- Use `IN (SELECT ...)` or `INNER JOIN`, never `EXISTS`, which the service dialect does not support.
- Never `OR` a direct `col = auth.user_id()` with an `IN (SELECT ...)` in one stream: the two branches become different bucket kinds, and a row selected by both syncs twice and fails the checksum. Route the own-row branch through a lookup too.
- The Supabase publication lists every synced table. Adding a domain table that native reads means updating the publication, the stream, `schema` and the native hook twin (see [`agent-files.md`](agent-files.md)).
- A schema test checks that every synced table is in the publication, the PowerSync schema and a stream, and that the streams avoid the patterns above.

## Client database

- One database handle per JS runtime, created at module scope in the native provider. A Fast Refresh remount reuses it; never open a database in component state.
- Lists render local rows as soon as they exist, without waiting for the first full sync, and show the sync state from `pending`.
- Writes are optimistic in SQLite and queued for `uploadData`. A rejected upload surfaces as a sync problem the user can see and resolve; it is never dropped silently.
- Sign-out disconnects and clears the local database.

## Local stack

- `sync:start`, `sync:stop`, `sync:reset` and `sync:logs` drive the local docker compose service.
- The compose file inlines every local value with a default; there is no PowerSync `.env`.
- Locally, auth uses the Supabase JWKS URI with `audience: [authenticated]`. Hosted PowerSync uses the Supabase auth integration.
- `supabase:reset` also runs `sync:reset`, so sync storage never outlives the database it mirrors.
- CI validates the sync config on changes under `packages/sync/powersync/**`.

## Hosted

- One PowerSync instance per Supabase project (development, preview, production), connected through its database replication role.
- The instance URL is an env key in Vercel and in the matching EAS environment.
