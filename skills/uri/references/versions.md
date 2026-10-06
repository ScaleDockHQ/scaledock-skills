# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id        | Line                                                       | Status  | Revision                                 | Posture | Publisher                    |
| --------- | ---------------------------------------------------------- | ------- | ---------------------------------------- | ------- | ---------------------------- |
| `rfc3986` | RFC 3986 Uniform Resource Identifier (URI): Generic Syntax | current | RFC 3986 (INTERNET STANDARD, January 20) |         | INTERNET STANDARD January 20 |
| `rfc3987` | RFC 3987 Internationalized Resource Identifiers (IRIs)     | current | RFC 3987 (PROPOSED STANDARD, January 20) |         | PROPOSED STANDARD January 20 |
| `rfc8141` | RFC 8141 Uniform Resource Names (URNs)                     | current | RFC 8141 (PROPOSED STANDARD, April 2017) |         | PROPOSED STANDARD April 2017 |
| `rfc6570` | RFC 6570 URI Template                                      | current | RFC 6570 (PROPOSED STANDARD, March 2012) |         | PROPOSED STANDARD March 2012 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### RFC 3986 Uniform Resource Identifier (URI): Generic Syntax

- Publisher status on 2026-10-06: INTERNET STANDARD (January 20).
- Pinned text: https://www.rfc-editor.org/rfc/rfc3986.html
- Revision token: RFC 3986 (INTERNET STANDARD, January 20)

### RFC 3987 Internationalized Resource Identifiers (IRIs)

- Publisher status on 2026-10-06: PROPOSED STANDARD (January 20).
- Pinned text: https://www.rfc-editor.org/rfc/rfc3987.html
- Revision token: RFC 3987 (PROPOSED STANDARD, January 20)

### RFC 8141 Uniform Resource Names (URNs)

- Publisher status on 2026-10-06: PROPOSED STANDARD (April 2017).
- Pinned text: https://www.rfc-editor.org/rfc/rfc8141.html
- Revision token: RFC 8141 (PROPOSED STANDARD, April 2017)

### RFC 6570 URI Template

- Publisher status on 2026-10-06: PROPOSED STANDARD (March 2012).
- Pinned text: https://www.rfc-editor.org/rfc/rfc6570.html
- Revision token: RFC 6570 (PROPOSED STANDARD, March 2012)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
