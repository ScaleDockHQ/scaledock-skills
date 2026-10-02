# openid4vc

An agent skill for OpenID for Verifiable Credentials: it builds and reviews credential issuers, wallets and verifiers that use OpenID4VCI, OpenID4VP and the HAIP profile.

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

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OpenID4VCI 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-final.html): Final, 16 September 2025.
- [OpenID4VP 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0-final.html): Final, 9 July 2025.
- [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0-final.html): Final, 24 December 2025.
- [W3C Digital Credentials](https://www.w3.org/TR/digital-credentials/): Working Draft, 4 September 2026.
- The OpenID4VC Security and Trust working-group draft (tracked only), the DCP WG specifications page, and the two OpenID conformance testing pages.

## License

MIT
