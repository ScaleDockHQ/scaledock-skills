# GitHub Actions and Dependabot

Action pins, same-repo `uses`, workflow linters, speed (job shape and parallel steps), caching, security defaults, the shared setup action, the workflows, EAS builds, and Dependabot.

Applies to every repo kind. Each workflow below runs only the gates the repo has.

## Pins and linters

- **Pins.**
  - GitHub-owned actions (`actions/*`, `github/*`) use their latest major tag (`@vN`).
  - Every third-party action is pinned to a full commit SHA with a `# vX.Y.Z` comment naming its latest release, for example `uses: pnpm/setup@<40-char sha> # v3.1.1`.
  - `.github/zizmor.yml` encodes this: `unpinned-uses` with `actions/*` and `github/*` set to `ref-pin` and `"*"` set to `hash-pin`.
  - Dependabot moves both the tags and the SHAs, and rewrites the version comment.
  - Every JavaScript action runs on `node24`; runners no longer ship Node 20. A third-party action without a `node24` release is replaced. Local actions stay composite.
- **Workflow lockfiles** (public preview): `gh actions-lock` writes `.github/workflows/actions.lock` with the commit of every action, transitive action and reusable workflow, and Dependabot regenerates it in the same PR. Optional on public repos, on top of the SHA pins, with a CI step that fails on a stale lockfile. Write down why it is held back until it is generally available; adopt it then.
- **Same-repo `uses`.** Local actions and reusable workflows use GitHub's self-repository syntax, `$/.github/actions/setup` and `$/.github/workflows/verify.yml`, never `./...`.
- **actionlint** 1.7.12 parses neither `$/` ([rhysd/actionlint#711](https://github.com/rhysd/actionlint/issues/711)), parallel steps ([#693](https://github.com/rhysd/actionlint/issues/693)), `cache-mode`, `concurrency.queue` nor the `ubuntu-26.04` labels ([#682](https://github.com/rhysd/actionlint/issues/682)). `.github/actionlint.yaml` ignores those messages instead of avoiding the features:

  ```yaml
  # actionlint 1.7.12 rejects `$/` (rhysd/actionlint#711), parallel steps (#693), cache-mode, concurrency.queue and ubuntu-26.04 (#682). zizmor parses them.
  self-hosted-runner:
    labels: [ubuntu-26.04, ubuntu-26.04-arm]
  paths:
    .github/workflows/**/*.{yml,yaml}:
      ignore:
        - 'reusable workflow call "\$/.+" at "uses" is not following the format'
        - 'specifying action "\$/.+" in invalid format because ref is missing'
        - 'unexpected key "background" for step'
        - 'step must run script with "run" section or run action with "uses" section'
        - 'unexpected key "cache-mode" for "(workflow|job)" section'
        - 'unexpected key "queue" for "concurrency" section'
  ```

  - The last ignore also hides a genuinely empty step, and actionlint does not lint the steps inside a `parallel` group. zizmor covers both.
  - Remove each ignore once an actionlint release parses the feature. If actionlint stays unmaintained, zizmor is the only required workflow linter.

- **zizmor** is required on public repos and optional on private ones. Run the latest release (`zizmorcore/zizmor-action` defaults to it); older releases do not parse parallel steps. Keep every audit on, `self-repository` included; fix a finding or suppress that one line with a comment saying why.

## Speed

- **Shape jobs by where the time goes.**
  - A separate job gets its own machine and its own check. Use one for CPU-heavy gates (`test`, `next build`) and for anything that must report on its own.
  - `parallel` steps share one machine and one install. Use them for cheap, I/O-bound or waiting work, so a job pays checkout and install once.
  - Private-repo standard Linux runners have fewer cores than public ones, so CPU-bound gates gain less from `parallel` there.
- **Parallel steps.**
  - `parallel:` takes a self-contained group of steps, runs them at once with separate logs, and waits for all of them.
  - `background: true` with an `id` starts one step and moves on. `wait: <id>` (or a list), or `wait-all:`, blocks until it finishes; `cancel: <id>` stops it with SIGTERM. Use these for long-running services.
  - At most 10 background steps run at once; more queue.
  - A background step's outputs and `GITHUB_ENV` changes appear only after a `wait` that includes it. If it fails, the job fails at that `wait`.
  - `wait`, `wait-all` and `cancel` always run and take no `if`.
  - Composite actions cannot declare `parallel` or `background` steps, so `.github/actions/setup` stays sequential; run it as one step.
  - Never background with shell `&`; it interleaves logs and loses the exit code.
- **Turbo already parallelizes tasks.** One `turbo run lint typecheck knip --affected` runs those tasks concurrently with grouped logs. Run that single Turbo call as one step of a `parallel` group next to the root-only checks; never one step per Turbo task.
- **Checkout.** The default depth of one commit, with `persist-credentials: false`. Jobs that run `--affected` use `fetch-depth: 0` with `filter: blob:none`: full history for the merge base, without old file contents.
- **Runners.**
  - `ubuntu-latest`. It moves to Ubuntu 26.04 between October 19 and November 19, 2026; pin `ubuntu-24.04` only as a temporary hold-back with a comment saying why.
  - arm64 (`ubuntu-24.04-arm`, `ubuntu-26.04-arm`) is optional for JavaScript-only jobs once they pass there. `database.yml` stays on x64 until the Supabase native runtime is confirmed on arm.
  - No `macos-14`; it is retired.
- **Every job sets `timeout-minutes`**, sized to about three times its normal run (around 10 for static gates, 20 for test and build, 30 for e2e), so a hung job does not run for the 6-hour default.
- **Sharding.** Split Vitest or Playwright across matrix jobs (`--shard=i/n`) only once a suite passes about 5 minutes. Playwright shards upload blob reports and a final job merges them.

## Caching

- **pnpm store.** `pnpm/setup` with `cache: true`. Only the default branch saves it: `save-cache: ${{ github.ref == format('refs/heads/{0}', github.event.repository.default_branch) }}`. PRs and the other matrix jobs restore that entry, so they do not upload near-identical stores against the 10 GB per-repo limit, which evicts the least recently used entries.
- **`install: false`** on jobs that need only pnpm, such as `pnpm audit signatures`.
- **Task outputs** come from the Turborepo Remote Cache ([`vercel.md`](vercel.md)). Never also put Turbo outputs in `actions/cache`.
- **`.next/cache`.** `actions/cache/restore` in every job that runs `next build`, and `actions/cache/save` only on the default branch, keyed on the lockfile hash and the app's sources, so the Turbopack build cache survives between runs.
- **Playwright browsers.** Cache `~/.cache/ms-playwright` keyed on the resolved `@playwright/test` version; on a hit, run only `playwright install-deps`.
- **`cache-mode`** applies least privilege to the cache, per workflow or per job, and a called workflow never gets more than its caller:
  - `read` on any workflow triggered by `pull_request_target`, `issue_comment` or `workflow_run` (GitHub's default for those, made explicit).
  - `none` on release and publish jobs, so a poisoned cache never reaches a publish.
  - Never `write` or `write-only` on a low-trust trigger.
- **Artifacts.** `actions/upload-artifact` sets `retention-days`, and `archive: false` for a single-file report that should open in the browser.

## Security

- **No `pull_request_target` with a checkout.** A workflow that checks out or runs PR code uses `pull_request`. zizmor flags the combination; never suppress that finding. `actions/checkout` v7 also refuses fork PR code under `pull_request_target` and `workflow_run`; never set `allow-unsafe-pr-checkout`.
- **Permissions.** Workflow-level `contents: read`, and each job adds only what it uses: `id-token: write` for OIDC, `vulnerability-alerts: read` only where a job reads Dependabot alerts.
- **OIDC trust policies** (npm trusted publishing, Vercel, cloud roles) match the immutable subject format `repo:<owner>@<id>/<repo>@<id>:…`. New and renamed repos use it; existing repos opt in from the OIDC settings.
- **Workflow execution protections** on public repos limit who and which events can start `release.yml` and `eas-build.yml` to maintainers. Run new rules in evaluate mode first.
- **Environments** that a job needs only for secrets set `deployment: false`, so the run does not create a deployment.
- **Concurrency.** CI groups cancel in progress. Release, deploy and EAS production groups use `queue: max` instead, so runs wait in order and none is dropped (the two cannot be combined).
- **Schedules** set `timezone` next to `cron`.

## Workflows

- **`.github/actions/setup`:** Remote Cache OIDC, then `pnpm/setup` with the Node major from `.node-version`, `require-lockfile`, and `cache: true` with a `save-cache` input that defaults to the default branch only.
- **`ci.yml`:**
  - Runs on PRs and on pushes to the working branch and `main`.
  - Minimal permissions plus `id-token: write`, cancelling concurrency and `CI: true`.
  - A `pr-title` job runs commitlint on the PR title.
  - Calls `verify.yml` (affected-only on PRs), then e2e if the repo has it.
- **`verify.yml`:** a reusable `workflow_call`, so `release.yml` runs the same gate on the release commit. It runs every `pnpm verify` gate and nothing else, so local and CI results agree, in two parts:
  - A `static` job: one checkout and setup, then one `parallel` group with a single Turbo step for the workspace tasks (lint, typecheck, knip, `openapi:check`, `i18n:check`, `docs:drift`) and one step per root-only check (`format:check`, `lint:root`, `boundaries`).
  - A `fail-fast: false` matrix with one job each for `test`, `build`, `audit:high` and `doctor`. Next builds run with `--concurrency=1` and restore `.next/cache`.
  - Affected runs on PRs combine `--affected` with the job's `--filter`.

  ```yaml
  static:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v7
        with:
          persist-credentials: false
          fetch-depth: 0
          filter: blob:none
      - uses: $/.github/actions/setup
      - parallel:
          - name: Workspace tasks
            run: pnpm exec turbo run lint typecheck knip openapi:check i18n:check docs:drift ${{ inputs.affected && '--affected' || '' }}
          - name: Format
            run: pnpm format:check
          - name: Root lint
            run: pnpm lint:root
          - name: Boundaries
            run: pnpm boundaries
  ```

- **`security.yml`:** `dependency-review-action` on PRs, `pnpm audit signatures` as a non-blocking step (`continue-on-error: true`, `install: false`) on lockfile changes, and on public repos zizmor and actionlint on workflow changes.
- **`database.yml`:** on `supabase/**` changes, on an x64 Ubuntu runner (no Docker service):
  - Start the project with `supabase start --runtime native` as a background step while dependencies install, then `wait` for it.
  - Run `supabase db schema declarative sync --no-apply --strict-coverage` and fail if it errors or leaves a new file in `supabase/migrations/` (schema files and migrations have drifted).
  - Run pgTAP and lint the SQL.
- **e2e** (with Playwright): start the built app as a background step, run Playwright against it, then `cancel` the server.
- **`powersync.yml`** (Offline: yes): on `packages/sync/powersync/**` changes, validate the sync config against the local stack.
- **`release.yml`:** see [`git-workflow.md`](git-workflow.md). Its publish job sets `cache-mode: none`.
- **`eas-build.yml`** (with Expo): a reusable `workflow_call` plus `workflow_dispatch` with a `profile` input.
  - `expo/expo-github-action` on its latest major tag, with `eas-version` from the latest release and the `EXPO_TOKEN` secret.
  - Runs `eas build --profile <profile> --platform all --non-interactive --no-wait`. CI only queues the build; EAS reports failures on its own.
  - `production` runs only from a release tag on `main` and adds `--auto-submit`. `development` builds can run from any branch on dispatch.
  - Concurrency is grouped per profile, with `queue: max` for `production`.
  - Native folders are generated on the EAS worker; CI never commits `ios/` or `android/`.

## Dependabot

- **`dependabot.yml`:**
  - npm (limit 10) and github-actions (limit 5).
  - Weekly on Monday, one grouped PR per ecosystem, `cooldown.default-days: 2`.
  - Pre-releases are allowed, so pre-release pins move forward.
  - `target-branch` is the working branch.
  - With workflow lockfiles, Dependabot updates `actions.lock` in the same PR.
