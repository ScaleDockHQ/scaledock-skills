---
name: grpc
description: >-
  gRPC: This document serves as a detailed description for an implementation of gRPC carried over HTTP2 framing . Covers gRPC over HTTP/2. Use when speaking the gRPC over HTTP/2 protocol. Triggers: gRPC, HTTP/2.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# gRPC

This document serves as a detailed description for an implementation of gRPC carried over HTTP2 framing . It assumes familiarity with the HTTP2 specification.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when speaking the gRPC over HTTP/2 protocol.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: gRPC over HTTP/2 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "If **Content-Type** does not begin with "application/grpc", gRPC servers SHOULD respond with HTTP status of 415 (Unsupported Media Type)."
2. **document.** "Implementations MUST accept padded and un-padded values and should emit un-padded values."
3. **document.** "In scenarios where the **Request** stream needs to be closed but no data remains to be sent implementations MUST send an empty DATA frame with this flag set."
4. **document.** "When decoding invalid values, implementations MUST NOT error or throw away the message."
5. **document.** "If it contains a status code field, it MUST NOT contradict the **Status** header."
6. **document.** "Additionally implementations should send **Timeout** immediately after the reserved headers and they should send the **Call-Definition** headers before sending **Custom-Metadata**."
7. **document.** "If **Timeout** is omitted a server should assume an infinite timeout."
8. **document.** "Header names starting with "grpc-" but not listed here are reserved for future GRPC use and should not be used by applications as **Custom-Metadata**."

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

- [gRPC over HTTP/2](https://raw.githubusercontent.com/grpc/grpc/master/doc/PROTOCOL-HTTP2.md): Protocol document, gRPC over HTTP/2 protocol, fetched 2026-10-06 (Protocol document, 2026-10-06), checked 2026-10-06.
