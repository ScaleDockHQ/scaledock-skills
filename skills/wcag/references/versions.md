# Versions and upgrades

Read this when choosing which WCAG version to build and test against, reading an audit or policy written for an older version, upgrading, or deciding what to do with the WCAG 3.0 draft. Sources: the WCAG 2.2, 2.1 and 2.0 Recommendations, the WCAG 2.0 errata, the WCAG 3.0 Working Draft, What's New in WCAG 2.2, and the WCAG 2 Overview and FAQ, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id            | Line     | Status    | Revision                                          | Posture | Summary                                                                                  |
| ------------- | -------- | --------- | ------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `3.0-preview` | WCAG 3.0 | preview   | W3C Working Draft, 10 September 2026              | build   | New model: core and supplemental requirements, assertions, reporting tiers, no A/AA/AAA. |
| `2.2`         | WCAG 2.2 | current   | W3C Recommendation, 12 December 2024 edition      |         | Adds 9 criteria to 2.1 and removes 4.1.1 Parsing. 86 criteria: 31 A, 24 AA, 31 AAA.      |
| `2.1`         | WCAG 2.1 | supported | W3C Recommendation, 6 May 2025 edition            |         | Adds 1 guideline and 17 criteria to 2.0 (mobile, low vision, cognitive). 78 criteria.    |
| `2.0`         | WCAG 2.0 | supported | W3C Recommendation, 11 December 2008, plus errata |         | The original 12 guidelines and 61 criteria. Still named by many policies and contracts.  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **preview** is a draft of the next line, used only as its posture allows. Posture **build** for WCAG 3.0 means: assess against the draft on request, in a separate report labelled as work in progress, never as a conformance claim and never instead of a WCAG 2 result.

W3C's own position: WCAG 2.0, 2.1 and 2.2 are all W3C Recommendations, and WCAG 2.2 does not deprecate or supersede 2.1 or 2.0; W3C advises using WCAG 2.2 (WCAG 2.2, Abstract; WCAG 2 Overview, WCAG 2.0, 2.1, 2.2). The statuses above are this skill's guidance for what to author, not a W3C status. The Working Group does not plan a WCAG 2.3 (WCAG 2 FAQ, What is different in WCAG 2.0, 2.1, and 2.2?).

Each edition lives at a dated URI that never changes; the undated URI (`/TR/WCAG22/`) points to the latest edition (WCAG 2 Overview, WCAG 2.0, 2.1, 2.2). WCAG 2.2 was first published 5 October 2023 and republished with errata 12 December 2024; WCAG 2.1 was first published 5 June 2018 and updated 21 September 2023, 12 December 2024 and 6 May 2025 (WCAG 2 Overview).

ISO: WCAG 2.2 is ISO/IEC 40500:2025, which is identical to the October 2023 edition of WCAG 2.2; W3C expects the December 2024 edition to become ISO/IEC 40500:2026 by late 2026 (WCAG 2 Overview, ISO/IEC 40500, EAA, EN 301 549).

Policy: for the European Accessibility Act, most organizations use WCAG and EN 301 549, and the 2026 version of EN 301 549 uses WCAG 2.2 (WCAG 2 Overview, ISO/IEC 40500, EAA, EN 301 549). This skill does not cover EN 301 549 itself.

## Which version to use

- Build and test against WCAG 2.2. Content that conforms to WCAG 2.2 also conforms to WCAG 2.1 and WCAG 2.0, and the Working Group recommends WCAG 2.2 as the conformance target even when formal obligations name an earlier version (WCAG 2.2, Introduction, New Features in WCAG 2.2 and Conformance to WCAG 2.2).
- Target WCAG 2.1 when a named policy, law or contract requires a WCAG 2.1 claim. Testing against WCAG 2.2 covers it, except that a WCAG 2.1 report has 4.1.1 Parsing in its list (always satisfied for HTML or XML, WCAG 2.1 SC 4.1.1 Note 1).
- Target WCAG 2.0 when a policy requires a WCAG 2.0 claim, and read older WCAG 2.0 audits as input to an upgrade. Meeting WCAG 2.2 meets WCAG 2.0 (WCAG 2 Overview). A WCAG 2.0 report lists 4.1.1 as satisfied for HTML or XML (WCAG 2.0 Errata).
- Use WCAG 3.0 (posture **build**) for a draft assessment when asked: see what is coming and where current content falls short, without claiming conformance (WCAG 3.0, Status of This Document).

| Target   | Criteria at A and AA | Claim cites                                                                 | 4.1.1                          |
| -------- | -------------------- | --------------------------------------------------------------------------- | ------------------------------ |
| WCAG 2.2 | 55 (31 A, 24 AA)     | "Web Content Accessibility Guidelines 2.2 at https://www.w3.org/TR/WCAG22/" | removed                        |
| WCAG 2.1 | 50 (30 A, 20 AA)     | "Web Content Accessibility Guidelines 2.1 at https://www.w3.org/TR/WCAG21/" | listed, satisfied for HTML/XML |
| WCAG 2.0 | 38 (25 A, 13 AA)     | the dated URI `http://www.w3.org/TR/2008/REC-WCAG20-20081211/`              | listed, satisfied for HTML/XML |

When building for WCAG 2.1 or WCAG 2.0, use the WCAG 2.2 reference files and skip the criteria the target version does not have (listed under [What changed](#what-changed)).

## What changed

### WCAG 3.0 (Working Draft)

See [Preview: WCAG 3.0](#preview-wcag-30).

### WCAG 2.2

From WCAG 2.2, Introduction (New Features in WCAG 2.2) and Change Log, and What's New in WCAG 2.2:

- Nine new success criteria: 2.4.11 Focus Not Obscured (Minimum) (AA), 2.4.12 Focus Not Obscured (Enhanced) (AAA), 2.4.13 Focus Appearance (AAA), 2.5.7 Dragging Movements (AA), 2.5.8 Target Size (Minimum) (AA), 3.2.6 Consistent Help (A), 3.3.7 Redundant Entry (A), 3.3.8 Accessible Authentication (Minimum) (AA), 3.3.9 Accessible Authentication (Enhanced) (AAA).
- 4.1.1 Parsing is obsolete and removed; it is shown as "4.1.1 Parsing (Obsolete and removed)" with a note that assistive technology no longer parses HTML directly (WCAG 2.2, SC 4.1.1).
- 2.1's 2.5.5 Target Size is renamed 2.5.5 Target Size (Enhanced), alongside the new 2.5.8 Target Size (Minimum).
- New glossary terms that are normative where criteria use them, including cognitive function test, dragging movement, focus indicator, minimum bounding box and perimeter (WCAG 2.2, Glossary).
- Non-normative Privacy Considerations (§ 5.6) and Security Considerations (§ 5.7) sections.
- Notes for languages and scripts that do not use some presentation or spacing properties (SC 1.4.8, SC 1.4.12; WCAG 2 FAQ, internationalization).
- The 12 December 2024 edition changes the definitions of single pointer, used in an unusual or restricted way, motion animation and programmatically determined, removes the defunct "encloses" definition, and makes editorial fixes (WCAG 2.2, Change Log).
- Numbering: new criteria are appended at the end of their guideline, so the order no longer groups criteria by level (WCAG 2.2, Introduction, Numbering in WCAG 2.2).

### WCAG 2.1

From WCAG 2.1, Introduction (New Features in WCAG 2.1) and Change Log:

- Guideline 2.5 Input Modalities and 17 criteria: 1.3.4 Orientation (AA), 1.3.5 Identify Input Purpose (AA), 1.3.6 Identify Purpose (AAA), 1.4.10 Reflow (AA), 1.4.11 Non-text Contrast (AA), 1.4.12 Text Spacing (AA), 1.4.13 Content on Hover or Focus (AA), 2.1.4 Character Key Shortcuts (A), 2.2.6 Timeouts (AAA), 2.3.3 Animation from Interactions (AAA), 2.5.1 Pointer Gestures (A), 2.5.2 Pointer Cancellation (A), 2.5.3 Label in Name (A), 2.5.4 Motion Actuation (A), 2.5.5 Target Size (AAA), 2.5.6 Concurrent Input Mechanisms (AAA), 4.1.3 Status Messages (AA).
- Conformance: a third note on page variations under Full pages, and machine-readable metadata among the optional claim components.
- Errata in later editions: 4.1.1 Parsing gains notes saying it "should be considered as always satisfied for any content using HTML or XML", the relative luminance threshold changes from 0.03928 to 0.04045, and editorial fixes (WCAG 2.1, Change Log).

### WCAG 2.0

- The first WCAG 2 Recommendation: four principles, 12 guidelines, 61 success criteria (25 A, 13 AA, 23 AAA), and the conformance model WCAG 2.1 and 2.2 reuse (WCAG 2.0; WCAG 2 Overview).
- A WCAG 2.0 claim cites the dated URI `http://www.w3.org/TR/2008/REC-WCAG20-20081211/` (WCAG 2.0, Conformance Claims).
- The WCAG 2.0 errata add the 4.1.1 note: "This criterion should be considered as always satisfied for any content using HTML or XML" (WCAG 2.0 Errata).

## Upgrading

### WCAG 2.1 to WCAG 2.2

1. Change the version marker: claims and reports cite "Web Content Accessibility Guidelines 2.2 at https://www.w3.org/TR/WCAG22/" (WCAG 2.2, § 5.3.1).
2. Add the new criteria at or below the target level. For Level AA: 2.4.11, 2.5.7, 2.5.8, 3.2.6, 3.3.7 and 3.3.8. Build and test them with [`perceivable-operable.md`](perceivable-operable.md) and [`understandable-robust.md`](understandable-robust.md).
3. Drop 4.1.1 Parsing from the WCAG 2.2 report. Move any finding logged under 4.1.1 (a duplicate ID breaking a label, bad nesting hiding a role) to the criterion it actually affects, such as 1.3.1 or 4.1.2 (WCAG 2.1, SC 4.1.1 Note 2; WCAG 2 FAQ, 4.1.1 Parsing). If the same content must also carry a WCAG 2.0 or 2.1 claim, keep 4.1.1 in that report, marked satisfied for HTML or XML (WCAG 2.2, Introduction, Comparison with WCAG 2.1).
4. Keep behaviour unchanged: no WCAG 2.1 criterion changed in WCAG 2.2 (WCAG 2 Overview), so every existing pass stays a pass. Re-test only what the new criteria touch: sticky headers and footers, drag interactions, small or tightly packed targets, help links, multi-step forms and sign-in.

### WCAG 2.0 to WCAG 2.1

1. Change the version marker to "Web Content Accessibility Guidelines 2.1 at https://www.w3.org/TR/WCAG21/" (WCAG 2.1, § 5.3.1), or go straight to 2.2.
2. Add the 2.1 criteria at or below the target level. For Level AA: 1.3.4, 1.3.5, 1.4.10, 1.4.11, 1.4.12, 1.4.13, 2.1.4, 2.5.1, 2.5.2, 2.5.3, 2.5.4 and 4.1.3.
3. Test every responsive variation of each page, as the 2.1 Full pages note requires (WCAG 2.1, § 5.2.2, Note 3).
4. Keep behaviour unchanged: WCAG 2.0 criteria are the same in 2.1 (WCAG 2 Overview).

### WCAG 2.0 to WCAG 2.2

Apply both checklists above in order, then follow the 2.2 report rules: 4.1.1 is gone, and the claim cites WCAG 2.2. For Level AA this adds 18 criteria to a WCAG 2.0 audit (12 from 2.1 and 6 from 2.2). Validate the result against the Verify list in `SKILL.md`.

## Preview: WCAG 3.0

W3C Accessibility Guidelines (WCAG) 3.0 is a W3C Working Draft dated 10 September 2026; publication as a Working Draft does not imply W3C endorsement, and it is inappropriate to cite it other than as work in progress (WCAG 3.0, Status of This Document). Posture: **build**.

What the draft contains today (WCAG 3.0, § 1, § 3, § 4):

- It is a successor to WCAG 2.2 that does not deprecate WCAG 2; WCAG 2 will still be required by different countries for a long time, and meeting WCAG 2 AA "means you will be close to meeting WCAG 3, but there may be differences" (§ 1, Introduction and § 1.2).
- Provisions are core requirements (all must be met to conform), supplemental requirements and assertions (§ 3.1.1, § 3.2). A/AA/AAA levels move out of conformance into reporting tiers: avoid physical harm, foundational access, conformance, then Bronze, Silver and Gold (§ 4.1.4, exploratory).
- Conformance needs a defined scope and an accessibility support set, which a claim must include; the default set is not yet defined (§ 3.2.1, § 3.2.2).
- Guidelines are grouped by topic (images and media, text and wording, interactive components, input and operation, error handling, animation, layout, consistency, process completion, policy and protection, help, user control), and only requirements at "developing" status are in the draft (§ 1.1, § 2). The draft says it still has several years of work, and the WCAG 2 FAQ says WCAG 3 is years away.

### Running a WCAG 3.0 draft assessment

1. Start from a complete WCAG 2 result for the same scope; the draft assessment adds to it and never replaces it.
2. Record the draft's date (10 September 2026) and the scope and accessibility support set used, since the draft requires both and has no default set yet (§ 3.2.1, § 3.2.2).
3. For each core requirement in the draft, note which WCAG 2 results cover it and where the content falls short; list supplemental requirements and assertions separately (§ 3.1.1, § 3.2).
4. Title the report as an assessment against the WCAG 3.0 Working Draft, state that it is work in progress, and do not score Bronze, Silver or Gold as a claim: the tiers are still exploratory (§ 4.1.4).
5. When the draft changes, re-run against the new date rather than editing the old report.

Do not claim conformance to WCAG 3.0, and do not replace WCAG 2 criteria with draft requirements. Watch the W3C history page for `wcag-3.0` and the WCAG 3.0 Change Log for movement to Candidate Recommendation. When WCAG 3.0 becomes a W3C Recommendation: add it as a separate line, decide whether WCAG 2.2 stays current (WCAG 2 remains referenced by policy), and add an upgrade section that maps WCAG 2.2 results onto core requirements.
