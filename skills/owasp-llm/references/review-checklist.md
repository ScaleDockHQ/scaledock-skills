# Review checklist and mappings

Read this for steps 4 and 5 of the workflow. The checklist regroups the 2026 mitigations by the part of the application they apply to, so a reviewer can walk prompts, retrieval, tools and output once each. Every item cites the entry and mitigation it comes from ([`risks-01-05.md`](risks-01-05.md), [`risks-06-10.md`](risks-06-10.md)). An unchecked item is a finding or an accepted risk with an owner.

## Prompts and hidden context

- [ ] No credentials, tokens, connection strings or regulated data in system prompts, developer instructions, tool descriptions or other hidden context (LLM02 T1.4; LLM08 M1).
- [ ] Nothing in hidden context is relied on for authorisation, privilege separation, policy enforcement or content filtering (LLM08 M2, M3).
- [ ] The system prompt states role and capabilities with explicit allow and deny statements, and is treated as a partial control only (LLM01 M1).
- [ ] The severity of a hidden-context finding is rated on the LLM08 scale: informational, medium, high or critical (LLM08, p. 46).

## Untrusted input: users, documents, retrieval and tools

- [ ] Each input surface is listed with its trust level (untrusted, semi-trusted, trusted but writable by outsiders) and decomposed by delivery, propagation and encoding (LLM01, p. 10 to 12).
- [ ] External content travels in a separate, provenance-labelled channel (LLM01 M6).
- [ ] Tag-block, variation-selector and zero-width characters are stripped at every ingest and render boundary (LLM01 M5); content is normalised before embedding (LLM09 M2).
- [ ] Images, audio and structured data are filtered after OCR or transcription, not only text (LLM01 M3).
- [ ] Memory writes are logged, classified for instruction content, and need approval before instruction-bearing entries persist across sessions (LLM01 M9).

## Tools and agency

- [ ] Only needed tools are offered, each with only the needed functions; no leftover trial tools (LLM03 M1, M2).
- [ ] No open-ended tools (shell, arbitrary URL fetch) where a granular tool would do; every tool has a strict parameter schema and validates arguments (LLM03 M3).
- [ ] Tool identities hold least privilege on downstream systems, enforced by those systems (LLM03 M4); credentials and state-change capability live in application code, not the model (LLM01 M4).
- [ ] Actions on behalf of a user run in that user's context with minimum scope, preserved across chained tool or agent calls (LLM03 M5).
- [ ] Every downstream request passes complete mediation by the tool, an independent policy decision point, or the downstream system; the model never decides authorisation (LLM03 M7; LLM08 M3).
- [ ] High-impact, irreversible or externally visible actions need human approval showing the exact rendered action (LLM01 M7; LLM03 M6).
- [ ] The Rule of Two holds: a component with untrusted input, sensitive data and state change or external communication needs per-action approval; any two of the three have a written residual-risk assessment (LLM01 M8).
- [ ] Tool calls are validated against preconditions and current state before execution, and claims are checked before acting (LLM07 M2, M3).
- [ ] Tool use is logged and monitored, and rate limits or circuit breakers halt or escalate on thresholds (LLM03 M8, M9).

## Output handling and rendering

- [ ] Model output is validated as untrusted input before it reaches any backend function, structurally and in trusted code (LLM10 M1; LLM01 M2).
- [ ] Output is encoded for its sink: HTML, JavaScript, SQL (parameterised), file paths, email templates (LLM10 M3 to M5).
- [ ] A strict Content Security Policy covers pages that render model output (LLM10 M6).
- [ ] No model output reaches a shell, `exec` or `eval`; generated code is not deployed without review and testing (LLM10 example 1 and scenario 6).
- [ ] Control characters are stripped or visibly encoded before terminals, logs and IDE panes (LLM10 M8).
- [ ] Renderers do not auto-fetch Markdown images, link previews or iframes from model output, or they allowlist origins or proxy through a stripping fetcher (LLM10 M9).
- [ ] High-impact outputs use structured formats with mandatory fields and are grounded in authoritative sources (LLM07 M1, M6).

## Sensitive data and privacy

- [ ] Only task-required fields are sent to external model providers; auto-context is off unless justified (LLM02 T1.2).
- [ ] Reasoning traces, tool arguments, logs and telemetry are classified and redacted like answers; raw traces are not logged to unrestricted observability (LLM02 T1.7, T2.4).
- [ ] Sanitisation uses classifiers and entity recognition, not regex alone (LLM02 T1.5).
- [ ] No-train and no-retain terms are technically enforced (LLM02 T1.7); supplier terms and privacy policies are vetted (LLM04 M1).
- [ ] Log-probabilities, confidence and explanations are gated on production endpoints where sensitivity warrants (LLM02 T2.3).
- [ ] A disclosure incident-response playbook exists for regulated workloads (LLM02 T3.5).

## Retrieval and vector stores

- [ ] Authorisation is enforced before retrieval, inside the index query and server-side, down to chunk level (LLM02 T1.3; LLM09 M1).
- [ ] Mixed-trust content is not in a shared index; high-sensitivity tenants have separate indexes (LLM09 M1, M3).
- [ ] Every embedding records source, ingestion time, trust tier and pipeline version (LLM09 M2).
- [ ] Raw similarity scores are not returned to clients; oracle-like endpoints are rate-limited (LLM09 M4).
- [ ] Vector backups are treated at source sensitivity; embeddings are deleted with their sources; the corpus is re-embedded on model rotation (LLM09 M5).
- [ ] Retrieved content is filtered and source-scored, and system instructions are isolated from it (LLM05 M3).

## Models, data and supply chain

- [ ] A signed SBOM extended with an AIBOM or ML-BOM lists models, adapters, datasets and licences (LLM04 M4; LLM05 M1).
- [ ] Models and adapters come from verifiable sources, are signed and hash-pinned, and are referenced by immutable digest, never a mutable tag (LLM04 M5, example 4).
- [ ] AI-suggested dependencies are confirmed to exist and be the intended package before adoption (LLM04 M2).
- [ ] Conversion, merge and quantisation steps are treated as high-risk promotion points (LLM04 M6); chat templates, tokenizer configs and adapters are signed, diffed and analysed like code (LLM05 M12).
- [ ] Retraining and feedback loops validate data, keep human oversight and rate-limit preference signals (LLM05 M9).
- [ ] Datasets are versioned for rollback and forensics (LLM05 M8).
- [ ] MCP servers and third-party tool packages are pinned, signed and verified, and their descriptions audited for hidden instructions (LLM01 M10).

## Consumption and cost

- [ ] Limits are on tokens and estimated cost per request, minute and day, with pre-flight token estimation (LLM06 M1).
- [ ] Hard spending caps per key, user, team and account halt inference; alerts are not caps (LLM06 M2).
- [ ] Agent runs have step, recursion-depth, time and cost limits, with loop detection (LLM06 M9).
- [ ] Inference endpoints are authenticated, serving frameworks are patched, and unsafe deserialisation and special-token passthrough are disabled (LLM06 M10).
- [ ] The system degrades gracefully and caps queued actions (LLM06 M5, M6).

## Testing and monitoring

- [ ] Red-teaming uses adaptive attackers who know the deployed defences; static-only attack-success claims are rejected (LLM01 M11).
- [ ] Backdoor trigger probing runs after every alignment cycle (LLM05 M10); disclosure red-teaming gates releases for regulated workloads (LLM02 T3.3).
- [ ] Claims, evidence and outcomes are logged, and workflows are tested against misleading scenarios (LLM07 M8, M10).
- [ ] Retrieval activity has immutable logs (LLM09 M6).

## Classifying findings

Assign each finding to the entry that owns its mechanism, using the boundaries the 2026 entries draw:

| Situation                                                            | Entry                        | Not                                            |
| -------------------------------------------------------------------- | ---------------------------- | ---------------------------------------------- |
| Untrusted input changes model behaviour                              | LLM01                        | LLM10 (that is the output side)                |
| Model output reaches a privileged action because tools are too broad | LLM03                        | LLM01 (injection is only the trigger)          |
| Unvalidated output reaches a shell, browser, database or renderer    | LLM10                        | LLM07                                          |
| Wrong but credible output drives a decision or action                | LLM07                        | LLM10                                          |
| System prompt, tool schema or hidden rules are extracted             | LLM08                        | LLM02, unless regulated data is exposed        |
| Regulated, user or training data leaks, including via side channels  | LLM02                        | LLM08                                          |
| Attack depends on embedding geometry or similarity search            | LLM09                        | LLM01 for injected instructions                |
| Durable corruption of training data, model or artifacts              | LLM05                        | LLM04 for the supply-chain path                |
| Third-party model, package, adapter or pipeline is compromised       | LLM04                        | ASI04 for MCP servers and tool registries      |
| Uncontrolled inference, cost or model extraction through the API     | LLM06                        | LLM02 for timing or shared-infra side channels |
| The model acts with memory, tools and downstream consequences        | Pair with the Agentic Top 10 |                                                |

Sources: LLM01 p. 11, LLM03 p. 23, LLM04 p. 27, LLM05 p. 34, LLM06 p. 39, LLM07 p. 43, LLM08 p. 47, LLM09 p. 50, LLM10 p. 55, and the scope statement on p. 7.

## Mappings (2026 Appendix A)

Appendix A maps every 2026 entry to nine frameworks pinned at fixed versions, including the Agentic Top 10 (2026), MITRE ATLAS (content v2026.06), MITRE ATT&CK v19.1, CWE 4.20, NIST AI 600-1, NIST AI RMF 1.0, the CSA AI Controls Matrix 1.1 and OWASP AIVSS 0.8 (p. 58, p. 105). The primary mappings to the Agentic Top 10 and MITRE ATLAS tactics:

| Entry | Agentic Top 10 (primary)                        | MITRE ATLAS tactics (primary)                                         |
| ----- | ----------------------------------------------- | --------------------------------------------------------------------- |
| LLM01 | ASI01, ASI02, ASI03, ASI05, ASI06, ASI08, ASI09 | Initial Access, Execution, Persistence, Defense Evasion, Exfiltration |
| LLM02 | ASI06                                           | Exfiltration                                                          |
| LLM03 | ASI01, ASI02, ASI03, ASI05, ASI07, ASI08, ASI09 | Execution, Impact                                                     |
| LLM04 | ASI04                                           | Initial Access                                                        |
| LLM05 | ASI04, ASI06, ASI08                             | Resource Development, Persistence, Impact                             |
| LLM06 | ASI02, ASI08                                    | Impact, Exfiltration                                                  |
| LLM07 | ASI08, ASI09, ASI10                             | Impact                                                                |
| LLM08 | ASI06, ASI07 (as pointers, not equivalents)     | Discovery, Exfiltration                                               |
| LLM09 | ASI04, ASI06                                    | Persistence, Exfiltration                                             |
| LLM10 | ASI02, ASI05, ASI09                             | Execution                                                             |

Sources: Agentic mapping p. 59 to 63; ATLAS mapping p. 68 to 73. For the AI RMF, Appendix A marks LLM04 (GOVERN 6, MAP 4, MANAGE 3) and LLM07 (MEASURE 2) as primary; LLM10 has no AI RMF mapping, and the other entries map only as supporting (p. 58 to 59, p. 89 to 92). Use the `mitre-atlas` and `nist-ai-rmf` skills for the technique and subcategory detail, and cite the 2026 appendix for the mapping itself.
