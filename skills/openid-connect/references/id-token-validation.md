# ID token validation, keys, subject types and UserInfo

Sources: OpenID Connect Core 1.0 incorporating errata set 2 (Core), OpenID Connect Discovery 1.0 incorporating errata set 2 (Discovery).

## ID token claims (Core § 2)

| Claim       | Rule                                                                                                                                                                                                             |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `iss`       | REQUIRED. Case-sensitive `https` URL with scheme and host, optional port and path, and no query or fragment.                                                                                                     |
| `sub`       | REQUIRED. Locally unique within the issuer and never reassigned. At most 255 ASCII characters, case-sensitive.                                                                                                   |
| `aud`       | REQUIRED. MUST contain the RP's `client_id`. It can be a single string or an array.                                                                                                                              |
| `exp`       | REQUIRED. The token MUST NOT be accepted for processing on or after this time. A small leeway for clock skew is allowed.                                                                                         |
| `iat`       | REQUIRED. Issue time.                                                                                                                                                                                            |
| `auth_time` | REQUIRED when `max_age` was sent or `auth_time` was requested as an essential claim. Otherwise OPTIONAL.                                                                                                         |
| `nonce`     | If present, the client MUST verify it equals the value it sent. If the request had a `nonce`, the OP MUST include it unchanged.                                                                                  |
| `acr`       | OPTIONAL. `"0"` means the authentication did not meet ISO/IEC 29115 level 1, and level 0 SHOULD NOT authorize access to anything of monetary value. Values SHOULD be absolute URIs or RFC 6711 registered names. |
| `amr`       | OPTIONAL. Array of method identifiers. Values SHOULD be registered in the IANA AMR registry.                                                                                                                     |
| `azp`       | OPTIONAL. The party the token was issued to.                                                                                                                                                                     |

Unknown claims MUST be ignored (Core § 2). ID tokens MUST be signed with JWS. If they are also encrypted, they are signed first and then encrypted (Core § 2). They SHOULD NOT use the `x5u`, `x5c`, `jku` or `jwk` header parameters; keys come from discovery or registration (Core § 2).

## Validation order (Core § 3.1.3.7)

The client MUST validate the ID token from the token response in this order:

1. If the token is encrypted, decrypt it with the keys and algorithms the client registered. If encryption was negotiated and the token is not encrypted, the RP SHOULD reject it.
2. `iss` MUST exactly match the Issuer Identifier for the OP, which the client normally obtains from discovery.
3. `aud` MUST contain the client's `client_id`. Reject the token if it does not list the client, or if it lists additional audiences the client does not trust.
4. If the request was made for an extension that uses `azp`, validate it as that extension requires. The client MAY check that `azp` equals its `client_id`.
5. For a token received directly from the token endpoint, TLS server validation MAY replace signature validation. Otherwise, the client MUST validate the JWS signature with the algorithm in `alg` and the issuer's keys.
6. `alg` SHOULD be the default RS256 or the `id_token_signed_response_alg` sent at registration. For HS256, HS384 or HS512, the key is the UTF-8 octets of the `client_secret`. MAC behavior with multiple audiences is unspecified.
7. The current time MUST be before `exp`.
8. `iat` MAY be used to reject tokens issued too long ago. The acceptable range is client-specific.
9. If a `nonce` was sent, the claim MUST be present and its value checked against the sent value. The client SHOULD check the `nonce` for replay.
10. If `acr` was requested, the client SHOULD check that the asserted value is appropriate.
11. If `auth_time` was requested, explicitly or by sending `max_age`, the client SHOULD check it and request re-authentication if too much time has passed.

Although step 5 allows TLS to stand in for the signature, verifying the signature anyway keeps one code path for every flow.

### Flow-specific rules

- **Implicit flow:** `nonce` is REQUIRED (Core § 3.2.2.10). The client MUST validate the signature and MUST check the `nonce` (Core § 3.2.2.11). `at_hash` is REQUIRED when the authorization endpoint also returns an access token (`id_token token`) (Core § 3.2.2.10).
- **Hybrid flow:** if a `nonce` was sent, the OP MUST include it in an ID token from the authorization endpoint (Core § 3.3.2.11). If `c_hash` is present, the client MUST check that it matches the code (Core § 3.3.2.10).
- **Code flow:** `at_hash` is OPTIONAL. If present, the client MAY validate the access token with it (Core § 3.1.3.6, § 3.1.3.8).

### at_hash and c_hash (Core § 3.1.3.6, § 3.3.2.11)

The value is the base64url encoding of the left-most half of the hash of the ASCII token or code. The hash algorithm is the one in the ID token's `alg`, for example SHA-256 for RS256 or ES256.

```ts
// Framework-neutral sketch. `hashName` is derived from the ID token alg: "SHA-256" for *256, and so on.
async function leftHalfHash(
  value: string,
  hashName: "SHA-256" | "SHA-384" | "SHA-512",
): Promise<string> {
  const digest = new Uint8Array(
    await crypto.subtle.digest(hashName, new TextEncoder().encode(value)),
  );
  const half = digest.slice(0, digest.length / 2);
  return btoa(String.fromCharCode(...half))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
```

### Claims check sketch

Run this after the signature has been verified with a key selected by `kid` from the issuer's JWK Set.

```ts
type IdTokenClaims = {
  iss: string;
  sub: string;
  aud: string | string[];
  exp: number;
  iat: number;
  nonce?: string;
  azp?: string;
  auth_time?: number;
  acr?: string;
  amr?: string[];
};

type Expected = {
  issuer: string; // the validated discovery `issuer`
  clientId: string;
  trustedAudiences?: string[];
  nonce?: string; // the value sent in the authentication request
  maxAgeSeconds?: number; // the max_age sent, if any
  acceptableAcr?: string[];
  leewaySeconds?: number;
  now?: number; // seconds since the epoch
};

function checkIdTokenClaims(c: IdTokenClaims, e: Expected): void {
  const now = e.now ?? Math.floor(Date.now() / 1000);
  const leeway = e.leewaySeconds ?? 60;
  if (c.iss !== e.issuer) throw new Error("iss mismatch");
  const aud = Array.isArray(c.aud) ? c.aud : [c.aud];
  if (!aud.includes(e.clientId)) throw new Error("client_id not in aud");
  const trusted = new Set([e.clientId, ...(e.trustedAudiences ?? [])]);
  if (aud.some((a) => !trusted.has(a))) throw new Error("untrusted audience");
  if (c.azp !== undefined && c.azp !== e.clientId)
    throw new Error("azp is not this client");
  if (now >= c.exp + leeway) throw new Error("expired");
  if (e.nonce !== undefined && c.nonce !== e.nonce)
    throw new Error("nonce mismatch");
  if (e.maxAgeSeconds !== undefined) {
    if (c.auth_time === undefined)
      throw new Error("auth_time required with max_age");
    if (now - c.auth_time > e.maxAgeSeconds + leeway)
      throw new Error("re-authentication required");
  }
  if (
    e.acceptableAcr &&
    (c.acr === undefined || !e.acceptableAcr.includes(c.acr))
  ) {
    throw new Error("acr not acceptable");
  }
}
```

The `azp` check is the optional one from step 4. Drop it if the deployment uses an extension that defines `azp` differently.

## Keys and rotation

- The OP publishes its signing keys at `jwks_uri` (Discovery § 3). When both signing and encryption keys are present, every key MUST have `use` (Discovery § 3).
- Signers put `kid` in the JOSE header. A verifier that sees an unknown `kid` re-fetches `jwks_uri`. The OP SHOULD keep decommissioned signing keys published for a while so verification keeps working (Core § 10.1.1).

## The identity key (Core § 5.7)

- The `sub` and `iss` pair is the only claim combination an RP can rely on as a stable identifier for the End-User.
- `email`, `phone_number`, `preferred_username` and `name` MUST NOT be used as unique identifiers, because they can change and can be reused.

## Subject identifier types (Core § 8)

- `public` gives the same `sub` to every client. It is the default when the OP's discovery document has no `subject_types_supported`.
- `pairwise` gives a different `sub` per Sector Identifier, which prevents correlation across RPs (Core § 8).
- Discovery MUST list `subject_types_supported` (Discovery § 3).
- With pairwise, the OP MUST calculate a unique `sub` per Sector Identifier, and the value MUST NOT be reversible by any party other than the OP (Core § 8.1).
- The Sector Identifier is the host of the registered `redirect_uri`, or of the `sector_identifier_uri` when one is registered. A client with several redirect hosts needs a `sector_identifier_uri` (Core § 8.1).
- Two clients that share a Sector Identifier see the same pairwise `sub`. Account linking across clients only works inside one sector.

## UserInfo (Core § 5.3)

- The `sub` claim MUST always be returned (Core § 5.3.2).
- The `sub` in the UserInfo response MUST be verified to exactly match the `sub` in the ID token. If they do not match, the UserInfo values MUST NOT be used (Core § 5.3.2). This defends against token substitution (Core § 16.11).
- The client MUST verify the OP through TLS server certificate checks. If the response is signed, the client SHOULD validate the signature; if it is encrypted, it decrypts it first (Core § 5.3.4).

## Requesting claims

- Scopes `profile`, `email`, `address` and `phone` request groups of standard claims (Core § 5.4).
- The `claims` request parameter asks for individual claims in the ID token or at UserInfo, as essential or voluntary (Core § 5.5).
- If `acr` is requested as essential with `values`, the OP MUST return one of those values or treat the authentication as failed. If it is not essential, the OP SHOULD return the `acr` that was satisfied (Core § 5.5.1.1). Using both `acr_values` and the `claims` parameter for `acr` gives an unspecified result (Core § 5.5.1.1).

## Nonce (Core § 15.5.2)

One stateless pattern is to store a random value in an HttpOnly session cookie and send a hash of it as the `nonce`. The RP then recomputes the hash and compares it with the `nonce` in the ID token.
