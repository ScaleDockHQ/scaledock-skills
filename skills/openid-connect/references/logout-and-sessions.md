# Logout and session management

Sources: OpenID Connect RP-Initiated Logout 1.0 (RP-Initiated Logout), OpenID Connect Session Management 1.0 (Session Management), OpenID Connect Front-Channel Logout 1.0 (Front-Channel Logout), OpenID Connect Back-Channel Logout 1.0 incorporating errata set 1 (Back-Channel Logout).

## Which mechanism

| Mechanism            | Direction                                               | Depends on browser third-party content | Notes                                                                               |
| -------------------- | ------------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------- |
| RP-Initiated Logout  | RP sends the browser to the OP                          | No                                     | The RP asks the OP to end the OP session.                                           |
| Front-Channel Logout | The OP renders RP logout URIs in iframes                | Yes                                    | Blocking third-party content can stop it from working (Front-Channel Logout § 4.1). |
| Back-Channel Logout  | The OP POSTs a signed logout token to the RP            | No                                     | Server to server. Unaffected by third-party content blocking.                       |
| Session Management   | RP and OP iframes poll session state with `postMessage` | Yes                                    | Blocking can cause the RP to loop on re-authentication (Session Management § 5.1).  |

The mechanisms combine. An RP commonly implements RP-Initiated Logout to start a logout and Back-Channel Logout to receive one.

## RP-Initiated Logout

### Request (RP-Initiated Logout § 2)

The RP redirects the browser to the OP's `end_session_endpoint`. The OP MUST support both GET and POST at it. Parameters:

- `id_token_hint`: RECOMMENDED. An ID token the OP issued to this RP.
- `logout_hint`: OPTIONAL. A hint about the End-User to log out.
- `client_id`: OPTIONAL. If both `client_id` and `id_token_hint` are present, the OP MUST verify that the `client_id` matches the one used to issue the ID token.
- `post_logout_redirect_uri`: OPTIONAL. Where to return the browser afterwards. It MUST have been registered.
- `state`: OPTIONAL. Passed back to the RP on the post-logout redirect.
- `ui_locales`: OPTIONAL.

`end_session_endpoint` is REQUIRED in discovery when the OP supports this specification, and it MUST be an `https` URL (RP-Initiated Logout § 2.1).

### Redirection after logout (RP-Initiated Logout § 3)

- Without an `id_token_hint`, the OP MUST NOT redirect after logout unless it has other means to confirm the target is legitimate.
- The OP MUST NOT redirect if `post_logout_redirect_uri` does not exactly match a registered value in `post_logout_redirect_uris` (RP-Initiated Logout § 3.1).
- The redirect happens after the OP has notified the other RPs.

### Errors (RP-Initiated Logout § 4, § 6)

- Logout requests are idempotent. A request for a user who is not logged in is not an error.
- When the OP detects an error in the request, it MUST NOT perform the post-logout redirect.
- Requests without a valid `id_token_hint` can be used for denial of service. The OP should get explicit confirmation from the End-User before acting on them (RP-Initiated Logout § 6).

## Front-Channel Logout

### RP side (Front-Channel Logout § 2)

- The RP registers `frontchannel_logout_uri`. Its domain, port and scheme MUST be the same as a registered redirect URI. It MUST be absolute and MUST NOT have a fragment.
- The OP loads the URI in an iframe. The RP then clears the session state, including cookies and HTML5 local storage. If the user is already logged out, the logout is considered successful.
- The OP MAY add `iss` and `sid` query parameters. If either is present, both MUST be. The RP MAY check them against the ID token of the current or a recent session and ignore the request if they do not match.
- With `frontchannel_logout_session_required: true`, the RP requires `iss` and `sid`.
- The RP's response SHOULD send `Cache-Control: no-store`.

### OP side (Front-Channel Logout § 3)

- The OP tracks which RPs are logged in and renders an iframe for each RP's logout URI.
- Discovery parameters: `frontchannel_logout_supported`, defaulting to false, and `frontchannel_logout_session_supported`.
- When `frontchannel_logout_session_supported` is true, the OP also includes the `sid` claim in ID tokens so the RP can match the logout request.

## Back-Channel Logout

### Metadata (Back-Channel Logout § 2.1, § 2.2)

- OP: `backchannel_logout_supported` and `backchannel_logout_session_supported`.
- RP: `backchannel_logout_uri`, which is absolute, has no fragment, and SHOULD use `https`. `backchannel_logout_session_required` says the RP needs `sid` in the logout token.
- `sid` is opaque to the RP and only needs to be unique per issuer.

### Logout token (Back-Channel Logout § 2.4)

| Claim                             | Rule                                                                                                                                                     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `iss`, `aud`, `iat`, `exp`, `jti` | REQUIRED                                                                                                                                                 |
| `sub`                             | OPTIONAL                                                                                                                                                 |
| `sid`                             | OPTIONAL. The token MUST contain `sub`, `sid`, or both. Without `sid`, all of the End-User's sessions at the RP for that `iss` and `sub` are logged out. |
| `events`                          | REQUIRED. A JSON object with the member `http://schemas.openid.net/event/backchannel-logout`, whose value MUST be a JSON object and SHOULD be `{}`.      |
| `nonce`                           | PROHIBITED. Its absence keeps a logout token from being accepted as an ID token.                                                                         |

- A logout token MUST be signed and MAY be encrypted. It uses the same keys as ID tokens.
- Explicit typing with the header `typ: logout+jwt` is RECOMMENDED (§ 2.4). Requiring it will break most existing deployments, which use untyped logout tokens, so only new deployment profiles should require it (§ 4.1).
- OPs are encouraged to use a short `exp`, preferably at most two minutes in the future, to limit replay (§ 4).

### Request (Back-Channel Logout § 2.5)

The OP sends an HTTP POST to `backchannel_logout_uri` with an `application/x-www-form-urlencoded` body containing `logout_token`. Parameters the RP does not understand MUST be ignored.

```http
POST /backchannel_logout HTTP/1.1
Host: rp.example.org
Content-Type: application/x-www-form-urlencoded

logout_token=eyJhbGci...
```

### Validation (Back-Channel Logout § 2.6)

The RP MUST validate the logout token as follows:

1. If it is encrypted, decrypt it with the ID token encryption keys. If ID token encryption was negotiated and the token is not encrypted, the RP SHOULD reject it.
2. Validate the signature as for an ID token. The algorithm follows `id_token_signed_response_alg`, or RS256 by default. `alg: none` MUST NOT be used.
3. Validate `iss`, `aud`, `iat` and `exp` as for an ID token.
4. Verify that it contains `sub`, `sid`, or both.
5. Verify that `events` contains the member `http://schemas.openid.net/event/backchannel-logout`.
6. Verify that it does not contain `nonce`.
7. Optionally check that `jti` was not recently received, and that `iss`, `sub` and `sid` match an ID token from the current or a recent session.

If any step fails, reject the token with HTTP 400.

```ts
const BACKCHANNEL_EVENT = "http://schemas.openid.net/event/backchannel-logout";

type LogoutClaims = {
  iss: string;
  aud: string | string[];
  iat: number;
  exp: number;
  jti: string;
  sub?: string;
  sid?: string;
  nonce?: unknown;
  events?: Record<string, unknown>;
};

// Call after the JWS signature has been verified with the OP's ID token keys and alg is not "none".
function checkLogoutClaims(
  c: LogoutClaims,
  issuer: string,
  clientId: string,
  now = Math.floor(Date.now() / 1000),
): void {
  if (c.iss !== issuer) throw new Error("iss mismatch");
  const aud = Array.isArray(c.aud) ? c.aud : [c.aud];
  if (!aud.includes(clientId)) throw new Error("client_id not in aud");
  if (typeof c.iat !== "number" || now >= c.exp + 60)
    throw new Error("iat or exp invalid");
  if (typeof c.jti !== "string") throw new Error("jti required");
  if (!c.sub && !c.sid) throw new Error("sub or sid required");
  const event = c.events?.[BACKCHANNEL_EVENT];
  if (typeof event !== "object" || event === null || Array.isArray(event))
    throw new Error("backchannel-logout event required");
  if ("nonce" in c) throw new Error("nonce is prohibited");
}
```

### Actions and response (Back-Channel Logout § 2.7, § 2.8)

- The RP finds the sessions identified by `iss` and `sub` and/or `sid`, and clears their state. A user who is already logged out counts as success.
- Refresh tokens issued without `offline_access` to a session being logged out SHOULD be revoked. Refresh tokens with `offline_access` normally SHOULD NOT be revoked.
- On success, the RP MUST respond with HTTP 200. OPs should also accept 204.
- On an invalid request or a failed logout, the RP MUST respond with HTTP 400. The body MAY be a JSON object with `error` and `error_description`.
- The RP's response SHOULD include `Cache-Control: no-store`.

## Session Management

- When the OP supports it, the authentication response MUST include `session_state`, and the error response SHOULD include it (Session Management § 2).
- The RP loads an RP iframe and the OP's `check_session_iframe`. The RP iframe polls the OP iframe with `postMessage`, sending `client_id + " " + session_state`, and gets back `changed`, `unchanged` or `error` (Session Management § 3, § 3.1, § 3.2).
- On `changed`, the RP MUST re-authenticate with `prompt=none` to get the current session state. On `error`, it MUST NOT do so, to avoid infinite loops (Session Management § 3.1).
- `check_session_iframe` is REQUIRED in discovery when the OP supports this specification (Session Management § 3.3).
- Both iframes MUST check the origin of every message they receive (Session Management § 6).
- When the browser blocks third-party content, the OP iframe cannot read its session cookie. The RP may then see a changed state on every check and loop through re-authentication (Session Management § 5.1). Prefer Back-Channel Logout where this matters.
