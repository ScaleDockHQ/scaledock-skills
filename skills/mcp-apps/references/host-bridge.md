# The host and view bridge

Read this when implementing the JSON-RPC channel between a host and a view: the handshake, host context, tool data, view requests, display modes, theming and teardown. Sources: the MCP Apps 2026-01-26 specification and the SDK's `spec.types.ts` at v2.0.3, listed in [Sources](../SKILL.md#sources). Citations name specification headings.

## Transport and roles

- Views and hosts exchange JSON-RPC 2.0 over `postMessage` (Communication Protocol).
- The view acts as an MCP client; the host acts as an MCP server that can proxy the real one (Transport Layer). No SDK is needed: plain `postMessage` with `jsonrpc`, `id`, `method` and `params` works.
- On a web host, a sandbox proxy iframe sits between them and relays messages; see [`security-and-sandbox.md`](security-and-sandbox.md).
- The specification's sample posts with target origin `'*'`. The SDK's `PostMessageTransport` also posts with `"*"` and filters incoming messages by `event.source`, telling receivers to validate the source (message-transport.ts). Do the same in a hand-written bridge.

## Standard MCP messages a view may use

| Method                  | Direction            | Note                                       |
| ----------------------- | -------------------- | ------------------------------------------ |
| `tools/call`            | view → host → server | Subject to `visibility` and host approval. |
| `resources/read`        | view → host → server |                                            |
| `notifications/message` | view → host          | Logging.                                   |
| `ping`                  | either               | Health check.                              |

(Standard MCP Messages.) The host MAY forward any non-`ui/` method to the server, and MAY block it or ask the user (Sandbox proxy, item 8).

## Handshake

1. The view sends `ui/initialize`. It MUST include `appCapabilities` (App Capabilities in `ui/initialize`). The SDK types the params as `appInfo` (name and version), `appCapabilities` and `protocolVersion` (spec.types.ts, `McpUiInitializeRequest`).
2. The host answers with `McpUiInitializeResult`: `protocolVersion`, `hostInfo`, `hostCapabilities`, and `hostContext`, which the host SHOULD fill (Host Context in `McpUiInitializeResult`; spec.types.ts, `McpUiInitializeResult`).
3. The view sends `ui/notifications/initialized`. The host MUST NOT send anything to the view before this (Sandbox proxy, item 6).

`appCapabilities` (`McpUiAppCapabilities`): `experimental`, `tools` (`listChanged`), and `availableDisplayModes` (any of `"inline"`, `"fullscreen"`, `"pip"`).

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2026-01-26",
    "hostCapabilities": { "openLinks": {}, "serverTools": {}, "logging": {} },
    "hostInfo": { "name": "example-host", "version": "1.0.0" },
    "hostContext": {
      "theme": "dark",
      "displayMode": "inline",
      "containerDimensions": { "width": 400, "maxHeight": 600 }
    }
  }
}
```

### Host capabilities

| Key               | Meaning                                                                              |
| ----------------- | ------------------------------------------------------------------------------------ |
| `experimental`    | Experimental features.                                                               |
| `openLinks`       | The host can open external URLs (`ui/open-link`).                                    |
| `serverTools`     | The host proxies `tools/call` to the server; `listChanged` for `tools/list_changed`. |
| `serverResources` | The host proxies resource reads; `listChanged` for `resources/list_changed`.         |
| `logging`         | The host accepts log messages.                                                       |
| `sandbox`         | The `permissions` and `csp` domains the host actually granted.                       |

(Host Capabilities.) A view uses a feature only when the matching capability is present, and compares `sandbox.csp` and `sandbox.permissions` with what it asked for.

### Host context

`HostContext` fields, all optional (Host Context in `McpUiInitializeResult`): `toolInfo` (`id` of the `tools/call` request and the `tool`), `theme` (`"light"` or `"dark"`), `styles` (`variables`, `css.fonts`), `displayMode`, `availableDisplayModes`, `containerDimensions`, `locale` (BCP 47), `timeZone` (IANA), `userAgent`, `platform` (`"web"`, `"desktop"`, `"mobile"`), `deviceCapabilities` (`touch`, `hover`), `safeAreaInsets`.

The host MAY send `ui/notifications/host-context-changed` with a partial `HostContext` when anything changes; the view SHOULD merge it into its current state (Notifications (Host → View), `ui/notifications/host-context-changed`).

## Container dimensions

Each axis is independent (Container Dimensions, Dimension Modes):

| Given                     | Mode      | Who sizes                    |
| ------------------------- | --------- | ---------------------------- |
| `height` or `width`       | fixed     | The host; the view fills it. |
| `maxHeight` or `maxWidth` | flexible  | The view, up to the maximum. |
| neither                   | unbounded | The view, with no limit.     |

With flexible dimensions the host MUST listen for `ui/notifications/size-changed` (`width`, `height` in pixels) and resize the iframe (Container Dimensions, Host Behavior). The view SHOULD send it when its rendered size changes, for example from a `ResizeObserver` (Notifications, `ui/notifications/size-changed`).

## Display modes

`inline` (default, in the content flow), `fullscreen`, `pip` (floating overlay) (Display Modes).

- View: MUST declare its modes in `appCapabilities.availableDisplayModes`, MUST check the host's `availableDisplayModes` before `ui/request-display-mode`, and MUST handle a reply mode that differs from the request.
- Host: MUST NOT switch to a mode the view did not declare (when it declared any), MUST return the resulting mode, SHOULD return the current mode when the request is unavailable, and MAY decline requests for undeclared modes. Changes are announced with `host-context-changed` carrying `displayMode`.

(Display Modes, Requirements.)

## Theming

- Hosts MAY pass any subset of the standardized CSS variables in `styles.variables` (colours for background, text, border and ring; font families, weights, sizes and line heights; border radius and width; shadows), and SHOULD use `light-dark()` for theme-aware values (Theming, Host Behavior).
- Views SHOULD define fallback values for every variable they use, so they degrade cleanly when the host omits some or all (Theming, View Behavior).
- `styles.css.fonts` may contain `@font-face` rules or `@import` statements (Theming, Custom Fonts). The view's `font-src` and `style-src` are built from `resourceDomains` (Security Implications, CSP Construction from Metadata), so a font origin outside it is blocked.
- Spacing variables are deliberately not standardized (Rationale, Design Decision 4).

## Messages

All errors from these requests use JSON-RPC errors; the specification's examples use `-32000` as an implementation-defined code.

### View → host requests

| Method                    | Params                                            | Result     | Host behaviour                                                                                                                                                                |
| ------------------------- | ------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ui/open-link`            | `url`                                             | `{}`       | SHOULD open in the user's browser or a new tab; may deny.                                                                                                                     |
| `ui/message`              | `role: "user"`, `content` (text block)            | `{}`       | SHOULD add it to the conversation, keeping the role; MAY ask for consent. Triggers a follow-up.                                                                               |
| `ui/request-display-mode` | `mode`                                            | `{ mode }` | See Display modes.                                                                                                                                                            |
| `ui/update-model-context` | `content?` (content blocks), `structuredContent?` | `{}`       | SHOULD give it to the model in later turns; each update overwrites the last; MAY defer to the next user message; SHOULD send only the last of several; MAY dedupe or show it. |

(MCP Apps Specific Messages, Requests (View → Host).) Use `ui/update-model-context` to keep the model informed without starting a turn, `ui/message` to start one, and `notifications/message` only for logs.

### Host → view notifications

| Method                                  | Params                | Rule                                                                                                   |
| --------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------ |
| `ui/notifications/tool-input-partial`   | `arguments`           | MAY, zero or more times while arguments stream; best-effort closed JSON; MUST stop after `tool-input`. |
| `ui/notifications/tool-input`           | `arguments`           | MUST, with complete arguments, after initialization, at most once, before `tool-result`.               |
| `ui/notifications/tool-result`          | `CallToolResult`      | MUST when execution completes, if the view is displayed during execution.                              |
| `ui/notifications/tool-cancelled`       | `reason`              | MUST on cancellation for any reason (user, sampling error, classifier, …).                             |
| `ui/notifications/host-context-changed` | partial `HostContext` | MAY on any change.                                                                                     |

The view MAY ignore partial input, SHOULD tolerate fields that change between partials, and MUST NOT rely on them for critical operations (Notifications (Host → View)).

### Host → view request

`ui/resource-teardown` with `reason`; the view answers `{}` or an error. The host MUST send it before tearing down for any reason and SHOULD wait for the reply (Notifications (Host → View), `ui/resource-teardown`).

### View → host notification

`ui/notifications/size-changed`, above.

## Lifecycle

1. Discovery: the host lists resources and tools and sees `_meta.ui` on tools.
2. Initialization: the host calls the tool and, in parallel, renders the view (directly on desktop or native hosts; through the sandbox proxy on web hosts); handshake; optional `tool-input-partial`; `tool-input`; then `tool-result` or `tool-cancelled`.
3. Interactive phase: the view calls tools, reads resources, sends messages, context updates, logs and size changes; the host pushes context changes. A view-initiated `tools/call` gets its own `tool-input` and `tool-result` notifications.
4. Cleanup: `ui/resource-teardown`, the view's reply, then the host removes the iframe and listeners. Cleanup can happen at any point after initialization.

(Lifecycle, diagrams 1 to 4.) Data passing in detail: the view gets the original `tools/call` arguments in `tool-input` and the server's result unchanged in `tool-result`, and can call tools again for fresh data (Data Passing).
