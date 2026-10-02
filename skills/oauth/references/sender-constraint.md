# Sender-constrained tokens: DPoP and mTLS

A sender-constrained token only works together with proof of a key the client holds, so a stolen token alone is useless. RFC 9700 § 2.2.1 says authorization servers and resource servers SHOULD use sender-constrained access tokens, through mTLS (RFC 8705) or DPoP (RFC 9449). Refresh tokens for public clients MUST be sender-constrained or rotated (RFC 9700 § 2.2.2).

## DPoP (RFC 9449)

### The proof

The client sends a fresh DPoP proof JWT in the `DPoP` header of every request (§ 4.2):

- Header: `typ` is `dpop+jwt`; `alg` is an asymmetric signature algorithm, never `none` and never a MAC; `jwk` is the public key and MUST NOT contain a private key.
- Claims: `jti` (unique, for example at least 96 bits of pseudorandom data or a version 4 UUID), `htm` (the HTTP method), `htu` (the target URI without query and fragment), `iat`, `ath` when an access token is sent (base64url SHA-256 of the token value), and `nonce` when the server supplied one.

```json
{
  "typ": "dpop+jwt",
  "alg": "ES256",
  "jwk": { "kty": "EC", "crv": "P-256", "x": "…", "y": "…" }
}
```

```json
{
  "jti": "e1j3V_bKic8-LAEB",
  "htm": "GET",
  "htu": "https://api.example.com/invoices",
  "iat": 1790000000,
  "ath": "fUHyO2r2Z3DZ53EsNrWBb0xWXoaNy59IiKCAqksmQEo"
}
```

The request to a resource server uses the `DPoP` scheme (§ 7.1):

```http
GET /invoices HTTP/1.1
Host: api.example.com
Authorization: DPoP Kz~8mXK1EalYznwH-LC-1fBAo.4Ljp~zsPE_NeO.gxU
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7…
```

### Checks on every request

A server MUST check all of these (§ 4.3), in any order:

1. There is at most one `DPoP` header.
2. Its value is one well-formed JWT.
3. All required claims are present.
4. `typ` is `dpop+jwt`.
5. `alg` is a registered asymmetric signature algorithm, not `none`, supported, and allowed by local policy.
6. The signature verifies with the key in `jwk`.
7. `jwk` contains no private key.
8. `htm` matches the request method.
9. `htu` matches the request URI, ignoring query and fragment. Normalize both before comparing, as § 4.3 recommends.
10. If the server issued a nonce, `nonce` matches it.
11. The proof's creation time (`iat`, or the time inside a server nonce) is inside an acceptable window.
12. At a resource server: `ath` equals the hash of the presented access token, and the token is bound to the same key as the proof.

The binding in step 12 is the token's `cnf.jkt`: the RFC 7638 SHA-256 JWK thumbprint of the proof key (§ 6.1). An introspection response carries the same `cnf.jkt`. The RS MUST NOT grant access unless every check passes (§ 7.1).

### Replay and nonces

- Accept proofs only for a short time after creation, on the order of seconds or minutes (§ 11.1).
- To block replay within that window, remember each `jti` per target URI while the proof is still acceptable. Reject oversized `jti` values or store only their hash (§ 11.1).
- A resource server can require a nonce: answer 401 with `WWW-Authenticate: DPoP error="use_dpop_nonce"` and a `DPoP-Nonce` header (§ 9). Nonces are only valid at the server that issued them.

### Downgrade

A resource that supports both `Bearer` and `DPoP` MUST reject a DPoP-bound token presented as a bearer token (§ 7.2). Otherwise an attacker who steals the token skips the proof.

### Binding the authorization code

The client can send `dpop_jkt` (the thumbprint of its DPoP key) in the authorization request. The AS then MUST reject a token request whose DPoP proof key does not match (§ 10).

## mTLS certificate-bound tokens (RFC 8705)

- The token carries `cnf` with `x5t#S256`: the base64url SHA-256 hash of the DER-encoded client certificate, without padding (§ 3.1).
- The RS MUST obtain the client certificate from the mutually authenticated TLS connection and verify that its hash matches the token's `x5t#S256`. On a mismatch, answer 401 with `invalid_token` (§ 3).
- A resource advertises support with `tls_client_certificate_bound_access_tokens` in its RFC 9728 metadata.

```json
{
  "iss": "https://as.example.com",
  "aud": "https://api.example.com",
  "cnf": { "x5t#S256": "bwcK0esc3ACC3DB2Y5_lESsXE8o9ltc05O89jdN-dg2" }
}
```

## Choosing

- Use DPoP when TLS client authentication is not available or not practical. RFC 9449 § 1 names single-page applications as a case where mTLS cannot be used, and native apps as clients that benefit from DPoP.
- Use mTLS when the client already authenticates to the AS with certificates (RFC 8705 also defines mTLS client authentication) and the server that validates the token sees the client certificate.
- Advertise the choice in metadata: `dpop_bound_access_tokens_required` or `tls_client_certificate_bound_access_tokens` (RFC 9728 § 2).
