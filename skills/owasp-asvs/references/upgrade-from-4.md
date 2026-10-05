# Upgrading from ASVS 4.0.3

Read this when you have a 4.0.3 requirement list, verification report, policy or tool and need to move it to ASVS 5.0.0. Sources: the 4.0.3 markdown and JSON, the 5.0.0 "Changes Compared to v4.x" chapter, and the mapping files in `5.0/mappings`, listed in [Sources](../SKILL.md#sources).

## What 4.0.3 looked like

- Three cumulative levels shown as tick marks in L1, L2 and L3 columns. L1 was for low assurance and "completely penetration testable"; L2 for applications with sensitive data, recommended for most apps; L3 for the most critical applications (4.0.3 Using the ASVS, Application Security Verification Levels).
- 14 chapters with CWE and NIST SP 800-63 columns.
- 286 ids in the 4.0.3 JSON, of which 8 are deleted placeholders (`1.4.2`, `1.4.3`, `1.12.1`, `4.1.4`, `7.3.2`, `13.1.2`, `13.2.4`, `14.3.1`), leaving 278 active requirements; 128 were L1.
- Citation format `v4.0.3-<chapter>.<section>.<requirement>` with a lowercase `v` (4.0.3 Using the ASVS, How to Reference ASVS Requirements).

## Where the 4.0.3 chapters went

Derived from `mapping_v4.0.3_to_v5.0.0.yml` (targets of moved, modified, split and merged requirements; "deleted" counts all deletion reasons).

| 4.0.3 chapter                               | Active | Deleted | Main 5.0.0 destinations                                                            |
| ------------------------------------------- | ------ | ------- | ---------------------------------------------------------------------------------- |
| V1 Architecture, Design and Threat Modeling | 39     | 24      | Spread over V13, V15, V2, V11, V14, V6, V1, V16, V3; the chapter is gone.          |
| V2 Authentication                           | 57     | 21      | V6 Authentication; credential storage to V11; service authentication to V13.       |
| V3 Session Management                       | 20     | 5       | V7 Session Management; cookie rules to V3; token-based sessions to V7, V9 and V10. |
| V4 Access Control                           | 9      | 1       | V8 Authorization; some to V13 and V3.                                              |
| V5 Validation, Sanitization and Encoding    | 30     | 6       | V1 Encoding and Sanitization; input validation to V2.                              |
| V6 Stored Cryptography                      | 16     | 5       | V11 Cryptography; data classification to V14; secrets to V13.                      |
| V7 Error Handling and Logging               | 12     | 2       | V16 Security Logging and Error Handling.                                           |
| V8 Data Protection                          | 17     | 11      | V14 Data Protection.                                                               |
| V9 Communication                            | 8      | 1       | V12 Secure Communication.                                                          |
| V10 Malicious Code                          | 10     | 9       | Almost all deleted; one to V15.                                                    |
| V11 Business Logic                          | 8      | 3       | V2 Validation and Business Logic.                                                  |
| V12 Files and Resources                     | 15     | 4       | V5 File Handling; SSRF protection to V13.                                          |
| V13 API and Web Service                     | 13     | 8       | V4 API and Web Service, V3.                                                        |
| V14 Configuration                           | 24     | 9       | HTTP security headers to V3; dependencies to V15; leakage to V13.                  |

New in 5.0.0 with no 4.0.3 chapter: V9 Self-contained Tokens, V10 OAuth and OIDC, V17 WebRTC, and the V3 and V15 regroupings (5.0.0 Changes Compared to v4.x, Structural Changes and New Chapters).

## The mapping files

`5.0/mappings` on `master` holds (mappings README):

- `mapping_v4.0.3_to_v5.0.0.yml`: one entry per active 4.0.3 requirement, keyed `v4.0.3-<id>`, with a `tag-v5.0.0` outcome.
- `mapping_v5.0.0_to_v4.0.3.yml`: one entry per 5.0.0 requirement, keyed `v5.0.0-<id>`, with a `tag-v4.0.3` origin; 189 of the 345 are `ADDED`.
- Intermediate files through `v5.0.be`, the development numbering that kept 4.0 ids before renumbering. Ignore them unless you meet a `v5.0.be-` id.
- `nist.md` and `v5.0.be_cwe_mapping.json`: the NIST SP 800-63B and CWE mappings exported before they were removed.

The mappings "are not tied to release versioning and may be updated or clarified as needed" (Changes Compared to v4.x, Introduction), so re-fetch them rather than trusting a copy.

Outcomes in `mapping_v4.0.3_to_v5.0.0.yml` (278 entries; 109 deleted):

| Outcome                        | Meaning for the upgrade                           | Example                                             |
| ------------------------------ | ------------------------------------------------- | --------------------------------------------------- |
| `MOVED TO <id>`                | Same requirement, new id.                         | `v4.0.3-14.4.5` to `v5.0.0-3.4.1` (HSTS)            |
| `GRAMMAR, MOVED TO <id>`       | Wording only, new id.                             | `v4.0.3-1.6.1` to `v5.0.0-11.1.1`                   |
| `MODIFIED, MOVED TO <id>`      | Requirement changed; re-read and re-verify.       | `v4.0.3-2.1.1` to `v5.0.0-6.2.1` (password length)  |
| `SPLIT TO <id>, <id>`          | One requirement became several.                   | `v4.0.3-14.2.1` to `v5.0.0-15.1.1`, `v5.0.0-15.2.1` |
| `DELETED, MERGED TO <id>`      | Folded into another requirement (31).             | `v4.0.3-1.2.2` into `v5.0.0-13.2.1`                 |
| `DELETED, COVERED BY <id>`     | A duplicate of another requirement (27).          | `v4.0.3-1.4.1` covered by `v5.0.0-8.3.1`            |
| `DELETED, NOT IN SCOPE`        | Outside the 5.0 scope (27).                       | `v4.0.3-1.1.1` (secure SDLC)                        |
| `DELETED, INSUFFICIENT IMPACT` | Judged to have insufficient security impact (11). | `v4.0.3-1.1.6`                                      |
| `DELETED, NOT PRACTICAL`       | Judged not practical (7).                         | `v4.0.3-8.3.6`                                      |
| `DELETED, INCORRECT`           | Wrong as written (5).                             | `v4.0.3-2.4.2`, `v4.0.3-5.5.1`                      |
| `DELETED, DEPRECATED BY <id>`  | Replaced by a newer approach (1).                 | `v4.0.3-3.4.5` by `v5.0.0-3.5.4`                    |

The chapter "Changes Compared to v4.x" summarizes the 109 removals as 50 deleted, 28 duplicates and 31 merged.

## Procedure

1. **Freeze the input.** Record that the input is 4.0.3 and which level it targeted. Convert any bare ids to `v4.0.3-` ids.
2. **Translate ids.** Look up each `v4.0.3-` id in `mapping_v4.0.3_to_v5.0.0.yml` and record the outcome. For moved, modified and split entries write the `v5.0.0-` targets; for deleted entries keep the reason.
3. **Rebuild the level.** Do not carry tick marks across. Filter the 5.0.0 flat JSON by the target level and the application profile (see [`levels-and-usage.md`](levels-and-usage.md)). The same level name now has different contents: 5.0 L1 is about first-layer defenses and no longer tied to black-box testability (Changes Compared to v4.x, Rethinking Level Definitions).
4. **Add what is new.** Requirements in the rebuilt list that are not targets of any 4.0.3 id are new work, typically documentation requirements (`x.1` sections), V9, V10 and V17.
5. **Write documented security decisions.** 5.0.0 turns 4.0 policy and threat-modeling expectations into explicit documentation requirements (Changes Compared to v4.x, Documented Security Decisions).
6. **Re-verify.** A major release requires re-evaluation of compliance (What is the ASVS?, Release strategy). A 4.0.3 pass is evidence to reuse, not a 5.0.0 result, especially for `MODIFIED` and `SPLIT` entries.
7. **Handle external mappings.** If a 4.0.3 list relied on its CWE or NIST columns, 5.0.0 no longer provides them; use the exported files in `5.0/mappings` only as historical reference, or the dedicated standard (Changes Compared to v4.x, Removal of Direct Mappings to Other Standards).
8. **Report.** State `ASVS 5.0.0`, the level, the included ids, and a translation table from the old ids so readers of the 4.0.3 report can follow.
