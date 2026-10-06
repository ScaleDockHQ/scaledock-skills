# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id         | Line                                         | Status  | Revision                                                    | Posture | Publisher                 |
| ---------- | -------------------------------------------- | ------- | ----------------------------------------------------------- | ------- | ------------------------- |
| `rif-core` | RIF Core Dialect (Second Edition)            | current | rif-core REC-rif-core-20130205 (Recommendation, 2013-02-05) |         | Recommendation 2013-02-05 |
| `rif-bld`  | RIF Basic Logic Dialect (Second Edition)     | current | rif-bld REC-rif-bld-20130205 (Recommendation, 2013-02-05)   |         | Recommendation 2013-02-05 |
| `rif-prd`  | RIF Production Rule Dialect (Second Edition) | current | rif-prd REC-rif-prd-20130205 (Recommendation, 2013-02-05)   |         | Recommendation 2013-02-05 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### RIF Core Dialect (Second Edition)

- Publisher status on 2026-10-06: Recommendation (2013-02-05).
- Pinned text: https://www.w3.org/TR/rif-core/
- Revision token: rif-core REC-rif-core-20130205 (Recommendation, 2013-02-05)

### RIF Basic Logic Dialect (Second Edition)

- Publisher status on 2026-10-06: Recommendation (2013-02-05).
- Pinned text: https://www.w3.org/TR/rif-bld/
- Revision token: rif-bld REC-rif-bld-20130205 (Recommendation, 2013-02-05)

### RIF Production Rule Dialect (Second Edition)

- Publisher status on 2026-10-06: Recommendation (2013-02-05).
- Pinned text: https://www.w3.org/TR/rif-prd/
- Revision token: rif-prd REC-rif-prd-20130205 (Recommendation, 2013-02-05)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
