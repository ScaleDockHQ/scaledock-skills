# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Serverless Workflow DSL

Source: https://raw.githubusercontent.com/serverlessworkflow/specification/main/dsl.md

This document proposes the creation of a Domain Specific Language (DSL) for the Open Workflow Specification, designed for building platform agnostic workflows.

- **document.** The Open Workflow DSL defines several default [task](dsl-reference.md#tasks) types that runtimes **must** implement:
- **document.** To ensure they conform to the DSL, runtimes **should** pass all the feature conformance test scenarios defined in the [ctk](ctk/README.md).
- **document.** Runtime **must** implement a mechanism capable of providing the workflow with the data contained within the defined secrets.
- **document.** If a workflow attempts to access a secret to which it does not have access rights or which does not exist, runtimes **must** raise an error with type `https://open-workflow-specification.org/spec/1.0.0/errors/authorization` and status `403`.
- **document.** #### Scheduling Workflow scheduling in ServerlessWorkflow allows developers to specify when and how their workflows should be executed, ensuring timely response to events and efficient resource utilization.
- **document.** ###### Distinguishing event-driven scheduling from start `listen` Tasks While both `schedule.on` and a start listener task enable event-driven execution of workflows, they serve distinct purposes and have different implications: - **`schedule.on`**: This property defines when a new workflow instance should be created based on an external event.
- **document.** - **Start `listen` task**: A start listener task defines a task that must be undertaken after a new workflow instance has been created.
- **document.** While `schedule.on` is concerned with _when_ a new workflow instance should be initiated, a start listener task deals with _what_ should happen once the instance is active.
