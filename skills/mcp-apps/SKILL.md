---
name: mcp-apps
description: >-
  MCP Apps 2026-01-26: build and review interactive UI for MCP servers and
  hosts with the io.modelcontextprotocol/ui extension. Use when adding a ui://
  HTML resource (text/html;profile=mcp-app) to an MCP tool, rendering MCP Apps
  views in a host, or reviewing their security: _meta.ui.resourceUri and
  visibility on tools; csp (connectDomains, resourceDomains, frameDomains,
  baseUriDomains), permissions, domain and prefersBorder on resources; the
  postMessage JSON-RPC bridge (ui/initialize, hostContext, hostCapabilities,
  ui/notifications/tool-input, tool-result, tool-cancelled, ui/message,
  ui/open-link, ui/update-model-context, ui/request-display-mode,
  ui/resource-teardown, size-changed); sandbox proxy iframes, CSP
  construction, display modes, theming variables, capability negotiation and
  text fallback; and the @modelcontextprotocol/ext-apps SDK (App, AppBridge,
  registerAppTool). Targets MCP Apps 2026-01-26, names the MCP Apps draft (app
  tools, sampling, ui/download-file), and upgrades from pre-stable drafts.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# MCP Apps

MCP Apps (SEP-1865, extension id `io.modelcontextprotocol/ui`) is the official Model Context Protocol extension that lets an MCP server ship an interactive HTML view for a tool. The host renders the view in a sandboxed iframe and talks to it over JSON-RPC on `postMessage`. It is published in the `modelcontextprotocol/ext-apps` repository. This skill pins the Stable specification dated 2026-01-26 and produces a server, host or view (the app inside the iframe), or a review of one, that meets its MUST-level rules.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. The specification has no section numbers, so citations name its headings, for example (UI Resource Format, Content Requirements). When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: MCP server that offers UI, host (an MCP client that renders views; a web host or a desktop or native host), or view author. Many tasks touch all three.
- Base MCP revision: the core revision the server and host speak. It changes where the extension capability is negotiated (see [`references/ui-resources.md`](references/ui-resources.md)). The base protocol itself is covered by the `mcp` skill.
- Network needs of the view: which origins it fetches from, loads scripts, styles, fonts or media from, embeds as frames, and whether it needs camera, microphone, geolocation or clipboard write.
- Target version: MCP Apps 2026-01-26 (current, the default; the version the ext-apps README marks Stable). MCP Apps pre-stable drafts are legacy: read them and upgrade from them, never author them. The MCP Apps draft is a preview (posture: name): know its message names and shapes, but do not send draft-only messages. See [`references/versions.md`](references/versions.md).
- Revision: `specification/2026-01-26/apps.mdx` at ext-apps v2.0.3 (commit 82221c0), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, list `specification/` in ext-apps for a new dated folder, read the latest release notes and the commit history of `specification/draft`, then re-read every URL in [Sources](#sources). Update the pins and bump the version.

## Invariants

1. **The extension is negotiated.** MCP Apps is optional and MUST be negotiated through the extensions capability under `io.modelcontextprotocol/ui`; the host's settings MUST list `mimeTypes`, for example `["text/html;profile=mcp-app"]` (Overview; Client<>Server Capability Negotiation, Client (Host) Capabilities).
2. **UI resources are `ui://` HTML.** The URI MUST start with `ui://`, `mimeType` MUST be `text/html;profile=mcp-app`, content MUST be in `text` or base64 `blob`, and it MUST be a valid HTML5 document (UI Resource Format, Content Requirements).
3. **Tools link by `_meta.ui.resourceUri`.** The referenced resource MUST exist on the server, and the host MUST fetch it with `resources/read`. The flat `_meta["ui/resourceUri"]` key is deprecated (Resource Discovery, Behavior and Deprecation notice).
4. **Text still works.** Tools MUST return a meaningful `content` array even when UI is available, and servers SHOULD provide text-only fallback for every UI-enabled tool (Client<>Server Capability Negotiation, Graceful Degradation).
5. **Visibility is enforced by the host.** The host MUST NOT list a tool to the agent unless its `visibility` includes `"model"`, MUST reject a view's `tools/call` for a tool whose `visibility` lacks `"app"`, and app-only tools are never callable across servers (Resource Discovery, Visibility).
6. **Views run sandboxed.** All view content MUST be rendered in sandboxed iframes (Security Implications, Iframe Sandboxing). A web host MUST put a sandbox proxy with a different origin between itself and the view, and the proxy MUST have `allow-scripts` and `allow-same-origin` (Sandbox proxy, items 1 and 2).
7. **CSP comes from declared domains only.** The host MUST build the CSP from `_meta.ui.csp`, MUST use the restrictive default when it is omitted, MUST NOT allow undeclared domains, and MUST block connections to them (UI Resource Format, Host Behavior; Security Implications, Content Security Policy Enforcement).
8. **The view initializes first.** The view MUST send `ui/initialize` with `appCapabilities`; the host MUST NOT send any request or notification to the view before it receives `ui/notifications/initialized` (App Capabilities in `ui/initialize`; Sandbox proxy, item 6).
9. **Tool data is delivered in order.** The host MUST send `ui/notifications/tool-input` with the complete arguments after initialization, at most once and before `tool-result`; MUST stop `tool-input-partial` once `tool-input` is sent; MUST send `tool-result` when execution completes while the view is displayed; and MUST send `tool-cancelled` on cancellation for any reason (MCP Apps Specific Messages, Notifications (Host → View)).
10. **Partial input is not trusted.** The view MUST NOT rely on `tool-input-partial` arguments for critical operations (Notifications (Host → View), `ui/notifications/tool-input-partial`).
11. **Teardown is announced.** The host MUST send `ui/resource-teardown` before tearing down a view for any reason, and SHOULD wait for the response to prevent data loss (Notifications (Host → View), `ui/resource-teardown`).
12. **Display modes are declared on both sides.** The view MUST declare its modes in `appCapabilities.availableDisplayModes`, MUST check the host's `availableDisplayModes` before requesting a change, and MUST handle a different mode in the reply; the host MUST NOT switch to an undeclared mode and MUST return the resulting mode (Display Modes, Requirements).
13. **Flexible containers follow the view.** When `containerDimensions` has no fixed `height` or `width`, the host MUST listen for `ui/notifications/size-changed` and resize the iframe (Container Dimensions, Host Behavior).
14. **The sandbox proxy relays, the host decides.** The proxy MUST forward every message whose method does not start with `ui/notifications/sandbox-`, and SHOULD NOT create requests itself; the host MAY forward non-`ui/` methods to the MCP server and MAY block them or ask the user (Sandbox proxy, items 6 to 8).

## Workflow

1. **Pick the version.** Target MCP Apps 2026-01-26. If the code uses `text/vnd.mcp.ui+html`, `text/html+mcp`, the flat `ui/resourceUri` key or `viewport`, it was written against a pre-stable draft: plan an upgrade.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target is recorded as MCP Apps 2026-01-26, not a pre-stable or draft text.
2. **Negotiate the extension.** Host: advertise `io.modelcontextprotocol/ui` with `mimeTypes`. Server: check it before offering UI, and advertise the extension where the base revision expects server capabilities.
   -> [`references/ui-resources.md`](references/ui-resources.md)
   ✓ A host without the extension still gets usable text results from every tool.
3. **Declare the UI resource (server).** Serve a `ui://` resource with the profile MIME type and an HTML5 document, and put `csp`, `permissions`, `domain` and `prefersBorder` under `_meta.ui` on the `resources/read` content item.
   -> [`references/ui-resources.md`](references/ui-resources.md)
   ✓ `resources/read` on the URI returns one content item with `mimeType: "text/html;profile=mcp-app"` and every origin the view uses is declared.
4. **Link tools to the resource (server).** Set `_meta.ui.resourceUri`, choose `visibility`, and split `content` (for the model), `structuredContent` (for the view) and `_meta` in results.
   -> [`references/ui-resources.md`](references/ui-resources.md)
   ✓ Every `resourceUri` resolves, and app-only tools carry `visibility: ["app"]`.
5. **Render in a sandbox (host).** Fetch the resource, build the CSP and Permission Policy, and render it in a sandboxed iframe; on the web, through a sandbox proxy on a separate origin.
   -> [`references/security-and-sandbox.md`](references/security-and-sandbox.md)
   ✓ A `fetch` from the view to an undeclared origin is blocked, and the view cannot reach the host's DOM.
6. **Run the bridge (host and view).** Answer `ui/initialize` with `protocolVersion`, `hostInfo`, `hostCapabilities` and `hostContext`; wait for `initialized`; send tool input, result or cancellation; proxy `tools/call` and `resources/read`; handle teardown.
   -> [`references/host-bridge.md`](references/host-bridge.md)
   ✓ A message trace shows `ui/initialize`, `ui/notifications/initialized`, `tool-input`, then `tool-result` or `tool-cancelled`, and nothing sent to the view before `initialized`.
7. **Build the view.** Declare `appCapabilities`, apply `hostContext` (theme, styles, fonts, container dimensions, display mode), report size changes, and use `ui/message`, `ui/open-link`, `ui/update-model-context` and `ui/request-display-mode` only where the host advertises support.
   -> [`references/host-bridge.md`](references/host-bridge.md)
   ✓ The view renders with its own fallback CSS variables when the host passes no `styles`.
8. **Review security.** Walk the threat model: malicious HTML, sandbox escape, unauthorized tool calls, exfiltration, phishing, resource exhaustion; plus `postMessage` source checks and logging.
   -> [`references/security-and-sandbox.md`](references/security-and-sandbox.md)
   ✓ Each threat has a mitigation or a reason it does not apply.
9. **Map to the SDK if it is used.** Use `registerAppTool` and `registerAppResource` on servers, `App` in views and `AppBridge` in hosts, at ext-apps 2.x on the split MCP SDK 2.x packages.
   -> [`references/sdk.md`](references/sdk.md)
   ✓ The installed packages match the role table, and no code depends on `@modelcontextprotocol/sdk` 1.x next to ext-apps 2.x.
10. **Upgrade** (only when asked). Follow the upgrade section from the pre-stable drafts to MCP Apps 2026-01-26, or the SDK 1.x to 2.x checklist.
    -> [`references/versions.md`](references/versions.md)
    ✓ The upgraded server, host or view passes the Verify list below and renders the same view.

## Verify before done

- [ ] Every UI resource URI starts with `ui://`, and `resources/read` returns `mimeType` exactly `text/html;profile=mcp-app` with `text` or `blob`.
- [ ] Every tool with `_meta.ui.resourceUri` points at an existing resource and returns meaningful `content` text.
- [ ] The host hides tools without `"model"` from the agent and rejects view calls to tools without `"app"` or on another server.
- [ ] With no `_meta.ui.csp`, the view runs under the restrictive default policy; with it, only the declared origins are allowed.
- [ ] The web host serves the sandbox proxy from an origin different from the host's.
- [ ] No message reaches the view before `ui/notifications/initialized`; `tool-input` arrives once, before `tool-result`.
- [ ] `ui/resource-teardown` is sent and awaited before the iframe is removed.
- [ ] `ui/request-display-mode` returns the mode actually set, and never an undeclared one.
- [ ] Both ends check `event.source` (or use a transport that does) before handling a `postMessage`.
- [ ] Nothing that exists only in the MCP Apps draft (app tools, `sampling/createMessage`, `ui/download-file`, `ui/notifications/request-teardown`) is required for the app to work.

## Reference index

- **`references/versions.md`**: the version lines, which to use, what changed from the pre-stable drafts to 2026-01-26 and from 2026-01-26 to the draft, the upgrade steps, and the draft. Load for steps 1 and 10.
- **`references/ui-resources.md`**: the UI resource format and `_meta.ui` fields, tool linkage and visibility, capability negotiation on handshake and stateless MCP revisions, graceful degradation, and data passing. Load for steps 2 to 4.
- **`references/host-bridge.md`**: the `postMessage` transport, `ui/initialize` and its result, host context and capabilities, container dimensions, display modes, theming, every `ui/` message, and the lifecycle. Load for steps 6 and 7.
- **`references/security-and-sandbox.md`**: the threat model, the sandbox proxy, CSP construction and defaults, permissions, dedicated domains, message validation and auditing. Load for steps 5 and 8.
- **`references/sdk.md`**: the `@modelcontextprotocol/ext-apps` packages by role, the server helpers, `App`, `AppBridge`, `PostMessageTransport`, constants, and the 1.x to 2.x migration. Load for step 9.

## Related skills

- `mcp`, for the base protocol, transports, tools and resources these UI resources build on: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp`
- `mcp-authorization`, for protecting the MCP server and its tools with OAuth: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp-authorization`
- `ag-ui`, an alternative that streams agent runs and generative UI to a front end without MCP: `npx skills add ScaleDockHQ/scaledock-skills --skill ag-ui`
- `a2ui`, an alternative where agents send declarative UI descriptions instead of HTML: `npx skills add ScaleDockHQ/scaledock-skills --skill a2ui`
- `webmcp`, for web pages that register tools in the browser, which inspired the draft's app tools: `npx skills add ScaleDockHQ/scaledock-skills --skill webmcp`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [MCP Apps specification 2026-01-26](https://github.com/modelcontextprotocol/ext-apps/blob/v2.0.3/specification/2026-01-26/apps.mdx): Stable (2026-01-26), ext-apps v2.0.3 at commit 82221c0 (identical to `main`), checked 2026-10-05.
- [MCP Apps specification draft](https://github.com/modelcontextprotocol/ext-apps/blob/main/specification/draft/apps.mdx): Draft, `main` at 82221c0 (last spec change c55a3a2, 2026-07-22); Draft posture: name, checked 2026-10-05.
- [ext-apps specification commit history](https://github.com/modelcontextprotocol/ext-apps/commits/main/specification): commit log from d0dbea3 (2025-11-21) to c55a3a2 (2026-07-22), checked 2026-10-05.
- [MCP Apps pre-stable draft at v0.4.2](https://github.com/modelcontextprotocol/ext-apps/blob/v0.4.2/specification/draft/apps.mdx): Draft, v0.4.2 (2026-01-26), checked 2026-10-05.
- [MCP Apps draft at bd5a34b](https://github.com/modelcontextprotocol/ext-apps/blob/bd5a34b/specification/draft/apps.mdx): Draft, commit bd5a34b (2025-11-21), `text/vnd.mcp.ui+html`, checked 2026-10-05.
- [MCP Apps draft at c65006a](https://github.com/modelcontextprotocol/ext-apps/blob/c65006a/specification/draft/apps.mdx): Draft, commit c65006a (2025-11-21), `text/html+mcp`, checked 2026-10-05.
- [ext-apps README](https://github.com/modelcontextprotocol/ext-apps/blob/v2.0.3/README.md): Released, v2.0.3, checked 2026-10-05.
- [ext-apps release v2.0.3](https://github.com/modelcontextprotocol/ext-apps/releases/tag/v2.0.3): Released, v2.0.3 (2026-09-25), checked 2026-10-05.
- [ext-apps release notes (0.2.2 and 0.3.0)](https://github.com/modelcontextprotocol/ext-apps/blob/v2.0.3/RELEASES.md): Released, RELEASES.md at v2.0.3, checked 2026-10-05.
- [Migrating from ext-apps 1.x to 2.x](https://github.com/modelcontextprotocol/ext-apps/blob/v2.0.3/docs/migrate-to-2.md): Documentation, v2.0.3, checked 2026-10-05.
- [CSP and CORS](https://github.com/modelcontextprotocol/ext-apps/blob/v2.0.3/docs/csp-cors.md): Documentation, v2.0.3, checked 2026-10-05.
- [ext-apps SDK source: spec.types.ts](https://github.com/modelcontextprotocol/ext-apps/blob/v2.0.3/src/spec.types.ts): Released, v2.0.3, checked 2026-10-05.
- [ext-apps SDK source: constants.ts](https://github.com/modelcontextprotocol/ext-apps/blob/v2.0.3/src/constants.ts): Released, v2.0.3, checked 2026-10-05.
- [ext-apps SDK source: server helpers](https://github.com/modelcontextprotocol/ext-apps/blob/v2.0.3/src/server/index.ts): Released, v2.0.3, checked 2026-10-05.
- [ext-apps SDK source: App, AppBridge and PostMessageTransport](https://github.com/modelcontextprotocol/ext-apps/tree/v2.0.3/src): Released, v2.0.3 (`app.ts`, `app-bridge.ts`, `message-transport.ts`, `styles.ts`), checked 2026-10-05.
- [MCP Apps overview](https://modelcontextprotocol.io/extensions/apps/overview): Documentation page, checked 2026-10-05.
- [MCP Extensions Overview](https://modelcontextprotocol.io/extensions/overview): Documentation page (negotiation shown for MCP 2026-07-28), checked 2026-10-05.
- [SEP-1865: MCP Apps](https://modelcontextprotocol.io/seps/1865-mcp-apps-interactive-user-interfaces-for-mcp): SEP, Final, Extensions Track, checked 2026-10-05.
