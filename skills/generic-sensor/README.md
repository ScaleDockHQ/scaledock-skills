# generic-sensor

An agent skill for Generic Sensor API.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill generic-sensor
```

Then ask the agent to apply Generic Sensor API.

## What it covers

- when reading motion or environment sensors
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                 | Status          |
| -------------------- | --------------- |
| Generic Sensor API   | current (build) |
| Accelerometer        | current (build) |
| Gyroscope            | current (build) |
| Magnetometer         | current (track) |
| Orientation Sensor   | current (track) |
| Ambient Light Sensor | current (track) |
| Proximity Sensor     | current (track) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Generic Sensor API](https://www.w3.org/TR/generic-sensor/): Candidate Recommendation Draft, generic-sensor CRD-generic-sensor-20260514 (Candidate Recommendation Draft, 2026-05-14).
- [Accelerometer](https://www.w3.org/TR/accelerometer/): Candidate Recommendation Draft, accelerometer CRD-accelerometer-20260514 (Candidate Recommendation Draft, 2026-05-14).
- [Gyroscope](https://www.w3.org/TR/gyroscope/): Candidate Recommendation Draft, gyroscope CRD-gyroscope-20260514 (Candidate Recommendation Draft, 2026-05-14).
- [Magnetometer](https://www.w3.org/TR/magnetometer/): Working Draft, magnetometer WD-magnetometer-20260514 (Working Draft, 2026-05-14).
- [Orientation Sensor](https://www.w3.org/TR/orientation-sensor/): Working Draft, orientation-sensor WD-orientation-sensor-20260514 (Working Draft, 2026-05-14).
- [Ambient Light Sensor](https://www.w3.org/TR/ambient-light/): Working Draft, ambient-light WD-ambient-light-20260514 (Working Draft, 2026-05-14).
- [Proximity Sensor](https://www.w3.org/TR/proximity/): Working Draft, proximity WD-proximity-20260514 (Working Draft, 2026-05-14).

## License

MIT
