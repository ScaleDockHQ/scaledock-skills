# Threat modeling, red teaming and detection mapping

Read this when you use ATLAS to threat-model an AI system, plan or report an AI red team exercise, or tag detections and incidents with ATLAS IDs. The red team method is the one ATLAS itself publishes in AI Red Team (AML.M0035); the logging scope is AI Telemetry Logging (AML.M0024); the rest follows from the data model in [`data-format.md`](data-format.md). Sources are listed in [Sources](../SKILL.md#sources).

## Threat modeling

1. **Describe the system.** AML.M0035 asks you to document the intended use, deployment environment, users, sensitive data, connected resources and potential consequences of failure or misuse, and to diagram components, trust boundaries, data flows, external services, human decision points, and training- and inference-time access points. Consider the complete AI-enabled system: models and data, agents (including memory and tools), data flows, decision processes, application logic, retrieval systems, identities and permissions, software dependencies, non-AI components, infrastructure, user interfaces and human workflows (AML.M0035).
2. **Pick the platforms in scope.** Filter techniques by `platforms`: Predictive AI for classifiers and other predictive models, Generative AI for LLM features, Agentic AI for agents with tools or memory, Enterprise for the surrounding IT. A system can be several at once.
3. **Define the adversary.** Objectives, access, knowledge, capabilities, resources and constraints, including digital and physical attack paths and the role of human oversight (AML.M0035).
4. **Build threat vectors from ATLAS.** "Use ATLAS tactics, techniques, and procedures to identify relevant adversary behaviors and construct threat vectors. Prioritize them according to likelihood and severity of impact" (AML.M0035). Walk the tactics in matrix order (`sequences` `position`) and, for each, keep the in-scope techniques that the system's components expose. Use case studies (`employs` chains) as worked attack paths: they show which techniques real adversaries chained, in order, with the tactic each step served.
5. **Use maturity as evidence, not as priority.** `maturity` says how strong the evidence of use is (Realized, Demonstrated, Feasible). It informs likelihood; it does not replace your own impact assessment. Do not drop Feasible techniques from scope only because they are Feasible.
6. **Attach mitigations.** For each kept technique, list the mitigations from its `mitigates` edges (and its parent's), with the per-technique `description`. Mark each as in place, planned or not applicable. A technique with no mitigation in place is a gap.
7. **Record provenance.** Name the ATLAS release (for example ATLAS v2026.09) and cite IDs, not only names: names change between releases (see [`versions.md`](versions.md)), IDs rarely do.

Output shape: one row per threat vector with the tactic ID, technique or sub-technique ID, platform, maturity, affected component, mitigations (ID plus status), and residual risk.

## Red teaming

AML.M0035 organises an AI red team exercise in three phases:

- **Plan and Scope**: the system description and threat model above; rules of engagement covering authorized systems, accounts, data, techniques, test windows, resource limits, escalation procedures, evidence handling and stop conditions; isolated environments with safeguards for destructive, privacy-invasive or high-cost tests; success criteria, stopping conditions, task-level metrics for effects on the AI capability and operational metrics for the overall system.
- **Execute**: manual and automated methods; record attack activity, system responses, control behaviour, deviations from the test plan and evidence; stop or escalate at the predefined conditions; afterwards remove test accounts, modified data, installed software, persistent instructions and other artifacts. For agents, persistent instructions include memory written through AML.T0080.000.
- **Assess, Report, and Improve**: evaluate against the metrics; document successful and unsuccessful attacks, consequences, control behaviour, deviations and threat-model gaps; report to developers, defenders, operational teams and risk owners; assign owners, track remediation and retest; turn confirmed failures into regression tests, evaluation datasets, detection logic, monitoring requirements or deployment criteria.

AML.M0035 also says red teaming is continuous and is repeated when the threat landscape evolves or the system, its components, intended use or deployment environment change.

Tag every test case and every finding with the tactic and technique ID it exercises. A finding report can then be expressed in the same shape as an ATLAS case study: steps with `tactic`, `technique`, `step-id`, `leads-to` and a description, and `type: Exercise` (an exercise carries no `reporter`).

## Detection mapping

ATLAS 2026.09 has no detection, data source or analytic objects, so the mapping is yours to build:

1. **Log what AML.M0024 names.** Inputs and outputs of deployed models; for agents, the intermediate steps of agentic actions and decisions, data access and tool use, installation commands, and the identity of the agent.
2. **Tag each detection rule** with the ATLAS technique (or sub-technique) ID and the tactic it detects, and with the ATT&CK ID from `attack-reference` when the technique has one, so enterprise detection tooling can join on it.
3. **Measure coverage** per tactic: techniques in the threat model with at least one detection, at least one mitigation, both, or neither.
4. **Use decoys for early tactics.** AI Honeypots (AML.M0039): any interaction with a decoy AI service, agent or credential is a high-confidence indicator of unauthorized activity such as reconnaissance or discovery, and the captured prompts, tooling and techniques feed detection rules.
5. **Tag incidents the same way.** An incident record that lists its steps as tactic plus technique IDs can be compared with ATLAS case studies of `type: Incident`.

When events go to a security data lake, carry the ATLAS IDs as attributes on the finding or detection event rather than in free text; the `ocsf` skill covers that event schema.

## Common mistakes

- Citing a technique name without its ID, or an ID without the release; both break when ATLAS renames or retires entries.
- Using retired IDs such as AML.T0019, AML.T0058, AML.T0104 or AML.T0045 in new work.
- Treating ATLAS and ATT&CK IDs as one namespace, or mapping an AI-specific technique to an ATT&CK ID that has no `attack-reference` link.
- Mapping a multi-tactic technique such as AML.T0053 without saying which tactic the step served.
- Assuming a mitigation edge on a parent technique covers every sub-technique, or the reverse, without checking both.
- Inventing agentic technique IDs or names that are not in the release you read.
