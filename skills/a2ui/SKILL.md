---
name: a2ui
description: >-
  A2UI v0.9 Agent-to-User Interface: agents emit declarative UI, renderers draw it from a trusted
  component catalog. Use when generating, validating or rendering A2UI JSON or JSONL, defining a
  catalog with custom components and functions, or carrying A2UI over A2A, AG-UI or MCP:
  createSurface, updateComponents, updateDataModel and deleteSurface envelopes, the flat
  adjacency list with a root component, catalogId negotiation with supportedCatalogIds and
  inlineCatalogs, JSON Pointer data binding and template scopes, formatString, checks, action
  events and functionCall, sendDataModel sync, VALIDATION_FAILED errors, the
  application/a2ui+json DataPart and A2A extension URI, and the no-code-execution catalog trust
  model. Targets A2UI v0.9 at its v0.9.1 patch, builds the A2UI v1.0 release candidate
  (callRendererFunction, callAgentFunction, @path, @call, mixable catalogs) behind a flag, and
  upgrades from A2UI v0.8 (beginRendering, surfaceUpdate, dataModelUpdate, userAction).
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# A2UI

A2UI (Agent-to-User Interface) is an open protocol, published in the `a2ui-project/a2ui` repository, in which an agent streams JSON messages that describe UI surfaces, components and data, and a renderer draws them with its own native widgets from a catalog it trusts. This skill pins A2UI v0.9.1, the repository's current production release, and produces agent output, renderers, catalogs or transport bindings that meet its rules.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). The A2UI protocol documents have no section numbers, so rules cite the document and heading name (for example "Protocol v0.9.1, `createSurface`"); the evolution guides and v0.8 cite their numbered sections. Where a document's prose example and its JSON schema disagree, the schema wins. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: agent (the side that generates A2UI), renderer (the side that draws it, called "client" in v0.9), orchestrator (routes between a user and sub-agents), or catalog author.
- Transport: A2A, AG-UI, MCP, or another channel (SSE with JSON-RPC, WebSockets, REST).
- Catalog: the basic catalog, or your own catalog and its `catalogId`, plus any custom components and functions.
- Target version: A2UI v0.9 (current, the default; write `"version": "v0.9.1"`). A2UI v1.0 is a release candidate (preview, posture: build): implement it only behind a flag, next to v0.9. A2UI v0.8 is legacy: read it and upgrade from it, never author it. See [`references/versions.md`](references/versions.md).
- Revision: the pinned files in [Sources](#sources) at main 3db3b41 (2026-10-05), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read the repository README, `specification/*/README.md` status lines and a2ui.org first, check for a new version folder or a status change (v1.0 going stable), then re-read every URL in [Sources](#sources) and update the pins.

## Invariants

1. **One message, one key, one version.** Every agent message is a JSON object with `version` and exactly one of `createSurface`, `updateComponents`, `updateDataModel` or `deleteSurface`; every renderer message has `version` and exactly one of `action` or `error` (Protocol v0.9.1, Envelope message structure; `server_to_client.json`, `client_to_server.json`).
2. **Create before update; one live surface per id.** A surface must be created before `updateComponents` or `updateDataModel` targets it, `surfaceId` and `catalogId` are fixed once created, and sending `createSurface` for an existing `surfaceId` without deleting it first is an error (Protocol v0.9.1, `createSurface`; Evolution Guide v0.9.1 § 2.2).
3. **A flat list with exactly one `root`.** Components are a flat adjacency list linked by id; exactly one component has `"id": "root"`, and nothing renders until it exists (Protocol v0.9.1, UI composition: the adjacency list model).
4. **Only catalog components and functions.** The agent must generate messages that conform to the catalog the renderer understands, chosen from the renderer's `supportedCatalogIds`; inline catalogs are sent only when the agent declares `acceptsInlineCatalogs: true` (Protocol v0.9.1, The component catalog; `client_capabilities.json`).
5. **Catalogs type their links.** A catalog property holding a component id MUST use `ComponentId`, and a list of children or a template MUST use `ChildList`, or validators cannot check the tree (Protocol v0.9.1, Validator compliance when defining catalogs).
6. **No executable code crosses the wire.** Logic is a named `FunctionCall` the renderer has registered; a call to an unknown function fails validation (Protocol v0.9.1, Registered functions; Defining Custom Functions, How Validation Works).
7. **Bindings are JSON Pointers.** Absolute paths start with `/`; relative paths are valid only inside a `ChildList` template scope (Protocol v0.9.1, Path resolution & scope).
8. **Input stays local until an action.** Two-way bound inputs update the local data model immediately and send nothing; data reaches the agent only through an `action` (with `name`, `surfaceId`, `sourceComponentId`, `timestamp` and `context`) or `sendDataModel` metadata (Protocol v0.9.1, Two-way binding & input components; `client_to_server.json`).
9. **The data model goes only to its owner.** With `sendDataModel`, the renderer sends a surface's data model only to the agent that created it, and an orchestrator must strip surfaces the target sub-agent does not own (Protocol v0.9.1, Client to server updates; Actions, Preventing Data Leakage via Metadata Stripping).
10. **Validate before render, and report failures.** Validate generated JSON against the schema and catalog before it is rendered, and report failures as `error` with `code: "VALIDATION_FAILED"`, `surfaceId`, `path` and `message` (Protocol v0.9.1, Usage pattern: the prompt-generate-validate loop).
11. **The transport keeps order, framing and metadata.** Messages are delivered in the order generated, each envelope is delimited, and the transport can attach metadata (Protocol v0.9.1, The transport contract).
12. **A2A parts are arrays processed in order.** An A2UI A2A `DataPart` has `metadata.mimeType` `application/a2ui+json`, its `data` MUST be an array of messages, and receivers MUST process them sequentially and continue after one fails (A2A Extension v0.9.1, Data encoding, Processing Rules).
13. **Links open safely.** `openUrl` resolves the URL, allows only `http:` and `https:`, and opens new windows with `noopener,noreferrer` (Basic Catalog Implementation Guide v0.9.1, `openUrl`).

## Workflow

1. **Pick the version.** Target A2UI v0.9 and emit `"version": "v0.9.1"`. Add A2UI v1.0 only behind a flag for a renderer that advertises it.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target is recorded, and no v0.8 or unflagged v1.0 message is produced.
2. **Negotiate capabilities and the catalog.** The agent advertises `supportedCatalogIds` and `acceptsInlineCatalogs`; the renderer sends `a2uiClientCapabilities` with its `supportedCatalogIds`; the agent picks one catalog per surface.
   -> [`references/components-and-catalogs.md`](references/components-and-catalogs.md), [`references/transports-and-security.md`](references/transports-and-security.md)
   ✓ Every `catalogId` used in `createSurface` appears in the renderer's capabilities or a negotiated inline catalog.
3. **Create the surface and its component tree.** Send `createSurface`, then `updateComponents` with a flat list containing `root`, using only that catalog's components and their required properties.
   -> [`references/messages.md`](references/messages.md), [`references/components-and-catalogs.md`](references/components-and-catalogs.md)
   ✓ Every child id resolves to a component in the list, and exactly one component is `root`.
4. **Bind data.** Populate the data model with `updateDataModel`, bind properties with `{"path": ...}`, use templates for lists, and use `formatString` for interpolation.
   -> [`references/data-binding-and-actions.md`](references/data-binding-and-actions.md)
   ✓ Relative paths appear only inside templates, and `${...}` appears only inside `formatString`.
5. **Add interactions.** Give buttons an `action` (`event` for the agent, `functionCall` for local functions), add `checks` to inputs and buttons, and decide on `sendDataModel`.
   -> [`references/data-binding-and-actions.md`](references/data-binding-and-actions.md)
   ✓ Every value the agent needs on submit is in the action `context` or covered by `sendDataModel`.
6. **Validate and handle errors.** Validate each message with the catalog mapped in for `catalog.json`; feed `VALIDATION_FAILED` back to the model; render the rest gracefully.
   -> [`references/messages.md`](references/messages.md)
   ✓ The output validates against `server_to_client.json` with the chosen catalog.
7. **Wire the transport.** Map messages onto A2A `DataPart`s, AG-UI, MCP or a custom channel that meets the transport contract.
   -> [`references/transports-and-security.md`](references/transports-and-security.md)
   ✓ Messages arrive in order, and capabilities and the data model travel as metadata.
8. **Review security.** Check catalog trust, data model isolation, attribution, `openUrl`, inline catalogs and any embedded web content.
   -> [`references/transports-and-security.md`](references/transports-and-security.md)
   ✓ Each item in the security section has a mitigation or a reason it does not apply.
9. **Upgrade** (only when asked). Follow the upgrade section for each step from the source version to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The upgraded messages validate against the target schemas and render the same UI.

## Verify before done

- [ ] Every message validates against the target version's envelope schema, with `catalog.json` mapped to the catalog in use.
- [ ] Each surface gets `createSurface` before any update, no live `surfaceId` is created twice, and each tree has exactly one `root`.
- [ ] No component type or function name is used that the negotiated catalog does not define.
- [ ] Custom catalogs reference children through `ComponentId` and `ChildList`, and set `$id` and `catalogId` to the same URI.
- [ ] Every `action` sent by the renderer carries `name`, `surfaceId`, `sourceComponentId`, `timestamp` and a resolved `context`.
- [ ] With `sendDataModel`, an orchestrator forwards only the surfaces each sub-agent owns.
- [ ] A2A parts use `application/a2ui+json`, put an array in `data`, and a failing message does not stop the rest.
- [ ] `openUrl` rejects every scheme except `http:` and `https:`.
- [ ] Nothing from A2UI v1.0 is emitted without the flag and a renderer that advertises `v1.0`.

## Reference index

- **`references/versions.md`**: every version line with its status, which one to use, what changed, upgrade steps from v0.8 to v0.9 and v0.9 to v1.0, and the v1.0 release candidate. Load for steps 1 and 9.
- **`references/messages.md`**: the agent and renderer envelopes per version, their properties, the error formats and message ordering.
- **`references/components-and-catalogs.md`**: the component object, the adjacency list, the basic catalog, catalog identity and negotiation, custom components and functions, and the v1.0 catalog rules.
- **`references/data-binding-and-actions.md`**: JSON Pointer paths and scopes, data model updates, two-way binding, `formatString`, functions and checks, actions and `sendDataModel`.
- **`references/transports-and-security.md`**: the transport contract, the A2A extension, AG-UI, MCP and other channels, and the security model.

## Related skills

- `a2a`, for the Agent2Agent protocol that the A2UI A2A extension rides on: `npx skills add ScaleDockHQ/scaledock-skills --skill a2a`
- `ag-ui`, for the AG-UI agent-user interaction protocol, a common A2UI transport: `npx skills add ScaleDockHQ/scaledock-skills --skill ag-ui`
- `mcp-apps`, for MCP Apps, the HTML-based UI extension of MCP that A2UI can host or be hosted in: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp-apps`
- `json-schema`, for the JSON Schema 2020-12 documents that define A2UI messages and catalogs: `npx skills add ScaleDockHQ/scaledock-skills --skill json-schema`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read. Repository files are pinned at main 3db3b41 (2026-10-05).

- [A2UI repository README](https://github.com/a2ui-project/a2ui/blob/main/README.md): Early stage public preview; v0.9.1 current production, v1.0 release candidate, v0.8 legacy, checked 2026-10-05.
- [A2UI website](https://a2ui.org/): project site, lists v0.9.1 (Current), v1.0 (Candidate), v0.8 (Legacy), checked 2026-10-05.
- [A2UI roadmap](https://github.com/a2ui-project/a2ui/blob/main/docs/public/roadmap.md): documentation, checked 2026-10-05.
- [A2UI Protocol v0.9.1](https://github.com/a2ui-project/a2ui/blob/main/specification/v0_9_1/docs/a2ui_protocol.md): Current Production (closed), v0.9.1, last updated 2025-12-03, checked 2026-10-05.
- [A2UI Evolution Guide v0.9 to v0.9.1](https://github.com/a2ui-project/a2ui/blob/main/specification/v0_9_1/docs/evolution_guide.md): Current Production (closed), checked 2026-10-05.
- [A2UI A2A Extension spec v0.9.1](https://github.com/a2ui-project/a2ui/blob/main/specification/v0_9_1/docs/a2ui_extension_specification.md): Current Production (closed), checked 2026-10-05.
- [A2UI v0.9.1 JSON schemas](https://github.com/a2ui-project/a2ui/tree/main/specification/v0_9_1/json): Current Production (closed), checked 2026-10-05.
- [A2UI v0.9.1 basic catalog](https://github.com/a2ui-project/a2ui/blob/main/specification/v0_9_1/catalogs/basic/catalog.json): Current Production (closed), checked 2026-10-05.
- [A2UI v0.9.1 Basic Catalog Implementation Guide](https://github.com/a2ui-project/a2ui/blob/main/specification/v0_9_1/docs/basic_catalog_implementation_guide.md): Current Production (closed), checked 2026-10-05.
- [A2UI v0.9.1 Defining Custom Functions](https://github.com/a2ui-project/a2ui/blob/main/specification/v0_9_1/docs/a2ui_custom_functions.md): Current Production (closed), checked 2026-10-05.
- [A2UI Protocol v0.9](https://github.com/a2ui-project/a2ui/blob/main/specification/v0_9/docs/a2ui_protocol.md): Stable (closed), v0.9, checked 2026-10-05.
- [A2UI Evolution Guide v0.8.1 to v0.9](https://github.com/a2ui-project/a2ui/blob/main/specification/v0_9/docs/evolution_guide.md): Stable (closed), checked 2026-10-05.
- [A2UI Protocol v1.0](https://github.com/a2ui-project/a2ui/blob/main/specification/v1_0/docs/a2ui_protocol.md): Candidate, last updated 2026-06-08, checked 2026-10-05. Draft posture: build.
- [A2UI Evolution Guide v0.9 to v1.0](https://github.com/a2ui-project/a2ui/blob/main/specification/v1_0/docs/evolution_guide.md): Candidate, checked 2026-10-05. Draft posture: build.
- [A2UI A2A Extension spec v1.0](https://github.com/a2ui-project/a2ui/blob/main/specification/v1_0/extensions/a2a/docs/a2ui_extension_specification.md): Candidate, checked 2026-10-05. Draft posture: build.
- [A2UI v1.0 JSON schemas](https://github.com/a2ui-project/a2ui/tree/main/specification/v1_0/json): Candidate, checked 2026-10-05. Draft posture: build.
- [A2UI v1.0 basic catalog](https://github.com/a2ui-project/a2ui/blob/main/catalogs/basic/v1/catalog.json): Candidate, `protocolVersion` 1.0, checked 2026-10-05. Draft posture: build.
- [A2UI Protocol v0.8.2](https://github.com/a2ui-project/a2ui/blob/main/specification/v0_8/docs/a2ui_protocol.md): closed (legacy), updated 2025-11-12, checked 2026-10-05.
- [A2UI A2A Extension spec v0.8](https://github.com/a2ui-project/a2ui/blob/main/specification/v0_8/docs/a2ui_extension_specification.md): closed (legacy), checked 2026-10-05.
- [A2UI concepts: Actions](https://github.com/a2ui-project/a2ui/blob/main/docs/public/concepts/actions.md): documentation (security considerations and orchestration), checked 2026-10-05.
- [A2UI concepts: Catalogs](https://github.com/a2ui-project/a2ui/blob/main/docs/public/concepts/catalogs.md): documentation, checked 2026-10-05.
- [A2UI concepts: Transports](https://github.com/a2ui-project/a2ui/blob/main/docs/public/concepts/transports.md): documentation, checked 2026-10-05.
- [A2UI over Model Context Protocol (MCP)](https://github.com/a2ui-project/a2ui/blob/main/docs/public/guides/a2ui_over_mcp.md): guide, checked 2026-10-05.
- [MCP Apps Integration in A2UI Surfaces](https://github.com/a2ui-project/a2ui/blob/main/docs/public/guides/mcp-apps-in-a2ui.md): guide, checked 2026-10-05.
- [A2UI Dynamic Rendering within MCP Applications](https://github.com/a2ui-project/a2ui/blob/main/docs/public/guides/a2ui-in-mcp-apps.md): guide, checked 2026-10-05.
