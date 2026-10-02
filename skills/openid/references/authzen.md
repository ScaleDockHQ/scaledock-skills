# AuthZEN Working Group: Authorization API

Install the dedicated skill: `npx skills add ScaleDockHQ/scaledock-skills --skill authzen`

AuthZEN documents common authorization patterns and defines mechanisms, protocols and formats for communication between authorization components. Its Authorization API lets a Policy Enforcement Point (PEP) ask a Policy Decision Point (PDP) for decisions without either knowing the other's internals.

Index: [AuthZEN – Specifications](https://openid.net/wg/authzen/specifications/), checked 2026-10-02. Dates come from each document's header, read on 2026-10-02.

## Final Specifications

| Specification                                                                | Maturity and revision                                                     | What it defines                                                                                                                                                                        |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Authorization API 1.0](https://openid.net/specs/authorization-api-1_0.html) | Final, 11 January 2026; approved as a Final Specification in January 2026 | Evaluation endpoints for access decisions and search endpoints for subjects, resources and actions, served by the PDP and called by the PEP. Implement for any PEP-to-PDP integration. |

The [current editors' draft](https://openid.github.io/authzen/) is dated 1 October 2026; it is the working version in the repository, not a standard.

## Working Group Drafts

| Specification                                                                                                                                          | Revision                     | What it defines                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [COAZ: A Framework for Mapping Information Models to AuthZEN Authorization Requests](https://openid.github.io/authzen/authzen-coaz-framework-1_0.html) | Draft 1, 13 February 2026    | A protocol-neutral framework for mapping an arbitrary protocol's inputs into Subject-Action-Resource-Context requests, with mapping expressions in CEL by default. |
| COAZ-MCP Binding 1.0                                                                                                                                   | Listed, no separate document | The COAZ binding for the Model Context Protocol. The working group page links it to the same URL as the COAZ framework.                                            |
| [AuthZEN Access Request and Approval Profile](https://openid.github.io/authzen/authzen-access-request-approval-profile-1_0.html)                       | Draft 1, 1 October 2026      | Lets a PEP submit an access request after a requestable denial, with an asynchronous task handle and re-evaluation after approval. A denial stays a denial.        |
| [AuthZEN Profile for Obligations](https://openid.github.io/authzen/authzen-obligations-profile-1_0.html)                                               | Draft 1, 3 July 2026         | Mandatory, machine-readable actions a PDP attaches to a decision, which the PEP must perform, plus discovery and negotiation of supported obligation types.        |

## Previous versions (superseded by the Final)

| Document                                                                                   | Date             | Notes                                                                                                                          |
| ------------------------------------------------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Authorization API 1.0 – draft 03](https://openid.net/specs/authorization-api-1_0-03.html) | 18 March 2025    | Added the subject, resource and action search APIs.                                                                            |
| [Authorization API 1.0 – draft 02](https://openid.net/specs/authorization-api-1_0-02.html) | 23 January 2025  | Added the evaluations endpoint for boxcarred requests.                                                                         |
| [Authorization API 1.0 – draft 01](https://openid.net/specs/authorization-api-1_0-01.html) | 6 September 2024 | The evaluation endpoint. Approved as the first Implementer's Draft in November 2024; the index page lists it as "AuthZEN 1.0". |
| [Authorization API 1.0 – draft 00](https://openid.net/specs/authorization-api-1_0-00.html) | 14 August 2024   | Initial draft for the Identiverse 2024 interop.                                                                                |
