# Security: authentication, authorization and signed cards

A2A relies on standard web security; identity is handled at the protocol layer, not inside A2A messages (§ 7).

## Transport

- Production deployments must use HTTPS or TLS; TLS 1.3 or later is recommended (§ 7.1, § 13.4).
- Clients should validate the server's TLS certificate (§ 7.2). Servers on HTTP bindings should send HSTS and disable SSLv3, TLS 1.0 and TLS 1.1 (§ 13.4).

## Authentication (§ 7.3, § 7.4)

1. The client reads `securitySchemes` (and `securityRequirements`) from the Agent Card.
2. It obtains credentials out of band, for example through an OAuth 2.0 flow listed in the card.
3. It sends the credentials in protocol headers or metadata on every request.

The server must authenticate every request and should return binding-specific challenges (HTTP 401, gRPC `UNAUTHENTICATED`) that name the required scheme (§ 3.3.2, § 7.4).

## Authorization (§ 7.5, § 13.1)

- Authorization is implementation-specific and may consider the requested skill, the actions within the task, data access policies and OAuth scopes (§ 7.5).
- Check authorization on every operation, and before any query that could reveal whether a resource outside the caller's scope exists (§ 13.1).
- Scope `ListTasks`, `GetTask`, `CancelTask`, `SubscribeToTask` and push notification config operations to the caller, even when no `contextId` filter is given (§ 13.1).
- Return 403 / `PERMISSION_DENIED` when permissions are missing, saying which scope is missing without leaking resources; prefer not-found over "not authorized" for resources the caller cannot see (§ 3.3.2).

A per-skill `securityRequirements` entry is the place to state the scopes a skill needs. The public card discloses scope names, so put only what a caller needs to obtain a token there.

## Extended Agent Card (§ 13.3)

- `GetExtendedAgentCard` must require authentication, using a scheme from the public card.
- The content may differ per caller: extra skills, rate limits, quotas, organization- or user-specific configuration.
- Do not include secrets or internal service URLs, and validate the caller's permissions before returning privileged details.
- Version extended cards and send caching headers so clients can invalidate them.

## Signing Agent Cards (§ 8.4)

Signing is optional (MAY), uses JWS (RFC 7515), and is stored in the card's `signatures` array as `AgentCardSignature` objects: `protected` (base64url protected header, required), `signature` (base64url, required), `header` (unprotected header object, optional).

Protected header: `alg` (required, for example `ES256`), `typ` (should be `"JOSE"`), `kid` (required); `jku` (JWKS URL) is optional (§ 8.4.2).

Canonical payload (§ 8.4.1):

1. Apply proto field presence: omit unset `optional` fields; keep `optional` fields that were explicitly set, even to a default; always keep REQUIRED fields; omit other fields that hold their default value (for example an empty, non-required array).
2. Remove the `signatures` field.
3. Canonicalize with RFC 8785 (JCS): lexicographic key order, canonical numbers and strings, no insignificant whitespace.

Signing input is `BASE64URL(protected header) || "." || BASE64URL(canonical payload)`, the usual JWS signing input; the payload is not stored in the card (§ 8.4.2).

Verification (§ 8.4.3): take a signature from `signatures`, get the key from `kid` and `jku` or a trusted key store over HTTPS, rebuild the canonical payload the same way, and verify. Clients should verify at least one signature before trusting a card; expired or revoked keys must not be used; several signatures may be present for key rotation.

```ts
// Sketch: build the signing input for an Agent Card. `canonicalize` is any RFC 8785
// implementation; `stripDefaults` applies the § 8.4.1 field presence rules.
function agentCardSigningInput(
  card: Record<string, unknown>,
  protectedHeader: { alg: string; typ: "JOSE"; kid: string; jku?: string },
  canonicalize: (value: unknown) => string,
  stripDefaults: (card: Record<string, unknown>) => Record<string, unknown>,
): string {
  const { signatures: _ignored, ...unsigned } = card;
  const payload = canonicalize(stripDefaults(unsigned));
  const b64url = (text: string) =>
    btoa(String.fromCharCode(...new TextEncoder().encode(text)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  return `${b64url(JSON.stringify(protectedHeader))}.${b64url(payload)}`;
}
```

## Push notification security (§ 13.2)

Agent (webhook caller):

- Must send the configured credentials.
- Should validate webhook URLs against SSRF: reject 127.0.0.0/8, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, localhost and link-local addresses, and use allowlists where appropriate.
- Should use 10 to 30 second timeouts and exponential backoff; may stop after repeated failures.
- Should store configs and credentials securely.

Client (webhook receiver):

- Must validate the credentials and respond 2xx.
- Should check that the task ID belongs to a task it created, process idempotently, rate limit, and use HTTPS.
- Should use a unique, single-purpose token per config, treat tokens as secrets and rotate them.

## General practices (§ 13.4, § 14.1.1)

- Validate all input; limit message and file sizes; reject unexpected media types.
- Validate file references (`url` parts) against SSRF (§ 14.1.1).
- Treat credentials as secrets, rotate and revoke them, rate limit authentication failures.
- Log authentication failures and authorization denials without logging credentials or personal data.
