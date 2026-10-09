# Versions and upgrades

Read this when choosing which ACP version to implement, negotiating versions, or upgrading from ACP v1 to the ACP v2 draft. Sources: the v1 docs, the v2 overview, the migration guide, the v2 draft announcement and the schema releases, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id           | Line         | Status  | Revision                                                 | Posture | Summary                                                                        |
| ------------ | ------------ | ------- | -------------------------------------------------------- | ------- | ------------------------------------------------------------------------------ |
| `v1`         | ACP v1       | current | `protocolVersion: 1`, schema-v1.24.1 (2026-09-30)        |         | The stable protocol. The default target.                                       |
| `v2-preview` | ACP v2 draft | preview | `protocolVersion: 2`, schema-v2.0.0-alpha.7 (2026-09-30) | build   | Draft since 2026-07-20. Breaking redesign of the prompt lifecycle and surface. |

Statuses: **current** is the default target; **preview** is a draft of the next line. No legacy line exists: v1 is the first protocol version.

ACP versions are a single integer `protocolVersion`, raised only for breaking changes; non-breaking features arrive as capabilities within a version (v1 Initialization § Protocol version, § Capabilities). Within v1, features stabilized through the RFD process (session list, resume, close, delete, additional directories, logout, elicitation, usage updates, message IDs, boolean config options, request cancellation) are additive and capability-gated. The schema package has its own semver (`schema-v1.x.y`, `schema-v2.0.0-alpha.N`), separate from `protocolVersion`.

## Which version to use

- Implement ACP v1. It is what existing Agents and Clients speak, and v1-only peers "will remain common for some time" (announcement § Draft status).
- Add the ACP v2 draft only when the user asks, behind version negotiation **and** a feature flag, not on by default in production, with v1 still served on other connections (Migration § Scope; announcement § Draft status).
- Posture **build**, not **track**: the migration guide and the announcement ask implementers to start implementing and testing v2 now so feedback lands before stabilization, and SDK authors to generate against the published `v2.0.0-alpha` schemas. Build against the pinned alpha, expect changes, and never let v2 replace v1.
- Never advertise unstable v2 features just because `protocolVersion: 2` was negotiated; gate each separately (Migration § Scope).

## What changed

### ACP v1 (stable)

The stable surface described in `lifecycle.md` and `tools-and-client-methods.md`: `initialize`, `authenticate`, `logout`, `session/new`, `session/load`, `session/resume`, `session/list`, `session/close`, `session/delete`, `session/prompt` ending in a stop reason, `session/update`, `session/request_permission`, `fs/*`, `terminal/*`, session modes and config options, `$/cancel_request`, `_meta` and `_` extensions, stdio.

### ACP v2 draft (schema-v2.0.0-alpha.7)

From the announcement § The Big Themes of v2 and Migration § At a glance:

- The `session/prompt` response acknowledges insertion with a `messageId`; progress and completion move to `state_update` (`running`, `idle`, `requires_action`) with stop reasons, plus a new `error` stop reason.
- Messages, tool calls, plans and terminal output are upserts by ID with omit/`null`/value/append semantics; `messageId` is required; `tool_call` is folded into `tool_call_update`; `tool_call_content_chunk` streams content.
- Diffs become structured `changes` plus optional `git_patch`.
- Permission requests get a required `title`, optional `description` and an extensible `subject`.
- Removed: `fs/*`, `terminal/*` (replaced by Agent-owned display terminals), `session/load` (use `session/resume` with `replayFrom`), session modes (use config options), MCP SSE.
- Capabilities restructured into role-agnostic `capabilities` and required `info`, with object support markers and a required session baseline.
- `authenticate`/`logout` become `auth/login`/`auth/logout`.
- All enums and unions are open; `_`-prefixed values are extensions.
- stdio accepts JSON-RPC batches.

## Upgrading

### v1 to v2-preview

Keep the v1 implementation and add v2 as a second protocol surface behind shared application logic (Migration § Supporting v1 and v2 side by side). Details for every step are in `v2-draft.md`.

Agent (Migration § Migration checklist: Agents):

1. Read `params.capabilities`/`params.info`; return `capabilities` and required `info`; nest prompt and MCP capabilities under `session`; use `{}` markers; drop `loadSession` and the `list`/`resume`/`close` markers.
2. If you advertise `session`, implement `session/new`, `session/list`, `session/resume`, `session/close`, `session/prompt`, `session/cancel`, `session/update`.
3. Rename `authenticate` to `auth/login`; with any `authMethods`, implement `auth/login` and `auth/logout`; add `methodId` and `type`; send terminal `env` as name/value entries.
4. Answer accepted prompts with `{ "messageId" }`; emit `user_message`, `running`, and an idle `state_update` with the stop reason (including `cancelled` and `error`).
5. Attach `messageId` to every message chunk and update.
6. Stop sending `tool_call`; create and patch with `tool_call_update`; stream with `tool_call_content_chunk`.
7. Report terminal output with `terminal` references, `terminal_update` and base64 `terminal_output_chunk`.
8. Replace `oldText`/`newText` with `changes` and, when feasible, a `git_patch`.
9. Put permission copy in `title`/`description`; use `tool_call` or `command` subjects.
10. Send `plan_update` with `type: "items"` and a `planId`.
11. Replace modes with config options (`category: "mode"`) and `config_option_update`.
12. Handle `replayFrom` on `session/resume`; remove `session/load`.
13. Remove all `fs/*` and `terminal/*` calls.
14. Emit `type` on MCP server configs; drop SSE; advertise `session.mcp.stdio`/`http`.
15. Add `type: "text"` to command `input`; optionally return `availableCommands` from setup.
16. Parse enums as open and accept batch arrays on stdio.

Client (Migration § Migration checklist: Clients):

1. Send `protocolVersion: 2`, required `info` and `capabilities` without `fs`/`terminal`; read Agent capabilities by presence.
2. Rely on the session baseline when `capabilities.session` is present; still check `session.delete`.
3. Drive UI from `state_update`, not the prompt response; render the user message from `user_message`; treat an error response to `session/prompt` as "not inserted".
4. Track messages by `messageId` with upsert semantics.
5. Create tool calls on first-seen `toolCallId`; apply patches; append content chunks.
6. Keep Agent-owned terminal state by `terminalId`; decode each chunk separately; render without process controls.
7. Render `patch.text`; drive file trees from `changes`; handle patch-less diffs.
8. Render permission `title`/`description` and subjects; show a generic prompt for unknown subjects.
9. Handle `plan_update` by `planId`.
10. Drive mode and model UI from config options.
11. Replace `session/load` with `session/resume` plus `replayFrom`.
12. Remove `fs/*` and `terminal/*` handlers for v2 connections; expose Client tools through MCP servers in `mcpServers`.
13. After `session/cancel`, wait for the idle `state_update` with `cancelled`.
14. Preserve unknown enum variants, tolerate unknown `sessionUpdate` types, and accept batches.

## Preview

The ACP v2 draft (`v2-preview`) was announced on 2026-07-20 and is pinned at schema-v2.0.0-alpha.7 (2026-09-30). Posture: **build**, gated behind negotiation and a feature flag, never the default, v1 kept. When refreshing, check the announcements page for "v2 is stabilized" and the releases for a `schema-v2.0.0` final tag. When v2 stabilizes, make it a released line, decide whether v1 becomes supported, and rewrite this file's upgrade section against the final schema.
