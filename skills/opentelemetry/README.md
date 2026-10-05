# opentelemetry

An agent skill for OpenTelemetry: instrumenting services with traces, metrics and logs following the OpenTelemetry Specification 1.61.0, Semantic Conventions 1.44.0 and OTLP 1.11.1, and upgrading from the pre-stable HTTP conventions.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill opentelemetry
```

Then ask your agent to "add OpenTelemetry tracing and metrics to this service", "configure the OTLP exporter for our collector" or "migrate our HTTP instrumentation off `http.method`".

## What it covers

- The API and SDK: tracer, meter and logger providers, spans, span kind and status, samplers, batch processors, metric instruments, aggregation, cardinality limits, and log records with trace context.
- Resources and `service.name`, attribute limits, and W3C Trace Context and Baggage propagation.
- `OTEL_*` environment variables and declarative configuration with `OTEL_CONFIG_FILE`.
- Semantic conventions for resource, HTTP, database, messaging and RPC, requirement levels, naming, recording errors, and exceptions as logs.
- The `OTEL_SEMCONV_STABILITY_OPT_IN` migration, with rename tables for HTTP, database and RPC.
- OTLP over gRPC (4317) and HTTP (4318) with protobuf or JSON, partial success, retry and throttling, size limits, exporter options, and a receiver checklist.

GenAI conventions are in a separate skill, `opentelemetry-genai`.

## Versions

| Line                                              | Status                |
| ------------------------------------------------- | --------------------- |
| OpenTelemetry Specification 1.61.0                | current               |
| Semantic Conventions 1.44.0                       | current               |
| pre-stable HTTP conventions (v1.20.0 and earlier) | legacy (upgrade from) |
| OTLP 1.11.1                                       | current               |
| OTLP profiles (Development)                       | preview (track)       |

`references/versions.md` says which line to use, what changed in each, and how to upgrade.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OpenTelemetry Specification](https://github.com/open-telemetry/opentelemetry-specification/releases/tag/v1.61.0): Released, v1.61.0 (2026-09-14). Trace, metrics, logs, resource, common, propagation, configuration, OTLP exporter and versioning documents at that tag.
- [OpenTelemetry semantic conventions](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.44.0): Released, v1.44.0 (2026-08-04). General, exceptions, resource, HTTP, database, messaging and RPC documents and the migration guides at that tag.
- [HTTP conventions at specification v1.20.0](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.20.0/specification/trace/semantic_conventions/http.md): Experimental, v1.20.0 (2023-04-07).
- [OpenTelemetry Protocol Specification](https://github.com/open-telemetry/opentelemetry-proto/blob/v1.11.1/docs/specification.md): Stable for traces, metrics and logs, v1.11.1 (2026-09-29).
- [opentelemetry-configuration](https://github.com/open-telemetry/opentelemetry-configuration/releases/tag/v1.2.0): Released, v1.2.0 (2026-09-11).
- The opentelemetry.io pages for the [specification](https://opentelemetry.io/docs/specs/otel/), [semantic conventions](https://opentelemetry.io/docs/specs/semconv/), [OTLP](https://opentelemetry.io/docs/specs/otlp/) and [status](https://opentelemetry.io/docs/specs/status/).

The full list, with every document read, is in the Sources section of `SKILL.md`.

## License

MIT
