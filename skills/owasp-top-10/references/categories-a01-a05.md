# Categories A01 to A05 (2025)

Read this for step 3 of the workflow. Each entry summarises one category page of the OWASP Top 10:2025: background and data, description (when the application is vulnerable), how to prevent, the example attack scenarios and the mapped CWEs. Citations use the category ID and section with the bullet number counted from the top: (A01:2025 Prevent 1) is the first "How to prevent" bullet, (A02:2025 Description 4) the fourth vulnerability bullet in "Description". Sources: the 2025 category pages listed in [Sources](../SKILL.md#sources).

Data columns come from each page's score table: CWEs mapped, average incidence rate (share of tested applications with at least one mapped CWE), average weighted exploit and impact (CVSS sub-scores on a 10-point scale) and total CVEs. They rank categories across the whole data set; they are not your finding's severity.

## A01:2025 Broken Access Control

Data: 40 CWEs, average incidence 3.74%, exploit 7.04, impact 3.84, 32,654 CVEs. Still #1; every tested application had some form of it. SSRF (A10:2021) is now in this category.

Access control enforces policy so users cannot act outside their intended permissions. Vulnerable when (Description):

1. Least privilege (deny by default) is violated: a capability meant for particular roles or users is available to anyone.
2. Checks can be bypassed by modifying the URL (parameter tampering, force browsing), internal state or the HTML page, or with a tool that modifies API requests.
3. Someone else's account can be viewed or edited by supplying its identifier (insecure direct object reference).
4. An API lacks access controls for POST, PUT and DELETE.
5. Privilege escalation: acting as a user without logging in, or as an admin when logged in as a user.
6. Metadata manipulation: replaying or tampering with a JWT, cookie or hidden field to elevate privileges, or abusing JWT invalidation.
7. A CORS misconfiguration allows API access from unauthorized or untrusted origins.
8. Force browsing to authenticated pages as an unauthenticated user, or to privileged pages as a standard user.

How to prevent: access control is only effective in trusted server-side code or serverless APIs, where the attacker cannot modify the check or its metadata (Prevent, intro).

1. Except for public resources, deny by default.
2. Implement access control once and reuse it throughout the application, including minimising CORS usage.
3. Model access controls enforce record ownership instead of letting users create, read, update or delete any record.
4. Enforce unique business limit requirements in domain models.
5. Disable directory listing; keep file metadata (such as `.git`) and backups out of web roots.
6. Log access control failures and alert admins when appropriate (for example repeated failures).
7. Rate-limit API and controller access to reduce harm from automated tooling.
8. Invalidate stateful session identifiers on the server at logout. Keep stateless JWTs short-lived; for longer-lived ones, use refresh tokens and follow OAuth standards to revoke access.
9. Use well-established toolkits or patterns that give simple, declarative access controls.

Developers and QA include functional access control in unit and integration tests (Prevent, closing paragraph).

Scenarios: an `acct` request parameter is passed unverified into an SQL lookup, so `?acct=notmyacct` returns another account; force browsing to `admin_getappInfo` works for unauthenticated or non-admin users; access control lives only in front-end JavaScript, so `curl` reaches the admin page directly.

Notable CWEs: CWE-200, CWE-201, CWE-918 (SSRF), CWE-352 (CSRF). Also mapped: path traversal (CWE-22, 23, 36), link following (CWE-59, 61, 65), CWE-219, 276, 281, 282, 283, 284, 285, 359, 377, 379, 402, 424, 425 (forced browsing), 441 (confused deputy), 497, 538, 540, 548 (directory listing), 552, 566, 601 (open redirect), 615, 639 (user-controlled key), 668, 732, 749, 862 (missing authorization), 863, 922 and CWE-1275 (SameSite cookie).

## A02:2025 Security Misconfiguration

Data: 16 CWEs, average incidence 3.00%, exploit 7.96, impact 3.97, 1,375 CVEs. Up from #5 in 2021. XXE (CWE-611) is in this category.

A system, application or cloud service is set up incorrectly from a security perspective. Vulnerable if (Description):

1. Security hardening is missing across any part of the stack, or cloud service permissions are wrong.
2. Unnecessary features are enabled or installed: ports, services, pages, accounts, testing frameworks, privileges.
3. Default accounts and passwords are enabled and unchanged.
4. No central configuration intercepts excessive error messages; errors reveal stack traces or overly informative messages.
5. On upgraded systems, the latest security features are disabled or insecurely configured.
6. Backward compatibility is prioritised to the point of insecure configuration.
7. Security settings in application servers, frameworks, libraries and databases are not set to secure values.
8. The server does not send security headers or directives, or they are not set to secure values.

How to prevent (a secure installation process):

1. A repeatable, automated hardening process; development, QA and production configured identically, with different credentials in each.
2. A minimal platform without unnecessary features, components, documentation or samples.
3. Review and update configurations with every security note, update and patch, as part of patch management (see A03); review cloud storage permissions.
4. A segmented architecture separating components or tenants (segmentation, containers, cloud security groups).
5. Send security directives to clients, such as security headers.
6. Automatically verify configuration effectiveness in all environments.
7. Add a central configuration that intercepts excessive error messages, as a backup.
8. When verification is not automated, verify manually at least annually.
9. Use identity federation, short-lived credentials or platform role-based access instead of static keys or secrets in code, configuration files or pipelines.

Scenarios: sample applications left on a production server include an admin console with default credentials; directory listing lets an attacker download compiled classes and reverse-engineer an access control flaw; stack traces reveal vulnerable component versions; a cloud provider's default sharing permissions expose stored data to the Internet.

Mapped CWEs: CWE-5, 11, 13, 15, 16 (Configuration), 260, 315, 489 (active debug code), 526, 547, 611 (XXE), 614 (cookie without Secure), 776 (XML entity expansion), 942 (permissive cross-domain policy), 1004 (cookie without HttpOnly), 1174.

## A03:2025 Software Supply Chain Failures

Data: the score table lists 6 CWEs (the introduction says 5), average incidence 5.72%, exploit 8.17, impact 5.23, 11 CVEs. Top-ranked in the community survey (50% ranked it #1); the highest exploit and impact scores and the fewest CVEs, which the authors attribute to testing difficulty.

Breakdowns or compromises in building, distributing or updating software, often through vulnerable or malicious third-party code, tools or dependencies. You are likely vulnerable if (Description):

1. You do not track the versions of all client-side and server-side components, including transitive dependencies.
2. Software is vulnerable, unsupported or out of date: OS, servers, DBMS, applications, APIs, runtimes, libraries.
3. You do not scan regularly or subscribe to security bulletins for your components.
4. There is no change management or tracking across the supply chain: IDEs and extensions, repositories, sandboxes, image and library repositories, artifact creation and storage.
5. Parts of the supply chain are not hardened, especially access control and least privilege.
6. There is no separation of duty: one person can write code and promote it to production without another human's oversight.
7. Components from untrusted sources can be used in or affect production.
8. Platform, frameworks and dependencies are not fixed in a risk-based, timely way (monthly or quarterly patching leaves needless exposure).
9. Developers do not test compatibility of updated or patched libraries.
10. Configurations of every part of the system are not secured (see A02).
11. The CI/CD pipeline is less secure than the systems it builds and deploys.

How to prevent, patch management:

1. Centrally generate and manage an SBOM for all your software.
2. Track transitive dependencies, not just direct ones.
3. Remove unused dependencies, features, components, files and documentation.
4. Continuously inventory client-side and server-side component versions and their dependencies.
5. Continuously monitor CVE, NVD and OSV; automate with software composition analysis or SBOM tooling; subscribe to alerts.
6. Obtain components only from official sources over secure links; prefer signed packages (see A08).
7. Choose dependency versions deliberately and upgrade only when needed.
8. Watch for unmaintained components; migrate, or deploy a virtual patch when patching is impossible.
9. Update CI/CD, IDEs and other developer tooling regularly.
10. Use staged rollouts or canary deployments instead of updating all systems at once.

Track changes to: CI/CD settings, code repositories, sandboxes, developer IDEs, SBOM tooling and artifacts, logging systems and logs, third-party integrations such as SaaS, artifact repositories and container registries. Harden, with MFA and locked-down IAM: the code repository (no secrets checked in, branch protection, backups), developer workstations, build servers and CI/CD (separation of duties, signed builds, environment-scoped secrets, tamper-evident logs), artifacts (provenance, signing, time stamping, promote rather than rebuild, immutable builds) and infrastructure as code (pull requests and version control). Keep an ongoing plan for monitoring, triaging and applying updates for the application's lifetime.

Scenarios: a compromised vendor ships malware in an update (SolarWinds, 2019); a compromised component behaves maliciously only under a condition (Bybit wallet software, 2025); a self-propagating npm worm steals tokens from developer machines and republishes packages (Shai-Hulud, 2025); component flaws run with application privileges (CVE-2017-5638 Struts 2, CVE-2021-44228 Log4Shell).

Mapped CWEs: CWE-447 as listed (the background names CWE-477 Use of Obsolete Function), CWE-1035, 1104 (unmaintained components), 1329, 1357, 1395 (dependency on vulnerable component).

## A04:2025 Cryptographic Failures

Data: 32 CWEs, average incidence 3.80%, exploit 7.23, impact 3.90, 2,185 CVEs. Down from #2. Lack of cryptography, weak cryptography, leaked keys and weak random number generation.

Encrypt all data in transit at the transport layer; decide which data also needs encryption at rest or extra application-layer encryption (passwords, card numbers, health records, personal data, business secrets). For such data, ask (Description):

1. Are old or weak algorithms or protocols used, by default or in older code?
2. Are default keys used, weak keys generated, keys reused, or key management and rotation missing?
3. Are keys checked into source repositories?
4. Is encryption not enforced, for example missing browser security headers?
5. Is the server certificate and trust chain properly validated?
6. Are IVs ignored, reused or insecurely generated? Is ECB used? Is plain encryption used where authenticated encryption fits?
7. Are passwords used as keys without a password-based key derivation function?
8. Is non-cryptographic randomness used, or a CSPRNG re-seeded with low entropy?
9. Are MD5, SHA1 or non-cryptographic hashes used where cryptographic hashes are needed?
10. Are cryptographic error messages or side channels exploitable (padding oracles)?
11. Can the algorithm be downgraded or bypassed?

How to prevent, at a minimum:

1. Classify data processed, stored or transmitted, and identify what is sensitive under law, regulation or business need.
2. Store the most sensitive keys in a hardware or cloud HSM.
3. Use well-trusted implementations of cryptographic algorithms.
4. Do not store sensitive data unnecessarily; discard it, or use PCI DSS compliant tokenization or truncation.
5. Encrypt all sensitive data at rest.
6. Use up-to-date, strong standard algorithms, protocols and keys, with proper key management.
7. Encrypt all data in transit with TLS 1.2 or later only, forward-secrecy ciphers, no CBC ciphers, and support for quantum key exchange; enforce HTTPS with HSTS; check with a tool.
8. Disable caching of responses with sensitive data, in the CDN, web server and application caches.
9. Apply controls according to the data classification.
10. Do not use unencrypted protocols such as FTP and STARTTLS; avoid SMTP for confidential data.
11. Store passwords with strong adaptive, salted hashing with a work factor: Argon2, yescrypt, scrypt or PBKDF2-HMAC-SHA-512 (bcrypt legacy systems: see the Password Storage Cheat Sheet).
12. Choose IVs appropriate to the mode (a CSPRNG where required; nonces need not be); never reuse an IV with a fixed key.
13. Always use authenticated encryption instead of encryption alone.
14. Generate keys cryptographically randomly; derive keys from passwords only through a password-based key derivation function.
15. Use cryptographic randomness where appropriate, not seeded predictably or with low entropy.
16. Avoid deprecated functions and padding: MD5, SHA1, CBC mode, PKCS#1 v1.5.
17. Have settings reviewed by security specialists, purpose-built tools, or both.
18. Prepare for post-quantum cryptography so high-risk systems are safe no later than the end of 2030 (ENISA roadmap).

Scenarios: no TLS enforcement lets an attacker on public Wi-Fi downgrade to HTTP, steal the session cookie and hijack the session or alter a transfer; an unsalted or fast-hashed password database, stolen through a file upload flaw, falls to rainbow tables or GPUs.

Notable CWEs: CWE-327, 331, 1241, 338. Also mapped: CWE-261, 296, 319 (cleartext transmission), 320 to 326, 328, 329, 330, 332, 334 to 337, 340, 342, 347 (improper signature verification), 523, 757 (algorithm downgrade), 759, 760, 780, 916 (insufficient password hash effort), 1240.

## A05:2025 Injection

Data: 37 CWEs, average incidence 3.08%, exploit 7.15, impact 4.32, 62,445 CVEs, the most of any category. Down from #3. Includes XSS (high frequency, low impact; over 30k CVEs) and SQL injection (low frequency, high impact; over 14k CVEs).

Untrusted input reaches an interpreter (browser, database, command line) and is executed as commands. Vulnerable when (Description):

1. User-supplied data is not validated, filtered or sanitized.
2. Dynamic queries or non-parameterized calls without context-aware escaping are used directly in the interpreter.
3. Unsanitized data is used in ORM search parameters to extract additional records.
4. Hostile data is directly used or concatenated into dynamic queries, commands or stored procedures.

Common forms: SQL, NoSQL, OS command, ORM, LDAP, Expression Language (EL) and OGNL injection. Detect with source code review plus automated testing (including fuzzing) of all parameters, headers, URLs, cookies, JSON, SOAP and XML inputs; SAST, DAST and IAST in CI/CD help. Prompt injection in LLMs is covered separately by the OWASP Top 10 for LLM Applications (LLM01:2025).

How to prevent: keep data separate from commands and queries.

1. Prefer a safe API that avoids the interpreter, offers a parameterized interface, or uses an ORM. Parameterized stored procedures can still inject when PL/SQL or T-SQL concatenates queries or runs hostile data with `EXECUTE IMMEDIATE` or `exec()`.
2. Where data cannot be separated: use positive server-side input validation; it is not a complete defence.
3. Escape residual dynamic queries with the interpreter's own escape syntax. SQL structure names (tables, columns) cannot be escaped, so user-supplied structure names are dangerous, a common issue in report writers.

Parsing and escaping are error-prone and break with small changes to the underlying system (Prevent, warning).

Scenarios: `"... WHERE custID='" + id + "'"` with `' OR '1'='1` returns all accounts; the same concatenation in Hibernate HQL with `' OR custID IS NOT NULL OR custID='`; `"nslookup " + domain` passed to `Runtime.exec` runs `example.com; cat /etc/passwd`.

Mapped CWEs: CWE-20 (input validation), 74, 76, 77 (command), 78 (OS command), 79 (XSS), 80, 83, 86, 88 (argument injection), 89 (SQL), 90 (LDAP), 91, 93 (CRLF), 94 (code), 95 (eval), 96, 97 (SSI), 98 (PHP file inclusion), 99, 103, 104, 112, 113 (response splitting), 114, 115, 116 (output encoding), 129, 159, 470 (unsafe reflection), 493, 500, 564 (Hibernate), 610, 643 (XPath), 644, 917 (EL injection).
