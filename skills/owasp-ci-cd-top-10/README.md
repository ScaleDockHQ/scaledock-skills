# owasp-ci-cd-top-10

An agent skill for OWASP CI/CD Top 10: reviewing build and deployment pipelines against the OWASP Top 10 CI/CD Security Risks.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-ci-cd-top-10
```

Then ask your agent to apply OWASP CI/CD Top 10.

## What it covers

- The OWASP Top 10 CI/CD Security Risks (CICD-SEC-1 to CICD-SEC-10): each risk's definition and the recommended controls, read from the project's Markdown source at a pinned commit.

## Versions

| Line               | Status  |
| ------------------ | ------- |
| OWASP CI/CD Top 10 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [CICD-SEC-1: Insufficient Flow Control Mechanisms](https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-01-Insufficient-Flow-Control-Mechanisms.md): OWASP Project document, Commit 74b2c790d551 (2025-11-03).
- [CICD-SEC-2: Inadequate Identity and Access Management](https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-02-Inadequate-Identity-And-Access-Management.md): OWASP Project document, Commit 74b2c790d551 (2025-11-03).
- [CICD-SEC-3: Dependency Chain Abuse](https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-03-Dependency-Chain-Abuse.md): OWASP Project document, Commit 74b2c790d551 (2025-11-03).
- [CICD-SEC-4: Poisoned Pipeline Execution (PPE)](https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-04-Poisoned-Pipeline-Execution.md): OWASP Project document, Commit 74b2c790d551 (2025-11-03).
- [CICD-SEC-5: Insufficient PBAC (Pipeline-Based Access Controls)](https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-05-Insufficient-PBAC.md): OWASP Project document, Commit 74b2c790d551 (2025-11-03).
- [CICD-SEC-6: Insufficient Credential Hygiene](https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-06-Insufficient-Credential-Hygiene.md): OWASP Project document, Commit 74b2c790d551 (2025-11-03).
- [CICD-SEC-7: Insecure System Configuration](https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-07-Insecure-System-Configuration.md): OWASP Project document, Commit 74b2c790d551 (2025-11-03).
- [CICD-SEC-8: Ungoverned Usage of 3rd Party Services](https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-08-Ungoverned-Usage-of-3rd-Party-Services.md): OWASP Project document, Commit 74b2c790d551 (2025-11-03).
- [CICD-SEC-9: Improper Artifact Integrity Validation](https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-09-Improper-Artifact-Integrity-Validation.md): OWASP Project document, Commit 74b2c790d551 (2025-11-03).
- [CICD-SEC-10: Insufficient Logging and Visibility](https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-10-Insufficient-Logging-And-Visibility.md): OWASP Project document, Commit 74b2c790d551 (2025-11-03).

## License

MIT
