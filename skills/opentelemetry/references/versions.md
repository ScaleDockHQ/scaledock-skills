# Versions and upgrades

Read this when choosing which specification, semantic conventions and OTLP release to build to, when reading instrumentation or a backend that emits older attribute names such as `http.method`, or when deciding what to do with OTLP profiles. Sources: the GitHub releases of opentelemetry-specification, semantic-conventions and opentelemetry-proto, the migration guides in semantic-conventions `v1.44.0`, and `versioning-and-stability.md` and `maturity-levels.md` of the specification, listed in [Sources](../SKILL.md#sources).

## Version lines

OpenTelemetry publishes three separately versioned documents, so the skill tracks three families. The specification (API, SDK, configuration and the OTLP exporter) has no family name. Semantic conventions are the `semconv` family, and the protocol is the `otlp` family. All three are on major version 1, and the specification says there are currently no plans for a major version past v1.0 (`versioning-and-stability.md`, A note on replacing signals).

| Id                      | Line                                              | Status  | Revision                                                                               | Posture | Summary                                                                                               |
| ----------------------- | ------------------------------------------------- | ------- | -------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `1.61`                  | OpenTelemetry Specification 1.61.0                | current | v1.61.0, 2026-09-14                                                                    |         | API and SDK for traces, metrics and logs; resources, propagation, environment and file configuration. |
| `semconv-1.44`          | Semantic Conventions 1.44.0                       | current | v1.44.0, 2026-08-04; schema URL `https://opentelemetry.io/schemas/1.44.0`              |         | Attribute, span, metric and event conventions; HTTP and database spans Stable, RPC Release Candidate. |
| `semconv-http-1.20`     | pre-stable HTTP conventions (v1.20.0 and earlier) | legacy  | specification v1.20.0, 2023-04-07, `trace/semantic_conventions/http.md` (Experimental) |         | `http.method`, `http.status_code`, `net.peer.name` and friends. Read and upgrade from, never author.  |
| `otlp-1.11`             | OTLP 1.11.1                                       | current | opentelemetry-proto v1.11.1, 2026-09-29                                                |         | Protobuf over gRPC (4317) and HTTP (4318), with JSON; Stable for traces, metrics and logs.            |
| `otlp-profiles-preview` | OTLP profiles (Development)                       | preview | `v1development` profiles packages in opentelemetry-proto v1.11.1                       | track   | The profiles signal and `/v1development/profiles`. Development; not for production.                   |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Releases inside a family are minor releases of the same major line, so only the newest of each is listed. The website pages for the specification and semantic conventions show 1.61.0 and 1.44.0; the OTLP page still shows 1.11.0 while the repository release is 1.11.1, so the skill pins the repository.

## Which version to use

- Build SDKs, configuration and exporters to `1.61`. Build only on sections marked Stable unless the user accepts Development features, which "SHOULD NOT be used in production" and may be removed without notice (`maturity-levels.md`, Development).
- Emit `semconv-1.44` names in new instrumentation and set the matching schema URL `https://opentelemetry.io/schemas/1.44.0` on scopes and resources you produce. Within it, prefer Stable conventions (HTTP spans and duration metrics, database spans, `service.*`); RPC is Release Candidate and messaging is Development.
- Never author `semconv-http-1.20` names. Accept them on input only while upgrading old instrumentation or dashboards.
- Exporters and receivers target `otlp-1.11` for traces, metrics and logs.
- `otlp-profiles-preview` has posture **track**: follow it, and implement profiles only behind an explicit opt-in. Its packages are `v1development` and may change in any release.
- Stability guarantees: existing API calls MUST keep compiling and working across all minor versions of the major version; public SDK parts (plugin interfaces such as exporters and samplers, and constructors such as configuration objects and environment variables) MUST stay backward compatible. A major API version is supported for at least three years after the next one, the SDK for one year (`versioning-and-stability.md`, API Stability; SDK Stability; Long Term Support). Stable instrumentations MUST NOT change the telemetry they produce while the moratorium on schema transformations holds (`telemetry-stability.md`).

## What changed

### `1.61` (specification v1.61.0, against v1.58.0)

- v1.61.0: global propagators are recommended instead of required; `view_matching_mode` on the MeterProvider (Development); the periodic reader's `maxExportBatchSize` and the Prometheus content negotiation and `resource_constant_labels` options are Stable; the named `service` resource detector falls back to platform sources; `AttributeValueDepthLimit` (default 64) added to attribute limits.
- v1.60.0: entities in the Resource SDK and an Entity specification (Development); max request and response size options for the OTLP exporter; more Stable Prometheus exporter sections.
- v1.59.0: environment variables as context propagation carriers are Release Candidate; a Profiles data model; non-normative SDK self-observability guidelines.
- v1.58.0: environment carrier key normalization; OpenCensus compatibility deprecated; an in-development SDK self-observability section.

### `semconv-1.44` (semantic-conventions v1.44.0, against v1.43.0)

- Breaking: the `browser.web_vital` event moves `name`, `value`, `delta` and `id` from the body to `browser.web_vital.*` attributes; `k8s.pod.memory.paging.faults`, `k8s.node.memory.paging.faults` and `container.memory.paging.faults` drop the `memory` segment; `container.memory.usage`, `k8s.pod.memory.usage` and `k8s.node.memory.usage` become UpDownCounters.
- Messaging: one span definition per operation type (create, send, receive, process, settle); `messaging.kafka.cluster.id` added.
- Release Candidate: `network.interface.name`, process namespace attributes, and a set of container and Kubernetes memory metrics.

The v1.44.0 index lists Generative AI as moved to the separate GenAI semantic conventions repository; use the `opentelemetry-genai` skill for those conventions.

### `otlp-1.11` (opentelemetry-proto v1.11.1 and v1.11.0)

- v1.11.1: UTF-8 handling clarified; `since <version>` comments on fields; JSON timestamps documented as integers, not RFC 3339 strings.
- v1.11.0: request and response size limits for gRPC and HTTP (64 MiB requests, 4 MiB responses recommended); the ProcessContext proto (Development); `Retry-After` may be an HTTP-date.

## Upgrading

### From `semconv-http-1.20` to `semconv-1.44`

The HTTP conventions became Stable in semantic-conventions v1.23.0; the migration guide compares v1.20.0 with v1.23.1 (`non-normative/http-migration.md`).

1. Ship the new names behind `OTEL_SEMCONV_STABILITY_OPT_IN`: default keeps the old names, `http/dup` emits both, `http` emits only the stable names. Keep the old major version patched for at least six months after it starts emitting both, and drop the variable in the next major.
2. Rename attributes on both span kinds:

   | Old (v1.20.0)                               | New (stable)                                                            |
   | ------------------------------------------- | ----------------------------------------------------------------------- |
   | `http.method`                               | `http.request.method` (9 known methods plus `_OTHER`)                   |
   | `http.status_code`                          | `http.response.status_code`                                             |
   | `http.request_content_length`               | `http.request.body.size` (Opt-In)                                       |
   | `http.response_content_length`              | `http.response.body.size` (Opt-In)                                      |
   | `net.protocol.name`, `net.protocol.version` | `network.protocol.name`, `network.protocol.version` (`2.0` becomes `2`) |
   | `net.sock.peer.addr`, `net.sock.peer.port`  | `network.peer.address`, `network.peer.port`                             |
   | `net.sock.family`, `net.sock.peer.name`     | removed                                                                 |
   | new                                         | `error.type`, `http.request.method_original`                            |

3. Client spans: `http.url` to `url.full`; `http.resend_count` to `http.request.resend_count`; `net.peer.name` and `net.peer.port` to `server.address` and `server.port` (the port is now captured even when it is the scheme default).
4. Server spans: `http.target` splits into `url.path` and `url.query`; `http.scheme` to `url.scheme`; `http.client_ip` to `client.address`; `net.host.name` and `net.host.port` to `server.address` and `server.port`, now taken only from `Host`, `:authority`, `X-Forwarded-Host` or `Forwarded`; `net.sock.host.addr` and `net.sock.host.port` to `network.local.address` and `network.local.port`. `http.route` is unchanged.
5. Span names: the method part becomes `HTTP` when the method is `_OTHER`.
6. Metrics: `http.client.duration` and `http.server.duration` in `ms` become `http.client.request.duration` and `http.server.request.duration` in `s`, with second-based buckets and no zero boundary. Update dashboards and alerts at the same time.
7. Older than v1.20.0: `http.flavor` (v1.19.0 and earlier) becomes `network.protocol.version`; `http.user_agent` (v1.18.0 and earlier) becomes `user_agent.original`; span names from v1.17.0 and earlier change to `{method} {http.route}` or `{method}`. Versions v1.16.0 and earlier are not covered by the guide.

### Other experimental conventions inside `semconv-1.44`

The same opt-in pattern applies to other domains that left experimental status. Use the category values from [`semantic-conventions.md`](semantic-conventions.md#stability-opt-in):

- Database, from v1.24.0 or earlier (`database`, `database/dup`): `db.system` to `db.system.name`, `db.statement` to `db.query.text` (sanitized by default), `db.operation` to `db.operation.name`, `db.sql.table` and the system-specific table names to `db.collection.name`; `db.name` folds into `db.namespace`; `db.user` is removed (`non-normative/db-migration.md`).
- RPC, from v1.37.0 or earlier (`rpc`, `rpc/dup`): `rpc.system` to `rpc.system.name`; `rpc.service` merges into a fully qualified `rpc.method`; `rpc.grpc.status_code` to `rpc.response.status_code` (a string); `rpc.client.duration` and `rpc.server.duration` (`ms`) to `rpc.client.call.duration` and `rpc.server.call.duration` (`s`) (`non-normative/rpc-migration.md`).
- Messaging, from v1.24.0 or earlier (`messaging`, `messaging/dup`): messaging is still Development, so expect further changes.
- Exceptions: move from `exception` span events to log-based exceptions with `OTEL_SEMCONV_EXCEPTION_SIGNAL_OPT_IN` (`logs`, or `logs/dup` for both) (`exceptions/exceptions-spans.md`).

### Older 1.x specification to `1.61`

Minor releases keep the API compatible, so upgrading is a dependency bump plus these deprecations:

1. Replace `TraceIdRatioBased` with `ProbabilitySampler` once your SDK ships it. It is Development, and SDKs keep `TraceIdRatioBased` until at least 2027-01-01.
2. Rename `OTEL_EXPERIMENTAL_CONFIG_FILE` to `OTEL_CONFIG_FILE`, and move to the stable declarative configuration schema ([`configuration.md`](configuration.md#declarative-configuration)).
3. Replace the deprecated `jaeger` and `ottrace` propagators with `tracecontext,baggage`, the `logging` exporter value with `console`, and the Deprecated Zipkin exporter with OTLP.
4. Record exceptions as logs, which Logs SDKs map to exception attributes ([`signals-and-sdk.md`](signals-and-sdk.md#logs-and-events)).

### Older 1.x OTLP to `otlp-1.11`

Stable OTLP changes are additive, so old and new peers interoperate.

1. Receivers: enforce the decompressed request size limit (64 MiB recommended) with `413` or `RESOURCE_EXHAUSTED`, and accept `Retry-After` as an HTTP-date on the client side.
2. Clients: cap request size at the configured maximum and never send larger requests; cap accepted response size (4 MiB).
3. JSON: emit timestamps as integer nanoseconds (as decimal strings), never RFC 3339.
4. Strings: encode valid UTF-8 and replace invalid input with U+FFFD on decode.

## Preview: OTLP profiles (`otlp-profiles-preview`)

- State: the profiles signal is Development in the OTLP specification and the proto README; its protos are in `v1development` packages and the HTTP path is `/v1development/profiles`. The specification added a Profiles data model in v1.59.0.
- Posture **track**: watch opentelemetry-proto releases, do not depend on profiles in production, and gate any implementation behind an opt-in.
- The proto README says a development package keeps its `development` suffix until release candidate, when it becomes `v1`. When that happens, add a released profiles line to `otlp`, update the paths, and re-pin.
