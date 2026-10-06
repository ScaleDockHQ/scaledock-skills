---
name: protobuf
description: >-
  Protocol Buffers: Covers how to use the proto3 revision of the Protocol Buffers language in your project. Covers proto3, Protobuf Editions. Use when defining Protocol Buffer messages. Triggers: protobuf, proto3, editions.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Protocol Buffers

Covers how to use the proto3 revision of the Protocol Buffers language in your project. This guide describes how to use the protocol buffer language to structure your

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when defining Protocol Buffer messages.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: proto3 (default); proto2 (legacy: read and upgrade, never author); Protobuf Editions (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Defining A Message Type.** "The edition (or syntax for proto2/proto3) must be the first non-empty, non-comment line of the file."
2. **Assigning Field Numbers.** "You must give each field in your message definition a number between 1 and 536,870,911 with the following restrictions: The given number must be unique among all fields for that message."
3. **Assigning Field Numbers.** "You should use the field numbers 1 through 15 for the most-frequently-set fields."
4. **Deleting Fields.** "However, you must reserve the deleted field number ."
5. **Deleting Fields.** "You should also reserve the field name to allow JSON and TextFormat encodings of your message to continue to parse."
6. **Scalar Value Types.** "bool string A string must always contain UTF-8 encoded or 7-bit ASCII text, and cannot be longer than 2 32 ."
7. **Scalar Value Types.** "In all cases, the value must fit in the type represented when set."
8. **Default Field Values.** "For enums, the default value is the first defined enum value , which must be 0."

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

- [proto3](https://protobuf.dev/programming-guides/proto3/): Language guide, proto3 guide, fetched 2026-10-06 (Language guide, 2026-10-06), checked 2026-10-06.
- [proto2](https://protobuf.dev/programming-guides/proto2/): Language guide, proto2 guide, fetched 2026-10-06 (Language guide, 2026-10-06), checked 2026-10-06.
- [Protobuf Editions](https://protobuf.dev/editions/): Language guide, Protobuf editions, fetched 2026-10-06 (Language guide, 2026-10-06), checked 2026-10-06.
