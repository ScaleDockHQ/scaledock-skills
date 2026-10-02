---
name: owasp-agentic
description: "OWASP Agentic Top 10: review AI agent apps against the OWASP Top 10 for Agentic Applications 2026 (ASI01 to ASI10). Use when designing, threat modelling or reviewing an AI agent, multi-agent system, copilot, coding agent, MCP or A2A integration, or any LLM app that plans and calls tools: agent goal hijack and indirect prompt injection, tool misuse and exploitation, identity and privilege abuse, agentic supply chain vulnerabilities, unexpected code execution, memory and context poisoning, insecure inter-agent communication, cascading failures, human-agent trust exploitation and rogue agents. Works as a review checklist for tool use, identity and privilege, human-in-the-loop approvals, least agency, sandboxing, memory, inter-agent messages and monitoring, and maps findings to the OWASP Agentic AI Threats and Mitigations taxonomy (T1 to T17) and the OWASP Top 10 for LLM Applications. Triggers: owasp agentic, agentic top 10, ASI01, agent security review, excessive agency, least agency, agentic threat model."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OWASP Top 10 for Agentic Applications

The OWASP Top 10 for Agentic Applications 2026 (the Agentic Top 10, entries ASI01 to ASI10) is the OWASP GenAI Security Project's list of the highest-impact risks in AI agents, published on 9 December 2025 by its Agentic Security Initiative. With this skill the agent reviews a design or codebase against it, entry by entry, and reports findings with the matching mitigations.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Citations name the entry and the numbered item in its "Prevention and Mitigation Guidelines" list, for example (ASI02 M1); page numbers refer to the Top 10 PDF. When a rule and the pinned source disagree, the source wins.

## Inputs (fill in, or ask before starting)

- Scope: which agents, tools, data sources, memory stores, peer agents and human approval points are in the review.
- Mode: design review, code review, or threat model.
- Revision: the pinned Top 10 in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources), check genai.owasp.org for a newer Agentic Top 10 or Threats and Mitigations version, and update the pins.

## Invariants

1. **Least agency.** Do not give a component autonomy it does not need; agentic behaviour where it is not needed expands the attack surface without adding value (p. 7).
2. **Natural-language input is untrusted.** This covers user text, documents, retrieved content, tool output and peer-agent messages, all of which can carry instructions (ASI01 M1, M6).
3. **Least privilege per tool and per task.** Each tool has a scoped profile; credentials are short-lived and task-scoped; delegation never passes a full access context (ASI02 M1, M6; ASI03 M1, M7).
4. **A human approves high-impact or irreversible actions,** with a preview of what will happen (ASI01 M2; ASI02 M2; ASI03 M4; ASI09 M1).
5. **Policy is enforced outside the model.** Planner output is validated by a policy enforcement point before execution (ASI02 M4; ASI08 M4).
6. **Generated code runs only in a sandbox,** never as root, never through `eval` in production (ASI05 M3, M4).
7. **Inter-agent messages are authenticated, integrity-protected and replay-protected** (ASI07 M1 to M3).
8. **Agent actions are logged immutably** and monitored against a baseline, with a kill switch to revoke tools, credentials or agents (ASI01 M7; ASI04 M8; ASI10 M1, M4).

## Workflow

1. **Map the system.** List agents, their goals, tools, credentials, memory, data sources, peer agents, approval points and output channels. Note where autonomy is not needed.
   ✓ Every tool has an owner, a privilege scope and a reason to exist; every credential has a lifetime.
2. **Walk the ten entries.** For each ASI entry, check the system against the common examples and the mitigations.
   -> [`references/top-10.md`](references/top-10.md)
   ✓ Each entry has a verdict: not applicable (with reason), mitigated (with evidence), or finding.
3. **Run the cross-cutting checklist.** Check tool use, identity and privilege, human-in-the-loop, least agency, memory, inter-agent traffic, supply chain, execution and monitoring.
   -> [`references/review-checklist.md`](references/review-checklist.md)
   ✓ Every unchecked item is either a finding or an accepted risk with an owner.
4. **Classify findings.** Assign each finding to the entry that matches its origin, not its consequence: propagation is ASI08 only when a defect spreads beyond its origin; privilege escalation is ASI03, not ASI02; code execution is ASI05 (ASI02 p. 12, ASI08 p. 30).
   -> [`references/mappings.md`](references/mappings.md)
   ✓ Each finding names one ASI entry, the related Threats and Mitigations IDs and LLM Top 10 IDs.
5. **Report.** For each finding, state the scenario, the affected components and the mitigations from the entry, ordered by impact.
   ✓ Every recommended mitigation traces to a numbered item in the Top 10.

## Verify before done

- [ ] All ten entries have a verdict.
- [ ] Tools with send, delete, transfer, publish or execute capability require human approval or a documented policy gate.
- [ ] No agent holds long-lived or broader-than-task credentials, and no worker inherits a manager's full access.
- [ ] Untrusted content (RAG, email, web, tool output, peer messages) cannot change goals or trigger tools without validation.
- [ ] Code execution is sandboxed with network and filesystem limits; no `eval` on model output.
- [ ] Memory writes are validated, segmented per user or tenant, and the agent's own output is not re-ingested as trusted memory.
- [ ] Logs, monitoring and a kill switch exist for tools, credentials and agents.

## Reference index

- **`references/top-10.md`**: each entry ASI01 to ASI10 with its description, common examples and mitigations. Load for step 2.
- **`references/review-checklist.md`**: the checklist grouped by concern (tool use, identity and privilege, human-in-the-loop, least agency and more). Load for step 3.
- **`references/mappings.md`**: the mapping to the Threats and Mitigations taxonomy (T1 to T17), the LLM Top 10 (2025) and the boundaries between entries. Load for step 4.

## Related skills

- `a2a` for securing Agent2Agent traffic and Agent Cards (ASI03, ASI04, ASI07): `npx skills add ScaleDockHQ/scaledock-skills --skill a2a`.
- `mcp-authorization` for MCP authorization and token handling (ASI02, ASI03): `npx skills add ScaleDockHQ/scaledock-skills --skill mcp-authorization`.
- `web-bot-auth` for signed agent identity over HTTP (ASI03, ASI07): `npx skills add ScaleDockHQ/scaledock-skills --skill web-bot-auth`.
- `ag-ui` for agent-to-user event streams and human-in-the-loop interrupts (ASI09): `npx skills add ScaleDockHQ/scaledock-skills --skill ag-ui`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OWASP Top 10 for Agentic Applications for 2026 (resource page)](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/): Published, Version 2026 (9 December 2025), checked 2026-10-02.
- [OWASP Top 10 for Agentic Applications 2026 (PDF)](https://genai.owasp.org/download/52117/?tmstv=1765059207): Published, Version 2026 (December 2025), checked 2026-10-02.
- [OWASP Top 10 for Agentic Applications: release announcement](https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/): Published, 9 December 2025, checked 2026-10-02.
- [Agentic AI: Threats and Mitigations (resource page)](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/): Published, first released 17 February 2025, checked 2026-10-02.
- [Agentic AI: Threats and Mitigations (PDF)](https://genai.owasp.org/download/45674/?tmstv=1739819891): Published, Version 1.1 (December 2025), checked 2026-10-02.
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/): Published, 2025 edition, checked 2026-10-02.
- [OWASP GenAI LLM Top 10 2026 (resource page)](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/): Published, 2026 edition (3 August 2026), checked 2026-10-02.
