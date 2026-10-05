# Algorithms and keys

Read this when choosing a signature algorithm, implementing `HTTP_SIGN` and `HTTP_VERIFY`, deciding how the verifier learns the algorithm, or handling keys. Sources: RFC 9421 § 3.3, § 6.2, § 7.3 and Appendix B (sections cited bare), and the IANA HTTP Signature Algorithms registry.

## The primitives

- `HTTP_SIGN(M, Ks) -> S`: sign the signature base bytes `M` with the signing key `Ks`, giving bytes `S` (§ 3.3).
- `HTTP_VERIFY(M, Kv, S) -> V`: verify `S` over the rebuilt base `M` with the verification key `Kv`, giving a Boolean (§ 3.3).
- Any algorithm that suits the key, environment and parties MAY be used (§ 3.3). When it is signalled with `alg`, the value MUST come from the HTTP Signature Algorithms registry (§ 3.3).

## Registered algorithms

The IANA registry (last updated 2026-07-20) lists exactly the six initial entries, all Active:

| `alg`               | Algorithm                                                                                                     | Output                                                              | Deterministic | Section |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------- | ------- |
| `rsa-pss-sha512`    | RSASSA-PSS (RFC 8017), MGF1 with SHA-512, salt length 64 bytes, hash SHA-512                                  | RSA signature bytes                                                 | no            | § 3.3.1 |
| `rsa-v1_5-sha256`   | RSASSA-PKCS1-v1_5 (RFC 8017), hash SHA-256                                                                    | RSA signature bytes                                                 | not stated    | § 3.3.2 |
| `hmac-sha256`       | HMAC (RFC 2104) with SHA-256 and the shared key; verify by comparing the computed MAC with the received bytes | HMAC output bytes                                                   | yes           | § 3.3.3 |
| `ecdsa-p256-sha256` | ECDSA (FIPS 186-5) on P-256, hash SHA-256                                                                     | 64 bytes: `r` then `s`, each big-endian unsigned, zero-padded to 32 | no            | § 3.3.4 |
| `ecdsa-p384-sha384` | ECDSA (FIPS 186-5) on P-384, hash SHA-384                                                                     | 96 bytes: `r` then `s`, each big-endian unsigned, zero-padded to 48 | no            | § 3.3.5 |
| `ed25519`           | Ed25519 (RFC 8032 § 5.1.6, § 5.1.7) over the base with no prehash                                             | 64 bytes: `R` then `S`                                              | yes           | § 3.3.6 |

Notes:

- The ECDSA output is the raw fixed-length `r || s` concatenation, not an ASN.1 DER structure; convert if the crypto library produces DER (§ 3.3.4, § 3.3.5).
- RSA-PSS and ECDSA give a different signature each time. Verify with the algorithm's verification function; never re-sign and compare (§ 3.3.1, § 3.3.4, § 7.3.5). HMAC and Ed25519 are deterministic, so their Appendix B test signatures can be reproduced exactly.
- Algorithm names are whole strings, not parts to parse: `rsa-pss-sha512` does not imply that `rsa-pss-sha256` exists (§ 6.2).

## Registry statuses

- **Active**: fully specified, security understood (§ 6.2.1).
- **Provisional**: fully specified, security not yet known or proven. It does not mean insecure (§ 6.2, § 6.2.1).
- **Deprecated**: known security issues; a warning to weigh, not a ban (§ 6.2, § 6.2.1).
- Registration is Specification Required. The registry is not exhaustive and does not imply fitness for a particular application (§ 6.2).

## JWS algorithms

- An application MAY use a JOSE algorithm from the JSON Web Signature and Encryption Algorithms registry (RFC 7518). The whole base is the JWS Signing Input; there is no JOSE header and no base64 step; the output is the raw signature bytes before base64url (§ 3.3.7).
- The JWS algorithm MUST NOT be `none` and MUST NOT be one with the JOSE requirement "Prohibited" (§ 3.3.7).
- JWA names are not registry values, so `alg` is not used at all; signal the algorithm through the JWK or another JOSE mechanism (§ 3.3.7).

## How the verifier decides the algorithm

From § 3.2 step 6:

1. Start from the application's allowed set. Anything outside it fails.
2. Use the algorithm known from configuration or protocol negotiation, if any.
3. Use the algorithm attached to the key material (for example a JWK `alg`), if any.
4. Use `alg` from the signature parameters, if present.
5. If more than one source gives an algorithm, they MUST be the same, or verification MUST fail.

RFC 9421 encourages static configuration or a higher-level protocol over runtime `alg`, so an attacker cannot substitute the algorithm (§ 7.3.6). An application can forbid `alg` entirely when the key fixes the algorithm (§ 3.2.1).

## Key handling

- `keyid` is a String the application resolves to key material; key distribution is out of scope of RFC 9421 (§ 1.4, § 2.3, § 3.2 step 5). The verifier MUST fail for a key it does not know or trust for the request (§ 3.2 step 5).
- Check that the key and algorithm are appropriate for this message, not just that the signature verifies (§ 7.3.4).
- **Downgrades.** The same RSA key works for RSA-PSS and RSA v1.5; if a key is meant for RSA-PSS, reject v1.5 signatures with it. If an asymmetric algorithm is expected, never verify with HMAC, which would use the public key as the shared secret (§ 7.3.6).
- **Symmetric keys.** With HMAC, a verifier can also sign, so a compromised verifier can impersonate signers. Prefer asymmetric algorithms or key agreement; protect secret distribution, isolate verification in a separate module, or derive per-message keys (§ 7.3.3).
- **Key theft.** Protect signing keys, rotate them, and use key storage that limits exposure (§ 7.3.2).
- **Collisions.** Use only vetted keys and algorithms; the registry is one source of trusted algorithms (§ 7.3.1).
- **Tracking.** One key reused across verifiers or over time identifies the signer; use separate keys per verifier where that matters (§ 8.1).
- **Test keys.** `test-key-rsa`, `test-key-rsa-pss`, `test-key-ecc-p256`, `test-key-ed25519` and `test-shared-secret` in Appendix B.1 MUST NOT be used outside testing (Appendix B.1).

## Test vectors

Appendix B.2 signs this request and response with the Appendix B.1 keys:

| Case  | Algorithm           | Covers                                                                     |
| ----- | ------------------- | -------------------------------------------------------------------------- |
| B.2.1 | `rsa-pss-sha512`    | nothing (empty list), with `nonce`: shows why an empty list is discouraged |
| B.2.2 | `rsa-pss-sha512`    | `@authority`, `content-digest`, `@query-param;name="Pet"`, `tag`           |
| B.2.3 | `rsa-pss-sha512`    | `date`, `@method`, `@path`, `@query`, `@authority`, content fields         |
| B.2.4 | `ecdsa-p256-sha256` | a response: `@status` and content fields                                   |
| B.2.5 | `hmac-sha256`       | `date`, `@authority`, `content-type`                                       |
| B.2.6 | `ed25519`           | `date`, `@method`, `@path`, `@authority`, `content-type`, `content-length` |

B.2.5 must reproduce `Signature: sig-b25=:pxcQw6G3AjtMBQjwo8XzkZf/bws5LelbaMk5rGIGtE8=:` exactly with `test-shared-secret`, because HMAC is deterministic (Appendix B.2.5). Appendix B.4 shows which transformations keep a signature valid (adding uncovered fields, collapsing repeated lines, reordering different fields) and which break it (changing the method or authority, reordering lines of the same field).
