---
name: streams
description: >-
  Streams: This specification provides APIs for creating, composing, and consuming streams of data that map efficiently to low-level I/O primitives. Covers Streams Living Standard. Use when reading or writing streams. Triggers: ReadableStream, WritableStream.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Streams

This specification provides APIs for creating, composing, and consuming streams of data that map efficiently to low-level I/O primitives.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when reading or writing streams.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Streams Living Standard (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Streams.** "Developers should refer to the Living Standard for the most current error corrections and other developments."
2. **2.2. Writable streams.** "This indicates that the producer believes something has gone wrong, and that future writes should be discontinued."
3. **2.4. Pipe chains and backpressure.** "Once a pipe chain is constructed, it will propagate signals regarding how fast chunks should flow through it."
4. **2.5. Internal queues and queuing strategies.** "A queuing strategy is an object that determines how a stream should signal backpressure based on the state of its internal queue ."
5. **3. Conventions.** "In this specification, all numbers are represented as double-precision 64-bit IEEE 754 floating point values (like the JavaScript Number type or Web IDL unrestricted double type), and all arithmetic operations performed on them must be done in the standard way for such values."
6. **4.7.2. Internal slots.** "buffer An ArrayBuffer buffer byte length A positive integer representing the initial byte length of buffer byte offset A nonnegative integer byte offset into the buffer where the underlying byte source will start writing byte length A positive integer number of bytes which can be written into the buffer bytes filled A nonnegative integer number of bytes that have been written into the buffer so…"
7. **4.9.1. Working with readable streams.** "The following constraints apply regardless of the exact algorithm used: Public API must not be used: while reading or writing, or performing any of the operations below, the JavaScript-modifiable reader, writer, and stream APIs (i.e."
8. **4.9.1. Working with readable streams.** "methods on the appropriate prototypes) must not be used."

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

- [Streams Living Standard](https://streams.spec.whatwg.org/review-drafts/2026-08/): Review Draft, Review Draft 2026-08 (Review Draft, 2026-08), checked 2026-10-06.
