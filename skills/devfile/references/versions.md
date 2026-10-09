# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id            | Line        | Status  | Revision                                                  | Posture | Summary                                                                  |
| ------------- | ----------- | ------- | --------------------------------------------------------- | ------- | ------------------------------------------------------------------------ |
| `devfile-2.3` | Devfile 2.3 | current | Devfile schema 2.3.0 (devfile/api v2.3.0, commit c088cf3) |         | Devfile schema 2.3.0; a devfile declares it with `schemaVersion: 2.3.0`. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

A devfile names its schema version in `schemaVersion`, the only required root element. devfile/api also has a v2.3.1-alpha pre-release tag; this skill pins the released 2.3.0 schema.

## Upgrading

From 2.2.x: set `schemaVersion` to `2.3.0` and validate the devfile against the 2.3.0 schema; component, command and event structures carry over.
