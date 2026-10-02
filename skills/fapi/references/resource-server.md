# Resource server requirements (FAPI 2.0 Security Profile)

Section numbers refer to the FAPI 2.0 Security Profile (SP, Final, 22 February 2025) unless another document is named.

## Requirements (§5.3.4)

- Accept access tokens only in the `Authorization` header: `Bearer` per RFC 6750 §2.1 for mTLS-bound tokens, `DPoP` per RFC 9449 §7.1 for DPoP-bound tokens.
- Do not accept access tokens in the query string.
- Verify that the token is valid, unaltered, unexpired and not revoked.
- Verify that the token grants enough access for the request. If it does not, answer with an RFC 6750 §3.1 error: `invalid_request`, `invalid_token` or `insufficient_scope`.
- Support and verify mTLS sender-constraining, DPoP sender-constraining or both.

## Sender-constraint checks

**DPoP (RFC 9449 §4.3, §7.1).** The RS checks that:

- There is exactly one `DPoP` header, holding a well-formed JWT with `typ` `dpop+jwt`.
- `alg` is an asymmetric algorithm the profile allows, and never `none`.
- The signature verifies with the header `jwk`, and that `jwk` contains no private key.
- `htm` and `htu` match the request.
- `iat` (or the server-issued `nonce`) falls within the acceptable window.
- `ath` equals the base64url SHA-256 hash of the access token.
- The token's `cnf.jkt` equals the JWK SHA-256 thumbprint of the proof key.

**mTLS (RFC 8705 §3).** The token's `cnf` has `x5t#S256`, the SHA-256 thumbprint of the client certificate. The RS compares it with the certificate presented on the TLS connection.

## Framework-neutral TypeScript sketch

The JWT signature check is delegated to whatever JOSE library the project uses. This sketch shows only the FAPI-specific decisions.

```ts
type Decision =
  | { ok: true; subject: string }
  | { ok: false; status: 400 | 401 | 403; error: string };

interface TokenClaims {
  sub: string;
  exp: number;
  scope?: string;
  cnf?: { jkt?: string; "x5t#S256"?: string };
}

interface RequestFacts {
  url: URL;
  authorization?: string;
  dpopThumbprint?: string; // JWK thumbprint of a DPoP proof that already passed RFC 9449 §4.3
  dpopAth?: string;
  accessTokenHash: (token: string) => string;
  clientCertThumbprint?: string; // from the TLS layer
}

export function authorize(
  req: RequestFacts,
  verifyToken: (token: string) => TokenClaims | null,
  requiredScope: string,
  now: number,
): Decision {
  if (req.url.searchParams.has("access_token")) {
    return { ok: false, status: 400, error: "invalid_request" };
  }
  const [scheme, token] = (req.authorization ?? "").split(" ");
  if (!token || (scheme !== "DPoP" && scheme !== "Bearer")) {
    return { ok: false, status: 401, error: "invalid_token" };
  }
  const claims = verifyToken(token);
  if (!claims || claims.exp <= now)
    return { ok: false, status: 401, error: "invalid_token" };

  const jkt = claims.cnf?.jkt;
  const x5t = claims.cnf?.["x5t#S256"];
  if (jkt) {
    if (
      scheme !== "DPoP" ||
      req.dpopThumbprint !== jkt ||
      req.dpopAth !== req.accessTokenHash(token)
    ) {
      return { ok: false, status: 401, error: "invalid_token" };
    }
  } else if (x5t) {
    if (req.clientCertThumbprint !== x5t)
      return { ok: false, status: 401, error: "invalid_token" };
  } else {
    return { ok: false, status: 401, error: "invalid_token" }; // FAPI 2.0 forbids unbound tokens
  }

  if (!(claims.scope ?? "").split(" ").includes(requiredScope)) {
    return { ok: false, status: 403, error: "insufficient_scope" };
  }
  return { ok: true, subject: claims.sub };
}
```

If the RS uses introspection instead of self-contained tokens, the same `cnf` checks apply to the introspection response. FAPI 2.0 Message Signing §5.5 adds signed introspection responses (RFC 9701) as an option.

## Checklist

- [ ] Query-string tokens are rejected.
- [ ] A token with no `cnf` binding is rejected.
- [ ] A DPoP-bound token without a valid proof, or with a different key, is rejected.
- [ ] An mTLS-bound token presented over a connection with a different certificate is rejected.
- [ ] Error responses use the RFC 6750 §3.1 codes.
