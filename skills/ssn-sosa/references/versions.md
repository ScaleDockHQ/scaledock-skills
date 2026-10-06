# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                       | Line                                            | Status  | Revision                                                           | Posture | Publisher                 |
| ------------------------ | ----------------------------------------------- | ------- | ------------------------------------------------------------------ | ------- | ------------------------- |
| `vocab-ssn-2017`         | Semantic Sensor Network Ontology Level 2017     | current | vocab-ssn-2017 REC-vocab-ssn-20171019 (Recommendation, 2017-10-19) |         | Recommendation 2017-10-19 |
| `vocab-ssn-2023-preview` | Semantic Sensor Network Ontology - 2023 Edition | preview | vocab-ssn-2023 REC-vocab-ssn-20171019 (Working Draft, 2026-10-03)  | track   | Working Draft 2026-10-03  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Semantic Sensor Network Ontology Level 2017

- Publisher status on 2026-10-06: Recommendation (2017-10-19).
- Pinned text: https://www.w3.org/TR/vocab-ssn-2017/
- Revision token: vocab-ssn-2017 REC-vocab-ssn-20171019 (Recommendation, 2017-10-19)

### Semantic Sensor Network Ontology - 2023 Edition

- Publisher status on 2026-10-06: Working Draft (2026-10-03).
- Pinned text: https://www.w3.org/TR/vocab-ssn-2023/
- Revision token: vocab-ssn-2023 REC-vocab-ssn-20171019 (Working Draft, 2026-10-03)

## Upgrading

There is no older line to upgrade from.

## Preview: Semantic Sensor Network Ontology - 2023 Edition

`vocab-ssn-2023-preview` is a Working Draft dated 2026-10-03, pinned at https://www.w3.org/TR/vocab-ssn-2023/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
