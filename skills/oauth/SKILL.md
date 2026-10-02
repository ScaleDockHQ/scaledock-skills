---
name: oauth
description: "OAuth 2.1: secure resource servers, clients and ASes. Covers RFC 6749, RFC 6750 bearer tokens, the OAuth 2.1 draft, the RFC 9700 Security BCP, PKCE (RFC 7636), DPoP (RFC 9449), mTLS-bound tokens (RFC 8705), Rich Authorization Requests (RFC 9396), token exchange (RFC 8693), resource indicators (RFC 8707), AS metadata (RFC 8414), protected resource metadata (RFC 9728), the iss parameter (RFC 9207), step-up (RFC 9470), dynamic client registration (RFC 7591/7592), Client ID Metadata Documents, introspection (RFC 7662), revocation (RFC 7009) and the device grant (RFC 8628), plus transaction tokens, identity chaining and RAR remediation drafts. Use when protecting an API with access tokens, validating tokens, writing WWW-Authenticate challenges, adding PKCE, DPoP or mTLS, publishing /.well-known metadata, building an authorization server or OAuth client, delegating with token exchange or authorization_details, or reviewing an OAuth design against current best practice."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OAuth

OAuth 2.0 (RFC 6749) and its IETF extensions let a client obtain an access token from an authorization server (AS) and present it to a resource server (RS). OAuth 2.1, still an IETF draft, folds in the security fixes of RFC 9700. With this skill the agent builds or reviews a resource server, client or authorization server that follows those rules, with resource servers as the main focus.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: resource server, client, authorization server, or a service that does more than one (for example an RS that exchanges tokens to call another RS).
- Token format and binding: JWT access tokens or opaque tokens with introspection; bearer, DPoP-bound or mTLS-bound.
- Revision: the pinned revisions in [Sources](#sources), unless the user names another. Drafts apply only at the posture recorded there.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check the IETF datatracker for a newer draft revision or a published RFC, and update the pins.

## Invariants

1. **The resource server validates every token fully** (OAuth 2.1 draft -16 § 5.2). Not expired, issued for this resource, with the scope or authorization details the operation needs. A token meant for another resource MUST be refused (RFC 9700 § 2.3).
2. **Tokens never travel in the URL query.** Clients MUST NOT send them there and resource servers MUST ignore them (OAuth 2.1 draft -16 § 5.1; RFC 6750 § 2.3).
3. **Failures answer with `WWW-Authenticate`** (RFC 6750 § 3). `invalid_token` with 401, `insufficient_scope` with 403, no error code when no credentials were sent (RFC 6750 § 3.1), and `insufficient_user_authentication` for step-up (RFC 9470 § 3).
4. **Bound tokens need their proof on every request.** A DPoP-bound token is accepted only when all RFC 9449 § 4.3 checks pass and its key matches `cnf.jkt` (§ 7.1); it MUST be rejected when sent as `Bearer` (§ 7.2). An mTLS-bound token MUST match the TLS client certificate (RFC 8705 § 3).
5. **The authorization code grant uses PKCE with S256.** Public clients MUST use it; the AS MUST enforce it and MUST prevent PKCE downgrade (RFC 9700 § 2.1.1; RFC 7636 § 4.2).
6. **Redirect URIs match exactly**, except the localhost port for native apps (RFC 9700 § 2.1).
7. **No implicit grant and no password grant.** The implicit grant SHOULD NOT be used (RFC 9700 § 2.1.2); the password grant MUST NOT be used (RFC 9700 § 2.4).
8. **Clients check where responses came from.** With more than one AS, a mix-up defense is REQUIRED (RFC 9700 § 2.1): compare `iss` to the expected issuer (RFC 9207 § 2.4). Metadata whose `issuer` or `resource` does not match is not used (RFC 8414 § 3.3; RFC 9728 § 3.3).
9. **Refresh tokens for public clients are sender-constrained or rotated** (RFC 9700 § 2.2.2).
10. **Introspection is authenticated and never cached past `exp`** (RFC 7662 § 2.1, § 4).
11. **Delegated tokens are authorized on the subject and the current actor only** (RFC 8693 § 4.1).
12. **Unknown authorization details are refused** with `invalid_authorization_details` (RFC 9396 § 5).

## Workflow

1. **Fix the role and the token model.** Write down who issues tokens, who validates them, the token format, and whether tokens are bound.
   ✓ Every party in the design has a role, and the RS knows whether it reads JWTs or calls introspection.
2. **Validate tokens at the resource server.** Read the token from the header, validate it as a JWT or through introspection, then check audience, scope and authorization details for the exact operation.
   -> [references/resource-server.md](references/resource-server.md)
   ✓ A token for another audience, an expired token and a token without the needed scope are each refused.
3. **Write the challenges.** Return the right status, error code and `resource_metadata` for each failure.
   -> [references/resource-server.md](references/resource-server.md)
   ✓ Each failure in the table in the reference produces its listed status and `WWW-Authenticate` value.
4. **Publish protected resource metadata** at `/.well-known/oauth-protected-resource` with `resource` equal to the resource identifier (RFC 9728 § 2, § 3).
   ✓ A client can go from a 401 to the AS metadata without configuration.
5. **Add sender constraint** with DPoP or mTLS where clients support it.
   -> [references/sender-constraint.md](references/sender-constraint.md)
   ✓ A replayed DPoP proof, a wrong `ath` and a bound token sent as `Bearer` are each refused.
6. **Build the client side**, if in scope: discovery, authorization code with PKCE, `iss` check, resource indicators, challenge handling, device grant.
   -> [references/clients.md](references/clients.md)
   ✓ Every authorization request has a fresh S256 challenge, and every response's `iss` is checked.
7. **Build the authorization server side**, if in scope: PKCE enforcement, codes, metadata, introspection, revocation, registration.
   -> [references/authorization-server.md](references/authorization-server.md)
   ✓ The AS metadata lists every supported feature, and the AS refuses codes reused, PKCE downgrades and unknown redirect URIs.
8. **Handle delegation and fine-grained access**, if in scope: token exchange, `act`, `resource`, `authorization_details`.
   -> [references/delegation.md](references/delegation.md)
   ✓ Downstream tokens are audience-restricted and narrower than the incoming token.
9. **Apply drafts only at their posture.**
   -> [references/drafts.md](references/drafts.md)
   ✓ Each draft feature in use names its pinned revision.

## Verify before done

- [ ] The RS refuses expired tokens, wrong-audience tokens, tokens in the query string and `none`-signed JWTs.
- [ ] Each failure returns the status and `WWW-Authenticate` error from RFC 6750 § 3.1, RFC 9470 § 3 or RFC 9449 § 7.1, with `resource_metadata`.
- [ ] `/.well-known/oauth-protected-resource` returns `resource` equal to the resource identifier.
- [ ] DPoP: all twelve RFC 9449 § 4.3 checks run, `jti` replay is limited, and a DPoP-bound token sent as `Bearer` is rejected.
- [ ] Clients send S256 PKCE, check `iss`, and send `resource`.
- [ ] The AS enforces PKCE, matches redirect URIs exactly, returns `iss`, and publishes RFC 8414 metadata.
- [ ] Introspection callers authenticate, and cached results expire no later than the token.
- [ ] Every draft in use carries its pinned revision and posture.

## Reference index

- **`references/resource-server.md`**: reading and validating tokens, introspection, authorization details, `act`, challenges, RFC 9728 metadata, and a TypeScript example with `jose`.
- **`references/sender-constraint.md`**: DPoP proofs, the RFC 9449 § 4.3 checks, nonces and replay, and mTLS certificate-bound tokens.
- **`references/clients.md`**: discovery, authorization code with PKCE, `iss`, resource indicators, challenge handling, the device grant and registration.
- **`references/authorization-server.md`**: authorization and token endpoints, codes, RAR, metadata, introspection, revocation, device grant and dynamic registration.
- **`references/delegation.md`**: token exchange, delegation versus impersonation, resource indicators and Rich Authorization Requests.
- **`references/drafts.md`**: OAuth 2.1, Client ID Metadata Documents, identity chaining, transaction tokens and RAR remediation, each with its posture.

## Related skills

- `jwt` for JWT access token formats and the JOSE verification checklist: `npx skills add ScaleDockHQ/scaledock-skills --skill jwt`
- `openid-connect` for ID tokens and sign-in on top of OAuth: `npx skills add ScaleDockHQ/scaledock-skills --skill openid-connect`
- `gnap` for the Grant Negotiation and Authorization Protocol: `npx skills add ScaleDockHQ/scaledock-skills --skill gnap`
- `mcp-authorization` for the OAuth profile used by Model Context Protocol servers: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp-authorization`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [RFC 6749: The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749): RFC (Proposed Standard, updated by RFC 8252, RFC 8996 and RFC 9700), RFC 6749, checked 2026-10-02.
- [RFC 6750: Bearer Token Usage](https://www.rfc-editor.org/rfc/rfc6750): RFC (Proposed Standard, updated by RFC 8996 and RFC 9700), RFC 6750, checked 2026-10-02.
- [The OAuth 2.1 Authorization Framework](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-16): WG draft, draft-ietf-oauth-v2-1-16 (2026-09-03), checked 2026-10-02. Draft posture: build, pinned to -16.
- [RFC 9700: Best Current Practice for OAuth 2.0 Security](https://www.rfc-editor.org/rfc/rfc9700): RFC (Best Current Practice), RFC 9700, checked 2026-10-02.
- [RFC 7636: Proof Key for Code Exchange](https://www.rfc-editor.org/rfc/rfc7636): RFC (Proposed Standard), RFC 7636, checked 2026-10-02.
- [RFC 9449: Demonstrating Proof of Possession (DPoP)](https://www.rfc-editor.org/rfc/rfc9449): RFC (Proposed Standard), RFC 9449, checked 2026-10-02.
- [RFC 8705: Mutual-TLS Client Authentication and Certificate-Bound Access Tokens](https://www.rfc-editor.org/rfc/rfc8705): RFC (Proposed Standard), RFC 8705, checked 2026-10-02.
- [RFC 9396: Rich Authorization Requests](https://www.rfc-editor.org/rfc/rfc9396): RFC (Proposed Standard), RFC 9396, checked 2026-10-02.
- [RFC 8693: Token Exchange](https://www.rfc-editor.org/rfc/rfc8693): RFC (Proposed Standard), RFC 8693, checked 2026-10-02.
- [RFC 8707: Resource Indicators for OAuth 2.0](https://www.rfc-editor.org/rfc/rfc8707): RFC (Proposed Standard), RFC 8707, checked 2026-10-02.
- [RFC 8414: Authorization Server Metadata](https://www.rfc-editor.org/rfc/rfc8414): RFC (Proposed Standard), RFC 8414, checked 2026-10-02.
- [RFC 9728: Protected Resource Metadata](https://www.rfc-editor.org/rfc/rfc9728): RFC (Proposed Standard), RFC 9728, checked 2026-10-02.
- [RFC 9207: Authorization Server Issuer Identification](https://www.rfc-editor.org/rfc/rfc9207): RFC (Proposed Standard), RFC 9207, checked 2026-10-02.
- [RFC 9470: Step Up Authentication Challenge Protocol](https://www.rfc-editor.org/rfc/rfc9470): RFC (Proposed Standard), RFC 9470, checked 2026-10-02.
- [RFC 7591: Dynamic Client Registration Protocol](https://www.rfc-editor.org/rfc/rfc7591): RFC (Proposed Standard), RFC 7591, checked 2026-10-02.
- [RFC 7592: Dynamic Client Registration Management Protocol](https://www.rfc-editor.org/rfc/rfc7592): RFC (Experimental), RFC 7592, checked 2026-10-02.
- [OAuth Client ID Metadata Document](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-client-id-metadata-document-02): WG draft, draft-ietf-oauth-client-id-metadata-document-02 (2026-07-06), checked 2026-10-02. Draft posture: build, pinned to -02.
- [RFC 7662: Token Introspection](https://www.rfc-editor.org/rfc/rfc7662): RFC (Proposed Standard), RFC 7662, checked 2026-10-02.
- [RFC 7009: Token Revocation](https://www.rfc-editor.org/rfc/rfc7009): RFC (Proposed Standard), RFC 7009, checked 2026-10-02.
- [RFC 8628: Device Authorization Grant](https://www.rfc-editor.org/rfc/rfc8628): RFC (Proposed Standard), RFC 8628, checked 2026-10-02.
- [RFC 9068: JWT Profile for OAuth 2.0 Access Tokens](https://www.rfc-editor.org/rfc/rfc9068): RFC (Proposed Standard), RFC 9068, checked 2026-10-02.
- [Transaction Tokens](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-transaction-tokens-11): WG draft, draft-ietf-oauth-transaction-tokens-11 (2026-08-21; WG consensus, waiting for write-up), checked 2026-10-02. Draft posture: track, pinned to -11.
- [OAuth Identity and Authorization Chaining Across Domains](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-identity-chaining-17): RFC Editor queue, draft-ietf-oauth-identity-chaining-17 (2026-08-21; intended Proposed Standard), checked 2026-10-02. Draft posture: build, pinned to -17.
- [OAuth 2.0 RAR Metadata and Error Remediation](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar-metadata-remediation-00): WG draft, draft-ietf-oauth-rar-metadata-remediation-00 (2026-08-23), checked 2026-10-02. Draft posture: track, pinned to -00.
