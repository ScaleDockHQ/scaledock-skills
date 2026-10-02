# Clients

How a client gets and uses tokens safely. Section numbers refer to the sources pinned in the skill's `## Sources`.

## Grants to use and avoid

- Use the authorization code grant with PKCE for anything involving a user.
- Use the client credentials grant when the client acts on its own behalf.
- Use the device authorization grant (RFC 8628) for devices without a browser or keyboard.
- Do not use the implicit grant; it SHOULD NOT be used (RFC 9700 § 2.1.2) and OAuth 2.1 drops it (draft -16 § 10.1).
- Do not use the resource owner password credentials grant; it MUST NOT be used (RFC 9700 § 2.4).

## Discover the authorization server

1. Call the resource. On a 401, read `resource_metadata` from `WWW-Authenticate` (RFC 9728 § 5.1). Otherwise build the URL from the resource identifier (RFC 9728 § 3).
2. Fetch the protected resource metadata. Check that `resource` equals the URL you started from; if not, MUST NOT use the metadata (RFC 9728 § 3.3).
3. Pick an AS from `authorization_servers`. How to decide that an AS is trustworthy is out of scope for RFC 9728 (§ 7.6), so apply your own allow-list.
4. Fetch `/.well-known/oauth-authorization-server`, inserted between the host and any path of the issuer (RFC 8414 § 3). The `issuer` in the response MUST be identical to the issuer you used, or the metadata MUST NOT be used (RFC 8414 § 3.3).

Treat metadata URLs as untrusted input: RFC 9728 § 7.7 warns about server-side request forgery when a server fetches them.

## Authorization code with PKCE

PKCE is required for public clients and recommended for confidential ones (RFC 9700 § 2.1.1). OAuth 2.1 makes `code_challenge` REQUIRED unless the client is confidential and the AS can rely on an OpenID Connect `nonce` (draft -16 § 4.1.1, § 7.5.1.1).

- Create a new `code_verifier` for every authorization request: 43 to 128 unreserved characters with high entropy (RFC 7636 § 4.1). Never reuse it after an error.
- Send `code_challenge` = base64url(SHA-256(verifier)) with `code_challenge_method=S256`. A client that can do S256 MUST use it (RFC 7636 § 4.2), and OAuth 2.1 drops `plain`.
- Protect against CSRF. PKCE is enough when the AS supports it; otherwise use a one-time `state` value bound to the user agent (RFC 9700 § 2.1).
- Register exact redirect URIs. The AS compares them by exact string match, except for the port of a localhost redirect in native apps (RFC 9700 § 2.1).

```http
GET /authorize?response_type=code
  &client_id=s6BhdRkqt3
  &redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb
  &scope=invoices%3Aread
  &resource=https%3A%2F%2Fapi.example.com
  &code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
  &code_challenge_method=S256
  &state=af0ifjsldkj HTTP/1.1
Host: as.example.com
```

```http
POST /token HTTP/1.1
Host: as.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA
&code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
&resource=https%3A%2F%2Fapi.example.com
```

## Check the issuer of the response

When a client talks to more than one AS, a mix-up defense is REQUIRED (RFC 9700 § 2.1). Use RFC 9207:

- The AS returns `iss` in every authorization response, including error responses (RFC 9207 § 2).
- Compare `iss` to the `issuer` in the metadata of the AS you sent the request to, by simple string comparison. On a mismatch, reject the response and do not redeem the code (RFC 9207 § 2.4).
- Remember per AS whether it supports `iss`, and reject responses without `iss` from one that does (RFC 9207 § 2.4). Support is advertised as `authorization_response_iss_parameter_supported` in AS metadata.

## Ask for audience-restricted tokens

Send `resource` with the absolute URI of the target resource, without a fragment and preferably without a query (RFC 8707 § 2). You may send several. The AS answers `invalid_target` if it refuses the resource. RFC 9728 § 7.4 recommends this so tokens cannot be replayed at other resources.

## Send and keep tokens

- Send access tokens only in the `Authorization` header. OAuth 2.1 says clients MUST NOT put them in the query (draft -16 § 5.1).
- Prefer sender-constrained tokens (RFC 9700 § 2.2.1). See [sender-constraint.md](sender-constraint.md).
- Refresh tokens issued to public clients are either sender-constrained or rotated on each use (RFC 9700 § 2.2.2). Expect the old refresh token to stop working after rotation.
- Authenticate confidential clients with asymmetric methods such as mTLS or `private_key_jwt` where possible (RFC 9700 § 2.5).

## React to challenges

| Challenge from the resource        | What the client does                                                                                        |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `invalid_token`                    | Refresh or obtain a new token, then retry once.                                                             |
| `insufficient_scope`               | Request a new token with the `scope` from the challenge.                                                    |
| `insufficient_user_authentication` | Start a new authorization request with the `acr_values` and/or `max_age` from the challenge (RFC 9470 § 4). |
| `use_dpop_nonce`                   | Retry with a new DPoP proof that carries the `DPoP-Nonce` value (RFC 9449 § 9).                             |

## Device authorization grant (RFC 8628)

1. POST to the device authorization endpoint. The response carries `device_code`, `user_code`, `verification_uri`, `expires_in`, and optionally `verification_uri_complete` and `interval` (§ 3.2).
2. Show the user the `user_code` and `verification_uri`.
3. Poll the token endpoint with `grant_type=urn:ietf:params:oauth:grant-type:device_code` and the `device_code` (§ 3.4). Wait `interval` seconds between polls, or 5 seconds if none was given.
4. Handle errors (§ 3.5): on `authorization_pending` keep polling; on `slow_down` add 5 seconds to the interval for all later polls; stop on `access_denied`, `expired_token` or any other error.

## Registration

- **Dynamic registration (RFC 7591).** POST JSON metadata to the registration endpoint over TLS (§ 3). Register redirect URIs for every redirect-based grant (§ 5). RFC 7592 adds read, update and delete at `registration_client_uri` with the `registration_access_token`; it is Experimental.
- **Client ID Metadata Document (draft).** The `client_id` is an HTTPS URL that serves the client's metadata. See [drafts.md](drafts.md).
