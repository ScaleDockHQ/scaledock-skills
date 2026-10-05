# oauth

An agent skill for OAuth 2.0 and the OAuth 2.1 draft: secure resource servers, clients and authorization servers that follow the RFC 9700 Security BCP.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill oauth
```

Then ask your agent to "protect this API with OAuth access tokens" or "review our OAuth client against RFC 9700".

## What it covers

- Resource servers: token validation, audience and scope checks, introspection, `WWW-Authenticate` challenges, step-up, and protected resource metadata.
- Sender-constrained tokens with DPoP and mTLS.
- Clients: discovery, authorization code with PKCE, the `iss` check, resource indicators, the device grant, and browser-based app architectures from RFC 10017.
- Authorization servers: PKCE enforcement, codes, metadata, introspection, revocation, dynamic client registration, and cross-device flow mitigations from RFC 10027.
- Delegation with token exchange and Rich Authorization Requests.
- Drafts with a recorded posture: OAuth 2.1, Client ID Metadata Documents, identity chaining, rfc7523bis, attestation-based client authentication, first-party apps, transaction tokens, RAR remediation, the Security BCP update, refresh token expiration, SPIFFE client authentication and deferred token responses.
- Upgrading OAuth 2.0 to the OAuth 2.1 rules, and replacing OAuth 1.0.

## Versions

| Line      | Status           |
| --------- | ---------------- |
| OAuth 2.1 | preview (build)  |
| OAuth 2.0 | current          |
| OAuth 1.0 | legacy (replace) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749), [RFC 6750](https://www.rfc-editor.org/rfc/rfc6750), [RFC 7636](https://www.rfc-editor.org/rfc/rfc7636), [RFC 7591](https://www.rfc-editor.org/rfc/rfc7591), [RFC 7662](https://www.rfc-editor.org/rfc/rfc7662), [RFC 7009](https://www.rfc-editor.org/rfc/rfc7009), [RFC 8414](https://www.rfc-editor.org/rfc/rfc8414), [RFC 8628](https://www.rfc-editor.org/rfc/rfc8628), [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693), [RFC 8705](https://www.rfc-editor.org/rfc/rfc8705), [RFC 8707](https://www.rfc-editor.org/rfc/rfc8707), [RFC 9068](https://www.rfc-editor.org/rfc/rfc9068), [RFC 9207](https://www.rfc-editor.org/rfc/rfc9207), [RFC 9396](https://www.rfc-editor.org/rfc/rfc9396), [RFC 9449](https://www.rfc-editor.org/rfc/rfc9449), [RFC 9470](https://www.rfc-editor.org/rfc/rfc9470) and [RFC 9728](https://www.rfc-editor.org/rfc/rfc9728): RFC, Proposed Standard.
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700), [RFC 10017](https://www.rfc-editor.org/rfc/rfc10017) and [RFC 10027](https://www.rfc-editor.org/rfc/rfc10027): RFC, Best Current Practice.
- [RFC 7592](https://www.rfc-editor.org/rfc/rfc7592): RFC, Experimental.
- [RFC 5849](https://www.rfc-editor.org/rfc/rfc5849): RFC, Informational, obsoleted by RFC 6749.
- [OAuth 2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-16): WG draft, -16.
- [OAuth Client ID Metadata Document](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-client-id-metadata-document-02): WG draft, -02.
- [Transaction Tokens](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-transaction-tokens-11): WG draft, -11.
- [OAuth Identity and Authorization Chaining Across Domains](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-identity-chaining-17): RFC Editor queue, -17.
- [Updates to JWT Client Authentication and Assertion-Based Authorization Grants](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rfc7523bis-11): RFC Editor queue, -11.
- [OAuth 2.0 Attestation-Based Client Authentication](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-attestation-based-client-auth-11): WG draft, -11.
- [OAuth 2.0 for First-Party Applications](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-first-party-apps-04): WG draft, -04.
- [OAuth 2.0 RAR Metadata and Error Remediation](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar-metadata-remediation-00): WG draft, -00.
- [Updates to OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-update-03): WG draft, -03.
- [OAuth 2.0 Refresh Token and Authorization Expiration](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-refresh-token-expiration-03): WG draft, -03.
- [OAuth SPIFFE Client Authentication](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-spiffe-client-auth-02): WG draft, -02.
- [Deferred Token Response](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-deferred-token-response-00): WG draft, -00.

## License

MIT
