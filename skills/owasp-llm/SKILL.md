---
name: owasp-llm
description: >-
  OWASP LLM Top 10: review LLM-powered apps against the OWASP Top 10 for LLM Applications 2026 (LLM01:2026 to LLM10:2026, current), with the 2025 edition supported and v1.1 (2023) legacy; no preview. Use when designing, threat modelling or reviewing a chatbot, copilot, RAG pipeline, tool-calling or MCP-connected app, or any code that sends prompts to a model and acts on its output: prompt injection (direct, indirect, multimodal), sensitive information disclosure, excessive agency, supply chain, data and model poisoning, unbounded consumption and denial of wallet, misinformation, hidden context exposure (system prompt leakage), vector and embedding weaknesses, and improper output handling (XSS, SQL, Markdown image exfiltration). Maps findings across editions (LLM07:2025 to LLM08:2026, Insecure Plugin Design, Overreliance, Model Theft) and to the OWASP Agentic Top 10 and MITRE ATLAS. Triggers: owasp llm top 10, LLM01, prompt injection review, RAG security, system prompt leakage, rule of two, lethal trifecta.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OWASP Top 10 for LLM Applications

The OWASP Top 10 for LLM Applications is the OWASP GenAI Security Project's list of the most critical security risks in applications built on large language models. The 2026 edition (LLM01:2026 to LLM10:2026) was published on 3 August 2026 and ranks risks by community vote weighed against real incident data. With this skill the agent reviews an LLM application (prompts, retrieval, tool use, output handling, data and cost controls) entry by entry and reports findings with the matching mitigations.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Citations name the entry and the numbered item in its "Prevention and Mitigation Strategies" list, for example (LLM01 M4), or the tier item for LLM02, for example (LLM02 T1.3); IDs without an edition suffix mean 2026, and page numbers refer to the 2026 PDF. When a rule and the pinned source disagree, the source wins.

## Inputs (fill in, or ask before starting)

- Scope: which models, prompts and hidden context, input channels, retrieval stores, tools, output sinks and data flows are in the review.
- Mode: design review, code review, or threat model.
- Agency: does the model call tools, keep memory across sessions, or set downstream actions in motion? If so, the Agentic Top 10 applies as well (p. 7).
- Data sensitivity: which regulated or confidential data the app touches. This picks the LLM02 mitigation tier (p. 20 to 21).
- Target version: OWASP Top 10 for LLM Applications 2026 (default). OWASP Top 10 for LLM Applications 2025 is supported: cite its IDs next to the 2026 ones when a consumer requires them. OWASP Top 10 for LLM Applications v1.1 is legacy: map its findings forward, never review against it. No preview exists. See [`references/versions.md`](references/versions.md).
- Revision: the pinned editions in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources), check genai.owasp.org for a newer edition or a call for input, and update the pins.

## Invariants

1. **Assume the model will be fooled.** No reliable prevention for prompt injection exists, so design the system so that a fooled model cannot break anything important (p. 5; LLM01, p. 13).
2. **Everything that reaches the context is untrusted.** That includes retrieved documents, tool output, memory, images and audio, not only user text; separate and label external content (LLM01, p. 10; M3, M6).
3. **Model output is untrusted input.** Validate it in deterministic code before any downstream system acts on it, and encode it for its sink (LLM01 M2; LLM10 M1, M3 to M5).
4. **Security controls live outside the model.** Authorisation, privilege separation and content policy are enforced deterministically; hidden context holds no secrets and is never a security boundary (LLM03 M7; LLM08 M1 to M3; LLM02 T1.4).
5. **Least functionality, permissions and autonomy.** Offer only needed tools and functions, with least-privilege identities, acting in the user's context (LLM03 M1 to M5).
6. **A human approves high-impact actions,** seeing the exact action, and no component combines untrusted input, sensitive data and external action without per-action approval (LLM01 M7, M8; LLM03 M6).
7. **Authorise before retrieval,** inside the index query, server-side, at chunk level (LLM02 T1.3; LLM09 M1).
8. **Consumption has hard limits:** token and cost budgets, spending caps that halt inference, and step, depth, time and cost limits on agent runs (LLM06 M1, M2, M9).
9. **Artifacts are pinned and verified.** Models, adapters, datasets, MCP servers and tool packages are inventoried, signed and referenced immutably (LLM01 M10; LLM04 M4, M5).

## Workflow

1. **Pick the version.** Review against 2026; decide whether any consumer also needs 2025 IDs; map any v1.1 findings forward.
   -> [`references/versions.md`](references/versions.md)
   ✓ The report names the edition it reviews against, and every ID carries its edition suffix.
2. **Map the application.** List models and providers, system prompts and other hidden context, input surfaces with their trust level, retrieval and vector stores, tools with their identities and scopes, output sinks and renderers, logs and telemetry, supply-chain artifacts, and cost controls. Note where the model is a component and where it acts (p. 7).
   ✓ Every input surface has a trust level, every tool an identity and scope, every output a named sink.
3. **Walk the ten entries.** For each entry, check the application against its common examples and mitigations.
   -> [`references/risks-01-05.md`](references/risks-01-05.md), [`references/risks-06-10.md`](references/risks-06-10.md)
   ✓ Each entry has a verdict: not applicable (with reason), mitigated (with evidence), or finding.
4. **Run the checklist.** Walk prompts and hidden context, untrusted input, tools and agency, output handling, sensitive data, retrieval, supply chain, consumption, and testing.
   -> [`references/review-checklist.md`](references/review-checklist.md)
   ✓ Every unchecked item is a finding or an accepted risk with an owner.
5. **Classify and map findings.** Assign each finding to the entry that owns its mechanism, using the 2026 boundaries; add the Agentic Top 10 and MITRE ATLAS mappings from Appendix A. If the model acts with tools or memory, also run the Agentic Top 10 review.
   -> [`references/review-checklist.md`](references/review-checklist.md#classifying-findings)
   ✓ Each finding names one LLM entry, and the ASI entries and ATLAS tactics where they apply.
6. **Report.** For each finding, state the scenario, the affected components and the mitigations from the entry, ordered by impact.
   ✓ Every recommended mitigation traces to a numbered item in the 2026 text.
7. **Upgrade** (only when asked). Move a 2025 or v1.1 review, policy or control mapping to 2026 IDs and mitigations.
   -> [`references/versions.md`](references/versions.md#upgrading)
   ✓ Every finding carries a 2026 ID; no verdict or severity changed by relabelling alone.

## Verify before done

- [ ] All ten 2026 entries have a verdict.
- [ ] No secret, credential or regulated data sits in a system prompt, tool description or other hidden context.
- [ ] No model output reaches a shell, `eval`, SQL, HTML, file path, terminal or auto-fetching renderer without validation and sink-specific encoding.
- [ ] Every tool has least functionality and permissions, runs in the user's context, and passes a policy check the model cannot override.
- [ ] Irreversible or externally visible actions need human approval that shows the exact action.
- [ ] Retrieval enforces authorisation inside the index query; raw similarity scores are not exposed.
- [ ] Token, cost and agent-run limits halt inference rather than only alert.
- [ ] Models, adapters, datasets and tool packages are inventoried, signed and pinned by digest.
- [ ] Every cited ID carries its edition suffix, and any 2025 or v1.1 ID was mapped with [`references/versions.md`](references/versions.md).

## Reference index

- **`references/versions.md`**: the 2026, 2025 and v1.1 lines, which to use, the ID table across editions, what changed, and upgrade steps from 2025 and v1.1. Load for steps 1 and 7.
- **`references/risks-01-05.md`**: LLM01:2026 Prompt Injection to LLM05:2026 Data and Model Poisoning, with boundaries, examples, numbered mitigations, scenarios and what is new since 2025. Load for step 3.
- **`references/risks-06-10.md`**: LLM06:2026 Unbounded Consumption to LLM10:2026 Improper Output Handling, in the same layout. Load for step 3.
- **`references/review-checklist.md`**: the checklist grouped by application part, the table for classifying findings, and the Appendix A mappings to the Agentic Top 10 and MITRE ATLAS. Load for steps 4 and 5.

## Related skills

- `owasp-agentic` for applications where the model acts with tools, memory and autonomy (the risk moves there, p. 7): `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-agentic`.
- `mitre-atlas` for the adversary tactics and techniques Appendix A maps each entry to: `npx skills add ScaleDockHQ/scaledock-skills --skill mitre-atlas`.
- `nist-ai-rmf` for the governance functions and categories Appendix A maps to: `npx skills add ScaleDockHQ/scaledock-skills --skill nist-ai-rmf`.
- `mcp` for building and reviewing MCP servers and clients, the tool channel behind LLM01 M10 and scenario 9: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OWASP GenAI LLM Top 10 2026 (resource page)](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/): Published, Version 2026 (3 August 2026), checked 2026-10-05.
- [OWASP Top 10 for LLM Applications 2026 (PDF)](https://genai.owasp.org/download/56857/?tmstv=1785822482): Published, Version 2026 (122 pages; cover date still a placeholder), checked 2026-10-05.
- [OWASP GenAI Security Project unveils 2026 Top 10 for LLM Applications (announcement)](https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/): Published, 2 September 2026, checked 2026-10-05.
- [OWASP Top 10 for LLM Applications 2025 (resource page)](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/): Published, Version 2025 (17 November 2024), checked 2026-10-05.
- [OWASP Top 10 for LLM Applications 2025 (PDF)](https://genai.owasp.org/download/43299/?tmstv=1731900559): Published, Version 2025 (released 18 November 2024), checked 2026-10-05.
- [LLM Top 10 page](https://genai.owasp.org/llm-top-10/): Published, lists the 2025 entries, checked 2026-10-05.
- [LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/): Published, 2025 edition, checked 2026-10-05.
- [LLM02:2025 Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/): Published, 2025 edition, checked 2026-10-05.
- [LLM03:2025 Supply Chain](https://genai.owasp.org/llmrisk/llm032025-supply-chain/): Published, 2025 edition, checked 2026-10-05.
- [LLM04:2025 Data and Model Poisoning](https://genai.owasp.org/llmrisk/llm042025-data-and-model-poisoning/): Published, 2025 edition, checked 2026-10-05.
- [LLM05:2025 Improper Output Handling](https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/): Published, 2025 edition, checked 2026-10-05.
- [LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/): Published, 2025 edition, checked 2026-10-05.
- [LLM07:2025 System Prompt Leakage](https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/): Published, 2025 edition, checked 2026-10-05.
- [LLM08:2025 Vector and Embedding Weaknesses](https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/): Published, 2025 edition, checked 2026-10-05.
- [LLM09:2025 Misinformation](https://genai.owasp.org/llmrisk/llm092025-misinformation/): Published, 2025 edition, checked 2026-10-05.
- [LLM10:2025 Unbounded Consumption](https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/): Published, 2025 edition, checked 2026-10-05.
- [OWASP Top 10 for LLMs 2023-24](https://genai.owasp.org/llm-top-10-2023-24/): Published, Version 1.1, checked 2026-10-05.
- [OWASP Top 10 for LLM Applications v1.1 entries (GitHub)](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/tree/2023-v1.1/1_1_vulns): Released, tag `2023-v1.1` (Version 1.1, 16 October 2023), checked 2026-10-05.
- [Project change log (GitHub)](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/blob/main/changes.md): Published, entries 1.0 to 2.0.0, checked 2026-10-05.
- [OWASP Top 10 for Large Language Model Applications (OWASP project page)](https://owasp.org/www-project-top-10-for-large-language-model-applications/): OWASP Lab Project, links Version 2025 as the latest download, checked 2026-10-05.
