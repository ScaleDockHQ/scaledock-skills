# x402

An agent skill for the x402 payment protocol, which uses HTTP 402 Payment Required for agent and machine payments. It covers resource servers, clients and facilitators on x402 v2, and upgrading from x402 v1.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill x402
```

Then ask your agent to "charge per request for this API with x402", "make our agent pay x402 402 responses", or "migrate our x402 v1 server to v2".

## What it covers

- The `PaymentRequired`, `PaymentRequirements` (`accepts[]`), `ResourceInfo`, `PaymentPayload` and `SettlementResponse` types.
- The HTTP transport with `PAYMENT-REQUIRED`, `PAYMENT-SIGNATURE` and `PAYMENT-RESPONSE`, plus the MCP and A2A transports.
- The `authorization`, `upfront` and `escrow` payment flows, and when `/verify` and `/settle` run.
- The `exact`, `upto`, `batch-settlement` and `auth-capture` schemes, with the EVM and SVM bindings, on CAIP-2 networks.
- The facilitator `/verify`, `/settle` and `/supported` APIs, error codes, Bazaar discovery, and extensions such as `payment-identifier`.
- Security: replay, double delivery, amounts, expiry, sponsor safety, and the v1 to v2 upgrade.

## Versions

| Line    | Status                |
| ------- | --------------------- |
| x402 v2 | current               |
| x402 v1 | legacy (upgrade from) |

`references/versions.md` says what v2 changed and how to upgrade from v1, including the header renames and the CAIP-2 network mapping.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`. The GitHub sources are pinned to `x402-foundation/x402` at commit `cb0ec5b`:

- [x402 Protocol Specification v2](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/x402-specification-v2.md): Protocol Version 2, spec v2.0.
- [x402 Protocol Specification v1](https://github.com/x402-foundation/x402/blob/cb0ec5bca0a5b21860a36bb60f34433c2e8e0d71/specs/x402-specification-v1.md): Protocol Version 1, legacy.
- The v2 HTTP, MCP and A2A transports and the v1 HTTP and MCP transports under `specs/transports-v2/` and `specs/transports-v1/`.
- The `exact`, `upto`, `batch-settlement` and `auth-capture` scheme specifications, with the EVM and SVM bindings, under `specs/schemes/`.
- The `bazaar` and `payment-identifier` extensions under `specs/extensions/`.
- [Migration Guide: V1 to V2](https://docs.x402.org/guides/migration-v1-to-v2) and [x402.org](https://x402.org).

## License

MIT
