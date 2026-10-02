# IPSIE Working Group: Interoperability Profiling for Secure Identity in the Enterprise

There is no dedicated skill for this family. This file is the reference.

The IPSIE working group develops interoperability and security profiles of existing specifications for secure identity management in the enterprise.

Index: [IPSIE – Specifications](https://openid.net/wg/ipsie/specifications/), checked 2026-10-02. Note that the page's Overview and Charter links point to the AuthZEN working group pages.

## Specifications

| Maturity             | Entries on 2026-10-02 |
| -------------------- | --------------------- |
| Final Specifications | None yet.             |
| Implementer's Drafts | None yet.             |
| Drafts               | IPSIE v1 Draft.       |

## IPSIE v1 Draft

- URL listed: <https://github.com/openid/ipsie/blob/main/ipsie-v1-draft.md>. That page returned HTTP 503 on 2026-10-02; the same file was read from <https://raw.githubusercontent.com/openid/ipsie/main/ipsie-v1-draft.md>. Its last commit is dated 7 January 2025.
- Maturity: Draft.
- What it contains: a framing of requirements for a B2B SaaS application, not yet a profile. It lists user and group provisioning and deprovisioning with the customer's workforce IdP, federated authentication, least-privilege access, conveying and confirming required authentication and identity verification levels, notification of revoked tokens and invalidated sessions, real-time account and device posture signals, and enforcing enterprise policy.
- When to use it: to see which problems IPSIE targets. For implementation today, the relevant existing specifications are OpenID Connect ([`connect.md`](connect.md)) and Shared Signals ([`shared-signals.md`](shared-signals.md)); the only provisioning profile on the OpenID Foundation index is FastFed's archived SCIM profile ([`fastfed.md`](fastfed.md)). Track IPSIE; nothing here can be pinned yet.
