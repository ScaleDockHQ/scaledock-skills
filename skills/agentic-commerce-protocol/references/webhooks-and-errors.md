# Webhooks and errors

Read this when emitting or receiving order events, choosing between an HTTP error and an in-session message, or mapping ACP errors to HTTP status codes or MCP. Sources: the 2026-04-17 Agentic Checkout Webhooks OpenAPI (`openapi.agentic_checkout_webhook.yaml`), the checkout and delegate payment schemas, the Agentic Checkout RFC (§2.3, §3.1, §4, §6), the Orders RFC §6, the Delegate Payment RFC §2.6 and §4.2, and the MCP binding, listed in [Sources](../SKILL.md#sources).

## Order webhooks

### Direction and endpoint

The agent platform hosts the receiver and the merchant sends to it: `POST /agentic_checkout/webhooks/order_events` (Webhooks OpenAPI, `postOrderEvents`). Order lifecycle updates **MUST** be emitted to the receiver (Checkout RFC §2.3).

### Headers

| Header               | Required | Rule                                                                  |
| -------------------- | -------- | --------------------------------------------------------------------- |
| `Merchant-Signature` | Yes      | `t=<unix_seconds>,v1=<64_hex>`, pattern `^t=\d+,v1=[a-fA-F0-9]{64}$`. |
| `Content-Type`       | Yes      | `application/json`.                                                   |
| `Request-Id`         | No       | Tracking id; echoed as `request_id` in the 200 body.                  |
| `Timestamp`          | No       | Request timing.                                                       |

Source: Webhooks OpenAPI, `postOrderEvents` parameters.

### Signing and verification

1. **Sign** (merchant): compute HMAC-SHA256 with the shared secret over `timestamp + "." + raw_body`, hex-encode it, and send `Merchant-Signature: t=<timestamp>,v1=<hex>` (Webhooks OpenAPI, info).
2. **Verify** (receiver): parse `t` and `v1`, recompute the HMAC over the raw bytes received (not re-serialized JSON), and compare.
3. **Check freshness**: reject when `t` is outside the allowed window; the recommended tolerance is 300 seconds (Webhooks OpenAPI, info).
4. **Reject with 401** when the header is missing, malformed, out of window, or fails verification, with `type: invalid_request` and `code: invalid_signature` (Webhooks OpenAPI, 401 examples).

Before 2026-04-17 the header was required but its format was not specified; the 2025-09-29 to 2026-01-30 files describe only "HMAC signature header … over the raw request body".

### Payload

- `WebhookEvent` requires `type` and `data` (Webhooks OpenAPI, `WebhookEvent`).
- `type` defined values are `order_create` (new order) and `order_update` (change to an existing order). Implementations **MUST** accept unrecognized values gracefully (Webhooks OpenAPI, `WebhookEvent.type`).
- `data` is the full `Order` (`EventDataOrder` composes the checkout `Order`), with `type`, `checkout_session_id`, `permalink_url` and `status` required (Webhooks OpenAPI, `EventDataOrder`).
- `data` **MUST** contain the full order, not incremental deltas, and `line_items`, `fulfillments`, `adjustments` and `totals` **SHOULD** be included when available (Webhooks OpenAPI, `postOrderEvents`; Orders RFC §6).
- The `type: "order"` discriminator **MUST** be included (Orders RFC §6.1).
- `refunds[]` is removed; integrations **MUST** migrate to `adjustments[]` with `type: "refund"` or `"store_credit"` (Orders RFC §6.2). The 2026-04-17 `examples.agentic_checkout.json` still shows `refunds[]`; follow the schema.

### Receiver responses

`200` with `{"received": true}` (and `request_id` when the header was sent); `400` for a bad payload; `401` for signature failures; `429` when rate limited; `500` on server error (Webhooks OpenAPI, responses). ACP defines no event id, delivery retry schedule or ordering guarantee for webhooks.

```json
{
  "type": "order_update",
  "data": {
    "type": "order",
    "id": "ord_123",
    "checkout_session_id": "checkout_session_123",
    "permalink_url": "https://merchant.example.com/orders/123",
    "status": "shipped",
    "line_items": [
      {
        "id": "li_1",
        "title": "Running Shoes",
        "quantity": { "ordered": 1, "current": 1, "fulfilled": 1 },
        "unit_price": 9900,
        "subtotal": 9900,
        "status": "fulfilled"
      }
    ],
    "fulfillments": [
      {
        "id": "ful_1",
        "type": "shipping",
        "status": "shipped",
        "line_items": [{ "id": "li_1", "quantity": 1 }],
        "tracking_number": "9400111899223456789012"
      }
    ],
    "adjustments": [],
    "totals": [{ "type": "total", "display_text": "Total", "amount": 9900 }]
  }
}
```

## Errors

### Two error channels

- **`Error`** (HTTP 4xx and 5xx body): the server cannot return a valid session at all, such as a malformed request or an unexpected failure (checkout schema `Error` description).
- **`MessageError`** (inside `messages[]` of a 2xx session): the session is valid but has an actionable, conversational problem, such as an invalid email or an out-of-stock item (checkout schema `MessageError` description). See [`checkout.md`](checkout.md).

### `Error` shape

Errors are flat JSON objects, never wrapped in an envelope: `type`, `code` and `message` are required, `param` is an optional RFC 9535 JSONPath, and `supported_versions` appears only on version errors (Checkout RFC §3.1; checkout schema `Error`; Delegate Payment RFC §2.6).

| API              | `type` values                                                                       | Codes named by the spec                                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Checkout         | `invalid_request`, `processing_error`, `service_unavailable`                        | Implementation-defined; named: `idempotency_key_required`, `idempotency_conflict`, `idempotency_in_flight`, `requires_3ds`, `unsupported_api_version`, `missing_api_version`. |
| Delegate Payment | `invalid_request`, `rate_limit_exceeded`, `processing_error`, `service_unavailable` | Closed enum: `invalid_card`, `duplicate_request`, `idempotency_conflict`, `too_many_requests`, `idempotency_key_required`, `idempotency_in_flight`.                           |
| Webhooks         | `invalid_request`, `processing_error`, `service_unavailable`                        | Named: `invalid_signature`.                                                                                                                                                   |

Sources: checkout schema `Error`; delegate payment schema `Error`; Webhooks OpenAPI `Error`; Checkout RFC §2.1, §4.4 and §6.4.

### Status codes

| Situation                                                                | Status | Body                                                                 |
| ------------------------------------------------------------------------ | ------ | -------------------------------------------------------------------- |
| POST without `Idempotency-Key`                                           | 400    | `invalid_request` / `idempotency_key_required`                       |
| Missing or unsupported `API-Version`                                     | 400    | `invalid_request` + `supported_versions` (SHOULD)                    |
| Complete without `authentication_result` while `authentication_required` | 4XX    | `invalid_request` / `requires_3ds`, `param: $.authentication_result` |
| Session not found                                                        | 404    | `Error`                                                              |
| Cancel on a completed or canceled session                                | 405    | `Error`                                                              |
| Same key, request still in flight                                        | 409    | `invalid_request` / `idempotency_in_flight` + `Retry-After`          |
| Same key, different body                                                 | 422    | `invalid_request` / `idempotency_conflict`                           |
| Rate limited (Delegate Payment)                                          | 429    | `rate_limit_exceeded`                                                |
| Unexpected failure / unavailable                                         | 5xx    | `processing_error` / `service_unavailable`                           |

Sources: Checkout RFC §2.1, §4.3–§4.5, §6.4; Delegate Payment RFC §2.6; Agentic Checkout OpenAPI responses.

The 2026-01-30 checkout schema still lists `request_not_idempotent` in `Error.type`; it was removed in 2026-04-17, and idempotency errors now use `invalid_request` with the codes above (`changelog/2026-04-17.md`).

### Retry guidance

- Retry `400 idempotency_key_required` after adding the header, and `409 idempotency_in_flight` after `Retry-After`; never retry `422 idempotency_conflict` with the same key (Checkout RFC §6.4).
- A 5xx is not cached against the key, so a retry with the same key is processed fresh (Checkout RFC §6.5).
- On a version error, pick a version from `supported_versions` that the client implements and retry (`changelog/2026-04-17.md`, supported_versions).

### MCP mapping

Over MCP, REST errors become JSON-RPC errors with code `-32000` and the ACP `Error` in `error.data`; consumers **MUST** read `data.type` and `data.code`, not the JSON-RPC code. `-32602` is reserved for malformed JSON-RPC envelopes. 401 and 403 from the merchant also surface as `-32000` with `data.type: invalid_request` (MCP binding, Error Handling). The binding's `data.type` table still lists `request_not_idempotent`, which 2026-04-17 removed.
