# Drafts and their postures

Internet-Drafts change between revisions. Each entry names the pinned revision and a posture:

- **build**: implement the pinned revision's current shape.
- **name**: reserve the identifiers only.
- **track**: follow it; nothing depends on it.

Re-check the IETF datatracker for a newer revision before relying on any of these.

## OAuth 2.1 (draft-ietf-oauth-v2-1-16)

Posture: **build**. A working group draft that consolidates OAuth 2.0 with its security updates. Most of its rules already apply through RFC 9700, so building to it now costs little. OAuth 2.1 is a version line of OAuth, not an extension: its differences from OAuth 2.0 (§ 10), the RFC 9700 section behind each, and the 2.0 to 2.1 upgrade checklist are in [`versions.md`](versions.md).

A resource server MUST check that a token is not expired, is authorized for the resource, has the right scope, and meets any other policy (§ 5.2).

## OAuth Client ID Metadata Document (draft-ietf-oauth-client-id-metadata-document-02)

Posture: **build**. A working group draft that lets a client use an HTTPS URL as its `client_id`, with the client's metadata served at that URL. No prior registration is needed.

The client ID URL (§ 3):

- MUST use `https`, MUST have a path, and MUST NOT have userinfo, dot segments or a fragment. It SHOULD NOT have a query.
- Is compared by simple string comparison.

The document (§ 4):

- Is served with status 200 and MUST contain `client_id` equal to its own URL.
- MUST NOT use shared-secret client authentication: no `client_secret`, and no private keys in the document (§ 4.1).
- Lists redirect URIs, which the AS matches exactly (§ 4.2).

The AS:

- Fetches the document and MUST NOT follow redirects (§ 5). It aborts the authorization if the fetch fails or the document is invalid (§ 5.1).
- May cache the document following HTTP caching rules, but never caches errors or invalid documents (§ 5.2).
- Advertises support with `client_id_metadata_document_supported` in its metadata (§ 6).
- MUST NOT fetch documents from special-use IP addresses (RFC 6890) to prevent server-side request forgery. Development setups may allow loopback when the AS itself runs on loopback (§ 8.6).
- Limits how much it reads; the draft suggests 5 kilobytes (§ 8.7).

```json
{
  "client_id": "https://app.example.com/oauth/client.json",
  "client_name": "Example App",
  "redirect_uris": ["https://app.example.com/callback"],
  "token_endpoint_auth_method": "private_key_jwt",
  "jwks_uri": "https://app.example.com/oauth/jwks.json"
}
```

## OAuth Identity and Authorization Chaining Across Domains (draft-ietf-oauth-identity-chaining-17)

Posture: **build**. Approved and in the RFC Editor queue, intended as a Proposed Standard.

The flow (§ 2):

1. The client exchanges its token at AS A with RFC 8693 token exchange. `resource` or `audience` names AS B, and one of them is REQUIRED (§ 2.3.1). AS A refuses targets it does not know (§ 2.3.2).
2. AS A returns a JWT authorization grant.
3. The client presents that JWT at AS B using the JWT bearer grant (RFC 7523).
4. AS B validates the JWT as RFC 7523 requires, checks that `aud` identifies AS B, and MUST refuse the request if it cannot identify the subject (§ 2.4.2). It then issues an access token for its own resource.

AS A may transcribe claims for the other domain, for example mapping identifiers (§ 2.5). AS A advertises support with `identity_chaining_requested_token_types_supported` (§ 3). Keep the JWT grant short-lived and single use, and require client authentication at AS B, to limit replay (§ 5.5).

## Updates to JWT Client Authentication and Assertion-Based Authorization Grants (draft-ietf-oauth-rfc7523bis-11)

Posture: **build**. Approved and in the RFC Editor queue, intended as a Proposed Standard. It updates RFC 7521, RFC 7522, RFC 7523 and RFC 9126 to close the audience injection attack against `private_key_jwt` and other client assertions (§ 1, § 7).

- **Client authentication JWTs.** `aud` MUST be the AS's RFC 8414 issuer identifier as its sole value; the token endpoint URL MUST NOT be used. The AS MUST have an issuer identifier and MUST reject a JWT that does not carry it as the sole audience (§ 4). The same rule applies to client assertions sent to the PAR endpoint (§ 5).
- **JWT authorization grants.** `aud` identifies the AS; the AS may be identified by its issuer identifier or its token endpoint URL (§ 4).
- Compare audience values by simple string comparison unless a profile says otherwise (§ 4).
- Client authentication JWTs SHOULD carry `typ` `client-authentication+jwt`, but servers are NOT RECOMMENDED to reject JWTs without it, because the audience rule is the real protection (§ 4).
- SAML bearer assertions MUST NOT be used for client authentication in new applications (§ 3).
- Roll out clients first: an updated client works with old and new servers, but an old client may fail at a server that enforces the new rule (§ 6).

```json
{
  "aud": "https://authz.example.net",
  "iss": "https://client.example",
  "sub": "https://client.example",
  "iat": 1752702206,
  "exp": 1752705806
}
```

## OAuth 2.0 Attestation-Based Client Authentication (draft-ietf-oauth-attestation-based-client-auth-11)

Posture: **build**. In working group last call. A client instance sends a key-bound attestation from a client attester, and proves possession of that key, so the AS or RS can authenticate it without the attester learning the audience (Abstract).

- **Client Attestation JWT** in the `OAuth-Client-Attestation` header: `typ` `oauth-client-attestation+jwt`; `sub` is the `client_id`, and `exp` and `cnf` (with a `jwk`) are REQUIRED. The receiver MUST reject it when expired or when the signature fails (§ 4).
- **Proof of possession**, one of two (§ 5):
  - A Client Attestation PoP JWT in the `OAuth-Client-Attestation-PoP` header: `typ` `oauth-client-attestation-pop+jwt`, signed with the `cnf` key, with `aud` (the AS issuer identifier or the RS resource identifier, one audience per JWT), `jti` and `iat` REQUIRED, and `challenge` when the server issued one (§ 5.1).
  - DPoP combined mode: a single DPoP proof serves both purposes when the client instance key and the DPoP key are the same (§ 5.2).
- **Challenges** are optional for servers. A server that uses them returns `use_attestation_challenge` with a fresh challenge in `OAuth-Client-Attestation-Challenge`, and MAY publish a `challenge_endpoint` in its metadata. The client retries once, never indefinitely (§ 6, § 7.4).
- **Errors**: `use_attestation_challenge`, `use_fresh_attestation`, and `invalid_client_attestation` alongside `invalid_client` (§ 7.4).
- As client authentication, a `client_id` in the request MUST equal `sub` in the attestation (§ 7.5). The AS advertises `attest_jwt_client_auth` and `attest_jwt_client_auth_dpop` in `token_endpoint_auth_methods_supported` (§ 8).
- Detect replay by keeping the PoP `jti` values seen within the accepted `iat` window (§ 12.1).

## OAuth 2.0 for First-Party Applications (draft-ietf-oauth-first-party-apps-04)

Posture: **track**. The working group has reached consensus and is waiting for the write-up. It adds an authorization challenge endpoint so a first-party native app can collect the user's credentials itself and fall back to the browser only when needed (Abstract).

- Only for first-party applications: the same entity controls the app and the AS, and users see them as one brand. The AS MUST verify that the client is first-party before continuing (§ 1.1, § 5, § 9.1). Using it in browser-based apps is NOT RECOMMENDED (§ 9.8).
- The client POSTs to `authorization_challenge_endpoint` (advertised in AS metadata, `https` only) with `response_type=code` and optional `scope`, `auth_session` and PKCE parameters (§ 4.1, § 5.1, § 8). Success returns an `authorization_code` that the client redeems at the token endpoint (§ 5.2.1, § 6).
- Errors (§ 5.2.2.1): `invalid_session`; `insufficient_authorization` (HTTP 403) when more steps are needed, with an `auth_session` to send back; and `redirect_to_web` (HTTP 403), which sends the client to a normal browser-based authorization code flow, optionally with a `request_uri`.
- The AS MUST NOT return a `request_uri` with `redirect_to_web` unless the initial request carried a PKCE `code_challenge` (§ 5.2.2.1.1).
- `auth_session` SHOULD be bound to the device, for example with DPoP, and SHOULD have at least 256 bits of entropy (§ 5.3.1, § 9.6).

## Transaction Tokens (draft-ietf-oauth-transaction-tokens-11)

Posture: **track**. The working group has reached consensus and is waiting for the write-up.

Transaction tokens carry the identity and context of one request between workloads inside a single trust domain:

- A transaction token is a short-lived JWT, valid for minutes or less (§ 6), with `typ` `txntoken+jwt` (§ 9.1).
- Required claims: `iat`, `aud` (the trust domain), `exp`, `txn`, `sub` (unique within the trust domain), `scope` and `req_wl` (the requesting workload). `tctx` and `rctx` are RECOMMENDED, and `iss` is OPTIONAL (§ 9.2).
- A workload requests one with RFC 8693 token exchange, with `requested_token_type=urn:ietf:params:oauth:token-type:txn_token` and the trust domain as `audience` (§ 11.1).
- It travels in the `Txn-Token` HTTP header, which carries exactly one token (§ 12.1).
- A receiving workload MUST check the signature, that `aud` is its own trust domain, and that the token has not expired. It passes the token on unchanged (§ 12.2).
- A transaction token MUST NOT be used as an OAuth access token (§ 13.13), and MUST NOT be accepted outside the trust domain named in `aud` (§ 9.2).

`tctx`, `rctx` and `req_wl` are not yet in the IANA JWT claims registry.

## OAuth 2.0 RAR Metadata and Error Remediation (draft-ietf-oauth-rar-metadata-remediation-00)

Posture: **track**. A new working group draft (-00); expect changes.

- Adds the `WWW-Authenticate` error `insufficient_authorization`, which a resource server SHOULD return when the token's authorization details are missing or insufficient (§ 4).
- The challenge can carry `authorization_remediation`: a base64url-encoded JSON object with `authorization_details` (what the client should ask for) and `authorization_reference` (an opaque reference with no sensitive data), both RECOMMENDED (§ 4).
- Adds the AS metadata parameter `authorization_details_types_metadata_endpoint`, which returns a JSON object keyed by type with a schema for each (§ 5).
- Suggests the AS consider leaving `authorization_details` out of JWT access tokens and serving them through introspection (§ 6).
- Orders the resource server's errors (§ 7.2): `invalid_token` for a bad token, then `insufficient_scope`, then `insufficient_user_authentication`, then `insufficient_authorization`.

## Updates to OAuth 2.0 Security Best Current Practice (draft-ietf-oauth-security-topics-update-03)

Posture: **track**. A working group document intended as a Best Current Practice; it would update RFC 6749, RFC 6750, RFC 7521, RFC 7522, RFC 7523 and RFC 9700. Its countermeasures are client-side and need no AS change, so adopting them early is cheap.

- **Audience injection** (§ 2.1). A client that talks to more than one AS and uses signature-based client authentication MUST use a single audience value: preferably the AS's validated issuer identifier (§ 2.1.2.1, the same rule as rfc7523bis above), otherwise the exact endpoint URI the assertion is sent to (§ 2.1.2.2).
- **Cross-toolkit account takeover** (§ 2.2). A client connecting to many tools MUST give each configured AS a connection context identifier, use a distinct redirect URI per context, store the identifier in the user's session and abort on a mismatch. Issuer-based mix-up defenses can replace this only under the conditions in § 2.2.2.
- **Cross-user session fixation** (§ 2.3). The client MUST make sure the user who started a flow is the one who finishes it, and MUST validate the binding of `state` or a pre-authorization URI to the initiating user's session before redeeming the code.
- **Shared consent in brokered OAuth** (§ 2.4). A broker MUST either register each downstream client separately at the upstream AS, or show its own consent screen naming the downstream client and never reuse that consent for another client.

## OAuth 2.0 Refresh Token and Authorization Expiration (draft-ietf-oauth-refresh-token-expiration-03)

Posture: **track**. A working group document intended as Informational.

- A refresh token MUST NOT outlive the user's authorization, and neither may access tokens. The AS MUST NOT accept expired refresh tokens for any purpose (§ 5).
- New token response parameters (§ 6.1): `refresh_token_timeout`, the seconds the client may hold the refresh token without using it, never more than `authorization_expires_in`; and `authorization_expires_in`, the seconds left on the user's authorization. When finite, the AS MUST return them whenever it issues a refresh token.
- Omitted values mean no fixed bound. Clients MUST NOT infer from one response that later ones will omit them, and MUST treat large values literally (§ 6.1.2).
- On `invalid_grant` the client SHOULD start a new authorization flow (§ 6.2).
- Refresh token introspection SHOULD return the same parameters and MUST NOT reset the timeout (§ 7). The AS declares support with `refresh_token_expiration_types_supported` (`authorization`, `token_timeout`) (§ 8).

## OAuth SPIFFE Client Authentication (draft-ietf-oauth-spiffe-client-auth-02)

Posture: **track**. A working group document with open TODOs. It lets workloads authenticate to an AS with SPIFFE SVIDs instead of client secrets (Abstract).

- **JWT-SVID**: `client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-spiffe` with a single JWT-SVID. The AS checks `exp`, that `aud` is only its issuer identifier (per rfc7523bis), the signature against the trust domain's keys, and that the SPIFFE ID in `sub` maps to a known client (§ 3.1).
- **X.509-SVID**: mutual TLS as in RFC 8705; `client_id` is the SPIFFE ID and MUST match the URI SAN (§ 3.2). X.509-SVIDs MUST NOT be validated with the system trust store (§ 6.2.3).
- **WIT-SVID**: presented through attestation-based client authentication (§ 3.3).
- The AS MUST support at least one method and advertise `spiffe_jwt`, `spiffe_x509` and/or `spiffe_wit` in `token_endpoint_auth_methods_supported` (§ 4). Client metadata adds `spiffe_id` (a trailing `/*` means path-segment prefix match) and `spiffe_bundle_endpoint` (§ 5.1).

## Deferred Token Response (draft-ietf-oauth-deferred-token-response-00)

Posture: **track**. A new working group draft (-00) written against OAuth 2.1; expect changes. It lets any grant's token request finish asynchronously (Abstract).

- Opt-in only: the client sends `completion_mode=deferred`, and the AS MUST NOT defer a client that did not (§ 4). The AS advertises `deferred_token_response_supported` (§ 4.1).
- A deferred answer is HTTP 400 `authorization_pending` with `deferral_code` (at least 128 bits of entropy, opaque), `expires_in` and `interval` (§ 5.4). It grants no access.
- The client polls with `grant_type=urn:ietf:params:oauth:grant-type:deferred` and the `deferral_code`, no faster than `interval`, and treats `invalid_grant` as final (§ 5.5, § 5.6). An optional `deferred_client_notification_endpoint` receives a callback (§ 6).
- Deferral codes are sender-constrained like refresh tokens under RFC 9449. Public clients MUST use DPoP on the initial request, and every poll MUST use the same key (§ 5.4, § 10.1).
