# Audit, placeholders and repo kinds

The placeholders, which references apply to each repo kind, the gap-table shape and status words, and the checklist an upgrade or align run walks row by row.

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
| `skills.md`           | yes                  | user-level only            | `find-skills` only                                        |
| `toolchain.md`        | yes                  | yes                        | yes, minus workspace tsconfig and Knip without TypeScript |
| `architecture.md`     | yes                  | `packages/` and code rules | no                                                        |
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

- **Toolchain** ([`toolchain.md`](toolchain.md)): Node major in `.node-version`, `.nvmrc`, `engines` and `devEngines`; pnpm pinned exactly; the `pnpm-workspace.yaml` settings; the catalog and `catalogMode: strict`; tsconfig presets; Knip; the exact root script names; `verify` covering every CI gate.
- **Dependencies:** one `behind` row per dependency, action and SDK that is behind latest.
- **Skills** ([`skills.md`](skills.md)): the installed set and `skills-lock.json`, both committed and not gitignored.
- **Architecture** ([`architecture.md`](architecture.md)): the folder tree, boundary tags, contract first, Problem Details, one library per concern, `env.ts`, standard services, code rules.
- **Lint and format** ([`lint-format.md`](lint-format.md)): `ox-config`, presets, pinned rules, anti-slop, oxfmt.
- **Platform** ([`vercel.md`](vercel.md), [`local-dev-env.md`](local-dev-env.md)): the needs table, Services and rewrites, `turbo.json`, Remote Cache, Portless, env files and sources.
- **Web** ([`nextjs.md`](nextjs.md), [`i18n.md`](i18n.md), [`ui.md`](ui.md), [`app-shell.md`](app-shell.md)): `createNextConfig()`, the architecture rules, i18n, the component stack, the shell and screens.
- **Expo** ([`expo.md`](expo.md), [`offline-sync.md`](offline-sync.md)): the shape, app config and variants, EAS, native UI, Uniwind, auth, push, universal web, PowerSync.
- **Data and identity** ([`data-permissions.md`](data-permissions.md), [`auth.md`](auth.md)): tenancy, Supabase, RLS and pgTAP, the audit log, PermDock, the OAuth server, keys and clients.
- **Data conventions** ([`data-conventions.md`](data-conventions.md)): `timestamptz` and UTC on the wire, `date` and IANA zones, integer money with a currency, basis points, UUID versus integer IDs and UUIDv7, naming and `created_at`/`updated_at`, standard codes, indexed foreign keys with `on delete`, keyset pagination, the deletion policy.
- **Programmatic** ([`api.md`](api.md), [`mcp.md`](mcp.md), [`cli.md`](cli.md)): the Hono shell, OpenAPI snapshot, MCP SDK and tools, CLI kind and behavior.
- **Docs and AI** ([`docs-site.md`](docs-site.md), [`ai.md`](ai.md)): Fumadocs formats and pages, AI Gateway.
- **Delivery** ([`git-workflow.md`](git-workflow.md), [`ci.md`](ci.md), [`tests.md`](tests.md)): branches and protection, commitlint, lefthook, Changesets, `release.yml`, workflows, action pinning, Dependabot, test runners.
- **Repo files** ([`agent-files.md`](agent-files.md), [`repo-files.md`](repo-files.md)): AGENTS.md, rules, `CLAUDE.md`, ADRs, README, root files, `.github`, VS Code.
