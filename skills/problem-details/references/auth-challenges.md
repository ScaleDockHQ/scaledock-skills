# 401, 403 and WWW-Authenticate next to a problem body

RFC 9457 defines the body. The status code and the `WWW-Authenticate` header come from RFC 9110 and, for OAuth bearer tokens, RFC 6750 and RFC 9470. A response carries both: the header for HTTP and OAuth software, the problem document for everything else.

## The HTTP rules (RFC 9110)

- **401 Unauthorized** means the request lacks valid authentication credentials for the target resource. The server MUST send `WWW-Authenticate` with at least one challenge applicable to the resource (§ 15.5.2, § 11.6.1).
- When a request omits credentials, or sends invalid or partial ones, the origin server SHOULD answer 401 with a (possibly new) challenge (§ 11.4).
- **403 Forbidden** means the server understood the request and refuses it. A server that wants to say why can do so in the content (§ 15.5.4). This is where a problem document goes.
- A server that receives valid credentials that are not adequate ought to answer 403 (§ 11.4).
- After a 403, the client SHOULD NOT automatically repeat the request with the same credentials; it MAY retry with different ones (§ 15.5.4).
- A server that wants to hide that a forbidden resource exists MAY answer 404 instead (§ 15.5.4).
- A server MAY send `WWW-Authenticate` on responses other than 401 to say that different credentials might change the response (§ 11.6.1).
- If a 401 repeats the previous challenge and the user agent already tried to authenticate, the user agent SHOULD show the enclosed representation to the user, because it usually holds diagnostic information (§ 15.5.2). That representation can be the problem document.
- Proxies MUST NOT modify `WWW-Authenticate` (§ 11.6.1). Several challenges on one field line may not be interoperable (§ 11.6.1).

## Bearer tokens (RFC 6750)

- When a request has no credentials, or no access token that enables access, the resource server MUST include `WWW-Authenticate` (§ 3). That covers the 403 `insufficient_scope` case too.
- The scheme is `Bearer`, followed by one or more auth-params (§ 3). `realm` MAY be included (§ 3), and is the usual parameter when there is no error to report.
- If the request carried a token and failed, the server SHOULD include `error`, MAY include `error_description` (for developers, not end users) and MAY include `error_uri` (§ 3). Each appears at most once.
- If the request carried no authentication information at all, the server SHOULD NOT include an error code or other error information (§ 3.1).
- `error` and `error_description` values are limited to the characters `%x20-21 / %x23-5B / %x5D-7E`; `scope` values to `%x21 / %x23-5B / %x5D-7E` with `%x20` as separator (§ 3).

Error codes (§ 3.1):

| `error`              | Meaning                                                                                               | Status        |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ------------- |
| `invalid_request`    | Missing or repeated parameter, unsupported value, more than one token method, or otherwise malformed. | SHOULD be 400 |
| `invalid_token`      | Token expired, revoked, malformed or otherwise invalid. The client MAY get a new token and retry.     | SHOULD be 401 |
| `insufficient_scope` | The request needs more privileges than the token grants. MAY include `scope` with the scope needed.   | SHOULD be 403 |

## Step-up authentication (RFC 9470)

RFC 9470 § 3 adds the error code `insufficient_user_authentication` for the Bearer scheme and other OAuth schemes that use the same `error` parameter. It means the authentication event behind the token does not meet the resource's requirements. Two auth-params carry the requirement:

- `acr_values`: space-separated authentication context class references, in order of preference;
- `max_age`: allowed seconds since the last active authentication; a non-negative integer.

Both MAY appear in one challenge. The examples in RFC 9470 § 3 use status 401.

## Choosing status, header and body

| Situation                                            | Status | `WWW-Authenticate`                                                                                | Problem body                                                          |
| ---------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| No credentials sent                                  | 401    | `Bearer realm="example"`, no `error` (RFC 6750 § 3.1)                                             | Generic; consistent with the header, which gives no error information |
| Token expired, revoked or malformed                  | 401    | `Bearer realm="example", error="invalid_token"` (RFC 6750 § 3.1)                                  | Says the token is not valid; no token contents                        |
| Token valid, scope too small                         | 403    | `Bearer error="insufficient_scope", scope="..."` (RFC 6750 § 3, § 3.1)                            | Names the missing permission in an extension member                   |
| Token valid, authentication too weak or too old      | 401    | `Bearer error="insufficient_user_authentication", acr_values="...", max_age="..."` (RFC 9470 § 3) | Carries the same requirement in extension members                     |
| Credentials valid, access refused for another reason | 403    | Optional (RFC 9110 § 11.6.1)                                                                      | The reason, written to help the client (RFC 9457 § 3.1.4)             |
| Resource must not be disclosed                       | 404    | None                                                                                              | The same body a missing resource gets (RFC 9110 § 15.5.4)             |
| Malformed authentication request                     | 400    | `Bearer error="invalid_request"` (RFC 6750 § 3.1)                                                 | Says what is malformed                                                |

Keep the two in step: derive the header and the body from the same internal reason, so the `error` code, the status and the problem `type` never disagree. RFC 9457 § 3.1.2 requires `status` to equal the response code.

## Example

```http
HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
WWW-Authenticate: Bearer error="insufficient_scope", scope="invoices:write"

{
  "type": "https://api.example.com/problems/insufficient-scope",
  "title": "Insufficient scope",
  "status": 403,
  "detail": "Creating an invoice needs the invoices:write scope.",
  "instance": "/invoices",
  "required_scope": "invoices:write"
}
```

The type URI and extension member are illustrative. The extension name follows the RFC 9457 § 4 naming rule; the header follows RFC 6750 § 3.1.
