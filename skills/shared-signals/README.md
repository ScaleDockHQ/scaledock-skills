# shared-signals

An agent skill for the OpenID Shared Signals Framework, CAEP and RISC: it builds and reviews transmitters and receivers that exchange signed security events.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill shared-signals
```

Then ask your agent to "add an SSF receiver that revokes sessions on CAEP session-revoked" or "review this transmitter against SSF 1.0".

## What it covers

- Security Event Tokens (RFC 8417) as SSF profiles them, and subject identifiers (RFC 9493 and SSF complex subjects).
- CAEP and RISC event types and their claims.
- Transmitter metadata, the stream management API, status, subjects and verification.
- Receiver discovery, SET validation, and push (RFC 8935) and poll (RFC 8936) delivery, with TypeScript.
- The CAEP Interoperability Profile and the OpenID SSF conformance tests.
- OpenID Connect Back-Channel Logout as a related revocation input.
- Upgrades from the SSF, CAEP and RISC Implementer's Drafts to the 1.0 Finals.

## Versions

| Line                                    | Status                                     |
| --------------------------------------- | ------------------------------------------ |
| SSF 1.0, CAEP 1.0, RISC 1.0             | current (`spec_version` `1_0`)             |
| SSF 1.0 Implementer's Draft 3           | legacy (upgrade from, `1_0-ID3`)           |
| SSF 1.0 Implementer's Draft 2           | legacy (upgrade from, `1_0-ID2`)           |
| SSE Framework 1.0 Implementer's Draft 1 | legacy (upgrade from, `1_0-ID1` or absent) |

No preview is listed: no draft of a line after 1.0 exists. `references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [SSF 1.0](https://openid.net/specs/openid-sharedsignals-framework-1_0-final.html), [CAEP 1.0](https://openid.net/specs/openid-caep-1_0-final.html) and [RISC 1.0](https://openid.net/specs/openid-risc-1_0-final.html): Final, 29 August 2025.
- The Implementer's Drafts of each line: [SSF ID3](https://openid.net/specs/openid-sharedsignals-framework-1_0-ID3.html) (25 June 2024), [SSF ID2](https://openid.net/specs/openid-sharedsignals-framework-1_0-ID2.html) (9 October 2023), [SSE Framework ID1](https://openid.net/specs/openid-sse-framework-1_0-ID1.html) (8 June 2021), [CAEP ID2](https://openid.net/specs/openid-caep-1_0-ID2.html) (19 June 2024), [CAEP ID1](https://openid.net/specs/openid-caep-specification-1_0-ID1.html) (9 August 2021), [RISC ID2](https://openid.net/specs/openid-risc-profile-specification-1_0-ID2.html) (5 April 2022) and the [2018 RISC profile ID1](https://openid.net/specs/openid-risc-profile-1_0-ID1.html) (24 April 2018).
- [CAEP Interoperability Profile ID1](https://openid.net/specs/openid-caep-interoperability-profile-1_0-ID1.html): Implementer's Draft, 25 June 2024, and the [working-group draft 01](https://openid.github.io/sharedsignals/openid-caep-interoperability-profile-1_0.html), 1 September 2026.
- RFC 8417, RFC 8935, RFC 8936 and RFC 9493.
- [OpenID Connect Back-Channel Logout 1.0](https://openid.net/specs/openid-connect-backchannel-1_0.html): Final with errata set 1, 15 December 2023.
- The Shared Signals WG specifications page and the SSF conformance testing page.

## License

MIT
