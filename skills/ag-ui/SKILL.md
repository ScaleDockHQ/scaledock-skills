---
name: ag-ui
description: "AG-UI: stream agent runs to user-facing apps with the Agent-User Interaction Protocol 1.0, upgrade 0.x integrations to 1.0, and track the AG-UI 1.1 working draft. Use when building or reviewing an AG-UI agent endpoint (producer), a client or UI that consumes one (consumer), a framework bridge, or middleware: RunAgentInput (threadId, runId, messages, tools, context, state, forwardedProps, resume), the 31 event types in eight families (RUN_STARTED, RUN_FINISHED outcomes, RUN_ERROR, steps, TEXT_MESSAGE_*, TOOL_CALL_*, REASONING_*, STATE_SNAPSHOT, STATE_DELTA with JSON Patch, MESSAGES_SNAPSHOT, ACTIVITY_*, SUBAGENT_*, RAW and CUSTOM), the chunked form, the HTTP + SSE and HTTP + Protobuf bindings, frontend tools, human-in-the-loop interrupts and resume, the processing model (unknown versus malformed), protocolVersion negotiation, the JSON Schema, and the TypeScript, Python and .NET SDKs. Triggers: ag-ui, agui, agent-user interaction protocol, agent UI streaming, generative UI, shared state, human in the loop."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.1"
  kind: standard
---

# AG-UI

AG-UI (Agent-User Interaction Protocol) connects agents to user-facing applications: one request (`RunAgentInput`) in, one ordered stream of typed events out, carrying text, tool calls, reasoning, shared state and progress. Version 1.0 is the first release with a normative specification; the JSON Schema is authoritative for structure and the specification for behaviour (Specification, "What this document is"). With this skill the agent builds or reviews a producer, a consumer, or middleware.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), cited by page title. When a rule and the pinned source disagree, the source wins; when the source has a newer version than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer (agent endpoint or bridge), consumer (client SDK or UI), middleware, or several.
- Transport: HTTP + SSE (required for HTTP), HTTP + Protobuf (optional), or a custom binding.
- Features: which event families beyond the run lifecycle, frontend tools, interrupts, shared state.
- Target version: AG-UI 1.0 (current, the default), as pinned in [Sources](#sources). AG-UI 0.x is legacy: read it and upgrade from it, never author it. AG-UI 1.1 is a preview, the working draft (posture: track): never emit or declare it. See [`references/versions.md`](references/versions.md).
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources), check `https://docs.ag-ui.com/llms.txt` for a newer frozen spec version, check the `@ag-ui/core` version and the repository head, and update the pins.

## Invariants

1. **Arrival order is the protocol's order.** Consumers must not order by `timestamp` (The Event Model).
2. **A stream begins with `RUN_STARTED` or `RUN_ERROR`;** every message, tool call, step, reasoning span and subagent a run opens is closed before `RUN_FINISHED`; nothing but `RUN_STARTED` follows `RUN_ERROR` (Runs and Steps).
3. **Absent means absent.** Optional fields without a value are omitted, never `null` (The Event Model).
4. **Unrecognised material is stripped with a warning; a malformed known value is fatal** (Processing Model).
5. **Middleware runs before enforcement, enforcement before chunk expansion and verification, and all before application code** (Processing Model).
6. **Tool arguments are not acted on before `TOOL_CALL_END`,** and are validated as untrusted input (Tool Calls).
7. **A producer never answers a frontend tool call it made;** the run ends as success, and a continuing thread answers every pending call (Tool Calls, "Frontend tools").
8. **An interrupted run ends with the interrupt outcome, and a resume covers every interrupt,** answered or explicitly abandoned (Interrupts and Resume).
9. **A truncated stream is not a finished run.** Consumers never synthesize `RUN_FINISHED` and never infer success from HTTP 200 (Transports; HTTP + Server-Sent Events).
10. **Model output is untrusted.** Applications validate what they act on, never render streamed content as executable markup, and never represent an action as user-approved when it was not (Specification, "Security and Trust & Safety").

## Workflow

1. **Pick the version.** Target 1.0. A peer that sends no `protocolVersion`, or `THINKING_*` events, `binary` parts or `subAgents`, is 0.x.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target is 1.0, and nothing from the 1.1 draft is emitted.
2. **Choose roles and transport.** Speak HTTP + SSE if you speak HTTP; add Protobuf only if needed. Put authentication in the binding.
   -> [`references/transports.md`](references/transports.md)
   ✓ The endpoint accepts a JSON POST, answers `text/event-stream` with one JSON event per `data` field, and rejects bad input with an HTTP error before any stream.
3. **Emit or consume the run lifecycle.** Implement `RUN_STARTED`, `RUN_FINISHED` with its outcome, `RUN_ERROR`, steps, and token usage.
   -> [`references/events.md`](references/events.md)
   ✓ Every run is bracketed; outcomes are `success`, `interrupt` or `cancelled`; a stopped run is never reported as success.
4. **Add the event families you need.** Text messages, tool calls, reasoning, state, activity, subagents, passthrough, in triad or chunked form.
   -> [`references/events.md`](references/events.md)
   ✓ Each item follows open, content, close; deltas are RFC 6902 patches against a baseline the consumer has.
5. **Wire human-in-the-loop.** Advertise frontend tools, handle pending tool calls, raise interrupts and send resume entries; ask consent before side effects.
   -> [`references/human-in-the-loop.md`](references/human-in-the-loop.md)
   ✓ Approval-gated actions never run on an absent resume entry; declined calls are answered as declined.
6. **Build the processing pipeline and version handshake.** Strip unknown material with warnings, fail on malformed known values, declare `protocolVersion`.
   -> [`references/processing-and-versioning.md`](references/processing-and-versioning.md)
   ✓ A test stream with an unknown event type survives with a warning; a `messageId` holding a number fails the run.
7. **Upgrade** (only when asked). Follow the 0.x to 1.0 checklist and the per-SDK steps in Migrating to 1.0.
   -> [`references/versions.md`](references/versions.md)
   ✓ The upgraded producer's streams validate against the 1.0 JSON Schema, and runs end with the same outcomes as before.

## Verify before done

- [ ] Producer streams validate against the 1.0 JSON Schema in tests; the runtime receive path strips rather than rejects unknown material.
- [ ] No optional field is sent as `null`; identifiers are treated as opaque.
- [ ] `RUN_STARTED.protocolVersion` and `RunAgentInput.protocolVersion` are sent (`"1.0"`).
- [ ] Cancelled, interrupted, errored and truncated runs are each surfaced differently from success.
- [ ] Activity messages are stripped from outgoing `messages`.
- [ ] Tool arguments, tool results, state, `RAW` and `CUSTOM` payloads are validated before use and never rendered as markup.
- [ ] No secrets are placed in state or messages, which round-trip through the client.

## Reference index

- **`references/versions.md`**: AG-UI 1.1 (preview), 1.0 and 0.x, what changed, the 0.x to 1.0 upgrade checklist, and the 1.1 draft's posture. Load for steps 1 and 7.
- **`references/events.md`**: the envelope, identifiers, the eight families, the run lifecycle and outcomes, streaming and the chunked form, snapshots and deltas, passthrough. Load for steps 3 and 4.
- **`references/transports.md`**: the binding contract, HTTP + SSE, HTTP + Protobuf, truncation, custom transports, and a framework-neutral endpoint sketch. Load for step 2.
- **`references/human-in-the-loop.md`**: frontend tools, interrupts and resume, and the security rules. Load for step 5.
- **`references/processing-and-versioning.md`**: the processing pipeline, version negotiation, downgrades, the JSON Schema, capabilities, SDKs and the relation to MCP and A2A. Load for step 6.

## Related skills

- `owasp-agentic` for reviewing human-agent trust, tool misuse and approvals around the UI: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-agentic`.
- `a2a` for agent-to-agent traffic behind an AG-UI front end: `npx skills add ScaleDockHQ/scaledock-skills --skill a2a`.
- `a2ui` for declarative agent-generated UI rendered from a trusted component catalog: `npx skills add ScaleDockHQ/scaledock-skills --skill a2ui`.
- `mcp-apps` for interactive `ui://` views that MCP servers serve to hosts: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp-apps`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [AG-UI Specification 1.0](https://docs.ag-ui.com/spec/1.0): Released, 1.0, checked 2026-10-02.
- [The Event Model](https://docs.ag-ui.com/spec/1.0/basic): Released, 1.0, checked 2026-10-02.
- [Run Input](https://docs.ag-ui.com/spec/1.0/basic/run-input): Released, 1.0, checked 2026-10-02.
- [Metadata](https://docs.ag-ui.com/spec/1.0/basic/metadata): Released, 1.0, checked 2026-10-02.
- [Capabilities](https://docs.ag-ui.com/spec/1.0/basic/capabilities): Released, 1.0, checked 2026-10-02.
- [Event Streams](https://docs.ag-ui.com/spec/1.0/events): Released, 1.0, checked 2026-10-02.
- [Runs and Steps](https://docs.ag-ui.com/spec/1.0/events/lifecycle): Released, 1.0, checked 2026-10-02.
- [Text Messages](https://docs.ag-ui.com/spec/1.0/events/text-messages): Released, 1.0, checked 2026-10-02.
- [Tool Calls](https://docs.ag-ui.com/spec/1.0/events/tool-calls): Released, 1.0, checked 2026-10-02.
- [Reasoning](https://docs.ag-ui.com/spec/1.0/events/reasoning): Released, 1.0, checked 2026-10-02.
- [State](https://docs.ag-ui.com/spec/1.0/events/state): Released, 1.0, checked 2026-10-02.
- [Activity](https://docs.ag-ui.com/spec/1.0/events/activity): Released, 1.0, checked 2026-10-02.
- [Subagents](https://docs.ag-ui.com/spec/1.0/events/subagents): Released, 1.0, checked 2026-10-02.
- [Raw and Custom Events](https://docs.ag-ui.com/spec/1.0/events/passthrough): Released, 1.0, checked 2026-10-02.
- [Schema files](https://docs.ag-ui.com/spec/1.0/schema-files): Released, 1.0, checked 2026-10-02.
- [Streaming Messages](https://docs.ag-ui.com/spec/1.0/basic/patterns/streaming): Released, 1.0, checked 2026-10-02.
- [Snapshots and Deltas](https://docs.ag-ui.com/spec/1.0/basic/patterns/snapshots): Released, 1.0, checked 2026-10-02.
- [Interrupts and Resume](https://docs.ag-ui.com/spec/1.0/basic/patterns/interrupt-resume): Released, 1.0, checked 2026-10-02.
- [Transports](https://docs.ag-ui.com/spec/1.0/basic/transports): Released, 1.0, checked 2026-10-02.
- [HTTP + Server-Sent Events](https://docs.ag-ui.com/spec/1.0/basic/transports/http-sse): Released, 1.0, checked 2026-10-02.
- [HTTP + Protobuf](https://docs.ag-ui.com/spec/1.0/basic/transports/http-protobuf): Released, 1.0, checked 2026-10-02.
- [Processing Model](https://docs.ag-ui.com/spec/1.0/basic/processing): Released, 1.0, checked 2026-10-02.
- [Versioning and Compatibility](https://docs.ag-ui.com/spec/1.0/basic/versioning): Released, 1.0, checked 2026-10-02.
- [Key Changes](https://docs.ag-ui.com/spec/1.0/changelog): Released (informative), 1.0, checked 2026-10-05.
- [AG-UI 1.0 JSON Schema](https://docs.ag-ui.com/spec/1.0/schema.json): Released, 1.0 (`$id` https://ag-ui.com/spec/1.0/schema.json, JSON Schema 2020-12), checked 2026-10-02.
- [Migrating to 1.0](https://docs.ag-ui.com/migrating-to-1-0): Documentation, 1.0, checked 2026-10-05.
- [AG-UI Specification (Draft)](https://docs.ag-ui.com/spec/draft): Draft, working draft of 1.1, as published 2026-10-05; draft posture: track, checked 2026-10-05.
- [Key Changes (Draft)](https://docs.ag-ui.com/spec/draft/changelog): Draft (informative), Changes in 1.1: none yet, as published 2026-10-05; draft posture: track, checked 2026-10-05.
- [AG-UI documentation index (llms.txt)](https://docs.ag-ui.com/llms.txt): Publisher index, lists spec 1.0 and spec draft, as published 2026-10-05, checked 2026-10-05.
- [MCP, A2A, and AG-UI](https://docs.ag-ui.com/agentic-protocols): Documentation, as published, checked 2026-10-02.
- [AG-UI repository README](https://raw.githubusercontent.com/ag-ui-protocol/ag-ui/e60019d258cf43ecc5ad19e8d374f1c31cbf2b94/README.md): MIT-licensed repository, commit e60019d (main, 2026-10-02, tag release/2026-10-02), checked 2026-10-02.
- [@ag-ui/core on the npm registry](https://registry.npmjs.org/@ag-ui/core): Published package, 1.0.0 (2026-09-17), latest 1.0.1 (2026-09-29); last 0.x release 0.0.59 (2026-08-27), checked 2026-10-05.
