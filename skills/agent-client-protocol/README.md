# agent-client-protocol

An agent skill for the Agent Client Protocol (ACP): build or review editor clients and AI coding agents that talk JSON-RPC 2.0 to each other, on ACP v1, with a gated path to the ACP v2 draft.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill agent-client-protocol
```

Then ask your agent to "make our coding agent speak ACP over stdio" or "plan our ACP v2 migration without dropping v1".

## What it covers

- `initialize`, version negotiation, client and agent capabilities, and `authMethods` with `authenticate`, terminal login and `logout`.
- Sessions: `session/new` with absolute `cwd` and MCP servers, `session/load`, `session/resume`, `session/list`, `session/close` and additional workspace roots.
- Prompt turns: `session/prompt`, every `session/update` variant, stop reasons, `session/cancel` and `$/cancel_request`.
- Tool calls, permission requests, `fs/*` and `terminal/*` Client methods, absolute paths and 1-based lines.
- `_meta`, underscore extension methods, error codes and stdio framing.
- The ACP v2 draft: the `state_update` prompt lifecycle, upserts, structured diffs, removed surfaces and the per-role migration checklist.

## Versions

| Line         | Status                                 |
| ------------ | -------------------------------------- |
| ACP v1       | current                                |
| ACP v2 draft | preview (build, behind a feature flag) |

`references/versions.md` explains the posture and how to upgrade from v1 to v2.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [ACP v1 protocol docs](https://agentclientprotocol.com/protocol/v1/overview): stable, `protocolVersion: 1`, schema v1.24.1.
- [ACP v2 overview](https://agentclientprotocol.com/protocol/v2/overview) and [migration guide](https://agentclientprotocol.com/protocol/v2/migration): draft, schema v2.0.0-alpha.7.
- [ACP v2 is available in Draft](https://agentclientprotocol.com/announcements/acp-v2-draft): announcement, 2026-07-20.
- [agentclientprotocol/agent-client-protocol](https://github.com/agentclientprotocol/agent-client-protocol): schemas and releases.

## License

MIT
