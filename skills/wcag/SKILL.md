---
name: wcag
description: >-
  WCAG 2.2 Web Content Accessibility Guidelines: build, review and test web and
  mobile UIs against the W3C success criteria at Level A, AA or AAA. Use when
  designing or auditing accessibility, writing a conformance claim or
  statement, fixing an audit finding, or reviewing a component for keyboard
  access, focus visibility, color contrast, text alternatives, captions,
  reflow, text spacing, target size, dragging alternatives, form labels and
  errors, accessible authentication, consistent help, redundant entry,
  name/role/value or status messages. Covers conformance and claims, the four
  principles, what WCAG 2.2 added (2.4.11, 2.4.13, 2.5.7, 2.5.8, 3.2.6, 3.3.7,
  3.3.8, 3.3.9) and the removal of 4.1.1 Parsing, and testing. Targets WCAG
  2.2; supports WCAG 2.1 and WCAG 2.0 with upgrades between them; on opt-in,
  builds to the WCAG 3.0 draft (core and supplemental requirements) alongside
  WCAG 2.2 AA, labelled as work in progress, never as a conformance claim.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# WCAG

The Web Content Accessibility Guidelines (WCAG), published by the W3C Accessibility Guidelines Working Group, define testable success criteria that make web content accessible to people with disabilities. This skill pins WCAG 2.2 (W3C Recommendation, 12 December 2024 edition) as the default, supports WCAG 2.1 and WCAG 2.0 as targets, and produces a UI, a review or a test plan that meets a chosen version and conformance level, plus a conformance claim when one is wanted. On request it also builds and tests to the WCAG 3.0 Working Draft, alongside WCAG 2.2 AA, and reports those results as against the dated draft, as work in progress.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. Success criteria are cited by number (SC 2.5.8), conformance rules by section (§ 5.2.1), and glossary terms by name. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: building a UI, reviewing a design or pull request, testing a page or app, or writing a conformance claim or accessibility statement.
- Target level: Level AA (the usual target), Level A, or AAA for selected criteria. W3C does not recommend AAA as a general policy for whole sites (§ 5.2.1, Note 2).
- Scope: the web pages, page variations (responsive breakpoints), and complete processes (for example checkout or sign-in) in scope (§ 5.2.2, § 5.2.3).
- Technologies relied upon: for example HTML, CSS, JavaScript, WAI-ARIA, and the user agents and assistive technologies they are tested with (§ 5.2.4, § 5.3.1).
- Platform: web in a browser, or native mobile or desktop software. WCAG 2 is written for web content; the WCAG 2 Overview points to WCAG2ICT for applying it to native apps, software and documents.
- Target version: WCAG 2.2 (current, the default). WCAG 2.1 and WCAG 2.0 are supported: target one when a named policy, law or contract requires a claim against it, and use that version's criteria set and claim URI. Content that meets WCAG 2.2 also meets WCAG 2.1 and WCAG 2.0. WCAG 3.0 (draft, opt-in) is a preview with posture build: when the user opts in, build and test against its core requirements (and its supplemental requirements and assertions when asked), always alongside WCAG 2.2 AA unless the user explicitly opts out, because WCAG 2 is what laws and policies cite. See [`references/versions.md`](references/versions.md) and [`references/wcag-3.md`](references/wcag-3.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read the WCAG 2 Overview and FAQ for new editions, the WCAG 2.2 Change Log for errata, and the WCAG 3.0 status section and "This version" date (re-pin on each new Working Draft); then every URL in [Sources](#sources). Update the pins and bump the version.

## Invariants

1. **Success criteria decide conformance; nothing else does.** Normative content is the success criteria, conformance section and glossary; notes, examples, Understanding documents, Techniques and Test Rules are informative (§ 5.1; Understanding Techniques, Techniques are Informative).
2. **A level is met in full.** Level AA means every Level A and Level AA criterion is satisfied, or a conforming alternate version is provided (§ 5.2.1). In WCAG 2.2 the order of criteria within a guideline says nothing about their level; read the level marker (Introduction, Numbering in WCAG 2.2).
3. **Whole pages and whole processes.** Conformance cannot exclude part of a page, every responsive variation must conform, and every page in a process must conform at the level (§ 5.2.2, § 5.2.3).
4. **Only accessibility-supported uses count.** Any information or function provided in a way that is not accessibility supported must also be available in a way that is (§ 5.2.4; glossary, accessibility supported).
5. **Some failures break the whole page.** SC 1.4.2, 2.1.2, 2.2.2 and 2.3.1 apply to all content on the page, including content not relied upon (§ 5.2.5).
6. **Everything works from a keyboard, and focus stays visible.** All functionality is operable through a keyboard interface (SC 2.1.1) with no keyboard trap (SC 2.1.2); a visible focus indicator exists (SC 2.4.7), and the focused component is not entirely hidden by author-created content (SC 2.4.11).
7. **Every control exposes name, role and value.** Name and role are programmatically determinable, user-settable states can be set programmatically, and changes are notified to assistive technologies (SC 4.1.2). The accessible name contains the visible label text (SC 2.5.3).
8. **Pointer input has simple alternatives.** Path-based and multipoint gestures have a single-pointer alternative (SC 2.5.1), dragging has a single-pointer alternative without dragging (SC 2.5.7), and targets are at least 24 by 24 CSS pixels or meet an exception (SC 2.5.8).
9. **Contrast meets the ratio.** Text has at least 4.5:1, large-scale text at least 3:1 (SC 1.4.3), and UI component and graphical object boundaries at least 3:1 against adjacent colors (SC 1.4.11), using the contrast ratio formula in the glossary.
10. **Authentication needs no cognitive function test without help.** Each authentication step offers an alternative method, a mechanism such as password manager fill or paste, or (at AA only) object recognition or personal content (SC 3.3.8).
11. **4.1.1 Parsing is not tested for WCAG 2.2.** It is obsolete and removed (SC 4.1.1); WCAG 2.1 and the WCAG 2.0 errata say to treat it as always satisfied for HTML or XML.
12. **A claim, if made, has the required parts.** Date, guidelines title, version and URI, level, the pages covered, and the technologies relied upon (§ 5.3.1). Claims are optional.

## Workflow

1. **Pick the version and level.** Default to WCAG 2.2 Level AA. Target WCAG 2.1 or WCAG 2.0 when a named policy requires it, and record whether 4.1.1 must be reported. Add WCAG 3.0 as a target when the user opts in, together with WCAG 2.2 AA unless they explicitly opt out of it.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target WCAG 2 version is recorded with its criteria set (2.2: 55 at A and AA; 2.1: 50; 2.0: 38), and any WCAG 3.0 target records the Working Draft date and the provision set (core, plus any named supplemental requirements and assertions).
2. **Define the scope.** List pages, responsive variations, complete processes, third-party content, and the technologies relied upon.
   -> [`references/conformance.md`](references/conformance.md)
   ✓ No part of a page is excluded, and every step of each process in scope is listed.
3. **Build or review the perceivable and operable criteria.** Text alternatives, media alternatives, structure, color and contrast, reflow and text spacing, keyboard, timing, flashing, navigation and focus, pointer input.
   -> [`references/perceivable-operable.md`](references/perceivable-operable.md)
   ✓ Each Level A and AA criterion of principles 1 and 2 is met, not applicable, or logged as a failure with the criterion number.
4. **Build or review the understandable and robust criteria.** Language, predictable behaviour, consistent help, labels and errors, redundant entry, authentication, name/role/value, status messages.
   -> [`references/understandable-robust.md`](references/understandable-robust.md)
   ✓ Each Level A and AA criterion of principles 3 and 4 is met, not applicable, or logged as a failure.
5. **Test.** Combine automated checks with manual keyboard, zoom, spacing, pointer and screen reader checks; use Understanding documents and Techniques as guidance, never as the pass/fail rule.
   -> [`references/testing.md`](references/testing.md)
   ✓ Every in-scope criterion has a result backed by a manual check where automated tools cannot decide it.
6. **Write the claim or statement** (only when asked). Include the required components, and use a statement of partial conformance for uncontrolled third-party content.
   -> [`references/conformance.md`](references/conformance.md)
   ✓ The claim names the target version and its URI (for example "Web Content Accessibility Guidelines 2.2 at https://www.w3.org/TR/WCAG22/"), the level, the date, the pages and the technologies.
7. **Upgrade** (only when asked). Follow the upgrade section from the source version to the new target, WCAG 2.1 or WCAG 2.2.
   -> [`references/versions.md`](references/versions.md)
   ✓ Every criterion the new version adds at or below the target level is tested, and 4.1.1 is handled as the policy requires.
8. **Build and test to WCAG 3.0** (when targeted). Define the scope and accessibility support set, then build every applicable core requirement guideline by guideline, plus the supplemental requirements and assertions asked for. Test each against the requirement text; where the draft leaves a value as `@@`, test the WCAG 2.2 counterpart and say so.
   -> [`references/wcag-3.md`](references/wcag-3.md)
   ✓ Every applicable core requirement is pass, fail or not applicable with a reason, and the report is titled as against the named Working Draft and its date, as work in progress. It is never a W3C conformance claim: the draft says it is inappropriate to cite it "as other than a work in progress" (WCAG 3.0, Status of This Document).

## Verify before done

- [ ] Every Level A and AA criterion in the target version (WCAG 2.2: 55, with 4.1.1 removed; WCAG 2.1: 50; WCAG 2.0: 38) has a pass, fail or not-applicable result for each page variation in scope.
- [ ] All functionality works with the keyboard alone, without traps, and the focused element is never fully covered by sticky headers, footers or banners (SC 2.1.1, 2.1.2, 2.4.11).
- [ ] Text contrast is at least 4.5:1 (3:1 for large-scale text), and component boundaries, states and focus indicators are at least 3:1 (SC 1.4.3, 1.4.11).
- [ ] Content reflows at 320 CSS pixels wide without two-dimensional scrolling, and survives the SC 1.4.12 text spacing overrides without loss (SC 1.4.10, 1.4.12).
- [ ] Every drag interaction has a click or tap alternative, and every pointer target is at least 24 by 24 CSS pixels or passes the spacing circle test (SC 2.5.7, 2.5.8).
- [ ] Sign-in fields allow paste and password manager fill, and any CAPTCHA has a non-cognitive alternative (SC 3.3.8).
- [ ] Custom controls expose name, role, state and value, and status messages are announced without moving focus (SC 4.1.2, 4.1.3).
- [ ] For a WCAG 3.0 target: every applicable core requirement of the pinned Working Draft has a result, the scope and accessibility support set are stated, WCAG 2.2 AA was built and tested too (unless explicitly opted out), and no Bronze, Silver or Gold tier is claimed.
- [ ] No conformance claim refers to the WCAG 3.0 draft, every WCAG 3.0 result is labelled with the Working Draft date as work in progress, and no WCAG 2.2 report fails content on 4.1.1.

## Reference index

- **`references/versions.md`**: WCAG 2.2, WCAG 2.1, WCAG 2.0 and the WCAG 3.0 draft with their status, what each added, upgrade steps, building to the preview and refreshing it. Load for steps 1 and 7.
- **`references/wcag-3.md`**: the WCAG 3.0 Working Draft: its structure and status levels, every guideline with its core and supplemental requirements and assertions, conformance (scope, accessibility support set), the exploratory reporting tiers, a derived WCAG 2.2 mapping, and how to build, test and report. Load for step 8.
- **`references/conformance.md`**: levels, the five conformance requirements, accessibility support, conforming alternate versions, claims, partial conformance, and the privacy and security notes. Load for steps 2 and 6.
- **`references/perceivable-operable.md`**: principles 1 and 2, criterion by criterion at A and AA (AAA listed), with 2.4.11, 2.4.13, 2.5.7 and 2.5.8 in detail. Load for step 3.
- **`references/understandable-robust.md`**: principles 3 and 4, with 3.2.6, 3.3.7, 3.3.8 and 3.3.9 in detail, and the removal of 4.1.1. Load for step 4.
- **`references/testing.md`**: how Understanding, Techniques, failures and Test Rules relate to conformance, a manual test checklist, and common failures. Load for step 5.

## Related skills

- `wai-aria`, for roles, states and properties when native HTML elements cannot provide name, role and value: `npx skills add ScaleDockHQ/scaledock-skills --skill wai-aria`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/): W3C Recommendation, 12 December 2024 (REC-WCAG22-20241212; first published 5 October 2023), checked 2026-10-05.
- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/): W3C Recommendation, 6 May 2025 (REC-WCAG21-20250506; first published 5 June 2018), checked 2026-10-05.
- [Web Content Accessibility Guidelines (WCAG) 2.0](https://www.w3.org/TR/WCAG20/): W3C Recommendation, 11 December 2008 (REC-WCAG20-20081211), checked 2026-10-05.
- [WCAG 2.0 Errata](https://www.w3.org/WAI/WCAG20/errata/): W3C errata page, includes the 4.1.1 Parsing note, checked 2026-10-05.
- [W3C Accessibility Guidelines (WCAG) 3.0](https://www.w3.org/TR/wcag-3.0/): W3C Working Draft, 10 September 2026 (WD-wcag-3.0-20260910), checked 2026-10-05. Draft posture: build. Still the latest Working Draft on 2026-10-05.
- [W3C Accessibility Guidelines (WCAG) 3.0, Editor's Draft](https://w3c.github.io/wcag3/guidelines/): W3C Editor's Draft, 2 October 2026, checked 2026-10-05. Used only to confirm the Working Draft's provisions and count the Exploratory ones.
- [Explainer for W3C Accessibility Guidelines (WCAG) 3.0](https://www.w3.org/TR/wcag-3.0-explainer/): W3C Group Note Draft, 10 September 2026, checked 2026-10-05.
- [WCAG 3 Introduction](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/): WAI resource, updated 25 September 2026, checked 2026-10-05.
- [WCAG 3 Support Material](https://www.w3.org/WAI/WCAG3/informative/): informative, in-progress draft (requirement pages with draft tests), checked 2026-10-05.
- [What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/): WAI resource, updated 5 October 2023, checked 2026-10-05.
- [WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/): WAI resource, updated 17 September 2026, checked 2026-10-05.
- [WCAG 2 FAQ](https://www.w3.org/WAI/standards-guidelines/wcag/faq/): WAI resource, updated 5 May 2026, checked 2026-10-05.
- [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/): informative, updated 11 February 2026, checked 2026-10-05. Per-criterion pages read: Target Size (Minimum), Accessible Authentication (Minimum), Focus Not Obscured (Minimum), Focus Appearance, Dragging Movements, Consistent Help, Redundant Entry, Conformance.
- [Understanding Techniques for WCAG 2.2 Success Criteria](https://www.w3.org/WAI/WCAG22/Understanding/understanding-techniques): informative, updated 26 July 2026, checked 2026-10-05.
- [Understanding Test Rules for WCAG 2 Success Criteria](https://www.w3.org/WAI/WCAG22/Understanding/understanding-act-rules): informative, updated 10 August 2026, checked 2026-10-05.
- [How to Meet WCAG (Quick Reference)](https://www.w3.org/WAI/WCAG22/quickref/): informative, updated 22 September 2025, checked 2026-10-05.
