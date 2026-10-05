# agentic-commerce-protocol

An agent skill for the Agentic Commerce Protocol (ACP), targeting API version 2026-04-17 with upgrades from 2026-01-30, 2026-01-16, 2025-12-12 and 2025-09-29: merchant checkout endpoints that AI agents call, delegated payment tokens issued by a payment service provider, and signed order webhooks.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill agentic-commerce-protocol
```

Then ask your agent to "expose our checkout to AI agents with ACP" or "review our ACP Delegate Payment endpoint".

## What it covers

- Agentic Checkout: create, update, retrieve, complete and cancel checkout sessions, session status, line items, fulfillment options, totals in minor units, and messages.
- Capability negotiation, payment handlers, `payment_data`, and the 3DS `authentication_required` flow.
- Delegate Payment: card credentials, one-time allowances, risk signals, token scope and expiry.
- Headers: Bearer auth, `API-Version` with `supported_versions`, `Signature` and `Timestamp`, and the full `Idempotency-Key` rules.
- Order webhooks signed with `Merchant-Signature`, full-order payloads, and the flat error model with its status codes.
- Discovery at `/.well-known/acp.json`, carts, and the MCP binding.
- What changed in each version, and checklists to upgrade between them.

## Versions

| Line           | Status                |
| -------------- | --------------------- |
| ACP unreleased | preview (track)       |
| ACP 2026-04-17 | current               |
| ACP 2026-01-30 | legacy (upgrade from) |
| ACP 2026-01-16 | legacy (upgrade from) |
| ACP 2025-12-12 | legacy (upgrade from) |
| ACP 2025-09-29 | legacy (upgrade from) |

Agentic Checkout and Delegate Payment share one API version. `references/versions.md` says which version to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Agentic Commerce Protocol repository](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) at commit 7fdd78d: the `spec/` snapshots (OpenAPI, JSON Schema, OpenRPC) for every released version and `unreleased`, and the dated changelogs.
- The RFCs for Agentic Checkout, Delegate Payment, Capability Negotiation, Payment Handlers, Extensions, Discovery, Orders and Cart, and the MCP binding document.
- [agenticcommerce.dev](https://www.agenticcommerce.dev): the home, lifecycle, security and changelog pages.

## License

MIT
