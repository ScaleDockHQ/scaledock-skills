# Versions and upgrades

Read this when choosing which edition to review against, when a report, policy or scanner cites 2021 or 2017 IDs, or when a newer edition appears. Sources: the 2025 introduction, the 2021 introduction and notice, the 2017 list and release notes, the project page and the `OWASP/Top10` repository, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id     | Line              | Status  | Revision                                                           | Posture | Summary                                                          |
| ------ | ----------------- | ------- | ------------------------------------------------------------------ | ------- | ---------------------------------------------------------------- |
| `2025` | OWASP Top 10:2025 | current | 2025 edition, final release 24 December 2025 (RC1 6 November 2025) |         | Eighth installment: A01:2025 to A10:2025.                        |
| `2021` | OWASP Top 10:2021 | legacy  | 2021 edition, released 24 September 2021, v1.1 13 July 2025        |         | Superseded by 2025. The repository README marks it "SUPERSEDED". |
| `2017` | OWASP Top 10:2017 | legacy  | 2017 edition, 20 November 2017                                     |         | Superseded by 2021. The repository README marks it "HISTORIC".   |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Dates: the 2025 release candidate was announced on the project page on 6 November 2025 ("OWASP Top Ten 2025 RC1"); on 24 December 2025 the project page was updated for 2025 and "RC" was removed from the 2025 title in the repository, whose README now reads "We have released the OWASP Top 10:2025 (Final)". The 2021 notice gives "Originally released 24th September 2021, v1.1 released 13 July 2025". The 2017 header is dated November 20, 2017. Release candidates are not lines.

## Which version to use

- Review against 2025 and cite IDs in the `Ann:2025` form, with the category name.
- Treat 2021 and 2017 findings, policies, contract clauses and scanner rules as input: map them to 2025 with the tables below.
- Never report a new finding under a 2021 or 2017 ID. When a reader insists on an older ID, add it next to the 2025 ID, never instead of it.
- IDs move between editions (A02 is Cryptographic Failures in 2021 and Security Misconfiguration in 2025; A10 is SSRF in 2021 and Mishandling of Exceptional Conditions in 2025), so never compare IDs without the year.

## What changed

### OWASP Top 10:2025

From the 2025 introduction ("What's changed"):

- Two new categories and one consolidation. Server-Side Request Forgery (A10:2021) is rolled into A01:2025 Broken Access Control.
- A02:2025 Security Misconfiguration moves up from #5.
- A03:2025 Software Supply Chain Failures expands A06:2021 Vulnerable and Outdated Components to compromises across dependencies, build systems and distribution infrastructure. It was top-voted in the community survey, has the fewest occurrences in the data and the highest average exploit and impact scores.
- A04:2025 Cryptographic Failures falls from #2; A05:2025 Injection falls from #3; A06:2025 Insecure Design falls from #4.
- A07:2025 is renamed from Identification and Authentication Failures to Authentication Failures.
- A08:2025 is renamed from "Software and Data Integrity Failures" to "Software or Data Integrity Failures", and now sits below A03 in scope: integrity of software, code and data artifacts at a lower level than the supply chain.
- A09:2025 is renamed from Security Logging and Monitoring Failures to Security Logging & Alerting Failures (the list page writes "and"), stressing alerting.
- New A10:2025 Mishandling of Exceptional Conditions: 24 CWEs on improper error handling, logical errors and failing open, some of them previously "poor code quality" CWEs.
- Method: 589 CWEs analysed, 248 mapped into the ten categories, capped at 40 per category; eight categories from contributed data on 2.8 million applications and two from the community survey (A03 and A09). The 2021 "Denial of Service" on-the-cusp entry is renamed X01:2025 Lack of Application Resilience; X02:2025 Memory Management Failures and X03:2025 Inappropriate Trust in AI Generated Code are also on the cusp, outside the ten (Next Steps).

### OWASP Top 10:2021

From the 2021 introduction: three new categories (A04 Insecure Design, A08 Software and Data Integrity Failures, A10 SSRF), four renamed or rescoped categories, and consolidation. XSS joins Injection, XXE joins Security Misconfiguration, and Insecure Deserialization joins Software and Data Integrity Failures.

### Mapping 2021 to 2025

| 2021                                                | 2025                                                     |
| --------------------------------------------------- | -------------------------------------------------------- |
| A01:2021 Broken Access Control                      | A01:2025 Broken Access Control                           |
| A02:2021 Cryptographic Failures                     | A04:2025 Cryptographic Failures                          |
| A03:2021 Injection                                  | A05:2025 Injection                                       |
| A04:2021 Insecure Design                            | A06:2025 Insecure Design                                 |
| A05:2021 Security Misconfiguration                  | A02:2025 Security Misconfiguration                       |
| A06:2021 Vulnerable and Outdated Components         | A03:2025 Software Supply Chain Failures (broader scope)  |
| A07:2021 Identification and Authentication Failures | A07:2025 Authentication Failures                         |
| A08:2021 Software and Data Integrity Failures       | A08:2025 Software or Data Integrity Failures             |
| A09:2021 Security Logging and Monitoring Failures   | A09:2025 Security Logging & Alerting Failures            |
| A10:2021 Server-Side Request Forgery (SSRF)         | A01:2025 Broken Access Control (CWE-918 is mapped there) |
| (none)                                              | A10:2025 Mishandling of Exceptional Conditions (new)     |

### Mapping 2017 to 2021

From the 2021 introduction and the 2017 release notes:

| 2017                                                | 2021                                                      |
| --------------------------------------------------- | --------------------------------------------------------- |
| A1:2017 Injection                                   | A03:2021 Injection                                        |
| A2:2017 Broken Authentication                       | A07:2021 Identification and Authentication Failures       |
| A3:2017 Sensitive Data Exposure                     | A02:2021 Cryptographic Failures (root cause, not symptom) |
| A4:2017 XML External Entities (XXE)                 | A05:2021 Security Misconfiguration                        |
| A5:2017 Broken Access Control                       | A01:2021 Broken Access Control                            |
| A6:2017 Security Misconfiguration                   | A05:2021 Security Misconfiguration                        |
| A7:2017 Cross-Site Scripting (XSS)                  | A03:2021 Injection                                        |
| A8:2017 Insecure Deserialization                    | A08:2021 Software and Data Integrity Failures             |
| A9:2017 Using Components with Known Vulnerabilities | A06:2021 Vulnerable and Outdated Components               |
| A10:2017 Insufficient Logging & Monitoring          | A09:2021 Security Logging and Monitoring Failures         |
| (none)                                              | A04:2021 Insecure Design, A10:2021 SSRF (new)             |

To reach 2025 from 2017, apply both tables: for example A4:2017 XXE becomes A05:2021 and then A02:2025 (CWE-611 is mapped to A02:2025); A7:2017 XSS becomes A03:2021 and then A05:2025 (CWE-79).

## Upgrading

### 2021 to 2025

1. Re-label each finding with the 2021 to 2025 table, keeping the year in every ID.
2. Move SSRF findings (A10:2021) into A01:2025, and re-check the mapped CWE list of each finding against the 2025 category page: 2025 regrouped 589 CWEs, so a CWE may now sit in a different category.
3. Re-assess A06:2021 findings under A03:2025, and add the supply chain checks 2021 never asked: change tracking of IDEs, repositories and registries, separation of duty, CI/CD hardening, staged rollouts (A03:2025 Description and Prevent).
4. Walk A10:2025 Mishandling of Exceptional Conditions, which a 2021 review did not cover as a category: fail-open paths, partial transactions, uncaught exceptions, missing limits.
5. Re-check A09 for alerting, not only logging: thresholds, playbooks, DAST runs triggering alerts (A09:2025 Description 6, 7, 14).
6. Keep each finding's evidence and severity unless the 2025 text changes its scope; relabelling alone is not a reason to change a verdict.

### 2017 to 2021

1. Re-label with the 2017 to 2021 table, then continue with 2021 to 2025.
2. Merge XSS (A7:2017) into the Injection finding set, XXE (A4:2017) into Security Misconfiguration and Insecure Deserialization (A8:2017) into Software and Data Integrity Failures.
3. Re-home Sensitive Data Exposure (A3:2017) findings by root cause: a missing or weak cryptographic control goes to Cryptographic Failures; exposure through a missing authorization check goes to Broken Access Control (CWE-200 and CWE-201 are mapped to A01:2025).
4. Walk the categories 2017 never had: Insecure Design, SSRF (now in A01:2025), Software Supply Chain Failures and Mishandling of Exceptional Conditions.

## Preview

None is listed. As of 2026-10-05 the project page names the 2025 edition as "the most current released version", the repository README says the 2025 edition is released (Final), and the repository holds no folder, data call or release candidate for a later edition; open issues are typo fixes, translations and CWE-name corrections to 2025. These are errata to 2025, not a new line. Watch the project page and the repository's top-level folders. When a call for data or release candidate appears, list it as `<year>-preview` with posture track; when it ships, make it current, make 2025 legacy, and add an upgrade section with its mapping table.
