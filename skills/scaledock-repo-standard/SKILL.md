---
name: scaledock-repo-standard
description: Create a new repo or bring an existing one up to the ScaleDock standard (latest Node supported by Vercel, latest pnpm and TypeScript, Next.js, Supabase with better-supabase, PermDock, oRPC, MCP, CLI, Fumadocs, Vercel). Use when scaffolding a repo, auditing one against the standard, or aligning several repos.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
---

# Repo standard

A workflow for creating a repo, or upgrading or aligning existing ones, so every ScaleDock repo has the same toolchain, layout, surfaces, guardrails and delivery pipeline.

**Follow the workflow below step by step.** Load the reference a step names when you reach that step, and only for the surfaces the inputs select. Flag and option names in the references can drift; check each one against the installed docs before you configure it.

## Inputs (fill in, or ask me before starting)

- Mode: `new` (scaffold), `upgrade` (bring this repo up to the standard) or `align` (compare several repos and list the gaps).
- Product in one sentence: {{PRODUCT_ONE_LINER}}
- Surfaces: `app`, `api`, `mcp`, `docs`, `marketing`, `cli`. The default is `app`, `api`, `mcp` and `docs`.
- CLI kind: `none` (default), `product` (end users call the API), `library` (ships with an npm package) or `tooling` (private repo scripts).
- Framework: the latest Next.js for every web surface. Use another one only when I name it: {{FRAMEWORK_OVERRIDE or "none"}}
- Database: yes or no (yes means Supabase with better-supabase).
- Roles and permissions: yes or no (yes means PermDock).
- Multi-tenant: yes (default) or no.
- Publishes npm packages: yes or no.
- npm scope `@{{SCOPE}}`, GitHub owner `{{GITHUB_OWNER}}`, Vercel team `{{VERCEL_TEAM}}`, issue prefix `{{ISSUE_PREFIX}}` (optional).

### Placeholders

The references use these placeholders. Resolve them from the inputs before you write any file.

- `{{REPO_NAME}}`: the repository name.
- `{{SCOPE}}`: the npm scope, without the `@`.
- `{{app}}` and `{{APP}}`: the product slug in lower case (`acme`) and upper case (`ACME`), derived from the repo name unless I name another one. `{{APP}}` prefixes env vars such as `{{APP}}_TOKEN`.
- `{{bin}}`: the CLI binary name. For a product CLI it is `{{app}}`.
- `{{lib}}`: the library name, for a library CLI.

## Ground rules

1. **Upgrade and align modes audit first.**
   - Write a gap table (standard item, current state, action), then apply the changes as small conventional commits on one branch (rule 5).
   - Never discard uncommitted work. For unshipped code, prefer one breaking cutover over shims.
   - A deliberate deviation is an ADR in `docs/decisions/` plus a line in the AGENTS.md "Deviations" list. Deviations with an ADR appear in the gap table as "kept"; anything else that differs is a gap. Never change a deviation silently, and never add one without asking.
2. **Always the latest, including new majors in pre-release.**
   - This skill names no version numbers on purpose. For every runtime, package manager, package, GitHub Action, skill, spec and schema, look up the latest release when you run (`pnpm view <pkg> version`, `pnpm view <pkg> dist-tags`, GitHub releases, vendor docs). Never take a version from memory, from this skill or from another repo.
   - **New majors first.** When a newer major exists as alpha, beta or rc, adopt it now instead of building on the old major and migrating later. Read its migration guide, absorb the API changes, and note them in the changeset or commit.
   - Otherwise use the latest stable release. Do not use a pre-release of a minor or patch.
   - **Exceptions.** Stay on the current major only when the pre-release cannot be installed under `minimumReleaseAge`, or breaks a peer that has no compatible release. Record the blocker in the gap table, and check again on every run.
   - **Tracking.** Every pre-release pin is listed under "Pre-release pins" in AGENTS.md (package, version, why). Move it to stable as soon as the stable major ships.
   - The catalog stores each resolved version exactly, so installs are reproducible. Upgrading means looking up "latest" again, not editing this skill.
   - Never bypass `minimumReleaseAge`. If the latest release is too new, use the newest one that passes. Add a commented exclude only when a fix needs it.
   - In upgrade and align modes, list every dependency that is behind latest, or on an older major, in the gap table.
3. **Read installed docs before configuring.** Read `node_modules/next/dist/docs`, `node_modules/turbo/docs`, the oxlint and oxfmt docs, the Fumadocs, AI SDK and MCP SDK docs, and the matching skill. Flag and option names in this skill can drift; check each against the installed version.
4. **Done means `pnpm verify` passes.** Report what you created, what you changed, the deviations you kept, the pre-release pins, and the manual steps left.
5. **One branch and one PR for this whole run.** Follow the agent workflow in [`references/git-workflow.md`](references/git-workflow.md): one new branch, small commits, and one PR that collects everything from this chat or plan.

## Workflow

Run these steps in order. Each step names the references to load and the check it must pass. Skip a reference only when the inputs exclude its surface.

1. **Start the run.** Settle the mode and every input; ask for anything missing. Check the working tree, then create or reuse the branch.
   -> [`references/git-workflow.md`](references/git-workflow.md) (agent workflow).
   ✓ All inputs are known, the tree is clean or the changes are yours, and you are on a `<type>/<short-topic>` branch.
2. **Audit or sketch.**
   - **New:** sketch the tree from the selected surfaces and packages.
   - **Upgrade:** compare this repo against every reference below and write the gap table.
   - **Align:** do the upgrade audit for each repo and merge the results into one table, one column per repo.
     -> [`references/architecture.md`](references/architecture.md) for the target tree; every other reference for its rows.
     ✓ The gap table lists every standard item as done, gap or kept (with its ADR), plus every dependency that is behind latest.
3. **Foundation.** Install the skills, set up the toolchain, workspace, TypeScript, Knip, lint and format, and lay out the folders and boundaries.
   -> [`references/skills.md`](references/skills.md), [`references/toolchain.md`](references/toolchain.md), [`references/lint-format.md`](references/lint-format.md), [`references/architecture.md`](references/architecture.md).
   ✓ `pnpm install` passes under the strict workspace settings, every workspace has a boundary tag, and `pnpm check` runs.
4. **Platform.** Configure Vercel, Turborepo, Remote Cache, local dev with Portless, and env and secrets.
   -> [`references/vercel.md`](references/vercel.md), [`references/local-dev-env.md`](references/local-dev-env.md).
   ✓ Each need maps to the Vercel-first table or an ADR, `turbo.json` uses strict env mode, and every app has a `dev:portless` script.
5. **Surfaces.** Build or upgrade only the selected ones.
   - Web: [`references/nextjs.md`](references/nextjs.md), [`references/i18n.md`](references/i18n.md), [`references/ui.md`](references/ui.md), [`references/app-shell.md`](references/app-shell.md).
   - Data and identity: [`references/data-permissions.md`](references/data-permissions.md), [`references/auth.md`](references/auth.md).
   - Programmatic: [`references/api.md`](references/api.md), [`references/mcp.md`](references/mcp.md), [`references/cli.md`](references/cli.md).
   - Docs and AI: [`references/docs-site.md`](references/docs-site.md), [`references/ai.md`](references/ai.md).
     ✓ Apps stay thin adapters over `services`, every procedure is contract first, and every surface acts as the signed-in user.
6. **Repo hygiene.** Write the AI files, repo files, VS Code settings, CI, Dependabot and tests.
   -> [`references/agent-files.md`](references/agent-files.md), [`references/repo-files.md`](references/repo-files.md), [`references/ci.md`](references/ci.md), [`references/tests.md`](references/tests.md).
   ✓ AGENTS.md is at most 12 KB and lists the deviations and pre-release pins, and CI runs the same gates as `pnpm verify`.
7. **Verify and finish.** Run `pnpm install`, `pnpm format` and `pnpm verify`; fix code, not tests. Add a changeset, push, mark the one PR ready, and put the report in its body.
   -> [`references/git-workflow.md`](references/git-workflow.md) (Changesets, PR), the checklist below.
   ✓ `pnpm verify` passes and the report is complete.

## Verify before done

- [ ] `pnpm verify` passes locally (rule 4).
- [ ] Every dependency is `catalog:` or `workspace:*`, pinned exactly at the latest release that passes `minimumReleaseAge`; every override, exclude, `allowBuilds` entry and patch has a comment.
- [ ] Every pre-release pin is listed in AGENTS.md with package, version and why.
- [ ] Every deviation from the standard has an ADR in `docs/decisions/` and a line in the AGENTS.md "Deviations" list.
- [ ] Every workspace has a Turbo boundary tag, apps never import each other, and `pnpm boundaries` passes.
- [ ] No Zod in our code, no `@radix-ui/*` or vaul, and each concern uses its one library.
- [ ] Each app has one `env.ts`, the only file that reads `process.env`; every env key is in t3-env, `turbo.json`, `.env.example` and all three Vercel environments.
- [ ] Every API procedure lives in `packages/contract` with `openapi()` meta, and the committed OpenAPI snapshot matches.
- [ ] Errors are RFC 9457 Problem Details on every surface.
- [ ] Every table has RLS and pgTAP tests; every domain table has the audit trigger.
- [ ] The only keys in use are `sb_publishable_` and `sb_secret_`, and `sb_secret_` appears only in `createAdminContext()`.
- [ ] The whole run is on one branch and one PR, with conventional commits and a changeset.
- [ ] The report covers the gap table or created tree, the deviations kept, the pre-release pins, and the manual steps still open:
  - `vercel link`
  - Marketplace installs and Connect connectors
  - `REUI_LICENSE_KEY` and `TURBO_REMOTE_CACHE_SIGNATURE_KEY`
  - `TURBO_TEAM`
  - Web Analytics and Speed Insights
  - branch protection (PR required, required checks, squash only) and the Supabase GitHub integration
  - the Google OAuth client
  - the OAuth server settings, plus the Scalar and CLI clients for each environment
  - npm trusted publishing
  - publishing `server.json` to the MCP Registry
  - creating `develop` at launch

## Reference index

Foundation:

- **[`references/skills.md`](references/skills.md)**: which agent skills to install, where they live, and the library-repo exception.
- **[`references/toolchain.md`](references/toolchain.md)**: Node, pnpm, TypeScript, `pnpm-workspace.yaml`, tsconfig presets, Knip, and the exact root script names.
- **[`references/architecture.md`](references/architecture.md)**: the folder tree, Turbo boundaries, contract first, errors, one library per concern, env, standard services, code rules.
- **[`references/lint-format.md`](references/lint-format.md)**: the `ox-config` package, oxlint presets and pinned rules, the anti-slop plugin, oxfmt.

Platform:

- **[`references/vercel.md`](references/vercel.md)**: the Vercel-first order, the needs table, platform defaults, Services, `turbo.json`, Remote Cache.
- **[`references/local-dev-env.md`](references/local-dev-env.md)**: Portless, Google OAuth locally, env sources, the env files and their precedence.

Surfaces:

- **[`references/nextjs.md`](references/nextjs.md)**: `createNextConfig()` and the Next.js architecture rules.
- **[`references/i18n.md`](references/i18n.md)**: next-intl with `next/root-params`, locale resolution, extracted messages.
- **[`references/ui.md`](references/ui.md)**: shadcn on Base UI, ReUI Pro, `DESIGN.md`, responsive rules.
- **[`references/app-shell.md`](references/app-shell.md)**: auth pages, the app shell, top bar, page templates, standard multi-tenant screens.
- **[`references/data-permissions.md`](references/data-permissions.md)**: multi-tenancy, Supabase, better-supabase, the audit log, PermDock.
- **[`references/auth.md`](references/auth.md)**: Supabase Auth as the OAuth 2.1 server, sign-in per surface, keys, clients, 401 and 403.
- **[`references/api.md`](references/api.md)**: the Hono shell, oRPC, Scalar, request context, crons, webhooks.
- **[`references/mcp.md`](references/mcp.md)**: the MCP SDK, transport, auth, tools from the contract, PermDock, the docs MCP.
- **[`references/cli.md`](references/cli.md)**: CLI kinds, stack, layout, behavior, build, OAuth login, tests.
- **[`references/docs-site.md`](references/docs-site.md)**: Fumadocs for people and agents, formats, API reference, required pages.
- **[`references/ai.md`](references/ai.md)**: AI SDK through AI Gateway, `packages/ai`, validation, UI, long runs.

Delivery:

- **[`references/git-workflow.md`](references/git-workflow.md)**: branches, the one-branch-one-PR agent workflow, commitlint, lefthook, Changesets, `release.yml`.
- **[`references/ci.md`](references/ci.md)**: GitHub Actions pinning, the workflows, Dependabot.
- **[`references/tests.md`](references/tests.md)**: Vitest, Playwright, pgTAP, in-process tests, test rules.
- **[`references/agent-files.md`](references/agent-files.md)**: AGENTS.md, rules, the "also update" table, other AI files, writing rules.
- **[`references/repo-files.md`](references/repo-files.md)**: README, standard files, `.github`, VS Code.
