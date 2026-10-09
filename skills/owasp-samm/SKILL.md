---
name: owasp-samm
description: >-
  OWASP SAMM: assess and improve software assurance maturity across business functions and practices. Covers OWASP SAMM. Use when assessing software assurance maturity. Triggers: SAMM.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# OWASP SAMM

The OWASP Software Assurance Maturity Model (SAMM) v2: five business functions (Governance, Design, Implementation, Verification, Operations), each with three security practices, each practice with two streams (A and B) over maturity levels 1 to 3. Read from the project's core model YAML at a pinned release tag.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Owner or assessor of a software security program, scoring or improving practices by maturity level.
- Target version: OWASP SAMM (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **G-SM.** "This practice forms the basis of your secure software activities by building an overall plan."
2. **D-TA.** "This practice focuses on identifying potential threats in applications."
3. **I-SB.** "This practice focuses on creating a consistently repeatable build process and accounting for the security of application dependencies."
4. **V-ST.** "This practice focuses on the detection and resolution of basic security issues through automation, allowing manual testing to focus on more complex attack vectors."
5. **O-IM.** "This practice addresses activities carried out to improve the organization's detection of, and response to, security incidents."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the section it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Each of the 15 practices is scored at a maturity level from 0 to 3 for both of its streams, and every finding names its practice or activity id.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `owasp-dsomm`, `nist-ssdf`, `s2c2f`, `owasp-asvs`, `openssf-baseline`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [G-SM: Strategy and Metrics (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/G-Strategy-Metrics.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [G-PC: Policy and Compliance (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/G-Policy-Compliance.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [G-EG: Education and Guidance (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/G-Education-Guidance.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [D-TA: Threat Assessment (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/D-Threat-Assessment.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [D-SR: Security Requirements (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/D-Security-Requirements.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [D-SA: Secure Architecture (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/D-Secure-Architecture.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [I-SB: Secure Build (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/I-Secure-Build.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [I-SD: Secure Deployment (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/I-Secure-Deployment.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [I-DM: Defect Management (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/I-Defect-Management.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [V-AA: Architecture Assessment (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/V-Architecture-Assessment.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [V-RT: Requirements-driven Testing (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/V-Requirements-Testing.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [V-ST: Security Testing (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/V-Security-Testing.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [O-IM: Incident Management (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/O-Incident-Management.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [O-EM: Environment Management (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/O-Environment-Management.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [O-OM: Operational Management (practice)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/security_practices/O-Operational-Management.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [D-TA-1-B: Perform basic threat modeling (activity)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/activities/D-TA-1-B.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [I-SB-1-B: Identify application dependencies (activity)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/activities/I-SB-1-B.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [I-SD-1-B: Protect application secrets in configuration and code (activity)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/activities/I-SD-1-B.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [I-DM-1-A: Track security defects centrally (activity)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/activities/I-DM-1-A.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
- [O-IM-1-B: Create an incident response plan (activity)](https://raw.githubusercontent.com/owaspsamm/core/v2.2.0/model/activities/O-IM-1-B.yml): OWASP Flagship Project model, Release v2.2.0 (2026-07-06), checked 2026-10-06.
