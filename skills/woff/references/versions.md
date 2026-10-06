# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id      | Line                 | Status  | Revision                                              | Posture | Publisher                 |
| ------- | -------------------- | ------- | ----------------------------------------------------- | ------- | ------------------------- |
| `woff2` | WOFF File Format 2.0 | current | WOFF2 REC-WOFF2-20240808 (Recommendation, 2024-08-08) |         | Recommendation 2024-08-08 |
| `woff`  | WOFF File Format 1.0 | legacy  | WOFF REC-WOFF-20121213 (Recommendation, 2012-12-13)   |         | Recommendation 2012-12-13 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### WOFF File Format 2.0

- Publisher status on 2026-10-06: Recommendation (2024-08-08).
- Pinned text: https://www.w3.org/TR/WOFF2/
- Revision token: WOFF2 REC-WOFF2-20240808 (Recommendation, 2024-08-08)

### WOFF File Format 1.0

- Publisher status on 2026-10-06: Recommendation (2012-12-13).
- Pinned text: https://www.w3.org/TR/WOFF/
- Revision token: WOFF REC-WOFF-20121213 (Recommendation, 2012-12-13)

## Upgrading

### woff to woff2

1. Treat documents that cite WOFF File Format 1.0 (WOFF REC-WOFF-20121213 (Recommendation, 2012-12-13)) as input.
2. Re-read WOFF File Format 2.0 at https://www.w3.org/TR/WOFF2/.
3. Keep behavior that WOFF File Format 2.0 still requires, and replace behavior that only WOFF File Format 1.0 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
