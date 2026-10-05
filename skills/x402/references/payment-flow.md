# Payment flow, types and transports

Read this when building the 402 response, choosing and signing a payment, carrying x402 over HTTP, MCP or A2A, or mapping errors. Rules cite the x402 v2 core specification (v2 § n) and the v2 transport specifications by heading. All of them are in [Sources](../SKILL.md#sources).

## Roles and the core cycle

- **Resource server**: requires payment for a resource. **Client**: any application or agent requesting it. **Facilitator**: verifies payments and settles them on the network (v2 § 3).
- The default cycle has four steps (v2 § 2):
  1. The client requests the resource.
  2. Without a valid payment, the server answers with a payment required signal and `PaymentRequired`.
  3. The client retries with a signed `PaymentPayload`.
  4. The server verifies the payment, serves the resource and settles.
- The specification has three layers. **Types** do not depend on the transport or the scheme (v2 § 5). The **logic** belongs to the scheme and network (v2 § 6). The **representation** belongs to the transport (Architecture).
- The response types are Success, Payment Required, Invalid Request and Server Error. Each transport maps them to its own status codes (v2 § 4).

## `PaymentRequired` (v2 § 5.1)

| Field         | Required | Notes                                                                      |
| ------------- | -------- | -------------------------------------------------------------------------- |
| `x402Version` | yes      | `2`.                                                                       |
| `error`       | no       | Human-readable reason, for example "PAYMENT-SIGNATURE header is required". |
| `resource`    | yes      | `ResourceInfo`.                                                            |
| `accepts`     | yes      | Array of `PaymentRequirements`, one per acceptable way to pay.             |
| `extensions`  | no       | Map of extension id to `{ info, schema }`.                                 |

`PaymentRequirements` (each `accepts[]` entry):

| Field               | Required | Notes                                                                                                                                                       |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scheme`            | yes      | For example `exact` or `upto`.                                                                                                                              |
| `network`           | yes      | CAIP-2 `namespace:reference` (v2 § 11.1). Non-blockchain networks are encouraged to use the same format, for example `sepa:eu`.                             |
| `amount`            | yes      | String, in atomic units of the asset.                                                                                                                       |
| `asset`             | yes      | Token contract address, or ISO 4217 currency code for fiat.                                                                                                 |
| `payTo`             | yes      | Recipient address, or a role constant such as `"merchant"`.                                                                                                 |
| `maxTimeoutSeconds` | yes      | Maximum time allowed for the payment to complete.                                                                                                           |
| `extra`             | no       | Reserved keys `assetTransferMethod` and `paymentFlow` (§ 6.1). Other keys are scheme-specific, for example the EIP-712 `name` and `version` on EVM `exact`. |

`ResourceInfo` has a required `url`, plus optional `description` and `mimeType`. It also has optional `serviceName` (printable ASCII, at most 32 characters), `tags` (at most 5, each printable ASCII and at most 32 characters) and `iconUrl` (an absolute `http` or `https` URL of at most 2048 characters).

Extensions: the server advertises them in `PaymentRequired` and the client echoes them in `PaymentPayload`. The client MUST include at least the `info` it received. It may append to `info`, but it cannot delete or overwrite anything (v2 § 5.1.2).

## `PaymentPayload` (v2 § 5.2)

| Field         | Required | Notes                                                          |
| ------------- | -------- | -------------------------------------------------------------- |
| `x402Version` | yes      | `2`.                                                           |
| `resource`    | no       | `ResourceInfo`.                                                |
| `accepted`    | yes      | The `PaymentRequirements` entry the client chose, echoed.      |
| `payload`     | yes      | Scheme-specific data, defined by the scheme's network binding. |
| `extensions`  | no       | Echoed extensions.                                             |

For EVM `exact` with EIP-3009, `payload` has `signature` and `authorization`. The authorization holds `from`, `to`, `value`, `validAfter`, `validBefore` and a 32-byte `nonce` (v2 § 5.2.2). Other bindings define different payloads. See [`schemes-and-networks.md`](schemes-and-networks.md).

## `SettlementResponse` (v2 § 5.3)

| Field         | Required | Notes                                                                                                                                  |
| ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `success`     | yes      | Boolean.                                                                                                                               |
| `errorReason` | no       | Present on failure.                                                                                                                    |
| `payer`       | no       | Payer address.                                                                                                                         |
| `transaction` | yes      | Transaction hash. It is the empty string when nothing was broadcast, and MUST be non-empty when `errorReason` is `settlement_pending`. |
| `network`     | yes      | CAIP-2.                                                                                                                                |
| `amount`      | no       | The amount actually settled, in atomic units.                                                                                          |
| `extensions`  | no       |                                                                                                                                        |

Under `batch-settlement`, success carries a non-empty commitment identifier instead of an immediate transfer, and the actual charge is communicated in `PAYMENT-RESPONSE` (batch-settlement, Commitment identifier).

## Payment flows (v2 § 6.1)

A mechanism is a scheme on one network. It declares its supported flows per `assetTransferMethod`, with a default flow for each, plus a scheme-level default `assetTransferMethod`. If `extra.assetTransferMethod` or `extra.paymentFlow` is omitted, the mechanism default applies.

| Flow                      | Ordering                          | Use                                                                                                                                |
| ------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `authorization` (default) | verify, resource, settle, respond | Funds move only after the handler succeeds.                                                                                        |
| `upfront`                 | settle, resource, respond         | The server gets finality first. No `/verify`: settle establishes validity. Required on networks with no pull-settlement primitive. |
| `escrow`                  | settle, resource, settle, respond | The first settle commits a deposit or ceiling, and the second records the final charge. No `/verify`.                              |

Rules:

- At least one verify or settle MUST run before the resource executes.
- When the resolved flow is not `authorization`, `accepts[].extra.paymentFlow` MUST be present.
- Resource servers MUST reject unsupported `assetTransferMethod` and payment flow combinations.
- Clients MUST NOT build a payment for a `paymentFlow` they do not recognise, and SHOULD skip those entries.
- When both are offered, clients SHOULD prefer `authorization` over `upfront` or `escrow`.
- Under `exact`, `upfront` leaves the client charged with nothing delivered if the handler fails, and the spec defines no refund (exact, Payment Flow).

## Client selection and payment

1. Parse `PaymentRequired`, then filter `accepts[]` down to entries whose `scheme`, `network` and `paymentFlow` the client supports.
2. Check `amount`, `asset` and `payTo` against the client's own budget policy. Budget management is out of scope of the spec (v2 Document Scope), so the client owns it.
3. Build `payload` as the scheme's network binding says. Copy the chosen entry verbatim into `accepted`, and echo `extensions`.
4. Retry the request with the payload in the transport's payment field, then read the settlement response.

## HTTP transport (transports-v2/http.md)

| Header              | Direction        | Content                             |
| ------------------- | ---------------- | ----------------------------------- |
| `PAYMENT-REQUIRED`  | server to client | base64-encoded `PaymentRequired`    |
| `PAYMENT-SIGNATURE` | client to server | base64-encoded `PaymentPayload`     |
| `PAYMENT-RESPONSE`  | server to client | base64-encoded `SettlementResponse` |

- Payment is required: status 402 with the `PAYMENT-REQUIRED` header. That header is the canonical location of `PaymentRequired` (Payment Required Signaling; v2 § 5.1.1).
- All x402 protocol information travels in headers. The response body is the server's own concern (Response Body).
- Settlement failure: the 402 carries a `PAYMENT-RESPONSE` whose `success` is `false` (Settlement Response Delivery, Example (Failure)).
- Status mapping (Error Handling):

| x402 outcome                                        | HTTP status |
| --------------------------------------------------- | ----------- |
| Payment Required                                    | 402         |
| Invalid Payment (malformed payload or requirements) | 400         |
| Payment Failed (verification or settlement failed)  | 402         |
| Server Error                                        | 500         |
| Success                                             | 200         |

Legacy v1 names are `X-PAYMENT` and `X-PAYMENT-RESPONSE`, with the requirements sent as the JSON body of the 402. See [`versions.md`](versions.md).

## MCP transport (transports-v2/mcp.md)

- Payment required: the server MUST return a tool result with `isError: true`. It carries `PaymentRequired` both in `structuredContent` and as the JSON string in `content[0].text`, and the two hold identical data.
- Clients SHOULD read `structuredContent`, checking for `x402Version` and `accepts`, and fall back to parsing `content[0].text`.
- Payment: the client sends the `PaymentPayload` in `params._meta["x402/payment"]` of the `tools/call` request.
- Settlement: the server returns `SettlementResponse` in `result._meta["x402/payment-response"]`.
- If settlement fails after the tool ran, the server returns `isError: true` with the payment error and SHOULD NOT return the tool's content (Settlement Failure).

## A2A transport (transports-v2/a2a.md)

- Payment required: the task goes to `state: "input-required"`. The message metadata holds `x402.payment.status: "payment-required"` and `x402.payment.required` with the `PaymentRequired` object.
- Payment: the client sends `message/send` with the same `taskId`, `x402.payment.status: "payment-submitted"`, and `x402.payment.payload` with the `PaymentPayload`.
- Result: a status update carries `x402.payment.receipts`, an array of `SettlementResponse`, and `x402.payment.status` is `payment-completed` (task `completed`) or `payment-failed` (task `failed`, with `x402.payment.error`).
- Status lifecycle: `payment-required`, `payment-rejected`, `payment-submitted`, `payment-verified`, `payment-completed`, `payment-failed`.
- Activation: agents declare the extension URI `https://github.com/google-a2a/a2a-x402/v0.1` in the AgentCard `capabilities.extensions`. Clients activate it with the `X-A2A-Extensions` header (Extension Declaration and Activation).
