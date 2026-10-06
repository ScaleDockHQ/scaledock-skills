# payment-request

An agent skill for Payment Request API.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill payment-request
```

Then ask the agent to apply Payment Request API.

## What it covers

- when building a checkout that uses Payment Request, a payment method identifier, or a web-based payment handler
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                          | Status          |
| ----------------------------- | --------------- |
| Payment Request API           | current (build) |
| Payment Method Identifiers    | current         |
| Web-based Payment Handler API | current (track) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Payment Request API](https://www.w3.org/TR/payment-request/): Candidate Recommendation Draft, payment-request CRD-payment-request-20260622 (Candidate Recommendation Draft, 2026-06-22).
- [Payment Method Identifiers](https://www.w3.org/TR/payment-method-id/): Recommendation, payment-method-id REC-payment-method-id-20220908 (Recommendation, 2022-09-08).
- [Web-based Payment Handler API](https://www.w3.org/TR/web-based-payment-handler/): Working Draft, web-based-payment-handler WD-web-based-payment-handler-20260930 (Working Draft, 2026-09-30).

## License

MIT
