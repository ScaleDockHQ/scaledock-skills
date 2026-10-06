# gtfs

An agent skill for GTFS.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill gtfs
```

Then ask the agent to apply GTFS.

## What it covers

- when publishing transit data
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line          | Status  |
| ------------- | ------- |
| GTFS Schedule | current |
| GTFS Realtime | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [GTFS Schedule](https://gtfs.org/schedule/reference/): Specification, GTFS Schedule, fetched 2026-10-06 (Specification, 2026-10-06).
- [GTFS Realtime](https://gtfs.org/realtime/reference/): Specification, GTFS Realtime, fetched 2026-10-06 (Specification, 2026-10-06).

## License

MIT
