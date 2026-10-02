# Branches, pull requests, commits, changelog and releases

Branching, the one-branch-one-PR agent workflow, commitlint, lefthook, Changesets, and `release.yml`.

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
   - Never stack PRs.
   - Never split a plan into one PR per todo.
6. **New work, new branch.** Start a new branch and PR only when I start a new chat or plan, or ask for a separate PR.
7. **Never merge without being asked.** Don't merge the PR unless I ask. Never push to `main` or directly to the working branch.

Bot PRs (Dependabot, the Changesets version PR) are the only other PRs.

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

## `lefthook.yml`

Use the `jobs` syntax:

```yaml
pre-commit:
  parallel: true
  jobs:
    - name: format
      glob: "*.{ts,tsx,mts,js,mjs,json,jsonc,md,mdx,css,yml,yaml}"
      run: pnpm exec oxfmt --no-error-on-unmatched-pattern {staged_files}
      stage_fixed: true
    - name: lint
      run: pnpm exec turbo run lint lint:root --affected
commit-msg:
  jobs:
    - name: commitlint
      run: pnpm exec commitlint --edit {1}
pre-push:
  jobs:
    - name: affected
      env: { TURBO_SCM_BASE: origin/<working branch> }
      run: pnpm exec turbo run lint typecheck test --affected
```

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
- Apps share one `fixed` group, together with a product CLI. A library CLI joins its library's group.
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
4. `main` merges back into `develop`.
