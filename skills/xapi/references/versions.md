# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id               | Line           | Status  | Revision                                                                                 | Posture | Summary                                                                                                                                    |
| ---------------- | -------------- | ------- | ---------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `experience-api` | Experience API | current | adlnet/xAPI-Spec commit ca782a1, 2025-07-03 (the 1.0.x text; examples use version 1.0.3) |         | The 1.0.x Experience API text on the master branch of adlnet/xAPI-Spec; an LRS accepts 1.0.x version headers and rejects 1.1.0 or greater. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The pinned text is the master branch of adlnet/xAPI-Spec at a commit. Part Three § 3.3 Versioning fixes the accepted `X-Experience-API-Version` values; follow it rather than any version named elsewhere.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
