# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id      | Line  | Status  | Revision                         | Posture | Publisher          |
| ------- | ----- | ------- | -------------------------------- | ------- | ------------------ |
| `oscal` | OSCAL | current | OSCAL v1.2.3 release, 2026-08-07 |         | Release 2026-08-07 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### OSCAL

- Publisher status on 2026-10-06: OSCAL v1.2.3 is the latest release (2026-08-07); the Profile Resolution specification in it is marked as a draft.
- Pinned texts: the OSCAL Profile Resolution specification at the v1.2.3 tag, and the OSCAL-Pages concepts pages at commit 4e5c578e1459.
- Revision token: OSCAL v1.2.3 release, 2026-08-07

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
