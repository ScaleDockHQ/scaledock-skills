# bimi

An agent skill for BIMI: publishing BIMI assertion records and processing them as a mail receiver.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill bimi
```

Then ask your agent to apply BIMI.

## What it covers

- Brand Indicators for Message Identification (BIMI), the Internet-Draft draft-brand-indicators-for-message-identification-14 (1 May 2026, intended status Standards Track). Domain Owners publish a BIMI Assertion Record in DNS; receivers check DMARC, find the record, fetch and validate the Indicator, and add BIMI header fields.

## Versions

| Line          | Status  |
| ------------- | ------- |
| BIMI draft-14 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Brand Indicators for Message Identification (BIMI), draft-14](https://www.ietf.org/archive/id/draft-brand-indicators-for-message-identification-14.txt): Internet-Draft, draft-brand-indicators-for-message-identification-14, 1 May 2026.

## License

MIT
