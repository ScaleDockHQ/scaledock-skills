# Testing

Read this when planning or running an accessibility test, deciding what an automated tool result means, or turning findings into a report. Sources: WCAG 2.2, Understanding Techniques for WCAG 2.2 Success Criteria, Understanding Test Rules for WCAG 2 Success Criteria, Understanding Conformance, the per-criterion Understanding documents, the Quick Reference and the WCAG 2 FAQ, listed in [Sources](../SKILL.md#sources).

## What decides pass or fail

- **The success criteria are the test.** The basis for conformance is the WCAG 2.2 success criteria, not the techniques (Understanding Techniques, Techniques are Informative; WCAG 2 FAQ, Do content authors have to follow W3C's techniques?).
- **Supporting documents are informative.** Understanding documents, Techniques, Test Rules and the Quick Reference do not set or change requirements and are not required for conformance (WCAG 2 FAQ, Do the supporting documents change WCAG 2 requirements and conformance?). The Understanding index labels itself "Informative explanations, not required to meet WCAG".
- **WCAG 2 criteria are testable by machine and human evaluation together.** Every criterion must be testable, but the test can combine automated and human checks (WCAG 2.2, Introduction, Background on WCAG 2; Understanding Conformance, Understanding Levels of Conformance).

## The supporting documents

| Document                | What it gives a tester                                                                                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Understanding WCAG 2.2  | Intent, benefits, examples, the list of sufficient techniques and failures for each criterion, and the key terms it uses.                                              |
| Techniques for WCAG 2.2 | Sufficient techniques, advisory techniques and documented failures, each with a description, examples, code and a test (WCAG 2.2, Introduction, Supporting Documents). |
| Test Rules (ACT rules)  | Rules in the ACT Rules Format 1.0 for tool and methodology authors, each with applicability, expectations, assumptions and test cases (Understanding Test Rules).      |
| Quick Reference         | All criteria and techniques filterable by version (2.2, 2.1, 2.0, only 2.2 additions, only 2.1 additions), level, tags and technology (Quick Reference, How to Use).   |

How to read them (Understanding Techniques):

- **Sufficient techniques**: using one correctly, where it is accessibility supported for your users, meets the criterion. Not using one does not mean failure. Where techniques are joined by AND, all are needed.
- **Advisory techniques**: improve accessibility but are not sufficient on their own, for example because they are untestable or not yet accessibility supported.
- **Failures**: content with a documented failure does not meet the criterion, unless a conforming alternate version without the failure is provided. Failures are the most useful part for evaluators.
- **Technique tests check the technique, not the criterion.** Failing a technique test does not mean failing WCAG; passing all sufficient technique tests does not guarantee conformance. Evaluations must go beyond the technique tests.
- **Support notes age.** Test with the browsers and assistive technologies your users have now.
- **Technique code is illustrative.** Examples show one point and are not meant to be copied as production code.
- W3C cautions against requiring only its published sufficient techniques; other techniques are fine if they satisfy the criterion and the conformance requirements (Understanding Techniques, Other Techniques; WCAG 2 FAQ).

How to read Test Rules (Understanding Test Rules):

- A failed rule means the criterion is not satisfied (unless a conforming alternate version exists).
- A passed rule means only that no failure was detected; it checks one aspect in one technology. Checking all aspects of a criterion usually needs human testers.

Apply the same reading to automated scanners: a finding is evidence of a failure to confirm; a clean scan is not a pass.

## Test plan

1. **Scope.** List pages, each responsive variation, each complete process, and the technologies relied upon (WCAG 2.2, § 5.2.2, § 5.2.3, § 5.2.4). Use the Quick Reference filtered to WCAG 2.2 and the target levels as the checklist.
2. **Automated pass.** Run tools built on Test Rules or similar checks to find candidate failures. Confirm each finding against the criterion, and treat everything the tool passed as untested until the manual pass.
3. **Manual pass.** Work through the checks below on every variation in scope.
4. **Assistive technology pass.** Test the user agents and assistive technologies the technologies are claimed to be accessibility supported with, and record them (WCAG 2.2, Glossary, accessibility supported; § 5.3.2).
5. **Record.** One result per criterion per page or variation: pass, fail (with the criterion number, location and documented failure if one matches), or not applicable. Report AAA criteria met beyond the target level if useful (§ 5.2.1, Note 1).

## Manual checks by criterion

Keyboard and focus:

- Tab and Shift+Tab through everything; every function works, nothing traps focus, and any non-standard exit is explained (SC 2.1.1, 2.1.2).
- Focus order follows meaning (SC 2.4.3); focus is always visible (SC 2.4.7); receiving focus or changing a value does not unexpectedly change context (SC 3.2.1, 3.2.2).
- With sticky headers, footers, cookie banners and chat widgets present, no focused element is fully hidden (SC 2.4.11; failure F110). For AAA, no part is hidden (SC 2.4.12), and the indicator has the 2px-perimeter area and 3:1 change contrast (SC 2.4.13).
- Single-character shortcuts can be turned off, remapped, or work only on focus (SC 2.1.4).
- Hover and focus popups can be dismissed with no pointer or focus move, can be hovered, and stay until dismissed (SC 1.4.13).

Visual:

- Text contrast 4.5:1 (3:1 large); component boundaries, states and graphics 3:1 (SC 1.4.3, 1.4.11). Compute with the formula in [`perceivable-operable.md`](perceivable-operable.md#contrast-ratio).
- No information by color alone (SC 1.4.1) or by shape, position or sound alone in instructions (SC 1.3.3).
- Zoom text to 200% (SC 1.4.4); set the viewport to 320 CSS pixels wide (or zoom a 1280px viewport to 400%) and check for two-dimensional scrolling and lost content (SC 1.4.10).
- Apply the four text spacing overrides (line height 1.5, paragraph spacing 2, letter spacing 0.12, word spacing 0.16) and check for clipped or overlapping text (SC 1.4.12).
- Rotate the device or viewport; content is not locked to one orientation (SC 1.3.4).

Pointer:

- Every drag has a click or tap alternative that is not a path gesture (SC 2.5.7, 2.5.1).
- Measure targets: a 24 by 24 CSS pixel square fits inside, or the 24px-diameter circle centered on each undersized target touches no other target or circle; inline links and unmodified native controls are excepted (SC 2.5.8; Understanding 2.5.8, Size requirement and Spacing).
- Pressing down and moving away before release does not trigger the action (SC 2.5.2). Visible labels appear in the accessible name (SC 2.5.3).
- Motion-triggered features have a UI control and can be disabled (SC 2.5.4).

Forms and flows:

- Every input has a label or instructions (SC 3.3.2); errors identify the field and describe the problem in text (SC 3.3.1), with suggestions where known (SC 3.3.3).
- Personal data fields expose their input purpose (SC 1.3.5).
- Legal, financial and data-changing submissions are reversible, checked or confirmable (SC 3.3.4).
- In multi-step flows, no earlier answer has to be typed again (SC 3.3.7), and values survive a validation error (Understanding 3.3.7, Examples).
- Sign-in: paste works in username, password and one-time code fields; a password manager can fill them; any CAPTCHA or puzzle has an alternative; repeat for every factor and for account recovery (SC 3.3.8; Understanding 3.3.8; failure F109).
- Time limits can be turned off, adjusted or extended (SC 2.2.1); auto-moving or auto-updating content can be paused (SC 2.2.2).

Consistency across a set of pages:

- Repeated navigation keeps its relative order (SC 3.2.3); same-function components have the same names (SC 3.2.4); help links or contact details keep their relative order (SC 3.2.6).
- A bypass mechanism exists (SC 2.4.1); titles describe each page (SC 2.4.2); more than one way to reach pages outside a process (SC 2.4.5).

Screen reader and markup:

- Images and icons have equivalent alternatives, decorative ones are ignored (SC 1.1.1).
- Headings, lists, tables and label associations are exposed (SC 1.3.1); reading order matches meaning (SC 1.3.2); headings and labels are descriptive (SC 2.4.6); link purpose is clear in context (SC 2.4.4).
- Page language and changes of language are set (SC 3.1.1, 3.1.2).
- Custom widgets announce name, role, state and value, and changes are announced (SC 4.1.2); status messages such as "saved" or "3 results" are announced without moving focus (SC 4.1.3).

Media and motion:

- Captions on prerecorded and live video with audio; audio description or a media alternative for prerecorded video; transcripts for audio-only (SC 1.2.1 to 1.2.5).
- Autoplaying audio over 3 seconds can be stopped or its volume set (SC 1.4.2); nothing flashes more than three times a second above threshold (SC 2.3.1).

## Common failures from the Understanding documents

| Failure | Criterion | What fails                                                                                       |
| ------- | --------- | ------------------------------------------------------------------------------------------------ |
| F110    | 2.4.11    | A sticky footer or header completely hides focused elements.                                     |
| F108    | 2.5.7     | No single pointer method without dragging.                                                       |
| F109    | 3.3.8     | Preventing password or code re-entry in the same format (blocked paste, split or partial entry). |
| (none)  | 3.2.6     | Inconsistent help location (listed as a failure without an F number in Understanding 3.2.6).     |

Matching sufficient techniques: C43 scroll-padding (2.4.11), G219 dragging alternative (2.5.7), C42 min-height and min-width on target containers (2.5.8), G220 consistent contact-us link (3.2.6), G221 data from a previous step (3.3.7), G218 email link authentication and H100 marked-up email and password inputs (3.3.8).

## Reporting 4.1.1

Do not fail WCAG 2.2 content on 4.1.1. In a WCAG 2.0 or 2.1 report, mark it satisfied for HTML or XML content and file the underlying symptom under 1.3.1 or 4.1.2 (WCAG 2.1, SC 4.1.1 Notes; WCAG 2.0 Errata).
