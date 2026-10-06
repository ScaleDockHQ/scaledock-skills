# acme

An agent skill for Automatic Certificate Management Environment (ACME).

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill acme
```

Then ask the agent to apply Automatic Certificate Management Environment (ACME).

## What it covers

- when issuing certificates with ACME
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                         | Status  |
| ------------------------------------------------------------ | ------- |
| RFC 8555 Automatic Certificate Management Environment (ACME) | current |
| RFC 9773 ACME Renewal Information (ARI) Extension            | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 8555 Automatic Certificate Management Environment (ACME)](https://www.rfc-editor.org/rfc/rfc8555.html): PROPOSED STANDARD, RFC 8555 (PROPOSED STANDARD, March 2019).
- [RFC 9773 ACME Renewal Information (ARI) Extension](https://www.rfc-editor.org/rfc/rfc9773.html): PROPOSED STANDARD, RFC 9773 (PROPOSED STANDARD, June 2025).

## License

MIT
