# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id        | Line                                                                                    | Status  | Revision                                 | Posture | Publisher                    |
| --------- | --------------------------------------------------------------------------------------- | ------- | ---------------------------------------- | ------- | ---------------------------- |
| `rfc4918` | RFC 4918 HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV)          | current | RFC 4918 (PROPOSED STANDARD, June 2007)  |         | PROPOSED STANDARD June 2007  |
| `rfc4791` | RFC 4791 Calendaring Extensions to WebDAV (CalDAV)                                      | current | RFC 4791 (PROPOSED STANDARD, March 2007) |         | PROPOSED STANDARD March 2007 |
| `rfc6352` | RFC 6352 CardDAV: vCard Extensions to Web Distributed Authoring and Versioning (WebDAV) | current | RFC 6352 (PROPOSED STANDARD, August 201) |         | PROPOSED STANDARD August 201 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### RFC 4918 HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV)

- Publisher status on 2026-10-06: PROPOSED STANDARD (June 2007).
- Pinned text: https://www.rfc-editor.org/rfc/rfc4918.html
- Revision token: RFC 4918 (PROPOSED STANDARD, June 2007)

### RFC 4791 Calendaring Extensions to WebDAV (CalDAV)

- Publisher status on 2026-10-06: PROPOSED STANDARD (March 2007).
- Pinned text: https://www.rfc-editor.org/rfc/rfc4791.html
- Revision token: RFC 4791 (PROPOSED STANDARD, March 2007)

### RFC 6352 CardDAV: vCard Extensions to Web Distributed Authoring and Versioning (WebDAV)

- Publisher status on 2026-10-06: PROPOSED STANDARD (August 201).
- Pinned text: https://www.rfc-editor.org/rfc/rfc6352.html
- Revision token: RFC 6352 (PROPOSED STANDARD, August 201)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
