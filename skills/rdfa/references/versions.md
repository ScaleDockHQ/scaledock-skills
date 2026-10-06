# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id          | Line                           | Status  | Revision                                                      | Posture | Publisher                 |
| ----------- | ------------------------------ | ------- | ------------------------------------------------------------- | ------- | ------------------------- |
| `rdfa-core` | RDFa Core 1.1 - Third Edition  | current | rdfa-core REC-rdfa-core-20150317 (Recommendation, 2015-03-17) |         | Recommendation 2015-03-17 |
| `rdfa-lite` | RDFa Lite 1.1 - Second Edition | current | rdfa-lite REC-rdfa-lite-20150317 (Recommendation, 2015-03-17) |         | Recommendation 2015-03-17 |
| `html-rdfa` | HTML+RDFa 1.1 - Second Edition | current | html-rdfa REC-html-rdfa-20150317 (Recommendation, 2015-03-17) |         | Recommendation 2015-03-17 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### RDFa Core 1.1 - Third Edition

- Publisher status on 2026-10-06: Recommendation (2015-03-17).
- Pinned text: https://www.w3.org/TR/rdfa-core/
- Revision token: rdfa-core REC-rdfa-core-20150317 (Recommendation, 2015-03-17)

### RDFa Lite 1.1 - Second Edition

- Publisher status on 2026-10-06: Recommendation (2015-03-17).
- Pinned text: https://www.w3.org/TR/rdfa-lite/
- Revision token: rdfa-lite REC-rdfa-lite-20150317 (Recommendation, 2015-03-17)

### HTML+RDFa 1.1 - Second Edition

- Publisher status on 2026-10-06: Recommendation (2015-03-17).
- Pinned text: https://www.w3.org/TR/html-rdfa/
- Revision token: html-rdfa REC-html-rdfa-20150317 (Recommendation, 2015-03-17)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
