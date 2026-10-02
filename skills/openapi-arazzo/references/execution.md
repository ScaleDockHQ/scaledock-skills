# Executing workflows

Read this when building or reviewing a tool that runs Arazzo workflows, or when designing success and failure paths. Section numbers are from Arazzo 1.1.0.

## Order

1. Resolve every source description and parse each document completely before resolving references (§ 5.5). Endpoint URLs come from the OpenAPI or AsyncAPI servers, not from the Arazzo document (§ 5.7).
2. Run a workflow only after the workflows in its `dependsOn` have completed (§ 5.8.4.1).
3. Run steps in array order, adjusted so that every `dependsOn` and every `$steps.<id>.outputs` reference is satisfied first (§ 5.8.5.2.4). `dependsOn` does not trigger the referenced step; it only waits for it (§ 5.8.5.1).
4. In a workflow with no `dependsOn`, report a reference to a later step's outputs as an error (SHOULD, § 5.8.5.2.5).

## After each step

1. Evaluate every `successCriteria` entry; all must pass (§ 5.8.5.1, § 5.8.11.4.6). A criterion that cannot be evaluated fails (§ 5.8.11.4.5). A step without `successCriteria` has no assertions to check; add them wherever more than one outcome is possible.
2. On success, run the first `onSuccess` action whose `criteria` all pass; without one, continue with the next step (§ 5.8.5.1, § 5.8.7.1).
3. On failure, run the first `onFailure` action whose `criteria` pass; without one, end the workflow and return (§ 5.8.5.1).
4. A `timeout` that expires fails the step, and therefore the workflow unless `onFailure` handles it (§ 5.8.5.1).

Step-level actions override workflow-level `successActions` and `failureActions` of the same kind but cannot remove them (§ 5.8.4.1, § 5.8.5.1).

## Action types

| Type    | Effect                                                                                                                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `end`   | The workflow ends, and control returns to the caller with the applicable outputs (§ 5.8.7, § 5.8.8).                                                                                                    |
| `goto`  | One-way transfer to a `stepId` in the same workflow or to a `workflowId` (§ 5.8.7, § 5.8.8).                                                                                                            |
| `retry` | Re-run the current step after `retryAfter` seconds, up to `retryLimit` times (default one retry). With `stepId` or `workflowId`, that target runs first and control returns before the retry (§ 5.8.8). |

- An HTTP `Retry-After` header from the operation SHOULD override `retryAfter` (§ 5.8.8.1).
- `retryLimit` MUST be exhausted before later failure actions run (§ 5.8.8.1).
- Parameters on an action that targets a `workflowId` are that workflow's inputs and have no `in` (§ 5.8.7.1, § 5.8.8.1).

```yaml
onFailure:
  - name: refreshAndRetry
    type: retry
    workflowId: refreshToken
    retryLimit: 1
    criteria:
      - condition: $statusCode == 401
  - name: backOff
    type: retry
    retryAfter: 2
    retryLimit: 3
    criteria:
      - condition: $statusCode == 503
  - name: giveUp
    type: end
```

## Security (§ 6)

- Arazzo enforces no security mechanism. Use TLS for sensitive workflows.
- JSON and YAML security considerations (RFC 8259, YAML 1.2) apply to the documents.
- Arazzo Descriptions are often written by untrusted third parties, and running one can perform safe and unsafe operations on arbitrary network resources. The consumer must make sure the operations are not harmful.

What that means for an executor:

- Show the operator which hosts and operations a workflow will call, from the resolved source descriptions, before running it.
- Restrict execution to approved source descriptions and servers.
- Keep credentials out of the description; supply them as workflow inputs at run time, and do not log them in outputs.
- Cap retries and total run time even when the description sets no limit.
