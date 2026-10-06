# owl

An agent skill for OWL 2.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owl
```

Then ask the agent to apply OWL 2.

## What it covers

- when writing an OWL ontology
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                                                              | Status                |
| ------------------------------------------------------------------------------------------------- | --------------------- |
| OWL 2 Web Ontology Language Structural Specification and Functional-Style Syntax (Second Edition) | current               |
| OWL 2 Web Ontology Language Direct Semantics (Second Edition)                                     | current               |
| OWL Web Ontology Language Semantics and Abstract Syntax                                           | legacy (upgrade from) |
| OWL 2 Web Ontology Language Document Overview (Second Edition)                                    | current               |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OWL 2 Web Ontology Language Structural Specification and Functional-Style Syntax (Second Edition)](https://www.w3.org/TR/owl2-syntax/): Recommendation, owl2-syntax REC-owl2-syntax-20121211 (Recommendation, 2012-12-11).
- [OWL 2 Web Ontology Language Direct Semantics (Second Edition)](https://www.w3.org/TR/owl2-direct-semantics/): Recommendation, owl2-direct-semantics REC-owl2-direct-semantics-20121211 (Recommendation, 2012-12-11).
- [OWL 2 Web Ontology Language Document Overview (Second Edition)](https://www.w3.org/TR/owl2-overview/): Recommendation, owl2-overview REC-owl2-overview-20121211 (Recommendation, 2012-12-11).

## License

MIT
