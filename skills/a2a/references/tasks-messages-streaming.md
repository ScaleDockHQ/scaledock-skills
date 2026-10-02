# Tasks, messages, streaming and push notifications

Field names are the JSON names of the messages in `a2a.proto` v1.0.1.

## Task

`Task`: `id` (required, server-generated), `contextId`, `status` (required `TaskStatus`), `artifacts`, `history` (messages), `metadata`.

`TaskStatus`: `state` (required), `message`, `timestamp` (ISO 8601 UTC).

### Task states

| State                       | Kind (proto comments)                                   |
| --------------------------- | ------------------------------------------------------- |
| `TASK_STATE_SUBMITTED`      | Submitted and acknowledged.                             |
| `TASK_STATE_WORKING`        | Being processed.                                        |
| `TASK_STATE_INPUT_REQUIRED` | Interrupted: the agent needs more input.                |
| `TASK_STATE_AUTH_REQUIRED`  | Interrupted: authentication or authorization is needed. |
| `TASK_STATE_COMPLETED`      | Terminal: finished successfully.                        |
| `TASK_STATE_FAILED`         | Terminal: finished with an error.                       |
| `TASK_STATE_CANCELED`       | Terminal: canceled before completion.                   |
| `TASK_STATE_REJECTED`       | Terminal: the agent decided not to perform the task.    |

`TASK_STATE_UNSPECIFIED` is the proto zero value. Version 1.0 spells "canceled" with one l (v1.0.0 release notes).

Rules:

- Messages sent to a task in a terminal state get `UnsupportedOperationError` (§ 3.1.1).
- `SubscribeToTask` on a terminal task returns `UnsupportedOperationError` (§ 3.1.6).
- `CancelTask` on a task that cannot be canceled returns `TaskNotCancelableError` (§ 3.3.2).

## Message, Part, Artifact

`Message`: `messageId` (required), `contextId`, `taskId`, `role` (required, `ROLE_USER` from client to server or `ROLE_AGENT` from server to client), `parts` (required), `metadata`, `extensions`, `referenceTaskIds`.

`Part` holds exactly one content field plus shared fields:

| Content | Meaning                           |
| ------- | --------------------------------- |
| `text`  | String content.                   |
| `raw`   | File bytes, base64 in JSON.       |
| `url`   | URL pointing to the file content. |
| `data`  | Any JSON value.                   |

Shared: `mediaType`, `filename`, `metadata`.

`Artifact`: `artifactId` (required), `name`, `description`, `parts` (required), `metadata`, `extensions`.

Messages are for communication (task initiation, clarification, status, follow-up input); task outputs should be returned as artifacts (§ 3.7). Messages are not a reliable delivery mechanism for critical information, and clients must not assume every message is persisted in `history` (§ 3.7).

## Multi-turn rules (§ 3.4)

- Task IDs are server-generated; a client-provided `taskId` must reference an existing task, otherwise `TaskNotFoundError`. Clients cannot create tasks with their own IDs (§ 3.4.2).
- An agent may generate a `contextId` and must return it if it does. If it cannot accept a client-provided `contextId` it must reject the request and not substitute a new one (§ 3.4.1).
- If only `taskId` is given, the agent infers `contextId`; a mismatching `contextId` and `taskId` must be rejected (§ 3.4.3).
- To answer `TASK_STATE_INPUT_REQUIRED`, the client sends a new message with the same `taskId` and `contextId` (§ 3.4.3). Related tasks are referenced with `referenceTaskIds` (§ 3.4.3).

## Blocking and non-blocking sends (§ 3.2.2)

- Default (`returnImmediately` false or unset): wait for a terminal or interrupted state, then return the latest task with all artifacts.
- `returnImmediately: true`: return right after creating the task; the client then polls `GetTask`, calls `SubscribeToTask` or relies on push notifications.

## Update delivery (§ 3.5)

Three mechanisms: polling with `GetTask`, streaming (`SendStreamingMessage`, `SubscribeToTask`; requires `capabilities.streaming`), and push notifications (requires `capabilities.pushNotifications`).

### Streaming

- `StreamResponse` holds exactly one of `task`, `message`, `statusUpdate`, `artifactUpdate` (proto).
- Message-only stream: exactly one `Message`, then close. Task stream: the `Task` first, then zero or more `TaskStatusUpdateEvent` or `TaskArtifactUpdateEvent`, closing when the task reaches a terminal state (§ 3.1.2). HTTP+JSON streams close on a terminal or interrupted state and may resend a final `Task` snapshot (§ 11.7).
- `SubscribeToTask` must send the current `Task` as its first event (§ 3.1.6).
- Events must be delivered in generation order. Several streams for one task each receive the same events; closing one does not affect the others (§ 3.5.2).
- `TaskStatusUpdateEvent`: `taskId`, `contextId`, `status`, `metadata`. Version 1.0 removed the `final` field (v1.0.0 release notes); end-of-stream is the stream closing.
- `TaskArtifactUpdateEvent`: `taskId`, `contextId`, `artifact`, `append`, `lastChunk`, `metadata`.

On JSON-RPC and HTTP+JSON, streams are Server-Sent Events:

```text
data: {"task":{"id":"task-1","contextId":"ctx-1","status":{"state":"TASK_STATE_WORKING"}}}

data: {"artifactUpdate":{"taskId":"task-1","contextId":"ctx-1","artifact":{"artifactId":"a-1","parts":[{"text":"Total: 1,250.00 EUR"}]},"lastChunk":true}}

data: {"statusUpdate":{"taskId":"task-1","contextId":"ctx-1","status":{"state":"TASK_STATE_COMPLETED"}}}
```

That example is HTTP+JSON; on JSON-RPC each `data:` line wraps the `StreamResponse` in a JSON-RPC response's `result` (§ 9.4.2).

### Push notifications

- Configure with `CreateTaskPushNotificationConfig` or inline through `configuration.taskPushNotificationConfig` on `SendMessage` (proto `SendMessageConfiguration`).
- `TaskPushNotificationConfig`: `url` (required), `id`, `taskId`, `tenant`, `token`, `authentication` (`AuthenticationInfo`: `scheme` required, `credentials`). Version 1.0 merged `TaskPushNotificationConfig` and `PushNotificationConfig` (v1.0.0 release notes).
- The agent POSTs a `StreamResponse` with `Content-Type: application/a2a+json` and the configured credentials in the `Authorization` header (§ 4.3.3). Webhooks always use plain HTTP and the HTTP binding's JSON, whatever binding the agent uses (§ 3.5.1).
- Agent: at least one delivery attempt per webhook; retries with exponential backoff and a 10 to 30 second timeout are recommended (§ 4.3.3).
- Client: respond 2xx, process idempotently, validate the task ID and the notification source (§ 4.3.3).
- A config persists until the task completes or the config is deleted (§ 3.1.7).

```http
POST /a2a/webhook HTTP/1.1
Host: client.example.com
Authorization: Bearer <configured credentials>
Content-Type: application/a2a+json

{"statusUpdate":{"taskId":"task-1","contextId":"ctx-1","status":{"state":"TASK_STATE_COMPLETED"}}}
```

## In-task authorization (§ 7.6)

When an agent needs a credential or a human approval mid-task, it can hand the request to the client:

1. The agent uses a task, moves it to `TASK_STATE_AUTH_REQUIRED`, and includes a status message explaining what is needed unless that was negotiated out of band or by an extension (§ 7.6.1).
2. Credentials arrive out of band unless an in-band mechanism was negotiated; the agent should keep streams open and may resume without a follow-up message (§ 7.6.1).
3. The client may reply to negotiate or reject, ask another party, or fulfill the request itself. An agent acting as a client may push the request up the chain by moving its own task to `TASK_STATE_AUTH_REQUIRED` (§ 7.6.2).
4. Without an open stream the client should subscribe, register a webhook or poll, so it does not miss the resumption (§ 7.6.2).
5. In-band credentials should be bound to the requesting agent and encrypted for it, because they otherwise travel through every agent in the chain (§ 7.6.3).
