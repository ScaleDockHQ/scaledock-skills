# mta-sts

An agent skill for SMTP MTA Strict Transport Security (MTA-STS).

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill mta-sts
```

Then ask the agent to apply SMTP MTA Strict Transport Security (MTA-STS).

## What it covers

- when publishing an MTA-STS policy
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                  | Status  |
| ----------------------------------------------------- | ------- |
| RFC 8461 SMTP MTA Strict Transport Security (MTA-STS) | current |
| RFC 8460 SMTP TLS Reporting                           | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 8461 SMTP MTA Strict Transport Security (MTA-STS)](https://www.rfc-editor.org/rfc/rfc8461.html): PROPOSED STANDARD, RFC 8461 (PROPOSED STANDARD, September ).
- [RFC 8460 SMTP TLS Reporting](https://www.rfc-editor.org/rfc/rfc8460.html): PROPOSED STANDARD, RFC 8460 (PROPOSED STANDARD, September ).

## License

MIT
