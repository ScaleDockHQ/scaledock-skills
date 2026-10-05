# Verification and security (RFC 9901)

Read this when building a Verifier, or the verification half of a Holder, and when reviewing an SD-JWT implementation. Section numbers are RFC 9901 unless stated.

## Verifier policy first

1. Decide whether Key Binding is required for this use case, before looking at the presentation. The decision MUST NOT depend on whether a KB-JWT was sent; otherwise an attacker strips the KB-JWT (§ 7.3 step 1, § 9.5).
2. If Key Binding is required and the presentation has no KB-JWT, reject it (§ 7.3 step 2).
3. Decide which claims are required to judge validity in this context (`exp`, `nbf`, `aud` and profile-specific ones) (§ 9.7).
4. Decide the expected `typ` of the Issuer-signed JWT, and check it (§ 9.11).

A Verifier expecting an SD-JWT MUST check that the last `~`-separated component is empty; one expecting an SD-JWT+KB MUST check that it is a valid KB-JWT (§ 4).

## Verifying the SD-JWT (§ 7.1)

Holders and Verifiers MUST run these steps:

1. Split into the Issuer-signed JWT and the Disclosures.
2. Validate the Issuer-signed JWT:
   1. The algorithm is acceptable for the application (RFC 8725 §§ 3.1 and 3.2); `none` MUST NOT be accepted.
   2. Validate the signature per RFC 7515 § 5.2.
   3. Validate the Issuer, and that the signing key belongs to it.
   4. `_sd_alg` is understood and acceptable under local policy.
3. Process the Disclosures:
   1. Hash each received Disclosure (§ 4.2.3).
   2. Find embedded digests: objects with an `_sd` array of strings, and array elements that are objects with the single key `...` holding a string.
   3. For each embedded digest, find the matching Disclosure. No match: ignore the digest (it is a decoy or withheld).
      - In `_sd`: the Disclosure MUST be a 3-element array, else reject; the claim name MUST NOT be `_sd` or `...`, else reject; the name MUST NOT already exist at that level, else reject. Insert the claim, then process its value recursively.
      - In an array: the Disclosure MUST be a 2-element array, else reject. Replace the element with the value and process it recursively.
   4. Remove array elements whose digest had no Disclosure.
   5. Remove every `_sd` key; an object left without properties becomes `{}`.
   6. Remove `_sd_alg`.
4. Reject if any digest appears more than once, directly or through Disclosures.
5. Reject if any Disclosure was not referenced by a digest, directly or through other Disclosures.
6. Check `nbf`, `exp`, `aud` and other validity claims in the processed payload. If a required validity claim is missing, reject.

If any step fails, the SD-JWT is invalid and processing MUST stop (§ 7.1). Only then is the "Processed SD-JWT Payload" handed to the application.

## Verifying Key Binding (§ 7.3)

When Key Binding is required, after § 7.1:

1. Get the Holder key from the SD-JWT (`cnf`, § 4.1.2). The KB-JWT MUST be verified with that key and no other (§ 4.3.2).
2. The algorithm is acceptable; `none` MUST NOT be accepted.
3. Validate the KB-JWT signature per RFC 7515 § 5.2.
4. `typ` is `kb+jwt`.
5. `iat` is within an acceptable window.
6. `nonce` and `aud` bind the KB-JWT to this transaction and this Verifier (replay detection).
7. Recompute `sd_hash` over the received Issuer-signed JWT and Disclosures (§ 4.3.1), and compare.
8. The KB-JWT is valid in all other respects per RFC 7519 and RFC 8725.

For the JWS JSON serialization, build the temporary compact form before hashing (§ 8.4, § 8.1).

## Security considerations

| Topic                    | Rule                                                                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Issuer signature         | Always check it; reject the SD-JWT if it cannot be verified (§ 9.1).                                                                     |
| Manipulated Disclosures  | Never insert Disclosure values without matching their digests. A naive verifier is insecure and also cannot place nested claims (§ 9.2). |
| Salt entropy             | Unrevealed salts must not be guessable; reuse or weak randomness lets a Verifier brute-force hidden values (§ 9.3).                      |
| Hash choice              | Preimage and second-preimage resistant; collision resistance matching the signature; no truncated hashes (§ 9.4).                        |
| Key Binding              | Without it, any holder of a copy can present the credential; decide the policy independently of the presentation (§ 9.5).                |
| Unknown binding formats  | Key Binding information may be in a format you do not recognize, so you may not be able to tell if it is supported (§ 9.5).              |
| Validity claims          | Assume security-critical claims might be selectively disclosable, and require them in step 6 (§ 9.7).                                    |
| Issuer keys              | Publish in a way that supports rotation and revocation, for example a JWKS; Verifiers must not use expired or revoked keys (§ 9.8).      |
| Disclosure set integrity | Only an SD-JWT+KB protects which Disclosures were sent (§ 9.10).                                                                         |
| Explicit typing          | Profiles should set `typ` (for example `example+sd-jwt`) and Verifiers check it, to stop cross-JWT confusion (§ 9.11).                   |
| Key management           | Secure generation, storage, rotation, revocation and disposal of keys (§ 9.12).                                                          |

## Privacy at the Verifier

- After verification, Verifiers SHOULD NOT store the Issuer-signed JWT or the Disclosures; keep the result and the needed data. Do not keep SD-JWTs longer than necessary, including in logs (§ 10.2).
- A revocation or status callback to the Issuer can reveal usage; use a mechanism that discloses minimal information, such as Token Status List, and watch for timing side channels (§ 10.1).

## Common mistakes

- Hashing the decoded JSON instead of the base64url string, or emitting hex digests (§ 4.2.3).
- Re-serializing a Disclosure before hashing (§ 4.2.1: the encoded string is what is signed).
- Accepting a presentation that dropped the final `~` (§ 4).
- Treating a received KB-JWT as the trigger for checking Key Binding (§ 9.5).
- Computing `sd_hash` over the issued SD-JWT instead of the presented one, or forgetting the trailing `~` (§ 4.3.1).
- Accepting `aud` arrays in the KB-JWT (§ 4.3).
- Leaving `_sd`, `...` objects or `_sd_alg` in the processed payload handed to the application (§ 7.1 steps 3.d to 3.f).
- Allowing unreferenced or duplicate Disclosures (§ 7.1 steps 4 and 5).
