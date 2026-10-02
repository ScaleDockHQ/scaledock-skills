---
name: openid-connect
description: "OpenID Connect (OIDC): validate ID tokens and run login, logout and discovery. Use when building or reviewing a relying party (RP), a resource server that consumes OIDC identity, or an OpenID Provider (OP): authorization code flow, state, nonce, prompt, max_age, acr_values, acr/amr/auth_time, ID token validation (iss, aud, azp, exp, signature, at_hash), public or pairwise sub, UserInfo, the claims parameter, /.well-known/openid-configuration, jwks_uri and key rotation, Dynamic Client Registration, RP-Initiated Logout, Session Management, Front-Channel and Back-Channel Logout (logout_token validation), prompt=create, unmet_authentication_requirements, response_mode=form_post, multiple response types, RP Metadata Choices, Identity Assurance (verified_claims), the Key Binding draft (bound_key, cnf) and the IPSIE SL1 profile draft. Pins OpenID Connect Core 1.0 errata set 2 and the companion OpenID Foundation specifications."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OpenID Connect

OpenID Connect is an identity layer on OAuth 2.0: the OP authenticates the End-User and returns a signed ID token that the RP validates. This skill covers RPs, resource servers that consume OIDC identity, and OPs, using Core 1.0 and the companion OpenID Foundation specifications.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), cited inline as (Spec § section). If a rule is not in a source, it is not in this skill.

## Inputs (fill in, or ask before starting)

- **Role:** RP (client), resource server that consumes ID token or UserInfo claims, or OP. Several roles can apply at once.
- **Revision:** the pinned revisions in [Sources](#sources). Ask before using a newer errata set or draft.
- **Flow:** authorization code, implicit or hybrid (Core § 3), chosen by client type (Core § 15.4), and the response mode (query, fragment or form_post).
- **Extensions in scope:** logout mechanisms, Dynamic Client Registration, Identity Assurance, Key Binding, IPSIE SL1.
- **Sources refresh:** before relying on a pin, compare it with the [OpenID Foundation specifications index](https://openid.net/developers/specs/). If a revision changed, re-read the source and update `metadata.json` and [Sources](#sources).

## Invariants

1. Validate every ID token in the order of (Core § 3.1.3.7). `iss` exactly matches the issuer. `aud` contains the RP's `client_id`, and the token is rejected if it lists audiences the RP does not trust. The JWS signature validates with the issuer's keys. The current time is before `exp`. If a `nonce` was sent, the claim is present and equal.
2. ID tokens are always signed (Core § 2). `alg` is never `none` unless the ID token comes from the token endpoint and the client registered for `none` (Core § 2, Discovery § 3).
3. The only stable user key is `iss` plus `sub` (Core § 5.7). `sub` is case-sensitive and at most 255 ASCII characters (Core § 2). Never use `email`, `phone_number`, `preferred_username` or `name` as a unique identifier (Core § 5.7).
4. The discovery `issuer` is identical to the URL it was fetched from, minus `/.well-known/openid-configuration`, and to the ID token `iss`. Otherwise, do not use the document (Discovery § 4.3, § 7.2).
5. The UserInfo `sub` exactly matches the ID token `sub`. Otherwise, do not use the UserInfo values (Core § 5.3.2).
6. With `max_age`, the ID token MUST contain `auth_time`. With `prompt=none`, the OP MUST NOT display any UI. `none` combined with any other `prompt` value is an error (Core § 3.1.2.1).
7. Access tokens and ID tokens never travel in the query string (Multiple Response Types § 7). Response types that include `token` or `id_token` never use `response_mode=query` (Multiple Response Types § 5).
8. A logout token is accepted only after the checks in (Back-Channel Logout § 2.6). It has a valid signature with a non-`none` `alg`, valid `iss`, `aud`, `iat` and `exp`, a `sub` or `sid` claim, and the back-channel logout `events` member. It has no `nonce`. Any failure gets HTTP 400 (Back-Channel Logout § 2.8).
9. The OP redirects after logout only to a `post_logout_redirect_uri` that exactly matches a registered value (RP-Initiated Logout § 3).
10. Implementer's Drafts and editor's drafts never override a Final specification. Apply them only at their stated posture (see [Sources](#sources)).

## Workflow

1. **Fix the role, flow and response mode.** With the code flow, the ID token comes from the token endpoint over TLS (Core § 3.1.3.3).
   -> [`references/authentication-request.md`](references/authentication-request.md)
   ✓ The response type, response mode and the endpoint that returns each token are written down.
2. **Discover the OP.** Fetch `/.well-known/openid-configuration` and validate it.
   -> [`references/discovery-registration.md`](references/discovery-registration.md)
   ✓ `issuer`, `jwks_uri` and the endpoints come from a validated discovery document, or from static configuration.
3. **Register the client.** Use static registration or Dynamic Client Registration, with exact `redirect_uris`.
   -> [`references/discovery-registration.md`](references/discovery-registration.md)
   ✓ `redirect_uris`, `id_token_signed_response_alg`, `subject_type` and the token endpoint auth method are settled.
4. **Build the authentication request.** Include `state`, a high-entropy `nonce`, and, when needed, `prompt`, `max_age`, `acr_values` or `claims`.
   -> [`references/authentication-request.md`](references/authentication-request.md)
   ✓ `state` and `nonce` are bound to the browser session, and the error codes the RP handles are listed.
5. **Validate the response and the ID token.** Check `state`, exchange the code, then run (Core § 3.1.3.7) in order, plus `at_hash` and `c_hash` where they apply.
   -> [`references/id-token-validation.md`](references/id-token-validation.md)
   ✓ Every check in the ID token validation list has code and a negative test.
6. **Establish identity.** Key the account on `iss` plus `sub`. Fetch UserInfo only if it is needed, and check its `sub`.
   -> [`references/id-token-validation.md`](references/id-token-validation.md)
   ✓ No account lookup uses a mutable claim.
7. **Implement logout.** Choose among RP-Initiated, Front-Channel, Back-Channel and Session Management, and implement each one fully.
   -> [`references/logout-and-sessions.md`](references/logout-and-sessions.md)
   ✓ The logout token validator rejects a token with a `nonce`, without `events`, or without both `sub` and `sid`.
8. **Apply extensions only when asked.** Identity Assurance, Key Binding and IPSIE SL1 each have their own rules and posture.
   -> [`references/extensions-and-drafts.md`](references/extensions-and-drafts.md)
   ✓ Each draft in use is pinned to the revision in [Sources](#sources), with its posture recorded.

## Verify before done

- [ ] The ID token validator checks `iss`, `aud`, `azp` where present, signature and `alg`, `exp`, and `nonce`, in the order of (Core § 3.1.3.7).
- [ ] An unknown `kid` triggers one re-fetch of `jwks_uri` before the token is rejected (Core § 10.1.1).
- [ ] The discovery `issuer`, the fetch URL and the ID token `iss` are compared exactly (Discovery § 4.3).
- [ ] Accounts are keyed on `iss` plus `sub`, and the UserInfo `sub` is compared with the ID token `sub` (Core § 5.3.2, § 5.7).
- [ ] With `max_age`, `auth_time` is present and checked. With an essential `acr`, the returned `acr` is checked (Core § 3.1.3.7, § 5.5.1.1).
- [ ] No token appears in a query string, and form_post responses are not cached (Form Post § 2).
- [ ] The logout token tests cover a missing `events`, a present `nonce`, a missing `sub` and `sid`, a bad signature, and expiry (Back-Channel Logout § 2.6).
- [ ] Post-logout redirects use exact matching against registered URIs (RP-Initiated Logout § 3).
- [ ] Every draft in use carries its pinned revision and posture.

## Reference index

| File                                                                           | Covers                                                                                                            |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| [`references/id-token-validation.md`](references/id-token-validation.md)       | ID token claims, the validation order, at_hash and c_hash, keys, subject types, UserInfo                          |
| [`references/authentication-request.md`](references/authentication-request.md) | Request parameters, prompt, max_age, acr, error codes, response types and modes, prompt=create, third-party login |
| [`references/discovery-registration.md`](references/discovery-registration.md) | Discovery metadata and validation, Dynamic Client Registration, sector identifiers, RP Metadata Choices           |
| [`references/logout-and-sessions.md`](references/logout-and-sessions.md)       | RP-Initiated Logout, Session Management, Front-Channel Logout, Back-Channel Logout                                |
| [`references/extensions-and-drafts.md`](references/extensions-and-drafts.md)   | Identity Assurance, Key Binding (draft), IPSIE SL1 (draft)                                                        |

## Related skills

- `oauth`: the OAuth 2.0 layer underneath, including PKCE, access tokens and client authentication. `npx skills add ScaleDockHQ/scaledock-skills --skill oauth`
- `jwt`: JWS and JWT processing rules that ID tokens and logout tokens rely on. `npx skills add ScaleDockHQ/scaledock-skills --skill jwt`
- `openid`: the umbrella skill that routes between the OpenID Foundation specifications. `npx skills add ScaleDockHQ/scaledock-skills --skill openid`
- `openid-federation`: trust chains and automatic or explicit registration across federations. `npx skills add ScaleDockHQ/scaledock-skills --skill openid-federation`
- `shared-signals`: session and credential change events between OPs and RPs. `npx skills add ScaleDockHQ/scaledock-skills --skill shared-signals`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OpenID Connect Core 1.0 incorporating errata set 2](https://openid.net/specs/openid-connect-core-1_0.html): Final, 1.0 errata set 2 (15 December 2023), checked 2026-10-02.
- [OpenID Connect Discovery 1.0 incorporating errata set 2](https://openid.net/specs/openid-connect-discovery-1_0.html): Final, 1.0 errata set 2 (15 December 2023), checked 2026-10-02.
- [OpenID Connect Dynamic Client Registration 1.0 incorporating errata set 2](https://openid.net/specs/openid-connect-registration-1_0.html): Final, 1.0 errata set 2 (15 December 2023), checked 2026-10-02.
- [OpenID Connect RP-Initiated Logout 1.0](https://openid.net/specs/openid-connect-rpinitiated-1_0.html): Final, 1.0 (12 September 2022), checked 2026-10-02.
- [OpenID Connect Session Management 1.0](https://openid.net/specs/openid-connect-session-1_0.html): Final, 1.0 (12 September 2022), checked 2026-10-02.
- [OpenID Connect Front-Channel Logout 1.0](https://openid.net/specs/openid-connect-frontchannel-1_0.html): Final, 1.0 (12 September 2022), checked 2026-10-02.
- [OpenID Connect Back-Channel Logout 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-backchannel-1_0.html): Final, 1.0 errata set 1 (15 December 2023), checked 2026-10-02.
- [Initiating User Registration via OpenID Connect 1.0](https://openid.net/specs/openid-connect-prompt-create-1_0.html): Final, 1.0 (2 December 2022), checked 2026-10-02.
- [OpenID Connect Core Error Code unmet_authentication_requirements](https://openid.net/specs/openid-connect-unmet-authentication-requirements-1_0.html): Final, 1.0 (June 2019), checked 2026-10-02.
- [OpenID Connect Relying Party Metadata Choices 1.0](https://openid.net/specs/openid-connect-rp-metadata-choices-1_0-final.html): Final, 1.0 (25 March 2026), checked 2026-10-02.
- [OAuth 2.0 Form Post Response Mode](https://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html): Final, 1.0 (27 April 2015), checked 2026-10-02.
- [OAuth 2.0 Multiple Response Type Encoding Practices](https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html): Final, 1.0 (25 February 2014), checked 2026-10-02.
- [OpenID Connect for Identity Assurance 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-4-identity-assurance-1_0-errata1.html): Final, 1.0 errata set 1 (1 July 2026), checked 2026-10-02.
- [OpenID Connect Key Binding 1.0](https://openid.net/specs/openid-connect-key-binding-1_0-ID1.html): Implementer's Draft, ID1 (document draft 03, 8 September 2026), checked 2026-10-02. Draft posture: track, pinned to ID1.
- [IPSIE SL1 OpenID Connect Profile](https://openid.github.io/ipsie-openid-sl1/draft-openid-ipsie-sl1-profile.html): Draft, editor's draft draft-openid-ipsie-sl1-profile-latest (29 September 2026, after -01), checked 2026-10-02. Draft posture: track, pinned to the 29 September 2026 editor's draft.
