# openpgp

An agent skill for OpenPGP.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openpgp
```

Then ask the agent to apply OpenPGP.

## What it covers

- when signing or encrypting with OpenPGP
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                            | Status                |
| ------------------------------- | --------------------- |
| RFC 9580 OpenPGP                | current               |
| RFC 4880 OpenPGP Message Format | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 9580 OpenPGP](https://www.rfc-editor.org/rfc/rfc9580.html): PROPOSED STANDARD, RFC 9580 (PROPOSED STANDARD, July 2024).
- [RFC 4880 OpenPGP Message Format](https://www.rfc-editor.org/rfc/rfc4880.html): PROPOSED STANDARD, RFC 4880 (PROPOSED STANDARD, November 2).

## License

MIT
