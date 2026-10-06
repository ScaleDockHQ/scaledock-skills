---
name: icalendar
description: >-
  iCalendar (RFC 5545): read and write calendar events, to-dos and recurrence rules, plus jCal and JSCalendar. Covers RFC 5545 Internet Calendaring and Scheduling Core Object Specification (iCalendar), RFC 7265 jCal: The JSON Format for iCalendar, RFC 8984 JSCalendar: A JSON Representation of Calendar Data. Use when reading or writing calendar data. Triggers: iCalendar, RFC 5545, JSCalendar.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# Internet Calendaring and Scheduling Core Object Specification (iCalendar)

Internet Calendaring and Scheduling Core Object Specification (iCalendar)

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when reading or writing calendar data.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 5545 Internet Calendaring and Scheduling Core Object Specification (iCalendar) (default); RFC 7265 jCal: The JSON Format for iCalendar (default); RFC 8984 JSCalendar: A JSON Representation of Calendar Data (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Basic Grammar and Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ]."
2. **document.** "Lines of text SHOULD NOT be longer than 75 octets, excluding the line"
3. **document.** "Long content lines SHOULD be split into a multiple line representations using a line "folding" technique."
4. **document.** "Desruisseaux Standards Track [Page 9] RFC 5545 iCalendar September 2009 When parsing a content line, folded lines MUST first be unfolded according to the unfolding procedure described above."
5. **document.** "The following notation defines the lines of content in an iCalendar object: contentline = name *(";" param ) ":" value CRLF ; This ABNF is just a general definition for an initial parsing ; of the content line into its property name, parameter list, ; and value string ; When parsing a content line, folded lines MUST first ; be unfolded according to the unfolding procedure ; described above."
6. **document.** "When generating a content line, lines ; longer than 75 octets SHOULD be folded according to ; the folding procedure described above."
7. **document.** "Values in a list of values MUST be separated by a COMMA character."
8. **document.** "These structured property values MUST have their value parts separated by a SEMICOLON character."

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

- [RFC 5545 Internet Calendaring and Scheduling Core Object Specification (iCalendar)](https://www.rfc-editor.org/rfc/rfc5545.html): PROPOSED STANDARD, RFC 5545 (PROPOSED STANDARD, September ), checked 2026-10-06.
- [RFC 7265 jCal: The JSON Format for iCalendar](https://www.rfc-editor.org/rfc/rfc7265.html): PROPOSED STANDARD, RFC 7265 (PROPOSED STANDARD, May 2014), checked 2026-10-06.
- [RFC 8984 JSCalendar: A JSON Representation of Calendar Data](https://www.rfc-editor.org/rfc/rfc8984.html): PROPOSED STANDARD, RFC 8984 (PROPOSED STANDARD, July 2021), checked 2026-10-06.
