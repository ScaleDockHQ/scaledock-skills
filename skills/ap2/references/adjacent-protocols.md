# Adjacent protocols: Visa Trusted Agent Protocol and ACP

Two other agentic commerce protocols are often compared with AP2. This file covers only what their published pages and repositories say. AP2 does not reference either of them normatively.

## Visa Trusted Agent Protocol (TAP)

**What it is.** A Visa protocol that lets merchants and their site protection providers (CDNs, bot management) recognise an approved agent with commerce intent, especially an agent the merchant does not already know (TAP specifications, Introduction). Visa describes the product as "in the process of development and deployment" (TAP overview). Accessing the specification page is subject to Visa's Trusted Agent Protocol Product Terms, and the sample repository is under the Visa Developer Center terms rather than an open-source license (TAP sample README, LICENSE).

**Interactions.** Browsing (product details, availability, final cost) and payment (TAP specifications, Introduction).

**Trust model.** Three signatures, all linked by the same `nonce` (TAP specifications, Trust Model):

1. **Agent recognition signature** in the message header, an RFC 9421 HTTP Message Signature "aligned with web-bot-auth". Sent on both browsing and payment.
2. **Agentic Consumer Recognition Object** in the request body: `nonce`, `idToken` (a JWT), `contextualData` (device and location identifiers), `kid`, `alg` and `signature`, signed with the same key as the message signature.
3. **Agentic Payment Container** in the request body: at least `nonce`, `kid`, `alg` and `signature`, plus payment data that depends on how the merchant takes payment. Examples are a hash of the credential for key entry, a full payment object for network tokens, or a payment IOU after an HTTP 402 response.

**Message signature profile** (TAP specifications, Required Message Signature Fields):

- Covered components `@authority` and `@path`.
- Parameters `created`, `expires`, `keyid`, `alg`, `nonce` (a session identifier) and `tag`.
- `tag` is `agent-browser-auth` for browsing or `agent-payer-auth` for payment.

```http
Signature-Input: sig2=("@authority" "@path"); created=1735689600; keyid="poqkLGiymh_W0uP6PZFw-dvez3QJT5SolqXBCW38r0U"; alg="Ed25519"; expires=1735693200; nonce="e8N7S2MF..."; tag="agent-browser-auth"
Signature: sig2=:jdq0SqOwHdyHr9+r5jw3iYZH6aNGKijYp/EstF4RQTQdi5N5YYKrD+mCT1HA1nZDsi6nJKuHxUi/5Syp3rLWBA==:
```

**Merchant verification steps** (TAP specifications, Verification Steps):

- Without one of the two tags, treat the request as not from a trusted agent.
- Block when a required field is missing.
- Block when the window between `created` and `expires` exceeds 8 minutes, when `created` is not in the past, or when `expires` is not in the future.
- Block a `nonce` seen in the last 8 minutes.
- Block when the key cannot be retrieved or has expired.
- Block when the signature fails.

Body objects that fail verification "may be inaccurate"; the merchant decides whether to use them.

**Keys.** Visa publishes keys at `https://mcp.visa.com/.well-known/jwks`, selected by `kid` or `keyid` (TAP specifications, Public Keys Retrieval Service).

**Compared with AP2.**

- TAP proves which agent is calling and carries consumer and payment data to the merchant.
- AP2 proves what the user authorised, through user-signed mandates checked by the merchant, the credential provider and the processor.
- TAP uses the tag values above, not `web-bot-auth`, and resolves keys from a scheme-hosted JWKS rather than a `Signature-Agent` directory. Use the `web-bot-auth` skill for the IETF profile.

## Agentic Commerce Protocol (ACP)

**What it is.** "An interaction model and open standard for connecting buyers, their AI agents, and businesses to complete purchases". It is maintained by OpenAI and Stripe, is in beta, and is licensed Apache-2.0 (ACP README). Versions are dates; the latest stable at the pinned commit is `2026-04-17`, which deprecated `2026-01-30` (ACP README, Versioning; ACP changelog 2026-04-17).

**Agentic Checkout** (ACP RFC Agentic Checkout, status Draft, version 2026-01-16). The merchant stays the system of record, and payments run on the merchant's PSP (introduction). Endpoints (§ 2.2):

- `POST /checkout_sessions` creates a session.
- `POST /checkout_sessions/{id}` updates it.
- `GET /checkout_sessions/{id}` retrieves it.
- `POST /checkout_sessions/{id}/complete` completes it and must create an order.
- `POST /checkout_sessions/{id}/cancel` cancels it.

Requirements:

- HTTPS and JSON, with integer minor-unit amounts (§ 3.1).
- `Authorization: Bearer` and `API-Version` are required on requests (§ 3.1).
- `Idempotency-Key` is required on every POST. Replays with the same body return the original response; 5xx responses are not cached; keys are kept for at least 24 hours (§ 6).
- When 3DS is needed the session status is `authentication_required`, and the client must send `authentication_result` on complete (§ 4.4).
- Seller markdown must be CommonMark 0.31.2 without raw HTML (§ 5.1).
- Order updates go to a webhook (§ 2.3).

**Delegate Payment** (ACP RFC Delegate Payment, status Draft, version 2025-09-29). One required endpoint, `POST /agentic_commerce/delegate_payment`, issues a delegated vault token for a card (§ 1, § 3.1):

- The request is signed: a detached signature over canonical JSON goes in `Signature`, with `Timestamp` and `Idempotency-Key` (§ 2.2).
- The token is usable only within its `allowance`: `reason` `one_time`, `max_amount` in minor units, `currency` and `expires_at`. It is invalid at or after `expires_at` (§ 2.5, § 3.5).

**MCP binding** (ACP MCP transport binding). MCP is a second transport alongside REST: JSON-RPC 2.0 over MCP Streamable HTTP at a single endpoint, with one tool per REST operation (`create_checkout_session`, `get_checkout_session`, `update_checkout_session`, `complete_checkout_session`, `cancel_checkout_session`). Sellers advertise `"mcp"` in the `transports` array of `/.well-known/acp.json`.

**Compared with AP2.**

- ACP defines the checkout API and the payment-token handoff between an agent platform and a merchant. User authorisation is expressed through the platform's session and the token's allowance.
- AP2 defines no checkout API. It adds portable, user-signed mandates that downstream verifiers check independently, including in autonomous mode.
- The fetched ACP documents do not mention AP2, and the AP2 v0.2 pages do not mention ACP.
