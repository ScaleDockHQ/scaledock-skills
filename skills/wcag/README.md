# wcag

An agent skill for the W3C Web Content Accessibility Guidelines (WCAG) 2.2: building, reviewing and testing web and mobile UIs against the success criteria at Level A, AA or AAA, and writing conformance claims.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill wcag
```

Then ask your agent to "review this component against WCAG 2.2 AA" or "write a WCAG 2.2 test plan for our checkout".

## What it covers

- Conformance levels, the five conformance requirements, accessibility support, conforming alternate versions, claims and partial conformance statements.
- Every success criterion by principle (perceivable, operable, understandable, robust), with Level A and AA in detail and AAA listed.
- What WCAG 2.2 added: Focus Not Obscured, Focus Appearance, Dragging Movements, Target Size (Minimum), Consistent Help, Redundant Entry and Accessible Authentication, and the removal of 4.1.1 Parsing.
- The contrast ratio and relative luminance formulas, with a TypeScript helper.
- Testing: how Understanding documents, Techniques, failures and Test Rules relate to conformance, and a manual checklist per criterion.
- Upgrading audits and claims from WCAG 2.0 and 2.1.

## Versions

| Line     | Status                |
| -------- | --------------------- |
| WCAG 3.0 | preview (track)       |
| WCAG 2.2 | current               |
| WCAG 2.1 | supported             |
| WCAG 2.0 | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): W3C Recommendation, 12 December 2024.
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/): W3C Recommendation, 6 May 2025.
- [WCAG 2.0](https://www.w3.org/TR/WCAG20/): W3C Recommendation, 11 December 2008, and its [errata](https://www.w3.org/WAI/WCAG20/errata/).
- [WCAG 3.0](https://www.w3.org/TR/wcag-3.0/): W3C Working Draft, 10 September 2026.
- [What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/), [WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/) and [WCAG 2 FAQ](https://www.w3.org/WAI/standards-guidelines/wcag/faq/): WAI resources.
- [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/), [Understanding Techniques](https://www.w3.org/WAI/WCAG22/Understanding/understanding-techniques), [Understanding Test Rules](https://www.w3.org/WAI/WCAG22/Understanding/understanding-act-rules) and the [Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/): informative.

## License

MIT
