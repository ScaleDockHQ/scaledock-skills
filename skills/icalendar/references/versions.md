# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id        | Line                                                                               | Status  | Revision                                 | Posture | Publisher                   |
| --------- | ---------------------------------------------------------------------------------- | ------- | ---------------------------------------- | ------- | --------------------------- |
| `rfc5545` | RFC 5545 Internet Calendaring and Scheduling Core Object Specification (iCalendar) | current | RFC 5545 (PROPOSED STANDARD, September ) |         | PROPOSED STANDARD September |
| `rfc7265` | RFC 7265 jCal: The JSON Format for iCalendar                                       | current | RFC 7265 (PROPOSED STANDARD, May 2014)   |         | PROPOSED STANDARD May 2014  |
| `rfc8984` | RFC 8984 JSCalendar: A JSON Representation of Calendar Data                        | current | RFC 8984 (PROPOSED STANDARD, July 2021)  |         | PROPOSED STANDARD July 2021 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### RFC 5545 Internet Calendaring and Scheduling Core Object Specification (iCalendar)

- Publisher status on 2026-10-06: PROPOSED STANDARD (September ).
- Pinned text: https://www.rfc-editor.org/rfc/rfc5545.html
- Revision token: RFC 5545 (PROPOSED STANDARD, September )

### RFC 7265 jCal: The JSON Format for iCalendar

- Publisher status on 2026-10-06: PROPOSED STANDARD (May 2014).
- Pinned text: https://www.rfc-editor.org/rfc/rfc7265.html
- Revision token: RFC 7265 (PROPOSED STANDARD, May 2014)

### RFC 8984 JSCalendar: A JSON Representation of Calendar Data

- Publisher status on 2026-10-06: PROPOSED STANDARD (July 2021).
- Pinned text: https://www.rfc-editor.org/rfc/rfc8984.html
- Revision token: RFC 8984 (PROPOSED STANDARD, July 2021)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
