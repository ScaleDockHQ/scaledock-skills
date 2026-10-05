# a2a

An agent skill for the Agent2Agent (A2A) protocol: publish Agent Cards, implement A2A 1.0 operations over JSON-RPC, gRPC or HTTP+JSON, call remote agents, and upgrade 0.3 and 0.2 agents to 1.0.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill a2a
```

Then ask your agent to "publish an A2A Agent Card for this service" or "add an A2A HTTP+JSON endpoint with streaming".

## What it covers

- The Agent Card: well-known location, `supportedInterfaces`, skills, `securitySchemes` and `securityRequirements`, the authenticated extended card, caching.
- Signed Agent Cards: JWS over the RFC 8785 canonical card.
- The eleven operations and their JSON-RPC, gRPC and HTTP+JSON mappings, service parameters, versioning and error codes.
- Tasks and task states, messages, parts and artifacts, multi-turn rules, streaming, push notifications and in-task authorization.
- Security: authentication, authorization scoping, push notification SSRF rules.
- Version lines, what changed in each, and upgrades from 0.2 and 0.3 to 1.0.

## Versions

| Line    | Status                |
| ------- | --------------------- |
| A2A 1.1 | preview (track)       |
| A2A 1.0 | current               |
| A2A 0.3 | legacy (upgrade from) |
| A2A 0.2 | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them. The 1.1 preview is the `dev-1.1` branch: task `generation`, the task `timeline`, long-polling and optimistic concurrency.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Agent2Agent (A2A) Protocol Specification](https://a2a-protocol.org/latest/specification/): Released, protocol version 1.0.
- [A2A release v1.0.1](https://github.com/a2aproject/A2A/releases/tag/v1.0.1): Released, v1.0.1.
- [a2a.proto at v1.0.1](https://raw.githubusercontent.com/a2aproject/A2A/v1.0.1/specification/a2a.proto): Released, v1.0.1.
- [A2A JSON Schema bundle](https://a2a-protocol.org/latest/spec/a2a.json): Released (non-normative), schema version v1.
- [A2A release v1.0.0](https://github.com/a2aproject/A2A/releases/tag/v1.0.0), [What's New in A2A Protocol v1.0](https://a2a-protocol.org/latest/whats-new-v1/) and the [changelog at v1.0.1](https://raw.githubusercontent.com/a2aproject/A2A/v1.0.1/CHANGELOG.md): release notes back to 0.2.1.
- [A2A release v0.3.0](https://github.com/a2aproject/A2A/releases/tag/v0.3.0), the [0.3.0 specification](https://a2a-protocol.org/v0.3.0/specification/) and the [0.2.6 specification](https://a2a-protocol.org/v0.2.6/specification/): superseded.
- [Specification](https://github.com/a2aproject/A2A/blob/db39eb52363a007868a755703f7044841c729acb/docs/specification.md) and [a2a.proto](https://github.com/a2aproject/A2A/blob/db39eb52363a007868a755703f7044841c729acb/specification/a2a.proto) on the `dev-1.1` branch: development branch, commit db39eb5, draft posture track.

## License

MIT
