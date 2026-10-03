# GitHub Actions and Dependabot

Action versions, the shared setup action, the workflows, EAS builds, and Dependabot.

Applies to every repo kind. Each workflow below runs only the gates the repo has.

- **Versions.** Every action targets its latest release by tag, never by commit SHA.
  - Use the latest major tag (`@vN`) when the action publishes one, otherwise its latest release tag (`@vX.Y.Z`).
  - zizmor's `unpinned-uses` rule is set to `"*": ref-pin` in `.github/zizmor.yml`, so tags pass and branch refs fail.
  - Dependabot keeps the tags current.
- **`.github/actions/setup`:** Remote Cache OIDC, then `pnpm/setup` with the Node major from `.node-version`, caching and `require-lockfile`.
- **`ci.yml`:**
  - Runs on PRs and on pushes to the working branch and `main`.
  - Minimal permissions plus `id-token: write`, cancelling concurrency and `CI: true`.
  - A `pr-title` job runs commitlint on the PR title.
  - Calls `verify.yml` (affected-only on PRs), then e2e if the repo has it.
- **`verify.yml`:** a `fail-fast: false` matrix with one job per `pnpm verify` gate, and nothing else, so local and CI results agree:
  - format, lint, knip, typecheck, test and boundaries
  - `audit:high`
  - `openapi:check`, `i18n:check` and `docs:drift`
  - `doctor`

  Next builds run with `--concurrency=1`. A job that runs `next build` restores `.next/cache` with `actions/cache`, keyed on the lockfile and the app's sources, so the Turbopack build cache survives between runs. Affected runs on PRs combine `--affected` with the job's `--filter`. A reusable `workflow_call`, so `release.yml` runs the same gate on the release commit.

- **`security.yml`:** zizmor on workflow changes, and `dependency-review-action` on PRs.
- **`database.yml`:** on `supabase/**` changes, start the stack (native processes, no Docker service), run `supabase db schema declarative sync --no-apply --strict-coverage` and fail if it errors or leaves a new file in `supabase/migrations/` (schema files and migrations have drifted), then run pgTAP and lint the SQL.
- **`powersync.yml`** (Offline: yes): on `packages/sync/powersync/**` changes, validate the sync config against the local stack.
- **`release.yml`:** see [`git-workflow.md`](git-workflow.md).
- **`eas-build.yml`** (with Expo): a reusable `workflow_call` plus `workflow_dispatch` with a `profile` input.
  - `expo/expo-github-action` on its latest major tag, with `eas-version` from the latest release and the `EXPO_TOKEN` secret.
  - Runs `eas build --profile <profile> --platform all --non-interactive --no-wait`. CI only queues the build; EAS reports failures on its own.
  - `production` runs only from a release tag on `main` and adds `--auto-submit`. `development` builds can run from any branch on dispatch.
  - Concurrency is grouped per profile.
  - Native folders are generated on the EAS worker; CI never commits `ios/` or `android/`.
- **`dependabot.yml`:**
  - npm (limit 10) and github-actions (limit 5).
  - Weekly on Monday, one grouped PR per ecosystem, `cooldown.default-days: 2`.
  - Pre-releases are allowed, so pre-release pins move forward.
  - `target-branch` is the working branch.
