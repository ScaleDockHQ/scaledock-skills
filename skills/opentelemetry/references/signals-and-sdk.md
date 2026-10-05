# Signals, SDK, resources and propagation

Read this when creating spans, instruments or log records, configuring samplers, processors, readers and limits, building a resource, or wiring context propagation. Source: the OpenTelemetry Specification at tag `v1.61.0`, cited by document and heading, listed in [Sources](../SKILL.md#sources). Spec documents have no section numbers, so rules cite the file and heading.

## Contents

- [Status of the parts](#status-of-the-parts)
- [Providers and scopes](#providers-and-scopes)
- [Spans](#spans)
- [Span kind](#span-kind)
- [Span status and errors](#span-status-and-errors)
- [Sampling](#sampling)
- [Span processors and exporters](#span-processors-and-exporters)
- [Metrics](#metrics)
- [Logs and events](#logs-and-events)
- [Attributes and limits](#attributes-and-limits)
- [Resource](#resource)
- [Context propagation](#context-propagation)
- [Common mistakes](#common-mistakes)

## Status of the parts

The trace API and SDK, metrics API, logs API and SDK, baggage, resource SDK, OTLP exporter, environment variables and the configuration data model are Stable "except where otherwise specified" (status line of each document). The metrics SDK is Mixed. Inside stable documents, sections marked Development include `TracerConfigurator` and `MeterConfigurator`, `ProbabilitySampler` and `CompositeSampler`, the Sampling Requirements on trace randomness, the `OnEnding` span processor hook, `LoggerConfig` filtering, the event-to-span-event bridge, entities on resources, and self-observability. Environment variables as propagation carriers are Release Candidate (`context/env-carriers.md`). Treat Development sections as optional and changeable ([`versions.md`](versions.md)).

"Development" was previously called "Experimental"; treat both the same (`versioning-and-stability.md`, Development).

## Providers and scopes

- The API SHOULD offer a global default `TracerProvider`, `MeterProvider` and `LoggerProvider`, and SHOULD allow several provider instances (Trace API, TracerProvider; Logs API, LoggerProvider).
- Get a Tracer, Meter or Logger with `name` (required), `version`, `schema_url` and scope `attributes`. `name` identifies the instrumentation scope, for example the instrumentation library `io.opentelemetry.contrib.mongodb`. An invalid name (null or empty) MUST still return a working instance (Trace API, Get a Tracer).
- Implementations MUST NOT require users to obtain a Tracer again to pick up configuration changes (Trace API, Get a Tracer).
- `Shutdown` MUST be called only once per provider and MUST at least shut down every processor; `ForceFlush` MUST flush every processor (Trace SDK, Shutdown and ForceFlush). Call both before process exit so batched data is exported.

## Spans

- There MUST NOT be any way to create a `Span` other than through a `Tracer`. Creation MUST NOT make the new span active in the current context by default (Trace API, Span Creation).
- Creation takes the name, the parent `Context` (never a bare `Span` or `SpanContext`), the `SpanKind` (default `INTERNAL`), attributes, links and an optional start timestamp (Trace API, Span Creation).
- Pass sampling-relevant attributes and links at creation: samplers only see what exists at creation, and the API documentation MUST say so (Trace API, Span Creation; Set Attributes; Link).
- A root span MUST get a new `TraceId`; a child span MUST share its parent's `TraceId` and by default inherit its `TraceState` (Trace API, Span Creation).
- Any span that is created MUST also be ended. `End` MUST NOT affect child spans, MUST NOT inactivate the span in any context, and MUST NOT perform blocking I/O on the calling thread (Trace API, Span Creation; End).
- The span name SHOULD be the most general string that identifies a class of spans: `get_account` or `get_account/{accountId}`, never `get_account/42` (Trace API, Span).
- Name, attributes, events and status MUST NOT change after the span's end time is set (Trace API, Span). Setting an attribute with an existing key SHOULD overwrite it (Set Attributes).
- Use `IsRecording` to skip expensive attribute computation; do not read the sampled flag outside propagators (Trace API, IsRecording).
- Without an installed SDK the API is no-op, except that it MUST return a non-recording span carrying the parent `SpanContext`, so propagation still works (Trace API, Behavior of the API in the absence of an installed SDK).

## Span kind

| Kind       | Direction | Style                               |
| ---------- | --------- | ----------------------------------- |
| `CLIENT`   | outgoing  | request/response                    |
| `SERVER`   | incoming  | request/response                    |
| `PRODUCER` | outgoing  | deferred execution                  |
| `CONSUMER` | incoming  | deferred execution                  |
| `INTERNAL` |           | in-process operation (the default). |

A span SHOULD serve one purpose: a server span SHOULD NOT also describe an outgoing call. Create a new span before injecting context into a remote call (Trace API, SpanKind).

## Span status and errors

- Status is `Unset` (default), `Ok` or `Error`, ordered `Ok > Error > Unset`. `Description` is used only with `Error` (Trace API, Set Status).
- Instrumentation libraries SHOULD leave the status `Unset` unless there is an error, and SHOULD NOT set `Ok` unless configured to. Application developers and operators may set `Ok`, which is final (Trace API, Set Status).
- Set `Error` only by the rules of the semantic conventions; for operations they do not cover, the library SHOULD publish its own conventions (Trace API, Set Status).
- `RecordException` MUST record the exception as an event named `exception` with `exception.message`, `exception.stacktrace` and `exception.type` (Trace API, Record Exception; `trace/exceptions.md`). Semantic conventions 1.44.0 deprecate exceptions on spans in favour of logs; see [`semantic-conventions.md`](semantic-conventions.md#errors-and-exceptions).

## Sampling

- `IsRecording` and the `Sampled` flag are separate. Span processors receive only recording spans; exporters MUST receive sampled spans and SHOULD NOT receive unsampled ones. The SDK MUST NOT allow `Sampled == true` with `IsRecording == false` (Trace SDK, Sampling; Recording Sampled reaction table).
- `ShouldSample` returns `DROP`, `RECORD_ONLY` or `RECORD_AND_SAMPLE`, extra attributes, and a `Tracestate`; samplers SHOULD return the incoming `Tracestate` when they do not change it (Trace SDK, ShouldSample).
- The default sampler is `ParentBased(root=AlwaysOn)` (Trace SDK, Built-in samplers).
- `ParentBased` picks a delegate by parent state: `root`, `remoteParentSampled` (default AlwaysOn), `remoteParentNotSampled` (default AlwaysOff), `localParentSampled` (default AlwaysOn), `localParentNotSampled` (default AlwaysOff) (Trace SDK, ParentBased).
- `TraceIdRatioBased` is deprecated in favour of `ProbabilitySampler`, but SDKs keep it until at least 2027-01-01. It MUST ignore the parent sampled flag (wrap it in `ParentBased` to respect it) and MUST use a deterministic hash of the `TraceId` (Trace SDK, TraceIdRatioBased).
- `ProbabilitySampler` (Development) also ignores the parent sampled flag. It samples when the randomness value `R` (typically the 7 rightmost bytes of the trace ID) is at least the threshold `T`, and SHOULD then record `th:T` in the OpenTelemetry `tracestate` entry, following W3C Trace Context Level 2 (Trace SDK, ProbabilitySampler).
- `AlwaysRecord` turns `DROP` into `RECORD_ONLY` so processors see every span, for example for span-to-metrics (Trace SDK, AlwaysRecord).

## Span processors and exporters

- The SDK provides a simple processor and a batching processor; each MUST synchronize calls to the exporter's `Export` so they never run concurrently (Trace SDK, Built-in span processors).
- Batching defaults: `maxQueueSize` 2048 (spans beyond it are dropped), `scheduledDelayMillis` 5000, `exportTimeoutMillis` 30000, `maxExportBatchSize` 512 (at most `maxQueueSize`) (Trace SDK, Batching processor). Use the batching processor in production; the simple processor exports each span as it ends.
- `Export` MUST NOT block indefinitely. Retry is the exporter's job, not the processor's (Trace SDK, Export(batch)); OTLP retry rules are in [`otlp.md`](otlp.md#retry-and-throttling).
- Span limits default to 128 for attributes, events, links, attributes per event and attributes per link. Discarding MUST be logged at most once per span (Trace SDK, Span Limits).

## Metrics

Instruments (Metrics API, Instrument):

| Instrument                         | Use for                                                   | Default aggregation (Metrics SDK, Default Aggregation) |
| ---------------------------------- | --------------------------------------------------------- | ------------------------------------------------------ |
| `Counter`, Asynchronous Counter    | Non-negative increments: requests, bytes received.        | Sum                                                    |
| `UpDownCounter`, Async UpDownCount | Increments and decrements: active requests, queue length. | Sum                                                    |
| `Histogram`                        | Distributions: request duration, payload size.            | Explicit Bucket Histogram, with advisory boundaries    |
| `Gauge`, Asynchronous Gauge        | Non-additive current values: temperature, fan speed.      | Last Value                                             |

- Instruments are identified by name, kind, unit and description (Metrics API, Instrument).
- Name syntax: `ALPHA 0*254 ("_" / "." / "-" / "/" / ALPHA / DIGIT)`, case-insensitive ASCII, at most 255 characters (Metrics API, Instrument name syntax).
- The unit is case-sensitive ASCII, at most 63 characters (`kb` and `kB` differ) (Metrics API, Instrument unit).
- Asynchronous callbacks run only on collection, in unspecified order, and their measurements cannot carry a `Context` (Metrics API, Synchronous and Asynchronous instruments).
- `ExplicitBucketBoundaries` is a Stable advisory parameter; implementations MAY ignore advisory parameters (Metrics API, Instrument advisory parameters). The default explicit boundaries are `[0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000, 7500, 10000]`, which suit milliseconds, not seconds: give second-based histograms the boundaries their semantic convention advises (Metrics SDK, Explicit Bucket Histogram Aggregation).
- The SDK MUST provide the Drop, Default, Sum, Last Value and Explicit Bucket Histogram aggregations, and SHOULD provide Base2 Exponential Bucket Histogram (Metrics SDK, Aggregation).
- Cardinality limit (Stable): a view's `aggregation_cardinality_limit`, else the reader's default, else 2000. Overflow goes to one point with `otel.metric.overflow=true`; no measurement may be double-counted or dropped (Metrics SDK, Cardinality limits).
- The OTLP metric exporter MUST default to Cumulative temporality for every instrument kind; `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` accepts `cumulative`, `delta` and `lowmemory` (Metrics Exporter OTLP).
- Periodic exporting reader defaults: `exportIntervalMillis` 60000 and `exportTimeoutMillis` 30000. `maxExportBatchSize` is Stable since 1.61.0 and, when set, the reader MUST split batches so none exceeds it (Metrics SDK, Periodic exporting MetricReader).

## Logs and events

- The Logs API is for log appenders that bridge existing logging libraries, and can also be called directly by instrumentation libraries and applications; languages may add a more ergonomic API (Development) (Logs API, introduction and Ergonomic API).
- `Emit` accepts timestamp, observed timestamp, `Context`, severity number and text, body, attributes, event name, and optionally an exception. With implicit context, an unspecified `Context` MUST mean the current one (Logs API, Emit a LogRecord).
- The SDK MUST fill the trace context fields (`TraceId`, `SpanId`, `TraceFlags`) from the resolved `Context`, which correlates logs with traces (Logs SDK, ReadableLogRecord). When an exception is passed, the SDK MUST set the exception attributes, and user-provided attributes MUST win (Logs SDK, Emit a LogRecord).
- `Enabled` is an optional performance check; its result can change over time (Logs API, Enabled).
- Batching log processor defaults: `maxQueueSize` 2048, `scheduledDelayMillis` 1000, `exportTimeoutMillis` 30000, `maxExportBatchSize` 512 (Logs SDK, Batching processor).
- An event is a `LogRecord` with an event name. Use events for named point-in-time occurrences and spans for operations with a duration (semantic conventions, `general/events.md`, Development).

## Attributes and limits

- An attribute key MUST be a non-null, non-empty, case-sensitive string. A value is a primitive, a homogeneous array of primitives, a byte array, an array of `AnyValue`, a map, or an empty value (`common/README.md`, AnyValue and Attribute).
- Empty values, zero, empty strings and empty arrays are meaningful and MUST be passed on to processors and exporters (AnyValue).
- Exported attribute collections MUST contain unique keys (Attribute Collections).
- Defaults: `AttributeCountLimit` 128, `AttributeValueLengthLimit` unlimited, `AttributeValueDepthLimit` 64 (added in 1.61.0). Over-long strings and byte arrays MUST be truncated; attributes beyond the count limit MUST be discarded (Attribute Limits, Configurable Parameters).
- Resource attributes SHOULD be exempt from these limits, and metric attributes are exempt (Exempt Entities).

## Resource

- A resource is set on the provider at creation and cannot change later; every span from the provider MUST carry it (Resource SDK, introduction).
- The SDK MUST provide a default resource with at least `service.name` and the `telemetry.sdk.*` attributes, used when no resource is given (Resource SDK, SDK-provided resource attributes; semantic conventions `resource/README.md`).
- `service.name` MUST be the same for all instances of a horizontally scaled service. If unset, SDKs MUST fall back to `unknown_service:` plus the executable name, or `unknown_service` (semantic conventions `resource/service.md`). The `service.namespace`, `service.name`, `service.instance.id` triplet MUST be globally unique.
- `OTEL_RESOURCE_ATTRIBUTES` (`key1=value1,key2=value2`, values strings, `,` and `=` percent-encoded) is merged as the secondary resource, so user-provided attributes win; on a decoding error the whole value SHOULD be discarded. `OTEL_SERVICE_NAME` takes precedence over `service.name` in `OTEL_RESOURCE_ATTRIBUTES` (Resource SDK, Specifying resource information via an environment variable; SDK environment variables, General SDK Configuration).
- Merge: the updating resource's value wins, even if empty. Two different non-empty Schema URLs are a merge error (Resource SDK, Merge).
- Detectors for platforms such as Docker or Kubernetes MUST ship separately from the SDK. A detector that fills semantic-convention attributes MUST set the matching Schema URL. Failing to detect anything is not an error (Resource SDK, Detecting resource information from the environment).
- The named `service` detector populates `service.name` from `OTEL_SERVICE_NAME` and SHOULD fall back to language- or platform-specific sources such as a package manifest (fallback added in 1.61.0; Resource SDK, Resource detector name, Development).

## Context propagation

- Propagators define `Inject` and `Extract`. If extraction cannot parse a value, it MUST NOT throw and MUST NOT store a new value, so an existing valid value is kept (Propagators API, Extract).
- TextMap keys and values MUST be US-ASCII that is valid in HTTP fields; HTTP getters MUST be case-insensitive (TextMap Propagator; Get).
- The API MUST use no-op propagators unless configured. Pre-configured platforms SHOULD default to a composite of W3C Trace Context and W3C Baggage (Global Propagators). The environment variable default is `OTEL_PROPAGATORS=tracecontext,baggage`.
- A W3C Trace Context propagator MUST parse and validate `traceparent` and `tracestate` per Trace Context Level 2, and propagates TraceID (16 bytes), SpanID (8 bytes), TraceFlags (8 bits) and a non-empty TraceState (W3C Trace Context Requirements). The wire format is taught in the `trace-context` skill.
- B3 extraction MUST accept single and multi-header; injection MUST default to single-header and MUST NOT propagate `X-B3-ParentSpanId` (B3 Requirements). The Jaeger and OT Trace propagators are Deprecated.
- Instrumentation libraries SHOULD call the propagators on every remote call (Global Propagators).
- Environment variables can carry context to child processes (Release Candidate). Keys MUST be normalized: uppercase, non-alphanumeric characters to `_`, a leading digit prefixed with `_`, and an empty key becomes `_`. Implementations MUST NOT spawn child processes for propagation (`context/env-carriers.md`).

## Common mistakes

- Setting `Ok` from a library, or `Error` for an HTTP 404 on a server span; see the HTTP status rules in [`semantic-conventions.md`](semantic-conventions.md#http).
- Forgetting to end spans on early returns and exceptions, or not calling `Shutdown`/`ForceFlush` before exit, so batched data is lost.
- Putting IDs or raw paths in span names.
- Adding sampling-relevant attributes after creation, where the sampler cannot see them.
- Wrapping `TraceIdRatioBased` without `ParentBased`, which breaks traces that a parent sampled.
- Using millisecond default buckets for a histogram whose unit is `s`.
