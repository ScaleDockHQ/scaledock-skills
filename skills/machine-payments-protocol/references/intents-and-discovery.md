# Intents, discovery and transports

Read this when choosing or implementing an intent, publishing prices for agents to find, carrying MPP over JSON-RPC or MCP, reconciling settlements, or deciding between MPP and x402. Sources: the charge ("charge §"), subscription ("subscription §"), discovery ("discovery §") and MCP transport ("mcp §") documents, the Tempo session intent, and mpp.dev, listed in [Sources](../SKILL.md#sources).

## Charge: one-time payment

The `charge` intent is an immediate, one-time payment for access, single-use per challenge (charge § 4.1, § 4.2).

Request fields, JCS-serialized and base64url-encoded into `request` (charge § 5, § 5.1):

| Field           | Required | Content                                                                         |
| --------------- | -------- | ------------------------------------------------------------------------------- |
| `amount`        | yes      | String, in base units (cents for USD, the token's smallest unit).               |
| `currency`      | yes      | Lowercase ISO 4217 (`"usd"`), a token contract address, or a method-defined id. |
| `recipient`     | no       | Method-native recipient; blockchain methods make it required.                   |
| `description`   | no       | Display text.                                                                   |
| `externalId`    | no       | The merchant's order or invoice reference.                                      |
| `methodDetails` | no       | Method-specific fields, for example Stripe's `networkId` or Tempo's `chainId`.  |

- Expiry is the challenge's `expires` parameter; the request MUST NOT repeat it (charge § 5.1.2).
- Methods MAY make optional fields required, and document their currency formats (charge § 5.1, § 5.2).
- Clients that do not know a method still display the shared fields (charge § 5.3).
- The server verifies that `id` matches an outstanding challenge, that it has not expired, the proof, the amount and the recipient (charge § 7.1).
- Atomicity: no response bytes, stream chunk, tool call, external API call or async job before payment verifies; an effect that happened anyway is a defect, not a conforming outcome (charge § 4.4).
- Settlement is immediate, deferred or processor-driven, and finality ranges from instant to reversible (card chargebacks); adjust access to the method's finality (charge § 7.2, § 8.4).

## Subscription: fixed amount per period

The `subscription` intent authorizes the same amount once per billing period until cancelled or expired. It deliberately does not model plans, seats, prorations, trials or plan changes (subscription § 1, § 4.1).

| Field                                        | Required | Content                                                  |
| -------------------------------------------- | -------- | -------------------------------------------------------- |
| `amount`                                     | yes      | Positive base-10 integer string, no leading zeros.       |
| `currency`                                   | yes      | As for charge.                                           |
| `periodUnit`                                 | yes      | `day`, `week` or `month`.                                |
| `periodCount`                                | yes      | Positive base-10 integer string, no leading zeros.       |
| `recipient`                                  | no       | Method-native recipient.                                 |
| `subscriptionExpires`                        | no       | RFC 3339 end of the recurring authorization.             |
| `description`, `externalId`, `methodDetails` | no       | As for charge; method fields go only in `methodDetails`. |

Source: subscription § 5.1.1, § 5.1.2.

- `day` and `week` are fixed 86,400 and 604,800 second multiples. `month` periods add N × `periodCount` calendar months in UTC to the activation anchor, clamping to the month's last day, always from the original anchor, never from the previous boundary (subscription § 5.1.1).
- A method that cannot represent the period or semantics exactly MUST reject the request, never approximate it (subscription § 1.1, § 5.1.1).
- Activation verifies the grant, collects the first period's charge, stores durable state, and returns 200 with a receipt containing `subscriptionId`, a unique base64url string (subscription § 7.1, § 7.3).
- At most one charge per period, collected before or atomically with service for that period; missed periods never accumulate into extra charges (subscription § 7.2).
- A `subscriptionId` alone does not authorize use: authenticate the client before granting access or renewing (subscription § 7.3).
- Track the identifier, anchor, last charged period, expiry and cancellation durably, and honor `Idempotency-Key` (subscription § 7.4).
- No renewals after cancellation takes effect. Expired, cancelled, unpaid or invalid subscriptions get 402 with a fresh challenge (subscription § 7.5, § 7.6).
- Clients tell the user the authorization covers future charges without further action, and check amount, currency, period and expiry before activating (subscription § 9.1, § 9.2).

## Session: pay as you go

There is no shared session intent document. Each payment method that supports `session` defines it. The Tempo session intent opens a one-way payment channel with on-chain escrow; the client then signs off-chain EIP-712 vouchers with increasing amounts as it consumes, and the server settles periodically or at the end. This fits per-token billing of streamed LLM output (draft-tempo-session-00 § 1, § 1.1, § 1.2). Implement session only from the specific method's document, and check the method's own versioning section.

## Discovery: OpenAPI with x-payment-info

Discovery is optional and advisory: the 402 challenge is always authoritative, and clients never cache discovery data instead of processing a challenge (discovery § 1, § 5).

- Serve an OpenAPI 3.x document at `GET /openapi.json` over HTTPS as `application/json`, with `openapi`, `info.title`, `info.version` and at least one path (discovery § 4, § 4.1, § 4.2).
- Optional top-level `x-service-info` with `categories` (at most 5, lowercase) and `docs` links: `apiReference`, `homepage`, `llms` (discovery § 4.3).
- Every payable operation MUST have `x-payment-info` and MUST declare a `"402"` response (discovery § 4.4, § 4.5).
- Prefer the multi-offer form `{"offers": [...]}`; clients accept the single-offer shorthand too. Offers are alternatives (discovery § 4.4).
- An offer has `intent` (`charge` or `session`), `method`, `amount` (digit string in base units without leading zeros, or `null` for dynamic pricing), and optional `currency` and `description` (discovery § 4.4.1).
- Describe the request body and every success response with schemas; examples, defaults and non-required properties are not guarantees (discovery § 4.6, § 4.7).
- `Cache-Control: max-age=300` is recommended; add CORS for browser clients (discovery § 4.8, § 6.3).
- Discovery is not authenticated beyond HTTPS: never base security decisions on it, and consider what pricing and endpoints it reveals (discovery § 6.1, § 6.2).

```json
{
  "paths": {
    "/v1/search": {
      "post": {
        "x-payment-info": {
          "offers": [
            {
              "intent": "charge",
              "method": "tempo",
              "amount": "1000",
              "currency": "0x20c0000000000000000000000000000000000000"
            },
            {
              "intent": "charge",
              "method": "stripe",
              "amount": "50",
              "currency": "usd"
            }
          ]
        },
        "responses": {
          "200": { "description": "Results" },
          "402": { "description": "Payment Required" }
        }
      }
    }
  }
}
```

## JSON-RPC and MCP transport

For MCP and other JSON-RPC protocols, the same challenge, credential and receipt travel inside JSON-RPC messages (mcp § 4).

- **Capabilities.** MCP servers SHOULD advertise `capabilities.experimental.payment.methods` in `InitializeResult`, mapping method ids to `{"intents": [...]}`; clients SHOULD do the same in `InitializeRequest`. Advertisement is a hint; validate every challenge (mcp § 5, § 5.1).
- **Challenge.** Error code `-32042` "Payment Required", with `error.data.challenges` (one or more) and `httpStatus: 402`, plus an optional `problem` (mcp § 6.1, § 6.2).
- **`request` is a native JSON object**, not base64url. Both sides hash the JCS-canonical bytes of `request` for binding. Bind `id` to at least realm, method, intent, that request hash and expires, and SHOULD also bind the tool name or resource URI (mcp § 6.2, § 12.1).
- **One payment.** Challenges are alternatives; send exactly one credential (mcp § 6.3).
- **Credential.** `_meta["org.paymentauth/credential"]` with `challenge` echoed unchanged, `payload` and optional `source`. MCP nests `_meta` in `params`; generic JSON-RPC puts it at the message root. Servers check both and ignore the key on free methods (mcp § 7.1 to § 7.3).
- **Receipt.** `_meta["org.paymentauth/receipt"]` on every successful paid response, with `status`, `method`, `timestamp`, `challengeId` and optional `reference`; never on unpaid responses (mcp § 8).
- **Errors.** `-32043` verification failed, with a fresh challenge and `failure.reason`; `-32602` malformed credential; `-32603` internal payment error (mcp § 10.1, § 10.2).
- **No notifications.** Payment-gated methods are never processed as notifications (mcp § 11).
- **Covered MCP operations:** `tools/call`, `resources/read` and `prompts/get` (mcp § 9).
- **Client safety.** Show realm, amount, currency and recipient before paying, allow per-realm policies, and never log or persist credentials, including in traces and crash dumps (mcp § 12.4, § 12.6).

## Reconciliation

Map every settlement to one business record:

| Field            | Where it lives                  | Use                                                 |
| ---------------- | ------------------------------- | --------------------------------------------------- |
| `externalId`     | request (charge, subscription)  | Your order, invoice or plan reference.              |
| `opaque`         | challenge parameter, bound      | Processor correlation, such as a payment intent id. |
| challenge `id`   | challenge, echoed in credential | Idempotency and replay records.                     |
| `reference`      | `Payment-Receipt`               | Transaction hash or processor reference.            |
| `challengeId`    | JSON-RPC receipt                | Joins an MCP receipt to its challenge.              |
| `subscriptionId` | subscription activation receipt | The recurring agreement across periods.             |

Sources: charge § 5.1.2; core § 5.1.2, § 5.3; mcp § 8.2; subscription § 7.3.

## MPP and x402

Both use HTTP 402 for agent payments but are different wire protocols:

- MPP uses the standard authentication fields (`WWW-Authenticate`, `Authorization` or `Payment-Authorization`) plus `Payment-Receipt`; x402 v2 uses its own `PAYMENT-REQUIRED`, `PAYMENT-SIGNATURE` and `PAYMENT-RESPONSE` headers (core § 5; see the `x402` skill).
- MPP is method-agnostic across stablecoins, cards and other rails and adds a session intent; mpp.dev states that x402 targets blockchain payments (mpp.dev, "How is MPP different from x402?").
- mpp.dev says x402 `exact` flows map onto MPP's `charge` intent, and its `mppx` SDK can serve x402 and MPP clients from one endpoint (mpp.dev, "Is MPP compatible with x402?"). That is an SDK feature, not part of either specification.

If one endpoint serves both, as mpp.dev's "Use MPP with x402" guide does, keep each protocol's challenge, verification and replay rules separate: an MPP credential is checked only against MPP challenges, and an x402 payload only against x402 requirements.
