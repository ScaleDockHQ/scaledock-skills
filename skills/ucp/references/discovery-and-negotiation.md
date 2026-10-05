# Discovery, negotiation and message security

Rules for UCP 2026-08-25 profiles, naming, version selection, capability negotiation, errors, identity and signatures. Citations name the page and heading of the UCP Specification Overview unless another page is named.

## Profiles

A profile is a JSON object with a required `ucp` member (Overview, Profile Structure).

- Businesses publish at `/.well-known/ucp`; platforms publish at the URI they send in `UCP-Agent`.
- `ucp.version`, `ucp.services` and `ucp.payment_handlers` are required in both. `services` and `payment_handlers` MUST be present even when empty. `ucp.capabilities` MAY be omitted.
- Signing keys, when published, MUST be in the top-level `keys[]` array, an RFC 7517 JWK Set. Removing a key from `keys[]` is what revokes it. Well-known key types are EC (P-256, P-384) and OKP (Ed25519); verifiers skip key types they do not recognize.
- Businesses that support older releases SHOULD add `supported_versions`, mapping each older version to a complete profile for it.

A business profile has this shape (Overview, Business Profile):

```json
{
  "ucp": {
    "version": "2026-08-25",
    "services": {
      "dev.ucp.shopping": [
        {
          "version": "2026-08-25",
          "spec": "https://ucp.dev/2026-08-25/specification/overview/",
          "transport": "rest",
          "endpoint": "https://business.example.com/ucp/v1",
          "schema": "https://ucp.dev/2026-08-25/services/shopping/rest.openapi.json"
        }
      ]
    },
    "capabilities": {
      "dev.ucp.shopping.checkout": [
        {
          "version": "2026-08-25",
          "spec": "https://ucp.dev/2026-08-25/specification/shopping/checkout",
          "schema": "https://ucp.dev/2026-08-25/schemas/shopping/checkout.json"
        }
      ],
      "dev.ucp.shopping.fulfillment": [
        {
          "version": "2026-08-25",
          "schema": "https://ucp.dev/2026-08-25/schemas/shopping/fulfillment.json",
          "extends": "dev.ucp.shopping.checkout"
        }
      ]
    },
    "payment_handlers": {}
  },
  "keys": [
    {
      "kid": "business_2025",
      "kty": "EC",
      "crv": "P-256",
      "x": "…",
      "y": "…",
      "use": "sig",
      "alg": "ES256"
    }
  ]
}
```

The platform profile has the same structure; it declares its capabilities (for example `dev.ucp.shopping.order` with `config.webhook_url`), its payment handlers and its `keys[]` (Overview, Platform Profile).

### Hosting and fetching

Hosting rules apply to profiles and to the schema and transport artifacts they reference (Overview, Profile Requirements, Hosting):

1. Served over HTTPS.
2. Profile endpoints MUST NOT redirect (3xx).
3. `Cache-Control` MUST include `public` and `max-age` of at least 60, and MUST NOT include `private`, `no-store` or `no-cache`.
4. SHOULD include `ETag` or `Last-Modified`.

Fetch rules apply to every URL dereferenced for identity resolution: the profile, and any `jwks_uri` or CIMD document (Overview, Fetching):

1. MUST reject non-HTTPS URLs; MUST NOT follow redirects.
2. SHOULD enforce connect and response timeouts; SHOULD cache with a 60-second TTL floor regardless of `Cache-Control`; MAY refresh with stale-while-revalidate.
3. On an unknown `kid`, SHOULD force-refresh once, and MUST NOT do so more than once per TTL floor per origin.
4. MUST reject URLs resolving to RFC 6890 special-use addresses (loopback, link-local including `169.254.169.254`, private, reserved), except loopback for local development; SHOULD check the resolved address to resist DNS rebinding.
5. SHOULD bound response bodies, no lower than 128 KiB.
6. If the profile cannot be fetched or fails validation, the business MUST reject the request with the matching error.

Businesses SHOULD keep a registry of pre-approved platforms and a fixed discovery footprint (bounded cache, global rate limit, backoff, or `503` with `Retry-After` while resolving in the background).

## Naming and authority binding

Capability and service names MUST use `{reverse-domain}.{service}.{capability}`, for example `dev.ucp.shopping.checkout` or `com.example.payments.installments` (Overview, Naming Convention). The `dev.ucp.*` namespace belongs to ucp.dev. Payment handler names are reverse-domain but do not follow the three-part convention.

Every capability MUST declare a `schema`; services and handlers declare one where their transport or handler defines it. The `schema` URL's origin MUST match the namespace authority. `spec` is documentation: it MUST be `https` but MAY be on any host (Overview, Authority Binding).

Derivation, which a platform MUST apply to each `schema` URL (Overview, Derivation algorithm):

1. Parse with a WHATWG URL parser; `https` only; no userinfo. Never substring-match the raw URL (`https://ucp.dev@evil.example/x.json` has host `evil.example`).
2. The host is a registered domain of at least two labels; IP literals and single-label hosts are invalid.
3. Lowercase, strip a trailing `.`, use A-labels, and reverse the labels: `ucp.dev` becomes `dev.ucp`.
4. Accept if the name equals the reversed host, or starts with it followed by `.`.

| Name                        | `schema` host      | Result                     |
| --------------------------- | ------------------ | -------------------------- |
| `dev.ucp.shopping.checkout` | `ucp.dev`          | accept (prefix)            |
| `dev.ucp.shopping.checkout` | `shopping.ucp.dev` | accept (prefix)            |
| `com.example.pay`           | `pay.example.com`  | accept (exact)             |
| `com.examplecorp.pay`       | `example.com`      | reject (not label-aligned) |
| `com.example.pay`           | `cdn.example.com`  | reject                     |

The check does not consult the Public Suffix List, so declare entities only under a registrable domain you exclusively control. Enforcement: the platform MUST validate before fetching, MUST NOT fetch a mismatched URL, MUST treat the entity as not present, and MUST NOT follow redirects on schema fetches; a business SHOULD apply the same check to platform profiles (Overview, Enforcement). Binding proves provenance, not trust, and is separate from fetch safety.

## Services and endpoints

A service is the API surface of a vertical, keyed by name (for example `dev.ucp.shopping`). Each entry in `services[name][]` pairs the service with one transport and declares the service `version`, which is `D` in release `D` (Overview, Services). Transport definitions MUST be thin: method names and references to base schemas only (Overview, Service Definition).

| Transport  | Description format | `endpoint` means                     |
| ---------- | ------------------ | ------------------------------------ |
| `rest`     | OpenAPI 3.x (JSON) | Base URL; OpenAPI paths are appended |
| `mcp`      | OpenRPC (JSON)     | JSON-RPC endpoint                    |
| `a2a`      | Agent Card         | The Agent Card URL                   |
| `embedded` | OpenRPC (JSON)     | No endpoint; uses `continue_url`     |

`endpoint` MUST be an `https` URL and SHOULD NOT end with `/` (Overview, Endpoint Resolution).

## Capabilities and extensions

- An extension declares `extends` with one parent name or an array of parents; a multi-parent extension is active when at least one parent is (Overview, Extensions and Multi-Parent Extensions).
- Extension schemas put their additions in `$defs` keyed by the full parent capability name, composed with `allOf` (Overview, Extension Schema Pattern).
- `requires` declares the UCP release and capability version ranges an extension needs; ranges check compatibility, they do not select versions (Overview, Version Requirements).
- Platforms MUST fetch and compose schemas for negotiated capabilities before making requests (Overview, Platform Requirements). Resolution flow: discovery, negotiation, schema fetch, version compatibility, composition, validation (Overview, Resolution Flow).

## The `ucp` namespace and `map_order`

- `ucp` is reserved in every structured object; schema authors MUST NOT define a domain field named `ucp`. Consumers MUST ignore unknown members inside `ucp`, and extensions MUST NOT put data there. A `ucp.ucp` child MUST be ignored. A dictionary key named `ucp` is ordinary data (Overview, The `ucp` Protocol Namespace).
- `map_order` gives the preferred traversal order of a map-valued field as an array of keys, because JSON member order does not survive RFC 8785 canonicalization. It MAY be partial, is not an allowlist, does not apply to requests, and consumers MUST NOT reject a document for an unusable entry. Today its only defined meaning is the business's presentation preference for `payment_handlers` (Overview, `map_order`).

## Platform advertisement

Platforms MUST send their profile URI with every request (Overview, Platform Advertisement on Request):

- HTTP: `UCP-Agent: profile="https://agent.example/profiles/shopping-agent.json"`, as an RFC 8941 Dictionary.
- MCP: `params.arguments.meta["ucp-agent"].profile` in `tools/call`, next to the operation payload (for example `arguments.checkout`).

## Version selection

Dates are `YYYY-MM-DD` (Overview, Version Format). One complete business profile is chosen first, then capabilities are negotiated inside it (Overview, Version Selection).

1. The platform fetches `/.well-known/ucp`, the current profile.
2. It picks a mutual version from `version` and the keys of `supported_versions`, and SHOULD prefer the most recent.
3. For a `supported_versions` key, it fetches the mapped profile and MUST verify its `ucp.version` equals the key, else MUST NOT use it. Leaf profiles MUST NOT contain `supported_versions`.
4. With no mutual version, the platform SHOULD NOT send requests and the business MUST answer `version_unsupported`.
5. Platforms SHOULD NOT combine capabilities across profiles in one negotiation (Overview, Initial Service and Capability Discovery).

On every request the business MUST validate the platform profile's `version` against its own `version` and `supported_versions`, return `version_unsupported` otherwise, return `capabilities_incompatible` when a capability the operation needs has no mutual version, and include the negotiated version in every response (Overview, Request-Time Validation). `"draft"` and other non-date strings MUST NOT appear in `version` or `supported_versions`; pre-release use is by out-of-band coordination only (Overview, Pre-release Versions).

Release snapshot rules (Overview, Capability Versions and Component Versioning and Release Snapshots):

- In release `D`, every `dev.ucp.*` service, capability and extension MUST declare version `D`. A platform MUST reject (treat as absent) a `dev.ucp.*` entry whose version differs from `ucp.version`.
- Older `dev.ucp.*` versions are offered only through `supported_versions` leaf profiles, never as extra array entries.
- Third-party (`com.{vendor}.*`, `org.{org}.*`) versions advance independently and may list several versions.
- Capability compatibility is exact version equality, never inferred from date order.
- A capability depending on a newer protocol version MUST NOT be included when processing at an older one.
- Payment handler versions belong to their authors.

## Intersection algorithm

The business MUST fetch and validate the platform profile (unless cached), compute the intersection, and exclude extensions whose parents are absent (Overview, Business Requirements). The algorithm (Overview, Intersection Algorithm):

1. Keep each business capability whose name the platform also lists.
2. Intersect the version strings; keep the latest shared one, or drop the capability if none is shared.
3. Remove any capability whose `extends` names no parent left in the set (multi-parent: at least one must remain).
4. Repeat step 3 until nothing changes.

Responses MUST list in `ucp.capabilities` only capabilities that are negotiated and relevant to the operation: checkout operations include checkout and its extensions, cart operations cart and its extensions, order webhooks order (Overview, Response Capability Selection).

## Errors

Discovery and version failures are transport errors; capability failures are business outcomes in a normal UCP response (Overview, Error Handling and Error Codes).

| Code                                                      | REST | MCP      |
| --------------------------------------------------------- | ---- | -------- |
| `invalid_profile_url`                                     | 400  | `-32001` |
| `profile_unreachable`                                     | 424  | `-32001` |
| `profile_malformed`                                       | 422  | `-32001` |
| `version_unsupported`                                     | 422  | `-32001` |
| `capabilities_incompatible`                               | 200  | result   |
| `signature_missing`, `signature_invalid`, `key_not_found` | 401  | `-32000` |
| `digest_mismatch`, `algorithm_unsupported`                | 400  | `-32600` |

Protocol errors: 401, 403, 409 (idempotency key reused with a different payload), 429 and 503 map to MCP `-32000`, 500 to `-32603`. 429 and 503 SHOULD carry `Retry-After` (REST) or `error.data.retry_after` (MCP). Over streamable HTTP, MCP servers MUST also return the HTTP status. Businesses SHOULD include a `continue_url` fallback (cart or checkout page, product or search page, or storefront) in negotiation failures (Overview, The `continue_url` Field).

## Authentication and identity binding

- Businesses SHOULD authenticate platforms with API keys, OAuth 2.0, mTLS or RFC 9421 HTTP Message Signatures (Overview, Authentication Mechanisms).
- Business-to-platform webhooks MUST be signed.
- With API keys, OAuth or mTLS, the verifier MUST confirm the authenticated principal may act for the profile in `UCP-Agent` and reject conflicts; with signatures, the signature itself binds the profile (Overview, Identity Binding).
- Keys come from the signer's profile `keys[]`, resolved through `UCP-Agent`, or through `Signature-Agent` when Web Bot Auth interop is in use (Overview, Key Discovery). For Web Bot Auth, `Signature-Agent` with `type=jwks_uri` or `type=cimd` can point at the profile; the default `type=directory` expects a signed directory at `/.well-known/http-message-signatures-directory` (Overview, Business Profile and Deployment Patterns for WBA Interop).

## Message signatures

From the Message Signatures page:

- Algorithms: every implementation MUST verify `ES256`; `ES384` and `EdDSA` are optional. The algorithm comes from the JWK `kty`/`crv`; `alg` is not in `Signature-Input`. Unsupported key types MUST NOT cause the key set to be rejected (Signature Algorithms).
- Encoding: ECDSA signatures MUST be raw fixed-width `r||s` (64 bytes for P-256, 96 for P-384), not DER; Ed25519 per RFC 8032 Section 5.1.6 (REST Request Signing).
- REST request components: `@method`, `@authority`, `@path` always; `@query` with a query; `ucp-agent` when present; `signature-agent` for WBA-shape signatures; `idempotency-key` for POST, PUT, DELETE and PATCH; `content-digest` (RFC 9530, SHA-256 of raw bytes) and `content-type` with a body (REST Request Signing).
- When: platforms SHOULD sign all requests if they use signatures; webhooks MUST be signed; checkout completion and payment authorization responses are RECOMMENDED; cart, catalog and error responses optional (When Signatures Apply).
- MCP uses streamable HTTP and the same headers, with `Content-Digest` over the JSON-RPC body and no JSON canonicalization (MCP Transport).
- Rotation: add the new key, start signing, accept the old key at least 7 days, then remove it; rotate every 90 days (SHOULD). On compromise, remove the key immediately (Key Rotation).

Replay protection lives in idempotency keys, not signature timestamps (Replay Protection):

| Requirement            | Value                                                   |
| ---------------------- | ------------------------------------------------------- |
| Entropy                | At least 128 bits                                       |
| Uniqueness             | Per client, per operation type                          |
| Server storage         | At least 24 hours, 48 recommended                       |
| Same key, same payload | Return the cached response, do not re-execute           |
| Same key, new payload  | `409 Conflict` (REST) or `-32000` (MCP), do not execute |
| Storage failure        | Fail closed with 503                                    |

Businesses MUST compare payloads by the SHA-256 of the raw body; platforms MUST use a fresh key whenever the body changes.
