# Versions and upgrades

Read this when choosing which MCP Apps text to build to, reading a server, host or view written against an earlier draft, upgrading one, or checking the draft for upcoming changes. Sources: the 2026-01-26 and draft specifications, the pre-stable drafts at v0.4.2, bd5a34b and c65006a, the specification commit history, the ext-apps README, release notes and v2 migration guide, listed in [Sources](../SKILL.md#sources). The specification has no section numbers, so citations name its headings.

## Version lines

MCP Apps versions are dated folders under `specification/` in ext-apps. The README lists `2026-01-26` as Stable and `draft` as Development (README, Specification). The extension is versioned separately from the core MCP revision, and the SDK (`@modelcontextprotocol/ext-apps` 2.0.3) has its own semver: `LATEST_PROTOCOL_VERSION` in the SDK is `"2026-01-26"` (spec.types.ts).

| Id              | Line                       | Status  | Revision                                                    | Posture | Summary                                                                                                      |
| --------------- | -------------------------- | ------- | ----------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `draft-preview` | MCP Apps draft             | preview | `specification/draft` at 82221c0 (last change 2026-07-22)   | name    | Adds app-provided tools, sampling, `ui/download-file`, view-initiated teardown and listing-level `_meta.ui`. |
| `2026-01-26`    | MCP Apps 2026-01-26        | current | `specification/2026-01-26`, Stable (2026-01-26), SDK v2.0.3 |         | The first Stable text. The default target.                                                                   |
| `pre-stable`    | MCP Apps pre-stable drafts | legacy  | `specification/draft` from 2025-11-21 to v0.4.2 (SDK 0.x)   |         | SEP-1865 drafts before Stable: older MIME types, flat `ui/resourceUri`, `viewport`, renamed messages.        |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Before SEP-1865 there was MCP-UI, a community project whose patterns the specification replaced. The ext-apps repository holds no MCP-UI specification text, so it is not a line here; the specification lists the differences, which the pre-stable upgrade below covers (Lifecycle, Key Differences from Pre-SEP MCP-UI; Rationale, Design Decisions 1 and 2).

## Which version to use

- Build servers, hosts and views to MCP Apps 2026-01-26.
- Treat anything written to the pre-stable drafts as input to an upgrade. Hosts may still meet the deprecated flat `_meta["ui/resourceUri"]` key, which the SDK still reads and writes for compatibility (constants.ts, `RESOURCE_URI_META_KEY`; server/index.ts, `registerAppTool`).
- Follow the draft only to reserve its names and shapes. Its posture is **name**: do not send a draft-only request or notification, do not depend on one being answered, and do not reuse its method names or capability keys for anything else.

## What changed

### MCP Apps draft (since 2026-01-26)

From the draft text compared with 2026-01-26, and the specification commit history:

- **App-provided tools.** A view that declares `appCapabilities.tools` lets the host send it `tools/call` and `tools/list`, and the view MAY send `notifications/tools/list_changed`. The view MUST implement the handlers when it declares the capability; app tools MUST be tied to the app lifecycle, hosts MUST NOT persist them across sessions, and calling a tool of a closed app MUST return an error (draft: Requests (Host → App); App-Provided Tools; Security Implications, App-Provided Tools Security). App `tools/call` MAY be task-augmented (draft: Long-Running App Tools).
- **Sampling.** The view MAY send `sampling/createMessage`; it MUST check `hostCapabilities.sampling` first, and `hostCapabilities.sampling.tools` before including `tools` (draft: Standard MCP Messages, Sampling).
- **`ui/download-file`.** A host-mediated download with `EmbeddedResource` or `ResourceLink` contents, gated by `hostCapabilities.downloadFile`; hosts SHOULD confirm and sanitize filenames (draft: MCP Apps Specific Messages, `ui/download-file`).
- **`ui/notifications/request-teardown`.** The view MAY ask to be torn down; if the host accepts, it MUST still send `ui/resource-teardown` (draft: Notifications (View → Host)).
- **New host capabilities.** `downloadFile`, `updateModelContext` and `message` (each with content modalities), and `sampling`; `experimental` becomes `Record<string, object>` on both sides (draft: Host Capabilities; App Capabilities).
- **Metadata location.** `_meta.ui` may also appear on the `resources/list` entry; the content item wins, and hosts MUST check both (draft: UI Resource Format, Metadata Location).
- **Defaults.** `object-src 'none'` is added to the restrictive default CSP (draft: Host Behavior; commit 2ca6a59). The sandbox's `sandbox-proxy-ready` and the host's `sandbox-resource-ready` drop from MUST to SHOULD (draft: Sandbox proxy, items 3 and 4; commit c60ee35).

### MCP Apps 2026-01-26 (since the pre-stable drafts)

The v0.4.2 draft and the 2026-01-26 text differ only in the status line and the example `protocolVersion` (`"2025-06-18"` in v0.4.2, `"2026-01-26"` in Stable). Earlier drafts differ more. From the commit history, the 0.2.2 and 0.3.0 release notes, and the early draft texts:

- **MIME type.** `text/vnd.mcp.ui+html` (draft at bd5a34b), then `text/html+mcp` (draft at c65006a), then `text/html;profile=mcp-app` (commit 0af1532, "use profile parameter for MIME type instead of suffix").
- **Tool metadata.** The flat `_meta["ui/resourceUri"]` key became nested `_meta.ui.resourceUri`, and `visibility` was added (0.2.2 release notes, PR #131).
- **Host context.** `viewport` was replaced by `containerDimensions` (0.3.0 release notes, PR #153); theming variables and `styles.css.fonts` were added (0.2.2 release notes).
- **Message names.** `ui/tool-cancelled` became `ui/notifications/tool-cancelled` (commit ad19d2f); size and host-context notifications were renamed to `ui/notifications/size-changed` and `ui/notifications/host-context-changed` (commits bb24318, ba1a27e, c587e07); the sandbox-ready notification name was fixed (0.2.2 release notes, PR #160).
- **Removed values.** The `carousel` display mode (commit a9b96cd) and the `system` theme (commit 9d8b705). `media-src` was added to the CSP (commit 4953cd3).
- **From MCP-UI.** `ui/initialize` and `ui/notifications/initialized` replace `iframe-ready`, capabilities come in the initialize result, tool data comes in notifications, and resources are predeclared instead of embedded in tool results (Lifecycle, Key Differences from Pre-SEP MCP-UI; Rationale, Design Decision 1).

### SDK 1.x to 2.x (no wire change)

ext-apps 2.x moved to the split MCP TypeScript SDK 2.x packages. The `ui/*` messages are byte-identical: a 2.x view runs in a 1.x host and a 2.x host renders 1.x views (Migrating from ext-apps 1.x to 2.x, Host compatibility). See [`sdk.md`](sdk.md) for the checklist.

## Upgrading

### pre-stable to 2026-01-26

1. Change the version marker: send `protocolVersion: "2026-01-26"` in `ui/initialize`, and expect it in the result.
2. Replace removed or renamed fields and messages:
   - Server: set resource and content `mimeType` to `text/html;profile=mcp-app`, and the host's `mimeTypes` setting to match.
   - Server: move `_meta["ui/resourceUri"]` to `_meta.ui.resourceUri`. Keep the flat key only for hosts known to read nothing else; the SDK's `registerAppTool` writes both.
   - Server: if tools were returned with an embedded UI resource in the tool result (MCP-UI style), predeclare a `ui://` resource and link it from the tool instead.
   - Host: read `_meta.ui.resourceUri` first and fall back to the flat key (constants.ts, host-side example).
   - Host and view: replace `viewport` with `containerDimensions`; replace `iframe-ready` with the `ui/initialize` handshake; rename to the `ui/notifications/*` names above; drop `carousel` and `system`.
3. Validate against the target: run the Verify list in `SKILL.md`, and check every message name against the 2026-01-26 text.
4. Keep behaviour unchanged: the view renders the same data, and hosts without MCP Apps still get the same text `content`.

### 2026-01-26 to the draft (only when it ships)

Do not do this while the draft's posture is name. When a new dated folder appears: add app-tool handlers if the view declares `tools`, gate sampling and downloads on the new host capabilities, read `_meta.ui` from both the listing and the content item, and add `object-src 'none'` to the default CSP.

## Preview: MCP Apps draft

The draft lives at `specification/draft/apps.mdx`; its status line is Draft and the README calls it Development. The SDK at v2.0.3 already contains methods for the draft's additions (`App.downloadFile`, `App.requestTeardown`, `App.createSamplingMessage`, `App.registerTool`, `AppBridge.callTool` and `listTools`), and each is gated by a capability, so a peer that does not advertise it never sees the message. Posture: **name**. Know the shapes, keep the names free, and make the app work without them. Watch the `specification/` folder for a new dated directory and the commit history of `specification/draft`. When it ships: make it current, decide whether 2026-01-26 stays supported, and add an upgrade section.
