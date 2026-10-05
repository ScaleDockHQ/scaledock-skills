# Metadata, the authentication request and the acknowledgement

Read this for workflow steps 2 to 4: discovery and registration, building and validating the backchannel authentication request, and the acknowledgement or error. Section numbers are CIBA Core 1.0 unless another source is named.

## Discovery metadata (OP)

The OP publishes these in its RFC 8414 or OpenID Connect Discovery metadata (§4, §16.1):

| Parameter                                                         | Rule                                                                                                     |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `backchannel_authentication_endpoint`                             | REQUIRED. URL of the backchannel authentication endpoint.                                                |
| `backchannel_token_delivery_modes_supported`                      | REQUIRED. JSON array of one or more of `poll`, `ping`, `push`.                                           |
| `backchannel_authentication_request_signing_alg_values_supported` | OPTIONAL. JWS `alg` values accepted for signed requests. Absent means signed requests are not supported. |
| `backchannel_user_code_parameter_supported`                       | OPTIONAL. Boolean, default `false`.                                                                      |

- `grant_types_supported` includes `urn:openid:params:grant-type:ciba` when the OP supports ping or poll (§4). The grant type is an RFC 6749 §4.5 extension grant.
- Client authentication at the backchannel authentication endpoint uses the same methods and algorithms as `token_endpoint_auth_methods_supported` and `token_endpoint_auth_signing_alg_values_supported` (§4).
- Clients that discover through RFC 8414 check that the metadata `issuer` is identical to the issuer used to build the URL (RFC 8414 §3.3).

## Client registration metadata

Registered through RFC 7591 dynamic registration or out of band (§4, §16.2):

| Parameter                                        | Rule                                                                                                       |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `backchannel_token_delivery_mode`                | REQUIRED. One of `poll`, `ping`, `push`.                                                                   |
| `backchannel_client_notification_endpoint`       | REQUIRED for `ping` and `push`. MUST be an HTTPS URL.                                                      |
| `backchannel_authentication_request_signing_alg` | OPTIONAL. The `alg` the client signs requests with. Absent means the client will not send signed requests. |
| `backchannel_user_code_parameter`                | OPTIONAL. Boolean, default `false`. Applies only when the OP supports user codes.                          |

- Poll and ping clients MUST include `urn:openid:params:grant-type:ciba` in `grant_types` (§4).
- Clients that will sign requests MUST register the signing algorithm (§4).
- `token_endpoint_auth_method` also governs authentication at the backchannel authentication endpoint (§4).

### Pairwise identifiers

- Poll and ping: the `jwks_uri` replaces `redirect_uri` as the source of the Sector Identifier. The client provides `sector_identifier_uri` or `jwks_uri` when it registers the CIBA grant (§4).
- An OP that supports PPIDs MUST check for a valid `jwks_uri` when a poll or ping client registers with `subject_type` `pairwise`. If a `sector_identifier_uri` is given, it must list the `jwks_uri` (§4).
- The client proves it owns the `jwks_uri` keys with signed requests, self-signed certificate mTLS (RFC 8705 §2.2) or `private_key_jwt` (§4).
- Push: the host of `backchannel_client_notification_endpoint` is the Sector Identifier, and any `sector_identifier_uri` must list that endpoint (§4).

Registration example from §4:

```json
{
  "application_type": "web",
  "client_name": "My Example",
  "subject_type": "pairwise",
  "token_endpoint_auth_method": "private_key_jwt",
  "grant_types": ["urn:openid:params:grant-type:ciba"],
  "backchannel_token_delivery_mode": "poll",
  "jwks_uri": "https://client.example.org/my_public_keys.jwks"
}
```

## The authentication request

`POST` to the backchannel authentication endpoint, `application/x-www-form-urlencoded`, UTF-8, over TLS (§7, §7.1). The client authenticates with its registered method, adding `client_assertion` and `client_assertion_type`, or `client_id` for mTLS (§7.1).

| Parameter                   | Rule                                                                                                                                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scope`                     | REQUIRED. MUST contain `openid`; other scopes MAY be present (RFC 6749 §3.3).                                                                                           |
| `client_notification_token` | REQUIRED for ping and push. Bearer token the OP sends back on callbacks. At most 1024 characters, RFC 6750 §2.1 syntax, at least 128 bits of entropy (160 recommended). |
| `acr_values`                | OPTIONAL. Space-separated, in order of preference. When present, the ID Token should carry `acr`.                                                                       |
| `login_hint_token`          | OPTIONAL hint. A token identifying the user; its format is deployment or profile specific.                                                                              |
| `id_token_hint`             | OPTIONAL hint. An ID Token the OP issued to this client. If it was asymmetrically encrypted, the client MUST decrypt it and send the signed ID Token.                   |
| `login_hint`                | OPTIONAL hint. An email, phone number, account number, subject identifier, username or similar.                                                                         |
| `binding_message`           | OPTIONAL. Shown on both the CD and the AD to interlock them. SHOULD be short, plain text, and something the user can match, such as a random transaction code.          |
| `user_code`                 | OPTIONAL. A secret only the user knows that authorizes sending a request to their AD. Send it only when the registration says the client supports user codes.           |
| `requested_expiry`          | OPTIONAL. Positive integer: the `expires_in` the client would like. The OP MAY use it.                                                                                  |

- Exactly one of `login_hint_token`, `id_token_hint` and `login_hint` is REQUIRED (§7.1).
- The request MAY carry extra parameters defined by an extension or profile (§7.1). FAPI-CIBA adds `request_context`, for example (see `security.md`).

Example from §7.1 (wrapped):

```http
POST /bc-authorize HTTP/1.1
Host: server.example.com
Content-Type: application/x-www-form-urlencoded

scope=openid%20email%20example-scope&
client_notification_token=8d67dc78-7faa-4d41-aabd-67707b374255&
binding_message=W4SCT&
login_hint_token=eyJraWQiOi...&
client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
client_assertion=eyJraWQiOi...
```

### Client assertion audience

- Under 1.0 the client SHOULD use the OP's Issuer Identifier as `aud`, and the OP MUST accept the issuer, the token endpoint URL or the backchannel authentication endpoint URL (§7.1).
- The errata set 1 draft makes the OP issuer the sole permitted value. That line has posture track; see [`versions.md`](versions.md). Sending only the issuer is valid under both texts.

### Signed authentication request

- Every request parameter becomes a claim of a JWT, as a JSON string. The exception is `requested_expiry`, which may be a string or a number, and the OP must accept either. Profile parameters may be any JSON type (§7.1.1).
- The JWT MUST contain all request parameters and MUST use an asymmetric signature, following OpenID Connect Core §10.1 (§7.1.1).
- Required registered claims (§7.1.1):
  - `aud`: the OP's Issuer Identifier.
  - `iss`: the `client_id`.
  - `exp`, `iat` and `nbf`: the lifetime of the request.
  - `jti`: a unique identifier.
- Send it as the form parameter `request`. Request parameters MUST NOT appear outside the JWT. Client authentication parameters MUST stay as form parameters (§7.1.1).
- Encrypted request JWTs are not supported (§7.1.1).

Example payload from §7.1.1:

```json
{
  "iss": "s6BhdRkqt3",
  "aud": "https://server.example.com",
  "exp": 1537820086,
  "iat": 1537819486,
  "nbf": 1537818886,
  "jti": "4LTCqACC2ESC5BWCnN3j58EnA",
  "scope": "openid email example-scope",
  "client_notification_token": "8d67dc78-7faa-4d41-aabd-67707b374255",
  "binding_message": "W4SCT",
  "login_hint_token": "eyJraWQiOi..."
}
```

### User code

- A user code stops unsolicited requests from reaching a user's AD by anyone who knows their `login_hint`. It is not the user's password at the OP (§7.1.2).
- User codes are optional for the OP. An OP that supports them may still allow clients and users without one. Clients that already have a security context with the user, or that do not use static identifiers as hints, should be allowed without one (§7.1.2).
- A client may first send no user code, then prompt the user after `missing_user_code` (§7.1.2).
- The client MUST NOT store the user code (§7.1.2). Registering and changing user codes is out of scope; OPs should let users change theirs (§7.1.2).

## OP validation (§7.2)

1. Authenticate the client with its registered method. Public-key methods are RECOMMENDED over shared secrets.
2. If signed, validate the `request` JWT: signature and all RFC 7519 checks.
3. Validate every parameter. More than one hint gets `invalid_request`.
4. Check that the hint is valid and identifies a real user. Tell clients which hint types, issuers and maximum ages you accept.
5. Check that the REQUIRED parameters are present, and ignore unrecognized parameters.
6. On any error, return an authentication error response (§13).

## Acknowledgement (§7.3)

`HTTP 200` with a JSON body:

| Member        | Rule                                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `auth_req_id` | REQUIRED. At least 128 bits of entropy (160 recommended), only `A-Z a-z 0-9 . - _`, opaque to the client.               |
| `expires_in`  | REQUIRED. Positive integer JSON number: seconds from receipt of the request until `auth_req_id` expires.                |
| `interval`    | OPTIONAL. Positive integer JSON number: minimum seconds between polls. Only for poll and ping clients. Missing means 5. |

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store

{ "auth_req_id": "1c266114-a1be-4252-8ad1-04986c5b9ac1", "expires_in": 120, "interval": 2 }
```

The client MUST check that the required members are present, ignore unrecognized ones, and keep `auth_req_id` to match callbacks or to poll. It should store the expiry so that it can clean up requests that never get a callback (§7.3, §7.4).

## Authentication error response (§13)

JSON with `error` (REQUIRED), `error_description` and `error_uri` (OPTIONAL, restricted ASCII sets):

| HTTP | `error`                    | Meaning                                                                             |
| ---- | -------------------------- | ----------------------------------------------------------------------------------- |
| 400  | `invalid_request`          | Missing, invalid or repeated parameter, more than one hint, or otherwise malformed. |
| 400  | `invalid_scope`            | The scope is invalid, unknown or malformed.                                         |
| 400  | `expired_login_hint_token` | The `login_hint_token` has expired.                                                 |
| 400  | `unknown_user_id`          | The OP cannot identify the user from the hint.                                      |
| 400  | `unauthorized_client`      | The client may not use this flow.                                                   |
| 400  | `missing_user_code`        | A user code is required but missing.                                                |
| 400  | `invalid_user_code`        | The user code is wrong.                                                             |
| 400  | `invalid_binding_message`  | The binding message is invalid or unacceptable for this request.                    |
| 401  | `invalid_client`           | Client authentication failed.                                                       |
| 403  | `access_denied`            | The resource owner or OP denied this kind of request before any user interaction.   |
