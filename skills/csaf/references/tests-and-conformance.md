# Tests and conformance

Read this when validating a CSAF document, building a validator, or claiming conformance for a tool. Section numbers are CSAF 2.0 (OASIS Standard) unless marked 2.1. Each test in section 6 has a description, the paths it covers, and failing examples; the TC repository holds test data for validators under `csaf_2.0/test`.

## Three test levels

The schema cannot express every rule, so section 6 adds tests (§2.1, §6):

| Level       | Section | Rule                                                                                                                            | Report as   |
| ----------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Mandatory   | §6.1    | MUST NOT fail on a valid CSAF document.                                                                                         | error       |
| Optional    | §6.2    | SHOULD NOT fail without a good reason; failing does not make the document invalid. May flag features expected to be deprecated. | warning     |
| Informative | §6.3    | MAY fail; points to common mistakes and bad practice for the issuer to judge.                                                   | information |

A CSAF document conforms only if it follows section 3, satisfies at least one profile, and fails no mandatory test (§9.1.1).

## Mandatory tests (§6.1)

| Test   | Name                                                                                    |
| ------ | --------------------------------------------------------------------------------------- |
| 6.1.1  | Missing Definition of Product ID                                                        |
| 6.1.2  | Multiple Definition of Product ID                                                       |
| 6.1.3  | Circular Definition of Product ID                                                       |
| 6.1.4  | Missing Definition of Product Group ID                                                  |
| 6.1.5  | Multiple Definition of Product Group ID                                                 |
| 6.1.6  | Contradicting Product Status                                                            |
| 6.1.7  | Multiple Scores with same Version per Product                                           |
| 6.1.8  | Invalid CVSS (against the FIRST JSON schema)                                            |
| 6.1.9  | Invalid CVSS computation                                                                |
| 6.1.10 | Inconsistent CVSS (properties disagree with the vector)                                 |
| 6.1.11 | CWE (exists and is valid)                                                               |
| 6.1.12 | Language                                                                                |
| 6.1.13 | PURL                                                                                    |
| 6.1.14 | Sorted Revision History                                                                 |
| 6.1.15 | Translator (`source_lang` present when `publisher.category` is `translator`)            |
| 6.1.16 | Latest Document Version                                                                 |
| 6.1.17 | Document Status Draft (a `0`, `0.y.z` or pre-release version needs `draft`)             |
| 6.1.18 | Released Revision History                                                               |
| 6.1.19 | Revision History Entries for Pre-release Versions                                       |
| 6.1.20 | Non-draft Document Version                                                              |
| 6.1.21 | Missing Item in Revision History                                                        |
| 6.1.22 | Multiple Definition in Revision History                                                 |
| 6.1.23 | Multiple Use of Same CVE                                                                |
| 6.1.24 | Multiple Definition in Involvements                                                     |
| 6.1.25 | Multiple Use of Same Hash Algorithm                                                     |
| 6.1.26 | Prohibited Document Category Name                                                       |
| 6.1.27 | Profile Tests (6.1.27.1 to 6.1.27.11; see [`profiles-and-vex.md`](profiles-and-vex.md)) |
| 6.1.28 | Translation (`lang` differs from `source_lang`)                                         |
| 6.1.29 | Remediation without Product Reference                                                   |
| 6.1.30 | Mixed Integer and Semantic Versioning                                                   |
| 6.1.31 | Version Range in Product Version                                                        |
| 6.1.32 | Flag without Product Reference                                                          |
| 6.1.33 | Multiple Flags with VEX Justification Codes per Product                                 |

Profile tests SHOULD be skipped when the category does not match the one the test names, and a tool MAY group them into one virtual test per profile (§6.1.27).

## Optional tests (§6.2)

6.2.1 Unused Definition of Product ID; 6.2.2 Missing Remediation; 6.2.3 Missing Score; 6.2.4 Build Metadata in Revision History; 6.2.5 Older Initial Release Date than Revision History; 6.2.6 Older Current Release Date than Revision History; 6.2.7 Missing Date in Involvements; 6.2.8 Use of MD5 as the only Hash Algorithm; 6.2.9 Use of SHA-1 as the only Hash Algorithm; 6.2.10 Missing TLP label; 6.2.11 Missing Canonical URL; 6.2.12 Missing Document Language; 6.2.13 Sorting; 6.2.14 Use of Private Language; 6.2.15 Use of Default Language; 6.2.16 Missing Product Identification Helper; 6.2.17 CVE in field IDs; 6.2.18 Product Version Range without vers; 6.2.19 CVSS for Fixed Products; 6.2.20 Additional Properties.

## Informative tests (§6.3)

6.3.1 Use of CVSS v2 as the only Scoring System; 6.3.2 Use of CVSS v3.0; 6.3.3 Missing CVE; 6.3.4 Missing CWE; 6.3.5 Use of Short Hash; 6.3.6 Use of non-self referencing URLs Failing to Resolve; 6.3.7 Use of self referencing URLs Failing to Resolve; 6.3.8 Spell check; 6.3.9 Branch Categories; 6.3.10 Usage of Product Version Range; 6.3.11 Usage of V as Version Indicator.

## Conformance targets (§9.1)

CSAF 2.0 defines 17 targets. Each tool satisfies its clause and the clauses it builds on.

| Target                         | Clause  | Builds on          | Key requirements                                                                                                                                                                 |
| ------------------------------ | ------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSAF document                  | §9.1.1  |                    | Section 3 syntax and semantics, at least one profile, no failed mandatory test.                                                                                                  |
| CSAF producer                  | §9.1.2  |                    | Emits CSAF documents; meets the producer rules in sections 3 and 8.                                                                                                              |
| CSAF direct producer           | §9.1.3  | producer           | An analysis tool that emits CSAF; does not emit converter-only content.                                                                                                          |
| CSAF converter                 | §9.1.4  | producer           | Transforms an analysis tool's native output; does not emit direct-producer-only content.                                                                                         |
| CVRF CSAF converter            | §9.1.5  | producer           | Takes only CVRF input and follows the conversion rules in [`versions.md`](versions.md).                                                                                          |
| CSAF content management system | §9.1.6  | producer, viewer   | Create, version, diff, review, approve and publish; prefill fields; suggest `interim` (default threshold 3 weeks) and `final` (6 weeks); roles from Registered to Administrator. |
| CSAF post-processor            | §9.1.7  | consumer, producer | Turns one CSAF document into another, for example by redacting.                                                                                                                  |
| CSAF modifier                  | §9.1.8  | post-processor     | New `tracking.id` (not the original as a prefix), and a reference to the original as the first `document.references` item.                                                       |
| CSAF translator                | §9.1.9  | post-processor     | New `tracking.id` (the original may be the prefix), `lang` set, `source_lang` set, `publisher.category` `translator`, the original as the first reference, original URLs kept.   |
| CSAF consumer                  | §9.1.10 |                    | Reads and interprets documents per section 3; meets the consumer rules in sections 3 and 8.                                                                                      |
| CSAF viewer                    | §9.1.11 | consumer           | Prefers the CVSS vector when it conflicts with other properties; for a product in several scores, prefers the highest base score, then the newest CVSS version.                  |
| CSAF management system         | §9.1.12 | viewer             | Add, list, delete, comment, mark read, search by document fields, CVE and product tree, sort by CVSS and aggregate severity, find the latest version, diff versions.             |
| CSAF asset matching system     | §9.1.13 | management system  | Matches documents to assets and products, tracks remediation state per asset, re-runs on new documents, new assets and major version changes.                                    |
| CSAF basic validator           | §9.1.14 |                    | Checks the JSON schema and every mandatory test; does not change the document. MAY run selected tests and apply quick fixes.                                                     |
| CSAF extended validator        | §9.1.15 | basic validator    | Also runs every optional test.                                                                                                                                                   |
| CSAF full validator            | §9.1.16 | extended validator | Also runs every informative test.                                                                                                                                                |
| CSAF SBOM matching system      | §9.1.17 | management system  | Matches documents to components in an SBOM database.                                                                                                                             |

## Building a validator

1. Parse as JSON; reject anything else.
2. Validate against `https://docs.oasis-open.org/csaf/csaf/v2.0/csaf_json_schema.json` (JSON Schema draft 2020-12). CVSS objects use the FIRST schemas for v2.0, v3.0 and v3.1 (§3.2.3.13).
3. Run the mandatory tests and report failures as errors; add optional tests as warnings (extended) and informative tests as information (full).
4. Run profile tests only for the matching `document.category` (§6.1.27).
5. Never modify the input; offer quick fixes separately (§9.1.14).
6. Check the CSAF 2.0 known issues list in the TC repository for tests whose prose is ambiguous, such as 6.1.1 and 6.1.4 missing the `flags` paths.

## CSAF 2.1 changes to tests (draft, track only)

CSAF 2.1 CSD03 renames optional tests to "Recommended tests", grows the sets to 62 mandatory, 55 recommended and 24 informative tests, and adds named presets: `mandatory`, `recommended`, `informative`, `schema`, `basic` (`schema` + `mandatory`), `extended` (`basic` + `recommended`), `full` (`extended` + `informative`), `additional`, and network-related presets. Non-standard presets use the `x_` or `org_<id>_` prefix (2.1 §6.4). It also adds conformance targets such as the CSAF 2.0 to CSAF 2.1 Converter, CSAF Library, CSAF Downloader, CSAF Withdrawer, CSAF Superseder and the extension targets (2.1 §9.1.18 to §9.1.36). Do not claim CSAF 2.1 conformance while it is a draft.
