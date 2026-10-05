# a2ui

An agent skill for A2UI (Agent-to-User Interface), targeting A2UI v0.9 at its v0.9.1 patch, with the v1.0 release candidate behind a flag and upgrades from v0.8: agents that stream declarative UI as JSON, and renderers that draw it from a trusted component catalog.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill a2ui
```

Then ask your agent to "have our agent return an A2UI form for this flow" or "review our A2UI renderer and custom catalog".

## What it covers

- The message envelopes: `createSurface`, `updateComponents`, `updateDataModel` and `deleteSurface` from the agent, and `action` and `error` from the renderer.
- The flat adjacency list with a `root` component, the basic catalog, and catalog identity and negotiation with `supportedCatalogIds` and inline catalogs.
- Writing your own catalog with custom components and functions that validators can check.
- JSON Pointer data binding, template scopes, two-way binding, `formatString`, checks, actions and `sendDataModel`.
- The prompt, generate and validate loop with `VALIDATION_FAILED` errors.
- Transports: the transport contract, the A2A extension (`application/a2ui+json` DataParts), AG-UI, MCP and other channels.
- The security model: no code execution, catalog trust, data model isolation in orchestrators, attribution, safe `openUrl`, and sandboxing embedded web content.
- What changed between v0.8, v0.9, v0.9.1 and v1.0, with upgrade steps.

## Versions

| Line      | Status                |
| --------- | --------------------- |
| A2UI v1.0 | preview (build)       |
| A2UI v0.9 | current (v0.9.1)      |
| A2UI v0.8 | legacy (upgrade from) |

`references/versions.md` says which line to use, why v0.9 and v0.9.1 are one line, and how to upgrade between them.

## Pinned sources

The skill was written from these sources in the [a2ui-project/a2ui](https://github.com/a2ui-project/a2ui) repository at main 3db3b41 (2026-10-05), pinned in `metadata.json`:

- [A2UI Protocol v0.9.1](https://github.com/a2ui-project/a2ui/blob/main/specification/v0_9_1/docs/a2ui_protocol.md), its evolution guide, A2A extension, JSON schemas, basic catalog, catalog implementation guide and custom functions guide: Current Production.
- [A2UI Protocol v0.9](https://github.com/a2ui-project/a2ui/blob/main/specification/v0_9/docs/a2ui_protocol.md) and its [evolution guide from v0.8.1](https://github.com/a2ui-project/a2ui/blob/main/specification/v0_9/docs/evolution_guide.md): Stable, closed.
- [A2UI Protocol v1.0](https://github.com/a2ui-project/a2ui/blob/main/specification/v1_0/docs/a2ui_protocol.md), its evolution guide, A2A extension, JSON schemas and basic catalog: Candidate.
- [A2UI Protocol v0.8.2](https://github.com/a2ui-project/a2ui/blob/main/specification/v0_8/docs/a2ui_protocol.md) and its A2A extension: closed, legacy.
- The repository [README](https://github.com/a2ui-project/a2ui/blob/main/README.md), roadmap, the Actions, Catalogs and Transports concept pages, the MCP guides, and [a2ui.org](https://a2ui.org/).

## License

MIT
