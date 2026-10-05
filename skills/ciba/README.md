# ciba

An agent skill for OpenID Connect Client-Initiated Backchannel Authentication (CIBA) Core 1.0: it builds and reviews OpenID Providers and clients for decoupled sign-in, where the user approves on a separate device, and upgrades older drafts.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill ciba
```

Then ask your agent to "add CIBA poll mode to our OpenID Provider", "review our CIBA push callback handler" or "upgrade our MODRNA backchannel client to CIBA Core 1.0".

## What it covers

- Discovery and client registration metadata for poll, ping and push, including pairwise identifiers.
- The backchannel authentication request: hints, `binding_message`, `user_code`, `requested_expiry`, `client_notification_token` and signed request objects.
- The `auth_req_id` acknowledgement and authentication errors.
- The `urn:openid:params:grant-type:ciba` token request, polling rules, ping and push callbacks, push-mode ID Token bindings, and token and push errors.
- Security and privacy considerations, and a summary of what FAPI-CIBA adds.

## Versions

| Line                                  | Status                |
| ------------------------------------- | --------------------- |
| CIBA Core 1.0 errata set 1 draft      | preview (track)       |
| CIBA Core 1.0                         | current               |
| CIBA Core Implementer's Draft 2       | legacy (upgrade from) |
| CIBA Core Implementer's Draft 1       | legacy (upgrade from) |
| MODRNA CIBA 1.0 Implementer's Draft 1 | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [CIBA Core 1.0](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html): Final, 1 September 2021.
- [CIBA Core 1.0 draft 06 incorporating errata set 1](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0-06.html): Draft, 23 January 2025.
- [CIBA Core draft-04](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0-04.html), [Implementer's Draft 2](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0-ID2.html) and [Implementer's Draft 1](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0-ID1.html).
- [MODRNA CIBA 1.0](https://openid.net/specs/openid-connect-modrna-client-initiated-backchannel-authentication-1_0.html): Implementer's Draft 1, 6 March 2017.
- [OpenID Specifications](https://openid.net/developers/specs/), the [MODRNA Working Group](https://openid.net/wg/mobile/) page and its [specifications](https://openid.net/wg/modrna/specifications/) page.
- [FAPI-CIBA](https://openid.net/specs/openid-financial-api-ciba-ID1.html): Implementer's Draft 1, and its [working copy](https://openid.bitbucket.io/fapi/fapi-ciba.html) of 26 June 2026.
- [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749), [RFC 8414](https://www.rfc-editor.org/rfc/rfc8414) and [RFC 8628](https://www.rfc-editor.org/rfc/rfc8628): RFC (Proposed Standard).

## License

MIT
