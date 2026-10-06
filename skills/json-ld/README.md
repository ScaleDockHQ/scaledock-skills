# json-ld

An agent skill for JSON-LD.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill json-ld
```

Then ask the agent to apply JSON-LD.

## What it covers

- when expanding, compacting or framing linked data, or reading CBOR-LD or YAML-LD
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line        | Status                |
| ----------- | --------------------- |
| JSON-LD 1.1 | current               |
| JSON-LD 1.0 | legacy (upgrade from) |
| CBOR-LD 1.0 | current (track)       |
| YAML-LD 1.0 | current (track)       |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [JSON-LD 1.1](https://www.w3.org/TR/json-ld11/): Recommendation, json-ld11 REC-json-ld-20140116 (Recommendation, 2020-07-16).
- [JSON-LD 1.0](https://www.w3.org/TR/json-ld/): Retired, json-ld REC-json-ld-20140116 (Retired, 2020-11-03).
- [CBOR-LD 1.0](https://www.w3.org/TR/cbor-ld-10/): Working Draft, cbor-ld-10 WD-cbor-ld-10-20260916 (Working Draft, 2026-09-28).
- [YAML-LD 1.0](https://www.w3.org/TR/yaml-ld-10/): Working Draft, yaml-ld-10 WD-yaml-ld-10-20261001 (Working Draft, 2026-10-05).

## License

MIT
