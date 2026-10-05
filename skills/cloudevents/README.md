# cloudevents

An agent skill for CloudEvents 1.0 (pinned at 1.0.2): producing and consuming conformant events over HTTP, webhooks, Kafka, AMQP, MQTT and NATS, and upgrading CloudEvents 0.3 events.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill cloudevents
```

Then ask your agent to "wrap our webhook payloads in CloudEvents" or "publish these events to Kafka as CloudEvents".

## What it covers

- Required and optional context attributes, the type system, naming rules and extension attributes, including `traceparent` and `partitionkey`.
- The JSON format with `data` and `data_base64`, the batch format, the JSON Schema, and the Avro and Protobuf formats.
- HTTP binary, structured and batched content modes, header percent-encoding, and the webhook delivery and abuse-protection rules.
- The Kafka, AMQP, MQTT and NATS bindings.
- Upgrading CloudEvents 0.3 events to 1.0.
- The status of the Subscriptions and Pagination drafts, and the absence of a Discovery specification.

## Versions

| Line            | Status                |
| --------------- | --------------------- |
| CloudEvents 1.0 | current (1.0.2)       |
| CloudEvents 0.3 | legacy (upgrade from) |

`references/versions.md` says which line to use, what changed in 1.0 and how to upgrade from 0.3. The 1.0.3-wip main branch is a patch in progress, not a preview.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [CloudEvents v1.0.2 release](https://github.com/cloudevents/spec/releases/tag/ce@v1.0.2): Released, the core spec, formats, bindings, webhook spec and extensions at 1.0.2.
- [CloudEvents v1.0-rc1 release notes](https://github.com/cloudevents/spec/releases/tag/v1.0-rc1) and [v1.0.1 release notes](https://github.com/cloudevents/spec/releases/tag/ce@v1.0.1): Released, the changes since 0.3 and within the 1.0 line.
- [CloudEvents - Version 0.3](https://raw.githubusercontent.com/cloudevents/spec/v0.3/spec.md) and its [JSON format](https://raw.githubusercontent.com/cloudevents/spec/v0.3/json-format.md): working draft, superseded, v0.3.
- [CloudEvents Subscriptions API](https://github.com/cloudevents/spec/blob/main/subscriptions/spec.md): working draft, 0.1-wip.
- [xRegistry](https://github.com/xregistry/spec): release candidate v1.0-rc4, and the Pagination working draft.

## License

MIT
