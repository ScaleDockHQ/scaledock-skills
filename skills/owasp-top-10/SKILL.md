---
name: owasp-top-10
description: >-
  OWASP Top 10:2025: review web applications against A01:2025 to A10:2025 and prioritize findings, with
  upgrades from the legacy OWASP Top 10:2021 and 2017 editions (no preview). Walks each category's
  description, mapped CWEs, prevention and attack scenarios: broken access control (IDOR, CSRF, SSRF, CORS),
  security misconfiguration (XXE, headers, verbose errors), software supply chain failures (SBOM, CI/CD,
  dependencies), cryptographic failures (TLS, password hashing), injection (SQL, XSS, OS command), insecure
  design (threat modelling, business logic), authentication failures (credential stuffing, MFA, sessions),
  software or data integrity failures (signing, deserialization), security logging and alerting failures,
  and mishandling of exceptional conditions (fail open, error handling). Use when code reviewing, threat
  modelling or pentest-scoping a web app, classifying a finding by category and CWE, or mapping 2021 or
  2017 IDs to 2025. Triggers: owasp top 10, A01:2025, A03:2025, OWASP 2025, top ten review.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OWASP Top 10

The OWASP Top 10 is the OWASP Top Ten project's awareness document of the most critical web application security risks. OWASP Top 10:2025, its eighth installment, names A01:2025 to A10:2025; each category page gives background and data, the mapped CWEs, a description of when an application is vulnerable, how to prevent it and example attack scenarios. With this skill the agent reviews a web application category by category, classifies each finding by root cause and CWE, and reports it with the matching prevention steps and a severity based on the application's own risk.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Citations name the category and section, with the bullet counted from the top: (A01:2025 Prevent 1) is the first "How to prevent" bullet, (A07:2025 Description 9) the ninth vulnerability bullet; A10's guidance is in paragraphs, cited as (A10:2025 Prevent ¶2). When a rule and the pinned source disagree, the source wins.

## Inputs (fill in, or ask before starting)

- Role and mode: design review, code review, threat model, pentest scope, or finding triage.
- Scope: the applications, hosts, environments, and the build and deployment pipeline behind them.
- Roles and data: user roles, the records each may read or change, and the data classification (which data is sensitive by law, regulation or business need).
- Stack: languages and frameworks, interpreters in use (SQL, NoSQL, OS shell, LDAP, template or expression engines), authentication and session system, and third-party components and registries.
- Target version: OWASP Top 10:2025 (default). OWASP Top 10:2021 and OWASP Top 10:2017 are legacy: read their findings and map them, never report new findings under their IDs. No preview exists. See [`references/versions.md`](references/versions.md).
- Revision: the pinned pages in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources), check the project page and the top-level folders of the `OWASP/Top10` repository for a newer edition or release candidate, and update the pins.

## Invariants

1. **Access control runs in trusted server-side code and denies by default,** through one mechanism reused everywhere, enforcing record ownership (A01:2025 Prevent, intro; Prevent 1 to 3).
2. **Data stays separate from commands.** Use a safe or parameterized API for every interpreter; validation and escaping are fallbacks, and user-supplied structure names cannot be escaped (A05:2025 Prevent 1 to 3).
3. **Environments are hardened repeatably and minimally:** no default accounts, unused features or verbose errors, security headers set, no static secrets in code or pipelines (A02:2025 Prevent 1, 2, 5, 7, 9).
4. **Every component is known and trusted:** a central SBOM including transitive dependencies, continuous vulnerability monitoring, official signed sources, and no one person able to ship to production unreviewed (A03:2025 Prevent 1, 2, 5, 6; Description 6).
5. **Sensitive data uses current cryptography:** TLS 1.2 or later with forward secrecy and HSTS, encryption at rest, adaptive salted password hashing, authenticated encryption and a CSPRNG (A04:2025 Prevent 5, 7, 11, 13, 15).
6. **Authentication resists automation and sessions are managed server-side:** MFA where possible, breached-password checks, a new random session ID after login, invalidation at logout and timeouts, and JWT `aud`, `iss` and scope validation (A07:2025 Prevent 1, 5, 10, 12).
7. **Integrity is verified, not assumed,** by signatures on software and data, and no unsigned serialized data from clients (A08:2025 Prevent 1, 5).
8. **Security events are logged, encoded and alerted on,** with an audit trail that resists tampering (A09:2025 Prevent 1, 4, 5, 8).
9. **Fail closed.** Catch errors where they occur, keep a global handler, roll back partial transactions, and put a limit on everything (A10:2025 Prevent ¶1 to ¶3).
10. **The Top 10 is a floor, not a standard.** Never claim full Top 10 coverage; use the ASVS for verifiable requirements ("Using the OWASP Top 10 as a standard", 2025).

## Workflow

1. **Pick the version.** Review against 2025 and record it. If the input cites 2021 or 2017 IDs, map them first.
   -> [`references/versions.md`](references/versions.md)
   ✓ The report names the edition, and every ID carries its year (`A03:2025`, never `A03`).
2. **Map the application.** List entry points and roles, the records each role touches, data classes, interpreters, authentication and session flows, URL-fetching features, error and transaction paths, third-party components, and the CI/CD pipeline and registries.
   ✓ Every entry point has an owner role and the records and data classes it touches.
3. **Walk A01 to A05.** For each category, apply its Description bullets to the map, using the attack scenarios as test ideas.
   -> [`references/categories-a01-a05.md`](references/categories-a01-a05.md)
   ✓ Each category has a verdict: not applicable (with reason), mitigated (with evidence), or finding.
4. **Walk A06 to A10,** the same way. Cover Insecure Design with a threat model and design review, and logging with interviews and a sample of incident responses: they are not testable by tools alone (0x03, "Using the OWASP Top 10 as a standard").
   -> [`references/categories-a06-a10.md`](references/categories-a06-a10.md)
   ✓ All ten categories have a verdict.
5. **Run the checklist.** Check each item, grouped by category.
   -> [`references/review-checklist.md`](references/review-checklist.md)
   ✓ Every unchecked item is a finding or an accepted risk with an owner.
6. **Classify findings.** Pick one 2025 category by root cause and one CWE from that category's mapped list. SSRF and CSRF are A01; XXE is A02; XSS is A05; mass assignment and deserialization are A08; leaking error detail is A02 when central interception is missing and A10 when the code path leaks it. Denial of service, memory safety and unreviewed AI code are outside the ten (X01 to X03); prompt injection belongs to the LLM Top 10 (A05:2025 Description).
   -> [`references/review-checklist.md`](references/review-checklist.md#classifying-a-finding)
   ✓ Each finding names one 2025 category and a CWE mapped to it.
7. **Prioritize.** Rate each finding by the application's exposure, its threat agents and the business impact, not by the category's rank; the rank is a population-wide score (What are Application Security Risks?). Use the category's exploit and impact data only as context.
   ✓ Every finding has a severity with a stated reason tied to this application.
8. **Report.** For each finding give the scenario, the affected entry points, the category and CWE, the severity and the prevention bullets that fix it. State the review's scope and limits; never state Top 10 compliance.
   ✓ Every recommendation traces to a cited "How to prevent" bullet.
9. **Upgrade** (only when asked). Move a 2021- or 2017-based review, policy or scanner mapping to 2025.
   -> [`references/versions.md`](references/versions.md#upgrading)
   ✓ Every older finding has a 2025 home or an explicit place outside the list, and no verdict changed through relabelling alone.

## Verify before done

- [ ] All ten 2025 categories have a verdict, and every ID carries its year.
- [ ] Every record access is checked for ownership on the server, and admin pages fail for lower roles.
- [ ] Every interpreter call is parameterized or uses a safe API.
- [ ] Production has no default accounts, sample apps, debug code or verbose errors, and sends security headers.
- [ ] An SBOM with transitive dependencies exists, and components are monitored and come from trusted, signed sources.
- [ ] Passwords use an adaptive salted hash, and TLS 1.2 or later with HSTS protects all traffic.
- [ ] Sessions rotate at login, stay out of URLs and expire; JWT audience, issuer and scopes are validated.
- [ ] Partial transactions roll back, and every operation has a limit.
- [ ] Security failures are logged without sensitive data and raise alerts.
- [ ] Each finding names one category and a mapped CWE, and its severity reflects this application's exposure and business impact.

## Reference index

- **`references/versions.md`**: the 2025, 2021 and 2017 lines, what changed, the 2021 to 2025 and 2017 to 2021 mappings, upgrade steps, and why no preview is listed. Load for steps 1 and 9.
- **`references/categories-a01-a05.md`**: A01:2025 to A05:2025 with data, description bullets, prevention, scenarios and mapped CWEs. Load for step 3.
- **`references/categories-a06-a10.md`**: A06:2025 to A10:2025 in the same form, plus the on-the-cusp X01 to X03 risks. Load for step 4.
- **`references/review-checklist.md`**: how to use the list in a review, the classification table for borderline findings, and the checklist by category. Load for steps 5 and 6.

## Related skills

- `owasp-asvs` for verifiable security requirements, which the Top 10 recommends as the standard to adopt: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-asvs`.
- `owasp-api-security` for API-specific risks such as object- and property-level authorization and resource consumption: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-api-security`.
- `owasp-llm` for prompt injection and other LLM application risks, which A05:2025 leaves to that list: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-llm`.
- `content-security-policy` for one of the security headers A02:2025 asks servers to send (Description 8; Prevent 5): `npx skills add ScaleDockHQ/scaledock-skills --skill content-security-policy`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read. The `owasp.org/Top10/` pages redirect to `top10.owasp.org`; their text matches the `master` branch of the `OWASP/Top10` repository.

- [OWASP Top 10:2025 (home)](https://owasp.org/Top10/2025/): released (final), 2025 edition (24 December 2025), checked 2026-10-05.
- [2025 Introduction](https://owasp.org/Top10/2025/0x00_2025-Introduction/): released, 2025 edition, checked 2026-10-05.
- [2025 What are Application Security Risks?](https://owasp.org/Top10/2025/0x02_2025-What_are_Application_Security_Risks/): released, 2025 edition, checked 2026-10-05.
- [2025 Establishing a Modern Application Security Program](https://owasp.org/Top10/2025/0x03_2025-Establishing_a_Modern_Application_Security_Program/): released, 2025 edition, includes "Using the OWASP Top 10 as a standard", checked 2026-10-05.
- [A01:2025 Broken Access Control](https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/): released, 2025 edition, checked 2026-10-05.
- [A02:2025 Security Misconfiguration](https://owasp.org/Top10/2025/A02_2025-Security_Misconfiguration/): released, 2025 edition, checked 2026-10-05.
- [A03:2025 Software Supply Chain Failures](https://owasp.org/Top10/2025/A03_2025-Software_Supply_Chain_Failures/): released, 2025 edition, checked 2026-10-05.
- [A04:2025 Cryptographic Failures](https://owasp.org/Top10/2025/A04_2025-Cryptographic_Failures/): released, 2025 edition, checked 2026-10-05.
- [A05:2025 Injection](https://owasp.org/Top10/2025/A05_2025-Injection/): released, 2025 edition, checked 2026-10-05.
- [A06:2025 Insecure Design](https://owasp.org/Top10/2025/A06_2025-Insecure_Design/): released, 2025 edition, checked 2026-10-05.
- [A07:2025 Authentication Failures](https://owasp.org/Top10/2025/A07_2025-Authentication_Failures/): released, 2025 edition, checked 2026-10-05.
- [A08:2025 Software or Data Integrity Failures](https://owasp.org/Top10/2025/A08_2025-Software_or_Data_Integrity_Failures/): released, 2025 edition, checked 2026-10-05.
- [A09:2025 Security Logging and Alerting Failures](https://owasp.org/Top10/2025/A09_2025-Security_Logging_and_Alerting_Failures/): released, 2025 edition, checked 2026-10-05.
- [A10:2025 Mishandling of Exceptional Conditions](https://owasp.org/Top10/2025/A10_2025-Mishandling_of_Exceptional_Conditions/): released, 2025 edition, checked 2026-10-05.
- [2025 Next Steps (X01 to X03)](https://owasp.org/Top10/2025/X01_2025-Next_Steps/): released, 2025 edition, checked 2026-10-05.
- [OWASP Top 10:2021 (home)](https://owasp.org/Top10/2021/): superseded by 2025, 2021 edition, checked 2026-10-05.
- [2021 Introduction](https://owasp.org/Top10/2021/A00_2021_Introduction/): superseded, 2021 edition, checked 2026-10-05.
- [2021 Notice (release dates)](https://owasp.org/Top10/2021/0x00_2021-notice/): superseded, released 24 September 2021, v1.1 13 July 2025, checked 2026-10-05.
- [2021 How to use the OWASP Top 10 as a standard](https://owasp.org/Top10/2021/A00_2021_How_to_use_the_OWASP_Top_10_as_a_standard/): superseded, 2021 edition, checked 2026-10-05.
- [OWASP Top Ten 2017 (table of contents)](https://owasp.org/www-project-top-ten/2017/): historic, 2017 edition (20 November 2017), checked 2026-10-05.
- [OWASP Top 10 2017 list](https://github.com/OWASP/Top10/blob/master/2017/en/0x11-t10.md): historic, 2017 edition, checked 2026-10-05.
- [OWASP Top 10 2017 release notes](https://github.com/OWASP/Top10/blob/master/2017/en/0x06-release-notes.md): historic, 2017 edition, checked 2026-10-05.
- [OWASP Top Ten (project page)](https://owasp.org/www-project-top-ten/): OWASP flagship documentation project; the URL redirects to `owasp.org/projects/top-ten`, latest version 2025, checked 2026-10-05.
- [OWASP/www-project-top-ten (project page source)](https://github.com/OWASP/www-project-top-ten): latest commit 24 December 2025 ("Update for 2025"), checked 2026-10-05.
- [OWASP/Top10 (repository)](https://github.com/OWASP/Top10): `master` at 3a31f35 (24 September 2026); README marks 2025 released (Final), 2021 superseded, 2017 historic, checked 2026-10-05.
