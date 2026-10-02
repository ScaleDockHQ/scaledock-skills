# fapi

An agent skill for the OpenID FAPI profiles: it builds and reviews FAPI 2.0 authorization servers, clients and resource servers, and covers FAPI 1.0, JARM, FAPI-CIBA, Grant Management and certification.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill fapi
```

Then ask your agent to "make this authorization server FAPI 2.0 compliant" or "review this client against the FAPI 2.0 Security Profile".

## What it covers

- FAPI 2.0 Security Profile rules for authorization servers, clients and resource servers: PAR, PKCE S256, DPoP or mTLS, client authentication, `iss`, lifetimes and redirect URIs.
- Algorithms, key sizes and JWKS handling, including the RFC 9864 `Ed25519` identifier.
- FAPI 2.0 Message Signing: signed request objects, JARM, signed introspection and ID tokens.
- FAPI 1.0 Baseline and Advanced, and a migration list to FAPI 2.0.
- The FAPI-CIBA and Grant Management Implementer's Drafts.
- The FAPI 2.0 Attacker Model and security considerations.
- OpenID conformance suite setup for FAPI servers, clients and CIBA.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-security-profile-2_0-final.html): Final, 22 February 2025.
- [FAPI 2.0 Message Signing](https://openid.net/specs/fapi-message-signing-2_0-final.html): Final, 25 September 2025.
- [FAPI 2.0 Attacker Model](https://openid.net/specs/fapi-attacker-model-2_0-final.html): Final, 22 February 2025.
- [FAPI 1.0 Part 1](https://openid.net/specs/openid-financial-api-part-1-1_0.html) and [Part 2](https://openid.net/specs/openid-financial-api-part-2-1_0.html): Final, 12 March 2021.
- [JARM](https://openid.net/specs/oauth-v2-jarm-final.html): Final, 9 November 2022, and [errata set 1](https://openid.net/specs/oauth-v2-jarm.html), 17 August 2025.
- [FAPI-CIBA](https://openid.net/specs/openid-financial-api-ciba-ID1.html) and [Grant Management](https://openid.net/specs/oauth-v2-grant-management-ID1.html): Implementer's Draft 1.
- RFC 9864, RFC 9126, RFC 9207, RFC 9449, RFC 8705, RFC 7523 and RFC 6750.
- The OpenID certification pages and the FAPI WG specifications page.

## License

MIT
