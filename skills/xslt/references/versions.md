# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                | Line                                                    | Status    | Revision                                                                 | Posture | Publisher                        |
| ----------------- | ------------------------------------------------------- | --------- | ------------------------------------------------------------------------ | ------- | -------------------------------- |
| `xslt-40-preview` | XSLT 4.0                                                | preview   | xslt-40-preview REC-xmlbase-20090128 (Community Group draft, 2026-10-05) | track   | Community Group draft 2026-10-05 |
| `xslt-30`         | XSL Transformations (XSLT) Version 3.0                  | current   | xslt-30 REC-xslt-30-20170608 (Recommendation, 2017-06-08)                |         | Recommendation 2017-06-08        |
| `xslt20`          | XSL Transformations (XSLT) Version 2.0 (Second Edition) | supported | xslt20 REC-xslt20-20210330 (Recommendation, 2021-03-30)                  |         | Recommendation 2021-03-30        |
| `xslt`            | XSL Transformations (XSLT) Version 1.0                  | legacy    | xslt xslt (Recommendation, 1999-11-16)                                   |         | Recommendation 1999-11-16        |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### XSLT 4.0

- Publisher status on 2026-10-06: Community Group draft (2026-10-05).
- Pinned text: https://qt4cg.org/specifications/xslt-40/Overview.html
- Revision token: xslt-40-preview REC-xmlbase-20090128 (Community Group draft, 2026-10-05)

### XSL Transformations (XSLT) Version 3.0

- Publisher status on 2026-10-06: Recommendation (2017-06-08).
- Pinned text: https://www.w3.org/TR/xslt-30/
- Revision token: xslt-30 REC-xslt-30-20170608 (Recommendation, 2017-06-08)

### XSL Transformations (XSLT) Version 2.0 (Second Edition)

- Publisher status on 2026-10-06: Recommendation (2021-03-30).
- Pinned text: https://www.w3.org/TR/xslt20/
- Revision token: xslt20 REC-xslt20-20210330 (Recommendation, 2021-03-30)

### XSL Transformations (XSLT) Version 1.0

- Publisher status on 2026-10-06: Recommendation (1999-11-16).
- Pinned text: https://www.w3.org/TR/xslt-10/
- Revision token: xslt xslt (Recommendation, 1999-11-16)

## Upgrading

### xslt20 to xslt-30

1. Treat documents that cite XSL Transformations (XSLT) Version 2.0 (Second Edition) (xslt20 REC-xslt20-20210330 (Recommendation, 2021-03-30)) as input.
2. Re-read XSL Transformations (XSLT) Version 3.0 at https://www.w3.org/TR/xslt-30/.
3. Keep behavior that XSL Transformations (XSLT) Version 3.0 still requires, and replace behavior that only XSL Transformations (XSLT) Version 2.0 (Second Edition) required.
4. Record the target revision on the artifact.

### xslt to xslt-30

1. Treat documents that cite XSL Transformations (XSLT) Version 1.0 (xslt xslt (Recommendation, 1999-11-16)) as input.
2. Re-read XSL Transformations (XSLT) Version 3.0 at https://www.w3.org/TR/xslt-30/.
3. Keep behavior that XSL Transformations (XSLT) Version 3.0 still requires, and replace behavior that only XSL Transformations (XSLT) Version 1.0 required.
4. Record the target revision on the artifact.

## Preview: XSLT 4.0

`xslt-40-preview` is a Community Group draft dated 2026-10-05, pinned at https://qt4cg.org/specifications/xslt-40/Overview.html. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
