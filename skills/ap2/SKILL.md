---
name: ap2
description: "AP2 Agent Payments Protocol: authorize AI agent payments with signed Checkout and Payment Mandates (SD-JWT verifiable digital credentials), following AP2 v0.2 (current, draft posture build; no preview). Use when building or reviewing a shopping agent, merchant, credential provider, payment processor or trusted surface in agent-initiated payments: open and closed mandates, mandate.checkout.1 and mandate.payment.1, checkout_jwt and checkout_hash, constraints such as checkout.line_items, payment.amount_range, payment.budget and payment.agent_recurrence, Human Present and Human Not Present flows, key binding with cnf and sd_hash, OpenID4VP delegation, mandate receipts, double-spend and dispute evidence, and how AP2 relates to A2A, MCP and UCP. Also upgrades v0.1 Intent and Cart Mandates and compares the Visa Trusted Agent Protocol and the Agentic Commerce Protocol (ACP). Triggers: ap2, agent payments protocol, agentic payments, payment mandate, intent mandate, cart mandate, checkout mandate, verifiable intent."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# AP2

The Agent Payments Protocol (AP2) is an open protocol, created by Google and now being standardized in the FIDO Alliance, that lets an AI agent prove a user authorized a specific purchase. The user approves Mandate Content on a Trusted Surface, the agent presents the resulting signed Mandates, and each verifier checks them in deterministic code. With this skill the agent implements or reviews one or more AP2 roles.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), and cites the AP2 v0.2 page and heading it comes from (for example "Spec, Verification" for the Specification page). When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

Draft posture: **build**, pinned to AP2 v0.2 (repository tag `v0.2.0`, 28 April 2026). AP2 is pre-1.0 and the FAQ says core specification work continues in FIDO, so expect changes. v0.2 replaced the v0.1 Intent and Cart Mandates with open and closed Checkout Mandates; see `references/a2a-mcp-ucp-and-v0-1.md`.

## Inputs (fill in, or ask before starting)

- Target version: AP2 v0.2 (default, draft posture build). AP2 v0.1 is legacy: read it and upgrade from it, never author it. There is no supported line and no preview; FIDO successor work has no public text yet. See [`references/versions.md`](references/versions.md).
- Role: Shopping Agent, Merchant, Credential Provider, Merchant Payment Processor, Trusted Surface, or several (Spec, Roles).
- Mode: Human Present (direct), Human Not Present (autonomous), or both (Spec, Modes).
- Delegation model: User Credential (OpenID4VP with SD-JWT VCs) or Trusted Agent Provider (Agent Authorization, Mandate Delegation).
- Commerce protocol carrying AP2: UCP, A2A, MCP or another; AP2 leaves it out of scope (Spec, introduction).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources), check the AP2 GitHub releases and the site's `llms.txt` page list for a newer version, check for FIDO publications that supersede it, and update the pins.

## Invariants

1. **Every LLM and agent is a potential attacker.** AP2 assumes prompt injection cannot be prevented (Security and Privacy, Security Considerations). All validation and processing for a role happens in deterministic code, even when the role is agentic (Spec, Agentic vs Non-Agentic).
2. **The Trusted Surface is non-agentic** and is the only place user consent turns Mandate Content into a signed Mandate (Spec, Agentic vs Non-Agentic; Agent Authorization, Mandate Delegation). In the Trusted Agent Provider model the agent must not be able to reach the provider's signing key (Agent Authorization, Trusted Agent Provider).
3. **Two mandate types, versioned by `vct`.** Closed: `mandate.checkout.1` and `mandate.payment.1`; open: `mandate.checkout.open.1` and `mandate.payment.open.1`. Match the exact string, suffix included (Spec, Mandate Versioning; Checkout Mandate, Type; Payment Mandate, Type).
4. **The Merchant signs the Checkout** as a JWT, and the closed Checkout Mandate binds to it with `checkout_hash` (Spec, Checkout Mandate). The Payment Mandate binds to the same checkout with `transaction_id`, the hash of `checkout_jwt` (Payment Mandate, Mandate Schema). The Checkout JWT must use a non-deterministic signature such as ECDSA, not Ed25519 (Spec, Payment Mandate).
5. **Open mandates carry the agent key in `cnf`**, and closed mandates bind to the open one through the key binding JWT's `sd_hash` (Spec, Autonomous; Security and Privacy, Manipulated Checkout).
6. **Unknown constraints fail.** Verifiers evaluate every constraint of every open mandate against the closed mandate, and an unknown constraint type fails evaluation (Agent Authorization, Verification and Processing Rules).
7. **Every verification ends in a signed receipt**, success or error, with `reference` set to the hash of the closed mandate (Agent Authorization, Action Authorization; Spec, Checkout Mandate and Payment Mandate).
8. **No double spend.** An agent must not present another open mandate, or sign overlapping closed mandates, until it holds a rejection receipt for the previous one, and those receipts are integrity-protected from the agent's LLM (Spec, Autonomous; Security and Privacy, Double Spend).
9. **Release the payment credential only against a verified closed Payment Mandate** (Security and Privacy, Payment Credential Theft; Spec, Verification).
10. **Disclose the minimum.** Present only the open-mandate disclosures needed for the closed mandate, and salt every SD-JWT digest with enough entropy (Spec, Autonomous; Security and Privacy, Privacy Considerations).

## Workflow

1. **Pick the version.** Use AP2 v0.2. If a peer speaks AP2 v0.1, plan an upgrade rather than authoring v0.1 payloads.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target is AP2 v0.2, and every v0.1 peer is listed with its upgrade path.
2. **Pick roles and the trust model.** Decide which roles each party plays, which roles are agentic, and whether verifiers trust a User Credential issuer or the Agent Provider.
   -> [`references/roles-and-flows.md`](references/roles-and-flows.md), [`references/mandates-and-credentials.md`](references/mandates-and-credentials.md)
   ✓ Every role has a named owner, the Trusted Surface is deterministic code or a wallet, and each verifier knows which keys or trust list it accepts.
3. **Build mandate content.** Shopping Agent: get the Merchant's signed Checkout JWT, choose an instrument from the Credential Provider, and assemble closed (Human Present) or open (Human Not Present) Checkout and Payment Mandate Content with the right constraints.
   -> [`references/mandates-and-credentials.md`](references/mandates-and-credentials.md)
   ✓ `vct` values carry the version suffix, amounts are integer minor units with ISO 4217 codes, open mandates have `cnf` and a short `exp`, and the Payment Mandate references its checkout.
4. **Obtain user-signed mandates.** Render the content on the Trusted Surface, authenticate the user, and sign, through OpenID4VP `transaction_data` of type `delegate` or through the Agent Provider's key.
   -> [`references/mandates-and-credentials.md`](references/mandates-and-credentials.md)
   ✓ The agent receives SD-JWT mandates it could not have forged, and the user saw exactly the content that was signed.
5. **Present and verify.** Send the Payment Mandate to the Credential Provider (and network), the Checkout Mandate and payment token to the Merchant, and let the Merchant Payment Processor check the token's scope. Each verifier runs its rules and returns a receipt.
   -> [`references/roles-and-flows.md`](references/roles-and-flows.md)
   ✓ The Merchant checks `checkout_hash` against the latest Checkout JWT; the Credential Provider checks the Payment Mandate and constraints; failures return receipts with `invalid_credential`, `unresolved_constraint`, `invalid_mandate` or `mandates_not_supported`.
6. **Close the loop.** Store mandates in compact serialization with their receipts, shrink or retire open mandates after use, and keep the evidence needed for disputes.
   -> [`references/roles-and-flows.md`](references/roles-and-flows.md)
   ✓ A dispute reviewer can recompute `checkout_hash`, `sd_hash` and both receipt `reference` values from stored data.
7. **Wire it into the commerce protocol.** Carry AP2 over UCP, A2A or MCP, and decide how to treat v0.1 peers and neighbouring protocols.
   -> [`references/a2a-mcp-ucp-and-v0-1.md`](references/a2a-mcp-ucp-and-v0-1.md), [`references/adjacent-protocols.md`](references/adjacent-protocols.md)
   ✓ The transport binding is documented, and v0.1 Intent or Cart Mandates are not mixed into a v0.2 verifier.
8. **Upgrade** (only when asked). Move a v0.1 integration to v0.2 with the upgrade checklist.
   -> [`references/versions.md`](references/versions.md), [`references/a2a-mcp-ucp-and-v0-1.md`](references/a2a-mcp-ucp-and-v0-1.md)
   ✓ The upgraded flow verifies under v0.2 rules and authorizes the same purchase, amount and payee as before.

## Verify before done

- [ ] No verification, signing decision or constraint evaluation depends on LLM output; the agent key is used only through deterministic code that checks the closed mandate first (Implementation Considerations, Agent Key).
- [ ] `checkout_hash` and `transaction_id` are base64url hashes of the exact `checkout_jwt` string, with the SD-JWT `_sd_alg` or `sha-256` (Checkout Mandate, Mandate Schema; Implementation Considerations, Hashes).
- [ ] Open mandates include `cnf` and a short `exp`; closed mandates in autonomous mode are key-bound with `sd_hash`.
- [ ] Constraint evaluators exist for every constraint type used, and unknown types fail.
- [ ] Merchants return Checkout Receipts and processors return Payment Receipts for both success and error.
- [ ] Payment credentials are released only after Payment Mandate verification, and are scoped to the checkout.
- [ ] Mandates and receipts are stored for dispute evidence, and users can see and end active mandates (Implementation Considerations, Mandate Management).

## Reference index

- **`references/versions.md`**: AP2 v0.2 and AP2 v0.1 with their status, which one to use, what changed, the 0.1 to 0.2 upgrade checklist, and why no preview is listed. Load for steps 1 and 8.
- **`references/mandates-and-credentials.md`**: the Agent Authorization model, open and closed mandates, SD-JWT structure, OpenID4VP delegation, the Checkout and Payment Mandate schemas, every constraint type, receipts, errors and a TypeScript verification sketch. Load for steps 2 to 5.
- **`references/roles-and-flows.md`**: the five roles, agentic versus non-agentic, Human Present and Human Not Present flows, verification per role, dispute checks, threats and mitigations. Load for steps 2, 5 and 6.
- **`references/a2a-mcp-ucp-and-v0-1.md`**: how AP2 sits with UCP, A2A and MCP, the v0.1 Intent, Cart and Payment Mandates and the v0.1 A2A extension. Load for steps 7 and 8, or when a peer still speaks v0.1.
- **`references/adjacent-protocols.md`**: the Visa Trusted Agent Protocol and the Agentic Commerce Protocol (ACP), compared with AP2. Load for step 7.

## Related skills

- `a2a` for the Agent2Agent protocol that AP2 v0.1 extended and v0.2 samples still use: `npx skills add ScaleDockHQ/scaledock-skills --skill a2a`.
- `web-bot-auth` for RFC 9421 agent request signatures, which the Visa Trusted Agent Protocol builds on: `npx skills add ScaleDockHQ/scaledock-skills --skill web-bot-auth`.
- `owasp-agentic` for reviewing the agent that holds payment authority: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-agentic`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Agent Payments Protocol (AP2) home](https://ap2-protocol.org/): Released, v0.2, checked 2026-10-02.
- [Agentic Payment Protocol (v0.2) specification](https://ap2-protocol.org/ap2/specification/): Released, v0.2 (identical to tag v0.2.0 and main e1ea56d), checked 2026-10-02. Draft posture: build.
- [Checkout Mandate](https://ap2-protocol.org/ap2/checkout_mandate/): Released, v0.2, checked 2026-10-02.
- [Payment Mandate](https://ap2-protocol.org/ap2/payment_mandate/): Released, v0.2, checked 2026-10-02.
- [Agent Authorization Framework](https://ap2-protocol.org/ap2/agent_authorization/): Released, v0.2, checked 2026-10-02.
- [Flow Examples](https://ap2-protocol.org/ap2/flows/): Released, v0.2 (non-normative), checked 2026-10-02.
- [Security and Privacy Considerations](https://ap2-protocol.org/ap2/security_and_privacy_considerations/): Released, v0.2, checked 2026-10-02.
- [Implementation Considerations](https://ap2-protocol.org/ap2/implementation_considerations/): Released, v0.2, checked 2026-10-02.
- [Executive Summary](https://ap2-protocol.org/overview/): Released, v0.2, checked 2026-10-02.
- [Glossary](https://ap2-protocol.org/glossary/): Released, v0.2, checked 2026-10-02.
- [FAQ](https://ap2-protocol.org/faq/): Released, v0.2, checked 2026-10-02.
- [AP2 v0.2.0 release](https://github.com/google-agentic-commerce/AP2/releases/tag/v0.2.0): Released, v0.2.0 (2026-04-28, commit b4587ac), checked 2026-10-02.
- [AP2 changelog](https://github.com/google-agentic-commerce/AP2/blob/main/CHANGELOG.md): Released, 0.1.0 (2025-09-16) and 0.2.0 (2026-04-28), checked 2026-10-05.
- [FIDO Alliance to Develop Standards for Trusted AI Agent Interactions](https://fidoalliance.org/fido-alliance-to-develop-standards-for-trusted-ai-agent-interactions/): Announcement (no specification text published), 2026-04-28, checked 2026-10-05. Draft posture: track.
- [AP2 v0.1 specification](https://raw.githubusercontent.com/google-agentic-commerce/AP2/v0.1.0/docs/specification.md): Released (superseded by v0.2), v0.1.0 (2025-09-16), checked 2026-10-02. Draft posture: track.
- [A2A Extension for AP2 (v0.1)](https://raw.githubusercontent.com/google-agentic-commerce/AP2/v0.1.0/docs/a2a-extension.md): v0.1-alpha (superseded), tag v0.1.0, checked 2026-10-02. Draft posture: track.
- [AP2, A2A, and MCP (v0.1)](https://raw.githubusercontent.com/google-agentic-commerce/AP2/v0.1.0/docs/topics/ap2-a2a-and-mcp.md): Released (superseded by v0.2), tag v0.1.0, checked 2026-10-02.
- [AP2 sample merchant Agent Card](https://raw.githubusercontent.com/google-agentic-commerce/AP2/v0.2.0/code/samples/python/src/roles/merchant_agent/agent.json): Sample code (non-normative), tag v0.2.0, checked 2026-10-02.
- [UCP and AP2](https://ucp.dev/documentation/ucp-and-ap2/): Documentation, as published, checked 2026-10-02.
- [Visa Trusted Agent Protocol overview](https://developer.visa.com/capabilities/trusted-agent-protocol): In development and deployment (per Visa), unversioned page, checked 2026-10-02.
- [Visa Trusted Agent Protocol merchant specifications](https://developer.visa.com/capabilities/trusted-agent-protocol/trusted-agent-protocol-specifications): In development and deployment (per Visa), unversioned page, checked 2026-10-02.
- [Visa Trusted Agent Protocol sample repository README](https://raw.githubusercontent.com/visa/trusted-agent-protocol/16d59bdf3f8a542bc538d0962edbb80ea30a02af/README.md): Sample implementation, commit 16d59bd (2025-10-28), checked 2026-10-02.
- [Agentic Commerce Protocol README](https://raw.githubusercontent.com/agentic-commerce-protocol/agentic-commerce-protocol/7fdd78df677a94dce04c770644b0fbbb1401272b/README.md): Beta, latest stable 2026-04-17, commit 7fdd78d, checked 2026-10-02.
- [ACP changelog 2026-04-17](https://raw.githubusercontent.com/agentic-commerce-protocol/agentic-commerce-protocol/7fdd78df677a94dce04c770644b0fbbb1401272b/changelog/2026-04-17.md): Released, API version 2026-04-17, checked 2026-10-02.
- [ACP RFC: Agentic Checkout](https://raw.githubusercontent.com/agentic-commerce-protocol/agentic-commerce-protocol/7fdd78df677a94dce04c770644b0fbbb1401272b/rfcs/rfc.agentic_checkout.md): Draft, Version 2026-01-16 (commit 7fdd78d), checked 2026-10-02.
- [ACP RFC: Delegate Payment](https://raw.githubusercontent.com/agentic-commerce-protocol/agentic-commerce-protocol/7fdd78df677a94dce04c770644b0fbbb1401272b/rfcs/rfc.delegate_payment.md): Draft, Version 2025-09-29 (commit 7fdd78d), checked 2026-10-02.
- [ACP MCP transport binding](https://raw.githubusercontent.com/agentic-commerce-protocol/agentic-commerce-protocol/7fdd78df677a94dce04c770644b0fbbb1401272b/docs/mcp-binding.md): Repository document, commit 7fdd78d, checked 2026-10-02.
