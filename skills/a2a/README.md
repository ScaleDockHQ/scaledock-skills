# a2a

An agent skill for the Agent2Agent (A2A) protocol 1.0: publish Agent Cards, implement A2A operations over JSON-RPC, gRPC or HTTP+JSON, and call remote agents.

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

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Agent2Agent (A2A) Protocol Specification](https://a2a-protocol.org/latest/specification/): Released, protocol version 1.0.
- [A2A release v1.0.1](https://github.com/a2aproject/A2A/releases/tag/v1.0.1): Released, v1.0.1.
- [a2a.proto at v1.0.1](https://raw.githubusercontent.com/a2aproject/A2A/v1.0.1/specification/a2a.proto): Released, v1.0.1.
- [A2A JSON Schema bundle](https://a2a-protocol.org/latest/spec/a2a.json): Released (non-normative), schema version v1.

## License

MIT
