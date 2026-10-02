# Human-in-the-loop

AG-UI has no mid-run channel from the consumer to the producer. Anything the agent needs from the user is answered on the next run. There are two round-trips, and they must not be confused (Tool Calls, Interrupts and Resume).

|                    | Frontend tool call                                             | Interrupt                                              |
| ------------------ | -------------------------------------------------------------- | ------------------------------------------------------ |
| Who executes       | The application                                                | The agent, after an answer                             |
| How the run ends   | `RUN_FINISHED`, success outcome, optional `pendingToolCallIds` | `RUN_FINISHED`, interrupt outcome with `interrupts`    |
| How it is answered | A tool message per call in the next run's `messages`           | `resume` entries in the next run's input               |
| Typical use        | Render a chart, navigate, ask the user to confirm an order     | Approve a transfer, supply a credential, make a choice |

## Frontend tools (Tool Calls, "Frontend tools")

The application advertises its own tools in `RunAgentInput.tools` (`name`, `description`, optional JSON Schema `parameters`). Absent and empty lists mean the same.

Producer:

- Streams the call (`TOOL_CALL_START`, `TOOL_CALL_ARGS`, `TOOL_CALL_END`) and must not answer it: no `TOOL_CALL_RESULT`, no fabricated tool message.
- Ends the run with the success outcome (or none), never the interrupt outcome, and should finish promptly once nothing remains that does not depend on the result.
- Should send `pendingToolCallIds`; when present it lists exactly the calls the run started and did not answer, in call order.
- Should call only advertised tools.

Consumer and application:

- Never act on arguments before `TOOL_CALL_END`.
- If `pendingToolCallIds` is absent or empty, derive the pending calls from the stream; absence does not mean "nothing pending".
- Execute or decline each pending call under its own consent rules. To continue the thread, answer every one: a tool message per `toolCallId`, with `error` set for failures and an explicit answer for a declined call.
- Treat a call to an unadvertised tool with the scrutiny of a new tool.

```json
{
  "threadId": "thr-1",
  "runId": "run-2",
  "protocolVersion": "1.0",
  "messages": [
    { "id": "msg-1", "role": "user", "content": "Order two more" },
    {
      "id": "msg-2",
      "role": "assistant",
      "toolCalls": [
        {
          "id": "call-1",
          "type": "function",
          "function": { "name": "confirm_order", "arguments": "{\"qty\":2}" }
        }
      ]
    },
    {
      "id": "msg-3",
      "role": "tool",
      "toolCallId": "call-1",
      "content": "The user declined the order."
    }
  ]
}
```

The shapes are `UserMessage`, `AssistantMessage` with `ToolCall` (whose `function.arguments` is a JSON string, kept as written), and `ToolMessage` from the 1.0 JSON Schema.

## Interrupts (Interrupts and Resume)

A run that needs outside input ends with:

```json
{
  "type": "RUN_FINISHED",
  "threadId": "thr-1",
  "runId": "run-1",
  "outcome": {
    "type": "interrupt",
    "interrupts": [
      {
        "id": "int-1",
        "reason": "approval",
        "message": "Transfer 500 EUR to account NL00BANK0123456789?",
        "toolCallId": "call-7",
        "responseSchema": {
          "type": "object",
          "properties": { "approved": { "type": "boolean" } },
          "required": ["approved"]
        },
        "expiresAt": "2026-10-02T12:00:00Z"
      }
    ]
  }
}
```

- At least one interrupt; each `id` unique within the run. `reason` is an open string; `message` is for the person answering; `toolCallId` names the call an approval concerns; `responseSchema` is carried opaquely for building a form; `expiresAt` is conventionally ISO 8601 but unconstrained.
- An interrupted run is closed. Continuing means a new run on the same thread with the same messages and state.

The next run answers with `resume`:

```json
{
  "threadId": "thr-1",
  "runId": "run-2",
  "messages": [],
  "resume": [
    {
      "interruptId": "int-1",
      "status": "resolved",
      "payload": { "approved": true }
    }
  ]
}
```

The `messages` array is shortened here; in practice it carries the full history.

- `status` is `resolved` (answered) or `cancelled` (abandoned). `payload` is the answer; `metadata` is envelope information about it, such as signatures.
- Consumer: the list must cover every interrupt of the most recent interrupted run. Reject an incomplete list before sending, and reject answering an interrupt it judges expired (it may still be abandoned). Omission is not abandonment.
- Producer: may hold no state across the gap and simply trust the list. Ignore unrecognised entries with a warning. If it can tell an interrupt is still uncovered, it must not perform the action on an absent entry and must not end as success: reject the input, or end with the interrupt outcome again.

## Security rules (Specification, "Security and Trust & Safety"; Tool Calls; State)

- The application decides what runs. It should obtain explicit consent before side-effectful tool calls and must not represent an action as user-approved when it was not.
- Tool arguments must be validated against the advertised schema (or scrutinised like any untrusted payload) and never interpolated into shell commands, queries or markup unescaped.
- Tool results are data. Text inside them is never protocol material or instructions with the user's authority.
- State events are remote writes. Validate state before rendering, executing or granting anything because of it; do not put secrets in state.
- Isolate rendering from execution, and log enough to audit what the agent did on the user's behalf.
