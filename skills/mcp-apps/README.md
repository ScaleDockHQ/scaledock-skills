# mcp-apps

An agent skill for MCP Apps (SEP-1865, the `io.modelcontextprotocol/ui` extension), targeting the Stable 2026-01-26 specification with upgrades from the pre-stable drafts: MCP servers that ship interactive `ui://` HTML views for their tools, hosts that render them in sandboxed iframes, and the views themselves.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill mcp-apps
```

Then ask your agent to "add an interactive UI to our MCP tool" or "review how our host sandboxes MCP Apps views".

## What it covers

- UI resources: the `ui://` scheme, the `text/html;profile=mcp-app` MIME type, and `_meta.ui` CSP domains, permissions, dedicated domain and border preference.
- Tool linkage through `_meta.ui.resourceUri`, `visibility` for model and app, and text fallback for hosts without the extension.
- Capability negotiation on handshake-based and stateless MCP revisions.
- The `postMessage` JSON-RPC bridge: `ui/initialize`, host context and capabilities, tool input, result and cancellation notifications, `ui/message`, `ui/open-link`, `ui/update-model-context`, display modes, size changes, theming and teardown.
- Security: the threat model, the web sandbox proxy, CSP construction and defaults, Permission Policy, message source checks and auditing.
- The `@modelcontextprotocol/ext-apps` SDK 2.x (`App`, `AppBridge`, `registerAppTool`, `registerAppResource`) and the 1.x to 2.x migration.
- What the draft adds (app-provided tools, sampling, `ui/download-file`, view-initiated teardown), and what changed from the pre-stable drafts.

The base protocol is in the `mcp` skill and authorization in the `mcp-authorization` skill.

## Versions

| Line                       | Status                |
| -------------------------- | --------------------- |
| MCP Apps draft             | preview (name)        |
| MCP Apps 2026-01-26        | current               |
| MCP Apps pre-stable drafts | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [MCP Apps specification 2026-01-26](https://github.com/modelcontextprotocol/ext-apps/blob/v2.0.3/specification/2026-01-26/apps.mdx): Stable, at ext-apps v2.0.3.
- [MCP Apps specification draft](https://github.com/modelcontextprotocol/ext-apps/blob/main/specification/draft/apps.mdx): Draft, `main` at 82221c0.
- Pre-stable drafts at [v0.4.2](https://github.com/modelcontextprotocol/ext-apps/blob/v0.4.2/specification/draft/apps.mdx), [bd5a34b](https://github.com/modelcontextprotocol/ext-apps/blob/bd5a34b/specification/draft/apps.mdx) and [c65006a](https://github.com/modelcontextprotocol/ext-apps/blob/c65006a/specification/draft/apps.mdx), and the [specification commit history](https://github.com/modelcontextprotocol/ext-apps/commits/main/specification).
- The ext-apps [README](https://github.com/modelcontextprotocol/ext-apps/blob/v2.0.3/README.md), [release v2.0.3](https://github.com/modelcontextprotocol/ext-apps/releases/tag/v2.0.3), [release notes](https://github.com/modelcontextprotocol/ext-apps/blob/v2.0.3/RELEASES.md), [v2 migration guide](https://github.com/modelcontextprotocol/ext-apps/blob/v2.0.3/docs/migrate-to-2.md), [CSP and CORS guide](https://github.com/modelcontextprotocol/ext-apps/blob/v2.0.3/docs/csp-cors.md) and [SDK source](https://github.com/modelcontextprotocol/ext-apps/tree/v2.0.3/src) at v2.0.3.
- [MCP Apps overview](https://modelcontextprotocol.io/extensions/apps/overview), [MCP Extensions Overview](https://modelcontextprotocol.io/extensions/overview) and [SEP-1865](https://modelcontextprotocol.io/seps/1865-mcp-apps-interactive-user-interfaces-for-mcp) on modelcontextprotocol.io.

## License

MIT
