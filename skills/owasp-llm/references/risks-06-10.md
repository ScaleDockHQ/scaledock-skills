# LLM06 to LLM10 (2026 edition)

Read this for step 3 of the workflow. Same layout and citation style as [`risks-01-05.md`](risks-01-05.md): (LLM06:2026 M2) is item 2 in that entry's "Prevention and Mitigation Strategies" list, and page numbers refer to the 2026 PDF in [Sources](../SKILL.md#sources).

## LLM06:2026 Unbounded Consumption (p. 38 to 42)

**What it is.** The application allows excessive, uncontrolled inference, so attackers can disrupt availability, inflict unsustainable cost, or steal intellectual property by cloning the model (p. 38). The defining trait is cost asymmetry: cheap requests trigger expensive computation (p. 38). Reasoning models with large output budgets, multimodal input, agentic tool use (such as MCP) that fans one request out into many operations, and shared inference infrastructure all compound it; request-rate limiting alone is no longer enough (p. 38).

**Common examples** (p. 38 to 39): variable-length input floods and output explosion (including fine-tuning that breaks end-of-sequence behaviour); denial of wallet; large-context abuse that stays just within limits; reasoning-loop and thinking-token exhaustion from short, benign-looking prompts; adversarially optimised inputs (sponge examples); multimodal token overhead; model extraction and distillation, accelerated by exposed logits and log-probabilities; tools that force recursive or fan-out tool calls; exploitation of serving frameworks.

**Boundary.** Side-channel extraction of weights or architecture through timing or shared infrastructure is LLM02 (p. 39).

**Mitigations** (p. 40 to 41):

1. Rate-limit and set quotas per source on tokens per minute, tokens per day and estimated cost per request, not only requests per second; estimate tokens before inference and reject oversize input.
2. Set hard, non-overridable spending caps per API key, user, team and cloud account that halt inference; alerts alone are not caps. Account for modality and tool-protocol cost differences.
3. Manage resource allocation dynamically so no single user or request dominates.
4. Sandbox the model's access to networks, internal services and APIs, which also limits exfiltration of extracted model data.
5. Degrade gracefully under load.
6. Limit queued and total actions, and scale with load balancing.
7. Scan inputs, especially images to vision models, for adversarial perturbations.
8. Detect recursive or resource-intensive tool interactions against a baseline of normal token use.
9. Agentic circuit breakers: step limits, recursion-depth limits, time limits and per-run cost ceilings on every agent run; hash state to detect loops.
10. Harden inference infrastructure: keep serving frameworks updated, disable unsafe deserialisation, restrict special-token passthrough, and authenticate every inference endpoint.

**Scenarios** (p. 41 to 42): uncontrolled input size; repeated requests; resource-intensive queries; denial of wallet; functional model replication from synthetic data; adversarial image perturbations; a published malicious tool or skill that makes agents loop or fan out; a long-lived agentic session whose growing context raises per-turn cost while each request stays under the limits.

**New since 2025.** Moved from LLM10 to LLM06 (p. 7). Adds token- and cost-based limits, hard spending caps (M2), agentic circuit breakers (M9) and infrastructure hardening (M10). The 2025 items on logit exposure, watermarking, glitch tokens, model registries and MLOps approval no longer appear as numbered mitigations; logit exposure stays as an example.

## LLM07:2026 Misinformation (p. 43 to 45)

**What it is.** The model or application produces incorrect, incomplete, unsupported or misleading information credible enough to drive a human decision, an automated workflow or an agent action (p. 43). The core risk is that the output is trusted and acted on; in agentic systems it shows up as wrong state, reasoning or evidence consumed downstream (p. 43). Overreliance remains a key factor and is often built into system design (p. 43).

**Boundary.** Where the root cause is prompt injection, poisoning or supply chain, reference those entries separately. Executing unsafe generated code is LLM10; registering hallucinated package names is LLM04. This entry is the false representation that drives a harmful decision or action (p. 43).

**Common examples** (p. 43 to 44): unsupported decision support; incorrect state inference in workflows (a condition believed met when it is not); fabricated code and dependencies; misleading summaries and omissions; adversarially induced misinformation; cross-agent propagation; forged or misattributed evidence.

**Mitigations** (p. 44):

1. Ground claims in authoritative, current sources before action.
2. Claim-check-act: separate generation from execution and verify claims before acting.
3. Validate tool calls: arguments, authorisation, preconditions and current state.
4. Use verification signals such as groundedness and consistency, not model confidence alone.
5. Enforce runtime verification (approval workflows, system checks) for high-impact actions.
6. Detect omissions with structured outputs that have mandatory fields.
7. Limit blast radius with least privilege, sandboxing and rate limits.
8. Log claims, evidence and outcomes, and test adversarial scenarios.
9. Calibrate trust: distinguish verified facts from assumptions.
10. Test workflows against misleading scenarios continuously.

**Scenarios** (p. 45): a hallucinated, pre-registered dependency; an agent approving a refund against policy; a clinical summary omitting a contraindication; seeded forum posts repeated by a troubleshooting agent; a false intrusion alert that blocks production; a payment agent trusting a wrong "identity verified" state; an agent reporting a backup that never ran.

**New since 2025.** Moved from LLM09 to LLM07, pulled up by incident data (p. 5). Reframed from content accuracy to decisions and actions: claim-check-act, tool-call validation and omission detection replace the 2025 emphasis on RAG, fine-tuning, user education and labelling.

## LLM08:2026 Hidden Context Exposure (p. 46 to 49)

**What it is.** Unauthorised extraction, inference or reconstruction of hidden, non-user-facing instructions or operational context: the system prompt, developer instructions, retrieved policy text, tool and function schemas and other material assembled into the context window (p. 46). It replaces LLM07:2025 System Prompt Leakage with a broader frame (p. 7).

**Design assumption.** Hidden context is discoverable and none of it is secret. Its disclosure must have little or no direct security impact: no credentials, connection strings or tokens in it, and no reliance on it as the boundary for authorisation, privilege separation, policy enforcement or content filtering (p. 46).

**Severity** (p. 46): informational (no secrets, no security logic); medium (internal rules, filtering criteria or workflow logic that aids an attacker but gates nothing critical); high (embedded credentials, or reliance on secrecy for authorisation or content policy); critical (disclosure chains to code execution, broad exfiltration or privilege escalation). Exposure amplifies LLM01, LLM02, LLM03 and LLM10 (p. 46).

**Boundary.** Leakage of regulated user or training data is LLM02; agentic amplifications (persistent memory, inter-agent channels, tool configuration persistence) belong to the Agentic Top 10; generic application issues such as server log leakage or client bundle inspection are out of scope (p. 47).

**Common examples** (p. 47 to 48): exposure of sensitive functionality, tool and function schemas, or credentials placed in context; exposure of behavioural control logic; reverse engineering of refusal rules; disclosure of permissions and roles (for example a tool description naming the role it requires); exposure of output formats that downstream parsers rely on.

**Mitigations** (p. 48):

1. Do not put sensitive data in hidden context; assume all context can reach the user, and keep secrets in systems the model cannot access.
2. Use deterministic methods and guardrails outside the model for validation and behaviour control; fine-tuning against disclosure gives no consistent guarantee.
3. Enforce authorisation and access control independently of the LLM, in a deterministic, auditable way; split tasks needing different access into separate authorisation contexts.

**Scenarios** (p. 49): credentials leaked with the system prompt; tool schemas extracted by probing and used to target later injections; disclosed guardrails used to craft a bypass.

## LLM09:2026 Vector and Embedding Weaknesses (p. 50 to 54)

**What it is.** Risks in any application that converts content into vectors and uses similarity search to decide what the model sees: RAG, vector-backed agent memory, semantic caches and deduplication (p. 50). The embedding layer becomes part of the trust boundary. These attacks exploit embedding geometry and similarity mechanics, not instruction following, and many work with no malicious instructions at all (p. 50).

**Boundary.** Indirect injection through retrieved content is LLM01; training-time poisoning of the embedding model is LLM05; serialisation flaws in vector-store libraries are LLM04; agent-memory attacks that do not rely on embedding geometry are ASI06. Vectorless retrieval has no LLM09 surface (p. 50).

**Common examples** (p. 50 to 52): cross-tenant leakage when similarity search runs over the full index before application-layer filtering; embedding inversion, so a vector backup equals a leak of the source documents; retrieval-time poisoning with content placed near a target query; retrieval jamming with a blocker document that makes the model refuse; membership inference, directly so when raw similarity scores reach the client; semantic cache and deduplication poisoning near the similarity threshold; multimodal embedding poisoning through cross-modal encoders.

**Mitigations** (p. 52 to 53):

1. Enforce tenant scope inside the index query, server-side, not as a post-retrieval filter; a client-supplied scope is a suggestion. Authenticate embedding and search endpoints with per-tenant rate limits; separate indexes for high-sensitivity tenants; chunk-level access control.
2. Normalise content before embedding (zero-width characters, white-on-white text, homoglyphs); record provenance (source, ingestion time, trust tier, pipeline version) for every embedding; review external content for sensitive indexes; vet the embedding model.
3. Segregate data by trust tier into separate indexes rather than tags on a shared index.
4. Detect anomalies at ingest and retrieval; do not return raw similarity scores; add noise and diversification at ranking; rate-limit oracle-like endpoints.
5. Control the storage lifecycle: delete embeddings when sources are deleted and reconcile; treat backups at source sensitivity; encrypt at rest with separate keys; re-embed the whole corpus when rotating models; treat embedding-API keys as secrets.
6. Keep immutable retrieval logs (tenant scope, query, returned IDs, scores), monitor for filter bypass, and treat embeddings-only leaks as source-data leaks in incident response.

**Scenarios** (p. 53 to 54): engineered public posts retrieved for internal queries; cross-tenant inference in a shared index; inversion of a leaked vector backup.

**New since 2025.** Moved from LLM08 to LLM09. Adds jamming, membership inference, cache and deduplication poisoning, multimodal poisoning, in-query tenant scoping and storage lifecycle controls.

## LLM10:2026 Improper Output Handling (p. 55 to 57)

**What it is.** Insufficient validation, sanitisation and handling of model output before it is passed to other components. Because prompts can steer output, this gives users indirect access to downstream functionality; exploitation yields XSS and CSRF in browsers and SSRF, privilege escalation or code execution on backends (p. 55).

**Boundary.** Misleading content is LLM07; input validation is LLM01 (p. 55).

**Aggravating conditions** (p. 55): excessive privileges for the model; susceptibility to indirect injection; unvalidated third-party tool input; missing context-specific encoding; weak monitoring; no rate limiting; terminal, log or IDE sinks that interpret control characters; renderers that auto-fetch resources referenced in output.

**Common examples** (p. 55 to 56): output passed to a shell, `exec` or `eval`; JavaScript or Markdown rendered as XSS; unparameterised generated SQL; path traversal through generated paths; unescaped email templates; ANSI escape sequences in terminals or logs (spoofing, OSC 52 clipboard hijack); auto-rendered Markdown images or link previews that exfiltrate context through the URL.

**Mitigations** (p. 56 to 57):

1. Treat the model as any other user (zero trust) and validate its responses before they reach backend functions.
2. Follow OWASP ASVS for validation and sanitisation.
3. Encode output returned to users.
4. Use context-aware encoding (HTML for web content, JavaScript for script contexts).
5. Use parameterised queries or prepared statements for any database operation involving model output.
6. Apply a strict Content Security Policy.
7. Log and monitor output for exploitation patterns.
8. Strip control characters (ANSI escapes, BEL, OSC, backspace, carriage return) and other non-printable bytes before writing to terminals, logs or other interpreting sinks; encode them visibly if they must stay.
9. Stop output from triggering automatic outbound requests: disable auto-rendering of Markdown images, link previews and iframes by default; otherwise allowlist origins or proxy fetches through a server that strips data-bearing query parameters.

**Scenarios** (p. 57): output passed unvalidated to a privileged tool that shuts down; a summariser exfiltrating data to an attacker server; generated SQL deleting all tables; JavaScript payload rendered as XSS; malicious script in generated emails; generated code compiled and deployed without review.

**New since 2025.** Moved from LLM05 to LLM10, the largest fall (p. 7). Now spans insecure code generated by assistants at scale (p. 7); adds terminal control characters (M8) and auto-fetch exfiltration (M9).
