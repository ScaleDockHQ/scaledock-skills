# Assessing a repository and mapping to other frameworks

Read this for steps 2, 3, 6 and 7 of the workflow. Sources: the Baseline home page, FAQ, Maintainer Guidance, the v2026.08.28 version page, checklist and crosswalk, the mapping documents in `baseline/mappings/`, and Scorecard's OSPS Baseline coverage analysis, listed in [Sources](../SKILL.md#sources).

## What an assessment is

- The Baseline is a minimum set of security practices for open source projects relative to their maturity level, written for the project's developers rather than its consumers (FAQ, What's the purpose…; How can I verify an upstream project's compliance…).
- No level is required unless a sponsoring organization (for example a foundation) imposes one; all projects are encouraged to meet Level 1 at minimum as a "universal security floor" (FAQ, What OSPS Baseline level am I required to meet?).
- Projects self-attest (FAQ, How can I prove…). A consumer verifying an upstream project can accept the self-attestation or make another arrangement with the project; many controls are publicly observable, but some concern privileged settings (FAQ, How can I verify…).
- The Baseline is not a security comparison, scoring or grading tool, and validation tooling cannot discover every implementation (FAQ, What should the Baseline not be used for?).
- It is not a substitute for formal regulatory compliance or certification (FAQ, How does the baseline relate to established frameworks…).

## Scoping (step 2)

Write down:

1. **Version and level.** OSPS Baseline v2026.08.28 and the target level, with the reason from the level descriptions (Controls Overview): Level 1 for any project, Level 2 for a code project with at least 2 maintainers and a small number of consistent users, Level 3 for a code project with a large number of consistent users.
2. **Repositories.** The authoritative repository and every other codebase that is part of the project; with multiple repositories, OSPS-QA-04.01 requires this list in the documentation anyway.
3. **Release status.** Whether the project has made a release and creates official releases. Many requirements start with "When the project has made a release" or "When an official release is created".
4. **Channels.** The official project channels (OSPS-BR-03.01) and official distribution channels (OSPS-BR-03.02).
5. **Documentation location.** Where the project documentation lives (repository files, website).
6. **Access.** Whether you can read VCS and CI/CD admin settings.

## Evidence (step 3)

| Kind              | Examples                                                                                    | Requirements it usually serves                        |
| ----------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Platform settings | MFA requirement, default member permission, branch protection or rulesets, default CI token | AC-01, AC-02, AC-03, AC-04.01, QA-03, QA-07           |
| Workflow files    | triggers, `permissions:`, use of untrusted context values                                   | AC-04, BR-01                                          |
| Repository files  | `LICENSE`, `SECURITY.md`, `CONTRIBUTING.md`, `MAINTAINERS.md`, manifests and lock files     | LE, VM-01 to VM-03, GV, QA-02.01, BR-05, DO-06, DO-07 |
| Release assets    | version tags, changelog, signatures or signed manifest, SBOM, license file                  | BR-02, BR-04, BR-06, QA-02.02, LE-02.02, LE-03.02     |
| Documents         | user guide, design and interface docs, security assessment, threat model, policies          | DO, SA, BR-07.02, GV-04, VM-05, VM-06                 |

**Security Insights.** The Baseline's maintainer guidance recommends adopting the OpenSSF Security Insights specification: a `security-insights.yml` file in the repository, populated following the specification's `example-full.yml`. Many Baseline evaluation tools read it to evaluate controls that platform APIs cannot audit (Maintainer Guidance, Use Security Insights). Scorecard's coverage analysis likewise names Security Insights as the source for declared channels and subprojects (OSPS-BR-03.01, BR-03.02, QA-04.01).

**Tooling.** The maintainer guidance lists LFX Insights, which measures Baseline controls, and the Privateer plugin for GitHub repositories, which automates some Baseline checks and is also available as the "OSPS Security Assessment" GitHub Action (Maintainer Guidance, Evaluation tooling). Treat any tool's output as evidence for the requirements it covers, not as the result for the whole level.

**What automation cannot see.** Scorecard's own analysis of Baseline v2026.02.19 classes OSPS-AC-01.01, OSPS-AC-02.01 and OSPS-GV-01.01 as not observable without organization-level access, and finds most documentation and policy requirements need attestation rather than detection. It says not-observable controls must be reported as UNKNOWN with an explanation (coverage analysis, Summary and Notes). Use the same rule: unknown is not met.

## Recording the result (step 6)

1. Copy the version's checklist (`/versions/2026-08-28-checklist`), a Markdown task list grouped by level that the maintainer guidance suggests tracking in a repository issue (Maintainer Guidance).
2. For each requirement, record met, not met, not applicable (with the precondition that does not hold) or unknown, and a link to the evidence.
3. Only when every requirement that applies at the target level is met, write the statement in the FAQ's form: "As of <date>, this project complies with OSPS Baseline version <version> level <level>." (FAQ, Does OSPS Baseline compliance expire?). Use the real release identifier, `2026.08.28` or `2026-08-28`.
4. Re-assess when the project changes or a new Baseline version becomes current; compliance is a point-in-time status.

Example statement and gaps list:

```markdown
As of 2026-10-05, this project complies with OSPS Baseline version 2026.08.28 level 1.

Level 2 gaps (not claimed): OSPS-BR-04.01 (no changelog in releases), OSPS-LE-01.01 (no DCO check), OSPS-VM-01.01 (no response timeframe in SECURITY.md).
```

## External framework mappings (step 7)

The Baseline publishes one Gemara `MappingDocument` per framework in `baseline/mappings/osps-to-<framework>.yaml`, also published to grc.store with each release and inverted into the version's External Framework Crosswalk page (external requirement to Baseline controls). Every mapping asserts a `relates-to` relationship from a Baseline control to entries in the external framework; strength, confidence and rationale are left unset until reviewed, and the documents are marked draft (mapping document metadata). These are "not guaranteed to be 100% matches", are "not a functional connection", and provide "no claim of compliance with listed external catalogs" (version page Overview; FAQ).

Frameworks with mapping documents at v2026.08.28 (External Frameworks table):

| Id             | Framework                                                         | Version       |
| -------------- | ----------------------------------------------------------------- | ------------- |
| BPB            | OpenSSF Best Practices Badge                                      | 2024          |
| Scorecard      | OpenSSF Scorecard                                                 | 5.0           |
| CSF            | NIST Cybersecurity Framework                                      | 2.0           |
| CRA            | EU Cyber Resilience Act, Regulation (EU) 2024/2847                | 20.11.2024    |
| SSDF           | NIST Secure Software Development Framework                        | 1.1           |
| ISO-18974      | ISO/IEC 18974                                                     | 1.0 - 2023-12 |
| OpenCRE        | OpenCRE                                                           | 2024          |
| SLSA           | Supply-chain Levels for Software Artifacts                        | 1.0           |
| PSSCRM         | Proactive Software Supply Chain Risk Management Framework         | 1.0           |
| SAMM           | OWASP Software Assurance Maturity Model                           | 2.0           |
| PCIDSS         | PCI Data Security Standard                                        | 4.0.1         |
| 800-161        | NIST SP 800-161                                                   | r1-upd1       |
| UKSSCOP        | UK Software Security Code of Practice                             | 2025-05-07    |
| BSI-TR-03185-2 | BSI TR-03185-2 Secure Software Lifecycle for Open Source Software | v1.1.0        |

### CRA mapping (osps-to-cra.yaml)

Target entries use the mapping's own short identifiers (`1.1`, `1.2a` to `1.2l`, `2.1` to `2.8`) against Regulation (EU) 2024/2847 as published on 20.11.2024; the document does not expand them, so resolve each one against the regulation's essential requirements before quoting it. Selected relationships:

| Baseline control  | CRA entries                                 |
| ----------------- | ------------------------------------------- |
| OSPS-AC-01        | 1.2d, 1.2e, 1.2f                            |
| OSPS-BR-03        | 1.2d, 1.2e, 1.2f, 1.2i, 1.2j, 1.2k          |
| OSPS-BR-05        | 1.2b, 1.2d, 1.2f, 1.2h, 1.2j, 2.1, 2.2, 2.3 |
| OSPS-QA-02        | 2.1, 2.2, 2.3                               |
| OSPS-SA-03        | 1.1, 1.2j, 1.2k, 2.2                        |
| OSPS-VM-01        | 2.1, 2.2, 2.3, 2.6, 2.7, 2.8                |
| OSPS-VM-02        | 2.5                                         |
| OSPS-VM-03        | 2.5, 2.6                                    |
| OSPS-VM-04        | 1.2a, 1.2b, 2.1, 2.4, 2.6                   |
| OSPS-VM-05, VM-06 | 1.2a, 1.2b, 1.2c, 2.1, 2.2, 2.3, 2.4        |

OSPS-BR-06, OSPS-BR-07, OSPS-DO-04, OSPS-DO-07, OSPS-GV-01 and OSPS-QA-07 have no CRA entry in this document; every other control has at least one. For what the CRA requires, use the `eu-cra` skill.

### SLSA mapping (osps-to-slsa.yaml)

| Baseline control  | SLSA 1.0 entries                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| OSPS-AC-04        | Choose an appropriate build platform; Build platform - Isolation strength - Isolated                   |
| OSPS-BR-01        | Choose an appropriate build platform                                                                   |
| OSPS-BR-02        | Follow a consistent build process; Build platform - Provenance generation - Exists, Authentic          |
| OSPS-BR-03        | Choose an appropriate build platform                                                                   |
| OSPS-BR-04        | Choose an appropriate build platform; Follow a consistent build process; Isolation strength - Isolated |
| OSPS-BR-05        | Build platform - Isolation strength - Isolated                                                         |
| OSPS-BR-06        | Distribute provenance                                                                                  |
| OSPS-QA-01, QA-04 | Build platform - Isolation strength - Isolated                                                         |

For the SLSA requirements themselves, use the `slsa` skill.

The Scorecard mapping is in [`scorecard.md`](scorecard.md#baseline-to-scorecard-mapping).

## Reporting a mapping

- Name the Baseline version, the mapping document and its framework version.
- Say "relates to", not "satisfies" or "complies with".
- State that the mapping is not a claim of compliance with the external framework and not a substitute for an audit (FAQ).
