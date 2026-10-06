# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id         | Line     | Status    | Revision                                                 | Posture | Publisher                |
| ---------- | -------- | --------- | -------------------------------------------------------- | ------- | ------------------------ |
| `cvss-4.0` | CVSS 4.0 | current   | CVSS 4.0, fetched 2026-10-06 (Specification, 2026-10-06) |         | Specification 2026-10-06 |
| `cvss-3.1` | CVSS 3.1 | supported | CVSS 3.1, fetched 2026-10-06 (Specification, 2026-10-06) |         | Specification 2026-10-06 |
| `cvss-2.0` | CVSS 2.0 | legacy    | CVSS 2.0 guide, fetched 2026-10-06 (Guide, 2026-10-06)   |         | Guide 2026-10-06         |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### CVSS 4.0

- Publisher status on 2026-10-06: Specification (2026-10-06).
- Pinned text: https://www.first.org/cvss/v4.0/specification-document
- Revision token: CVSS 4.0, fetched 2026-10-06 (Specification, 2026-10-06)

### CVSS 3.1

- Publisher status on 2026-10-06: Specification (2026-10-06).
- Pinned text: https://www.first.org/cvss/v3.1/specification-document
- Revision token: CVSS 3.1, fetched 2026-10-06 (Specification, 2026-10-06)

### CVSS 2.0

- Publisher status on 2026-10-06: Guide (2026-10-06).
- Pinned text: https://www.first.org/cvss/v2/guide
- Revision token: CVSS 2.0 guide, fetched 2026-10-06 (Guide, 2026-10-06)

## Upgrading

### cvss-3.1 to cvss-4.0

1. Treat documents that cite CVSS 3.1 (CVSS 3.1, fetched 2026-10-06 (Specification, 2026-10-06)) as input.
2. Re-read CVSS 4.0 at https://www.first.org/cvss/v4.0/specification-document.
3. Keep behavior that CVSS 4.0 still requires, and replace behavior that only CVSS 3.1 required.
4. Record the target revision on the artifact.

### cvss-2.0 to cvss-4.0

1. Treat documents that cite CVSS 2.0 (CVSS 2.0 guide, fetched 2026-10-06 (Guide, 2026-10-06)) as input.
2. Re-read CVSS 4.0 at https://www.first.org/cvss/v4.0/specification-document.
3. Keep behavior that CVSS 4.0 still requires, and replace behavior that only CVSS 2.0 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
