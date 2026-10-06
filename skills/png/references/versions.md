# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id      | Line                                                                   | Status  | Revision                                              | Posture | Publisher                 |
| ------- | ---------------------------------------------------------------------- | ------- | ----------------------------------------------------- | ------- | ------------------------- |
| `png-3` | Portable Network Graphics (PNG) Specification (Third Edition) Level 3  | current | png-3 REC-png-3-20250624 (Recommendation, 2025-06-24) |         | Recommendation 2025-06-24 |
| `png-2` | Portable Network Graphics (PNG) Specification (Second Edition) Level 2 | legacy  | png-2 REC-png-3-20250624 (Recommendation, 2003-11-10) |         | Recommendation 2003-11-10 |
| `png-1` | Portable Network Graphics (PNG) Specification Level 1                  | legacy  | png-1 REC-png-3-20250624 (Recommendation, 1996-10-01) |         | Recommendation 1996-10-01 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Portable Network Graphics (PNG) Specification (Third Edition) Level 3

- Publisher status on 2026-10-06: Recommendation (2025-06-24).
- Pinned text: https://www.w3.org/TR/png-3/
- Revision token: png-3 REC-png-3-20250624 (Recommendation, 2025-06-24)

### Portable Network Graphics (PNG) Specification (Second Edition) Level 2

- Publisher status on 2026-10-06: Recommendation (2003-11-10).
- Pinned text: https://www.w3.org/TR/PNG/
- Revision token: png-2 REC-png-3-20250624 (Recommendation, 2003-11-10)

### Portable Network Graphics (PNG) Specification Level 1

- Publisher status on 2026-10-06: Recommendation (1996-10-01).
- Pinned text: https://www.w3.org/TR/PNG/
- Revision token: png-1 REC-png-3-20250624 (Recommendation, 1996-10-01)

## Upgrading

### png-2 to png-3

1. Treat documents that cite Portable Network Graphics (PNG) Specification (Second Edition) Level 2 (png-2 REC-png-3-20250624 (Recommendation, 2003-11-10)) as input.
2. Re-read Portable Network Graphics (PNG) Specification (Third Edition) Level 3 at https://www.w3.org/TR/png-3/.
3. Keep behavior that Portable Network Graphics (PNG) Specification (Third Edition) Level 3 still requires, and replace behavior that only Portable Network Graphics (PNG) Specification (Second Edition) Level 2 required.
4. Record the target revision on the artifact.

### png-1 to png-3

1. Treat documents that cite Portable Network Graphics (PNG) Specification Level 1 (png-1 REC-png-3-20250624 (Recommendation, 1996-10-01)) as input.
2. Re-read Portable Network Graphics (PNG) Specification (Third Edition) Level 3 at https://www.w3.org/TR/png-3/.
3. Keep behavior that Portable Network Graphics (PNG) Specification (Third Edition) Level 3 still requires, and replace behavior that only Portable Network Graphics (PNG) Specification Level 1 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
