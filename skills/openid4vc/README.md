# openid4vc

An agent skill for OpenID for Verifiable Credentials: it builds and reviews credential issuers, wallets and verifiers that use OpenID4VCI 1.0, OpenID4VP 1.0 and the HAIP 1.0 profile, and upgrades implementations built on their Implementer's Drafts.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openid4vc
```

Then ask your agent to "add an OpenID4VP verifier that requests an SD-JWT VC over the Digital Credentials API" or "review this issuer against OpenID4VCI 1.0 and HAIP".

## What it covers

- OpenID4VCI: issuer metadata, credential offers, authorization code and pre-authorized code flows, nonce, credential, deferred and notification endpoints, key proofs, and key and wallet attestations.
- OpenID4VP: requests, client identifier prefixes, response modes, response encryption, errors and VP token validation, with TypeScript.
- DCQL queries, claims path pointers and selection rules.
- OpenID4VP over the W3C Digital Credentials API.
- SD-JWT VC, ISO mdoc and W3C VCDM parameters as the OpenID specifications define them.
- HAIP 1.0 as a checklist, and the OpenID conformance test plans.
- Upgrades from the Implementer's Drafts, including OpenID4VCI draft 13 and the OpenID4VP ID2 version used by ISO 18013-7 Annex B.

## Versions

| Line                      | Status                |
| ------------------------- | --------------------- |
| OpenID4VCI 1.1            | preview (track)       |
| OpenID4VCI 1.0            | current               |
| OpenID4VCI ID2 (draft 15) | legacy (upgrade from) |
| OpenID4VCI ID1 (draft 13) | legacy (upgrade from) |
| OpenID4VP 1.1             | preview (track)       |
| OpenID4VP 1.0             | current               |
| OpenID4VP ID3 (draft 23)  | legacy (upgrade from) |
| OpenID4VP ID2 (draft 18)  | legacy (upgrade from) |
| HAIP 1.1                  | preview (track)       |
| HAIP 1.0                  | current               |
| HAIP ID1 (draft 03)       | legacy (upgrade from) |

`references/versions.md` says which line to use for each specification and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OpenID4VCI 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-final.html): Final, 16 September 2025.
- [OpenID4VP 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0-final.html): Final, 9 July 2025.
- [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0-final.html): Final, 24 December 2025.
- [W3C Digital Credentials](https://www.w3.org/TR/digital-credentials/): Working Draft, 4 September 2026.
- [OpenID4VCI ID1 (draft 13)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-ID1.html) and [ID2 (draft 15)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-ID2.html): Implementer's Drafts, 8 February 2024 and 19 December 2024.
- [OpenID4VP ID2 (draft 18)](https://openid.net/specs/openid-4-verifiable-presentations-1_0-ID2.html) and [ID3 (draft 23)](https://openid.net/specs/openid-4-verifiable-presentations-1_0-ID3.html): Implementer's Drafts, 21 April 2023 and 2 December 2024.
- [HAIP ID1 (draft 03)](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0-ID1.html): Implementer's Draft, 7 February 2025.
- The last drafts before each Final, read for their Document History: [OpenID4VCI draft 17](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-17.html), [OpenID4VP draft 29](https://openid.net/specs/openid-4-verifiable-presentations-1_0-29.html) and [HAIP draft 06](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0-06.html).
- The 1.1 editor's drafts (tracked only): [OpenID4VCI 1.1](https://openid.github.io/OpenID4VCI/openid-4-verifiable-credential-issuance-1_1-wg-draft.html) and [OpenID4VP 1.1](https://openid.github.io/OpenID4VP/openid-4-verifiable-presentations-1_1-wg-draft.html) of 1 October 2026, and [HAIP 1.1](https://openid.github.io/OpenID4VC-HAIP/openid4vc-high-assurance-interoperability-profile-1_1-wg-draft.html) of 24 September 2026.
- The OpenID4VC Security and Trust working-group draft (tracked only), the DCP WG specifications page, and the two OpenID conformance testing pages.

## License

MIT
