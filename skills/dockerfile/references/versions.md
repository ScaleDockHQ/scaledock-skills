# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id           | Line       | Status  | Revision                                                                 | Posture | Summary                                                                                                                |
| ------------ | ---------- | ------- | ------------------------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| `dockerfile` | Dockerfile | current | BuildKit v0.33.1 (commit 8c91502), Dockerfile syntax docker/dockerfile:1 |         | The Dockerfile frontend, selected with the syntax parser directive; docker/dockerfile:1 tracks the latest 1.x release. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The Dockerfile syntax is versioned through the `# syntax=` parser directive rather than as a document. Newer instructions and flags in the reference name the Dockerfile version that added them (for example `check` since Dockerfile v1.8.0); check that the builder in use supports them.

## Upgrading

To use a newer Dockerfile feature, set `# syntax=docker/dockerfile:1` (or a pinned 1.x version) as the first line, keep it with any other parser directives at the top of the file, and rebuild.
