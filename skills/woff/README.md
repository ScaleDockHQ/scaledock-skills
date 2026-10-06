# woff

An agent skill for WOFF.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill woff
```

Then ask the agent to apply WOFF.

## What it covers

- when packaging web fonts
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                 | Status                |
| -------------------- | --------------------- |
| WOFF File Format 2.0 | current               |
| WOFF File Format 1.0 | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [WOFF File Format 2.0](https://www.w3.org/TR/WOFF2/): Recommendation, WOFF2 REC-WOFF2-20240808 (Recommendation, 2024-08-08).
- [WOFF File Format 1.0](https://www.w3.org/TR/WOFF/): Recommendation, WOFF REC-WOFF-20121213 (Recommendation, 2012-12-13).

## License

MIT
