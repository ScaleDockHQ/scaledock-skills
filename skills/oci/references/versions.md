# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                       | Line                        | Status  | Revision                                  | Posture | Summary                                                                                                   |
| ------------------------ | --------------------------- | ------- | ----------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `oci-image-1.1.1`        | OCI Image Spec 1.1.1        | current | image-spec v1.1.1 (commit 147f9c1)        |         | Image manifest, image index, descriptors, layers and configuration; 1.1 added artifactType and subject.   |
| `oci-distribution-1.1.1` | OCI Distribution Spec 1.1.1 | current | distribution-spec v1.1.1 (commit a139cc4) |         | Registry HTTP API for pull, push, content discovery (including the referrers API) and content management. |
| `oci-runtime-1.2.1`      | OCI Runtime Spec 1.2.1      | current | runtime-spec v1.2.1 (commit 524fc0e)      |         | Container configuration (config.json), runtime state, lifecycle, operations and hooks.                    |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The three specifications are released separately and each has its own line. Pin each release tag's commit in [Sources](../SKILL.md#sources).

## Upgrading

From Image and Distribution Spec 1.0 to 1.1: support `artifactType` and `subject` in manifests, the referrers API, and the referrers tag fallback that Distribution Spec Backwards Compatibility requires of clients when a registry lacks the API.
