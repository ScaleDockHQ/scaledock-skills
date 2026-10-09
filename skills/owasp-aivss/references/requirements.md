# Requirements from the pinned text

These sentences were read from the pinned source on 2026-10-06. AIVSS v0.8 is a scoring method; its rules are given by the formulas, defaults and assessor instructions in Part 2, quoted as written. Each is labelled with its Part 2 section number.

## AIVSS v0.8, Part 2: The AIVSS-Agentic Scoring System

Source: https://raw.githubusercontent.com/OWASP/www-project-artificial-intelligence-vulnerability-scoring-system/84856b290f62f2327f70eb0027be64351dd2e6de/assets/publications/AIVSS%20Scoring%20System%20For%20OWASP%20Agentic%20AI%20Core%20Security%20Risks%20v0.8.pdf

- **Part 2 § 2.** To calculate the Agentic AI Risk Score (AARS) in Section 3, the system must be assessed against 10 specific factors.
- **Part 2 § 2.1.** Each factor is scored on a 3-point scale.
- **Part 2 § 2.2.** Execution Autonomy (Autonomy): The ability to execute actions without human verification.
- **Part 2 § 2.2.** Self-Modification (Self-Mod): The ability to alter its own code, prompts, or tool configurations.
- **Part 2 § 3.1.1.** AIVSS requires CVSS v4.0 as its baseline scoring input.
- **Part 2 § 3.1.1.** Practitioners should not use CVSS v3.1 scores as inputs to the AIVSS formula, as the metric structures are not directly comparable.
- **Part 2 § 3.1.1.** Practitioners should assess Subsequent System impact based on the full scope of systems the compromised agent can reach through its tool access, delegation chains, and inter-agent communication paths.
- **Part 2 § 3.2.** Practitioners should treat the final AIVSS ranking (not the CVSS ranking) as the primary input to remediation prioritization.
- **Part 2 § 3.2.** Do not average scores across findings.
- **Part 2 § 3.2.** Use the individual finding score and its severity band as the unit of analysis.
- **Part 2 § 3.3.1.** AARS = (10 - CVSS_Base) * (Factor_Sum / 10) * ThM
- **Part 2 § 3.3.2.** Default Value: Use 0.97 (Proof-of-Concept).
- **Part 2 § 3.4.** AIVSS = (CVSS_Base + AARS) * Mitigation_Factor
- **Part 2 § 3.4.0.** Report the final score: AIVSS = RoundHalfUp(AIVSS_raw, 1) (nearest tenth)
- **Part 2 § 3.4.1.** Mitigation_Factor is a normalized scaling factor (ranging from 0.67 to 1.0) that adjusts the score based on mitigation strength.
- **Part 2 § 3.4.1.** Default Value: Use 1.0 (No/Weak Mitigation).
- **Part 2 § 3.5.** AIVSS is reported as a single numeric score from 0.0 to 10.0 (rounded to the nearest tenth).
- **Part 2 § 3.5.2.** Practitioners integrating AIVSS outputs into CVSS-based vulnerability management workflows should note that AIVSS scores reflect amplified agentic risk and are not directly comparable to CVSS base scores.
- **Part 2 § 3.5.2.** Patching without constraining the agent's amplification factors will not materially reduce AIVSS risk.
- **Part 2 § 4.2.** Higher-risk classifications should trigger deeper review and stronger assurance requirements, while lower-risk systems may proceed through streamlined approval paths.
