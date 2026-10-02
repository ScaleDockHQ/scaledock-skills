# AI files

AGENTS.md, rules, the "When you change X, also update Y" table, the other AI files, and the writing rules.

## `AGENTS.md`

At most 12 KB, including the Turbo block. The Turbo block stays last and is committed as written. Sections:

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
- A rules table, and links to `docs/agents/*.md`

Anything longer moves into a rule or a topic file. A correction needed twice goes into a topic file.

## Rules

- `.agents/rules/*.mdc` is the source. Each rule has `description`, `globs` and `alwaysApply` frontmatter for Cursor, plus `paths` for Claude Code.
- `.cursor/rules` is a symlink to `.agents/rules`, and `.claude/rules/<name>.md` symlinks each file.
- Always-on rules: `architecture`, `writing` and `git-workflow` (the agent workflow from [`git-workflow.md`](git-workflow.md)). Everything else is path-scoped.

## "When you change X, also update Y"

At least these rows:

| Change | Also update |
| --- | --- |
| Domain table | schema, migration, RLS, pgTAP, audit trigger, generated types, domain schema, permissions |
| Env key | t3-env, all three Vercel environments, `turbo.json`, `.env.example` |
| Permission | its feature (table, RLS, API, MCP, UI) |
| Contract procedure | `openapi()` meta, router bind, OpenAPI snapshot, MCP opt-in |
| MCP tool | contract `mcp.ts`, permission, MCP tests, docs MCP page |
| CLI command or flag | its docs page, the help snapshot, the changeset |
| OAuth client or redirect | `config.toml`, the hosted project, `env:local` |
| i18n copy | every `.po` catalog |
| Route | `lib/navigation.ts`, docs page, axe coverage |
| UI primitive | `DESIGN.md` |
| Package version | `server.json` |
| Dependency bump | catalog, the "Pre-release pins" list, a note on the absorbed API changes, an ADR if a one-library line changes |
| User-visible change | a changeset |

## Other files

- `CLAUDE.md` contains only `@AGENTS.md`.
- `PRODUCT.md`: the promise, users, scope, voice, and what we never claim.
- `DESIGN.md`: tokens, shell, templates and overlays.
- `docs/decisions/`: the ADRs.
- MCP config in `.mcp.json`, `.cursor/mcp.json` and `.vscode/mcp.json`: the product MCP, the docs MCP, the Vercel MCP, shadcn and ReUI.

## Writing

- Plain, complete sentences.
- No em dashes or arrow chains in prose.
- Never "simply", "seamless", "robust" or "leverage".
- No emojis or exclamation marks.
