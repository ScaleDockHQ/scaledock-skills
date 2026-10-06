# rdf

An agent skill for RDF.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill rdf
```

Then ask the agent to apply RDF.

## What it covers

- when modeling or serializing RDF
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                                        | Status                |
| --------------------------------------------------------------------------- | --------------------- |
| RDF 1.1 Concepts and Abstract Syntax                                        | current               |
| RDF 1.2 Concepts and Abstract Data Model                                    | preview (build)       |
| Resource Description Framework (RDF): Concepts and Abstract Syntax Level 10 | legacy (upgrade from) |
| RDF 1.1 N-Triples                                                           | current               |
| RDF 1.2 N-Triples                                                           | preview (track)       |
| RDF 1.1 N-Quads                                                             | current               |
| RDF 1.2 N-Quads                                                             | preview (track)       |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RDF 1.1 Concepts and Abstract Syntax](https://www.w3.org/TR/rdf11-concepts/): Recommendation, rdf11-concepts REC-rdf11-concepts-20140225 (Recommendation, 2014-02-25).
- [RDF 1.2 Concepts and Abstract Data Model](https://www.w3.org/TR/rdf12-concepts/): Candidate Recommendation Snapshot, rdf12-concepts REC-rdf12-concepts-20140225 (Candidate Recommendation Snapshot, 2026-04-07).
- [Resource Description Framework (RDF): Concepts and Abstract Syntax](https://www.w3.org/TR/rdf-concepts/): Recommendation, rdf-concepts-10 REC-rdf11-concepts-20140225 (Recommendation, 2004-02-10).
- [RDF 1.1 N-Triples](https://www.w3.org/TR/n-triples/): Recommendation, rdf11-n-triples REC-n-triples-20140225 (Recommendation, 2014-02-25).
- [RDF 1.2 N-Triples](https://www.w3.org/TR/rdf12-n-triples/): Working Draft, rdf12-n-triples WD-rdf12-n-triples-20260723 (Working Draft, 2026-09-24).
- [RDF 1.1 N-Quads](https://www.w3.org/TR/n-quads/): Recommendation, rdf11-n-quads REC-n-quads-20140225 (Recommendation, 2014-02-25).
- [RDF 1.2 N-Quads](https://www.w3.org/TR/rdf12-n-quads/): Working Draft, rdf12-n-quads WD-rdf12-n-quads-20260612 (Working Draft, 2026-07-23).

## License

MIT
