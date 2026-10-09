# ACP v2 draft surface

Read this when adding ACP v2 support beside v1. Everything here comes from the v2 migration guide ("Migration"), the v2 overview and the v2 draft announcement, pinned to schema v2.0.0-alpha.7 in [Sources](../SKILL.md#sources). The v2 surface is a draft: parts will change before stabilization (announcement § Draft status).

## Scope and gating

- This describes the stable v2 baseline, `schema/v2/schema.json`. The unstable schema, `schema/v2/schema.unstable.json`, adds opt-in draft features; negotiating `protocolVersion: 2` implies none of them, so gate each behind its own capability or flag (Migration § Scope).
- Gate v2 behind explicit version negotiation and feature flags, do not ship it by default in production, and keep v1 (Migration § Scope; announcement § Draft status).
- One connection speaks exactly one negotiated version; select the v1 or v2 surface per connection after `initialize` (Migration § Version negotiation, § Supporting v1 and v2 side by side).

## Initialization

From Migration § Initialization and § Authentication:

- Both sides use `info` (now required: `name`, `title`, `version`) and `capabilities` instead of `clientInfo`/`agentInfo` and `clientCapabilities`/`agentCapabilities`.
- Support markers are objects: `{}` means supported, omitted or `null` means not. Replace `=== true` checks with presence checks.
- Session-scoped capabilities move under `capabilities.session` (`prompt`, `mcp` with `stdio` and `http`, `delete`, `additionalDirectories`). `loadSession` and the `list`/`resume`/`close` markers are gone.
- Advertising `capabilities.session` commits the Agent to `session/new`, `session/list`, `session/resume`, `session/close`, `session/prompt`, `session/cancel` and `session/update`.
- Client `fs` and `terminal` capabilities are removed; stable v2 defines no standard Client capability fields. Terminal auth support is `capabilities.auth.terminal: {}`.
- `authenticate` becomes `auth/login` and `logout` becomes `auth/logout`. One or more valid `authMethods` entries mean the Agent MUST implement both; with none, Clients MUST NOT call either. Auth method descriptors use `methodId` and a required `type` (`agent`, `terminal`, or `_`-prefixed custom). Terminal `env` becomes `[{ "name", "value" }]`.

## Prompt lifecycle

From Migration § The new prompt lifecycle and v2 Overview § Message Flow:

- The `session/prompt` response acknowledges insertion of the user message: `{ "messageId": "..." }` (Agent-generated, required). The Agent MUST respond once the message is inserted, without waiting for processing; receiving or queueing alone does not justify success.
- The Agent MUST report the inserted message as `user_message` (or `user_message_chunk` updates) with the same `messageId`; updates may arrive before or after the response.
- `state_update` reports foreground work: `running` (MUST be sent when work starts or resumes), `requires_action` (SHOULD while waiting on permission), `idle` (MUST when ready for a new prompt, with `stopReason` when foreground work ends).
- Stop reasons are the v1 set plus `error`; a failure after insertion is an idle `state_update` with `stopReason: "error"` and the JSON-RPC error in `error`. An error response to `session/prompt` always means the message was not inserted.
- Background `session/update` notifications may continue while idle.
- Cancellation: `session/cancel` is unchanged, but the Agent confirms with an idle `state_update` whose `stopReason` is `cancelled`. `$/cancel_request` can no longer answer an inserted prompt with `-32800`.
- Clients reconcile by `(sessionId, messageId)`, never by content, and keep handling notifications after the prompt response.

## Upserts and IDs

From Migration § Messages and message IDs, § Tool calls, § Consistent ID naming:

- `messageId` is required on every message chunk and update. New whole-message upserts: `user_message`, `agent_message`, `agent_thought` with a `content` array.
- Patch semantics everywhere: omitted field unchanged, `null` clears, a value replaces, chunks append. `content: []` also clears a message.
- `tool_call` is removed: the first `tool_call_update` for an unseen `toolCallId` creates it (SHOULD include `title`). `tool_call_content_chunk` appends one content item. Tool call `status` adds `cancelled`.
- IDs are unique per entity type within a session; key entities by type and ID. Renames: auth `id` → `methodId`, config option `id` → `configId`, select `group` → `groupId`.

## Diffs, terminals, permissions, plans

From Migration § Diff content, § Agent-owned terminal display, § Permission requests, § Plans:

- Diffs: `changes` (required; `add`, `delete`, `modify` with `path`; `move`, `copy` with `oldPath` and `path`; optional `fileType` and `mimeType`) plus optional `patch` with `format: "git_patch"`, absolute paths, no commit metadata. There is no mapping back to `oldText`/`newText`.
- Terminals are Agent-owned display state: `terminal` content references a `terminalId`; `terminal_update` patches `command`, absolute `cwd`, `output.data` (base64 replacement snapshot) and `exitStatus`; `terminal_output_chunk` appends independently base64-encoded bytes. No input, resize, kill or wait semantics.
- `session/request_permission` takes a required `title`, optional `description` and optional `subject` (`tool_call` with a `toolCall` upsert, or `command` with required `command` and absolute `cwd`). An Agent MUST NOT treat an outcome it does not understand as approval.
- `plan` becomes `plan_update` with `plan: { "type": "items", "planId", "entries" }`; each update replaces that plan's entries.

## Sessions, modes, MCP and commands

From Migration § Session setup and lifecycle, § Session modes become config options, § MCP server configuration, § Slash commands:

- `session/load` is removed: use `session/resume` with `"replayFrom": { "type": "start" }`; omit `replayFrom` for a plain reattach.
- `session/new` and `session/resume` take absolute `cwd`, optional `additionalDirectories` and optional `mcpServers`, and MAY return `configOptions` and `availableCommands`.
- Modes are removed (`session/set_mode`, `modes`, `current_mode_update`); use config options with `category` `mode`, `model`, `model_config` or `thought_level`, `session/set_config_option` and `config_option_update`.
- MCP server configs MUST carry `type` (`stdio` or `http`); SSE is removed; `args`, `env` and `headers` become optional.
- Command `input` becomes a tagged union with `type: "text"`.

## Client execution surface removed

From Migration § Client file system and terminal execution removed: `fs/read_text_file`, `fs/write_text_file` and all `terminal/*` methods are gone. Clients that want to expose files, unsaved buffers or command execution provide an MCP server in `mcpServers`.

## Forward compatibility and transport

From Migration § Extensibility and forward compatibility, § Transports:

- Every enum and tagged union is open. `_`-prefixed values are implementation extensions; other unknown values are reserved for future ACP versions. Receivers SHOULD preserve unknown values when storing, replaying or proxying and fall back safely.
- Top-level `_meta` on upserts follows patch semantics; nested `_meta` is scoped to its object. Custom methods still start with `_`.
- stdio follows JSON-RPC 2.0 batches: a line may hold a batch array; do not batch `initialize`, `auth/login`, `session/new`, `session/resume` or `session/prompt`. Remote transports (Streamable HTTP with SSE, WebSocket) are in a separate RFD, not part of core v2.

## SDK checklist

From Migration § Migration checklist: SDKs: keep v1 and v2 schemas, models and fixtures separate; model omitted, `null` and value distinctly; reject malformed payloads for known discriminators; round-trip unknown variants and `_meta`; model the idle stop reason as a tagged union; and cover lifecycle, replay, cancellation, permissions, chunks, terminal snapshots, diffs and batches in fixtures.
