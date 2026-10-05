# Versions and upgrades

Read this when choosing which OAuth line to build to, reading an OAuth 1.0 integration, upgrading an OAuth 2.0 deployment to the OAuth 2.1 rules, or deciding how far to rely on the OAuth 2.1 draft. Sources: RFC 6749, RFC 6750, RFC 9700, `draft-ietf-oauth-v2-1-16` and RFC 5849, listed in [Sources](../SKILL.md#sources). Other drafts this skill uses (Client ID Metadata Documents, identity chaining, transaction tokens, RAR remediation) are extensions, not version lines; they are in [`drafts.md`](drafts.md).

## Version lines

| Id            | Line      | Status  | Revision                                             | Posture | Summary                                                                        |
| ------------- | --------- | ------- | ---------------------------------------------------- | ------- | ------------------------------------------------------------------------------ |
| `2.1-preview` | OAuth 2.1 | preview | `draft-ietf-oauth-v2-1-16` (2026-09-03), WG document | build   | Consolidates OAuth 2.0 with PKCE, native apps, bearer usage and RFC 9700.      |
| `2.0`         | OAuth 2.0 | current | RFC 6749 and RFC 6750, as updated by RFC 9700        |         | The published framework and bearer token usage, tightened by the Security BCP. |
| `1.0`         | OAuth 1.0 | legacy  | RFC 5849 (April 2010, Informational)                 |         | Signed requests with client and token credentials. Obsoleted by RFC 6749.      |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

## Which version to use

- Build to OAuth 2.0 as RFC 9700 updates it. That is the published standard, and it is what interoperates with every authorization server and client today.
- Apply the OAuth 2.1 rules on top. Posture: **build**. OAuth 2.1 is compatible with OAuth 2.0 with the best current practices applied (OAuth 2.1 § 1.8), and almost every difference it lists is already a requirement or recommendation of RFC 9700 (OAuth 2.1 § 10). So the skill keeps recommending them: an OAuth 2.0 deployment that follows RFC 9700 is most of the way to OAuth 2.1 already.
- Cite OAuth 2.1 by draft name and revision, never as an RFC. Keep the one OAuth 2.0 behaviour that 2.1 drops but older clients still need: an authorization server that serves OAuth 2.0 clients keeps accepting and checking `redirect_uri` in the token request (OAuth 2.1 § 10.2).
- Never author OAuth 1.0. Treat an OAuth 1.0 integration as something to replace with OAuth 2.0.

## What changed

### OAuth 2.1

`draft-ietf-oauth-v2-1-16` replaces and obsoletes RFC 6749 and RFC 6750 (Abstract). Its non-normative list of changes (§ 10), with the RFC 9700 section each one comes from:

- PKCE is part of the authorization code grant, and `code_challenge` is REQUIRED unless the client is confidential and the AS can rely on a correct OpenID Connect `nonce` (§ 4.1.1, § 7.5.1.1). RFC 9700 already requires PKCE for public clients (RFC 9700 § 2.1.1).
- The PKCE `plain` method is removed; use `S256` (§ 10, § 7.5.2).
- Redirect URIs are compared by exact string match (§ 10, per RFC 9700 § 4.1.3).
- The implicit grant (`response_type=token`) is omitted (§ 10.1, per RFC 9700 § 2.1.2). Other response types, such as `id_token`, are unaffected (§ 10.1).
- The resource owner password credentials grant is omitted (§ 10, per RFC 9700 § 2.4).
- Bearer tokens are no longer sent in the URI query string, and resource servers MUST ignore tokens found there (§ 5.1, per RFC 9700 § 4.3.2).
- Refresh tokens for public clients are sender-constrained or one-time use (§ 4.3.3, per RFC 9700 § 4.14.2).
- The token request for an authorization code no longer carries `redirect_uri`, because PKCE now prevents code injection (§ 10.2). This one has no RFC 9700 counterpart.
- Authorization servers MUST support client credentials in the request body (§ 10). This one is new as well.

### OAuth 2.0

- RFC 6749 obsoletes RFC 5849 and defines the framework: roles, the authorization code, implicit, password and client credentials grants, refresh tokens and the token endpoint. RFC 6750 defines bearer token usage.
- RFC 9700 updates both. Public clients MUST use PKCE and the AS MUST enforce it (RFC 9700 § 2.1.1); redirect URIs are matched exactly (RFC 9700 § 2.1); the implicit grant SHOULD NOT be used (RFC 9700 § 2.1.2); the password grant MUST NOT be used (RFC 9700 § 2.4); refresh tokens for public clients are sender-constrained or rotated (RFC 9700 § 2.2.2); and access tokens are restricted to their audience (RFC 9700 § 2.3).
- OAuth 2.0 replaces OAuth 1.0's per-request signatures with access tokens presented over TLS (RFC 6750 § 2), optionally sender-constrained with DPoP or mTLS (see [`sender-constraint.md`](sender-constraint.md)).

### OAuth 1.0

- RFC 5849 has three steps: temporary credentials, resource owner authorization and token credentials (RFC 5849 § 2.1 to § 2.3).
- Every request is signed with the client and token credentials using `HMAC-SHA1`, `RSA-SHA1` or `PLAINTEXT` (RFC 5849 § 3.4), with a nonce and timestamp (RFC 5849 § 3.3), sent in the `Authorization: OAuth` header, the form body or the query (RFC 5849 § 3.5).
- It is Informational, not Standards Track, and RFC 6749 obsoletes it.

## Upgrading

### OAuth 2.0 to OAuth 2.1

Each step is safe to take on an OAuth 2.0 deployment now; nothing below breaks a client that already follows RFC 9700.

1. Change the version marker: record `draft-ietf-oauth-v2-1-16` as the profile in design documents and security reviews. OAuth has no version field on the wire; metadata stays RFC 8414.
2. Replace removed or renamed parts:
   - Require PKCE with `S256` on every authorization code request, unless the client is confidential and relies on the OpenID Connect `nonce`; remove `plain` from `code_challenge_methods_supported` (§ 4.1.1, § 7.5.2).
   - Switch redirect URI matching to exact string comparison, keeping only the loopback port exception for native apps (§ 10; RFC 9700 § 2.1).
   - Remove `token` from `response_types_supported` and `password` from `grant_types_supported`, and move those clients to the authorization code grant or the device grant (§ 10, § 10.1).
   - Stop reading access tokens from the query string at resource servers (§ 5.1).
   - Sender-constrain or rotate public clients' refresh tokens (§ 4.3.3).
   - Accept client credentials in the request body at the token endpoint (§ 10).
   - Stop sending `redirect_uri` in the token request from 2.1 clients, but keep accepting and enforcing it at the AS for OAuth 2.0 clients (§ 10.2).
3. Validate against the target: the AS refuses an authorization code request without `code_challenge`, a `plain` challenge, a near-match redirect URI, `response_type=token` and `grant_type=password`; the RS ignores `?access_token=`.
4. Keep behaviour unchanged: the same clients get the same scopes and audiences. The AS may decide per `client_id` which clients still need OAuth 2.0 behaviour (§ 10.2).

### OAuth 1.0 to OAuth 2.0

There is no in-place upgrade: OAuth 2.0 is a different protocol that obsoletes RFC 5849. Replace the integration.

1. Change the version marker: register the client with the OAuth 2.0 authorization server and drop the `oauth_version` parameter and `Authorization: OAuth` header.
2. Replace removed parts: temporary and token credentials become the authorization code grant with PKCE; per-request signatures become access tokens in `Authorization: Bearer`, or DPoP or mTLS where request binding matters.
3. Validate against the target: run the client and resource server checks in [`clients.md`](clients.md) and [`resource-server.md`](resource-server.md).
4. Keep behaviour unchanged: map each OAuth 1.0 permission to a scope, so the client can do exactly what it could before, and then revoke the OAuth 1.0 token credentials.

## Preview: OAuth 2.1

`draft-ietf-oauth-v2-1-16` (3 September 2026) is an active working group document; its datatracker milestone is to go to the IESG in December 2026. Posture: **build**. The skill already applies its rules because RFC 9700 requires most of them, as listed under What changed. Do not cite it as an RFC, and do not drop OAuth 2.0 interoperability that 2.1 still asks an AS to keep, such as `redirect_uri` in the token request for OAuth 2.0 clients (§ 10.2). When it is published as an RFC: make OAuth 2.1 current and OAuth 2.0 supported, change the citations from the draft to the RFC number, and keep the 2.0 to 2.1 checklist above for deployments that have not moved.
