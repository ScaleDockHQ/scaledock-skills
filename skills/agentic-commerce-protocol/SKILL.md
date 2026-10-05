---
name: agentic-commerce-protocol
description: >-
  Agentic Commerce Protocol (ACP) 2026-04-17: build and review agent checkouts with merchants and delegated payment
  tokens. Covers Agentic Checkout (create, update, retrieve, complete and cancel checkout_sessions, status,
  line_items, fulfillment options, totals in minor units, messages, capability negotiation, payment handlers, 3DS),
  Delegate Payment (vault tokens with one_time allowances and risk signals), order webhooks signed with
  Merchant-Signature, the Error model, Idempotency-Key, API-Version, Signature and Timestamp headers,
  /.well-known/acp.json discovery and the MCP binding. Targets ACP 2026-04-17; upgrades from 2026-01-30, 2026-01-16, 2025-12-12 and 2025-09-29, and tracks
  spec/unreleased. Use when an AI agent must buy from a merchant, a merchant exposes checkout to agents, or a payment
  provider vaults agent payment credentials. Triggers: acp, agentic commerce, agentic checkout, delegate payment,
  checkout_sessions, agenticcommerce.dev.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Agentic Commerce Protocol (ACP)

The Agentic Commerce Protocol is an open, Apache 2.0 specification, published in the `agentic-commerce-protocol/agentic-commerce-protocol` repository and at agenticcommerce.dev, that lets an AI agent check out with a merchant for a buyer: the merchant exposes checkout session endpoints and stays the merchant of record, and a payment service provider (PSP) issues a delegated, allowance-bound token for the buyer's card. The repository marks the protocol `beta`. This skill pins ACP 2026-04-17 at commit 7fdd78d and produces a merchant endpoint, an agent client, a Delegate Payment service or a review that meets its MUST-level rules.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. RFC rules cite the RFC and section (for example "Checkout RFC §6.1"); schema rules name the schema in the pinned OpenAPI or JSON Schema file (for example "checkout schema `Error`"). When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: merchant (serves checkout endpoints and sends order webhooks), agent (calls checkout, calls Delegate Payment, receives webhooks), or payment service provider (serves Delegate Payment). A seller platform hosting many merchants plays the merchant role for each.
- Surfaces: Agentic Checkout, Delegate Payment, order webhooks, and optionally discovery (`/.well-known/acp.json`), carts and the MCP binding.
- Payment handlers: which handlers the merchant advertises (for example `dev.acp.tokenized.card`), and whether each sets `requires_delegate_payment`.
- Interventions: whether 3DS or other interventions can be required, and what the agent can display.
- Target version: ACP 2026-04-17 (current, the default). ACP 2026-01-30, ACP 2026-01-16, ACP 2025-12-12 and ACP 2025-09-29 are legacy: each is deprecated by the next release, so read and upgrade from them, never author them. ACP unreleased (`spec/unreleased/`) is a preview (posture: track): never send it as `API-Version`. Agentic Checkout and Delegate Payment share the one API version. See [`references/versions.md`](references/versions.md).
- Revision: the pinned commit in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, list `spec/` and `changelog/` in the repository for a new dated folder, read its changelog and `changelog/unreleased/`, then re-read every URL in [Sources](#sources). Update the pins and bump the version.

## Invariants

1. **Version on every request.** Clients **MUST** send `API-Version`, and servers **MUST** validate it; rejections **SHOULD** be `400` with `supported_versions` (Checkout RFC §2.1; Delegate Payment RFC §2.1).
2. **Bearer auth over TLS 1.3.** `Authorization: Bearer <token>` is required, all endpoints **MUST** use HTTPS and JSON, and TLS 1.3 **MUST** be used (Checkout RFC §3.1 and §7; Delegate Payment RFC §6).
3. **Idempotency on every POST.** Clients **MUST** send `Idempotency-Key`; servers scope it to identity plus path, reject a missing key with `400 idempotency_key_required`, replay identical bodies with the original status, answer `422 idempotency_conflict` and `409 idempotency_in_flight`, never cache 5xx, and keep keys at least 24 hours (Checkout RFC §6; Delegate Payment RFC §5).
4. **No double side effects.** A replay **MUST NOT** re-execute payment capture, inventory reservation or vault token creation (Checkout RFC §6.3; Delegate Payment RFC §5.3).
5. **Authoritative state.** Every checkout response returns the full session; create returns `201`, and complete **MUST** create an order and return `status: completed` with `order.id`, `checkout_session_id` and `permalink_url` (Checkout RFC §2.2 and §4.4).
6. **Integer minor units.** All amounts **MUST** be integers in minor units (Checkout RFC §3.1).
7. **Capabilities both ways.** Agents **MUST** send `capabilities` on create; merchants **MUST** return them on every session with the intersection of `interventions.supported`, and **MUST NOT** rely only on agent-declared capabilities for security (Capability Negotiation RFC §6.2 and §7.1).
8. **3DS is not skippable.** In `authentication_required`, the agent **MUST** send `authentication_result` on complete; without it the merchant **MUST** return 4XX `requires_3ds` with `param: $.authentication_result` (Checkout RFC §4.4).
9. **Tokens stay inside the allowance.** A delegated token **MUST ONLY** be usable within its `one_time` allowance (`max_amount`, `currency`, `checkout_session_id`, `merchant_id`) and **MUST** be invalid at or after `expires_at` (Delegate Payment RFC §2.5 and §3.5).
10. **No card data in logs.** Card handling **MUST** follow PCI DSS, and logs **MUST NOT** contain full PAN or CVC (Delegate Payment RFC §6; Checkout RFC §7).
11. **Flat errors.** Errors are flat `{type, code, message, param?}` objects, never wrapped (Checkout RFC §3.1; Delegate Payment RFC §2.6).
12. **Signed, full-order webhooks.** Order events **MUST** carry `Merchant-Signature: t=<unix_seconds>,v1=<hex>` (HMAC-SHA256 over `timestamp.raw_body`) and the full `Order`; receivers return 401 on any signature failure and **MUST** accept unknown event types (Webhooks OpenAPI, `postOrderEvents`, `WebhookEvent`).
13. **Safe markdown.** `markdown` content **MUST** be CommonMark 0.31.2 without raw HTML, and agents **MUST** render with raw HTML disabled or sanitized (Checkout RFC §5.1).

## Workflow

1. **Pick the version and role.** Confirm the role, surfaces and target from Inputs; record the peers' versions.
   -> [`references/versions.md`](references/versions.md)
   ✓ The design names ACP 2026-04-17 and the pinned commit, and no legacy or unreleased shapes are emitted.
2. **Build the HTTP layer.** Add Bearer auth, `API-Version` validation with `supported_versions`, idempotency middleware, `Request-Id` echo, optional `Signature` and `Timestamp` verification, and TLS 1.3.
   -> [`references/security-and-headers.md`](references/security-and-headers.md)
   ✓ A POST without `Idempotency-Key` gets 400; the same key with a different body gets 422; a wrong version gets 400 with `supported_versions`.
3. **Implement the checkout session.** Create, update, retrieve, complete and cancel, returning the full session with status, line items, totals, fulfillment options, messages, links and capabilities.
   -> [`references/checkout.md`](references/checkout.md)
   ✓ Every response validates against the 2026-04-17 `CheckoutSession` schema, and the agent can render it without computing anything.
4. **Negotiate capabilities and payment handlers.** Intersect interventions, advertise `capabilities.payment.handlers[]` with `psp` and `config.merchant_id`, and accept `payment_data` with `handler_id` and `instrument`.
   -> [`references/checkout.md`](references/checkout.md)
   ✓ An agent that cannot do a required intervention gets `intervention_required` before payment.
5. **Delegate the payment.** For handlers with `requires_delegate_payment`, the agent calls `/agentic_commerce/delegate_payment` with the card, allowance and risk signals; the PSP returns `201` with a token; the merchant redeems it on complete.
   -> [`references/delegate-payment.md`](references/delegate-payment.md)
   ✓ The allowance is `one_time` and names this `checkout_session_id` and the handler's `merchant_id`, and the token fails after `expires_at`.
6. **Handle authentication.** Return `authentication_required` with `authentication_metadata` when 3DS is needed; the agent returns `authentication_result` on complete.
   -> [`references/checkout.md`](references/checkout.md)
   ✓ A complete without `authentication_result` in that state gets `requires_3ds`.
7. **Emit and receive order webhooks.** Sign with `Merchant-Signature`, send the full `Order`, verify within the timestamp window.
   -> [`references/webhooks-and-errors.md`](references/webhooks-and-errors.md)
   ✓ A tampered body or a timestamp older than the window gets 401 `invalid_signature`.
8. **Map errors.** Choose `Error` versus `MessageError`, and the status codes, for every failure path; map to MCP `-32000` if the MCP binding is used.
   -> [`references/webhooks-and-errors.md`](references/webhooks-and-errors.md)
   ✓ No 2xx carries an `Error`, and no recoverable buyer problem is returned as a 4xx.
9. **Upgrade** (only when asked). Follow each checklist from the source version to ACP 2026-04-17.
   -> [`references/versions.md`](references/versions.md)
   ✓ The upgraded integration passes the Verify list below and charges the same amounts.

## Verify before done

- [ ] Requests and responses validate against the 2026-04-17 JSON Schema and OpenAPI files, and any disagreement between them is noted.
- [ ] `API-Version` is required; version errors return 400 with `supported_versions`, newest first.
- [ ] Every POST requires `Idempotency-Key`; replay returns the stored status and body with `Idempotent-Replayed: true`; 409 carries `Retry-After`; 5xx is not stored.
- [ ] Create returns 201; retrieve returns 404 for unknown ids; cancel returns 405 on completed or canceled sessions.
- [ ] Complete returns `status: completed` with `order.id`, `order.checkout_session_id` and `order.permalink_url`.
- [ ] All money fields are integers, and a `total` entry is present when calculable.
- [ ] `capabilities` is sent on create and returned on every session.
- [ ] Delegate Payment rejects any credential type other than `card`, requires the allowance fields, and returns `201` with `id`, `created` and `metadata`.
- [ ] No log, trace or error message contains a full PAN or CVC.
- [ ] Webhooks carry a valid `Merchant-Signature`, the receiver enforces the window, and `data` is a full `Order` with `type: "order"`.
- [ ] Markdown content is rejected or sanitized when it contains raw HTML.
- [ ] Nothing from `spec/unreleased/` is sent to a 2026-04-17 peer.

## Reference index

- **`references/versions.md`**: every ACP version with its status, why older versions are legacy, what each changed, upgrade checklists, and the unreleased preview. Load for steps 1 and 9.
- **`references/checkout.md`**: endpoints, the session object, status values, line items, fulfillment, totals, messages, capability negotiation, payment handlers, 3DS, cancel, orders, discovery, carts, the MCP binding, and schema drift.
- **`references/delegate-payment.md`**: roles, the request (card, allowance, risk signals, billing address), the response, token scope and expiry, errors, and common mistakes.
- **`references/security-and-headers.md`**: request and response headers, Bearer auth, `Signature` and `Timestamp`, version negotiation, the full idempotency rules, TLS and PCI, markdown safety, capability and discovery hardening.
- **`references/webhooks-and-errors.md`**: order webhook endpoint, `Merchant-Signature`, payload rules, `Error` versus `MessageError`, error types and codes, status codes, retries, and MCP error mapping.

## Related skills

- `ucp`, the Universal Commerce Protocol, another protocol for agent checkout: `npx skills add ScaleDockHQ/scaledock-skills --skill ucp`
- `ap2`, Agent Payments Protocol mandates for authorizing agent payments: `npx skills add ScaleDockHQ/scaledock-skills --skill ap2`
- `x402`, HTTP 402 payments for agents: `npx skills add ScaleDockHQ/scaledock-skills --skill x402`
- `openapi`, for reading and validating the ACP OpenAPI 3.1 files: `npx skills add ScaleDockHQ/scaledock-skills --skill openapi`
- `http-message-signatures`, RFC 9421 signatures, which ACP's own `Signature` header is not: `npx skills add ScaleDockHQ/scaledock-skills --skill http-message-signatures`
- `mcp-authorization`, for authenticating an ACP MCP server: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp-authorization`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Agentic Commerce Protocol repository](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol): Beta, main at 7fdd78d (2026-07-17); no tags or releases, checked 2026-10-05.
- [ACP 2026-04-17 specification](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/tree/7fdd78df677a94dce04c770644b0fbbb1401272b/spec/2026-04-17): Released (latest stable), OpenAPI 3.1, JSON Schema and OpenRPC at 7fdd78d, checked 2026-10-05.
- [ACP changelog 2026-04-17](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/7fdd78df677a94dce04c770644b0fbbb1401272b/changelog/2026-04-17.md): Released, 2026-04-17, checked 2026-10-05.
- [ACP 2026-01-30 specification](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/tree/7fdd78df677a94dce04c770644b0fbbb1401272b/spec/2026-01-30): Deprecated, 2026-01-30, checked 2026-10-05.
- [ACP changelog 2026-01-30](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/7fdd78df677a94dce04c770644b0fbbb1401272b/changelog/2026-01-30.md): Released, 2026-01-30, checked 2026-10-05.
- [ACP 2026-01-16 specification](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/tree/7fdd78df677a94dce04c770644b0fbbb1401272b/spec/2026-01-16): Superseded, 2026-01-16, checked 2026-10-05.
- [ACP changelog 2026-01-16](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/7fdd78df677a94dce04c770644b0fbbb1401272b/changelog/2026-01-16.md): Released, 2026-01-16, checked 2026-10-05.
- [ACP 2025-12-12 specification](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/tree/7fdd78df677a94dce04c770644b0fbbb1401272b/spec/2025-12-12): Deprecated, 2025-12-12, checked 2026-10-05.
- [ACP changelog 2025-12-12](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/7fdd78df677a94dce04c770644b0fbbb1401272b/changelog/2025-12-12.md): Released, 2025-12-12, checked 2026-10-05.
- [ACP 2025-09-29 specification](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/tree/7fdd78df677a94dce04c770644b0fbbb1401272b/spec/2025-09-29): Deprecated, 2025-09-29, checked 2026-10-05.
- [ACP changelog 2025-09-29](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/7fdd78df677a94dce04c770644b0fbbb1401272b/changelog/2025-09-29.md): Released, 2025-09-29, checked 2026-10-05.
- [ACP unreleased specification](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/tree/7fdd78df677a94dce04c770644b0fbbb1401272b/spec/unreleased): Unreleased, at 7fdd78d (2026-07-17); posture: track, checked 2026-10-05.
- [ACP unreleased changelog entries](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/tree/7fdd78df677a94dce04c770644b0fbbb1401272b/changelog/unreleased): Unreleased, at 7fdd78d; posture: track, checked 2026-10-05.
- [RFC: Agentic Checkout](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/7fdd78df677a94dce04c770644b0fbbb1401272b/rfcs/rfc.agentic_checkout.md): Draft, header 2026-01-16 (living document, includes the 2026-04-17 idempotency rules), checked 2026-10-05.
- [RFC: Delegate Payment](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/7fdd78df677a94dce04c770644b0fbbb1401272b/rfcs/rfc.delegate_payment.md): Draft, header 2025-09-29 (living document), checked 2026-10-05.
- [RFC: Capability Negotiation](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/7fdd78df677a94dce04c770644b0fbbb1401272b/rfcs/rfc.capability_negotiation.md): Proposal, header 2026-01-16, checked 2026-10-05.
- [RFC: Payment Handlers](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/7fdd78df677a94dce04c770644b0fbbb1401272b/rfcs/rfc.payment_handlers.md): Draft, header 2026-01-22, checked 2026-10-05.
- [RFC: Extensions](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/7fdd78df677a94dce04c770644b0fbbb1401272b/rfcs/rfc.extensions.md): Draft, header 2026-01-27, checked 2026-10-05.
- [RFC: Discovery](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/7fdd78df677a94dce04c770644b0fbbb1401272b/rfcs/rfc.discovery.md): Proposal, released in 2026-04-17, checked 2026-10-05.
- [RFC: Enhanced Order Support](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/7fdd78df677a94dce04c770644b0fbbb1401272b/rfcs/rfc.orders.md): Draft, header 2026-02-05, change log to 2026-04-30, checked 2026-10-05.
- [RFC: Cart](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/7fdd78df677a94dce04c770644b0fbbb1401272b/rfcs/rfc.cart.md): Proposal, released in 2026-04-17, checked 2026-10-05.
- [MCP Transport Binding for Agentic Checkout](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/7fdd78df677a94dce04c770644b0fbbb1401272b/docs/mcp-binding.md): Released in 2026-04-17, at 7fdd78d, checked 2026-10-05.
- [agenticcommerce.dev](https://www.agenticcommerce.dev): Project site, checked 2026-10-05.
- [agenticcommerce.dev: Checkout lifecycle](https://www.agenticcommerce.dev/docs/concepts/lifecycle): Documentation, describes the 2025-09-29 status set, checked 2026-10-05.
- [agenticcommerce.dev: Security](https://www.agenticcommerce.dev/docs/concepts/security): Documentation, checked 2026-10-05.
- [agenticcommerce.dev: Changelog](https://www.agenticcommerce.dev/docs/changelog): Documentation, lists releases to 2026-01-30 only, checked 2026-10-05.
