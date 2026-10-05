# openid-connect

An agent skill for OpenID Connect 1.0: validating ID tokens and building login, logout and discovery for relying parties, resource servers and OpenID Providers, and migrating OpenID 2.0 users.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openid-connect
```

Then ask your agent to "validate ID tokens and add back-channel logout to this relying party".

## What it covers

- ID token validation in the order Core requires, `at_hash` and `c_hash`, key rotation, public and pairwise subjects, and UserInfo.
- The authentication request: `prompt`, `max_age`, `acr_values`, essential `acr`, error codes, `prompt=create` and `unmet_authentication_requirements`.
- Response types and modes, including `form_post`, and login initiated by a third party.
- Discovery, Dynamic Client Registration, sector identifiers and RP Metadata Choices.
- RP-Initiated Logout, Session Management, Front-Channel Logout, and Back-Channel Logout with logout token validation.
- Identity Assurance (`verified_claims`) at summary level, and the Key Binding and IPSIE SL1 drafts at track posture.
- Migrating OpenID Authentication 2.0 users to OpenID Connect with `openid2_id`.

## Versions

| Line                      | Status                |
| ------------------------- | --------------------- |
| OpenID Connect 1.0        | current               |
| OpenID Authentication 2.0 | legacy (upgrade from) |

`references/versions.md` says which line to use, how errata sets apply, and how to migrate OpenID 2.0 users.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OpenID Connect Core 1.0 incorporating errata set 2](https://openid.net/specs/openid-connect-core-1_0.html): Final, errata set 2 (15 December 2023).
- [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0-errata1.html): Final, errata set 1 (8 November 2014).
- [OpenID Connect Discovery 1.0 incorporating errata set 2](https://openid.net/specs/openid-connect-discovery-1_0.html): Final, errata set 2 (15 December 2023).
- [OpenID Connect Dynamic Client Registration 1.0 incorporating errata set 2](https://openid.net/specs/openid-connect-registration-1_0.html): Final, errata set 2 (15 December 2023).
- [OpenID Connect RP-Initiated Logout 1.0](https://openid.net/specs/openid-connect-rpinitiated-1_0.html): Final, 12 September 2022.
- [OpenID Connect Session Management 1.0](https://openid.net/specs/openid-connect-session-1_0.html): Final, 12 September 2022.
- [OpenID Connect Front-Channel Logout 1.0](https://openid.net/specs/openid-connect-frontchannel-1_0.html): Final, 12 September 2022.
- [OpenID Connect Back-Channel Logout 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-backchannel-1_0.html): Final, errata set 1 (15 December 2023).
- [Initiating User Registration via OpenID Connect 1.0](https://openid.net/specs/openid-connect-prompt-create-1_0.html): Final, 2 December 2022.
- [OpenID Connect Core Error Code unmet_authentication_requirements](https://openid.net/specs/openid-connect-unmet-authentication-requirements-1_0.html): Final, June 2019.
- [OpenID Connect Relying Party Metadata Choices 1.0](https://openid.net/specs/openid-connect-rp-metadata-choices-1_0-final.html): Final, 25 March 2026.
- [OAuth 2.0 Form Post Response Mode](https://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html): Final, 27 April 2015.
- [OAuth 2.0 Multiple Response Type Encoding Practices](https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html): Final, 25 February 2014.
- [OpenID Connect for Identity Assurance 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-4-identity-assurance-1_0-errata1.html): Final, errata set 1 (1 July 2026).
- [OpenID Connect Key Binding 1.0](https://openid.net/specs/openid-connect-key-binding-1_0-ID1.html): Implementer's Draft, ID1 (draft 03, 8 September 2026).
- [IPSIE SL1 OpenID Connect Profile](https://openid.github.io/ipsie-openid-sl1/draft-openid-ipsie-sl1-profile.html): Draft, editor's draft of 29 September 2026.

- [OpenID Authentication 2.0](https://openid.net/specs/openid-authentication-2_0.html): Final, 5 December 2007.
- [OpenID 2.0 to OpenID Connect Migration 1.0](https://openid.net/specs/openid-connect-migration-1_0.html): Final, 16 April 2015.

## License

MIT
