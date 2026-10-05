# Configuration

Read this when configuring an OpenTelemetry SDK through environment variables or a declarative configuration file, or when moving from one to the other. Sources: `configuration/README.md`, `configuration/sdk-environment-variables.md`, `configuration/data-model.md` and `configuration/sdk.md` of the OpenTelemetry Specification at tag `v1.61.0`, and opentelemetry-configuration `v1.2.0`, listed in [Sources](../SKILL.md#sources). OTLP exporter variables are in [`otlp.md`](otlp.md#exporter-configuration).

## Contents

- [Configuration interfaces](#configuration-interfaces)
- [Parsing environment variables](#parsing-environment-variables)
- [General SDK variables](#general-sdk-variables)
- [Processors, readers and limits](#processors-readers-and-limits)
- [Exporter selection](#exporter-selection)
- [Declarative configuration](#declarative-configuration)
- [Environment variable substitution](#environment-variable-substitution)
- [Moving from environment variables to a file](#moving-from-environment-variables-to-a-file)

## Configuration interfaces

- The SDK MUST provide a programmatic interface for all configuration, and other mechanisms SHOULD be built on it (`configuration/README.md`, Programmatic).
- Environment variables are the language-agnostic scheme for common settings. Declarative configuration is the more expressive, file-based scheme (Configuration Interfaces).
- Language-specific variables use the form `OTEL_{LANGUAGE}_{FEATURE}` (`sdk-environment-variables.md`, Language Specific Environment Variables).

## Parsing environment variables

From `sdk-environment-variables.md` (Stable, except where otherwise specified):

- An empty value MUST be treated as unset (Parsing empty value).
- Booleans are true only for case-insensitive `"true"`. Implementations MUST NOT accept other true values; everything else, including unset and empty, MUST be false, with a warning SHOULD for values other than `false` (Boolean).
- A numeric value that cannot be parsed SHOULD produce a warning and be ignored (Numeric).
- Enum values SHOULD be case-insensitive; an unknown value MUST produce a warning and be ignored (Enum).

## General SDK variables

| Variable                   | Default                 | Notes                                                                                                                                                                           |
| -------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OTEL_SDK_DISABLED`        | `false`                 | Disables the SDK for all signals.                                                                                                                                               |
| `OTEL_RESOURCE_ATTRIBUTES` |                         | `key1=value1,key2=value2`; see [`signals-and-sdk.md`](signals-and-sdk.md#resource).                                                                                             |
| `OTEL_SERVICE_NAME`        |                         | Sets `service.name`; wins over `service.name` in `OTEL_RESOURCE_ATTRIBUTES`.                                                                                                    |
| `OTEL_ENTITIES`            |                         | Entity information for the resource (entities are Development).                                                                                                                 |
| `OTEL_LOG_LEVEL`           | `info`                  | The SDK's own internal log level.                                                                                                                                               |
| `OTEL_PROPAGATORS`         | `tracecontext,baggage`  | `tracecontext`, `baggage`, `b3`, `b3multi`, `jaeger` (deprecated), `xray`, `ottrace` (deprecated), `none`.                                                                      |
| `OTEL_TRACES_SAMPLER`      | `parentbased_always_on` | `always_on`, `always_off`, `traceidratio`, `parentbased_always_on`, `parentbased_always_off`, `parentbased_traceidratio`, `parentbased_jaeger_remote`, `jaeger_remote`, `xray`. |
| `OTEL_TRACES_SAMPLER_ARG`  |                         | For the ratio samplers, a probability in `[0..1]`, default `1.0`. Invalid or missing values are logged and ignored.                                                             |

## Processors, readers and limits

| Variables                                                                                                                                                                                                       | Defaults                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `OTEL_BSP_SCHEDULE_DELAY`, `OTEL_BSP_EXPORT_TIMEOUT`, `OTEL_BSP_MAX_QUEUE_SIZE`, `OTEL_BSP_MAX_EXPORT_BATCH_SIZE`                                                                                               | 5000 ms, 30000 ms, 2048, 512                   |
| `OTEL_BLRP_SCHEDULE_DELAY`, `OTEL_BLRP_EXPORT_TIMEOUT`, `OTEL_BLRP_MAX_QUEUE_SIZE`, `OTEL_BLRP_MAX_EXPORT_BATCH_SIZE`                                                                                           | 1000 ms, 30000 ms, 2048, 512                   |
| `OTEL_METRIC_EXPORT_INTERVAL`, `OTEL_METRIC_EXPORT_TIMEOUT`                                                                                                                                                     | 60000 ms, 30000 ms                             |
| `OTEL_METRICS_EXEMPLAR_FILTER`                                                                                                                                                                                  | `trace_based` (also `always_on`, `always_off`) |
| `OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT`, `OTEL_ATTRIBUTE_COUNT_LIMIT`                                                                                                                                               | no limit, 128                                  |
| `OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT`, `OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT`, `OTEL_SPAN_EVENT_COUNT_LIMIT`, `OTEL_SPAN_LINK_COUNT_LIMIT`, `OTEL_EVENT_ATTRIBUTE_COUNT_LIMIT`, `OTEL_LINK_ATTRIBUTE_COUNT_LIMIT` | no limit, then 128 each                        |
| `OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT`, `OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT`                                                                                                                           | no limit, 128                                  |

The SDK MUST use a model-specific limit first, then the general limit, then the model-specific default, then the general default (`common/README.md`, Attribute Limits). SDKs SHOULD offer limit variables only for attribute types they can truncate.

## Exporter selection

- `OTEL_TRACES_EXPORTER`, `OTEL_METRICS_EXPORTER` and `OTEL_LOGS_EXPORTER` default to `otlp`. Values: `otlp`, `zipkin` (traces; the Zipkin exporter is Deprecated), `prometheus` (metrics), `console`, `logging` (deprecated, SHOULD NOT be supported by new implementations; use `console`), and `none`. `otlp/stdout` is Development (In-development Exporter Selection). Implementations MAY accept a comma-separated list for several exporters (Exporter Selection).
- The Zipkin exporter variables are Deprecated; the Prometheus exporter host and port variables (default port 9464) are Development.
- OTLP transport, endpoint, headers, TLS and timeouts: [`otlp.md`](otlp.md#exporter-configuration).

## Declarative configuration

Status: the data model is Stable (`data-model.md`); the configuration SDK is Stable except `ConfigProvider` and the resolved `Resource` output of Create, which are Development (`sdk.md`).

- `OTEL_CONFIG_FILE` names the configuration file. When it is set, the SDK Parses the file and Creates components from the result, and all other environment variables MUST be ignored except those the file references for substitution. To merge sources, customise the parsed model before Create (Declarative configuration).
- `OTEL_EXPERIMENTAL_CONFIG_FILE` is deprecated; use `OTEL_CONFIG_FILE`.
- The schema is JSON Schema, published in opentelemetry-configuration; its current release is `v1.2.0` (2026-09-11), and its example files declare `file_format: "1.2"`.
- YAML files SHOULD follow YAML 1.2, SHOULD be parsed with the 1.2 core schema, and MUST use the `.yaml` or `.yml` extension (`data-model.md`, File-based configuration model).
- Parse MUST perform substitution and MUST tell a missing property from one that is present but null: `drop:` with no value selects the drop aggregation, and users MUST NOT be required to write `drop: {}`. Parse SHOULD return an error for a missing or invalid file or a schema violation (`sdk.md`, Parse).
- Create MUST apply `nullBehavior` (or else `defaultBehavior`) to present-but-null properties and MUST return an error when a required property is missing. A `batch` processor without `schedule_delay` uses the default 5000 (`sdk.md`, Create).
- `file_format` versioning (opentelemetry-configuration `VERSIONING.md`): with the same major version, an older minor than the implementation is ideal, and a newer minor SHOULD produce a warning. A different major SHOULD produce an error. Properties with a `/development`, `/alpha` or `/beta` suffix have no stability guarantee and may break in a minor release.

A minimal file, taken from the shape of the `v1.2.0` migration example:

```yaml
file_format: "1.2"
disabled: ${OTEL_SDK_DISABLED:-false}
resource:
  attributes:
    - name: service.name
      value: ${OTEL_SERVICE_NAME:-unknown_service}
propagator:
  composite_list: ${OTEL_PROPAGATORS:-tracecontext,baggage}
tracer_provider:
  processors:
    - batch:
        exporter:
          otlp_http:
            endpoint: ${OTEL_EXPORTER_OTLP_ENDPOINT:-http://localhost:4318}/v1/traces
  sampler:
    parent_based:
      root:
        always_on:
```

## Environment variable substitution

From `data-model.md`, Environment variable substitution:

- Syntax: `${VAR}`, `${env:VAR}`, and `${VAR:-default}`, where the default applies if the variable is null, empty or undefined. An undefined variable without a default MUST become an empty value.
- `$$` is an escape for a literal `$`: `$${API_KEY}` yields `${API_KEY}` unsubstituted.
- Substitution MUST apply only to scalar values; mapping keys are never substituted.
- A reference that does not match the syntax, such as `${1API_KEY}`, is a parse error with no partial result.
- Types are interpreted after substitution, so `"true"` or `"5000"` from the environment become a boolean or integer.
- Substituted values MUST NOT inject YAML structures or further environment variable references.

## Moving from environment variables to a file

1. Start from `otel-sdk-migration-config.yaml` in opentelemetry-configuration; it maps the standard variables through substitution, so existing deployments keep working. `otel-sdk-config.yaml` is the same without substitution references (`sdk-environment-variables.md`, Declarative configuration).
2. Remove settings you no longer need from the file, and set `OTEL_CONFIG_FILE`.
3. Check that every variable you rely on is referenced in the file: once `OTEL_CONFIG_FILE` is set, unreferenced variables are ignored.
4. Keep `file_format` at a version your SDK implements, and avoid `/development` properties in production configuration.
