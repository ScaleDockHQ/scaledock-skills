# CloudEvents 1.0.2 event formats

Sources: JSON Event Format 1.0.2, the 1.0.2 JSON Schema (`cloudevents.json`), Avro Event Format 1.0.2 and Protobuf Event Format 1.0.2.

## JSON format

- **Type mapping** (§ 2.2): Boolean to JSON boolean, Integer to JSON number, String, Binary, URI, URI-reference and Timestamp to JSON string. A `null` value for an attribute means the attribute is unset.
- **Extensions** are serialized as top-level JSON members (§ 2).
- **Media type** for a single event is `application/cloudevents+json` (§ 3).
- **All REQUIRED attributes and all present OPTIONAL attributes** are members of the JSON object (§ 3).

### Handling of `data` (§ 3.1)

| Runtime data                                           | Serialization                                                    |
| ------------------------------------------------------ | ---------------------------------------------------------------- |
| Binary                                                 | `data_base64`, a JSON string with Base64 content                 |
| `datacontenttype` is `*/json` or `*/*+json`, or absent | `data` holds the JSON value directly, not an encoded JSON string |
| Any other content type                                 | `data` holds a string representation                             |

`data` and `data_base64` are mutually exclusive. When deserializing, a JSON content type means `data` is treated as a JSON value; if `data` is a string, it is a JSON string and must not be parsed again (§ 3.1.2).

### Batch format (§ 4)

A batch is a JSON array of events in the JSON format, with media type `application/cloudevents-batch+json` (§ 4.1, § 4.2). The spec's examples include an empty batch, typically used in a response (§ 4.3). The batch format is a separate format: it must not be used when only support for the JSON format is indicated (§ 4).

```json
[
  {
    "specversion": "1.0",
    "id": "1",
    "source": "/orders",
    "type": "com.example.order.created",
    "data": { "orderId": "o-1" }
  },
  {
    "specversion": "1.0",
    "id": "2",
    "source": "/orders",
    "type": "com.example.order.created",
    "data_base64": "AAEC"
  }
]
```

### JSON Schema

The 1.0.2 schema is JSON Schema draft-07. It requires `id`, `source`, `specversion` and `type`; checks `source` as `uri-reference`, `dataschema` as `uri` and `time` as `date-time`; and allows `null` for optional attributes. It does not restrict extra properties, so it does not check attribute names against the naming convention. Check names separately with `^[a-z0-9]+$`.

## Avro format

Context attributes map to Avro types: Integer to `int`, Binary to `bytes`, Timestamp to `string`, and so on. OPTIONAL attributes use the `null` type in a union with the actual type, for example `["null", "string"]`. The format defines the Avro schema for the envelope and the `data` union.

## Protobuf format

A Protobuf `data` message is stored in `proto_data` (a `google.protobuf.Any`), text in `text_data`, and binary in `binary_data`; `datacontenttype` may be `application/protobuf` for Protobuf data. A serialized event uses the media type `application/cloudevents+protobuf`, and a batch uses `application/cloudevents-batch+protobuf`.

## Choosing a format

- Use JSON when interoperability matters most; every implementation must support it (core spec, Overview).
- Use Avro or Protobuf when the transport already uses that encoding, and confirm every consumer supports the format.
- Within one route, use the least efficient encoding to check the 64 KByte size rule (core spec, Size Limits).

## TypeScript: build and check a JSON event

```ts
type CloudEvent<T = unknown> = {
  specversion: "1.0";
  id: string;
  source: string;
  type: string;
  datacontenttype?: string;
  dataschema?: string;
  subject?: string;
  time?: string;
  data?: T;
  data_base64?: string;
  [extension: string]: unknown;
};

const ATTRIBUTE_NAME = /^[a-z0-9]+$/;

export function createEvent<T>(
  type: string,
  source: string,
  data: T,
  extra: Partial<CloudEvent<T>> = {},
): CloudEvent<T> {
  return {
    specversion: "1.0",
    id: crypto.randomUUID(),
    source,
    type,
    time: new Date().toISOString(),
    datacontenttype: "application/json",
    data,
    ...extra,
  };
}

export function checkEvent(event: Record<string, unknown>): string[] {
  const problems: string[] = [];
  for (const name of ["id", "source", "specversion", "type"]) {
    if (typeof event[name] !== "string" || event[name] === "")
      problems.push(`${name} is required`);
  }
  if (event.specversion !== "1.0") problems.push("specversion must be 1.0");
  if ("data" in event && "data_base64" in event)
    problems.push("data and data_base64 are mutually exclusive");
  for (const name of Object.keys(event)) {
    if (name !== "data_base64" && !ATTRIBUTE_NAME.test(name))
      problems.push(`invalid attribute name ${name}`);
    else if (name !== "data_base64" && name.length > 20)
      problems.push(`attribute name ${name} exceeds 20 characters`);
  }
  return problems;
}
```

`data_base64` is a JSON-format member, not a context attribute, so it is excluded from the name check.
