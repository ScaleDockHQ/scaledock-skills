# Versions and upgrades

Read this when choosing a target version, meeting a 0.x agent or client, upgrading an integration to 1.0, or deciding whether to use anything from the 1.1 draft. Sources: the AG-UI Specification 1.0 and its Key Changes page, Migrating to 1.0, the draft specification and its Key Changes page, and the `@ag-ui/core` versions on the npm registry, listed in [Sources](../SKILL.md#sources). AG-UI cites pages by title, not section number.

How peers declare and negotiate versions (`protocolVersion`, newer minors, downgrades) is in [`processing-and-versioning.md`](processing-and-versioning.md); this file covers the lines themselves.

## Version lines

| Id            | Line      | Status  | Revision                                                                       | Posture | Summary                                                                            |
| ------------- | --------- | ------- | ------------------------------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------- |
| `1.1-preview` | AG-UI 1.1 | preview | working draft at `docs.ag-ui.com/spec/draft`, checked 2026-10-05               | track   | The next minor version. No changes against 1.0 are recorded yet.                   |
| `1.0`         | AG-UI 1.0 | current | specification 1.0; `@ag-ui/core` 1.0.0 (2026-09-17), latest 1.0.1 (2026-09-29) |         | The default target and the first release with a normative specification.           |
| `0.x`         | AG-UI 0.x | legacy  | no normative specification; `@ag-ui/core` 0.0.x, last 0.0.59 (2026-08-27)      |         | Shapes defined by the SDKs, behaviour by the TypeScript client. Superseded by 1.0. |

Statuses: **current** is the default target; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

## Which version to use

- Default to 1.0: send `protocolVersion: "1.0"` on `RunAgentInput` and on `RUN_STARTED` (Versioning and Compatibility).
- Treat 0.x producers and consumers as input to an upgrade. A 0.x agent keeps working against the 1.0 TypeScript client, which translates retired shapes at its compatibility boundary and warns; those shims have provisional expiry dates twelve months after they were written (Migrating to 1.0, "What keeps working").
- A 1.0 agent keeps working against a 0.x client, because everything 1.0 adds is optional or a new event type (Migrating to 1.0).
- Emit nothing from the 1.1 draft: its posture is track.

## What changed

### AG-UI 1.1 (preview)

The draft's Key Changes page lists "None yet" under major, minor and schema changes. As a minor version, 1.1 only adds, and every entry must be safe for a 1.0 peer to meet (draft Key Changes, "Changes in 1.1").

### AG-UI 1.0

From Key Changes, citing the page that now defines each change:

- The specification exists: behaviour that lived in the TypeScript client is normative, the schema is authoritative for structure and the specification for behaviour (Key Changes, major 1).
- `RUN_FINISHED.outcome` with success, interrupt and cancelled outcomes, `Interrupt`, and resume entries on the run input (Runs and Steps; Interrupts and Resume).
- Subagents: `subagentRunId` and `SUBAGENT_STARTED`, `SUBAGENT_FINISHED`, `SUBAGENT_ERROR` (Subagents).
- Reasoning replaces thinking: the 0.x `THINKING_*` events are retired for the `REASONING_*` family and `REASONING_ENCRYPTED_VALUE` (Reasoning).
- Activity events, `ACTIVITY_SNAPSHOT` and `ACTIVITY_DELTA` (Activity).
- Unknown material is stripped with a warning and a malformed known value is fatal, on every transport (Processing Model).
- Rules for the chunked form (Streaming Messages) and a specified HTTP + Protobuf binding (HTTP + Protobuf).
- `AgentCapabilities` is defined in the schema; the subagent list is spelled `subagents`, and `subAgents` is not read (Capabilities).
- Tool results carry content parts, and the parts are renamed (`InputContent` to `ContentPart`, `TextInputContent` to `TextPart` and so on); the wire `type` values are unchanged (Tool Calls).
- Minor changes: `tools` and `context` optional; metadata merge rules; optional fields absent, never `null`; token usage on `RUN_FINISHED` and `RUN_ERROR`; a run stopped on a frontend tool call finishes as success with `pendingToolCallIds`; multimodal input parts with the new `file` source; `TOOL_CALL_RESULT` as its own message; a late `RUN_ERROR` admitted; in-band `protocolVersion` (Key Changes, minor 1 to 10).

### AG-UI 0.x

No normative specification: the SDK types defined the shapes and the TypeScript client defined behaviour (Key Changes, major 1). Its retired shapes include the `THINKING_*` events, the `binary` content part, the `subAgents` capability key and whole optional fields sent as `null` (Migrating to 1.0).

## Upgrading

### 0.x to 1.0

From Key Changes and Migrating to 1.0:

1. Change the version marker: send `protocolVersion: "1.0"` on `RunAgentInput` (consumer) and `RUN_STARTED` (producer) (Versioning and Compatibility).
2. Replace removed shapes: emit `REASONING_*` instead of `THINKING_*`; emit `image`, `audio`, `video` or `document` parts with a `source` instead of `binary`; rename `subAgents` to `subagents` in capabilities (Migrating to 1.0).
3. Omit optional fields instead of sending `null`, including `rawEvent`, `RUN_FINISHED.result` and `forwardedProps` (The Event Model; Migrating to 1.0).
4. Move non-standard properties into `metadata` on events and messages, and extra run input into `forwardedProps`; unknown properties are stripped before application code (Processing Model; Migrating to 1.0).
5. Close every reasoning span and reasoning message before `RUN_FINISHED`; the 1.0 client fails a run that leaves one open (Migrating to 1.0).
6. Handle tool results that are a list of content parts, and the `file` source, which is never a URL (Tool Calls; Run Input).
7. Apply the SDK steps: in TypeScript import validators from `@ag-ui/core/schemas` and add `zod`; in Python read JSON Patch entries as models; in .NET upgrade any producer still sending `binary` parts first, because the .NET consumer rejects them (Migrating to 1.0).
8. Validate producer streams against the 1.0 JSON Schema in tests (Schema files).
9. Keep behaviour unchanged: the same runs end with the same outcomes. A run that stops on a frontend tool call still finishes as success, not as an interrupt (Tool Calls).

## Preview: AG-UI 1.1

The documentation publishes a full draft specification under `spec/draft`, labelled "the working draft of the next AG-UI version (1.1)". It "can still change, and no SDK implements it yet", and its change list is empty when checked (draft Key Changes).

- Posture: **track**. Build and emit against 1.0; do not declare `protocolVersion: "1.1"`.
- A 1.0 implementation already copes with 1.1 peers: a producer meeting a newer minor serves the run and should warn, and new event types and optional fields must be safe to ignore ([`processing-and-versioning.md`](processing-and-versioning.md)).
- When refreshing, read the draft Key Changes page; each change links its pull request and the section it changes.
- When 1.1 ships: make it current, make 1.0 supported, pin the 1.1 pages, and add a 1.0 to 1.1 upgrade section from its Key Changes.
