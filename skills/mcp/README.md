# mcp

An agent skill for the Model Context Protocol (MCP) base protocol and its server and client features, targeting revision 2026-07-28 with support for 2025-11-25 and 2025-06-18 and upgrades from 2025-03-26 and 2024-11-05: messages, versioning, stdio and Streamable HTTP, tools, resources, prompts, elicitation and the rest, plus the Tasks and Skills extensions and the MCP Registry `server.json` format.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill mcp
```

Then ask your agent to "build an MCP server for our API" or "review our MCP client against the 2026-07-28 spec".

## What it covers

- JSON-RPC messages, `resultType`, the MCP error code ranges, and per-request `_meta` (protocol version, client capabilities, client info).
- Stateless versioning with `server/discover`, `UnsupportedProtocolVersionError`, and dual-era fallback to the `initialize` handshake.
- stdio framing and shutdown, and Streamable HTTP with `Origin` checks, JSON or SSE responses, `Mcp-Method`, `Mcp-Name` and `x-mcp-header` parameter headers.
- Multi round-trip requests (`InputRequiredResult`), `subscriptions/listen`, cancellation and progress.
- Tools, resources, prompts, completion, pagination and caching hints.
- Elicitation in form and URL mode, and the deprecated sampling, roots and logging features.
- The MCP security best practices.
- The Tasks and Skills over MCP extensions, and `server.json` for the MCP Registry.
- What changed in each revision, and checklists to upgrade between them.

Authorization lives in the `mcp-authorization` skill, and MCP Apps (interactive UI) in the `mcp-apps` skill.

## Versions

| Line                               | Status                |
| ---------------------------------- | --------------------- |
| MCP draft                          | preview (track)       |
| MCP 2026-07-28                     | current               |
| MCP 2025-11-25                     | supported             |
| MCP 2025-06-18                     | supported             |
| MCP 2025-03-26                     | legacy (upgrade from) |
| MCP 2024-11-05                     | legacy (upgrade from) |
| MCP Tasks extension 2026-07-28     | current (tasks)       |
| Skills over MCP extension (stable) | current (skills)      |
| server.json 2025-12-11             | current (registry)    |

`references/versions.md` says which version to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [MCP Specification 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28): its base protocol, versioning, discovery, transport, pattern, server, client, key changes and deprecated features pages, and the 2026-07-28 `schema.ts`: Current, main at 75db1e9.
- [MCP Specification (draft)](https://modelcontextprotocol.io/specification/draft) and its [changelog](https://modelcontextprotocol.io/specification/draft/changelog): Draft, checked 2026-10-05.
- The 2025-11-25 specification, lifecycle and transports pages, and the Key Changes for [2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/changelog), [2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18/changelog) and [2025-03-26](https://modelcontextprotocol.io/specification/2025-03-26/changelog), and the [2024-11-05](https://modelcontextprotocol.io/specification/2024-11-05) specification: Final.
- [MCP Security Best Practices](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices) and the [Extensions Overview](https://modelcontextprotocol.io/extensions/overview): 2026-07-28.
- [MCP Tasks extension](https://raw.githubusercontent.com/modelcontextprotocol/ext-tasks/main/specification/2026-07-28/tasks.md): Stable, main at 5246bc3.
- [Skills over MCP extension](https://raw.githubusercontent.com/modelcontextprotocol/ext-skills/main/specification/stable/skills.mdx): Final, main at 167da6c.
- [MCP Registry v1.8.1](https://github.com/modelcontextprotocol/registry/releases/tag/v1.8.1): the `server.json` 2025-12-11 schema, format reference, changelog and official registry requirements.

## License

MIT
