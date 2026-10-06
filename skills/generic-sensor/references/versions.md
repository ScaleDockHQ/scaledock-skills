# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                   | Line                 | Status  | Revision                                                                                | Posture | Publisher                                 |
| -------------------- | -------------------- | ------- | --------------------------------------------------------------------------------------- | ------- | ----------------------------------------- |
| `generic-sensor`     | Generic Sensor API   | current | generic-sensor CRD-generic-sensor-20260514 (Candidate Recommendation Draft, 2026-05-14) | build   | Candidate Recommendation Draft 2026-05-14 |
| `accelerometer`      | Accelerometer        | current | accelerometer CRD-accelerometer-20260514 (Candidate Recommendation Draft, 2026-05-14)   | build   | Candidate Recommendation Draft 2026-05-14 |
| `gyroscope`          | Gyroscope            | current | gyroscope CRD-gyroscope-20260514 (Candidate Recommendation Draft, 2026-05-14)           | build   | Candidate Recommendation Draft 2026-05-14 |
| `magnetometer`       | Magnetometer         | current | magnetometer WD-magnetometer-20260514 (Working Draft, 2026-05-14)                       | track   | Working Draft 2026-05-14                  |
| `orientation-sensor` | Orientation Sensor   | current | orientation-sensor WD-orientation-sensor-20260514 (Working Draft, 2026-05-14)           | track   | Working Draft 2026-05-14                  |
| `ambient-light`      | Ambient Light Sensor | current | ambient-light WD-ambient-light-20260514 (Working Draft, 2026-05-14)                     | track   | Working Draft 2026-05-14                  |
| `proximity`          | Proximity Sensor     | current | proximity WD-proximity-20260514 (Working Draft, 2026-05-14)                             | track   | Working Draft 2026-05-14                  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Generic Sensor API

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2026-05-14).
- Pinned text: https://www.w3.org/TR/generic-sensor/
- Revision token: generic-sensor CRD-generic-sensor-20260514 (Candidate Recommendation Draft, 2026-05-14)

### Accelerometer

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2026-05-14).
- Pinned text: https://www.w3.org/TR/accelerometer/
- Revision token: accelerometer CRD-accelerometer-20260514 (Candidate Recommendation Draft, 2026-05-14)

### Gyroscope

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2026-05-14).
- Pinned text: https://www.w3.org/TR/gyroscope/
- Revision token: gyroscope CRD-gyroscope-20260514 (Candidate Recommendation Draft, 2026-05-14)

### Magnetometer

- Publisher status on 2026-10-06: Working Draft (2026-05-14).
- Pinned text: https://www.w3.org/TR/magnetometer/
- Revision token: magnetometer WD-magnetometer-20260514 (Working Draft, 2026-05-14)

### Orientation Sensor

- Publisher status on 2026-10-06: Working Draft (2026-05-14).
- Pinned text: https://www.w3.org/TR/orientation-sensor/
- Revision token: orientation-sensor WD-orientation-sensor-20260514 (Working Draft, 2026-05-14)

### Ambient Light Sensor

- Publisher status on 2026-10-06: Working Draft (2026-05-14).
- Pinned text: https://www.w3.org/TR/ambient-light/
- Revision token: ambient-light WD-ambient-light-20260514 (Working Draft, 2026-05-14)

### Proximity Sensor

- Publisher status on 2026-10-06: Working Draft (2026-05-14).
- Pinned text: https://www.w3.org/TR/proximity/
- Revision token: proximity WD-proximity-20260514 (Working Draft, 2026-05-14)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
