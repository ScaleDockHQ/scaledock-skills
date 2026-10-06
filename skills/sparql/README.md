# sparql

An agent skill for SPARQL.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill sparql
```

Then ask the agent to apply SPARQL.

## What it covers

- when querying RDF with SPARQL
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                          | Status                |
| ----------------------------- | --------------------- |
| SPARQL 1.1 Query Language     | current               |
| SPARQL Query Language for RDF | legacy (upgrade from) |
| SPARQL 1.1 Protocol           | current               |
| SPARQL Protocol for RDF       | legacy (upgrade from) |
| SPARQL 1.1 Update             | current               |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [SPARQL 1.1 Query Language](https://www.w3.org/TR/sparql11-query/): Recommendation, sparql11-query REC-sparql11-query-20130321 (Recommendation, 2013-03-21).
- [SPARQL Query Language for RDF](https://www.w3.org/TR/rdf-sparql-query/): Recommendation, sparql10-query REC-rdf-sparql-query-20080115 (Recommendation, 2008-01-15).
- [SPARQL 1.1 Protocol](https://www.w3.org/TR/sparql11-protocol/): Recommendation, sparql11-protocol REC-sparql11-protocol-20130321 (Recommendation, 2013-03-21).
- [SPARQL Protocol for RDF](https://www.w3.org/TR/rdf-sparql-protocol/): Recommendation, sparql10-protocol REC-rdf-sparql-protocol-20080115 (Recommendation, 2008-01-15).
- [SPARQL 1.1 Update](https://www.w3.org/TR/sparql11-update/): Recommendation, sparql11-update REC-sparql11-update-20130321 (Recommendation, 2013-03-21).

## License

MIT
