# EAP Working Group (archived): Extended Authentication Profile

There is no dedicated skill for this family. This file is the reference.

The EAP working group developed a security and privacy profile of OpenID Connect for strong authentication to OpenID Providers, including use of IETF Token Binding with OpenID Connect and integration with FIDO and other strong authentication technologies. The co-chairs proposed closing the group on June 17, 2025, once EAP ACR Values was final; with no objections by July 1, 2025, the group was disbanded. Questions go to help@oidf.org.

Index: [EAP Working Group – Specifications](https://openid.net/wg/eap/specifications/) and [Archived Groups](https://openid.net/wg/archived-groups/), checked 2026-10-02. Dates come from each document's header, read on 2026-10-02.

## Final Specifications

### OpenID Connect Extended Authentication Profile (EAP) ACR Values 1.0

- URL: <https://openid.net/specs/openid-connect-eap-acr-values-1_0.html>. The index pages link it over `http://`; the `https://` URL serves the same document.
- Maturity: Final. Revision: 15 June 2025.
- What it defines: lets RPs request that specific authentication context classes be applied and lets OPs tell RPs whether the request was satisfied. It defines the ACR values `phr` (Phishing-Resistant) and `phrh` (Phishing-Resistant Hardware-Protected).
- When to implement: an RP that needs phishing-resistant or hardware-protected authentication at the OP, or an OP that advertises it, using `acr_values` and the `acr` claim from OpenID Connect Core.

## Implementer's Drafts

### OpenID Connect Token Bound Authentication 1.0

- URL: <https://openid.net/specs/openid-connect-token-bound-authentication-1_0-ID1.html>. The unversioned URL serves the same document.
- Maturity: Implementer's Draft 1 (draft 04). Revision: October 19, 2018.
- What it defines: how to apply Token Binding to the OpenID Connect ID Token. It builds on the Token Binding Protocol (RFC 8471) and Token Binding over HTTP (RFC 8473), and notes that browsers implementing token binding can bind cookies transparently.
- Status for implementers: the working group is archived and the draft has not progressed since 2018. The pages read for this skill do not state whether browsers support Token Binding today; check current browser and platform support before depending on it. For binding a key to an ID Token, see OpenID Connect Key Binding, which uses DPoP ([`connect.md`](connect.md)).

## Drafts

The working group page points to working copies in the group's repository, <https://bitbucket.org/openid/eap/src>. No further drafts are listed.
