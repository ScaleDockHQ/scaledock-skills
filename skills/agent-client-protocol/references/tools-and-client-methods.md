# ACP v1 tool calls, permissions and Client methods

Read this when reporting tool calls, asking the user for permission, or using the Client's file system and terminals in ACP v1. Citations name the v1 docs page and section, listed in [Sources](../SKILL.md#sources). The ACP v2 draft removes the `fs/*` and `terminal/*` methods; see `v2-draft.md`.

## Tool calls

From v1 Tool Calls:

- The Agent SHOULD report each tool call the model requests with a `tool_call` update (§ Creating), then patch it with `tool_call_update`, where every field except `toolCallId` is optional and only changed fields are sent (§ Updating).
- Fields: `toolCallId` (required, unique in the session), `name` (optional programmatic name; informational only, grants nothing; cannot be cleared in v1), `title` (required on creation), `kind`, `status`, `content`, `locations`, `rawInput`, `rawOutput`. For `rawInput` and `rawOutput`, omission and `null` are equivalent.
- `kind`: `read`, `edit`, `delete`, `move`, `search`, `execute`, `think`, `fetch`, `switch_mode`, `other` (default). Clients use it for icons and display.
- `status` (§ Status): `pending` (default; input streaming or awaiting approval), `in_progress`, `completed`, `failed`.

```json
{
  "jsonrpc": "2.0",
  "method": "session/update",
  "params": {
    "sessionId": "sess_abc123def456",
    "update": {
      "sessionUpdate": "tool_call",
      "toolCallId": "call_001",
      "name": "read_file",
      "title": "Reading configuration file",
      "kind": "read",
      "status": "pending"
    }
  }
}
```

### Tool call content

From v1 Tool Calls § Content:

| `type`     | Fields                                                                            | Notes                                                                             |
| ---------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `content`  | `content`: a content block                                                        | Text, image, audio, resource link or embedded resource (v1 Content).              |
| `diff`     | `path` (absolute, required), `oldText` (null for new files), `newText` (required) | Whole-file before and after text.                                                 |
| `terminal` | `terminalId` from `terminal/create`                                               | The Client shows live output and keeps showing it after the terminal is released. |

### Following the Agent

`locations` entries have an absolute `path` and an optional `line` (unsigned 32-bit; omission and `null` mean no line), so Clients can follow which files the Agent touches (§ Following the Agent). Lines are 1-based (v1 Overview § Argument requirements).

## Permission requests

From v1 Tool Calls § Requesting Permission:

- The Agent MAY call `session/request_permission` before running a tool, with `sessionId`, a `toolCall` (a `ToolCallUpdate`) and `options`.
- Each option has `optionId`, `name` and `kind`: `allow_once`, `allow_always`, `reject_once`, `reject_always`.
- The Client answers `{ "outcome": { "outcome": "selected", "optionId": "..." } }`, or `{ "outcome": { "outcome": "cancelled" } }`, which it MUST send when the turn is cancelled.
- Clients MAY allow or reject automatically from user settings.

## File system

From v1 File System:

- Agents MUST check `clientCapabilities.fs.readTextFile` / `writeTextFile` before calling; if `false` or absent they MUST NOT call the method (§ Checking Support).
- `fs/read_text_file`: `sessionId`, absolute `path`, optional 1-based `line` to start at and `limit` (maximum lines). Returns `{ "content": "..." }`, including unsaved editor changes (§ Reading Files).
- `fs/write_text_file`: `sessionId`, absolute `path`, `content`. The Client MUST create the file if it does not exist; success is `{}` (§ Writing Files).

## Terminals

From v1 Terminals:

- Agents MUST check `clientCapabilities.terminal` first (§ Checking Support).
- `terminal/create`: `sessionId`, `command`, optional `args`, `env` (`{ "name", "value" }` entries), absolute `cwd`, and `outputByteLimit`. The Client returns a `terminalId` at once without waiting; when the limit is exceeded it truncates from the start at a character boundary (§ Executing Commands).
- The Agent MUST call `terminal/release` when it no longer needs a terminal.
- `terminal/output`: returns `output`, `truncated` and, once exited, `exitStatus` (`exitCode`, `signal`, either may be null) (§ Getting Output).
- `terminal/wait_for_exit`: waits for the command to exit and returns its exit status.
- `terminal/kill`: kills the command but keeps the terminal valid for `terminal/output` and `terminal/wait_for_exit`; the Agent MUST still release it.
- `terminal/release`: kills the command if still running and frees resources; afterwards the ID is invalid for all `terminal/*` methods, but a terminal embedded in a tool call SHOULD stay displayed (§ Releasing Terminals).
- Timeouts are built by racing a timer against `terminal/wait_for_exit`, then `terminal/kill`, `terminal/output` and `terminal/release` (§ Building a Timeout).

## Content blocks

From v1 Content and v1 Initialization § Prompt capabilities: the content block types are `text`, `image`, `audio`, `resource_link` and `resource` (embedded). Agents MUST accept `text` and `resource_link` in prompts; `image`, `audio` and `resource` only when advertised in `promptCapabilities`.
