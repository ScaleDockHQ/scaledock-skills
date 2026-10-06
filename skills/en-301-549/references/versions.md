# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id         | Line              | Status    | Revision                                                                                   | Posture | Publisher                               |
| ---------- | ----------------- | --------- | ------------------------------------------------------------------------------------------ | ------- | --------------------------------------- |
| `en-4.1.1` | EN 301 549 V4.1.1 | current   | EN 301 549 V4.1.1 (2026-09), fetched 2026-10-06 (Harmonised European Standard, 2026-10-06) |         | Harmonised European Standard 2026-10-06 |
| `en-3.2.1` | EN 301 549 V3.2.1 | supported | EN 301 549 V3.2.1 (2021-03), fetched 2026-10-06 (Harmonised European Standard, 2026-10-06) |         | Harmonised European Standard 2026-10-06 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### EN 301 549 V4.1.1

- Publisher status on 2026-10-06: Harmonised European Standard (2026-10-06).
- Pinned text: https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.01_60/en_301549v040101p.pdf
- Revision token: EN 301 549 V4.1.1 (2026-09), fetched 2026-10-06 (Harmonised European Standard, 2026-10-06)

### EN 301 549 V3.2.1

- Publisher status on 2026-10-06: Harmonised European Standard (2026-10-06).
- Pinned text: https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf
- Revision token: EN 301 549 V3.2.1 (2021-03), fetched 2026-10-06 (Harmonised European Standard, 2026-10-06)

## Upgrading

### en-3.2.1 to en-4.1.1

1. Treat documents that cite EN 301 549 V3.2.1 (EN 301 549 V3.2.1 (2021-03), fetched 2026-10-06 (Harmonised European Standard, 2026-10-06)) as input.
2. Re-read EN 301 549 V4.1.1 at https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.01_60/en_301549v040101p.pdf.
3. Keep behavior that EN 301 549 V4.1.1 still requires, and replace behavior that only EN 301 549 V3.2.1 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
