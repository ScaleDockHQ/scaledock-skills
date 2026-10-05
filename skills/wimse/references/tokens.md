# Workload Identity Token and Workload Proof Token

Read this when issuing or validating a Workload Identity Token (WIT), or sending or validating a Workload Proof Token (WPT). Sources: `draft-ietf-wimse-workload-creds-02` (`creds`) and `draft-ietf-wimse-wpt-02` (`wpt`), both posture build. The other way to prove possession of a WIT, HTTP Message Signatures, is in [`http-signature-and-mtls.md`](http-signature-and-mtls.md).

## Workload Identity Token (creds § 5.1)

A WIT is a JWS-signed JWT, issued by the Identity Server, that binds a public key to one Workload Identifier. It is for application-layer protocols; the X.509 Workload Identity Certificate is its transport-layer counterpart (creds § 1).

JOSE header:

| Member | Rule                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------ |
| `alg`  | An asymmetric JWS signature algorithm from the IANA JOSE registry; `none` MUST NOT be used.      |
| `typ`  | `wit+jwt` (explicit typing per RFC 8725 § 3.11; media type `application/wit+jwt`, creds § 11.1). |
| `kid`  | Optional; when present, selects the key in the trust domain's anchors (creds § 3).               |

Claims:

| Claim     | Rule                                                                                                                                                                                                                                    |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sub`     | Required. The single Workload Identifier (creds § 4, id § 4).                                                                                                                                                                           |
| `exp`     | Required. WITs are short-lived, typically hours (creds § 9.2.1).                                                                                                                                                                        |
| `cnf.jwk` | Required. The workload's public key (RFC 7800 § 3.2), with an `alg` member: the algorithm every proof MUST use. Not `none`, not a symmetric algorithm, not an encryption algorithm. General-purpose implementations MUST support ES256. |
| `iss`     | RECOMMENDED, for audit. Validators are not required to use it; identity comes from `sub` (creds § 5.1.3).                                                                                                                               |
| `jti`     | OPTIONAL. Useful for audit and revocation.                                                                                                                                                                                              |

The WIT MUST NOT be used as a bearer token and is not intended for the `Authorization` header (creds § 5.1, § 9.2). It travels in the `Workload-Identity-Token` header field, whose value is a compact JWT (creds § 5.1.1):

```http
Workload-Identity-Token: eyJhbGciOiJFUzI1NiIsImtpZCI6Ikp1bmUgNSIsInR5cCI6IndpdCtqd3QifQ.eyJjbmYiOnsi...
```

Decoded example (creds § 5.1, Figures 3 and 4): header `{"alg":"ES256","kid":"June 5","typ":"wit+jwt"}`, claims:

```json
{
  "cnf": {
    "jwk": {
      "alg": "EdDSA",
      "crv": "Ed25519",
      "kty": "OKP",
      "x": "1CXXvflN_LVVsIsYXsUvB03JmlGWeCHqQVuouCF92bg"
    }
  },
  "exp": 1745512510,
  "iat": 1745508910,
  "jti": "x-_1CTL2cca3CSE4cwb_l",
  "sub": "wimse://example.com/specific-workload"
}
```

The Identity Server signs with ES256; the workload proves possession with EdDSA, because `cnf.jwk.alg` says so.

### Validating a WIT (creds § 3, § 5.1.3, § 9.1)

1. Parse the JWS; reject `none` and any `alg` not accepted for the trust domain (creds § 3, RFC 8725).
2. Check `typ` is `wit+jwt`.
3. Take the trust domain from `sub` and look up its trust anchors in out-of-band configuration. Select the key by `kid`; without `kid`, policy must make the choice unambiguous (for example, one key). Anchors may hold several keys for rotation.
4. Never fetch keys from a URL found only in the token. If `iss` is an `https` URL used for key distribution (for example `jwks_uri` from RFC 8414 metadata), the issuer and its metadata must be configured out of band, and validators MUST enforce an allowlist of issuers (creds § 5.1.3, § 9.1).
5. Verify the signature, then `exp`.
6. Validate `sub` as a Workload Identifier (creds § 1.3 requires the id § 4.1 rules) and check its trust domain is expected (id § 7.3).
7. Require a proof of possession under `cnf.jwk` before using the identity (creds § 5.1, § 9.2).

The current drafts cross-reference "Section 5.1.4 of workload-creds" for WIT validation (wpt § 2, httpsig § 3), but workload-creds-02 has no § 5.1.4; the rules are in creds § 3 and § 5.1. Re-check when workload-creds is revised.

### Errors (creds § 5.2)

A WIT that fails validation gets an error, typically 400 with an optional RFC 9457 problem body. 401 is NOT RECOMMENDED for WIT failures, because it implies a `WWW-Authenticate` challenge and an `Authorization` header that the WIT does not use. When the WIT is paired with a WPT, the WPT's 401 rule applies to WPT failures (wpt § 2.1, below).

### Extra claims (creds § 5.1.2, wpt § 2.3)

Private claim names are NOT RECOMMENDED. In closed environments, add collision-resistant names such as `example.com/myclaim`; outside them, register claims with IANA first. Recipients MUST ignore claims they do not understand.

### Moving from bearer JWTs (creds § 5.3)

Because the WIT has its own header field, a workload can accept bearer tokens and WITs during a migration, per caller, then disable bearer tokens for identity. The choice of token is made before the caller is authenticated, so re-check it after authentication. A WIT can sit next to a transaction token: the WIT decides which APIs the caller may call, the context token which resources.

### Keys and lifetime (creds § 9.4, § 9.2.1)

The private key MUST be kept private, bound to one Workload Identifier, and not used after the credential expires; it SHOULD be regenerated per credential. WITs are not generally revocable, so short expiry is the main defence against a stolen WIT and key.

## Workload Proof Token (wpt § 2)

A WPT is a short-lived JWT signed with the WIT's private key. It is protocol-independent; this draft defines its HTTP use (wpt § 1).

It is sent in the `Authorization` field with the `WPT` scheme (token68 syntax, scheme name case-insensitive):

```text
credentials = "WPT" 1*SP token68
```

JOSE header: `alg` MUST match `cnf.jwk.alg` of the WIT; `typ` is `wpt+jwt` (media type `application/wpt+jwt`, wpt § 4.2).

Claims:

| Claim | Rule                                                                                                                                                                                                                                       |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `aud` | SHOULD be the HTTP target URI without query or fragment; a deployment-specific value when rewriting makes that impractical.                                                                                                                |
| `exp` | Required. MUST be short: minutes or seconds.                                                                                                                                                                                               |
| `jti` | Required. Negligible collision probability, for example 128 bits of pseudorandom data, base64url-encoded.                                                                                                                                  |
| `wth` | Required. base64url(SHA-256(ASCII bytes of the WIT)).                                                                                                                                                                                      |
| `tth` | Required when a Txn-Token is in the request. base64url(SHA-256(the Txn-Token)).                                                                                                                                                            |
| `oth` | Required when other end-user or authorization context tokens are in the request. A JSON object: lowercased header field name to base64url(SHA-256(field value, trimmed)). Repeated fields are unsupported unless a profile says otherwise. |

Example request (wpt § 2, Figure 5, values shortened):

```http
POST /path HTTP/1.1
Host: workload.example.com
Content-Type: application/json
Workload-Identity-Token: eyJhbGciOiJFUzI1NiIsImtpZCI6Ikp1bmUgNSIsInR5cCI6IndpdCtqd3QifQ...
Authorization: WPT eyJhbGciOiJFZERTQSIsInR5cCI6IndwdCtqd3QifQ...

{"do stuff":"please"}
```

with WPT claims:

```json
{
  "aud": "https://workload.example.com/path",
  "exp": 1745510016,
  "jti": "__bwc4ESC3acc2LTC1-_x",
  "wth": "X9wiPgq3jlSGzAegHCGhNO1lJgUbDoI1Mjkat5QHJB0"
}
```

### Validating a WPT (wpt § 2)

First validate the WIT (above). Then:

1. Exactly one `Authorization` field, using the `WPT` scheme, holding one well-formed JWT.
2. `alg` string-equals `cnf.jwk.alg` of the WIT, and the signature verifies with `cnf.jwk`.
3. `typ` is `wpt+jwt`.
4. `aud` matches the target URI, or an accepted alias or normalization, ignoring query and fragment. Allowed authorities come from trusted configuration; `Host` and `X-Forwarded-Host` MUST NOT be used (wpt § 3.1.7).
5. `exp` is present and not passed; an `exp` unreasonably far ahead SHOULD be rejected.
6. `wth` matches the hash of the `Workload-Identity-Token` value.
7. RECOMMENDED: `jti` not seen before within the validity window, per sender (wpt § 3.1.4).
8. `tth` matches the Txn-Token, and `oth` matches each listed token. An `oth` entry the recipient does not understand rejects the WPT; tokens not covered by `oth` MUST NOT drive authorization.

### Errors (wpt § 2.1)

Credential failures SHOULD get 401 with a challenge, `WWW-Authenticate: WPT` (no parameters are defined). Use 400 for errors not about the credentials. Either may carry an RFC 9457 body.

### Bearer tokens and other tokens (wpt § 2.2)

- A request carries one `Authorization` field, so a WPT request cannot also carry `Bearer` or `Basic` credentials there.
- A recipient MUST NOT use a bearer token in the same request to authenticate or authorize the calling workload; that would reduce the request to its weakest credential.
- Context tokens in their own fields, such as `Txn-Token`, stay usable and are bound with `tth` or `oth`.
- `Proxy-Authorization` is separate and not covered by the WPT.

### Security (wpt § 3)

- Send WIT and WPT only over server-authenticated TLS, with host name validation by the client (§ 3.1.1).
- Keep the proof short-lived, scoped to one target and ideally one transaction; reject proofs outside their validity (§ 3.1.2, § 3.1.3).
- Replay caches are per validator and can be bypassed if an attacker picks the cluster member (§ 3.1.4).
- MUST NOT log raw WPTs by default (§ 3.1.5).
- The WPT does not protect most of the request or the response, so it does not stop a malicious middlebox; HTTP signatures cover more (§ 3.3, httpsig Appendix B).
- The key MUST be private, individual per Workload Identifier, unused after the WIT expires, and SHOULD be individual per WIT and not reused for other purposes (§ 3.2).

## Common mistakes

- Sending the WIT alone, or in `Authorization: Bearer`. It needs a proof and its own header field.
- Hashing the decoded WIT for `wth`; the hash is over the ASCII token string as sent.
- Taking the proof algorithm from the WPT header instead of from the WIT's `cnf.jwk.alg`.
- Checking `aud` against the incoming `Host` header behind a proxy.
- Still sending `Workload-Proof-Token` or `ath` from wpt-01; see the upgrade in [`versions.md`](versions.md).
