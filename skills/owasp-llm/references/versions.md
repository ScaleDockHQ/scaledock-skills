# Versions and upgrades

Read this when choosing which edition to review against, reading a report or policy that cites older LLM IDs, moving findings between editions, or checking for a newer edition. Sources: the 2026 resource page, PDF and announcement, the 2025 resource page, PDF and risk pages, the 2023-24 index page, and the v1.1 text in the project's GitHub repository, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id     | Line                                   | Status    | Revision                                       | Posture | Summary                                                                                                          |
| ------ | -------------------------------------- | --------- | ---------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `2026` | OWASP Top 10 for LLM Applications 2026 | current   | Version 2026 (resource page, 3 August 2026)    |         | Re-ranked with incident data; Excessive Agency to LLM03; Hidden Context Exposure replaces System Prompt Leakage. |
| `2025` | OWASP Top 10 for LLM Applications 2025 | supported | Version 2025 (released 18 November 2024)       |         | Adds System Prompt Leakage and Vector and Embedding Weaknesses; Unbounded Consumption.                           |
| `1.1`  | OWASP Top 10 for LLM Applications v1.1 | legacy    | Version 1.1 (16 October 2023), tag `2023-v1.1` |         | The 2023 list: Insecure Plugin Design, Overreliance, Model Theft, Model Denial of Service.                       |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The revision history in both PDFs lists Version 1.0 (1 August 2023), Version 1.1 (16 October 2023) and Version 2025 (18 November 2024); the 2026 PDF adds Version 2026 (2026 PDF p. 2). Version 1.0 is not a separate line: 1.1 kept its ten entry names and numbers and applied community fixes (GitHub repository, `changes.md`, 1.0.1). Read a 1.0 document as 1.1. The 2026 PDF's cover and revision history still carry a "[Publication date to be set]" placeholder; the resource page dates the edition 3 August 2026 and the announcement of 2 September 2026 calls it released, so the edition is published (2026 PDF p. 1 to 2; resource page; announcement).

## Which version to use

- Review against the 2026 edition and cite its IDs (`LLM01:2026` to `LLM10:2026`) and numbered mitigations.
- Use the 2025 edition when a named consumer requires its IDs: a policy, an audit, a vendor questionnaire, or the OWASP Top 10 for Agentic Applications 2026, whose Appendix A cross-mapping cites 2025 IDs. Report the 2026 ID first and the 2025 ID next to it, from the table below.
- Treat v1.1 as input to an upgrade. Its IDs collide with later editions (for example LLM02 meant Insecure Output Handling in 1.1), so never cite a bare `LLM02` without the edition.
- Always write IDs with the edition suffix (`LLM07:2025`), as both later editions do.

## Entry IDs across editions

| 2026                                   | 2025                                   | v1.1                                                           | Basis                                                                                                                                                                       |
| -------------------------------------- | -------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LLM01 Prompt Injection                 | LLM01 Prompt Injection                 | LLM01 Prompt Injection                                         | Same name in every edition.                                                                                                                                                 |
| LLM02 Sensitive Information Disclosure | LLM02 Sensitive Information Disclosure | LLM06 Sensitive Information Disclosure                         | Same name.                                                                                                                                                                  |
| LLM03 Excessive Agency                 | LLM06 Excessive Agency                 | LLM08 Excessive Agency                                         | Same name; 2026 p. 7 states the move to third.                                                                                                                              |
| LLM04 Supply Chain                     | LLM03 Supply Chain                     | LLM05 Supply Chain Vulnerabilities                             | Same topic; 2025 shortened the name.                                                                                                                                        |
| LLM05 Data and Model Poisoning         | LLM04 Data and Model Poisoning         | LLM03 Training Data Poisoning                                  | Matching text: both define poisoning of pre-training, fine-tuning and embedding data (v1.1 LLM03; 2025 p. 16).                                                              |
| LLM06 Unbounded Consumption            | LLM10 Unbounded Consumption            | LLM04 Model Denial of Service, and LLM10 Model Theft (in part) | 2025 p. 1 states it expands Denial of Service. Model extraction, functional replication and the model-registry mitigations repeat v1.1 Model Theft text (2025 p. 35 to 37). |
| LLM07 Misinformation                   | LLM09 Misinformation                   | LLM09 Overreliance                                             | Matching text: 2025 treats overreliance as part of Misinformation, and most v1.1 Overreliance mitigations reappear in it (2025 p. 32 to 33).                                |
| LLM08 Hidden Context Exposure          | LLM07 System Prompt Leakage            | none                                                           | 2025 p. 1 adds System Prompt Leakage; 2026 p. 7 renames and broadens it.                                                                                                    |
| LLM09 Vector and Embedding Weaknesses  | LLM08 Vector and Embedding Weaknesses  | none                                                           | 2025 p. 1 adds the entry.                                                                                                                                                   |
| LLM10 Improper Output Handling         | LLM05 Improper Output Handling         | LLM02 Insecure Output Handling                                 | Matching text: same description, examples and scenarios (v1.1 LLM02; 2025 p. 19 to 21). 2026 p. 7 states the fall to tenth.                                                 |
| none                                   | none                                   | LLM07 Insecure Plugin Design                                   | No successor is named in either later edition. See the upgrade steps.                                                                                                       |

"Matching text" rows are this skill's reading of the documents, not a mapping OWASP publishes. Say so when a report relies on them.

## What changed

### OWASP Top 10 for LLM Applications 2026

- Ranking combines the community vote (three-quarters weight) with a corpus of real incidents (one quarter) (2026 p. 5).
- Order changes: Excessive Agency to LLM03, Unbounded Consumption up four places to LLM06, Improper Output Handling down to LLM10; Prompt Injection and Sensitive Information Disclosure hold first and second (p. 7).
- System Prompt Leakage becomes Hidden Context Exposure, covering all hidden context including tool schemas and retrieved policy text, with a four-level severity scale (p. 7, p. 46).
- Entries absorb newer risks: cross-modal injection in LLM01, artifact promotion and provenance in LLM04, fine-tuning subversion in LLM05, assistant-generated insecure code in LLM10 (p. 7).
- Scope rule: this list owns the risk while the model is a component; once it acts with tools, memory and downstream consequences, pair it with the Agentic Top 10 (p. 7).
- Per-entry "Related Frameworks and Taxonomies" sections are replaced by Appendix A, a version-pinned mapping to nine frameworks (p. 58).
- New mitigations per entry are listed under "New since 2025" in [`risks-01-05.md`](risks-01-05.md) and [`risks-06-10.md`](risks-06-10.md).

### OWASP Top 10 for LLM Applications 2025

- Unbounded Consumption expands Denial of Service to resource management and unexpected cost; Vector and Embedding Weaknesses is added for RAG; System Prompt Leakage is added; Excessive Agency is expanded for agentic architectures (2025 p. 1).
- Insecure Output Handling becomes Improper Output Handling, Training Data Poisoning becomes Data and Model Poisoning, and Supply Chain Vulnerabilities becomes Supply Chain (2025 table of contents).
- Insecure Plugin Design, Overreliance and Model Theft no longer have their own entries; "plugins" become "extensions" in Excessive Agency (2025 p. 22).

### OWASP Top 10 for LLM Applications v1.1

- The 2023 list as published in the project repository at tag `2023-v1.1`: LLM01 Prompt Injection, LLM02 Insecure Output Handling, LLM03 Training Data Poisoning, LLM04 Model Denial of Service, LLM05 Supply Chain Vulnerabilities, LLM06 Sensitive Information Disclosure, LLM07 Insecure Plugin Design, LLM08 Excessive Agency, LLM09 Overreliance, LLM10 Model Theft (`1_1_vulns/`).

## Upgrading

### 2025 to 2026

1. Change the edition marker: relabel every finding with its 2026 ID from the table, and keep the 2025 ID beside it where a consumer needs it.
2. Replace renamed scope: move System Prompt Leakage findings to LLM08:2026, re-rate them on the informational to critical scale (2026 p. 46), and add any exposed tool schemas, retrieved policy text or output-format rules that were not covered before.
3. Check the new mitigations: walk the "New since 2025" notes per entry and the [`review-checklist.md`](review-checklist.md) items they feed, for example the Rule of Two (LLM01 M8), hard spending caps and agent circuit breakers (LLM06 M2, M9), in-query tenant scoping (LLM09 M1) and auto-fetch rendering (LLM10 M9). Each unmet one is a new finding.
4. Keep behaviour unchanged: relabelling alone must not change a verdict or severity. Change one only where the 2026 text changes the entry's scope, and say which text.

### v1.1 to 2026

1. Change the edition marker: relabel every finding with the 2026 ID from the table; note the 2025 ID if a consumer needs it.
2. Replace removed entries by mechanism, not by name:
   - Insecure Plugin Design: free-text or raw SQL parameters and missing type checks go to LLM03:2026 M3 (strict parameter schemas); authentication without per-tool authorisation and plugins that trust model content as user intent go to LLM03:2026 M5 and M7; third-party plugins go to LLM04:2026, or ASI04 for MCP servers and tool registries.
   - Model Theft: extraction and replication through the API go to LLM06:2026 (example 7, scenario 5); weight or architecture leakage through side channels goes to LLM02:2026 (p. 39); repository breaches and insider leaks have no 2026 entry of their own, so keep them as general security findings.
   - Overreliance: go to LLM07:2026, and re-check against claim-check-act and tool-call validation (LLM07 M2, M3).
   - Model Denial of Service: go to LLM06:2026, and add token- and cost-based limits and caps (M1, M2).
3. Validate against the target: walk every 2026 entry, because LLM08 and LLM09 have no v1.1 predecessor and must be reviewed from scratch.
4. Keep behaviour unchanged: a finding that was valid under v1.1 stays a finding; only its label and the cited mitigation change.

## Preview

None is listed. As of 2026-10-05 the 2026 edition is the newest; the project site and the 2026 announcement show no draft or call for input for a later edition. Watch the LLM Top 10 page and the Top 10 for LLM initiative page on genai.owasp.org. When a draft appears, list it as a preview with posture track until it is published; when it ships, make it current, make 2026 supported, move 2025 to legacy, and add an ID table column and an upgrade section.
