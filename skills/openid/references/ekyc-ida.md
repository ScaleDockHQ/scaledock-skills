# eKYC & Identity Assurance (IDA) Working Group

There is no dedicated skill for this family. This file is the reference.

The working group develops OpenID Connect extensions that standardise how assured identity information is communicated: verified claims, how the verification was done, and how the claims are maintained.

Index: [eKYC & IDA Working Group – Specifications](https://openid.net/wg/ekyc-ida/specifications/), checked 2026-10-02. Dates come from each document's header, read on 2026-10-02.

## Final Specifications

### OpenID Connect for Identity Assurance 1.0

- URL: <https://openid.net/specs/openid-connect-4-identity-assurance-1_0-final.html>
- Maturity: Final. Revision: 1 October 2024.
- Errata: [OpenID Connect for Identity Assurance 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-4-identity-assurance-1_0-errata1.html), 1 July 2026. The unversioned [openid-connect-4-identity-assurance-1_0.html](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html) serves the errata edition today. Pin the errata edition.
- What it defines: an OpenID Connect extension that returns claims together with their verification level and metadata about the verification process. It uses a container element, `verified_claims`, and requires RPs to use the schema in the Identity Assurance Schema Definition.
- When to implement: an OP or RP that exchanges identity data verified under a trust framework, for access control, entitlement decisions or input to further verification processes.

### OpenID Identity Assurance Schema Definition 1.0

- URL: <https://openid.net/specs/openid-ida-verified-claims-1_0-final.html>
- Maturity: Final. Revision: 1 October 2024.
- Errata: [OpenID Identity Assurance Schema Definition 1.0 incorporating errata set 1](https://openid.net/specs/openid-ida-verified-claims-1_0-errata1.html), 1 July 2026. Pin the errata edition.
- What it defines: the payload schema for identity assurance metadata, including the `verified_claims` claim. It is meant to be reusable in other contexts, including OpenID Connect and the W3C VC data model.
- When to implement: alongside Identity Assurance 1.0, or wherever another protocol carries assured identity claims.

### OpenID Connect for Identity Assurance Claims Registration 1.0

- URL: <https://openid.net/specs/openid-connect-4-ida-claims-1_0-final.html>
- Maturity: Final. Revision: 1 October 2024.
- What it defines: additional JWT claims about natural persons that were first defined in earlier Identity Assurance drafts, such as `place_of_birth` and `nationalities`.
- When to implement: when an OP returns these identity attributes, with or without `verified_claims`.

## Implementer's Drafts

- [OpenID Connect for Identity Assurance 1.0, Implementer's Draft 4](https://openid.net/specs/openid-connect-4-identity-assurance-1_0-ID4.html): 19 August 2022. Superseded by the Final; use it only to understand older deployments.

## Drafts

| Specification                                                                                                                                                   | Revision               | What it defines                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [OpenID Connect Authority claims extension](https://openid.bitbucket.io/ekyc/openid-authority.html)                                                             | Snapshot, 25 May 2026  | Verified claims about the relationship between a natural person and another natural person or legal entity, in a form that can be relied upon. |
| [OpenID Connect Advanced Syntax for Claims (ASC) 1.0](https://openid.bitbucket.io/ekyc/openid-connect-advanced-syntax-for-claims.html)                          | Draft 02, 25 May 2026  | "Selective Abort and Omit" and "Transformed Claims", for data minimisation between RP and OP.                                                  |
| [OpenID Attachments 1.0](https://openid.bitbucket.io/ekyc/openid-connect-4-ida-attachments.html)                                                                | Snapshot, 25 May 2026  | A way to represent binary data in JSON payloads, including attachments about the identity of a natural person in OpenID Connect.               |
| [Format-Agnostic Digital Identity Claims and Values: Identity Proofing Extension 1.0](https://openid.net/specs/openid-ida-identity-proofing-extension-1_0.html) | Draft 00, 10 June 2026 | A profile that separates identity proofing assurance claims from cryptographic security claims.                                                |

The working group page says the bitbucket snapshots are built automatically from the master branch.
