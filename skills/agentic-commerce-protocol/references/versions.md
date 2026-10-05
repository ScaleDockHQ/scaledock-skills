# Versions and upgrades

Read this when choosing which ACP API version to build to, reading an integration written for an older version, upgrading one, or checking what is coming in `spec/unreleased/`. Sources: the repository README (Versioning), the dated changelogs, the `spec/<version>/` OpenAPI and JSON Schema snapshots, and `changelog/unreleased/`, listed in [Sources](../SKILL.md#sources). Where a changelog is silent, the "What changed" lists come from comparing the JSON Schema snapshots of adjacent versions.

## Version lines

ACP uses date-based versions in `YYYY-MM-DD` form; each version is a complete snapshot of the specification under `spec/<version>/`, new work lands in `spec/unreleased/`, and older versions stay available but are marked deprecated in the changelog (README, Versioning). The repository has no git tags or GitHub releases; the dated folder and its `changelog/<version>.md` are the release.

| Id                   | Line           | Status  | Revision                                            | Posture | Summary                                                                                                       |
| -------------------- | -------------- | ------- | --------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `unreleased-preview` | ACP unreleased | preview | `spec/unreleased/` at 7fdd78d (2026-07-17)          | track   | Next version in progress: `fulfillment_details` on complete, `Item.url`, `Item.suggested_price`.              |
| `2026-04-17`         | ACP 2026-04-17 | current | `spec/2026-04-17/` at 7fdd78d (released 2026-04-17) |         | Mandatory idempotency, signed webhooks format, discovery, orders, carts, feeds, MCP binding.                  |
| `2026-01-30`         | ACP 2026-01-30 | legacy  | `spec/2026-01-30/` (released 2026-01-30)            |         | Capability negotiation, payment handlers, extensions and discounts; `items` became `line_items`.              |
| `2026-01-16`         | ACP 2026-01-16 | legacy  | `spec/2026-01-16/` (released 2026-01-16)            |         | Authentication provider for 3DS, `merchant_id` on the payment provider, `totals[]` on fulfillment options.    |
| `2025-12-12`         | ACP 2025-12-12 | legacy  | `spec/2025-12-12/` (released 2025-12-12)            |         | `fulfillment_details` and `selected_fulfillment_options[]`, 3DS status, intent traces, affiliate attribution. |
| `2025-09-29`         | ACP 2025-09-29 | legacy  | `spec/2025-09-29/` (released 2025-09-29)            |         | Initial release of Agentic Checkout, its webhooks and Delegate Payment.                                       |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Why every older version is legacy: each release changelog deprecates the one before it. 2025-12-12 says "Previous version `2025-09-29` is deprecated"; 2026-01-30 (agenticcommerce.dev changelog) says "Previous version 2025-12-12 deprecated"; 2026-04-17 says "Previous version `2026-01-30` deprecated". 2026-01-16 is superseded by 2026-01-30 and its changelog has no compatibility note. ACP defines no "supported" tier, so none is listed.

Agentic Checkout and Delegate Payment are not separately versioned. Every `spec/<version>/` folder holds both, and every OpenAPI file in it carries `info.version` equal to the folder name. The `Version:` lines at the top of the RFC documents (2026-01-16 on the Checkout RFC, 2025-09-29 on the Delegate Payment RFC) are stale document headers: those RFCs are living documents that already describe 2026-04-17 rules such as mandatory idempotency. Cite them for rules, and take field shapes from the snapshot of the target version.

## Which version to use

- Build agents and merchants to ACP 2026-04-17. It is the version the README calls latest stable.
- A server may accept several versions; it advertises them in `/.well-known/acp.json` `protocol.supported_versions` (oldest first) and in `supported_versions` on version errors (newest first) (Discovery RFC §4.2; checkout schema `Error`). Accepting an older version is a compatibility choice, not a target: answer those requests with the shapes of the version the client sent.
- Treat ACP 2026-01-30, 2026-01-16, 2025-12-12 and 2025-09-29 as input to an upgrade.
- Follow `spec/unreleased/` only to see what is coming. Its posture is **track**: do not send `API-Version: unreleased` and do not emit fields that exist only there.

## What changed

### ACP unreleased

From `changelog/unreleased/` and the schema diff against 2026-04-17:

- `CheckoutSessionCompleteRequest.fulfillment_details` (optional), so contact-only changes can ride on complete; an address change there triggers 409 Conflict and sends the agent back to update-then-complete (SEP #196).
- `Item.url`, the canonical product page URL (SEP #280), and `Item.suggested_price` with a `PriceSource` (`feed_id` required) for price provenance (SEP #197).
- Feed API: `feed_update_id` on the upsert response and `last_update_id` on products (SEP #259).
- Fixes: flat (unwrapped) Delegate Payment error examples, message-type examples, `IntentTrace` examples, `Address.company` description.

### ACP 2026-04-17

From `changelog/2026-04-17.md` and the schema diff against 2026-01-30:

- `Idempotency-Key` is required on every POST, with `Idempotent-Replayed`, 400 `idempotency_key_required`, 409 `idempotency_in_flight` (with `Retry-After`) and 422 `idempotency_conflict`; `request_not_idempotent` is removed from `Error.type` (SEP #120).
- `Error.supported_versions` and the well-known codes `unsupported_api_version` and `missing_api_version` for version rejections.
- Webhook `Merchant-Signature` is `t=<unix_seconds>,v1=<64_hex>`, HMAC-SHA256 over `timestamp + "." + raw_body`, with a recommended 300-second tolerance. Signing was already required; only the format is new.
- Discovery document at `/.well-known/acp.json`, carts (`/carts`), the Feed API, Delegate Authentication (3DS2), and the MCP transport binding (`openrpc.agentic_checkout.json`).
- Orders: `Order` gains `type`, `line_items[]`, `fulfillments[]`, `adjustments[]`, `totals[]` and `client_reference_id`; order statuses become open enums; webhook `EventDataOrder` composes the full `Order` and drops `refunds[]` for `adjustments[]`. `Total.type` adds `amount_refunded`.
- Messages gain `resolution` (`recoverable`, `requires_buyer_input`, `requires_buyer_review`); `markdown` content must be CommonMark 0.31.2 without raw HTML.
- Marketing consent (`marketing_consent_options`, `marketing_consents`), `order_notes`, `Address.company`, `PaymentHandler.display_name` and `display_order`, seller-backed handlers.
- Delegate Payment: `iin` max length 8, `risk_signals` may be empty, `Error.code` adds `idempotency_key_required` and `idempotency_in_flight`.
- `AuthenticationMetadata.channel` is no longer required.
- Post-release edits in the pinned snapshot: the order schema alignment (2026-05-01) changed `OrderLineItem.quantity` to `ordered`, `current` and `fulfilled`, and unwrapped Delegate Payment error examples (2026-06-15). Pin the commit, not just the folder name.

### ACP 2026-01-30

From `changelog/2026-01-30.md` and the schema diff against 2026-01-16:

- Capability negotiation: a required `capabilities` object on create requests and on every session response; the seller returns the intersection of `interventions.supported`.
- Payment handlers (breaking): `payment_provider` is replaced by `capabilities.payment.handlers[]`, and `payment_data` changes from `{token, provider}` to `{handler_id, instrument: {type, credential}}`.
- Extensions framework (`capabilities.extensions`) and the discount extension (`discounts.codes[]`, `applied[]`, `rejected[]`).
- Create and update use `line_items` instead of `items`; create requires `line_items`, `currency` and `capabilities`. `Item` is now `id`, `name`, `unit_amount`; `LineItem` carries `quantity` and `totals[]` instead of `base_amount`, `discount`, `subtotal`, `tax` and `total`.
- Session status adds `incomplete`, `requires_escalation`, `pending_approval`, `complete_in_progress` and `expired`; sessions gain `protocol.version`, `expires_at`, `continue_url`, locale, timezone and presentment currency fields.
- `SelectedFulfillmentOption` is flat (`type`, `option_id`, `item_ids`), adds `pickup` and `local_delivery`, and fulfillment options of those types exist.
- `Buyer` requires only `email`; `AuthenticationResult.outcome` values change; Delegate Payment `display_last4` must match `^[0-9]{4}$`.

### ACP 2026-01-16

From `changelog/2026-01-16.md` and the schema diff against 2025-12-12:

- `authentication_provider` on the session and a required `merchant_id` on `PaymentProvider`.
- Fulfillment options carry `totals[]` instead of `subtotal`, `tax` and `total`.

### ACP 2025-12-12

From `changelog/2025-12-12.md`:

- `fulfillment_address` becomes nested `fulfillment_details` (`name`, `phone_number`, `email`, `address`).
- `fulfillment_option_id` becomes `selected_fulfillment_options[]` with item mappings.
- `subtotal` and `tax` become optional on fulfillment options; `Total.description`, `return_policy` links and line item display fields are added.
- `authentication_required` status with `authentication_metadata` and `authentication_result` for 3DS; `intent_trace` on cancel; affiliate attribution.

### ACP 2025-09-29

- Initial release of the Agentic Checkout specification, its webhooks, and the Delegate Payment specification (`changelog/2025-09-29.md`).

## Upgrading

### ACP 2026-01-30 to ACP 2026-04-17

1. Change the version marker: send and accept `API-Version: 2026-04-17`, and return `protocol.version: "2026-04-17"` on sessions.
2. Replace removed or renamed behaviour:
   - Agent: send `Idempotency-Key` on every POST, including update and cancel; retry 409 after `Retry-After`; never retry a 422 `idempotency_conflict` with the same key.
   - Merchant and payment provider: reject a POST without the key with 400 `idempotency_key_required`; implement replay, 409 and 422 per [`security-and-headers.md`](security-and-headers.md); stop emitting `type: request_not_idempotent`.
   - Merchant: sign webhooks as `Merchant-Signature: t=<unix_seconds>,v1=<hex>`; receiver: verify and enforce the timestamp window.
   - Merchant: send full `Order` objects with `type: "order"` in webhooks, and move `refunds[]` to `adjustments[]` with an `amount_refunded` total.
   - Merchant: add `supported_versions` to version errors, and publish `/.well-known/acp.json` if agents should discover you.
3. Validate against the 2026-04-17 JSON Schema and OpenAPI files.
4. Keep behaviour unchanged: the same request body with the same key returns the same response, and no order or charge is created twice.

### ACP 2026-01-16 to ACP 2026-01-30

1. Change the version marker to `2026-01-30`.
2. Replace removed or renamed behaviour:
   - Agent: rename `items` to `line_items` on create and update, send `currency`, and send `capabilities` with at least `{"interventions": {"supported": []}}`.
   - Merchant: return `capabilities` on every session, with `payment.handlers[]` replacing `payment_provider` and `authentication_provider`.
   - Agent: send `payment_data` as `{handler_id, instrument: {type, credential}}` instead of `{token, provider}`.
   - Both: move line item money into `LineItem.totals[]`, and send `SelectedFulfillmentOption` as `{type, option_id, item_ids}` without the nested `shipping` or `digital` object.
   - Both: map old `AuthenticationResult.outcome` values to the new enum.
3. Validate against the 2026-01-30 schemas.
4. Keep behaviour unchanged: the same cart produces the same totals and the same token reaches the same payment provider.

### ACP 2025-12-12 to ACP 2026-01-16

1. Change the version marker to `2026-01-16`.
2. Replace fulfillment option `subtotal`, `tax` and `total` with `totals[]`, add `merchant_id` to `payment_provider`, and add `authentication_provider` when 3DS is offered.
3. Validate against the 2026-01-16 schemas.
4. Keep behaviour unchanged: fulfillment option prices stay the same.

### ACP 2025-09-29 to ACP 2025-12-12

1. Change the version marker to `2025-12-12`.
2. Replace `fulfillment_address` with `fulfillment_details.address` (plus optional contact fields), and `fulfillment_option_id` with `selected_fulfillment_options[]` listing the item ids per option.
3. Validate against the 2025-12-12 schemas.
4. Keep behaviour unchanged: the same address and the same selected option reach the merchant.

### ACP 2025-09-29 or later to ACP 2026-04-17

Apply the checklists above in order. The steps that change the most are the payment handler model and `line_items` rename (2026-01-30), mandatory idempotency and the webhook signature format (2026-04-17), and the nested fulfillment model (2025-12-12). Validate the result against the Verify list in `SKILL.md`.

## Preview: ACP unreleased

`spec/unreleased/` is the development line; its OpenAPI files carry `info.version: unreleased` (the Delegate Authentication file still says `2026-01-28`). Posture: **track**. As of commit 7fdd78d (2026-07-17) it differs from 2026-04-17 by the items in "What changed" above. Do not send `API-Version: unreleased`, and do not send `fulfillment_details` on complete, `Item.url` or `Item.suggested_price` to a 2026-04-17 server: its schemas set `additionalProperties: false`. Watch `changelog/unreleased/` and the repository for a new dated folder. When it ships: make it current, make 2026-04-17 legacy once its changelog deprecates it, and add an upgrade section.
