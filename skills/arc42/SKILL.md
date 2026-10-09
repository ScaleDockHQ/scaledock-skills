---
name: arc42
description: >-
  arc42: write software architecture documentation in the arc42 template sections. Covers arc42. Use when writing an arc42 architecture document. Triggers: arc42.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# arc42

The arc42 template for software and system architecture documentation, by Peter Hruschka, Gernot Starke and contributors: the twelve sections and their help texts, read from the English AsciiDoc sources in the arc42/arc42-template repository.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Author or reviewer of an arc42 architecture document.
- Target version: arc42 (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **§ 1.2 Quality Goals.** "The top three (max five) quality goals for the architecture whose fulfillment is of highest importance to the major stakeholders."
2. **§ 2 Architecture Constraints.** "Constraints must always be dealt with; they may be negotiable, though."
3. **§ 3 Context and Scope.** "If necessary, differentiate the business context (domain specific inputs and outputs) from the technical context (channels, protocols, hardware)."
4. **§ 5 Building Block View.** "This view is mandatory for every architecture documentation."
5. **§ 5.2 Level 2.** "Please prefer relevance over completeness."
6. **§ 8 Cross-cutting Concepts.** "DO NOT ATTEMPT to cover all of the topics of the aforementioned diagram."
7. **§ 9 Architecture Decisions.** "Stakeholders of your system should be able to comprehend and retrace your decisions."
8. **§ 10 Quality Requirements.** "The most important of these requirements have already been described in section 1.2. (quality goals), therefore they should only be referenced here."
9. **§ 10.2 Quality Scenarios.** "Ensure that your scenarios are specific and measurable."

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
- [ ] Section 1.2 names at most five quality goals, and section 10 references them rather than repeating them.
- [ ] The building block view (section 5) is present.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `c4-model`, `madr`, `diataxis`, `asciidoc`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [arc42 template, Section 1: Introduction and Goals](https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/01_introduction_and_goals.adoc): Template, Template release 2026.10.2 (commit 32fd461), checked 2026-10-06.
- [arc42 template, Section 2: Architecture Constraints](https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/02_architecture_constraints.adoc): Template, Template release 2026.10.2 (commit 32fd461), checked 2026-10-06.
- [arc42 template, Section 3: Context and Scope](https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/03_context_and_scope.adoc): Template, Template release 2026.10.2 (commit 32fd461), checked 2026-10-06.
- [arc42 template, Section 4: Solution Strategy](https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/04_solution_strategy.adoc): Template, Template release 2026.10.2 (commit 32fd461), checked 2026-10-06.
- [arc42 template, Section 5: Building Block View](https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/05_building_block_view.adoc): Template, Template release 2026.10.2 (commit 32fd461), checked 2026-10-06.
- [arc42 template, Section 8: Cross-cutting Concepts](https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/08_concepts.adoc): Template, Template release 2026.10.2 (commit 32fd461), checked 2026-10-06.
- [arc42 template, Section 9: Architecture Decisions](https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/09_architecture_decisions.adoc): Template, Template release 2026.10.2 (commit 32fd461), checked 2026-10-06.
- [arc42 template, Section 10: Quality Requirements](https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/10_quality_requirements.adoc): Template, Template release 2026.10.2 (commit 32fd461), checked 2026-10-06.
- [arc42 template, Section 11: Risks and Technical Debts](https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/11_technical_risks.adoc): Template, Template release 2026.10.2 (commit 32fd461), checked 2026-10-06.
- [arc42 template, Section 12: Glossary](https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/12_glossary.adoc): Template, Template release 2026.10.2 (commit 32fd461), checked 2026-10-06.
