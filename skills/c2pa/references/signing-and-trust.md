# Claim signatures, certificates, time-stamps and trust lists

Read this when signing a claim, choosing algorithms and certificates, adding time-stamps and OCSP data, configuring a validator's trust anchors, or preparing for the C2PA Conformance Program. Section numbers are from the C2PA 2.4 Technical Specification; the Conformance Program, its additional requirements and the trust list repository are listed in [Sources](../SKILL.md#sources).

## Algorithms (§ 13)

- **Hashes:** `sha256`, `sha384`, `sha512`. The deprecated list is empty, and an algorithm on neither list is forbidden: implementations shall not support others optionally (§ 13.1). Soft binding algorithms are out of scope of this list.
- Hash values are CBOR byte strings. The algorithm comes from the nearest `alg` (sibling, then enclosing structures), else the claim's `alg` (§ 13.1, § 15.4).
- **Signatures:** ES256, ES384, ES512 (keys on P-256, P-384 or P-521; any of these curves is accepted with any ES algorithm), PS256, PS384, PS512 (RSA modulus of at least 2048 bits; implementations may refuse keys above 16384 bits), and EdDSA with Ed25519 only. The deprecated list is empty. Refuse to sign or verify with a key that does not fit the algorithm (§ 13.2.1).
- For live video, prefer deterministic signature algorithms so segment caching keeps working (§ 13.2.1).

## COSE (§ 13.2.2 to § 13.2.6)

- Every C2PA signature is a `COSE_Sign1_Tagged` (RFC 8152 § 4.2). The claim signature is detached: `payload` is `nil` (major type 7, value 22, never an empty byte string), and the `Sig_structure` payload is the contents of the claim JUMBF box.
- `Sig_structure`: context `Signature1` (or `CounterSignature` where specified, never `Signature`); `external_aad` is a zero-length `bstr`; `alg` with integer label 1 in the protected header, never the string `"alg"`.
- An optional `iat` protected header (NumericDate) records an untrusted claimed signing time for display (§ 13.2.4).
- A generator that can validate should check its credential against the trust model before signing and warn if it is not acceptable; it may still sign (§ 13.2.5).
- A signer logo, if shown, comes from an RFC 9399 logotype in the certificate (§ 13.2.7).

## The signing credential (§ 14.2, § 14.5)

- Exactly one credential per `COSE_Sign1_Tagged`, across protected and unprotected headers. None, two, or the same one twice (including once in each bucket) is rejected (§ 14.2).
- Store X.509 certificates in `x5chain` per RFC 9360: the end-entity certificate first, then each issuer, including all intermediate CA certificates. Write the integer label 33 only, in the protected bucket. The string label `x5chain` is deprecated; validators accept both and both buckets, preferring 33 if both labels appear (§ 14.5).
- Certificate profile (§ 14.5.1.1), except for entries in a private credential store:
  - `signatureAlgorithm` is one of the ECDSA, RSA PKCS #1 v1.5 or RSASSA-PSS variants with SHA-256/384/512, or Ed25519; EC keys on prime256v1, secp384r1 or secp521r1; RSA keys of at least 2048 bits.
  - X.509 v3; no `issuerUniqueID` or `subjectUniqueID`.
  - Only end-entity certificates sign claims, time-stamps and OCSP responses: Basic Constraints `cA` not asserted and `keyCertSign` not set.
  - Authority Key Identifier in every non-self-signed certificate; Subject Key Identifier in CA certificates (should in end-entity).
  - Key Usage present (should be critical), with `digitalSignature` for claim signers.
  - End-entity certificates have a non-empty EKU without `anyExtendedKeyUsage`. A certificate for `id-kp-timeStamping` or `id-kp-OCSPSigning` holds exactly one of them and no other purpose.
- Chain building (§ 14.5.1.2): a certificate in the private credential store is accepted as is; otherwise build and validate per RFC 5280 § 6 against the trust anchors for the purpose. A claim signer must carry at least one EKU the validator has trust anchors for, and only those anchors are used.
- To stay compatible with older validators, a signer certificate can also carry `id-kp-emailProtection` or `id-kp-documentSigning` next to `c2pa-kp-claimSigning` (§ 14.4.1).

## Time-stamps (§ 10.3.2.5)

- Obtain an RFC 3161 time-stamp when possible; without one, a manifest stops being valid once the signing certificate expires or is revoked. A manifest holds only one time-stamp.
- Use the v2 payload: the `signature` field of the `COSE_Sign1_Tagged`, as the full serialized `bstr`. The `MessageImprint` hashes the `ToBeSigned` of a `Sig_structure` with context `CounterSignature`, using an allowed hash (preferably the claim signature's). Set `certReq`.
- Store it in the unprotected header `sigTst2` as a `tstContainer`. The v1 `sigTst` header and v1 payload are deprecated: generators do not write them, validators still process them.
- A time-stamp added later goes in a `c2pa.time-stamp` assertion in an update manifest ([`assertions.md`](assertions.md)).

## Revocation (§ 14.5.2, § 10.3.2.6)

- Use OCSP (RFC 6960) with stapling; claim generators never use CRLs.
- If the signer's certificate has an Authority Information Access extension, query its OCSP responder before signing and store the responses in the unprotected header `rVals` as `{ "ocspVals": [ bstr, … ] }`. Do the same for intermediate CAs. Stapled responses are validated per RFC 6960 § 3.2.
- Stapling revocation information requires a time-stamp. A `c2pa.certificate-status` assertion carries OCSP responses added later.

## Validator trust configuration (§ 14.4)

- Keep, per accepted EKU, a list of trust anchor configurations: the certificate plus optional `notBefore` and `notAfter`. They are compared with the time-stamp time, or the current time if there is none (§ 14.4.1).
- For `c2pa-kp-claimSigning` (1.3.6.1.4.1.62558.2.1) the list includes the C2PA Trust List. Users should be able to add anchors for that EKU or for others, such as `id-kp-emailProtection` (1.3.6.1.5.5.7.3.4) or `id-kp-documentSigning` (1.3.6.1.5.5.7.3.36).
- Keep a separate list of TSA trust anchors that includes the C2PA TSA Trust List (§ 14.4.2).
- A private credential store is optional: it starts empty, changes only on user request, trusts signer certificates directly, never acts as a CA or trust anchor, and is never used for time-stamps (§ 14.4.3).

## C2PA Trust List and Conformance Program

- The trust lists are published in the `c2pa-org/conformance-public` repository under `trust-list/` as `C2PA-TRUST-LIST.json` / `.pem` and `C2PA-TSA-TRUST-LIST.json` / `.pem`. The JSON is a list of trusted entities (`LoTE`) with `ListIssueDateTime` and `NextUpdate`; the copy read here was issued 2026-08-05 with next update 2027-08-05.
- The C2PA Trust List holds root or subordinate CAs that issue claim signing certificates to conforming Generator Products under the C2PA Certificate Policy (Conformance Program v0.2).
- The Interim Trust List was frozen on 1 January 2026 and has been retired. Content signed while an ITL certificate was valid stays valid; validators may distinguish ITL-based credentials, typically tied to C2PA 1.4, from ones under the C2PA Trust List (c2pa.org/conformance).
- The Conformance Program evaluates Generator Products, Validator Products and Certification Authorities. Conforming products appear on the C2PA Conforming Products List, and only instances of conforming Generator Products can get claim signing certificates from a CA on the C2PA Trust List.
- Assurance Levels 1 and 2 are in operation. The level is carried in the `c2pa-al` (1.3.6.1.4.1.62558.3) certificate extension and is at most the product's Max Assurance Level.
- Program v0.2 (from 2026-07-31) accepts spec 2.2 and 2.4; v0.1 (2025-06-02 to 2026-10-09) supported 2.2; the minimum is 2.2. Deprecating a supported spec version comes with at least 90 days' notice.
- Conforming Validator Products shall regularly refresh the C2PA Trust List.
- Additional Conformance Requirements v0.2:
  - `specVersion` in `claim_generator_info` for spec 2.4 and later;
  - `allActionsIncluded` for 2.2 and 2.4;
  - the `digitalSourceType` rules in [`assertions.md`](assertions.md);
  - a validation test harness that takes an asset, a test C2PA Trust List, a test TSA Trust List and a validation time, and returns crJSON results.
