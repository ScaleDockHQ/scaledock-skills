# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id          | Line                        | Status    | Revision                                                                         | Posture | Publisher                    |
| ----------- | --------------------------- | --------- | -------------------------------------------------------------------------------- | ------- | ---------------------------- |
| `pex-2.1.1` | Presentation Exchange 2.1.1 | current   | Presentation Exchange v2.1.1, fetched 2026-10-06 (DIF specification, 2026-10-06) |         | DIF specification 2026-10-06 |
| `pex-2.1.0` | Presentation Exchange 2.1.0 | supported | Presentation Exchange v2.1.0, fetched 2026-10-06 (DIF specification, 2026-10-06) |         | DIF specification 2026-10-06 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Presentation Exchange 2.1.1

- Publisher status on 2026-10-06: DIF specification (2026-10-06).
- Pinned text: https://identity.foundation/presentation-exchange/spec/v2.1.1/
- Revision token: Presentation Exchange v2.1.1, fetched 2026-10-06 (DIF specification, 2026-10-06)

### Presentation Exchange 2.1.0

- Publisher status on 2026-10-06: DIF specification (2026-10-06).
- Pinned text: https://identity.foundation/presentation-exchange/spec/v2.1.0/
- Revision token: Presentation Exchange v2.1.0, fetched 2026-10-06 (DIF specification, 2026-10-06)

## Upgrading

### pex-2.1.0 to pex-2.1.1

1. Treat documents that cite Presentation Exchange 2.1.0 (Presentation Exchange v2.1.0, fetched 2026-10-06 (DIF specification, 2026-10-06)) as input.
2. Re-read Presentation Exchange 2.1.1 at https://identity.foundation/presentation-exchange/spec/v2.1.1/.
3. Keep behavior that Presentation Exchange 2.1.1 still requires, and replace behavior that only Presentation Exchange 2.1.0 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
