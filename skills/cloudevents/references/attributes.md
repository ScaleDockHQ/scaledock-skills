# CloudEvents 1.0.2 context attributes and extensions

Source: CloudEvents - Version 1.0.2 (`spec.md`), sections Context Attributes, Type System, REQUIRED Attributes, OPTIONAL Attributes and Extension Context Attributes; the documented extensions at 1.0.2.

## Naming

Attribute names consist of lower-case ASCII letters (`a` to `z`) or digits (`0` to `9`). They should be descriptive and terse and should not exceed 20 characters (Attribute Naming Convention). The rule exists because a single event can pass through protocols and runtimes that differ in case sensitivity.

## Type system

| Type            | Canonical string encoding                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `Boolean`       | `true` or `false`, case-sensitive                                                                             |
| `Integer`       | Signed 32-bit range, -2,147,483,648 to 2,147,483,647                                                          |
| `String`        | Unicode, excluding control characters U+0000-U+001F and U+007F-U+009F, noncharacters, and unpaired surrogates |
| `Binary`        | Base64 (RFC 4648)                                                                                             |
| `URI`           | Absolute URI (RFC 3986 § 4.3)                                                                                 |
| `URI-reference` | URI-reference (RFC 3986 § 4.1)                                                                                |
| `Timestamp`     | RFC 3339                                                                                                      |

Every context attribute value is one of these types. A strongly typed SDK must convert to and from the canonical string encoding; for example `time` must be settable from an RFC 3339 string.

## REQUIRED attributes

| Attribute     | Type          | Rules                                                                                                                                                                    |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`          | String        | Non-empty. `source` + `id` is unique for each distinct event. A re-sent duplicate may keep the same `id`; consumers may treat identical `source` and `id` as duplicates. |
| `source`      | URI-reference | Non-empty. Identifies the context in which the event happened. A source may include several producers, which then must agree on unique `id` values.                      |
| `specversion` | String        | `1.0` for this version.                                                                                                                                                  |
| `type`        | String        | Non-empty. Should be prefixed with a reverse-DNS name, for example `com.example.invoice.paid`.                                                                           |

## OPTIONAL attributes

| Attribute         | Type              | Rules                                                                                                       |
| ----------------- | ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `datacontenttype` | String (RFC 2046) | Content type of `data`. In the JSON format, an absent `datacontenttype` implies `application/json`.         |
| `dataschema`      | URI               | Non-empty URI of the schema `data` adheres to. Incompatible schema changes should get a different URI.      |
| `subject`         | String            | Non-empty. The subject of the event within the context of `source`, for example a file name under a bucket. |
| `time`            | Timestamp         | RFC 3339. All producers for the same `source` must be consistent in how they determine it.                  |

## Extension attributes

An event may carry any number of extension attributes with distinct names. They follow the same naming convention and type system as standard attributes, have no meaning defined by the core specification, and are serialized by bindings like standard attributes (Extension Context Attributes). Check the documented extensions before defining a new one, and give a new extension a descriptive name to avoid collisions.

Documented extensions at 1.0.2: Dataref (claim check pattern), Distributed Tracing, Partitioning, Sampling, Sequence.

### Distributed Tracing

| Attribute     | Type   | Constraint                                         |
| ------------- | ------ | -------------------------------------------------- |
| `traceparent` | String | REQUIRED in the extension; W3C Trace Context § 3.2 |
| `tracestate`  | String | OPTIONAL; W3C Trace Context § 3.3                  |

The extension does not replace protocol tracing headers. For a single hop it must carry the same trace information as the protocol headers. For multiple hops it must carry the trace of the starting transmission and must not carry per-hop trace information.

### Partitioning

`partitionkey` (String, non-empty) groups related events, for example by the ID of the entity the event is about. Its value may change or be removed across hops. The Kafka binding uses it for an opt-in key mapper.

## Example

```json
{
  "specversion": "1.0",
  "id": "c4b6a6b2-6c1e-4c35-9c55-9f0f6d1c0b11",
  "source": "https://api.example.com/invoices",
  "type": "com.example.invoice.paid",
  "subject": "inv_1042",
  "time": "2026-10-02T09:30:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://schemas.example.com/invoice-paid/v1.json",
  "traceparent": "00-0af7651916cd43dd8448eb211c80319c-b9c7c989f97918e1-01",
  "data": { "invoiceId": "inv_1042", "amount": 4200, "currency": "EUR" }
}
```
