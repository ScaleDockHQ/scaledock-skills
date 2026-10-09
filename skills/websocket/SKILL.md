---
name: websocket
description: >-
  WebSocket (RFC 6455): open and run full-duplex WebSocket connections, including over HTTP/2. Covers RFC 6455 The WebSocket Protocol, RFC 8441 Bootstrapping WebSockets with HTTP/2. Use when speaking the WebSocket protocol. Triggers: WebSocket, RFC 6455.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# The WebSocket Protocol

The WebSocket Protocol

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when speaking the WebSocket protocol.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 6455 The WebSocket Protocol (default); RFC 8441 Bootstrapping WebSockets with HTTP/2 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **RFC 6455 § 4.1.** "The request MUST include a header field with the name |Sec-WebSocket-Key|."
2. **RFC 6455 § 4.1.** "If the response lacks a |Sec-WebSocket-Accept| header field or the |Sec-WebSocket-Accept| contains a value other than the base64-encoded SHA-1 of the concatenation of the |Sec-WebSocket-Key| (as a string, not base64-decoded) with the string "258EAFA5-E914-47DA-95CA-C5AB0DC85B11" but ignoring any leading and trailing whitespace, the client MUST _Fail the WebSocket Connection_."
3. **RFC 6455 § 5.1.** "To avoid confusing network intermediaries (such as intercepting proxies) and for security reasons that are further discussed in Section 10.3, a client MUST mask all frames that it sends to the server (see Section 5.3 for further details)."
4. **RFC 6455 § 5.1.** "A server MUST NOT mask any frames that it sends to the client."
5. **RFC 6455 § 5.5.** "All control frames MUST have a payload length of 125 bytes or less and MUST NOT be fragmented."
6. **RFC 6455 § 5.5.1.** "If an endpoint receives a Close frame and did not previously send a Close frame, the endpoint MUST send a Close frame in response."
7. **RFC 6455 § 5.6.** "Note that a particular text frame might include a partial UTF-8 sequence; however, the whole message MUST contain valid UTF-8."
8. **RFC 6455 § 10.2.** "Servers that are not intended to process input from any web page but only for certain sites SHOULD verify the |Origin| field is an origin they expect."
9. **RFC 6455 § 10.4.** "Implementations that have implementation-and/or platform-specific limitations regarding the frame size or total message size after reassembly from multiple frames MUST protect themselves against exceeding those limits."
10. **RFC 8441 § 5.** "The :protocol pseudo-header field MUST be included in the CONNECT request, and it MUST have a value of "websocket" to initiate a WebSocket connection on an HTTP/2 stream."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the section it came from.
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

- [RFC 6455 The WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455.html): PROPOSED STANDARD, RFC 6455 (PROPOSED STANDARD, December 2), checked 2026-10-06.
- [RFC 8441 Bootstrapping WebSockets with HTTP/2](https://www.rfc-editor.org/rfc/rfc8441.html): PROPOSED STANDARD, RFC 8441 (PROPOSED STANDARD, September ), checked 2026-10-06.
