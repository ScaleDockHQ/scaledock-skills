---
name: mqtt
description: >-
  MQTT 5.0: publish and subscribe over the OASIS MQTT messaging protocol, with MQTT 3.1.1 supported. Covers MQTT 5.0, MQTT 3.1.1 (supported). Use when publishing or subscribing with MQTT. Triggers: MQTT, CONNECT.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# MQTT

http://docs.oasis-open.org/mqtt/mqtt/v5.0/cos01/mqtt-v5.0-cos01.docx (Authoritative)

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when publishing or subscribing with MQTT.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: MQTT 5.0 (default); MQTT 3.1.1 (supported). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **1.2.** "Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this specification are to be interpreted as described in IETF RFC 2119 [RFC2119] , except where they appear in text that is marked as non-normative."
2. **1.5.4 UTF-8 Encoded String.** "The character data in a UTF-8 Encoded String MUST be well-formed UTF-8 as defined by the Unicode specification [Unicode] and restated in RFC 3629 [RFC3629] ."
3. **1.5.4 UTF-8 Encoded String.** "In particular, the character data MUST NOT include encodings of code points between U+D800 and U+DFFF [MQTT-1.5.4-1] ."
4. **1.5.4 UTF-8 Encoded String.** "A UTF-8 Encoded String MUST NOT include an encoding of the null character U+0000."
5. **1.5.4 UTF-8 Encoded String.** "The data SHOULD NOT include encodings of the Unicode [Unicode] code points listed below."
6. **1.5.4 UTF-8 Encoded String.** "� U+0001..U+001F control characters � U+007F..U+009F control characters � Code points defined in the Unicode specification [Unicode] to be non-characters (for example U+0FFFF) A UTF-8 encoded sequence 0xEF 0xBB 0xBF is always interpreted as U+FEFF ("ZERO WIDTH NO-BREAK SPACE") wherever it appears in a string and MUST NOT be skipped over or stripped off by a packet receiver [MQTT-1.5.4-3] ."
7. **1.5.5 Variable Byte Integer.** "The encoded value MUST use the minimum number of bytes necessary to represent the value [MQTT-1.5.5-1]."
8. **1.5.7.** "Both strings MUST comply with the requirements for UTF-8 Encoded Strings [MQTT-1.5.7-1] ."

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

- [MQTT 5.0](https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html): OASIS Standard, MQTT 5.0, fetched 2026-10-06 (OASIS Standard, 2026-10-06), checked 2026-10-06.
- [MQTT 3.1.1](https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html): OASIS Standard, MQTT 3.1.1, fetched 2026-10-06 (OASIS Standard, 2026-10-06), checked 2026-10-06.
