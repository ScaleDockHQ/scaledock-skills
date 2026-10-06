---
name: html
description: >-
  HTML Living Standard: This is a Review Draft. Covers HTML Living Standard. Use when writing HTML, including forms, dialog, popover, workers, storage, canvas and import maps. Triggers: HTML, HTML Living Standard, dialog, popover.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# HTML Living Standard

This is a Review Draft. It is published primarily for purposes of patent review by Workstream

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when writing HTML, including forms, dialog, popover, workers, storage, canvas and import maps.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: HTML Living Standard (default); HTML 5.2 (legacy: read and upgrade, never author). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **2.1.8 Conformance classes.** "(This is only a "SHOULD" and not a "MUST" requirement because it has been proven to be impossible."
2. **HTML.** "Developers should refer to the Living Standard for the most current error corrections and other developments."
3. **1.6 History.** "The idea that HTML's evolution should be reopened was tested at a W3C workshop in 2004, where some of the principles that underlie the HTML5 work (described below), as well as the aforementioned early draft proposal covering just forms-related features, were presented to the W3C jointly by Mozilla and Opera."
4. **1.7 Design notes.** "It must be admitted that many aspects of HTML appear at first glance to be nonsensical and inconsistent."
5. **1.9.1 How to read this specification.** "This specification should be read like all other specifications."
6. **1.9.1 How to read this specification.** "First, it should be read cover-to-cover, multiple times."
7. **1.9.1 How to read this specification.** "Then, it should be read backwards at least once."
8. **1.9.1 How to read this specification.** "Then it should be read by picking random sections from the contents list and following all the cross-references."

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

- [HTML Living Standard](https://html.spec.whatwg.org/review-drafts/2026-07/): Review Draft, Review Draft 2026-07 (Review Draft, 2026-07), checked 2026-10-06.
- [HTML 5.2](https://www.w3.org/TR/2017/REC-html52-20171214/): Retired Recommendation, REC-html52-20171214 (Retired Recommendation, 2017-12-14), checked 2026-10-06.
