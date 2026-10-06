# Versions and upgrades

Read this when choosing which specifications to build to, reading a credential written for VC Data Model 1.1, upgrading one, or checking the drafts for upcoming changes. Sources: the Recommendations and Working Drafts listed in [Sources](../SKILL.md#sources), their W3C history pages, and their Revision History appendices.

## Version lines

The Verifiable Credentials Working Group versions each specification separately, so this skill tracks four families: the data model, the JOSE and COSE securing mechanism, Data Integrity with its cryptosuites, and Bitstring Status List. Each family has one current line.

| Id                     | Line                        | Status  | Revision                                        | Posture | Summary                                                                                                      |
| ---------------------- | --------------------------- | ------- | ----------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `2.1-preview`          | VC Data Model 2.1           | preview | Working Draft, 30 September 2026                | track   | Same v2 context; security and privacy moved to threat-model appendices; `name` and `description` can repeat. |
| `2.0`                  | VC Data Model 2.0           | current | Recommendation, 15 May 2025                     |         | The default target: v2 context, `validFrom` and `validUntil`, media types, securing mechanism interface.     |
| `1.1`                  | VC Data Model 1.1           | legacy  | Recommendation, 3 March 2022                    |         | v1 context, required `issuanceDate`, `expirationDate`, and JWT encoding with `vc` and `vp` claims.           |
| `jose-cose-1.0`        | VC JOSE COSE                | current | Recommendation, 15 May 2025                     |         | Enveloping proofs: `vc+jwt`, `vc+sd-jwt`, `vc+cose` and the `vp` forms.                                      |
| `di-1.1-preview`       | VC Data Integrity 1.1       | preview | Working Draft, 30 September 2026                | track   | Moves common cryptosuite and selective disclosure algorithms (SIC and SHoC approaches) into Data Integrity.  |
| `di-1.0`               | VC Data Integrity 1.0       | current | Recommendation, 15 May 2025, plus suites        |         | Embedded proofs with `DataIntegrityProof`; EdDSA and ECDSA suites are Recommendations, BBS is a CR Draft.    |
| `bsl-1.1-preview`      | Bitstring Status List 1.1   | preview | First Public Working Draft, 24 September 2026   | track   | Adds `TerseBitstringStatusListEntry` for space-constrained credentials.                                      |
| `bsl-1.0`              | Bitstring Status List 1.0   | current | Recommendation, 15 May 2025                     |         | Revocation, suspension, refresh and message status in a compressed bitstring credential.                     |
| `cid-1.0`              | Controlled Identifiers v1.0 | current | Recommendation, 15 May 2025                     |         | Common verification relationships and methods.                                                               |
| `vc-json-schema`       | VC JSON Schema              | current | Candidate Recommendation Draft, 4 February 2025 | build   | Checking credential structure with JSON Schema.                                                              |
| `vc-barcodes`          | VC Barcodes                 | current | Working Draft, 22 August 2026                   | track   | Barcode representations. The only line is a draft.                                                           |
| `vc-render-method`     | VC Rendering Methods        | current | Working Draft, 29 September 2026                | track   | How to render a credential. The only line is a draft.                                                        |
| `vc-confidence-method` | VC Confidence Methods       | current | Working Draft, 10 September 2026                | track   | Confidence that a presenter is related to the credential. The only line is a draft.                          |
| `vc-forgery-defense`   | VC Forgery Defense          | current | Working Draft, 25 August 2026                   | track   | Forgery defense methods. The only line is a draft.                                                           |
| `vcalm`                | VCALM                       | current | Working Draft, 21 August 2026                   | track   | The VCALM draft. The only line is a draft.                                                                   |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

No line is supported: VC Data Model 2.0 replaces 1.1, and new credentials use 2.0. VC Data Model 1.0 (Recommendation, 19 November 2019) is part of the legacy 1.x line; VC Data Model 1.1 lists its changes since 1.0, and the upgrade below applies to both.

Cryptosuites inside the `di-1.0` line:

| Specification                          | Status (as of 2026-10-05)                         | Cryptosuites                                         |
| -------------------------------------- | ------------------------------------------------- | ---------------------------------------------------- |
| Data Integrity EdDSA Cryptosuites v1.0 | Recommendation, 15 May 2025                       | `eddsa-rdfc-2022`, `eddsa-jcs-2022`                  |
| Data Integrity ECDSA Cryptosuites v1.0 | Recommendation, 15 May 2025                       | `ecdsa-rdfc-2019`, `ecdsa-jcs-2019`, `ecdsa-sd-2023` |
| Data Integrity BBS Cryptosuites v1.0   | Candidate Recommendation Draft, 10 September 2026 | `bbs-2023`                                           |

The VC Overview Note explains that BBS is technically complete but still a Candidate Recommendation (VC Overview § 1.1). Use `bbs-2023` when unlinkable disclosure is required and both sides accept a Candidate Recommendation; its text can still change.

## Which version to use

- Issue and verify VC Data Model 2.0 credentials. Secure them with VC JOSE COSE or VC Data Integrity 1.0; the data model recommends both and mandates neither (§ 4.12, § 5.13).
- Publish status with Bitstring Status List 1.0 when a credential needs revocation, suspension, refresh or message status.
- Treat VC Data Model 1.1 credentials (first context `https://www.w3.org/2018/credentials/v1`) as input to an upgrade. A verifier that still accepts them handles them as a separate, legacy code path; they are not conforming documents under 2.0.
- Follow the three drafts only to see what is coming. Their posture is **track**: emit nothing they alone define.

## What changed

### VC Data Model 2.1 (preview)

From a comparison of the 30 September 2026 Working Draft with the 2.0 Recommendation; its Revision History lists no entries beyond 2.0 yet:

- The base context stays `https://www.w3.org/ns/credentials/v2` (2.1 § 4.3).
- `name` and `description` become "one or more strings or language value objects" (2.1 § 4.6).
- The conformance sentence changes to "when securing a conforming document, at least one of the securing mechanisms described in Section 4.12 MUST be used" (2.1 § 1.3).
- Security and privacy considerations move to Appendices A and B, each summarizing a threat analysed in a separate Verifiable Credentials Data Model Threat Model v2.1; validation moves to Appendix C (2.1 Appendices A to C).
- `renderMethod` and `confidenceMethod` stay reserved, now pointing to the Verifiable Credential Rendering Methods and Confidence Method specifications (2.1 § 5.10).

### VC Data Model 2.0

From the Revision History, "Changes since the v1.1 Recommendation" (Appendix E), among others:

- Defines the v2 context `https://www.w3.org/ns/credentials/v2`, makes it and the vocabularies normative, and publishes their hashes (§ B.1, § B.2).
- Renames `issuanceDate` and `expirationDate` to `validFrom` and `validUntil`, makes `validFrom` optional, and requires `dateTimeStamp` values (§ 4.9, § 5.8).
- Restricts serialization to compacted JSON-LD and adds the `application/vc` and `application/vp` media types (§ 6.1, § 6.2, Appendix C).
- Moves the VC-JWT section to a separate securing specification (VC JOSE COSE), adds a normative dependency on Data Integrity and JOSE/COSE, and defines the securing mechanism interface and verification algorithm with Problem Details (§ 5.13, § 7).
- Adds enveloped credentials and presentations, `relatedResource`, `name` and `description`, type-specific credential processing, the undefined-terms context, and the reserved `renderMethod` and `confidenceMethod` (§ 4.13, § 5.3, § 4.6, § 6.3, § 5.2, § 5.10).
- Clarifies that `credentialSubject` values cannot be strings, and removes the Disputes section.

### VC JOSE COSE

Replaces the VC Data Model 1.1 § 6.3.1 JWT encoding. The credential is the JWS payload as-is, the `vc` and `vp` claims are banned, and `iat` and `exp` describe the signature rather than the credential (VC JOSE COSE § 1.1.2.1, § 3.1.3).

### VC Data Integrity 1.1 (preview)

The 30 September 2026 Working Draft adds Cryptosuite Common Algorithms and Selective Disclosure Algorithms to Data Integrity itself, with a Signed Individual Claims (SIC) approach and a Salted Hash of Claims (SHoC) approach aimed at large, quantum-resistant signatures (DI 1.1 § 4.2 to § 4.6). The EdDSA 1.1 (First Public Working Draft, 16 April 2026) and ECDSA 1.1 (Working Draft, 16 September 2026) cryptosuite drafts accompany it.

### VC Data Integrity 1.0

The proof model of VC Data Model 1.1 § 6.3.2, now its own Recommendation. Older suites used a per-suite proof `type` such as `Ed25519Signature2020`; the current pattern is `type` `DataIntegrityProof` with a `cryptosuite` string (VC Data Integrity § 3.1).

### Bitstring Status List 1.1 (preview)

The First Public Working Draft adds `TerseBitstringStatusListEntry`, with `terseStatusListBaseUrl` and a 32-bit `terseStatusListIndex`, as a compact form that converts to a `BitstringStatusListEntry` given a list length (BSL 1.1 § 2.3).

### Bitstring Status List 1.0

Changes since its first Candidate Recommendation: a `refresh` status purpose, the clarification that `ttl` does not override validity, a context and vocabulary section with hashes, final guidance on decoy values and validity periods, and no integer error codes (Bitstring Status List Appendix B).

## Upgrading

### VC Data Model 1.1 to VC Data Model 2.0

1. Change the version marker: replace `https://www.w3.org/2018/credentials/v1` with `https://www.w3.org/ns/credentials/v2` as the first `@context` item (1.1 § 4.1; 2.0 § 4.3). Replace `https://www.w3.org/2018/credentials/examples/v1` with your own context, never the v2 examples context.
2. Replace removed or renamed fields:
   - `issuanceDate` (required in 1.1 § 4.6) becomes `validFrom` (optional); `expirationDate` (1.1 § 4.8) becomes `validUntil` (2.0 § 4.9). Write both as `dateTimeStamp` with `Z` or an offset (§ 5.8).
   - Make every `credentialSubject` value an object (Appendix E).
   - Give `issuer` a URL or an object with a URL `id` (§ 4.7).
   - Replace any reliance on `@vocab` with defined terms, or add `https://www.w3.org/ns/credentials/undefined-terms/v2` as the last context (§ 5.2).
   - Replace 1.1 status and schema types with types that are defined for v2, for example `BitstringStatusListEntry` (Bitstring Status List § 2.1).
3. Re-secure the credential; the old proof does not cover the new document:
   - JWT credentials (1.1 § 6.3.1): put the credential itself in the JWS payload, drop the `vc` and `vp` claims, set `typ` to `vc+jwt` or `vp+jwt`, stop deriving `issuanceDate` from `nbf`, `expirationDate` from `exp`, `id` from `jti` and `credentialSubject.id` from `sub`, and keep any `iss` equal to `issuer` (VC JOSE COSE § 3.1, § 3.1.3, § 4.1.2).
   - Embedded proofs: use `type` `DataIntegrityProof` with a `cryptosuite` from a current suite instead of a per-suite proof type (VC Data Integrity § 3.1).
   - Presentations: carry JOSE-, SD-JWT- or COSE-secured credentials as `EnvelopedVerifiableCredential` objects with a `data:` URL, not as JWT strings in `verifiableCredential` (§ 4.13; VC JOSE COSE § 3.1.2).
4. Label payloads `application/vc` and `application/vp` (or the VC JOSE COSE media types) (§ 6.2).
5. Validate against the target: run the Verify list in `SKILL.md` and the § 7.1 verification algorithm.
6. Keep behaviour unchanged: the same issuer, subject, claims and validity window. A 1.1 credential without `expirationDate` maps to a 2.0 credential without `validUntil`; do not invent one.

## Preview: VC Data Model 2.1

Posture: **track**. As of 2026-10-05 the latest Working Draft (30 September 2026; First Public Working Draft 9 April 2026) keeps the v2 context and media types, so a 2.0 credential is unchanged by it. Do not emit multiple `name` or `description` values that 2.0 consumers cannot read, and do not cite the threat-model appendices as normative. Watch the W3C history page for a Candidate Recommendation. When 2.1 becomes a Recommendation: make it current, make 2.0 supported, and add an upgrade section.

## Preview: VC Data Integrity 1.1

Posture: **track**. The Working Draft (30 September 2026) and the EdDSA 1.1 and ECDSA 1.1 cryptosuite drafts restructure the algorithms and add SIC and SHoC selective disclosure. Do not emit proof value headers or cryptosuites defined only there. The BBS Cryptosuites CR Draft already cites Data Integrity 1.1. When 1.1 becomes a Recommendation: make it current in the `data-integrity` family, make 1.0 supported, and list what changed for verifiers.

## Preview: Bitstring Status List 1.1

Posture: **track**. The First Public Working Draft (24 September 2026) adds `TerseBitstringStatusListEntry`. Do not issue it: Bitstring Status List 1.0 does not define it, and a verifier ignores a status type it does not understand (VC JOSE COSE § 5.4), so the credential would carry no usable status. When 1.1 becomes a Recommendation: make it current in the `status` family, make 1.0 supported, and add the conversion rules to `status-lists.md`.
