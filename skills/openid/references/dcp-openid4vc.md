# Digital Credentials Protocols (DCP) Working Group: OpenID4VC

Install the dedicated skill: `npx skills add ScaleDockHQ/scaledock-skills --skill openid4vc`

The DCP working group develops OpenID specifications for the Issuer-Holder-Verifier model: issuance and presentation of digital credentials in any format (W3C VCs, IETF SD-JWT VCs, ISO/IEC 18013-5 mdoc and others), and pseudonymous authentication from the End-User to the Verifier. Some of these specifications started in the AB/Connect working group.

Index: [Digital Credentials Protocols (DCP) Working Group – Specifications](https://openid.net/wg/digital-credentials-protocols/specifications/), checked 2026-10-02. Dates come from each document's header, read on 2026-10-02.

## Final Specifications

| Specification                                                                                                                                      | Maturity and revision    | What it defines                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [OpenID for Verifiable Credential Issuance 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)                         | Final, 16 September 2025 | An OAuth-protected API for issuing credentials of any format, with Credential Offers and a Pre-Authorized Code Flow. Implement for credential issuers and wallets.                                                              |
| [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)                                     | Final, 9 July 2025       | Requesting and delivering presentations of credentials on top of OAuth 2.0, including the Digital Credentials Query Language (DCQL) and an annex for use over the Digital Credentials API. Implement for verifiers and wallets. |
| [OpenID4VC High Assurance Interoperability Profile 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0-final.html) | Final, 24 December 2025  | A profile of OpenID4VCI and OpenID4VP with SD-JWT VC and ISO mdoc for ecosystems that need high security and privacy. Implement when an ecosystem mandates HAIP.                                                                |

## Implementer's Drafts

The DCP page lists none at present. The Explore All Specifications page still lists OpenID4VCI under Implementer's Drafts and links [ID1](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-ID1.html) (draft 13, 8 February 2024) as the most recent, but a later [ID2](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-ID2.html) (draft 15, 19 December 2024) exists (checked 2026-10-05). Both are superseded by the Final. OpenID4VP had Implementer's Drafts [ID2](https://openid.net/specs/openid-4-verifiable-presentations-1_0-ID2.html) (draft 18, 21 April 2023) and [ID3](https://openid.net/specs/openid-4-verifiable-presentations-1_0-ID3.html) (draft 23, 2 December 2024), and HAIP had [ID1](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0-ID1.html) (draft 03, 7 February 2025). The `openid4vc` skill lists these as legacy lines with upgrade steps.

## Next versions

The working group repositories carry 1.1 editor's drafts of [OpenID4VCI](https://openid.github.io/OpenID4VCI/openid-4-verifiable-credential-issuance-1_1-wg-draft.html), [OpenID4VP](https://openid.github.io/OpenID4VP/openid-4-verifiable-presentations-1_1-wg-draft.html) (both 1 October 2026) and [HAIP](https://openid.github.io/OpenID4VC-HAIP/openid4vc-high-assurance-interoperability-profile-1_1-wg-draft.html) (24 September 2026). They are Work Group Drafts: track them only.

## Drafts

- [Security and Trust in OpenID for Verifiable Credentials Ecosystems](https://openid.github.io/OpenID4VC_SecTrust/draft-oid4vc-security-and-trust.html): Working Group Draft, 14 March 2024. The trust architecture, security considerations and an informal security analysis of the OpenID4VC protocols.
- OpenID for Verifiable Presentations over BLE: defines how Bluetooth Low Energy can be used to request presentations. The working group links only its [GitHub repository](https://github.com/openid/openid4vp_ble); no rendered draft was listed.

## Security analyses

The working group page lists a formal security analysis of OpenID4VP (July 2025) and a formal analysis of OpenID4VCI and OpenID4VP in the Web Infrastructure Model (October 2023).

## Related work

For harmonisation with ISO/IEC 18013 presentation protocols, see [`dchp.md`](dchp.md). For trust establishment in wallet ecosystems with OpenID Federation, see the Wallet Architectures draft in [`federation.md`](federation.md).

## Certification

Conformance test guides exist for OpenID4VP and OpenID4VCI ([How to Certify Your Implementation](https://openid.net/certification/how-to-certify-your-implementation/), checked 2026-10-02).
