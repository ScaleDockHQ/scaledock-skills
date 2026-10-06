# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id              | Line                                | Status  | Revision                                                              | Posture | Publisher                 |
| --------------- | ----------------------------------- | ------- | --------------------------------------------------------------------- | ------- | ------------------------- |
| `uievents`      | UI Events                           | current | uievents WD-uievents-20260221 (Working Draft, 2026-02-21)             | track   | Working Draft 2026-02-21  |
| `uievents-old`  | UI Events (uievents-old)            | legacy  | uievents-old WD-uievents-20260221 (Working Draft, 2014-06-12)         |         | Working Draft 2014-06-12  |
| `uievents-key`  | UI Events KeyboardEvent key Values  | current | uievents-key REC-uievents-key-20250422 (Recommendation, 2025-04-22)   |         | Recommendation 2025-04-22 |
| `uievents-code` | UI Events KeyboardEvent code Values | current | uievents-code REC-uievents-code-20250422 (Recommendation, 2025-04-22) |         | Recommendation 2025-04-22 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### UI Events

- Publisher status on 2026-10-06: Working Draft (2026-02-21).
- Pinned text: https://www.w3.org/TR/uievents/
- Revision token: uievents WD-uievents-20260221 (Working Draft, 2026-02-21)

### UI Events (uievents-old)

- Publisher status on 2026-10-06: Working Draft (2014-06-12).
- Pinned text: https://www.w3.org/TR/uievents/
- Revision token: uievents-old WD-uievents-20260221 (Working Draft, 2014-06-12)

### UI Events KeyboardEvent key Values

- Publisher status on 2026-10-06: Recommendation (2025-04-22).
- Pinned text: https://www.w3.org/TR/uievents-key/
- Revision token: uievents-key REC-uievents-key-20250422 (Recommendation, 2025-04-22)

### UI Events KeyboardEvent code Values

- Publisher status on 2026-10-06: Recommendation (2025-04-22).
- Pinned text: https://www.w3.org/TR/uievents-code/
- Revision token: uievents-code REC-uievents-code-20250422 (Recommendation, 2025-04-22)

## Upgrading

### uievents-old to uievents

1. Treat documents that cite UI Events (uievents-old) (uievents-old WD-uievents-20260221 (Working Draft, 2014-06-12)) as input.
2. Re-read UI Events at https://www.w3.org/TR/uievents/.
3. Keep behavior that UI Events still requires, and replace behavior that only UI Events (uievents-old) required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
