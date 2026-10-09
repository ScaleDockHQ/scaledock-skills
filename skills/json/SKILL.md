---
name: json
description: >-
  JSON (RFC 8259): produce and parse interoperable JSON text, including the I-JSON profile. Covers RFC 8259 The JavaScript Object Notation (JSON) Data Interchange Format, RFC 7493 The I-JSON Message Format. Use when producing or parsing JSON text. Triggers: JSON, RFC 8259, ECMA-404, I-JSON.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# The JavaScript Object Notation (JSON) Data Interchange Format

The JavaScript Object Notation (JSON) Data Interchange Format

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when producing or parsing JSON text.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 8259 The JavaScript Object Notation (JSON) Data Interchange Format (default); RFC 7493 The I-JSON Message Format (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **RFC 8259 § 3.** "The literal names MUST be lowercase."
2. **RFC 8259 § 4.** "The names within an object SHOULD be unique."
3. **RFC 8259 § 7.** "All Unicode characters may be placed within the quotation marks, except for the characters that MUST be escaped: quotation mark, reverse solidus, and the control characters (U+0000 through U+001F)."
4. **RFC 8259 § 8.1.** "JSON text exchanged between systems that are not part of a closed ecosystem MUST be encoded using UTF-8 [RFC3629]."
5. **RFC 8259 § 8.1.** "Implementations MUST NOT add a byte order mark (U+FEFF) to the beginning of a networked-transmitted JSON text."
6. **RFC 8259 § 9.** "A JSON parser MUST accept all texts that conform to the JSON grammar."
7. **RFC 7493 § 2.1.** "Object member names, and string values in arrays and object members, MUST NOT include code points that identify Surrogates or Noncharacters as defined by [UNICODE]."
8. **RFC 7493 § 2.2.** "I-JSON messages SHOULD NOT include numbers that express greater magnitude or precision than an IEEE 754 double precision number provides, for example, 1E400 or 3.141592653589793238462643383279."
9. **RFC 7493 § 2.3.** "Objects in I-JSON messages MUST NOT have members with duplicate names."
10. **RFC 7493 § 4.1.** "For maximum interoperability with such implementations, protocol designers SHOULD NOT use top-level JSON texts that are neither objects nor arrays."

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

- `json-schema`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill json-schema`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [RFC 8259 The JavaScript Object Notation (JSON) Data Interchange Format](https://www.rfc-editor.org/rfc/rfc8259.html): INTERNET STANDARD, RFC 8259 (INTERNET STANDARD, December 2), checked 2026-10-06.
- [RFC 7493 The I-JSON Message Format](https://www.rfc-editor.org/rfc/rfc7493.html): PROPOSED STANDARD, RFC 7493 (PROPOSED STANDARD, March 2015), checked 2026-10-06.
