# Delegate Payment

Read this when building the endpoint that vaults a buyer's card and returns a scoped token, the agent that calls it, or the merchant that redeems the token. Field shapes are those of ACP 2026-04-17 (`spec/2026-04-17/openapi/openapi.delegate_payment.yaml` and `json-schema/schema.delegate_payment.json`); prose rules cite the Delegate Payment RFC (`rfcs/rfc.delegate_payment.md`) and the Payment Handlers RFC.

## Who does what

- The **payment service provider** (or another vault operator) serves `POST /agentic_commerce/delegate_payment` and issues a delegated vault token for a payment credential (Delegate Payment RFC, intro; MCP binding, Scope: "served by a different party (payment provider, not merchant)").
- The **agent** calls it before completing a checkout whose handler has `requires_delegate_payment: true`, then submits the token in `payment_data.instrument.credential` (Payment Handlers RFC §6.1).
- The **merchant** advertises the handler with its `psp` and `config.merchant_id`, and redeems the token with its PSP within the allowance (Payment Handlers RFC §6.3 and §6.4).

The flow: the agent reads the handler from the session's `capabilities.payment.handlers[]`, copies `config.merchant_id` into `allowance.merchant_id`, calls Delegate Payment at the PSP named in `psp`, and sends the returned token to the merchant on complete (Payment Handlers RFC §6.3 and §6.4).

## Request

`POST /agentic_commerce/delegate_payment` with the headers in [`security-and-headers.md`](security-and-headers.md). `DelegatePaymentRequest` requires `payment_method`, `allowance`, `risk_signals` and `metadata`; `billing_address` is optional (delegate payment schema `DelegatePaymentRequest`).

### `payment_method` (`PaymentMethodCard`)

Exactly one credential type is supported: `card` (Delegate Payment RFC §3.2; Delegate Payment OpenAPI, `delegatePayment`).

| Field                                  | Rule                                                                             |
| -------------------------------------- | -------------------------------------------------------------------------------- |
| `type`                                 | Required, `card`.                                                                |
| `card_number_type`                     | Required, `fpan` or `network_token`.                                             |
| `number`                               | Required. Network token or fallback FPAN.                                        |
| `display_card_funding_type`            | Required, `credit`, `debit` or `prepaid`.                                        |
| `metadata`                             | Required, string-to-string map.                                                  |
| `virtual`                              | Boolean. The RFC marks it required; the 2026-04-17 schemas do not.               |
| `exp_month`, `exp_year`                | Strings, at most 2 and 4 characters; `"01"`–`"12"` and four digits.              |
| `cvc`                                  | String, at most 4 characters.                                                    |
| `cryptogram`, `eci_value`              | Optional; dynamic cryptogram and ECI (at most 2 characters) for tokenized cards. |
| `checks_performed`                     | Array of `avs`, `cvv`, `ani`, `auth0`.                                           |
| `iin`                                  | At most 8 characters (raised from 6 in 2026-04-17).                              |
| `display_brand`, `display_wallet_type` | Display strings.                                                                 |
| `display_last4`                        | Exactly four digits, `^[0-9]{4}$`.                                               |

Sources: delegate payment schema `PaymentMethodCard`; Delegate Payment RFC §3.3 and §7.

### `allowance`

All fields are required (delegate payment schema `Allowance`; Delegate Payment RFC §3.5):

- `reason`: **MUST** be `one_time`.
- `max_amount`: integer, minor units.
- `currency`: lowercase ISO 4217, `^[a-z]{3}$`.
- `checkout_session_id`: the session the token is for.
- `merchant_id`: at most 256 characters, taken from the handler `config.merchant_id`.
- `expires_at`: RFC 3339 timestamp.

### `risk_signals`

Each `RiskSignal` requires `type` (`card_testing`), `score` (integer) and `action` (`blocked`, `manual_review`, `authorized`) (delegate payment schema `RiskSignal`). From 2026-04-17 the array may be empty; the RFC's "at least one" rule (§7) reflects the older `minItems: 1` (`changelog/2026-04-17.md`, Allow empty risk_signals array).

### `billing_address`

`Address` requires `name` (≤256), `line_one` (≤60), `city` (≤60), `state`, `country` (ISO 3166-1 alpha-2, 2 characters) and `postal_code` (≤20); `line_two` is optional (≤60) (delegate payment schema `Address`; Delegate Payment RFC §3.4).

## Response

- Success is `201 Created` with `id`, `created` and `metadata`, all required (Delegate Payment RFC §2.4; delegate payment schema `DelegatePaymentResponse`).
- The response **MUST** echo correlation data under `metadata` when applicable, such as `merchant_id` and `idempotency_key` (Delegate Payment RFC §2.4).
- A replayed response may carry `Idempotent-Replayed: true` (Delegate Payment OpenAPI, 201 headers).

## Token use and expiry

- The token **MUST ONLY** be usable within its allowance: reason, `max_amount`, currency and expiry (Delegate Payment RFC §2.5).
- The token **MUST** become invalid at or after `allowance.expires_at` (Delegate Payment RFC §2.5).
- Multi-use tokens beyond the allowance, PSP authorization and capture, and refunds are out of scope (Delegate Payment RFC §1).

## Errors

Errors are flat objects with `type`, `code`, `message` and optional `param`, never wrapped in an envelope (Delegate Payment RFC §2.6 and §4.2).

- `type`: `invalid_request`, `rate_limit_exceeded`, `processing_error`, `service_unavailable` (delegate payment schema `Error`).
- `code`: `invalid_card`, `duplicate_request`, `idempotency_conflict`, `too_many_requests`, `idempotency_key_required`, `idempotency_in_flight` (delegate payment schema `Error`).
- Status codes: 400 or 422 for invalid requests, 409 for an idempotency in-flight collision, 429 for rate limits, 500 or 503 for processing or availability (Delegate Payment RFC §2.6; Delegate Payment OpenAPI responses). The OpenAPI also documents 401.
- `param` **SHOULD** be an RFC 9535 JSONPath (Delegate Payment RFC §4.2). The RFC examples use `payment_method.number` without `$.`; prefer the JSONPath form.
- Version errors use the same `supported_versions` rules as checkout; see [`webhooks-and-errors.md`](webhooks-and-errors.md).

The released OpenAPI examples for 401, 429, 500 and 503 use `type` values (`unauthorized`, `internal_server_error`) that are not in the `Error.type` enum; the enum wins.

## Idempotency

Delegate Payment follows the same idempotency rules as checkout, with replay never repeating vault token creation or PSP tokenization calls (Delegate Payment RFC §5.3). The full rules are in [`security-and-headers.md`](security-and-headers.md).

## Security

- `Authorization: Bearer <token>` **MUST** be required (Delegate Payment RFC §6).
- Card data handling **MUST** follow applicable PCI DSS requirements, and logs **MUST NOT** contain full PAN or CVC (Delegate Payment RFC §6).
- All requests **MUST** use HTTPS with TLS 1.3 (Delegate Payment RFC §6).
- Signing and freshness: see [`security-and-headers.md`](security-and-headers.md).

## Common mistakes

- Reusing a token for a second session or a higher amount: the allowance binds it to one `checkout_session_id`, one `merchant_id` and one `max_amount`.
- Setting `allowance.merchant_id` to the agent's own id instead of the handler's `config.merchant_id`.
- Logging the request body, which contains the PAN and CVC.
- Returning `{"error": {...}}`: the error body is flat.
- Treating Delegate Payment as a merchant endpoint in the MCP binding: the binding does not cover it.
