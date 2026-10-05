# Processing model, other protocols, privacy and security

Read this when building the receive-and-forward logic of a tracer, proxy, gateway or message bus, when deciding what happens at a trust boundary, or when carrying trace context over something other than HTTP. Section numbers are from Trace Context Level 1 unless marked "L2" or "Baggage".

## Two levels of compliance (§ 2.3)

- **Forwarding**: at minimum, a tracing tool MUST propagate `traceparent` and `tracestate` and guarantee traces are not broken.
- **Participating**: it also modifies `traceparent` and its own part of `tracestate`.
- A tool may choose per request (§ 2.3). Every tool MUST set `traceparent` properly even if it relies on `tracestate` for its own data (§ 2.3).

## Processing model (§ 4, non-normative; L2 § 4.1)

The section is non-normative, but it repeats normative rules from § 3 and is the reference flow for tracers, middleware and cloud services (§ 4).

### No `traceparent` received (§ 4.2)

1. Create a new `trace-id` and `parent-id` for the current request.
2. Discard any `tracestate` that arrived without `traceparent`; it is invalid and MUST be discarded.
3. SHOULD create a new `tracestate` with your own key/value pair.
4. Set both headers on outgoing requests.

Level 2: if you are not sampling but still want to tell downstream, you MAY mint IDs that have no trace data behind them, or you MAY choose not to communicate the decision (L2 § 4.1.1). Generating `traceparent` for outbound requests is a SHOULD (L2 § 3.4).

### `traceparent` received (§ 4.3)

1. Parse the version. If it cannot be parsed, create a new `traceparent` and delete `tracestate`.
2. Higher version than supported: parse `trace-id` and `parent-id` with the `00` format, and only the flags you support. If parsing fails, create a new `traceparent` and delete `tracestate`. Unknown flags go out as `0`.
3. Supported version: validate `trace-id`, `parent-id` and `trace-flags`. If any is invalid, create a new `traceparent` and delete `tracestate`.
4. You MAY validate `tracestate`. If it cannot be parsed you MAY discard it whole; invalid entries MAY be discarded individually.
5. For each outgoing request, a participant MUST set `parent-id` to the ID of the current operation, and MAY set the sampled flag to `1` if the data is likely to be recorded, or `0` otherwise.
6. It MAY update its `tracestate` entry (moved to the left), add one (on the left), or delete pairs (SHOULD NOT delete other vendors' keys).
7. Set both headers on the outgoing request.

### Alternative processing (§ 4.4)

Proxies and messaging middleware MAY support a subset: leave `traceparent` unchanged but remove invalid headers, or add information to `tracestate`. Remember § 3.4: if `traceparent` is forwarded unchanged, `tracestate` MUST NOT be modified, so a component that adds a `tracestate` entry must also update `parent-id` (§ 3.4, § 3.5).

### Decision table

| Incoming                                    | Outgoing `traceparent`                         | Outgoing `tracestate`                        |
| ------------------------------------------- | ---------------------------------------------- | -------------------------------------------- |
| none                                        | new trace                                      | new, with your entry (SHOULD)                |
| `tracestate` only                           | new trace                                      | discard the received one (MUST)              |
| unparsable version prefix                   | new trace                                      | deleted                                      |
| version `00`, invalid field                 | new trace                                      | deleted                                      |
| higher version, parsable first three fields | same `trace-id`, new `parent-id`, version `00` | forwarded, optionally your entry on the left |
| valid, pass-through component               | unchanged                                      | unchanged                                    |
| valid, participant                          | same `trace-id`, new `parent-id`               | your entry on the left, others in order      |
| valid, front gate into a secure network     | restart (regenerate all fields)                | SHOULD be cleaned up                         |

## Other protocols (§ 5)

Trace Context is defined for HTTP. Extensions and external specifications define the serialization for other protocols, possibly at a different maturity level; the Trace Context Protocols Registry, a W3C Working Group Note of 19 November 2019, lists them (§ 5). It names three W3C drafts: Trace Context binary protocol, Trace Context AMQP protocol and Trace Context MQTT protocol. All three GitHub repositories (`w3c/trace-context-binary`, `w3c/trace-context-amqp`, `w3c/trace-context-mqtt`) are archived and their READMEs say "DISCONTINUED" (checked 2026-10-05). Do not build against them as W3C specifications. The value formats in this skill still apply wherever another binding carries the same fields, but which field or property carries them is defined by that binding, not by these sources.

## Privacy

Trace Context (§ 6; L2 § 6):

- Vendors MUST NOT put personally identifiable or otherwise sensitive information in `traceparent` or `tracestate`; their only purpose is trace correlation (§ 6).
- Vendors MUST assess the risk of header abuse. They may inspect and remove sensitive information, using only the allowed mutations (§ 6).
- Random number generators MUST NOT rely on potentially user-identifiable information such as an IP address as seed (§ 6.1). L2 states it directly: `traceparent` MUST NOT contain PII (L2 § 6.1).
- Correlation across requests is a privacy risk. Services MAY restart `traceparent` to remove it, but vendors SHOULD minimize restarts, for example by restarting only for authentication requests to or from external services (§ 6.1).
- Vendors MUST NOT include PII in `tracestate`. Very privacy-sensitive vendors MAY remove values of unknown keys, but vendors SHOULD NOT mutate `tracestate` in general (§ 6.2).
- When returning `traceparent` or `tracestate` in responses, include them only for systems that participated in the trace; they can leak to cross-origin callers (§ 6.3).

Baggage (Baggage § 5, § 5.1): systems MUST assess the risk of header abuse. Baggage is meant for systems within the same trust boundary; it may contain user-identifiable data, so applications remove what they do not want propagated. See [`baggage.md`](baggage.md).

## Security (§ 7; Baggage § 4)

- Parse defensively: check header length and value content to avoid buffer overflow and injection (§ 7; Baggage § 4).
- **Information exposure**: `traceparent` can correlate requests; `tracestate` can reveal monitoring software versions. Keep confidential data out of `tracestate`, or strip it on requests to external systems (§ 7.1). The same applies to `baggage` across trust boundaries (Baggage § 4.1).
- **Denial of service**: a public API that blindly honours `sampled` can be flooded with tracing overhead, forged `trace-id` collisions, or tracing bills. Apply checks such as different behaviour for authenticated and unauthenticated callers, and rate limits on recording (§ 7.2). Flags are recommendations, not commands (§ 3.2.2.5).
- **Front gates**: restarting the trace at the entry to a secure network removes the attack surface (§ 3.4).
- **CORS**: browser apps that send `traceparent`, `tracestate` or `baggage` cross-origin need the server to allow those headers in `Access-Control-Allow-Headers`, or the request fails. Test every such code path (§ 7.3; Baggage § 4.2).

## Trust-boundary checklist

At an edge where untrusted traffic enters:

1. Decide: continue the incoming trace, or restart it (§ 3.4, § 6.1). Restart for unauthenticated or external callers if abuse is a concern (§ 7.2).
2. On restart, clean up `tracestate` unless keeping it is an explicit decision (§ 3.4).
3. Do not let an incoming `sampled=1` force recording without rate limits (§ 7.2).
4. Strip or filter `baggage` from untrusted sources and toward external systems (Baggage § 4.1, § 5.1).
5. Return trace headers in responses only to participants (§ 6.3).
