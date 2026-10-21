# GitHub Actions and Dependabot

Action pins, same-repo `uses`, workflow linters, speed (job shape and parallel steps), caching, security defaults, the shared setup action, the workflows, EAS builds, and Dependabot.

Applies to every repo kind. Each workflow below runs only the gates the repo has.

## Pins and linters

- **Pins.**
  - Every action, GitHub-owned or third-party, uses its latest major tag (`@vN`), for example `uses: pnpm/setup@v3`. Never a commit SHA, a minor or a patch tag.
  - An action that publishes no major tag, usually a 0.x action such as `zizmorcore/zizmor-action`, uses its latest release tag (`@v0.7.1`). Check with `gh api repos/<owner>/<repo>/git/refs/tags`.
  - This is a decision, not an oversight (scaledock-skills ADR 0008). The repos take fixes inside a major without a PR, and Dependabot opens the PR for the next major. Supply-chain risk is handled by the 7-day Dependabot cooldown, `minimumReleaseAge` for npm, the `permissions` defaults and zizmor. Do not switch back to SHA pins without a new ADR.
  - `.github/zizmor.yml` encodes this: `unpinned-uses` with `"*"` set to `ref-pin`.
  - Dependabot moves the major tags.
  - Every JavaScript action runs on `node24`; runners no longer ship Node 20. A third-party action without a `node24` release is replaced. Local actions stay composite.
- **Workflow lockfiles** (public preview): `gh actions-lock` writes `.github/workflows/actions.lock` with the commit of every action, transitive action and reusable workflow, and Dependabot regenerates it in the same PR. Optional on public repos, on top of the tag pins, with a CI step that fails on a stale lockfile. Write down why it is held back until it is generally available; adopt it then.
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
  - Workflows with parallel steps, `$/` actions, `cache-mode` and `concurrency.queue` pass with exactly this list.
  - Remove each ignore once an actionlint release parses the feature. If actionlint stays unmaintained, zizmor is the only required workflow linter.

- **zizmor** is required on public repos and optional on private ones. Run the latest release (`zizmorcore/zizmor-action` defaults to it); older releases do not parse parallel steps. Keep every audit on, `self-repository` included; fix a finding or suppress that one line with a comment saying why.
  - zizmor 1.31 warns that parallel-step support is experimental. The warning does not fail the run.
- **Running both locally.** Download the zizmor and actionlint release binaries into a temporary directory (`mktemp -d`) and run them from there. The pnpm runtime ships Node without npm, so `npx` is not an option.

## Speed

- **Shape jobs by where the time goes.**
  - A separate job gets its own machine and its own check. Use one for CPU-heavy gates (`test`, `next build`) and for anything that must report on its own.
  - `parallel` steps share one machine and one install. Use them for cheap, I/O-bound or waiting work, so a job pays checkout and install once.
  - Private-repo standard Linux runners have fewer cores than public ones, so CPU-bound gates gain less from `parallel` there.
  - Timing-sensitive gates (a type-check time ceiling, benchmarks, CLI startup budgets) each get their own job. Never put them in the shared `parallel` group, where CPU contention makes them flake.
  - `typecheck` gets its own job once it measures as the slowest step of the `parallel` group, run with `turbo run typecheck --concurrency=1` on 2 vCPU private runners (CentraKit ADR 0024).
  - Never cache `tsconfig.tsbuildinfo` with `actions/cache`. A stale file makes tsgo hang or report false errors; delete it before trusting a tsgo error locally.
- **Build first.** A `build` job runs `turbo run build`, uploads `dist` with `actions/upload-artifact`, and fills the Remote Cache. `verify` and the heavy suites declare `needs: build`, so every later job gets Turbo cache hits instead of rebuilding.
  - Add `needs: build` only when the longest chain already runs behind `build`; otherwise it lengthens the run. Measure that first with `gh run view <id> --json jobs`.
  - The Remote Cache must be active ([Caching](#caching)); without it every later job rebuilds.
  - _Verified in ScaleDockHQ/permdock PR #162: the shape is green; the saving is unmeasured until that repo's Remote Cache is on._
- **Skip unaffected heavy suites** (integration, runtimes, e2e).
  - The `build` job checks out with `fetch-depth: 0` and `filter: blob:none`, runs `turbo query affected --packages <suite> --exit-code` once per suite, and writes the result to `$GITHUB_OUTPUT`, exposed as a job output. The heavy job sets `if: needs.build.outputs.<suite> == 'true'`.
  - Exit code 0 means nothing is affected, so the suite is skipped; 1 means affected; 2 means a query error. Treat 2 as affected, so an error fails open and runs the suite.
  - Pushes to the default branch run every suite.
  - Affected detection follows the dependency graph: a library change marks its dependent test workspaces as affected.
  - A skipped job counts as passing for a required status check, so the gated jobs can stay required.
- **Strict task entrypoints.** With the `strictTaskEntrypointSelection` future flag ([`vercel.md`](vercel.md)), `turbo run test` and the static task set stop pulling in Next.js builds for workspaces that have no such task. In PermDock, `test` dropped from about 50 `build` tasks to 17, and the static set kept one Next build.
  - Check with `turbo run <tasks> --dry=json` and count the tasks whose `task` is `build`.
  - Once each job builds at most one Next app, drop the serial `--concurrency=1` Next pre-build step.
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
  - Standard runners are free on public repos, so moving a job to a smaller or larger runner changes no cost there.
- **Every job sets `timeout-minutes`**, sized to about three times its normal run (around 10 for static gates, 20 for test and build, 30 for e2e), so a hung job does not run for the 6-hour default.
- **Sharding.** Split Vitest or Playwright across matrix jobs (`--shard=i/n`) only once a suite passes about 5 minutes. Playwright shards upload blob reports and a final job merges them.
  - pnpm appends extra arguments after `pnpm run <script>` to the end of the script's command, so `pnpm run test:integration --shard=1/3` reaches Vitest.
  - `vitest list --shard` ignores the shard. To confirm the split, run `vitest run --shard=i/n -t <pattern that matches nothing> --reporter=json` and count `testResults`.
  - In PermDock, a 299-second integration suite became 3 shards of 34, 34 and 33 files.

## Caching

- **pnpm store.** `pnpm/setup` with `cache: true`. Only the default branch saves it: the setup action's `save-cache` input defaults to `${{ github.ref == format('refs/heads/{0}', github.event.repository.default_branch) }}`. Composite action input defaults may use the `github` context, so callers never repeat the expression. PRs and the other matrix jobs restore that entry, so they do not upload near-identical stores against the 10 GB per-repo limit, which evicts the least recently used entries.
  - A setup post step that takes 13 to 20 seconds on a PR job means the store is still being saved there.
  - _Verified in ScaleDockHQ/permdock PR #162: the post step took 0 to 1 seconds on every PR job._
- **`install: false`** on jobs that need only pnpm, such as `pnpm audit signatures`.
- **Task outputs** come from the Turborepo Remote Cache ([`vercel.md`](vercel.md)). Never also put Turbo outputs in `actions/cache`.
  - The audit confirms the Remote Cache is active. An unset `vars.TURBO_TEAM` makes the setup action skip the Remote Cache step silently, and Turbo logs "Remote caching disabled". Check `gh variable list`, and look for `outcome=skipped` on the Remote Cache step in `gh run view <id> --log`.
  - The report lists the `TURBO_TEAM` variable and the `TURBO_REMOTE_CACHE_SIGNATURE_KEY` secret as manual steps.
- **Turbopack build cache in CI: off by default.** `next.config` sets `turbopackFileSystemCacheForBuild: !process.env.GITHUB_ACTIONS`, and CI has no `.next/cache` step.
  - On a 2 vCPU private runner, a cold build that restored `.next/cache` used 7.8 of 7.9 GB of RAM plus 3 GB of swap and was killed (CentraKit ADR 0016). Parallel builds with the cache on hung on GitHub-hosted runners (PermDock ADR 0029).
  - Turn it on only on a larger runner, after measuring a cold and a warm build. Then `actions/cache/restore` runs in every job that runs `next build`, and `actions/cache/save` runs only on the default branch, keyed on the lockfile hash and the app's sources.
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

- **`.github/actions/setup`:** Remote Cache OIDC, then `pnpm/setup` with the Node major from `.node-version`, `require-lockfile`, and `cache: true`. Two inputs pass through to `pnpm/setup`: `save-cache`, which defaults to the default branch only, and `install`, which defaults to `"true"`.
- **`ci.yml`:**
  - Runs on PRs and on pushes to the working branch and `main`.
  - Minimal permissions plus `id-token: write`, cancelling concurrency and `CI: true`.
  - A `pr-title` job runs commitlint on the PR title.
  - With build first, a `build` job that also computes the affected heavy suites. Then it calls `verify.yml` (affected-only on PRs), then the gated heavy suites and e2e if the repo has them.
- **`verify.yml`:** a reusable `workflow_call`, so `release.yml` runs the same gate on the release commit. It runs every `pnpm verify` gate and nothing else, so local and CI results agree, in two parts:
  - A `static` job: one checkout and setup, then one `parallel` group with a single Turbo step for the workspace tasks (lint, typecheck, knip, `openapi:check`, `i18n:check`, `docs:drift`) and one step per root-only check (`format:check`, `lint:root`, `boundaries`). _Verified in ScaleDockHQ/permdock PR #162: the `parallel` group took 22 seconds._
  - A `fail-fast: false` matrix with one job each for `test`, `build`, `audit:high` and `doctor`, plus one per timing-sensitive gate. The `build` job builds every deployed app (docs and marketing included), not only the published package: better-supabase shipped an MDX error to production because CI built only the library. A job that still builds several Next apps runs them with `--concurrency=1` until strict task entrypoints cut it to one.
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

- **`security.yml`:** `dependency-review-action` on PRs, `pnpm audit signatures` as a non-blocking job on lockfile changes, and on public repos zizmor and actionlint on workflow changes.
  - `dependency-review-action` fails with "Dependency review is not supported on this repository" while the repo's Dependency graph is off. The report lists turning it on (Settings, then Code security) as a manual step for private repos.
  - Workflow `paths` filters cannot scope a single job. The signatures job sets `continue-on-error: true`, checks out with `fetch-depth: 0` and `filter: blob:none`, runs `git diff --quiet "origin/$BASE...HEAD" -- pnpm-lock.yaml` (with `BASE` from `github.base_ref`), and gates its later steps on the result.
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
  - Weekly on Monday, one grouped PR per ecosystem, `cooldown.default-days: 7`. zizmor's `dependabot-cooldown` audit flags anything shorter (PermDock ADR 0027).
  - Pre-releases are allowed, so pre-release pins move forward.
  - `target-branch` is the working branch.
  - With workflow lockfiles, Dependabot updates `actions.lock` in the same PR.
