# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id     | Line | Status  | Revision                                         | Posture | Summary                                                              |
| ------ | ---- | ------- | ------------------------------------------------ | ------- | -------------------------------------------------------------------- |
| `madr` | MADR | current | MADR 4.0.0 (commit 2475fe1, released 2024-09-17) |         | MADR 4.0.0, with the full, minimal, bare and bare-minimal templates. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

Older MADR major versions (1.x, 2.x, 3.x) live on release branches of the repository and are not separate lines here. MADR 3.0.0 merged "Positive Consequences" and "Negative Consequences" into one "Consequences" section; 4.0.0 added the "Confirmation" section and the consulted/informed front matter.

## Upgrading

From a 3.x record to 4.0.0: move status, date and decision-makers into the YAML front matter, add consulted and informed if known, and add a Confirmation section when there is a way to check the decision.
