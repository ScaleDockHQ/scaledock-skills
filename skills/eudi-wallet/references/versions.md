# Versions and upgrades

Read this when choosing which ARF release to build to, reading a component written against an older release, upgrading one, or checking what the main branch is changing. Sources: the ARF releases, the `CHANGELOG.md` on main, the HLR CSV at v3.0.0 and v2.9.0, the v1.10.0 Annex 2, and the main branch, listed in [Sources](../SKILL.md#sources). HLR differences below come from comparing the v2.9.0 and v3.0.0 CSV files by `Index`.

## Version lines

The ARF uses semantic versioning (`CHANGELOG.md`). It has one document line; only the latest Annex 2 holds the final requirements (§ 1.8).

| Id                 | Line            | Status  | Revision                                               | Posture | Summary                                                                                                    |
| ------------------ | --------------- | ------- | ------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------- |
| `arf-main-preview` | ARF main branch | preview | main at f5789a7 (2026-10-02)                           | track   | Work after 3.0.0: revision-round papers for Topics AA and E, a new Topic AB, one changed HLR (`ISSU_33b`). |
| `arf-3`            | ARF 3.0.0       | current | v3.0.0 (21 July 2026; release published 23 July)       |         | Aligned with the amending implementing acts; Relying Party Services; mandatory DC API; LoTEs; FCAF.        |
| `arf-2`            | ARF 2.9.0       | legacy  | v2.9.0 (release published 21 May 2026), 2.0.0 to 2.9.0 |         | CIR 2025/848 registration, CSV HLRs, keystores, WIA and KA split; DC API and registration certs optional.  |
| `arf-1`            | ARF 1.10.0      | legacy  | v1.10.0 (2 May 2025), 1.0.0 to 1.10.0                  |         | Up to the adopted implementing acts (1.5.0) and CIR 2025/848 (1.10.0); single Wallet Unit Attestation.     |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

No 2.x line is marked supported: the ARF says the final requirements are those in the latest version of Annex 2, and that integrated discussion papers are not updated and should not be relied on (§ 1.8). The ARF as a whole is informative; Regulation (EU) 2024/1183 and its implementing acts are binding (§ 1.3). A legacy ARF line is therefore only a record of what earlier implementations were built against.

## Which version to use

- Build and review against ARF 3.0.0 and its `hltr/high-level-requirements.csv`. Since 2.7.0 the CSV is the source of the HLRs; the Annex 2 markdown files are generated from it (`CHANGELOG.md`, 2.7.0).
- The 3.0.0 text aligns with the amending acts to CIR 2024/2977, 2024/2979, 2024/2980, 2024/2982 and 2025/848 (`CHANGELOG.md`, 3.0.0). Some 3.0.0 obligations have their own start date: Wallet Units verify registration certificates only from 24 months after the amended CIR 2024/2982 enters into force (§ 3.19).
- Read ARF 2.9.0 or ARF 1.10.0 only to understand an existing component and upgrade it.
- Follow ARF main branch only to see what is coming. Its posture is **track**: build nothing from it.

## What changed

### ARF main branch

Changes on main since v3.0.0, from `git diff v3.0.0 main`:

- A revision-round discussion paper for Topic AA (electronic payments SCA), a revision-round paper for Topic E (pseudonyms, still open), and a new Topic AB (digital signature).
- `ISSU_33b` now ties Wallet Unit support to the attestation schemes in the Commission's catalogue under Article 8 of CIR 2025/1569, where those attestations use a format and issuance protocol Wallet Units support. In 3.0.0 it said a Wallet Provider supports all Attestation Providers, except possibly a Strong User Authentication attestation.
- Chapter 1 and the references now note that CIR 2026/1730, 2026/1731 and 2026/1735 amend several of the cited implementing acts.

### ARF 3.0.0 (from 2.9.0)

From the release notes and the CSV comparison: 41 HLRs added, 195 changed, none removed.

- **Relying Party Services** (Topic X revision round, § 3.11.2, Topic 44). Access and registration certificates carry a Service identifier; each request includes exactly one registration certificate by value (`RPRC_19`), bound to the access certificate by the same RP identifier and Service identifier (`RPRC_17a`, new). In 2.9.0 `RPRC_19` applied only "if a Relying Party Instance received one or more registration certificates". Embedded disclosure policies list RP identifier and Service identifier pairs (`EDP_02`).
- **Remote transmission split and the DC API made mandatory.** 2.9.0 `OIA_01` required OpenID4VP and ISO/IEC 18013-5 in one rule, and `OIA_08` required the W3C Digital Credentials API only once it was a W3C Recommendation and broadly supported. In 3.0.0 `OIA_01` covers proximity, the new `OIA_01a` requires both the API-mediated (`OIA_08`–`OIA_08b`) and redirect-based (`OIA_03b`, `OIA_03c`) mechanisms, and `OIA_03d` makes ISO/IEC 18013-7 Annex A optional. New `OIA_08f` and `OIA_08g` cover cross-device DC API flows.
- **Trust lists.** Relying Parties support both Trusted Lists (ETSI TS 119 612) and LoTEs (ETSI TS 119 602) and refresh them regularly (`OIA_15a`, `OIA_15b`, new).
- **Revocation by format.** `VCR_01` (mdoc) and the new `VCR_01b` (SD-JWT VC) set the allowed methods; `VCR_11` points to Annex 2 of the amended CIR 2024/2979 for mdoc, and the new `VCR_11a` to Token Status List for SD-JWT VC.
- **Wallet-to-wallet** (Topic J revision round): new `W2W_23`–`W2W_25`.
- **Functional conformance**: new § 7.5, the Functional Conformance Assessment Framework.
- **Other additions**: `PID_03a`, `RPA_07b`, `RPA_07c`, `WUA_09a`, `ISSU_10a`, `ISSU_10b`, `ISSU_19b`, `ISSU_23c`, `ISSU_28a`, `ARB_24a`, `Reg_10b`–`Reg_10e`, `Reg_34`, `Reg_35`, `RPRC_01a`, `RPRC_01b`, `RPRC_02a`, `RPRC_07a`, `RPRC_22b`.

### ARF 2.x (2.0.0 to 2.9.0)

From `CHANGELOG.md`:

- 2.0.0: Relying Party registration aligned with CIR 2025/848; the W3C Digital Credentials API marked optional.
- 2.1.0: registration certificates and Registrar information made optional; every use of a WUA on the presentation interface removed.
- 2.2.0 to 2.4.0: data deletion requests, reporting to DPAs, data portability, representation, transactional data, wallet-to-wallet, combined presentations (Topics L, M, N, I, W, J, K, U, H).
- 2.5.0: PID and mDL Rulebooks moved from Annex 3 to the attestation rulebooks repository; new chapter 8 on accessibility.
- 2.6.0: device binding recommended instead of mandatory for attestations (Topic Z).
- 2.7.0: Annex 2 moved to a CSV file; the WSCA/WSCD and keystore distinction; Certificate Transparency for access certificates (Topic 55).
- 2.8.0: support and maintenance, SCA payments, pseudonyms and User-to-device authentication (Topics T, AA, E, R).
- 2.9.0: ENISA comments; synchronisation with Technical Specification 3; the Topic C revision round, which uses Wallet Instance Attestation (WIA) and Key Attestation (KA).

### ARF 1.x (1.0.0 to 1.10.0)

From `CHANGELOG.md`: 1.4.0 split the annexes into folders; 1.5.0 aligned with the adopted implementing acts for Articles 5a and 5c; 1.6.0 to 1.8.0 added Topics A, B, E, F, C, D, G and V (privacy risks, batch issuance, pseudonyms, DC API, wallet unit attestation, embedded disclosure policies, ZKP, PID Rulebook); 1.10.0 aligned with CIR 2025/848. Annex 2 was one markdown file and used a single Wallet Unit Attestation (WUA) concept.

## Upgrading

### ARF 2.9.0 to ARF 3.0.0

1. Diff the two CSV files by `Index` for the role's categories and topics; list added and changed HLRs.
2. Wallet Units: support both DC API mechanisms (`OIA_08`–`OIA_08b`) and both redirect mechanisms (`OIA_03b`, `OIA_03c`); add the cross-device proximity check (`OIA_08g`).
3. Relying Parties: register Services; carry the Service identifier in access and registration certificates; include one registration certificate by value in every request, proximity and remote (`RPRC_19`).
4. Wallet Units: check RP identifier and Service identifier equality between the two certificates (`RPRC_17a`); evaluate embedded disclosure policies against identifier pairs (`EDP_02`).
5. Verifiers and issuers: load trust anchors from both Trusted Lists and LoTEs and refresh them (`OIA_15a`, `OIA_15b`).
6. Issuers: pick the revocation method per format (`VCR_01`, `VCR_01b`, `VCR_11`, `VCR_11a`).
7. Re-run the Verify checklist in `SKILL.md`.

### ARF 1.10.0 to ARF 3.0.0

1. Replace the single WUA with a WIA plus a KA, presented only to PID and Attestation Providers (`WUA_07`, `WUA_24`); remove any WUA from presentation flows (2.1.0).
2. Separate WSCA/WSCD and keystore key storage; keep PID keys in a WSCA/WSCD (§ 4.3.2).
3. Take the PID Rulebook from the attestation rulebooks repository, not Annex 3 (2.5.0).
4. Revisit device binding for non-PID attestations: recommended, not mandatory (2.6.0; `ISSU_27`).
5. Move requirement tracing from the Annex 2 markdown to the CSV, which keeps the `Index` values and adds `Harmonized_ID` (2.7.0).
6. Then apply every step of the 2.9.0 to 3.0.0 path.

## Preview: ARF main branch

Posture: **track**. The main branch is where the next release is drafted; discussion papers there can still change, and the ARF says not to rely on them (§ 1.8). Re-read the main branch and `CHANGELOG.md` when refreshing this skill. When a new tag is released, compare its CSV with v3.0.0, add a line here, and move ARF 3.0.0 to legacy.
