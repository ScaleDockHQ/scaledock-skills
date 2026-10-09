# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                     | Line                    | Status  | Revision                                                | Posture | Summary                                                                                                              |
| ---------------------- | ----------------------- | ------- | ------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `buildpacks-platform`  | Buildpacks platform API | current | Platform API 0.15 (main at commit b745fcf, 2025-12-11)  |         | Interface between a platform and the lifecycle: phases, lifecycle binaries, inputs, outputs and environment.         |
| `buildpacks-buildpack` | Buildpack API           | current | Buildpack API 0.12 (main at commit b745fcf, 2025-12-11) |         | Interface between the lifecycle and buildpacks: detect and build executables, layers, Build Plan and buildpack.toml. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The two APIs are versioned separately. A buildpack declares its Buildpack API version in `buildpack.toml` (`api`), and a platform sets `CNB_PLATFORM_API`; a lifecycle conforms to the matching version or returns an error. Released API versions are tagged in buildpacks/spec (for example `platform/0.15`).

## Upgrading

To move a buildpack to a newer Buildpack API, raise `api` in `buildpack.toml` and re-check the Phase sections and the `buildpack.toml` schema of the target version. To move a platform, set `CNB_PLATFORM_API` to the new version and re-check the lifecycle binary inputs and outputs.
