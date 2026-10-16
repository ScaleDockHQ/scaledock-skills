# Audit, placeholders and repo kinds

The placeholders, which references apply to each repo kind, the gap-table shape and status words, the checklist an upgrade or align run walks row by row, and the performance audit recipe.

## Placeholders

Resolve these from the inputs before you write any file.

- `{{REPO_NAME}}`: the repository name.
- `{{SCOPE}}`: the npm scope, without the `@`.
- `{{app}}` and `{{APP}}`: the product slug in lower case (`acme`) and upper case (`ACME`), derived from the repo name unless the user names another one. `{{APP}}` prefixes env vars such as `{{APP}}_TOKEN`.
- `{{bin}}`: the CLI binary name. For a product CLI it is `{{app}}`.
- `{{lib}}`: the library name, for a library CLI.

## Repo kinds

"Selected" means the reference applies when the inputs pick its surface or option. A reference marked "no" is `n/a` for that kind and needs no ADR.

| Reference             | `product`            | `library`                  | `tooling`                                                 |
| --------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `skills.md`           | yes                  | `find-skills` and stack    | `find-skills` only                                        |
| `toolchain.md`        | yes                  | yes                        | yes, minus workspace tsconfig and Knip without TypeScript |
| `architecture.md`     | yes                  | `packages/` and code rules | naming rules only                                         |
| `performance.md`      | yes                  | yes                        | baselines and CLI startup only                            |
| `lint-format.md`      | yes                  | yes                        | only for JS or TS code                                    |
| `vercel.md`           | yes                  | docs site only             | no                                                        |
| `local-dev-env.md`    | yes                  | docs site only             | no                                                        |
| `nextjs.md`           | web surfaces         | docs site only             | no                                                        |
| `i18n.md`             | web or Expo surfaces | no                         | no                                                        |
| `ui.md`               | Next.js `app`        | no                         | no                                                        |
| `app-shell.md`        | Next.js `app`        | no                         | no                                                        |
| `expo.md`             | selected             | no                         | no                                                        |
| `offline-sync.md`     | selected             | no                         | no                                                        |
| `data-permissions.md` | selected             | no                         | no                                                        |
| `data-conventions.md` | selected             | no                         | no                                                        |
| `auth.md`             | selected             | no                         | no                                                        |
| `api.md`              | selected             | no                         | no                                                        |
| `mcp.md`              | selected             | selected                   | no                                                        |
| `cli.md`              | selected             | library CLI                | tooling CLI                                               |
| `docs-site.md`        | selected             | yes                        | no                                                        |
| `ai.md`               | selected             | no                         | no                                                        |
| `git-workflow.md`     | yes                  | yes                        | yes, Changesets only when it publishes                    |
| `ci.md`               | yes                  | yes                        | yes                                                       |
| `tests.md`            | yes                  | yes                        | only for code                                             |
| `agent-files.md`      | yes                  | yes                        | yes                                                       |
| `repo-files.md`       | yes                  | yes                        | yes                                                       |

## Gap table

One row per checklist item below. In align mode, repeat the Status and Current columns once per repo.

| Area | Item | Reference | Status | Current | Action |
| ---- | ---- | --------- | ------ | ------- | ------ |

Status is one of:

- `done`: matches the standard.
- `gap`: differs, and this run fixes it.
- `kept`: differs on purpose; name the ADR.
- `n/a`: the repo kind or inputs exclude it.
- `behind`: a dependency behind latest or on an older major; name the current and latest versions.
- `blocked`: a gap this run cannot fix (a pre-release that fails `minimumReleaseAge`, a manual step); say why.

## Checklist

Open the reference only to judge its rows.

- **Toolchain** ([`toolchain.md`](toolchain.md)): Node major in `.node-version`, `.nvmrc`, `engines` and `devEngines`; pnpm pinned exactly; the `pnpm-workspace.yaml` settings; the catalog and `catalogMode: strict`; no workspace key the installed pnpm rejects; stable native TypeScript with no `@typescript/native-preview`, and `@typescript/typescript6` only as a catalog alias with an ADR; tsconfig presets without `baseUrl`; Knip; the exact root script names; `verify` covering every CI gate as one cached `turbo run` in a Turbo workspace, with no check run twice.
- **Dependencies:** one `behind` row per dependency, action and SDK that is behind latest.
- **Skills** ([`skills.md`](skills.md)): the installed set and `skills-lock.json`, both committed and not gitignored; every installed skill tracked in the lock; in a repo that publishes skills, `pnpm dlx skills add . --list` offers only its own; retired Next.js knowledge skills removed.
- **Architecture** ([`architecture.md`](architecture.md)): the folder tree, boundary tags, contract first, Problem Details, one library per concern, `env.ts`, standard services, code rules.
- **Naming** ([`architecture.md`](architecture.md)): one name per concept and per operation across adapters and docs, `define*` and `create*`, `<Prefix><Thing>` and `<Thing>Options`, acronyms as words, `$` members on user-keyed objects, generic propagation tests, `lib/supabase/{index,server,client}.ts`, and a `docs:drift` naming check.
- **Performance** ([`performance.md`](performance.md)): baselines recorded; `Cache-Control` and `text/markdown; charset=utf-8` on agent routes, built in `"use cache"`; no `"use client"` on static sections; lazy Ask AI and other heavy panels; library runtime rules; generated metadata as `.js` plus `.d.ts`; a bundle gate on consumer fixtures; CLI startup within budget.
- **Dates** ([`architecture.md`](architecture.md)): `Temporal` through `packages/domain/src/temporal.ts`; any date-fns, dayjs, luxon or moment dependency is a `gap`.
- **Lint and format** ([`lint-format.md`](lint-format.md)): Ultracite 8 on Oxlint and Oxfmt: a root `oxlint.config.ts` with the core, vitest and anti-slop presets, type-aware linting and `denyWarnings`, house rules after the presets, workspace configs that extend the root plus the react and next presets, `oxfmt.config.ts` spreading `ultracite/oxfmt`, `pnpm check` running `ultracite check`, no `packages/ox-config`, every disabled rule with a reason and a count.
- **Platform** ([`vercel.md`](vercel.md), [`local-dev-env.md`](local-dev-env.md)): the needs table, Services and rewrites, `turbo.json`, Remote Cache, Portless, env files and sources.
- **Web** ([`nextjs.md`](nextjs.md), [`i18n.md`](i18n.md), [`ui.md`](ui.md), [`app-shell.md`](app-shell.md)): `createNextConfig()` with no unused experimental flag, Markdown negotiation through rewrites, no `proxy.ts` without a `matcher`, the architecture rules, i18n, the component stack, the shell and screens.
- **Expo** ([`expo.md`](expo.md), [`offline-sync.md`](offline-sync.md)): the shape, app config and variants, EAS, native UI, Uniwind, auth, push, universal web, PowerSync.
- **Data and identity** ([`data-permissions.md`](data-permissions.md), [`auth.md`](auth.md)): tenancy, Supabase, RLS and pgTAP, the audit log, PermDock, the OAuth server, the consent route, keys and clients. `@supabase/server` 1.x names (`withSupabase`, `createSupabaseContext`; any `createRequestSupabaseContext` or 0.x `allow` option is a `gap`), the `pipeline` form from `@supabase/middleware` for MCP auth, plural key env vars, named secret keys per server-to-server caller, `tracePropagation: true` on every Supabase client, Postgres Changes subscriptions with `select`, and no `delete from storage.objects`.
- **Supply chain** ([`toolchain.md`](toolchain.md), [`ci.md`](ci.md)): `blockExoticSubdeps: true` set explicitly, a non-blocking `pnpm audit signatures` step, no `pull_request_target` workflow that checks out PR code, no `allow-unsafe-pr-checkout`, and npm trusted publishing only from `push`, `release` or `workflow_dispatch`.
- **Supabase project** ([`data-permissions.md`](data-permissions.md)): Supabase CLI 2.119.0 or later; `[experimental] stack = true` with no hard-coded ports; `supabase:start` and CI on `--runtime native`; local URLs and keys read from `supabase start --output-format json`; `[experimental.pgdelta] enabled = true` with no `schema_paths`; `supabase:diff` running `db schema declarative sync --no-apply` in scripts and CI; no `config.toml` drift after `pnpm supabase:pull`. To move an existing repo onto `pg-delta`:
  1. Create a baseline with `supabase db pull` if the repo has no migrations. A repo on declarative schemas with `migra` gets a catch-up migration from its first `db pull`; review and commit it.
  2. Enable `pg-delta`, remove `schema_paths`, and export the schema with `supabase db schema declarative generate --linked --overwrite`.
  3. Replace `supabase db diff` in scripts and CI, and drop any `supabase stop` before diffing.
  4. Run `pnpm supabase:diff`; it must report no changes before the first new migration.
- **Stripe** ([`data-permissions.md`](data-permissions.md)), with Stripe: Data Pipeline connected to each Supabase project; billing reads and entitlement checks served from `stripe_sdp` through `security_invoker` views or functions under RLS, with no Stripe API call on a request path; `stripe_sdp` absent from `supabase/schemas/` and the exposed schemas; a seeded fixture schema locally; webhook handlers limited to side effects. A handler that mirrors Stripe objects into app tables is a `gap`.
- **Data conventions** ([`data-conventions.md`](data-conventions.md)): `timestamptz` and UTC on the wire, `date` and IANA zones, integer money with a currency, basis points, UUID versus integer IDs and UUIDv7, naming and `created_at`/`updated_at`, standard codes, indexed foreign keys with `on delete`, keyset pagination, the deletion policy.
- **Programmatic** ([`api.md`](api.md), [`mcp.md`](mcp.md), [`cli.md`](cli.md)): the Hono shell, OpenAPI snapshot, MCP SDK and tools, CLI kind and behavior.
- **Docs and AI** ([`docs-site.md`](docs-site.md), [`ai.md`](ai.md)): Fumadocs formats and pages, lazy Ask AI, twoslash only with twoslash blocks, AI Gateway.
- **Delivery** ([`git-workflow.md`](git-workflow.md), [`ci.md`](ci.md), [`tests.md`](tests.md)): branches and protection, required status checks configured on the working branch and `main`, coverage `autoUpdate` off in CI, commitlint, lefthook, Changesets, `release.yml`, workflows, GitHub-owned actions on major tags and third-party actions on a commit SHA with a `# vX.Y.Z` comment, same-repo actions as `$/...` with the actionlint ignores, zizmor on public repos, the `static` job with a `parallel` group plus heavy-gate jobs, timing-sensitive gates in their own jobs, a `build` job ahead of `verify` only where the measured longest chain already runs behind it, heavy suites gated on `turbo query affected`, the Remote Cache active in CI (`TURBO_TEAM` in `gh variable list` and no `outcome=skipped` on its step), services as `background` steps, `timeout-minutes` on every job, caches saved only from the default branch, `cache-mode` on low-trust and release workflows, `queue: max` on release and deploy concurrency, no `macos-14` and no Node 20 actions, the lefthook shape (`ultracite fix` on staged files, commitlint, affected checks on push), the direct-to-develop variant recorded in an ADR when used, Dependabot, test runners.
- **Repo files** ([`agent-files.md`](agent-files.md), [`repo-files.md`](repo-files.md)): AGENTS.md and its managed blocks, rules, `CLAUDE.md`, the MCP config servers, ADRs, README, root files, `.github`, VS Code.

## Performance audit

Use this recipe when the user asks for a performance or caching audit, or when the Performance row has many gaps.

1. Record the baselines from [`performance.md`](performance.md) before reading any code closely.
   - CI timing: `gh run list --workflow <name> --branch <default branch>` for recent runs, then `gh run view <id> --json jobs` for each job's and step's `startedAt` and `completedAt`. Find the slowest chain of `needs`.
   - Record the setup time, the post-step time, builds repeated across jobs, how often pushes to the default branch fail, and the wall-clock time of a PR run. Record the wall-clock time again after the change.
2. Run one parallel read-only explorer per area: library runtime, auth and adapters, bundle and types, web apps, CLI, and the verify pipeline. Each returns findings with a file, a line and a severity.
3. Confirm every high-severity claim in the code yourself before it enters the plan. Explorers overstate; confirming them also surfaces real correctness bugs.
4. Group the confirmed findings into tracks, one per area, and ask the user which tracks to include.
5. Make one commit per track on the run's one branch, each with the before and after numbers for the baselines it moves.
6. Record the baselines again and put both sets in the report.
