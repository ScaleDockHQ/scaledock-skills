# owasp-dsomm

An agent skill for OWASP DSOMM: assessing and improving DevSecOps maturity by dimension, sub-dimension and level.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-dsomm
```

Then ask your agent to apply OWASP DSOMM.

## What it covers

- The OWASP DevSecOps Maturity Model (DSOMM): activities grouped by dimension (Build and Deployment, Culture and Organization, Implementation, Information Gathering, Test and Verification, Agentic AI) and sub-dimension, each with a maturity level from 1 to 5 and a measure. Read from the model's YAML data at a pinned release tag.

## Versions

| Line        | Status  |
| ----------- | ------- |
| OWASP DSOMM | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [DSOMM Build and Deployment / Build](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/BuildAndDeployment/Build.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).
- [DSOMM Build and Deployment / Deployment](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/BuildAndDeployment/Deployment.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).
- [DSOMM Build and Deployment / Patch Management](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/BuildAndDeployment/PatchManagement.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).
- [DSOMM Culture and Organization / Design](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/CultureAndOrganization/Design.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).
- [DSOMM Culture and Organization / Education and Guidance](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/CultureAndOrganization/EducationAndGuidance.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).
- [DSOMM Culture and Organization / Process](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/CultureAndOrganization/Process.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).
- [DSOMM Implementation / Development and Source Control](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/Implementation/DevelopmentAndSourceControl.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).
- [DSOMM Implementation / Application Hardening](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/Implementation/ApplicationHardening.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).
- [DSOMM Implementation / Identity and Access Management](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/Implementation/IdentityAndAccessManagement.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).
- [DSOMM Implementation / Infrastructure Hardening](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/Implementation/InfrastructureHardening.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).
- [DSOMM Information Gathering / Logging](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/InformationGathering/Logging.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).
- [DSOMM Information Gathering / Monitoring](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/InformationGathering/Monitoring.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).
- [DSOMM Test and Verification / Consolidation](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/TestAndVerification/Consolidation.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).
- [DSOMM Test and Verification / Static depth for infrastructure](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/TestAndVerification/StaticDepthForInfrastructure.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).
- [DSOMM Agentic AI / Isolation](https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/AgenticAI/Isolation.yaml): OWASP Project model data, Release v5.1.0 (2026-09-21).

## License

MIT
