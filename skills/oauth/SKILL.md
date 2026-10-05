---
name: oauth
description: "OAuth 2.0 and 2.1: secure resource servers, clients and ASes. Covers OAuth 2.0 (RFC 6749, RFC 6750, current), the OAuth 2.1 draft (build preview), the RFC 9700, RFC 10017 (browser apps) and RFC 10027 (cross-device) BCPs, PKCE (RFC 7636), DPoP (RFC 9449), mTLS-bound tokens (RFC 8705), RAR (RFC 9396), token exchange (RFC 8693), resource indicators (RFC 8707), AS and resource metadata (RFC 8414, RFC 9728), iss (RFC 9207), step-up (RFC 9470), registration (RFC 7591/7592), Client ID Metadata Documents, introspection (RFC 7662), revocation (RFC 7009) and device grant (RFC 8628), plus drafts (rfc7523bis, client attestation, first-party apps, transaction tokens). Use when protecting an API with access tokens, validating tokens, writing WWW-Authenticate challenges, adding PKCE, DPoP or mTLS, publishing /.well-known metadata, building an authorization server, OAuth client or browser app, delegating with token exchange or authorization_details, reviewing an OAuth design against best practice, or upgrading 2.0 to 2.1."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.2.0"
  kind: standard
---

# OAuth

OAuth 2.0 (RFC 6749) and its IETF extensions let a client obtain an access token from an authorization server (AS) and present it to a resource server (RS). OAuth 2.1, still an IETF draft, folds in the security fixes of RFC 9700. With this skill the agent builds or reviews a resource server, client or authorization server that follows those rules, with resource servers as the main focus.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: resource server, client, authorization server, or a service that does more than one (for example an RS that exchanges tokens to call another RS).
- Token format and binding: JWT access tokens or opaque tokens with introspection; bearer, DPoP-bound or mTLS-bound.
- Target version: OAuth 2.0 (current, the default: RFC 6749 and RFC 6750 as updated by RFC 9700). OAuth 2.1 is a preview (posture: build, `draft-ietf-oauth-v2-1-16`): apply its rules, because RFC 9700 already requires most of them, but cite it as a draft. OAuth 1.0 (RFC 5849) is legacy: read it only to replace it with OAuth 2.0, never author it. See [`references/versions.md`](references/versions.md).
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

1. **Pick the version, then fix the role and the token model.** Target OAuth 2.0 with the OAuth 2.1 rules applied. Write down who issues tokens, who validates them, the token format, and whether tokens are bound.
   -> [references/versions.md](references/versions.md)
   ✓ The target is OAuth 2.0 with RFC 9700 and the OAuth 2.1 draft named by revision, every party in the design has a role, and the RS knows whether it reads JWTs or calls introspection.
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
6. **Build the client side**, if in scope: discovery, authorization code with PKCE, `iss` check, resource indicators, challenge handling, device grant, and the browser-app architecture (RFC 10017).
   -> [references/clients.md](references/clients.md)
   ✓ Every authorization request has a fresh S256 challenge, every response's `iss` is checked, and a browser app uses a BFF unless the reference allows otherwise.
7. **Build the authorization server side**, if in scope: PKCE enforcement, codes, metadata, introspection, revocation, registration, and cross-device mitigations (RFC 10027).
   -> [references/authorization-server.md](references/authorization-server.md)
   ✓ The AS metadata lists every supported feature, and the AS refuses codes reused, PKCE downgrades and unknown redirect URIs.
8. **Handle delegation and fine-grained access**, if in scope: token exchange, `act`, `resource`, `authorization_details`.
   -> [references/delegation.md](references/delegation.md)
   ✓ Downstream tokens are audience-restricted and narrower than the incoming token.
9. **Apply drafts only at their posture.**
   -> [references/drafts.md](references/drafts.md)
   ✓ Each draft feature in use names its pinned revision.
10. **Upgrade** (only when asked). Move an OAuth 2.0 deployment to the OAuth 2.1 rules with the checklist, or replace an OAuth 1.0 integration with OAuth 2.0.
    -> [references/versions.md](references/versions.md)
    ✓ The AS refuses requests without PKCE, `plain` challenges, `response_type=token` and the password grant, and existing clients keep the same scopes and audiences.

## Verify before done

- [ ] The RS refuses expired tokens, wrong-audience tokens, tokens in the query string and `none`-signed JWTs.
- [ ] Each failure returns the status and `WWW-Authenticate` error from RFC 6750 § 3.1, RFC 9470 § 3 or RFC 9449 § 7.1, with `resource_metadata`.
- [ ] `/.well-known/oauth-protected-resource` returns `resource` equal to the resource identifier.
- [ ] DPoP: all twelve RFC 9449 § 4.3 checks run, `jti` replay is limited, and a DPoP-bound token sent as `Bearer` is rejected.
- [ ] Clients send S256 PKCE, check `iss`, and send `resource`.
- [ ] The AS enforces PKCE, matches redirect URIs exactly, returns `iss`, and publishes RFC 8414 metadata.
- [ ] Introspection callers authenticate, and cached results expire no later than the token.
- [ ] Client assertions carry the AS issuer identifier as their sole `aud`.
- [ ] Browser apps follow RFC 10017, and any cross-device flow has a risk assessment and the mitigations of RFC 10027.
- [ ] Every draft in use carries its pinned revision and posture.

## Reference index

- **`references/versions.md`**: OAuth 2.0, the OAuth 2.1 preview and legacy OAuth 1.0, what each changed with the RFC 9700 section behind it, the 2.0 to 2.1 checklist and replacing 1.0. Load for steps 1 and 10.
- **`references/resource-server.md`**: reading and validating tokens, introspection, authorization details, `act`, challenges, RFC 9728 metadata, and a TypeScript example with `jose`.
- **`references/sender-constraint.md`**: DPoP proofs, the RFC 9449 § 4.3 checks, nonces and replay, and mTLS certificate-bound tokens.
- **`references/clients.md`**: discovery, authorization code with PKCE, `iss`, resource indicators, challenge handling, the device grant, browser-based applications (RFC 10017) and registration.
- **`references/authorization-server.md`**: authorization and token endpoints, codes, RAR, metadata, introspection, revocation, device grant, cross-device flows (RFC 10027), browser-based clients and dynamic registration.
- **`references/delegation.md`**: token exchange, delegation versus impersonation, resource indicators and Rich Authorization Requests.
- **`references/drafts.md`**: OAuth 2.1, Client ID Metadata Documents, identity chaining, rfc7523bis, attestation-based client authentication, first-party apps, transaction tokens, RAR remediation, the Security BCP update, refresh token expiration, SPIFFE client authentication and deferred token responses, each with its posture.

## Related skills

- `jwt` for JWT access token formats and the JOSE verification checklist: `npx skills add ScaleDockHQ/scaledock-skills --skill jwt`
- `openid-connect` for ID tokens and sign-in on top of OAuth: `npx skills add ScaleDockHQ/scaledock-skills --skill openid-connect`
- `gnap` for the Grant Negotiation and Authorization Protocol: `npx skills add ScaleDockHQ/scaledock-skills --skill gnap`
- `mcp-authorization` for the OAuth profile used by Model Context Protocol servers: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp-authorization`
- `ciba` for Client-Initiated Backchannel Authentication, the cross-device alternative RFC 10027 prefers over the device grant: `npx skills add ScaleDockHQ/scaledock-skills --skill ciba`
- `wimse` for workload-to-workload authentication alongside transaction tokens and SPIFFE client authentication: `npx skills add ScaleDockHQ/scaledock-skills --skill wimse`
- `spiffe` for the SVIDs and trust bundles behind SPIFFE client authentication: `npx skills add ScaleDockHQ/scaledock-skills --skill spiffe`
- `sd-jwt` for Selective Disclosure JWTs, the OAuth working group's selective disclosure format: `npx skills add ScaleDockHQ/scaledock-skills --skill sd-jwt`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [RFC 6749: The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749): RFC (Proposed Standard, updated by RFC 8252, RFC 8996 and RFC 9700), RFC 6749, checked 2026-10-02.
- [RFC 6750: Bearer Token Usage](https://www.rfc-editor.org/rfc/rfc6750): RFC (Proposed Standard, updated by RFC 8996 and RFC 9700), RFC 6750, checked 2026-10-02.
- [The OAuth 2.1 Authorization Framework](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-16): WG draft, draft-ietf-oauth-v2-1-16 (2026-09-03), checked 2026-10-05. Draft posture: build, pinned to -16.
- [RFC 5849: The OAuth 1.0 Protocol](https://www.rfc-editor.org/rfc/rfc5849): RFC (Informational, obsoleted by RFC 6749), RFC 5849, checked 2026-10-05.
- [RFC 9700: Best Current Practice for OAuth 2.0 Security](https://www.rfc-editor.org/rfc/rfc9700): RFC (Best Current Practice), RFC 9700, checked 2026-10-02.
- [RFC 10017: OAuth 2.0 for Browser-Based Applications](https://www.rfc-editor.org/rfc/rfc10017): RFC (Best Current Practice, BCP 212), RFC 10017 (August 2026), checked 2026-10-05.
- [RFC 10027: Best Current Practice for Security of Cross-Device Flows](https://www.rfc-editor.org/rfc/rfc10027): RFC (Best Current Practice, BCP 247), RFC 10027 (August 2026), checked 2026-10-05.
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
- [Updates to OAuth 2.0 JWT Client Authentication and Assertion-Based Authorization Grants](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rfc7523bis-11): RFC Editor queue, draft-ietf-oauth-rfc7523bis-11 (2026-03-26; intended Proposed Standard), checked 2026-10-05. Draft posture: build, pinned to -11.
- [OAuth 2.0 Attestation-Based Client Authentication](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-attestation-based-client-auth-11): WG draft, draft-ietf-oauth-attestation-based-client-auth-11 (2026-09-03; in WG last call), checked 2026-10-05. Draft posture: build, pinned to -11.
- [OAuth 2.0 for First-Party Applications](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-first-party-apps-04): WG draft, draft-ietf-oauth-first-party-apps-04 (2026-07-01; WG consensus, waiting for write-up), checked 2026-10-05. Draft posture: track, pinned to -04.
- [Updates to OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-update-03): WG draft, draft-ietf-oauth-security-topics-update-03 (2026-07-06), checked 2026-10-05. Draft posture: track, pinned to -03.
- [OAuth 2.0 Refresh Token and Authorization Expiration](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-refresh-token-expiration-03): WG draft, draft-ietf-oauth-refresh-token-expiration-03 (2026-07-06), checked 2026-10-05. Draft posture: track, pinned to -03.
- [OAuth SPIFFE Client Authentication](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-spiffe-client-auth-02): WG draft, draft-ietf-oauth-spiffe-client-auth-02 (2026-06-15), checked 2026-10-05. Draft posture: track, pinned to -02.
- [Deferred Token Response](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-deferred-token-response-00): WG draft, draft-ietf-oauth-deferred-token-response-00 (2026-09-16), checked 2026-10-05. Draft posture: track, pinned to -00.
