# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                         | Line                                                            | Status  | Revision                                                                                            | Posture | Publisher                                 |
| -------------------------- | --------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------- |
| `mediacapture-streams`     | Media Capture and Streams                                       | current | mediacapture-streams CRD-mediacapture-streams-20251009 (Candidate Recommendation Draft, 2025-10-09) | build   | Candidate Recommendation Draft 2025-10-09 |
| `image-capture`            | MediaStream Image Capture                                       | current | image-capture WD-image-capture-20250423 (Working Draft, 2025-04-23)                                 | track   | Working Draft 2025-04-23                  |
| `mediastream-recording`    | MediaStream Recording                                           | current | mediastream-recording WD-mediastream-recording-20260316 (Working Draft, 2026-03-16)                 | track   | Working Draft 2026-03-16                  |
| `mediacapture-fromelement` | Media Capture from DOM Elements                                 | current | mediacapture-fromelement WD-mediacapture-fromelement-20250212 (Working Draft, 2025-02-12)           | track   | Working Draft 2025-02-12                  |
| `mediacapture-transform`   | MediaStreamTrack Insertable Media Processing using Streams      | current | mediacapture-transform WD-mediacapture-transform-20260416 (Working Draft, 2026-04-16)               | track   | Working Draft 2026-04-16                  |
| `mst-content-hint`         | MediaStreamTrack Content Hints                                  | current | mst-content-hint WD-mst-content-hint-20250919 (Working Draft, 2025-09-19)                           | track   | Working Draft 2025-09-19                  |
| `mediacapture-region`      | Region Capture                                                  | current | mediacapture-region WD-mediacapture-region-20230712 (Working Draft, 2023-07-12)                     | track   | Working Draft 2023-07-12                  |
| `mediacapture-viewport`    | Viewport Capture                                                | current | mediacapture-viewport WD-mediacapture-viewport-20241009 (Working Draft, 2024-10-09)                 | track   | Working Draft 2024-10-09                  |
| `screen-capture`           | Screen Capture                                                  | current | screen-capture WD-screen-capture-20260827 (Working Draft, 2026-08-27)                               | track   | Working Draft 2026-08-27                  |
| `capture-handle-identity`  | Capture Handle - Bootstrapping Collaboration when Screensharing | current | capture-handle-identity WD-capture-handle-identity-20250306 (Working Draft, 2025-03-06)             | track   | Working Draft 2025-03-06                  |
| `audio-output`             | Audio Output Devices API                                        | current | audio-output CRD-audio-output-20251009 (Candidate Recommendation Draft, 2025-10-09)                 | build   | Candidate Recommendation Draft 2025-10-09 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Media Capture and Streams

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2025-10-09).
- Pinned text: https://www.w3.org/TR/mediacapture-streams/
- Revision token: mediacapture-streams CRD-mediacapture-streams-20251009 (Candidate Recommendation Draft, 2025-10-09)

### MediaStream Image Capture

- Publisher status on 2026-10-06: Working Draft (2025-04-23).
- Pinned text: https://www.w3.org/TR/image-capture/
- Revision token: image-capture WD-image-capture-20250423 (Working Draft, 2025-04-23)

### MediaStream Recording

- Publisher status on 2026-10-06: Working Draft (2026-03-16).
- Pinned text: https://www.w3.org/TR/mediastream-recording/
- Revision token: mediastream-recording WD-mediastream-recording-20260316 (Working Draft, 2026-03-16)

### Media Capture from DOM Elements

- Publisher status on 2026-10-06: Working Draft (2025-02-12).
- Pinned text: https://www.w3.org/TR/mediacapture-fromelement/
- Revision token: mediacapture-fromelement WD-mediacapture-fromelement-20250212 (Working Draft, 2025-02-12)

### MediaStreamTrack Insertable Media Processing using Streams

- Publisher status on 2026-10-06: Working Draft (2026-04-16).
- Pinned text: https://www.w3.org/TR/mediacapture-transform/
- Revision token: mediacapture-transform WD-mediacapture-transform-20260416 (Working Draft, 2026-04-16)

### MediaStreamTrack Content Hints

- Publisher status on 2026-10-06: Working Draft (2025-09-19).
- Pinned text: https://www.w3.org/TR/mst-content-hint/
- Revision token: mst-content-hint WD-mst-content-hint-20250919 (Working Draft, 2025-09-19)

### Region Capture

- Publisher status on 2026-10-06: Working Draft (2023-07-12).
- Pinned text: https://www.w3.org/TR/mediacapture-region/
- Revision token: mediacapture-region WD-mediacapture-region-20230712 (Working Draft, 2023-07-12)

### Viewport Capture

- Publisher status on 2026-10-06: Working Draft (2024-10-09).
- Pinned text: https://www.w3.org/TR/mediacapture-viewport/
- Revision token: mediacapture-viewport WD-mediacapture-viewport-20241009 (Working Draft, 2024-10-09)

### Screen Capture

- Publisher status on 2026-10-06: Working Draft (2026-08-27).
- Pinned text: https://www.w3.org/TR/screen-capture/
- Revision token: screen-capture WD-screen-capture-20260827 (Working Draft, 2026-08-27)

### Capture Handle - Bootstrapping Collaboration when Screensharing

- Publisher status on 2026-10-06: Working Draft (2025-03-06).
- Pinned text: https://www.w3.org/TR/capture-handle-identity/
- Revision token: capture-handle-identity WD-capture-handle-identity-20250306 (Working Draft, 2025-03-06)

### Audio Output Devices API

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2025-10-09).
- Pinned text: https://www.w3.org/TR/audio-output/
- Revision token: audio-output CRD-audio-output-20251009 (Candidate Recommendation Draft, 2025-10-09)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
