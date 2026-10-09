---
name: agent-client-protocol
description: >-
  Agent Client Protocol (ACP): build or review editor clients and coding agents that talk JSON-RPC 2.0
  over stdio, following ACP v1 (stable protocolVersion 1, schema v1.24.1) with the ACP v2 draft
  (schema v2.0.0-alpha.7) as a gated preview and a v1 to v2 migration path. Use when an IDE, editor or
  other UI drives an AI coding agent, or an agent must speak to such clients: initialize and version
  negotiation, client and agent capabilities, authMethods and authenticate or auth/login, session/new,
  session/load, session/resume, session/list, session/close, session/prompt turns and stop reasons,
  session/update notifications (message chunks, tool calls, plan, usage), session/request_permission,
  fs/read_text_file and fs/write_text_file, terminal/* methods, session/cancel and $/cancel_request,
  MCP server configuration, _meta and underscore extension methods, absolute paths and 1-based lines,
  stdio framing, and the v2 state_update prompt lifecycle. Triggers: ACP, agentclientprotocol.com,
  editor to agent protocol.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Agent Client Protocol (ACP)

ACP standardizes communication between code editors or other user interfaces (Clients) and AI coding agents (Agents), over JSON-RPC 2.0. It is published at agentclientprotocol.com with the schema in the `agentclientprotocol/agent-client-protocol` repository. With this skill the agent implements or reviews an ACP Agent, Client or SDK, and plans the move from ACP v1 to ACP v2.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the page and section it cites, for example "v1 Initialization § Version Negotiation". Pages prefixed `v1` or `v2` are under `/protocol/v1/` or `/protocol/v2/`; "Migration" is the v2 migration guide. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Agent (usually a subprocess of the Client), Client (editor or UI), or SDK author (both sides).
- Target version: ACP v1 (default; `protocolVersion: 1`). The ACP v2 draft is a preview (posture: build): implement it only behind version negotiation and a feature flag, never as the default, and keep v1 working beside it. See [`references/versions.md`](references/versions.md).
- Capabilities: which optional surfaces the Client offers (`fs`, `terminal`, `auth.terminal`, elicitation) and the Agent offers (`loadSession`, prompt content types, MCP transports, session list, resume, close, delete).
- Transport: stdio (the only defined transport) or a documented custom transport.
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources), check the repository releases for a newer `schema-v1.*` or `schema-v2.*` tag and the announcements page for a v2 stabilization, and update the pins.

## Invariants

1. **JSON-RPC 2.0, UTF-8.** Methods are request/response pairs, notifications get no response, and errors carry `code` and `message` (v1 Overview § Communication Model, § Error Handling; v1 Transports).
2. **Initialize first, one version per connection.** The Client sends the latest `protocolVersion` it supports; the Agent answers with the same version or its own latest; a Client that cannot speak the answer closes the connection and tells the user. The version is a single integer that changes only for breaking changes (v1 Initialization § Protocol version, § Version Negotiation; Migration § Version negotiation).
3. **Omitted capability means unsupported.** Never call a method the peer did not advertise: `fs/*` needs `fs.readTextFile`/`fs.writeTextFile`, `terminal/*` needs `terminal`, `session/load` needs `loadSession`, `session/resume` and `session/close` need their `sessionCapabilities` markers, `logout` needs `agentCapabilities.auth.logout` (v1 Initialization § Capabilities; v1 File System § Checking Support; v1 Terminals § Checking Support; v1 Session Setup).
4. **Baseline.** Every Agent supports `initialize`, `session/new`, `session/prompt`, `session/cancel` and `session/update`, and text and resource-link prompt content; every Client supports `session/request_permission` (v1 Overview § Baseline Methods; v1 Initialization § Session Capabilities, § Prompt capabilities).
5. **Absolute paths, 1-based lines.** All file paths in the protocol are absolute and line numbers start at 1; `cwd` is absolute and is the session's base regardless of where the Agent was spawned (v1 Overview § Argument requirements; v1 Session Setup § Working Directory).
6. **In v1 the `session/prompt` response ends the turn** with a `stopReason` (`end_turn`, `max_tokens`, `max_turn_requests`, `refusal`, `cancelled`); all updates for the turn are sent before it (v1 Prompt Turn § 4, § Stop Reasons).
7. **Cancellation is a stop reason, not an error.** After `session/cancel` the Client answers pending permission requests with `cancelled`, and the Agent catches abort exceptions and returns `stopReason: "cancelled"` (v1 Prompt Turn § Cancellation).
8. **Extend only through `_meta`, `_`-prefixed methods and `_meta` capabilities.** Never add custom root fields to spec types; keep `traceparent`, `tracestate` and `baggage` at the root of `_meta` for W3C trace context; answer unknown `_` requests with `-32601` and ignore unknown `_` notifications (v1 Extensibility).
9. **stdio framing.** One JSON-RPC message per line, no embedded newlines, nothing but ACP messages on `stdout` and `stdin`; logs go to `stderr` (v1 Transports § stdio).
10. **The ACP v2 draft is not v1 plus fields.** It changes prompt completion to `state_update`, removes `fs/*`, `terminal/*`, `session/load` and modes, and renames auth methods; gate it behind negotiation and a feature flag and support both versions side by side (Migration § Scope, § Supporting v1 and v2 side by side; ACP v2 draft announcement § Draft status).

## Workflow

1. **Pick the version.** Default to ACP v1. Add the ACP v2 draft only if asked, behind a flag, with v1 still served.
   -> [`references/versions.md`](references/versions.md)
   ✓ The connection negotiates exactly one `protocolVersion`, and v1 peers still work.
2. **Initialize and authenticate.** Exchange `protocolVersion`, capabilities and `clientInfo`/`agentInfo`; handle `authMethods` (`agent` via `authenticate`, `terminal` by relaunching the Agent), `auth_required` (`-32000`) and `logout` (v1 Initialization; v1 Authentication).
   -> [`references/lifecycle.md`](references/lifecycle.md)
   ✓ Every optional call is guarded by the advertised capability.
3. **Set up sessions.** `session/new` with absolute `cwd` and `mcpServers`; `session/load` (replay, then respond), `session/resume` (no replay), `session/list`, `session/close`, `additionalDirectories` (v1 Session Setup; v1 Session List).
   -> [`references/lifecycle.md`](references/lifecycle.md)
   ✓ The Agent supports MCP over stdio, and the Client sends HTTP MCP servers only when `mcpCapabilities.http` is set.
4. **Run prompt turns.** Stream `session/update` variants, report tool calls, request permission, and end with a stop reason; support `session/cancel` and `$/cancel_request` (v1 Prompt Turn; v1 Cancellation).
   -> [`references/lifecycle.md`](references/lifecycle.md)
   ✓ No update for a turn arrives after its `session/prompt` response.
5. **Tool calls, permissions and Client methods.** `tool_call` then `tool_call_update`, permission options, diff, terminal and content results, `locations` for follow-along, `fs/*` for unsaved editor state, and `terminal/*` with release (v1 Tool Calls; v1 File System; v1 Terminals).
   -> [`references/tools-and-client-methods.md`](references/tools-and-client-methods.md)
   ✓ Every created terminal is released, and every path in a call is absolute.
6. **Extend safely.** Put custom data in `_meta`, name custom methods with `_`, advertise them in capability `_meta` (v1 Extensibility).
   -> [`references/lifecycle.md`](references/lifecycle.md)
   ✓ No custom field sits at the root of a spec-defined type.
7. **Upgrade to the ACP v2 draft** (only when asked). Follow the per-role checklist, keep the v1 surface, and gate v2 per connection.
   -> [`references/versions.md`](references/versions.md), [`references/v2-draft.md`](references/v2-draft.md)
   ✓ A v2 connection drives UI from `state_update`, and a v1 connection behaves as before.

## Verify before done

- [ ] `initialize` is the first request, the version answer follows § Version Negotiation, and an unsupported answer closes the connection (v1 Initialization).
- [ ] No `fs/*`, `terminal/*`, `session/load`, `session/resume`, `session/close` or `logout` call is made without the matching capability (v1 Initialization § Capabilities).
- [ ] Every path is absolute and every line number 1-based (v1 Overview § Argument requirements).
- [ ] The Agent responds to `session/prompt` only after all updates for the turn, and returns `cancelled` (not an error) after `session/cancel` (v1 Prompt Turn).
- [ ] The Client answers every pending `session/request_permission` with `cancelled` when it cancels (v1 Tool Calls § Requesting Permission).
- [ ] stdio output carries only newline-delimited ACP messages; logs go to `stderr` (v1 Transports).
- [ ] Any v2 support is behind negotiation and a feature flag, with v1 still served (Migration § Scope).

## Reference index

- **`references/versions.md`**: ACP v1 and the ACP v2 draft, the schema release pins, why v2 is posture build, and the v1 to v2 upgrade checklist. Load for steps 1 and 7.
- **`references/lifecycle.md`**: initialization, capabilities, authentication, sessions, the prompt turn, every `session/update` variant, cancellation, error codes, extensibility and transports for v1. Load for steps 2, 3, 4 and 6.
- **`references/tools-and-client-methods.md`**: tool call fields and statuses, permission requests, tool call content, `fs/*` and `terminal/*` methods. Load for step 5.
- **`references/v2-draft.md`**: the v2 surface in detail: `state_update` lifecycle, upserts, structured diffs, Agent-owned terminals, permission subjects, plans, config options, open enums and batches. Load for step 7.

## Related skills

- `json-rpc` for the JSON-RPC 2.0 framing, errors and batches ACP uses: `npx skills add ScaleDockHQ/scaledock-skills --skill json-rpc`.
- `mcp` for the Model Context Protocol servers a Client passes in `mcpServers`: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp`.
- `json-schema` for validating messages against the published ACP schemas: `npx skills add ScaleDockHQ/scaledock-skills --skill json-schema`.
- `agents-md` for the repository instructions coding agents read: `npx skills add ScaleDockHQ/scaledock-skills --skill agents-md`.
- `a2a` for agent-to-agent rather than editor-to-agent communication: `npx skills add ScaleDockHQ/scaledock-skills --skill a2a`.
- `ag-ui` for the event protocol between agent backends and web frontends: `npx skills add ScaleDockHQ/scaledock-skills --skill ag-ui`.
- `opentelemetry-genai` for tracing that the `_meta` trace context keys connect to: `npx skills add ScaleDockHQ/scaledock-skills --skill opentelemetry-genai`.

## Sources

Status uses the publisher's own maturity term. Checked is the date the source was last read.

- [ACP v1 Overview](https://agentclientprotocol.com/protocol/v1/overview): Stable, protocolVersion 1, schema v1.24.1, checked 2026-10-09.
- [ACP v1 Initialization](https://agentclientprotocol.com/protocol/v1/initialization): Stable, protocolVersion 1, checked 2026-10-09.
- [ACP v1 Authentication](https://agentclientprotocol.com/protocol/v1/authentication): Stable, protocolVersion 1, checked 2026-10-09.
- [ACP v1 Session Setup](https://agentclientprotocol.com/protocol/v1/session-setup): Stable, protocolVersion 1, checked 2026-10-09.
- [ACP v1 Session List](https://agentclientprotocol.com/protocol/v1/session-list): Stable, protocolVersion 1, checked 2026-10-09.
- [ACP v1 Prompt Turn](https://agentclientprotocol.com/protocol/v1/prompt-turn): Stable, protocolVersion 1, checked 2026-10-09.
- [ACP v1 Content](https://agentclientprotocol.com/protocol/v1/content): Stable, protocolVersion 1, checked 2026-10-09.
- [ACP v1 Tool Calls](https://agentclientprotocol.com/protocol/v1/tool-calls): Stable, protocolVersion 1, checked 2026-10-09.
- [ACP v1 File System](https://agentclientprotocol.com/protocol/v1/file-system): Stable, protocolVersion 1, checked 2026-10-09.
- [ACP v1 Terminals](https://agentclientprotocol.com/protocol/v1/terminals): Stable, protocolVersion 1, checked 2026-10-09.
- [ACP v1 Cancellation](https://agentclientprotocol.com/protocol/v1/cancellation): Stable, protocolVersion 1, checked 2026-10-09.
- [ACP v1 Extensibility](https://agentclientprotocol.com/protocol/v1/extensibility): Stable, protocolVersion 1, checked 2026-10-09.
- [ACP v1 Transports](https://agentclientprotocol.com/protocol/v1/transports): Stable (stdio; Streamable HTTP in discussion), checked 2026-10-09.
- [ACP v1 Schema](https://agentclientprotocol.com/protocol/v1/schema): Stable, schema v1.24.1, checked 2026-10-09.
- [ACP v2 Overview](https://agentclientprotocol.com/protocol/v2/overview): Draft, protocolVersion 2, schema v2.0.0-alpha.7, posture build, checked 2026-10-09.
- [Migrating from v1 (ACP v2 migration guide)](https://agentclientprotocol.com/protocol/v2/migration): Draft, schema v2.0.0-alpha.7, posture build, checked 2026-10-09.
- [ACP v2 is available in Draft](https://agentclientprotocol.com/announcements/acp-v2-draft): Announcement, published 2026-07-20, checked 2026-10-09.
- [agentclientprotocol/agent-client-protocol](https://github.com/agentclientprotocol/agent-client-protocol): Repository with `schema/v1` and `schema/v2`, checked 2026-10-09.
- [Release schema-v1.24.1](https://github.com/agentclientprotocol/agent-client-protocol/releases/tag/schema-v1.24.1): Released 2026-09-30, checked 2026-10-09.
- [Release schema-v2.0.0-alpha.7](https://github.com/agentclientprotocol/agent-client-protocol/releases/tag/schema-v2.0.0-alpha.7): Pre-release 2026-09-30, posture build, checked 2026-10-09.
