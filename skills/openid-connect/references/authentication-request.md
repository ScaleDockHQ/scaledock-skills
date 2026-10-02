# Authentication request, response types and error handling

Sources: OpenID Connect Core 1.0 incorporating errata set 2 (Core), OAuth 2.0 Multiple Response Type Encoding Practices (Multiple Response Types), OAuth 2.0 Form Post Response Mode (Form Post), Initiating User Registration via OpenID Connect 1.0 (prompt=create), OpenID Connect Core Error Code unmet_authentication_requirements (unmet_authentication_requirements).

## Choosing the flow

Core defines three flows (Core § 3). Core leaves the choice to the RP and ties it to the client type: the code flow suits confidential clients (Core § 15.4). With the code flow, the token endpoint returns the ID token and the access token in an `application/json` response (Core § 3.1.3.3). The authorization endpoint returns only the code.

## Request parameters (Core § 3.1.2.1)

| Parameter               | Rule                                                                                                              |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `scope`                 | REQUIRED. MUST contain `openid`.                                                                                  |
| `response_type`         | REQUIRED. For example `code`.                                                                                     |
| `client_id`             | REQUIRED.                                                                                                         |
| `redirect_uri`          | REQUIRED. MUST exactly match a pre-registered value, using simple string comparison (RFC 3986 § 6.2.1).           |
| `state`                 | RECOMMENDED. Binds the response to the browser session.                                                           |
| `nonce`                 | OPTIONAL for the code flow, REQUIRED for implicit (Core § 3.2.2.1). It MUST have enough entropy to stop guessing. |
| `response_mode`         | OPTIONAL. Overrides the default mode for the response type.                                                       |
| `prompt`                | OPTIONAL. Space-delimited `none`, `login`, `consent`, `select_account`, and `create` from prompt=create.          |
| `max_age`               | OPTIONAL. Maximum seconds since the End-User last actively authenticated.                                         |
| `ui_locales`, `display` | OPTIONAL. Presentation hints.                                                                                     |
| `id_token_hint`         | OPTIONAL. An ID token previously issued by this OP. It SHOULD be present with `prompt=none`.                      |
| `login_hint`            | OPTIONAL. A hint about the login identifier.                                                                      |
| `acr_values`            | OPTIONAL. Requested `acr` values in order of preference, requested as a voluntary claim.                          |
| `claims`                | OPTIONAL. Requests individual claims (Core § 5.5).                                                                |

### prompt (Core § 3.1.2.1)

- `none`: the OP MUST NOT display any authentication or consent UI. If the End-User is not already authenticated or consent is missing, it returns an error, typically `login_required` or `interaction_required`.
- `login`: the OP SHOULD reauthenticate. If it cannot, it MUST return an error, typically `login_required`.
- `consent`: the OP SHOULD ask for consent. If it cannot obtain it, it MUST return an error, typically `consent_required`.
- `select_account`: the OP SHOULD let the End-User pick an account. If it cannot, it MUST return an error, typically `account_selection_required`.
- `none` combined with any other value is an error.
- For an unknown value, the OP MAY return an error or MAY ignore it.

### max_age (Core § 3.1.2.1)

If more time than `max_age` has passed since the last active authentication, the OP MUST try to actively re-authenticate the End-User. With `max_age`, the ID token MUST include `auth_time`. `max_age=0` is equivalent to `prompt=login`.

### acr (Core § 5.5.1.1)

- `acr_values` asks for `acr` as a voluntary claim, so the OP can return a different value. The RP checks it (Core § 3.1.3.7, step 10).
- To make it binding, request `acr` as an essential claim with `values` in the `claims` parameter. The OP MUST then return one of those values or treat the authentication as failed.
- When the OP cannot meet an essential `acr`, it SHALL return the error `unmet_authentication_requirements`. It MAY also use that error in other cases where it cannot meet the RP's authentication requirements (unmet_authentication_requirements § 1).

```json
{
  "id_token": {
    "acr": { "essential": true, "values": ["urn:example:loa:high"] },
    "auth_time": { "essential": true }
  }
}
```

## OP-side request validation (Core § 3.1.2.2, § 3.1.2.3)

- If a specific `sub` is requested and the active End-User is a different one, the OP MUST NOT return an ID token or access token for a different user.
- The OP MUST validate that it issued the `id_token_hint`. It SHOULD accept the hint after `exp` when the RP has a current or recent session at the OP.
- The OP SHOULD ignore unrecognized request parameters.
- The OP MUST authenticate the End-User when they are not authenticated or when the request has `prompt=login`. It MUST NOT interact with the End-User when the request has `prompt=none` (Core § 3.1.2.3).

## Error responses (Core § 3.1.2.6)

In addition to the OAuth 2.0 codes, Core defines `interaction_required`, `login_required`, `account_selection_required`, `consent_required`, `invalid_request_uri`, `invalid_request_object`, `request_not_supported`, `request_uri_not_supported` and `registration_not_supported`.

- Unless the redirect URI is invalid, the OP returns the error to the redirect URI with `error` and `state`. Other parameters SHOULD NOT be returned.
- If the redirect URI is invalid, the OP MUST NOT redirect to it.
- If the requested response mode is not supported, the OP returns HTTP 400 without error parameters.

The RP handles at least `login_required`, `interaction_required` and `consent_required` after `prompt=none`, plus `unmet_authentication_requirements` when it requests an essential `acr`.

## prompt=create (prompt=create § 4)

- `create` asks the OP to show account creation instead of login. It is RECOMMENDED not to combine `create` with other prompt values (§ 4).
- The flow MUST NOT be considered successful without a valid ID token, and the client MUST NOT assume a new identity was created without a successful response (§ 4.1).
- In a request sent as a JWT, `prompt` is a space-delimited string (§ 4.1).
- An OP that receives a prompt value it does not declare in `prompt_values_supported` SHOULD return HTTP 400 with `invalid_request` (§ 4.1).
- `prompt_values_supported` is a discovery parameter. If it is absent, the RP should assume prompt=create is not supported. An OP that supports `create` lists it there (§ 4.2).

## Response types and modes

### Response modes (Multiple Response Types § 2.1)

- `query` puts parameters in the redirect URI query string. `fragment` puts them in the fragment.
- The default for `code` is `query` and the default for `token` is `fragment`.
- All parameters from the authorization endpoint SHOULD use one response mode, for success and error alike (Multiple Response Types § 2.2).

### Multiple-valued response types (Multiple Response Types § 5)

`code token`, `code id_token`, `id_token token` and `code id_token token` default to `fragment`, and the query encoding MUST NOT be used for them. The `none` response type returns no access credentials (Multiple Response Types § 4).

Access tokens and ID tokens MUST NOT be encoded in the query string. A response whose default mode is `fragment` is never sent with the query encoding (Multiple Response Types § 7). Query parameters leak through the HTTP `Referer` header.

### form_post (Form Post § 2, § 4)

- The OP returns an HTML form that auto-submits to the redirect URI. The form `action` MUST be the client's redirect URI and the `method` MUST be POST. The body is `application/x-www-form-urlencoded`.
- The OP MUST instruct the user agent and intermediaries not to store or reuse the response.
- The client MUST process the message however the form submission was triggered.
- `form_post` is safe for parameters whose default mode is query or fragment.

```http
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Cache-Control: no-cache, no-store

<html><body onload="document.forms[0].submit()">
<form method="post" action="https://rp.example.com/cb">
<input type="hidden" name="code" value="SplxlOBeZQQYbYS6WxSbIA"/>
<input type="hidden" name="state" value="af0ifjsldkj"/>
</form></body></html>
```

## Login initiated by a third party (Core § 4)

A third party, such as the OP, can send the browser to the RP's login initiation endpoint, registered as `initiate_login_uri`, with:

- `iss`: REQUIRED. The Issuer Identifier of the OP to use, as an `https` URL.
- `login_hint`: OPTIONAL.
- `target_link_uri`: OPTIONAL. Where the RP should send the End-User after login. The RP MUST verify this value to prevent an open redirector.

The RP then starts a normal authentication request to that issuer. Parameters the RP does not understand MUST be ignored.
