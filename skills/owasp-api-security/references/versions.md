# Versions and upgrades

Read this when choosing which edition to review against, when a report or tool cites 2019 IDs, or when a newer edition appears. Sources: the 2023 and 2019 editions, the 2023 release notes, the project page and the `OWASP/API-Security` repository, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id     | Line                           | Status  | Revision                                      | Posture | Summary                                                     |
| ------ | ------------------------------ | ------- | --------------------------------------------- | ------- | ----------------------------------------------------------- |
| `2023` | OWASP API Security Top 10 2023 | current | 2023 edition, stable release 5 June 2023      |         | Second edition: API1:2023 to API10:2023.                    |
| `2019` | OWASP API Security Top 10 2019 | legacy  | 2019 edition, stable release 26 December 2019 |         | First edition: API1:2019 to API10:2019. Superseded by 2023. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Dates come from the project's news page: the 2019 stable release on 26 December 2019 (its cover is dated 29 May 2019, the project kick-off), the 2023 release candidate on 14 February 2023 and the 2023 stable release on 5 June 2023. The release candidates are not lines.

## Which version to use

- Review against 2023 and cite IDs in the `APIn:2023` form.
- Treat 2019 findings, scanner rules and policies that cite `APIn:2019` as input: map them to 2023 with the table below.
- Never report a new finding under a 2019 ID. When a reader insists on 2019 IDs, add them next to the 2023 ID, never instead of it.

## What changed

### OWASP API Security Top 10 2023

From the release notes and the Top 10 list:

- Excessive Data Exposure (API3:2019) and Mass Assignment (API6:2019) are combined as API3:2023 Broken Object Property Level Authorization, focusing on the common root cause.
- Resource consumption gets more emphasis than the pace of exhaustion: API4:2019 Lack of Resources & Rate Limiting becomes API4:2023 Unrestricted Resource Consumption, which adds paid integrations and spending limits.
- New API6:2023 Unrestricted Access to Sensitive Business Flows covers new threats, including most that rate limiting can mitigate.
- New API7:2023 Server Side Request Forgery.
- New API10:2023 Unsafe Consumption of APIs: attackers compromise a target's integrated services instead of its API.
- API8:2019 Injection is dropped as a separate entry: generic risks that do not behave differently in APIs are left to the general OWASP Top 10 (Methodology and Data). Injection through third-party data is part of API10:2023.
- API10:2019 Insufficient Logging & Monitoring is dropped as an entry; API6:2023 cites it as a reference.
- Renames: API2 Broken User Authentication becomes Broken Authentication; API9 Improper Assets Management becomes Improper Inventory Management, which adds the data flow blindspot.
- Ratings move from numbers (1 to 3) to words (Easy, Average, Difficult and so on); prevalence is still team consensus, because the 2022 call for data received no data (release notes; API Security Risks).

### Mapping 2019 to 2023

| 2019                                          | 2023                                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| API1:2019 Broken Object Level Authorization   | API1:2023 Broken Object Level Authorization                                                 |
| API2:2019 Broken User Authentication          | API2:2023 Broken Authentication                                                             |
| API3:2019 Excessive Data Exposure             | API3:2023 Broken Object Property Level Authorization                                        |
| API4:2019 Lack of Resources & Rate Limiting   | API4:2023 Unrestricted Resource Consumption; automation of business flows is API6:2023      |
| API5:2019 Broken Function Level Authorization | API5:2023 Broken Function Level Authorization                                               |
| API6:2019 Mass Assignment                     | API3:2023 Broken Object Property Level Authorization                                        |
| API7:2019 Security Misconfiguration           | API8:2023 Security Misconfiguration                                                         |
| API8:2019 Injection                           | No entry; general OWASP Top 10, or API10:2023 when the payload comes from an integrated API |
| API9:2019 Improper Assets Management          | API9:2023 Improper Inventory Management                                                     |
| API10:2019 Insufficient Logging & Monitoring  | No entry; API6:2023 cites it as a reference                                                 |
| (none)                                        | API6:2023 Unrestricted Access to Sensitive Business Flows (new)                             |
| (none)                                        | API7:2023 Server Side Request Forgery (new)                                                 |
| (none)                                        | API10:2023 Unsafe Consumption of APIs (new)                                                 |

Note the positional traps: API7, API8 and API10 mean different risks in the two editions, so never compare IDs without the year.

## Upgrading

### 2019 to 2023

1. Re-label each finding with the mapping table, keeping the year in every ID.
2. Merge API3:2019 and API6:2019 findings on the same object into one API3:2023 finding with a read side and a write side.
3. Re-assess API4:2019 findings: limits on resources, payloads, page sizes and paid integrations stay API4:2023; abuse of a sensitive business flow by automation becomes API6:2023.
4. Re-home API8:2019 and API10:2019 findings outside this list, or an injection under API10:2023 when the untrusted data comes from an integrated API. Do not drop them: the 2023 edition leaves generic risks to the general OWASP Top 10 and points to the ASVS for security requirements (What's Next For Developers).
5. Walk the three new entries (API6, API7, API10 of 2023) and the new API9:2023 data flow blindspot, which the 2019 review never checked.
6. Keep each finding's evidence and severity unless the 2023 text changes its scope; relabelling alone is not a reason to change a verdict.

## Preview

None is listed. As of 2026-10-05 the project page still announces the 2023 edition, its news ends with a June 2024 talk, the roadmap lists "API Security Top 10" as a planned project without dates, and the `OWASP/API-Security` repository has only `2019` and `2023` editions on both `master` and `develop`. No call for data, release candidate or draft for a later edition exists, so there is no text to cite. Open issues propose changes (multi-hop authorization in API1 and API5, abuse detection in API6, new scenarios), and `develop` carries unreleased 2023 clarifications (the API1 note on GUIDs, an API2 wording change and API9 references); these are errata to 2023, not a new line.

Watch the project page, its news tab and the repository's `editions/` folder. When a release candidate appears, list it as `<year>-preview` with posture track; when it ships, make it current, make 2023 legacy, and add an upgrade section with its mapping table.
