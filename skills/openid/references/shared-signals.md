# Shared Signals Working Group: SSF, CAEP and RISC

Install the dedicated skill: `npx skills add ScaleDockHQ/scaledock-skills --skill shared-signals`

The Shared Signals working group defines schemas, privacy recommendations and protocols for sharing security events between cooperating services, so that a compromise at one provider does not carry over to accounts at others, and providers can coordinate account recovery. Events are carried as Security Event Tokens (SETs).

Index: [Shared Signals Working Group – Specifications](https://openid.net/wg/sharedsignals/specifications/), checked 2026-10-02. Dates come from each document's header, read on 2026-10-02.

## Final Specifications

| Specification                                                                                                               | Maturity and revision | What it defines                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [OpenID Shared Signals Framework Specification 1.0](https://openid.net/specs/openid-sharedsignals-framework-1_0-final.html) | Final, 29 August 2025 | The framework: a SET profile, subject principals and subject claims, event types, Transmitter Configuration Metadata and its discovery, and stream management. Every Transmitter and Receiver implements it. The index page titles it "OpenID Shared Signals and Events Framework Specification 1.0". |
| [OpenID Continuous Access Evaluation Profile 1.0](https://openid.net/specs/openid-caep-1_0-final.html)                      | Final, 29 August 2025 | CAEP event types, so Transmitters can send continuous updates that let Receivers attenuate access for users, devices, sessions and applications. Implement for session revocation and access re-evaluation.                                                                                           |
| [OpenID RISC Profile Specification 1.0](https://openid.net/specs/openid-risc-1_0-final.html)                                | Final, 29 August 2025 | Risk Incident Sharing and Coordination event types, such as Account Credential Change Required, Account Disabled and Credential Compromise. Implement for account security coordination.                                                                                                              |

The unversioned [openid-sharedsignals-framework-1_0.html](https://openid.net/specs/openid-sharedsignals-framework-1_0.html) serves the Final text today.

## Implementer's Drafts

| Specification                                                                                                             | Maturity and revision                            | Notes                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [OpenID Shared Signals Framework Specification 1.0](https://openid.net/specs/openid-sharedsignals-framework-1_0-ID3.html) | Implementer's Draft 3 (draft 03), 25 June 2024   | Superseded by the Final for new work.                                                                                                                       |
| [OpenID Continuous Access Evaluation Profile 1.0](https://openid.net/specs/openid-caep-1_0-ID2.html)                      | Implementer's Draft 2 (draft 03), 19 June 2024   | Superseded by the Final for new work.                                                                                                                       |
| [OpenID RISC Profile Specification 1.0](https://openid.net/specs/openid-risc-profile-specification-1_0-ID2.html)          | Implementer's Draft 2 (draft 02), April 05, 2022 | Superseded by the Final for new work.                                                                                                                       |
| [CAEP Interoperability Profile 1.0](https://openid.net/specs/openid-caep-interoperability-profile-1_0-ID1.html)           | Implementer's Draft 1 (draft 00), 25 June 2024   | Required SSF endpoint attributes, OAuth 2.0 authorization for those endpoints, and core session-security use cases. The only SSWG document without a Final. |

The Explore All Specifications page still links the CAEP Implementer's Draft as [openid-caep-specification-1_0.html](https://openid.net/specs/openid-caep-specification-1_0.html), which serves draft 02 of August 09, 2021 under the older "Shared Signals and Events Framework" name.

## Working Group Drafts (editors' copies)

- [OpenID Shared Signals Framework Specification 1.0](https://openid.github.io/sharedsignals/openid-sharedsignals-framework-1_0.html): 29 August 2025.
- [OpenID Continuous Access Evaluation Profile 1.0](https://openid.github.io/sharedsignals/openid-caep-1_0.html): 29 August 2025.
- [CAEP Interoperability Profile 1.0 - draft 01](https://openid.github.io/sharedsignals/openid-caep-interoperability-profile-1_0.html): 1 September 2026.
- Risk Information Sharing and Coordination Profile editors' copy: the linked URL `https://openid.github.io/sharedsignals/openid-risc-profile-specification-1_0.html` returned HTTP 404 on 2026-10-02.

## Older drafts

- [Shared Signals Framework Implementer's Draft 2](https://openid.net/specs/openid-sharedsignals-framework-1_0-ID2.html): draft 02, 9 October 2023.
- [CAEP Implementer's Draft 1](https://openid.net/specs/openid-caep-specification-1_0-ID1.html): draft 02, August 09, 2021.
- [OpenID Shared Signals and Events Framework Specification 1.0 - draft 01](https://openid.net/specs/openid-sse-framework-1_0-ID1.html): June 8, 2021, the first framework Implementer's Draft under the earlier name.

## Security analysis

The working group lists a formal security analysis of SSF Transmitter Configuration Discovery (April 2024).

## Certification

A conformance test guide exists for the Shared Signals Framework ([How to Certify Your Implementation](https://openid.net/certification/how-to-certify-your-implementation/), checked 2026-10-02).
