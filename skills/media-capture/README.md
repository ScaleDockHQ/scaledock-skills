# media-capture

An agent skill for Media Capture.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill media-capture
```

Then ask the agent to apply Media Capture.

## What it covers

- when capturing camera, microphone, screen or element media
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                            | Status          |
| --------------------------------------------------------------- | --------------- |
| Media Capture and Streams                                       | current (build) |
| MediaStream Image Capture                                       | current (track) |
| MediaStream Recording                                           | current (track) |
| Media Capture from DOM Elements                                 | current (track) |
| MediaStreamTrack Insertable Media Processing using Streams      | current (track) |
| MediaStreamTrack Content Hints                                  | current (track) |
| Region Capture                                                  | current (track) |
| Viewport Capture                                                | current (track) |
| Screen Capture                                                  | current (track) |
| Capture Handle - Bootstrapping Collaboration when Screensharing | current (track) |
| Audio Output Devices API                                        | current (build) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Media Capture and Streams](https://www.w3.org/TR/mediacapture-streams/): Candidate Recommendation Draft, mediacapture-streams CRD-mediacapture-streams-20251009 (Candidate Recommendation Draft, 2025-10-09).
- [MediaStream Image Capture](https://www.w3.org/TR/image-capture/): Working Draft, image-capture WD-image-capture-20250423 (Working Draft, 2025-04-23).
- [MediaStream Recording](https://www.w3.org/TR/mediastream-recording/): Working Draft, mediastream-recording WD-mediastream-recording-20260316 (Working Draft, 2026-03-16).
- [Media Capture from DOM Elements](https://www.w3.org/TR/mediacapture-fromelement/): Working Draft, mediacapture-fromelement WD-mediacapture-fromelement-20250212 (Working Draft, 2025-02-12).
- [MediaStreamTrack Insertable Media Processing using Streams](https://www.w3.org/TR/mediacapture-transform/): Working Draft, mediacapture-transform WD-mediacapture-transform-20260416 (Working Draft, 2026-04-16).
- [MediaStreamTrack Content Hints](https://www.w3.org/TR/mst-content-hint/): Working Draft, mst-content-hint WD-mst-content-hint-20250919 (Working Draft, 2025-09-19).
- [Region Capture](https://www.w3.org/TR/mediacapture-region/): Working Draft, mediacapture-region WD-mediacapture-region-20230712 (Working Draft, 2023-07-12).
- [Viewport Capture](https://www.w3.org/TR/mediacapture-viewport/): Working Draft, mediacapture-viewport WD-mediacapture-viewport-20241009 (Working Draft, 2024-10-09).
- [Screen Capture](https://www.w3.org/TR/screen-capture/): Working Draft, screen-capture WD-screen-capture-20260827 (Working Draft, 2026-08-27).
- [Capture Handle - Bootstrapping Collaboration when Screensharing](https://www.w3.org/TR/capture-handle-identity/): Working Draft, capture-handle-identity WD-capture-handle-identity-20250306 (Working Draft, 2025-03-06).
- [Audio Output Devices API](https://www.w3.org/TR/audio-output/): Candidate Recommendation Draft, audio-output CRD-audio-output-20251009 (Candidate Recommendation Draft, 2025-10-09).

## License

MIT
