# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. DSOMM is a maturity model and has no MUST or SHALL keywords, so each activity is given by its `measure`, quoted as written. Each is labelled with its sub-dimension, activity name and level. All quotes here are level 1 activities, the entry point for an assessment; higher levels are in the same YAML files.

## Build and Deployment / Build

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/BuildAndDeployment/Build.yaml

- **Build: Defined build process (level 1).** Find a tool that suits your environment. Add your manual build steps, include steps for running tests, scanning and preparation for deployment.

## Build and Deployment / Deployment

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/BuildAndDeployment/Deployment.yaml

- **Deployment: Defined deployment process (level 1).** Establish a written deployment process documented in README files, wikis, or implemented as executable scripts and automated steps.
- **Deployment: Inventory of production components (level 1).** A documented inventory of components in production exists (gathered manually or automatically).

## Build and Deployment / Patch Management

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/BuildAndDeployment/PatchManagement.yaml

- **Patch Management: Automated PRs for patches (level 1).** Fast patching of third-party components is needed. The DevOps way is to have an automated pull request for new components.

## Culture and Organization / Design

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/CultureAndOrganization/Design.yaml

- **Design: Conduction of simple threat modeling on technical level (level 1).** Perform threat modeling of technical features during product sprint planning using simple checklists and diagrams. Document identified threats and mitigations for new or changed functionality.

## Culture and Organization / Education and Guidance

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/CultureAndOrganization/EducationAndGuidance.yaml

- **Education and Guidance: Ad-Hoc Security trainings for software developers (level 1).** Provide security awareness training for all personnel involved in software development on an ad-hoc basis, ensuring that relevant topics are covered when new risks or needs are identified.

## Culture and Organization / Process

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/CultureAndOrganization/Process.yaml

- **Process: Definition of simple BCDR practices for critical components (level 1).** Develop, document, and communicate a BCDR plan for all critical components.

## Implementation / Development and Source Control

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/Implementation/DevelopmentAndSourceControl.yaml

- **Development and Source Control: Version control (level 1).** Version your source code in order to identify deployed features and issues. This includes application and infrastructure code, jenkins configuration, container and virtual machine images definitions.

## Implementation / Application Hardening

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/Implementation/ApplicationHardening.yaml

- **Application Hardening: Context-aware output encoding (level 1).** Implement content security policies (CSP) to restrict the types of content that can be loaded and executed.

## Implementation / Identity and Access Management

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/Implementation/IdentityAndAccessManagement.yaml

- **Identity and Access Management: MFA for admins (level 1).** Two or more factor authentication for all privileged accounts on systems and applications.
- **Identity and Access Management: Enforce server-side authorization on every request (level 1).** Authorization is checked server-side on every state-changing and data-returning endpoint.
- **Identity and Access Management: Enforce server-side authorization on every request (level 1).** Access is deny-by-default; missing a check fails closed, not open.

## Implementation / Infrastructure Hardening

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/Implementation/InfrastructureHardening.yaml

- **Infrastructure Hardening: Usage of edge encryption at transit (level 1).** Using standard secure protocols like HTTPS is recommended.

## Information Gathering / Logging

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/InformationGathering/Logging.yaml

- **Logging: Centralized system logging (level 1).** System logs must be stored in a central repository, protected from unauthorized access and modification.

## Information Gathering / Monitoring

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/InformationGathering/Monitoring.yaml

- **Monitoring: Simple system metrics (level 1).** Collect and monitor key system metrics, including CPU, memory, and disk usage.

## Test and Verification / Consolidation

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/TestAndVerification/Consolidation.yaml

- **Consolidation: Treatment of defects with high or critical severity (level 1).** Make it a rule that all _high_ or _critical_ security findings must be fixed before the software is approved for release or use.

## Test and Verification / Static depth for infrastructure

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/TestAndVerification/StaticDepthForInfrastructure.yaml

- **Static depth for infrastructure: Test for stored secrets in code (level 1).** Test for secrets in code and git history
- **Static depth for infrastructure: Test for stored secrets in build artifacts (level 1).** Test for secrets in container images and other artifacts

## Agentic AI / Isolation

Source: https://raw.githubusercontent.com/devsecopsmaturitymodel/DevSecOps-MaturityModel-data/v5.1.0/src/assets/YAML/default/AgenticAI/Isolation.yaml

- **Isolation: Usage of sandboxing for AI agents (level 1).** Run AI agents and AI coding assistants with command execution capabilities in a dedicated, least-privilege sandbox (e.g. a container or virtual machine) which contains only the required project files and is destroyed after use.
