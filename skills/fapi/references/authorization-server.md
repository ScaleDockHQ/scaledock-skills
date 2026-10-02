# Authorization server requirements (FAPI 2.0 Security Profile)

Section numbers refer to the FAPI 2.0 Security Profile (Final, 22 February 2025) unless another document is named.

## Profiled specifications (§5.3.1)

FAPI 2.0 profiles RFC 6749 (OAuth 2.0), RFC 6750 (bearer usage), RFC 7636 (PKCE), RFC 8705 (mTLS), RFC 9449 (DPoP), RFC 9126 (PAR), RFC 8414 (AS metadata), RFC 9207 (`iss` response parameter) and OpenID Connect Core.

## Network layer (§5.2)

- Use TLS 1.2 or later and follow BCP 195. Check certificates per RFC 9525. DNSSEC should be used (§5.2.1).
- With TLS 1.2, allow only the cipher suites BCP 195 recommends (§5.2.2).
- Endpoints used by browsers must prevent TLS stripping, for example with HSTS preloading (§5.2.3).
- The authorization endpoint does not support CORS (§5.2.3).
- When mTLS endpoint aliases are used, clients signal it with the `use_mtls_endpoint_aliases` client metadata (§5.2.2.1).

## General AS requirements (§5.3.2.1)

| Rule                   | Detail                                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Metadata               | Publish metadata via OpenID Connect Discovery or RFC 8414.                                                                                 |
| Grants                 | Reject the resource owner password credentials grant.                                                                                      |
| Clients                | Support confidential clients only.                                                                                                         |
| Sender-constraining    | Issue only sender-constrained access tokens, using mTLS (RFC 8705) or DPoP (RFC 9449).                                                     |
| Client authentication  | Authenticate clients with mTLS (RFC 8705 §2) or `private_key_jwt` (OpenID Connect Core §9).                                                |
| Client assertion `aud` | Accept only the issuer identifier, as a single string, as the audience of a `private_key_jwt` assertion.                                   |
| Redirectors            | Do not expose open redirectors.                                                                                                            |
| Refresh tokens         | Do not use refresh token rotation, except in extraordinary circumstances (Note 1).                                                         |
| DPoP nonces            | Optional for the AS.                                                                                                                       |
| Authorization codes    | Maximum lifetime of 60 seconds.                                                                                                            |
| DPoP code binding      | Support DPoP authorization code binding (RFC 9449 §10.1) when DPoP is supported.                                                           |
| Clock skew             | Accept JWTs whose `iat` or `nbf` is 0 to 10 seconds in the future. Reject JWTs whose `iat` or `nbf` is more than 60 seconds in the future. |
| Privilege              | Grant the least privilege needed.                                                                                                          |

Note 2 of §5.3.2.1 says only the authorization code flow and CIBA were security-analysed. Do not add other grants under a FAPI 2.0 label.

## Authorization endpoint and PAR (§5.3.2.2)

- Support only `response_type=code`.
- Require PAR (RFC 9126) for every authorization request, with client authentication at the PAR endpoint. Reject authorization requests that were not pushed, and pushed requests without client authentication.
- Require PKCE with `S256`.
- Require `redirect_uri` in the PAR request.
- Return `iss` in the authorization response (RFC 9207).
- Do not accept `http` redirect URIs, except loopback redirects for native apps (RFC 8252 §7.3).
- Reject an authorization code that was already used.
- Do not redirect with HTTP 307. Use 303.
- The `expires_in` of a PAR `request_uri` is under 600 seconds.
- Support a `nonce` of up to 64 characters.
- The notes in this section say:
  - A `request_uri` is enforced as one-time use at the point of authorization.
  - `state` is not used for CSRF protection, because PKCE covers it.
  - Rich Authorization Requests (RFC 9396) are recommended for fine-grained authorization (Note 5).

## User identification (§5.3.2.3)

When the AS identifies the user to the client, it uses OpenID Connect.

## Example: PAR request and response

The client authenticates with `private_key_jwt` and binds the code to a DPoP key.

```http
POST /par HTTP/1.1
Host: as.example.com
Content-Type: application/x-www-form-urlencoded
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7Li4ufX0...

response_type=code
&client_id=s6BhdRkqt3
&redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb
&scope=accounts
&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
&code_challenge_method=S256
&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer
&client_assertion=eyJhbGciOiJQUzI1NiIsImtpZCI6IjEifQ...
```

```http
HTTP/1.1 201 Created
Content-Type: application/json
Cache-Control: no-cache, no-store

{
  "request_uri": "urn:ietf:params:oauth:request_uri:6esc_11ACC5bwc014ltc14eY22c",
  "expires_in": 60
}
```

The authorization response then carries `iss`:

```http
HTTP/1.1 303 See Other
Location: https://client.example.org/cb?code=SplxlOBeZQQYbYS6WxSbIA&iss=https%3A%2F%2Fas.example.com
```

## Example: metadata a FAPI 2.0 AS publishes

These are RFC 8414 field names. The values show one valid configuration.

```json
{
  "issuer": "https://as.example.com",
  "authorization_endpoint": "https://as.example.com/authorize",
  "token_endpoint": "https://as.example.com/token",
  "pushed_authorization_request_endpoint": "https://as.example.com/par",
  "require_pushed_authorization_requests": true,
  "jwks_uri": "https://as.example.com/jwks",
  "response_types_supported": ["code"],
  "grant_types_supported": ["authorization_code", "refresh_token"],
  "code_challenge_methods_supported": ["S256"],
  "token_endpoint_auth_methods_supported": [
    "private_key_jwt",
    "tls_client_auth"
  ],
  "token_endpoint_auth_signing_alg_values_supported": ["PS256", "ES256"],
  "dpop_signing_alg_values_supported": ["PS256", "ES256"],
  "tls_client_certificate_bound_access_tokens": true,
  "authorization_response_iss_parameter_supported": true
}
```

## Token lifetimes and refresh (§6.1)

The security considerations recommend short-lived access tokens combined with refresh tokens instead of long-lived access tokens. Because refresh tokens are sender-constrained or bound to an authenticated confidential client, rotation is not needed (§5.3.2.1 Note 1).

## Checklist

- [ ] Metadata is published and its `issuer` matches the URL it was fetched from.
- [ ] PAR is required; PKCE S256 is required; only `code` is supported.
- [ ] Client authentication is mTLS or `private_key_jwt`, and assertion `aud` is the issuer string.
- [ ] Access tokens and refresh tokens are sender-constrained.
- [ ] Codes live at most 60 seconds and are single use; `request_uri` lives under 600 seconds.
- [ ] `iss` is returned; 303 is used; no `http` redirect URIs except native loopback.
- [ ] The JWT clock tolerance is 10 seconds accepted and more than 60 seconds rejected.
