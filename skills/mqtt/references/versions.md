# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id           | Line       | Status    | Revision                                                    | Posture | Publisher                 |
| ------------ | ---------- | --------- | ----------------------------------------------------------- | ------- | ------------------------- |
| `mqtt-5.0`   | MQTT 5.0   | current   | MQTT 5.0, fetched 2026-10-06 (OASIS Standard, 2026-10-06)   |         | OASIS Standard 2026-10-06 |
| `mqtt-3.1.1` | MQTT 3.1.1 | supported | MQTT 3.1.1, fetched 2026-10-06 (OASIS Standard, 2026-10-06) |         | OASIS Standard 2026-10-06 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### MQTT 5.0

- Publisher status on 2026-10-06: OASIS Standard (2026-10-06).
- Pinned text: https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html
- Revision token: MQTT 5.0, fetched 2026-10-06 (OASIS Standard, 2026-10-06)

### MQTT 3.1.1

- Publisher status on 2026-10-06: OASIS Standard (2026-10-06).
- Pinned text: https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
- Revision token: MQTT 3.1.1, fetched 2026-10-06 (OASIS Standard, 2026-10-06)

## Upgrading

### mqtt-3.1.1 to mqtt-5.0

1. Treat documents that cite MQTT 3.1.1 (MQTT 3.1.1, fetched 2026-10-06 (OASIS Standard, 2026-10-06)) as input.
2. Re-read MQTT 5.0 at https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html.
3. Keep behavior that MQTT 5.0 still requires, and replace behavior that only MQTT 3.1.1 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
