---
name: serverless-workflow
description: >-
  Serverless Workflow: This document proposes the creation of a Domain Specific Language (DSL) for the Open Workflow Specification, designed for building platform agnostic workflows. Covers Serverless Workflow DSL. Use when writing a serverless workflow. Triggers: Serverless Workflow, DSL.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Serverless Workflow

This document proposes the creation of a Domain Specific Language (DSL) for the Open Workflow Specification, designed for building platform agnostic workflows.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when writing a serverless workflow.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Serverless Workflow DSL (default). See `references/versions.md`.
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "The Open Workflow DSL defines several default task types that runtimes **must** implement:"
2. **document.** "To ensure they conform to the DSL, runtimes **should** pass all the feature conformance test scenarios defined in the ctk."
3. **document.** "Runtime **must** implement a mechanism capable of providing the workflow with the data contained within the defined secrets."
4. **document.** "If a workflow attempts to access a secret to which it does not have access rights or which does not exist, runtimes **must** raise an error with type `https://open-workflow-specification.org/spec/1.0.0/errors/authorization` and status `403`."
5. **document.** "#### Scheduling Workflow scheduling in ServerlessWorkflow allows developers to specify when and how their workflows should be executed, ensuring timely response to events and efficient resource utilization."
6. **document.** "###### Distinguishing event-driven scheduling from start `listen` Tasks While both `schedule.on` and a start listener task enable event-driven execution of workflows, they serve distinct purposes and have different implications: - **`schedule.on`**: This property defines when a new workflow instance should be created based on an external event."
7. **document.** "- **Start `listen` task**: A start listener task defines a task that must be undertaken after a new workflow instance has been created."
8. **document.** "While `schedule.on` is concerned with _when_ a new workflow instance should be initiated, a start listener task deals with _what_ should happen once the instance is active."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> `references/versions.md`
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in `references/requirements.md` and implement each one that applies to the role.
   -> `references/requirements.md`
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> `references/versions.md`
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in `references/requirements.md` holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Serverless Workflow DSL](https://raw.githubusercontent.com/serverlessworkflow/specification/main/dsl.md): Specification, Serverless Workflow DSL, fetched 2026-10-06 (Specification, 2026-10-06), checked 2026-10-06.
