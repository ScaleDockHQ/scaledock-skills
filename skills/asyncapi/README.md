# asyncapi

An agent skill for the AsyncAPI Specification 3.1: machine-readable descriptions of event-driven and message-based APIs.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill asyncapi
```

Then ask your agent to "write an AsyncAPI document for our Kafka topics" or "migrate this AsyncAPI 2.6 file to 3.1".

## What it covers

- Servers, channels with address parameters, operations with `send` and `receive`, replies and messages.
- Protocol bindings at the server, channel, operation and message level, including the ROS 2 binding added in 3.1.0.
- Security schemes: user and password, API keys, X.509, HTTP, OAuth 2.0 flows, OpenID Connect and SASL.
- Multi-format schemas (JSON Schema, Avro, Protobuf and others), correlation IDs and traits.
- Migration from 2.x and validation against the official JSON Schemas.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [AsyncAPI Specification 3.1.0](https://www.asyncapi.com/docs/reference/specification/v3.1.0): Released, 3.1.0.
- [AsyncAPI 3.1.0 release](https://github.com/asyncapi/spec/releases/tag/v3.1.0): Released, v3.1.0.
- [Migrating to v3](https://www.asyncapi.com/docs/migration/migrating-to-v3): AsyncAPI guide.
- [AsyncAPI 3.1.0 JSON Schema](https://raw.githubusercontent.com/asyncapi/spec-json-schemas/v6.11.1/schemas/3.1.0.json): spec-json-schemas v6.11.1.

## License

MIT
