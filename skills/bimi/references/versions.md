# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id              | Line          | Status  | Revision                                                         | Posture | Summary                                                                                    |
| --------------- | ------------- | ------- | ---------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `bimi-draft-14` | BIMI draft-14 | current | draft-brand-indicators-for-message-identification-14, 1 May 2026 | build   | The only publication is an Internet-Draft; it is widely deployed, so the posture is build. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

BIMI has no RFC yet. The draft is the only text, so it is the current line with posture build. Check the IETF datatracker for a newer draft number or an RFC when refreshing.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
