# cvss

An agent skill for CVSS.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill cvss
```

Then ask the agent to apply CVSS.

## What it covers

- when scoring vulnerability severity
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line     | Status                |
| -------- | --------------------- |
| CVSS 4.0 | current               |
| CVSS 3.1 | supported             |
| CVSS 2.0 | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [CVSS 4.0](https://www.first.org/cvss/v4.0/specification-document): Specification, CVSS 4.0, fetched 2026-10-06 (Specification, 2026-10-06).
- [CVSS 3.1](https://www.first.org/cvss/v3.1/specification-document): Specification, CVSS 3.1, fetched 2026-10-06 (Specification, 2026-10-06).
- [CVSS 2.0](https://www.first.org/cvss/v2/guide): Guide, CVSS 2.0 guide, fetched 2026-10-06 (Guide, 2026-10-06).

## License

MIT
