# openid-federation

An agent skill for OpenID Federation: building and validating trust chains, entity statements, metadata policy and trust marks, and registering clients across a federation.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openid-federation
```

Then ask your agent to "resolve and validate the trust chain for this OpenID Provider and apply the federation's metadata policy".

## What it covers

- Entity Configurations at `/.well-known/openid-federation`, Subordinate Statements, their claims and validation.
- Trust chain collection from `authority_hints`, validation, selection, expiry, constraints and key rollover.
- Metadata policy: the seven standard operators, combination and merge rules, resolution and application.
- Trust marks, delegation, and the status, listing and issuance endpoints.
- The fetch, list, resolve and historical keys endpoints, client authentication and error codes.
- Automatic and Explicit Registration for OpenID Connect and OAuth 2.0.
- The Subordinate Events Endpoint and Extended Subordinate Listing drafts at track posture.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OpenID Federation 1.0](https://openid.net/specs/openid-federation-1_0-final.html): Final, 17 February 2026.
- [OpenID Federation 1.1](https://openid.net/specs/openid-federation-1_1.html): Final, 5 May 2026.
- [OpenID Federation for OpenID Connect 1.1](https://openid.net/specs/openid-federation-connect-1_1.html): Final, 5 May 2026.
- [OpenID Connect Relying Party Metadata Choices 1.0](https://openid.net/specs/openid-connect-rp-metadata-choices-1_0-final.html): Final, 25 March 2026.
- [OpenID Federation Subordinate Events Endpoint 1.0](https://openid.net/specs/openid-federation-subordinate-events-1_0-ID1.html): Implementer's Draft, ID1 (draft 01, 3 July 2026).
- [OpenID Federation Extended Subordinate Listing 1.0](https://openid.net/specs/openid-federation-extended-listing-1_0-ID1.html): Implementer's Draft, ID1 (draft 03, 2 July 2026).

## License

MIT
