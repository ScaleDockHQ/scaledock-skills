# Security and sandboxing

Read this when a host renders views, when reviewing a view's network and permission needs, or when auditing an MCP Apps integration. Sources: the MCP Apps 2026-01-26 specification (Sandbox proxy; UI Resource Format, Host Behavior; Security Implications), the SDK's `message-transport.ts` and the CSP and CORS guide, listed in [Sources](../SKILL.md#sources).

## Threat model

Views come from MCP servers that may be untrusted. The specification lists these threats (Security Implications, Threat Model):

- A malicious server delivers harmful HTML.
- A compromised view tries to escape the sandbox.
- A view tries to execute tools it should not.
- A view exfiltrates sensitive host data.
- A view phishes or socially engineers the user.

Other risks: misleading content inside the sandbox, so hosts should clearly mark sandboxed UI boundaries; and CPU or memory exhaustion, so hosts should set resource limits (Security Implications, Other risks).

## Mitigation 1: sandboxed iframes

All view content MUST be rendered in sandboxed iframes with restricted permissions; all communication goes through `postMessage`, with the host in control (Security Implications, Iframe Sandboxing).

### Web hosts: the sandbox proxy

If the host is a web page it MUST wrap the view in an intermediate sandbox proxy (Sandbox proxy):

1. Host and sandbox MUST have different origins.
2. The sandbox MUST have `allow-scripts` and `allow-same-origin`.
3. The sandbox MUST send `ui/notifications/sandbox-proxy-ready` when it can accept the resource.
4. The host MUST then send the raw HTML in `ui/notifications/sandbox-resource-ready` (`html`, optional `sandbox` override for the inner iframe's `sandbox` attribute, `csp`, `permissions`).
5. The sandbox MUST load the HTML in the inner iframe with a CSP that enforces the declared `ui.csp` domains, uses `frame-src 'none'` and `base-uri 'self'` unless `frameDomains` or `baseUriDomains` are given, sets `object-src 'none'`, and applies the restrictive default when no CSP metadata is given. It MAY set the inner iframe's `allow` from `permissions`.
6. The sandbox MUST relay every message whose method does not start with `ui/notifications/sandbox-`, in both directions, including `ui/initialize` and `ui/notifications/initialized`.
7. The sandbox SHOULD NOT create requests of its own, which would need new request IDs.
8. The host MAY forward non-`ui/` methods from the view to the MCP server, and MAY block them or ask the user first; it SHOULD keep the view's MCP connection spec-compliant.

Desktop and native hosts render the view in an iframe directly (Lifecycle, UI Initialization). The `ui/notifications/sandbox-*` names are reserved for the proxy (Reserved Messages (Sandbox Proxy)).

## Mitigation 2: auditable communication

Every view-to-host message is MCP JSON-RPC. Hosts should validate all incoming messages, reject malformed message types, and log view-initiated calls (Security Implications, Auditable Communication).

Check the sender. The SDK's `PostMessageTransport` ignores messages whose `event.source` is not the expected window (`window.parent` in a view, `iframe.contentWindow` in a host), and because it posts with target origin `"*"`, its documentation tells receivers to validate the source (message-transport.ts). A hand-written bridge must do the same.

## Mitigation 3: predeclared resource review

Because UI resources are predeclared and linked from tool metadata, hosts can fetch them before any tool runs. Hosts should look for obviously malicious patterns, hash or sign resources, warn about suspicious content, and keep allowlists or blocklists by hash (Security Implications, Predeclared Resource Review; Resource Discovery, Benefits).

## Mitigation 4: Content Security Policy

Rules (UI Resource Format, Host Behavior; Security Implications, Content Security Policy Enforcement):

- The host MUST build the CSP from the declared domains and MUST enforce it.
- With no `ui.csp`, the host MUST use the restrictive default below.
- The host MAY restrict further but MUST NOT allow undeclared domains, and MUST block connections to them.
- The host SHOULD log CSP configurations, SHOULD warn users when a view needs external domains, and MAY keep global domain allowlists or blocklists.

Restrictive default (UI Resource Format, Host Behavior):

```text
default-src 'none';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
media-src 'self' data:;
connect-src 'none';
```

The sandbox proxy rules also require `object-src 'none'` (Sandbox proxy, item 5); add it to the default as well, as the draft does.

Construction from metadata (Security Implications, CSP Construction from Metadata), where `csp` is `_meta.ui.csp` from the `resources/read` content item:

```text
default-src 'none';
script-src 'self' 'unsafe-inline' <resourceDomains>;
style-src 'self' 'unsafe-inline' <resourceDomains>;
connect-src 'self' <connectDomains>;
img-src 'self' data: <resourceDomains>;
font-src 'self' <resourceDomains>;
media-src 'self' data: <resourceDomains>;
frame-src <frameDomains, or 'none'>;
object-src 'none';
base-uri <baseUriDomains, or 'self'>;
```

Permission Policy: build the iframe `allow` attribute from `permissions` (`camera`, `microphone`, `geolocation`, and `clipboard-write` for `clipboardWrite`). Report what was actually granted in `hostCapabilities.sandbox` (Host Capabilities). Hosts MAY honour permission requests; views SHOULD NOT assume them (UIResourceMeta, `permissions`).

## Dedicated origins and CORS

`_meta.ui.domain` asks the host for a stable sandbox origin, which an API can allowlist for CORS or an OAuth callback. Its format is host-specific, and servers MUST follow each host's documentation (UIResourceMeta, `domain`). Without it the host picks its default origin, typically per conversation. CSP and CORS are separate: CSP is what the browser lets the view request; CORS is what the API accepts (CSP and CORS).

## Tool calls from views

- The host enforces `visibility` and blocks cross-server calls to app-only tools (Resource Discovery, Visibility).
- The host MAY require user approval for any forwarded message (Sandbox proxy, item 8), and MAY ask for consent before `ui/message` (`ui/message`, Host behavior).
- Authorization of the underlying MCP server is defined by the base protocol, not by MCP Apps. Use the `mcp-authorization` skill for that.

## Draft additions to watch

The draft adds security text for app-provided tools: hosts SHOULD attribute app tools clearly, require confirmation for tools with `readOnlyHint: false`, prevent name clashes with server tools, limit tool count, call time and result size (recommended 50 tools, 30 seconds, 10 MB), log registrations and calls, and validate results against declared schemas (draft: Security Implications, App-Provided Tools Security). For `ui/download-file`, hosts SHOULD confirm and sanitize filenames (draft: `ui/download-file`). These are preview text; see [`versions.md`](versions.md).

## Review checklist

- [ ] The view iframe is sandboxed; on the web, the proxy is on a separate origin and has `allow-scripts` and `allow-same-origin`.
- [ ] The CSP is generated from `_meta.ui.csp` alone, falls back to the restrictive default, and includes `object-src 'none'`.
- [ ] No host-wide allowlist adds origins the resource did not declare.
- [ ] `allow` contains only requested and approved features.
- [ ] Both ends filter `postMessage` by source, and the host validates method names and params.
- [ ] View-initiated tool calls, messages and context updates are logged and can be gated by the user.
- [ ] Resource HTML is hashed or reviewed before first render, and the UI boundary is visible to the user.
