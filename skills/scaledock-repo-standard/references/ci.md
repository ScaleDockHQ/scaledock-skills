# GitHub Actions and Dependabot

Action pinning, the shared setup action, the workflows, and Dependabot.

- **Pinning.** Every action runs its latest release.
  - GitHub-owned actions (`actions/*`, `github/*`) use their latest major tag.
  - Third-party actions are pinned to the commit SHA of their latest release, with a `# vX.Y.Z` comment.
  - Dependabot keeps both current.
- **`.github/actions/setup`:** Remote Cache OIDC, then `pnpm/setup` with the Node major from `.node-version`, caching and `require-lockfile`.
- **`ci.yml`:**
  - Runs on PRs and on pushes to the working branch and `main`.
  - Minimal permissions plus `id-token: write`, cancelling concurrency and `CI: true`.
  - A `pr-title` job runs commitlint on the PR title.
  - Calls `verify.yml` (affected-only on PRs), then e2e.
- **`verify.yml`:** a `fail-fast: false` matrix of:
  - format, lint, knip, typecheck, test and boundaries
  - `pnpm audit --audit-level high`
  - OpenAPI drift, `docs:drift` and the i18n catalogs
  - the doctors

  Next builds run with `--concurrency=1`.

- **`security.yml`:** zizmor on workflow changes, and `dependency-review-action` on PRs.
- **`database.yml`:** on `supabase/**` changes, start the stack, run pgTAP and lint the SQL.
- **`release.yml`:** see [`git-workflow.md`](git-workflow.md).
- **`dependabot.yml`:**
  - npm (limit 10) and github-actions (limit 5).
  - Weekly on Monday, one grouped PR per ecosystem, `cooldown.default-days: 2`.
  - Pre-releases are allowed, so pre-release pins move forward.
  - `target-branch` is the working branch.
