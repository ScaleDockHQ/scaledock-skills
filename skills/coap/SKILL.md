---
name: coap
description: >-
  CoAP (RFC 7252): build REST-style request and response messaging over UDP for constrained devices. Covers RFC 7252 The Constrained Application Protocol (CoAP). Use when speaking the Constrained Application Protocol. Triggers: CoAP, RFC 7252.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# The Constrained Application Protocol (CoAP)

The Constrained Application Protocol (CoAP)

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when speaking the Constrained Application Protocol.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 7252 The Constrained Application Protocol (CoAP) (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ] when they appear in ALL CAPS."
2. **document.** "Implementations of this specification MUST set this field to 1 (01 binary)."
3. **document.** "Messages with unknown version numbers MUST be silently ignored."
4. **document.** "Lengths 9-15 are reserved, MUST NOT be sent, and MUST be processed as a message format error."
5. **document.** "The presence of a marker followed by a zero-length payload MUST be processed as a message format error."
6. **document.** "Instead of specifying the Option Number directly, the instances MUST"
7. **document.** "If the field is set to this value but the entire byte is not the payload marker, this MUST be processed as a message format error."
8. **document.** "If the field is set to this value, it MUST be processed as a message format error."

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

- [RFC 7252 The Constrained Application Protocol (CoAP)](https://www.rfc-editor.org/rfc/rfc7252.html): PROPOSED STANDARD, RFC 7252 (PROPOSED STANDARD, June 2014), checked 2026-10-06.
