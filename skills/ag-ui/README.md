# ag-ui

An agent skill for AG-UI, the Agent-User Interaction Protocol 1.0: stream agent runs to user-facing applications as typed events, and consume them safely.

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

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [AG-UI Specification 1.0](https://docs.ag-ui.com/spec/1.0) and its pages on events, patterns, transports, processing and versioning: Released, 1.0.
- [AG-UI 1.0 JSON Schema](https://docs.ag-ui.com/spec/1.0/schema.json): Released, 1.0.
- [Migrating to 1.0](https://docs.ag-ui.com/migrating-to-1-0) and [MCP, A2A, and AG-UI](https://docs.ag-ui.com/agentic-protocols): documentation.
- [AG-UI repository README](https://raw.githubusercontent.com/ag-ui-protocol/ag-ui/e60019d258cf43ecc5ad19e8d374f1c31cbf2b94/README.md): commit e60019d (tag release/2026-10-02).
- [@ag-ui/core](https://registry.npmjs.org/@ag-ui/core): 1.0.0 (2026-09-17), latest 1.0.1.

## License

MIT
