# owasp-samm

An agent skill for OWASP SAMM: assessing and improving software assurance maturity across the five business functions and fifteen security practices.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-samm
```

Then ask your agent to apply OWASP SAMM.

## What it covers

- The OWASP Software Assurance Maturity Model (SAMM) v2: five business functions (Governance, Design, Implementation, Verification, Operations), each with three security practices, each practice with two streams (A and B) over maturity levels 1 to 3. Read from the project's core model YAML at a pinned release tag.

## Versions

| Line       | Status  |
| ---------- | ------- |
| OWASP SAMM | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [G-SM: Strategy and Metrics (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/G-Strategy-Metrics.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [G-PC: Policy and Compliance (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/G-Policy-Compliance.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [G-EG: Education and Guidance (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/G-Education-Guidance.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [D-TA: Threat Assessment (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/D-Threat-Assessment.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [D-SR: Security Requirements (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/D-Security-Requirements.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [D-SA: Secure Architecture (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/D-Secure-Architecture.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [I-SB: Secure Build (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/I-Secure-Build.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [I-SD: Secure Deployment (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/I-Secure-Deployment.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [I-DM: Defect Management (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/I-Defect-Management.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [V-AA: Architecture Assessment (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/V-Architecture-Assessment.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [V-RT: Requirements-driven Testing (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/V-Requirements-Testing.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [V-ST: Security Testing (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/V-Security-Testing.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [O-IM: Incident Management (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/O-Incident-Management.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [O-EM: Environment Management (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/O-Environment-Management.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [O-OM: Operational Management (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/O-Operational-Management.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [D-TA-1-B: Perform basic threat modeling (activity)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/activities/D-TA-1-B.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [I-SB-1-B: Identify application dependencies (activity)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/activities/I-SB-1-B.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [I-SD-1-B: Protect application secrets in configuration and code (activity)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/activities/I-SD-1-B.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [I-DM-1-A: Track security defects centrally (activity)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/activities/I-DM-1-A.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).
- [O-IM-1-B: Create an incident response plan (activity)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/activities/O-IM-1-B.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06).

## License

MIT
