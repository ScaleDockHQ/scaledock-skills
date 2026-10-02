# MODRNA Working Group: CIBA and mobile operator profiles

There is no dedicated skill for this family. This file is the reference.

The MODRNA working group develops a profile of OpenID Connect for mobile network operators (MNOs) that provide identity services to relying parties, and for RPs that consume them. Its best-known output, CIBA Core, is used well beyond mobile operators; FAPI profiles it for high-security APIs (see [`fapi.md`](fapi.md)).

Index: [MODRNA Working Group – Specifications](https://openid.net/wg/modrna/specifications/), checked 2026-10-02. Dates come from each document's header, read on 2026-10-02.

## Final Specifications

### OpenID Connect Client-Initiated Backchannel Authentication Flow - Core 1.0

- URL: <https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html>
- Maturity: Final. Revision: September 1, 2021.
- Errata: the working group lists [draft 06 incorporating errata set 1](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0-06.html) (23 January 2025) under Drafts. Review it before implementing; it is not yet listed as an approved errata correction.
- What it defines: an authentication flow in which the RP talks directly to the OP without browser redirects. The user starts at the RP on a Consumption Device and authenticates and consents on a separate Authentication Device. An RP that has an identifier for the user can obtain tokens this way.
- When to implement: when the user authenticates and consents on a different device from the one on which they use the RP.
- Replaces: [OpenID Connect MODRNA Client initiated Backchannel Authentication Flow 1.0](https://openid.net/specs/openid-connect-modrna-client-initiated-backchannel-authentication-1_0.html) (March 6, 2017).

## Implementer's Drafts

### OpenID Connect MODRNA Authentication Profile 1.0

- URL: <https://openid.net/specs/openid-connect-modrna-authentication-1_0-ID1.html>
- Maturity: Implementer's Draft 1. Revision: March 06, 2017. The unversioned URL serves the same document.
- What it defines: how an RP requests a level of assurance for authentication by an MNO, an encrypted login hint token for transporting user identifiers privately, and a parameter that interlocks the consumption device and the authentication device.
- When to implement: an RP or OP in an MNO identity service.

### OpenID Connect Account Porting

- URL: <https://openid.net/specs/openid-connect-account-porting-1_0-ID1.html>
- Maturity: Implementer's Draft 1. Revision: March 6, 2017. The unversioned URL serves the same document.
- What it defines: how a user ports from one OpenID Provider to another so that RPs can recognise and verify the change automatically.
- When to implement: an ecosystem where users move between OpenID Providers and RPs must follow the move.

### OpenID Connect User Questioning API 1.0

- URL: <https://openid.net/specs/openid-connect-user-questioning-api-1_0-ID2.html>
- Maturity: Implementer's Draft 2. Revision: July 15, 2020. The unversioned URL serves the same document.
- What it defines: an OP API that an application uses to send a question to a user who need not be interacting with the application. The answer returns asynchronously, signed by the OP.
- When to implement: asynchronous user confirmation through the OP.

## Drafts

| Specification                                                                                                                                                                                                    | Revision                    | What it defines                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [OpenID Connect Client-Initiated Backchannel Authentication Flow - Core 1.0 - draft 06 incorporating errata set 1](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0-06.html) | 23 January 2025             | Proposed errata for CIBA Core.                                                                                             |
| [OpenID Connect MODRNA Discovery Profile 1.0](https://openid.net/specs/openid-connect-modrna-discovery-1_0.html)                                                                                                 | Draft-05, November 12, 2018 | OP issuer discovery from mobile identifiers such as MSISDNs, where Discovery 1.0 normalisation does not work.              |
| [OpenID Connect Mobile Registration Profile 1.0](https://openid.net/wordpress-content/uploads/2014/04/draft-mobile-registration-01.html)                                                                         | Draft-01, October 29, 2015  | How an RP registers dynamically with an MNO. The working group page calls it "OpenID Connect MODRNA Registration Profile". |
| [MODRNA: Client Initiated Backchannel Authentication Profile 1.0](https://openid.net/specs/openid-connect-modrna-client-initiated-backchannel-authentication-profile-1_0.html)                                   | Draft-03, April 30, 2020    | A MODRNA profile of CIBA Core.                                                                                             |
