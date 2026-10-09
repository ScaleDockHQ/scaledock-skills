# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id          | Line                 | Status  | Revision                                            | Posture | Summary                                                                                           |
| ----------- | -------------------- | ------- | --------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| `smart-2.2` | SMART App Launch 2.2 | current | SMART App Launch v2.2.0 (STU 2.2), based on FHIR R4 |         | Current published release of the guide; requires PKCE with S256 and defines the 2.x scope syntax. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

Each page of the guide states that it is v2.2.0 (STU 2.2) based on FHIR R4. Older releases (1.0 and 2.0, 2.1) are in the guide's directory of published versions and are not pinned here.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
