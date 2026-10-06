---
name: http3
description: >-
  HTTP/3: The QUIC transport protocol has several features that are desirable in a transport for HTTP, such as stream multiplexing, per-stream flow control, and low-latency connection establishment. Covers RFC 9114 HTTP/3, RFC 9000 QUIC: A UDP-Based Multiplexed and Secure Transport, RFC 9001 Using TLS to Secure QUIC, RFC 9002 QUIC Loss Detection and Congestion Control. Use when speaking HTTP/3 or QUIC. Triggers: HTTP/3, QUIC, RFC 9114.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# HTTP/3

The QUIC transport protocol has several features that are desirable in a transport for HTTP, such as stream multiplexing, per-stream flow control, and low-latency connection establishment. This document describes a mapping of HTTP semantics over QUIC. This document also identifies HTTP/2 features that are subsumed by QUIC and describes how HTTP/2 extensions can be ported to HTTP/3. ¶

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when speaking HTTP/3 or QUIC.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 9114 HTTP/3 (default); RFC 9000 QUIC: A UDP-Based Multiplexed and Secure Transport (default); RFC 9001 Using TLS to Secure QUIC (default); RFC 9002 QUIC Loss Detection and Congestion Control (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **abstract.** "The QUIC transport protocol has several features that are desirable in a transport for HTTP, such as stream multiplexing, per-stream flow control, and low-latency connection establishment. This document describes a mapping of HTTP semantics over QUIC. This document also identifies HTTP/2 features that are subsumed by QUIC and describes how HTTP/2 extensions can be ported to HTTP/3. ¶"

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

- [RFC 9114 HTTP/3](https://www.rfc-editor.org/rfc/rfc9114.html): PROPOSED STANDARD, RFC 9114 (PROPOSED STANDARD, June 2022), checked 2026-10-06.
- [RFC 9000 QUIC: A UDP-Based Multiplexed and Secure Transport](https://www.rfc-editor.org/rfc/rfc9000.html): PROPOSED STANDARD, RFC 9000 (PROPOSED STANDARD, May 2021), checked 2026-10-06.
- [RFC 9001 Using TLS to Secure QUIC](https://www.rfc-editor.org/rfc/rfc9001.html): PROPOSED STANDARD, RFC 9001 (PROPOSED STANDARD, May 2021), checked 2026-10-06.
- [RFC 9002 QUIC Loss Detection and Congestion Control](https://www.rfc-editor.org/rfc/rfc9002.html): PROPOSED STANDARD, RFC 9002 (PROPOSED STANDARD, May 2021), checked 2026-10-06.
