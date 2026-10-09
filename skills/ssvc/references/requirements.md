# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. SSVC is a decision model and has no MUST or SHALL keywords, so each decision point is given by its definition and the definitions of its values, quoted as written. Apply the ones that match the role. Each is labelled with its decision point or outcome group name.

## Exploitation 1.1.0

Source: https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/ssvc/exploitation_1_1_0.json

- **Exploitation.** The present state of exploitation of the vulnerability.
- **Exploitation.** There is no evidence of active exploitation and no public proof of concept (PoC) of how to exploit the vulnerability.
- **Exploitation.** One of the following is true: (1) Typical public PoC exists in sources such as Metasploit or websites like ExploitDB; or (2) the vulnerability has a well-known method of exploitation.
- **Exploitation.** Shared, observable, reliable evidence that the exploit is being used in the wild by real attackers; there is credible public reporting.

## Automatable 2.0.0

Source: https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/ssvc/automatable_2_0_0.json

- **Automatable.** Can an attacker reliably automate creating exploitation events for this vulnerability?
- **Automatable.** Attackers cannot reliably automate steps 1-4 of the kill chain for this vulnerability. These steps are (1) reconnaissance, (2) weaponization, (3) delivery, and (4) exploitation.

## Technical Impact 1.0.0

Source: https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/ssvc/technical_impact_1_0_0.json

- **Technical Impact.** The exploit gives the adversary limited control over, or information exposure about, the behavior of the software that contains the vulnerability. Or the exploit gives the adversary an importantly low stochastic opportunity for total control.
- **Technical Impact.** The exploit gives the adversary total control over the behavior of the software, or it gives total disclosure of all information on the system that contains the vulnerability.

## System Exposure 1.0.1

Source: https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/ssvc/system_exposure_1_0_1.json

- **System Exposure.** The Accessible Attack Surface of the Affected System or Service
- **System Exposure.** Internet or another widely accessible network where access cannot plausibly be restricted or controlled (e.g., DNS servers, web servers, VOIP servers, email servers)
- **System Exposure.** A successful mitigation must reliably interrupt the adversary’s attack, which requires the attack is detectable both reliably and quickly enough to respond.

## Mission Impact 2.0.0

Source: https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/ssvc/mission_impact_2_0_0.json

- **Mission Impact.** Impact on Mission Essential Functions of the Organization
- **Mission Impact.** Multiple or all mission essential functions fail; ability to recover those functions degraded; organization’s ability to deliver its overall mission fails

## Human Impact 2.0.2

Source: https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/ssvc/human_impact_2_0_2.json

- **Human Impact.** Human Impact is a combination of Safety and Mission impacts.

## Value Density 1.0.0

Source: https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/ssvc/value_density_1_0_0.json

- **Value Density.** The system that contains the vulnerable component is rich in resources. Heuristically, such systems are often the direct responsibility of “system operators” rather than users.

## CISA Levels 1.1.0

Source: https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/cisa/cisa_levels_1_1_0.json

- **CISA Levels.** CISA uses its own SSVC decision tree model to prioritize relevant vulnerabilities into four possible decisions: Track, Track*, Attend, and Act.
- **CISA Levels.** CISA recommends remediating Act vulnerabilities as soon as possible.

## Deployer decision outcomes

Source: https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/docs/howto/deployer_tree.md

- **Defer.** Do not act at present.
- **Scheduled.** Act during regularly scheduled maintenance time.
- **Out-of-Cycle.** Act more quickly than usual to apply the mitigation or remediation out-of-cycle, during the next available opportunity, working overtime if necessary.
- **Immediate.** Act immediately; focus all resources on applying the fix as quickly as possible, including, if necessary, pausing regular organization operations.
- **Deployer.** When remediation is not yet available, the action space is more diverse, but it should involve mitigating the vulnerability (e.g., shutting down services or applying additional security controls) or accepting the risk of not mitigating the vulnerability.
