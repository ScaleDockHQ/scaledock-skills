# scaledock-repo-standard

An agent skill that creates a new repo, or brings existing repos up to the ScaleDock standard: the latest Node that Vercel supports, latest pnpm and TypeScript, Next.js or Expo (iOS, Android and web), Supabase with better-supabase, PermDock, oRPC, MCP, a CLI, Fumadocs and Vercel.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill scaledock-repo-standard
```

Then ask your agent to "set up a new repo with the ScaleDock standard", "add an Expo mobile app to this repo", "upgrade this repo to the ScaleDock standard", or "align these repos". It asks for the inputs it needs (mode, repo kind, product, surfaces, framework, offline, CLI kind, database, permissions, tenancy, npm scope) before it starts.

## Modes and repo kinds

- **`new`** scaffolds a repo from the standard.
- **`upgrade`** audits this repo into a gap table, then applies the changes as small commits on one branch.
- **`align`** audits several repos and lists their gaps side by side.

The repo kind decides which parts of the standard apply. A `product` repo gets every selected surface. A `library` repo gets the toolchain, packages, docs site and publishing. A `tooling` repo gets only the toolchain, hooks, CI and repo files. What a kind excludes counts as "n/a" in the gap table, so it needs no ADR.

## Surfaces

`app`, `api`, `mcp`, `docs`, `marketing`, `mobile` and `cli`. The `app` runs on Next.js by default, or as one universal Expo app for iOS, Android and web. The `mobile` surface adds a native-only Expo app beside a Next.js `app`. With Expo, `Offline: yes` adds PowerSync for offline data on native.

## Rules

- **Audit first.** Upgrade and align modes fill a gap table from a fixed checklist before changing anything. Deliberate deviations live in ADRs and are kept, never changed silently.
- **Always the latest.** The skill names no versions. Every runtime, package, SDK, action and spec is looked up at run time, and new majors in pre-release are adopted early and tracked in AGENTS.md.
- **Read installed docs first.** Flag and option names are checked against the installed versions before configuring.
- **Done means `pnpm verify` passes.** The run ends with a report of what changed, the deviations kept, the pre-release pins, and the manual steps left.
- **One branch and one PR per run.** Small conventional commits, one PR, never merged without being asked.

## References

`SKILL.md` is always loaded. The agent loads a reference only when its workflow step reaches it, and only for the repo kind and surfaces the inputs select.

**Run:**

- [`references/audit.md`](references/audit.md): placeholders, which references apply to each repo kind, the gap table and its checklist.
- [`assets/report.md`](assets/report.md): the final report and the manual steps.
- [`assets/adr-template.md`](assets/adr-template.md): the ADR shape for deviations.

**Foundation:**

- [`references/skills.md`](references/skills.md): agent skills to install.
- [`references/toolchain.md`](references/toolchain.md): Node, pnpm, TypeScript, workspace, Knip, root scripts.
- [`references/architecture.md`](references/architecture.md): folder tree, boundaries, one library per concern, env, code rules.
- [`references/lint-format.md`](references/lint-format.md): oxlint presets, anti-slop, oxfmt.
- [`references/vercel.md`](references/vercel.md): Vercel first, Services, Turborepo, Remote Cache.
- [`references/local-dev-env.md`](references/local-dev-env.md): Portless, the native dev loop, env and secrets.

**Surfaces:**

- [`references/nextjs.md`](references/nextjs.md): shared Next config and app architecture.
- [`references/i18n.md`](references/i18n.md): next-intl with root params, and i18next on Expo.
- [`references/ui.md`](references/ui.md): shadcn, ReUI Pro, responsive rules.
- [`references/app-shell.md`](references/app-shell.md): auth pages, shell, page templates, standard screens.
- [`references/expo.md`](references/expo.md): Expo shapes, app config, EAS, native UI, Uniwind, push, universal web.
- [`references/offline-sync.md`](references/offline-sync.md): PowerSync on native.
- [`references/data-permissions.md`](references/data-permissions.md): multi-tenancy, Supabase, better-supabase, audit log, PermDock.
- [`references/data-conventions.md`](references/data-conventions.md): UTC timestamps, integer money, UUID and integer IDs, naming, standard codes, pagination, deletion.
- [`references/auth.md`](references/auth.md): Supabase Auth as the OAuth 2.1 server for every surface.
- [`references/api.md`](references/api.md): Hono, oRPC, Scalar.
- [`references/mcp.md`](references/mcp.md): MCP server, tools from the contract, docs MCP.
- [`references/cli.md`](references/cli.md): product, library and tooling CLIs.
- [`references/docs-site.md`](references/docs-site.md): Fumadocs for people and agents.
- [`references/ai.md`](references/ai.md): AI SDK through AI Gateway.

**Delivery:**

- [`references/git-workflow.md`](references/git-workflow.md): branches, the agent workflow, commitlint, lefthook, Changesets, releases.
- [`references/ci.md`](references/ci.md): GitHub Actions, EAS builds and Dependabot.
- [`references/tests.md`](references/tests.md): Vitest, jest-expo, Playwright, pgTAP, test rules.
- [`references/agent-files.md`](references/agent-files.md): AGENTS.md, rules, the "also update" table, writing rules.
- [`references/repo-files.md`](references/repo-files.md): README, standard files, `.github`, VS Code.

## Companion skills

The skill installs these and defers to them for their areas:

- [`nextjs-app-architecture`](https://github.com/aurorascharff/nextjs-app-architecture-skill): the source of truth for Next.js app architecture.
- [`expo/skills`](https://github.com/expo/skills): Expo Router, Expo UI, the dev client and SDK upgrades.
- [better-supabase](https://github.com/ScaleDockHQ/better-supabase): typed Supabase access.
- [PermDock](https://github.com/ScaleDockHQ/PermDock): roles and permissions.

## License

MIT
