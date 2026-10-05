# Built-ins, documents and OPA interfaces

Read this when choosing built-in functions, deciding where data lives, building a bundle, or calling OPA over HTTP. Sources: OPA Philosophy (The OPA Document Model), OPA Policy Language (Built-in Functions), Rego Built-ins with the v1.21.1 built-in metadata and capabilities, OPA REST API and OPA Bundles, listed in [Sources](../SKILL.md#sources).

## Input, data, base and virtual documents

- **Base documents** are loaded from outside; **virtual documents** are computed by rules. Both are read with the same reference syntax under `data`, and `/v1/data` returns their combination at a path (OPA Philosophy, The OPA Document Model).
- Where base documents sit under `data` is set by whoever loads them; where virtual documents sit is set by `package` (The OPA Document Model).
- Four loading models: asynchronous push (`PUT /v1/data`) and asynchronous pull (bundles) land in `data`; synchronous push is `input` in the query (`POST /v1/data` body); synchronous pull is a built-in such as `http.send` (The OPA Document Model).
- Asynchronously loaded data and policies are cached in memory for fast evaluation (The OPA Document Model). Prefer bundles or pushed data over `http.send` for data every decision needs.

## Built-in functions

Built-ins look like `name(arg1, ..., argN)`, may have dotted names (`io.jwt.decode`), and need safe (bound) input variables (Policy Language, Built-in Functions). Custom built-ins should be namespaced, such as `org.example.special_func`.

**Errors.** By default a built-in that hits a runtime error evaluates to undefined and evaluation continues. Test for it with `not`, for example `reason contains "invalid JWT" if not io.jwt.decode(input.token)`. Without `import future.keywords.not`, that rule adds nothing when `input.token` is missing, because the undefined argument fails the rule before the `not` (Rego Keyword: not, The problem with legacy negation; confirmed with OPA v1.21.1). Turn errors into failures with `strict-builtin-errors` (HTTP query parameter), `--strict-builtin-errors` (`opa eval`) or `rego.StrictBuiltinErrors(true)` (Go); Wasm does not support it (Policy Language, Built-in Functions, Errors).

The built-ins below were checked against `builtin_metadata.json` and `capabilities.json` at OPA v1.21.1, with the release that introduced each. The full list is at Rego Built-ins.

| Area            | Built-ins (introduced)                                                                                                                                                  | Notes from the metadata                                                                                                              |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Aggregates      | `count`, `sum`, `max`, `min`, `sort` (v0.17.0)                                                                                                                          | `count` takes a collection or a string.                                                                                              |
| Strings         | `concat`, `contains`, `startswith`, `endswith`, `lower`, `upper`, `split`, `sprintf`, `trim_space`, `strings.replace_n` (v0.17.0); `strings.any_prefix_match` (v0.44.0) | `contains` is for strings only; use `in` for collections (Rego Built-ins, Strings).                                                  |
| Objects         | `object.get` (v0.17.0); `object.union`, `object.remove`, `object.filter` (v0.17.2); `object.keys` (v0.47.0)                                                             | `object.get(obj, key, default)` returns the default when the key is absent; an array key walks a path.                               |
| Sets and arrays | `union`, `intersection`, `array.concat`, `array.slice` (v0.17.0); `numbers.range` (v0.22.0)                                                                             | Set operators `&` and `                                                                                                              | ` also exist (Policy Reference, Grammar). |
| Encoding        | `json.marshal`, `json.unmarshal`, `base64.decode` (v0.17.0); `json.patch` (v0.25.0); `json.match_schema` (v0.50.0)                                                      | `json.match_schema` returns `[match, errors]` and uses RE2 for `pattern`.                                                            |
| Tokens          | `io.jwt.decode`, `io.jwt.decode_verify`, `io.jwt.verify_rs256` (v0.17.0)                                                                                                | `io.jwt.decode` does not verify; `io.jwt.decode_verify` returns `[valid, header, payload]` and checks the signature and constraints. |
| Matching        | `glob.match` (v0.17.0); `regex.match` (v0.23.0)                                                                                                                         | Prefer `glob.match`, `startswith` and `endswith` in hot rules: they can be indexed (Policy Performance).                             |
| Network         | `net.cidr_contains` (v0.17.0); `net.cidr_merge` (v0.24.0)                                                                                                               |                                                                                                                                      |
| Time            | `time.now_ns`, `time.parse_rfc3339_ns` (v0.17.0); `time.add_date` (v0.19.0)                                                                                             | Mock `time.now_ns` in tests.                                                                                                         |
| Types           | `type_name`, `is_string`, `to_number` (v0.17.0)                                                                                                                         |                                                                                                                                      |
| Other           | `walk`, `trace`, `opa.runtime` (v0.17.0); `semver.compare` (v0.22.0); `print` (v0.34.0); `rego.metadata.rule` (v0.40.0)                                                 | `opa.runtime` exposes the process environment and config.                                                                            |
| External        | `http.send` (v0.17.0)                                                                                                                                                   | Synchronous pull; makes the decision depend on another service.                                                                      |

Removed in v1: `any`, `all`, `re_match`, `net.cidr_overlap`, `set_diff`, `cast_array`, `cast_set`, `cast_string`, `cast_boolean`, `cast_null`, `cast_object` are prohibited by the v1 compiler (Upgrading to v1.0, Prohibit use of deprecated builtins). They are still listed in the v1.21.1 capabilities file: with OPA v1.21.1, `opa check` rejects `any([true])` in a v1 module with `rego_type_error: deprecated built-in function calls`, and accepts it under `--v0-compatible`.

Rules for built-ins:

- Never authorize on `io.jwt.decode` output alone; verify first with `io.jwt.decode_verify` or an `io.jwt.verify_*` function, as the documented JWT example does (Policy Language, Built-in Functions, Errors).
- Before using a built-in, confirm it exists for the oldest consumer: `opa check --capabilities <version>` rejects calls the capabilities do not list (CLI Reference, check).

## Data API

From OPA REST API, Data API:

| Call                                                    | Purpose                                                                                                                                                                                 |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /v1/data/{path}`                                   | Read a document; `input` may be passed as a query parameter.                                                                                                                            |
| `POST /v1/data/{path}` with `{"input": ...}`            | Evaluate a decision with input. Body may be JSON or YAML (`Content-Type`).                                                                                                              |
| `POST /v0/data/{path}` with the input as the whole body | Webhook form; returns the bare value and 404 when undefined.                                                                                                                            |
| `PUT /v1/data/{path}`, `PATCH /v1/data/{path}`          | Write base documents (asynchronous push).                                                                                                                                               |
| `PUT /v1/policies/{id}` with `text/plain` Rego          | Create or replace a module; 400 if it does not parse or compile. Paths owned by a bundle cannot be changed this way, and bundles are the preferred way to update policies (Policy API). |

- Status codes for `/v1/data`: 200, 400 (invalid input JSON), 500. An undefined document returns **200 without `result`** (Get a Document (with Input), Status Codes).
- Response fields: `result`, `metrics` (with `metrics=true`), `decision_id` (with decision logging), `rule_labels` (with `rule_labels=true`, OPA v1.21.0 or later) (Response Message).
- Query parameters: `pretty`, `provenance`, `explain` (`notes`, `fails`, `full`, `debug`), `metrics`, `instrument`, `strict-builtin-errors`, `rule_labels` (Query Parameters).
- Extra top-level keys in the POST body are request metadata for custom built-ins and decision logs; use a namespaced key such as `"com.example.opa/metadata"` (Request/Response Metadata).

```http
POST /v1/data/opa/examples/allow_request HTTP/1.1
Content-Type: application/json

{"input": {"example": {"flag": false}}}
```

```json
{}
```

The empty object is the documented answer for an undefined `allow_request`; a caller must read it as deny.

## Bundles

From OPA Bundles:

- A bundle is a gzipped tarball of `.rego` files, `data.json`/`data.yaml` files, an optional `policy.wasm`, an optional `.manifest`, and `.signatures.json` when signed. Directories place data under `data`; a policy's location comes from its `package`. Other JSON or YAML file names are ignored (Bundle File Format).
- Build with `opa build -b <dir>`; `--optimize`/`-O` needs an entrypoint (`--entrypoint authz/allow` or an `entrypoint` annotation); sign with `--signing-key` and `--verification-key` (Bundle build).
- `.manifest` fields: `revision` (string), `roots` (path prefixes the bundle owns; default `[""]`, all of `data`), `rego_version` (`0` or `1`; absent means v1, or v0 under `--v0-compatible`; the field wins over the flag), `file_rego_versions` (per-file overrides by path glob), `wasm`, and `metadata` (readable under `data.system`). A JSON Schema is published at `https://openpolicyagent.org/schemas/bundle/v1/manifest.schema.json` (Bundle File Format; Manifest JSON Schema).
- Roots in one manifest must not overlap, and every package and data file must sit under a root; OPA reports a violation through the Status API. Overlap across bundles is not checked, and bundles load in no guaranteed order, so aggregate policy centrally where you can (Multiple Sources of Policy and Data).
- The bundle service serves `GET <service url>/<resource>` with `200` and `application/gzip`; it should send `ETag` and answer `If-None-Match` with `304`. The default resource is `bundles/<name>`. Long polling uses `long_polling_timeout_seconds` and `Content-Type: application/vnd.openpolicyagent.bundles` (Bundle Service API; Caching; HTTP Long Polling).
- `persist: true` stores the activated bundle on disk so OPA can start with it when the bundle server is down (Bundle Service API).
- Signing: OPA verifies `.signatures.json` against a key configured out of band (`keys` in config for remote bundles, `--verification-key` for `--bundle` paths) and activates the bundle only if it verifies; otherwise it keeps the old bundle and reports the failure. `opa eval` and `opa test` do not verify signatures (Signing).
- By default the REST APIs cannot modify policy or data loaded from bundles (Bundles, introduction).
