# Versions and upgrades

Read this when choosing a target version, reading a claim written against an older Baseline release, upgrading, or deciding what to do with the in-development version. Sources: the versions list on the Baseline home page, the Baseline release notes, the Maintenance Process, the per-version pages, the Scorecard releases and check documentation, listed in [Sources](../SKILL.md#sources).

## Version lines

The Baseline is versioned by date, `YYYY-MM-DD`, with git tags `vYYYY.MM.DD` (Maintenance Process, Versions/releases). Every release changed or added controls, so each is its own line. Scorecard is a separate family with semver major lines.

| Id              | Line                         | Status  | Revision                     | Posture | Summary                                                                                 |
| --------------- | ---------------------------- | ------- | ---------------------------- | ------- | --------------------------------------------------------------------------------------- |
| `devel-preview` | OSPS Baseline in-development | preview | main at ca5dbf3 (2026-10-02) | track   | Splits OSPS-VM-05.01 into VM-05.04 and VM-05.05; clarifies OSPS-AC-03.02.               |
| `2026.08.28`    | OSPS Baseline v2026.08.28    | current | v2026.08.28 (2026-08-28)     |         | The default target. One modified requirement; mappings move to Gemara documents.        |
| `2026.02.19`    | OSPS Baseline v2026.02.19    | legacy  | v2026.02.19 (2026-02-19)     |         | Retired OSPS-BR-01.02; added BR-01.03, BR-01.04, DO-07.01.                              |
| `2025.10.10`    | OSPS Baseline v2025.10.10    | legacy  | v2025.10.10 (2025-10-10)     |         | Added six requirements, including secrets (BR-07) and unreviewable binaries (QA-05.02). |
| `2025.02.25`    | OSPS Baseline v2025.02.25    | legacy  | v2025.02.25 (2025-02-25)     |         | Initial release.                                                                        |
| `scorecard-v5`  | OpenSSF Scorecard v5         | current | v5.5.0 (2026-04-23)          |         | Family `scorecard`. Structured results (probes), maintainer annotations, SBOM check.    |
| `scorecard-v4`  | OpenSSF Scorecard v4         | legacy  | v4.13.1 (2023-10-20)         |         | Family `scorecard`. Superseded by v5; Go API under `scorecard/v4/pkg`.                  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The home page says previous Baseline versions are "presented for historical reference" and "only the version labeled as 'current' should be used for new compliance efforts" (Home, Versions). That is why no older Baseline release is supported. Previous versions stay available and are not changed except for typo and technical fixes (Maintenance Process, Versions/releases).

Requirement counts by the lowest level at which each applies, from each version's Controls Overview:

| Version     | Level 1 | Level 2 | Level 3 | Total |
| ----------- | ------- | ------- | ------- | ----- |
| v2025.02.25 | 20      | 18      | 18      | 56    |
| v2025.10.10 | 24      | 18      | 20      | 62    |
| v2026.02.19 | 24      | 19      | 21      | 64    |
| v2026.08.28 | 24      | 19      | 21      | 64    |

## Which version to use

- Default to OSPS Baseline v2026.08.28 for every new assessment and statement.
- Treat a statement against v2026.02.19, v2025.10.10 or v2025.02.25 as a dated historical claim; it stays true for that version, but re-assess against v2026.08.28 for anything new.
- Do not claim against the in-development version; its requirements can still change.
- For Scorecard, use v5 at its latest release (v5.5.0, also what scorecard-action v2.4.4 runs). Read v4 results only to compare history.

## What changed

### OSPS Baseline v2026.08.28

From the 2026-08-28 release notes:

- Modified: OSPS-LE-03.01 also accepts a `LICENSES/` directory as a license location.
- Modified (published with the release pages): OSPS-GV-03.01 accepts clearly stating that public contributions are not accepted, and the "While active" qualifier is removed from all requirement texts. The tagged catalog already carries this text; the checklist and version page were regenerated after the tag (commit "regenerate v2026.08.28 pages with post-cut baseline changes").
- New mapping: OpenSSF Scorecard.
- Mappings are now machine-readable Gemara mapping documents published to grc.store with each release, each version has an External Framework Crosswalk page, and the External Frameworks table lists only frameworks with published mappings (OpenChain renamed to ISO/IEC 18974).
- Content and tooling migrated to the Gemara v1 schema.
- No new or removed requirements.

### OSPS Baseline v2026.02.19

- New: OSPS-BR-01.03 (Level 1, untrusted code snapshots must not reach privileged CI/CD credentials), OSPS-DO-07.01 (Level 2, build instructions), OSPS-BR-01.04 (Level 3, sanitize trusted collaborator input).
- Modified: OSPS-BR-01.01 now covers "untrusted metadata" instead of "an input parameter"; OSPS-BR-03.02 now requires distribution channels to be protected from adversary-in-the-middle attacks with cryptographically authenticated channels instead of "exclusively delivered using encrypted channels"; OSPS-QA-04.01 now applies to "projects with multiple repositories" listing all codebases, instead of listing subprojects.
- Removed: OSPS-BR-01.02 (branch names sanitized before use), folded into the reworded BR-01.01.
- New mappings: BSI TR-03185-2 and additional UK Software Security Code of Practice entries. Control titles shortened.

### OSPS Baseline v2025.10.10

- New Level 1: OSPS-BR-01.02, OSPS-BR-03.02, OSPS-BR-07.01, OSPS-QA-05.02. New Level 3: OSPS-BR-07.02, OSPS-DO-03.02.
- No modified or removed requirements.
- New mappings: NIST SP 800-161, PCI DSS, P-SSCRM, OWASP SAMM, UK Software Security Code of Practice. Lexicon terms added.

### OSPS Baseline v2025.02.25

- Initial release. No identifiers have been renumbered since; later releases only add, modify or retire requirements, as the Maintenance Process requires (Identifiers).

### OpenSSF Scorecard v5

From the v5.0.0 release notes and the v5.5.0 check documentation:

- Structured results: checks are broken into probes, run with `--probes` and `--format probe`.
- Maintainer annotations (`scorecard.yml`), shown with `--show-annotations`.
- Go API moves from `github.com/ossf/scorecard/v4/pkg` to `github.com/ossf/scorecard/v5/pkg/scorecard`; `RunScorecard` becomes `Run`, `ScorecardResult` becomes `Result`. Dependency diff is removed.
- New SBOM check (Medium risk; added as experimental in v5.0.0).
- Branch-Protection Tier 2 adds "For administrators: Require PRs prior to make any code changes" and weights the 1-reviewer requirement twice for administrators.
- Signed-Releases also accepts `*.sigstore` and `*.sigstore.json`; License also accepts files in a `LICENSES` directory; Fuzzing drops OneFuzz.
- v5.5.0: official images on GitHub Container Registry; checks that do not apply to the repository type are skipped; Branch-Protection uses rulesets when classic rules are inaccessible; Dangerous-Workflow detects `toJSON(github.event)`.

## Upgrading

### OSPS Baseline v2026.02.19 to v2026.08.28

1. Change the version marker in the checklist and statement to v2026.08.28.
2. Re-check OSPS-LE-03.01 (a `LICENSES/` directory now satisfies it) and OSPS-GV-03.01 (a clear statement that public contributions are not accepted now satisfies it).
3. Drop "While active" from any requirement text you copied; the meaning of the requirement is otherwise unchanged.
4. Re-date the statement. Re-run step 7 of the workflow if you report mappings, using the v2026.08.28 mapping documents.

### OSPS Baseline v2025.10.10 to v2026.02.19

1. Change the version marker to v2026.02.19.
2. Remove OSPS-BR-01.02 from the checklist; it is retired.
3. Re-assess OSPS-BR-01.01 against "untrusted metadata" (branch names, commit messages, tags, pull request titles, author information), OSPS-BR-03.02 against authenticated distribution channels, and OSPS-QA-04.01 against the list of all codebases.
4. Assess the new requirements: OSPS-BR-01.03 (Level 1), OSPS-DO-07.01 (Level 2), OSPS-BR-01.04 (Level 3).
5. Then continue with the v2026.02.19 to v2026.08.28 steps.

### OSPS Baseline v2025.02.25 to v2025.10.10

1. Change the version marker to v2025.10.10.
2. Assess the new Level 1 requirements OSPS-BR-01.02, OSPS-BR-03.02, OSPS-BR-07.01 and OSPS-QA-05.02, and the new Level 3 requirements OSPS-BR-07.02 and OSPS-DO-03.02.
3. Continue with the later upgrade sections in order.

### OpenSSF Scorecard v4 to v5

1. Pin the v5 CLI, image or scorecard-action release (v2.4.4 runs v5.5.0); images are on `ghcr.io/ossf/scorecard` from v5.5.0.
2. Go API callers: import `github.com/ossf/scorecard/v5/pkg/scorecard`, call `scorecard.Run`, read `scorecard.Result`, and pass options instead of all clients. Replace dependency diff with a separate dependency review step.
3. Expect score changes on Branch-Protection (new Tier 2 requirement), License (`LICENSES` directory), Signed-Releases (Sigstore bundle names) and the new SBOM check; compare per check, not the aggregate.
4. Add `scorecard.yml` annotations where v5 reports a check Scorecard cannot detect.

## Preview: OSPS Baseline in-development

The in-development version is the `main` branch, published at `/versions/devel` with its own checklist and crosswalk. Posture: **track**. As of 2026-10-05 (main at ca5dbf3), it differs from v2026.08.28 in two requirements:

- OSPS-VM-05.01 is retired and split into OSPS-VM-05.04 (Level 3: the project documentation MUST define a remediation threshold for SCA findings related to vulnerabilities) and OSPS-VM-05.05 (Level 3: the same for SCA findings related to licenses).
- OSPS-AC-03.02 is reworded to "MUST treat this as a sensitive activity that requires explicit confirmation of intent".

Do not cite VM-05.04 or VM-05.05 in a claim yet; keep assessing VM-05.01. A policy that states one threshold for vulnerability findings and one for license findings matches both the current VM-05.01 text and the split wording. When the next dated release ships: make it current, make v2026.08.28 legacy, add a "What changed" entry from its release notes, and add an upgrade section.

Scorecard v6 is a roadmap item, not a release: the 2026 roadmap describes an additive OSPS Baseline conformance layer (PASS, FAIL or UNKNOWN per control, targeting Baseline v2026.02.19) alongside unchanged checks and scores. It has no released text, so it is not listed as a preview. Watch the Scorecard releases page.
