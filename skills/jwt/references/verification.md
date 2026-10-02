# Verification checklist

Run every step for every token. If any step fails, reject the token (RFC 7519 § 7.2). Section numbers refer to the sources pinned in the skill's `## Sources`. "8725bis" is draft-ietf-oauth-rfc8725bis-10.

## 1. Check the format

- A JWT is a compact serialization: only letters, digits, `-`, `_` and `.`. Anything else, especially braces and quotes, is not a JWT and MUST be rejected (8725bis § 3.14).
- Three segments mean a JWS and five mean a JWE (RFC 7516 § 9). Decide which one you expect before parsing. A library MUST let the caller tell unsecured, signed, encrypted and nested tokens apart (8725bis § 3.3).
- Base64url-decode the header with no padding, line breaks or whitespace, and require a valid UTF-8 JSON object (RFC 7519 § 7.2).
- Header names MUST be unique: reject duplicates, or use a parser that keeps only the last one (RFC 7515 § 4).

## 2. Check the header

- **`alg`.** It MUST be present and is case-sensitive (RFC 7515 § 4.1.1). Accept only algorithms on an explicit allow-list for this issuer and this kind of token (RFC 8725 § 3.1; 8725bis § 3.1). Compare case-sensitively; `none` and `None` are both outside the list (8725bis § 2.11). Never accept `none` by default (RFC 7518 § 3.6).
- **`crit`.** If it lists an extension you do not understand, the token is invalid (RFC 7515 § 4.1.11).
- **`typ`.** Require the explicit type of the token kind you expect, such as `at+jwt` for access tokens (RFC 8725 § 3.11; RFC 9068 § 4). Treat a `typ` without `/` as if `application/` were prepended (8725bis § 3.11). `typ: JWT` does not count as explicit typing (8725bis § 3.11).
- **Every other parameter** must be understood or defined as ignorable (RFC 7519 § 7.2).

## 3. Find the key

- Take the issuer's keys from configuration or from the issuer's metadata `jwks_uri` (RFC 8414; RFC 9068 § 4). The keys MUST belong to the token's `iss`; if not, reject (RFC 8725 § 3.8).
- Use `kid` only to pick a key from that trusted set. Treat `kid` as attacker input and sanitize it before any lookup, for example to prevent SQL or LDAP injection (8725bis § 3.10).
- Do not follow `jku` or `x5u` from the token unless the URL is on an allow-list. Without an allow-list, resolve the host and refuse loopback or local addresses (8725bis § 3.10).
- Each key is used with exactly one algorithm. The `alg` in the header MUST match the algorithm of the key found through `kid` (8725bis § 3.1).

## 4. Verify the cryptography

- Verify the signature or MAC with that key and that algorithm. If no key can be determined, validation fails (RFC 7515 § 6).
- Compare MACs in constant time (RFC 7518 § 3.2).
- For a nested JWT (`cty: JWT`), validate every layer, not just the outer one (RFC 7519 § 7.2 step 8; RFC 8725 § 3.3). The explicit `typ` belongs on the inner JWT (8725bis § 3.11).
- For a JWE, apply the encryption limits in [algorithms-and-keys.md](algorithms-and-keys.md): no `RSA1_5`, a cap on PBES2 `p2c`, a cap on decompressed size, and validated ECDH-ES inputs.

### Key confusion

The classic attack: a server expects RS256 and verifies with the issuer's RSA public key. The attacker sends `alg: HS256` and a MAC computed with that public key as the HMAC secret. A library that picks the algorithm from the header accepts it.

Three rules from the sources block this:

- The algorithm comes from your allow-list, not from the token (RFC 8725 § 3.1).
- The header `alg` must be consistent with the key that was looked up (8725bis § 3.1).
- One key, one algorithm (RFC 8725 § 3.1).

In code, store each key with its algorithm, and pass a fixed `algorithms` list to the verifier.

## 5. Check the claims

| Claim  | Rule                                                                                                                         | Source                           |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `iss`  | Exactly equal to the expected issuer, and the key belongs to it.                                                             | RFC 8725 § 3.8; RFC 9068 § 4     |
| `aud`  | Contains an identifier of this recipient; reject if absent when the issuer serves several audiences, or if no value matches. | RFC 7519 § 4.1.3; RFC 8725 § 3.9 |
| `exp`  | The current time is before it, with a small leeway for clock skew.                                                           | RFC 7519 § 4.1.4                 |
| `nbf`  | The current time is at or after it, with a small leeway.                                                                     | RFC 7519 § 4.1.5                 |
| `sub`  | Corresponds to a valid subject, or issuer-subject pair, for this application.                                                | RFC 8725 § 3.8                   |
| Others | Treat every value as attacker-provided input.                                                                                | 8725bis § 3.10                   |

If one issuer produces several kinds of JWT, write the validation rules so that each kind fails the others' rules: distinct `typ`, required claims, keys, `aud` or `iss` (RFC 8725 § 3.12).

## 6. Example with `jose`

Framework-neutral TypeScript with the `jose` library. The verifier fixes the algorithms, issuer, audience and type instead of trusting the token.

```ts
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";

const ISSUER = "https://as.example.com";
const AUDIENCE = "https://api.example.com";
const jwks = createRemoteJWKSet(new URL(`${ISSUER}/jwks`));
const COMPACT_JWS = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

export async function verifyAccessToken(token: string): Promise<JWTPayload> {
  if (!COMPACT_JWS.test(token)) throw new Error("not a compact JWS");
  const { payload } = await jwtVerify(token, jwks, {
    algorithms: ["ES256", "Ed25519"],
    issuer: ISSUER,
    audience: AUDIENCE,
    typ: "at+jwt",
    clockTolerance: 30,
    requiredClaims: ["exp", "iat", "sub", "client_id", "jti"],
  });
  return payload;
}
```

The `algorithms` list is the allow-list. `createRemoteJWKSet` selects the key by `kid` and `alg` and requires exactly one match. The JWKS URL is fixed in code, never read from the token.
