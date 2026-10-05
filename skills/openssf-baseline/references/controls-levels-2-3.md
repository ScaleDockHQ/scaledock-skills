# Level 2 and Level 3 requirements (v2026.08.28)

Read this for steps 5 and 9 of the workflow. Source: the v2026.08.28 control catalog (`baseline/OSPS-*.yaml` at tag v2026.08.28), the version page and its checklist, listed in [Sources](../SKILL.md#sources). A Level 2 claim also needs every Level 1 requirement whose applicability includes `maturity-2`; a Level 3 claim needs everything whose applicability includes `maturity-3` (see [`controls-level-1.md`](controls-level-1.md)). The level after each identifier is the lowest level it applies at.

## Level 2 requirements (19, all also apply at Level 3)

### Access Control

- **OSPS-AC-04.01** (L2): When a CI/CD task runs with no permissions specified, the CI/CD system MUST default the task's permissions to the lowest permissions granted in the pipeline. Recommendation: set the project or organization default for new pipelines to the lowest permissions. Evidence: the default workflow token permission setting.

### Build and Release

- **OSPS-BR-02.01** (L2): When an official release is created, it MUST be assigned a unique version identifier, following a consistent scheme such as SemVer, CalVer or a git commit id.
- **OSPS-BR-04.01** (L2): When an official release is created, it MUST contain a descriptive log of functional and security modifications. Recommendation: human-readable, beyond commit messages, under a header such as `## Changelog` for machine readability.
- **OSPS-BR-05.01** (L2): When a build and release pipeline ingests dependencies, it MUST use standardized tooling where available: package managers or dependency management tools, with a dependency file, lock file or manifest.
- **OSPS-BR-06.01** (L2): When an official release is created, it MUST be signed, or accounted for in a signed manifest including each asset's cryptographic hashes. Recommendation: GPG or PGP signatures, Sigstore signatures, SLSA provenance or SLSA VSAs, signed at build time.

### Documentation

- **OSPS-DO-06.01** (L2): When the project has made a release, the documentation MUST describe how the project selects, obtains and tracks its dependencies.
- **OSPS-DO-07.01** (L2): The documentation MUST include instructions to build the software, including required libraries, frameworks, SDKs and dependencies, for example in `CONTRIBUTING.md` or as `Makefile` targets.

### Governance

- **OSPS-GV-01.01** (L2): The documentation MUST include a list of project members with access to sensitive resources (for example `MAINTAINERS.md`, `GOVERNANCE.md`).
- **OSPS-GV-01.02** (L2): The documentation MUST include descriptions of the roles and responsibilities of project members.
- **OSPS-GV-03.02** (L2): The documentation MUST include a guide for code contributors with requirements for acceptable contributions: coding standards, testing requirements, submission guidelines.

### Legal

- **OSPS-LE-01.01** (L2): The version control system MUST require all code contributors to assert that they are legally authorized to make the contribution on every commit. Recommendation: a DCO enforced by a status check, or a CLA; some platforms include this in their terms of service; projects with long history need not enforce it retroactively.

### Quality

- **OSPS-QA-03.01** (L2): When a commit is made to the primary branch, any automated status checks MUST pass or be manually bypassed. Recommendation: do not make optional checks required, so approvers are not tempted to bypass.
- **OSPS-QA-06.01** (L2): Before a commit is accepted, the CI/CD pipelines MUST run at least one automated test suite.

### Security Assessment

- **OSPS-SA-01.01** (L2): When the project has made a release, the documentation MUST include design documentation showing all actions and actors in the system. Actors include any subsystem or entity that can influence another segment.
- **OSPS-SA-02.01** (L2): When the project has made a release, the documentation MUST describe all external software interfaces of the released assets.
- **OSPS-SA-03.01** (L2): When the project has made a release, the project MUST perform a security assessment of the most likely and impactful potential security problems, and keep it updated for new features or breaking changes.

### Vulnerability Management

- **OSPS-VM-01.01** (L2): The documentation MUST include a coordinated vulnerability disclosure (CVD) policy with a clear timeframe for response. Recommendation: a `SECURITY.md` at the root with the reporting method and response expectations.
- **OSPS-VM-03.01** (L2): The documentation MUST provide a means for private vulnerability reporting directly to the security contacts: a dedicated email address, a web form, VCS private reporting, or similar.
- **OSPS-VM-04.01** (L2): The documentation MUST publicly publish data about discovered vulnerabilities in a predictable channel (a CVE entry, an advisory, a blog post), ideally with affected versions, how to tell if you are affected, and mitigation.

## Level 3 requirements (21)

### Access Control

- **OSPS-AC-04.02** (L3): When a job is assigned permissions in a CI/CD pipeline, the source code or configuration MUST assign only the minimum privileges necessary. Recommendation: set permissions at the top level of the pipeline when the platform has no organization or repository default.

### Build and Release

- **OSPS-BR-01.04** (L3): CI/CD pipelines that accept trusted collaborator input MUST sanitize and validate it before use. Manual workflow inputs cannot be reviewed and could be abused through account takeover or an insider.
- **OSPS-BR-02.02** (L3): When an official release is created, all assets in it MUST be clearly associated with the release identifier or another unique identifier for the asset.
- **OSPS-BR-07.02** (L3): The project MUST define a policy for managing secrets and credentials, covering storing, accessing and rotating them.

### Documentation

- **OSPS-DO-03.01** (L3): When the project has made a release, the documentation MUST contain instructions to verify the integrity and authenticity of the release assets: technology, commands and expected output. Avoid storing them in the same place as the release pipeline.
- **OSPS-DO-03.02** (L3): When the project has made a release, the documentation MUST contain instructions to verify the expected identity of the person or process authoring the release, such as signing key IDs or a Sigstore certificate's issuer and identity.
- **OSPS-DO-04.01** (L3): When the project has made a release, the documentation MUST describe the scope and duration of support for each release (for example `SUPPORT.md` or a Support section in `SECURITY.md`).
- **OSPS-DO-05.01** (L3): When the project has made a release, the documentation MUST state when releases or versions will no longer receive security updates.

### Governance

- **OSPS-GV-04.01** (L3): The documentation MUST have a policy that code collaborators are reviewed before being granted escalated permissions to sensitive resources (merge approval, secrets access).

### Quality

- **OSPS-QA-02.02** (L3): When the project has made a release, all compiled released software assets MUST be delivered with a software bill of materials. The lexicon requires CycloneDX or SPDX with license, supplier name, component filename, name and version, software identifiers, relationships, SBOM author and timestamp, and hashes for deployable and executable components where possible.
- **OSPS-QA-04.02** (L3): When a release comprises multiple source code repositories, all subprojects MUST enforce security requirements as strict or stricter than the primary codebase.
- **OSPS-QA-06.02** (L3): The documentation MUST clearly document when and how tests are run, locally and in CI/CD.
- **OSPS-QA-06.03** (L3): The documentation MUST include a policy that all major changes should add or update tests in an automated test suite, and say what counts as a major change.
- **OSPS-QA-07.01** (L3): When a commit is made to the primary branch, the version control system MUST require at least one non-author human approval before merging.

### Security Assessment

- **OSPS-SA-03.02** (L3): When the project has made a release, the project MUST perform threat modeling and attack surface analysis of critical code paths, functions and interactions.

### Vulnerability Management

- **OSPS-VM-04.02** (L3): Vulnerabilities in software components that do not affect the project MUST be accounted for in a VEX document, with non-exploitability details. Recommendation: a VEX feed with the exploitability status of known vulnerabilities.
- **OSPS-VM-05.01** (L3): The documentation MUST include a policy that defines a remediation threshold for SCA findings related to vulnerabilities and licenses. (Split into VM-05.04 and VM-05.05 in the in-development version; see [`versions.md`](versions.md).)
- **OSPS-VM-05.02** (L3): The documentation MUST include a policy to address SCA violations before any release, with status checks that verify it.
- **OSPS-VM-05.03** (L3): All changes MUST be automatically evaluated against a documented policy for malicious dependencies and known vulnerabilities in dependencies, and blocked on violations, except when declared and suppressed as non-exploitable. Recommendation: an SCA status check required before merge.
- **OSPS-VM-06.01** (L3): The documentation MUST include a policy that defines a remediation threshold for SAST findings.
- **OSPS-VM-06.02** (L3): All changes MUST be automatically evaluated against a documented policy for security weaknesses and blocked on violations, except when declared and suppressed as non-exploitable. Recommendation: a SAST status check required before merge.

## Common mistakes

- Meeting OSPS-VM-05.03 or OSPS-VM-06.02 with a scanner that reports but does not block the merge.
- Meeting OSPS-QA-07.01 with review that is configured but bypassable by the author, or with bot review only.
- Shipping signatures for OSPS-BR-06.01 without the verification instructions OSPS-DO-03.01 and OSPS-DO-03.02 require at Level 3.
- Publishing an SBOM in the repository but not with the compiled release assets (OSPS-QA-02.02).
- Writing the policy-type requirements (BR-07.02, GV-04.01, VM-05.01, VM-06.01) as intentions without thresholds or a review step.
