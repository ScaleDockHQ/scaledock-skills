# The ext-apps TypeScript SDK

Read this when a server, host or view uses `@modelcontextprotocol/ext-apps`. The SDK is a convenience: the protocol can be implemented with plain `postMessage` (MCP Apps overview, Framework support). Sources: the ext-apps README, the v2 migration guide, and `spec.types.ts`, `constants.ts`, `server/index.ts`, `app.ts`, `app-bridge.ts` and `message-transport.ts` at v2.0.3, listed in [Sources](../SKILL.md#sources).

## Packages

The latest release is v2.0.3 (2026-09-25); it changed only example packages, not the library (release v2.0.3).

| Import                                      | Use                                                                                                  |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `@modelcontextprotocol/ext-apps`            | Views: `App`, `PostMessageTransport`, style helpers.                                                 |
| `@modelcontextprotocol/ext-apps/react`      | React hooks: `useApp`, `useHostStyleVariables`, `useHostFonts`, `useDocumentTheme`, `useAutoResize`. |
| `@modelcontextprotocol/ext-apps/app-bridge` | Hosts: `AppBridge`.                                                                                  |
| `@modelcontextprotocol/ext-apps/server`     | Servers: `registerAppTool`, `registerAppResource`, `getUiCapability`.                                |
| `./app-with-deps`, `./react-with-deps`      | Bundles that include client, core and zod, for CDN use.                                              |

(README, Using the SDK; package.json exports; migration guide, Peer dependencies by role.)

Peers by role (migration guide, Peer dependencies by role):

| Role         | Install                                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| View or host | `@modelcontextprotocol/ext-apps`, `@modelcontextprotocol/client@^2.0.0`, `zod@^4.2.0` (+ React for `./react`)                               |
| MCP server   | the above + `@modelcontextprotocol/server@^2.0.0`; for HTTP, `@modelcontextprotocol/node@^2.0.0` and `@modelcontextprotocol/express@^2.0.0` |

Node.js 20+ is required. `@modelcontextprotocol/core` is a required peer that `client` already pulls in.

## Constants

| Constant                  | Value                                                            | Source            |
| ------------------------- | ---------------------------------------------------------------- | ----------------- |
| `EXTENSION_ID`            | `"io.modelcontextprotocol/ui"`                                   | `server/index.ts` |
| `RESOURCE_MIME_TYPE`      | `"text/html;profile=mcp-app"`                                    | `constants.ts`    |
| `RESOURCE_URI_META_KEY`   | `"ui/resourceUri"` (deprecated flat key, kept for compatibility) | `constants.ts`    |
| `LATEST_PROTOCOL_VERSION` | `"2026-01-26"`                                                   | `spec.types.ts`   |

## Server helpers

- `registerAppTool(server, name, config, handler)` wraps `server.registerTool` and normalizes metadata: if only `_meta.ui.resourceUri` is set it also sets the flat key, and if only the flat key is set it also sets `_meta.ui.resourceUri` (server/index.ts).
- `registerAppResource(server, name, uri, config, readCallback)` wraps `server.registerResource` and defaults `mimeType` to `RESOURCE_MIME_TYPE` (server/index.ts). Put `_meta.ui.csp` and `_meta.ui.domain` on the `contents[]` items the read callback returns, not in the config object (CSP and CORS).
- `getUiCapability(clientCapabilities)` returns `clientCapabilities.extensions["io.modelcontextprotocol/ui"]`; check `mimeTypes` includes `RESOURCE_MIME_TYPE` before registering UI tools (server/index.ts; specification, Server Behavior).

## Views: `App`

- `new App(appInfo, appCapabilities = {}, options = { autoResize: true })`, then `app.connect(transport)` (app.ts). Since 0.2.2, `connect()` defaults to `PostMessageTransport(window.parent)` (release notes 0.2.2).
- With `autoResize` (the default) the SDK sends debounced `ui/notifications/size-changed` from a `ResizeObserver` (specification, Container Dimensions).
- Handlers: `ontoolinput`, `ontoolinputpartial`, `ontoolresult`, `ontoolcancelled`, `onhostcontextchanged`, `onteardown`.
- Requests: `callServerTool`, `readServerResource`, `listServerResources`, `sendMessage`, `sendLog`, `updateModelContext`, `openLink`, `requestDisplayMode`, `sendSizeChanged`.
- Host info: `getHostCapabilities()`, `getHostVersion()`, `getHostContext()`.
- Styles: `applyHostStyleVariables`, `applyDocumentTheme`, `applyHostFonts` (styles.ts; specification, Theming).
- Draft features, present in the SDK but preview in the specification: `registerTool`, `oncalltool`, `onlisttools`, `sendToolListChanged`, `createSamplingMessage`, `downloadFile`, `requestTeardown`.

(app.ts method list.)

## Hosts: `AppBridge`

- `new AppBridge(client | null, hostInfo, hostCapabilities, options?)`. With an MCP `Client`, `connect()` forwards the view's MCP requests to the server; with `null`, register handlers such as `oncalltool` and `onreadresource` yourself (app-bridge.ts, constructor).
- Send to the view: `sendToolInput`, `sendToolInputPartial`, `sendToolResult`, `sendToolCancelled`, `setHostContext`, `sendHostContextChange`, `sendSandboxResourceReady`, `teardownResource`.
- Handle from the view: `oninitialized`, `onsizechange`, `onsandboxready`, `onmessage`, `onopenlink`, `onrequestdisplaymode` (the default returns the current mode), `onloggingmessage`, `onupdatemodelcontext`, `oncalltool`, `onlistresources`, `onreadresource`.
- Draft features: `ondownloadfile`, `onrequestteardown`, `oncreatesamplingmessage`, `callTool` and `listTools` on app tools.
- Helpers: `getToolUiResourceUri(tool)` reads `_meta.ui.resourceUri`, falls back to the flat key, and throws when the value does not start with `ui://`; `isToolVisibilityModelOnly` and `isToolVisibilityAppOnly`; `buildAllowAttribute(permissions)`, which joins features with `"; "` (app-bridge.ts).
- `app-bridge.ts` contains no CSP construction, and its forwarding does not check `visibility`. The host's own code filters the agent's tool list, rejects view calls to tools without `"app"`, and builds the sandbox CSP. The README says the repository has no supported host implementation beyond the `basic-host` example.

## Transport

`PostMessageTransport(target, eventSource)`: views pass `window.parent` twice; hosts pass the iframe's `contentWindow`. It drops messages whose `event.source` is not `eventSource`, and posts with target origin `"*"` (message-transport.ts).

## Migrating ext-apps 1.x to 2.x

The wire protocol did not change (migration guide, Host compatibility). Checklist (migration guide, Checklist and Breaking changes):

1. Remove `@modelcontextprotocol/sdk` 1.x and install the split 2.x packages for the role.
2. Replace `sdk/...` imports with `@modelcontextprotocol/server`, `client`, `core`, `node` and `express`.
3. Use zod 4.2+ (or another Standard JSON Schema library); wrap raw zod shapes in `z.object({...})`.
4. Move handlers to the 2.x context (`extra.mcpReq.signal`, `extra.mcpReq.id`, `extra.http?.authInfo`) and to method-name `setRequestHandler("method", { params }, handler)`. The 1.x `(Schema, handler)` form still works with a warning until 3.0.
5. Replace `McpError` checks with `ProtocolError` (remote, numeric code) and `SdkError` (local, string code such as `"REQUEST_TIMEOUT"`).

Host-side deltas a view may notice: resource not found arrives as `-32602` instead of `-32002`; invalid params on `ui/*` requests are `-32602`; error messages lose the `MCP error N:` prefix; an unknown tool through a 2.x server is a JSON-RPC `-32602` error instead of `isError: true` (migration guide, Host-side wire deltas).
