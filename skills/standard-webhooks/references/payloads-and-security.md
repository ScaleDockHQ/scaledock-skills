# Payloads and security

Read this when designing event types and payload bodies, documenting them, or hardening the sending infrastructure. Section names refer to the Standard Webhooks specification; the SSRF list refers to OWASP API7:2023, which the specification cites. Both are in [Sources](../SKILL.md#sources).

## Payload structure

The specification imposes no requirement on the shape, format or content of the payload; everything here is a recommendation (Payload):

- Send the payload in the HTTP body (Payload structure).
- Use JSON for maximum compatibility; other content types are allowed (Payload structure).
- Use these top-level members (Payload structure):
  - `type`: a full-stop delimited, hierarchically grouped event type such as `user.created` or `invoice.paid`. It names the event and the schema of `data`.
  - `timestamp`: when the event occurred, which is not necessarily when it was delivered, in ISO 8601.
  - `data`: the event data. It may instead be squashed into the top-level object.
  - Additional metadata may go at the top level or inside `data`.

```json
{
  "type": "example.event",
  "timestamp": "2022-11-03T20:26:10.344522Z",
  "data": {
    "foo": "bar",
    "fizzbuzz": 2
  }
}
```

Do not confuse the payload `timestamp` (event time, ISO 8601) with the `webhook-timestamp` header (attempt time, integer Unix seconds) (Payload structure, Webhook headers, Webhook metadata).

## Event types

- Format event types as a hierarchical, full-stop delimited list of identifiers using only `[a-zA-Z0-9_]`. Friendlier display strings, such as "A user has been created" for `user.created`, are separate (Event types).
- A payload for one event type always has the same schema (Event types).

## Documenting payloads

Provide an example payload for each event type, and a formal specification of its structure, "such as JSON Schema or OpenAPI" (Payload structure). That sentence is the specification's only OpenAPI guidance: it does not define how to describe webhooks in an OpenAPI document. The README adds that formal definitions in JSON Schema, OpenAPI or AsyncAPI let tools generate consumer SDKs that validate schemas as well as signatures. For writing the description itself, see the `openapi` and `asyncapi` skills under Related skills in `SKILL.md`.

## Thin and full payloads

- A **full** payload carries the full event information, the state of related entities and what changed. A **thin** payload carries the identifiers of affected entities and possibly details of the change (Thin vs full payloads).
- It is not binary: a thin payload can include a commonly used field such as `fullName` (Thin vs full payloads).
- Full payloads save the consumer extra API calls. Thin payloads perform better, are more flexible to generate, are more future proof (a thin payload can become full, not the reverse), and give better control over data flow: consumers fetch what they need through the API, which can be audited and restricted (Thin vs full payloads).

Thin example from the specification:

```json
{
  "type": "contact.created",
  "timestamp": "2022-11-03T20:26:10.344522Z",
  "data": {
    "id": "1f81eb52-5198-4599-803e-771906343485"
  }
}
```

## Payload size

Keep payloads small, usually under 20 kB, so you do not impose load on consumers who may not want this event or all its data. For large data such as images, upload it elsewhere and send a link, or include the resource or URL to query (Payload size).

## Server side request forgery (SSRF)

Webhook senders are especially exposed to SSRF, because customers register arbitrary URLs that internal systems then call. An attacker can point a URL at cloud metadata, internal HTTP services or databases (Server side request forgery).

The specification's two defences (Server side request forgery):

1. Send every webhook through a proxy that filters internal IP addresses (it names Stripe's smokescreen as an example).
2. Run the webhook workers, or the proxy, in their own private subnet that cannot reach internal services.

OWASP API7:2023 "How To Prevent", which the specification cites, adds:

- Isolate the resource-fetching mechanism in your network.
- Use allow lists of URL schemes and ports where possible.
- Disable HTTP redirections; for webhooks this matches treating `3xx` as failure (Delivery success and failure).
- Use a well-tested URL parser.
- Validate and sanitize client-supplied input.
- Do not send raw responses back to clients.

## Transport and network

- Signatures provide authenticity and integrity but no encryption; require HTTPS when the content warrants it (Enforcing HTTPS).
- Offer static source IPs for consumers behind firewalls if needed (Static source IPs).

## Threats the scheme addresses

The project website names SSRF, spoofing and replay as the attacks every implementation must protect against. In the specification:

| Threat                    | Control                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| Spoofing, tampering       | Signature over `msg_id.timestamp.payload` (Signature scheme).                                    |
| Replay                    | `webhook-timestamp` tolerance check, plus de-duplication on `webhook-id` (Verifying signatures). |
| Timing oracle             | Constant-time comparison of symmetric signatures (Verifying signatures).                         |
| Key substitution          | Consumer trust list of public keys and schemes (Signature scheme, Additional considerations).    |
| Cross-customer key misuse | Unique keys per endpoint or customer (Signature scheme, Additional considerations).              |
| Eavesdropping             | HTTPS (Enforcing HTTPS).                                                                         |
| SSRF                      | Filtering proxy and isolated subnet (Server side request forgery).                               |
| Over-sharing data         | Thin payloads and producer-side event filtering (Thin vs full payloads, Event types).            |
