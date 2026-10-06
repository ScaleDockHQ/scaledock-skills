# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                         | Line                                             | Status  | Revision                                                                                    | Posture | Publisher                                    |
| -------------------------- | ------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------- | ------- | -------------------------------------------- |
| `webrtc`                   | WebRTC: Real-Time Communication in Browsers      | current | webrtc REC-webrtc-20250313 (Recommendation, 2025-03-13)                                     |         | Recommendation 2025-03-13                    |
| `webrtc-stats`             | Identifiers for WebRTC's Statistics API          | current | webrtc-stats CRD-webrtc-stats-20250925 (Candidate Recommendation Draft, 2025-09-25)         | build   | Candidate Recommendation Draft 2025-09-25    |
| `webrtc-encoded-transform` | WebRTC Encoded Transform                         | current | webrtc-encoded-transform WD-webrtc-encoded-transform-20260625 (Working Draft, 2026-06-25)   | track   | Working Draft 2026-06-25                     |
| `webrtc-svc`               | Scalable Video Coding (SVC) Extension for WebRTC | current | webrtc-svc WD-webrtc-svc-20260914 (Working Draft, 2026-09-14)                               | track   | Working Draft 2026-09-14                     |
| `webrtc-priority`          | WebRTC Priority Control API                      | current | webrtc-priority CR-webrtc-priority-20210318 (Candidate Recommendation Snapshot, 2021-03-18) | build   | Candidate Recommendation Snapshot 2021-03-18 |
| `webrtc-identity`          | Identity for WebRTC 1.0                          | current | webrtc-identity CR-webrtc-20180621 (Candidate Recommendation Snapshot, 2018-09-27)          | build   | Candidate Recommendation Snapshot 2018-09-27 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### WebRTC: Real-Time Communication in Browsers

- Publisher status on 2026-10-06: Recommendation (2025-03-13).
- Pinned text: https://www.w3.org/TR/webrtc/
- Revision token: webrtc REC-webrtc-20250313 (Recommendation, 2025-03-13)

### Identifiers for WebRTC's Statistics API

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2025-09-25).
- Pinned text: https://www.w3.org/TR/webrtc-stats/
- Revision token: webrtc-stats CRD-webrtc-stats-20250925 (Candidate Recommendation Draft, 2025-09-25)

### WebRTC Encoded Transform

- Publisher status on 2026-10-06: Working Draft (2026-06-25).
- Pinned text: https://www.w3.org/TR/webrtc-encoded-transform/
- Revision token: webrtc-encoded-transform WD-webrtc-encoded-transform-20260625 (Working Draft, 2026-06-25)

### Scalable Video Coding (SVC) Extension for WebRTC

- Publisher status on 2026-10-06: Working Draft (2026-09-14).
- Pinned text: https://www.w3.org/TR/webrtc-svc/
- Revision token: webrtc-svc WD-webrtc-svc-20260914 (Working Draft, 2026-09-14)

### WebRTC Priority Control API

- Publisher status on 2026-10-06: Candidate Recommendation Snapshot (2021-03-18).
- Pinned text: https://www.w3.org/TR/webrtc-priority/
- Revision token: webrtc-priority CR-webrtc-priority-20210318 (Candidate Recommendation Snapshot, 2021-03-18)

### Identity for WebRTC 1.0

- Publisher status on 2026-10-06: Candidate Recommendation Snapshot (2018-09-27).
- Pinned text: https://www.w3.org/TR/webrtc-identity/
- Revision token: webrtc-identity CR-webrtc-20180621 (Candidate Recommendation Snapshot, 2018-09-27)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
