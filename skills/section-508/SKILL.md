---
name: section-508
description: >-
  Section 508: apply the Revised 508 Standards for accessible ICT in US federal agencies. Covers Revised 508 Standards. Use when applying the Revised 508 Standards. Triggers: Section 508.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# Section 508

Federal government websites often end in .gov or .mil. Before sharing sensitive information, make sure

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when applying the Revised 508 Standards.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Revised 508 Standards (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **§ D1194.2 Application..** "If products are commercially available that meet some but not all of the standards, the agency must procure the product that best meets the standards."
2. **§ D1194.21 Software applications and operating systems..** "When an image represents a program element, the information conveyed by the image must also be available in text."
3. **§ 1194.22 Web-based intranet and internet information and.** "(m) When a web page requires that an applet, plug-in or other application be present on the client system to interpret page content, the page must provide a link to a plug-in or applet that complies with §1194.21 (a) through (l)."
4. **Note to §1194.22:.** ", all priority 1 checkpoints) must also meet paragraphs (l), (m), (n), (o), and (p) of this section to comply with this section."
5. **§ 1194.25 Self contained, closed products..** "The product must provide the ability to interrupt, pause, and restart the audio at anytime."
6. **1. Legal Authority for the Revised 508 Standards.** "In accordance with section 508(a)(2)(A), the Access Board must publish standards that define electronic and information technology along with the technical and functional performance criteria necessary for accessibility, and periodically review and amend the standards as appropriate."
7. **1. New Regulatory Approach and Format.** "Appendix A applies only to Section 508-covered ICT and consists of 508 Chapter 1, which sets forth general application and administration provisions, while 508 Chapter 2 contains scoping requirements (which, in turn, prescribe which ICT – and, in some cases, how many – must comply with the technical specifications)."
8. **5. Expanded interoperability requirements.** "The final rule provides more specificity about how operating systems, software development toolkits, and software applications should interact with assistive technology."

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

- [Revised 508 Standards](https://www.access-board.gov/ict/): Standard, Revised 508 Standards, fetched 2026-10-06 (Standard, 2026-10-06), checked 2026-10-06.
