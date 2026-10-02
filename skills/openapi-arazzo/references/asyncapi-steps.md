# AsyncAPI steps

Read this when a workflow sends or receives messages described in an AsyncAPI document. Arazzo 1.1.0 added AsyncAPI v3 support (1.1.0 release notes). Section numbers are from Arazzo 1.1.0.

## Declaring the source

```yaml
sourceDescriptions:
  - name: orders
    url: ./asyncapi.yaml
    type: asyncapi
```

## Step fields for AsyncAPI (§ 5.8.5.1)

| Field                 | Rule                                                                                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `operationId`         | An AsyncAPI operation id; `$sourceDescriptions.<name>.<operationId>` when there are several non-`arazzo` sources.                              |
| `channelPath`         | Alternative to `operationId`: `{$sourceDescriptions.<name>.url}#<JSON Pointer>` to a channel. Prefer `operationId` when the operation has one. |
| `action`              | `send` or `receive`. Only for AsyncAPI steps.                                                                                                  |
| `correlationId`       | Only for `receive` steps. Must be in sync with the correlation ID in the AsyncAPI document.                                                    |
| `timeout`             | Milliseconds to wait before the step fails.                                                                                                    |
| `dependsOn`           | Steps that must complete first; the join point for asynchronous work.                                                                          |
| `requestBody.payload` | The message payload for `send`.                                                                                                                |
| `parameters`          | For example message headers, with `in: header`.                                                                                                |

Read message content in criteria and outputs with `$message.header.<name>` and `$message.payload#/<pointer>` (§ 5.9).

## When a step is done (§ 5.8.5.3)

- **Send:** the step completes as soon as the message is sent. Arazzo does not model broker acknowledgement or delivery confirmation.
- **Receive:** the step completes when a matching message arrives.
  - With `correlationId`, only messages with that correlation identifier count.
  - Without a matching message before `timeout`, the step fails and its `onFailure` actions run.
  - Authors SHOULD define `successCriteria` on receive steps that test the message, because a channel can carry several message types and a payload can report failure.
  - `successCriteria` MAY be omitted only when the channel has a single message type that unambiguously means success and the payload has no error fields. Then any matching message within the timeout is success.

## Ordering asynchronous work (§ 5.8.5.2)

- `dependsOn` exists mainly to coordinate asynchronous steps. For purely synchronous workflows, order the `steps` array instead (RECOMMENDED, § 5.8.5.2.1).
- A step that needs the result of in-flight asynchronous work SHOULD declare `dependsOn` on the receiving step, even without an output reference (§ 5.8.5.2.2, § 5.8.5.2.3).
- Tools MUST honor `dependsOn` and treat output references as implicit dependencies (§ 5.8.5.2.4).

## Example

```yaml
steps:
  - stepId: placeOrder
    operationId: $sourceDescriptions.orders.placeOrder
    action: send
    parameters:
      - name: requestId
        in: header
        value: $inputs.correlationId
    requestBody:
      payload:
        productId: $inputs.productId
        quantity: $inputs.quantity
  - stepId: confirmOrder
    operationId: $sourceDescriptions.orders.confirmOrder
    action: receive
    correlationId: $inputs.correlationId
    dependsOn:
      - placeOrder
    timeout: 6000
    successCriteria:
      - condition: $message.payload.status == 'confirmed'
    outputs:
      orderId: $message.payload#/orderId
```

The `confirmOrder` step waits up to six seconds for a message with the same correlation identifier, and succeeds only if its payload has `status` set to `confirmed`.
