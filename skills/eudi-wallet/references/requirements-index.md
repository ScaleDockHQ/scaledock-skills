# High-Level Requirements index

Read this when tracing a component to ARF Annex 2, looking up an HLR by identifier, or listing the HLRs a role must meet. Sources: ARF 3.0.0 Annex 2.01 and `hltr/high-level-requirements.csv` at v3.0.0; see [Sources](../SKILL.md#sources). Always read the exact text in the CSV: this file lists identifiers, not the requirements themselves.

## How Annex 2 is organised (Annex 2.01)

- Since 2.7.0 every HLR is a row in `hltr/high-level-requirements.csv`. `annex-2.02-high-level-requirements-by-topic.md` and `annex-2.03-high-level-requirements-by-category.md` are generated from it; **the CSV takes precedence** when they differ.
- The CSV is semicolon-separated, with the columns `Harmonized_ID;Part;Category;Topic;Topic_Number;Topic_Title;Subsection;Index;Requirement_specification;Notes`.
- `Index` is the topic-based identifier, such as `OIA_08g`, used throughout the ARF and this skill.
- `Harmonized_ID` is `PART-CATEGORY-TOPIC-ID`, such as `AS-WP-06-001`:
  - PART: `AS` (actor-specific) or `EW` (ecosystem-wide).
  - CATEGORY: `WP` Wallet Providers, `MS` Member States and Registrars, `AP` Attestation and PID Providers, `RP` Relying Parties, `PIO` Protocols and Interoperability, `DM` Data Models and Attestation Rules.
  - TOPIC: the topic number; ID: a three-digit sequence.
- v3.0.0 has 725 rows: 297 Wallet Providers, 161 Attestation and PID Providers, 116 Data Models, 90 Member States and Registrars, 39 Protocols, 22 Relying Parties. 103 rows have `Empty` as their specification and carry no requirement.
- Requirements use SHALL, SHOULD and MAY, and each names the actor that must comply.

To list the HLRs for one role, filter the CSV by `Category`, then add the ecosystem-wide (`EW`) rows whose text names that role. Skip `Empty` rows.

## Topics and identifier prefixes (v3.0.0)

| Topic | Title (short)                                                       | Prefix                                                           |
| ----- | ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 1     | Accessing online services with a Wallet Unit                        | `OIA_`                                                           |
| 3     | PID Rulebook                                                        | `PID_`                                                           |
| 4     | mDL Rulebook                                                        | `mDL_`                                                           |
| 6     | Relying Party authentication and User approval                      | `RPA_`                                                           |
| 7     | Attestation revocation and revocation checking                      | `VCR_`                                                           |
| 9     | Wallet Unit Attestation (WIA and KA)                                | `WUA_`                                                           |
| 10    | Issuing a PID or attestation                                        | `ISSU_`                                                          |
| 11    | Pseudonyms                                                          | `PA_`                                                            |
| 12    | Attestation Rulebooks                                               | `ARB_`                                                           |
| 16    | Signing documents with a Wallet Unit                                | `QES_`                                                           |
| 18    | Combined presentations of attributes                                | `ACP_`                                                           |
| 19    | Dashboard logs for transparency                                     | `DASH_`                                                          |
| 20    | Strong User authentication for electronic payments                  | `SUA_`                                                           |
| 24    | User identification in proximity scenarios                          | `ProxId_`                                                        |
| 25    | Catalogue of attributes                                             | `CAT_`                                                           |
| 27    | Registration of providers and Relying Parties                       | `Reg_`                                                           |
| 28    | Wallet Unit for legal persons                                       | `LP_`                                                            |
| 29    | Representation paradigm                                             | `RP_`                                                            |
| 30    | Interaction between Wallet Units                                    | `W2W_`                                                           |
| 31    | Notification and publication of trusted entities                    | `GenNot_`, `PPNot_`, `PuBPNot_`, `RPACANot_`, `TLPub_`, `WPNot_` |
| 34    | Migrate to a different Wallet Solution                              | `Mig_`                                                           |
| 38    | Wallet Unit revocation                                              | `WURevocation_`                                                  |
| 40    | Wallet Instance installation, Wallet Unit activation and management | `WIAM_`                                                          |
| 42    | QTSPs accessing authentic sources                                   | `QTSPAS_`                                                        |
| 43    | Embedded disclosure policies                                        | `EDP_`                                                           |
| 44    | Registration certificates                                           | `RPRC_`                                                          |
| 48    | Requesting data deletion from Relying Parties                       | `DATA_DLT_`                                                      |
| 50    | Reporting unlawful or suspicious requests                           | `RPT_DPA_`                                                       |
| 51    | PID or attestation deletion                                         | `PAD_`                                                           |
| 52    | Relying Party intermediaries                                        | `RPI_`                                                           |
| 53    | Zero-knowledge proofs                                               | `ZKP_`                                                           |
| 54    | Accessibility                                                       | `ACC_`                                                           |
| 55    | Certificate Transparency                                            | `CT_`                                                            |
| 56    | Wallet Provider support and maintenance                             | `WPSM_`                                                          |

Topic numbers are not contiguous: topics without HLRs were dropped in 2.7.0 (Annex 2.01).

## Starting points per role

These are the HLRs this skill's other references rely on. They are a starting point, not the full set; filter the CSV for completeness.

- **Wallet Provider / Wallet Unit**: formats and protocols `ISSU_01`, `ISSU_02`, `ISSU_03`, `OIA_01`, `OIA_01a`, `OIA_03b`–`OIA_03d`, `OIA_08`–`OIA_08g`, `OIA_09`; Relying Party authentication and approval `RPA_01`–`RPA_08`, `RPA_10`, `RPA_11`, `RPRC_17`, `RPRC_17a`, `RPRC_21`, `EDP_02`–`EDP_10`; issuance checks `ISSU_11`, `ISSU_23`, `ISSU_23c`, `ISSU_24`–`ISSU_24b`, `ISSU_34`; privacy `ISSU_37`, `ISSU_39a`, `PA_14`–`PA_19`; WIA and KA `WUA_03`, `WUA_05`, `WUA_07`, `WUA_09`, `WUA_10a`, `WUA_16a`, `WUA_22`, `WUA_24`; revocation `VCR_10`, `WURevocation_07`–`WURevocation_16`; Topics 19, 40, 54 and 56.
- **PID Provider**: `PID_01`–`PID_21`, `ISSU_01a`, `ISSU_05`, `ISSU_17`, `ISSU_21`, `ISSU_22`, `ISSU_35`, `ISSU_36`, `ISSU_38`–`ISSU_40`, `WUA_09a`, `WUA_11a`, `WUA_12`, `VCR_01`, `VCR_01b`, `VCR_06`–`VCR_09`, `VCR_11`, `VCR_11a`, `VCR_16`–`VCR_18`, `WURevocation_18`.
- **Attestation Provider**: `ISSU_01a`, `ISSU_27`, `ISSU_27d`, `ISSU_30`, `ISSU_30a`, `ISSU_32`, `ISSU_35`, `ISSU_38`–`ISSU_40`, `WUA_10a`, `WUA_11a`, `EDP_09`, `EDP_11`, `VCR_01`–`VCR_03`, `VCR_11`, `VCR_11a`, `VCR_17`, `VCR_18`, `WURevocation_19`; and, as a Scheme Provider, `ARB_01`–`ARB_09`, `ARB_30`, `ARB_33`, `ARB_34`.
- **Relying Party**: `RPA_01`–`RPA_03`, `RPRC_19`, `OIA_08d`, `OIA_12`–`OIA_17`, `VCR_12`–`VCR_15`, `PID_03a`; Topic 27 for registration; `RPI_01`–`RPI_08` for intermediaries.
