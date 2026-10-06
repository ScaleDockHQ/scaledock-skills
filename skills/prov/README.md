# prov

An agent skill for PROV.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill prov
```

Then ask the agent to apply PROV.

## What it covers

- when recording provenance
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                            | Status  |
| ------------------------------- | ------- |
| PROV-DM: The PROV Data Model    | current |
| PROV-O: The PROV Ontology       | current |
| PROV-N: The Provenance Notation | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [PROV-DM: The PROV Data Model](https://www.w3.org/TR/prov-dm/): Recommendation, prov-dm REC-prov-dm-20130430 (Recommendation, 2013-04-30).
- [PROV-O: The PROV Ontology](https://www.w3.org/TR/prov-o/): Recommendation, prov-o REC-prov-o-20130430 (Recommendation, 2013-04-30).
- [PROV-N: The Provenance Notation](https://www.w3.org/TR/prov-n/): Recommendation, prov-n REC-prov-n-20130430 (Recommendation, 2013-04-30).

## License

MIT
