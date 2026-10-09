---
name: c4-model
description: >-
  C4 model: diagram software architecture as system context, container, component and code views. Covers C4 model. Use when drawing software architecture diagrams. Triggers: C4 model.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# C4 model

The C4 model by Simon Brown: its abstractions (software system, container, component), the system context and container diagrams, the notation recommendations and the diagram review checklist, read from the Markdown source of c4model.com.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Author or reviewer of C4 diagrams, or a tool that renders them.
- Target version: C4 model (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **Container.** "A container is essentially a runtime boundary around some code that is being executed or some data that is being stored."
2. **Component.** "In other words, all components inside a container execute in the same process space."
3. **System context diagram § Recommended?.** "Yes, a system context diagram is recommended for all software development teams."
4. **Container diagram § Recommended?.** "Yes, a container diagram is recommended for all software development teams."
5. **Notation § Diagrams.** "Every diagram should have a title describing the diagram type and scope (e.g. "System Context diagram for My Software System")."
6. **Notation § Diagrams.** "Every diagram should have a key/legend explaining the notation being used (e.g. shapes, colours, border styles, line types, arrow heads, etc)."
7. **Notation § Elements.** "The type of every element should be explicitly specified (e.g. Person, Software System, Container or Component)."
8. **Notation § Elements.** "Every container and component should have a technology explicitly specified."
9. **Notation § Relationships.** "Every line should represent a unidirectional relationship."
10. **Notation § Relationships.** "Every line should be labelled, the label being consistent with the direction and intent of the relationship (e.g. dependency or data flow)."

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
- [ ] Every diagram has a title naming its type and scope, and a key/legend.
- [ ] Every container and component names its technology, and every relationship line is labelled.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `arc42`, `madr`, `diataxis`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [C4 model, Abstractions: Software system](https://raw.githubusercontent.com/simonbrowndotje/c4model/10c44932ac3be0afa1ead165d581868222f60170/abstractions/01-software-system.md): Website source, c4model.com source, commit 10c4493 (2026-09-15), checked 2026-10-06.
- [C4 model, Abstractions: Container](https://raw.githubusercontent.com/simonbrowndotje/c4model/10c44932ac3be0afa1ead165d581868222f60170/abstractions/02-container.md): Website source, c4model.com source, commit 10c4493 (2026-09-15), checked 2026-10-06.
- [C4 model, Abstractions: Component](https://raw.githubusercontent.com/simonbrowndotje/c4model/10c44932ac3be0afa1ead165d581868222f60170/abstractions/03-component.md): Website source, c4model.com source, commit 10c4493 (2026-09-15), checked 2026-10-06.
- [C4 model, Diagrams: System context diagram](https://raw.githubusercontent.com/simonbrowndotje/c4model/10c44932ac3be0afa1ead165d581868222f60170/diagrams/01-system-context.md): Website source, c4model.com source, commit 10c4493 (2026-09-15), checked 2026-10-06.
- [C4 model, Diagrams: Container diagram](https://raw.githubusercontent.com/simonbrowndotje/c4model/10c44932ac3be0afa1ead165d581868222f60170/diagrams/02-container.md): Website source, c4model.com source, commit 10c4493 (2026-09-15), checked 2026-10-06.
- [C4 model, Diagrams: Notation](https://raw.githubusercontent.com/simonbrowndotje/c4model/10c44932ac3be0afa1ead165d581868222f60170/diagrams/11-notation.md): Website source, c4model.com source, commit 10c4493 (2026-09-15), checked 2026-10-06.
