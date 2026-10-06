# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id             | Line           | Status    | Revision                                     | Posture | Publisher                 |
| -------------- | -------------- | --------- | -------------------------------------------- | ------- | ------------------------- |
| `2026`         | ECMA-402 2026  | current   | ECMA-402 2026 (ECMA-402 edition, 2026)       |         | ECMA-402 edition 2026     |
| `2025`         | ECMA-402 2025  | supported | ECMA-402 2025 (ECMA-402 edition, 2025)       |         | ECMA-402 edition 2025     |
| `2024`         | ECMA-402 2024  | supported | ECMA-402 2024 (ECMA-402 edition, 2024)       |         | ECMA-402 edition 2024     |
| `2027-preview` | ECMA-402 draft | preview   | tc39.es/ecma402 (Editor's draft, 2026-10-06) | track   | Editor's draft 2026-10-06 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### ECMA-402 2026

- Publisher status on 2026-10-06: ECMA-402 edition (2026).
- Pinned text: https://tc39.es/ecma402/2026/
- Revision token: ECMA-402 2026 (ECMA-402 edition, 2026)

### ECMA-402 2025

- Publisher status on 2026-10-06: ECMA-402 edition (2025).
- Pinned text: https://tc39.es/ecma402/2025/
- Revision token: ECMA-402 2025 (ECMA-402 edition, 2025)

### ECMA-402 2024

- Publisher status on 2026-10-06: ECMA-402 edition (2024).
- Pinned text: https://tc39.es/ecma402/2024/
- Revision token: ECMA-402 2024 (ECMA-402 edition, 2024)

### ECMA-402 draft

- Publisher status on 2026-10-06: Editor's draft (2026-10-06).
- Pinned text: https://tc39.es/ecma402/
- Revision token: tc39.es/ecma402 (Editor's draft, 2026-10-06)

## Upgrading

### 2025 to 2026

1. Treat documents that cite ECMA-402 2025 (ECMA-402 2025 (ECMA-402 edition, 2025)) as input.
2. Re-read ECMA-402 2026 at https://tc39.es/ecma402/2026/.
3. Keep behavior that ECMA-402 2026 still requires, and replace behavior that only ECMA-402 2025 required.
4. Record the target revision on the artifact.

### 2024 to 2026

1. Treat documents that cite ECMA-402 2024 (ECMA-402 2024 (ECMA-402 edition, 2024)) as input.
2. Re-read ECMA-402 2026 at https://tc39.es/ecma402/2026/.
3. Keep behavior that ECMA-402 2026 still requires, and replace behavior that only ECMA-402 2024 required.
4. Record the target revision on the artifact.

## Preview: ECMA-402 draft

`2027-preview` is a Editor's draft dated 2026-10-06, pinned at https://tc39.es/ecma402/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
