---
name: bpmn
description: >-
  BPMN: Business Process Model and Notation version 2.0.2. Covers BPMN 2.0.2. Use when drawing or exchanging a business process model. Triggers: BPMN, BPMN 2.0.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# BPMN

Business Process Model and Notation (BPMN) Version 2.0.2, OMG document formal/2013-12-09, December 2013. The title page says version 2.0.2 contains a minor change to Clause 15.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text when drawing or exchanging a BPMN process model.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: a process modeller or a tool vendor claiming conformance.
- Target version: BPMN 2.0.2 (current) — default. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **2.0.** "The implementation claiming conformance to the Process Modeling Conformance type SHALL comply with all of the requirements set forth in sub clause 2.1."
2. **2.2.3.** " The line style of a graphical element MAY be changed, but that change SHALL NOT conflict with any other line style REQUIRED by this International Standard."
3. **2.2.6.** "If a graphical representation is used, it SHALL NOT conflict with the specified graphical representation of any other BPMN element."

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

- `dmn`, when a process calls a decision: `npx skills add ScaleDockHQ/scaledock-skills --skill dmn`
- `uml`, when the same model also uses activity notation: `npx skills add ScaleDockHQ/scaledock-skills --skill uml`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [BPMN 2.0.2](https://www.omg.org/spec/BPMN/2.0.2/PDF): OMG formal specification, formal/2013-12-09, December 2013, checked 2026-10-06.
