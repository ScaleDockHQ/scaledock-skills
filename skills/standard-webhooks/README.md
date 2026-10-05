# standard-webhooks

An agent skill for the Standard Webhooks specification: sign, send and verify webhooks with the `webhook-id`, `webhook-timestamp` and `webhook-signature` headers, and deliver them reliably and safely.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill standard-webhooks
```

Then ask your agent to "add Standard Webhooks signatures to our webhook sender" or "review our webhook handler's signature verification".

## What it covers

- The three headers and the signed content `msg_id.timestamp.payload`.
- Symmetric `v1` (HMAC-SHA256, `whsec_` secrets) and asymmetric `v1a` (ed25519, `whsk_` and `whpk_` keys) signatures, multiple signatures and zero-downtime key rotation.
- Verification: raw body, constant-time comparison, timestamp tolerance, replay protection and idempotency on `webhook-id`.
- Delivery: retries with exponential backoff and jitter, `2xx` success, status code handling, timeouts and disabling endpoints.
- Payload recommendations (`type`, `timestamp`, `data`, event types, thin versus full, size) and formal schemas.
- Security: SSRF, HTTPS and static source IPs, and migrating a bespoke webhook scheme.

## Versions

| Line                  | Status  |
| --------------------- | ------- |
| Standard Webhooks 1.0 | current |

`references/versions.md` explains how the specification version relates to the repository's library tags, what changed in the text, and how to migrate.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Standard Webhooks specification](https://github.com/standard-webhooks/standard-webhooks/blob/v1.0.2/spec/standard-webhooks.md): Version 1.0.0, at tag v1.0.2.
- [Standard Webhooks README](https://github.com/standard-webhooks/standard-webhooks/blob/main/README.md): `main` at 7537d2a.
- [Standard Webhooks releases](https://github.com/standard-webhooks/standard-webhooks/releases): v1.0.2.
- [Standard Webhooks libraries](https://github.com/standard-webhooks/standard-webhooks/tree/main/libraries) and the [reference JavaScript library source](https://github.com/standard-webhooks/standard-webhooks/blob/main/libraries/javascript/src/index.ts): `main` at 7537d2a.
- [standardwebhooks.com](https://www.standardwebhooks.com): project website.
- [OWASP API7:2023 Server Side Request Forgery](https://owasp.org/API-Security/editions/2023/en/0xa7-server-side-request-forgery/): 2023 edition.

## License

MIT
