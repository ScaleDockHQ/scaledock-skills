# UI resources, tool linkage and negotiation

Read this when a server declares UI resources, links tools to them, or decides whether to offer UI to a host. Sources: the MCP Apps 2026-01-26 specification and the MCP Extensions Overview page, listed in [Sources](../SKILL.md#sources). Citations name specification headings.

## Capability negotiation

The extension identifier is `io.modelcontextprotocol/ui`, and the `ui://` prefix and the identifier are reserved for MCP Apps (Extension Identifier; Reservations in MCP). The extension is optional and MUST be negotiated explicitly (Overview).

Host settings object:

| Field       | Rule                                                                            |
| ----------- | ------------------------------------------------------------------------------- |
| `mimeTypes` | REQUIRED. Supported content types, for example `["text/html;profile=mcp-app"]`. |

`features` and `sandboxPolicies` are named as possible future settings; do not send them (Client<>Server Capability Negotiation, Extension Settings).

Where the capability goes depends on the base MCP revision:

- **Handshake revisions (2025-11-25 and earlier).** The host puts it in `initialize` under `params.capabilities.extensions["io.modelcontextprotocol/ui"]` (Client<>Server Capability Negotiation, Client (Host) Capabilities).
- **MCP 2026-07-28 (stateless).** Clients send capabilities on every request in `_meta["io.modelcontextprotocol/clientCapabilities"].extensions`, and servers advertise `"io.modelcontextprotocol/ui": {}` under `capabilities.extensions` in the `server/discover` result (Extensions Overview, Negotiation). The base rules for this are in the `mcp` skill.

Server behaviour:

- Servers SHOULD check the client capabilities before registering UI-enabled tools, and MAY register different tool variants per host capability (Server Behavior; Graceful Degradation).
- If the host does not support MCP Apps, a tool with `_meta.ui.resourceUri` behaves as a standard tool (Resource Discovery, Behavior). So keeping the metadata on the tool and returning good `content` is always safe.
- Tools MUST return a meaningful `content` array even when UI is available, and servers SHOULD provide a text-only fallback for every UI-enabled tool (Graceful Degradation).
- When only one side supports an extension, the supporting side falls back to core behaviour or rejects the request if the extension is mandatory (Extensions Overview, Graceful Degradation).

## The UI resource

A UI resource is a standard MCP resource with these conventions (UI Resource Format):

| Field         | Rule                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------- |
| `uri`         | MUST use the `ui://` scheme, for example `ui://weather-server/dashboard-template`.                 |
| `name`        | Display name for listing.                                                                          |
| `description` | Optional.                                                                                          |
| `mimeType`    | SHOULD be `text/html;profile=mcp-app` on the declaration; MUST be on the `resources/read` content. |
| `_meta.ui`    | Optional `UIResourceMeta`: `csp`, `permissions`, `domain`, `prefersBorder`.                        |

Content requirements (UI Resource Format, Content Requirements):

- The URI MUST start with `ui://`.
- `mimeType` MUST be `text/html;profile=mcp-app`; other types are reserved for future extensions.
- Content MUST be in `text` (a string) or `blob` (base64).
- Content MUST be a valid HTML5 document.

In 2026-01-26 the `_meta.ui` used for CSP construction is read from the content item of the `resources/read` result (Security Implications, CSP Construction from Metadata). Put it there. (The draft also allows it on the `resources/list` entry; see [`versions.md`](versions.md).)

### `_meta.ui` fields

`csp` (`McpUiResourceCsp`); every field is a list of origins and an empty or omitted list is the secure default:

| Field             | CSP directive                                                                                                              | Omitted means                |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `connectDomains`  | `connect-src` (fetch, XHR, WebSocket)                                                                                      | no external connections      |
| `resourceDomains` | `img-src`, `script-src`, `style-src`, `font-src`, `media-src`; wildcard subdomains such as `https://*.example.com` allowed | no external static resources |
| `frameDomains`    | `frame-src`                                                                                                                | `frame-src 'none'`           |
| `baseUriDomains`  | `base-uri`                                                                                                                 | `base-uri 'self'`            |

`permissions`: each is an empty object that requests a Permission Policy feature. Hosts MAY honour them through the iframe `allow` attribute, and apps SHOULD NOT assume they are granted; use feature detection (UIResourceMeta, `permissions`).

| Key              | Permission Policy feature |
| ---------------- | ------------------------- |
| `camera`         | `camera`                  |
| `microphone`     | `microphone`              |
| `geolocation`    | `geolocation`             |
| `clipboardWrite` | `clipboard-write`         |

`domain`: an optional dedicated sandbox origin, for OAuth callbacks, CORS allowlists or API key allowlists. Its format and validation are host-dependent, and servers MUST consult the host's documentation. Omitted, the host uses its default sandbox origin, typically per conversation (UIResourceMeta, `domain`). The SDK guide adds: CSP controls what the browser allows; CORS controls what the API allows. Public APIs with `Access-Control-Allow-Origin: *` or API-key auth need no `domain`; APIs that allowlist origins do (CSP and CORS).

`prefersBorder`: `true` asks for a visible border and background, `false` for none, omitted lets the host decide. Set it explicitly, because host defaults vary (UIResourceMeta, `prefersBorder`).

The view's HTML runs with no same-origin server, so every origin must be declared, including where bundled scripts and styles are served from (`localhost` in development) (spec.types.ts, `McpUiResourceCsp`).

### Example

```json
{
  "contents": [
    {
      "uri": "ui://weather-server/dashboard-template",
      "mimeType": "text/html;profile=mcp-app",
      "text": "<!DOCTYPE html><html>...</html>",
      "_meta": {
        "ui": {
          "csp": {
            "connectDomains": ["https://api.openweathermap.org"],
            "resourceDomains": ["https://cdn.jsdelivr.net"]
          },
          "prefersBorder": true
        }
      }
    }
  ]
}
```

## Linking tools to UI

Tools carry `McpUiToolMeta` under `_meta.ui` (Resource Discovery):

| Field         | Rule                                                        |
| ------------- | ----------------------------------------------------------- |
| `resourceUri` | URI of the UI resource used to render this tool's results.  |
| `visibility`  | Array of `"model"` and `"app"`. Default `["model", "app"]`. |

The flat `_meta["ui/resourceUri"]` is deprecated; use `_meta.ui.resourceUri` (Resource Discovery, Deprecation notice).

Behaviour (Resource Discovery, Behavior):

- The resource MUST exist on the server.
- The host MUST fetch it with `resources/read`, and MAY prefetch and cache it.
- Servers MAY omit UI-only resources from `resources/list` and `notifications/resources/list_changed`, since tools point to them.

Visibility (Resource Discovery, Visibility):

- `"model"`: visible to and callable by the agent. `"app"`: callable by views from the same server connection only.
- The host MUST NOT include a tool in the agent's tool list when its visibility lacks `"model"`.
- The host MUST reject a view's `tools/call` for a tool whose visibility lacks `"app"`.
- Cross-server tool calls are always blocked for app-only tools.

Use `visibility: ["app"]` for refresh buttons and form submissions that the model should not see (Data Passing, Interactive Updates).

```json
{
  "name": "refresh_dashboard",
  "description": "Refresh dashboard data",
  "inputSchema": { "type": "object" },
  "_meta": {
    "ui": {
      "resourceUri": "ui://weather-server/dashboard-template",
      "visibility": ["app"]
    }
  }
}
```

## Shaping tool results

The host forwards the `CallToolResult` to the view as `ui/notifications/tool-result` (Data Passing). Split it by audience (Data Passing, Best Practices):

- `content`: the text for the model and for text-only hosts.
- `structuredContent`: data for the view; not added to model context.
- `_meta`: timestamps, versions and other metadata not meant for the model.

Do not put data only in `structuredContent` and leave `content` empty: invariant 4 in `SKILL.md` forbids it.

## Common mistakes

- `mimeType: "text/html"` without the profile parameter, or a pre-stable value such as `text/html+mcp`.
- A `resourceUri` that is not served by `resources/read`, or uses `https://` instead of `ui://`.
- Fetching from an API without listing it in `connectDomains`; loading a CDN script without `resourceDomains`.
- Relying on `permissions` being granted.
- Hiding a tool from the model with `visibility: ["app"]` and expecting a view from another server to call it.
