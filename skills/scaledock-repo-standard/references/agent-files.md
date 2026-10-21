# AI files

AGENTS.md, the seed topic files, rules, the "When you change X, also update Y" table, the other AI files, and the writing rules.

Applies to every repo kind. A repo whose AGENTS.md holds every rule within the size limit skips `.agents/rules`, and keeps only the table rows it has.

## `AGENTS.md`

At most 12 KB, not counting the managed blocks. Tools write those blocks between their own markers: Next.js (`<!-- BEGIN:nextjs-agent-rules -->`, written by `next dev`) and Turborepo. They stay at the end, are committed as written, and are never edited by hand. Because `CLAUDE.md` holds only `@AGENTS.md`, Next.js writes its block into AGENTS.md and leaves `CLAUDE.md` alone. Sections:

- What the repo is
- Commands
- Layout
- Numbered invariants
- Conventions
- Agent workflow: one branch and one PR per chat or plan (see [`git-workflow.md`](git-workflow.md))
- A "When you change X, also update Y" table
- Hard rules
- Deviations: one line per ADR
- Pre-release pins: package, version and why
- A pending TypeScript upgrade checklist, only while a TypeScript minor is in pre-release (below)
- A rules table, and links to `docs/agents/*.md`

Anything longer moves into a rule or a topic file. A correction needed twice goes into a topic file.

### Pending TypeScript upgrade

While a TypeScript minor is in pre-release, AGENTS.md carries this checklist, and the bump commit removes it (see [`toolchain.md`](toolchain.md)):

```md
## Pending TypeScript <minor> upgrade

Waits for the stable <minor> release and a matching oxlint-tsgolint build. Never install the pre-release.

- [ ] `typescript` in the catalog, at the stable release that clears `minimumReleaseAge`.
- [ ] Every override, `peerDependencies` range and `peerDependencyRules` entry that names `typescript`.
- [ ] `oxlint-tsgolint` at the build for that release, in the same commit.
- [ ] `typecheck:matrix` passing on every version it lists.
- [ ] The bundle, type and CLI-startup baselines, before and after, in the commit.
- [ ] The `target` and `lib` year, decided separately against the runtime.
```

## Seed topic files

Every repo starts `docs/agents/` with at least these notes:

- **`formatting.md`:**
  - A formatter reflow after a rename can move the line that an `oxlint-disable-next-line` or `@ts-expect-error` directive must sit above. Put the directive directly above the exact property or expression line it covers, and check it again after `pnpm format`.
  - Revert unrelated regenerated output, such as a version header that a generator rewrote, instead of committing it.
- **`audit-rejected-findings.md`:** findings an audit raised and rejected after checking the code, one line each with the reason. Audits read it first so they do not reopen them (PermDock).

Further notes for every repo:

- **Open-source repos never name customers or private adopters** in code, tests, docs, changesets or commit messages. Describe the shape ("an adopter with a bigint id") instead.
- **Gaps in a sibling library.** When work in one repo hits a bug or missing feature in a library the org owns (better-supabase, PermDock), collect it into a prompt for that repo instead of working around it silently, and link the workaround to it.
- **Vendor rules after a reinstall.** An installer can rewrite a rule's frontmatter. An argent reinstall writes `.claude/rules/argent.md` with `alwaysApply: true`, which Claude Code ignores, so the 17 KB rule loads every session; restore its `paths:` (Lienlink `native.md`). Diff `.claude/rules` and `.agents/rules` after any installer run.

## Rules

- `.agents/rules/*.mdc` is the source. Each rule has `description`, `globs` and `alwaysApply` frontmatter for Cursor, plus `paths` for Claude Code.
- `.cursor/rules` is a symlink to `.agents/rules`, and `.claude/rules/<name>.md` symlinks each file.
- Always-on rules: `architecture`, `writing` and `git-workflow` (the agent workflow from [`git-workflow.md`](git-workflow.md)). Everything else is path-scoped.
  - Once the `architecture` rule passes about 10 KB, path-scope it to the source files (`**/*.ts`, `**/*.tsx`) and keep the AGENTS.md invariants as the always-on summary (CentraKit ADR 0028). Every always-on byte loads in every session, including docs-only and SQL-only work.
- A repo with a CLI ships a `cli` topic rule with `globs` on the CLI source and tests folders. It holds the layout, the contract (exit codes, envelope, problem codes, effects, `FilePlan`, agent mode, secrets, completion), the flag vocabulary, the renames table and the CLI tests from [`cli.md`](cli.md). The naming rule repeats the flag vocabulary.

## "When you change X, also update Y"

At least these rows:

| Change                   | Also update                                                                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Domain table             | schema, migration, RLS, pgTAP, audit trigger, generated types, domain schema, permissions                                                                                                            |
| Env key                  | t3-env, all three Vercel environments, `turbo.json`, `.env.example`                                                                                                                                  |
| Permission               | its feature (table, RLS, API, MCP, UI)                                                                                                                                                               |
| Contract procedure       | `openapi()` meta, router bind, OpenAPI snapshot, MCP opt-in                                                                                                                                          |
| MCP tool                 | contract `mcp.ts`, permission, MCP tests, docs MCP page                                                                                                                                              |
| CLI command or flag      | the manifest entry and its `effects`, the docs page and its Side effects table, the help snapshot, completion, a `core/renames.ts` row and codemod entry when a released name changes, the changeset |
| OAuth client or redirect | `config.toml`, the hosted project, `env:local`                                                                                                                                                       |
| i18n copy                | every `.po` catalog                                                                                                                                                                                  |
| Route                    | `lib/navigation.ts`, docs page, axe coverage                                                                                                                                                         |
| UI primitive             | `DESIGN.md`                                                                                                                                                                                          |
| Entity or integration    | the icon map, `lib/integrations.ts`, its docs page, the completeness tests                                                                                                                           |
| Package version          | `server.json`                                                                                                                                                                                        |
| Dependency bump          | catalog, the "Pre-release pins" list, a note on the absorbed API changes, an ADR if a one-library line changes                                                                                       |
| `typescript` bump        | `oxlint-tsgolint` in the same commit, and the pending TypeScript upgrade checklist removed from AGENTS.md                                                                                            |
| Lint rule turned on      | the comment and count beside each remaining `off` line, the ADR or deviation that lists lint backlogs                                                                                                |
| Next.js bump             | run `next dev` once and commit the refreshed managed AGENTS.md block                                                                                                                                 |
| User-visible change      | a changeset                                                                                                                                                                                          |
| File move                | Knip entries, the `docs:drift` paths                                                                                                                                                                 |
| Rename                   | the docs Naming page, the `docs:drift` naming test, the changeset's old-to-new table                                                                                                                 |
| Perf-sensitive change    | the bundle, type and CLI-startup baselines, with before and after numbers in the commit                                                                                                              |

With Expo, add these rows and extend the matching rows above:

| Change                       | Also update                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| Native module or plugin      | `app.config.ts` plugins, `expo prebuild` for the platform, a dev-client rebuild, the app config test |
| Domain table (Offline: yes)  | the PowerSync publication, a sync stream, the `packages/sync` schema, the `.native.ts` hook twin     |
| Expo i18n key                | every `translations/<locale>.json` catalog                                                           |
| Env key read by an EAS build | the matching EAS environment                                                                         |
| Shared primitive             | both platform twins (`.tsx` and `.web.tsx`) and the gallery screen                                   |

## Other files

- `CLAUDE.md` contains only `@AGENTS.md`.
- `PRODUCT.md`: the promise, users, scope, voice, and what we never claim.
- `DESIGN.md`: the shared tokens, type roles and "Reject these" list at the root, plus one `DESIGN.md` per web app for its layouts, shared components and exceptions to the `reui` rules (see [`web-design.md`](web-design.md)).
- `docs/decisions/`: the ADRs.
- MCP config in `.mcp.json`, `.cursor/mcp.json` and `.vscode/mcp.json`: the product MCP, the docs MCP, the Vercel MCP, shadcn, ReUI, and `next-devtools-mcp` with Next.js.

## Writing

- Plain, complete sentences.
- No em dashes or arrow chains in prose.
- Never "simply", "seamless", "robust" or "leverage".
- No emojis or exclamation marks.
