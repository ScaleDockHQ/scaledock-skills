# FAPI Working Group

Install the dedicated skill: `npx skills add ScaleDockHQ/scaledock-skills --skill fapi`

FAPI is a general-purpose, high-security OAuth 2.0 profile for API protection, adopted by open data, open banking and identity ecosystems. The working group "strongly recommends that all new ecosystems adopt FAPI 2.0" and that existing FAPI 1.0 ecosystems plan a transition to FAPI 2.0.

Index: [FAPI Working Group – Specifications](https://openid.net/wg/fapi/specifications/), checked 2026-10-02. Dates come from each document's header, read on 2026-10-02.

## Final Specifications: FAPI 2.0

| Specification                                                                              | Maturity and revision    | What it defines                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-security-profile-2_0-final.html) | Final, 22 February 2025  | A secured OAuth profile with implementation guidelines for security and interoperability, formally verified under the FAPI 2.0 Attacker Model. The starting point for new ecosystems. |
| [FAPI 2.0 Attacker Model](https://openid.net/specs/fapi-attacker-model-2_0-final.html)     | Final, 22 February 2025  | The attacker model behind the security mechanisms of the FAPI profiles. Read it to judge whether a deviation keeps the security goals.                                                |
| [FAPI 2.0 Message Signing](https://openid.net/specs/fapi-message-signing-2_0-final.html)   | Final, 25 September 2025 | Signing and verifying certain FAPI 2.0 Security Profile requests and responses. Implement when an ecosystem needs non-repudiation.                                                    |

## Final Specifications: FAPI 1.0

| Specification                                                                                                                | Maturity and revision  | What it defines                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------- |
| [Financial-grade API Security Profile 1.0 - Part 1: Baseline](https://openid.net/specs/openid-financial-api-part-1-1_0.html) | Final, March 12, 2021  | A secured OpenID Connect and OAuth profile. Existing FAPI 1.0 ecosystems only.        |
| [Financial-grade API Security Profile 1.0 - Part 2: Advanced](https://openid.net/specs/openid-financial-api-part-2-1_0.html) | Final, March 12, 2021  | A highly secured OpenID Connect and OAuth profile. Existing FAPI 1.0 ecosystems only. |
| [JWT Secured Authorization Response Mode for OAuth 2.0 (JARM)](https://openid.net/specs/oauth-v2-jarm-final.html)            | Final, 9 November 2022 | JWT-encoded authorization responses, signed and optionally encrypted.                 |

## Errata Corrections

- [JWT Secured Authorization Response Mode for OAuth 2.0 (JARM) incorporating errata set 1](https://openid.net/specs/oauth-v2-jarm.html): 17 August 2025. The unversioned URL serves this edition; pin it rather than the `-final` text.

## Implementer's Drafts

| Specification                                                                                                                           | Maturity and revision                             | What it defines                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Financial-grade API: Client Initiated Backchannel Authentication Profile](https://openid.net/specs/openid-financial-api-ciba-ID1.html) | Implementer's Draft 1 (Draft-02), August 15, 2019 | A FAPI profile of CIBA for the decoupled flow. The [working copy](https://openid.bitbucket.io/fapi/fapi-ciba.html) is dated 26 June 2026. CIBA Core is in [`modrna.md`](modrna.md).                                                                                                            |
| [Grant Management for OAuth 2.0](https://openid.net/specs/oauth-v2-grant-management-ID1.html)                                           | Implementer's Draft 1, 9 May 2023                 | Lets clients explicitly manage the grants (consents) they hold at the authorization server. The [working copy](https://openid.bitbucket.io/fapi/oauth-v2-grant-management.html) is dated 26 June 2026. The old URL `fapi-grant-management.html` redirects to `oauth-v2-grant-management.html`. |

## Drafts

- [FAPI 2.0 Http Signatures](https://openid.bitbucket.io/fapi/fapi-2_0-http-signatures.html): Draft, 26 June 2026. Methods for clients, authorization servers and resource servers to sign and verify messages.
- FAPI 1.0 Lodging Intent: the working group page says it is now OAuth PAR ([RFC 9126](https://datatracker.ietf.org/doc/html/rfc9126)) plus OAuth RAR.

## Security analyses

The working group page lists formal analyses: FAPI 2.0 (October 2022), FAPI 2.0 Message Signing, DCR, DCM and FAPI-CIBA (October 2023), and the original Financial-grade API (January 2019).

## Certification

Conformance test guides exist for FAPI 2 and FAPI 1 Advanced OPs and for FAPI-CIBA OPs, plus ecosystem guides for Open Finance Brazil and Australian ConnectID ([How to Certify Your Implementation](https://openid.net/certification/how-to-certify-your-implementation/), checked 2026-10-02).
