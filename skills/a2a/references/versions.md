# Versions and upgrades

Read this when choosing a target version, reading an Agent Card or client written for 0.3 or 0.2, upgrading, or deciding whether to use anything from the 1.1 development branch. Sources: the A2A 1.0 specification and `a2a.proto` at v1.0.1, the v1.0.0 and v0.3.0 release notes, the repository changelog, the "What's New in A2A Protocol v1.0" page, the 0.3.0 and 0.2.6 specification pages, and the `dev-1.1` branch, listed in [Sources](../SKILL.md#sources). § numbers refer to the specification of the line named; the 1.1 entries cite the `dev-1.1` text.

## Version lines

| Id            | Line    | Status  | Revision                                                       | Posture | Summary                                                                                                    |
| ------------- | ------- | ------- | -------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `1.1-preview` | A2A 1.1 | preview | `dev-1.1` branch, commit db39eb5 (2026-09-22)                  | track   | Task `generation`, the task `timeline`, long-polling and optimistic concurrency; deprecates `history`.     |
| `1.0`         | A2A 1.0 | current | specification release v1.0.1 (2026-05-28); 1.0.0 on 2026-03-12 |         | The default target: proto-normative data model, three bindings, `ListTasks`, `A2A-Version`, multi-tenancy. |
| `0.3`         | A2A 0.3 | legacy  | v0.3.0 (2025-07-30)                                            |         | `agent-card.json`, signed cards, mTLS, the extended card method. Superseded by 1.0.                        |
| `0.2`         | A2A 0.2 | legacy  | v0.2.0 to v0.2.6 (v0.2.6 on 2025-07-17)                        |         | JSON-RPC with gRPC and REST definitions, extensions, `agent.json`. Superseded by 0.3.                      |

Statuses: **current** is the default target; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. Versions are `Major.Minor` on the wire; patch releases such as 1.0.1 do not change the protocol version a client declares (§ 3.6).

## Which version to use

- Default to 1.0: declare `protocolVersion: "1.0"` on each `supportedInterfaces` entry and send `A2A-Version: 1.0` (§ 3.6, § 8.3.1).
- To keep serving 0.3 clients during a migration, expose a second interface with `protocolVersion` 0.3 rather than mixing shapes on one interface; each `AgentInterface` names its own version (v1.0.0 release notes, #1401). A 1.0 server treats a request without `A2A-Version` as 0.3 (§ 3.6.2).
- Treat 0.3 and 0.2 Agent Cards, clients and servers as input to an upgrade.
- Emit nothing from 1.1: its posture is track.

## What changed

### A2A 1.1 (preview)

From the `dev-1.1` diff against `main`:

- `Task.generation`: a counter that starts at 1 and the server increments by exactly 1 on every state-changing mutation, carried on `TaskStatusUpdateEvent` and `TaskArtifactUpdateEvent` so clients can detect missed events (§ 3.2.7). A client that sees `generation = 0` concludes the server does not implement it.
- Long-polling: `GetTaskRequest.currentGeneration` holds the request until the generation advances (§ 3.2.7).
- Optimistic concurrency: `SendMessageConfiguration.ifGenerationMatch`, rejected with the new `TaskGenerationMismatchError` (JSON-RPC `-32010`, gRPC `ABORTED`, HTTP `409 Conflict`) (§ 3.2.2, § 3.3.2, § 5.4).
- The task `timeline` of `TimelineEntry` items (a client `Message` or an agent `TaskStatus`, ordered by `generation`), with `timelineLength`, and `startGeneration` and `endGeneration` on artifacts (§ 3.2.8, § 4.1.8). Clients must skip unknown entry kinds.
- `history` and `historyLength` are deprecated "as of version 1.1" and removed in 2.0; servers keep populating `history` throughout 1.x (§ 3.2.4).

### A2A 1.0

From the v1.0.0 release notes and the "What's New in A2A Protocol v1.0" page, with the 1.0 section that now defines each:

- `a2a.proto` is the single normative definition (§ 1.4), in package `lf.a2a.v1`. The specification separates the abstract operations (§ 3) from the JSON-RPC, gRPC and HTTP+JSON bindings (§ 9 to § 11).
- Operations are renamed to PascalCase: `message/send` to `SendMessage`, `message/stream` to `SendStreamingMessage`, `tasks/get` to `GetTask`, `tasks/cancel` to `CancelTask`, `tasks/resubscribe` to `SubscribeToTask`, `agent/getAuthenticatedExtendedCard` to `GetExtendedAgentCard`, and `tasks/pushNotificationConfig/set`, `get`, `list` and `delete` to `CreateTaskPushNotificationConfig`, `GetTaskPushNotificationConfig`, `ListTaskPushNotificationConfigs` and `DeleteTaskPushNotificationConfig` (§ 3.1, § 9).
- New `ListTasks` with filtering and cursor pagination (§ 3.1.4).
- Agent Card: `url`, `preferredTransport` and `additionalInterfaces` become `supportedInterfaces[]`, each with `url`, `protocolBinding` and `protocolVersion`, and the card-level `protocolVersion` is gone (§ 8.3.1). `supportsAuthenticatedExtendedCard` becomes `capabilities.extendedAgentCard`. Card signatures canonicalize with RFC 8785 (§ 8.4).
- Enums use ProtoJSON names: `TASK_STATE_COMPLETED`, `ROLE_USER` and so on, and "canceled" has one l (§ 5.5).
- `Part` is one message holding one of `text`, `raw`, `url` or `data`, with shared `mediaType`, `filename` and `metadata`; the `kind` discriminator, the separate text, file and data parts, the nested `file` object and `mimeType` are gone ([`tasks-messages-streaming.md`](tasks-messages-streaming.md)).
- Stream events lose `kind` and are told apart by member name (`statusUpdate`, `artifactUpdate`); `TaskStatusUpdateEvent.final` is removed, and the stream closing marks the end (§ 3.1.2).
- Errors carry a `google.rpc.ErrorInfo` with `domain: "a2a-protocol.org"`; HTTP+JSON uses the `google.rpc.Status` JSON form instead of RFC 9457 problem details (§ 9.5, § 11.6).
- HTTP+JSON paths drop the `/v1` prefix (for example `POST /message:send`), and requests use simple IDs with separate parent and resource fields (§ 11.3).
- `tenant` on every request and on `AgentInterface` (§ 8.3.2).
- `A2A-Version` on every request, with `VersionNotSupportedError` (§ 3.6).
- OAuth flows: `implicit` and `password` removed, `deviceCode` added, `pkceRequired` on `authorizationCode` (§ 4.5.7).
- `TaskPushNotificationConfig` and `PushNotificationConfig` merged; push payloads are `StreamResponse` objects (§ 4.3.3).
- v1.0.1 prefers `application/a2a+json` on the HTTP binding (§ 11.1; v1.0.1 changelog).

### A2A 0.3

From the v0.3.0 release notes, with the 0.3 specification section:

- The well-known Agent Card location changes from `agent.json` to `agent-card.json` (0.3 § 5.3).
- `MutualTLSSecurityScheme`, an OAuth 2.0 metadata URL, and per-skill `security` (0.3 § 5.5.3, § 5.5.4).
- `signatures` on the Agent Card (0.3 § 5.5.6).
- The `agent/getAuthenticatedExtendedCard` method for the extended card (0.3 § 7.10).

### A2A 0.2

From the changelog entries for 0.2.1 to 0.2.6:

- 0.2.5: a required `protocolVersion` on the Agent Card, and several push notification configs per task.
- 0.2.4: several transports announced on the Agent Card.
- 0.2.2: gRPC and REST definitions, protocol extensions, `iconUrl`, and fixes for consistency with JSON-RPC 2.0.
- 0.2.1: `supportsAuthenticatedExtendedCard` and `referenceTaskIds`.

## Upgrading

### 0.2 to 0.3

1. Set the card's `protocolVersion` to the 0.3 version.
2. Serve the card at `/.well-known/agent-card.json` instead of `agent.json` (0.3 § 5.3).
3. If the card sets `supportsAuthenticatedExtendedCard`, serve the extended card through `agent/getAuthenticatedExtendedCard` (0.3 § 7.10); the release notes list this method as a breaking change.
4. Optionally add `signatures`, mTLS and per-skill `security` (0.3 § 5.5.3 to § 5.5.6).
5. Validate the card against the 0.3 schema.
6. Keep behaviour unchanged: the same skills, scopes and task flows.

### 0.3 to 1.0

1. Change the version marker: remove the card-level `protocolVersion`, list each endpoint in `supportedInterfaces` with `protocolVersion: "1.0"`, and send `A2A-Version: 1.0` (§ 3.6, § 8.3.1).
2. Move `url`, `preferredTransport` and `additionalInterfaces` into `supportedInterfaces`, preferred first, and move `supportsAuthenticatedExtendedCard` to `capabilities.extendedAgentCard` ([`agent-card.md`](agent-card.md)).
3. Rename the methods to their 1.0 names and drop the `/v1` prefix from HTTP+JSON paths; use simple IDs with separate `taskId` and `id` fields (§ 9, § 11.3).
4. Replace enum values: `"completed"` to `TASK_STATE_COMPLETED`, `"input-required"` to `TASK_STATE_INPUT_REQUIRED`, `"user"` to `ROLE_USER`, and so on (§ 5.5).
5. Rewrite parts: drop `kind`; `file.fileWithUri` becomes `url`, inline bytes go in `raw`, `mimeType` becomes `mediaType`.
6. Rewrite stream events: wrap them in `statusUpdate` or `artifactUpdate`, drop `kind` and `final`, and end the stream by closing it (§ 3.1.2).
7. Rewrite errors with `google.rpc.ErrorInfo`, and on HTTP+JSON switch from `application/problem+json` to the `google.rpc.Status` form (§ 9.5, § 11.6).
8. Replace `implicit` and `password` OAuth flows with `authorizationCode` (with PKCE) or `deviceCode` (§ 4.5.7).
9. Merge push notification configs into `TaskPushNotificationConfig` and send `StreamResponse` payloads (§ 4.3.3).
10. Validate the card and messages against the A2A JSON Schema generated from `a2a.proto` v1.0.1.
11. Keep behaviour unchanged: the same tasks reach the same states with the same artifacts. During migration keep a 0.3 interface if clients need it.

### 0.2 to 1.0

Apply 0.2 to 0.3, then 0.3 to 1.0. The 0.3 steps that 1.0 then changes again (the card shape and the extended card method) can go straight to their 1.0 form.

## Preview: A2A 1.1

The `dev-1.1` branch holds the only text labelled 1.1: three commits (task generation, the coherent task history ADR and its implementation) that change `docs/specification.md` and `specification/a2a.proto`. When checked it had diverged from `main` (3 commits ahead, 58 behind), so it is not a complete 1.1 specification, and no 1.1 release exists.

- Posture: **track**. Do not emit `generation`, `timeline`, `timelineLength`, `currentGeneration`, `ifGenerationMatch`, `startGeneration`, `endGeneration` or `TaskGenerationMismatchError`, and do not stop populating `history`.
- A 1.0 implementation stays compatible: the draft says clients that ignore `generation` interoperate, and a server without it returns `0` (§ 3.2.7).
- When 1.1 is released: make it current, make 1.0 supported, add the 1.1 sources, and add a 1.0 to 1.1 upgrade section (populate `generation` and `timeline`, keep `history` until 2.0).
