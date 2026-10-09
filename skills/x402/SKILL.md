---
name: x402
description: >-
  x402 v2 payment protocol: HTTP 402 Payment Required for agent and machine
  payments. Build and review resource servers, clients and facilitators for
  x402 v2 (current), and upgrade from x402 v1 (legacy). Covers PaymentRequired
  and accepts[], PaymentRequirements, PaymentPayload, SettlementResponse, the
  PAYMENT-REQUIRED, PAYMENT-SIGNATURE and PAYMENT-RESPONSE headers (v1
  X-PAYMENT and X-PAYMENT-RESPONSE), CAIP-2 networks, the exact, upto,
  batch-settlement and auth-capture schemes, payment flows (authorization,
  upfront, escrow), facilitator /verify, /settle and /supported, Bazaar
  discovery and extensions, MCP and A2A transports, and replay, amount and
  expiry security. Use when adding pay-per-request pricing to an API or MCP
  tool, making an agent pay a 402, running a facilitator, or migrating v1 to
  v2. Triggers: x402, HTTP 402, payment required, X-PAYMENT, PAYMENT-SIGNATURE,
  x402Version, facilitator, EIP-3009, Permit2, upto, bazaar.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.2"
  kind: standard
---

# x402

x402 is an open standard for internet-native payments, maintained in the x402 Foundation repository. It revives HTTP 402: a resource server answers with payment requirements, the client retries with a signed payment, and a facilitator verifies and settles it on a payment network. With this skill the agent builds and reviews x402 resource servers, clients and facilitators over HTTP, MCP and A2A.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: resource server (seller), client (buyer or agent), facilitator, or a server that self-facilitates.
- Transport: HTTP (default), MCP tools, or A2A tasks.
- Scheme and network: `exact`, `upto`, `batch-settlement` or `auth-capture`, on which CAIP-2 networks and assets.
- Payment flow: `authorization` (default), `upfront` or `escrow`, as the scheme's network binding allows.
- Target version: x402 v2 (default). x402 v1 is legacy: read it and upgrade from it, never author it. No preview exists. See [`references/versions.md`](references/versions.md).
- Revision: the pinned commit in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, list `specs/` and `specs/schemes/` in the repository for new scheme bindings or a new `x402-specification-v3.md`, and update the pins.

## Invariants

1. **Version marker.** `x402Version` is `2` in `PaymentRequired`, `PaymentPayload` and facilitator requests (v2 § 5.1.2, § 5.2.2, § 7.1).
2. **Complete requirements.** `PaymentRequired` has `resource` and `accepts`. Each entry has `scheme`, a CAIP-2 `network`, `amount` as a string of atomic units, `asset`, `payTo` and `maxTimeoutSeconds` (v2 § 5.1.2, § 11.1).
3. **HTTP wire.** Answer with 402 and a base64 `PAYMENT-REQUIRED` header. The client pays with a base64 `PAYMENT-SIGNATURE` header, and the server returns a base64 `PAYMENT-RESPONSE` header (HTTP transport v2).
4. **Echo, don't edit.** `PaymentPayload.accepted` is the chosen `accepts[]` entry. Clients echo `extensions` and may only append, never delete or overwrite (v2 § 5.1.2, § 5.2.2).
5. **Flow ordering.** At least one verify or settle runs before the resource executes. A flow other than `authorization` is declared in `extra.paymentFlow`. Servers reject unsupported flows, and clients never pay into a flow they do not recognise (v2 § 6.1).
6. **Read-only verify.** `/verify` MUST NOT commit payment state or write onchain (v2 § 7.1). Only `/settle` gives finality (v2 § 7.2).
7. **Honest settlement results.** `transaction` is required: empty when nothing was broadcast, non-empty with `settlement_pending`, which is non-terminal (v2 § 5.3.2, § 9).
8. **`upto` caps.** The settled amount is ≤ the signed maximum. The facilitator re-verifies the signature against the signed maximum, not the settle-time `amount` (scheme_upto.md, properties 4 and 5).
9. **Replay.** The network's replay primitive is authoritative, and a consumed primitive fails settlement. Payloads whose resubmission looks the same as the original are deduplicated atomically across all settle processes (scheme_exact.md; v2 § 10.1).
10. **Trust minimisation.** Neither facilitator nor server can move funds other than as the client intended. The signed payment binds the amount and the recipient (README, Principles; scheme_exact_evm.md, Summary).
11. **No sidechannel leaks.** Facilitator extension responses (`EXTENSION-RESPONSES`) are never forwarded to buyers (v2 § 7.2.1).
12. **MCP shape.** Payment required is a tool result with `isError: true`, carrying `PaymentRequired` in `structuredContent` and `content[0].text`. The payment travels in `_meta["x402/payment"]` and the settlement in `_meta["x402/payment-response"]` (MCP transport v2).

## Workflow

1. **Pick the version.** Use x402 v2. If the code or a counterparty uses `X-PAYMENT`, network names like `base-sepolia` or `maxAmountRequired`, it is v1: plan the upgrade (step 9).
   -> [`references/versions.md`](references/versions.md)
   ✓ `x402Version: 2` everywhere new; any v1 path is input-only and keyed on `x402Version: 1`.
2. **Pick scheme, network and flow.** Match the pricing model to a scheme, and read the network binding for each `(scheme, network)` pair you offer.
   -> [`references/schemes-and-networks.md`](references/schemes-and-networks.md)
   ✓ Every pair you will put in `accepts[]` is listed in the facilitator's `/supported` `kinds`, and every non-default flow is named in `extra.paymentFlow`.
3. **Server: build `PaymentRequired`.** Fill in `resource` (`ResourceInfo`), one `accepts[]` entry per acceptable payment, the scheme's `extra` keys, and any `extensions` such as `bazaar`.
   -> [`references/payment-flow.md`](references/payment-flow.md)
   ✓ The decoded `PAYMENT-REQUIRED` header (or MCP `structuredContent`, or A2A `x402.payment.required`) matches the v2 § 5.1 shape. Amounts are atomic-unit strings.
4. **Client: select and pay.** Filter `accepts[]` to the schemes, networks and flows you support. Check the price against your budget, build `payload` per the binding, copy the entry into `accepted`, echo `extensions`, then retry.
   -> [`references/payment-flow.md`](references/payment-flow.md)
   ✓ Unknown `paymentFlow` entries are skipped. The payment travels in `PAYMENT-SIGNATURE`, `_meta["x402/payment"]` or `x402.payment.payload`.
5. **Server: verify, execute, settle.** Follow the resolved flow's ordering. Call `/verify` with the payload and your requirements, run the handler, then call `/settle`. For `upto`, send the actual charge as `amount` at settle.
   -> [`references/facilitator.md`](references/facilitator.md)
   ✓ No handler runs before a verify or settle succeeds. A handler failure under `authorization` leaves the client uncharged.
6. **Return the result.** Send `SettlementResponse` in `PAYMENT-RESPONSE` (or the transport equivalent). Map errors to 400, 402 or 500, and handle `settlement_pending` by reconciling on chain.
   -> [`references/payment-flow.md`](references/payment-flow.md)
   ✓ A failed settlement returns 402 with `success: false`. MCP returns no tool content after a failed settlement.
7. **Facilitator (if that is your role).** Implement `/verify`, `/settle` and `/supported`, the per-binding checks, and the error codes. Expose discovery and extensions if you offer them.
   -> [`references/facilitator.md`](references/facilitator.md)
   ✓ `/verify` writes nothing. `/supported` lists `kinds`, `extensions` and `signers`. Every binding MUST is enforced.
8. **Review security.** Check replay, double delivery, amounts, expiry windows, sponsor safety and information exposure.
   -> [`references/security.md`](references/security.md)
   ✓ Every item in "Verify before done" holds, including concurrent duplicate submissions.
9. **Upgrade** (only when asked). Follow the x402 v1 to x402 v2 checklist: version marker, CAIP-2 networks, `amount`, `ResourceInfo`, `accepted`, and the new headers.
   -> [`references/versions.md`](references/versions.md)
   ✓ The same price, asset and recipient as before, now on the v2 wire, and v1 clients still served until they migrate.

## Verify before done

- [ ] Every new message has `x402Version: 2`, and networks are CAIP-2 (v2 § 5, § 11.1).
- [ ] The 402 carries `PAYMENT-REQUIRED`, payments arrive in `PAYMENT-SIGNATURE`, and results leave in `PAYMENT-RESPONSE`, each base64 JSON that decodes to the v2 type (HTTP transport v2).
- [ ] `amount` is an atomic-unit string, and each `accepts[]` entry has all six required fields (v2 § 5.1.2).
- [ ] A non-`authorization` flow sets `extra.paymentFlow`. A check runs before the resource, and `/verify` writes nothing (v2 § 6.1, § 7.1).
- [ ] The facilitator compares the payload against the server's requirements: amount, `payTo`, asset, network, validity window and signature (scheme bindings).
- [ ] `upto` settles ≤ the signed maximum, and re-verifies against the signed maximum (scheme_upto.md).
- [ ] Replaying a settled payload fails, and two concurrent submissions of one payload deliver one resource (scheme_exact.md).
- [ ] `settlement_pending` is reconciled on chain before any retry (v2 § 9).
- [ ] No extension responses or internal details reach the client (v2 § 7.2.1).
- [ ] MCP and A2A, when used, follow their transport shapes (transports-v2).
- [ ] No single facilitator is hard-wired. The facilitator URL and the networks are configuration, because the standard never forces reliance on a single party (README, Principles).

## Reference index

- **`references/versions.md`**: x402 v2 and x402 v1 with their status, what v2 changed, and the v1 to v2 upgrade checklist with the network name mapping. Load for steps 1 and 9.
- **`references/payment-flow.md`**: the `PaymentRequired`, `PaymentRequirements`, `ResourceInfo`, `PaymentPayload` and `SettlementResponse` fields, the payment flows, client selection, and the HTTP, MCP and A2A transports. Load for steps 3, 4 and 6.
- **`references/schemes-and-networks.md`**: CAIP-2 networks, `exact` with its EVM and SVM bindings, `upto`, `batch-settlement`, `auth-capture`, and choosing a scheme. Load for step 2.
- **`references/facilitator.md`**: `/verify`, `/settle`, `/supported`, the extension sidechannel, error codes, Bazaar discovery and the extensions. Load for steps 5 and 7.
- **`references/security.md`**: trust model, replay and nonces, amounts, expiry, ordering, sponsor safety, exposure and common mistakes. Load for step 8.

## Related skills

- `http-semantics` for the 402 status code, headers and retries: `npx skills add ScaleDockHQ/scaledock-skills --skill http-semantics`.
- `mcp` for the Model Context Protocol tool results and `_meta` that the MCP transport uses: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp`.
- `a2a` for the Agent2Agent tasks, metadata and extensions that the A2A transport uses: `npx skills add ScaleDockHQ/scaledock-skills --skill a2a`.
- `ap2` for agent payment mandates: `npx skills add ScaleDockHQ/scaledock-skills --skill ap2`.
- `agentic-commerce-protocol` for agent checkout flows: `npx skills add ScaleDockHQ/scaledock-skills --skill agentic-commerce-protocol`.
- `ucp` for the Universal Commerce Protocol: `npx skills add ScaleDockHQ/scaledock-skills --skill ucp`.
- `ethereum-eips`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill ethereum-eips`
- `machine-payments-protocol` for the Machine Payments Protocol, another HTTP 402 payment protocol for agents: `npx skills add ScaleDockHQ/scaledock-skills --skill machine-payments-protocol`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read. GitHub sources are pinned to commit `cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71` on `main` of `x402-foundation/x402`.

- [x402 Protocol Specification v2](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/x402-specification-v2.md): Protocol Version 2, spec v2.0 (2025-12-09), checked 2026-10-05.
- [x402 Transport: HTTP (v2)](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/transports-v2/http.md): Protocol Version 2, checked 2026-10-05.
- [x402 Transport: MCP (v2)](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/transports-v2/mcp.md): Protocol Version 2, checked 2026-10-05.
- [x402 Transport: A2A (v2)](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/transports-v2/a2a.md): Protocol Version 2, checked 2026-10-05.
- [x402 Protocol Specification v1](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/x402-specification-v1.md): Protocol Version 1, spec v0.2 (2025-10-03), checked 2026-10-05.
- [x402 Transport: HTTP (v1)](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/transports-v1/http.md): Protocol Version 1, checked 2026-10-05.
- [x402 Transport: MCP (v1)](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/transports-v1/mcp.md): Protocol Version 1, checked 2026-10-05.
- [Scheme: exact](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/schemes/exact/scheme_exact.md): scheme specification, checked 2026-10-05.
- [Scheme: exact on EVM](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/schemes/exact/scheme_exact_evm.md): network binding, checked 2026-10-05.
- [Scheme: exact on SVM](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/schemes/exact/scheme_exact_svm.md): network binding, checked 2026-10-05.
- [Scheme: upto](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/schemes/upto/scheme_upto.md): scheme specification, checked 2026-10-05.
- [Scheme: upto on EVM](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/schemes/upto/scheme_upto_evm.md): network binding, checked 2026-10-05.
- [Scheme: upto on SVM](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/schemes/upto/scheme_upto_svm.md): network binding, checked 2026-10-05.
- [Scheme: batch-settlement](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/schemes/batch-settlement/scheme_batch_settlement.md): scheme specification, checked 2026-10-05.
- [Scheme: auth-capture](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/schemes/auth-capture/scheme_auth_capture.md): scheme specification, v1.1 (2026-08-18), checked 2026-10-05.
- [Extension: bazaar](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/extensions/bazaar.md): extension specification, checked 2026-10-05.
- [Extension: payment-identifier](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/extensions/payment_identifier.md): extension specification, checked 2026-10-05.
- [x402 repository README](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/README.md): principles and typical flow, checked 2026-10-05.
- [Legacy v1 package notice](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/typescript/packages/legacy/x402/README.md): Deprecated (v1), security patches only, checked 2026-10-05.
- [Migration Guide: V1 to V2](https://docs.x402.org/guides/migration-v1-to-v2): documentation, checked 2026-10-05.
- [x402.org](https://x402.org): project site, checked 2026-10-05.
