# Versions and upgrades

Read this when choosing which ASVS release to cite, reading a report or policy written against an older release, upgrading one, or checking the bleeding edge for upcoming changes. Sources: the GitHub releases, the 5.0.0 and 4.0.3 markdown, the "Changes Compared to v4.x" chapter, the mapping files and the `master` branch, listed in [Sources](../SKILL.md#sources).

## Version lines

ASVS releases are `Major.Minor.Patch`. A major release reorganizes everything, including requirement numbers, and compliance must be re-evaluated; a minor release may add or remove requirements but keeps the numbering; a patch release only removes requirements or makes them less stringent, so an application that complied before still complies (5.0.0 What is the ASVS?, Release strategy).

| Id                      | Line               | Status  | Revision                                 | Posture | Summary                                                                                                  |
| ----------------------- | ------------------ | ------- | ---------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `bleeding-edge-preview` | ASVS bleeding edge | preview | `master` at 9b5da31 (2026-10-05)         | track   | Post-5.0.0 edits on `master`: editorial fixes and Appendix C table changes; no requirement text changes. |
| `5.0.0`                 | ASVS 5.0.0         | current | 5.0.0 (2025-05-30, tag `v5.0.0_release`) |         | 345 requirements in 17 chapters, levels redefined by priority, documented security decisions.            |
| `4.0.3`                 | ASVS 4.0.3         | legacy  | 4.0.3 (2021-10-28, tag `v4.0.3_release`) |         | 278 active requirements in 14 chapters, tick-mark levels, CWE and NIST mappings. Superseded by 5.0.0.    |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Earlier releases (1.0, 2.0, 3.0, 3.0.1, 4.0.1, 4.0.2) have folders or tags in the repository but are not covered. 4.0.1 and 4.0.2 are patches of the 4.0 line; treat them as 4.0.3 input and check ids against the 4.0.3 text before mapping.

## Which version to use

- Write new requirements, reports and contracts against ASVS 5.0.0. The project page and the releases list name 5.0.0 as the latest stable release.
- Treat ASVS 4.0.3 material as input to an upgrade. Keep 4.0.3 ids only when quoting an existing report, always with the `v4.0.3-` prefix.
- Read the bleeding edge only to see what is coming. Its posture is **track**: do not cite it as a release, and do not use its text where it differs from 5.0.0.

## What changed

### ASVS bleeding edge

The `latest` GitHub release is regenerated from `master` and is "for testing and preview purposes only"; production use should refer to the stable 5.0.0 release (releases, `latest` release notes). Diffing `5.0/en` between `v5.0.0_release` and `master` on 2026-10-05 shows:

- No requirement text in V1 to V17 changed. Only the chapter introductions of V3, V9 and V12 were reworded.
- Front matter: "Forking the ASVS" moved under "Flexibility with the ASVS", typo fixes in "What is the ASVS?" and "Assessment and Certification", and new project leads in the Frontispiece.
- Appendix C: the cross-reference for CCM-8 now points to `11.2.3` (it said `6.2.9`, a 4.0 id), the post-quantum paragraph was rewritten, and the password-based key derivation table no longer lists the argon2id `t ≥ 3` parameter row (the password storage table still has it).
- The mapping files in `5.0/mappings` are maintained on `master` and are "not tied to release versioning" (5.0.0 Changes Compared to v4.x, Introduction).

### ASVS 5.0.0

From the 5.0.0 "Changes Compared to v4.x" chapter:

- Of the 286 requirement ids in 4.0.3, 11 are unchanged and 15 only had grammar fixes; 109 (38%) are no longer separate requirements (50 deleted, 28 removed as duplicates, 31 merged). The rest were revised, and even unchanged ones have new ids (Introduction).
- Requirements state security goals, not mechanisms, and name a mechanism only when it is the sole practical solution (Requirement Philosophy).
- Documented security decisions replace the policy and threat-modeling requirements of 4.0 (Documented Security Decisions).
- New chapters: V10 OAuth and OIDC and V17 WebRTC (new content); V9 Self-contained Tokens, V3 Web Frontend Security and V15 Secure Coding and Architecture (restructured). Input validation moved next to business logic in V2. The 4.0 V1 Architecture chapter was removed and redistributed (Structural Changes and New Chapters).
- Direct CWE and NIST SP 800-63 mappings were removed from the body (Removal of Direct Mappings to Other Standards).
- Levels were redefined by risk reduction and effort, not black-box testability; L1 shrank from 128 of 278 requirements (46%) to 70 of 345 (20%); levels are a number, not tick marks (Rethinking Level Definitions).

### ASVS 4.0.3

- Three cumulative levels shown as tick marks: L1 for low assurance and "completely penetration testable", L2 for applications with sensitive data and recommended for most apps, L3 for the most critical applications (4.0.3 Using the ASVS, Application Security Verification Levels).
- 14 chapters, V1 Architecture, Design and Threat Modeling to V14 Configuration, with CWE and NIST columns. The 4.0.3 JSON lists 286 ids, 8 of which are deleted placeholders, leaving 278 active requirements.
- The same versioned citation format, `v4.0.3-1.11.3` (4.0.3 Using the ASVS, How to Reference ASVS Requirements).

## Upgrading

### 4.0.3 to 5.0.0

1. Change the version marker: replace every `v4.0.3-` id with its 5.0.0 target from `mapping_v4.0.3_to_v5.0.0.yml`, and write the result as `v5.0.0-<id>`. Never keep a bare id; the same digits mean a different requirement.
2. Replace removed or renamed requirements: follow the mapping outcome for each id (moved, modified, split, merged, covered by, deleted), and add the 5.0.0 requirements marked `ADDED` in `mapping_v5.0.0_to_v4.0.3.yml` that apply to the application at the target level.
3. Re-level: the target level name may stay the same, but its contents changed. Rebuild the list from the 5.0.0 JSON `L` field rather than translating 4.0.3 tick marks.
4. Write the documented security decisions that 5.0.0 requires for the in-scope chapters.
5. Validate against the target: re-verify every requirement, including ones that only moved; a major release requires re-evaluation of compliance (5.0.0 What is the ASVS?, Release strategy).
6. Keep behaviour unchanged: controls that met a 4.0.3 requirement now deleted as out of scope may stay in place; record them outside the ASVS list.

The full procedure, chapter correspondence and mapping statistics are in [`upgrade-from-4.md`](upgrade-from-4.md).

## Preview: ASVS bleeding edge

The bleeding edge is the `master` branch, published as the GitHub release tagged `latest`. Posture: **track**. As of 2026-10-05 it carries the same 345 requirements and ids as 5.0.0, with editorial and Appendix C changes only, so there is nothing new to build. Do not cite `latest` or `master` as a version, and do not prefer its Appendix C tables over 5.0.0 in a 5.0.0 verification. Watch the releases list for a 5.0.1 (patch: removals or relaxations only) or 5.1.0 (minor: additions and removals, same numbering). When one ships: add it as current, make 5.0.0 supported or legacy depending on whether a patch or minor release, and add an upgrade section.
