---
name: websocket
description: >-
  The WebSocket Protocol: The WebSocket Protocol Covers RFC 6455 The WebSocket Protocol, RFC 8441 Bootstrapping WebSockets with HTTP/2. Use when speaking the WebSocket protocol. Triggers: WebSocket, RFC 6455.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
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

1. **document.** "The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ]."
2. **document.** "Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("MUST", "SHOULD", "MAY", etc.) used in introducing the algorithm."
3. **document.** "The "resource-name" (also known as /resource name/ in Section 4.1 ) can be constructed by concatenating the following: o "/" if the path component is empty o the path component o "?" if the query component is non-empty o the query component Fragment identifiers are meaningless in the context of WebSocket URIs and MUST NOT be used on these URIs."
4. **document.** "As with any URI scheme, the character "#", when not indicating the start of a fragment, MUST be escaped as %23."
5. **document.** "When the client is to _Establish a WebSocket Connection_ given a set of (/host/, /port/, /resource name/, and /secure/ flag), along with a list of /protocols/ and /extensions/ to be used, and an /origin/ in the case of web browsers, it MUST open a connection, send an opening handshake, and read the server's handshake in response."
6. **document.** "The components of the WebSocket URI passed into this algorithm (/host/, /port/, /resource name/, and /secure/ flag) MUST be valid according to the specification of WebSocket URIs specified in Section 3 ."
7. **document.** "If any of the components are invalid, the client MUST _Fail the WebSocket Connection_ and abort these steps."
8. **document.** "If the client already has a WebSocket connection to the remote host (IP address) identified by /host/ and port /port/ pair, even if the remote host is known by another name, the client MUST wait until that connection has been established or for that connection to have failed."

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

- [RFC 6455 The WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455.html): PROPOSED STANDARD, RFC 6455 (PROPOSED STANDARD, December 2), checked 2026-10-06.
- [RFC 8441 Bootstrapping WebSockets with HTTP/2](https://www.rfc-editor.org/rfc/rfc8441.html): PROPOSED STANDARD, RFC 8441 (PROPOSED STANDARD, September ), checked 2026-10-06.
