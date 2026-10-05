# Verification, validation, privacy and security

Read this when building a verifier, deciding what to check after a proof verifies, reporting errors, or reviewing a credential design for privacy and security. Source: VC Data Model 2.0 (§ 7, § 8, § 9, Appendix A), with VC JOSE COSE and VC Data Integrity where named. Section numbers are VC Data Model 2.0 unless another specification is named.

## Verification versus validation

- **Verification** is normative: a conforming verifier MUST run the § 7.1 algorithm, check that every required property is present with the right types and values, and produce errors when non-conforming documents are detected (§ 1.3, § 7.1).
- **Validation** is the verifier applying its business rules to a verified credential. The specification gives no conformance criteria for it; Appendix A records what the Working Group expects (Appendix A).
- Validity periods, status, schema and fitness for purpose are all validation and happen after verification (Appendix A.7).

## Verification algorithm (§ 7.1)

Input: a media type and the secured bytes. Output: `status`, the conforming `document`, its `mediaType`, the verification method's `controller`, the `controlledIdentifierDocument`, and lists of `warnings` and `errors`.

1. Pick the `verifyProof` function from the media type, using the securing mechanisms registered in the VC Extensions document or others the implementation knows. It MUST implement the § 5.13 interface.
2. Pass bytes, or the parsed JSON map, as that function expects.
3. If the result's `status` is false, add `CRYPTOGRAPHIC_SECURITY_ERROR`.
4. If `status` is true but the document is not a conforming document, set `status` to false, remove the document, and add at least one `MALFORMED_VALUE_ERROR`.
5. Return the result.

The steps MAY run in another order if the same invalid inputs produce errors (§ 7.1). Implementations are expected to add their own warnings and checks (§ 7, note).

## Problem Details

Errors follow RFC 9457. `type` MUST be present and be a URL; `title` and `detail` SHOULD be human-readable (§ 7.2).

| Specification                 | `type` prefix                                    | Error types                                                                                                                                                                                                                                            |
| ----------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| VC Data Model 2.0 (§ 7.2)     | `https://www.w3.org/TR/vc-data-model#`           | `PARSING_ERROR`, `CRYPTOGRAPHIC_SECURITY_ERROR`, `MALFORMED_VALUE_ERROR` (SHOULD name the property and path), `RANGE_ERROR`                                                                                                                            |
| VC Data Integrity (§ 4.7)     | `https://w3id.org/security#`                     | `PROOF_GENERATION_ERROR`, `PROOF_VERIFICATION_ERROR`, `PROOF_TRANSFORMATION_ERROR`, `INVALID_DOMAIN_ERROR`, `INVALID_CHALLENGE_ERROR`; Verify Proof also uses `PARSING_ERROR` (§ 4.4) and lossless securing uses `DATA_LOSS_DETECTION_ERROR` (§ 2.4.3) |
| Bitstring Status List (§ 3.5) | `https://www.w3.org/ns/credentials/status-list#` | `STATUS_RETRIEVAL_ERROR`, `STATUS_VERIFICATION_ERROR`, `STATUS_LIST_LENGTH_ERROR`                                                                                                                                                                      |

## Validation checks (Appendix A)

| Check               | What a verifier does                                                                                                                                                                                                       | Section |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Credential type     | Request a type; fail when its mandatory claims are missing; ignore claims the type does not define.                                                                                                                        | A.1     |
| Subject             | Use `credentialSubject.id`, or other properties, to identify the subject.                                                                                                                                                  | A.2     |
| Issuer              | Match the issuer to the verified controller of the verification method, or to a list of trusted issuers.                                                                                                                   | A.3     |
| Holder              | For holder-is-subject confidence: presentation and credentials secured by trusted mechanisms, `holder` equal to a `credentialSubject` identifier, and that identifier leading to the presentation's verification material. | A.4     |
| Issuance            | `validFrom` is in an acceptable range, for example not in the future.                                                                                                                                                      | A.5     |
| Proofs              | Known cryptosuite, required proof properties present, proof verifies; key metadata recent, key not suspended, revoked or expired.                                                                                          | A.6     |
| Validity period     | `validFrom` and `validUntil` within range, for example the end not in the past.                                                                                                                                            | A.7     |
| Status              | Evaluate `credentialStatus` by its type definition and the verifier's own criteria.                                                                                                                                        | A.8     |
| Schema              | Evaluate `credentialSchema` by its type, for example check the data against the JSON Schema.                                                                                                                               | A.9     |
| Fitness for purpose | Do the claims and the issuer answer the verifier's question? Respect issuer policy such as `termsOfUse`.                                                                                                                   | A.10    |

- Proof validity (`created`, `expires` on a Data Integrity proof; `iat`, `exp` on a JWT) is not credential validity (`validFrom`, `validUntil`); check both (VC DI § 2.6; VC JOSE COSE § 3.1.3).
- A verified signature and a clean status check do not make every credential acceptable for every purpose; a self-asserted credential may not suffice where an authority is required (§ 9.9.2).
- A credential without a proof is not verifiable; treat it as self-asserted or intermediate data (§ 9.4).

## Privacy checklist (§ 8)

- **PII:** even birthdate plus postal code identifies people. Prefer abstract claims such as `ageOver` over `dateOfBirth`, protect credentials with TLS and encryption at rest, and warn holders before sharing (§ 8.3, § 8.8).
- **Identifiers:** long-lived subject or credential `id` values correlate holders. For strong anti-correlation, identifiers are selectively disclosable, bound to one origin, single-use, or replaced by short-lived bearer tokens (§ 8.4).
- **Signatures:** signature bytes, timestamps and key identifiers that repeat across presentations correlate; prefer unlinkable disclosure such as BBS where this matters (§ 8.5).
- **Metadata:** rare credential types, extensions or cryptography narrow down the holder; prefer globally adopted ones (§ 8.6).
- **Fetching:** use Oblivious HTTP or similar when wallets or verifiers fetch linked resources or status lists (§ 8.7).
- **Data minimization:** issuers atomize claims or use selective disclosure; verifiers request only what the transaction needs and retain nothing beyond it (§ 8.9, § 8.17).
- **Bearer credentials:** omit `credentialSubject.id`; make them single-use, free of PII and not unduly correlatable (§ 8.10).
- **Status checks:** never use per-credential revocation lists or send a credential identifier to a central server; use a privacy-preserving list (§ 8.11, § 8.14).
- **Issuance frequency:** short-lived, auto-renewed credentials let issuers correlate use (§ 8.18). Prefer single-use credentials where possible (§ 8.19).
- **Issuer behaviour:** a unique key per credential lets an issuer track presentations even with unlinkable signatures (§ 8.21).

## Security checklist (§ 9)

- Plan for cryptosuite and library expiry: be able to upgrade suites and to invalidate and replace credentials (§ 9.1).
- Use a signing key for one purpose only, give it a limited cryptoperiod (NIST SP 800-57 recommends one to three years for private signing keys), and confirm verification material before use (§ 9.2).
- Protect linked contexts, schemas and images whose change affects security with `relatedResource` digests (§ 9.3).
- Defend against man-in-the-middle with the securing mechanism's audience or domain, against replay with a verifier-enforced unique challenge and a short presentation validity, and against spoofing with holder binding or strong authentication (§ 9.5).
- When atomizing claims, make sure holders cannot bundle claims from different credentials into a false claim (§ 9.6).
- Match validity periods to how long the information stays true (§ 9.7).
- Protect wallets with device unlock, repository authentication, key authentication or hardware signing devices (§ 9.8).
- Avoid HTML or other executable markup in credential values; if unavoidable, sandbox the renderer without network access (§ 9.10).
- Parse strictly and reject malformed JSON entirely; take care with remote context retrieval and permanently cache contexts in production (VC JOSE COSE § 7.2; VC DI § 2.4).

## Common mistakes

| Mistake                                                      | Fix                                                                        |
| ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Treating `application/vc` content as secured                 | Media types imply no security; run § 7.1 (§ 6.2).                          |
| Accepting a valid proof without checking the issuer          | Bind the verification method controller to `issuer` (A.3; VC DI § 2.6).    |
| Using JWT `exp` as the credential's expiry                   | `exp` covers the signature; check `validUntil` too (VC JOSE COSE § 3.1.3). |
| Accepting a presentation without a fresh challenge           | Require a unique challenge and audience or domain (§ 9.5).                 |
| Putting credential strings or URLs in `verifiableCredential` | Use objects or `EnvelopedVerifiableCredential` (§ 4.13).                   |
| Loading contexts from the network on each verification       | Cache, pin by hash, or use type-specific processing (§ 6.3; VC DI § 2.4).  |
| Reading the status bit with the wrong bit order              | Index 0 is the left-most bit (Bitstring Status List § 7.1).                |
