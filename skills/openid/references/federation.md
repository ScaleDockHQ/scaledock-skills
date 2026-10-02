# OpenID Federation (AB/Connect Working Group)

Install the dedicated skill: `npx skills add ScaleDockHQ/scaledock-skills --skill openid-federation`

OpenID Federation defines how parties in a multilateral federation establish trust through a third party: Entity Statements, Trust Chains, metadata policy and federation endpoints. The AB/Connect working group publishes it.

Index: [AB/Connect Working Group – Specifications](https://openid.net/wg/connect/specifications/) and [Explore All Specifications](https://openid.net/developers/specs/), checked 2026-10-02. Dates and status come from each document's header, read on 2026-10-02.

## Final Specifications

| Specification                                                                                           | Maturity and revision   | What it defines and when to implement it                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [OpenID Federation 1.0](https://openid.net/specs/openid-federation-1_0-final.html)                      | Final, 17 February 2026 | The basic components for multilateral federations, and how to apply them to OpenID Connect and OAuth 2.0. The unversioned [openid-federation-1_0.html](https://openid.net/specs/openid-federation-1_0.html) serves the same document. |
| [OpenID Federation 1.1](https://openid.net/specs/openid-federation-1_1.html)                            | Final, 5 May 2026       | The protocol-independent functionality of OpenID Federation 1.0. Implement for trust establishment in any protocol.                                                                                                                   |
| [OpenID Federation for OpenID Connect 1.1](https://openid.net/specs/openid-federation-connect-1_1.html) | Final, 5 May 2026       | The protocol-specific functionality for OpenID Connect and OAuth 2.0 within a federation. Implement with Federation 1.1 for OPs, RPs and authorization servers.                                                                       |

## Implementer's Drafts

| Specification                                                                                                                   | Maturity and revision                         | What it defines                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [OpenID Federation Subordinate Events Endpoint 1.0](https://openid.net/specs/openid-federation-subordinate-events-1_0-ID1.html) | Implementer's Draft 1 (draft 01), 3 July 2026 | An endpoint where Trust Anchors and Intermediates publish historical events about Immediate Subordinates, such as registration, revocation and key updates. |
| [OpenID Federation Extended Subordinate Listing 1.0](https://openid.net/specs/openid-federation-extended-listing-1_0-ID1.html)  | Implementer's Draft 1 (draft 03), 2 July 2026 | Listing for federations with many Entities, and retrieval of multiple Subordinate Statements in one request.                                                |

## Drafts

| Specification                                                                                                                                                                                                                    | Revision                                            | What it defines                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [OpenID Federation for Wallet Architectures 1.0](https://openid.net/specs/openid-federation-wallet-1_0.html)                                                                                                                     | Draft 05, 15 February 2026                          | Federation entity types for digital wallet architectures.                              |
| [OpenID Federation Entity Collection Endpoint 1.0](https://openid.net/specs/openid-federation-entity-collection-1_0.html)                                                                                                        | Draft 00, 28 April 2026                             | An endpoint returning a filterable list of Entities in a federation or sub-federation. |
| [OpenID Federation Extended Subordinate Listing](https://openid.net/specs/openid-federation-extended-listing-1_0.html) and [Subordinate Events Endpoint](https://openid.net/specs/openid-federation-subordinate-events-1_0.html) | Same drafts as the Implementer's Drafts above today | Working copies.                                                                        |

## Certification

A conformance test guide exists for OpenID Federation ([How to Certify Your Implementation](https://openid.net/certification/how-to-certify-your-implementation/), checked 2026-10-02).
