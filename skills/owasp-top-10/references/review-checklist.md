# Review checklist

A checklist built from the "Description" and "How to prevent" sections of the OWASP Top 10:2025. Each item cites its category and section (see [`categories-a01-a05.md`](categories-a01-a05.md) and [`categories-a06-a10.md`](categories-a06-a10.md)). Mark each item done, not applicable (with a reason), or a finding.

## How to use the list in a review

- The Top 10 is an awareness document. As a coding or testing standard it is "the bare minimum and just a starting point"; for verifiable requirements the project points to the ASVS ("Using the OWASP Top 10 as a standard", 2025).
- Some categories are not easily testable. A06 Insecure Design is beyond most forms of testing, and effective logging and monitoring can only be confirmed with interviews and a sample of real incident responses. Cover them with design review and interviews, not only scanners.
- OWASP discourages any claim of full Top 10 coverage by a tool, "because it's simply untrue". Never write "compliant with the OWASP Top 10" or "covers the Top 10" in a report.
- The rank order comes from a population-level risk score (incidence, coverage, exploit, impact, occurrences). Your organization's risk depends on the application's exposure, its threat agents and the business impact ("What are Application Security Risks?"). Rate each finding on those, not on the category's position.

## Classifying a finding

Pick one 2025 category by root cause, and name a CWE from that category's mapped list. When a weakness could fit two, use these rules from the category pages:

| Weakness                                                                                                                                                                        | 2025 category                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| SSRF (CWE-918), CSRF (CWE-352), open redirect (CWE-601), path traversal, IDOR (CWE-639)                                                                                         | A01 Broken Access Control                                                   |
| XXE (CWE-611), missing Secure or HttpOnly cookie flags (CWE-614, 1004), permissive cross-domain policy (CWE-942), debug code                                                    | A02 Security Misconfiguration                                               |
| Missing SameSite cookie attribute (CWE-1275)                                                                                                                                    | A01 Broken Access Control                                                   |
| Vulnerable, unmaintained or untracked component; weak build pipeline or registry                                                                                                | A03 Software Supply Chain Failures                                          |
| Unsigned update, untrusted CDN script, insecure deserialization (CWE-502), mass assignment (CWE-915)                                                                            | A08 Software or Data Integrity Failures                                     |
| Cleartext transmission (CWE-319), weak hashing, bad randomness, unverified signatures (CWE-347)                                                                                 | A04 Cryptographic Failures                                                  |
| XSS (CWE-79), SQL, OS command, LDAP, EL, ORM injection                                                                                                                          | A05 Injection                                                               |
| Missing control by design: no anti-automation on a business flow, race condition (CWE-362), unrestricted upload (CWE-434), request smuggling (CWE-444), clickjacking (CWE-1021) | A06 Insecure Design                                                         |
| Credential stuffing, session fixation, missing MFA, certificate validation (CWE-295, 297), hard-coded credentials (CWE-798)                                                     | A07 Authentication Failures                                                 |
| Log injection (CWE-117), sensitive data in logs (CWE-532), no alerting                                                                                                          | A09 Security Logging & Alerting Failures                                    |
| Error message with sensitive data (CWE-209), uncaught exception, failing open (CWE-636), partial transaction                                                                    | A10 Mishandling of Exceptional Conditions                                   |
| Denial of service, memory safety, unreviewed AI-generated code                                                                                                                  | Outside the ten: X01, X02, X03 (Next Steps)                                 |
| Prompt injection in an LLM application                                                                                                                                          | Outside this list: OWASP Top 10 for LLM Applications (A05:2025 Description) |

A verbose stack trace can be both a misconfiguration (no central error interception, A02:2025 Description 4) and mishandled error handling (CWE-209 is mapped to A10:2025). File it where the fix lies: missing central configuration is A02; code that leaks the error on its own path is A10.

## Access control (A01)

- [ ] Every access check runs in trusted server-side code; nothing relies on front-end checks. (A01:2025 Prevent, intro; scenario 3)
- [ ] Everything except public resources is denied by default. (A01:2025 Prevent 1; Description 1)
- [ ] One access control mechanism is reused everywhere, and CORS is minimised and restricted to trusted origins. (A01:2025 Prevent 2; Description 7)
- [ ] Records are checked for ownership on create, read, update and delete; changing an ID never reaches another user's record. (A01:2025 Prevent 3; Description 3)
- [ ] POST, PUT and DELETE have access controls, not only GET. (A01:2025 Description 4)
- [ ] Forced browsing to admin or authenticated pages fails for lower roles. (A01:2025 Description 8; scenario 2)
- [ ] JWTs, cookies and hidden fields cannot be tampered with or replayed to raise privileges. (A01:2025 Description 6)
- [ ] Directory listing is off; `.git`, metadata and backups are not in web roots. (A01:2025 Prevent 5)
- [ ] Sessions are invalidated server-side at logout; JWTs are short-lived, with revocable refresh tokens. (A01:2025 Prevent 8)
- [ ] URL-fetching features cannot be used for SSRF (CWE-918 is mapped to A01:2025).
- [ ] Access control failures are logged, alerted and rate-limited; unit and integration tests cover access control. (A01:2025 Prevent 6, 7; closing paragraph)

## Configuration (A02)

- [ ] Hardening is repeatable and automated; environments are configured identically with different credentials. (A02:2025 Prevent 1)
- [ ] No unused features, sample applications, default accounts or test frameworks in production. (A02:2025 Description 2, 3; Prevent 2; scenario 1)
- [ ] Framework, server, library and database security settings are set to secure values, including after upgrades. (A02:2025 Description 5, 7)
- [ ] Security headers and directives are sent with secure values. (A02:2025 Description 8; Prevent 5)
- [ ] A central configuration intercepts excessive error messages. (A02:2025 Description 4; Prevent 7)
- [ ] Cloud storage permissions are reviewed; no default public sharing. (A02:2025 Prevent 3; scenario 4)
- [ ] No static keys or secrets in code, configuration or pipelines; identity federation or short-lived credentials instead. (A02:2025 Prevent 9)
- [ ] Configuration is verified automatically, or manually at least annually. (A02:2025 Prevent 6, 8)

## Supply chain (A03)

- [ ] An SBOM exists, centrally managed, including transitive dependencies. (A03:2025 Prevent 1, 2)
- [ ] Components are monitored against CVE, NVD and OSV with alerts, and patched risk-based and promptly. (A03:2025 Prevent 5; Description 8)
- [ ] Components come only from official sources, preferably signed. (A03:2025 Prevent 6; Description 7)
- [ ] Unmaintained components are replaced or virtually patched. (A03:2025 Prevent 8)
- [ ] Changes to CI/CD, repositories, IDEs, registries and SaaS integrations are tracked. (A03:2025 Prevent, change management)
- [ ] No one person can write code and promote it to production without another human's review. (A03:2025 Description 6)
- [ ] Repositories, workstations, CI/CD and artifacts are hardened with MFA and locked-down IAM; builds are signed and immutable, and artifacts are promoted rather than rebuilt. (A03:2025 Prevent, hardening)
- [ ] Updates roll out in stages or canaries. (A03:2025 Prevent 10)

## Cryptography (A04)

- [ ] Data is classified, and controls follow the classification. (A04:2025 Prevent 1, 9)
- [ ] TLS 1.2 or later only, forward secrecy, no CBC ciphers, HSTS; certificate chains are validated. (A04:2025 Prevent 7; Description 5)
- [ ] Sensitive data is encrypted at rest, not stored unnecessarily, and not cached. (A04:2025 Prevent 4, 5, 8)
- [ ] Passwords use Argon2, yescrypt, scrypt or PBKDF2-HMAC-SHA-512 with salt and a work factor. (A04:2025 Prevent 11)
- [ ] Authenticated encryption; no ECB, MD5, SHA1, CBC or PKCS#1 v1.5; IVs never reused with a key. (A04:2025 Prevent 12, 13, 16)
- [ ] Keys and randomness come from a CSPRNG; keys are not in repositories; the most sensitive sit in an HSM. (A04:2025 Prevent 2, 14, 15; Description 3)
- [ ] A post-quantum migration plan exists for high-risk systems, due by the end of 2030. (A04:2025 Prevent 18)

## Injection (A05)

- [ ] Every interpreter call (SQL, NoSQL, OS, LDAP, ORM, EL, OGNL, HTML output) uses a safe or parameterized API. (A05:2025 Prevent 1)
- [ ] Stored procedures do not concatenate or `EXECUTE IMMEDIATE` input. (A05:2025 Prevent 1, note)
- [ ] No user-supplied table or column names. (A05:2025 Prevent 3, note)
- [ ] Positive server-side input validation exists, as defence in depth only. (A05:2025 Prevent 2)
- [ ] All inputs (parameters, headers, URL, cookies, JSON, SOAP, XML) are fuzzed, and SAST, DAST or IAST runs in CI/CD. (A05:2025 Description)

## Design (A06)

- [ ] Authentication, access control, business logic and key flows are threat-modelled. (A06:2025 Prevent 3)
- [ ] Business limits (quantities, discounts, bookings) and anti-automation are designed in, with misuse cases tested. (A06:2025 Prevent 7; scenarios 2, 3)
- [ ] Plausibility checks run at each tier. (A06:2025 Prevent 6)
- [ ] Tiers and tenants are segregated by design. (A06:2025 Prevent 8, 9)
- [ ] No knowledge-based "questions and answers" recovery. (A06:2025 scenario 1)

## Authentication (A07)

- [ ] MFA is implemented and enforced where possible, without weak fallbacks. (A07:2025 Prevent 1; Description 7, 8)
- [ ] No default credentials; new passwords are checked against worst-password and breached-credential lists; policy follows NIST 800-63b 5.1.1, with no forced rotation. (A07:2025 Prevent 3 to 7)
- [ ] Failed logins are limited or delayed without enabling denial of service, and logged with alerts. (A07:2025 Prevent 9)
- [ ] Registration, login and recovery give the same message for all outcomes. (A07:2025 Prevent 8)
- [ ] A new high-entropy session ID is issued at login, kept out of URLs, held in a secure cookie and invalidated at logout, idle and absolute timeouts, including SSO sessions. (A07:2025 Prevent 10; Description 9 to 11)
- [ ] JWT `aud`, `iss` and scopes are validated. (A07:2025 Prevent 12; Description 12)

## Integrity (A08)

- [ ] Software, updates and critical data are verified by signature. (A08:2025 Prevent 1)
- [ ] Dependencies come only from trusted (or vetted internal) repositories. (A08:2025 Prevent 2)
- [ ] Code and configuration changes are reviewed; CI/CD is segregated and access-controlled. (A08:2025 Prevent 3, 4)
- [ ] No unsigned serialized data from clients is deserialized. (A08:2025 Prevent 5)
- [ ] No subdomain or DNS alias hands first-party cookies to a third party. (A08:2025 scenario 1)

## Logging and alerting (A09)

- [ ] Login, access control and input validation failures are logged with user context and retained for forensics. (A09:2025 Prevent 1)
- [ ] Log data is encoded; no PII, PHI or secrets in logs; logs are not visible to users. (A09:2025 Prevent 4; Description 9, 10)
- [ ] High-value transactions have a tamper-evident audit trail; logs are backed up off the host. (A09:2025 Prevent 5; Description 5)
- [ ] Alerting has thresholds, use cases and playbooks, and a DAST or penetration test run triggers alerts. (A09:2025 Prevent 8; Description 6, 7, 14)
- [ ] An incident response plan exists. (A09:2025 Prevent 11)

## Exceptional conditions (A10)

- [ ] Errors are caught where they occur, with a global exception handler as backup. (A10:2025 Prevent ¶1)
- [ ] Failed multi-step transactions roll back completely (fail closed). (A10:2025 Prevent ¶2; scenario 3)
- [ ] Resources are released on every error path. (A10:2025 scenario 1)
- [ ] Rate limits, quotas and throttling bound every operation. (A10:2025 Prevent ¶3)
- [ ] Error handling, logging and alerting are centralized and consistent; user-facing errors carry no system detail. (A10:2025 Prevent ¶5; scenario 2)
