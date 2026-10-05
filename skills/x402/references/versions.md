# Versions and upgrades

Read this when choosing which x402 protocol version to build to, reading a server, client or facilitator written for v1, upgrading one, or checking whether a newer line exists. Sources: the v2 and v1 core specifications, the v2 and v1 transport specifications, the v1 to v2 migration guide, and the deprecation notices on the v1 SDK packages, listed in [Sources](../SKILL.md#sources). The specs number their sections in bold (for example **5.1.2**); transport specs have no numbers, so citations name the heading.

## Version lines

The protocol version is the integer in `x402Version` on every `PaymentRequired`, `PaymentPayload` and facilitator request (v2 § 5.1.2, § 5.2.2, § 7.1). Scheme and extension documents under `specs/schemes/` and `specs/extensions/` are not separately versioned protocol lines; they bind to the core version that carries them.

| Id   | Line    | Status  | Revision                                                    | Posture | Summary                                                                                                                                    |
| ---- | ------- | ------- | ----------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `v2` | x402 v2 | current | Protocol Version 2, spec v2.0 (2025-12-09), main at cb0ec5b |         | CAIP-2 networks, `PAYMENT-REQUIRED`/`PAYMENT-SIGNATURE`/`PAYMENT-RESPONSE` headers, `ResourceInfo`, `accepted`, extensions, payment flows. |
| `v1` | x402 v1 | legacy  | Protocol Version 1, spec v0.2 (2025-10-03), main at cb0ec5b |         | JSON 402 body, `X-PAYMENT`/`X-PAYMENT-RESPONSE`, network name strings, `maxAmountRequired`. v1 SDKs are deprecated.                        |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Why v1 is legacy: the v1 TypeScript and Python packages carry a "Deprecated (v1)" notice saying they get security patches only and pointing to the migration guide (legacy package READMEs). The migration guide says facilitators support both versions during migration, so a v2 server can still accept v1 client payments, but recommends moving clients to v2 (Migration guide, Mixed V1/V2 compatibility).

No preview line exists. Both specs live on `main`; there is no draft v3.

## Which version to use

- Build resource servers, clients and facilitators to x402 v2.
- Accept x402 v1 only as input while counterparties migrate: a facilitator or server MAY keep a v1 path, keyed on `x402Version: 1`, but never emit v1 for new work.
- Within v2, scheme bindings evolve on `main` without a protocol version bump. Pin the commit of each scheme document you implement.

## What changed

### x402 v2

From the v2 spec Version History ("CAIP-2 networks, restructured PaymentPayload/Required, ResourceInfo separation, extensions support") and the migration guide Overview:

- **Networks** are CAIP-2 identifiers `namespace:reference`, such as `eip155:84532` (v2 § 11.1). v1 used names like `base-sepolia` (v1 § 11.1).
- **HTTP headers**: the payment payload moves from `X-PAYMENT` to `PAYMENT-SIGNATURE`, and the settlement response from `X-PAYMENT-RESPONSE` to `PAYMENT-RESPONSE` (HTTP transport v2; Migration guide, Overview).
- **402 signalling**: v2 carries `PaymentRequired` base64-encoded in the `PAYMENT-REQUIRED` response header, which is its canonical HTTP location (v2 § 5.1.1; HTTP transport v2, Payment Required Signaling). v1 sent it as the JSON body of the 402 (HTTP transport v1, Payment Required Signaling).
- **Renamed type**: v1 `PaymentRequirementsResponse` becomes `PaymentRequired`, and `error` becomes optional (v2 § 5.1.2; v1 § 5.1.2, where all fields are required).
- **`ResourceInfo`**: `resource`, `description` and `mimeType` move out of each `accepts[]` entry into one top-level `resource` object with `url`, plus optional `serviceName`, `tags` and `iconUrl` (v2 § 5.1.2). `outputSchema` is gone from the requirements; discovery input and output descriptions go in the `bazaar` extension (Migration guide, Schema Declaration; bazaar extension).
- **Amount**: `maxAmountRequired` becomes `amount`, in atomic units (v2 § 5.1.2).
- **`asset`** may be a token contract address or an ISO 4217 code for fiat, and `payTo` may be a role constant (v2 § 5.1.2).
- **`PaymentPayload`**: top-level `scheme` and `network` are replaced by `accepted`, the full `PaymentRequirements` object the client chose, plus optional `resource` and `extensions` (v2 § 5.2.2; v1 § 5.2.2).
- **Extensions**: `extensions` maps an identifier to `{ info, schema }`; the client echoes what it received and may only append (v2 § 5.1.2).
- **Settlement response**: `payer` becomes optional, `amount` and `extensions` are added, and `settlement_pending` is a non-terminal error code that requires a non-empty `transaction` (v2 § 5.3.2, § 9). v1 required `payer` (v1 § 5.3.2).
- **`VerifyResponse`** is a documented type with `extensions` and `extra` (v2 § 5.4.2).
- **Payment flows**: `extra.assetTransferMethod` and `extra.paymentFlow` are reserved keys, and the `authorization`, `upfront` and `escrow` flows decide when `/verify` and `/settle` run (v2 § 6.1). v1 always verified, then settled.
- **Facilitator**: `/verify` MUST be read-only (v2 § 7.1), `/settle` MAY run more than once per payment (v2 § 7.2), `/supported` adds `extensions` and `signers` (v2 § 7.3.1), and the `EXTENSION-RESPONSES` sidechannel is added (v2 § 7.2.1).
- **Discovery**: `/discovery/resources` gains `payTo`, `scheme`, `network` and `extensions` filters; `lastUpdated` becomes an ISO 8601 string (v1 had a Unix number), and `metadata` is replaced by `extensions` (v2 § 8.1, § 8.3; v1 § 8.2). `/discovery/search` is defined by the bazaar extension (v2 § 8.2).
- **Schemes**: v1 defines only `exact`. v2 names `exact`, `upto`, `batch-settlement` and `auth-capture` under `specs/schemes/` (v2 § 6).
- **Error code**: `invalid_exact_evm_payload_authorization_value` ("amount is insufficient") becomes `invalid_exact_evm_payload_authorization_value_mismatch` ("does not exactly match") (v1 § 9; v2 § 9).

### x402 v1

The first published protocol line, with spec history v0.1 (2025-08-29) and v0.2 "Transport-agnostic redesign" (2025-10-03) (v1 Version History). HTTP, MCP and A2A transports exist under `specs/transports-v1/`.

## Upgrading

### x402 v1 to x402 v2

1. **Change the version marker.** Set `x402Version: 2` in `PaymentRequired`, `PaymentPayload`, `/verify` and `/settle` request bodies, and `SupportedKind` entries (v2 § 5.1.2, § 7.1, § 7.3.1).
2. **Replace removed or renamed fields.**
   - Network names become CAIP-2. The migration guide maps them: `base-sepolia` to `eip155:84532`, `base` to `eip155:8453`, `ethereum` to `eip155:1`, `sepolia` to `eip155:11155111`, `solana-devnet` to `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1`, `solana` to `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` (Migration guide, Network Identifier Mapping).
   - `maxAmountRequired` becomes `amount`, with the same atomic-unit value.
   - Move `resource`, `description` and `mimeType` from each `accepts[]` entry into one top-level `resource` object (`url`, `description`, `mimeType`). Move `outputSchema` and input descriptions into the `bazaar` extension's `info.input` and `info.output`.
   - In `PaymentPayload`, replace top-level `scheme` and `network` with `accepted`, set to a copy of the chosen `accepts[]` entry, and echo `extensions`.
   - Rename `PaymentRequirementsResponse` to `PaymentRequired` in code.
3. **Change the wire (HTTP).**
   - Server: send the 402 with `PAYMENT-REQUIRED: <base64 PaymentRequired>`. The body is your choice (HTTP transport v2, Response Body).
   - Client: read `PAYMENT-REQUIRED`, and send `PAYMENT-SIGNATURE` instead of `X-PAYMENT`.
   - Server: send `PAYMENT-RESPONSE` instead of `X-PAYMENT-RESPONSE`.
   - MCP: put the v2 `PaymentRequired` in `structuredContent` and `content[0].text`. The `_meta` keys `x402/payment` and `x402/payment-response` keep their names (MCP transport v1 and v2).
4. **Adopt the new v2 rules.** Make `/verify` read-only, handle `settlement_pending` by reconciling on chain before retrying, set `extra.paymentFlow` whenever the flow is not `authorization`, and have clients skip `accepts[]` entries with an unknown `paymentFlow` (v2 § 6.1, § 7.1, § 9).
5. **Validate against v2.** Run the checks in "Verify before done" in `SKILL.md`. Decode one 402 header and one payment header and compare them field by field with the v2 § 5.1.1 and § 5.2.1 examples.
6. **Keep behaviour the same.** `amount`, `asset`, `payTo` and `maxTimeoutSeconds` stay equal to the v1 values, and the client pays the same price to the same recipient. While v1 clients remain, keep the v1 path keyed on `x402Version: 1`. The facilitator side supports both (Migration guide, Mixed V1/V2 compatibility).
