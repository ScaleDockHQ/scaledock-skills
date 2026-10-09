---
name: diataxis
description: >-
  Diátaxis: structure documentation into tutorials, how-to guides, reference and explanation. Covers Diátaxis. Use when structuring documentation. Triggers: Diátaxis.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# Diátaxis

The Diátaxis documentation framework by Daniele Procida: the four kinds of documentation (tutorials, how-to guides, reference, explanation), their key principles and the compass for deciding which kind a piece of content is, read from the reStructuredText source of diataxis.fr.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Author, editor or reviewer of documentation, or someone reorganising a documentation set.
- Target version: Diátaxis (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **Tutorials § Deliver visible results early and often.** "Every step the learner follows should produce a comprehensible result, however small."
2. **Tutorials § Ruthlessly minimise explanation.** "Instead, provide a link or reference to that explanation, so that it's available, but doesn't get in the way."
3. **Tutorials § Aspire to perfect reliability.** "At every stage, when you ask your student to do something, they must see the result you promise."
4. **How-to guides § How-to guides addressed to problems.** "How-to guides must be written from the perspective of the user, not of the machinery."
5. **How-to guides § What how-to guides are not.** "How-to guides are wholly distinct from tutorials"
6. **How-to guides § Pay attention to naming.** "Choose titles that say exactly what a how-to guide shows."
7. **Reference § Reference as description.** "There should be no doubt or ambiguity in reference; it should be wholly authoritative."
8. **Reference § Respect the structure of the machinery.** "the structure of the documentation should mirror the structure of the product"
9. **Explanation § Admit opinion and perspective.** "Explanation can and must consider alternatives"
10. **Explanation § Keep explanation closely bounded.** "One risk of explanation is that it tends to absorb other things."
11. **The compass.** "To use the compass, just two questions need to be asked: _action or cognition?_ _acquisition or application?_"

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
- [ ] Each document is one kind (tutorial, how-to guide, reference or explanation), checked with the compass's two questions.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `arc42`, `c4-model`, `madr`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Diátaxis, Tutorials](https://raw.githubusercontent.com/evildmp/diataxis-documentation-framework/957c09ca40b4a1edc23874f713e01937d50d54d5/source/tutorials.rst): Framework, diataxis.fr source, commit 957c09c (2026-08-06), checked 2026-10-06.
- [Diátaxis, How-to guides](https://raw.githubusercontent.com/evildmp/diataxis-documentation-framework/957c09ca40b4a1edc23874f713e01937d50d54d5/source/how-to-guides.rst): Framework, diataxis.fr source, commit 957c09c (2026-08-06), checked 2026-10-06.
- [Diátaxis, Reference](https://raw.githubusercontent.com/evildmp/diataxis-documentation-framework/957c09ca40b4a1edc23874f713e01937d50d54d5/source/reference.rst): Framework, diataxis.fr source, commit 957c09c (2026-08-06), checked 2026-10-06.
- [Diátaxis, Explanation](https://raw.githubusercontent.com/evildmp/diataxis-documentation-framework/957c09ca40b4a1edc23874f713e01937d50d54d5/source/explanation.rst): Framework, diataxis.fr source, commit 957c09c (2026-08-06), checked 2026-10-06.
- [Diátaxis, The compass](https://raw.githubusercontent.com/evildmp/diataxis-documentation-framework/957c09ca40b4a1edc23874f713e01937d50d54d5/source/compass.rst): Framework, diataxis.fr source, commit 957c09c (2026-08-06), checked 2026-10-06.
