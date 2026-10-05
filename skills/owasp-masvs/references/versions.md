# Versions and upgrades

Read this when choosing which MASVS, MASTG and MASWE releases to cite, reading a checklist or report written for an older line, upgrading, or checking unreleased work. Sources: the GitHub releases of `OWASP/masvs`, `OWASP/mastg` and `OWASP/maswe`, the MASVS documents at v2.1.0 and v1.5.0, the MASTG v2.0.0 tests, the comparison of MASVS v2.1.0 with its development branch, and MASTG pull request 3979, listed in [Sources](../SKILL.md#sources).

## Version lines

The three MAS components are versioned separately, so each is its own family with one current line.

| Id           | Line       | Status  | Revision                      | Posture | Summary                                                                            |
| ------------ | ---------- | ------- | ----------------------------- | ------- | ---------------------------------------------------------------------------------- |
| `masvs-2.1`  | MASVS 2.1  | current | v2.1.0 (2024-01-18)           |         | 24 controls in eight groups, including MASVS-PRIVACY; no levels on controls.       |
| `masvs-1.5`  | MASVS 1.5  | legacy  | v1.5.0 (2023-01-31)           |         | Last 1.x: V1 to V8, `MSTG-*` requirement IDs, levels L1, L2 and R.                 |
| `mastg-2`    | MASTG 2.0  | current | v2.0.0 (2026-06-30)           |         | First stable modular MASTG: atomic `MASTG-TEST-*` tests, demos, techniques, tools. |
| `mastg-1`    | MASTG 1.7  | legacy  | v1.7.0 (2023-10-31)           |         | Last 1.x: monolithic v1 tests, now deprecated and unmaintained.                    |
| `maswe-1`    | MASWE 1.0  | current | v1.0.0 (2026-08-17)           |         | First stable MASWE: 78 weaknesses, `MASWE-0001` to `MASWE-0078`, stable IDs.       |
| `maswe-beta` | MASWE beta | legacy  | pre-1.0 beta (119 weaknesses) |         | Beta numbering, used in MASTG 2.0.0 metadata; renumbered by MASWE 1.0.0.           |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

MASVS 2.0.0 (2023-04-01) is the first release of the 2.x line and is covered by `masvs-2.1`; MASVS 1.0 to 1.4.2 are covered by `masvs-1.5`, since 1.5.0 changed no requirements (MASVS v1.5.0 release). There is no preview: no MASVS, MASTG or MASWE pre-release tag exists after the current releases.

## Which version to use

- Cite MASVS 2.1 control IDs, MASWE 1.0 weakness IDs and MASTG 2.0 test IDs.
- The mas.owasp.org website follows the development branches. It already shows MASWE 1.0 IDs in MASTG tests and profiles on weaknesses. When a report must be reproducible, cite the release tags in [Sources](../SKILL.md#sources), not the website.
- Treat MASVS 1.5 checklists, MASTG 1.x tests and MASWE beta IDs as input to an upgrade.

## What changed

### MASVS 2.1

From the MASVS v2.1.0 release:

- New group MASVS-PRIVACY with MASVS-PRIVACY-1 to -4.
- The MASVS is also published in CycloneDX format (`OWASP_MASVS.cdx.json`).

### MASVS 2.0

From the MASVS v2.0.0 release:

- Rewritten as 20 controls in seven groups (STORAGE, CRYPTO, AUTH, NETWORK, PLATFORM, CODE, RESILIENCE), keeping abstraction and leaving details to the MASTG.
- Redundancies removed, terminology aligned with NIST SP 800-175B, NIST OSCAL, CWE and platform docs, and scope narrowed to rely on the ASVS, SAMM and SSDF.
- Levels L1, L2 and R removed from controls and moved to MASTG tests as MAS profiles.
- A transition phase: MASTG 1.5.0 still supported MASVS 1.5.0 while tests were mapped to 2.0.0.

### MASTG 2.0

From the MASTG v2.0.0 release:

- Completes the v2 refactor: tests, techniques, tools, knowledge articles, best practices and demos as individually referenceable pages with metadata, linked to MASVS and MASWE.
- 193 tests, 152 demos, 167 techniques, 140 knowledge articles, 72 best practices and 135 tools.
- v1 tests are deprecated and no longer maintained; v2 tests are canonical.

### MASWE 1.0

From the MASWE v1.0.0 release:

- Consolidation from 119 to 78 weaknesses: 72 renamed and rescoped, 47 absorbed, 6 new (MASWE-0040, -0048, -0051, -0055, -0069, -0075).
- Every weakness renumbered once, in one contiguous block per group in the order STORAGE, CRYPTO, AUTH, NETWORK, PLATFORM, CODE, RESILIENCE, PRIVACY. From 1.0.0 on, IDs are never reused or renumbered, and new IDs take the next free number regardless of group.
- Each weakness has exactly Overview, Modes of Introduction, Impact and Mitigations, with Impact labels from a fixed vocabulary.

### Unreleased work

Noted here, not listed as a preview line:

- MASVS development branch, 19 commits after v2.1.0 (compare v2.1.0...master): no control statements changed. The MASVS-RESILIENCE introduction adds RASP, a transparency and open audit perspective (for public-interest apps), platform lock-in from flavour-specific detection or attestation services, and a malware and testing perspective. "Using the MASVS" now points to the MAS Profiles pages and mentions the 2026 MASWE refactoring.
- MASTG after v2.0.0: test metadata uses `maswe:` with MASWE 1.0 IDs, and pull request 3979 removed `profiles` from tests so they are inherited from MASWE.

## Upgrading

### MASVS 1.5 to MASVS 2.1

1. Replace each `MSTG-*` or `V<n>.<m>` requirement with its 2.x control and MASWE weaknesses from the mapping in [`upgrade-from-1.md`](upgrade-from-1.md).
2. Move unmapped V1 architecture items to the assumptions (threat model, SAMM, SSDF evidence) and unmapped remote endpoint items (session handling, password policy, brute-force limits) to an ASVS assessment.
3. Remove level columns from the control list. Choose profiles for the app and take each weakness's profile from MASWE 1.0.
4. Add MASVS-PRIVACY-1 to -4 and decide whether MAS-P applies.
5. Check that every requirement from the old checklist is either mapped or recorded with a reason; an upgrade that silently drops a requirement is a regression.

### MASVS 2.0 to MASVS 2.1

1. Add the MASVS-PRIVACY group. No 2.0 control changed ID or statement (`controls/` at v2.1.0).
2. Update the version cited in reports and requirements.

### MASTG 1.x to MASTG 2.0

1. For each v1 test (`MASTG-TEST-0001` style IDs under `tests/`), read `covered_by` in its front matter and replace it with the listed v2 tests.
2. Where `covered_by` is missing, find v2 tests through the weakness for the same control; if none exists, test from the weakness's Modes of Introduction.
3. Stop citing `MSTG-*` IDs from v1 test metadata (`masvs_v1_id`) as requirements; cite the `masvs_v2_id` control.

### MASWE beta to MASWE 1.0

1. Download `OWASP_MASWE.yaml` from the v1.0.0 release.
2. For each beta ID, find the 1.0 weakness whose `mappings.maswe-beta` list contains it. One beta ID can appear in several 1.0 weaknesses; pick by title and scope.
3. Translate weakness IDs in MASTG 2.0.0 test metadata the same way: for example, MASTG-TEST-0204 (Insecure Random API Usage) has `weakness: MASWE-0027` in MASTG 2.0.0, which is MASWE-0012 (Improper Random Number Generation) in 1.0, while MASWE-0027 in 1.0 is Insecure Certificate Validation.
4. Never mix numberings in one report.
