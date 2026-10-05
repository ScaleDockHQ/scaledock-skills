# Agentic Checkout

Read this when building the merchant's checkout endpoints, the agent client that drives them, or reviewing either. Field shapes are those of ACP 2026-04-17 (`spec/2026-04-17/openapi/openapi.agentic_checkout.yaml` and `json-schema/schema.agentic_checkout.json`); prose rules cite the Agentic Checkout RFC (`rfcs/rfc.agentic_checkout.md`), the Capability Negotiation RFC, the Payment Handlers RFC, the Discovery RFC, the Orders RFC, the Cart RFC and the MCP binding (`docs/mcp-binding.md`). Schema citations name the schema, for example "checkout schema `LineItem`".

## Roles

- **Merchant (seller)**: implements the checkout endpoints and stays the system of record for orders, payments, taxes and compliance; payment authorization and settlement stay on the merchant's payment service provider (Checkout RFC, intro).
- **Agent**: calls the endpoints for the buyer, renders the returned state, and hosts the webhook receiver for order events (Checkout RFC §2.3; Webhooks OpenAPI).
- **Payment service provider (PSP)**: serves Delegate Payment and issues vault tokens that the merchant redeems (MCP binding, Scope; Payment Handlers RFC §6.4). See [`delegate-payment.md`](delegate-payment.md).

## Endpoints

| Operation | Request                                                  | Success       | Notes                                                                         |
| --------- | -------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------- |
| Create    | `POST /checkout_sessions`                                | `201 Created` | Body `CheckoutSessionCreateRequest`; returns the full `CheckoutSession`.      |
| Update    | `POST /checkout_sessions/{checkout_session_id}`          | `200 OK`      | Body `CheckoutSessionUpdateRequest`; update is POST, not PATCH.               |
| Retrieve  | `GET /checkout_sessions/{checkout_session_id}`           | `200 OK`      | `404` with `Error` when not found. No `Idempotency-Key`.                      |
| Complete  | `POST /checkout_sessions/{checkout_session_id}/complete` | `200 OK`      | Body `CheckoutSessionCompleteRequest`; returns `CheckoutSessionWithOrder`.    |
| Cancel    | `POST /checkout_sessions/{checkout_session_id}/cancel`   | `200 OK`      | Optional body `CancelSessionRequest`; `405` if already completed or canceled. |

Every POST also documents `400` (`idempotency_key_required`), `409` (`idempotency_in_flight`) and `422` (`idempotency_conflict`) (Agentic Checkout OpenAPI, paths). Create **MUST** return 201 with an authoritative cart state, and complete **MUST** create an order (Agentic Checkout OpenAPI, `createCheckoutSession` and `completeCheckoutSession`; Checkout RFC §2.2).

## The session is authoritative

Every response returns the full session, and the agent renders it as is: it does not compute totals or availability itself (Checkout RFC §1; agenticcommerce.dev, How It Works). `CheckoutSessionBase` requires `id`, `status`, `currency`, `line_items`, `totals`, `fulfillment_options`, `messages`, `links` and `capabilities` (checkout schema `CheckoutSessionBase`). Optional fields include `protocol.version`, `buyer`, `fulfillment_details`, `selected_fulfillment_options`, `fulfillment_groups`, `authentication_metadata`, `discounts`, `marketing_consent_options`, `expires_at`, `continue_url`, `presentment_currency` with `exchange_rate`, `locale` and `timezone`.

### Money

All amounts are integers in minor units, and `currency` is ISO 4217, lowercase recommended (Checkout RFC §3.1 and §8). `Total` requires `type`, `display_text` and `amount`; `type` is one of `items_base_amount`, `items_discount`, `subtotal`, `discount`, `fulfillment`, `tax`, `fee`, `gift_wrap`, `tip`, `store_credit`, `total`, `amount_refunded` (checkout schema `Total`). At least one `Total` with `type: "total"` **SHOULD** be present when calculable (Checkout RFC §8).

### Status

`status` is one of `incomplete`, `not_ready_for_payment`, `requires_escalation`, `authentication_required`, `ready_for_payment`, `pending_approval`, `complete_in_progress`, `completed`, `canceled`, `in_progress`, `expired` (checkout schema `CheckoutSessionBase.status`). The specification gives prose meaning to only some of them:

- `not_ready_for_payment`: required information is missing, and `messages[]` says what (agenticcommerce.dev, Checkout lifecycle).
- `ready_for_payment`: the session can be completed (agenticcommerce.dev, Checkout lifecycle).
- `authentication_required`: the merchant **MUST** set it when authentication such as 3DS is required, and the session **MUST** then include `authentication_metadata` (Checkout RFC §4.4 and §8).
- `completed` and `canceled` are terminal; cancel on either returns `405` (Checkout RFC §4.5).

The lifecycle page on agenticcommerce.dev still describes only the five 2025-09-29 states. The other values have no normative definition in the pinned sources; treat them as states the agent must render without assuming transitions.

## Create and update

- Create requires `line_items` (at least one `Item`), `currency` and `capabilities` (checkout schema `CheckoutSessionCreateRequest`). `Item` is `id` (required), `name` and `unit_amount` (checkout schema `Item`).
- Update fields are all optional: `buyer`, `line_items`, `fulfillment_details`, `fulfillment_groups`, `selected_fulfillment_options`, `discounts`, `order_notes` (checkout schema `CheckoutSessionUpdateRequest`).
- `null` and an absent key mean different things: `null` clears a field, absent leaves it unchanged. Clients **MUST** send `null` only to clear and **MUST** omit the key to leave a field unchanged (Checkout RFC §6.2 and §6.8).
- `LineItem` in responses requires `id`, `item`, `quantity` (integer, at least 1) and `totals[]`, and may carry display fields (`name`, `description`, `images`, `unit_amount`, `disclosures`, `custom_attributes`, `marketplace_seller_details`) and catalog fields such as `availability_status` (checkout schema `LineItem`).
- `order_notes` is a string of at most 5000 characters on create, update and complete (checkout schema `CheckoutSessionCreateRequest`). The 2026-04-17 OpenAPI file omits it on create while the JSON Schema has it; see "Schema drift" below.

## Fulfillment

- `fulfillment_details` is `{name, phone_number, email, address}`; E.164 is recommended for the phone number (checkout schema `FulfillmentDetails`).
- `fulfillment_options[]` holds `shipping`, `digital`, `pickup` and `local_delivery` options, each with `type`, `id`, `title` and `totals[]` required; pickup also requires `location` (checkout schema `FulfillmentOption*`).
- The agent selects with `selected_fulfillment_options[]`, each `{type, option_id, item_ids}`, all required (checkout schema `SelectedFulfillmentOption`). `option_id` **MUST** match an element of `fulfillment_options` (Checkout RFC §8).
- `fulfillment_groups[]` groups item ids by `destination_type` (checkout schema `FulfillmentGroup`).

## Messages

`messages[]` carries `info`, `warning` and `error` entries inside a successful response (checkout schema `MessageInfo`, `MessageWarning`, `MessageError`). Use a `MessageError` when the session is still valid and the problem is conversational, such as an invalid email (`code: "invalid"`, `param: "$.buyer.email"`) or an out-of-stock item; use the HTTP `Error` only when no valid session can be returned (checkout schema `MessageError` and `Error` descriptions). `param` **SHOULD** be an RFC 9535 JSONPath (Checkout RFC §8). `resolution` says who fixes it: `recoverable` (the agent, through the API), `requires_buyer_input` or `requires_buyer_review` (Checkout RFC §5). Markdown rules are in [`security-and-headers.md`](security-and-headers.md).

## Capability negotiation

- Agents **MUST** send `capabilities` on every create, at minimum `{"interventions": {"supported": []}}`; merchants **MUST** return `capabilities` on every session response and **MUST** return the intersection of `interventions.supported` (Capability Negotiation RFC §7.1).
- Request-only intervention fields are `display_context`, `redirect_context`, `max_redirects` and `max_interaction_depth`; response-only fields are `required` and `enforcement` (`always`, `conditional`, `optional`) (checkout schema `InterventionCapabilities`).
- When the agent cannot meet a required intervention and `enforcement` is `always`, the merchant **SHOULD** add a message with `code: "intervention_required"` (Checkout RFC §5).
- Implementations **MUST** ignore unknown capability values, and merchants **MUST NOT** rely only on agent-declared capabilities for security decisions (Capability Negotiation RFC §4.6.2 and §6.2).
- Extensions: the agent sends identifiers in `capabilities.extensions` (strings); the merchant returns `ExtensionDeclaration` objects (`name`, `extends`, `schema`, `spec`) for active extensions (checkout schema `Capabilities`). Extensions **MUST NOT** modify existing required fields or change their semantics, and agents **MUST** handle responses with or without extensions (Extensions RFC).

## Payment handlers and complete

- The merchant advertises `capabilities.payment.handlers[]`. Each `PaymentHandler` requires `id`, `name` (reverse-DNS, for example `dev.acp.tokenized.card`), `version` (`YYYY-MM-DD`), `spec`, `requires_delegate_payment`, `requires_pci_compliance`, `psp`, `config_schema`, `instrument_schemas` and `config`; `display_name` and `display_order` (lower is preferred, agents **MAY** reorder) are optional (checkout schema `PaymentHandler`).
- Every handler config **MUST** include `merchant_id` and `psp` (Payment Handlers RFC §10).
- When `requires_delegate_payment` is `true`, the agent **MUST** call Delegate Payment before completing, and puts the vault token in the instrument's `credential` (Payment Handlers RFC §6.1).
- Complete requires `payment_data`: `{handler_id, instrument: {type, credential}, billing_address?}` (checkout schema `CheckoutSessionCompleteRequest`, `PaymentData`). It may also carry `buyer`, `authentication_result`, `affiliate_attribution`, `risk_signals` and `marketing_consents`.
- The response **MUST** have `status: completed` and an `order` with `id`, `checkout_session_id` and `permalink_url` (Checkout RFC §4.4; checkout schema `CheckoutSessionWithOrder`).
- `marketing_consents`: include an entry for each option shown to the buyer, and omit options not shown; omission preserves the existing subscription state (checkout schema `CheckoutSessionCompleteRequest.marketing_consents`).

## 3D Secure

- With `status: authentication_required`, the agent **MUST** attempt authentication with `authentication_metadata` and **MUST** send `authentication_result` on complete, whatever the outcome (Checkout RFC §4.4).
- A complete without `authentication_result` in that state **MUST** get a 4XX with `type: invalid_request`, `code: requires_3ds`, `param: $.authentication_result` (Checkout RFC §4.4 and §9.7).
- `AuthenticationMetadata` requires `acquirer_details` and `directory_server` (`american_express`, `mastercard`, `visa`); `flow_preference` is a request the issuer may ignore (checkout schema `AuthenticationMetadata`). `AuthenticationResult.outcome_details` is required when `outcome` is `authenticated`, `informational` or `attempt_acknowledged` (checkout schema `AuthenticationResult`).
- 2026-04-17 also ships a separate Delegate Authentication API for 3DS2 (`openapi.delegate_authentication.yaml`); this skill does not cover it.

## Cancel

Cancel accepts an optional `intent_trace` with `reason_code` (`price_sensitivity`, `shipping_cost`, `shipping_speed`, `product_fit`, `trust_security`, `returns_policy`, `payment_options`, `comparison`, `timing_deferred`, `other`), `trace_summary` and `metadata`; servers **SHOULD** accept unknown reason codes as `other` (checkout schema `IntentTrace`).

## Orders

`Order` requires `id`, `checkout_session_id` and `permalink_url`; it may carry `order_number`, `client_reference_id`, `status`, `line_items[]` (`OrderLineItem` with `quantity.ordered`, `current`, `fulfilled`), `fulfillments[]`, `adjustments[]` and `totals[]` (checkout schema `Order`). Order, line item, fulfillment and adjustment statuses and types are open enums: implementations **MUST** accept unrecognized values (checkout schema `Order.status`; Orders RFC change log 2026-04-30). The `total` entry is the original charged amount, refunds accumulate in `amount_refunded`, and agents **SHOULD NOT** subtract adjustments from `total` (checkout schema `Order.totals`; Orders RFC). Webhook delivery is in [`webhooks-and-errors.md`](webhooks-and-errors.md).

## Discovery

- A merchant that supports discovery **MUST** serve `/.well-known/acp.json` at the origin root without authentication, with `protocol` (`name: "acp"`, `version`, `supported_versions` oldest first), `api_base_url`, `transports` (at least `"rest"`) and `capabilities.services` (Discovery RFC §4.1 and §10).
- It **SHOULD** send `Cache-Control: public, max-age=3600` at least; a `404` means the seller does not support ACP and agents **SHOULD NOT** retry (Discovery RFC §4.1 and §4.4).
- A platform hosting many sellers **MUST NOT** accept or return merchant identifiers in the document (Discovery RFC §7.4).
- Discovery does not replace inline negotiation: agents still **MUST** send `capabilities` on create (Discovery RFC §6).

## Carts

Carts (`POST /carts`, `GET /carts/{id}`, `PUT /carts/{id}`, `POST /carts/{id}/cancel`) are optional. Agents **MUST NOT** assume cart support and **SHOULD** check for `"carts"` in discovery `services` (Cart RFC). `PUT` is a full replacement, and sellers **MUST NOT** silently drop unavailable items without a message (Cart RFC).

## MCP binding

The same five operations are MCP tools: `create_checkout_session`, `get_checkout_session`, `update_checkout_session`, `complete_checkout_session`, `cancel_checkout_session` (MCP binding, Tool Definitions). Arguments are `meta` (the headers, for example `meta.api_version`, `meta.idempotency_key`), `id` and `payload` (the REST body); `Authorization` is not in `meta` but handled by MCP server authentication (MCP binding, Argument Structure and Header Mapping). A conforming server **MUST** use JSON-RPC 2.0 over MCP Streamable HTTP, expose all five tools and validate inputs against the ACP JSON Schemas (MCP binding, Conformance). The binding covers checkout only, not Delegate Payment (MCP binding, Scope).

## Schema drift

The pinned OpenAPI and JSON Schema files disagree in places, and many inline `example:` values do not match their schemas (for example, the OpenAPI complete examples still use `{token, provider}` and the `API-Version` parameter example says `2026-01-16`). Validate payloads against both files, treat the field definitions as normative over examples, and report a disagreement rather than guessing.
