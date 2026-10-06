---
name: json-patch
description: >-
  JavaScript Object Notation (JSON) Patch: JavaScript Object Notation (JSON) Patch Covers RFC 6902 JavaScript Object Notation (JSON) Patch, RFC 7396 JSON Merge Patch. Use when applying a JSON Patch or a merge patch. Triggers: JSON Patch, RFC 6902, RFC 7396.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# JavaScript Object Notation (JSON) Patch

JavaScript Object Notation (JSON) Patch

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when applying a JSON Patch or a merge patch.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 6902 JavaScript Object Notation (JSON) Patch (default); RFC 7396 JSON Merge Patch (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [ RFC2119 ]."
2. **document.** "Operations Operation objects MUST have exactly one "op" member, whose value indicates the operation to perform."
3. **document.** "Its value MUST be one of "add", "remove", "replace", "move", "copy", or "test"; other values are errors."
4. **document.** "Additionally, operation objects MUST have exactly one "path" member."
5. **document.** "Members that are not explicitly defined for the operation in question MUST be ignored (i.e., the operation will complete as if the undefined member did not appear in the object)."
6. **document.** "The operation object MUST contain a "value" member whose content specifies the value to be added."
7. **document.** "For example: { "op": "add", "path": "/a/b/c", "value": [ "foo", "bar" ] } When the operation is applied, the target location MUST reference one of: o The root of the target document - whereupon the specified value becomes the entire content of the target document."
8. **document.** "The specified index MUST NOT be greater than the number of elements in the array."

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

- [RFC 6902 JavaScript Object Notation (JSON) Patch](https://www.rfc-editor.org/rfc/rfc6902.html): PROPOSED STANDARD, RFC 6902 (PROPOSED STANDARD, April 2013), checked 2026-10-06.
- [RFC 7396 JSON Merge Patch](https://www.rfc-editor.org/rfc/rfc7396.html): PROPOSED STANDARD, RFC 7396 (PROPOSED STANDARD, October 20), checked 2026-10-06.
