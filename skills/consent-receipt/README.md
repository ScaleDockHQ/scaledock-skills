# consent-receipt

An agent skill for Consent Receipt: issuing consent receipts that record what a PII Principal consented to.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill consent-receipt
```

Then ask your agent to apply Consent Receipt.

## What it covers

- The Kantara Initiative Consent Receipt Specification 1.1.0 (2018-02-20), a Technical Specification Recommendation from the Consent & Information Sharing Work Group. It defines the fields of a consent receipt, its JSON encoding and schema, and how the receipt is presented to the PII Principal.

## Versions

| Line                  | Status  |
| --------------------- | ------- |
| Consent Receipt 1.1.0 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Kantara Consent Receipt Specification 1.1.0](https://kantarainitiative.org/download/consent-receipt-specification/): Kantara Initiative Technical Specification Recommendation, Version 1.1.0, 2018-02-20.

## License

MIT
