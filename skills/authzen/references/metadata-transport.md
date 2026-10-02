# PDP metadata, transport and security

## PDP metadata (AuthZEN § 9)

It is RECOMMENDED that a PDP publish metadata describing its configuration.

### Parameters (AuthZEN § 9.1)

| Parameter                     | Requirement | Value                                                                                         |
| ----------------------------- | ----------- | --------------------------------------------------------------------------------------------- |
| `policy_decision_point`       | REQUIRED    | The PDP identifier: an `https` URL with no query or fragment. It prevents PDP mix-up attacks. |
| `access_evaluation_endpoint`  | REQUIRED    | URL of the Access Evaluation API.                                                             |
| `access_evaluations_endpoint` | OPTIONAL    | URL of the Access Evaluations API.                                                            |
| `search_subject_endpoint`     | OPTIONAL    | URL of the Subject Search API.                                                                |
| `search_action_endpoint`      | OPTIONAL    | URL of the Action Search API.                                                                 |
| `search_resource_endpoint`    | OPTIONAL    | URL of the Resource Search API.                                                               |
| `capabilities`                | OPTIONAL    | Array of registered IANA URNs for PDP-specific capabilities (AuthZEN § 9.1.2).                |
| `signed_metadata`             | OPTIONAL    | A JWT whose claims are metadata parameters (AuthZEN § 9.1.3).                                 |

- When an endpoint parameter is absent, the PEP can conclude the PDP does not support that API (AuthZEN § 9.1.1).
- Naming note: AuthZEN § 9.1.2 defines `capabilities`, while § 8.2.1 refers to `supported_capabilities` metadata. The certification scenario uses `capabilities` (Cert § c-6-4). Publish `capabilities`.
- Capability names are registered in the AuthZEN PDP Capabilities Registry, and each name begins with `:` (AuthZEN § 12.3.2).

### Signed metadata (AuthZEN § 9.1.3, § 9.2.3, § 11.8)

- `signed_metadata` MUST be signed or MACed with JWS and MUST contain `iss`, the party attesting to the claims.
- A PEP MAY ignore it. A PEP that supports it MUST give its values precedence over the plain JSON values.
- `signed_metadata` SHOULD NOT appear as a claim inside the JWT, and metadata where it does is RECOMMENDED to be rejected.
- The recipient MUST check the signature was made by a key belonging to the issuer. If the signature fails or the issuer is not trusted, it SHOULD treat this as an error.
- Unsigned metadata is protected only by TLS and the Web PKI. Signed metadata lets the PEP make trust decisions based on the issuer; how is out of scope.

### Discovery (AuthZEN § 9.2)

- The document is at the URL formed by inserting `/.well-known/authzen-configuration` between the host and any path or query of the PDP identifier.
- It MUST be fetched with HTTP `GET`. A successful response MUST be `200` with `Content-Type: application/json`, and its body is a JSON object (AuthZEN § 9.2.1, § 9.2.2).
- Parameters the PEP does not understand MUST be ignored. Parameters with no value MUST be omitted. An error uses the applicable HTTP status code (AuthZEN § 9.2.2).
- `policy_decision_point` in the response MUST be identical to the identifier used to build the URL, or the data MUST NOT be used (AuthZEN § 9.2.3).
- Normal HTTP caching applies, so implementations should use `Cache-Control` with `max-age` (AuthZEN § 11.9).

```ts
function metadataUrl(pdp: string): string {
  const u = new URL(pdp);
  if (u.protocol !== "https:" || u.search || u.hash)
    throw new Error("invalid PDP identifier");
  const path = u.pathname === "/" ? "" : u.pathname;
  return `${u.origin}/.well-known/authzen-configuration${path}`;
}

async function discover(pdp: string): Promise<Record<string, unknown>> {
  const res = await fetch(metadataUrl(pdp));
  if (res.status !== 200) throw new Error(`metadata error ${res.status}`);
  const md = (await res.json()) as Record<string, unknown>;
  if (md.policy_decision_point !== pdp)
    throw new Error("policy_decision_point mismatch");
  return md;
}
```

A tenant-scoped PDP `https://pdp.example.com/tenant1` publishes at `https://pdp.example.com/.well-known/authzen-configuration/tenant1` (AuthZEN § 9.2).

## HTTPS JSON binding (AuthZEN § 10.1)

- Every call is an HTTPS `POST`. Requests MUST carry `Content-Type: application/json`, and the body MUST be a JSON object matching the request structure.
- A successful response is `200` with `Content-Type: application/json`.
- The request URL MUST be the endpoint parameter from metadata when it is provided. Otherwise it SHOULD be the PDP base URL plus the default path.

| API                | Default path                 | Metadata parameter            |
| ------------------ | ---------------------------- | ----------------------------- |
| Access Evaluation  | `/access/v1/evaluation`      | `access_evaluation_endpoint`  |
| Access Evaluations | `/access/v1/evaluations`     | `access_evaluations_endpoint` |
| Subject Search     | `/access/v1/search/subject`  | `search_subject_endpoint`     |
| Resource Search    | `/access/v1/search/resource` | `search_resource_endpoint`    |
| Action Search      | `/access/v1/search/action`   | `search_action_endpoint`      |

Version 1.0 endpoints SHOULD include `v1` in the endpoint identifier (AuthZEN § 4).

### JSON serialization (AuthZEN § 10.1.1, § 11.5)

- The top-level element of every request and response body MUST be a JSON object.
- If a required attribute is missing, the server MUST return a `400 Bad Request` error.
- Implementations SHOULD follow I-JSON: UTF-8 with no unpaired surrogates, numbers within IEEE 754 double precision, and unique member names.
- Properties with a `null` value SHOULD be omitted.

### Error responses (AuthZEN § 10.1.2)

| Code  | Meaning        | Body                    |
| ----- | -------------- | ----------------------- |
| `400` | Bad Request    | An error message string |
| `401` | Unauthorized   | An error message string |
| `403` | Forbidden      | An error message string |
| `500` | Internal Error | An error message string |

These codes concern the request or its processing, not the decision. A `401` means the PEP did not authenticate properly, for example a missing `Authorization` header or an invalid access token. A deny is `200` with `{ "decision": false }`.

### Request identification (AuthZEN § 10.1.3)

- A PEP MAY send a request identifier, and the `X-Request-ID` header is RECOMMENDED for it.
- When a request carries an identifier, the PDP MUST include one in the response, RECOMMENDED as the `X-Request-ID` response header. If the PEP supplied one, the PDP MUST return the same value.

## Security considerations (AuthZEN § 11)

- **Integrity and confidentiality:** the PEP–PDP connection MUST be secured with the most adequate means for the transport, for example TLS (§ 11.1).
- **PEP authentication:** the PDP SHOULD authenticate the PEP, for example with mutual TLS, OAuth or an API key. This limits denial of service and stops a caller from probing the policy with many crafted requests (§ 11.2).
- **Authentication failure:** respond `401` and SHOULD include `WWW-Authenticate` with the expected scheme and realm (§ 11.3).
- **Trust:** the PDP trusts the values the PEP sends, because the PEP enforces the decision (§ 11.4).
- **Response integrity:** the PDP MAY sign its responses, which protects them across proxies and gateways where TLS is not end to end (§ 11.6).
- **Availability:** the PDP SHOULD protect against large payloads, request floods, invalid or deeply nested JSON and memory exhaustion, for example with rate limiting (§ 11.7).
