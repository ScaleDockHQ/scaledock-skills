# Credentials and formats

Read this when choosing a format, attestation type or revocation method for a PID or attestation, or when reviewing unlinkability and pseudonyms. Sources: ARF 3.0.0 chapters 4, 5, 6 and 7 and Annex 2 Topics 3, 7, 10, 11 and 12; see [Sources](../SKILL.md#sources). The PID Rulebook itself lives in the separate attestation rulebooks repository and was not read for this skill; only the Annex 2 PID rules are summarised here.

## Attestation categories (§ 5.2)

The Regulation distinguishes four legal categories. The difference is legal, not technical: all of them use one of the formats below (§ 5.2.1).

- **PID**: data issued under Union or national law that establishes the identity of a natural or legal person, or of a natural person representing another. A valid PID moves a Wallet Unit to the Valid state; a Wallet Unit can hold several PIDs, all for the same User (§ 5.2.2).
- **QEAA**: issued by a QTSP and meets Annex V of the Regulation (§ 5.2.3).
- **PuB-EAA**: issued by, or on behalf of, a public sector body responsible for an authentic source, under Article 45f and Annex VII (§ 5.2.4).
- **Non-qualified EAA**: any other EAA (§ 5.2.5).

**Logical versus technical** (§ 5.3): a logical PID or attestation is what the User sees; it is backed by several technical PIDs or attestations, in parallel or over time, each with a short technical validity period. The ARF means _technical_ unless it says otherwise.

## Formats (§ 5.4)

| Feature        | ISO/IEC 18013-5 / ISO/IEC 23220-2 (mdoc) | SD-JWT VC                          | W3C VCDM 2.0                      |
| -------------- | ---------------------------------------- | ---------------------------------- | --------------------------------- |
| Encoding       | CBOR                                     | JSON (selectively disclosable JWT) | JSON-LD                           |
| Proof          | Embedded salted hashes                   | Embedded salted hashes             | Detached or embedded              |
| Device binding | Mandatory in the standard                | Optional in the standard           | Defined by the securing mechanism |
| Proximity      | Yes (§ 5.7.2)                            | No                                 | No                                |
| Remote         | ISO/IEC 18013-7 or OpenID4VP with HAIP   | OpenID4VP with HAIP                | As the Rulebook defines           |
| Wallet support | Mandatory                                | Mandatory                          | Optional                          |

- Wallet Solutions support both mdoc and SD-JWT VC, with the changes in Annex 2 and ETSI TS 119 472-1 (`ISSU_02`).
- SD-JWT VC needs the HAIP profile for interoperability (§ 5.4.3); Rulebooks for SD-JWT VC attestations require the "IETF SD-JWT VC Profile" in HAIP Section 6.1 (`ARB_01b`).
- QEAAs and PuB-EAAs use mdoc and/or SD-JWT VC (`ARB_01`); non-qualified EAAs may also use W3C VCDM 2.0 (`ARB_01a`), in which case the Rulebook references how to request and present it (`ARB_04`).
- An attestation that must work offline in proximity is issued as mdoc (`ARB_02`).

## PID rules (Annex 2 Topic 3)

- PIDs follow the PID Rulebook (`PID_01`) and are issued in both formats (`PID_02`).
- **mdoc**: attestation type and namespace `eu.europa.ec.eudi.pid.1` (`PID_04`, `PID_05`); extra attributes go in a domestic namespace published in an Attestation Rulebook (`PID_06`, `PID_07`); CBOR per RFC 8949 (`PID_10`); at most one attribute per identifier (`PID_11`); all values valid at the MSO `validFrom` (`PID_12`).
- **SD-JWT VC**: `vct` is a URN in the `urn:eudi:pid:` namespace, `urn:eudi:pid:1` or a domestic type that extends it (`PID_14`); every claim, nested property and array entry is individually selectively disclosable, except those SD-JWT VC defines as non-selectively disclosable (`PID_21`); values valid at `nbf` if present (`PID_19`).
- The CIR 2024/2977 attributes and metadata are issuer-signed in both formats (`PID_08`, `PID_17`).
- The User may opt out of the `portrait`, which is then an empty string or `bstr` (`PID_03`); a Relying Party does not retain a portrait unless the law allows it (`PID_03a`).
- PIDs are always device-bound to the WSCA/WSCD (`ISSU_17`).

## Attestation Rulebooks (§ 5.5; Topic 12)

- A Rulebook sets a unique attestation type (`ARB_05`), defines every attribute in an encoding-independent way and then per format (`ARB_06`), with mdoc namespaces (`ARB_06a`) and SD-JWT VC claim names that are IANA-registered, public or private names (`ARB_06b`).
- It states presence per attribute (`ARB_09`), selective disclosability per SD-JWT VC claim (`ARB_30`), and whether the attestation is device-bound (`ARB_34`).
- Schemes registered in the catalogue under CIR 2025/1569 Article 8 reference their Rulebook (`ARB_33`).

## Device binding (§ 6.6.3.8)

Device binding is mandatory for PIDs and for every ISO/IEC 18013-5 attestation, and recommended for other attestations (`ISSU_17`, `ISSU_27`; changed to a recommendation in 2.6.0). A device-bound attestation is bound to a WSCA/WSCD or a keystore (`ISSU_27`), and the Provider binds it to a public key from the KA (`WUA_09a`).

## Revocation (§ 6.6.3.7; Topic 7)

| Credential                   | Allowed methods                                                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mdoc PID, QEAA, PuB-EAA      | Short-lived (24 hours or less), Attestation Status List, or Attestation Revocation List (`VCR_01`), per Annex 2 of the amended CIR 2024/2979 (`VCR_11`) |
| SD-JWT VC PID, QEAA, PuB-EAA | Short-lived (24 hours or less), or Attestation Status List (`VCR_01b`) per Token Status List (`VCR_11a`)                                                |
| Non-qualified EAA            | The Rulebook decides whether it is revocable and how (`VCR_02`)                                                                                         |
| WIA, KA                      | The method in Technical Specification 3 (`VCR_01a`)                                                                                                     |

- Only the issuing Provider revokes (`VCR_03`, `VCR_03a`); revocation is never reversed (`VCR_04`); every revocable credential has a revocation policy (`VCR_05`).
- PID Providers revoke on compromise, on the User's request, on the User's death, and when the Wallet Unit is revoked (`VCR_06`, `VCR_07a`, `VCR_07c`, `VCR_08`); also when an attribute value in the logical PID changes (`VCR_09`).
- Status list indices are random (`VCR_17`); each list covers enough credentials for herd privacy (`VCR_18`); downloading a list needs no authentication (`VCR_16`).
- Wallet Solutions implement both list mechanisms (`VCR_10`). A Relying Party that checks revocation supports both (`VCR_12`), should check on receipt (`VCR_13`), otherwise runs a risk analysis (`VCR_14`), and should cache lists rather than fetch per presentation (`VCR_15`).

## Unlinkability (§ 7.4.3.5)

The Regulation requires a framework that stops attestation providers and others tracking or correlating Users after issuance, and enables techniques that ensure unlinkability where identification is not needed (Art. 5a(16)).

- **Relying Party linkability**: Relying Parties, colluding or breached, compare fixed values such as hashes, salts, public keys and signatures. **Attestation Provider linkability**: Relying Parties share those values with the issuer (§ 7.4.3.5.1).
- Unique elements (salts, hashes, revocation index, device key, signature) differ across all credentials a Provider issues (`ISSU_35`); Relying Party Instances discard them, and timestamps, once not needed (`OIA_16`). Batch timestamps do not reveal a batch (`ISSU_36`).
- Methods for re-use of a technical PID or attestation (§ 7.4.3.5.2; `ISSU_37`–`ISSU_57`):

| Method | Name              | Behaviour                                                                                      | Support               |
| ------ | ----------------- | ---------------------------------------------------------------------------------------------- | --------------------- |
| A      | Once-only         | Batch issuance; each technical credential presented once; falls back to B when out and offline | Mandatory for wallets |
| B      | Limited-time      | One technical credential, presented repeatedly, re-issued before expiry                        | Mandatory for wallets |
| C      | Rotating-batch    | Batch presented in random order, then reset                                                    | Optional              |
| D      | Per-Relying Party | A different technical credential per Relying Party, the same one for repeat visits             | Optional              |

- Providers set the method in `credential_reuse_policy` (ETSI TS 119 472-3 § 4.2.4.2) in their Credential Issuer metadata and must require A or B, optionally preferring C or D (`ISSU_39`, `ISSU_40`); Wallet Units honour it (`ISSU_39a`). Users should not notice the method or need to act for re-issuance (`ISSU_41`, `ISSU_42`).
- Zero-knowledge proofs are discussed in Topic 53 and Technical Specifications 4, 13 and 14; this skill does not cover them.

## Pseudonyms (§ 4.7; Topic 11)

- The Regulation requires wallets to let Users generate pseudonyms and store them encrypted and locally (Art. 5a(4)(b)); Relying Parties must not refuse pseudonyms where identification is not legally required (Art. 5b(9)).
- Types: **verifiable** (proof of possession; passkeys per W3C WebAuthn, § 4.7.2), **attested** (an attestation carrying pseudonym values, defined in a Rulebook, § 4.7.3), and **scope rate-limited** (at most a set number per scope; no protocol specified yet, § 4.7.4).
- A Wallet Unit never shows the same pseudonym to different Relying Parties unless the User chooses to (`PA_16`); pseudonyms reveal no identity and cannot be correlated by value or metadata (`PA_15`, `PA_17`); keys live in a WSCA/WSCD or keystore (`PA_14`); the User can view and delete pseudonyms (`PA_07`, `PA_09`).
- Wallet Providers may support the HLRs by acting as a WebAuthn authenticator (`PA_22`); the Commission is to provide a WebAuthn profile (`PA_21`).
