# Essential cybersecurity requirements: risk assessment, Annex I Part I and Annex II

Sources: Regulation (EU) 2024/2847 (Arts. 6, 13, 27; Annex I Part I; Annex II), the Commission guidance C(2026) 5252 (sections 2.7, 7 and 9.2.2) and the Commission FAQs version 1.4 (entries 4.1 to 4.4). Guidance and FAQs are non-binding; harmonised standards, once their references are published in the Official Journal, give a presumption of conformity (Art. 27(1)). Not legal advice.

These requirements apply to products placed on the market from 11 December 2027 (Art. 71(2)); products placed earlier are covered only if substantially modified from that date (Art. 69(2)).

## The cybersecurity risk assessment (Art. 13(2) to (4))

- Assess the cybersecurity risks and take the outcome into account in planning, design, development, production, delivery and maintenance, to minimise risks, prevent incidents and minimise their impact, including on users' health and safety (Art. 13(2)).
- Analyse risks from the intended purpose, reasonably foreseeable use and conditions of use (such as the operational environment and the assets to protect), taking into account how long the product is expected to be in use (Art. 13(3)).
- For each Annex I Part I point (2) requirement, say whether and how it applies and how it is implemented; also say how Part I point (1) and Part II are applied (Art. 13(3)).
- Document it, update it as appropriate during the support period, include it in the technical documentation, and give a clear justification for every requirement that does not apply (Art. 13(3), (4); Annex VII point 3).
- The CRA mandates no methodology; the threat model should fit the intended purpose, so critical infrastructure products may need to treat nation-state threats where consumer products may not (FAQ 4.1.2). Part II applies in full for the support period; Part I points apply as the risk assessment determines (FAQ 4.1.3).
- Products designed before the CRA applies but placed on the market afterwards may rely on existing measures where a current risk assessment shows they are adequate (guidance points 33 to 36).

## Annex I Part I mapped to engineering work

Point (1): design, develop and produce the product to ensure an appropriate level of cybersecurity based on the risks. Point (2), on the basis of the risk assessment and where applicable:

| Point | Requirement                                                                                                                                                                                                                                                                                      | Engineering artefact                                                                                                                     |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| (a)   | Made available without known exploitable vulnerabilities.                                                                                                                                                                                                                                        | Pre-release vulnerability scan of code and components against public databases; release gate; documented risk decision for late findings |
| (b)   | Secure by default configuration, unless otherwise agreed with a business user for a tailor-made product, with the possibility to reset to the original state.                                                                                                                                    | Hardened default configuration; factory reset; documented tailor-made agreements                                                         |
| (c)   | Vulnerabilities can be addressed through security updates, including, where applicable, automatic security updates installed within an appropriate timeframe, enabled by default, with a clear and easy opt-out, notification of available updates, and the option to postpone them temporarily. | Update client with auto-update on by default, opt-out, postpone and notification                                                         |
| (d)   | Protection from unauthorised access by appropriate control mechanisms, including authentication, identity or access management, and reporting on possible unauthorised access.                                                                                                                   | Authentication and authorisation design; no shared default credentials; access-failure events                                            |
| (e)   | Confidentiality of stored, transmitted or processed data, for example by state-of-the-art encryption at rest and in transit.                                                                                                                                                                     | Encryption in transit and at rest; key management                                                                                        |
| (f)   | Integrity of stored, transmitted or processed data, commands, programs and configuration against unauthorised manipulation, and reporting on corruptions.                                                                                                                                        | Signed firmware and updates; integrity checks; tamper and corruption events                                                              |
| (g)   | Process only data that is adequate, relevant and limited to what is necessary for the intended purpose (data minimisation).                                                                                                                                                                      | Data inventory per feature; collection limits                                                                                            |
| (h)   | Protect the availability of essential and basic functions, also after an incident, including resilience and mitigation against denial-of-service attacks.                                                                                                                                        | Rate limiting; graceful degradation; recovery tests                                                                                      |
| (i)   | Minimise the negative impact of the product or connected devices on the availability of services provided by other devices or networks.                                                                                                                                                          | Back-off and retry limits; bounded outbound traffic                                                                                      |
| (j)   | Limit attack surfaces, including external interfaces.                                                                                                                                                                                                                                            | Interface inventory; disabled unused ports, services and debug interfaces                                                                |
| (k)   | Reduce the impact of an incident using appropriate exploitation mitigation mechanisms and techniques.                                                                                                                                                                                            | Memory-safety measures, sandboxing, least privilege, compiler and OS hardening                                                           |
| (l)   | Provide security-related information by recording and monitoring relevant internal activity, including access to or modification of data, services or functions, with an opt-out for the user.                                                                                                   | Security event log with user opt-out                                                                                                     |
| (m)   | Let users securely and easily remove all data and settings permanently and, where data can be transferred to other products or systems, transfer it securely.                                                                                                                                    | Secure wipe; secure export                                                                                                               |

Interpretation notes from the Commission:

- **Known exploitable vulnerabilities.** A vulnerability is known when it is listed in publicly accessible vulnerability databases such as the European vulnerability database, when the manufacturer learns of it through non-public information (coordinated disclosure, internal testing), or when it is prominently reported in reliable media; the manufacturer still investigates whether it is exploitable in its product (guidance points 233 to 235). Exploitable means usable by an adversary under practical operational conditions (Art. 3(41)). Whether a late-found vulnerability blocks release is a risk-based decision weighing severity, exploitability and impact (guidance point 237).
- **Secure by default for components.** A component manufacturer is responsible for the configuration the component is delivered with, not for how an integrator later configures it; for example a cryptographic library with deprecated algorithms disabled by default (FAQ 4.2.4).
- **Tailor-made.** Only points Part I (2)(b) and Part II (8) may be varied, for a product fitted to a particular purpose for a particular business user under explicitly agreed terms; minor customisation of a product sold to many customers is not tailor-made (FAQ 4.2.5).
- **Automatic updates** are not required for products primarily intended to be integrated as components, or for products whose users would not reasonably expect them, such as in professional ICT networks and industrial environments; users must still be informed and updates made available without delay (recital 56, quoted in FAQ 4.3.3).

## Components and due diligence (Art. 13(5), (6))

- Exercise due diligence when integrating third-party components so they do not compromise the product, including free and open-source components not placed on the market (Art. 13(5)).
- The level depends on the component's risk (FAQ 4.4.2). Actions the FAQ lists include checking for a CE marking, checking the security update history, checking the European vulnerability database or other public databases, extra security testing, software composition analysis, isolating critical components, reviewing the component's SBOM, checking its support period, and assessing its manufacturer's security posture.
- A CE marking on components is not required; components not placed on the market may be integrated with due diligence (FAQ 4.4.3, 4.4.4).
- When a vulnerability is found in a component, report it to whoever manufactures or maintains it and share any fix (Art. 13(6)); see [`vulnerability-handling-and-reporting.md`](vulnerability-handling-and-reporting.md#upstream-reporting).

## User information and labelling

On the product, its packaging or an accompanying document (Art. 13(15), (16)): a type, batch or serial number or other identifier; the manufacturer's name or trademark, postal address, email or other digital contact and website.

Annex II requires at minimum:

1. Manufacturer name and contact details.
2. The single point of contact for reporting and receiving vulnerability information, and where the coordinated vulnerability disclosure policy is.
3. Name, type and information that uniquely identifies the product.
4. Intended purpose, the security environment provided, essential functionalities and security properties.
5. Known or foreseeable circumstances, in intended use or reasonably foreseeable misuse, that may lead to significant cybersecurity risks.
6. Where applicable, the internet address of the EU declaration of conformity.
7. The type of technical security support offered and the end date of the support period.
8. Detailed instructions, or an address for them, on: (a) secure commissioning and use over the lifetime; (b) how changes can affect data security; (c) how to install security updates; (d) secure decommissioning and removal of user data; (e) how to turn off automatic security updates; (f) for products intended for integration, what the integrator needs to meet Annex I and Annex VII.
9. Where the manufacturer chooses to make the SBOM available to users, where to get it.

The information is in a language users and market surveillance authorities easily understand, clear and legible, and kept available (online, if provided online) for at least 10 years after placing on the market or the support period, whichever is longer (Art. 13(18)). The support period end date, at least month and year, is specified at the time of purchase (Art. 13(19)). Provide the EU declaration of conformity or a simplified one with its full-text URL (Art. 13(20)).

## Presumption of conformity (Art. 27)

- Conformity with harmonised standards whose references are published in the Official Journal gives a presumption of conformity with the Annex I requirements they cover (Art. 27(1)); so do common specifications adopted by implementing act (Art. 27(5)) and an EU statement of conformity or certificate under a European cybersecurity certification scheme, to the extent it covers them (Art. 27(8)).
- The Commission adopted standardisation request M/606 for 41 horizontal and product-specific standards, prioritising the Annex III and IV categories (Commission standardisation page). This skill did not find references of CRA harmonised standards published in the Official Journal; check before relying on a presumption.

## Common mistakes

- Treating Annex I Part I as a checklist to tick in full rather than applying each point on the basis of the risk assessment, with justifications for those that do not apply (Art. 13(3), (4)).
- Shipping a release with a known exploitable vulnerability without a documented risk decision (Annex I Part I(2)(a); guidance point 237).
- Bundling security fixes into feature releases when separating them is technically feasible (Annex I Part II(2); FAQ 4.3.5).
- Omitting the support period end date from the point of sale (Art. 13(19)).
