# cloudevents

An agent skill for CloudEvents 1.0.2: producing and consuming conformant events over HTTP, webhooks, Kafka, AMQP, MQTT and NATS.

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
- The status of the Subscriptions and Pagination drafts, and the absence of a Discovery specification.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [CloudEvents v1.0.2 release](https://github.com/cloudevents/spec/releases/tag/ce@v1.0.2): Released, the core spec, formats, bindings, webhook spec and extensions at 1.0.2.
- [CloudEvents Subscriptions API](https://github.com/cloudevents/spec/blob/main/subscriptions/spec.md): working draft, 0.1-wip.
- [xRegistry](https://github.com/xregistry/spec): release candidate v1.0-rc4, and the Pagination working draft.

## License

MIT
