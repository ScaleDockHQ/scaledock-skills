# vc-data-model

An agent skill for the W3C Verifiable Credentials Data Model 2.0 (Recommendation, May 2025) and its companion Recommendations: building, securing, verifying and validating verifiable credentials and presentations with VC JOSE COSE or VC Data Integrity, and publishing and checking Bitstring Status Lists, with upgrades from VC Data Model 1.1.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill vc-data-model
```

Then ask your agent to "issue a VC Data Model 2.0 credential secured as vc+jwt with a revocation status list" or "upgrade our credentials from VC Data Model 1.1 to 2.0".

## What it covers

- The data model: the `https://www.w3.org/ns/credentials/v2` context, `VerifiableCredential` and `VerifiablePresentation`, the enveloped forms, and every property from `issuer`, `validFrom` and `credentialSubject` to `credentialStatus`, `credentialSchema`, `relatedResource`, `refreshService`, `termsOfUse` and `evidence`.
- The `application/vc` and `application/vp` media types, and when an implementation needs JSON-LD processing and when type-specific processing of plain JSON is enough.
- Securing with VC JOSE COSE (`vc+jwt`, `vc+sd-jwt`, `vc+cose` and their presentation forms, key discovery) and with VC Data Integrity proofs and the `eddsa-rdfc-2022`, `eddsa-jcs-2022`, `ecdsa-rdfc-2019`, `ecdsa-jcs-2019`, `ecdsa-sd-2023` and `bbs-2023` cryptosuites.
- Bitstring Status List entries and list credentials for revocation, suspension, refresh and status messages, and the issuer and verifier algorithms.
- The verification algorithm, Problem Details error types, the validation checks a verifier applies afterwards, and the privacy and security considerations.

## Versions

| Line                        | Status                |
| --------------------------- | --------------------- |
| VC Data Model 2.0           | current               |
| VC JOSE COSE                | current               |
| VC Data Integrity 1.0       | current               |
| Bitstring Status List 1.0   | current               |
| VC Data Model 1.1           | legacy (upgrade from) |
| VC Data Model 2.1           | preview (track)       |
| VC Data Integrity 1.1       | preview (track)       |
| Bitstring Status List 1.1   | preview (track)       |
| Controlled Identifiers v1.0 | current               |
| VC JSON Schema              | current (build)       |
| VC Barcodes                 | current (track)       |
| VC Rendering Methods        | current (track)       |
| VC Confidence Methods       | current (track)       |
| VC Forgery Defense          | current (track)       |
| VCALM                       | current (track)       |

The data model, the two securing mechanisms and the status list are separate families, each with its own current line. The EdDSA, ECDSA and BBS cryptosuites are part of the VC Data Integrity 1.0 line. `references/versions.md` says what changed, how to upgrade from 1.1, and what the drafts would change.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/2025/REC-vc-data-model-2.0-20250515/): W3C Recommendation, 15 May 2025.
- [Securing Verifiable Credentials using JOSE and COSE](https://www.w3.org/TR/2025/REC-vc-jose-cose-20250515/): W3C Recommendation, 15 May 2025.
- [Verifiable Credential Data Integrity 1.0](https://www.w3.org/TR/2025/REC-vc-data-integrity-20250515/): W3C Recommendation, 15 May 2025.
- [Data Integrity EdDSA Cryptosuites v1.0](https://www.w3.org/TR/2025/REC-vc-di-eddsa-20250515/): W3C Recommendation, 15 May 2025.
- [Data Integrity ECDSA Cryptosuites v1.0](https://www.w3.org/TR/2025/REC-vc-di-ecdsa-20250515/): W3C Recommendation, 15 May 2025.
- [Data Integrity BBS Cryptosuites v1.0](https://www.w3.org/TR/2026/CRD-vc-di-bbs-20260910/): W3C Candidate Recommendation Draft, 10 September 2026.
- [Bitstring Status List v1.0](https://www.w3.org/TR/2025/REC-vc-bitstring-status-list-20250515/): W3C Recommendation, 15 May 2025.
- [Verifiable Credentials Data Model v1.1](https://www.w3.org/TR/2022/REC-vc-data-model-20220303/): W3C Recommendation, 3 March 2022, superseded by v2.0.
- [Verifiable Credentials Overview](https://www.w3.org/TR/2026/NOTE-vc-overview-1.0-20260730/): W3C Group Note, 30 July 2026.
- [Verifiable Credentials Data Model v2.1](https://www.w3.org/TR/2026/WD-vc-data-model-2.1-20260930/): W3C Working Draft, 30 September 2026.
- [Verifiable Credential Data Integrity 1.1](https://www.w3.org/TR/2026/WD-vc-data-integrity-1.1-20260930/): W3C Working Draft, 30 September 2026.
- [Bitstring Status List v1.1](https://www.w3.org/TR/2026/WD-vc-bitstring-status-list-1.1-20260924/): W3C First Public Working Draft, 24 September 2026.
- [Data Integrity EdDSA Cryptosuites v1.1](https://www.w3.org/TR/2026/WD-vc-di-eddsa-1.1-20260416/): W3C First Public Working Draft, 16 April 2026.
- [Data Integrity ECDSA Cryptosuites v1.1](https://www.w3.org/TR/2026/WD-vc-di-ecdsa-1.1-20260916/): W3C Working Draft, 16 September 2026.

## License

MIT
