# Data conventions

Timestamps, calendar dates and time zones, money, ratios, IDs, naming, standard codes, foreign keys, pagination and deletion, from the database through the contract to display.

Applies to product repos with Database set to yes. The wire-format rules also apply to every `api`, `mcp` and `cli` surface. Tenancy and RLS are in [`data-permissions.md`](data-permissions.md).

## Timestamps

- Columns are always `timestamptz`, never `timestamp`. The database, the Vercel functions and CI run in UTC.
- On the wire, timestamps are ISO 8601 in UTC with a `Z` suffix (Valibot `isoTimestamp`).
- Convert to the user's time zone only at display, through the next-intl or i18next formatters, or date-fns with `@date-fns/tz`. Never store local time.

## Calendar dates and time zones

- A calendar day (a birthday, a due date) is a `date`, sent as `YYYY-MM-DD` (Valibot `isoDate`). Never use a midnight timestamp for a day.
- User and organization time zones are IANA names (`Europe/Amsterdam`), never offsets.
- A recurring local time stores the local time plus the IANA zone, never a precomputed UTC instant.

## Money

- Amounts are integers in minor units: `amount_minor bigint` plus `currency char(3)` (ISO 4217), as Stripe does.
- Never `float`, `real`, `numeric` or `money`. On the wire and in TypeScript an amount is an integer `number` with its currency, never a formatted string.
- The minor-unit exponent comes from the currency (JPY has 0, EUR has 2): read it from `Intl.NumberFormat` with `style: "currency"` (`resolvedOptions().maximumFractionDigits`), never assume 2.
- Format only at display, through the i18n formatter.

## Ratios and quantities

- Percentages and rates are integer basis points (`rate_bps integer`, 10000 is 100%).
- Quantities are integers in their smallest unit. No floats for business values.

## IDs

- **UUID** for every entity that is user-facing, tenant-scoped, or appears in a URL, the API, MCP, the CLI or a PowerSync sync stream: `id uuid primary key`. Clients may generate it, which offline writes need.
- **UUIDv7 when available.** Default to `uuidv7()` when the project's Postgres major provides it (18 or later); otherwise `gen_random_uuid()`, and switch the default on upgrade with no schema change. Check the Supabase Postgres version at run time, never from memory.
- **Integer** only for internal, append-heavy tables (`audit_events`, event and log tables, queue rows): `id bigint generated always as identity`. These IDs never leave the server.
- Never `serial`, and never expose an integer ID. Join tables use a composite primary key of their two foreign keys.

## Naming and standard columns

- SQL is snake_case: plural table names, `<singular>_id` foreign keys, `_at` for timestamps, `_on` for dates, and `is_` or `has_` for booleans.
- JSON on the wire is camelCase. `services` maps rows to domain types, so `contract` never exposes the row shape.
- Every table has `created_at timestamptz not null default now()` and `updated_at timestamptz not null default now()`, kept current by one shared `set_updated_at()` trigger, with a pgTAP case per table.

## Standard codes

- ISO 4217 for currencies, ISO 3166-1 alpha-2 for countries, BCP 47 for locales and E.164 for phone numbers.
- Emails are stored lowercased, with a unique index on `lower(email)`, or as `citext`.
- Each code has one Valibot schema in `packages/domain`.

## Foreign keys

- Every foreign key has an index and an explicit `on delete` (`cascade`, `restrict` or `set null`). Never rely on the default.

## Pagination

- List procedures page with keyset cursors on `(created_at, id)`, or on `id` alone with UUIDv7, and return an opaque `nextCursor`. Never offset.
- The contract has one shared cursor input and page output schema.

## Deletion

- Hard delete by default; the audit log keeps the history.
- Add `deleted_at timestamptz` only when a feature needs restore, with an ADR. Its RLS policies and queries then filter on it.
