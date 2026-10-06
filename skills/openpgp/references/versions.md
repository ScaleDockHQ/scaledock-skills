# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id        | Line                            | Status  | Revision                                 | Posture | Publisher                    |
| --------- | ------------------------------- | ------- | ---------------------------------------- | ------- | ---------------------------- |
| `rfc9580` | RFC 9580 OpenPGP                | current | RFC 9580 (PROPOSED STANDARD, July 2024)  |         | PROPOSED STANDARD July 2024  |
| `rfc4880` | RFC 4880 OpenPGP Message Format | legacy  | RFC 4880 (PROPOSED STANDARD, November 2) |         | PROPOSED STANDARD November 2 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### RFC 9580 OpenPGP

- Publisher status on 2026-10-06: PROPOSED STANDARD (July 2024).
- Pinned text: https://www.rfc-editor.org/rfc/rfc9580.html
- Revision token: RFC 9580 (PROPOSED STANDARD, July 2024)

### RFC 4880 OpenPGP Message Format

- Publisher status on 2026-10-06: PROPOSED STANDARD (November 2).
- Pinned text: https://www.rfc-editor.org/rfc/rfc4880.html
- Revision token: RFC 4880 (PROPOSED STANDARD, November 2)

## Upgrading

### rfc4880 to rfc9580

1. Treat documents that cite RFC 4880 OpenPGP Message Format (RFC 4880 (PROPOSED STANDARD, November 2)) as input.
2. Re-read RFC 9580 OpenPGP at https://www.rfc-editor.org/rfc/rfc9580.html.
3. Keep behavior that RFC 9580 OpenPGP still requires, and replace behavior that only RFC 4880 OpenPGP Message Format required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
