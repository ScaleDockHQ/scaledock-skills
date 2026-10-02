# Review checklist

A review checklist built from the mitigations in the OWASP Top 10 for Agentic Applications 2026. Each item cites the entry and mitigation number it comes from (see `top-10.md`). Mark each item done, not applicable (with a reason), or a finding.

## Least agency

The Top 10 extends least privilege and excessive agency (LLM06) to least agency: avoid autonomy that is not needed, because it adds attack surface without value, and treat observability as non-negotiable (p. 7).

- [ ] Each agent's autonomy is justified; steps that do not need planning or tool choice are plain code. (p. 7)
- [ ] Goals and permitted actions are fixed in a locked, versioned system prompt; changes go through review. (ASI01 M3; ASI04 M4)
- [ ] Planning and execution are separated by a policy engine. (ASI08 M4)
- [ ] Blast-radius limits exist: quotas, progress caps, circuit breakers. (ASI08 M7)

## Tool use

- [ ] Each tool has a least-privilege profile (scopes, rate limit, egress allowlist), expressed as policy. (ASI02 M1)
- [ ] Tool calls pass a policy enforcement point that validates intent, arguments and schema. (ASI02 M4)
- [ ] Destructive or high-impact tools (delete, transfer, publish, send) require confirmation with a preview or diff. (ASI02 M2)
- [ ] Cost, rate or token budgets throttle or revoke on overrun. (ASI02 M5)
- [ ] Tools are resolved by fully qualified name and pinned version; ambiguous resolution fails closed. (ASI02 M7)
- [ ] Untrusted model output never reaches a shell, interpreter or database tool unvalidated. (ASI02 example 3; ASI05 M1)
- [ ] Tool invocations and parameters are logged immutably; unusual chains (read then external send) alert. (ASI02 M8)

## Identity and privilege

- [ ] Each agent has its own identity, managed as a non-human identity with lifecycle and audit. (ASI03 M1, M6)
- [ ] Credentials are short-lived, task-scoped and bound to the session; no static long-lived keys in agents. (ASI02 M6; ASI03 M1)
- [ ] Delegation passes a narrowed scope, never the delegator's full access. (ASI03 example 1, M7)
- [ ] Each privileged step is re-authorized at execution time, not only at workflow start. (ASI03 M3, example 4)
- [ ] Tokens are bound to subject, audience, purpose and session; mismatched use is rejected. (ASI03 M5)
- [ ] Memory and cached credentials are wiped between tasks and users. (ASI03 M2)
- [ ] Transitive permission gains and new scope requests are detected. (ASI03 M8, M9)
- [ ] Signing keys sit in an HSM or KMS behind the orchestrator, never in the agent. (ASI10 M6)

## Human-in-the-loop

- [ ] High-impact, irreversible, goal-changing and privilege-escalating actions require human approval. (ASI01 M2; ASI03 M4; ASI05 M6; ASI09 M1)
- [ ] Approvals show a plain-language risk summary and expected side effects, not only the model's rationale. (ASI09 M4, M7)
- [ ] Previews cannot cause network or state changes. (ASI09 M7)
- [ ] High-risk recommendations are visually marked; low-certainty or unverified sources are labelled. (ASI09 M5, M8)
- [ ] Users can flag suspicious agent behaviour, triggering review or lockdown. (ASI09 M4)
- [ ] Oversight scales with risk to avoid approval fatigue; reviewers are trained. (ASI09 M5; ASI08 example 6)

## Untrusted input and memory

- [ ] User text, documents, RAG results, email, calendar, web pages, tool output and peer messages are treated as untrusted. (ASI01 M1, M6)
- [ ] Memory writes are scanned before commit and carry source attribution. (ASI06 M2, M5)
- [ ] Memory is segmented per user, session, tenant and domain. (ASI06 M3, M7)
- [ ] The agent's own output is not re-ingested as trusted memory; unverified memory expires. (ASI06 M6, M8)
- [ ] Memory supports snapshots, rollback and quarantine. (ASI06 M7)

## Inter-agent traffic

- [ ] Channels use mutual authentication and encryption with per-agent credentials. (ASI07 M1)
- [ ] Messages are signed and replay-protected with nonces, session IDs and timestamps. (ASI07 M2, M3)
- [ ] Protocol versions are pinned; downgrades are rejected. (ASI07 M4, M6)
- [ ] Discovery and registration are authenticated; Agent Cards are signed and verified; no open registration. (ASI04 M5; ASI07 M7, M8)
- [ ] Messages follow typed, versioned schemas with explicit audiences. (ASI07 M9)

## Supply chain

- [ ] Prompts, tools, models, plug-ins and configs are inventoried (SBOM or AIBOM), signed and pinned by hash. (ASI04 M1, M7)
- [ ] Dependencies are allowlisted, pinned and scanned for typosquats; agents cannot install unvetted packages. (ASI04 M2; ASI05 example 8)
- [ ] A kill switch can disable a tool, prompt or agent connection everywhere. (ASI04 M8)

## Code execution

- [ ] Generated code runs in a sandbox with network and filesystem limits, never as root. (ASI05 M4)
- [ ] No `eval` on model output in production. (ASI05 M3)
- [ ] Generation and execution are separated by a validation gate with static scans. (ASI05 M5, M7)
- [ ] Agents have no direct path to production systems. (ASI05 M2)

## Monitoring and response

- [ ] Logs of goals, tool calls, inter-agent messages and policy decisions are tamper-evident and tied to agent identity. (ASI01 M7; ASI08 M10; ASI10 M1)
- [ ] Behaviour is baselined; goal shifts, anomalous tool sequences and fan-out alert. (ASI01 M7; ASI08 M6, M8)
- [ ] Kill switches and credential revocation can disable an agent quickly; quarantined agents need fresh attestation to return. (ASI10 M4, M7)
- [ ] Red-team exercises cover goal override and rollback. (ASI01 M8)
