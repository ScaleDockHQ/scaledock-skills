# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id           | Line       | Status  | Revision                                               | Posture | Summary                                                                                                                              |
| ------------ | ---------- | ------- | ------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `opengitops` | OpenGitOps | current | GitOps Principles and Glossary v1.0.0 (commit d36cde8) |         | The four GitOps principles (declarative, versioned and immutable, pulled automatically, continuously reconciled) and their glossary. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The Principles and the Glossary are versioned and released together. The `main` branch is a work in progress and adds a Pull glossary entry that is not in a release yet; quote only the pinned release.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
