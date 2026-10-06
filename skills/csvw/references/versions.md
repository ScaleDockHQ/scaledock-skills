# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                   | Line                                           | Status  | Revision                                                                        | Posture | Publisher                 |
| -------------------- | ---------------------------------------------- | ------- | ------------------------------------------------------------------------------- | ------- | ------------------------- |
| `tabular-data-model` | Model for Tabular Data and Metadata on the Web | current | tabular-data-model REC-tabular-data-model-20151217 (Recommendation, 2015-12-17) |         | Recommendation 2015-12-17 |
| `tabular-metadata`   | Metadata Vocabulary for Tabular Data           | current | tabular-metadata REC-tabular-data-model-20151217 (Recommendation, 2015-12-17)   |         | Recommendation 2015-12-17 |
| `csv2json`           | Generating JSON from Tabular Data on the Web   | current | csv2json REC-tabular-data-model-20151217 (Recommendation, 2015-12-17)           |         | Recommendation 2015-12-17 |
| `csv2rdf`            | Generating RDF from Tabular Data on the Web    | current | csv2rdf REC-tabular-data-model-20151217 (Recommendation, 2015-12-17)            |         | Recommendation 2015-12-17 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Model for Tabular Data and Metadata on the Web

- Publisher status on 2026-10-06: Recommendation (2015-12-17).
- Pinned text: https://www.w3.org/TR/tabular-data-model/
- Revision token: tabular-data-model REC-tabular-data-model-20151217 (Recommendation, 2015-12-17)

### Metadata Vocabulary for Tabular Data

- Publisher status on 2026-10-06: Recommendation (2015-12-17).
- Pinned text: https://www.w3.org/TR/tabular-metadata/
- Revision token: tabular-metadata REC-tabular-data-model-20151217 (Recommendation, 2015-12-17)

### Generating JSON from Tabular Data on the Web

- Publisher status on 2026-10-06: Recommendation (2015-12-17).
- Pinned text: https://www.w3.org/TR/csv2json/
- Revision token: csv2json REC-tabular-data-model-20151217 (Recommendation, 2015-12-17)

### Generating RDF from Tabular Data on the Web

- Publisher status on 2026-10-06: Recommendation (2015-12-17).
- Pinned text: https://www.w3.org/TR/csv2rdf/
- Revision token: csv2rdf REC-tabular-data-model-20151217 (Recommendation, 2015-12-17)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
