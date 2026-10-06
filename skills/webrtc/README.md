# webrtc

An agent skill for WebRTC.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill webrtc
```

Then ask the agent to apply WebRTC.

## What it covers

- when building real-time audio and video
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                             | Status          |
| ------------------------------------------------ | --------------- |
| WebRTC: Real-Time Communication in Browsers      | current         |
| Identifiers for WebRTC's Statistics API          | current (build) |
| WebRTC Encoded Transform                         | current (track) |
| Scalable Video Coding (SVC) Extension for WebRTC | current (track) |
| WebRTC Priority Control API                      | current (build) |
| Identity for WebRTC 1.0                          | current (build) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [WebRTC: Real-Time Communication in Browsers](https://www.w3.org/TR/webrtc/): Recommendation, webrtc REC-webrtc-20250313 (Recommendation, 2025-03-13).
- [Identifiers for WebRTC's Statistics API](https://www.w3.org/TR/webrtc-stats/): Candidate Recommendation Draft, webrtc-stats CRD-webrtc-stats-20250925 (Candidate Recommendation Draft, 2025-09-25).
- [WebRTC Encoded Transform](https://www.w3.org/TR/webrtc-encoded-transform/): Working Draft, webrtc-encoded-transform WD-webrtc-encoded-transform-20260625 (Working Draft, 2026-06-25).
- [Scalable Video Coding (SVC) Extension for WebRTC](https://www.w3.org/TR/webrtc-svc/): Working Draft, webrtc-svc WD-webrtc-svc-20260914 (Working Draft, 2026-09-14).
- [WebRTC Priority Control API](https://www.w3.org/TR/webrtc-priority/): Candidate Recommendation Snapshot, webrtc-priority CR-webrtc-priority-20210318 (Candidate Recommendation Snapshot, 2021-03-18).
- [Identity for WebRTC 1.0](https://www.w3.org/TR/webrtc-identity/): Candidate Recommendation Snapshot, webrtc-identity CR-webrtc-20180621 (Candidate Recommendation Snapshot, 2018-09-27).
- [WebRTC Extended Use Cases](https://www.w3.org/TR/webrtc-nv-use-cases/): Draft Note, webrtc-nv-use-cases (Draft Note, 2023-12-14).

## License

MIT
