---
name: cloudevents
description: "CloudEvents 1.0 (1.0.2): describe events in a common format, with context attributes, extensions, the JSON, Avro and Protobuf formats, and the HTTP, Kafka, AMQP, MQTT and NATS bindings, plus upgrades from CloudEvents 0.3. Use when designing event payloads or webhooks, publishing to a queue or topic, choosing binary or structured content mode, mapping ce- headers, validating against the CloudEvents JSON Schema, adding traceparent or partitionkey, upgrading specversion 0.3 events (schemaurl, datacontentencoding), or checking the Subscriptions and Pagination drafts. Triggers: CloudEvents, CNCF CloudEvents, specversion 1.0, application/cloudevents+json, application/cloudevents-batch+json, ce-id, ce-type, ce_ Kafka headers, data_base64, datacontenttype, dataschema, event envelope, webhook delivery, WebHook-Request-Origin, xRegistry."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# CloudEvents

CloudEvents is a specification for describing event data in a common way, published by the CloudEvents project, a CNCF graduated project. Version 1.0.2 defines the context attributes every event carries, event formats that serialize them, and protocol bindings that map them onto transports. With this skill the agent produces and consumes conformant events and picks the right format and binding.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer, consumer, or intermediary (a broker or router that forwards events).
- Transport: HTTP (including webhooks), Kafka, AMQP, MQTT, NATS, or several.
- Target version: CloudEvents 1.0 (default, `specversion: "1.0"`, pinned at 1.0.2). CloudEvents 0.3 is legacy: read it and upgrade from it, never author it. No preview line exists; the 1.0.3-wip main branch is a patch in progress. See [`references/versions.md`](references/versions.md).
- Revision: CloudEvents 1.0.2 for the core specification, formats and bindings. Subscriptions and Pagination are drafts at 0.1-wip; Draft posture: track, pinned to the main-branch text read on 2026-10-02.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check the CloudEvents releases page and README documents table for a newer release (the main branch is 1.0.3-wip), and update the pins.

## Invariants

1. **Four attributes are required**: `id`, `source`, `specversion` and `type` (spec, REQUIRED Attributes). `specversion` is `"1.0"`.
2. **`source` + `id` is unique per distinct event.** A re-sent duplicate may keep the same `id`, and consumers may treat identical `source` and `id` as duplicates (spec, `id`).
3. **Attribute names are lower-case ASCII letters and digits only**, and should not exceed 20 characters. Extension attributes follow the same naming and type rules (spec, Attribute Naming Convention, Extension Context Attributes).
4. **`time` is RFC 3339**, and all producers for one `source` are consistent in how they set it (spec, `time`).
5. **Every implementation supports the JSON format** (spec, Overview). In JSON, extensions are top-level members, the media type is `application/cloudevents+json`, and `data` and `data_base64` are mutually exclusive (JSON format § 2, § 3, § 3.1).
6. **HTTP receivers detect the content mode from `Content-Type`**: `application/cloudevents` means structured, `application/cloudevents-batch` means batched, anything else means binary (HTTP binding § 3). In binary mode, `datacontenttype` maps to `Content-Type` and must not also appear as `ce-datacontenttype` (HTTP binding § 3.1.1).
7. **Batched mode is only used when the receiver asked for it**, and every event in a batch has the same `specversion` (HTTP binding § 1.3, § 3.3).
8. **Intermediaries forward events of 64 KByte or less; consumers should accept at least 64 KByte** (spec, Size Limits).
9. **No sensitive information in context attributes**, because producers, consumers and intermediaries may log them (spec, Privacy and Security).

## Workflow

1. **Pick the version.** Use CloudEvents 1.0. If the input carries `specversion: "0.3"`, treat it as an upgrade (step 8).
   -> [`references/versions.md`](references/versions.md)
   ✓ Every event the design emits has `specversion: "1.0"`.
2. **Design the event type.** Choose a reverse-DNS `type`, a `source` URI-reference, and the `subject`, `dataschema` and `datacontenttype` you need.
   -> [`references/attributes.md`](references/attributes.md)
   ✓ Each event type has a documented `type`, `source` pattern, `data` schema and the optional attributes it uses.
3. **Add extensions only when needed.** Prefer a documented extension, such as `traceparent` for tracing or `partitionkey` for Kafka keys, over a new one.
   -> [`references/attributes.md`](references/attributes.md)
   ✓ Every extension name follows the naming rule and has a definition.
4. **Pick the format.** Use JSON unless the transport or consumers need Avro or Protobuf; decide how `data` is encoded.
   -> [`references/formats.md`](references/formats.md)
   ✓ A sample event serializes and validates against the 1.0.2 JSON Schema.
5. **Map onto the transport.** Choose binary or structured content mode per binding and map attributes to headers or the body.
   -> [`references/bindings.md`](references/bindings.md)
   ✓ A sample HTTP or Kafka message exists for each content mode you support.
6. **Secure delivery.** For webhooks, implement the abuse-protection handshake and the response codes; apply protocol-level security everywhere.
   -> [`references/bindings.md`](references/bindings.md)
   ✓ Webhook targets answer the OPTIONS validation request and return the status codes the webhook spec requires.
7. **Check the draft specs before relying on them.** If the design needs subscriptions, discovery or paginated listings, read their status first.
   -> [`references/drafts.md`](references/drafts.md)
   ✓ No production dependency rests on a draft without a recorded pin.
8. **Upgrade** (only when asked). Follow the 0.3 to 1.0 checklist: change `specversion`, rename `schemaurl` to `dataschema`, replace `datacontentencoding` with `data_base64`, flatten nested extensions.
   -> [`references/versions.md`](references/versions.md)
   ✓ The upgraded events validate against the 1.0.2 JSON Schema and keep the same `id`, `source`, `type` and decoded `data`.

## Verify before done

- [ ] Every event has `id`, `source`, `specversion: "1.0"` and `type`.
- [ ] JSON events validate against the 1.0.2 `cloudevents.json` schema (the schema does not check attribute names, so check those separately).
- [ ] All attribute and extension names match `^[a-z0-9]+$` and are 20 characters or fewer.
- [ ] Binary-mode HTTP messages carry `ce-` headers with percent-encoded values and no `ce-datacontenttype`.
- [ ] Kafka binary-mode messages use `ce_` headers, and the record key follows the binding's key-mapping rule.
- [ ] Events stay within 64 KByte on the least efficient route.
- [ ] No secrets or personal data are carried in context attributes.

## Reference index

- **`references/versions.md`**: CloudEvents 1.0 and 0.3 with their status, what changed in 1.0 and its patch releases, the 0.3 to 1.0 upgrade checklist, and why no preview is listed. Load for steps 1 and 8.
- **`references/attributes.md`**: required and optional attributes, the type system, extension rules, and the documented extensions. Load for steps 2 and 3.
- **`references/formats.md`**: the JSON format, `data` and `data_base64`, the batch format, the JSON Schema, and the Avro and Protobuf formats. Load for step 4.
- **`references/bindings.md`**: HTTP binary, structured and batched modes, header encoding, the webhook spec, and the Kafka, AMQP, MQTT and NATS bindings. Load for steps 5 and 6.
- **`references/drafts.md`**: the status of Subscriptions, Discovery and Pagination, with summaries. Load for step 7.

## Related skills

- `ocsf` to put security and audit events in a CloudEvent's `data`: `npx skills add ScaleDockHQ/scaledock-skills --skill ocsf`.
- `opentelemetry-genai` for tracing AI workloads that emit events: `npx skills add ScaleDockHQ/scaledock-skills --skill opentelemetry-genai`.
- `asyncapi` to document the channels that carry the events: `npx skills add ScaleDockHQ/scaledock-skills --skill asyncapi`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [CloudEvents specification repository and README](https://github.com/cloudevents/spec): CNCF graduated project, main branch (documents table and project status), checked 2026-10-02.
- [CloudEvents v1.0.2 release](https://github.com/cloudevents/spec/releases/tag/ce@v1.0.2): Released, ce@v1.0.2 (2022-02-06), checked 2026-10-02.
- [CloudEvents v1.0-rc1 release notes](https://github.com/cloudevents/spec/releases/tag/v1.0-rc1): Released, v1.0-rc1 (2019-09-20), changes since v0.3, checked 2026-10-05.
- [CloudEvents v1.0.1 release notes](https://github.com/cloudevents/spec/releases/tag/ce@v1.0.1): Released, ce@v1.0.1 (2020-12-12), checked 2026-10-05.
- [CloudEvents - Version 1.0.2](https://raw.githubusercontent.com/cloudevents/spec/v1.0.2/cloudevents/spec.md): Released, 1.0.2, checked 2026-10-02.
- [JSON Event Format for CloudEvents](https://raw.githubusercontent.com/cloudevents/spec/v1.0.2/cloudevents/formats/json-format.md): Released, 1.0.2, checked 2026-10-02.
- [CloudEvents JSON Schema](https://raw.githubusercontent.com/cloudevents/spec/v1.0.2/cloudevents/formats/cloudevents.json): Released, 1.0.2, checked 2026-10-02.
- [Avro Event Format for CloudEvents](https://raw.githubusercontent.com/cloudevents/spec/v1.0.2/cloudevents/formats/avro-format.md): Released, 1.0.2, checked 2026-10-02.
- [Protobuf Event Format for CloudEvents](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/formats/protobuf-format.md): Released, 1.0.2, checked 2026-10-02.
- [HTTP Protocol Binding for CloudEvents](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/http-protocol-binding.md): Released, 1.0.2, checked 2026-10-02.
- [HTTP 1.1 Web Hooks for Event Delivery](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/http-webhook.md): Released, 1.0.2, checked 2026-10-02.
- [Kafka Protocol Binding for CloudEvents](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/kafka-protocol-binding.md): Released, 1.0.2, checked 2026-10-02.
- [AMQP Protocol Binding for CloudEvents](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/amqp-protocol-binding.md): Released, 1.0.2, checked 2026-10-02.
- [MQTT Protocol Binding for CloudEvents](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/mqtt-protocol-binding.md): Released, 1.0.2, checked 2026-10-02.
- [NATS Protocol Binding for CloudEvents](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/nats-protocol-binding.md): Released, 1.0.2, checked 2026-10-02.
- [CloudEvents Extension Attributes (documented extensions)](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/documented-extensions.md): Released, 1.0.2, checked 2026-10-02.
- [Distributed Tracing extension](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/distributed-tracing.md): Released, 1.0.2, checked 2026-10-02.
- [Partitioning extension](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/partitioning.md): Released, 1.0.2, checked 2026-10-02.
- [CloudEvents - Version 0.3](https://raw.githubusercontent.com/cloudevents/spec/v0.3/spec.md): working draft (superseded), v0.3 (2019-06-14), checked 2026-10-05.
- [JSON Event Format for CloudEvents - Version 0.3](https://raw.githubusercontent.com/cloudevents/spec/v0.3/json-format.md): working draft (superseded), v0.3 (2019-06-14), checked 2026-10-05.
- [CloudEvents Subscriptions API](https://github.com/cloudevents/spec/blob/main/subscriptions/spec.md): working draft, Version 0.1-wip (main branch), Draft posture: track, checked 2026-10-02.
- [xRegistry specification repository](https://github.com/xregistry/spec): release candidate, v1.0-rc4 (core and registries), checked 2026-10-02.
- [xRegistry Pagination](https://github.com/xregistry/spec/blob/main/pagination/spec.md): working draft, Version 0.1-wip (main branch), Draft posture: track, checked 2026-10-02.
