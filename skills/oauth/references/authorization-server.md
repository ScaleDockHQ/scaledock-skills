# Authorization server

What an authorization server (AS) enforces and publishes. Section numbers refer to the sources pinned in the skill's `## Sources`.

## Authorization endpoint

- **Redirect URIs.** Compare by exact string match, with one exception: the port of a localhost redirect URI for native apps. Do not run open redirectors (RFC 9700 § 2.1).
- **PKCE.** The AS MUST support PKCE. If a request carried `code_challenge`, the AS MUST require a matching `code_verifier` at the token endpoint, and MUST prevent PKCE downgrade: a token request with `code_verifier` for a code issued without a challenge is rejected (RFC 9700 § 2.1.1). Publish `code_challenge_methods_supported`. Never downgrade to `plain` (RFC 7636 § 7.2).
- **Issuer in responses.** Include `iss` in every authorization response, including error responses (RFC 9207 § 2), and set `authorization_response_iss_parameter_supported: true` in metadata.
- **No implicit, no password grant.** The implicit grant SHOULD NOT be offered (RFC 9700 § 2.1.2). The resource owner password credentials grant MUST NOT be used (RFC 9700 § 2.4).
- **Transport.** Authorization responses MUST NOT travel over unencrypted connections, so do not allow `http` redirect URIs except loopback redirects for native apps. CORS MUST NOT be supported at the authorization endpoint. If responses go through `postMessage`, both sender and receiver MUST be strictly verified (RFC 9700 § 2.6).

## Authorization codes

- Keep codes short-lived; a maximum lifetime of 10 minutes is RECOMMENDED (RFC 6749 § 4.1.2).
- A code is single use. If it is used twice, the AS MUST deny the request and SHOULD revoke the tokens already issued from it (RFC 6749 § 4.1.2).

## Token endpoint

- Authenticate confidential clients. Asymmetric methods such as mTLS or `private_key_jwt` are RECOMMENDED (RFC 9700 § 2.5).
- Return the RFC 6749 § 5.2 errors: `invalid_request`, `invalid_client`, `invalid_grant`, `unauthorized_client`, `unsupported_grant_type`, `invalid_scope`. Add `invalid_target` for a refused `resource` (RFC 8707 § 2) and `invalid_authorization_details` for bad RAR input (RFC 9396 § 5).
- **Audience.** Restrict every access token to the resources it is for. Honor `resource` (RFC 8707 § 2) and limit scope and authorization details to what the resource needs (RFC 9700 § 2.3).
- **Sender constraint.** Issue DPoP- or mTLS-bound tokens where clients support them (RFC 9700 § 2.2.1). Refresh tokens for public clients MUST be sender-constrained or rotated on every use (RFC 9700 § 2.2.2).
- **Identity confusion.** Under the conditions in RFC 9700 § 4.15.1, the AS SHOULD NOT let clients influence their `client_id` or any other claim that could be confused with a genuine resource owner (RFC 9700 § 2.6).

## Rich Authorization Requests (RFC 9396)

- Each `authorization_details` object MUST have a `type` (§ 2). The AS defines what each type means; use collision-resistant values such as URIs (§ 2.1).
- Refuse unknown types and unknown fields with `invalid_authorization_details` (§ 5).
- When the request has both `scope` and `authorization_details`, process both and show the user the combined consent (§ 3.1).
- Make the granted details available to the resource server, in the access token or through introspection (§ 9). Publish `authorization_details_types_supported` (§ 10).
- Protect the request's integrity, for example with JAR or PAR, and sanitize details before showing them to the user (§ 12).

## Metadata (RFC 8414)

- Serve JSON at `/.well-known/oauth-authorization-server`, inserted between the host and any path of the issuer identifier, over HTTPS (§ 3).
- `issuer` MUST be identical to the issuer identifier used to build the URL (§ 3.3).
- Publishing metadata is RECOMMENDED (RFC 9700 § 2.6). Include at least `issuer`, `authorization_endpoint`, `token_endpoint`, `jwks_uri`, `code_challenge_methods_supported` and `authorization_response_iss_parameter_supported`.

## Introspection (RFC 7662)

- Accept a POST form with `token` and an optional `token_type_hint` (§ 2.1).
- The endpoint MUST require authorization of the caller, to prevent token scanning (§ 2.1), and MUST authenticate the protected resources that call it (§ 4).
- The response MUST have `active` (§ 2.2). Before returning `active: true`, perform every applicable check: expiry, not-before, revocation, signature, and whether the token may be used at the calling resource server (§ 4).
- Add `cnf` for bound tokens, `authorization_details` for RAR (RFC 9396 § 9.2), and `acr` and `auth_time` when step-up applies (RFC 9470 § 6.2).

## Revocation (RFC 7009)

- The client authenticates, and the AS checks that the token was issued to that client (§ 2.1).
- Revoking a refresh token SHOULD also revoke its access tokens; revoking an access token MAY revoke the refresh token (§ 2.1).
- Answer 200 even when the token is already invalid or unknown (§ 2.2).

## Device authorization grant (RFC 8628)

- Return `device_code`, `user_code`, `verification_uri`, `expires_in` and optionally `verification_uri_complete` and `interval` (§ 3.2).
- Answer polls with `authorization_pending`, `slow_down`, `access_denied` or `expired_token` (§ 3.5).
- Limit attempts at the verification page so short user codes cannot be guessed (§ 5.1).
- Remote phishing is the main risk: tell users what they are approving and show which device asked (§ 5.4).

## Dynamic client registration

- **RFC 7591.** The registration endpoint takes POST JSON over TLS and MAY require an initial access token (§ 3). All metadata the client sends is self-asserted unless it comes in a signed software statement (§ 2.3). Require registered redirect URIs for redirect-based grants (§ 5), and check `logo_uri`, `tos_uri` and `policy_uri` before showing them to users (§ 5).
- **RFC 7592 (Experimental).** Exposes a client configuration endpoint at `registration_client_uri`, protected by the `registration_access_token` as a bearer token, with GET, PUT and DELETE (§ 2.1 to § 2.3).
- **Client ID Metadata Document (draft).** Lets the AS accept an HTTPS URL as the `client_id` without prior registration. See [drafts.md](drafts.md).
