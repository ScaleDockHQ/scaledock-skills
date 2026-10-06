---
name: csv
description: >-
  CSV (RFC 4180): read and write comma-separated values files and the text/csv media type. Covers RFC 4180 Common Format and MIME Type for Comma-Separated Values (CSV) Files. Use when reading or writing CSV. Triggers: CSV, RFC 4180.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# Common Format and MIME Type for Comma-Separated Values (CSV) Files

Common Format and MIME Type for Comma-Separated Values (CSV) Files

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when reading or writing CSV.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 4180 Common Format and MIME Type for Comma-Separated Values (CSV) Files (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "This header will contain names corresponding to the fields in the file and should contain the same number of fields as the records in the rest of the file (the presence or absence of the header line should be indicated via the optional "header" parameter of this MIME type)."
2. **document.** "Each line should contain the same number of fields throughout the file."
3. **document.** "Spaces are considered part of a field and should not be ignored."
4. **document.** "The last field in the record must not be followed by a comma."
5. **document.** "Fields containing line breaks (CRLF), double quotes, and commas should be enclosed in double-quotes."
6. **document.** "If double-quotes are used to enclose fields, then a double-quote appearing inside a field must be escaped by preceding it with another double quote."
7. **document.** "Implementors choosing not to use this parameter must make their own decisions as to whether the header line is present or absent."
8. **document.** "However, implementors should be aware that some implementations may use other values."

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

- [RFC 4180 Common Format and MIME Type for Comma-Separated Values (CSV) Files](https://www.rfc-editor.org/rfc/rfc4180.html): INFORMATIONAL, RFC 4180 (INFORMATIONAL, October 20), checked 2026-10-06.
