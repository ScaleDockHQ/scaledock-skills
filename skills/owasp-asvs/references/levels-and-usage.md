# Levels and usage

Read this when choosing a level, deciding which chapters apply, building a requirement list, verifying, writing a report, or putting ASVS into a contract. Source: ASVS 5.0.0 "What is the ASVS?" and "Assessment and Certification", listed in [Sources](../SKILL.md#sources).

## Scope of the standard

ASVS defines its scope by its four words (What is the ASVS?, Scope of the ASVS):

- **Application**: the software product being built. ASVS states security outcomes, not lifecycle activities or CI/CD. Components that serve, modify or validate HTTP traffic (WAFs, load balancers, proxies) count as part of the application for caching, rate limiting and connection restrictions. DNS, backups and other processes outside the application's control are out of scope.
- **Security**: every requirement must have a demonstrable security impact. Functional aspects, code style and policy are out of scope.
- **Verification**: every requirement must be verifiable with a pass or fail result.
- **Standard**: ASVS holds requirements only. How to implement belongs to the OWASP Cheat Sheet Series; how to test belongs to the OWASP Web Security Testing Guide.

Requirements are "must" statements. Recommendations ("should") are not requirements (What is the ASVS?, Requirement). Items that were considered but not made mandatory are in Appendix D.

## The three levels in 5.0

Levels are assigned by priority: risk reduction (confidentiality, integrity, availability, and whether the control is a first layer of defense or defense in depth) weighed against implementation effort, while keeping a low barrier to entry (What is the ASVS?, Level evaluation).

| Level | Share of requirements | Character                                                                                                                                                                                  |
| ----- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| L1    | about 20% (70)        | Critical or basic first-layer defenses against common attacks that need no other vulnerability or precondition. Some password rules sit here.                                              |
| L2    | about 50% (183)       | Less common attacks or more complicated protections against common ones. Meeting L2 means meeting about 70% of the standard. "Most applications should be striving to achieve this level." |
| L3    | about 30% (92)        | Defense-in-depth or hard-to-implement controls, for applications that must demonstrate the highest level of security.                                                                      |

Counts are from the 5.0.0 flat JSON (345 requirements). Sources: What is the ASVS?, Level 1, Level 2 and Level 3.

- Levels are cumulative. The level of a requirement is the level from which it is required; higher-level requirements are recommendations for a lower-level target (What is the ASVS?, Application Security Verification Levels).
- L1 is not necessarily black-box testable; it may need documentation or code (What is the ASVS?, Level 1).
- Some requirements apply at one level with stricter conditions at higher levels written into the text (What is the ASVS?, Application Security Verification Levels). Examples in 5.0.0: `v5.0.0-2.2.1` (L1 may limit input validation to input used for business or security decisions; L2 and up apply it to all input), `v5.0.0-3.4.1` (HSTS on subdomains from L2), `v5.0.0-3.4.3` (per-response CSP with nonces or hashes at L3), `v5.0.0-5.2.2` (all accepted files from L2), `v5.0.0-6.3.3` (a phishing-resistant hardware factor at L3), `v5.0.0-6.6.1` (no phone or SMS at L3), `v5.0.0-10.4.3` (authorization code lifetime 10 minutes, 1 minute at L3), `v5.0.0-12.1.2` (forward-secret cipher suites only at L3), `v5.0.0-13.3.1` (hardware-backed secrets at L3), `v5.0.0-16.3.2` (log all authorization decisions at L3).

### Which level to aim for

ASVS does not prescribe a level. The organization analyzes its risks and decides, based on the sensitivity of the application and its users' expectations. An early-stage startup with limited sensitive data may start at L1; a bank would struggle to justify less than L3 for online banking (What is the ASVS?, Which level to achieve). Organizations may pull specific higher-level requirements forward for their own risks (What is the ASVS?, Level evaluation).

## Documented security decisions

Some controls depend on rules only the organization can set: allowed file types, input rules, permissions, session timeouts, sensitive-data protection levels. ASVS handles these with documentation requirements (What is the ASVS?, Documented security decisions):

- They are always in the first section of a chapter (`x.1`), though not every chapter has one.
- Each has a related implementation requirement that puts the decision into place, for example `v5.0.0-5.1.1` (permitted file types and sizes) with `v5.0.0-5.2.1` and `v5.0.0-5.2.2`, or `v5.0.0-8.1.1` (authorization rules) with `v5.0.0-8.2.1` and `v5.0.0-8.2.2`.
- Verifying the documentation and verifying the implementation are two separate activities.
- The organization, not individual developers, takes the decisions. They may live in a document or in a mandated common library.

## Picking requirements for an application

The chapter and section split exists so that irrelevant parts can be filtered out: a machine-to-machine API does not need V3, and an application without OAuth or WebRTC can ignore V10 or V17 (What is the ASVS?, The structure of the ASVS). A practical filter:

| If the application…                                                          | Then                                                                                                                                                                         |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| has no browser frontend                                                      | V3 does not apply. V14.3 (client-side data) usually does not either.                                                                                                         |
| exposes HTTP APIs                                                            | V4.1 and V4.2 apply; V4.3 only with GraphQL; V4.4 only with WebSocket.                                                                                                       |
| accepts or serves files                                                      | V5 applies, with V5.1 documenting types and sizes.                                                                                                                           |
| has its own login                                                            | V6.1 to V6.7 apply. With an external identity provider, V6.8 and V7.6 apply.                                                                                                 |
| uses JWTs, SAML assertions or other self-contained tokens                    | V9 applies.                                                                                                                                                                  |
| is an OAuth client, resource server, authorization server or OpenID Provider | Only the matching V10 sections apply (V10.2 client, V10.3 resource server, V10.4 authorization server, V10.5 OIDC client, V10.6 OpenID Provider, V10.7 consent), plus V10.1. |
| is multi-tenant                                                              | `v5.0.0-8.4.1` applies.                                                                                                                                                      |
| is written in a language with unmanaged memory                               | V1.4 applies.                                                                                                                                                                |
| uses WebRTC (TURN, media or signaling servers)                               | V17 applies.                                                                                                                                                                 |

Steps:

1. Download the 5.0.0 flat JSON (or CSV). Each entry has `chapter_id`, `section_id`, `req_id` (for example `V1.2.5`), `req_description` and `L` (1, 2 or 3).
2. Keep entries with `L` at most the target level, in the in-scope sections.
3. Write each id as `v5.0.0-1.2.5` (lowercase `v`, no capital `V` before the chapter).
4. Mark the rest not applicable with a reason, rather than deleting them, so the report can show what was excluded.

Legacy exports (`*.legacy.json`, `*.legacy.csv`, `*.legacy.xml`) still use 4.x-style tick marks for backwards compatibility (Changes Compared to v4.x, Rethinking Level Definitions).

## Verifying

From Assessment and Certification:

- **Reporting**: a report includes the scope, a summary of all requirements checked, the requirements where exceptions were noted, and guidance on resolving issues. Non-applicable requirements (for example session management in a stateless API) must be noted (Verification reporting).
- **Scope**: state the target level and the requirements included, from the point of view of what was included, and give an opinion on the rationale for exclusions. Disclose the testing methods; they should be repeatable (Scope of Verification).
- **Mechanisms**: verification may need documentation, source code, configuration and access to the developers, especially for L2 and L3. Provide evidence (work papers, screenshots, scripts, test logs). Running an automated tool without thorough testing is insufficient (Verification Mechanisms).
- **Automation**: DAST and SAST can cover simple technical requirements such as output encoding, but cannot fully verify business logic or access control. Application-specific automated tests can; "testable using automation != running an off the shelf tool" (The Role of Automated Security Testing Tools).
- **Penetration testing**: prefer documentation- or source-led (hybrid) testing with full access to developers and documentation over black-box tests (The Role of Penetration Testing).
- **Certification**: OWASP certifies no one; organizations may offer assurance services but must not claim official OWASP certification (OWASP's Stance on ASVS Certifications and Trust Marks).

A report row per requirement: versioned id, level, applicable (yes or no, with reason), method, result (pass or fail), evidence, remediation.

## Other uses

From What is the ASVS?, Use cases for the ASVS:

- **Architecture guidance**: architects choose controls for data protection, input validation and similar problems, using the documentation requirements.
- **Secure coding reference**: organizations derive their own clear guidance and approved libraries from ASVS.
- **Automated unit and integration tests**: write tests per requirement, for example abuse cases on a login controller.
- **Training**: teach the positive controls rather than a list of things not to do.
- **Procurement**: the buyer requires that software be developed at ASVS level X and asks the seller to prove it. Name the version as well (`ASVS 5.0.0 Level 2`), require a report in the shape above, and agree how out-of-scope sections are justified.

## Forks

Organizations are encouraged to create an organization- or domain-specific fork, omitting irrelevant sections (for example GraphQL, WebSockets or SOAP if unused), starting from L1 and moving to L2 or L3 by risk. A fork must keep traceability, so that passing a given requirement id means the same in the fork and the standard (What is the ASVS?, Forking the ASVS). An organization-specific version is also the place for implementation guidance, such as the libraries to use (What is the ASVS?, Flexibility with the ASVS, in 5.0.0).
