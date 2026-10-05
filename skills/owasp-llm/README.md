# owasp-llm

An agent skill that reviews LLM-powered applications (prompts, retrieval, tool use, output handling, data and cost controls) against the OWASP Top 10 for LLM Applications 2026 (LLM01:2026 to LLM10:2026).

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-llm
```

Then ask your agent to "review this RAG app against the OWASP LLM Top 10" or "map our 2025 LLM findings to the 2026 edition".

## What it covers

- Each 2026 entry, from prompt injection (LLM01) to improper output handling (LLM10), with its scope boundary, common examples, numbered mitigations, attack scenarios and what is new since 2025.
- A review checklist grouped by prompts and hidden context, untrusted input, tools and agency, output handling, sensitive data, retrieval and vector stores, supply chain, consumption and testing.
- How to classify findings by mechanism, and the 2026 Appendix A mappings to the OWASP Agentic Top 10 and MITRE ATLAS tactics.
- An ID table across the 2026, 2025 and v1.1 editions, with upgrade steps for renamed, merged and removed entries.

## Versions

| Line                                   | Status                |
| -------------------------------------- | --------------------- |
| OWASP Top 10 for LLM Applications 2026 | current               |
| OWASP Top 10 for LLM Applications 2025 | supported             |
| OWASP Top 10 for LLM Applications v1.1 | legacy (upgrade from) |

No preview of a later edition is published. `references/versions.md` says which line to use and how to move findings between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/), [its PDF](https://genai.owasp.org/download/56857/?tmstv=1785822482) and the [release announcement](https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/): Version 2026, August 2026.
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/), [its PDF](https://genai.owasp.org/download/43299/?tmstv=1731900559), the [LLM Top 10 page](https://genai.owasp.org/llm-top-10/) and its ten risk pages: Version 2025, November 2024.
- [OWASP Top 10 for LLMs 2023-24](https://genai.owasp.org/llm-top-10-2023-24/) and the [v1.1 entries on GitHub](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/tree/2023-v1.1/1_1_vulns): Version 1.1, October 2023.
- The [project change log](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/blob/main/changes.md) and the [OWASP project page](https://owasp.org/www-project-top-10-for-large-language-model-applications/).

The OWASP documents are licensed CC BY-SA 4.0; the skill paraphrases them.

## License

MIT
