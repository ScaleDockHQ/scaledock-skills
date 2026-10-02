# Operations and protocol bindings

A2A defines abstract operations (§ 3) and maps them to three standard bindings: JSON-RPC (§ 9), gRPC (§ 10) and HTTP+JSON/REST (§ 11). Custom bindings follow § 12.

## Operations

| Operation                       | JSON-RPC method                    | gRPC RPC               | HTTP+JSON endpoint                                      |
| ------------------------------- | ---------------------------------- | ---------------------- | ------------------------------------------------------- |
| Send message                    | `SendMessage`                      | `SendMessage`          | `POST /message:send`                                    |
| Send streaming message          | `SendStreamingMessage`             | `SendStreamingMessage` | `POST /message:stream`                                  |
| Get task                        | `GetTask`                          | `GetTask`              | `GET /tasks/{id}`                                       |
| List tasks                      | `ListTasks`                        | `ListTasks`            | `GET /tasks`                                            |
| Cancel task                     | `CancelTask`                       | `CancelTask`           | `POST /tasks/{id}:cancel`                               |
| Subscribe to task               | `SubscribeToTask`                  | `SubscribeToTask`      | `/tasks/{id}:subscribe` (see note)                      |
| Create push notification config | `CreateTaskPushNotificationConfig` | same                   | `POST /tasks/{id}/pushNotificationConfigs`              |
| Get push notification config    | `GetTaskPushNotificationConfig`    | same                   | `GET /tasks/{id}/pushNotificationConfigs/{configId}`    |
| List push notification configs  | `ListTaskPushNotificationConfigs`  | same                   | `GET /tasks/{id}/pushNotificationConfigs`               |
| Delete push notification config | `DeleteTaskPushNotificationConfig` | same                   | `DELETE /tasks/{id}/pushNotificationConfigs/{configId}` |
| Get extended Agent Card         | `GetExtendedAgentCard`             | `GetExtendedAgentCard` | `GET /extendedAgentCard`                                |

Source: § 5.3. Every REST path also has a `/{tenant}/...` variant in the proto's HTTP annotations.

Note on subscribe: § 5.3 and § 11.3.2 list `POST /tasks/{id}:subscribe`, while the `google.api.http` annotation in `a2a.proto` v1.0.1 declares `get: "/tasks/{id=*}:subscribe"`. Check the SDK you interoperate with, and accept both on a server if you can.

Operation semantics worth enforcing:

- `SendMessage` returns either a `Task` or a direct `Message` and must return immediately with one of them (§ 3.1.1). By default it blocks until a terminal or interrupted state; `configuration.returnImmediately: true` returns right after the task is created (§ 3.2.2).
- `ListTasks` returns only tasks visible to the caller, uses cursor pagination (`pageToken`, `nextPageToken`), sorts by last update descending, always includes `nextPageToken` (empty string on the last page), and omits `artifacts` unless `includeArtifacts` is true (§ 3.1.4).
- `historyLength`: unset means the server default, `0` means no history, a positive number caps the recent messages returned (§ 3.2.4).
- `CancelTask` and `DeleteTaskPushNotificationConfig` are idempotent (§ 3.3.1, § 3.1.10). `SendMessage` may use `messageId` to detect duplicates (§ 3.3.1).

## Service parameters and versioning

Standard service parameters (§ 3.2.6):

| Name             | Meaning                                                 |
| ---------------- | ------------------------------------------------------- |
| `A2A-Version`    | Protocol version the client uses, `Major.Minor`.        |
| `A2A-Extensions` | Comma-separated extension URIs the client wants to use. |

- HTTP-based bindings send them as HTTP headers; gRPC sends them as metadata (§ 9.2, § 10.2, § 11.2).
- Clients must send `A2A-Version` on each request (except 0.3 clients) and may send it as a query parameter instead of a header (§ 3.6.1).
- Servers process the request with the semantics of the requested version, treat an empty value as `0.3`, and return `VersionNotSupportedError` otherwise (§ 3.6.2).
- SDKs must help clients negotiate transport and version; clients that need newer features should not fall back silently (§ 3.6.3).

## JSON-RPC binding (§ 9)

- JSON-RPC 2.0 over HTTP(S), `Content-Type: application/json`, PascalCase method names, streaming over Server-Sent Events (`text/event-stream`) (§ 9.1).
- Streaming responses are SSE `data:` lines, each a JSON-RPC response whose `result` is a `StreamResponse` (§ 9.4.2).
- Errors use the JSON-RPC error object; `error.data` is an array of objects with a `@type` key in ProtoJSON `Any` form (§ 9.5).

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "SendMessage",
  "params": {
    "message": {
      "messageId": "9b1c3f0e-5a7d-4c1e-8f2a-1d2e3f4a5b6c",
      "role": "ROLE_USER",
      "parts": [{ "text": "Summarise invoice INV-1042" }]
    }
  }
}
```

## gRPC binding (§ 10)

- gRPC over HTTP/2 with TLS, Protocol Buffers 3, implementing the `A2AService` service from `a2a.proto` (§ 10.1).
- The proto package is `lf.a2a.v1` (a2a.proto v1.0.1; v1.0.0 added the LF prefix per the release notes).

## HTTP+JSON binding (§ 11)

- `application/a2a+json` should be used for requests and responses (§ 11.1; v1.0.1 changed the preference to this media type).
- Request and response bodies are JSON equivalents of the proto messages (§ 11.4). GET and DELETE carry parameters in the path or as camelCase query parameters (§ 11.5).
- Streaming is SSE where each `data:` line is a `StreamResponse` (§ 11.7).
- Errors use the `google.rpc.Status` JSON form, and A2A errors must include a `google.rpc.ErrorInfo` detail with `reason` set to the error name in UPPER_SNAKE_CASE without the `Error` suffix and `domain` set to `a2a-protocol.org` (§ 11.6).

```http
POST /message:send HTTP/1.1
Host: agent.example.com
Content-Type: application/a2a+json
A2A-Version: 1.0
Authorization: Bearer <token>

{
  "message": {
    "messageId": "9b1c3f0e-5a7d-4c1e-8f2a-1d2e3f4a5b6c",
    "role": "ROLE_USER",
    "parts": [{ "text": "Summarise invoice INV-1042" }]
  },
  "configuration": { "acceptedOutputModes": ["application/json"] }
}
```

```http
HTTP/1.1 404 Not Found
Content-Type: application/a2a+json

{
  "error": {
    "code": 404,
    "status": "NOT_FOUND",
    "message": "The specified task ID does not exist or is not accessible",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "TASK_NOT_FOUND",
        "domain": "a2a-protocol.org"
      }
    ]
  }
}
```

A framework-neutral client call:

```ts
async function sendMessage(baseUrl: string, token: string, text: string) {
  const response = await fetch(`${baseUrl}/message:send`, {
    method: "POST",
    headers: {
      "content-type": "application/a2a+json",
      "a2a-version": "1.0",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: {
        messageId: crypto.randomUUID(),
        role: "ROLE_USER",
        parts: [{ text }],
      },
    }),
  });
  if (!response.ok)
    throw new Error(`A2A error ${response.status}: ${await response.text()}`);
  return (await response.json()) as { task?: unknown; message?: unknown };
}
```

## Error codes (§ 5.4)

| A2A error                             | JSON-RPC | gRPC                  | HTTP |
| ------------------------------------- | -------- | --------------------- | ---- |
| `TaskNotFoundError`                   | -32001   | `NOT_FOUND`           | 404  |
| `TaskNotCancelableError`              | -32002   | `FAILED_PRECONDITION` | 400  |
| `PushNotificationNotSupportedError`   | -32003   | `FAILED_PRECONDITION` | 400  |
| `UnsupportedOperationError`           | -32004   | `FAILED_PRECONDITION` | 400  |
| `ContentTypeNotSupportedError`        | -32005   | `INVALID_ARGUMENT`    | 400  |
| `InvalidAgentResponseError`           | -32006   | `INTERNAL`            | 500  |
| `ExtendedAgentCardNotConfiguredError` | -32007   | `FAILED_PRECONDITION` | 400  |
| `ExtensionSupportRequiredError`       | -32008   | `FAILED_PRECONDITION` | 400  |
| `VersionNotSupportedError`            | -32009   | `FAILED_PRECONDITION` | 400  |

General categories (§ 3.3.2): authentication errors (HTTP 401, gRPC `UNAUTHENTICATED`) should say which scheme is required; authorization errors (403, `PERMISSION_DENIED`) should say which permission or scope is missing without leaking resources; validation errors (400, `INVALID_ARGUMENT`, JSON-RPC -32602); not found should not distinguish "does not exist" from "not authorized". Every error carries a code, a message and optional details with `@type` keys.

## Custom bindings (§ 12)

A custom binding must implement every core operation, keep the data model and semantics, define its data type mappings, how service parameters travel, an error mapping for every A2A error, its streaming mechanism (or document that it has none), and how credentials and challenges travel. It is declared in `supportedInterfaces` with a URI as `protocolBinding` (§ 12.1 to § 12.7, § 5.8).
