# Facilitator, discovery and extensions

Read this when calling a facilitator from a resource server, implementing one, self-facilitating, or adding discovery and extensions. Rules cite the x402 v2 core specification (v2 § n) and the extension documents under `specs/extensions/`, listed in [Sources](../SKILL.md#sources). The spec defines the interface, not who runs it: a resource server may delegate to a third party or host the endpoints itself (v2 § 7).

The core protocol is transport-agnostic, but the facilitator APIs are standardised as HTTP endpoints (v2 § 7).

## `POST /verify` (v2 § 7.1)

The request body:

```json
{
  "x402Version": 2,
  "paymentPayload": {
    "x402Version": 2,
    "accepted": { "...": "..." },
    "payload": { "...": "..." }
  },
  "paymentRequirements": {
    "scheme": "exact",
    "network": "eip155:84532",
    "amount": "10000",
    "...": "..."
  }
}
```

- `/verify` checks a payment without executing it. It is **read-only** and MUST NOT commit payment state or write onchain state.
- Call it only when the resolved payment flow includes it. `upfront` and `escrow` skip it (v2 § 6.1).
- The resource server POSTs both the `PaymentPayload` and the `PaymentRequirements` (README, Typical x402 flow, steps 5 and 8). The facilitator checks that the authorization parameters meet those requirements (scheme_exact_evm.md, Phase 2, step 3).
- Clients and facilitators must explicitly support each `(scheme, network)` pair they handle (README, Schemes vs Networks).
- `VerifyResponse` (v2 § 5.4.2) has `isValid` (required), `invalidReason`, `payer`, `extensions` and `extra`.

## `POST /settle` (v2 § 7.2)

- `/settle` durably commits payment state, which usually means broadcasting a transaction. For client-prepaid methods it MAY instead bind a proof to the request.
- A settle may set up an escrow, record a charge or transfer funds, depending on the scheme and the flow.
- The request has the same structure as `/verify`. Schemes may give fields different meanings at settle time. In `upto`, for example, `paymentRequirements.amount` is the actual charge at settle and the maximum at verify (scheme_upto.md, property 5).
- `/settle` MAY be called more than once per payment, for example by `escrow` or by `auth-capture` lifecycle operations. A scheme that does this MUST say how the facilitator tells the calls apart, usually with a server-led field such as `step` or `payload.type`.
- The response is a `SettlementResponse`. On failure it has `success: false`, an `errorReason`, and `transaction: ""` when nothing was broadcast.
- `settlement_pending` means the transaction was broadcast but its confirmation is unknown. The code is non-terminal and carries the broadcast hash in `transaction`. Reconcile on chain before retrying (v2 § 9).

## `GET /supported` (v2 § 7.3)

```json
{
  "kinds": [{ "x402Version": 2, "scheme": "exact", "network": "eip155:84532" }],
  "extensions": [],
  "signers": { "eip155:*": ["0x…"] }
}
```

| Field        | Contents                                                                                                                                                                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kinds`      | Required. Each entry has `x402Version`, `scheme`, `network` and an optional `extra`. Schemes use `extra` to announce values the client must sign into the payload, such as `facilitatorAddress` for EVM `upto` or `feePayer` for Starknet `exact`. |
| `extensions` | Required. The extension identifiers the facilitator has implemented.                                                                                                                                                                               |
| `signers`    | Required. A map from CAIP-2 patterns such as `eip155:*` to the facilitator's public signer addresses.                                                                                                                                              |

A resource server should only put scheme and network pairs that appear in `kinds` into `accepts[]`.

## Extension responses sidechannel (v2 § 7.2.1)

- A facilitator MAY report extension outcomes on verify and settle responses through a transport sidechannel. On HTTP that is the `EXTENSION-RESPONSES` header: a base64 JSON object keyed by extension name.
- The sidechannel is not part of the JSON body, and the resource server must not forward it to buyers.
- Facilitators MAY also expose these outcomes as `extensionResponses`, which is never serialised to buyers (v2 § 5.4.2).

## Error codes (v2 § 9)

| Code                                                                              | Meaning                                              |
| --------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `insufficient_funds`                                                              | The payer lacks the balance.                         |
| `invalid_exact_evm_payload_authorization_valid_after`                             | The authorization is not yet valid.                  |
| `invalid_exact_evm_payload_authorization_valid_before`                            | The authorization has expired.                       |
| `invalid_exact_evm_payload_authorization_value_mismatch`                          | The amount does not exactly match.                   |
| `invalid_exact_evm_payload_signature`                                             | The signature is invalid.                            |
| `invalid_exact_evm_payload_recipient_mismatch`                                    | The recipient does not match `payTo`.                |
| `invalid_network`, `invalid_scheme`, `unsupported_scheme`, `invalid_x402_version` | Not supported.                                       |
| `invalid_payload`, `invalid_payment_requirements`                                 | Malformed input.                                     |
| `invalid_transaction_state`                                                       | The transaction failed or was rejected.              |
| `unexpected_verify_error`, `unexpected_settle_error`                              | An unexpected failure.                               |
| `settlement_pending`                                                              | Broadcast, but the outcome is unknown. Non-terminal. |

Scheme bindings add their own codes, for example `PERMIT2_ALLOWANCE_REQUIRED` with 412 in EVM Permit2 (scheme_exact_evm.md, Phase 3), and the `smart_wallet_*` codes in SVM `exact`.

## Discovery: the Bazaar (v2 § 8, bazaar extension)

- `GET /discovery/resources` lists discoverable resources. It accepts the filters `type`, `payTo`, `scheme`, `network` and `extensions`, plus `limit` (1 to 100, default 20) and `offset` (default 0). It returns `x402Version`, `items` and `pagination` (v2 § 8.1).
- Each item has `resource`, `type` (currently `http`), `x402Version`, `accepts`, `lastUpdated` as an ISO 8601 string, and optional `extensions` (v2 § 8.3).
- `GET /discovery/search` is defined by the bazaar extension (v2 § 8.2).
- Resource servers declare themselves with the `bazaar` extension in `PaymentRequired.extensions`. Its `info.input` is a union on `type`:
  - `http`, with `method`, `queryParams` or `bodyType`/`body`, and `headers`;
  - `mcp`, for MCP tools.

  `info.output` holds `type` and an `example`. `schema` is the JSON Schema of `info` (bazaar extension, `PaymentRequired`).

- `ResourceInfo.serviceName`, `tags` and `iconUrl` feed discovery filtering (v2 § 5.1.2).

## Other extensions

Every extension uses the `{ info, schema }` shape under its key in `extensions`. Clients echo the extensions they received and may only append (v2 § 5.1.2).

| Key                                                  | Purpose                                                                                             |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `payment-identifier`                                 | A client `id` of 16 to 128 characters, used as an idempotency key. See the next section.            |
| `sign-in-with-x`                                     | Wallet authentication under CAIP-122, so returning payers can skip payment. Server and client only. |
| `auth-hints`                                         | Tells the client which `accepts[]` entries need authentication before it pays.                      |
| `offer-and-receipt`                                  | Server-signed offers and receipts, for dispute evidence and audit.                                  |
| `http-message-signatures`                            | Payer identity through RFC 9421, used by networks that authenticate commitments this way.           |
| `eip2612GasSponsoring`, `erc20ApprovalGasSponsoring` | Gasless Permit2 approval on EVM.                                                                    |
| `builder-code`                                       | ERC-8021 attribution suffix on settlement calldata.                                                 |

### `payment-identifier` behaviour

| Request                                | Response                    |
| -------------------------------------- | --------------------------- |
| A new `id`                             | Process it normally.        |
| The same `id` with the same payload    | Return the cached response. |
| The same `id` with a different payload | 409 Conflict.               |
| `required: true` but no `id`           | 400 Bad Request.            |

- Bind each `id` to a fingerprint of the request: `scheme`, `network`, `asset`, `amount`, `payTo`, the route and method, and any order identifier.
- Scope the key by tenant or route.
- The client reuses the same `id` on retries.

## Self-facilitation

The facilitator interface can be hosted inside the resource server (v2 § 7). The rules stay the same:

- read-only verify;
- the ordering of the payment flow;
- every MUST in the scheme binding, including sponsor safety and atomic deduplication across every process that serves settlement.
