---
name: opentelemetry
description: >-
  OpenTelemetry Specification 1.61.0: instrument services with traces, metrics,
  logs and OTLP. Covers the API and SDK (spans, span kind and status, samplers,
  batch processors, instruments, views, cardinality limits, logs), resources
  and service.name, W3C trace context and baggage propagation, OTEL_*
  environment variables and declarative configuration (OTEL_CONFIG_FILE),
  Semantic Conventions 1.44.0 for resource, HTTP, database, messaging, RPC and
  exceptions, and OTLP 1.11.1 over gRPC (4317) and HTTP (4318) with protobuf or
  JSON, partial success and retry. Use when adding OpenTelemetry to a service
  or library, configuring an SDK or OTLP exporter, naming spans and attributes,
  recording errors, building an OTLP receiver, or upgrading from the pre-stable
  HTTP conventions (v1.20.0 and earlier: http.method, http.status_code) with
  OTEL_SEMCONV_STABILITY_OPT_IN. Tracks OTLP profiles (Development). Triggers:
  OTel, OTLP, semconv, TracerProvider, OTEL_EXPORTER_OTLP_ENDPOINT,
  http.route. For GenAI use opentelemetry-genai.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OpenTelemetry

OpenTelemetry is an observability framework made of a specification for the API and SDK that produce traces, metrics and logs, semantic conventions that name the data, and the OTLP protocol that carries it. The three are versioned separately. With this skill the agent instruments services and libraries, configures SDKs and exporters, and builds or reviews OTLP receivers.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: instrumentation author (library or framework), application developer, SDK or distribution maintainer, or OTLP receiver or backend author.
- Target version: OpenTelemetry Specification 1.61.0, Semantic Conventions 1.44.0 and OTLP 1.11.1 (defaults, all current). The pre-stable HTTP conventions (v1.20.0 and earlier) are legacy: read them and upgrade from them, never emit them in new code. OTLP profiles (Development) is a preview (posture: track): never depend on it in production. See [`references/versions.md`](references/versions.md).
- Revision: the pinned tags in [Sources](#sources) (`v1.61.0`, `v1.44.0`, `v1.11.1`), unless the user names another.
- Signals: which of traces, metrics and logs the service emits, and where the data goes (a local collector, a backend, the console).
- Configuration style: programmatic, environment variables, or a declarative configuration file.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check the releases of the three repositories for newer tags, and update the pins.

## Invariants

1. **Spans come only from a Tracer, and every span is ended** (Trace API, Span Creation; End). `End` must not block on I/O. Without an SDK the API is a no-op that still propagates the parent context.
2. **Span names are low-cardinality** (Trace API, Span): `get_account/{accountId}`, never `get_account/42`. HTTP uses `{method} {http.route}` and MUST NOT fall back to the URI path (semconv `http/http-spans.md`, Name).
3. **Instrumentation leaves the status `Unset` unless there is an error** (Trace API, Set Status). Libraries do not set `Ok` unless configured to; application developers may. Server spans leave 4xx `Unset`; client spans set 4xx to `Error`; 5xx is `Error` (semconv `http/http-spans.md`, Status).
4. **Sampling inputs are set at span creation** (Trace API, Span Creation). Samplers see only creation-time attributes and links, and HTTP lists the attributes to pass then (semconv `http/http-spans.md`).
5. **Sampled implies recording** (Trace SDK, Sampling). The SDK MUST NOT produce `Sampled` with `IsRecording == false`; the default sampler is `ParentBased(root=AlwaysOn)`.
6. **Every resource has `service.name`** (semconv `resource/service.md`). It falls back to `unknown_service:<executable>`, and `OTEL_SERVICE_NAME` wins over `OTEL_RESOURCE_ATTRIBUTES` (SDK environment variables, General SDK Configuration).
7. **Propagators are explicit** (Propagators API, Global Propagators). The API is no-op until configured; the default list is `tracecontext,baggage`, and `Extract` MUST NOT throw on bad input.
8. **Required semantic-convention attributes are always set, and Opt-In ones only on request** (semconv `general/attribute-requirement-level.md`). Custom names use a company or application prefix, never an OpenTelemetry namespace (semconv `general/naming.md`).
9. **Instrumentations do not change emitted conventions by default** (semconv `http/README.md`). They migrate behind `OTEL_SEMCONV_STABILITY_OPT_IN` (`http`, `http/dup`; `database`, `rpc`, `messaging` likewise), and `/dup` wins.
10. **Errors are recorded once** (semconv `general/recording-errors.md`). Set status `Error` and `error.type` on the failed operation, add `error.type` to its duration metric only on failure, and record exceptions as log records, not again on the span.
11. **`OTEL_CONFIG_FILE` replaces environment configuration** (SDK environment variables, Declarative configuration). When it is set, every other variable not referenced in the file MUST be ignored. Empty variables count as unset (Parsing empty value).
12. **OTLP retries only retryable failures** (OTLP spec, Failures; Partial Success). HTTP retries only 429, 502, 503 and 504; gRPC retries only the listed codes. Never retry a partial success or a `400`. Use exponential backoff with jitter, and honour `Retry-After` and `RetryInfo`.
13. **OTLP/JSON is not plain proto3 JSON** (OTLP spec, JSON Protobuf Encoding). Trace and span IDs are hex, enums are integers, keys are lowerCamelCase, 64-bit integers are strings, and unknown fields MUST be ignored.
14. **OTLP sizes are bounded** (OTLP spec, OTLP/gRPC Request; OTLP/HTTP Request). Servers enforce a decompressed request limit (64 MiB recommended) with `413` or `RESOURCE_EXHAUSTED`, and clients never send over their limit.
15. **Per-signal OTLP/HTTP endpoints are used as-is** (OTLP Exporter, Endpoint URLs for OTLP/HTTP). The base `OTEL_EXPORTER_OTLP_ENDPOINT` gets `v1/traces`, `v1/metrics` or `v1/logs` appended.

## Workflow

1. **Pick the versions.** Use the three current lines unless a named consumer needs otherwise. For existing instrumentation, find which conventions it emits today.
   -> [`references/versions.md`](references/versions.md)
   ✓ The specification, semconv and OTLP targets are recorded, the schema URL is `https://opentelemetry.io/schemas/1.44.0`, and no legacy names or preview features are planned for new code.
2. **Set up the SDK and resource.** Create the tracer, meter and logger providers with a resource that carries `service.name`, `service.version` and `deployment.environment.name`. Register propagators, and arrange `ForceFlush` and `Shutdown` at exit.
   -> [`references/signals-and-sdk.md`](references/signals-and-sdk.md)
   ✓ Telemetry carries the service identity, and batched data is flushed on shutdown.
3. **Configure.** Choose programmatic configuration, environment variables or an `OTEL_CONFIG_FILE`. Set the sampler, batch processor, metric reader and limits on purpose.
   -> [`references/configuration.md`](references/configuration.md)
   ✓ Every setting the service relies on is set in one place, and no ignored variables remain beside a config file.
4. **Instrument operations.** For each inbound and outbound call, choose the span kind, name, attributes and status by the domain convention (HTTP, database, messaging, RPC). Set sampling-relevant attributes at creation.
   -> [`references/semantic-conventions.md`](references/semantic-conventions.md), [`references/signals-and-sdk.md`](references/signals-and-sdk.md)
   ✓ Required attributes are present, names are low-cardinality, and status follows the domain rules.
5. **Record errors, metrics and logs.** Emit the domain duration histograms with the advised second-based buckets and `error.type` on failure. Record exceptions as log records tied to the active span. Emit logs through the Logs API or a bridge so they carry trace context.
   -> [`references/semantic-conventions.md`](references/semantic-conventions.md#errors-and-exceptions), [`references/signals-and-sdk.md`](references/signals-and-sdk.md#metrics)
   ✓ A failed request shows `Error` status, an `error.type`, one exception record and a failed-duration data point.
6. **Propagate context.** Inject on every outgoing call and extract on every incoming one, including messages, where each message carries its creation context.
   -> [`references/signals-and-sdk.md`](references/signals-and-sdk.md#context-propagation); the `trace-context` skill for the `traceparent` wire format.
   ✓ A request through two services produces one trace.
7. **Export over OTLP, or build the receiver.** Choose `http/protobuf`, `grpc` or `http/json`, set the endpoint, headers, compression and timeout, and check retry and size behaviour. Receivers implement success, partial success, throttling and limits.
   -> [`references/otlp.md`](references/otlp.md)
   ✓ Data arrives at the backend; receivers pass the receiver checklist in `references/otlp.md`.
8. **Upgrade** (only when asked, or for existing instrumentation). Follow the upgrade section for the pre-stable HTTP conventions, the other opt-in domains, older specification releases, and older OTLP.
   -> [`references/versions.md`](references/versions.md#upgrading)
   ✓ Users who did not opt in see unchanged telemetry, `http/dup` emits both sets, and dashboards are updated for renamed attributes and `s` units.

## Verify before done

- [ ] Every span is ended on every path, including exceptions, and the providers are flushed and shut down at exit.
- [ ] No span name contains an ID, a raw path or a query; HTTP server spans use `http.route` only when the framework supplies it.
- [ ] Server spans keep 4xx `Unset`, and libraries never set `Ok`.
- [ ] `service.name` is set, and resource attributes match the semantic conventions.
- [ ] New code emits `http.request.method`, `http.response.status_code`, `url.full` and `server.address`, never the pre-stable names, unless `http/dup` is in effect.
- [ ] `db.query.text` is sanitized, and Opt-In attributes are off by default.
- [ ] Duration histograms are in `s` with the advised boundaries, and `error.type` appears only on failures.
- [ ] The OTLP endpoint resolves to `/v1/traces`, `/v1/metrics` and `/v1/logs`; per-signal endpoints include the path.
- [ ] A receiver returns `200` with `partial_success` only on partial acceptance, `400` for bad data, `413` over the size limit, and `429`/`503` when throttling.
- [ ] Nothing depends on Development features (profiles, `ProbabilitySampler`, entities) unless the user accepted that.

## Reference index

- **`references/versions.md`**: the specification, semconv and OTLP lines, the legacy HTTP conventions and the profiles preview, which to use, what changed, and the upgrade steps, including the HTTP rename table. Load for steps 1 and 8.
- **`references/signals-and-sdk.md`**: providers, spans, span kind, status, sampling, processors, metrics instruments and aggregation, logs, attribute limits, resources and propagation. Load for steps 2, 4, 5 and 6.
- **`references/configuration.md`**: environment variable parsing and defaults, exporter selection, declarative configuration, substitution, and moving to a config file. Load for step 3.
- **`references/semantic-conventions.md`**: requirement levels, naming, errors and exceptions, resource, HTTP, database, messaging and RPC conventions, and the stability opt-in. Load for steps 4, 5 and 8.
- **`references/otlp.md`**: transports and ports, JSON encoding, success and partial success, retry and throttling, size limits, exporter options and a receiver checklist. Load for step 7.

## Related skills

- `opentelemetry-genai` for LLM, agent, tool and MCP telemetry with the `gen_ai.*` conventions: `npx skills add ScaleDockHQ/scaledock-skills --skill opentelemetry-genai`.
- `trace-context` for the W3C `traceparent` and `tracestate` headers that the default propagator carries: `npx skills add ScaleDockHQ/scaledock-skills --skill trace-context`.
- `ocsf` to turn security-relevant telemetry into normalized security events: `npx skills add ScaleDockHQ/scaledock-skills --skill ocsf`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OpenTelemetry Specification 1.61.0](https://opentelemetry.io/docs/specs/otel/): Stable except where otherwise specified, 1.61.0, checked 2026-10-05.
- [opentelemetry-specification v1.61.0 release](https://github.com/open-telemetry/opentelemetry-specification/releases/tag/v1.61.0): Released, v1.61.0 (2026-09-14), checked 2026-10-05.
- [opentelemetry-specification v1.60.0 release](https://github.com/open-telemetry/opentelemetry-specification/releases/tag/v1.60.0): Released, v1.60.0 (2026-08-07), checked 2026-10-05.
- [opentelemetry-specification v1.59.0 release](https://github.com/open-telemetry/opentelemetry-specification/releases/tag/v1.59.0): Released, v1.59.0 (2026-07-10), checked 2026-10-05.
- [opentelemetry-specification v1.58.0 release](https://github.com/open-telemetry/opentelemetry-specification/releases/tag/v1.58.0): Released, v1.58.0 (2026-06-22), checked 2026-10-05.
- [Specification Status Summary](https://opentelemetry.io/docs/specs/status/): status page, as served on 2026-10-05, checked 2026-10-05.
- [Trace API](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/trace/api.md): Stable except where otherwise specified, v1.61.0, checked 2026-10-05.
- [Trace SDK](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/trace/sdk.md): Stable except where otherwise specified, v1.61.0, checked 2026-10-05.
- [Exceptions (trace)](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/trace/exceptions.md): Stable, v1.61.0, checked 2026-10-05.
- [Metrics API](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/metrics/api.md): Stable except where otherwise specified, v1.61.0, checked 2026-10-05.
- [Metrics SDK](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/metrics/sdk.md): Mixed, v1.61.0, checked 2026-10-05.
- [Metrics Exporter - OTLP](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/metrics/sdk_exporters/otlp.md): Stable, v1.61.0, checked 2026-10-05.
- [Logs API](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/logs/api.md): Stable except where otherwise specified, v1.61.0, checked 2026-10-05.
- [Logs SDK](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/logs/sdk.md): Stable except where otherwise specified, v1.61.0, checked 2026-10-05.
- [Resource SDK](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/resource/sdk.md): Stable except where otherwise specified, v1.61.0, checked 2026-10-05.
- [Common: attributes and limits](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/common/README.md): Stable except where otherwise specified, v1.61.0, checked 2026-10-05.
- [Propagators API](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/context/api-propagators.md): Stable except where otherwise specified, v1.61.0, checked 2026-10-05.
- [Environment Variables as Context Propagation Carriers](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/context/env-carriers.md): Release Candidate, v1.61.0, checked 2026-10-05.
- [Configuration](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/configuration/README.md): configuration interfaces, v1.61.0, checked 2026-10-05.
- [OpenTelemetry Environment Variable Specification](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/configuration/sdk-environment-variables.md): Stable except where otherwise specified, v1.61.0, checked 2026-10-05.
- [Configuration Data Model](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/configuration/data-model.md): Stable, v1.61.0, checked 2026-10-05.
- [Configuration SDK](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/configuration/sdk.md): Stable except where otherwise specified, v1.61.0, checked 2026-10-05.
- [OpenTelemetry Protocol Exporter](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/protocol/exporter.md): Stable, v1.61.0, checked 2026-10-05.
- [Versioning and stability](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/versioning-and-stability.md): normative policy, v1.61.0, checked 2026-10-05.
- [Telemetry stability](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/telemetry-stability.md): Development, v1.61.0, checked 2026-10-05.
- [Maturity levels](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.61.0/specification/maturity-levels.md): definitions, v1.61.0, checked 2026-10-05.
- [opentelemetry-configuration v1.2.0 release](https://github.com/open-telemetry/opentelemetry-configuration/releases/tag/v1.2.0): Released, v1.2.0 (2026-09-11), checked 2026-10-05.
- [opentelemetry-configuration versioning](https://github.com/open-telemetry/opentelemetry-configuration/blob/v1.2.0/VERSIONING.md): versioning policy, v1.2.0, checked 2026-10-05.
- [otel-sdk-migration-config.yaml](https://github.com/open-telemetry/opentelemetry-configuration/blob/v1.2.0/examples/otel-sdk-migration-config.yaml): example, `file_format` 1.2, v1.2.0, checked 2026-10-05.
- [OpenTelemetry semantic conventions 1.44.0](https://opentelemetry.io/docs/specs/semconv/): Mixed by area, 1.44.0, checked 2026-10-05.
- [semantic-conventions v1.44.0 release](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.44.0): Released, v1.44.0 (2026-08-04), checked 2026-10-05.
- [semantic-conventions v1.23.0 release](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.23.0): Released, v1.23.0 (2023-11-03), first stable HTTP core, checked 2026-10-05.
- [Semantic conventions index](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/README.md): index, v1.44.0, checked 2026-10-05.
- [Attribute requirement levels](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/general/attribute-requirement-level.md): Stable, v1.44.0, checked 2026-10-05.
- [Naming](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/general/naming.md): Stable unless otherwise specified, v1.44.0, checked 2026-10-05.
- [Recording errors](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/general/recording-errors.md): Development, v1.44.0, checked 2026-10-05.
- [Semantic conventions for events](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/general/events.md): Development, v1.44.0, checked 2026-10-05.
- [Exceptions in logs](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/exceptions/exceptions-logs.md): Stable except where otherwise specified, v1.44.0, checked 2026-10-05.
- [Exceptions on spans](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/exceptions/exceptions-spans.md): Deprecated, v1.44.0, checked 2026-10-05.
- [Resource semantic conventions](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/resource/README.md): Mixed, v1.44.0, checked 2026-10-05.
- [Service](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/resource/service.md): Stable attributes, v1.44.0, checked 2026-10-05.
- [Deployment environment](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/resource/deployment-environment.md): Development entity with a Stable attribute, v1.44.0, checked 2026-10-05.
- [HTTP semantic conventions](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/http/README.md): Mixed, v1.44.0, checked 2026-10-05.
- [HTTP spans](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/http/http-spans.md): Stable unless otherwise specified, v1.44.0, checked 2026-10-05.
- [HTTP metrics](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/http/http-metrics.md): duration metrics Stable, v1.44.0, checked 2026-10-05.
- [HTTP semantic convention stability migration](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/non-normative/http-migration.md): non-normative, v1.44.0, checked 2026-10-05.
- [HTTP conventions at specification v1.20.0](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.20.0/specification/trace/semantic_conventions/http.md): Experimental, v1.20.0 (2023-04-07), checked 2026-10-05.
- [Database semantic conventions](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/db/README.md): Mixed, v1.44.0, checked 2026-10-05.
- [Database spans](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/db/database-spans.md): Stable unless otherwise specified, v1.44.0, checked 2026-10-05.
- [Database metrics](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/db/database-metrics.md): Mixed, v1.44.0, checked 2026-10-05.
- [Database migration](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/non-normative/db-migration.md): non-normative, v1.44.0, checked 2026-10-05.
- [Messaging semantic conventions](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/messaging/README.md): Development, v1.44.0, checked 2026-10-05.
- [Messaging spans](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/messaging/messaging-spans.md): Development, v1.44.0, checked 2026-10-05.
- [RPC semantic conventions](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/rpc/README.md): Release Candidate, v1.44.0, checked 2026-10-05.
- [RPC spans](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/rpc/rpc-spans.md): Release Candidate, v1.44.0, checked 2026-10-05.
- [RPC migration](https://github.com/open-telemetry/semantic-conventions/blob/v1.44.0/docs/non-normative/rpc-migration.md): non-normative, v1.44.0, checked 2026-10-05.
- [OTLP Specification](https://opentelemetry.io/docs/specs/otlp/): Stable for traces, metrics and logs, page shows 1.11.0, checked 2026-10-05.
- [OpenTelemetry Protocol Specification](https://github.com/open-telemetry/opentelemetry-proto/blob/v1.11.1/docs/specification.md): Stable for traces, metrics and logs; Development for profiles, v1.11.1, checked 2026-10-05.
- [OpenTelemetry Protobuf Definitions](https://github.com/open-telemetry/opentelemetry-proto/blob/v1.11.1/README.md): maturity table, v1.11.1, checked 2026-10-05.
- [opentelemetry-proto v1.11.1 release](https://github.com/open-telemetry/opentelemetry-proto/releases/tag/v1.11.1): Released, v1.11.1 (2026-09-29), checked 2026-10-05.
- [opentelemetry-proto v1.11.0 release](https://github.com/open-telemetry/opentelemetry-proto/releases/tag/v1.11.0): Released, v1.11.0 (2026-07-21), checked 2026-10-05.
