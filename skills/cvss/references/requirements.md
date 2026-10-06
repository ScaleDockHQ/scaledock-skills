# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## CVSS 4.0

Source: https://www.first.org/cvss/v4.0/specification-document

Building a CTI program and team Program maturity stages CTI Maturity model - Stage 1

- **Introduction.** Consumers of CVSS should enrich the Base metrics with Threat and Environmental metric values specific to their use of the vulnerable system to produce a score that provides a more comprehensive input to risk assessment specific to their organization.
- **Assessment.** This vector string is a specifically formatted text string that contains each value assigned to each metric, and should be displayed with the vulnerability score.
- **Assessment.** Note that all metrics should be assessed under the assumption that the attacker has perfect knowledge of the vulnerability.
- **Nomenclature.** Therefore, numerical CVSS scores should be labeled using nomenclature that communicates the metrics used in its generation.
- **Nomenclature.** CVSS Nomenclature CVSS Metrics Used CVSS-B Base metrics CVSS-BE Base and Environmental metrics CVSS-BT Base and Threat metrics CVSS-BTE Base, Threat, Environmental metrics Additional Notes: This nomenclature should be used wherever a numerical CVSS value is displayed or communicated.
- **Exploitability Metrics.** Therefore, each of the Exploitability metrics listed below should be assessed relative to the vulnerable system, and reflect the properties of the vulnerability that lead to a successful attack.
- **Exploitability Metrics.** When assessing Base metrics, it should be assumed that the attacker has advanced knowledge of the target system, including general configuration and default defense mechanisms (e.g., built-in firewalls, rate limits, traffic policing).
- **Exploitability Metrics.** For example, exploiting a vulnerability that results in repeatable, deterministic success should still be considered a Low value for Attack Complexity, independent of the attacker's knowledge or capabilities.

## CVSS 3.1

Source: https://www.first.org/cvss/v3.1/specification-document

Building a CTI program and team Program maturity stages CTI Maturity model - Stage 1

- **1. Introduction.** Consumers of CVSS should supplement the Base Score with Temporal and Environmental Scores specific to their use of the vulnerable product to produce a severity more accurate for their organizational environment.
- **1.2. Scoring.** This vector string is a specifically formatted text string that contains each value assigned to each metric, and should always be displayed with the vulnerability score.
- **1.2. Scoring.** Note that all metrics should be scored under the assumption that the attacker has already located and identified the vulnerability.
- **2.1. Exploitability Metrics.** Therefore, each of the Exploitability metrics listed below should be scored relative to the vulnerable component, and reflect the properties of the vulnerability that lead to a successful attack.
- **2.1. Exploitability Metrics.** When scoring Base metrics, it should be assumed that the attacker has advanced knowledge of the weaknesses of the target system, including general configuration and default defense mechanisms (e.g., built-in firewalls, rate limits, traffic policing).
- **2.1. Exploitability Metrics.** For example, exploiting a vulnerability that results in repeatable, deterministic success should still be considered a Low value for Attack Complexity, independent of the attacker's knowledge or capabilities.
- **2.1. Exploitability Metrics.** Furthermore, target-specific attack mitigation (e.g., custom firewall filters, access lists) should instead be reflected in the Environmental metric scoring group.
- **2.1. Exploitability Metrics.** Specific configurations should not impact any attribute contributing to the CVSS Base Score, i.e., if a specific configuration is required for an attack to succeed, the vulnerable component should be scored assuming it is in that configuration.

## CVSS 2.0

Source: https://www.first.org/cvss/v2/guide

Building a CTI program and team Program maturity stages CTI Maturity model - Stage 1

- **1. Introduction.** Currently, IT management must identify and assess vulnerabilities across many disparate hardware and software platforms.
- **1. Introduction.** This policy may be similar to a service level agreement (SLA) that states how quickly a particular vulnerability must be validated and remediated.
- **1.3. How does CVSS work?.** Therefore, the vector should always be displayed with the vulnerability score.
- **2.1.2. Access Complexity (AC).** For example: - In most configurations, the attacking party must already have elevated privileges or spoof additional systems in addition to the attacking system (e.g., DNS hijacking).
- **2.1.2. Access Complexity (AC).** For example, the victim must perform several suspicious or atypical actions.
- **2.1.2. Access Complexity (AC).** - Some information must be gathered before a successful attack can be launched.
- **2.1.3. Authentication (Au).** This metric measures the number of times an attacker must authenticate to a target in order to exploit a vulnerability.
- **2.1.3. Authentication (Au).** Table 3: Authentication Scoring Evaluation The metric should be applied based on the authentication the attacker requires before launching an attack.
