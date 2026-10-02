# CloudEvents drafts: Subscriptions, Discovery and Pagination

Sources: the CloudEvents spec repository README (main branch), the Subscriptions API working draft, the xRegistry repository README and the xRegistry Pagination working draft.

Draft posture for this skill: **track**. Name these documents and describe their shape, but do not build production contracts on them, and re-read the source before relying on a detail.

## Status

| Document                                                                        | Where                                       | Status                                       |
| ------------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------- |
| CloudEvents core, JSON, Avro, Protobuf, HTTP, Kafka, AMQP, MQTT, NATS, Web hook | `cloudevents/spec`                          | Released, v1.0.2                             |
| CE SQL                                                                          | `cloudevents/spec`                          | Released, v1.0.0                             |
| Subscriptions API                                                               | `cloudevents/spec`, `subscriptions/spec.md` | Working draft, "Version 0.1-wip", no release |
| Discovery                                                                       | Not in either repository                    | No document exists                           |
| Registry (xRegistry core and registries)                                        | `xregistry/spec`                            | Release candidate, v1.0-rc4                  |
| Pagination                                                                      | `xregistry/spec`, `pagination/spec.md`      | Working draft, "Version 0.1-wip"             |

The CloudEvents README states that the Registry and Pagination specifications are now in the `xregistry/spec` repository. It lists no Discovery specification. Older material that refers to a "CloudEvents Discovery API" describes a document that is no longer published there; use xRegistry for discovering endpoints and message definitions instead.

## Subscriptions API (working draft)

- Defines terms (source, producer, intermediary, consumer, subscription, subscription manager) and describes how native mechanisms in MQTT, AMQP, NATS, Kafka and HTTP already provide subscriptions (§ 3.1).
- Defines a Subscription Manager API (§ 3.2). A subscription object has `id`, optional `source`, `types`, `config` and `filters`, a required `sink` and `protocol`, and optional `sinkcredential` and `protocolsettings`. Operations are create, retrieve, query, update and delete, with HTTP and AMQP bindings (§ 3.3, § 3.4).
- Filters name a dialect. The draft requires six dialects (`exact`, `prefix`, `suffix`, `all`, `any`, `not`) and makes `sql` (CE SQL) optional (§ 3.2.4).

```json
{
  "sink": "https://hooks.example.com/events",
  "protocol": "HTTP",
  "filters": [{ "prefix": { "type": "com.example.invoice." } }]
}
```

The example only shows the filter shape; field names may change while the draft is "0.1-wip".

## xRegistry Pagination (working draft)

- A server returns a large result set in subsets. The client may send `limit`; if the server cannot meet it, the server generates an error.
- Over HTTP, the client sends a GET and the server answers 200 with links whose `rel` is `next`, `prev`, `first` or `last`. `next` must be present unless the response reaches the end of the set, and `prev` must not be present at the start. Clients treat link URIs as opaque and must not modify them.
- An optional `count` gives the total number of records across all subsets.

## When to revisit

Re-fetch the CloudEvents README and the xRegistry README before using any of these drafts. A new release, or a move between repositories, changes the posture.
