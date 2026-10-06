# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                       | Line                        | Status  | Revision                                                               | Posture | Publisher          |
| ------------------------ | --------------------------- | ------- | ---------------------------------------------------------------------- | ------- | ------------------ |
| `oci-image-1.1.1`        | OCI Image Spec 1.1.1        | current | OCI image-spec v1.1.1, fetched 2026-10-06 (Release, 2026-10-06)        |         | Release 2026-10-06 |
| `oci-distribution-1.1.1` | OCI Distribution Spec 1.1.1 | current | OCI distribution-spec v1.1.1, fetched 2026-10-06 (Release, 2026-10-06) |         | Release 2026-10-06 |
| `oci-runtime-1.2.1`      | OCI Runtime Spec 1.2.1      | current | OCI runtime-spec v1.2.1, fetched 2026-10-06 (Release, 2026-10-06)      |         | Release 2026-10-06 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### OCI Image Spec 1.1.1

- Publisher status on 2026-10-06: Release (2026-10-06).
- Pinned text: https://raw.githubusercontent.com/opencontainers/image-spec/v1.1.1/spec.md
- Revision token: OCI image-spec v1.1.1, fetched 2026-10-06 (Release, 2026-10-06)

### OCI Distribution Spec 1.1.1

- Publisher status on 2026-10-06: Release (2026-10-06).
- Pinned text: https://raw.githubusercontent.com/opencontainers/distribution-spec/v1.1.1/spec.md
- Revision token: OCI distribution-spec v1.1.1, fetched 2026-10-06 (Release, 2026-10-06)

### OCI Runtime Spec 1.2.1

- Publisher status on 2026-10-06: Release (2026-10-06).
- Pinned text: https://raw.githubusercontent.com/opencontainers/runtime-spec/v1.2.1/spec.md
- Revision token: OCI runtime-spec v1.2.1, fetched 2026-10-06 (Release, 2026-10-06)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
