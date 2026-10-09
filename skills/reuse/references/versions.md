# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id      | Line  | Status  | Revision                                               | Posture | Summary                                                                            |
| ------- | ----- | ------- | ------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------- |
| `reuse` | REUSE | current | Version 3.3, 2024-11-14 (reuse-website commit 82e32ee) |         | REUSE Specification 3.3, with `REUSE.toml` as the bulk method and DEP5 deprecated. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

Earlier REUSE Specification versions (1.2, 2.0, 3.0, 3.2) are published alongside 3.3 on the website. Version 3.3 is the one reuse.software/spec/ redirects to.

## Upgrading

From a project that uses `.reuse/dep5`: move each paragraph into an `[[annotations]]` table in a `REUSE.toml` file at the project root, then delete `.reuse/dep5`. DEP5 is deprecated in 3.3.
