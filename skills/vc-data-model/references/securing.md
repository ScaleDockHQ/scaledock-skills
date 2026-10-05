# Securing mechanisms

Read this when securing a credential or presentation, choosing between JOSE, SD-JWT, COSE and Data Integrity, or implementing key discovery and proof verification. Sources: VC Data Model 2.0 (§ 4.12, § 5.13), Securing Verifiable Credentials using JOSE and COSE (VC JOSE COSE), Verifiable Credential Data Integrity 1.0 (VC DI), and the EdDSA, ECDSA and BBS cryptosuite specifications.

## Two classes

- An **enveloping proof** wraps a serialization of the data model; VC JOSE COSE is the RECOMMENDED one. An **embedded proof** adds the proof to the serialization; VC Data Integrity is the RECOMMENDED one. They are not mutually exclusive (VCDM § 4.12).
- The data model mandates no particular mechanism (VCDM § 5.13, note). Other mechanisms must document integrity algorithms and a verification algorithm that takes a media type and input data and returns `verified`, the secured document without any proof or header information, and its `mediaType` (VCDM § 5.13).

| Need                                                    | Mechanism                                   |
| ------------------------------------------------------- | ------------------------------------------- |
| JSON tooling, JWT libraries, full disclosure            | `vc+jwt` (VC JOSE COSE § 3.1)               |
| Selective disclosure with JWT tooling                   | `vc+sd-jwt` (VC JOSE COSE § 3.2)            |
| CBOR or constrained environments                        | `vc+cose` (VC JOSE COSE § 3.3)              |
| Proof inside the JSON-LD document, proof sets or chains | Data Integrity with `eddsa-*` or `ecdsa-*`  |
| Selective disclosure as an embedded proof               | `ecdsa-sd-2023`                             |
| Unlinkable selective disclosure                         | `bbs-2023` (Candidate Recommendation Draft) |

## VC JOSE COSE

### Common rules

- The JWS, SD-JWT or COSE payload is the unsecured credential or presentation itself, conforming to VC Data Model 2.0 (VC JOSE COSE § 3.1.1, § 3.2.1, § 3.3.1).
- Use the most specific media type, for example `application/vc+sd-jwt` rather than `application/sd-jwt`; when unsure, use the media types of this specification (§ 3).
- `alg: none` signals no integrity protection; issuers, holders and verifiers MUST ignore claim sets without integrity protection (§ 1.1.2.1).
- The JWT claim names `vc` and `vp` MUST NOT be present (§ 1.1.2.1, § 3.1.3).
- `iat` and `exp` are the issuance and expiry of the signature, not of the data; that is `validFrom` and `validUntil`. `nbf` is NOT RECOMMENDED (§ 3.1.3, § 3.3.3).
- Avoid JWT claims that conflict with credential properties, especially `iss` and `issuer`, `jti` and `id`, `sub` and `credentialSubject.id` (§ 3.1.3).
- Unknown header parameters and claims MUST be ignored (§ 3.1.3, § 3.3.3). The JOSE header is JSON, not JSON-LD (§ 3.1.3).
- Inside a secured presentation, credentials MUST be `EnvelopedVerifiableCredential` objects, presentations MUST be `EnvelopedVerifiablePresentation` objects, and every credential MUST be secured (§ 3.1.2, § 3.2.2, § 3.3.2).
- To encrypt over an insecure channel, nest the secured credential in a JWE or COSE encryption (§ 3.1.1, § 3.2.1, § 3.3.1).

### Per format

| Format | Issuer MUST                         | Header SHOULD                                                                                                    | Serialization                                                                            |
| ------ | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| JWT    | Secure with JWS (RFC 7515)          | `typ` `vc+jwt` or `vp+jwt`; `cty` `vc` or `vp` when present                                                      | MUST support JWS compact; JWS JSON is NOT RECOMMENDED (§ 3.1)                            |
| SD-JWT | Secure with SD-JWT                  | `typ` `vc+sd-jwt` or `vp+sd-jwt`; `cty` `vc` or `vp` when present                                                | MUST support compact `application/sd-jwt`; MAY support `application/sd-jwt+json` (§ 3.2) |
| COSE   | Secure with `COSE_Sign1` (RFC 9052) | `typ` (16) `application/vc+cose` or `application/vp+cose`; content type (3) `application/vc` or `application/vp` | Base64 in the `data:` URL when enveloped in a presentation (§ 3.3)                       |

- SD-JWT: keep properties needed for verification and validation disclosed, including `@context`, `type`, `credentialStatus`, `credentialSchema` and `relatedResource` (§ 3.2.1, § 3.2.2).
- The SD-JWT format itself (disclosures, `~` separators, key binding JWT) is defined by the SD-JWT specification (§ 1.1.2.2); see the `sd-jwt` skill.

### Key discovery

- `kid` is a hint to the key; it MUST be present when the issuer or subject key is expressed as a DID URL (§ 4.1.1).
- `iss`, if present, MUST match `issuer` (string) or `issuer.id` (object) (§ 4.1.2).
- `cnf` MAY identify a proof-of-possession key (RFC 7800, RFC 8747); binding the credential to a holder key this way is RECOMMENDED (§ 4.1.3).
- With controlled identifier documents: the verification method `type` MUST be `JsonWebKey` with the key in `publicKeyJwk`; when `iss` is absent and the issuer or holder is a URL, `kid` MUST be an absolute URL to a verification method; a `kid` with an RFC 7638 JWK Thumbprint URI is RECOMMENDED (§ 4.2).
- Verifiers SHOULD minimize processing of untrusted header and payload data during key discovery (§ 5).

### Verification

- JWT: follow RFC 7519 JWT validation; on success return the decoded payload and media type `vc` or `vp` (§ 5.1).
- SD-JWT: verify per SD-JWT, then rebuild the JWT claim set from the disclosed payload (§ 5.2).
- COSE: verify `COSE_Sign1` per RFC 9052 (§ 5.3).
- Then validate: claims expected for the `typ` MUST be present; understood claims are evaluated by policy; others are ignored. The verified document MUST be well-formed compact JSON-LD. `credentialSchema` and `credentialStatus` SHOULD be checked, and ignored if their type is not understood (§ 5.4).
- Reject malformed JSON in its entirety (§ 7.2).

## VC Data Integrity 1.0

### Proof properties

```json
"proof": {
  "type": "DataIntegrityProof",
  "cryptosuite": "eddsa-rdfc-2022",
  "created": "2025-01-01T00:00:00Z",
  "verificationMethod": "https://issuer.example/keys#key-1",
  "proofPurpose": "assertionMethod",
  "proofValue": "z..."
}
```

| Property              | Rule (VC DI § 2.1, § 3.1)                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `type`                | REQUIRED; a string mapping to a URL; `DataIntegrityProof` for current suites.                                       |
| `cryptosuite`         | REQUIRED with `DataIntegrityProof`; a string.                                                                       |
| `proofPurpose`        | REQUIRED; for example `assertionMethod` for issuing credentials, `authentication` for presentations used to log in. |
| `verificationMethod`  | A URL to the key. Optional in § 2.1, but Add Proof and Verify Proof error without it (§ 4.2, § 4.4).                |
| `proofValue`          | REQUIRED for `DataIntegrityProof`; multibase-encoded.                                                               |
| `created`, `expires`  | Optional `dateTimeStamp` values; these bound the proof, not the credential (§ 2.6).                                 |
| `domain`, `challenge` | Optional; `challenge` SHOULD accompany `domain`; used against replay in presentations.                              |
| `id`, `previousProof` | Optional; used for proof chains.                                                                                    |
| `nonce`               | Optional; reduces linkability of deterministic signatures.                                                          |

- `proof` is a named graph; it is one object or an unordered set (proof set). A proof chain gives proofs an `id` and later proofs a `previousProof`; every referenced proof MUST also verify (§ 2.1, § 2.1.1, § 2.1.2).
- Proof purposes stop misuse: a proof made for `assertionMethod` must not be accepted for `authentication` (§ 2.2, § 5.11).

### Algorithms

- Add Proof: the cryptosuite creates the proof; an error is raised if `type`, `verificationMethod` or `proofPurpose` is missing, or if `domain` or `challenge` differ from the options (§ 4.2).
- Verify Proof: parse the bytes; raise `PARSING_ERROR` if the document or `proof` is not a map; `PROOF_VERIFICATION_ERROR` if `type`, `verificationMethod` or `proofPurpose` is missing or the purpose is not the expected one; `INVALID_DOMAIN_ERROR` and `INVALID_CHALLENGE_ERROR` on mismatches; then run the cryptosuite's `verifyProof` (§ 4.4).
- Errors exposed over HTTP SHOULD be RFC 9457 Problem Details with `type` starting `https://w3id.org/security#` (§ 4.7).
- Processing order on receipt: transform, check the schema, verify the proof, then validate contexts (§ 4.1).
- Bind the verification method to its controller through the controlled identifier document, and check that it is listed under the expected verification relationship (§ 2.6, § 5.9, § 5.10).
- Without JSON-LD processing, a document MAY omit a top-level `@context`, but then extensions MUST NOT be made. When securing a document whose `@context` is missing or does not map the Data Integrity terms, SHOULD inject `https://w3id.org/security/data-integrity/v2` or a context with the same terms, such as the VC v2 context (§ 2.4.2).

### Cryptosuites

| Cryptosuite       | Specification (status)                    | Canonicalization             | Keys and signature                                                                                                                 |
| ----------------- | ----------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `eddsa-rdfc-2022` | EdDSA v1.0 (Recommendation)               | RDF Dataset Canonicalization | Ed25519; `publicKeyMultibase` starting `z`; `proofValue` base58-btc multibase EdDSA signature (EdDSA § 2)                          |
| `eddsa-jcs-2022`  | EdDSA v1.0 (Recommendation)               | JSON Canonicalization Scheme | As above                                                                                                                           |
| `ecdsa-rdfc-2019` | ECDSA v1.0 (Recommendation)               | RDF Dataset Canonicalization | P-256 with SHA-256 or P-384 with SHA-384 (ECDSA § 1)                                                                               |
| `ecdsa-jcs-2019`  | ECDSA v1.0 (Recommendation)               | JSON Canonicalization Scheme | As above                                                                                                                           |
| `ecdsa-sd-2023`   | ECDSA v1.0 (Recommendation)               | RDF Dataset Canonicalization | Base proof (header `0xd9 0x5d 0x00`) for the holder; derived proof (header `0xd9 0x5d 0x01`) for the verifier (ECDSA § 3.5, § 3.6) |
| `bbs-2023`        | BBS v1.0 (Candidate Recommendation Draft) | RDF Dataset Canonicalization | BLS12-381 G2 Multikey; SHA-256 BBS variant SHOULD be used (BBS § 2.1.1, § 2.2.1)                                                   |

- ECDSA signatures MUST use the IEEE P1363 form of RFC 4754 § 7, and SHOULD use the deterministic variant (ECDSA § 3). P-256 is secp256r1, not secp256k1 (ECDSA § 1).
- `ecdsa-sd-2023` and `bbs-2023` split claims into mandatory claims (always revealed, chosen by the issuer with JSON pointers) and selectively disclosable ones. The issuer gives the base proof only to the holder; the holder derives a proof for the requested JSON pointers (VC Overview § 4.2.3.2; ECDSA § 3.5).
- With `ecdsa-sd-2023` each non-mandatory claim is signed with an ephemeral key whose public key appears in both base and derived proofs, so derived proofs are linkable; `bbs-2023` derived proofs are unlinkable to the base signature and to each other (VC Overview § 4.2.3.2; BBS § 1).
- `bbs-2023` adds optional anonymous holder binding and credential-bound pseudonyms (BBS § 4).
- Implementations of RDF Dataset Canonicalization detect dataset poisoning and abort (EdDSA § 3.1; ECDSA § 3).
- Cryptosuite JSON-LD contexts MUST protect their terms with `@protected` (VC DI § 3).

## Presentations: binding and replay

- Presentations SHOULD be extremely short-lived and bound to a verifier challenge (VCDM § 4.13).
- With Data Integrity, the verifier passes its `challenge` and `domain` to Verify Proof and checks `proofPurpose` (VC DI § 4.4). With JOSE, use the JWT audience and nonce mechanisms of the protocol in use, and holder binding through `cnf` (VC JOSE COSE § 4.1.3; VCDM § 9.5.1).
- The data model alone does not prevent man-in-the-middle, replay or spoofing; use the securing mechanism's audience or domain features and verifier-enforced unique challenges (VCDM § 9.5).
