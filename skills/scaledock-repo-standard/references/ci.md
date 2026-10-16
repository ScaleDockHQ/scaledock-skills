# GitHub Actions and Dependabot

Action pins, same-repo `uses`, zizmor and actionlint, the shared setup action, the workflows, EAS builds, and Dependabot.

Applies to every repo kind. Each workflow below runs only the gates the repo has.

- **Pins.**
  - GitHub-owned actions (`actions/*`, `github/*`) use their latest major tag (`@vN`).
  - Every third-party action is pinned to a full commit SHA with a `# vX.Y.Z` comment naming its latest release, for example `uses: pnpm/action-setup@<40-char sha> # v5.0.0`.
  - `.github/zizmor.yml` encodes this: `unpinned-uses` with `actions/*` and `github/*` set to `ref-pin` and `"*"` set to `hash-pin`.
  - Dependabot moves both the tags and the SHAs, and rewrites the version comment.
- **Same-repo `uses`.** Local actions and reusable workflows use GitHub's self-repository syntax, `$/.github/actions/setup` and `$/.github/workflows/verify.yml`, never `./...`.
  - actionlint 1.7.12 does not parse `$/` yet ([rhysd/actionlint#711](https://github.com/rhysd/actionlint/issues/711)). `.github/actionlint.yaml` ignores those two messages instead of reverting to `./`:

    ```yaml
    # actionlint 1.7.12 rejects `$/` (rhysd/actionlint#711). Same-repo `uses` stays `$/` so zizmor's self-repository audit passes.
    paths:
      .github/workflows/**/*.{yml,yaml}:
        ignore:
          - 'reusable workflow call "\$/.+" at "uses" is not following the format'
          - 'specifying action "\$/.+" in invalid format because ref is missing'
    ```

  - Remove the ignore once an actionlint release parses `$/`.
- **zizmor** is required on public repos and optional on private ones. When it runs, keep every audit on, `self-repository` included; fix a finding or suppress that one line with a comment saying why.
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

- **`security.yml`:** `dependency-review-action` on PRs, `pnpm audit signatures` as a non-blocking step (`continue-on-error: true`) on lockfile changes, and on public repos zizmor and actionlint on workflow changes.
- **No `pull_request_target` with a checkout.** A workflow that checks out or runs PR code uses `pull_request`. zizmor flags the combination; never suppress that finding.
- **`database.yml`:** on `supabase/**` changes, start the project with `supabase start --runtime native` on an Ubuntu runner (no Docker service), run `supabase db schema declarative sync --no-apply --strict-coverage` and fail if it errors or leaves a new file in `supabase/migrations/` (schema files and migrations have drifted), then run pgTAP and lint the SQL.
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
