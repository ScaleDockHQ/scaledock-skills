# Arazzo objects

Read this when writing or reviewing an Arazzo Description. Section numbers are from Arazzo 1.1.0. Every object below MAY carry `x-` extensions except the Reusable Object.

## Arazzo Specification Object (§ 5.8.1)

| Field                | Rule                                                                              |
| -------------------- | --------------------------------------------------------------------------------- |
| `arazzo`             | REQUIRED. The Arazzo version; tooling MUST interpret the description by it.       |
| `$self`              | URI reference for this description and its base URI; MUST NOT contain a fragment. |
| `info`               | REQUIRED. Info Object.                                                            |
| `sourceDescriptions` | REQUIRED. At least one Source Description Object.                                 |
| `workflows`          | REQUIRED. At least one Workflow Object.                                           |
| `components`         | Components Object.                                                                |

Documents MUST be parsed completely before references are resolved (§ 5.5, § 5.5.1). References to an Arazzo document that has `$self` MUST use that URI (§ 5.5.2). Fragments in JSON or YAML documents are JSON Pointers (§ 5.6.2).

## Info Object (§ 5.8.2)

`title` (REQUIRED), `summary`, `description` (CommonMark), `version` (REQUIRED, the document's version, distinct from the Arazzo version).

## Source Description Object (§ 5.8.3)

| Field  | Rule                                                                      |
| ------ | ------------------------------------------------------------------------- |
| `name` | REQUIRED. Unique; SHOULD match `[A-Za-z0-9_\-]+`.                         |
| `url`  | REQUIRED. URL of the source description; relative references are allowed. |
| `type` | `openapi`, `asyncapi` or `arazzo`.                                        |

## Workflow Object (§ 5.8.4)

| Field                              | Rule                                                                                                                       |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `workflowId`                       | REQUIRED. Unique among all workflows, case-sensitive, SHOULD match `[A-Za-z0-9_\-]+`.                                      |
| `summary`, `description`           | Purpose; `description` allows CommonMark.                                                                                  |
| `inputs`                           | JSON Schema 2020-12 for the workflow's inputs.                                                                             |
| `dependsOn`                        | Workflows that MUST complete first: local `workflowId`s, or `$sourceDescriptions.<name>.<workflowId>` for other documents. |
| `steps`                            | REQUIRED. Ordered Step Objects.                                                                                            |
| `successActions`, `failureActions` | Defaults for every step; steps can override but not remove them. No duplicates.                                            |
| `outputs`                          | Map of name to runtime expression or Selector Object; keys match `^[a-zA-Z0-9\.\-_]+$`.                                    |
| `parameters`                       | Defaults for every step; steps can override but not remove them. No duplicates.                                            |

## Step Object (§ 5.8.5)

| Field             | Rule                                                                                                                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stepId`          | REQUIRED. Unique within the workflow, case-sensitive, SHOULD match `[A-Za-z0-9_\-]+`.                                                                                                     |
| `operationId`     | An operation in a source description. With several non-`arazzo` sources, MUST be `$sourceDescriptions.<name>.<operationId>`.                                                              |
| `operationPath`   | `{$sourceDescriptions.<name>.url}#<JSON Pointer>` to an operation.                                                                                                                        |
| `channelPath`     | The same form, pointing to an AsyncAPI channel.                                                                                                                                           |
| `workflowId`      | A workflow to run; `$sourceDescriptions.<name>.<workflowId>` when it lives in an `arazzo` source.                                                                                         |
| `parameters`      | Parameter Objects or Reusable Objects; override but cannot remove workflow parameters.                                                                                                    |
| `requestBody`     | Request Body Object; avoid with GET, HEAD and DELETE.                                                                                                                                     |
| `successCriteria` | Criterion Objects; all MUST pass; at least one if present.                                                                                                                                |
| `onSuccess`       | Success actions; default is the next step.                                                                                                                                                |
| `onFailure`       | Failure actions; default is to break and return.                                                                                                                                          |
| `outputs`         | Map of name to runtime expression or Selector Object.                                                                                                                                     |
| `timeout`         | Milliseconds before the step is aborted and fails.                                                                                                                                        |
| `correlationId`   | AsyncAPI receive steps only; must match the AsyncAPI correlation ID.                                                                                                                      |
| `action`          | AsyncAPI steps only: `send` or `receive`.                                                                                                                                                 |
| `dependsOn`       | Steps that MUST complete first: a local `stepId`, `$workflows.<workflowId>.steps.<stepId>`, or `$sourceDescriptions.<name>.<workflowId>.steps.<stepId>`. It does not trigger those steps. |

`operationId`, `operationPath`, `channelPath` and `workflowId` are mutually exclusive. Prefer `operationId` when the operation has one.

## Parameter Object (§ 5.8.6)

| Field   | Rule                                                                                                                                                                    |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`  | REQUIRED, case-sensitive.                                                                                                                                               |
| `in`    | `path`, `query`, `querystring`, `header` or `cookie`. MUST be set for operation steps; omitted for workflow steps and actions, where parameters map to workflow inputs. |
| `value` | REQUIRED. A constant, a runtime expression, or a Selector Object; strings can embed `{expression}`.                                                                     |

A parameter is unique by `name` plus `in`. For `querystring`, the value MUST resolve to the whole query string in the media type of the operation parameter's `content`, and it cannot coexist with `query` parameters in the same operation (§ 5.8.6).

## Success Action Object (§ 5.8.7)

| Field                   | Rule                                                                              |
| ----------------------- | --------------------------------------------------------------------------------- |
| `name`                  | REQUIRED, case-sensitive.                                                         |
| `type`                  | REQUIRED. `end` (return to the caller with outputs) or `goto` (one-way transfer). |
| `workflowId` / `stepId` | `goto` target; mutually exclusive. `stepId` MUST be in the current workflow.      |
| `parameters`            | Inputs for a `workflowId` target; `in` MUST NOT be used.                          |
| `criteria`              | All MUST pass for the action to run.                                              |

## Failure Action Object (§ 5.8.8)

| Field                   | Rule                                                                                               |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| `name`                  | REQUIRED, case-sensitive.                                                                          |
| `type`                  | REQUIRED. `end`, `retry` or `goto`.                                                                |
| `workflowId` / `stepId` | Target for `goto`, or for `retry` the step or workflow to run before retrying; mutually exclusive. |
| `parameters`            | Inputs for a `workflowId` target; `in` MUST NOT be used.                                           |
| `retryAfter`            | Seconds before retrying (non-negative); an HTTP `Retry-After` header SHOULD override it.           |
| `retryLimit`            | Retries allowed (non-negative); default one. MUST be exhausted before later failure actions run.   |
| `criteria`              | Assertions deciding whether the action runs.                                                       |

## Components Object (§ 5.8.9)

`inputs` (JSON Schemas), `parameters`, `successActions`, `failureActions`. Keys MUST match `^[a-zA-Z0-9\.\-_]+$`. Components have no effect until referenced, and they are scoped to the document that defines them.

## Reusable Object (§ 5.8.10)

| Field       | Rule                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| `reference` | REQUIRED. A runtime expression such as `$components.parameters.page` or `$components.failureActions.refreshToken`. |
| `value`     | Overrides the value of a referenced parameter.                                                                     |

Workflow `inputs` reference `components.inputs` with JSON Schema `$ref`, not with a Reusable Object (§ 5.8.10). The Reusable Object cannot be extended; extra properties MUST be ignored.

## Extensions and media types

- Extension names start with `x-`; `x-oai-`, `x-oas-` and `x-arazzo` are reserved for the OAI (§ 5.10).
- Media types: `application/vnd.oai.workflows`, with `+json` and `+yaml` variants, and an optional `version` parameter (§ 7).
