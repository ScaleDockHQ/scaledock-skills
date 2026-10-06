# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id            | Line                                                | Status  | Revision                                                              | Posture | Publisher                                    |
| ------------- | --------------------------------------------------- | ------- | --------------------------------------------------------------------- | ------- | -------------------------------------------- |
| `svg2`        | Scalable Vector Graphics (SVG) 2                    | current | SVG2 CR-SVG2-20181004 (Candidate Recommendation Snapshot, 2018-10-04) | build   | Candidate Recommendation Snapshot 2018-10-04 |
| `svg11`       | Scalable Vector Graphics (SVG) 1.1 (Second Edition) | legacy  | SVG11 REC-SVG11-20110816 (Recommendation, 2011-08-16)                 |         | Recommendation 2011-08-16                    |
| `svg-aam-1.0` | SVG Accessibility API Mappings Level 1.0            | current | svg-aam-1.0 WD-svg-aam-1.0-20260923 (Working Draft, 2026-09-24)       | track   | Working Draft 2026-09-24                     |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Scalable Vector Graphics (SVG) 2

- Publisher status on 2026-10-06: Candidate Recommendation Snapshot (2018-10-04).
- Pinned text: https://www.w3.org/TR/SVG2/
- Revision token: SVG2 CR-SVG2-20181004 (Candidate Recommendation Snapshot, 2018-10-04)

### Scalable Vector Graphics (SVG) 1.1 (Second Edition)

- Publisher status on 2026-10-06: Recommendation (2011-08-16).
- Pinned text: https://www.w3.org/TR/SVG11/
- Revision token: SVG11 REC-SVG11-20110816 (Recommendation, 2011-08-16)

### SVG Accessibility API Mappings Level 1.0

- Publisher status on 2026-10-06: Working Draft (2026-09-24).
- Pinned text: https://www.w3.org/TR/svg-aam-1.0/
- Revision token: svg-aam-1.0 WD-svg-aam-1.0-20260923 (Working Draft, 2026-09-24)

## Upgrading

### svg11 to svg2

1. Treat documents that cite Scalable Vector Graphics (SVG) 1.1 (Second Edition) (SVG11 REC-SVG11-20110816 (Recommendation, 2011-08-16)) as input.
2. Re-read Scalable Vector Graphics (SVG) 2 at https://www.w3.org/TR/SVG2/.
3. Keep behavior that Scalable Vector Graphics (SVG) 2 still requires, and replace behavior that only Scalable Vector Graphics (SVG) 1.1 (Second Edition) required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
