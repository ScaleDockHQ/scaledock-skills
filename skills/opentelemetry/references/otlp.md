# OTLP

Read this when exporting telemetry over OTLP, configuring an OTLP exporter, or building or reviewing an OTLP receiver. Sources: the OTLP specification and README in opentelemetry-proto at tag `v1.11.1`, and the OTLP exporter document of the OpenTelemetry Specification at tag `v1.61.0`, listed in [Sources](../SKILL.md#sources). Rules cite the heading in `docs/specification.md` unless another file is named.

## Contents

- [Status](#status)
- [Transports and ports](#transports-and-ports)
- [OTLP/gRPC](#otlpgrpc)
- [OTLP/HTTP](#otlphttp)
- [JSON encoding](#json-encoding)
- [Success and partial success](#success-and-partial-success)
- [Retry and throttling](#retry-and-throttling)
- [Size limits](#size-limits)
- [Exporter configuration](#exporter-configuration)
- [Receiver checklist](#receiver-checklist)

## Status

- OTLP is Stable for traces, metrics and logs, in both binary protobuf and JSON. Profiles are Development (status line of `docs/specification.md`; `README.md`, Maturity Level).
- The `profiles/*` and `processcontext/*` protos are Development and live in `v1development` packages; everything else is Stable (`README.md`, Maturity Level).
- Stable components keep field types, numbers and names; allowed changes are additive, such as new fields, messages, enum values and services (`README.md`, Stability Definition). OTLP/JSON receivers MUST ignore unknown fields, as binary protobuf decoders do (JSON Protobuf Encoding).
- Old clients must be able to talk to new servers and the reverse; new functionality degrades to the lowest common denominator (Future Versions and Interoperability).

## Transports and ports

| Transport                | Default port | Paths or service                                                        |
| ------------------------ | ------------ | ----------------------------------------------------------------------- |
| OTLP/gRPC                | 4317         | `Export` on the trace, metrics, logs and profiles services (unary)      |
| OTLP/HTTP binary or JSON | 4318         | `POST /v1/traces`, `/v1/metrics`, `/v1/logs`, `/v1development/profiles` |

- Servers MUST support `none` and `gzip` compression (Protocol Details).
- An HTTP server SHOULD accept binary and JSON on the same port, choosing the decoder by `Content-Type`. A server MAY serve gRPC and HTTP on one port (OTLP/HTTP Connection).

## OTLP/gRPC

- The client sends `Export*ServiceRequest` messages with unary calls and expects a response to each (OTLP/gRPC). Sequential sending is fine for a local agent; high-throughput clients SHOULD pipeline concurrent unary calls, with a configurable limit (OTLP/gRPC Concurrent Requests).
- Retryable errors SHOULD use `UNAVAILABLE`, optionally with `RetryInfo`; non-retryable errors typically use `INVALID_ARGUMENT`, optionally with `BadRequest`. On a non-retryable error the client MUST drop the data and SHOULD count it (Failures).

## OTLP/HTTP

- Requests are `POST` over HTTP/1.1 or HTTP/2; HTTP/2 implementations SHOULD fall back to HTTP/1.1 when HTTP/2 cannot be established (OTLP/HTTP).
- Binary: `Content-Type: application/x-protobuf`. JSON: `Content-Type: application/json` (Binary Protobuf Encoding; JSON Protobuf Encoding).
- The client MAY gzip the body and MUST then send `Content-Encoding: gzip` (OTLP/HTTP Request).
- The response MUST use the same `Content-Type` as the request (OTLP/HTTP Response).
- Success and partial success are HTTP `200 OK`. Failures MUST be `4xx` or `5xx` with a protobuf `Status` body; `Status.message` SHOULD be a developer-facing error message, and clients should not act on `Status.code` (Full Success; Failures).

## JSON encoding

OTLP/JSON is the proto3 JSON mapping with these deviations (JSON Protobuf Encoding):

- `traceId` and `spanId` are case-insensitive hex strings, not base64.
- Enum values MUST be integers, not names.
- Keys MUST be lowerCamelCase field names; the original snake_case names are not accepted.
- 64-bit integers are encoded as decimal strings, and decoders accept numbers or strings. This includes the `fixed64` timestamps `timeUnixNano`, `startTimeUnixNano`, `endTimeUnixNano` and `observedTimeUnixNano`, which are nanosecond integers, not RFC 3339 strings (clarified in 1.11.1).
- Receivers MUST ignore unknown fields.

## Success and partial success

- Full success: the server accepted all data. `partial_success` MUST NOT be set. An empty request SHOULD get a success response (Full Success).
- Partial success: some data was rejected. The server MUST set `rejected_spans`, `rejected_data_points`, `rejected_log_records` or `rejected_profiles` to the rejected count and SHOULD set `error_message`. It MAY use `rejected_* = 0` with a non-empty `error_message` to return warnings. The client MUST NOT retry a partial success (Partial Success).
- Duplicates are possible when a client re-sends data whose acknowledgement it never got; this is a deliberate trade-off (Duplicate Data).

## Retry and throttling

gRPC (Failures; OTLP/gRPC Throttling):

| Status code                                                                             | Retryable                                                                   |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `CANCELLED`, `DEADLINE_EXCEEDED`, `ABORTED`, `OUT_OF_RANGE`, `UNAVAILABLE`, `DATA_LOSS` | Yes                                                                         |
| `RESOURCE_EXHAUSTED`                                                                    | Only when the server sent `RetryInfo`, meaning it can recover from overload |
| All others                                                                              | No                                                                          |

- To throttle, the server SHOULD return `UNAVAILABLE` with `RetryInfo.retry_delay`; the client SHOULD wait that long. Without `RetryInfo`, use exponential backoff.

HTTP (Failures; OTLP/HTTP Throttling):

- Retryable: `429`, `502`, `503` and `504`. All other `4xx` and `5xx` MUST NOT be retried. `400 Bad Request` means the data is invalid and MUST NOT be retried.
- To throttle, the server SHOULD return `429` or `503`, optionally with `Retry-After` (delay seconds or an HTTP-date; the HTTP-date form was documented in 1.11.0). The client SHOULD honour it, and otherwise use exponential backoff.
- If the server disconnects without a response, the client SHOULD retry with exponential backoff (All Other Responses). Connection failures SHOULD be retried with exponential backoff and random jitter (OTLP/HTTP Connection).

Exporter side (spec `protocol/exporter.md`, Retry): transient errors MUST be handled with a retry strategy that implements exponential backoff with jitter.

## Size limits

Added in 1.11.0 (OTLP/gRPC Request and Response; OTLP/HTTP Request and Response):

- Servers MUST limit request size, including after decompression; 64 MiB is the RECOMMENDED default. Over the limit, gRPC servers MUST return `RESOURCE_EXHAUSTED` as non-retryable and HTTP servers MUST return `413 Content Too Large`.
- Clients SHOULD limit request size, 64 MiB RECOMMENDED. Over the limit, the client MUST NOT send the request and SHOULD record the discard.
- Clients MUST limit response size (4 MiB is acceptable for gRPC and RECOMMENDED for HTTP) and treat an oversized response as non-retryable. Servers MUST limit response size, 4 MiB RECOMMENDED, trimming optional diagnostics first and otherwise failing with `RESOURCE_EXHAUSTED` or `500`.

UTF-8 (UTF-8 String Handling, clarified in 1.11.1): encoders SHOULD emit valid UTF-8; decoders SHOULD replace invalid sequences with U+FFFD; intermediaries MAY pass strings through unvalidated. Senders SHOULD NOT create empty envelopes (Empty Telemetry Envelopes), and a client sending to several destinations SHOULD queue and retry per destination (Multi-Destination Exporting).

## Exporter configuration

From `protocol/exporter.md` (Stable). Each environment variable also exists per signal, as `OTEL_EXPORTER_OTLP_{TRACES,METRICS,LOGS}_*`; per-signal endpoints take precedence over the general one:

| Option            | Environment variable                                   | Default                                                                                     |
| ----------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Endpoint          | `OTEL_EXPORTER_OTLP_ENDPOINT`                          | `http://localhost:4318` (HTTP), `http://localhost:4317` (gRPC)                              |
| Insecure          | `OTEL_EXPORTER_OTLP_INSECURE`                          | `false`; gRPC only, when the endpoint has no `http`/`https` scheme                          |
| Certificate       | `OTEL_EXPORTER_OTLP_CERTIFICATE`                       | none                                                                                        |
| Client key, cert  | `OTEL_EXPORTER_OTLP_CLIENT_KEY`, `_CLIENT_CERTIFICATE` | none (mTLS)                                                                                 |
| Headers           | `OTEL_EXPORTER_OTLP_HEADERS`                           | none; W3C Baggage format `key1=value1,key2=value2`, no metadata                             |
| Compression       | `OTEL_EXPORTER_OTLP_COMPRESSION`                       | SDK's choice; values `gzip` or `none`                                                       |
| Timeout           | `OTEL_EXPORTER_OTLP_TIMEOUT`                           | 10000 ms per batch                                                                          |
| Protocol          | `OTEL_EXPORTER_OTLP_PROTOCOL`                          | SHOULD be `http/protobuf`; also `grpc`, `http/json`. SDKs may keep `grpc` for compatibility |
| Max request size  | (option)                                               | 64 MiB                                                                                      |
| Max response size | (option)                                               | 4 MiB                                                                                       |

Endpoint URLs for OTLP/HTTP (Endpoint URLs for OTLP/HTTP):

- A signal-specific endpoint (`OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`) MUST be used as-is; an empty path becomes `/`.
- The general `OTEL_EXPORTER_OTLP_ENDPOINT` is a base URL: the exporter appends `v1/traces`, `v1/metrics` or `v1/logs` relative to it. `http://collector:4318` becomes `http://collector:4318/v1/traces`.
- An SDK MUST NOT change the URL in any other way. For gRPC, an `http` or `https` scheme decides security and wins over Insecure (Configuration Options).
- So `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://collector:4318` sends to `/`, not `/v1/traces`; include the path when you set a per-signal endpoint.

Other exporter rules: exporters SHOULD send a `User-Agent` such as `OTel-OTLP-Exporter-Python/1.2.3`. The metrics exporter defaults to Cumulative temporality and supports `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` and `OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM_AGGREGATION` (`explicit_bucket_histogram` or `base2_exponential_bucket_histogram`) (spec `metrics/sdk_exporters/otlp.md`).

## Receiver checklist

- Accept gRPC on 4317 and HTTP on 4318, binary and JSON on the same HTTP port, with `none` and `gzip`.
- Answer in the request's `Content-Type`.
- Return full success with `partial_success` unset, and partial success with the rejected count and a message.
- Enforce the decompressed size limit with `413` or `RESOURCE_EXHAUSTED`.
- Use `429`/`503` with `Retry-After`, or `UNAVAILABLE` with `RetryInfo`, to throttle; return `400` for invalid data.
- Ignore unknown fields, and replace invalid UTF-8 with U+FFFD.
