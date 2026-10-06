# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                  | Line              | Status  | Revision                                                           | Posture | Publisher                 |
| ------------------- | ----------------- | ------- | ------------------------------------------------------------------ | ------- | ------------------------- |
| `proto3`            | proto3            | current | proto3 guide, fetched 2026-10-06 (Language guide, 2026-10-06)      |         | Language guide 2026-10-06 |
| `proto2`            | proto2            | legacy  | proto2 guide, fetched 2026-10-06 (Language guide, 2026-10-06)      |         | Language guide 2026-10-06 |
| `protobuf-editions` | Protobuf Editions | current | Protobuf editions, fetched 2026-10-06 (Language guide, 2026-10-06) |         | Language guide 2026-10-06 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### proto3

- Publisher status on 2026-10-06: Language guide (2026-10-06).
- Pinned text: https://protobuf.dev/programming-guides/proto3/
- Revision token: proto3 guide, fetched 2026-10-06 (Language guide, 2026-10-06)

### proto2

- Publisher status on 2026-10-06: Language guide (2026-10-06).
- Pinned text: https://protobuf.dev/programming-guides/proto2/
- Revision token: proto2 guide, fetched 2026-10-06 (Language guide, 2026-10-06)

### Protobuf Editions

- Publisher status on 2026-10-06: Language guide (2026-10-06).
- Pinned text: https://protobuf.dev/editions/
- Revision token: Protobuf editions, fetched 2026-10-06 (Language guide, 2026-10-06)

## Upgrading

### proto2 to proto3

1. Treat documents that cite proto2 (proto2 guide, fetched 2026-10-06 (Language guide, 2026-10-06)) as input.
2. Re-read proto3 at https://protobuf.dev/programming-guides/proto3/.
3. Keep behavior that proto3 still requires, and replace behavior that only proto2 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
