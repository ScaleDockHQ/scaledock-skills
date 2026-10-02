# FAPI 1.0 (legacy) and migrating to FAPI 2.0

FAPI 1.0 Part 1 (Baseline) and Part 2 (Advanced) are both Final, dated 12 March 2021. The FAPI WG strongly recommends FAPI 2.0 for new ecosystems (FAPI WG specifications page). Use this file only when an ecosystem still mandates FAPI 1.0, or to plan a migration.

## FAPI 1.0 Part 1: Baseline

Authorization server (Part 1 §5.2.2):

- Supports confidential clients, and should support public clients.
- Authenticates confidential clients with mTLS, `client_secret_jwt` or `private_key_jwt`.
- Requires RSA keys of at least 2048 bits and EC keys of at least 160 bits.
- Requires PKCE with `S256`.
- Requires pre-registered redirect URIs and the `redirect_uri` parameter, matched exactly against the registered values.
- Requires redirect URIs to use `https`.
- Rejects a reused authorization code.
- Should issue access tokens that live under 10 minutes unless they are sender-constrained.
- Supports OpenID Connect Discovery, and may support RFC 8414 metadata.
- Requires `nonce` when the `openid` scope is requested (§5.2.2.2), and `state` otherwise (§5.2.2.3).

Public clients (§5.2.3):

- Use PKCE `S256` and a separate redirect URI for each authorization server.
- Implement effective CSRF protection.
- Send `openid` and `nonce` when a persistent user identifier is wanted. Otherwise send `state`, and check that the granted scope equals, or is a subset of, the requested scope.
- Use only AS metadata from the well-known metadata document.

Confidential clients (§5.2.4) meet the public-client rules, and additionally:

- Support mTLS plus `client_secret_jwt` or `private_key_jwt` at the token endpoint.
- Use RSA keys of at least 2048 bits and EC keys of at least 160 bits.
- Check that a client secret has at least 128 bits when symmetric cryptography is used.

Resource server (Part 1 §6.2.1):

- Does not accept access tokens in the query string.
- Sets the `x-fapi-interaction-id` response header to the request's value, or to a new RFC 4122 UUID if none was sent, and logs it.
- Does not reject requests because of an `x-fapi-customer-ip-address` header.

Client headers to the resource server (§6.2.2), all optional:

- `x-fapi-auth-date`: the last time the customer logged in, as an HTTP-date.
- `x-fapi-customer-ip-address`: the customer's IP address.
- `x-fapi-interaction-id`: a UUID for the interaction.

## FAPI 1.0 Part 2: Advanced

Advanced adds integrity and sender-constraining on top of Baseline.

- **Front-channel protection**:
  - The ID token works as a detached signature, with `s_hash` (§5.1.1).
  - Or JARM is used (§5.1.2).
- **Authorization server** (§5.2.2):
  - Requires a signed request object, and uses only the parameters inside it.
  - Requires `exp` no more than 60 minutes after `nbf`, `nbf` no more than 60 minutes in the past, and `aud` equal to the issuer.
  - Supports `response_type` `code id_token`, or `code` with `response_mode=jwt`.
  - Issues only mTLS sender-constrained access tokens.
  - Authenticates clients with `tls_client_auth`, `self_signed_tls_client_auth` or `private_key_jwt`.
  - Does not support public clients.
  - May support PAR. When PAR is used, it requires PKCE `S256`.
  - Uses the ID token as a detached signature when `code id_token` is used (§5.2.2.1).
  - Uses JARM rules when `code` with JARM is used (§5.2.2.2).
- **Resource server** (§6.2.1): adheres to RFC 8705 mTLS sender-constraining.
- **Algorithms** (§8.6, §8.6.1):
  - JWS uses PS256 or ES256, should not use RS256, and never uses `none`.
  - JWE does not use `RSA1_5`.
- **Certification** (§8.7): implementers should use the OpenID conformance suite.

## Differences from FAPI 2.0 (FAPI 2.0 SP §5.5, Table 1)

| FAPI 1.0 Advanced                          | FAPI 2.0                          | Reason given                                                                                                  |
| ------------------------------------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| JAR                                        | PAR                               | Integrity protection and compatibility for authorization requests.                                            |
| JARM                                       | Only `code` in the response       | The response holds only the code, so it needs no integrity protection.                                        |
| Defences against particular threats        | Attacker model and security goals | Clearer design and suitability for formal analysis.                                                           |
| `s_hash`                                   | PKCE                              | PKCE gives the CSRF protection `state` gave; PAR partly protects `state` integrity.                           |
| Pre-registered redirect URIs               | Redirect URIs in PAR              | Pre-registration is not required with client authentication and PAR.                                          |
| `code id_token` or `code`                  | `code` only                       | No ID token in the front channel; clients cannot skip PKCE the way they could skip nonce or signature checks. |
| ID token as detached signature             | PKCE                              | The ID token no longer serves as a detached signature.                                                        |
| Possibly encrypted front-channel ID tokens | No front-channel ID tokens        | ID tokens travel only in the back channel.                                                                    |
| `nbf` and `exp` in the request object      | Limited `request_uri` lifetime    | Prevents pre-generated requests.                                                                              |
| `x-fapi-*` headers                         | Moved to implementation advice    | Not core to the security profile.                                                                             |
| mTLS sender-constraining                   | mTLS or DPoP                      | DPoP can be easier to deploy.                                                                                 |

Signed request objects and JARM remain available in FAPI 2.0 through Message Signing (see `message-signing.md`).

## Migration checklist

- [ ] Replace front-channel request objects with PAR. Keep JAR at the PAR endpoint only if Message Signing is adopted.
- [ ] Switch `code id_token` to `code` with PKCE S256 and the `iss` response parameter.
- [ ] Decide on mTLS or DPoP sender-constraining, and keep mTLS where it already works.
- [ ] Drop `client_secret_jwt` and public clients; keep `private_key_jwt` or mTLS.
- [ ] Shorten code lifetime to 60 seconds and `request_uri` lifetime to under 600 seconds.
- [ ] Raise EC key sizes to at least 224 bits and add the `none` and RS256 refusal checks.
- [ ] Keep the `x-fapi-*` headers only where the ecosystem profile still requires them.
