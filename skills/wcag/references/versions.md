# Versions and upgrades

Read this when choosing which WCAG version to build and test against, reading an audit or policy written for an older version, upgrading, or building to the WCAG 3.0 draft. Sources: the WCAG 2.2, 2.1 and 2.0 Recommendations, the WCAG 2.0 errata, the WCAG 3.0 Working Draft and Editor's Draft, the WCAG 3 Introduction, What's New in WCAG 2.2, and the WCAG 2 Overview and FAQ, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id            | Line     | Status    | Revision                                          | Posture | Summary                                                                                  |
| ------------- | -------- | --------- | ------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `3.0-preview` | WCAG 3.0 | preview   | W3C Working Draft, 10 September 2026              | build   | New model: core and supplemental requirements, assertions, reporting tiers, no A/AA/AAA. |
| `2.2`         | WCAG 2.2 | current   | W3C Recommendation, 12 December 2024 edition      |         | Adds 9 criteria to 2.1 and removes 4.1.1 Parsing. 86 criteria: 31 A, 24 AA, 31 AAA.      |
| `2.1`         | WCAG 2.1 | supported | W3C Recommendation, 6 May 2025 edition            |         | Adds 1 guideline and 17 criteria to 2.0 (mobile, low vision, cognitive). 78 criteria.    |
| `2.0`         | WCAG 2.0 | supported | W3C Recommendation, 11 December 2008, plus errata |         | The original 12 guidelines and 61 criteria. Still named by many policies and contracts.  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **preview** is a draft of the next line, used only as its posture allows. Posture **build** for WCAG 3.0 means: build and test to the draft now, behind an explicit opt-in, alongside WCAG 2.2 AA, with results labelled as against the dated Working Draft (work in progress) and never as a conformance claim.

W3C's own position: WCAG 2.0, 2.1 and 2.2 are all W3C Recommendations, and WCAG 2.2 does not deprecate or supersede 2.1 or 2.0; W3C advises using WCAG 2.2 (WCAG 2.2, Abstract; WCAG 2 Overview, WCAG 2.0, 2.1, 2.2). The statuses above are this skill's guidance for what to author, not a W3C status. The Working Group does not plan a WCAG 2.3 (WCAG 2 FAQ, What is different in WCAG 2.0, 2.1, and 2.2?).

Each edition lives at a dated URI that never changes; the undated URI (`/TR/WCAG22/`) points to the latest edition (WCAG 2 Overview, WCAG 2.0, 2.1, 2.2). WCAG 2.2 was first published 5 October 2023 and republished with errata 12 December 2024; WCAG 2.1 was first published 5 June 2018 and updated 21 September 2023, 12 December 2024 and 6 May 2025 (WCAG 2 Overview).

ISO: WCAG 2.2 is ISO/IEC 40500:2025, which is identical to the October 2023 edition of WCAG 2.2; W3C expects the December 2024 edition to become ISO/IEC 40500:2026 by late 2026 (WCAG 2 Overview, ISO/IEC 40500, EAA, EN 301 549).

Policy: for the European Accessibility Act, most organizations use WCAG and EN 301 549, and the 2026 version of EN 301 549 uses WCAG 2.2 (WCAG 2 Overview, ISO/IEC 40500, EAA, EN 301 549). This skill does not cover EN 301 549 itself.

## Which version to use

- Build and test against WCAG 2.2. Content that conforms to WCAG 2.2 also conforms to WCAG 2.1 and WCAG 2.0, and the Working Group recommends WCAG 2.2 as the conformance target even when formal obligations name an earlier version (WCAG 2.2, Introduction, New Features in WCAG 2.2 and Conformance to WCAG 2.2).
- Target WCAG 2.1 when a named policy, law or contract requires a WCAG 2.1 claim. Testing against WCAG 2.2 covers it, except that a WCAG 2.1 report has 4.1.1 Parsing in its list (always satisfied for HTML or XML, WCAG 2.1 SC 4.1.1 Note 1).
- Target WCAG 2.0 when a policy requires a WCAG 2.0 claim, and read older WCAG 2.0 audits as input to an upgrade. Meeting WCAG 2.2 meets WCAG 2.0 (WCAG 2 Overview). A WCAG 2.0 report lists 4.1.1 as satisfied for HTML or XML (WCAG 2.0 Errata).
- Build to WCAG 3.0 (posture **build**) when the user opts in: build and test against its core requirements, and its supplemental requirements and assertions when asked, using [`wcag-3.md`](wcag-3.md). Always build to WCAG 2.2 AA as well unless the user explicitly opts out, because laws and policies cite WCAG 2 and the draft says WCAG 2 "will still be required by different countries for a long time to come" (WCAG 3.0, § 1). Label every WCAG 3.0 result with the Working Draft's date as work in progress; the draft may be cited only as a work in progress (WCAG 3.0, Status of This Document).

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
- Guidelines are grouped by topic (images and media, text and wording, interactive components, input and operation, error handling, animation, layout, consistency, process completion, policy and protection, help, user control), and only requirements at "developing" status are in the draft (§ 1.1, § 2). The draft says it still has several years of work, the WCAG 2 FAQ says WCAG 3 is years away, and the WCAG 3 Introduction says "the best way to prepare for WCAG 3 in the future, is to meet WCAG 2.2 success criteria now".

The 10 September 2026 draft has 46 guidelines and 216 provisions (106 core, 74 supplemental, 35 assertions, 1 recommended practice), all at Developing; the Editor's Draft of 2 October 2026 adds 29 Exploratory ones. Every guideline and requirement, the conformance rules and the derived WCAG 2.2 mapping are in [`wcag-3.md`](wcag-3.md).

### Building to WCAG 3.0 now

Posture **build** means WCAG 3.0 is a real build-and-test target today, behind an explicit opt-in:

1. **Opt in.** Build to WCAG 3.0 only when the user asks for it. Record the Working Draft's title, date and dated URI (`https://www.w3.org/TR/2026/WD-wcag-3.0-20260910/`), and the provision set: core only (the default), core plus named supplemental requirements, or everything including assertions.
2. **Keep WCAG 2.2 AA.** Build and test to WCAG 2.2 AA in the same pass unless the user explicitly opts out. WCAG 2 is what laws and policies cite, and some WCAG 2.2 AA criteria are only supplemental in the draft (Reflow, Redundant Entry, Consistent Help).
3. **Build and test** every applicable core requirement, plus the requested supplemental requirements and assertions, with the scope and accessibility support set the draft requires (§ 3.2, § 3.2.1, § 3.2.2). Where the draft leaves a value as `@@` (text contrast, text appearance, pointer contrast), test against the WCAG 2.2 counterpart and say so. The steps are in [`wcag-3.md`](wcag-3.md#building-and-testing-to-wcag-30).
4. **Label the result** "against the W3C Accessibility Guidelines (WCAG) 3.0 Working Draft of 10 September 2026 (work in progress)". Never call it a W3C conformance claim: the draft may only be cited as work in progress (Status of This Document). Report tiers 1 to 3 only as exploratory, and never claim Bronze, Silver or Gold, whose thresholds are TBD (§ 4.1.4).
5. **Re-check on each new Working Draft.** Requirements will be added, combined, removed and reworded (§ 1.1.1), so a result holds only for its dated draft.

### Refreshing when WCAG 3.0 changes

1. Check `https://www.w3.org/TR/wcag-3.0/` for a newer "This version" date, and the Editor's Draft for provisions moving from Exploratory to Developing or beyond.
2. Re-pin: update the revision in `metadata.json` (the `3.0-preview` entry and the source), the Sources section of `SKILL.md`, the README and [`wcag-3.md`](wcag-3.md). Then diff the guidelines and provisions, and update the tables, counts and statuses.
3. Re-test existing WCAG 3.0 results against the new draft and issue them with the new date; don't edit old reports in place.
4. Watch the W3C history page for `wcag-3.0` and the Change Log for Candidate Recommendation. When WCAG 3.0 becomes a W3C Recommendation, add it as a separate, non-preview line. Decide whether WCAG 2.2 stays current, since WCAG 2 stays referenced by policy and the WCAG 3 Introduction says WCAG 2 will not be deprecated for several years after WCAG 3 is finalized. Then add an upgrade section from WCAG 2.2 using W3C's transition material, which § 1.2 promises.
