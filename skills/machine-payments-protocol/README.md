# machine-payments-protocol

An agent skill for the Machine Payments Protocol (MPP) by Tempo and Stripe: charge for, or pay for, HTTP and MCP requests with HTTP 402 and the "Payment" authentication scheme of draft-httpauth-payment-01.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill machine-payments-protocol
```

Then ask your agent to "charge 1 cent per call on this API with MPP" or "make our agent pay MPP 402 challenges".

## What it covers

- The core scheme: 402 versus 401 and 403, `WWW-Authenticate: Payment` challenges, HMAC challenge binding, credentials in `Authorization` or `Payment-Authorization`, `Payment-Receipt`, `Accept-Payment`, problem types, caching and security.
- The charge and subscription intents, and session intents defined by payment methods.
- OpenAPI discovery with `x-payment-info`, and the JSON-RPC and MCP transport.
- Reconciliation fields and how MPP differs from x402.

## Draft posture

MPP is an individual Internet-Draft, not adopted by an IETF working group, and its companion documents are published only on paymentauth.org. The skill takes the **build** posture: the core is complete, has registries and production SDKs, and the revisions since launch only added features, so the skill implements the pinned revisions exactly and re-checks them on every refresh.

## Versions

| Line                      | Status          |
| ------------------------- | --------------- |
| draft-httpauth-payment-01 | current (build) |

`references/versions.md` traces the draft from `draft-ryan-httpauth-payment-00` and lists what each revision added.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [draft-httpauth-payment-01](https://www.ietf.org/archive/id/draft-httpauth-payment-01.txt): individual Internet-Draft, -01 (9 September 2026), and its [datatracker page](https://datatracker.ietf.org/doc/draft-httpauth-payment/).
- The earlier revisions `draft-httpauth-payment-00`, `draft-ryan-httpauth-payment-01` and `-00`, for the change history.
- The [paymentauth.org](https://paymentauth.org) companion documents at `tempoxyz/mpp-specs` commit 50309c8 (5 October 2026): charge intent -00, subscription intent -00, discovery -01, JSON-RPC and MCP transport -00, and the Tempo session intent -00.
- [mpp.dev](https://mpp.dev/), the [Stripe announcement](https://stripe.com/blog/machine-payments-protocol) and [Stripe's MPP docs](https://docs.stripe.com/payments/machine/mpp): informative.
- RFC 9110, RFC 8785 and RFC 9457.

## License

MIT
