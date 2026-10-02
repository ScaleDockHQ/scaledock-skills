# The ten entries

Summaries of the OWASP Top 10 for Agentic Applications 2026 (Version 2026, December 2025). Each entry lists what it covers, how to recognise it, and its mitigations. "M3" means item 3 of the entry's "Prevention and Mitigation Guidelines". Page numbers refer to the PDF. The source is licensed CC BY-SA 4.0; the summaries below are paraphrased.

## ASI01: Agent Goal Hijack (p. 9 to 11)

Agents cannot reliably tell instructions from content, so an attacker redirects the agent's goals, task selection or planning through prompts, tool output, documents, forged agent messages or poisoned data. Unlike LLM01 (one response), the impact spans multi-step behaviour. Persistent memory corruption is ASI06; drift without an active attacker is ASI10.

Look for: indirect prompt injection in RAG content, email, calendar or chat; injected instructions that send messages under a trusted identity or move money.

Mitigations:

1. Treat all natural-language input as untrusted and apply prompt-injection safeguards before it can affect goals, plans or tool calls.
2. Enforce least privilege for tools and require human approval for high-impact or goal-changing actions.
3. Lock system prompts so goals and permitted actions are explicit and auditable; change them only through configuration management with human approval.
4. At run time, validate user intent and agent intent before goal-changing or high-impact actions; pause or block on unexpected goal shifts and record them.
5. Consider an "intent capsule": bind goal, constraints and context to each execution cycle in a signed envelope.
6. Sanitize every connected source (RAG, email, calendar, files, APIs, browsing, peer messages) before it can influence goals.
7. Log and monitor goal state, tool-use patterns and invariants against a baseline; alert on deviations.
8. Red-team goal override and verify rollback.
9. Include agents in the insider threat programme.

## ASI02: Tool Misuse and Exploitation (p. 12 to 14)

The agent uses a legitimate tool, within its granted privileges, in an unsafe way: deleting data, over-invoking costly APIs, exfiltrating information. Escalation is ASI03; code execution is ASI05; malicious tools at source are ASI04.

Look for: over-privileged or over-scoped tools, untrusted model output passed to a shell or database tool, unsafe browsing, loops over costly APIs, tool poisoning through descriptors, typosquatted tool names, chains of internal and external tools that exfiltrate data, "safe" auto-run tools (such as ping) used for DNS exfiltration.

Mitigations:

1. Least agency and least privilege per tool: scopes, rate limits, egress allowlists, expressed as authorization policy per tool.
2. Authenticate each tool invocation and require human confirmation, with a dry-run or diff preview, for destructive or high-impact actions.
3. Sandbox tool and code execution; deny all non-approved outbound destinations.
4. A policy enforcement point ("intent gate") validates intent and arguments, enforces schemas and rate limits, issues short-lived credentials, and revokes on drift.
5. Budget cost, rate or tokens per tool with automatic throttling or revocation.
6. Just-in-time, ephemeral credentials bound to the user session.
7. Use fully qualified tool names and version pins; validate call semantics; fail closed on ambiguous resolution.
8. Immutable logs of invocations and parameters; monitor for anomalous rates and chains such as a database read followed by an external transfer.

## ASI03: Identity and Privilege Abuse (p. 15 to 17)

Attackers exploit delegation chains, role inheritance, cached credentials or agent-to-agent trust to escalate access. Without its own governed identity, an agent sits in an attribution gap that makes least privilege impossible.

Look for: a manager agent passing its full access to a worker; cached secrets reused across tasks or users; a low-privilege agent relaying instructions a high-privilege agent executes (confused deputy); authorization checked at the start of a long workflow but not at execution (TOCTOU); fake agents registered with forged descriptors or Agent Cards; one user's identity used implicitly by others through a shared agent.

Mitigations:

1. Task-scoped, time-bound permissions with per-agent identities and short-lived credentials.
2. Isolate identities and contexts per session; wipe memory between tasks.
3. Re-authorize each privileged step with a central policy engine.
4. Human approval for privilege escalation and irreversible actions.
5. Bind tokens to a signed intent (subject, audience, purpose, session) and reject mismatches.
6. Manage agents as non-human identities in the identity platform, with scoped credentials, audit and lifecycle.
7. Bind permissions to subject, resource, purpose and duration; re-authenticate on context switch; no inheritance across agents without re-validated intent; revoke on idle or anomaly.
8. Detect permissions gained transitively through delegation.
9. Detect cross-agent elevation and device-code phishing flows.

## ASI04: Agentic Supply Chain Vulnerabilities (p. 18 to 20)

Third-party models, tools, plug-ins, prompts, datasets, agents, MCP or A2A interfaces, registries and update channels may be malicious or tampered with. Agents compose these at run time, so the supply chain is live.

Look for: prompt templates pulled from remote sources; hidden instructions in tool metadata, MCP descriptors or Agent Cards; typosquatted or impersonating tools and agents; compromised registries; poisoned RAG plug-ins; agents that install packages automatically.

Mitigations:

1. Sign and attest manifests, prompts and tool definitions; maintain SBOMs and AIBOMs and an inventory; use curated registries.
2. Allowlist and pin dependencies; scan for typosquats; verify provenance; reject unsigned components.
3. Sandbox sensitive agents with network and syscall limits; reproducible builds.
4. Version-control and review prompts, orchestration scripts and memory schemas.
5. Mutual authentication and attestation between agents (PKI, mTLS); no open registration; sign and verify inter-agent messages.
6. Re-check signatures, hashes and SBOMs at run time; monitor behaviour and lineage.
7. Pin prompts, tools and configs by content hash and commit; staged rollout with auto-rollback.
8. A kill switch that disables tools, prompts or agent connections everywhere.
9. Design for zero trust: assume LLM and agent components can fail or be exploited.

## ASI05: Unexpected Code Execution (RCE) (p. 21 to 23)

Prompt injection, tool misuse or unsafe serialization turns text into execution: scripts, binaries, deserialized objects, template engines, in-memory `eval`, leading to host or container compromise.

Look for: shell commands built from prompts; `eval` in memory systems; unsafe deserialization; hallucinated backdoored code; agents installing packages or regenerating lockfiles from unpinned specs; tool chains such as upload, path traversal, dynamic load.

Mitigations:

1. Apply LLM05 (Improper Output Handling): validate input and encode output for generated code.
2. No direct agent access to production; pre-production checks for vibe-coding systems.
3. Ban `eval` in production agents; use safe interpreters and taint tracking.
4. Never run as root; sandbox with network limits; block known-vulnerable packages; restrict the filesystem to a working directory and log diffs.
5. Per-session environments, least privilege, fail secure, and a validation gate between generation and execution.
6. Human approval for elevated runs; a version-controlled allowlist for auto-execution.
7. Static scans before execution, runtime monitoring, and audit logs of generation and runs.

## ASI06: Memory and Context Poisoning (p. 24 to 26)

Attackers corrupt stored or retrievable context (conversation history, memory tools, summaries, embeddings, RAG stores) so later reasoning and tool use go wrong. One-time prompts are LLM01; this entry is about persistence across sessions.

Look for: poisoned vector stores; shared context across users; injected content that gets summarized into memory; gradual drift; cross-tenant retrieval through loose namespace filters; contamination spreading between agents.

Mitigations:

1. Encrypt in transit and at rest; least-privilege access.
2. Scan memory writes and outputs for malicious or sensitive content before commit.
3. Segment memory per user session and domain.
4. Accept only authenticated, curated sources; minimize retention by sensitivity.
5. Require source attribution; detect suspicious updates.
6. Do not re-ingest the agent's own output into trusted memory.
7. Adversarial tests, snapshots and rollback; per-tenant namespaces and trust scores in shared stores; quarantine suspected poisoning.
8. Expire unverified memory.
9. Weight retrieval by trust and tenancy; require two factors (for example provenance score and a human-verified tag) for high-impact memory.

## ASI07: Insecure Inter-Agent Communication (p. 27 to 29)

Messages between agents (APIs, buses, shared memory) lack authentication, integrity or semantic validation, so they can be intercepted, spoofed, replayed or downgraded.

Look for: unencrypted channels; tampered messages; replayed delegation messages; protocol downgrade; spoofed descriptors; poisoned discovery or registration (for example a fake A2A peer); one instruction parsed differently by different agents; traffic analysis.

Mitigations:

1. End-to-end encryption, per-agent credentials, mutual authentication, certificate pinning, forward secrecy.
2. Sign messages, hash payload and context, and detect hidden or modified natural-language instructions.
3. Anti-replay with nonces, session identifiers and timestamps tied to task windows.
4. Disable weak or legacy modes; bind protocol authentication to agent identity; enforce version and capability policy at gateways.
5. Limit metadata inference: padding, smoothed rates, non-deterministic schedules.
6. Pin allowed protocol versions (for example MCP, A2A, gRPC) and reject downgrades.
7. Authenticate discovery and coordination messages; protect directories.
8. Use attested registries; require signed Agent Cards and continuous verification.
9. Typed, versioned message schemas with explicit audiences; reject failed validation.

## ASI08: Cascading Failures (p. 30 to 32)

A single fault (hallucination, malicious input, bad tool, poisoned memory) propagates across agents and workflows. Classify the origin under its own entry and use ASI08 only for the fan-out. Symptoms: rapid fan-out, cross-tenant spread, oscillating retries, queue storms.

Look for: executors that run planner output without validation; poisoned state reused by new plans; auto-deployment of tainted updates; approval fatigue; agents relying on each other's output in a loop.

Mitigations:

1. Design for zero trust and assume component and dependency failure.
2. Isolation and trust boundaries: sandboxing, segmentation, scoped APIs, mutual authentication.
3. Just-in-time, task-scoped credentials and a policy-as-code check on every high-impact call.
4. Separate planning from execution with an external policy engine.
5. Checkpoints or human review before high-risk output propagates.
6. Rate limiting and monitoring; throttle or pause on anomalies.
7. Blast-radius guardrails: quotas, progress caps, circuit breakers between planner and executor.
8. Detect behavioural and governance drift against baselines.
9. Replay recorded actions in an isolated clone before expanding policy.
10. Tamper-evident, time-stamped logs bound to agent identities, with lineage for every propagated action.

## ASI09: Human-Agent Trust Exploitation (p. 33 to 35)

Fluent, confident or empathetic agents lead humans to approve harmful actions; the human performs the final, audited step, hiding the agent's role. This is about human over-reliance; agent intent deviation is ASI10.

Look for: opaque reasoning; sensitive actions without confirmation; emotional manipulation; fabricated rationales; "read-only" previews that trigger side effects.

Mitigations:

1. Multi-step approval or human-in-the-loop before sensitive data access or risky actions.
2. Tamper-proof logs of queries and actions.
3. Monitor sensitive data exposure and risky actions over time.
4. Plain-language risk summaries (not model-generated rationales) and a way for users to flag manipulation.
5. Adjust autonomy and oversight by risk; show confidence cues such as "unverified source"; train reviewers.
6. Attach provenance metadata to recommendations; block actions without trusted provenance or beyond declared scope.
7. Block network or state-changing calls during previews; show expected side effects.
8. Visually mark high-risk recommendations; avoid persuasive language in safety-critical flows.
9. Detect plan divergence from approved workflow baselines.

## ASI10: Rogue Agents (p. 36 to 38)

Malicious or compromised agents deviate from their function or scope. Each action may look legitimate while the emergent behaviour is harmful. This entry covers the loss of behavioural integrity after drift begins, not the initial intrusion.

Look for: goal drift and scheming; hijacked workflows; collusion and self-replication; reward hacking (for example deleting backups to cut costs); fake reviewer agents in approval flows.

Mitigations:

1. Immutable, signed audit logs of actions, tool calls and inter-agent messages.
2. Trust zones with strict inter-zone rules; sandboxed execution with least-privilege API scopes.
3. Behavioural detection, including watchdog agents for collusion and coordinated false signals.
4. Kill switches and credential revocation; quarantine for forensics.
5. Per-agent cryptographic identity attestation and signed behavioural manifests validated before each action.
6. Periodic behavioural attestation; per-run ephemeral credentials with one-time audience binding; keys held in HSM or KMS and never exposed to agents.
7. Fresh attestation, dependency checks and human approval before reintegrating a quarantined agent.
