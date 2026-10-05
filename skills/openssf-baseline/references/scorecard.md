# OpenSSF Scorecard v5

Read this for steps 8 and 9 of the workflow. Sources: the Scorecard v5.5.0 check documentation (`docs/checks.md`) and README, the v5.0.0 and v5.5.0 release notes, the maintainer annotations documentation, the scorecard-action README and `action.yaml` at v2.4.4, Scorecard's OSPS Baseline coverage analysis, the Baseline's `osps-to-scorecard.yaml` mapping, and scorecard.dev, listed in [Sources](../SKILL.md#sources).

## What Scorecard is

Scorecard is an automated tool that assesses heuristics ("checks") associated with software security and assigns each a score of 0 to 10 (README, What is Scorecard?). Its stated non-goal is to be a definitive report or requirement: checks are heuristics with false positives and false negatives, and an aggregate score "tells you nothing about what individual behaviors a repository is or is not doing" (README, Project Non-Goals). Several checks note that a project meeting the criterion with other tools may still score low (checks.md, CI-Tests, Dependency-Update-Tool, Fuzzing, Packaging, SAST).

## Aggregate score

The aggregate is a weighted average of the individual checks, weighted by risk: Critical 10, High 7.5, Medium 5, Low 2.5 (README, Scoring, Aggregate Score).

## Checks

Risk levels are from `docs/checks.md` at v5.5.0.

| Check                  | Risk     | What it detects and how it scores                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Binary-Artifacts       | High     | Generated executables (binary artifacts) in the source repository.                                                                                                                                                                                                                                                                                                                                                |
| Branch-Protection      | High     | Protection of default and release branches via branch protection or repository rules. Tiered: Tier 1 (3/10) no force push, no deletion; Tier 2 (6/10) 1 reviewer, PRs required, up to date, last-push approval; Tier 3 (8/10) at least 1 status check; Tier 4 (9/10) 2 reviewers, code owner review; Tier 5 (10/10) dismiss stale reviews, include administrators. Each tier must be fully met to score the next. |
| CI-Tests               | Low      | Successful tests on pull requests, from check runs and statuses on ~30 recent commits. GitHub only.                                                                                                                                                                                                                                                                                                               |
| CII-Best-Practices     | Low      | OpenSSF Best Practices badge: gold 10, silver 7, passing 5, in progress 2.                                                                                                                                                                                                                                                                                                                                        |
| Code-Review            | High     | Approval or a different merger on the last ~30 commits (also Prow and Gerrit). Unreviewed bot changes −3; one unreviewed human change −7, several another −3. Bot or AI review does not count.                                                                                                                                                                                                                    |
| Contributors           | Low      | Contributors from at least 3 companies in the last 30 commits, each with at least 5 commits. GitHub only.                                                                                                                                                                                                                                                                                                         |
| Dangerous-Workflow     | Critical | GitHub Actions `pull_request_target` or `workflow_run` with an explicit PR checkout, and untrusted context values (for example `github.event.issue.title`) in inline scripts.                                                                                                                                                                                                                                     |
| Dependency-Update-Tool | High     | Dependabot or Renovate configured; does not check that updates are merged.                                                                                                                                                                                                                                                                                                                                        |
| Fuzzing                | Medium   | OSS-Fuzz listing, ClusterFuzzLite, or language fuzzing and property-based testing functions.                                                                                                                                                                                                                                                                                                                      |
| License                | Low      | License file detected (6/10, including a `LICENSES` directory), at top level (3/10), FSF or OSI license (1/10).                                                                                                                                                                                                                                                                                                   |
| Maintained             | High     | Archived scores lowest; at least one commit per week for 90 days scores highest; collaborator issue activity scores partially. Needs a project older than 90 days.                                                                                                                                                                                                                                                |
| Packaging              | Medium   | Packaging workflows publishing to a registry. GitHub only.                                                                                                                                                                                                                                                                                                                                                        |
| Pinned-Dependencies    | Medium   | Unpinned dependencies in Dockerfiles, shell scripts and GitHub workflows; a pin is a specific hash. Full Go module versions count as pinned. GitHub only.                                                                                                                                                                                                                                                         |
| SAST                   | Medium   | Known SAST apps on ~30 recent merged PRs, or `github/codeql-action` in a workflow. GitHub only.                                                                                                                                                                                                                                                                                                                   |
| SBOM                   | Medium   | An SBOM exists in source, pipeline or release (5/10); an SBOM is published as a release artifact (5/10).                                                                                                                                                                                                                                                                                                          |
| Security-Policy        | Medium   | `SECURITY.md`: email or http(s) link for reporting (6/10), free-form text (3/10), vulnerability and disclosure text with timelines (1/10).                                                                                                                                                                                                                                                                        |
| Signed-Releases        | High     | In recent releases' assets (source-only releases ignored): `*.minisig`, `*.asc`, `*.sig`, `*.sign`, `*.sigstore`, `*.sigstore.json` score 8; SLSA provenance `*.intoto.jsonl` for each release scores 10. Signatures are not verified.                                                                                                                                                                            |
| Token-Permissions      | High     | Workflow token permissions: read-only at the top level with write permissions declared per job scores highest; −1 if all jobs declare permissions but the top level does not.                                                                                                                                                                                                                                     |
| Vulnerabilities        | High     | Open, unfixed vulnerabilities in the code or its dependencies, using OSV. Non-affecting ones can be ignored with an `osv-scanner.toml` entry and reason.                                                                                                                                                                                                                                                          |
| Webhooks               | Critical | Repository webhooks have a token configured to authenticate request origins. Marked experimental in the README; needs a maintainer token.                                                                                                                                                                                                                                                                         |

Notes:

- Branch-Protection settings `DismissStaleReviews`, `EnforceAdmins`, `RequireLastPushApproval`, `RequiresStatusChecks` and `UpToDateBeforeMerge` need an admin token with classic branch protection; with repository rules they are readable. Without an admin token, the "For administrators" requirements are scored as met (checks.md, Branch-Protection).
- The public weekly scan and REST API omit CI-Tests, Contributors and Dependency-Update-Tool (README, Scorecard REST API).
- From v5.5.0, checks that do not apply to the repository type are skipped (v5.5.0 release notes).
- 2FA is not a check: the platforms do not expose it, and the README recommends enabling it anyway (README, Two-factor Authentication).

## Running Scorecard

### CLI

```shell
export GITHUB_AUTH_TOKEN=<token with public_repo scope>
scorecard --repo=github.com/<owner>/<repo>
scorecard --repo=github.com/<owner>/<repo> --checks=Branch-Protection,Token-Permissions --show-details
scorecard --repo=github.com/<owner>/<repo> --format=json
scorecard --repo=github.com/<owner>/<repo> --probes=archived,hasLicenseFile --format=probe
```

- Authenticate with a classic personal access token (`GITHUB_AUTH_TOKEN`, `GITHUB_TOKEN`, `GH_AUTH_TOKEN` or `GH_TOKEN`; several tokens comma-separated round robin) or a GitHub App installation (`GITHUB_APP_KEY_PATH`, `GITHUB_APP_INSTALLATION_ID`, `GITHUB_APP_ID`) (README, Authentication).
- Docker: `docker run -e GITHUB_AUTH_TOKEN=<token> ghcr.io/ossf/scorecard:<version> --repo=...`; the README shows both `latest` and a specific version tag. Record the version you ran.
- `--npm`, `--pypi`, `--rubygems` or `--nuget` resolve a package to its GitHub repository and cannot be combined with `--repo` (README, Using a Package manager). GitLab and GitHub Enterprise Server repositories are supported with their own setup (README).
- `--show-annotations` shows maintainer annotations (README, Showing Maintainers Annotations).

### CI with scorecard-action

The Scorecard project's own workflow (`.github/workflows/scorecard-analysis.yml` at v5.5.0), with the action version updated to the latest release:

```yaml
name: Scorecard analysis workflow
on:
  push:
    branches: [main]
  schedule:
    - cron: "30 1 * * 6"

permissions: read-all

jobs:
  analysis:
    name: Scorecard analysis
    runs-on: ubuntu-latest
    permissions:
      security-events: write # upload to code scanning
      id-token: write # needed when publish_results is true
    steps:
      - uses: actions/checkout@<full commit sha> # pin by hash
        with:
          persist-credentials: false
      - uses: ossf/scorecard-action@<full commit sha> # v2.4.4
        with:
          results_file: results.sarif
          results_format: sarif
          publish_results: true
      - uses: actions/upload-artifact@<full commit sha>
        with:
          name: SARIF file
          path: results.sarif
          retention-days: 5
      - uses: github/codeql-action/upload-sarif@<full commit sha>
        with:
          sarif_file: results.sarif
```

Rules from the scorecard-action README and `action.yaml` (v2.4.4):

- Inputs: `results_file` and `results_format` (`json` or `sarif`; `sarif` for the code scanning dashboard) are required; `repo_token` defaults to `github.token`; `publish_results` defaults to false; `file_mode` is `archive` (default) or `git`.
- Supported triggers are `push` and `schedule` on the default branch; `pull_request` and `workflow_dispatch` are experimental. Forks and GitHub Enterprise repositories are not supported.
- `publish_results: true` replaces the weekly-scan results with yours, enables the badge and the REST API entry, and requires `id-token: write`.
- When publishing, the workflow has no top-level env vars or defaults and no workflow-level write permissions, and only the Scorecard job has `id-token: write`. That job has no env vars or defaults, no containers or services, runs on an Ubuntu hosted runner, and uses only `actions/checkout`, `actions/upload-artifact`, `github/codeql-action/upload-sarif`, `ossf/scorecard-action` and `step-security/harden-runner`.
- The default `GITHUB_TOKEN` is the recommended token. Classic branch protection needs a fine-grained PAT to be fully read; repository rules are readable with the default token.
- Private repositories need GitHub Advanced Security for the action, plus job-level `contents: read`, `issues: read`, `pull-requests: read` and `checks: read`.

Badge, once publishing:

```markdown
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/{owner}/{repo}/badge)](https://scorecard.dev/viewer/?uri=github.com/{owner}/{repo})
```

The workflow above also scores well on Scorecard's own Token-Permissions (read-all top level, write per job) and Pinned-Dependencies (actions pinned by hash) checks.

## Maintainer annotations

Put `scorecard.yml` (or `.scorecard.yml`, `.github/scorecard.yml`) at the repository root to add context to check results (config README):

```yaml
annotations:
  - checks:
      - binary-artifacts
    reasons:
      - reason: test-data # binaries only used in tests
  - checks:
      - sast
    reasons:
      - reason: not-supported # SAST tool Scorecard does not recognize
```

Check names are lower case. Reasons: `test-data`, `remediated`, `not-applicable`, `not-supported`, `not-detected`. Annotations are displayed alongside the check results, with `--show-annotations` on the CLI.

## Probes

From v5, checks are composed of probes that can be run individually with `--probes` and `--format probe` (v5.0.0 release notes, Structured Results). Scorecard's coverage analysis names the probes that give evidence for Baseline requirements, for example `blocksDeleteOnBranches` (OSPS-AC-03.02), `requiresPRsToChangeCode` (AC-03.01), `hasDangerousWorkflowUntrustedCheckout` (BR-01.03), `hasFSFOrOSIApprovedLicense` (LE-02.01), `runsStatusChecksBeforeMerging` (QA-03.01), `testsRunInCI` (QA-06.01), `releasesAreSigned` and `releasesHaveProvenance` (BR-06.01), `hasReleaseSBOM` (QA-02.02).

## Baseline-to-Scorecard mapping

From `baseline/mappings/osps-to-scorecard.yaml` at v2026.08.28, against Scorecard 5.0. Each is `relates-to`:

| Baseline control | Scorecard checks                       |
| ---------------- | -------------------------------------- |
| OSPS-AC-03       | Branch-Protection                      |
| OSPS-BR-01       | Dangerous-Workflow                     |
| OSPS-BR-06       | Signed-Releases                        |
| OSPS-DO-06       | Pinned-Dependencies                    |
| OSPS-LE-02       | License                                |
| OSPS-LE-03       | License                                |
| OSPS-QA-05       | Binary-Artifacts                       |
| OSPS-QA-06       | CI-Tests                               |
| OSPS-QA-07       | Code-Review                            |
| OSPS-VM-01       | Security-Policy                        |
| OSPS-VM-02       | Security-Policy                        |
| OSPS-VM-05       | Security-Policy, Vulnerabilities       |
| OSPS-VM-06       | Security-Policy, Vulnerabilities, SAST |

Token-Permissions, Pinned-Dependencies and SBOM are not mapped to OSPS-AC-04, OSPS-BR-05 or OSPS-QA-02 in this document, though Scorecard's coverage analysis uses Token-Permissions probes as partial evidence for AC-04.01 and AC-04.02 and SBOM probes for QA-02.02. Scorecard's analysis of Baseline v2026.02.19 rates 8 controls fully covered, 17 partially and the rest not covered or not observable (coverage analysis, Summary). So a Scorecard run is evidence for some requirements, never the assessment.

## Common mistakes

- Reporting the aggregate score as a security rating or a Baseline level.
- Reading a low CI-Tests, SAST or Fuzzing score as proof the practice is missing; check the details and annotate.
- Running the action with `publish_results: true` and a workflow-level `env:` or write permission, which makes the publish fail.
- Pinning actions by tag in the Scorecard workflow itself, which costs Pinned-Dependencies points.
- Treating Signed-Releases 10/10 as verified signatures; the check only looks for file names.
