# Processing, versioning and SDKs

## The processing rule (Processing Model)

Unrecognised material is not an error; a malformed known value is.

- An unknown event type, an undescribed property, or an unrecognised union member (a new content part kind, a newer outcome) must not abort the run.
- A described field carrying a value the schema rejects (a `messageId` holding a number) must be fatal: never repair, coerce or ignore it.
- A consumer that exposes events to application code drops unknown events and strips unknown properties or union members, and should warn naming the type or path. Stripped material must never reach application code.
- In an optional position only the field goes; in a required position the containing value goes; inside a list only the element goes.
- Objects the schema leaves open (`metadata`, JSON Patch operations) keep unknown members.
- The same verdict applies on every transport, except where protobuf cannot express the difference.
- Outgoing: immediately before sending, a consumer strips unknown material from the run input and fails on malformed known fields. A producer applies the same asymmetry to the input it receives.
- A producer must not emit event types the protocol does not describe; `CUSTOM` and `RAW` exist for private signalling.

Pipeline order, on every path including reconnection and replay:

```text
producer -> compatibility boundary -> middleware -> enforcement -> chunk expansion -> verification -> application
```

The compatibility boundary translates retired shapes (for example 0.x `THINKING_*` into `REASONING_*`) before anything is stripped. Verification (open before continue, close after) runs after chunk expansion. A malformed chunk is rejected by whichever stage meets it first, never repaired.

## Version negotiation (Versioning and Compatibility)

- The consumer declares `RunAgentInput.protocolVersion`; the producer declares its own on `RUN_STARTED.protocolVersion`, never an echo. Absence means a peer from before versioning.
- Values are `MAJOR.MINOR`, compared numerically (`1.10` is newer than `1.9`). An uninterpretable declaration is treated as newer: proceed and warn.
- A producer meeting a newer minor of its line must serve the run and should warn; it may reject, before `RUN_STARTED`, only a major line it does not implement.
- A proxy declares what the stream speaks: the original producer's version if forwarding untranslated, its own if translating.
- With an unknown peer version, behave as though the peer is current.

Additions and downgrades:

- New event types and optional fields must be safe to ignore, so outcome, message content, tool call identity and tool results always travel in their described fields.
- A downgrade may remove or reshape, never invent; it must not repair malformed values, change outcomes, alter identifiers or reorder events.
- Lossless downgrades may be silent; lossy ones must warn the developer, naming what was lost, and warnings are on by default.
- Retired shapes are recorded in the repository's deprecation registry with their replacement and expiry, and translated as middleware.

## JSON Schema (Schema files)

- `https://ag-ui.com/spec/1.0/schema.json` is the `$id`; the file is JSON Schema 2020-12, with one anchor per definition (for example `#RunAgentInput`, `#TextMessageStartEvent`). On 2026-10-02 that address answered with a 301 to `https://docs.ag-ui.com/spec/1.0/schema.json`.
- The schema is closed where the protocol is strict. Use it for authoring and tests; do not wire it into a runtime receive path, which must strip rather than reject unknown material.

## Capabilities (Capabilities)

`AgentCapabilities` groups optional declarations: `identity`, `transport`, `tools`, `output`, `state`, `multiAgent`, `reasoning`, `multimodal`, `execution`, `humanInTheLoop` and `custom`. An omitted field means undeclared, not unsupported. Declarations are informative; the stream is authoritative, and a consumer must not reject a stream for disagreeing with them. How capabilities are retrieved is left to the implementation.

## SDKs (Specification "Scope"; repository README; Migrating to 1.0)

- First-party SDKs: TypeScript, Python and .NET, all bound by the specification. Their protocol types are generated from the schema.
- TypeScript packages include `@ag-ui/core` (types and constants; validators under `@ag-ui/core/schemas`, with `zod` as an optional peer dependency), `@ag-ui/client` (`AbstractAgent`, `HttpAgent`, middleware), `@ag-ui/encoder` and `@ag-ui/proto`. `@ag-ui/core` 1.0.0 was published on 2026-09-17.
- Python: `ag_ui.core` from the `ag-ui-protocol` distribution. .NET: abstractions, client and hosting packages.
- Community SDKs listed in the README include Kotlin, Go, Dart, Java, Rust, Ruby and C++. The specification notes they are bound by it only when they claim conformance.
- The specification notes that the Python and .NET models parse leniently and do not yet have a stage that strips unknown material before application code (Processing Model).

## Relation to MCP and A2A (MCP, A2A, and AG-UI)

The AG-UI documentation describes the three as complementary layers: MCP connects agents to tools and context, A2A connects agents to other agents, and AG-UI connects agents to users through user-facing applications. One agent can use all three; AG-UI can front agents that speak MCP or A2A.
