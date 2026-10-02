# owasp-agentic

An agent skill that reviews AI agents and multi-agent systems against the OWASP Top 10 for Agentic Applications 2026 (ASI01 to ASI10).

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-agentic
```

Then ask your agent to "review this agent against the OWASP Agentic Top 10" or "threat model our multi-agent workflow".

## What it covers

- Each entry, from agent goal hijack (ASI01) to rogue agents (ASI10), with its common examples and mitigations.
- A review checklist grouped by least agency, tool use, identity and privilege, human-in-the-loop, memory, inter-agent traffic, supply chain, code execution and monitoring.
- How to classify findings, with the boundaries the Top 10 draws between entries.
- Mappings to the Agentic AI Threats and Mitigations taxonomy (T1 to T17) and the OWASP Top 10 for LLM Applications.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OWASP Top 10 for Agentic Applications for 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) and [its PDF](https://genai.owasp.org/download/52117/?tmstv=1765059207): Version 2026, December 2025.
- [Release announcement](https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/): 9 December 2025.
- [Agentic AI: Threats and Mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/) and [its PDF](https://genai.owasp.org/download/45674/?tmstv=1739819891): Version 1.1, December 2025.
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/) and the [LLM Top 10 2026 page](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/).

The OWASP documents are licensed CC BY-SA 4.0; the skill paraphrases them.

## License

MIT
