# NIST AI 600-1 Generative AI Profile

Read this when the AI system is, or includes, generative AI (GAI): an LLM application, an image, audio or video generator, a RAG system, or a product embedding a third-party foundation model. Source: NIST AI 600-1 (July 2024), listed in [Sources](../SKILL.md#sources). Citations are AI 600-1 sections.

## What the profile is (§1, §3)

- A **cross-sectoral profile** of AI RMF 1.0 for GAI, and a companion resource to it (§1). For this document, GAI "generally refers to generative foundation models" (§1, note 1).
- It defines risks "novel to or exacerbated by the use of GAI" and suggested actions to govern, map, measure and manage them (§1).
- It covers risks with an existing empirical evidence base; "speculative risks that may potentially arise in more advanced, future GAI systems are not considered" (§2).
- The AI RMF 1.0 and Playbook actions "are already applicable for managing GAI risks"; the profile's actions come in addition (§3).
- Its suggested actions focus on four primary considerations from the GAI Public Working Group: Governance, Content Provenance, Pre-deployment Testing and Incident Disclosure (§1, Appendix A).
- "Future revisions of this profile will include additional AI RMF subcategories, risks, and suggested actions" (§1).

## The 12 GAI risks (§2)

Each risk is mapped to the AI RMF trustworthy characteristics it touches (§2.1 to §2.12).

| #   | Risk (§2)                                          | Definition, condensed                                                                                                                                                                     | Trustworthy characteristics                                                                                                            |
| --- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | CBRN Information or Capabilities (§2.1)            | Eased access to or synthesis of nefarious information or design capabilities for chemical, biological, radiological or nuclear weapons or other dangerous materials.                      | Safe; Explainable and Interpretable                                                                                                    |
| 2   | Confabulation (§2.2)                               | Confidently stated but erroneous or false content ("hallucinations" or "fabrications"), including confabulated logic or citations.                                                        | Fair with Harmful Bias Managed; Safe; Valid and Reliable; Explainable and Interpretable                                                |
| 3   | Dangerous, Violent, or Hateful Content (§2.3)      | Eased production of violent, inciting, radicalizing or threatening content, self-harm or illegal-activity recommendations, and hateful or stereotyping content; includes jailbreaking.    | Safe; Secure and Resilient                                                                                                             |
| 4   | Data Privacy (§2.4)                                | Leakage, unauthorized use, disclosure or de-anonymization of PII or sensitive data, including memorization and inference.                                                                 | Accountable and Transparent; Privacy Enhanced; Safe; Secure and Resilient                                                              |
| 5   | Environmental Impacts (§2.5)                       | High compute use in training or operating GAI and related ecosystem impacts.                                                                                                              | Accountable and Transparent; Safe                                                                                                      |
| 6   | Harmful Bias or Homogenization (§2.6)              | Amplified historical, societal and systemic biases; performance disparities across sub-groups or languages; undesired homogeneity, including model collapse.                              | Fair with Harmful Bias Managed; Valid and Reliable                                                                                     |
| 7   | Human-AI Configuration (§2.7)                      | Anthropomorphizing, algorithmic aversion, automation bias, over-reliance or emotional entanglement.                                                                                       | Accountable and Transparent; Explainable and Interpretable; Fair with Harmful Bias Managed; Privacy Enhanced; Safe; Valid and Reliable |
| 8   | Information Integrity (§2.8)                       | Lowered barrier to producing content that does not distinguish fact from opinion or fiction, or that supports large-scale mis- and disinformation, including deepfakes.                   | Accountable and Transparent; Safe; Valid and Reliable; Interpretable and Explainable                                                   |
| 9   | Information Security (§2.9)                        | Lowered barriers for offensive cyber capabilities, and a larger attack surface: prompt injection (direct and indirect), data poisoning, threats to model weights, code and training data. | Privacy Enhanced; Safe; Secure and Resilient; Valid and Reliable                                                                       |
| 10  | Intellectual Property (§2.10)                      | Eased production or replication of copyrighted, trademarked or licensed content without authorization; exposure of trade secrets; plagiarism.                                             | Accountable and Transparent; Fair with Harmful Bias Managed; Privacy Enhanced                                                          |
| 11  | Obscene, Degrading, and/or Abusive Content (§2.11) | Eased production of obscene, degrading or abusive imagery, including synthetic CSAM and NCII.                                                                                             | Fair with Harmful Bias Managed; Safe; Privacy Enhanced                                                                                 |
| 12  | Value Chain and Component Integration (§2.12)      | Non-transparent or untraceable integration of third-party components (datasets, pre-trained models, libraries), improper supplier vetting.                                                | All seven characteristics                                                                                                              |

Risks vary by lifecycle stage, scope (model, application or ecosystem), source (model, inputs, outputs or human behavior) and time scale (§2). Footnote 5 offers one optional grouping: technical or model risks, misuse by humans, and ecosystem or societal risks.

## Suggested action tables (§3)

- **Action ID**: `<function tag>-<subcategory>-<NNN>`, with GV = Govern, MP = Map, MS = Measure, MG = Manage. "GV-1.1-001 corresponds to the first suggested action for Govern 1.1" (§3). Each row also tags the GAI risks it addresses, and each table lists the AI Actor Tasks it concerns.
- "Not every subcategory of the AI RMF is included" and "Not every suggested action applies to every AI Actor" (§3). Applicability is an organizational decision.
- The tables cover 49 of the 72 AI RMF subcategories, with 213 actions:

| Function | Subcategories with actions (count of actions)                                                                                                      |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| GOVERN   | 1.1 (2), 1.2 (2), 1.3 (7), 1.4 (2), 1.5 (3), 1.6 (3), 1.7 (2), 2.1 (5), 3.2 (5), 4.1 (3), 4.2 (3), 4.3 (3), 5.1 (2), 6.1 (10), 6.2 (7)             |
| MAP      | 1.1 (4), 1.2 (2), 2.1 (2), 2.2 (2), 2.3 (5), 3.4 (6), 4.1 (10), 5.1 (6), 5.2 (2)                                                                   |
| MEASURE  | 1.1 (9), 1.3 (3), 2.2 (4), 2.3 (4), 2.5 (6), 2.6 (7), 2.7 (9), 2.8 (4), 2.9 (2), 2.10 (3), 2.11 (5), 2.12 (4), 2.13 (1), 3.2 (1), 3.3 (5), 4.2 (5) |
| MANAGE   | 1.3 (2), 2.2 (9), 2.3 (1), 2.4 (4), 3.1 (5), 3.2 (9), 4.1 (7), 4.2 (3), 4.3 (3)                                                                    |

For the other 23 subcategories, the profile has no GAI-specific actions; apply the AI RMF and Playbook actions. The first GOVERN 4.3 action is printed as "GV4.3--001" in the PDF; cite it as GV-4.3-001.

### Actions by theme, as published (examples)

Quote actions with their ID; do not reword them into obligations.

- **Risk tiers and go/no-go.** GV-1.3-001 lists factors for GAI risk tiers (information integrity, dependencies, harm to fundamental rights or public safety, obscene or untruthful output, psychological impacts, malicious use, new security vulnerabilities, disparate impact, unreliable decision making). GV-1.3-002 "Establish minimum thresholds for performance or assurance criteria and review as part of deployment approval ("go/"no-go") policies". GV-1.3-007 "Devise a plan to halt development or deployment of a GAI system that poses unacceptable negative risk."
- **Acceptable use.** GV-1.4-001 "Establish policies and mechanisms to prevent GAI systems from generating CSAM, NCII or content that violates the law." GV-1.4-002 transparent acceptable use policies. GV-3.2-003 acceptable use policies for interfaces, modalities and human-AI configurations, "including criteria for the kinds of queries GAI applications should refuse to respond to".
- **Inventory.** GV-1.6-001 adds GAI systems to the AI inventory. GV-1.6-003 inventory entries consider data provenance, known issues (for example from an AI incident database, AVID, CVE, NVD or the OECD AI incident monitor), human oversight roles, IP and sensitive-data considerations, and "Underlying foundation models, versions of underlying models, and access modes".
- **Third parties.** GV-6.1-004 contracts and SLAs on content ownership, usage rights, quality, security and provenance. GV-6.1-009 updates procurement due diligence for GAI, including embedded GAI and checks against incident or vulnerability databases. GV-6.2-003 incident response plans for third-party GAI. MG-3.1-003 "Re-assess model risks after fine-tuning or retrieval-augmented generation implementation". MG-3.1-005 review system cards and model cards of third-party models.
- **Testing and red-teaming.** MP-2.3-005 regular adversarial testing. MS-1.3-003 "Verify those conducting structured human feedback exercises are not directly involved in system development tasks for the same GAI model." MS-2.5-001 "Avoid extrapolating GAI system performance or capabilities from narrow, non-systematic, and anecdotal assessments." MS-2.7-007 red-team for abuse against other systems, GAI attacks such as prompt injection, and ML attacks such as data poisoning, membership inference and model extraction. MS-2.7-008 "Verify fine-tuning does not compromise safety and security controls."
- **Confabulation.** MS-2.5-003 "Review and verify sources and citations in GAI system outputs during pre-deployment risk measurement and ongoing monitoring activities." MP-2.3-003 fact-checking techniques. MG-4.1-002 post-deployment monitoring for confabulation, CBRN or cyber risks.
- **Content provenance.** MS-1.1-001 trace origin and modifications of digital content. MS-2.7-005 measure reliability of watermarking, cryptographic signatures and fingerprints, including false positive and negative rates. MS-2.8-003 tamper-evident history of generated, modified or shared content.
- **Disclosure and human-AI configuration.** MP-5.1-003 consider disclosing GAI use to end users in context. MS-2.5-004 track anthropomorphization in interfaces. MG-3.2-008 human moderation where models perform poorly.
- **Output controls.** MG-3.2-005 content filters for inappropriate, harmful, false, illegal or violent content, including CSAM and NCII, rule-based or model-based.
- **Incidents.** GV-4.3-002 minimum incident report fields (System ID, Title, Reporter, System/Source, Data Reported, Date of Incident, Description, Impact(s), Stakeholder(s) Impacted). MG-4.3-002 track errors, near-misses and negative impacts. MG-4.3-003 report incidents as legal and regulatory requirements demand.
- **Environment.** MS-2.12-003 measure or estimate energy and water use for training, fine-tuning and deployment.

## Primary considerations (Appendix A)

- **Governance (A.1.1 to A.1.3).** Organizations may apply existing risk tiering or update it for GAI. Third-party controls include procurement due diligence, SBOM requests, SLAs and SSAE reports.
- **Pre-deployment testing (A.1.4).** Current approaches may be inadequate or mismatched to deployment. Anecdotal tests or tests designed for humans (such as licensing exams) do not guarantee validity or reliability, and jailbreaking or prompt engineering tests "may not systematically assess validity or reliability risks".
- **Structured public feedback (A.1.5).** Participatory engagement, field testing and AI red-teaming, following human subjects requirements such as informed consent and compensation. Red-teaming types: general public, expert, combination, and human / AI. Results get further analysis before they drive governance decisions.
- **Content provenance (A.1.6, A.1.7).** Provenance data tracking (metadata recording, overt and covert watermarks, fingerprinting, human authentication) and synthetic content detection; track training-data provenance and document provenance limitations.
- **Incident disclosure (A.1.8).** Defines an AI incident by its harms (health, critical infrastructure, rights or legal obligations, property, communities, environment); formal reporting channels do not yet exist; log, record and analyze GAI incidents, including third-party plugin inputs.

## Common mistakes

- Using the profile instead of the AI RMF rather than alongside it (§3).
- Treating the 12 risks as exhaustive or the action list as a checklist (§1, §3).
- Inventing action IDs for subcategories the profile does not cover.
- Testing a foundation model once and not re-assessing after fine-tuning, RAG or a new domain (MP-4.1-007, MP-4.1-008, MG-3.1-003).
