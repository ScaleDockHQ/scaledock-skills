---
name: uml
description: >-
  UML: OMG Unified Modeling Language version 2.5.1. Covers UML 2.5.1. Use when drawing a UML model. Triggers: UML, UML 2.5.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# UML

OMG Unified Modeling Language (OMG UML) Version 2.5.1, document formal/2017-12-05, December 2017.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text when drawing or exchanging a UML model.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: a modeller or a tool vendor claiming conformance.
- Target version: UML 2.5.1 (current) — default. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **text.** "The tool must also provide a way to validate the well-formedness of models that corresponds to the constraints defined in the UML metamodel."
2. **2.5.1.** "In this case, the expanded bound element must have a realization dependency (see sub clause 7.7) to the bound element that it is expanding."
3. **15.2.** "The lower and upper bounds for the multiplicity of a MultiplicityElement are specified by ValueSpecifications (see Clause 8), which must evaluate to an Integer value for the lowerBound and an UnlimitedNatural value for the Unified Modeling Language 2.5.1 33 --- page 76 --- upperBound (see Clause 21 on Primitive Types)."

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

- `sysml`, when the model is a systems model: `npx skills add ScaleDockHQ/scaledock-skills --skill sysml`
- `bpmn`, when the diagram is a business process: `npx skills add ScaleDockHQ/scaledock-skills --skill bpmn`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [UML 2.5.1](https://www.omg.org/spec/UML/2.5.1/PDF): OMG formal specification, formal/2017-12-05, December 2017, checked 2026-10-06.
