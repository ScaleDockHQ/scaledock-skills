# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id        | Line                                                                                                                                                      | Status  | Revision                                 | Posture | Publisher                    |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------- | ------- | ---------------------------- |
| `rfc8949` | RFC 8949 Concise Binary Object Representation (CBOR)                                                                                                      | current | RFC 8949 (INTERNET STANDARD, December 2) |         | INTERNET STANDARD December 2 |
| `rfc8610` | RFC 8610 Concise Data Definition Language (CDDL): A Notational Convention to Express Concise Binary Object Representation (CBOR) and JSON Data Structures | current | RFC 8610 (PROPOSED STANDARD, June 2019)  |         | PROPOSED STANDARD June 2019  |
| `rfc9165` | RFC 9165 Additional Control Operators for the Concise Data Definition Language (CDDL)                                                                     | current | RFC 9165 (PROPOSED STANDARD, December 2) |         | PROPOSED STANDARD December 2 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### RFC 8949 Concise Binary Object Representation (CBOR)

- Publisher status on 2026-10-06: INTERNET STANDARD (December 2).
- Pinned text: https://www.rfc-editor.org/rfc/rfc8949.html
- Revision token: RFC 8949 (INTERNET STANDARD, December 2)

### RFC 8610 Concise Data Definition Language (CDDL): A Notational Convention to Express Concise Binary Object Representation (CBOR) and JSON Data Structures

- Publisher status on 2026-10-06: PROPOSED STANDARD (June 2019).
- Pinned text: https://www.rfc-editor.org/rfc/rfc8610.html
- Revision token: RFC 8610 (PROPOSED STANDARD, June 2019)

### RFC 9165 Additional Control Operators for the Concise Data Definition Language (CDDL)

- Publisher status on 2026-10-06: PROPOSED STANDARD (December 2).
- Pinned text: https://www.rfc-editor.org/rfc/rfc9165.html
- Revision token: RFC 9165 (PROPOSED STANDARD, December 2)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
