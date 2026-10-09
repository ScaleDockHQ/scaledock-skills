---
name: grpc
description: >-
  gRPC: This document serves as a detailed description for an implementation of gRPC carried over HTTP2 framing . Covers gRPC over HTTP/2. Use when speaking the gRPC over HTTP/2 protocol. Triggers: gRPC, HTTP/2.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# gRPC

The gRPC over HTTP/2 wire protocol from the gRPC project: request and response header layout, length-prefixed messages, metadata encoding, status trailers and the mapping onto HTTP/2 frames, read from PROTOCOL-HTTP2.md in grpc/grpc at a pinned commit.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: gRPC client, gRPC server, proxy or runtime library implementing the HTTP/2 transport.
- Target version: gRPC over HTTP/2 (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **Requests.** "If **Content-Type** does not begin with "application/grpc", gRPC servers SHOULD respond with HTTP status of 415 (Unsupported Media Type)."
2. **Requests.** "Implementations MUST accept padded and un-padded values and should emit un-padded values."
3. **Requests.** "Compression contexts are NOT maintained over message boundaries, implementations must create a new context for each message in the stream."
4. **Requests.** "If the **Message-Encoding** header is omitted then the **Compressed-Flag** must be 0."
5. **Requests.** "In scenarios where the **Request** stream needs to be closed but no data remains to be sent implementations MUST send an empty DATA frame with this flag set."
6. **Responses.** "Status must be sent in **Trailers** even if the status code is OK."
7. **Responses.** "Implementations must synthesize a **Status** & **Status-Message** to propagate to the application layer when this occurs."
8. **Responses.** "When decoding invalid values, implementations MUST NOT error or throw away the message."
9. **Responses.** "If it contains a status code field, it MUST NOT contradict the **Status** header."
10. **Errors.** "RPC runtime implementations should interpret RST_STREAM as immediate full-closure of the stream and should propagate an error up to the calling application layer."
11. **PING Frame.** "Both clients and servers can send a PING frame that the peer must respond to by precisely echoing what they received."

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
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `http2`, `protobuf`, `tls`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [gRPC over HTTP/2](https://raw.githubusercontent.com/grpc/grpc/cf61c7d62a1a7f43b9d2ea6488186bc14fc41a8c/doc/PROTOCOL-HTTP2.md): Protocol document, grpc/grpc commit cf61c7d (last change to doc/PROTOCOL-HTTP2.md), 2025-04-17, checked 2026-10-06.
