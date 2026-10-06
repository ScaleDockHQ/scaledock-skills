# uuid

An agent skill for Universally Unique IDentifiers (UUIDs).

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill uuid
```

Then ask the agent to apply Universally Unique IDentifiers (UUIDs).

## What it covers

- when generating or parsing UUIDs
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                          | Status                |
| ------------------------------------------------------------- | --------------------- |
| RFC 9562 Universally Unique IDentifiers (UUIDs)               | current               |
| RFC 4122 A Universally Unique IDentifier (UUID) URN Namespace | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 9562 Universally Unique IDentifiers (UUIDs)](https://www.rfc-editor.org/rfc/rfc9562.html): PROPOSED STANDARD, RFC 9562 (PROPOSED STANDARD, May 2024).
- [RFC 4122 A Universally Unique IDentifier (UUID) URN Namespace](https://www.rfc-editor.org/rfc/rfc4122.html): PROPOSED STANDARD, RFC 4122 (PROPOSED STANDARD, July 2005).

## License

MIT
