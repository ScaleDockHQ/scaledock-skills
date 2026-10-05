# asyncapi

An agent skill for the AsyncAPI Specification 3.1 and 3.0: machine-readable descriptions of event-driven and message-based APIs, with upgrades from 2.x.

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
- Upgrades from 2.x and 3.0 to 3.1, and validation against the official JSON Schemas.

## Versions

| Line         | Status                            |
| ------------ | --------------------------------- |
| AsyncAPI 3.1 | current                           |
| AsyncAPI 3.0 | supported                         |
| AsyncAPI 2.6 | legacy (covers 2.x; upgrade from) |

No 4.0 preview exists yet. `references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [AsyncAPI Specification 3.1.0](https://www.asyncapi.com/docs/reference/specification/v3.1.0): Released, 3.1.0.
- [AsyncAPI 3.1.0 release](https://github.com/asyncapi/spec/releases/tag/v3.1.0): Released, v3.1.0.
- [AsyncAPI 3.1.0 release notes](https://www.asyncapi.com/blog/release-notes-3.1.0): 3.1.0.
- [AsyncAPI 3.0.0 text](https://raw.githubusercontent.com/asyncapi/spec/v3.0.0/spec/asyncapi.md) and [release](https://github.com/asyncapi/spec/releases/tag/v3.0.0): Released, 3.0.0.
- [AsyncAPI 2.6.0 text](https://raw.githubusercontent.com/asyncapi/spec/v2.6.0/spec/asyncapi.md) and [release](https://github.com/asyncapi/spec/releases/tag/v2.6.0): Released, 2.6.0.
- [AsyncAPI specification releases](https://github.com/asyncapi/spec/releases): latest v3.1.0, no 4.0 pre-release.
- [Migrating to v3](https://www.asyncapi.com/docs/migration/migrating-to-v3): AsyncAPI guide.
- [AsyncAPI 3.1.0 JSON Schema](https://raw.githubusercontent.com/asyncapi/spec-json-schemas/v6.11.1/schemas/3.1.0.json): spec-json-schemas v6.11.1.

## License

MIT
