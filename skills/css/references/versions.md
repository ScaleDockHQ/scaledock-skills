# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id              | Line              | Status    | Revision                                           | Posture | Publisher                             |
| --------------- | ----------------- | --------- | -------------------------------------------------- | ------- | ------------------------------------- |
| `css-2026`      | CSS Snapshot 2026 | current   | css-2026 NOTE-css-2026-20260622 (Note, 2026-06-22) | track   | Note 2026-06-22                       |
| `css-2025`      | CSS Snapshot 2025 | supported | css-2025 NOTE-css-2025-20250918 (Note, 2025-09-18) |         | Note 2025-09-18                       |
| `css-2024`      | CSS Snapshot 2024 | supported | css-2024 NOTE-css-2024-20250225 (Note, 2025-02-25) |         | Note 2025-02-25                       |
| `css-2023`      | CSS Snapshot 2023 | legacy    | css-2023 NOTE-css-2023-20231207 (Note, 2023-12-07) |         | Note 2023-12-07                       |
| `css2`          | CSS 2.1           | current   | W3C Recommendation 07 June 2011                    |         | Recommendation 2011-06-07             |
| `css22-preview` | CSS 2.2           | preview   | W3C First Public Working Draft 12 April 2016       | track   | First Public Working Draft 2016-04-12 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### CSS Snapshot 2026

- Publisher status on 2026-10-06: Note (2026-06-22).
- Pinned text: https://www.w3.org/TR/css-2026/
- Revision token: css-2026 NOTE-css-2026-20260622 (Note, 2026-06-22)

### CSS Snapshot 2025

- Publisher status on 2026-10-06: Note (2025-09-18).
- Pinned text: https://www.w3.org/TR/css-2025/
- Revision token: css-2025 NOTE-css-2025-20250918 (Note, 2025-09-18)

### CSS Snapshot 2024

- Publisher status on 2026-10-06: Note (2025-02-25).
- Pinned text: https://www.w3.org/TR/css-2024/
- Revision token: css-2024 NOTE-css-2024-20250225 (Note, 2025-02-25)

### CSS Snapshot 2023

- Publisher status on 2026-10-06: Note (2023-12-07).
- Pinned text: https://www.w3.org/TR/css-2023/
- Revision token: css-2023 NOTE-css-2023-20231207 (Note, 2023-12-07)

## Upgrading

### css-2025 to css-2026

1. Treat documents that cite CSS Snapshot 2025 (css-2025 NOTE-css-2025-20250918 (Note, 2025-09-18)) as input.
2. Re-read CSS Snapshot 2026 at https://www.w3.org/TR/css-2026/.
3. Keep behavior that CSS Snapshot 2026 still requires, and replace behavior that only CSS Snapshot 2025 required.
4. Record the target revision on the artifact.

### css-2024 to css-2026

1. Treat documents that cite CSS Snapshot 2024 (css-2024 NOTE-css-2024-20250225 (Note, 2025-02-25)) as input.
2. Re-read CSS Snapshot 2026 at https://www.w3.org/TR/css-2026/.
3. Keep behavior that CSS Snapshot 2026 still requires, and replace behavior that only CSS Snapshot 2024 required.
4. Record the target revision on the artifact.

### css-2023 to css-2026

1. Treat documents that cite CSS Snapshot 2023 (css-2023 NOTE-css-2023-20231207 (Note, 2023-12-07)) as input.
2. Re-read CSS Snapshot 2026 at https://www.w3.org/TR/css-2026/.
3. Keep behavior that CSS Snapshot 2026 still requires, and replace behavior that only CSS Snapshot 2023 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
