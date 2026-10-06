---
name: jmap
description: >-
  The JSON Meta Application Protocol (JMAP): The JSON Meta Application Protocol (JMAP) Covers RFC 8620 The JSON Meta Application Protocol (JMAP), RFC 8621 The JSON Meta Application Protocol (JMAP) for Mail. Use when synchronizing mail with JMAP. Triggers: JMAP, RFC 8620.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# The JSON Meta Application Protocol (JMAP)

The JSON Meta Application Protocol (JMAP)

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when synchronizing mail with JMAP.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 8620 The JSON Meta Application Protocol (JMAP) (default); RFC 8621 The JSON Meta Application Protocol (JMAP) for Mail (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Notational Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here."
2. **document.** "The client MUST NOT send this property when creating a new object of this type."
3. **document.** "o "immutable" -- The value MUST NOT change after the object is created."
4. **document.** "Where "Id" is given as a data type, it means a "String" of at least 1 and a maximum of 255 octets in size, and it MUST only contain characters from the "URL and Filename Safe" base64 alphabet, as defined in Section 5 of [RFC4648] , excluding the pad character ("=")."
5. **document.** "For maximum safety, servers SHOULD also follow defensive allocation strategies to avoid creating risks where glob completion or data type detection may be present (e.g., on filesystems or in spreadsheets)."
6. **document.** "Where "UnsignedInt" is given as a data type, it means an "Int" where the value MUST be in the range 0 <= value <= 2^53-1."
7. **document.** "To ensure a normalised form, the "time-secfrac" MUST always be omitted if zero, and any letters in the string (e.g., "T" and "Z") MUST be uppercase."
8. **document.** "Where "UTCDate" is given as a type, it means a "Date" where the "time-offset" component MUST be "Z" (i.e., it must be in UTC time)."

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

- [RFC 8620 The JSON Meta Application Protocol (JMAP)](https://www.rfc-editor.org/rfc/rfc8620.html): PROPOSED STANDARD, RFC 8620 (PROPOSED STANDARD, July 2019), checked 2026-10-06.
- [RFC 8621 The JSON Meta Application Protocol (JMAP) for Mail](https://www.rfc-editor.org/rfc/rfc8621.html): PROPOSED STANDARD, RFC 8621 (PROPOSED STANDARD, August 201), checked 2026-10-06.
