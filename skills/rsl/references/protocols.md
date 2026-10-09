# OLP, CAP and EMS

Read this when operating or calling an RSL License Server, enforcing licenses at a resource server or CDN, or distributing encrypted assets. These three protocols are OPTIONAL extensions: a site can publish RSL terms and keep its own payment or bot-management stack (§ 1.2, § 3.3.2). "§" refers to RSL-SPEC-1.0 with errata.

## Roles

| RSL role        | OAuth analog         | Job                                                      |
| --------------- | -------------------- | -------------------------------------------------------- |
| Publisher       | Resource Owner       | Defines terms in an RSL document.                        |
| Client          | OAuth Client         | Crawler or agent requesting access under a license.      |
| License Server  | Authorization Server | Implements OLP, issues License Tokens, enforces payment. |
| Resource Server | Resource Server      | Serves assets and enforces license controls.             |

From § 5.1.

## Open License Protocol (OLP)

The License Server's base URL is the `server` attribute on `<content>`. A conformant server exposes all three endpoints over HTTPS, UTF-8, with JSON or form encoding (§ 5.2).

| Endpoint      | Method | Purpose                                               | Built on |
| ------------- | ------ | ----------------------------------------------------- | -------- |
| `/token`      | POST   | Acquire a License Token (`client_credentials` grant). | RFC 6749 |
| `/introspect` | POST   | Validate a token and whether it covers a resource.    | RFC 7662 |
| `/key`        | POST   | Retrieve a JWK to decrypt an EMS asset.               | RFC 7517 |

Client authentication (§ 5.3): every OLP request uses HTTP Basic with `client_id:client_secret`, the `client_id` form-URL-encoded first. Missing or bad credentials give 401 with `{"error": "invalid_client"}`.

`/token` request (§ 5.4.2), `application/x-www-form-urlencoded`:

- `grant_type=client_credentials` (required).
- `license`: the complete `<license>` element requested, URL-encoded (required).
- `license_type`: media type of `license`, default `application/rsl+xml`.
- `resource`: the `url` of the parent `<content>` (required).

`/token` response (§ 5.4.3): `access_token`, `token_type` always `License`, `expires_in` in seconds (`0` means non-expiring). Clients treat the token as opaque. Errors (§ 5.4.4) use 400, 401 or 403 with `invalid_request`, `invalid_client`, `unauthorized_client`, `invalid_license`, `invalid_resource`, `unsupported_grant_type` or `server_error`.

Resource servers and clients MUST rely on the introspection response to decide whether access is permitted (§ 5.5).

## Crawler Authorization Protocol (CAP)

CAP adds the HTTP authentication scheme `License`, which follows Bearer semantics (RFC 6750) under a distinct name (§ 6.2).

```http
GET /dataset/iris.csv HTTP/1.1
Host: data.example.com
Authorization: License rsl_cnNsLWNsaWVudC0xMjM6czNjcjN0S0VZ
```

Flow (§ 6.1): discover the license, get a token from `/token` unless already licensed, send it in `Authorization`, the resource server validates locally or through `/introspect`, then serves or refuses.

Status codes (§ 6.3.1):

| Code | When                                                             |
| ---- | ---------------------------------------------------------------- |
| 401  | `Authorization` missing, invalid or expired.                     |
| 402  | No license acquired or payment terms unmet.                      |
| 403  | The license does not permit the requested use.                   |
| 503  | The License Server is unreachable or validation cannot complete. |

A 401 or 402 MUST carry `WWW-Authenticate: License` with an `error` parameter (`invalid_request`, `invalid_token`, `insufficient_scope`, `server_error`) and optional `error_description` (§ 6.3.2, § 6.3.4), and MUST carry either a `Link rel="license"; type="application/rsl+xml"` header or an inline `application/rsl+xml` body (§ 6.3.3).

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: License error="invalid_token", error_description="License token missing, expired, revoked, or malformed"
Link: <https://example.com/license.xml>; rel="license"; type="application/rsl+xml"
```

CAP verifies license compliance only; pair it with bot management or Web Bot Auth to verify who the crawler is (§ 6).

## Encrypted Media Standard (EMS)

- `encrypted="true"` on `<content>` marks the asset as encrypted and requires a `server` that acts as key authority (§ 7.1).
- Publisher (§ 7.2.2): generate a unique symmetric JWK (`kty="oct"`) per asset, encrypt with an implementation-chosen symmetric cipher, host the ciphertext (typically `.enc`), and publish the license with `encrypted` and `server`.
- Client (§ 7.2.3): discover the license, get a token from `/token`, call `/key` with the token and asset URL, then decrypt locally.

## Security and privacy

- Fetch RSL files and license metadata only over HTTPS; validate integrity when signatures or authenticated transport exist (§ 8).
- Authenticate clients before issuing or honoring tokens; rate-limit and validate input on `/token`, `/introspect` and `/key` (§ 8).
- Protect EMS keys with authenticated encryption, never send them in plaintext, and use token expiry, replay protection and clock sync (§ 8).
- Minimize logged identifiers, avoid cross-service correlation, keep tokens opaque, keep personal data out of license XML, and publish privacy practices (§ 9).
