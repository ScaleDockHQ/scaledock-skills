# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id    | Line                    | Status  | Revision                                                          | Posture | Summary                                                                                                       |
| ----- | ----------------------- | ------- | ----------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `gpp` | Global Privacy Platform | current | GPP String version 1 and CMP API 1.1, commit 03fdf03 (2026-08-06) |         | GPP String version 1 (header type 3) with discrete sections; CMP API 1.1 with callback-only `__gpp` commands. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The GPP String header carries version 1; the Consent String Specification is document version 1.0 (last updated 3 November 2023). The CMP API is version 1.1 (June 2023), which removed return values in favour of callbacks and dropped the `getGPPData` command. Section versions are set by each section's own specification.

## Upgrading

From CMP API 1.0 to 1.1: read results only from the callback, because 1.1 removed return values, and replace `getGPPData` with `ping`, `getSection` and `getField`.
