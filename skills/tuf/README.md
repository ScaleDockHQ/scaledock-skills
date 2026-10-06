# tuf

An agent skill for TUF.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill tuf
```

Then ask the agent to apply TUF.

## What it covers

- when securing a software update repository
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line              | Status  |
| ----------------- | ------- |
| TUF specification | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [TUF specification](https://theupdateframework.github.io/specification/latest/): Specification, TUF latest, fetched 2026-10-06 (Specification, 2026-10-06).

## License

MIT
