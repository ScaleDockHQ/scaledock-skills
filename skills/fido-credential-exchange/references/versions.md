# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id        | Line                             | Status  | Revision                                                                           | Posture | Publisher                           |
| --------- | -------------------------------- | ------- | ---------------------------------------------------------------------------------- | ------- | ----------------------------------- |
| `cxf-1.0` | Credential Exchange Format 1.0   | current | CXF 1.0 Proposed Standard errata 2026-03-09 (Proposed Standard errata, 2026-03-09) |         | Proposed Standard errata 2026-03-09 |
| `cxp-1.0` | Credential Exchange Protocol 1.0 | current | CXP 1.0 Working Draft 2024-10-03 (Working Draft, 2024-10-03)                       | build   | Working Draft 2024-10-03            |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Credential Exchange Format 1.0

- Publisher status on 2026-10-06: Proposed Standard errata (2026-03-09).
- Pinned text: https://fidoalliance.org/specs/cx/cxf-v1.0-ps-errata-20260309.html
- Revision token: CXF 1.0 Proposed Standard errata 2026-03-09 (Proposed Standard errata, 2026-03-09)

### Credential Exchange Protocol 1.0

- Publisher status on 2026-10-06: Working Draft (2024-10-03).
- Pinned text: https://fidoalliance.org/specs/cx/cxp-v1.0-wd-20241003.html
- Revision token: CXP 1.0 Working Draft 2024-10-03 (Working Draft, 2024-10-03)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
