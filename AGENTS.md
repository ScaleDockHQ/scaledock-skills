# AGENTS.md

This repo publishes agent skills for ScaleDock projects. Consumers install them with `npx skills add ScaleDockHQ/scaledock-skills`. Follow [CONTRIBUTING.md](CONTRIBUTING.md) for the details.

## Commands

The package manager is pnpm, pinned in `package.json`. Node is the major in `.node-version`.

| Command             | What it does                                                          |
| ------------------- | --------------------------------------------------------------------- |
| `pnpm install`      | Installs the dev tooling and the git hooks.                           |
| `pnpm validate`     | Checks every skill's frontmatter, versions, links and README entry.   |
| `pnpm format`       | Formats the repo with oxfmt.                                          |
| `pnpm check`        | Runs `format:check` and `validate`.                                   |
| `pnpm verify`       | The full gate. CI and the pre-push hook run it. Done means it passes. |
| `pnpm dlx skills …` | Runs the skills CLI, for example `pnpm dlx skills add . --list`.      |

## Layout

- `skills/scaledock-<topic>/`: published skills. Each has `SKILL.md`, `README.md`, `metadata.json`, and optional `references/`, `scripts/` and `assets/`.
- `template/skill/`: the starting point for new skills.
- `scripts/`: the validator and the `prepare` hook installer.
- `docs/decisions/`: ADRs.
- `.agents/skills/` and `skills-lock.json`: skills installed into this repo. They are committed so every contributor gets them; never gitignore them.

## Invariants

1. Every skill name starts with `scaledock-`, so it can't collide with other publishers' skills once installed. The frontmatter `name` is kebab-case and matches the folder name.
2. The `description` starts with what the skill does, because the install picker shows only its first 57 characters. Then it says when to use the skill. It is at most 1024 characters.
3. `SKILL.md` stays concise: inputs, invariants, workflow, verify checklist and reference index. Long material goes in `references/`, `scripts/` or `assets/`.
4. `metadata.version` in `SKILL.md` and `version` in `metadata.json` are bumped together, following semver.
5. Start new skills with `cp -r template/skill skills/scaledock-<topic>`.
6. Do not edit `.agents/skills/` or `skills-lock.json` by hand. Manage them with `pnpm dlx skills`.

## Agent workflow

One branch and one PR per chat or plan.

1. Run `git status` first. If there are uncommitted changes you did not make, stop and ask.
2. From `main`, run `git fetch` and create `<type>/<short-topic>` from `origin/main`. If you are already on this work's branch, keep using it.
3. Make small conventional commits and push. commitlint enforces the header, with a limit of 72 characters.
4. After the first push, open one draft PR with `gh pr create --base main`, and mark it ready once `pnpm verify` passes. The PR title is a conventional commit header.
5. Every later request in the same chat or plan goes on the same branch and PR. Never open a second PR, never stack PRs, and never merge or push to `main` unless asked.

## When you change X, also update Y

| Change                         | Also update                                                               |
| ------------------------------ | ------------------------------------------------------------------------- |
| A skill's content              | Its `metadata.version` and `metadata.json` version, and its `README.md`   |
| A new skill                    | The skills table in `README.md`                                           |
| A skill's description          | Its row in the `README.md` skills table                                   |
| A dependency or action version | The catalog in `pnpm-workspace.yaml`, and the pre-release pins list below |
| A workflow                     | Keep `.github/zizmor.yml` passing; pin third-party actions to a SHA       |

## Hard rules

- Run `pnpm verify` before you say you are done.
- Never bypass `minimumReleaseAge` or `trustPolicy` in `pnpm-workspace.yaml`.
- Every override, `allowBuilds` entry and held-back version has a comment saying why.

## Deviations

Deliberate differences from `scaledock-repo-standard`, each with an ADR:

- Only the toolchain, formatting, git hooks, CI and repo-file parts of the standard apply. App surfaces, Turborepo, TypeScript, Knip, oxlint, Changesets and Vercel do not. See [ADR 0001](docs/decisions/0001-standard-scope-for-skills-repo.md).
- `find-skills` stays vendored in `.agents/skills/` even though this repo publishes skills. See [ADR 0002](docs/decisions/0002-vendored-find-skills.md).

## Pre-release pins

None.
