# Semantic conventions

Read this when choosing span names, span kinds, attributes and metrics for HTTP, database, messaging or RPC calls, setting resource attributes, recording errors and exceptions, or naming custom telemetry. Source: OpenTelemetry Semantic Conventions at tag `v1.44.0` (schema URL `https://opentelemetry.io/schemas/1.44.0`), cited by document and heading, listed in [Sources](../SKILL.md#sources). The v1.44.0 index lists Generative AI as moved to a separate repository; use the `opentelemetry-genai` skill for those conventions.

## Contents

- [Stability and requirement levels](#stability-and-requirement-levels)
- [Naming custom telemetry](#naming-custom-telemetry)
- [Errors and exceptions](#errors-and-exceptions)
- [Resource](#resource)
- [HTTP](#http)
- [Database](#database)
- [Messaging](#messaging)
- [RPC](#rpc)
- [Stability opt-in](#stability-opt-in)
- [Common mistakes](#common-mistakes)

## Stability and requirement levels

Each document, signal and attribute carries its own status. In v1.44.0:

| Area                              | Status                                            |
| --------------------------------- | ------------------------------------------------- |
| HTTP (`http/README.md`)           | Mixed; HTTP spans and the duration metrics Stable |
| Database (`db/README.md`)         | Mixed; database spans Stable                      |
| RPC (`rpc/README.md`)             | Release Candidate                                 |
| Messaging (`messaging/README.md`) | Development                                       |
| Exceptions in logs                | Stable, except where otherwise specified          |
| Exceptions on spans               | Deprecated                                        |
| Recording errors                  | Development                                       |
| Events (`general/events.md`)      | Development                                       |
| Resource (`resource/README.md`)   | Mixed; `service.*` attributes Stable              |

Requirement levels (`general/attribute-requirement-level.md`, Stable):

| Level                    | Rule                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `Required`               | All instrumentations MUST populate the attribute.                                                                                           |
| `Conditionally Required` | MUST be populated when the stated condition holds; otherwise use it if the instrumentation can populate it.                                 |
| `Recommended`            | SHOULD be added by default if readily available and cheap; instrumentations MAY offer an option to turn it off.                             |
| `Opt-In`                 | SHOULD be populated only when the user configures it; without configuration it MUST NOT be populated. Typical for costly or sensitive data. |

## Naming custom telemetry

From `general/naming.md` (Stable, unless otherwise specified):

- Names SHOULD be lowercase, dot-namespaced (`service.version`), and use snake_case inside a multi-word component (`http.response.status_code`).
- Two attributes, two metrics or two events MUST NOT share a name. Names starting with `otel.` are reserved for the specification.
- For a company-specific name, prefix with the reverse domain (`com.acme.shopname`). For an internal name, prefix with a reasonably unique application name. Do not reuse an existing OpenTelemetry namespace as the prefix (Recommendations for application developers).
- Pluralize an attribute only when it holds several entities, and then make it an array (`process.command_args`) (Attribute name pluralization guidelines).
- Counters and UpDownCounters SHOULD NOT use `_total` (Metrics, Do not use `total`, Development).
- Metrics about network calls SHOULD be `{area}.{client|server}.{metric_name}` (Metrics, Client and server metrics, Development).

## Errors and exceptions

From `general/recording-errors.md` (Development), which domain conventions refer to:

- An operation failed if it threw an exception or returned an error in another way. Errors that were retried or handled SHOULD NOT be recorded on the span or metric of the surrounding operation (What constitutes an error).
- The span status MUST be left unset if the operation ended without error. On error, instrumentation SHOULD set status `Error` and the `error.type` attribute; with an exception, the status description SHOULD be the exception message (Recording errors on spans).
- The operation duration histogram SHOULD include `error.type` on failures and SHOULD NOT include it on success. Report one metric for successes and failures rather than several (Recording errors on metrics).
- Record an exception as a log record, once, and not when the instrumented library handles it (Recording exceptions).

From `exceptions/exceptions-logs.md`:

- Exception events emitted alongside spans MUST be associated with the span context. When the Logs API accepts an exception instance, pass the instance instead of setting attributes by hand (Recording an exception).
- `exception.message` or `exception.type` is Conditionally Required (at least one); `exception.stacktrace` is Recommended (Attributes).
- Event name (Development): `{operation}.exception`, for example `http.client.request.exception`; generic handlers use `exception` (Event name).
- Severity (Development): `FATAL` (21) for exceptions that usually stop the application; `ERROR` (17) for exceptions unhandled by application code, recommended for `SERVER` and `CONSUMER` conventions; `WARN` (13) for exceptions expected to be handled, recommended for `CLIENT` and `PRODUCER`; `DEBUG` (5) for exceptions that indicate no real issue, such as a client cancellation (Severity).
- Instrumentations SHOULD NOT record artificial exceptions that a framework raises for an error status code (When not to record exceptions, Development).

`exceptions/exceptions-spans.md` is Deprecated. Instrumentations that record exceptions as span events SHOULD add `OTEL_SEMCONV_EXCEPTION_SIGNAL_OPT_IN` with `logs` (logs only) and `logs/dup` (both); the default keeps span events. If span events are still emitted, the event name MUST be `exception` (Exception event).

## Resource

From `resource/README.md` and `resource/service.md`:

- `service.name` is Required. It MUST be the same for all instances of a horizontally scaled service; when unset, SDKs MUST fall back to `unknown_service:` plus the executable name, or `unknown_service`.
- `service.namespace`, `service.name` and `service.instance.id` together MUST be globally unique. Set `service.version` (Recommended) on every service.
- `telemetry.sdk.language`, `telemetry.sdk.name` and `telemetry.sdk.version` are Required and set by the SDK; the name `opentelemetry` is reserved for the OpenTelemetry SDK. Distributions add `telemetry.distro.*`.
- `deployment.environment.name` (Stable attribute, Recommended) names the deployment tier. The well-known values `development`, `production`, `staging` and `test` MUST be used when they apply. It does not affect service identity: `frontend` in production and `frontend` in staging are the same service (`resource/deployment-environment.md`).

## HTTP

From `http/http-spans.md` (Stable, unless otherwise specified) and `http/http-metrics.md`:

- Span name: `{method} {target}` when a low-cardinality target exists, else `{method}`. `{method}` is `http.request.method`, or `HTTP` when the method is `_OTHER`. The target is `http.route` on server spans and `url.template` on client spans (Development). Instrumentation MUST NOT default to the URI path as the target (Name).
- Status: MUST be left unset for 1xx, 2xx and 3xx unless another error occurred. For 4xx it MUST be left unset on `SERVER` spans and SHOULD be `Error` on `CLIENT` spans. For 5xx it SHOULD be `Error`. Don't set a description that `http.response.status_code` already explains. A cancellation the caller requested SHOULD NOT be an error (Status).
- `http.request.method` MUST be `_OTHER` for methods unknown to the instrumentation; the original goes in `http.request.method_original`. The known set is the RFC 9110 methods plus `PATCH` and `QUERY` (the `QUERY` value is Development). An instrumentation that could map valid methods to `_OTHER` MUST let users override the full list with `OTEL_INSTRUMENTATION_HTTP_KNOWN_METHODS` (comma-separated, case-sensitive) (Common attributes).
- Client spans (`CLIENT`): Required `http.request.method`, `server.address`, `server.port`, `url.full`. Conditionally Required `error.type`, `http.request.method_original`, `http.response.status_code`, `network.protocol.name`. Each resend is its own span with `http.request.resend_count` (HTTP client span; HTTP request retries and redirects).
- Server spans (`SERVER`): Required `http.request.method`, `url.path`, `url.scheme`. Conditionally Required `http.route` (only if the framework supports routes; never derived from the path), `http.response.status_code`, `url.query`, `server.port`, `error.type`. Recommended `client.address`, `server.address`, `user_agent.original` (HTTP server span).
- Sampling-relevant attributes that SHOULD be set at span creation: on clients `http.request.method`, `server.address`, `server.port`, `url.full`; on servers `client.address`, `http.request.header.<key>`, `http.request.method`, `server.address`, `server.port`, `url.path`, `url.query`, `url.scheme`, `user_agent.original`. `http.route` MUST be set at creation if it is already known, and otherwise before the span ends.
- Privacy: credentials in `url.full` SHOULD become `REDACTED:REDACTED`. Query values for `X-Amz-Signature`, `X-Amz-Credential`, `X-Amz-Security-Token`, `sig` and `X-Goog-Signature` SHOULD be replaced by `REDACTED` (Development). Sensitive `url.query` content SHOULD be scrubbed when identifiable.
- Metrics: `http.server.request.duration` and `http.client.request.duration` are Stable histograms in `s`, and SHOULD use the advisory boundaries `[0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 7.5, 10]`.

## Database

From `db/database-spans.md` (Stable, unless otherwise specified):

- Span name: `{db.query.summary}` if available; else `{db.operation.name} {target}`; else `{target}`; else `{db.system.name}`. The target is `db.collection.name`, `db.stored_procedure.name`, `db.namespace`, or `server.address:server.port`, in that order (Name).
- Span kind SHOULD be `CLIENT`; it MAY be `INTERNAL` for in-memory databases. Status follows the recording-errors rules (Span definition).
- `db.system.name` is Required. Conditionally Required: `db.collection.name`, `db.namespace`, `db.operation.name`, `db.response.status_code`, `error.type`, `server.port`. Recommended: `db.query.summary`, `db.query.text`, `server.address`.
- Collect `db.query.text` by default only with sanitization that replaces every literal with a placeholder (`?` unless it has meaning in that database). Parameterized query text SHOULD NOT be sanitized (Sanitization of `db.query.text`).
- Prefer instrumenting the higher-level client API that represents the logical operation over the generic query it generates.
- The duration metric is `db.client.operation.duration` (`db/database-metrics.md`, Stable).

## Messaging

From `messaging/messaging-spans.md` (Development):

- Span name: `{messaging.operation.name} {destination}`, where the destination is `messaging.destination.template`, then `messaging.destination.name` (if not temporary or anonymous), then `server.address:server.port` (Span name).
- Operation type to span kind: `create` is `PRODUCER`; `send` is `PRODUCER` when its context is the creation context, otherwise `CLIENT`; `receive` is `CLIENT`; `process` is `CONSUMER`; `settle` is `CLIENT` (Span kind).
- A producer SHOULD attach a message creation context to each message so consumers can correlate with the producer (Context propagation). "Send" and "Receive" spans SHOULD link to the creation contexts of their messages; links are the default correlation mechanism (Trace structure).
- Required: `messaging.operation.name`, `messaging.system`. Conditionally Required: `error.type`, `messaging.destination.name`, `messaging.destination.template`, `messaging.operation.type`.

## RPC

From `rpc/rpc-spans.md` (Release Candidate, unless otherwise specified):

- Span name: `{rpc.method}` if available and not `_OTHER`, else `{rpc.system.name}` (Name). Span kind is `CLIENT` or `SERVER`.
- `rpc.system.name` is Required. Conditionally Required: `error.type`, `rpc.method`, `rpc.method_original`, `rpc.response.status_code`, `server.address`, `server.port`.

## Stability opt-in

Instrumentations that emitted older experimental conventions SHOULD NOT change what they emit by default. They SHOULD add `OTEL_SEMCONV_STABILITY_OPT_IN`, a comma-separated list of category values, and keep the existing major version patched for at least six months after it starts emitting both sets (`http/README.md`; `db/README.md`; `rpc/README.md`; `messaging/README.md`):

| Category  | Applies to instrumentations on                  | Stable only | Both (phased rollout) |
| --------- | ----------------------------------------------- | ----------- | --------------------- |
| HTTP      | v1.20.0 or earlier of the HTTP conventions      | `http`      | `http/dup`            |
| Database  | v1.24.0 or earlier of the database conventions  | `database`  | `database/dup`        |
| RPC       | v1.37.0 or earlier of the RPC conventions       | `rpc`       | `rpc/dup`             |
| Messaging | v1.24.0 or earlier of the messaging conventions | `messaging` | `messaging/dup`       |

`http/dup` takes precedence over `http` when both are set. Without a value the instrumentation keeps emitting the old conventions. The variable is meant only for the move from experimental conventions to their first stable version and SHOULD be dropped in the next major version (`non-normative/http-migration.md`). Rename tables are in [`versions.md`](versions.md#upgrading).

## Common mistakes

- Using the raw URL path as `http.route` or in the span name.
- Marking server spans `Error` for 4xx responses.
- Emitting `http.method`, `http.status_code` or `net.peer.name` from new code; those are the pre-stable names.
- Recording a handled exception, or recording the same exception on the span and again as a log.
- Collecting unsanitized `db.query.text` by default.
- Inventing attributes in an OpenTelemetry namespace such as `http.*` instead of a company prefix.
