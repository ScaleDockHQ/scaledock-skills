---
name: css
description: >-
  CSS Snapshot: This document collects together into one definition all the specs that together form the current state of Cascading Style Sheets (CSS) as of 2026. Covers CSS Snapshot 2026 (track), CSS Snapshot 2025 (supported), CSS Snapshot 2024 (supported). Use when writing or reviewing CSS and choosing a snapshot. Triggers: CSS Snapshot, CSS.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# CSS Snapshot

This document collects together into one definition all the specs that together form the current state of Cascading Style Sheets (CSS) as of 2026. The primary audience is CSS implementers, not CSS authors, as this definition includes modules by specification stability, not Web browser adoption rate. CSS is a language for describing the rendering of structured documents (such as HTML and XML) on screen, on paper, etc.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when writing or reviewing CSS and choosing a snapshot.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: CSS Snapshot 2026 (default, posture track); CSS Snapshot 2025 (supported); CSS Snapshot 2024 (supported); CSS Snapshot 2023 (legacy: read and upgrade, never author). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **9. Acknowledgements.** "The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119."
2. **9. Acknowledgements.** "Advisements are normative sections styled to evoke special attention and are set apart from other normative text with <strong class="advisement"> , like this: UAs MUST provide an accessible alternative."
3. **1.2..** "During this phase the W3C Advisory Committee must approve the transition to REC."
4. **2.1. Cascading Style Sheets (CSS) — The Official Definition.** "Implementers should monitor www-style and/or the CSS Working Group Blog for any resulting changes, corrections, or clarifications."
5. **2.5..** "Features in CSS2 that were dropped from CSS2.1 should be considered to be at the Candidate Recommendation stage, but note that many of these have been or will be pulled into a CSS Level 3 working draft, in which case that specification will, once it reaches CR, obsolete the definitions in CSS2."
6. **2.6..** "Note: Partial implementations of CSS, even if that subset is an official profile, must follow the forward-compatible parsing rules for partial implementations ."
7. **3.1. Partial Implementations.** "So that authors can exploit the forward-compatible parsing rules to assign fallback values, CSS renderers must treat as invalid (and ignore as appropriate ) any at-rules, properties, property values, keywords, and other syntactic constructs for which they have no usable level of support ."
8. **3.1. Partial Implementations.** "In particular, user agents must not selectively ignore unsupported property values and honor supported values in a single multi-value property declaration: if any value is considered invalid (as unsupported values must be), CSS requires that the entire declaration be ignored."

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

- [CSS Snapshot 2026](https://www.w3.org/TR/css-2026/): Note, css-2026 NOTE-css-2026-20260622 (Note, 2026-06-22), checked 2026-10-06.
- [CSS Snapshot 2025](https://www.w3.org/TR/css-2025/): Note, css-2025 NOTE-css-2025-20250918 (Note, 2025-09-18), checked 2026-10-06.
- [CSS Snapshot 2024](https://www.w3.org/TR/css-2024/): Note, css-2024 NOTE-css-2024-20250225 (Note, 2025-02-25), checked 2026-10-06.
- [CSS Snapshot 2023](https://www.w3.org/TR/css-2023/): Note, css-2023 NOTE-css-2023-20231207 (Note, 2023-12-07), checked 2026-10-06.
