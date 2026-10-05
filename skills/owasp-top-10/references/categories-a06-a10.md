# Categories A06 to A10 (2025), and what the list leaves out

Read this for step 4 of the workflow. Same form and citation scheme as [`categories-a01-a05.md`](categories-a01-a05.md): (A07:2025 Prevent 10) is the tenth "How to prevent" bullet. A06 and A10 write parts of their guidance as paragraphs; those are cited as paragraphs, for example (A10:2025 Prevent ¶2). Sources: the 2025 category pages and Next Steps, listed in [Sources](../SKILL.md#sources).

## A06:2025 Insecure Design

Data: 39 CWEs, average incidence 1.86%, exploit 6.96, impact 4.05, 7,647 CVEs. Down from #4 as A02 and A03 move up; introduced in 2021.

"Missing or ineffective control design." Insecure design differs from insecure implementation: a secure design can still have implementation defects, but an insecure design cannot be fixed by a perfect implementation, because the needed controls were never created. A contributing factor is missing business risk profiling, so nobody decides what level of security design is required (Description ¶1). This includes business logic flaws, such as not defining unwanted or unexpected state changes (Background).

Three key parts (Description):

- **Requirements and resource management.** Collect and negotiate business requirements, including confidentiality, integrity, availability and authenticity of all data assets and the expected business logic; consider exposure and tenant segregation; compile functional and non-functional security requirements; budget for security activities.
- **Secure design.** Integrate threat modelling into refinement sessions; look for changes in data flows and access control; agree the correct flow and failure states of each story and document them in the story.
- **Secure development lifecycle.** Secure design patterns, a paved road, a secure component library, tooling, threat modelling and incident post-mortems; involve security specialists from the start; consider OWASP SAMM.

How to prevent:

1. Establish and use a secure development lifecycle with AppSec professionals evaluating security and privacy controls.
2. Establish and use a library of secure design patterns or paved-road components.
3. Threat-model critical parts: authentication, access control, business logic and key flows.
4. Use threat modelling as an educational tool.
5. Integrate security language and controls into user stories.
6. Integrate plausibility checks at each tier, frontend to backend.
7. Write unit and integration tests proving critical flows resist the threat model; compile use cases and misuse cases for each tier.
8. Segregate tiers at system and network layers by exposure and protection needs.
9. Segregate tenants robustly by design throughout all tiers.

Scenarios: credential recovery with "questions and answers", which NIST 800-63b, the ASVS and the Top 10 prohibit, must be replaced by a secure design; a group booking discount capped at fifteen attendees lets an attacker book six hundred seats across all cinemas in a few requests; a shop with no anti-bot design sells high-end video cards to scalpers.

Notable CWEs: CWE-256, 269, 434 (unrestricted upload), 501 (trust boundary violation), 522. Also mapped: CWE-73, 183, 266, 286, 311, 312, 313, 316, 362 (race condition), 382, 419, 436, 444 (request smuggling), 451, 454, 472, 525, 539, 598 (sensitive query strings in GET), 602 (client-side enforcement), 628, 642, 646, 653, 656 (security through obscurity), 657, 676, 693, 799 (interaction frequency), 807, 841 (behavioral workflow), 1021 (UI layers, clickjacking), 1022 (`window.opener`), 1125.

## A07:2025 Authentication Failures

Data: 36 CWEs, average incidence 2.92%, exploit 7.69, impact 4.44, 7,147 CVEs. Stays #7; renamed from Identification and Authentication Failures.

An attacker tricks the system into recognising an invalid or incorrect user as legitimate. Weaknesses exist if the application (Description):

1. Permits automated attacks such as credential stuffing, including hybrid attacks (password spray) that try variations of spilled credentials (`Password1!`, `Password2!`).
2. Permits brute force or other scripted attacks that are not quickly blocked.
3. Permits default, weak or well-known passwords.
4. Lets users create accounts with known-breached credentials.
5. Uses weak credential recovery, such as knowledge-based answers, which cannot be made safe.
6. Stores passwords in plain text, encrypted or weakly hashed (see A04).
7. Has missing or ineffective MFA.
8. Allows weak fallbacks when MFA is unavailable.
9. Exposes the session identifier in the URL, a hidden field or another client-accessible location.
10. Reuses the same session identifier after successful login.
11. Does not invalidate sessions or tokens (mainly SSO tokens) at logout or after inactivity.
12. Does not assert the scope and intended audience of the provided credentials.

How to prevent:

1. Implement and enforce MFA where possible.
2. Encourage and enable password managers.
3. Do not ship or deploy default credentials, particularly for admins.
4. Check new or changed passwords against a list such as the top 10,000 worst passwords.
5. At account creation and password change, check against known breached credentials.
6. Align length, complexity and rotation policy with NIST 800-63b section 5.1.1, or another evidence-based policy.
7. Do not force rotation unless a breach is suspected; then force resets immediately.
8. Harden registration, recovery and API paths against account enumeration with the same message for all outcomes.
9. Limit or increasingly delay failed logins without creating a denial of service; log failures and alert on credential stuffing or brute force.
10. Use a server-side, secure, built-in session manager that issues a new high-entropy random session ID after login; keep it out of the URL, in a secure cookie, invalidated after logout, idle and absolute timeouts.
11. Ideally use a premade, well-trusted system for authentication, identity and session management.
12. Verify the intended use of credentials: for JWTs, validate `aud`, `iss` and scopes.

Scenarios: credential stuffing and hybrid stuffing (`Winter2025` to `Winter2026`) turn the application into a password oracle; passwords as the sole factor, with rotation and complexity rules that push reuse, cause most successful attacks; a browser tab closed instead of logging out, or SSO without single logout, leaves the next user of the browser authenticated.

Notable CWEs: CWE-259, 297, 287, 384 (session fixation), 798 (hard-coded credentials). Also mapped: CWE-258, 288 to 291, 293, 294 (capture-replay), 295 (certificate validation), 298, 299, 300, 302 to 309, 346 (origin validation), 350, 521, 613 (session expiration), 620, 640 (weak recovery), 940, 941, 1390, 1391, 1392, 1393.

## A08:2025 Software or Data Integrity Failures

Data: 14 CWEs, average incidence 2.75%, exploit 7.11, impact 4.79, 3,331 CVEs. Stays #8; "and" became "or". Integrity of software, code and data artifacts at a lower level than A03.

Code and infrastructure that let invalid or untrusted code or data be treated as trusted: plugins, libraries or modules from untrusted sources, repositories and CDNs; CI/CD that pulls unverified code or artifacts; auto-update without sufficient integrity verification; serialized objects an attacker can see and modify (insecure deserialization) (Description).

How to prevent:

1. Use digital signatures or similar mechanisms to verify software or data comes from the expected source unaltered.
2. Consume libraries and dependencies (npm, Maven) only from trusted repositories; at higher risk, host a vetted internal repository.
3. Review code and configuration changes so malicious code or configuration cannot enter the pipeline.
4. Give the CI/CD pipeline proper segregation, configuration and access control.
5. Do not accept unsigned or unencrypted serialized data from untrusted clients without an integrity check or digital signature that detects tampering or replay.

Scenarios: `support.myCompany.com` is a DNS alias to a support provider, so every `myCompany.com` cookie, including authentication cookies, reaches the provider; firmware updates without signatures; a package downloaded from a website instead of the trusted package manager carries malicious code; serialized user state passed back and forth (the base64 `rO0` Java signature) yields remote code execution.

Notable CWEs: CWE-829, 915 (mass assignment of object attributes), 502 (deserialization). Also mapped: CWE-345, 353, 426, 427, 494 (download without integrity check), 506, 509, 565, 784, 830 (web functionality from an untrusted source), 926.

## A09:2025 Security Logging & Alerting Failures

Data: 5 CWEs, average incidence 3.91%, exploit 7.19, impact 2.65, 723 CVEs. Stays #9, voted in by the community survey; renamed from Logging and Monitoring to stress alerting. Hard to test and underrepresented in data.

Insufficient logging, monitoring, detection and alerting occurs when (Description):

1. Auditable events (logins, failed logins, high-value transactions) are not logged, or logged inconsistently.
2. Warnings and errors produce no, inadequate or unclear log messages.
3. Log integrity is not protected from tampering.
4. Application and API logs are not monitored for suspicious activity.
5. Logs are only stored locally and not backed up.
6. Alerting thresholds and escalation are missing or ineffective; alerts are not reviewed in reasonable time.
7. Penetration tests and DAST scans do not trigger alerts.
8. Active attacks cannot be detected, escalated or alerted in (near) real time.
9. Logging and alerting events are visible to a user or attacker (see A01), or sensitive data such as PII or PHI is logged.
10. Log data is not correctly encoded, exposing logging and monitoring systems to injection.
11. Errors and exceptional conditions are mishandled so the system never knows, and never logs, that there was a problem.
12. Alerting use cases are missing or outdated.
13. Too many false positives hide important alerts.
14. Playbooks for alert use cases are incomplete, outdated or missing.

How to prevent, by application risk:

1. Log all login, access control and server-side input validation failures with enough user context, retained long enough for delayed forensics.
2. Log every security control, whether it succeeds or fails.
3. Generate logs in a format log management solutions can consume.
4. Encode log data correctly to prevent injection into logging or monitoring systems.
5. Give all transactions an audit trail with integrity controls against tampering or deletion, such as append-only tables.
6. Roll back and restart every transaction that throws an error; always fail closed.
7. Alert when the application or its users behave suspiciously; give developers guidance on it.
8. Establish monitoring and alerting use cases with playbooks so the SOC detects and responds quickly.
9. Add honeytokens, which generate near-zero-false-positive alerts on access.
10. Optionally use behaviour analysis and AI to lower false positives.
11. Adopt an incident response and recovery plan, such as NIST 800-61r2 or later; teach developers what attacks look like.

Scenarios: a children's health plan provider learns from an outside party that 3.5 million records were accessed and modified, possibly for over seven years; a third-party cloud host notifies an airline of a breach late; an airline's payment application breach exposes 400,000 records and draws a 20 million pound GDPR fine.

Mapped CWEs: CWE-117 (log output neutralization), 221, 223, 532 (sensitive data in logs), 778 (insufficient logging).

## A10:2025 Mishandling of Exceptional Conditions

Data: 24 CWEs, average incidence 2.95%, exploit 7.11, impact 3.81, 3,416 CVEs. New in 2025, partly from CWEs previously filed under poor code quality.

Programs fail to prevent, detect or respond to unusual and unpredictable situations, leading to crashes, unexpected behaviour and vulnerabilities. Causes: missing, poor or incomplete input validation; late, high-level error handling instead of handling where the error occurs; unexpected environment states (memory, privilege, network); inconsistent or absent exception handling. "Any time an application is unsure of its next instruction, an exceptional condition has been mishandled." Results include logic bugs, overflows, race conditions, fraudulent transactions and memory, state, resource, timing, authentication and authorization issues (Description).

How to prevent:

1. Plan for the worst: catch every possible system error where it occurs and handle it meaningfully: inform the user understandably, log the event, alert when justified. Keep a global exception handler for anything missed, and monitoring that spots repeated errors indicating an attack (Prevent ¶1).
2. Part way through a transaction, roll back every part and start again (fail closed); partial recovery creates unrecoverable mistakes (Prevent ¶2).
3. Add rate limiting, resource quotas and throttling wherever possible: "Nothing in information technology should be limitless" (Prevent ¶3).
4. Consider emitting identical repeated errors above a rate as statistics appended to the original message, so logging and monitoring still work (Prevent ¶4).
5. Use strict input validation (sanitising or escaping hazardous characters you must accept), and centralized error handling, logging, monitoring and alerting in one place, done the same way each time. Write security requirements for this, threat-model it, code-review or statically analyse it, and run stress, performance and penetration tests (Prevent ¶5).
6. Handle exceptional conditions the same way across the organization, to ease review and audit (Prevent ¶6).

Scenarios: file-upload exceptions that never release resources exhaust them (denial of service); database errors shown to the user become reconnaissance for SQL injection; a multi-step transfer (debit, credit, log) interrupted by network disruption is not rolled back, letting the attacker drain an account or credit the destination several times.

Notable CWEs: CWE-209 (error message with sensitive information), 234, 274, 476 (NULL dereference), 636 (failing open). Also mapped: CWE-215, 235, 248 (uncaught exception), 252 (unchecked return value), 280, 369, 390, 391, 394, 396, 397, 460, 478, 484, 550, 703, 754, 755, 756 (missing custom error page).

## What the list leaves out

The Top 10 is limited to ten categories. Next Steps lists three "on the cusp" risks worth remediating in a mature program; they are not A-categories, so file them under their X IDs (or as outside the list), never under an A ID:

- **X01:2025 Lack of Application Resilience**, a renaming of 2021's Denial of Service: uncontrolled resource consumption, decompression bombs, uncontrolled recursion, infinite loops (CWE-400, 409, 674, 835 in its background). Prevent with limits, quotas and failover, input size limits, no blocking synchronous calls in request threads, circuit breakers and bulkheads, load testing, and session time and storage limits. Its published mapped-CWE list repeats A06's list, so cite the CWEs named in its background.
- **X02:2025 Memory Management Failures**: buffer overflows, use after free, integer overflow and similar (CWE-119 to 122, 124 to 126, 190, 416, 787 and others). Prefer memory-safe languages; otherwise enable ASLR, DEP and SEHOP, use managed buffers, fuzz every input and fix all compiler warnings.
- **X03:2025 Inappropriate Trust in AI Generated Code ('Vibe Coding')**: no CVEs or CWEs. You must be able to read and fully understand all code you submit; review AI-assisted code with your own eyes and security tooling; do not vibe-code complex, business-critical or long-lived programs.

Risks specific to APIs and to LLM applications have their own OWASP lists (see Related skills in SKILL.md).
