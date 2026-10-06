# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id        | Line                                                          | Status  | Revision                                | Posture | Publisher                   |
| --------- | ------------------------------------------------------------- | ------- | --------------------------------------- | ------- | --------------------------- |
| `rfc9562` | RFC 9562 Universally Unique IDentifiers (UUIDs)               | current | RFC 9562 (PROPOSED STANDARD, May 2024)  |         | PROPOSED STANDARD May 2024  |
| `rfc4122` | RFC 4122 A Universally Unique IDentifier (UUID) URN Namespace | legacy  | RFC 4122 (PROPOSED STANDARD, July 2005) |         | PROPOSED STANDARD July 2005 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### RFC 9562 Universally Unique IDentifiers (UUIDs)

- Publisher status on 2026-10-06: PROPOSED STANDARD (May 2024).
- Pinned text: https://www.rfc-editor.org/rfc/rfc9562.html
- Revision token: RFC 9562 (PROPOSED STANDARD, May 2024)

### RFC 4122 A Universally Unique IDentifier (UUID) URN Namespace

- Publisher status on 2026-10-06: PROPOSED STANDARD (July 2005).
- Pinned text: https://www.rfc-editor.org/rfc/rfc4122.html
- Revision token: RFC 4122 (PROPOSED STANDARD, July 2005)

## Upgrading

### rfc4122 to rfc9562

1. Treat documents that cite RFC 4122 A Universally Unique IDentifier (UUID) URN Namespace (RFC 4122 (PROPOSED STANDARD, July 2005)) as input.
2. Re-read RFC 9562 Universally Unique IDentifiers (UUIDs) at https://www.rfc-editor.org/rfc/rfc9562.html.
3. Keep behavior that RFC 9562 Universally Unique IDentifiers (UUIDs) still requires, and replace behavior that only RFC 4122 A Universally Unique IDentifier (UUID) URN Namespace required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
