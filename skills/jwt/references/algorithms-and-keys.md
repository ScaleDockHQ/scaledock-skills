# Algorithms and keys

Which algorithms to allow, how keys are written down, and how to fingerprint them. Section numbers refer to the sources pinned in the skill's `## Sources`. "8725bis" is draft-ietf-oauth-rfc8725bis-10.

## Signature algorithms

The IANA "JSON Web Signature and Encryption Algorithms" registry records an implementation requirement for each `alg`. As of the registry update of 2026-09-29:

| `alg`     | Registry requirement | Notes                                                                                                                                                  |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ES256`   | Recommended+         | ECDSA with P-256. A good default for new deployments.                                                                                                  |
| `RS256`   | Recommended          | RSASSA-PKCS1-v1_5 signatures, unaffected by the `RSA1_5` deprecation. RFC 9068 § 2.1 requires access token issuers and resource servers to support it. |
| `PS256`   | Optional             | RSASSA-PSS.                                                                                                                                            |
| `Ed25519` | Optional             | Fully specified Ed25519 signatures (RFC 9864 § 2.2).                                                                                                   |
| `Ed448`   | Optional             | Fully specified Ed448 signatures (RFC 9864 § 2.2).                                                                                                     |
| `EdDSA`   | Deprecated           | Polymorphic identifier deprecated by RFC 9864 § 4.1.2.                                                                                                 |
| `HS256`   | Required             | HMAC with a shared secret. Only when issuer and verifier share a secret.                                                                               |
| `none`    | Optional             | Unsecured. The deprecation draft asks IANA to mark it Deprecated; the registry has not changed yet.                                                    |

Rules:

- Allow only cryptographically current algorithms that meet the application's needs, and design for algorithm agility (8725bis § 3.2).
- New deployments SHOULD prefer fully specified identifiers: `Ed25519` rather than `EdDSA` (8725bis § 3.2). In the registry, "Deprecated" means new deployments should use the replacement; "Prohibited" means it MUST NOT be used (RFC 9864 § 4.4).
- `ES256` and the other ECDSA identifiers were already fully specified (RFC 9864 § 2.1).
- Libraries SHOULD sign ECDSA deterministically (RFC 6979) where that is reasonably implementable (8725bis § 3.2).

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

## JSON Web Keys (RFC 7517)

| Member    | Meaning                                                                     | Source         |
| --------- | --------------------------------------------------------------------------- | -------------- |
| `kty`     | Key type, such as `RSA`, `EC`, `oct` or `OKP`. MUST be present.             | RFC 7517 § 4.1 |
| `use`     | `sig` or `enc`.                                                             | RFC 7517 § 4.2 |
| `key_ops` | Allowed operations, such as `sign` and `verify`. Do not combine with `use`. | RFC 7517 § 4.3 |
| `alg`     | The one algorithm this key is for.                                          | RFC 7517 § 4.4 |
| `kid`     | Key ID, distinct within a JWK Set, matched against the JOSE header `kid`.   | RFC 7517 § 4.5 |

- A JWK Set is a JSON object whose `keys` member is an array of JWKs (RFC 7517 § 5).
- Set `alg` on every published key, so verifiers can enforce one key, one algorithm (RFC 8725 § 3.1).
- Ed25519 and Ed448 keys use `kty: OKP` with `crv` and `x`; the private key adds `d` (RFC 8037 § 2). RFC 9864 keeps that key format and only changes `alg` (RFC 9864 § 5).

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

1. Keep only the required members for the key type, in lexicographic order. For `EC`: `crv`, `kty`, `x`, `y`. For `RSA`: `e`, `kty`, `n` (§ 3.2). For `OKP`: `crv`, `kty`, `x` (RFC 8037 § 2).
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
