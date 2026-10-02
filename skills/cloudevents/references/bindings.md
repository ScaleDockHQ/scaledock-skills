# CloudEvents 1.0.2 protocol bindings and webhooks

Sources: HTTP Protocol Binding 1.0.2, HTTP 1.1 Web Hooks for Event Delivery 1.0.2, and the Kafka, AMQP, MQTT and NATS bindings at 1.0.2.

## Content modes

| Mode                | Where the attributes go                   | Where `data` goes          |
| ------------------- | ----------------------------------------- | -------------------------- |
| Binary              | Protocol metadata (headers or properties) | The message body, as is    |
| Structured          | The body, in an event format such as JSON | Inside the formatted event |
| Batched (HTTP only) | The body, as a batch format               | Inside each event          |

HTTP implementations should support both structured and binary mode (HTTP binding § 1.3). Batched mode must not be used unless the receiver asked for it, and all events in a batch have the same `specversion` (§ 1.3, § 3.3).

## HTTP

### Detecting the mode (§ 3)

| `Content-Type` starts with      | Mode       |
| ------------------------------- | ---------- |
| `application/cloudevents-batch` | Batched    |
| `application/cloudevents`       | Structured |
| anything else                   | Binary     |

### Binary mode (§ 3.1)

- `Content-Type` carries `datacontenttype`; there is no `ce-datacontenttype` header (§ 3.1.1).
- Every other attribute, including extensions, maps to a header named `ce-` plus the attribute name, for example `ce-id`, `ce-specversion`, `ce-time` (§ 3.1.3.1).
- Header values are the canonical string encoding, percent-encoded: space, double-quote, percent, and every character outside U+0021 to U+007E. Encode with upper-case hex; decoders accept lower-case, accept unnecessary encoding, and reject invalid UTF-8 such as the overlong `%C0%A0` (§ 3.1.3.2).
- Decoders also unescape double-quoted header values first, for compatibility with older senders (§ 3.1.3.2).

```http
POST /events HTTP/1.1
Host: hooks.example.com
Content-Type: application/json
ce-specversion: 1.0
ce-id: c4b6a6b2-6c1e-4c35-9c55-9f0f6d1c0b11
ce-source: https://api.example.com/invoices
ce-type: com.example.invoice.paid
ce-subject: inv_1042
ce-time: 2026-10-02T09:30:00Z

{"invoiceId":"inv_1042","amount":4200,"currency":"EUR"}
```

### Structured mode (§ 3.2)

```http
POST /events HTTP/1.1
Host: hooks.example.com
Content-Type: application/cloudevents+json; charset=UTF-8

{"specversion":"1.0","id":"c4b6a6b2-6c1e-4c35-9c55-9f0f6d1c0b11","source":"https://api.example.com/invoices","type":"com.example.invoice.paid","datacontenttype":"application/json","data":{"invoiceId":"inv_1042"}}
```

### Header encoding in TypeScript

```ts
export function encodeHeaderValue(value: string): string {
  let out = "";
  for (const char of value) {
    const code = char.codePointAt(0)!;
    const safe = code >= 0x21 && code <= 0x7e && char !== '"' && char !== "%";
    out += safe
      ? char
      : Array.from(
          new TextEncoder().encode(char),
          (b) => "%" + b.toString(16).toUpperCase().padStart(2, "0"),
        ).join("");
  }
  return out;
}
```

`for...of` iterates by code point, so a surrogate pair is treated as one character, as § 3.1.3.2 requires.

## Webhooks (HTTP 1.1 Web Hooks for Event Delivery)

Delivery (§ 2):

- The connection uses HTTPS, and the delivery request is a POST that carries `Content-Type` and a payload; header-only notifications are not permitted.
- The response must not be a 3xx redirect, and the sender must not follow one.
- 200 or 201 with a body (and `Content-Type`) when processed with details; 201 or 204 when processed without a body; 202 when accepted but not yet processed.
- 410 when the target is retired; the sender should stop sending.
- 429 with `Retry-After` when rate-limited; the sender must wait.
- 415 when the notification format is not understood.

Authorization (§ 3): the delivery request uses either the `Authorization` header (§ 3.1) or the `access_token` URI query parameter (§ 3.2), and the target must support both. Any token-based scheme may be used; challenge-based schemes must not; OAuth 2.0 Bearer tokens use the `Bearer` scheme. The query parameter should not be used unless the header is impossible, because the token may be logged.

Abuse protection (§ 4): the sender runs a validation handshake, at registration time or as a pre-flight before delivery, with an HTTP OPTIONS request to the exact target URI. The request carries `WebHook-Request-Origin` (a DNS name for the sender), and optionally `WebHook-Request-Callback` and `WebHook-Request-Rate`. A target that agrees answers with `WebHook-Allowed-Origin` and optionally `WebHook-Allowed-Rate`. Targets should support the handshake; if a target supports and requires it, every delivery request includes `WebHook-Request-Origin`. The handshake only protects the sender from pushing to a target that is not expecting the traffic; it does not establish authentication or authorization.

## Kafka

- **Key mapping** (§ 3.1): by default the user-provided record key maps to the Kafka record key. Implementations should offer an opt-in key mapper that uses `partitionkey` as is. A key mapper must not modify the event, so `partitionkey` stays in the event and no attribute is added from out-of-band configuration.
- **Binary mode** (§ 3.2): `datacontenttype` maps to the `content-type` header; other attributes map to headers named `ce_` plus the attribute name, for example `ce_id`.
- **Structured mode** (§ 3.3): `content-type` is the event format's media type, for example `application/cloudevents+json`.

## AMQP, MQTT and NATS

| Binding | Binary mode                                                                                         | Structured mode                                          |
| ------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| AMQP    | Attributes in `application-properties` with the `cloudEvents:` prefix, for example `cloudEvents:id` | Supported                                                |
| MQTT    | MQTT 5.0 only: attributes as PUBLISH User Properties with unchanged names                           | MQTT 3.1.1 is always structured; MQTT 5.0 sender chooses |
| NATS    | Not supported at 1.0.2, because NATS lacked custom headers                                          | Always structured                                        |
