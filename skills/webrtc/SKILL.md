---
name: webrtc
description: >-
  WebRTC: This document defines a set of ECMAScript APIs in WebIDL to allow media and generic application data to be sent to and received from another browser or device implementing the appropriate set of real-time protocols. Covers WebRTC: Real-Time Communication in Browsers, Identifiers for WebRTC's Statistics API (build), WebRTC Encoded Transform (track), Scalable Video Coding (SVC) Extension for WebRTC (track), WebRTC Priority Control API (build), Identity for WebRTC 1.0 (build). Use when building real-time audio and video. Triggers: RTCPeerConnection, WebRTC.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# WebRTC

This document defines a set of ECMAScript APIs in WebIDL to allow media and generic application data to be sent to and received from another browser or device implementing the appropriate set of real-time protocols. This specification is being developed in conjunction with a protocol specification developed by the IETF RTCWEB group and an API specification to get access to local media devices.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when building real-time audio and video.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: WebRTC: Real-Time Communication in Browsers (default); Identifiers for WebRTC's Statistics API (default, posture build); WebRTC Encoded Transform (default, posture track); Scalable Video Coding (SVC) Extension for WebRTC (default, posture track); WebRTC Priority Control API (default, posture build); Identity for WebRTC 1.0 (default, posture build). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **2. Conformance.** "The key words MAY , MUST , MUST NOT , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here."
2. **2. Conformance.** "(In particular, the algorithms defined in this specification are intended to be easy to follow, and not intended to be performant.) Implementations that use ECMAScript to implement the APIs defined in this specification MUST implement them in a manner consistent with the ECMAScript Bindings defined in the Web IDL specification [ WEBIDL ], as this specification uses that specification and terminology."
3. **4.2.1.** "This implementation defined limit MUST be at least 32."
4. **4.4.1.1.** "Constructor When the RTCPeerConnection.constructor() is invoked, the user agent MUST run the following steps: If any of the steps enumerated below fails for a reason not specified here, throw an UnknownError with the message attribute set to an appropriate description."
5. **4.4.1.3.** "Whenever the state of an RTCDtlsTransport changes, the user agent MUST queue a task that runs the following steps: Let connection be this RTCPeerConnection object associated with the RTCDtlsTransport object whose state changed."
6. **4.4.1.4.** ") , the ICE Agent MUST NOT gather candidates that would be administratively prohibited ."
7. **4.4.1.4.** ") , the ICE Agent MUST NOT attempt to connect to candidates that are administratively prohibited ."
8. **4.4.1.4.** "If the process to apply description fails for any reason, then the user agent MUST queue a task that runs the following steps: If connection ."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [WebRTC: Real-Time Communication in Browsers](https://www.w3.org/TR/webrtc/): Recommendation, webrtc REC-webrtc-20250313 (Recommendation, 2025-03-13), checked 2026-10-06.
- [Identifiers for WebRTC's Statistics API](https://www.w3.org/TR/webrtc-stats/): Candidate Recommendation Draft, webrtc-stats CRD-webrtc-stats-20250925 (Candidate Recommendation Draft, 2025-09-25), checked 2026-10-06.
- [WebRTC Encoded Transform](https://www.w3.org/TR/webrtc-encoded-transform/): Working Draft, webrtc-encoded-transform WD-webrtc-encoded-transform-20260625 (Working Draft, 2026-06-25), checked 2026-10-06.
- [Scalable Video Coding (SVC) Extension for WebRTC](https://www.w3.org/TR/webrtc-svc/): Working Draft, webrtc-svc WD-webrtc-svc-20260914 (Working Draft, 2026-09-14), checked 2026-10-06.
- [WebRTC Priority Control API](https://www.w3.org/TR/webrtc-priority/): Candidate Recommendation Snapshot, webrtc-priority CR-webrtc-priority-20210318 (Candidate Recommendation Snapshot, 2021-03-18), checked 2026-10-06.
- [Identity for WebRTC 1.0](https://www.w3.org/TR/webrtc-identity/): Candidate Recommendation Snapshot, webrtc-identity CR-webrtc-20180621 (Candidate Recommendation Snapshot, 2018-09-27), checked 2026-10-06.
- [WebRTC Extended Use Cases](https://www.w3.org/TR/webrtc-nv-use-cases/): Draft Note, webrtc-nv-use-cases (Draft Note, 2023-12-14), checked 2026-10-06.
