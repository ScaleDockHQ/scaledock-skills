# ag-ui

An agent skill for AG-UI, the Agent-User Interaction Protocol: stream agent runs to user-facing applications as typed events on AG-UI 1.0, consume them safely, and upgrade 0.x integrations.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill ag-ui
```

Then ask your agent to "add an AG-UI endpoint to this agent" or "review our AG-UI client for spec conformance".

## What it covers

- The event model: envelope, identifiers, and the 31 event types in eight families, with the run lifecycle and its success, interrupt and cancelled outcomes.
- Streaming, the chunked form, and snapshots with JSON Patch deltas for shared state.
- The HTTP + Server-Sent Events and HTTP + Protobuf bindings, truncation and custom transports, with a framework-neutral endpoint sketch.
- Human-in-the-loop: frontend tools, interrupts and resume, and the security rules for tool calls and state.
- The processing model, `protocolVersion` negotiation, the JSON Schema, capabilities, the SDKs, and how AG-UI relates to MCP and A2A.
- Version lines, what 1.0 changed against 0.x, and the upgrade to 1.0.

## Versions

| Line      | Status                |
| --------- | --------------------- |
| AG-UI 1.1 | preview (track)       |
| AG-UI 1.0 | current               |
| AG-UI 0.x | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade. The 1.1 preview is the published working draft, which records no changes against 1.0 yet.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [AG-UI Specification 1.0](https://docs.ag-ui.com/spec/1.0) and its pages on events, patterns, transports, processing and versioning: Released, 1.0.
- [AG-UI 1.0 JSON Schema](https://docs.ag-ui.com/spec/1.0/schema.json): Released, 1.0.
- [Migrating to 1.0](https://docs.ag-ui.com/migrating-to-1-0) and [MCP, A2A, and AG-UI](https://docs.ag-ui.com/agentic-protocols): documentation.
- [AG-UI Specification (Draft)](https://docs.ag-ui.com/spec/draft) and its [Key Changes](https://docs.ag-ui.com/spec/draft/changelog): the 1.1 working draft, draft posture track.
- [AG-UI documentation index](https://docs.ag-ui.com/llms.txt): lists the 1.0 and draft specifications.
- [AG-UI repository README](https://raw.githubusercontent.com/ag-ui-protocol/ag-ui/e60019d258cf43ecc5ad19e8d374f1c31cbf2b94/README.md): commit e60019d (tag release/2026-10-02).
- [@ag-ui/core](https://registry.npmjs.org/@ag-ui/core): 1.0.0 (2026-09-17), latest 1.0.1; last 0.x release 0.0.59.

## License

MIT
