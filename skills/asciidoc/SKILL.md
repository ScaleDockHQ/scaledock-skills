---
name: asciidoc
description: >-
  AsciiDoc: AsciiDoc is a lightweight, semantic markup language primarily designed for writing technical documentation. Covers AsciiDoc. Use when writing AsciiDoc. Triggers: AsciiDoc.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# AsciiDoc

The AsciiDoc Language documentation from the Eclipse AsciiDoc Language project (the pre-specification description of the language): document structure, header, sections, blocks, attribute entries, lists, text formatting and the include directive, read from the AsciiDoc sources in the asciidoc-lang repository on Eclipse GitLab.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Author of AsciiDoc documents, or a tool that generates or processes them.
- Target version: AsciiDoc (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **Document Structure § Lines.** "Many aspects of the syntax must occupy a whole line."
2. **Document Structure § Blocks.** "These metadata lines must be above and directly adjacent to the block itself."
3. **Document Header § Document header structure.** "In other words, the document must start with a document header if it has one."
4. **Section Titles and Levels.** "Nested section levels must be sequential."
5. **Section Titles and Levels § Section level syntax.** "Section levels cannot be skipped when nesting sections (e.g., you can't nest a level 5 section directly inside a level 3 section; an intermediary level 4 section is required)."
6. **Delimited Blocks § Linewise delimiters.** "The opening and closing delimiter must match exactly, both in length and in sequence of characters."
7. **Delimited Blocks § Nesting blocks.** "Delimited blocks cannot be interleaved."
8. **Attribute Entries § What is an attribute entry?.** "Each attribute entry must be entered on its own line."
9. **Unordered Lists § Basic unordered list.** "Empty lines are required before and after a list."
10. **Text Formatting and Punctuation § Formatting marks and pairs.** "Formatting pairs can be nested, but they cannot be overlapped."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the section it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Section levels are sequential with no skipped levels, and every delimited block's closing delimiter matches its opening delimiter exactly.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `arc42`, `commonmark`, `diataxis`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [AsciiDoc Language, Document Structure](https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/ROOT/pages/document-structure.adoc): Documentation, AsciiDoc Language documentation, pre-spec (asciidoc-lang commit 68ed0b2, 2026-08-22), checked 2026-10-06.
- [AsciiDoc Language, Key Concepts](https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/ROOT/pages/key-concepts.adoc): Documentation, AsciiDoc Language documentation, pre-spec (asciidoc-lang commit 68ed0b2, 2026-08-22), checked 2026-10-06.
- [AsciiDoc Language, Document Header](https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/document/pages/header.adoc): Documentation, AsciiDoc Language documentation, pre-spec (asciidoc-lang commit 68ed0b2, 2026-08-22), checked 2026-10-06.
- [AsciiDoc Language, Section Titles and Levels](https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/sections/pages/titles-and-levels.adoc): Documentation, AsciiDoc Language documentation, pre-spec (asciidoc-lang commit 68ed0b2, 2026-08-22), checked 2026-10-06.
- [AsciiDoc Language, Blocks](https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/blocks/pages/index.adoc): Documentation, AsciiDoc Language documentation, pre-spec (asciidoc-lang commit 68ed0b2, 2026-08-22), checked 2026-10-06.
- [AsciiDoc Language, Delimited Blocks](https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/blocks/pages/delimited.adoc): Documentation, AsciiDoc Language documentation, pre-spec (asciidoc-lang commit 68ed0b2, 2026-08-22), checked 2026-10-06.
- [AsciiDoc Language, Attribute Entries](https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/attributes/pages/attribute-entries.adoc): Documentation, AsciiDoc Language documentation, pre-spec (asciidoc-lang commit 68ed0b2, 2026-08-22), checked 2026-10-06.
- [AsciiDoc Language, Attribute Entry Names and Values](https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/attributes/pages/names-and-values.adoc): Documentation, AsciiDoc Language documentation, pre-spec (asciidoc-lang commit 68ed0b2, 2026-08-22), checked 2026-10-06.
- [AsciiDoc Language, Unordered Lists](https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/lists/pages/unordered.adoc): Documentation, AsciiDoc Language documentation, pre-spec (asciidoc-lang commit 68ed0b2, 2026-08-22), checked 2026-10-06.
- [AsciiDoc Language, Text Formatting and Punctuation](https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/text/pages/index.adoc): Documentation, AsciiDoc Language documentation, pre-spec (asciidoc-lang commit 68ed0b2, 2026-08-22), checked 2026-10-06.
- [AsciiDoc Language, Includes](https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/directives/pages/include.adoc): Documentation, AsciiDoc Language documentation, pre-spec (asciidoc-lang commit 68ed0b2, 2026-08-22), checked 2026-10-06.
