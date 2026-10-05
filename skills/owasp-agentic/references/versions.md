# Versions and upgrades

Read this when choosing which edition to review against, when a report cites another OWASP list, or when a newer Agentic Top 10 appears. Sources: the OWASP Top 10 for Agentic Applications 2026 resource page and PDF, its release announcement, and the Agentic AI Threats and Mitigations guide, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id     | Line                                       | Status  | Revision                       | Posture | Summary                                              |
| ------ | ------------------------------------------ | ------- | ------------------------------ | ------- | ---------------------------------------------------- |
| `2026` | OWASP Top 10 for Agentic Applications 2026 | current | Version 2026 (9 December 2025) |         | The first edition: ASI01 to ASI10, with mitigations. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The 2026 edition is the only one. The release announcement presents it as the project's first Agentic Top 10, refined from an early public draft through community review, and released together with a minor update of the Threats and Mitigations taxonomy to version 1.1. The draft was never published as an edition, so it is not a line.

## Which version to use

- Review against the 2026 edition and cite its entry IDs (ASI01 to ASI10) and numbered mitigations.
- Use the Agentic AI Threats and Mitigations guide, version 1.1 (December 2025), for the detailed taxonomy (T1 to T17). It is a companion document, not a version of the Top 10.
- The OWASP Top 10 for LLM Applications is a separate list with its own editions (2025, and 2026 published on 3 August 2026). It is related, not a line of this specification. The Agentic Top 10 cross-mapping (Appendix A, p. 39 to 40) cites the 2025 LLM IDs; see [`mappings.md`](mappings.md#other-owasp-lists).

## What changed

### OWASP Top 10 for Agentic Applications 2026

- First edition: ten entries, ASI01 Agent Goal Hijack to ASI10 Rogue Agents, each with a description, common examples, attack scenarios and numbered prevention and mitigation guidelines (PDF, table of contents, p. 9 to 38).
- Appendix A maps every entry to the LLM Top 10 (2025), the Threats and Mitigations taxonomy and an OWASP AIVSS core risk (p. 39 to 40). Appendix B relates the list to OWASP CycloneDX and AIBOM (p. 41).
- Released alongside Threats and Mitigations version 1.1, synchronised with the Top 10 (release announcement).

## Upgrading

There is no earlier edition, so there is no upgrade path between lines of this list. Two related moves:

### LLM Top 10 IDs in a report

1. Keep the 2025 LLM IDs when citing the Agentic Top 10 cross-mapping, because Appendix A uses them.
2. If a reader works with the LLM Top 10 2026, add its IDs next to the 2025 ones from that list's own mapping, without replacing them.
3. Check every added ID against the LLM Top 10 2026 text.
4. Keep the findings unchanged: relabelling a cross-reference must not change a verdict or a severity.

### Taxonomy version in a threat model

1. Record the Threats and Mitigations version the threat model used.
2. Map threat IDs to the version 1.1 table in [`mappings.md`](mappings.md#threats-and-mitigations-taxonomy-v11-december-2025).
3. Check each threat name against the version 1.1 guide.
4. Keep the threat model's conclusions unchanged unless the new text changes a threat's scope.

## Preview

None is listed. As of 2026-10-05 OWASP has published no draft of a later Agentic Top 10 edition, so there is no text to cite. Watch genai.owasp.org for a new edition or public draft. When one appears, list it as a preview with posture track until it is published; when it ships, make it current, make 2026 legacy or supported, and add an upgrade section that maps the old entry IDs to the new ones.
