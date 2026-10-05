# Transports and security

Read this when carrying A2UI over A2A, AG-UI, MCP or a custom channel, exchanging capabilities and the data model as metadata, or reviewing an A2UI agent, renderer or orchestrator for security. Sources: Protocol v0.9.1 (Transport decoupling, Capabilities & metadata, Identity and attribution), the A2A Extension v0.9.1 and v1.0, the Transports and Actions concept pages, the Basic Catalog Implementation Guide, the A2UI over MCP and MCP Apps guides, and Protocol v0.8.2, listed in [Sources](../SKILL.md#sources).

## The transport contract

A2UI is transport-agnostic, but a transport must provide (Protocol v0.9.1, The transport contract):

1. **Reliable, ordered delivery**: messages arrive in the order generated.
2. **Message framing**: each JSON envelope is delimited, for example by JSONL newlines, WebSocket frames or SSE events.
3. **Metadata**: a way to attach the synced data model to renderer messages and to exchange capabilities, for example A2A message metadata, Agent Cards or MCP initialization.
4. **A return channel** (optional): needed for `action` messages in interactive UIs.

Capabilities and the data model are never A2UI messages of their own (Protocol v0.9.1, Capabilities & metadata).

## A2A

The A2A extension (A2A Extension v0.9.1):

- **Extension URI**: `https://a2ui.org/a2a-extension/a2ui/v0.9.1`, which also names the version. v0.9 used `.../v0.9`, v0.8 `.../v0.8`, and the v1.0 candidate uses `.../v1.0`.
- **Agent Card**: agents are encouraged, not required, to list the extension in `capabilities.extensions` with `params` matching the server capabilities schema: `supportedCatalogIds` and `acceptsInlineCatalogs`.
- **Activation is optional**. Support is negotiated by the renderer sending `message.metadata["a2uiClientCapabilities"]` on every message and the agent returning `DataPart`s with `metadata.mimeType` `application/a2ui+json`. A client may also activate it with the `X-A2A-Extensions` header (JSON-RPC and HTTP) or `metadata["X-A2A-Extensions"]` (gRPC). Do not use `accepted_output_modes: ['a2ui']`; it is not part of A2UI.
- **Capabilities**: `a2uiClientCapabilities` is `{"v0.9": {"supportedCatalogIds": [...], "inlineCatalogs": [...]}}`; the extension's examples key it `v0.9.1`, but the v0.9.1 `client_capabilities.json` requires `v0.9`. In v1.0 it is `a2uiRendererCapabilities` with a `v1.0` key.
- **Data model**: `message.metadata["a2uiClientDataModel"]` when a surface has `sendDataModel` (v1.0: `a2uiRendererDataModel`).
- **Data encoding**: A2UI travels in a `DataPart` whose `metadata.mimeType` is `application/a2ui+json` and whose `data` MUST be an array of A2UI messages, validated against `server_to_client_list.json` (agent to renderer) or `client_to_server_list.json` (renderer to agent).
- **Processing**: process the list sequentially; on one failing message, report or log it and continue; atomicity is per message; renderers should not repaint until the whole list is processed.
- **Context**: all messages for a set of related surfaces share one A2A `contextId` (Protocol v0.9.1, A2A (Agent2Agent) binding).

For A2A itself (Agent Cards, messages, parts, extensions), use the `a2a` skill: `npx skills add ScaleDockHQ/scaledock-skills --skill a2a`.

## AG-UI

The protocol names AG-UI as a binding with low-latency, shared-state message passing between frontends and agent backends, and v1.0 calls it "the standard transport binding for Agent-to-User Interaction" (Protocol v0.9.1 and v1.0, AG-UI binding). The specification folder defines no field-level AG-UI mapping; the Transports page says AG-UI translates A2UI messages into AG-UI events and handles transport and state sync. Follow the AG-UI side with the `ag-ui` skill: `npx skills add ScaleDockHQ/scaledock-skills --skill ag-ui`.

## MCP

The protocol lists MCP as a binding through tool outputs, tool calls or resource subscriptions (Protocol v0.9.1, Other transports; Protocol v1.0, MCP binding). The A2UI over MCP guide, which is a guide and not normative text, shows:

- A2UI payloads as MCP resources and embedded resources with MIME type `application/a2ui+json`, for example static templates under `a2ui://` URIs and data in tool results, linked from a tool's `_meta.ui.resourceUri`.
- Capabilities under `capabilities.a2ui.clientCapabilities` in `initialize`, or under `_meta.a2ui.clientCapabilities` on each tool call for stateless servers. v1.0 says renderer capabilities carried on session metadata are scoped to the session, and on message metadata to that turn (Protocol v1.0, Renderer capabilities).
- User actions sent back as a tool call carrying all five `action` fields.

A2UI can also run inside an MCP App, or host one inside a surface. For MCP Apps, use the `mcp-apps` skill: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp-apps`; for MCP in general, `npx skills add ScaleDockHQ/scaledock-skills --skill mcp`.

## Other channels

SSE with JSON-RPC, WebSockets and REST also work; REST lacks streaming (Protocol v0.9.1, Other transports). Each must still meet the transport contract above.

## Security model

- **Data, not code.** A2UI is a declarative format; the renderer keeps a catalog of trusted, pre-approved components, and the agent can request only those (README, High-level philosophy, Security first). Logic is limited to registered functions referenced by name (Protocol v0.9.1, Registered functions).
- **Catalog trust.** Use catalogs both sides agreed on. v0.8 asks that pre-defined catalog contents be compiled into the agent and not downloaded at runtime, so malicious content cannot be injected into the prompt (Protocol v0.8.2 § 2.1). Accept inline catalogs only when the agent declares `acceptsInlineCatalogs`, and treat them as input to validate.
- **Validate on both sides.** The agent validates before sending, to catch hallucinated properties; the renderer validates against its own copy of the catalog before rendering, to guard against version mismatches and compromised agent output, and reports failures with `error` (Catalogs, Two-Phase Validation).
- **Data model isolation.** The synced data model goes only to the agent that created the surface. An orchestrator must map each `surfaceId` to its owning sub-agent, route `action` and `error` messages by that map, and strip unowned surfaces from `a2uiClientDataModel`; the Actions page calls stripping "a mandatory security requirement for multi-agent systems", because a sub-agent could otherwise scrape another surface's state (Actions, Security Considerations, Orchestration & Routing).
- **Surface ownership.** Namespace surface ids per agent so agents cannot create colliding surfaces or modify surfaces created by other agents (Evolution Guide v0.9 § 4.1).
- **Attribution.** `agentDisplayName` and `iconUrl` tell the user which agent made a surface. In multi-agent systems the orchestrator sets or validates them, for example by overwriting them with the sub-agent's verified identity, to prevent impersonation (Protocol v0.9.1, Identity and attribution).
- **URLs.** `openUrl` must resolve relative URLs, allow only `http:` and `https:` and abort on any other scheme, and open new windows with `noopener,noreferrer` (Basic Catalog Implementation Guide v0.9.1, `openUrl`). In v1.0 it requires user activation and so stays renderer-only (Evolution Guide v1.0 § 2.1).
- **Embedded web content.** When a surface hosts third-party HTML such as an MCP App, the guide's pattern is a double iframe: a same-origin sandbox proxy, and an inner `srcdoc` iframe whose `sandbox` MUST NOT include `allow-same-origin`, `allow-top-navigation` or `allow-top-navigation-by-user-activation`. Use explicit `postMessage` target origins, and check `event.source` because the inner origin is `"null"` (MCP Apps Integration in A2UI Surfaces, Double-Iframe Isolation Pattern; A2UI Dynamic Rendering within MCP Applications, Security Considerations).
- **v1.0 function boundaries.** A renderer reads `allowedCallers` from its catalog at runtime and rejects agent calls to `rendererOnly` or unregistered functions with `INVALID_FUNCTION_CALL`; `agentOnly` functions cannot be bound to UI (Protocol v1.0, `callRendererFunction`, Security Boundaries and Verification).
- **Transport security.** Authentication comes from the transport: the Transports page lists built-in security and authentication as an A2A benefit (Transports, A2A Protocol), and v1.0 lets `action.metadata.extensions` carry action attestations, audit signatures or authorization tokens (Protocol v1.0, Extensions).
