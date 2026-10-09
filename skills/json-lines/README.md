# json-lines

An agent skill for JSON Lines: reading and writing newline-delimited JSON.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill json-lines
```

Then ask your agent to apply JSON Lines.

## What it covers

- The JSON Lines text format (newline-delimited JSON) documented at jsonlines.org: its three requirements (UTF-8, one JSON value per line, `\n` as line terminator) and its conventions, read from the page source in the wardi/jsonlines repository.

## Versions

| Line       | Status  |
| ---------- | ------- |
| JSON Lines | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [JSON Lines (jsonlines.org index.md)](https://raw.githubusercontent.com/wardi/jsonlines/d5ba812c995afc83d8a3b29f0a7f1b7cf0bf17fb/index.md): Documentation, jsonlines.org source, commit d5ba812 (2026-09-26).

## License

MIT
