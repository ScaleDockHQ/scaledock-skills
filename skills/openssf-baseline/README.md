# openssf-baseline

An agent skill for the OpenSSF Open Source Project Security (OSPS) Baseline and OpenSSF Scorecard: assess a repository against the Baseline controls at maturity levels 1 to 3, self-attest the result, relate it to other frameworks, and run Scorecard in CI.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openssf-baseline
```

Then ask your agent to "assess this repository against OSPS Baseline level 1", "which Baseline controls relate to the CRA?" or "set up the Scorecard action and explain our scores".

## What it covers

- The eight Baseline families (Access Control, Build and Release, Documentation, Governance, Legal, Quality, Security Assessment, Vulnerability Management) and every assessment requirement by level.
- Scoping, evidence, applicability preconditions, the checklist and the dated self-attestation statement.
- The published relates-to mappings, with the Scorecard, CRA and SLSA mappings spelled out.
- Every Scorecard check with its risk level and scoring, the aggregate score, the CLI, scorecard-action in CI, maintainer annotations and probes.
- Upgrading a claim between Baseline releases, and from Scorecard v4 to v5.

## Versions

| Line                         | Status                |
| ---------------------------- | --------------------- |
| OSPS Baseline in-development | preview (track)       |
| OSPS Baseline v2026.08.28    | current               |
| OSPS Baseline v2026.02.19    | legacy (upgrade from) |
| OSPS Baseline v2025.10.10    | legacy (upgrade from) |
| OSPS Baseline v2025.02.25    | legacy (upgrade from) |
| OpenSSF Scorecard v5         | current (v5.5.0)      |
| OpenSSF Scorecard v4         | legacy (upgrade from) |

`references/versions.md` says what changed in each Baseline release and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OSPS Baseline](https://baseline.openssf.org/): v2026.08.28 (current), its checklist, crosswalk, release notes, FAQ, maintenance process and maintainer guidance.
- [ossf/security-baseline](https://github.com/ossf/security-baseline/tree/v2026.08.28/baseline): the control catalog and mapping documents at tag v2026.08.28.
- [OpenSSF Scorecard check documentation](https://github.com/ossf/scorecard/blob/v5.5.0/docs/checks.md): v5.5.0, with the README, release notes, annotations and OSPS Baseline coverage analysis.
- [Scorecard GitHub Action](https://github.com/ossf/scorecard-action): v2.4.4.
- [scorecard.dev](https://scorecard.dev/).

## License

MIT
