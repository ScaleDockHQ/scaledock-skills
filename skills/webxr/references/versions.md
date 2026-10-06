# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                            | Line                                     | Status  | Revision                                                                                        | Posture | Publisher                                 |
| ----------------------------- | ---------------------------------------- | ------- | ----------------------------------------------------------------------------------------------- | ------- | ----------------------------------------- |
| `webxr`                       | WebXR Device API                         | current | webxr CRD-webxr-20260609 (Candidate Recommendation Draft, 2026-06-09)                           | build   | Candidate Recommendation Draft 2026-06-09 |
| `webxr-ar-module-1`           | WebXR Augmented Reality Module - Level 1 | current | webxr-ar-module-1 CRD-webxr-ar-module-1-20250425 (Candidate Recommendation Draft, 2025-04-25)   | build   | Candidate Recommendation Draft 2025-04-25 |
| `webxr-depth-sensing-1`       | WebXR Depth Sensing Module Level 1       | current | webxr-depth-sensing-1 WD-webxr-depth-sensing-1-20260825 (Working Draft, 2026-08-25)             | track   | Working Draft 2026-08-25                  |
| `webxr-dom-overlays-1`        | WebXR DOM Overlays Module Level 1        | current | webxr-dom-overlays-1 WD-webxr-dom-overlays-1-20240924 (Working Draft, 2024-09-24)               | track   | Working Draft 2024-09-24                  |
| `webxr-gamepads-module-1`     | WebXR Gamepads Module - Level 1          | current | webxr-gamepads-module-1 WD-webxr-gamepads-module-1-20250707 (Working Draft, 2025-07-07)         | track   | Working Draft 2025-07-07                  |
| `webxr-hand-input-1`          | WebXR Hand Input Module - Level 1        | current | webxr-hand-input-1 WD-webxr-hand-input-1-20240605 (Working Draft, 2024-06-05)                   | track   | Working Draft 2024-06-05                  |
| `webxr-hit-test-1`            | WebXR Hit Test Module Level 1            | current | webxr-hit-test-1 WD-webxr-hit-test-1-20251211 (Working Draft, 2025-12-11)                       | track   | Working Draft 2025-12-11                  |
| `webxrlayers-1`               | WebXR Layers API Level 1                 | current | webxrlayers-1 WD-webxrlayers-1-20260811 (Working Draft, 2026-08-11)                             | track   | Working Draft 2026-08-11                  |
| `webxr-lighting-estimation-1` | WebXR Lighting Estimation API Level 1    | current | webxr-lighting-estimation-1 WD-webxr-lighting-estimation-1-20251211 (Working Draft, 2025-12-11) | track   | Working Draft 2025-12-11                  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### WebXR Device API

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2026-06-09).
- Pinned text: https://www.w3.org/TR/webxr/
- Revision token: webxr CRD-webxr-20260609 (Candidate Recommendation Draft, 2026-06-09)

### WebXR Augmented Reality Module - Level 1

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2025-04-25).
- Pinned text: https://www.w3.org/TR/webxr-ar-module-1/
- Revision token: webxr-ar-module-1 CRD-webxr-ar-module-1-20250425 (Candidate Recommendation Draft, 2025-04-25)

### WebXR Depth Sensing Module Level 1

- Publisher status on 2026-10-06: Working Draft (2026-08-25).
- Pinned text: https://www.w3.org/TR/webxr-depth-sensing-1/
- Revision token: webxr-depth-sensing-1 WD-webxr-depth-sensing-1-20260825 (Working Draft, 2026-08-25)

### WebXR DOM Overlays Module Level 1

- Publisher status on 2026-10-06: Working Draft (2024-09-24).
- Pinned text: https://www.w3.org/TR/webxr-dom-overlays-1/
- Revision token: webxr-dom-overlays-1 WD-webxr-dom-overlays-1-20240924 (Working Draft, 2024-09-24)

### WebXR Gamepads Module - Level 1

- Publisher status on 2026-10-06: Working Draft (2025-07-07).
- Pinned text: https://www.w3.org/TR/webxr-gamepads-module-1/
- Revision token: webxr-gamepads-module-1 WD-webxr-gamepads-module-1-20250707 (Working Draft, 2025-07-07)

### WebXR Hand Input Module - Level 1

- Publisher status on 2026-10-06: Working Draft (2024-06-05).
- Pinned text: https://www.w3.org/TR/webxr-hand-input-1/
- Revision token: webxr-hand-input-1 WD-webxr-hand-input-1-20240605 (Working Draft, 2024-06-05)

### WebXR Hit Test Module Level 1

- Publisher status on 2026-10-06: Working Draft (2025-12-11).
- Pinned text: https://www.w3.org/TR/webxr-hit-test-1/
- Revision token: webxr-hit-test-1 WD-webxr-hit-test-1-20251211 (Working Draft, 2025-12-11)

### WebXR Layers API Level 1

- Publisher status on 2026-10-06: Working Draft (2026-08-11).
- Pinned text: https://www.w3.org/TR/webxrlayers-1/
- Revision token: webxrlayers-1 WD-webxrlayers-1-20260811 (Working Draft, 2026-08-11)

### WebXR Lighting Estimation API Level 1

- Publisher status on 2026-10-06: Working Draft (2025-12-11).
- Pinned text: https://www.w3.org/TR/webxr-lighting-estimation-1/
- Revision token: webxr-lighting-estimation-1 WD-webxr-lighting-estimation-1-20251211 (Working Draft, 2025-12-11)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
