# gbfs

An agent skill for GBFS: publishing or consuming shared mobility feeds.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill gbfs
```

Then ask your agent to apply GBFS.

## What it covers

- The General Bikeshare Feed Specification from MobilityData: the JSON files a shared mobility system publishes (gbfs.json, system_information.json, station and vehicle status and the rest), how they are distributed and versioned, and the field types they use, read from gbfs.md at the v3.0 tag.

## Versions

| Line     | Status  |
| -------- | ------- |
| GBFS 3.0 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [GBFS 3.0](https://raw.githubusercontent.com/MobilityData/gbfs/v3.0/gbfs.md): Specification, GBFS v3.0 (git tag v3.0).

## License

MIT
