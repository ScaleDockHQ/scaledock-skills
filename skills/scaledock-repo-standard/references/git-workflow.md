# Branches, pull requests, commits, changelog and releases

Branching, the one-branch-one-PR agent workflow, commitlint, lefthook, Changesets, and `release.yml`.

Applies to every repo kind. Repos that publish nothing and deploy nothing skip Changesets and `release.yml`.

## Branches

- `main` is production.
  - Before launch, `main` is also the working branch.
  - At launch, create `develop` as the working branch (preview). A `develop` to `main` PR releases, and `main` merges back into `develop` afterwards.
- The working branch is the one value that changes at launch. Dependabot `target-branch`, the lefthook `TURBO_SCM_BASE`, the `ci.yml` triggers and the Vercel `deploymentEnabled` setting all use it. Delete a `develop` branch that the config does not use.
- Branch protection on the working branch and `main`:
  - Changes arrive only through PRs, with the required checks.
  - Squash merge only, linear history.
  - Branch deletion after merge.
- Topic branches get no Vercel deployment; CI judges them.

## Agent workflow: one branch and one PR per chat or plan

This applies to agents and people alike.

1. **Check the tree.** Run `git status` first. If there are uncommitted changes you did not make, stop and ask.
2. **Branch.**
   - If you are on the working branch or `main`, run `git fetch` and create `<type>/<short-topic>` from `origin/<working branch>`, for example `feat/org-switcher` or `fix/mcp-401`. `<type>` is a commitlint type.
   - If you are already on this work's branch, keep using it.
3. **Commit.** Make small conventional commits as you go, and push.
4. **Open one PR.**
   - After the first push, run `gh pr create --base <working branch>` and open it as a draft until `pnpm verify` passes, then mark it ready.
   - The PR title is a conventional commit header. It becomes the squash commit, and CI checks it with commitlint.
   - The body follows the template, including the verify result and the changeset.
5. **Keep everything on that PR.** Every later request in the same chat or plan goes onto the same branch and PR: follow-ups, review fixes, extra todos. Update the PR body to match.
   - Never open a second PR.
   - Never stack PRs. GitHub's stacked PRs are generally available, but agent work still goes into one PR per chat or plan.
   - Never split a plan into one PR per todo.
6. **New work, new branch.** Start a new branch and PR only when the user starts a new chat or plan, or asks for a separate PR.
7. **Never merge without being asked.** Don't merge the PR unless the user asks. Never push to `main` or directly to the working branch, unless the repo records the direct-to-develop variant below.
   - Even when the user asks to merge, wait until the required checks pass, and confirm that the base branch has required status checks at all (`gh api repos/{owner}/{repo}/branches/<branch>/protection`). With none configured, a PR merges at once and CI first fails on `main`. Report that as a gap instead of merging.
   - Automations that merge PRs use GitHub's async merge API (submit with `PUT`, then poll the request with `GET`), not the synchronous merge endpoint.

Bot PRs (Dependabot, the Changesets version PR) are the only other PRs.

## Direct-to-develop variant

A small team may commit straight to `develop` instead of opening one branch and PR per chat. Record the choice in `AGENTS.md` (agent workflow and Deviations) and in an ADR; without both, the default flow above applies.

1. **Check the tree.** Run `git status` first. Leave out changes you did not make, and ask when they overlap your work.
2. **Stay on `develop`.** Don't open a topic branch or a PR into `develop`. Never commit to `main`.
3. **Commit small.** Conventional commits, explicit paths with `git add <path>`, never the whole tree.
4. **Never skip hooks.** No `--no-verify`. The pre-push hook is the only gate before CI, so fix what it reports.
5. **Verify, then push.** Run `pnpm verify`, then `git push origin develop`.

`main` moves only through one `develop` to `main` PR, which runs the full CI and the Changesets release. Branch protection with required checks applies to `main`; `develop` takes direct pushes from maintainers.

## `commitlint.config.ts`

Identical in every repo:

```ts
import type { UserConfig } from "@commitlint/types";

const BOT_HEADER = /^(chore: version packages|chore\(deps(?:-dev)?\):|Merge )/u;

const config = {
  extends: ["@commitlint/config-conventional"],
  ignores: [(message) => BOT_HEADER.test(message.split("\n", 1)[0] ?? "")],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "chore",
        "ci",
        "refactor",
        "test",
        "perf",
        "style",
        "build",
        "revert",
      ],
    ],
    "subject-case": [2, "never", ["pascal-case", "start-case", "upper-case"]],
    "header-max-length": [2, "always", 72],
  },
} satisfies UserConfig;

export default config;
```

With an issue prefix, add only `parserPreset.parserOpts.issuePrefixes` and `"references-empty": [1, "never"]`.

The config-conventional preset limits body and footer lines to 100 characters, so commit bodies that record before-and-after numbers wrap.

## `lefthook.yml`

Use the `jobs` syntax:

```yaml
pre-commit:
  jobs:
    - name: fix
      glob: "*.{ts,tsx,mts,js,mjs,json,jsonc,md,mdx,css,yml,yaml}"
      run: pnpm exec ultracite fix {staged_files}
      stage_fixed: true
commit-msg:
  jobs:
    - name: commitlint
      run: pnpm exec commitlint --edit {1}
pre-push:
  jobs:
    - name: affected
      env: { TURBO_SCM_BASE: origin/<working branch> }
      run: pnpm exec turbo run lint lint:root typecheck test --affected
```

The pre-commit hook formats and fixes only the staged files with Ultracite (Oxfmt, then `oxlint --fix`) and restages them. The type-aware lint, typecheck and tests run once per push on the affected workspaces.

`prepare` runs `scripts/prepare.ts`, which skips lefthook when `CI` or `VERCEL` is set.

## Changesets

Never release-please. `.changeset/config.json`:

```json
{
  "$schema": "https://unpkg.com/@changesets/config/schema.json",
  "changelog": [
    "@changesets/changelog-github",
    { "repo": "{{GITHUB_OWNER}}/{{REPO_NAME}}" }
  ],
  "commit": false,
  "baseBranch": "main",
  "access": "public",
  "updateInternalDependencies": "patch",
  "fixed": [],
  "linked": [],
  "ignore": [],
  "privatePackages": { "version": true, "tag": true }
}
```

- Libraries set `privatePackages` to `false` and `false`.
- Apps share one `fixed` group, together with a product CLI and any Expo app. A library CLI joins its library's group. An Expo app's `app.config.ts` reads `version` from its `package.json`, so the store version follows the group.
- Each PR carries its own changesets.
- `pnpm version-packages` runs three steps:
  1. `changeset version`.
  2. `scripts/root-changelog.ts`, built on `@changesets/read` and `@changesets/assemble-release-plan`, which prepends a dated `## <version>` section to the root `CHANGELOG.md`.
  3. `oxfmt`.

  The docs site renders the root changelog.

## `release.yml`

Runs on push to `main`:

1. Run `check`, `build` and `test`.
2. `changesets/action` opens the `chore: version packages` PR.
3. Merging that PR runs `changeset tag`, or `changeset publish` with npm trusted publishing (OIDC and provenance, gated by the `NPM_PUBLISH` variable), and creates GitHub Releases.
4. With Expo, a new release tag calls `eas-build.yml` with the `production` profile (see [`ci.md`](ci.md)).
5. `main` merges back into `develop`.

Release concurrency uses `queue: max`, and the publish job sets `cache-mode: none` and `timeout-minutes`.

npm trusted publishing:

- Publish only from `push`, `release` or `workflow_dispatch`. npm rejects trusted-publishing tokens from `pull_request_target` and `issue_comment` runs.
- A new package is created with `npm stage publish` from a stage-only granular token; a maintainer promotes that first version. No manual first publish from a laptop.
- Then add the trusted-publishing configuration and release through `release.yml` within 48 hours. A configuration with no successful publish expires after 48 hours and must be recreated; changing its repository or workflow starts a new window.
