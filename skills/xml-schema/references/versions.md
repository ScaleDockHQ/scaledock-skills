# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id              | Line                                                            | Status  | Revision                                                              | Posture | Publisher                 |
| --------------- | --------------------------------------------------------------- | ------- | --------------------------------------------------------------------- | ------- | ------------------------- |
| `xmlschema11-1` | W3C XML Schema Definition Language (XSD) 1.1 Part 1: Structures | current | xmlschema11-1 REC-xmlschema11-1-20120405 (Recommendation, 2012-04-05) |         | Recommendation 2012-04-05 |
| `xmlschema-1`   | XML Schema Part 1: Structures Second Edition                    | legacy  | xmlschema-1 REC-xmlschema-1-20041028 (Recommendation, 2004-10-28)     |         | Recommendation 2004-10-28 |
| `xmlschema11-2` | W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes  | current | xmlschema11-2 REC-xmlschema11-2-20120405 (Recommendation, 2012-04-05) |         | Recommendation 2012-04-05 |
| `xmlschema-2`   | XML Schema Part 2: Datatypes Second Edition                     | legacy  | xmlschema-2 REC-xmlschema-2-20041028 (Recommendation, 2004-10-28)     |         | Recommendation 2004-10-28 |
| `xmlschema-0`   | XML Schema Part 0: Primer Second Edition                        | legacy  | W3C Recommendation 28 October 2004                                    |         | Recommendation 2004-10-28 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### W3C XML Schema Definition Language (XSD) 1.1 Part 1: Structures

- Publisher status on 2026-10-06: Recommendation (2012-04-05).
- Pinned text: https://www.w3.org/TR/xmlschema11-1/
- Revision token: xmlschema11-1 REC-xmlschema11-1-20120405 (Recommendation, 2012-04-05)

### XML Schema Part 1: Structures Second Edition

- Publisher status on 2026-10-06: Recommendation (2004-10-28).
- Pinned text: https://www.w3.org/TR/xmlschema-1/
- Revision token: xmlschema-1 REC-xmlschema-1-20041028 (Recommendation, 2004-10-28)

### W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes

- Publisher status on 2026-10-06: Recommendation (2012-04-05).
- Pinned text: https://www.w3.org/TR/xmlschema11-2/
- Revision token: xmlschema11-2 REC-xmlschema11-2-20120405 (Recommendation, 2012-04-05)

### XML Schema Part 2: Datatypes Second Edition

- Publisher status on 2026-10-06: Recommendation (2004-10-28).
- Pinned text: https://www.w3.org/TR/xmlschema-2/
- Revision token: xmlschema-2 REC-xmlschema-2-20041028 (Recommendation, 2004-10-28)

## Upgrading

### xmlschema-1 to xmlschema11-1

1. Treat documents that cite XML Schema Part 1: Structures Second Edition (xmlschema-1 REC-xmlschema-1-20041028 (Recommendation, 2004-10-28)) as input.
2. Re-read W3C XML Schema Definition Language (XSD) 1.1 Part 1: Structures at https://www.w3.org/TR/xmlschema11-1/.
3. Keep behavior that W3C XML Schema Definition Language (XSD) 1.1 Part 1: Structures still requires, and replace behavior that only XML Schema Part 1: Structures Second Edition required.
4. Record the target revision on the artifact.

### xmlschema-2 to xmlschema11-2

1. Treat documents that cite XML Schema Part 2: Datatypes Second Edition (xmlschema-2 REC-xmlschema-2-20041028 (Recommendation, 2004-10-28)) as input.
2. Re-read W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes at https://www.w3.org/TR/xmlschema11-2/.
3. Keep behavior that W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes still requires, and replace behavior that only XML Schema Part 2: Datatypes Second Edition required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
