# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                  | Line                          | Status  | Revision                                                                        | Posture | Publisher                 |
| ------------------- | ----------------------------- | ------- | ------------------------------------------------------------------------------- | ------- | ------------------------- |
| `sparql11-query`    | SPARQL 1.1 Query Language     | current | sparql11-query REC-sparql11-query-20130321 (Recommendation, 2013-03-21)         |         | Recommendation 2013-03-21 |
| `sparql10-query`    | SPARQL Query Language for RDF | legacy  | sparql10-query REC-rdf-sparql-query-20080115 (Recommendation, 2008-01-15)       |         | Recommendation 2008-01-15 |
| `sparql11-protocol` | SPARQL 1.1 Protocol           | current | sparql11-protocol REC-sparql11-protocol-20130321 (Recommendation, 2013-03-21)   |         | Recommendation 2013-03-21 |
| `sparql10-protocol` | SPARQL Protocol for RDF       | legacy  | sparql10-protocol REC-rdf-sparql-protocol-20080115 (Recommendation, 2008-01-15) |         | Recommendation 2008-01-15 |
| `sparql11-update`   | SPARQL 1.1 Update             | current | sparql11-update REC-sparql11-update-20130321 (Recommendation, 2013-03-21)       |         | Recommendation 2013-03-21 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### SPARQL 1.1 Query Language

- Publisher status on 2026-10-06: Recommendation (2013-03-21).
- Pinned text: https://www.w3.org/TR/sparql11-query/
- Revision token: sparql11-query REC-sparql11-query-20130321 (Recommendation, 2013-03-21)

### SPARQL Query Language for RDF

- Publisher status on 2026-10-06: Recommendation (2008-01-15).
- Pinned text: https://www.w3.org/TR/rdf-sparql-query/
- Revision token: sparql10-query REC-rdf-sparql-query-20080115 (Recommendation, 2008-01-15)

### SPARQL 1.1 Protocol

- Publisher status on 2026-10-06: Recommendation (2013-03-21).
- Pinned text: https://www.w3.org/TR/sparql11-protocol/
- Revision token: sparql11-protocol REC-sparql11-protocol-20130321 (Recommendation, 2013-03-21)

### SPARQL Protocol for RDF

- Publisher status on 2026-10-06: Recommendation (2008-01-15).
- Pinned text: https://www.w3.org/TR/rdf-sparql-protocol/
- Revision token: sparql10-protocol REC-rdf-sparql-protocol-20080115 (Recommendation, 2008-01-15)

### SPARQL 1.1 Update

- Publisher status on 2026-10-06: Recommendation (2013-03-21).
- Pinned text: https://www.w3.org/TR/sparql11-update/
- Revision token: sparql11-update REC-sparql11-update-20130321 (Recommendation, 2013-03-21)

## Upgrading

### sparql10-query to sparql11-query

1. Treat documents that cite SPARQL Query Language for RDF (sparql10-query REC-rdf-sparql-query-20080115 (Recommendation, 2008-01-15)) as input.
2. Re-read SPARQL 1.1 Query Language at https://www.w3.org/TR/sparql11-query/.
3. Keep behavior that SPARQL 1.1 Query Language still requires, and replace behavior that only SPARQL Query Language for RDF required.
4. Record the target revision on the artifact.

### sparql10-protocol to sparql11-protocol

1. Treat documents that cite SPARQL Protocol for RDF (sparql10-protocol REC-rdf-sparql-protocol-20080115 (Recommendation, 2008-01-15)) as input.
2. Re-read SPARQL 1.1 Protocol at https://www.w3.org/TR/sparql11-protocol/.
3. Keep behavior that SPARQL 1.1 Protocol still requires, and replace behavior that only SPARQL Protocol for RDF required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
