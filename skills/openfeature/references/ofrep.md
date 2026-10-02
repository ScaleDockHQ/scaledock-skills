# OpenFeature Remote Evaluation Protocol (OFREP)

Draft posture: track. OFREP has no release or tag. This summary is pinned to the OpenAPI document with `info.version` 0.4.0 at commit 98c4e0d (2026-09-30) of the protocol repository. Check the document again before building on any detail. The OpenFeature project maintains generic OFREP providers (README, Key Benefits), so a flag system that implements the API usually needs no custom provider.

Sources: OpenFeature Remote Evaluation Protocol repository README and `service/openapi.yaml` at commit 98c4e0d.

## What it is

OFREP is an HTTP API between OpenFeature providers and flag management systems. It is a protocol, not a provider: an application uses an OpenFeature SDK, the SDK uses an OFREP provider, and the provider calls a flag system that implements the API (README, How It Works). OpenAPI 3.1.0, Apache-2.0.

## Endpoints (tag OFREP Core, required)

| Endpoint                              | Paradigm                                | Use                                                                     |
| ------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| `POST /ofrep/v1/evaluate/flags/{key}` | Dynamic context (server-side providers) | Evaluate one flag with the request's context.                           |
| `POST /ofrep/v1/evaluate/flags`       | Static context (client-side providers)  | Evaluate all flags once for a context; the provider caches the results. |

Both take a JSON body `{ "context": { "targetingKey": "…", … } }`. `targetingKey` is an optional string, and other properties are allowed.

Authentication is optional and system-defined: `Authorization: Bearer <token>` or an `X-API-Key` header.

## Single flag responses

| Status   | Body                                                                                                                                                                                          |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200      | `key`, `reason`, optional `variant` and `metadata`, and `value` (boolean, string, integer, float or object). A code-default response has no `value`; the provider uses the default from code. |
| 400      | `key`, `errorCode` (`PARSE_ERROR`, `TARGETING_KEY_MISSING`, `INVALID_CONTEXT` or `GENERAL`), `errorDetails`.                                                                                  |
| 404      | `key`, `errorCode` `FLAG_NOT_FOUND`, `errorDetails`.                                                                                                                                          |
| 401, 403 | Missing or invalid credentials; no permission.                                                                                                                                                |
| 429      | Rate limited, with `Retry-After`.                                                                                                                                                             |
| 500      | `errorDetails`.                                                                                                                                                                               |

The success `reason` enum is `STATIC`, `TARGETING_MATCH`, `SPLIT`, `DISABLED` and `UNKNOWN`. Metadata values are boolean, string or number.

```json
{
  "key": "discount-banner",
  "value": true,
  "reason": "TARGETING_MATCH",
  "variant": "enabled"
}
```

## Bulk responses

- 200: `flags`, an array where each item is a success or a failure, so some flags can fail while others succeed; optional flag-set `metadata`; optional `eventStreams`.
- An `ETag` is returned; send it back in `If-None-Match`, and a 304 with no body means the flags have not changed.
- 400, 401, 403, 429 and 500 as for single flags.

## Change notifications

`eventStreams` entries have a `type` (only `sse` is defined) and exactly one of `url` or `endpoint`. Providers connect to known types, ignore unknown types, and fall back to polling when no entry is present. Treat the `url` as sensitive: do not log or persist it with its query string. After `inactivityDelaySec` (default 120) of client inactivity, close the connection, then reconnect and re-fetch unconditionally when activity resumes. A re-fetch triggered by a change event can pass `flagConfigEtag` and `flagConfigLastModified` as query parameters.
