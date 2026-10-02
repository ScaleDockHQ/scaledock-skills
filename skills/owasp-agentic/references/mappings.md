# Mappings and entry boundaries

## Cross-mapping (Top 10 Appendix A, p. 39 to 40)

| Entry                                      | LLM Top 10 (2025)                                                            | Threats and Mitigations                                                                                   |
| ------------------------------------------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| ASI01 Agent Goal Hijack                    | LLM01 Prompt Injection, LLM06 Excessive Agency                               | T6 Goal Manipulation, T7 Misaligned and Deceptive Behaviors                                               |
| ASI02 Tool Misuse and Exploitation         | LLM06                                                                        | T2 Tool Misuse, T4 Resource Overload, T16 Insecure Inter-Agent Protocol Abuse                             |
| ASI03 Identity and Privilege Abuse         | LLM01, LLM06, LLM02 Sensitive Information Disclosure                         | T3 Privilege Compromise                                                                                   |
| ASI04 Agentic Supply Chain Vulnerabilities | LLM03 Supply Chain                                                           | T17 Supply Chain Compromise, T2, T11, T12, T13, T16                                                       |
| ASI05 Unexpected Code Execution            | LLM01, LLM05 Improper Output Handling                                        | T11 Unexpected RCE and Code Attacks                                                                       |
| ASI06 Memory and Context Poisoning         | LLM01, LLM04 Data and Model Poisoning, LLM08 Vector and Embedding Weaknesses | T1 Memory Poisoning, T4, T6, T12                                                                          |
| ASI07 Insecure Inter-Agent Communication   | LLM02, LLM06                                                                 | T12 Agent Communication Poisoning, T16                                                                    |
| ASI08 Cascading Failures                   | LLM01, LLM04, LLM06                                                          | T5 Cascading Hallucination Attacks, T8 Repudiation and Untraceability                                     |
| ASI09 Human-Agent Trust Exploitation       | LLM01, LLM05, LLM06, LLM09 Misinformation                                    | T7, T8, T10 Overwhelming Human in the Loop                                                                |
| ASI10 Rogue Agents                         | LLM02, LLM09                                                                 | T13 Rogue Agents in Multi-Agent Systems, T14 Human Attacks on Multi-Agent Systems, T15 Human Manipulation |

The appendix also maps each entry to an OWASP AI Vulnerability Scoring System (AIVSS) core risk for scoring and prioritization.

## Threats and Mitigations taxonomy (v1.1, December 2025)

The Agentic AI Threats and Mitigations guide is the detailed taxonomy the Top 10 relies on (Top 10 p. 6). Its threats, as named in the guide's threat model table:

| ID  | Threat                                                          |
| --- | --------------------------------------------------------------- |
| T1  | Memory Poisoning                                                |
| T2  | Tool Misuse                                                     |
| T3  | Privilege Compromise                                            |
| T4  | Resource Overload                                               |
| T5  | Cascading Hallucination Attacks                                 |
| T6  | Intent Breaking and Goal Manipulation                           |
| T7  | Misaligned and Deceptive Behaviors                              |
| T8  | Repudiation and Untraceability                                  |
| T9  | Identity Spoofing and Impersonation / Agent Identity Compromise |
| T10 | Overwhelming Human in the Loop                                  |
| T11 | Unexpected RCE and Code Attacks                                 |
| T12 | Agent Communication Poisoning                                   |
| T13 | Rogue Agents in Multi-Agent Systems                             |
| T14 | Human Attacks on Multi-Agent Systems                            |
| T15 | Human Manipulation                                              |
| T16 | Insecure Inter-Agent Protocol Abuse                             |
| T17 | Supply Chain Compromise                                         |

The guide's taxonomy navigator walks a decision path, starting with whether the agent determines its own steps (reasoning threats), whether it relies on stored memory (memory threats), and whether it executes actions through tools (tool, execution and supply chain threats). Use it for a full threat model; use the Top 10 for a review.

## Boundaries between entries

The Top 10 draws these lines explicitly:

- **ASI01 vs ASI06 vs ASI10**: ASI01 is direct manipulation of goals; ASI06 is persistent corruption of memory or context; ASI10 is misalignment without active attacker control (p. 9 to 10).
- **ASI02 vs ASI03 vs ASI05**: ASI02 is unsafe use of privileges the agent already has; escalation or credential inheritance is ASI03; arbitrary or injected code execution is ASI05 (p. 12).
- **ASI02 vs ASI04**: manipulating a legitimate tool's interface at run time (tool poisoning) is ASI02; a tool that is malicious or compromised at source is ASI04 (p. 13).
- **ASI03 vs ASI07**: credential and permission misuse is ASI03; compromise of real-time messages is ASI07 (p. 27).
- **ASI08**: classify the initial defect under ASI04, ASI06 or ASI07; use ASI08 only when it spreads across agents, sessions or workflows (p. 30).
- **ASI09 vs ASI10**: human misperception or over-reliance is ASI09; agent intent deviation is ASI10 (p. 33).

## Other OWASP lists

- The OWASP Top 10 for LLM Applications 2025 (LLM01 to LLM10) is the list the Agentic Top 10 maps to.
- OWASP published an LLM Top 10 2026 on 3 August 2026; its resource page says it maps risks to the Agentic Top 10. The Agentic Top 10 itself still cites the 2025 IDs, so keep 2025 IDs when citing the cross-mapping above.
