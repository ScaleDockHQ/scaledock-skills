# ACP v1 connection and session lifecycle

Read this when implementing initialization, authentication, sessions, prompt turns, cancellation, errors, extensions or the transport for ACP v1. Citations name the v1 docs page and section, listed in [Sources](../SKILL.md#sources). For the ACP v2 draft, see `v2-draft.md`.

## Message flow

From v1 Overview § Message Flow:

1. Client → Agent `initialize`; then `authenticate` if the Agent requires it.
2. Client → Agent `session/new`, or `session/load` / `session/resume` for an existing session.
3. Client → Agent `session/prompt`; Agent → Client `session/update` notifications, file system, terminal and permission requests; Client → Agent `session/cancel` if needed; the turn ends with the `session/prompt` response.

Methods by side (v1 Overview § Agent, § Client):

| Side   | Baseline                                                                                       | Optional                                                                                                                                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent  | `initialize`, `authenticate`, `session/new`, `session/prompt`, `session/cancel` (notification) | `session/load`, `session/resume`, `session/list`, `session/close`, `session/delete`, `logout`, `session/set_mode`, `session/set_config_option`                                                              |
| Client | `session/request_permission`, `session/update` (notification)                                  | `fs/read_text_file`, `fs/write_text_file`, `terminal/create`, `terminal/output`, `terminal/release`, `terminal/wait_for_exit`, `terminal/kill`, `elicitation/create`, `elicitation/complete` (notification) |

Conventions (v1 Overview § Conventions): object keys are `camelCase`, discriminator string values are `snake_case`, and the JSON-RPC envelope fields follow JSON-RPC 2.0.

## Initialization

From v1 Initialization:

- The Client MUST call `initialize` before any session, with the latest `protocolVersion` it supports and its `clientCapabilities`; it SHOULD send `clientInfo` (`name`, `title`, `version`).
- The Agent MUST answer with the chosen `protocolVersion` and its `agentCapabilities`, SHOULD send `agentInfo`, and lists `authMethods`.
- The version is one integer naming a MAJOR version, raised only for breaking changes. If the Agent supports the requested version it MUST answer with it, otherwise with its latest. A Client that does not support the answer SHOULD close the connection and inform the user (§ Protocol version, § Version Negotiation).
- All capabilities are optional; omitted ones MUST be treated as unsupported; peers SHOULD support every combination of the other side's capabilities. New capabilities are not breaking changes (§ Capabilities).

```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "initialize",
  "params": {
    "protocolVersion": 1,
    "clientCapabilities": {
      "fs": { "readTextFile": true, "writeTextFile": true },
      "terminal": true
    },
    "clientInfo": {
      "name": "my-client",
      "title": "My Client",
      "version": "1.0.0"
    }
  }
}
```

Client capabilities (§ Client Capabilities): `fs.readTextFile`, `fs.writeTextFile`, `terminal`, `auth.terminal`, `elicitation` (`form` and `url` modes; unlike MCP, `{}` does not mean form support), `session.configOptions.boolean`, `session.compaction`.

Agent capabilities (§ Agent Capabilities):

- `loadSession` (boolean, default false).
- `promptCapabilities`: `image`, `audio`, `embeddedContext` (booleans, default false). Text and resource links are always allowed in prompts (§ Prompt capabilities).
- `mcpCapabilities`: `http`, `sse` (the latter deprecated by MCP).
- `auth.logout`: `logout` is available.
- `sessionCapabilities`: `list`, `resume`, `close`, `delete`, `additionalDirectories`; `{}` means supported, omitted or `null` means not.

## Authentication

From v1 Authentication:

- `authMethods` entries have an `id`, `name`, optional `description` and a `type`; with no `type` the method is `agent`.
- `agent` methods: the Client calls `authenticate` with `methodId`; success is `{}`. Clients MUST NOT pass a `terminal` method to `authenticate`.
- `terminal` methods: allowed only when the Client advertised `clientCapabilities.auth.terminal: true`. The Client launches the same configured Agent program interactively with the method's `args` and `env` (overriding same-named variables), waits for exit (zero is success), then reconnects and reinitializes. The descriptor cannot supply a command.
- `logout` only when `agentCapabilities.auth.logout` was advertised; after it, new sessions need authentication again, and Clients SHOULD expect active sessions to fail with authentication errors (§ Logging Out, § Active Sessions).

## Sessions

From v1 Session Setup and v1 Session List:

- `session/new` takes an absolute `cwd` and `mcpServers`; the Agent MUST return a unique `sessionId`.
- `cwd` MUST be absolute, MUST be used regardless of where the Agent was spawned, MUST stay the base for relative paths, and is part of the effective root set `[cwd, ...additionalDirectories]`, which SHOULD bound file system tool operations (§ Working Directory).
- `session/load` (only with `loadSession`): the Agent MUST replay the whole conversation as `session/update` notifications, then respond (§ Loading Sessions).
- `session/resume` (only with `sessionCapabilities.resume`): the Agent MUST NOT replay history before responding (§ Resuming Sessions).
- `session/close` (only with `sessionCapabilities.close`): the Agent MUST cancel ongoing work as if `session/cancel` had been sent, then free resources (§ Closing Active Sessions).
- `additionalDirectories` (only with `sessionCapabilities.additionalDirectories`): absolute paths; on load and resume the full list MUST be sent again, and omission activates no extra roots (§ Additional Workspace Roots).
- `session/list` (only with `sessionCapabilities.list`): optional `cwd` filter and opaque `cursor`/`nextCursor` pagination (v1 Session List).

MCP servers (§ MCP Servers): every Agent MUST support stdio MCP servers (`name`, absolute `command`, `args`, `env` as `{ "name", "value" }` entries); HTTP (`type: "http"`, `url`, `headers`) only with `mcpCapabilities.http`, and new Agents SHOULD support it; SSE only with `mcpCapabilities.sse`.

## Prompt turn

From v1 Prompt Turn:

1. The Client sends `session/prompt` with `sessionId` and a `prompt` array of content blocks, restricted to the Agent's prompt capabilities (§ 1).
2. The Agent sends the prompt to the model and reports output with `session/update` (§ 2, § 3).
3. Tool calls are reported as they are requested; the Agent MAY request permission, SHOULD mark the call `in_progress` when it runs, and reports the result (§ 5).
4. Results go back to the model and the loop repeats until the model stops or the turn is stopped or cancelled (§ 6).
5. With no pending tool calls the Agent MUST respond to `session/prompt` with a `stopReason` (§ 4).

Stop reasons (§ Stop Reasons): `end_turn`, `max_tokens`, `max_turn_requests`, `refusal`, `cancelled`.

`session/update` variants (§ Session Updates): `user_message_chunk`, `agent_message_chunk`, `agent_thought_chunk`, `tool_call`, `tool_call_update`, `plan`, `available_commands_update`, `current_mode_update`, `config_option_update`, `session_info_update`, `usage_update`, `compaction_update` and `compaction_summary_chunk` (the last two only when the Client advertised `session.compaction`). Updates are not limited to active turns.

- Message chunks MAY carry an opaque `messageId`; a changed `messageId` starts a new message (§ Message IDs).
- `usage_update` carries required `used` and `size` token counts and optional `cost` with `amount` and ISO 4217 `currency` (§ Session Usage Updates).
- Compactions: `compactionId` is unique per session and never reused, `status` is `in_progress`, `completed`, `failed` or `cancelled` (open enum), and `summary` patches follow omit/`null`/value semantics (§ Session Compaction).

## Cancellation

From v1 Prompt Turn § Cancellation and v1 Cancellation:

- The Client MAY send `session/cancel` at any time; it SHOULD mark unfinished tool calls `cancelled` and MUST answer pending `session/request_permission` requests with the `cancelled` outcome.
- The Agent SHOULD stop model requests and tool calls, MAY send final updates before responding, and MUST respond to `session/prompt` with `stopReason: "cancelled"`, catching abort exceptions instead of returning an error.
- The Client SHOULD still accept tool call updates after sending `session/cancel`.
- `$/cancel_request` (optional) cancels any request; the receiver MUST still answer the original request, either with a valid result or error `-32800`. Internal cancellation SHOULD use the same `-32800`.

## Errors

From v1 Overview § Error Handling and the v1 Schema `ErrorCode`:

| Code     | Meaning                 |
| -------- | ----------------------- |
| `-32700` | Parse error             |
| `-32600` | Invalid request         |
| `-32601` | Method not found        |
| `-32602` | Invalid params          |
| `-32603` | Internal error          |
| `-32800` | Request cancelled       |
| `-32000` | Authentication required |
| `-32002` | Resource not found      |

Notifications never receive responses, success or error.

## Extensibility

From v1 Extensibility:

- `_meta` (`{ [key: string]: unknown }`) is available on many requests, responses, notifications and nested types, but not on every type (for example, not on `Error`).
- Root keys `traceparent`, `tracestate` and `baggage` in `_meta` SHOULD be reserved for W3C trace context.
- Implementations MUST NOT add custom fields at the root of a spec type; all names there are reserved.
- Custom requests and notifications start with `_`, for example `_example.com/workspace/buffers`. Unknown custom requests get `-32601`; unknown custom notifications SHOULD be ignored.
- Advertise extensions in the `_meta` of capability objects.

## Transports

From v1 Transports:

- Messages MUST be UTF-8. stdio is the defined transport; Agents and Clients SHOULD support it. Streamable HTTP is in discussion only.
- stdio: the Client launches the Agent as a subprocess; messages are newline-delimited and MUST NOT contain embedded newlines; the Agent MAY log to `stderr`; neither side writes anything but valid ACP messages to `stdout`/`stdin`.
- Custom transports MUST preserve the JSON-RPC format and ACP lifecycle and SHOULD document connection and exchange patterns.
