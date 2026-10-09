# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## DSL (dsl.md)

Source: https://raw.githubusercontent.com/serverlessworkflow/specification/9b5b1da29e9d4fff2358580241e11aab22704a16/dsl.md

- **Priority of Constituencies.** If a trade-off needs to be made, always put author's needs above all.
- **Secret.** Runtime **must** implement a mechanism capable of providing the workflow with the data contained within the defined secrets.
- **Secret.** If a workflow attempts to access a secret to which it does not have access rights or which does not exist, runtimes **must** raise an error with type `https://serverlessworkflow.io/spec/1.0.0/errors/authorization` and status `403`.
- **Distinguishing event-driven scheduling from start `listen` Tasks.** A start listener task defines a task that must be undertaken after a new workflow instance has been created.
- **Task Flow.** A workflow begins with the first task defined.
- **Task Flow.** Flow directives may only redirect to tasks declared within their own scope. In other words, they cannot target tasks at a different depth.
- **Data Flow.** Before the workflow starts, the input data provided to the workflow can be validated against the `input.schema` property to ensure it conforms to the expected structure.
- **Runtime Expressions.** In `strict` mode, all expressions must be properly identified with `${}` syntax.
- **Runtime Expressions.** All runtimes **must** support the default runtime expression language, which is [`jq`](https://jqlang.github.io/jq/).
- **Runtime Expressions.** When the evaluation of an expression fails, runtimes **must** raise an error with type `https://serverlessworkflow.io/spec/1.0.0/errors/expression` and status `400`.
- **Errors.** Errors in Serverless Workflow are described using the [Problem Details RFC](https://datatracker.ietf.org/doc/html/rfc7807).
- **Timeouts.** A timeout error **must** have its `type` set to `https://serverlessworkflow.io/spec/1.0.0/errors/timeout` and **should** have its `status` set to `408`.
- **Default Catalog.** Runtimes may optionally define a **"default" catalog**, which can be used implicitly by any and all workflows, unlike other catalogs which must be explicitly defined at the top level.
- **Interoperability, Supported Protocols.** Runtimes **must** raise an error with type `https://serverlessworkflow.io/spec/1.0.0/errors/communication` if and when a problem occurs during a call.
- **Events.** Events in Serverless Workflow adhere to the [Cloud Events specification](https://cloudevents.io/), ensuring interoperability and compatibility with event-driven systems.

## DSL reference (dsl-reference.md)

Source: https://raw.githubusercontent.com/serverlessworkflow/specification/9b5b1da29e9d4fff2358580241e11aab22704a16/dsl-reference.md

- **Task, Call, MCP Call.** Before making any MCP requests, runtimes **must** first send an `initialize` call to establish the connection.
- **Input.** When set, runtimes must validate raw input data against the defined schema before applying transformations, unless defined otherwise.
- **Output.** When set, runtimes must validate output data against the defined schema after applying transformations, unless defined otherwise.
