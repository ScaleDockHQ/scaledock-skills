# LLM01 to LLM05 (2026 edition)

Read this for step 3 of the workflow. It summarises each 2026 entry: what it covers, where its boundary lies, the common examples, the numbered mitigations and the attack scenarios. Citations use the entry ID and the item number in its "Prevention and Mitigation Strategies" list, for example (LLM01:2026 M4); page numbers refer to the 2026 PDF in [Sources](../SKILL.md#sources). For a 2025 review, use the ID map in [`versions.md`](versions.md#entry-ids-across-editions) and the 2025 text: most mitigations carry over, and the 2026 additions are listed per entry below.

## LLM01:2026 Prompt Injection (p. 10 to 17)

**What it is.** Any input (user text, retrieved content, tool output, image, audio or video, intermediate reasoning, persistent memory) that changes the model's behaviour in ways the developer did not intend. Models make no architectural distinction between instructions and data, so there is no equivalent of parameterised queries (p. 10). Three deployment properties make it worse: everything in the context window is one token stream, injections written to memory or a RAG corpus taint every later session, and tool calls extend the blast radius to whatever the tools reach (p. 10).

**Anatomy.** Decompose a scenario along three axes before picking mitigations: delivery surface (direct input, retrieved content, tool output, tool connection channel, persistent memory), propagation (single-shot, multi-step, cross-session, self-replicating across agents) and encoding (plain text, base64 or other obfuscation, invisible Unicode, multimodal or steganographic, low-resource language) (p. 10).

**Types.** Direct injection, intentional (jailbreak) or unintentional (a pasted text with conflicting instructions). Jailbreaking is the subset aimed at safety protocols; application safeguards help contain it, but prevention needs model training updates (p. 11). Indirect injection arrives in external content; its delivery surface is untrusted (public web, unknown email), semi-trusted (public issue titles, package READMEs, third-party API responses) or trusted (the developer's own repositories, databases and mail, where an attacker may still have planted text) (p. 11 to 12).

**Boundary.** This entry is the input boundary. What the model leaks is LLM02; consequences of output reaching privileged actions are LLM03; validation of output before downstream use is LLM10 (p. 11).

**Common examples** (p. 12 to 13): direct override of the system prompt's role; indirect injection through RAG passages, web pages, documents or email; trusted-surface injection through a low-privilege channel (issue tracker, feedback form, ticket) that makes the user's LLM act under elevated credentials; multimodal and steganographic payloads; invisible-character injection and exfiltration; cross-session memory and RAG corpus poisoning; fine-tuning APIs used as a gradient oracle; multilingual, encoded or low-resource-language payloads.

**Mitigations.** No reliable prevention exists today, so defence is architectural: assume the instruction boundary will be bypassed and constrain what the model may do and what its outputs may reach (p. 13). An agent that combines private data, untrusted content and external communication has the conditions for high-impact exploitation; removing one leg removes them (p. 13). For agents, M4 and M8 are load-bearing (p. 13).

1. Constrain the role and capabilities in the system prompt with declarative allow and deny statements. Partial control only; pair it with M4.
2. Define a strict output schema and validate every response in trusted code before anything acts on it, using structural validation, not a second LLM call. It catches format violations, not semantic manipulation.
3. Filter at every modality boundary (OCR images, transcribe audio, then apply text filters). Semantic filters are evadable.
4. Hold credentials and state-change capability in application code, not the model; grant least privilege per operation; route privileged calls through a deterministic policy engine that re-validates intent and arguments at execution time.
5. Strip tag-block (U+E0000 to U+E007F), variation-selector (U+FE00 to U+FE0F) and zero-width (U+200B, U+200C, U+200D, U+2060) characters at every ingest and render boundary.
6. Pass external content through a structurally separate, provenance-labelled channel. This helps only against non-adaptive attackers.
7. Require human confirmation before any privileged, irreversible or externally visible action, showing the exact rendered action rather than a summary.
8. Budget capabilities with the Rule of Two as a floor: an agent with untrusted input, sensitive data and state change or external communication needs per-action human approval; any two of the three need a documented residual-risk assessment.
9. Treat memory writes as privileged: log the causing prompt, classify writes for instruction content, and require approval before instruction-bearing memories persist across sessions.
10. Pin, sign and verify every MCP server and third-party tool package, audit tool descriptions for hidden instructions, and monitor tool composition (see LLM04 and ASI04).
11. Test against adaptive attackers who have read the deployed defence; reject static-only attack-success claims.

**Scenarios** (p. 15 to 17): direct injection of a support bot; a summarised web page whose hidden text makes the model emit a Markdown image URL that exfiltrates the conversation; unintentional injection through a job description; RAG repository poisoning; payload splitting across resume fields; steganographic image injection; zero-click email-borne agent exfiltration; destructive command execution by a coding agent; trusted-backend injection through MCP (a poisoned issue, ticket or npm package read under elevated credentials).

**New since 2025.** Mitigations M5 (invisible characters), M8 (Rule of Two), M9 (memory writes), M10 (MCP and tool supply chain) and M11 (adaptive testing); M2 now forbids LLM-based validation; cross-modal attacks are in scope.

## LLM02:2026 Sensitive Information Disclosure (p. 18 to 22)

**What it is.** An LLM-integrated system exposes confidential, regulated, privileged or proprietary data through a channel nobody authorised. The channel is not only the answer: tool-call arguments, reasoning traces, retrieved chunks, multimodal output, logs, telemetry, embeddings and observable properties (timing, token length, log-probabilities, cache hits) are all disclosure surfaces, each subject to the same classification and redaction (p. 18).

**Phases** (p. 18): training-time (memorisation by models, fine-tunes and LoRA adapters), inference-time (live context such as system prompt, RAG chunks, memory or another session's data), pipeline-time (fine-tuning, distillation, synthetic data, observability) and observation-time (side channels). Two structural failures drive most incidents: oversharing upstream (unscoped drives and knowledge bases fed to RAG) and persistence (data in weights, embeddings or adapters survives source deletion) (p. 18).

**Boundary.** Severity turns on what the recipient can learn (p. 19). Where the model acts autonomously (cross-session memory, tool choice, multi-step exfiltration), the amplified risk belongs to the Agentic Top 10 (p. 19). Embedding mechanisms belong to LLM09; this entry owns the regulatory consequence (p. 19).

**Common examples** (p. 19 to 20): training-data memorisation and extraction; inference-time context disclosure, including reasoning traces and tool arguments and aggregation of individually permitted sources into a prohibited conclusion; embedding inversion; multimodal disclosure (OCR of screenshots, reproduced watermarks); side channels (membership inference, encrypted-traffic topic inference, KV-cache sharing); training-pipeline disclosure; platform disclosure through observability tools that log full prompts and traces by default.

**Mitigations** are tiered (p. 20 to 21). Cite them as T1.n, T2.n and T3.n.

- **Tier 1, every deployment:** govern corpora (provenance, classification, deduplication, PII scrubbing at ingest) (T1.1); minimise context sent to providers and disable auto-context (T1.2); authorise before retrieval inside the index query, with per-tenant indexes for high-sensitivity work (T1.3); never put secrets, credentials or regulated data in system prompts (T1.4); sanitise with classifiers and NER, not regex alone (T1.5); budget queries per user and session on sensitive endpoints (T1.6); scrub logs and traces before APM ingestion, encrypt, and technically enforce no-train and no-retain (T1.7).
- **Tier 2, regulated or high-sensitivity:** DP-SGD with detection (T2.1); vector-store protection with separate ACLs and restricted export (T2.2); gate log-probabilities, confidence and explanations (T2.3); classify and redact reasoning traces, never log them raw to unrestricted observability (T2.4); side-channel defences such as padding, batching and partitioned caches (T2.5); format-preserving encryption and field allowlists on the external path (T2.6); AI-aware audit logging and an enforced join policy (T2.7).
- **Tier 3, advanced:** confidential computing (T3.1); verifiable erasure across data, embeddings, checkpoints and adapters (T3.2); disclosure red-teaming as a release gate (T3.3); audit synthetic data and resist distillation (T3.4); a disclosure incident-response playbook covering breach-notification duties (T3.5).

**Scenarios** (p. 21 to 22): divergence prompts emit memorised PII; shared inference state leaks one user's prompt into another's trace; reasoning traces logged to a shared APM project; prompt injection prints a system prompt with an embedded API key; a shared legal RAG index crosses client boundaries; a leaked embeddings-only backup is inverted; topic inference from encrypted streams; membership inference against a clinical fine-tune; a model reads text under a black-box PDF redaction; a code runtime exfiltrates through DNS.

**New since 2025.** The tiered structure, the four-phase model, reasoning traces and tool arguments as outputs, side channels, and authorisation before retrieval.

## LLM03:2026 Excessive Agency (p. 23 to 26)

**What it is.** The vulnerability that lets damaging actions happen in response to unexpected, ambiguous or manipulated model output, whatever causes the malfunction: hallucination, a misaligned model, direct or indirect prompt injection, a compromised tool, or a compromised peer agent (p. 23). Root causes are excessive functionality, excessive permissions and excessive autonomy (p. 23).

**Boundary.** In agentic systems it shows up as ASI02, ASI03 and ASI08 (p. 23). Input and output sanitisation is not a root control for it; those belong to LLM01 and LLM10 (p. 23).

**Common examples** (p. 24): a tool with functions the task does not need (read plus modify and delete); a trial tool left available; an open-ended tool that fails to restrict commands; a tool identity with more database rights than needed; a per-user tool using a generic high-privilege identity; high-impact actions without confirmation.

**Mitigations.** M1 to M7 prevent it; M8 and M9 only limit damage (p. 24 to 26).

1. Minimise tools: offer only the tools the system needs.
2. Minimise tool functionality: a mail summariser reads, it does not send or delete.
3. Avoid open-ended tools (shell, fetch URL); build granular tools with a strict parameter schema, and validate contents before use.
4. Minimise tool permissions on downstream systems, enforced by the downstream identity's own permissions.
5. Execute tools in the user's context with minimum scope (for example OAuth); in delegated or multi-agent chains, preserve the original user context and scope rather than the calling agent's permissions.
6. Require user approval for high-impact actions, in the tool or the downstream system.
7. Complete mediation: authorise in logic, not by asking the model; validate every downstream request by the tool, an independent pre-execution policy decision point, or the downstream system. Use graduated enforcement (audit, warn, block, escalate) so reversible actions can auto-approve and irreversible ones go to a human.
8. Monitor tool use and downstream systems.
9. Rate-limit tool invocations, with circuit breakers that halt, throttle or escalate when thresholds (counts, or cumulative parameter values) are exceeded.

**Scenario** (p. 26): a mail-summarising assistant whose tool can also send mail, hijacked by an incoming email to forward sensitive messages. Fix it with a read-only tool, a read-only OAuth scope, or manual send approval; rate limiting only reduces damage.

**New since 2025.** Moved from LLM06 to LLM03. M3 adds strict parameter schemas, M5 adds user-context preservation across chained calls, M7 adds the independent policy decision point and graduated enforcement, M9 adds circuit breakers. The 2025 mitigation "sanitise LLM inputs and outputs" is gone from this entry.

## LLM04:2026 Supply Chain (p. 27 to 32)

**What it is.** Vulnerabilities in the integrity of training data, models, adapters, conversion pipelines and deployment platforms, including third-party pre-trained models and artifacts that can be tampered with or replaced (p. 27).

**Boundary.** Poisoning mechanics are LLM05; this entry is the supply-chain aspect. Agent-specific supply chains, including MCP servers and tool registries, are ASI04 (p. 27).

**Common examples** (p. 28 to 29): vulnerable or outdated packages, serving frameworks and models, including hallucinated package names registered in advance ("slopsquatting"); licensing risks; tampered pre-trained models, where safe formats and scanners do not guarantee safety; weak provenance and unsigned artifacts, especially when pipelines resolve a mutable reference such as a `latest` tag; malicious LoRA adapters and compromised conversion, merge and quantisation workflows; on-device model tampering; unclear terms and privacy policies of model operators.

**Mitigations** (p. 30):

1. Vet data sources and suppliers, including terms and privacy policies; re-audit on changes.
2. Apply vulnerability scanning, management and patching (OWASP A06:2021) to components, APIs and models, including development environments; verify AI-suggested dependencies exist and are the intended package before adopting them.
3. Red-team and evaluate third-party models for the use cases in scope, and keep anomaly detection and robustness testing in production pipelines.
4. Keep a signed inventory (SBOM, extended with AIBOM or ML-BOM, for example OWASP CycloneDX) that also tracks licences.
5. Use models only from verifiable sources; sign and hash artifacts (for example OpenSSF Model Signing with Sigstore). Signing proves integrity and origin, not safety, so combine it with immutable artifact references, provenance policy, release gates (for example SLSA), behavioural evaluation and continuous validation.
6. Monitor collaborative development environments and treat conversion and merge services as high-risk promotion points.
7. Encrypt edge models with integrity checks, use attestation, and reject unrecognised firmware and device states.

**Scenarios** (p. 31 to 32): a compromised PyPI dependency or exposed serving framework; a tampered model published under a trusted-looking name; a compromised supplier LoRA adapter; a hijacked conversion or merge service; model namespace reuse after an author deletes an account; scanner, safe-loader and safe-format bypass; a compromised build pipeline that signs a backdoored artifact; a re-packaged mobile app with a tampered model.

**New since 2025.** Moved from LLM03 to LLM04. Adds slopsquatting, the promotion boundary and immutable references, quantisation attacks, model signing with its limits, and namespace reuse.

## LLM05:2026 Data and Model Poisoning (p. 33 to 37)

**What it is.** Manipulation of data or model artifacts to embed harmful behaviour, bias or backdoors, anywhere data is ingested, transformed, retrieved or reused: pre-training, fine-tuning, embedding creation, RAG and model distribution (p. 33). Bundled non-weight artifacts count too: pickle files, chat templates, tokenizer configs, LoRA and PEFT adapters, and quantisation artifacts (p. 34). Backdoors can stay dormant until a trigger (p. 34).

**Boundary.** This entry is durable corruption of persistent data or model behaviour. Instructions delivered through retrieved content at inference time are LLM01; attacks on embedding geometry are LLM09; agent memory and tool poisoning are covered by the Agentic Top 10 (p. 34).

**Common examples** (p. 34 to 35): training and fine-tuning poisoning, including targeted erosion of refusals; mislabelled financial data; poisoned open-source datasets; low-volume backdoors (about 250 documents sufficed across model sizes); memory and recommendation poisoning; RAG knowledge-base poisoning; multi-agent poisoning; healthcare model poisoning; malicious models in public repositories.

**Mitigations** (p. 35 to 36):

1. Track dataset and model lineage with an SBOM or ML-BOM, enforce signing and verification, and validate integrity across stages.
2. Validate all incoming data, vet vendors, and compare outputs against trusted sources.
3. Protect RAG with trust boundaries, filtering of retrieved content, source scoring, and isolation of system instructions from external data.
4. Sandbox and isolate model interaction with unverified data, tools and systems.
5. Run anomaly detection across training, embedding and inference, and monitor loss and behaviour for drift.
6. Fine-tune on curated domain-specific datasets.
7. Enforce least privilege, segmentation and data access controls against unauthorised injection.
8. Version datasets (for example DVC) for rollback and forensics.
9. Control automated retraining and feedback loops: validate data, keep human oversight, rate-limit preference signals.
10. Red-team for backdoors with trigger probing after every alignment cycle; alignment does not remove backdoors.
11. Ground outputs with validation layers that verify retrieved content first.
12. Treat chat templates, tokenizer configs, adapters and quantisation artifacts as code: sign, hash, diff and analyse them before deployment.

**Scenarios** (p. 36 to 37): poisoned internal knowledge documents; hidden instructions in summarised web pages entering RAG or memory; crafted feedback-loop inputs causing slow drift; an insider mislabelling transactions; poisoned weights on a public hub; a modified chat template with trigger-activated instructions; unsafe pickle loading; cross-tenant contamination of shared embeddings; multi-session memory poisoning.

**New since 2025.** Moved from LLM04 to LLM05. Absorbs fine-tuning subversion (p. 7); adds inference-artifact controls (M12), feedback-loop controls (M9) and post-alignment trigger probing (M10). Grounding now requires a validation layer that verifies retrieved content (M11).
