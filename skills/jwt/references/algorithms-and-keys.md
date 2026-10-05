# Algorithms and keys

Which algorithms to allow, how keys are written down, and how to fingerprint them. Section numbers refer to the sources pinned in the skill's `## Sources`. "8725bis" is draft-ietf-oauth-rfc8725bis-10.

## Signature algorithms

The IANA "JSON Web Signature and Encryption Algorithms" registry records an implementation requirement for each `alg`. As of the registry update of 2026-09-29:

| `alg`                                 | Registry requirement | Notes                                                                                                                                                  |
| ------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ES256`                               | Recommended+         | ECDSA with P-256. A good default for new deployments.                                                                                                  |
| `RS256`                               | Recommended          | RSASSA-PKCS1-v1_5 signatures, unaffected by the `RSA1_5` deprecation. RFC 9068 § 2.1 requires access token issuers and resource servers to support it. |
| `PS256`                               | Optional             | RSASSA-PSS.                                                                                                                                            |
| `Ed25519`                             | Optional             | Fully specified Ed25519 signatures (RFC 9864 § 2.2).                                                                                                   |
| `Ed448`                               | Optional             | Fully specified Ed448 signatures (RFC 9864 § 2.2).                                                                                                     |
| `ML-DSA-44`, `ML-DSA-65`, `ML-DSA-87` | Optional             | Post-quantum ML-DSA (FIPS 204) signatures with `kty: AKP` keys (RFC 9964 § 5, § 8.1.4).                                                                |
| `EdDSA`                               | Deprecated           | Polymorphic identifier deprecated by RFC 9864 § 4.1.2.                                                                                                 |
| `HS256`                               | Required             | HMAC with a shared secret. Only when issuer and verifier share a secret.                                                                               |
| `none`                                | Optional             | Unsecured. The deprecation draft asks IANA to mark it Deprecated; the registry has not changed yet.                                                    |

Rules:

- Allow only cryptographically current algorithms that meet the application's needs, and design for algorithm agility (8725bis § 3.2).
- New deployments SHOULD prefer fully specified identifiers: `Ed25519` rather than `EdDSA` (8725bis § 3.2). In the registry, "Deprecated" means new deployments should use the replacement; "Prohibited" means it MUST NOT be used (RFC 9864 § 4.4).
- `ES256` and the other ECDSA identifiers were already fully specified (RFC 9864 § 2.1).
- Libraries SHOULD sign ECDSA deterministically (RFC 6979) where that is reasonably implementable (8725bis § 3.2).

### Post-quantum signatures: ML-DSA (RFC 9964)

RFC 9964 registers three JWS `alg` values for ML-DSA and a new key type, `AKP` (Algorithm Key Pair):

| `alg`       | Public key | Signature  | Private key in the JWK |
| ----------- | ---------- | ---------- | ---------------------- |
| `ML-DSA-44` | 1312 bytes | 2420 bytes | 32-byte seed           |
| `ML-DSA-65` | 1952 bytes | 3309 bytes | 32-byte seed           |
| `ML-DSA-87` | 2592 bytes | 4627 bytes | 32-byte seed           |

Sizes are before base64url encoding (RFC 9964 § 5, Table 1).

- Choose ML-DSA when signatures must stay unforgeable against a future quantum attacker and every verifier supports it. Its keys and signatures are much larger than `ES256` or `Ed25519`, so it may not suit deployments that need small tokens, low bandwidth or little memory (RFC 9964 § 5). Pick the parameter set by required security strength: `ML-DSA-44`, `ML-DSA-65` or `ML-DSA-87` follow FIPS 204 Table 1 (RFC 9964 § 5).
- The ML-DSA context string `ctx` MUST be empty (RFC 9964 § 5). Only pure ML-DSA is registered; HashML-DSA is not (RFC 9964 § 7.2).
- An `AKP` key MUST carry `alg`, MUST carry `pub`, and MUST NOT carry `priv` when it is a public key (RFC 9964 § 3). The ML-DSA `priv` MUST be the 32-byte seed; the expanded private key is not representable (RFC 9964 § 4).
- Validate all algorithm-related key parameters when the algorithm calls for key validation, including the seed length (RFC 9964 § 7.3). Mismatched `pub` and `priv` values can cause anything from failures to private key compromise (RFC 9964 § 7.4).
- Thumbprints for `AKP` keys use `alg`, `kty` and `pub` (RFC 9964 § 6); see [Thumbprints](#thumbprints-rfc-7638).

### PQ/T composite signatures (draft, posture track)

`draft-ietf-jose-pq-composite-sigs-04` combines ML-DSA with ECDSA or EdDSA in one signature that is valid only if both components verify (§ 4.3). It proposes `ML-DSA-44-ES256`, `ML-DSA-65-ES256`, `ML-DSA-87-ES384`, `ML-DSA-44-Ed25519`, `ML-DSA-65-Ed25519` and `ML-DSA-87-Ed448`, with composite keys in the `AKP` key type (§ 3, § 5.1).

- Posture **track**: these identifiers are only requested from IANA, not registered (§ 7.1). Recognise them in review, but do not put them on a production allow-list or issue them.
- The design goal is that a forger must break both ML-DSA and the traditional component (§ 6.1). Component keys MUST NOT be reused standalone or in another combination (§ 6.2).
- Applications that need SUF-CMA security or non-repudiation MUST NOT use composite ML-DSA (§ 6.4). Replay protection still comes from `exp`, `nbf` and `jti` (§ 6.4).

### `none` and `RSA1_5`

draft-ietf-jose-deprecate-none-rsa15-06 (in IETF Last Call) deprecates `none` for JWS and `RSA1_5` for JWE (§ 5):

- Application developers MUST disable both by default.
- An application with a specific need MAY enable one, but only for the objects or operations that need it, never globally.
- New specifications MUST NOT allow either.
- Both become Deprecated, not Prohibited, in the IANA registry (§ 5, § 7.1).

This matches existing rules: implementations MUST NOT accept unsecured JWSs by default (RFC 7518 § 3.6), and libraries MUST NOT generate or consume `none` unless the caller explicitly asks (8725bis § 3.2).

## Key strength

- HMAC (`HS256` and up): the key MUST be at least as long as the hash output, for example 256 bits for `HS256` (RFC 7518 § 3.2). Do not use a human-memorable password as the key (RFC 8725 § 3.5).
- RSA: keys of 2048 bits or more MUST be used (RFC 7518 § 3.3).
- Generate keys with enough entropy (RFC 8725 § 3.5).

## Encryption (JWE)

- Prefer RSAES-OAEP to RSA-PKCS1 v1.5 key encryption (8725bis § 3.2). `RSA-OAEP` is Recommended+ in the registry; `RSA1_5` is still listed as Recommended- until the deprecation draft is published.
- Validate ECDH-ES inputs: reject ephemeral public keys that are not valid points on the chosen curve (RFC 8725 § 3.4).
- Avoid compressing data before encryption (RFC 8725 § 3.6). The `zip` header turns on compression (RFC 7516 § 4.1.3).
- When you must accept `zip`, cap the decompressed size; libraries commonly use a few hundred kilobytes (8725bis § 3.15).
- For PBES2, reject a `p2c` iteration count above 1,200,000 unless your own threat analysis says otherwise (8725bis § 3.13).

### HPKE for JWE (draft, posture build)

`draft-ietf-jose-hpke-encrypt-22` is approved and in the RFC Editor queue, and IANA registered its `alg` values on 2026-09-29. It updates RFC 7516 and defines two key management modes (§ 4):

| Mode                  | `alg` values                                                                 | `enc`               | Header                                        |
| --------------------- | ---------------------------------------------------------------------------- | ------------------- | --------------------------------------------- |
| Integrated Encryption | `HPKE-0` to `HPKE-7`                                                         | MUST NOT be present | No `ek`; exactly one recipient (§ 5)          |
| Key Encryption        | `HPKE-0-KE`, `HPKE-1-KE`, `HPKE-2-KE`, `HPKE-3-KE`, `HPKE-5-KE`, `HPKE-7-KE` | As in RFC 7516      | `ek` MUST carry the encapsulated secret (§ 6) |

- Each identifier is fully specified: it fixes the HPKE KEM, KDF and AEAD (§ 5.1, § 6.2). P-256, P-384 and P-521 keys use `kty: EC`; X25519 and X448 keys use `kty: OKP` (§ 9, Table 3).
- Use HPKE only when sender and recipient both opt in; `RSA-OAEP` and ECDH-ES stay the defaults. Key Encryption recipients can sit next to `ECDH-ES+A128KW` or `RSA-OAEP-256` recipients in the JSON Serialization, and the content is then only as strong as the weakest recipient algorithm (§ 6, § 10.1).
- Do not tell JWS and JWE apart by the presence of `enc`: Integrated Encryption has no `enc`, and the draft deletes that test from RFC 7516 § 9 (§ 8). Count the segments or use the other RFC 7516 § 9 methods.
- Use one KEM key pair with one mode and one HPKE suite. Do not use the same key with both HPKE and non-HPKE algorithms such as `ECDH-ES` (§ 10.1).
- Base mode does not authenticate the sender; sign the content, or use PSK mode with `psk_id`, when the recipient must know who sent it (§ 10).
- The draft depends on `draft-ietf-hpke-hpke`, which is not yet an RFC. Cite it by draft name and revision.

## JSON Web Keys (RFC 7517)

| Member    | Meaning                                                                     | Source         |
| --------- | --------------------------------------------------------------------------- | -------------- |
| `kty`     | Key type, such as `RSA`, `EC`, `oct`, `OKP` or `AKP`. MUST be present.      | RFC 7517 § 4.1 |
| `use`     | `sig` or `enc`.                                                             | RFC 7517 § 4.2 |
| `key_ops` | Allowed operations, such as `sign` and `verify`. Do not combine with `use`. | RFC 7517 § 4.3 |
| `alg`     | The one algorithm this key is for.                                          | RFC 7517 § 4.4 |
| `kid`     | Key ID, distinct within a JWK Set, matched against the JOSE header `kid`.   | RFC 7517 § 4.5 |

- A JWK Set is a JSON object whose `keys` member is an array of JWKs (RFC 7517 § 5).
- Set `alg` on every published key, so verifiers can enforce one key, one algorithm (RFC 8725 § 3.1).
- Ed25519 and Ed448 keys use `kty: OKP` with `crv` and `x`; the private key adds `d` (RFC 8037 § 2). RFC 9864 keeps that key format and only changes `alg` (RFC 9864 § 5).
- ML-DSA keys use `kty: AKP` with a required `alg`, a public `pub` and, in private keys only, a `priv` seed (RFC 9964 § 3, § 4).

```json
{
  "keys": [
    {
      "kty": "EC",
      "crv": "P-256",
      "alg": "ES256",
      "use": "sig",
      "kid": "2026-09-ec",
      "x": "…",
      "y": "…"
    },
    {
      "kty": "OKP",
      "crv": "Ed25519",
      "alg": "Ed25519",
      "use": "sig",
      "kid": "2026-09-ed",
      "x": "…"
    }
  ]
}
```

## Thumbprints (RFC 7638)

A JWK thumbprint is a stable hash of a public key:

1. Keep only the required members for the key type, in lexicographic order. For `EC`: `crv`, `kty`, `x`, `y`. For `RSA`: `e`, `kty`, `n` (§ 3.2). For `OKP`: `crv`, `kty`, `x` (RFC 8037 § 2). For `AKP`: `alg`, `kty`, `pub` (RFC 9964 § 6).
2. Serialize as JSON with no whitespace (§ 3).
3. Hash the UTF-8 bytes, normally with SHA-256, and base64url-encode the result.

```json
{ "crv": "P-256", "kty": "EC", "x": "…", "y": "…" }
```

Thumbprints are useful as `kid` values and as key bindings.

## Key confirmation (`cnf`)

A JWT can say which key its presenter holds with the `cnf` claim (RFC 7800 § 3). Members:

- `jwk`: the public key itself (RFC 7800 § 3.2).
- `jwe`: an encrypted symmetric key (RFC 7800 § 3.3).
- `kid`: a key ID (RFC 7800 § 3.4).
- `jku`: a JWK Set URL (RFC 7800 § 3.5).
- `jkt`: the SHA-256 JWK thumbprint of a DPoP key (RFC 9449 § 6.1).
- `x5t#S256`: the SHA-256 hash of an mTLS client certificate (RFC 8705 § 3.1).

A resource server that receives a token with `cnf.jkt` or `cnf.x5t#S256` MUST check the matching DPoP proof or TLS client certificate (RFC 9449 § 7.1; RFC 8705 § 3). The `oauth` skill covers both.
