# Poll, ping and push

Read this for workflow step 6: getting the authentication result to the client. Section numbers are CIBA Core 1.0 unless another source is named.

## The three modes

| Mode | How the result arrives                                                                             | Registration needs                                                       |
| ---- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| poll | The client polls the token endpoint with the CIBA grant.                                           | CIBA grant in `grant_types`.                                             |
| ping | The OP POSTs `auth_req_id` to the notification endpoint; the client then calls the token endpoint. | CIBA grant in `grant_types`, `backchannel_client_notification_endpoint`. |
| push | The OP POSTs the ID Token, access token and optional refresh token to the notification endpoint.   | `backchannel_client_notification_endpoint`.                              |

- The client registers one mode, and the OP MUST deliver only through it (§3, §10).
- A ping client may also poll; the OP must then treat it as a poll client (§10.1).
- The notification endpoint MUST be HTTPS with TLS. Callbacks are authenticated with `client_notification_token` as a bearer token (§9).

## Token request (poll and ping)

The client authenticates as in OpenID Connect Core §9 and POSTs form-encoded UTF-8 to the token endpoint (§10.1):

| Parameter     | Rule                                                                               |
| ------------- | ---------------------------------------------------------------------------------- |
| `grant_type`  | REQUIRED. `urn:openid:params:grant-type:ciba`.                                     |
| `auth_req_id` | REQUIRED. The OP MUST check that it was issued to this client, or return an error. |

```http
POST /token HTTP/1.1
Host: server.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=urn%3Aopenid%3Aparams%3Agrant-type%3Aciba&
auth_req_id=1c266114-a1be-4252-8ad1-04986c5b9ac1&
client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
client_assertion=eyJraWQiOi...
```

Success is an OpenID Connect Core §3.1.3.3 token response with `access_token`, `token_type`, `id_token`, `expires_in` and optionally `refresh_token`. After that, the `auth_req_id` is no longer valid (§10.1.1).

### Polling rules (§10.1)

- Never poll more often than `interval` (default 5 seconds). The interval runs from the moment a request is sent.
- Never send two overlapping requests for one `auth_req_id`. Wait for the response; if the interval has already passed, poll again at once.
- The OP may long-poll: answer only when the result is ready or on timeout, with 30 seconds recommended (RFC 6202 §5.5). Clients should wait at least 30 seconds, and the OP should not take longer.
- After a 503 with `Retry-After`, wait the indicated time before retrying.

Examples with a 5-second interval (§10.1):

| What happens                                      | What the client does               |
| ------------------------------------------------- | ---------------------------------- |
| `authorization_pending` after 30 s (long polling) | Polls again at once.               |
| `authorization_pending` after 2 s                 | Waits 3 s, then polls.             |
| No response within 30 s                           | May cancel and send a new request. |

## Token error response (§11)

Errors follow OpenID Connect Core §3.1.3.4 and RFC 6749 §5.2, plus these codes from the Device Authorization Grant (RFC 8628 §3.5):

| `error`                 | Meaning and client action                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| `authorization_pending` | The user has not authenticated yet. Keep polling at the interval.                                          |
| `slow_down`             | Still pending. The interval MUST grow by at least 5 seconds for this and every later request.              |
| `expired_token`         | The `auth_req_id` expired. Start a new authentication request.                                             |
| `access_denied`         | The user denied the request.                                                                               |
| `invalid_grant`         | MUST be returned when `auth_req_id` is invalid or was issued to another client.                            |
| `invalid_request`       | The OP may return it to a client that keeps polling too fast. The client must stop for that `auth_req_id`. |
| `unauthorized_client`   | Returned to a push-mode client that calls the token endpoint with the CIBA grant.                          |

On a 4xx with a JSON body, read the `error` value rather than relying on the HTTP status (§11).

## Ping callback (§10.2)

- The OP POSTs after a successful or failed authentication. It need not ping for an expired `auth_req_id`, because the client knows `expires_in`.
- The request has `Authorization: Bearer <client_notification_token>` and a JSON body with only `auth_req_id`.

```http
POST /cb HTTP/1.1
Host: client.example.com
Authorization: Bearer 8d67dc78-7faa-4d41-aabd-67707b374255
Content-Type: application/json

{ "auth_req_id": "1c266114-a1be-4252-8ad1-04986c5b9ac1" }
```

Client:

- MUST check that the bearer token is valid and belongs to that `auth_req_id`. If it is not, it SHOULD answer 401.
- SHOULD answer a valid callback with 204. The OP SHOULD also accept 200 and ignore the body.
- MUST NOT answer with 3xx; the OP MUST NOT follow redirects. Handling of 4xx and 5xx is out of scope.
- Ignores unrecognized parameters, then makes the token request.

## Push callback (§10.3.1)

The OP POSTs JSON containing the RFC 6749 §4.1.4 and OpenID Connect Core §3.1.3.3 token response members plus `auth_req_id`, with the same bearer header:

```json
{
  "auth_req_id": "1c266114-a1be-4252-8ad1-04986c5b9ac1",
  "access_token": "G5kXH2wHvUra0sHlDy1iTkDJgsgUO1bN",
  "token_type": "Bearer",
  "refresh_token": "4bwc0ESC_IAhflf-ACC_vjD_ltc11ne-8gFPfA2Kx16",
  "expires_in": 120,
  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2NzcyNiJ9..."
}
```

The OP MUST bind the tokens in the ID Token. These claims are required only in push mode:

| Claim                                     | Value                                                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `at_hash`                                 | Hash of the access token, as in OpenID Connect Core §3.1.3.6.                                     |
| `urn:openid:params:jwt:claim:auth_req_id` | The `auth_req_id`.                                                                                |
| `urn:openid:params:jwt:claim:rt_hash`     | Hash of the refresh token, calculated the same way. MUST be present when a refresh token is sent. |

The two URN claims are Public Claim Names and are not registered with IANA (§16.4).

Decoded ID Token example from §10.3.1:

```json
{
  "iss": "https://server.example.com",
  "sub": "248289761001",
  "aud": "s6BhdRkqt3",
  "exp": 1537819803,
  "iat": 1537819503,
  "at_hash": "Wt0kVFXMacqvnHeyU0001w",
  "urn:openid:params:jwt:claim:rt_hash": "sHahCuSpXCRg5mkDDvvr4w",
  "urn:openid:params:jwt:claim:auth_req_id": "1c266114-a1be-4252-8ad1-04986c5b9ac1"
}
```

Client:

1. Check the bearer token against the `auth_req_id`; answer 401 if it is not valid (SHOULD).
2. Validate the ID Token as a detached signature, as in OpenID Connect Core §3.1.3.7.
3. Check that `urn:openid:params:jwt:claim:auth_req_id` equals the `auth_req_id` in the body.
4. Validate the access token against `at_hash` (OpenID Connect Core §3.2.2.9), and a present refresh token against `urn:openid:params:jwt:claim:rt_hash`.
5. Answer 204 (SHOULD); never 3xx. Ignore unrecognized parameters.

### Sender-constrained tokens in push mode (§5)

Pushed tokens never pass the token endpoint, so a binding such as RFC 8705 certificate-bound tokens is done at the backchannel authentication endpoint instead. The OP records the key material presented there, for example its SHA-256 thumbprint, and should bind the pushed tokens to it.

## Push error payload (§12)

Sent to the notification endpoint as JSON with `error` (REQUIRED), `auth_req_id` (REQUIRED) and `error_description` (OPTIONAL):

| `error`              | Meaning                                                                        |
| -------------------- | ------------------------------------------------------------------------------ |
| `access_denied`      | The user denied the request.                                                   |
| `expired_token`      | The `auth_req_id` expired. OPs need not send it, but clients SHOULD accept it. |
| `transaction_failed` | Catch-all for an unexpected failure other than denial or expiry.               |
