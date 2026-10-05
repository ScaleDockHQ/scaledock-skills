# ucp

An agent skill for the Universal Commerce Protocol (UCP) 2026-08-25: build and review businesses and platforms that discover each other, negotiate capabilities, check out, pay and track orders.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill ucp
```

Then ask your agent to "publish a UCP 2026-08-25 business profile at /.well-known/ucp" or "review our UCP checkout MCP server against the spec".

## What it covers

- Business and platform profiles, `UCP-Agent`, reverse-domain naming and schema authority binding, hosting and SSRF-safe fetching.
- Version selection with `supported_versions`, exact-version capability intersection, extension pruning and the negotiation error codes.
- The `dev.ucp.shopping.checkout` lifecycle, messages, `continue_url` and idempotency, over REST, MCP, A2A and the Embedded Protocol, plus the fulfillment and discount extensions.
- Payment handlers, `available_instruments`, credentials and PCI scope, the AP2 mandates extension and 3DS payment authentication Actions.
- Identity linking over OAuth 2.0 (PKCE, RFC 9207, scopes, the Accelerated IdP Flow), orders and signed webhooks, and RFC 9421 message signatures with `keys[]`.

## Versions

| Line           | Status                |
| -------------- | --------------------- |
| UCP draft      | preview (track)       |
| UCP 2026-08-25 | current               |
| UCP 2026-04-08 | supported             |
| UCP 2026-01-23 | legacy (upgrade from) |
| UCP 2026-01-11 | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [UCP Specification Overview (2026-08-25)](https://ucp.dev/2026-08-25/specification/overview/) and the 2026-08-25 pages on checkout and its REST, MCP and A2A bindings, the Embedded Protocol, fulfillment, discount, order, identity linking, payment handlers, AP2 mandates, payment authentication and message signatures: Released, 2026-08-25.
- [UCP Versioning](https://github.com/Universal-Commerce-Protocol/ucp/blob/release/2026-08-25/docs/versioning.md) and the [v2026-08-25](https://github.com/Universal-Commerce-Protocol/ucp/releases/tag/v2026-08-25) and [v2026-04-08](https://github.com/Universal-Commerce-Protocol/ucp/releases/tag/v2026-04-08) release notes.
- The overviews for [2026-04-08](https://ucp.dev/2026-04-08/specification/overview/), [2026-01-23](https://ucp.dev/2026-01-23/specification/overview/) and [2026-01-11](https://ucp.dev/2026-01-11/specification/overview/): Released.
- The [draft overview](https://ucp.dev/draft/specification/overview/) and [draft lodging booking capability](https://ucp.dev/draft/specification/lodging/booking/): Draft, main at b0d92c2d.
- [UCP published versions index](https://ucp.dev/versions.json).

## License

MIT
