# Trustworthy characteristics, MEASURE and MANAGE

Read this when choosing metrics and TEVV for an AI system (MEASURE), deciding how to treat its risks (MANAGE), or checking which trustworthiness characteristic a measurement serves. Sources: NIST AI 100-1 (AI RMF 1.0) §3, §5.3 to §5.4 with Tables 3 and 4, Appendices B and C, and the AI RMF Playbook, listed in [Sources](../SKILL.md#sources).

## Trustworthy AI characteristics (§3)

"Valid & Reliable is a necessary condition of trustworthiness and is shown as the base for other trustworthiness characteristics. Accountable & Transparent is shown as a vertical box because it relates to all other characteristics" (Figure 4). Addressing characteristics one at a time does not ensure trustworthiness; trade-offs are resolved in context, "in a manner that is both transparent and appropriately justifiable" (§3). Human judgment decides the metrics and thresholds.

| Characteristic                         | What it means in AI 100-1                                                                                                                                                                                                                                                         | Measured mainly in |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Valid and reliable (§3.1)              | Validation confirms requirements for the intended use are fulfilled; reliability is performing as required, without failure, over time. Accuracy and robustness contribute. Accuracy measurements pair with realistic test sets and methodology details and may be disaggregated. | MEASURE 2.5, 2.3   |
| Safe (§3.2)                            | The system does not, under defined conditions, endanger human life, health, property or the environment. Risks of serious injury or death get the most urgent treatment. Includes the ability to shut down, modify or have human intervention.                                    | MEASURE 2.6        |
| Secure and resilient (§3.3)            | Maintains confidentiality, integrity and availability; withstands or recovers from adverse events and degrades gracefully. Concerns include adversarial examples, data poisoning and exfiltration of models or training data.                                                     | MEASURE 2.7        |
| Accountable and transparent (§3.4)     | Information about the system and its outputs is available, tailored to role. Covers design decisions, training data, model structure, intended use and deployment decisions. Provenance of training data helps both.                                                              | MEASURE 2.8        |
| Explainable and interpretable (§3.5)   | Explainability: how a decision was made; interpretability: why, and what it means in context; transparency: what happened.                                                                                                                                                        | MEASURE 2.9        |
| Privacy-enhanced (§3.6)                | Safeguards autonomy, identity and dignity; values such as anonymity, confidentiality and control. PETs and data minimization help, with possible accuracy trade-offs.                                                                                                             | MEASURE 2.10       |
| Fair, with harmful bias managed (§3.7) | Equality and equity; three bias categories to manage: systemic, computational and statistical, and human-cognitive (citing NIST SP 1270). Mitigating bias does not by itself make a system fair.                                                                                  | MEASURE 2.11       |

Appendix B lists how AI risks differ from traditional software risks (data representativeness, drift, pre-trained models, opacity, testing difficulty, compute cost) and says the NIST Cybersecurity Framework, Privacy Framework, Risk Management Framework and SSDF may inform the security and privacy parts of MAP, MEASURE and MANAGE.

## MEASURE (§5.3, Table 3)

MEASURE uses quantitative, qualitative or mixed methods to analyze, assess, benchmark and monitor AI risk. "AI systems should be tested before their deployment and regularly while in operation." Independent review "can improve the effectiveness of testing and can mitigate internal biases and potential conflicts of interest" (§5.3).

| Id           | Outcome (Table 3)                                                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| MEASURE 1    | Appropriate methods and metrics are identified and applied.                                                                                                                                                                          |
| MEASURE 1.1  | Approaches and metrics for risks enumerated in MAP are selected, starting with the most significant risks. Risks or characteristics that will not or cannot be measured are documented.                                              |
| MEASURE 1.2  | Appropriateness of metrics and effectiveness of existing controls are regularly assessed and updated.                                                                                                                                |
| MEASURE 1.3  | Internal experts who were not front-line developers and/or independent assessors are involved in regular assessments; domain experts, users, external AI actors and affected communities are consulted as needed per risk tolerance. |
| MEASURE 2    | AI systems are evaluated for trustworthy characteristics.                                                                                                                                                                            |
| MEASURE 2.1  | Test sets, metrics and details about TEVV tools are documented.                                                                                                                                                                      |
| MEASURE 2.2  | Evaluations involving human subjects meet applicable requirements (including human subject protection) and are representative of the relevant population.                                                                            |
| MEASURE 2.3  | Performance or assurance criteria are measured and demonstrated for conditions similar to the deployment setting; measures are documented.                                                                                           |
| MEASURE 2.4  | Functionality and behavior of the system and its components are monitored in production.                                                                                                                                             |
| MEASURE 2.5  | The system is demonstrated to be valid and reliable; limits of generalizability are documented.                                                                                                                                      |
| MEASURE 2.6  | The system is evaluated regularly for safety risks, demonstrated to be safe, its residual negative risk does not exceed the risk tolerance, and it can fail safely, especially beyond its knowledge limits.                          |
| MEASURE 2.7  | Security and resilience are evaluated and documented.                                                                                                                                                                                |
| MEASURE 2.8  | Risks associated with transparency and accountability are examined and documented.                                                                                                                                                   |
| MEASURE 2.9  | The model is explained, validated and documented, and output is interpreted within its context.                                                                                                                                      |
| MEASURE 2.10 | Privacy risk is examined and documented.                                                                                                                                                                                             |
| MEASURE 2.11 | Fairness and bias are evaluated and results documented.                                                                                                                                                                              |
| MEASURE 2.12 | Environmental impact and sustainability of model training and management are assessed and documented.                                                                                                                                |
| MEASURE 2.13 | Effectiveness of the TEVV metrics and processes is evaluated and documented.                                                                                                                                                         |
| MEASURE 3    | Mechanisms for tracking identified AI risks over time are in place.                                                                                                                                                                  |
| MEASURE 3.1  | Approaches, personnel and documentation regularly identify and track existing, unanticipated and emergent risks.                                                                                                                     |
| MEASURE 3.2  | Risk tracking approaches are considered where risks are hard to assess or metrics are not yet available.                                                                                                                             |
| MEASURE 3.3  | Feedback processes for end users and impacted communities to report problems and appeal outcomes are established and integrated into evaluation metrics.                                                                             |
| MEASURE 4    | Feedback about efficacy of measurement is gathered and assessed.                                                                                                                                                                     |
| MEASURE 4.1  | Measurement approaches are connected to deployment contexts and informed by domain experts and end users; approaches are documented.                                                                                                 |
| MEASURE 4.2  | Measurement results on trustworthiness in deployment are informed by domain experts and relevant AI actors to validate consistent performance; results are documented.                                                               |
| MEASURE 4.3  | Measurable performance improvements or declines, from consultations and field data, are identified and documented.                                                                                                                   |

### Playbook suggested actions, as published (examples)

- MEASURE 1.1: establish approaches for detecting, tracking and measuring known risks, errors, incidents or negative impacts; "Define acceptable limits for system performance (e.g. distribution of errors), and include course correction suggestions"; "Document metric selection criteria and include considered but unused metrics"; "Document risks or trustworthiness characteristics identified in the Map function that will not be measured, including justification for non- measurement."
- MEASURE 3.3: measure the efficacy of end user and operator error reporting; categorize and analyze the type and rate of appeal requests and results; measure participation in and awareness of feedback channels.

## MANAGE (§5.4, Table 4)

MANAGE allocates risk resources to mapped and measured risks "on a regular basis and as defined by the GOVERN function". Risk treatment "comprises plans to respond to, recover from, and communicate about incidents or events" (§5.4).

| Id         | Outcome (Table 4)                                                                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MANAGE 1   | Risks from MAP and MEASURE are prioritized, responded to and managed.                                                                                               |
| MANAGE 1.1 | A determination is made whether the system achieves its intended purposes and whether development or deployment should proceed.                                     |
| MANAGE 1.2 | Treatment of documented risks is prioritized based on impact, likelihood and available resources or methods.                                                        |
| MANAGE 1.3 | Responses to high-priority risks are developed, planned and documented. Options include mitigating, transferring, avoiding or accepting.                            |
| MANAGE 1.4 | Negative residual risks (the sum of all unmitigated risks) to downstream acquirers and end users are documented.                                                    |
| MANAGE 2   | Strategies to maximize benefits and minimize negative impacts are planned, prepared, implemented, documented and informed by relevant AI actors.                    |
| MANAGE 2.1 | Resources required to manage risks are taken into account, along with viable non-AI alternatives.                                                                   |
| MANAGE 2.2 | Mechanisms are in place and applied to sustain the value of deployed systems.                                                                                       |
| MANAGE 2.3 | Procedures are followed to respond to and recover from a previously unknown risk.                                                                                   |
| MANAGE 2.4 | Mechanisms and assigned responsibilities exist to supersede, disengage or deactivate systems whose performance or outcomes are inconsistent with intended use.      |
| MANAGE 3   | Risks and benefits from third-party entities are managed.                                                                                                           |
| MANAGE 3.1 | Third-party risks and benefits are regularly monitored, and risk controls applied and documented.                                                                   |
| MANAGE 3.2 | Pre-trained models used for development are monitored as part of regular monitoring and maintenance.                                                                |
| MANAGE 4   | Risk treatments, including response, recovery and communication plans, are documented and monitored regularly.                                                      |
| MANAGE 4.1 | Post-deployment monitoring plans are implemented, including user input, appeal and override, decommissioning, incident response, recovery and change management.    |
| MANAGE 4.2 | Measurable continual-improvement activities are integrated into system updates, with regular engagement with interested parties.                                    |
| MANAGE 4.3 | Incidents and errors are communicated to relevant AI actors, including affected communities; tracking, response and recovery processes are followed and documented. |

### Playbook suggested actions, as published (examples)

- MANAGE 1.3: "Prioritize risks involving physical safety, legal liabilities, regulatory compliance, and negative impacts on individuals, groups, or society"; identify response plans, resources and teams; store documentation "in an organized, secure repository".
- MANAGE 2.4: review bypass procedures and backup systems; set incident thresholds for bypass or deactivation; "Preserve materials for forensic, regulatory, and legal review"; run root cause analysis of bypass or deactivation events; set criteria for redeployment.
- MANAGE 4.3: "Maintain a database of reported errors, near-misses, incidents and negative impacts including date reported, number of reports, assessment of impact and severity, and responses"; keep a database of system changes and version history.

## Human-AI configuration (Appendix C)

Human roles and responsibilities in decision making and overseeing AI systems "need to be clearly defined and differentiated"; configurations range from fully autonomous to fully manual. GOVERN clarifies the roles (GOVERN 3.2), MAP defines operator proficiency and oversight processes (MAP 3.4, MAP 3.5), and data on how often and why humans overrule outputs may be useful to collect.

## Common mistakes

- Reporting only aggregate accuracy, without realistic test sets, methodology or disaggregation (§3.1, MEASURE 2.1, MEASURE 2.3).
- Silently dropping risks that are hard to measure instead of documenting them (MEASURE 1.1, MEASURE 3.2).
- Letting the developers who built the system be its only assessors (MEASURE 1.3).
- Recording "mitigate" for every risk; transfer, avoid and accept are valid documented responses (MANAGE 1.3), and residual risk still has to be documented (MANAGE 1.4).
- No tested way to deactivate the system or fall back to a non-AI process (MANAGE 2.1, MANAGE 2.4).
