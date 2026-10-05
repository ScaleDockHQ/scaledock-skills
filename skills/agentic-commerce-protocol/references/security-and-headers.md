# Security, headers, versioning and idempotency

Read this when implementing or reviewing the HTTP layer of any ACP endpoint: authentication, request signing, the `API-Version` header, idempotency, transport security, and content safety. Sources: the Agentic Checkout RFC (§2.1, §3.1, §5.1, §6, §7), the Delegate Payment RFC (§2.1–§2.3, §5, §6), the 2026-04-17 OpenAPI parameters, the Capability Negotiation RFC §6, the MCP binding, and the agenticcommerce.dev Security page, listed in [Sources](../SKILL.md#sources).

## Request headers

| Header            | Checkout                         | Delegate Payment        | Notes                                                           |
| ----------------- | -------------------------------- | ----------------------- | --------------------------------------------------------------- |
| `Authorization`   | Required                         | Required                | `Bearer <token>`.                                               |
| `Content-Type`    | Required on requests with a body | Required                | `application/json`.                                             |
| `API-Version`     | Required                         | Required                | The `YYYY-MM-DD` version the client speaks.                     |
| `Idempotency-Key` | Required on every POST           | Required                | Opaque, 1–255 characters, UUID v4 recommended. Not sent on GET. |
| `Request-Id`      | Recommended                      | Recommended             | Correlation id, echoed back.                                    |
| `Signature`       | Recommended                      | Recommended (see below) | base64url detached signature over the canonical JSON request.   |
| `Timestamp`       | Recommended                      | Recommended             | RFC 3339.                                                       |
| `Accept-Language` | Recommended                      | Optional                | For example `en-US`.                                            |
| `User-Agent`      | Recommended                      | Optional                | Client identification.                                          |

Sources: Checkout RFC §3.1; Delegate Payment RFC §2.3; Agentic Checkout and Delegate Payment OpenAPI `components.parameters`.

Response headers: `Idempotency-Key` echoed on POST responses, `Request-Id` echoed when provided (Checkout RFC §3.1), and `Idempotent-Replayed: true` on a cached replay (Agentic Checkout OpenAPI, 2xx headers).

## Authentication

- `Authorization: Bearer <token>` is required on checkout and Delegate Payment requests (Checkout RFC §7; Delegate Payment RFC §6). The OpenAPI security scheme is HTTP `bearer` with `bearerFormat: API Key` (Agentic Checkout OpenAPI, `securitySchemes`).
- ACP does not define how the token is issued; agenticcommerce.dev says authorization is managed between the agent and seller directly through bearer tokens (Security).
- Over MCP, the token is not a tool argument: the MCP server authenticates at the connection level, because tool schemas are visible to the model (MCP binding, Header Mapping and Security Considerations). Use the `mcp-authorization` skill for that layer.

## Request signing and freshness

- The server **SHOULD** publish its acceptable signature algorithms out of band (Checkout RFC §2.1). The Delegate Payment RFC gives Ed25519 and ES256 as examples (§2.1).
- The client **SHOULD** sign requests with `Signature` over canonical JSON plus a `Timestamp` (Checkout RFC §2.1). For Delegate Payment, §2.2 says the client **MUST** serialize canonically, compute a detached signature, base64url-encode it into `Signature`, and **MUST** include `Timestamp` and `Idempotency-Key`, while the header table in §2.3 and the OpenAPI mark `Signature` and `Timestamp` as recommended and optional. Implement signing for Delegate Payment, and confirm with the server whether it enforces it.
- Receivers **SHOULD** verify `Signature` and check `Timestamp` within a bounded clock-skew window (Checkout RFC §7; Delegate Payment RFC §6).
- ACP does not name the canonical JSON scheme or define a signature-input header. It is not RFC 9421 HTTP Message Signatures; if a deployment wants RFC 9421 as well, see the `http-message-signatures` skill.
- Webhooks use a different, HMAC-based header, `Merchant-Signature`; see [`webhooks-and-errors.md`](webhooks-and-errors.md).

## Versioning

- The client **MUST** send `API-Version`, and the server **MUST** validate that it supports it (Checkout RFC §2.1; Delegate Payment RFC §2.1).
- On a missing or unsupported version, the server **SHOULD** return `400 Bad Request` with `supported_versions` listing every version it accepts, newest first, and **MAY** use `code: "unsupported_api_version"` or `"missing_api_version"` (Checkout RFC §2.1; checkout schema `Error.supported_versions`).
- Sessions report the version in `protocol.version` (checkout schema `ProtocolVersion`). Discovery reports `protocol.version` and `protocol.supported_versions`, oldest first, the last being the latest (Discovery RFC §4.2).
- Over MCP, `API-Version` becomes the required `meta.api_version` (MCP binding, Header Mapping).

```json
{
  "type": "invalid_request",
  "code": "unsupported_api_version",
  "message": "API version '2025-01-01' is not supported",
  "supported_versions": ["2026-04-17", "2026-01-30"]
}
```

## Idempotency

The Checkout RFC §6 and Delegate Payment RFC §5 are the canonical rules and supersede earlier ones (SEP #120).

1. **Key required.** Clients **MUST** send `Idempotency-Key` on every POST: create, update, complete, cancel and delegate_payment (§6.1; DP §5.1).
2. **Scope.** Servers **MUST** scope keys to the authenticated identity plus the endpoint path; the same key on another endpoint is independent (§6.1).
3. **Missing key.** **MUST** be rejected with `400`, `type: invalid_request`, `code: idempotency_key_required` (§6.1).
4. **Equivalence.** Compare request bodies only, never headers, by semantic JSON equality: key order and trailing zeros (`1.0` vs `1`) do not matter; `null` versus absent and array order do (§6.2). RFC 8785 canonicalization with a SHA-256 fingerprint is an informative way to compare (§6.2).
5. **Replay.** Same key and identical body: return the original response with the same status code, **SHOULD** add `Idempotent-Replayed: true`, and **MUST NOT** re-execute side effects such as payment capture, inventory reservation or vault token creation (§6.3; DP §5.3).
6. **Conflicts.** Same key, different body: `422`, `code: idempotency_conflict`, not retryable. Same key while the original is in flight: `409`, `code: idempotency_in_flight`, and the server **SHOULD** send `Retry-After` in seconds (the OpenAPI marks it required) (§6.4).
7. **No caching of 5xx.** A 5xx **MUST NOT** be stored against the key; a retry after a 5xx is a fresh request (§6.5).
8. **Retention.** Keep key-to-response mappings for at least 24 hours; after that a reused key is a new request (§6.6).
9. **Extensions.** Extension fields in the body take part in the comparison (§6.7).
10. **Implementation (informative).** Put idempotency in middleware, commit the key record and the business operation in one ACID transaction, record recovery points around PSP calls, and make SDK serializers keep `null` and absent distinct (§6.8; DP §5.7).

Over MCP, the key is `meta.idempotency_key` with the same semantics (MCP binding, Security Considerations). The binding's header table still calls it "recommended for create and complete", which predates the 2026-04-17 rule; send it on every mutating tool call.

## Transport and data protection

- All endpoints **MUST** use HTTPS and return JSON (Checkout RFC §3.1), and TLS 1.3 **MUST** be used (Checkout RFC §7; Delegate Payment RFC §6).
- Do not log full PAN or CVC; redact addresses as policy requires (Checkout RFC §7). Card data handling **MUST** follow applicable PCI DSS requirements (Delegate Payment RFC §6).
- An MCP proxy in front of a merchant REST API sees payment tokens in `complete_checkout_session`; its operator **SHOULD** evaluate PCI DSS scope (MCP binding, Proxy Trust Boundary).

## Content safety

When `content_type` is `markdown` on a disclosure or message, content **MUST** be CommonMark 0.31.2 and **MUST NOT** contain raw HTML. Sellers **MUST** author it that way, servers **MUST** validate inbound markdown and reject raw HTML, and agents **MUST** render it with a CommonMark parser that disables or sanitizes raw HTML (Checkout RFC §5.1).

## Capability and discovery hardening

- Sellers **MUST** enforce authentication requirements regardless of agent-declared capabilities, validate payment method compatibility server-side, and never rely only on agent-declared capabilities for security decisions (Capability Negotiation RFC §6.2).
- Sellers **SHOULD** advertise only capabilities relevant to the session; agents **SHOULD** declare only what the checkout needs, to avoid fingerprinting users (Capability Negotiation RFC §6.1 and §6.3).
- The discovery document is public: it **MUST NOT** include merchant identifiers or configuration, payment handler details or PSP routing, buyer information, or authentication tokens or keys, and **SHOULD** be rate limited (Discovery RFC §7.1 and §7.2).
