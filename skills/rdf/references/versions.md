# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                        | Line                                                                        | Status  | Revision                                                                                   | Posture | Publisher                                    |
| ------------------------- | --------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------ | ------- | -------------------------------------------- |
| `rdf11-concepts`          | RDF 1.1 Concepts and Abstract Syntax                                        | current | rdf11-concepts REC-rdf11-concepts-20140225 (Recommendation, 2014-02-25)                    |         | Recommendation 2014-02-25                    |
| `rdf12-concepts-preview`  | RDF 1.2 Concepts and Abstract Data Model                                    | preview | rdf12-concepts REC-rdf12-concepts-20140225 (Candidate Recommendation Snapshot, 2026-04-07) | build   | Candidate Recommendation Snapshot 2026-04-07 |
| `rdf-concepts-10`         | Resource Description Framework (RDF): Concepts and Abstract Syntax Level 10 | legacy  | rdf-concepts-10 REC-rdf11-concepts-20140225 (Recommendation, 2004-02-10)                   |         | Recommendation 2004-02-10                    |
| `rdf11-n-triples`         | RDF 1.1 N-Triples                                                           | current | rdf11-n-triples REC-n-triples-20140225 (Recommendation, 2014-02-25)                        |         | Recommendation 2014-02-25                    |
| `rdf12-n-triples-preview` | RDF 1.2 N-Triples                                                           | preview | rdf12-n-triples WD-rdf12-n-triples-20260723 (Working Draft, 2026-09-24)                    | track   | Working Draft 2026-09-24                     |
| `rdf11-n-quads`           | RDF 1.1 N-Quads                                                             | current | rdf11-n-quads REC-n-quads-20140225 (Recommendation, 2014-02-25)                            |         | Recommendation 2014-02-25                    |
| `rdf12-n-quads-preview`   | RDF 1.2 N-Quads                                                             | preview | rdf12-n-quads WD-rdf12-n-quads-20260612 (Working Draft, 2026-07-23)                        | track   | Working Draft 2026-07-23                     |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### RDF 1.1 Concepts and Abstract Syntax

- Publisher status on 2026-10-06: Recommendation (2014-02-25).
- Pinned text: https://www.w3.org/TR/rdf11-concepts/
- Revision token: rdf11-concepts REC-rdf11-concepts-20140225 (Recommendation, 2014-02-25)

### RDF 1.2 Concepts and Abstract Data Model

- Publisher status on 2026-10-06: Candidate Recommendation Snapshot (2026-04-07).
- Pinned text: https://www.w3.org/TR/rdf12-concepts/
- Revision token: rdf12-concepts REC-rdf12-concepts-20140225 (Candidate Recommendation Snapshot, 2026-04-07)

### Resource Description Framework (RDF): Concepts and Abstract Syntax Level 10

- Publisher status on 2026-10-06: Recommendation (2004-02-10).
- Pinned text: https://www.w3.org/TR/rdf-concepts/
- Revision token: rdf-concepts-10 REC-rdf11-concepts-20140225 (Recommendation, 2004-02-10)

### RDF 1.1 N-Triples

- Publisher status on 2026-10-06: Recommendation (2014-02-25).
- Pinned text: https://www.w3.org/TR/n-triples/
- Revision token: rdf11-n-triples REC-n-triples-20140225 (Recommendation, 2014-02-25)

### RDF 1.2 N-Triples

- Publisher status on 2026-10-06: Working Draft (2026-09-24).
- Pinned text: https://www.w3.org/TR/rdf12-n-triples/
- Revision token: rdf12-n-triples WD-rdf12-n-triples-20260723 (Working Draft, 2026-09-24)

### RDF 1.1 N-Quads

- Publisher status on 2026-10-06: Recommendation (2014-02-25).
- Pinned text: https://www.w3.org/TR/n-quads/
- Revision token: rdf11-n-quads REC-n-quads-20140225 (Recommendation, 2014-02-25)

### RDF 1.2 N-Quads

- Publisher status on 2026-10-06: Working Draft (2026-07-23).
- Pinned text: https://www.w3.org/TR/rdf12-n-quads/
- Revision token: rdf12-n-quads WD-rdf12-n-quads-20260612 (Working Draft, 2026-07-23)

## Upgrading

### rdf-concepts-10 to rdf11-concepts

1. Treat documents that cite Resource Description Framework (RDF): Concepts and Abstract Syntax Level 10 (rdf-concepts-10 REC-rdf11-concepts-20140225 (Recommendation, 2004-02-10)) as input.
2. Re-read RDF 1.1 Concepts and Abstract Syntax at https://www.w3.org/TR/rdf11-concepts/.
3. Keep behavior that RDF 1.1 Concepts and Abstract Syntax still requires, and replace behavior that only Resource Description Framework (RDF): Concepts and Abstract Syntax Level 10 required.
4. Record the target revision on the artifact.

## Preview: RDF 1.2 Concepts and Abstract Data Model

`rdf12-concepts-preview` is a Candidate Recommendation Snapshot dated 2026-04-07, pinned at https://www.w3.org/TR/rdf12-concepts/. Posture: build. Emit it only when the user opts in, and label the result as work against this draft. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.

## Preview: RDF 1.2 N-Triples

`rdf12-n-triples-preview` is a Working Draft dated 2026-09-24, pinned at https://www.w3.org/TR/rdf12-n-triples/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.

## Preview: RDF 1.2 N-Quads

`rdf12-n-quads-preview` is a Working Draft dated 2026-07-23, pinned at https://www.w3.org/TR/rdf12-n-quads/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
