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
   - Start from the latest `origin/<working branch>`, never a stale local copy. When the user's checkout has uncommitted work or another agent is using it, create a git worktree (`git worktree add ../<repo>-<topic> -b <branch> origin/<working branch>`) instead of switching their branch.
   - Contributing to an upstream project from a fork: branch from `upstream/main`, never from the fork's `main`.
3. **Commit.** Make conventional commits as you go, one per coherent batch of changes, and push.
   - In a plan, keep each to-do's status current (in progress, done) and continue through every to-do without stopping to ask, unless a decision belongs to the user.
   - An orchestrating agent waits for every subagent it started and reviews their work before it reports done.
4. **Open one PR.**
   - After the first push, run `gh pr create --base <working branch>` and open it ready for review, not as a draft. Run `pnpm verify` once before the first push, so the PR opens green.
   - The PR title is a conventional commit header. It becomes the squash commit, and CI checks it with commitlint.
   - The body follows the template, including the verify result and the changeset.
5. **Keep everything on that PR.** Every later request in the same chat or plan goes onto the same branch and PR: follow-ups, review fixes, extra todos. Update the PR body to match.
   - Never open a second PR.
   - Never stack PRs. GitHub's stacked PRs are generally available, but agent work still goes into one PR per chat or plan. A stacked PR merges into its parent branch, not `main`, so its work silently misses `main` when the parent merges first.
   - After a push, wait for CI once with `gh pr checks --watch --fail-fast` (or a `ci:wait` script that wraps it and prints the failed jobs) in a backgrounded shell, and read its output once. Never redirect it to a log file and `sleep` on it. When it fails or the PR falls behind its base, rebase on the latest base and fix the failing checks until the PR can merge.
   - After a rebase, regenerate committed generated files (snapshots, OpenAPI, typed clients, migrations from the declared schema) from a fresh state, such as a database reset, instead of resolving their conflicts by hand.
   - Never split a plan into one PR per todo.
6. **New work, new branch.** Start a new branch and PR only when the user starts a new chat or plan, or asks for a separate PR.
   - After a PR merges, remove its worktree and delete the local and remote branch (`git worktree remove`, `git branch -d`, `git push origin --delete`).
7. **Never merge without being asked.** Don't merge the PR unless the user asks. Never push to `main` or directly to the working branch, unless the repo records the direct-to-develop variant below.
   - Even when the user asks to merge, wait until the required checks pass, and confirm that the base branch has required status checks at all (`gh api repos/{owner}/{repo}/branches/<branch>/protection`). With none configured, a PR merges at once and CI first fails on `main`. Report that as a gap instead of merging.
   - Automations that merge PRs use GitHub's async merge API (submit with `PUT`, then poll the request with `GET`), not the synchronous merge endpoint.

Bot PRs (Dependabot, the Changesets version PR) are the only other PRs.

## Direct-to-develop variant

A small team may commit straight to `develop` instead of opening one branch and PR per chat. Record the choice in `AGENTS.md` (agent workflow) and in an ADR listed in the ADR index; without both, the default flow above applies.

1. **Check the tree.** Run `git status` first. Leave out changes you did not make, and ask when they overlap your work.
2. **Stay on `develop`.** Don't open a topic branch or a PR into `develop`. Never commit to `main`.
3. **Commit small.** Conventional commits, explicit paths with `git add <path>`, never the whole tree.
4. **Never skip hooks.** No `--no-verify`. Fix what the hooks report.
   - The hooks lint the staged files and, on push, the affected packages (below). Tests and the live-database suites stay in CI, so a commit never waits on a local stack.
5. **Verify, then push.** Run `pnpm verify`, then `git push origin develop`, and only when the user asked for a push in this task.
6. **`.github/` changes go through a PR into `develop`.** Workflow changes need the PR checks (actionlint, zizmor) before they run on `develop`.

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
    "header-max-length": [0],
  },
} satisfies UserConfig;

export default config;
```

With an issue prefix, add only `parserPreset.parserOpts.issuePrefixes` and `"references-empty": [1, "never"]`.

The config-conventional preset limits body and footer lines to 100 characters, so commit bodies that record before-and-after numbers wrap.

## `lefthook.yml`

Use the `jobs` syntax:

```yaml
output: [summary, failure]
pre-commit:
  piped: true
  jobs:
    - name: fix
      timeout: 120s
      glob: "*.{ts,tsx,mts,js,mjs,json,jsonc,md,mdx,css,yml,yaml}"
      exclude: [<generated files>, ".agents/skills/**"]
      run: node_modules/.bin/ultracite fix {staged_files}
      stage_fixed: true
    - name: lint-staged
      timeout: 60s
      run: node scripts/lint-staged.ts
commit-msg:
  jobs:
    - name: commitlint
      run: node_modules/.bin/commitlint --edit {1}
    - name: no-attribution
      run: node scripts/no-attribution.ts {1}
pre-push:
  jobs:
    - name: affected
      timeout: 300s
      env: { TURBO_SCM_BASE: origin/<working branch> }
      run: pnpm gate
post-merge:
  jobs:
    - name: install-on-lockfile-change
      run: node scripts/install-on-lockfile-change.ts ORIG_HEAD HEAD
post-rewrite:
  jobs:
    - name: install-on-lockfile-change
      run: node scripts/install-on-lockfile-change.ts ORIG_HEAD HEAD {1}
```

The pre-commit hook formats and fixes only the staged files with Ultracite (Oxfmt, then `oxlint --fix`), restages them, and then `scripts/lint-staged.ts` groups the staged files by owning workspace and runs that workspace's type-aware `oxlint` on them, skipping files the workspace ignores. Typecheck and the affected lint run once per push. Tests are not a hook: the full `pnpm verify` runs in CI.

- The root script `gate` (also reachable as `check:affected`) is `env -u TURBO_CACHE_DIR turbo run lint lint:root typecheck --affected --cache=local:rw,remote:r --output-logs=errors-only --continue=dependencies-successful`. `--cache=local:rw,remote:r` reads the Remote Cache but never writes to it from a laptop. `--continue=dependencies-successful` reports every failing package in one run and skips only the dependents of a failed one.
- Hooks call `node_modules/.bin/<tool>`, not `pnpm exec`, which adds 70 to 260 ms to every call. The `timeout` on every job fails a hung linter instead of stalling the commit. Lefthook 2.2.1 is the floor because of a Git 2.54 partial-stage bug.
- `no-attribution` rejects `Co-authored-by:` lines naming an AI tool, `Claude-Session:` trailers and "Generated with" lines. The agent rule forbids them too.
- `post-merge` and `post-rewrite` run `pnpm install --frozen-lockfile` only when `pnpm-lock.yaml` changed between `ORIG_HEAD` and `HEAD`, and skip on amend. There is deliberately no `post-checkout` hook: its exit code fails `git worktree add`, and a new worktree has no lefthook binary yet.
- Merge and rebase commits skip pre-commit, so the pre-push hook is the gate for them. After resolving a conflict where both sides fixed the same lint finding differently, keep the simpler version and run `oxlint` on the file with the merged config before committing.

`prepare` runs `scripts/prepare.mjs`, which skips lefthook when `CI` or `VERCEL` is set and runs lefthook's own Node entrypoint with `process.execPath`, not `pnpm` (Windows only has a `pnpm.cmd` shim, which fails with `EINVAL`).

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
  - When `privatePackages` is off (libraries), a change that touches only a private app, such as a dependency added to the docs or marketing site, gets no changeset. Say so in the commit body instead.
- `pnpm version-packages` runs these steps:
  1. `scripts/root-changelog.ts`, built on `@changesets/read` and `@changesets/assemble-release-plan`, which prepends a dated `## <version>` section to the root `CHANGELOG.md`. It runs first because `changeset version` deletes the changeset files it reads (PermDock ADR 0024).
  2. `changeset version`.
  3. `scripts/sync-server-version.ts`, which writes the new version into `server.json` and any plugin manifests.
  4. `scripts/sync-generated-version.ts`, in a repo that commits generated output carrying a version (such as `generated by <tool>@<version>` headers). It rewrites those headers with `git grep`, so the version PR passes the generated-file checks and snapshot tests.
  5. `oxfmt`.

  The docs site renders the root changelog.

## `release.yml`

Runs when CI completes on `main`, through `workflow_run`, so the gate does not run twice for the same commit (PermDock ADR 0065 measured about 11 runner-minutes saved per push):

1. Guard the trigger: the CI run was a `push` from this repo, and the default branch `HEAD` equals `workflow_run.head_sha`. Set `cache-mode: read` on the workflow and `none` on the publish job. Ignore zizmor's `dangerous-triggers` finding on the trigger line only, with the reason. A repo that does not publish runs `check`, `build` and `test` on push to `main` instead.
2. `changesets/action` opens the `chore: version packages` PR.
3. Merging that PR runs `changeset tag`, or `changeset publish` with npm trusted publishing (OIDC and provenance, gated by the `NPM_PUBLISH` variable), and creates GitHub Releases.
4. With Expo, a new release tag calls `eas-build.yml` with the `production` profile (see [`ci.md`](ci.md)).
5. `main` merges back into `develop`.

Release concurrency uses `queue: max`, and the publish job sets `cache-mode: none` and `timeout-minutes`.

npm trusted publishing:

- Publish only from `push`, `release` or `workflow_dispatch`. npm rejects trusted-publishing tokens from `pull_request_target` and `issue_comment` runs.
- A new package is created with `npm stage publish` from a stage-only granular token; a maintainer promotes that first version. No manual first publish from a laptop.
- Then add the trusted-publishing configuration and release through `release.yml` within 48 hours. A configuration with no successful publish expires after 48 hours and must be recreated; changing its repository or workflow starts a new window.

Published packages:

- `files` in `package.json` includes `CHANGELOG.md`, so the changelog ships in the tarball. When the full changelog is large, publish a trimmed copy (the current major's sections) generated in `prepack`.
- The GitHub Release attaches the packed tarball (`pnpm pack`) and a build provenance attestation (`actions/attest-build-provenance`), so a consumer can verify the exact file without npm. It also attaches a CycloneDX SBOM (`pnpm sbom --sbom-format cyclonedx --prod`).

## Parallel program

A planned cleanup too large for one PR, such as an audit across many areas, may run as lanes. This is a recorded exception to the one-PR rule, written into a tracker document, never done ad hoc.

- Each lane has its own branch, worktree and PR, and the PR body names the program and lane.
- `docs/agents/<program>.md` is the tracker. It has a "Progress" section with one subsection per lane (scope, status `planned`, `in progress` or `merged`, branch, PR, findings, log), separated by blank lines so parallel branches do not conflict, and a "Lane ownership" table that reserves ADR number ranges, migration slots and owned folders per lane.
- Cut a lane into slices of about 80 files at most. A slice is an ADR, a migration and a pgTAP file.
- A findings register lists one row per finding with an id, a state (`fixed`, `closed`, `open`, `deferred (needs: ...)`) and a validator that fails on duplicate ids, a lane named for an unknown row, or a lane marked `merged` while a row it owns is open.
- `check:migration-order` fails when a branch adds a migration that sorts before the newest one on `origin/<working branch>`. The fix is to rename it to a newer timestamp.
- `check:adrs` fails on two ADR files with one number, an ADR the index does not link, and merge-conflict markers. Parallel branches renumber on rebase.
