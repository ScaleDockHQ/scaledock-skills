# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id          | Line      | Status  | Revision                      | Posture | Summary                         |
| ----------- | --------- | ------- | ----------------------------- | ------- | ------------------------------- |
| `sysml-2-0` | SysML 2.0 | current | formal/2026-03-02, March 2026 |         | Language specification, Part 1. |
| `sysml-1-7` | SysML 1.7 | legacy  | formal/24-01-07, January 2024 |         | Previous published SysML line.  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

SysML 2.0 is the latest published language specification fetched for this skill. SysML 1.7 remains in the skill as a legacy line so an older model can be recognised and is not authored as current.

## Upgrading

SysML 1.7 and SysML 2.0 are separate published generations. Read a 1.7 document as input. Author the result against the SysML 2.0 language specification. Do not treat a 1.7 element name as valid in 2.0 unless the 2.0 text says so.
