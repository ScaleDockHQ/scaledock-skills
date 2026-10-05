# Mitigations

Read this when you choose controls for ATLAS techniques, check a control set for coverage, or explain a mitigation. Data from `dist/v6/ATLAS-2026.09.yaml`; the definition comes from the ATLAS Mitigations page. Sources are listed in [Sources](../SKILL.md#sources).

## The model

- The Mitigations page defines them as "security concepts and classes of technologies that can be used to prevent a technique or sub-technique from being successfully executed".
- Each mitigation (`AML.M####`) has at least one `categories` value and at least one `lifecycle-phases` value (`atlas/schemas.py`, `MitigationFields`).
  - Categories: `Policy`, `Technical - AI`, `Technical - Cyber`.
  - Lifecycle phases, in enum order: `Business and Data Understanding`, `Data Preparation`, `AI Model Engineering`, `AI Model Evaluation`, `Deployment`, `Monitoring and Maintenance`.
- A mitigation reaches techniques only through `mitigates` relationships (source the mitigation, target a technique or sub-technique). Each relationship has a `description` that says how the mitigation applies to that technique. The technique page shows those descriptions under Mitigations, for example AML.M0020 on AML.T0051: "Guardrails can prevent harmful inputs that can lead to prompt injection."
- Quote the per-technique `description`, not only the mitigation's general text, when you justify a control in a threat model.
- A mitigation with `attack-reference` is adapted from an ATT&CK mitigation (`M####`).
- Mitigations do not detect. ATLAS 2026.09 has no detection, data source or analytic objects; the schema has none. Detection mapping is your own work; see [`threat-modeling.md`](threat-modeling.md).

## Coverage queries

Build these from the `relationships` map:

- Mitigations for a technique: every `mitigates` edge whose `target` is the technique ID. Check the parent too: an edge to `AML.T0051` does not list `AML.T0051.001` as its target.
- Techniques a mitigation covers: the `mitigates` list under the mitigation's own key.
- Gaps: techniques in scope with no `mitigates` edge from a mitigation you deployed.

## Mitigations in 2026.09

Categories: Pol = Policy, AI = Technical - AI, Cyb = Technical - Cyber. Phases: BU = Business and Data Understanding, DP = Data Preparation, ME = AI Model Engineering, EV = AI Model Evaluation, DE = Deployment, MM = Monitoring and Maintenance. "Mitigates" is the number of `mitigates` relationships.

| Id          | Mitigation                                          | Categories   | Lifecycle phases       | ATT&CK | Mitigates |
| ----------- | --------------------------------------------------- | ------------ | ---------------------- | ------ | --------- |
| `AML.M0000` | Limit Public Release of Information                 | Pol          | BU                     |        | 15        |
| `AML.M0001` | Limit Model Artifact Release                        | Pol          | BU, DE                 |        | 8         |
| `AML.M0002` | Predictive AI Output Obfuscation                    | AI           | EV, DE                 |        | 11        |
| `AML.M0003` | Predictive AI Model Hardening                       | AI           | DP, ME                 |        | 8         |
| `AML.M0004` | Limit AI Service Query Volume and Rate              | Cyb          | BU, DE, MM             |        | 16        |
| `AML.M0005` | Control Access to AI Models and Data at Rest        | Pol          | BU, DP, ME, EV         |        | 20        |
| `AML.M0006` | Predictive AI Ensembles                             | AI           | ME                     |        | 11        |
| `AML.M0007` | Sanitize Training Data                              | AI           | BU, DP, MM             |        | 6         |
| `AML.M0008` | Validate AI Model                                   | AI           | EV, MM                 |        | 10        |
| `AML.M0009` | Predictive AI Multi-Sensor Fusion                   | Cyb          | BU, DP, ME             |        | 3         |
| `AML.M0010` | Predictive AI Input Restoration                     | AI           | DP, EV, DE, MM         |        | 8         |
| `AML.M0011` | Restrict Library Loading                            | Cyb          | DE                     | M1044  | 6         |
| `AML.M0012` | Encrypt Sensitive Information                       | Cyb          | DP, ME, DE             | M1041  | 4         |
| `AML.M0013` | Code Signing                                        | Cyb          | DE                     | M1045  | 8         |
| `AML.M0014` | Verify AI Artifacts                                 | Cyb          | BU, DP, ME             |        | 5         |
| `AML.M0015` | Predictive AI Adversarial Input Detection           | AI           | DP, ME, EV, DE, MM     |        | 9         |
| `AML.M0016` | Vulnerability Scanning                              | Cyb          | DP, ME                 |        | 10        |
| `AML.M0017` | AI Model Distribution Methods                       | Pol          | DE                     |        | 6         |
| `AML.M0018` | User Training                                       | Pol          | BU, DP, ME, EV, DE, MM | M1017  | 6         |
| `AML.M0019` | Control Access to AI Models and Data in Production  | Pol          | DE, MM                 |        | 20        |
| `AML.M0020` | Generative AI Guardrails                            | AI           | ME, EV, DE, MM         |        | 23        |
| `AML.M0021` | Generative AI Guidelines                            | AI           | ME, EV, DE             |        | 8         |
| `AML.M0022` | Generative AI Model Alignment                       | AI           | ME, EV, DE             |        | 9         |
| `AML.M0023` | AI Bill of Materials                                | Pol          | BU, DP, ME             |        | 5         |
| `AML.M0024` | AI Telemetry Logging                                | Cyb          | DE, MM                 |        | 18        |
| `AML.M0025` | Maintain AI Dataset Provenance                      | AI           | BU, DP                 |        | 5         |
| `AML.M0026` | Privileged AI Agent Permissions Configuration       | Cyb          | DE                     |        | 7         |
| `AML.M0027` | Single-User AI Agent Permissions Configuration      | Cyb          | DE                     |        | 7         |
| `AML.M0028` | AI Agent Tools Permissions Configuration            | Cyb          | DE                     |        | 5         |
| `AML.M0029` | Human In-the-Loop for AI Agent Actions              | AI           | DE                     |        | 3         |
| `AML.M0030` | Restrict AI Agent Tool Invocation on Untrusted Data | AI           | DE                     |        | 3         |
| `AML.M0031` | Memory Hardening                                    | AI           | ME, DE, MM             |        | 2         |
| `AML.M0032` | Segmentation of AI Agent Components                 | Cyb          | BU, DE                 |        | 7         |
| `AML.M0033` | Input and Output Validation for AI Agent Components | AI           | BU, DP, DE             |        | 6         |
| `AML.M0034` | Deepfake Detection                                  | AI           | ME, EV, DE, MM         |        | 5         |
| `AML.M0035` | AI Red Team                                         | Pol, AI, Cyb | BU, DP, ME, EV, DE, MM |        | 33        |
| `AML.M0036` | Limit AI Workload Resource Consumption              | AI           | DE, MM                 |        | 4         |
| `AML.M0037` | AI Agent Authority Expansion Controls               | AI           | DE, MM                 |        | 3         |
| `AML.M0038` | AI Agent Scope Drift Detection                      | AI           | MM                     |        | 3         |
| `AML.M0039` | AI Honeypots                                        | AI, Cyb      | DE, MM                 |        | 15        |

## Agent-specific mitigations

The first sentence of each description, paraphrased:

- **AML.M0026 Privileged AI Agent Permissions Configuration**: agents granted privileges above a normal user's need tight controls.
- **AML.M0027 Single-User AI Agent Permissions Configuration**: an agent acting for one user needs permission and lifecycle policies.
- **AML.M0028 AI Agent Tools Permissions Configuration**: tools shared across agents need their own permission controls.
- **AML.M0029 Human In-the-Loop for AI Agent Actions**: a human approves agent actions before the agent takes them.
- **AML.M0030 Restrict AI Agent Tool Invocation on Untrusted Data**: untrusted data can carry prompt injections that invoke tools.
- **AML.M0031 Memory Hardening**: protect persistent agent state such as memories, summaries and stored chat history.
- **AML.M0032 Segmentation of AI Agent Components**: enforceable boundaries around tools, data sources, identities and execution environments.
- **AML.M0033 Input and Output Validation for AI Agent Components**: validate inputs and outputs of agent tools and data sources.
- **AML.M0036 Limit AI Workload Resource Consumption**: cap what a request, inference job or agent workflow can consume.
- **AML.M0037 AI Agent Authority Expansion Controls**: stop an agent from obtaining more authority during execution.
- **AML.M0038 AI Agent Scope Drift Detection**: check continuously that planned actions stay within the authorized objective.
- **AML.M0039 AI Honeypots**: decoy AI services, agents and credentials with no business use, so any interaction signals unauthorized activity.

Broad mitigations cover the most techniques: AML.M0035 AI Red Team (33), AML.M0020 Generative AI Guardrails (23), AML.M0005 and AML.M0019 access control (20 each), AML.M0024 AI Telemetry Logging (18).
