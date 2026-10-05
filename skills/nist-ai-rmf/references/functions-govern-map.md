# Framing, GOVERN and MAP

Read this when setting up the organization-wide part of an AI risk program (GOVERN) or establishing the context of one AI system (MAP). Sources: NIST AI 100-1 (AI RMF 1.0) Part 1 and §5.1 to §5.2 with Tables 1 and 2, and the AI RMF Playbook, listed in [Sources](../SKILL.md#sources). Section numbers are AI 100-1 sections unless marked "Playbook".

## Framing risk (Part 1)

- **Risk** is "the composite measure of an event's probability of occurring and the magnitude or degree of the consequences of the corresponding event". Impacts can be positive, negative or both (§1.1).
- **AI system**: "an engineered or machine-based system that can, for a given set of objectives, generate outputs such as predictions, recommendations, or decisions influencing real or virtual environments" (Executive Summary).
- **Measurement limits** (§1.2.1): third-party software, hardware and data; emergent risks; lack of reliable metrics; risk differing by lifecycle stage; lab versus real-world results; inscrutability; and the need for a human baseline. "The inability to appropriately measure AI risks does not imply that an AI system necessarily poses either a high or low risk."
- **Risk tolerance** (§1.2.2): the AI RMF "does not prescribe risk tolerance". Follow existing regulations and guidelines for risk criteria, tolerance and response; where none exist, "organizations should define reasonable risk tolerance".
- **Prioritization** (§1.2.3): eliminating all negative risk can be counterproductive. Highest risks get the most urgent and thorough treatment. Where risk is unacceptable ("significant negative impacts are imminent, severe harms are actually occurring, or catastrophic risks are present"), "development and deployment should cease in a safe manner until risks can be sufficiently managed". Systems trained on sensitive data or whose outputs affect humans may need higher initial priority. Residual risk is documented so end users learn of potential negative impacts.
- **Integration** (§1.2.4): treat AI risk inside enterprise risk management, alongside cybersecurity and privacy. Use of the AI RMF alone will not create accountability or incentives; that needs senior-level commitment.
- **Audience** (§2, Appendix A): AI actors across the lifecycle stages of Figure 3 (AI design, AI development, AI deployment, operation and monitoring, TEVV, human factors, domain expert, AI impact assessment, procurement, governance and oversight), plus third-party entities, end users, affected individuals and communities, other AI actors and the general public. Verification and validation actors are ideally distinct from test and evaluation actors (Appendix A).

## How the Core is used (§5)

- The Core has four functions, each split into categories and subcategories. "Actions do not constitute a checklist, nor are they necessarily an ordered set of steps."
- GOVERN is cross-cutting. "After instituting the outcomes in GOVERN, most users of the AI RMF would start with the MAP function and continue to MEASURE or MANAGE." The process is iterative.
- Users may select from the categories and subcategories or apply all of them.
- The Playbook gives, for each of the 72 subcategories, an About text, Suggested Actions, Transparency & Documentation questions, AI Transparency Resources and References. It "is neither a checklist nor set of steps to be followed in its entirety" (Playbook, Forward).

## GOVERN (§5.1, Table 1)

GOVERN cultivates a risk culture, sets policies and accountability, addresses third-party and supply-chain issues, and is "a continual and intrinsic requirement" (§5.1).

| Id         | Outcome (Table 1)                                                                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GOVERN 1   | Policies, processes, procedures and practices for mapping, measuring and managing AI risks are in place, transparent and implemented effectively.                   |
| GOVERN 1.1 | Legal and regulatory requirements involving AI are understood, managed and documented.                                                                              |
| GOVERN 1.2 | The characteristics of trustworthy AI are integrated into organizational policies, processes, procedures and practices.                                             |
| GOVERN 1.3 | Processes, procedures and practices are in place to determine the needed level of risk management activities based on the organization's risk tolerance.            |
| GOVERN 1.4 | The risk management process and its outcomes are established through transparent policies, procedures and other controls based on organizational risk priorities.   |
| GOVERN 1.5 | Ongoing monitoring and periodic review of the risk management process are planned, roles and responsibilities defined, including the review frequency.              |
| GOVERN 1.6 | Mechanisms are in place to inventory AI systems and are resourced according to organizational risk priorities.                                                      |
| GOVERN 1.7 | Processes and procedures are in place for decommissioning and phasing out AI systems safely.                                                                        |
| GOVERN 2   | Accountability structures are in place so teams and individuals are empowered, responsible and trained.                                                             |
| GOVERN 2.1 | Roles, responsibilities and lines of communication for mapping, measuring and managing AI risks are documented and clear.                                           |
| GOVERN 2.2 | Personnel and partners receive AI risk management training.                                                                                                         |
| GOVERN 2.3 | Executive leadership takes responsibility for decisions about risks of AI system development and deployment.                                                        |
| GOVERN 3   | Workforce diversity, equity, inclusion and accessibility processes are prioritized in mapping, measuring and managing AI risks.                                     |
| GOVERN 3.1 | Decision-making is informed by a diverse team (demographics, disciplines, experience, expertise, backgrounds).                                                      |
| GOVERN 3.2 | Policies and procedures define and differentiate roles and responsibilities for human-AI configurations and oversight of AI systems.                                |
| GOVERN 4   | Teams are committed to a culture that considers and communicates AI risk.                                                                                           |
| GOVERN 4.1 | Policies and practices foster a critical thinking and safety-first mindset.                                                                                         |
| GOVERN 4.2 | Teams document the risks and potential impacts of the AI technology they design, develop, deploy, evaluate and use, and communicate about the impacts more broadly. |
| GOVERN 4.3 | Practices are in place to enable AI testing, identification of incidents and information sharing.                                                                   |
| GOVERN 5   | Processes are in place for robust engagement with relevant AI actors.                                                                                               |
| GOVERN 5.1 | Policies and practices collect, consider, prioritize and integrate feedback from those external to the team about individual and societal impacts.                  |
| GOVERN 5.2 | Mechanisms let the team regularly incorporate adjudicated feedback from relevant AI actors into system design and implementation.                                   |
| GOVERN 6   | Policies and procedures address AI risks and benefits from third-party software and data and other supply chain issues.                                             |
| GOVERN 6.1 | Policies and procedures address third-party risks, including infringement of a third party's intellectual property or other rights.                                 |
| GOVERN 6.2 | Contingency processes handle failures or incidents in third-party data or AI systems deemed high-risk.                                                              |

### Playbook suggested actions, as published (examples)

Quote these as suggestions, never as requirements. Load the Playbook for the full set.

- GOVERN 1.1: "Maintain awareness of the applicable legal and regulatory considerations and requirements specific to industry, sector, and business purpose, as well as the application context of the deployed AI system"; "Align risk management efforts with applicable legal standards"; maintain training policies on legal or regulatory considerations.
- GOVERN 1.6: establish policies that define the creation and maintenance of AI system inventories, who maintains them, which models or systems are inventoried ("with preference to inventorying all models or systems, or minimally, to high risk models or systems"), and which attributes are recorded (for example documentation, links to source code, incident response plans, data dictionaries, AI actor contact information).
- GOVERN 2.3: organizational management can declare risk tolerances, support risk management, and delegate power, resources and authorization; organizations can establish board committees for AI risk management.
- GOVERN 4.3: establish policies for AI system testing, reporting and documenting incident response, public disclosure of incidents and information sharing, and incident handling guidelines.
- GOVERN 6.1: establish policies on transparency into third-party system functions (training data, algorithms, assumptions and limitations), thorough testing of third-party AI systems, clear usage instructions, and supply-chain and procurement issues.

## MAP (§5.2, Table 2)

MAP establishes context. Its outcomes "are the basis for the MEASURE and MANAGE functions", and after MAP users "should have sufficient contextual knowledge about AI system impacts to inform an initial go/no-go decision" (§5.2).

| Id      | Outcome (Table 2)                                                                                                                                                                                                                                                                             |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MAP 1   | Context is established and understood.                                                                                                                                                                                                                                                        |
| MAP 1.1 | Intended purposes, potentially beneficial uses, context-specific laws, norms and expectations, and prospective deployment settings are understood and documented (users and their expectations, positive and negative impacts, assumptions and limitations, related TEVV and system metrics). |
| MAP 1.2 | Interdisciplinary AI actors, competencies and capacities for establishing context reflect demographic diversity and broad domain and user experience expertise; their participation is documented.                                                                                            |
| MAP 1.3 | The organization's mission and relevant goals for AI technology are understood and documented.                                                                                                                                                                                                |
| MAP 1.4 | The business value or context of business use is clearly defined or, for existing systems, re-evaluated.                                                                                                                                                                                      |
| MAP 1.5 | Organizational risk tolerances are determined and documented.                                                                                                                                                                                                                                 |
| MAP 1.6 | System requirements are elicited from and understood by relevant AI actors; design decisions take socio-technical implications into account.                                                                                                                                                  |
| MAP 2   | Categorization of the AI system is performed.                                                                                                                                                                                                                                                 |
| MAP 2.1 | The specific tasks and methods are defined (for example classifiers, generative models, recommenders).                                                                                                                                                                                        |
| MAP 2.2 | The system's knowledge limits and how output may be used and overseen by humans are documented.                                                                                                                                                                                               |
| MAP 2.3 | Scientific integrity and TEVV considerations are identified and documented (experimental design, data collection and selection, trustworthiness, construct validation).                                                                                                                       |
| MAP 3   | Capabilities, targeted usage, goals, and expected benefits and costs compared with benchmarks are understood.                                                                                                                                                                                 |
| MAP 3.1 | Potential benefits of intended functionality and performance are examined and documented.                                                                                                                                                                                                     |
| MAP 3.2 | Potential costs, including non-monetary costs from expected or realized AI errors, are examined and documented, connected to risk tolerance.                                                                                                                                                  |
| MAP 3.3 | Targeted application scope is specified and documented.                                                                                                                                                                                                                                       |
| MAP 3.4 | Processes for operator and practitioner proficiency, and relevant technical standards and certifications, are defined, assessed and documented.                                                                                                                                               |
| MAP 3.5 | Processes for human oversight are defined, assessed and documented in accordance with GOVERN policies.                                                                                                                                                                                        |
| MAP 4   | Risks and benefits are mapped for all components, including third-party software and data.                                                                                                                                                                                                    |
| MAP 4.1 | Approaches for mapping technology and legal risks of components, including third-party data or software and intellectual property infringement, are in place, followed and documented.                                                                                                        |
| MAP 4.2 | Internal risk controls for components, including third-party AI technologies, are identified and documented.                                                                                                                                                                                  |
| MAP 5   | Impacts to individuals, groups, communities, organizations and society are characterized.                                                                                                                                                                                                     |
| MAP 5.1 | Likelihood and magnitude of each identified impact (beneficial and harmful) are identified and documented, based on expected use, past uses in similar contexts, public incident reports, external feedback or other data.                                                                    |
| MAP 5.2 | Practices and personnel for regular engagement with relevant AI actors and integrating feedback about positive, negative and unanticipated impacts are in place and documented.                                                                                                               |

### Playbook suggested actions, as published (examples)

- MAP 1.5: "Establish risk tolerance levels for AI systems and allocate the appropriate oversight resources to each level"; establish risk criteria across sources of risk (financial, operational, safety and wellbeing, business, reputational, model) and levels (negligible to critical); "Identify maximum allowable risk tolerance above which the system will not be deployed, or will need to be prematurely decommissioned"; document trade-offs across trustworthiness characteristics; review "off-label" uses.
- MAP 3.5: identify features that require human oversight; establish oversight practices per GOVERN 1 policies; train AI actors on performance, context, limitations and warning labels; test oversight practices for validity and reliability.

## Common mistakes

- Starting with MAP or MEASURE before GOVERN outcomes such as risk tolerance and roles exist (§5).
- Treating every subcategory or every Playbook action as mandatory, or treating the list as an ordered procedure (§5; Playbook, Forward).
- Writing a risk tolerance into the profile as if NIST set it; the organization sets it (§1.2.2, MAP 1.5).
- Skipping the go/no-go decision after MAP, or not revisiting MAP when context changes (§5.2).
- Mapping only the in-house model and ignoring third-party data, pre-trained models and libraries (MAP 4, GOVERN 6).
