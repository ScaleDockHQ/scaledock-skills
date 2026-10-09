---
name: a2a
description: "A2A protocol: publish Agent Cards and talk agent to agent over the Agent2Agent (A2A) 1.0 specification from the Linux Foundation, upgrade 0.3 and 0.2 agents to 1.0, and track the A2A 1.1 preview (task generation and timeline). Use when building or reviewing an A2A server (remote agent) or client: the Agent Card at /.well-known/agent-card.json, skills, supportedInterfaces, securitySchemes and securityRequirements, signed Agent Cards (JWS over RFC 8785 JCS), the authenticated extended Agent Card, the JSON-RPC, gRPC and HTTP+JSON bindings, SendMessage, SendStreamingMessage, GetTask, ListTasks, CancelTask, SubscribeToTask, task states such as TASK_STATE_INPUT_REQUIRED and TASK_STATE_AUTH_REQUIRED, messages, parts and artifacts, Server-Sent Events streaming, push notification webhooks, the A2A-Version header, application/a2a+json, a2a.proto and the A2A JSON Schema. Triggers: a2a, agent2agent, agent card, agent-to-agent, multi-agent interop, remote agent, A2A SDK."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.2"
  kind: standard
---

# A2A (Agent2Agent) protocol

The Agent2Agent (A2A) protocol is an open standard for communication between independent AI agents, originally developed by Google and maintained under the Linux Foundation. With this skill the agent publishes an Agent Card, implements A2A operations on one or more protocol bindings, and calls remote A2A agents, following protocol version 1.0.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites (§ numbers refer to the A2A specification). When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: A2A server (remote agent), A2A client, or both (an agent that is a client of other agents).
- Bindings: which of `JSONRPC`, `GRPC` and `HTTP+JSON` to expose or call (§ 5, § 9 to § 11).
- Authentication: the security schemes the server accepts (API key, HTTP auth, OAuth 2.0, OpenID Connect, mutual TLS) and the scopes per skill (§ 4.5, § 7).
- Target version: A2A 1.0 (current, the default), protocol version `1.0`, specification release v1.0.1. A2A 0.3 and A2A 0.2 are legacy: read them and upgrade from them, and keep a 0.3 interface only while clients still need it. A2A 1.1 is a preview on the `dev-1.1` branch (posture: track): never emit its fields. See [`references/versions.md`](references/versions.md).
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources), check the A2A GitHub releases and the "Latest Released Version" banner on the specification page, and update the pins.

## Invariants

1. **The proto is normative.** `a2a.proto` is the single authoritative definition of all data objects and request and response messages; JSON Schema and SDK types are derived and must be regenerated, never hand-edited (§ 1.4). Where prose or an example disagrees with the proto, follow the proto.
2. **Publish an Agent Card** (§ 8.1). The well-known location is `https://{server_domain}/.well-known/agent-card.json` (§ 8.2, § 14.3).
3. **Declare every supported interface** in `supportedInterfaces`, in preference order, each with a correct `url`, `protocolBinding` and `protocolVersion` (§ 5.2, § 8.3.1). All bindings an agent supports must offer the same operations, behavior, errors and authentication (§ 5.1).
4. **JSON uses camelCase field names and ProtoJSON enum names** such as `TASK_STATE_COMPLETED` and `ROLE_USER` (§ 5.5). Timestamps are ISO 8601 strings in UTC (§ 5.6.1).
5. **Authenticate every request and authorize every operation** (§ 7.4, § 13.1). Scope `GetTask`, `ListTasks` and task-related operations to the caller, and do not reveal resources the caller may not access (§ 3.3.2, § 13.1).
6. **Version every request.** Clients send `A2A-Version` (`Major.Minor`, such as `1.0`); servers treat an empty value as `0.3` and return `VersionNotSupportedError` for unsupported versions (§ 3.6).
7. **Honor declared capabilities.** Streaming, push notifications, the extended Agent Card and required extensions each have a mandated error when not supported (§ 3.3.4).
8. **Use TLS in production** (§ 7.1, § 13.4). Webhook URLs are validated against SSRF (§ 13.2).
9. **Signed cards are JWS over the RFC 8785 canonical card**, with the `signatures` field excluded and default values removed (§ 8.4).

## Workflow

1. **Pick the version.** Target 1.0. If the agent or client in front of you uses `kind` discriminators, lowercase states or a card-level `protocolVersion`, it is 0.3 or older and needs an upgrade.
   -> [`references/versions.md`](references/versions.md)
   ✓ Every `supportedInterfaces` entry names its `protocolVersion`, and nothing from the 1.1 preview is emitted.
2. **Write the Agent Card.** Fill the required fields, the capabilities, the skills and `supportedInterfaces`; serve it at the well-known URI with caching headers.
   -> [`references/agent-card.md`](references/agent-card.md)
   ✓ The card has every REQUIRED proto field, validates against the A2A JSON Schema, and is reachable at `/.well-known/agent-card.json` with `Cache-Control` and `ETag` (§ 8.6.1).
3. **Declare security.** Add `securitySchemes` and card-level and per-skill `securityRequirements`; decide what the authenticated extended card adds.
   -> [`references/agent-card.md`](references/agent-card.md), [`references/security.md`](references/security.md)
   ✓ Each scheme uses one of the five proto scheme types; OAuth flows are `authorizationCode`, `clientCredentials` or `deviceCode`, not the deprecated `implicit` or `password` (§ 4.5.7).
4. **Implement the operations on each binding.** Map the eleven operations to JSON-RPC methods, gRPC RPCs or REST endpoints, with the service parameters and error mappings of that binding.
   -> [`references/operations-and-bindings.md`](references/operations-and-bindings.md)
   ✓ Every A2A error maps to the code in § 5.4, and HTTP+JSON errors carry a `google.rpc.ErrorInfo` with `domain: "a2a-protocol.org"` (§ 11.6).
5. **Model tasks, messages and artifacts.** Return a `Task` or a direct `Message` from `SendMessage`, drive task states, put outputs in artifacts, and handle multi-turn `contextId` and `taskId` rules.
   -> [`references/tasks-messages-streaming.md`](references/tasks-messages-streaming.md)
   ✓ Terminal states reject further messages with `UnsupportedOperationError` (§ 3.1.1), and task outputs are artifacts, not messages (§ 3.7).
6. **Add streaming and push notifications** if the card declares them.
   -> [`references/tasks-messages-streaming.md`](references/tasks-messages-streaming.md)
   ✓ Streams start with a `Task` or a single `Message`, keep event order, and close on a terminal state (§ 3.1.2, § 3.5.2); webhooks receive `StreamResponse` payloads with the configured credentials (§ 4.3.3).
7. **Sign the card and review security** if cards are signed or extended cards are offered.
   -> [`references/security.md`](references/security.md)
   ✓ A client can rebuild the canonical payload and verify at least one signature (§ 8.4.3); the extended card requires authentication (§ 13.3).
8. **Upgrade** (only when asked). Follow the 0.2 to 0.3 and 0.3 to 1.0 checklists in order.
   -> [`references/versions.md`](references/versions.md)
   ✓ The upgraded card and messages validate against the 1.0 JSON Schema, and the same tasks reach the same states with the same artifacts.

## Verify before done

- [ ] The Agent Card validates against the published A2A JSON Schema and uses `securityRequirements` (proto field 9), not the older `security` name that still appears in some prose and examples.
- [ ] `supportedInterfaces[0]` is the preferred interface, and clients set `tenant` exactly as declared (§ 8.3.2).
- [ ] Each operation returns the § 5.4 error code on every binding the card declares.
- [ ] `ListTasks` returns only the caller's tasks, sorted by last update descending, and always includes `nextPageToken` (§ 3.1.4).
- [ ] Requests without `A2A-Version` are treated as `0.3` (§ 3.6.2).
- [ ] Push notification webhook URLs reject private, loopback and link-local addresses (§ 13.2).
- [ ] Card signatures use a protected header with `alg`, `kid` and `typ: "JOSE"` (§ 8.4.2).

## Reference index

- **`references/versions.md`**: A2A 1.1 (preview), 1.0, 0.3 and 0.2, what changed in each, the upgrade checklists, and the 1.1 preview's posture. Load for steps 1 and 8.
- **`references/agent-card.md`**: every Agent Card field, interfaces, skills, security schemes and requirements in JSON, extensions, caching, and a full example. Load for steps 2 and 3.
- **`references/operations-and-bindings.md`**: the eleven operations, the JSON-RPC, gRPC and HTTP+JSON mappings, service parameters, versioning and error codes. Load for step 4.
- **`references/tasks-messages-streaming.md`**: task states, messages, parts, artifacts, multi-turn rules, streaming, push notifications and in-task authorization. Load for steps 5 and 6.
- **`references/security.md`**: authentication, authorization scoping, extended card access, Agent Card signing and verification, push notification security. Load for steps 3 and 7.

## Related skills

- `ap2` for agent payments carried over A2A (intent, cart and payment mandates): `npx skills add ScaleDockHQ/scaledock-skills --skill ap2`.
- `owasp-agentic` for reviewing inter-agent communication and delegated identity against the OWASP Top 10 for Agentic Applications: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-agentic`.
- `ag-ui` for the agent-to-user-interface event stream that complements A2A: `npx skills add ScaleDockHQ/scaledock-skills --skill ag-ui`.
- `json-rpc`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill json-rpc`
- `server-sent-events`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill server-sent-events`
- `dns-aid` for discovering agents through DNS records: `npx skills add ScaleDockHQ/scaledock-skills --skill dns-aid`.
- `agent-network-protocol` for the Agent Network Protocol, an alternative agent-to-agent protocol with DID-based identity: `npx skills add ScaleDockHQ/scaledock-skills --skill agent-network-protocol`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Agent2Agent (A2A) Protocol Specification](https://a2a-protocol.org/latest/specification/): Released, protocol version 1.0 (page banner "Latest Released Version 1.0.0"), checked 2026-10-02.
- [A2A release v1.0.1](https://github.com/a2aproject/A2A/releases/tag/v1.0.1): Released, v1.0.1 (2026-05-28), checked 2026-10-02.
- [a2a.proto at v1.0.1](https://raw.githubusercontent.com/a2aproject/A2A/v1.0.1/specification/a2a.proto): Released (normative data model), v1.0.1, checked 2026-10-02.
- [A2A JSON Schema bundle](https://a2a-protocol.org/latest/spec/a2a.json): Released (non-normative, generated from the proto), schema version v1, checked 2026-10-02.
- [A2A release v1.0.0](https://github.com/a2aproject/A2A/releases/tag/v1.0.0): Released, v1.0.0 (2026-03-12), checked 2026-10-05.
- [What's New in A2A Protocol v1.0](https://a2a-protocol.org/latest/whats-new-v1/): Documentation (migration notes from v0.3.0), protocol version 1.0, checked 2026-10-05.
- [A2A CHANGELOG at v1.0.1](https://raw.githubusercontent.com/a2aproject/A2A/v1.0.1/CHANGELOG.md): Released (changelog), entries 0.2.1 (2025-05-27) to 1.0.1 (2026-05-26), checked 2026-10-05.
- [A2A release v0.3.0](https://github.com/a2aproject/A2A/releases/tag/v0.3.0): Released (superseded by 1.0), v0.3.0 (2025-07-30), checked 2026-10-05.
- [Agent2Agent (A2A) Protocol Specification 0.3.0](https://a2a-protocol.org/v0.3.0/specification/): Released (superseded by 1.0), 0.3.0, checked 2026-10-05.
- [Agent2Agent (A2A) Protocol Specification 0.2.6](https://a2a-protocol.org/v0.2.6/specification/): Released (superseded; page marked deprecated), 0.2.6 (2025-07-17), checked 2026-10-05.
- [A2A specification on the dev-1.1 branch](https://github.com/a2aproject/A2A/blob/db39eb52363a007868a755703f7044841c729acb/docs/specification.md): Development branch, dev-1.1, commit db39eb5 (2026-09-22); draft posture: track, checked 2026-10-05.
- [a2a.proto on the dev-1.1 branch](https://github.com/a2aproject/A2A/blob/db39eb52363a007868a755703f7044841c729acb/specification/a2a.proto): Development branch, dev-1.1, commit db39eb5 (2026-09-22); draft posture: track, checked 2026-10-05.
