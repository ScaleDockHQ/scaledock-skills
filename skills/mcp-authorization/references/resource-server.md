# MCP server as an OAuth 2.1 resource server

Load this for the server half: the metadata a server publishes, the challenges it sends, and how it validates tokens. Rules cite MCP pages by name and heading, and RFCs by section. The MCP revision is 2026-07-28.

## Protected Resource Metadata

An MCP server MUST implement OAuth 2.0 Protected Resource Metadata (RFC 9728), and clients MUST use it for authorization server discovery (Authorization, Overview).

The fields RFC 9728 §2 defines:

| Field                                                       | Requirement          | Notes                                                                                            |
| ----------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------ |
| `resource`                                                  | REQUIRED             | The resource identifier. For MCP, the canonical server URI.                                      |
| `authorization_servers`                                     | OPTIONAL in RFC 9728 | MCP requires at least one entry (Authorization Server Discovery, Authorization Server Location). |
| `scopes_supported`                                          | RECOMMENDED          | For MCP, the minimal scopes for basic functionality (Authorization, Scope Selection Strategy).   |
| `bearer_methods_supported`                                  | OPTIONAL             | MCP clients use the `Authorization` header only.                                                 |
| `resource_name`                                             | RECOMMENDED          | Human-readable name shown to the end user.                                                       |
| `jwks_uri`, `resource_documentation`, `resource_policy_uri` | OPTIONAL             | Informational or for signed responses.                                                           |

RFC 9728 §3.3: the `resource` value in the response MUST be identical to the resource identifier the client used to build the well-known URL. When the client found the URL in a `WWW-Authenticate` header, `resource` MUST be identical to the URL the client used to make the request that got the challenge. If it is not, the client MUST NOT use the metadata.

Example for a server at `https://mcp.example.com/mcp`:

```http
GET /.well-known/oauth-protected-resource/mcp HTTP/1.1
Host: mcp.example.com

HTTP/1.1 200 OK
Content-Type: application/json

{
  "resource": "https://mcp.example.com/mcp",
  "authorization_servers": ["https://auth.example.com"],
  "scopes_supported": ["files:read"],
  "bearer_methods_supported": ["header"]
}
```

## Where the metadata lives

The server MUST use at least one of these (Authorization Server Discovery, Protected Resource Metadata Discovery Requirements):

1. `resource_metadata` in the `WWW-Authenticate` header of a 401 response (RFC 9728 §5.1).
2. A well-known URI. For a server at `https://example.com/public/mcp` that is `https://example.com/.well-known/oauth-protected-resource/public/mcp` (path inserted after the well-known prefix, RFC 9728 §3.1), or `https://example.com/.well-known/oauth-protected-resource` at the root.

When the resource identifier has a path, RFC 9728 §3.1 requires removing any terminating slash after the host before inserting `/.well-known/oauth-protected-resource`. Serve the header form even when a well-known URI exists: clients MUST use the header when it is present.

## The 401 challenge

A request without a valid token gets 401. The server SHOULD include `scope` with the scopes required for the resource (Authorization, Scope Selection Strategy; RFC 6750 §3):

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://mcp.example.com/.well-known/oauth-protected-resource",
                         scope="files:read"
```

RFC 6750 §3 requires `WWW-Authenticate` on a response to a request without a token, and says the server SHOULD NOT include an error code when the request carried no authentication. For a token that is expired, revoked, malformed or for another audience, use `error="invalid_token"` with 401 (RFC 6750 §3.1).

Scope rules from Authorization, Scope Selection Strategy:

- The challenged scopes MAY match `scopes_supported`, be a subset or a superset, or neither. Clients MUST NOT assume a set relationship and MUST treat the challenge as authoritative for the current operation.
- Servers are not required to list every dynamically issued scope in `scopes_supported`.

## The 403 challenge for missing scopes

When a valid token lacks scope for an operation, the server SHOULD respond with 403 and a Bearer challenge with `error="insufficient_scope"`, `scope` set to the scopes needed for the operation, `resource_metadata`, and an optional `error_description` (Authorization, Runtime Insufficient Scope Errors; RFC 6750 §3.1):

```http
HTTP/1.1 403 Forbidden
WWW-Authenticate: Bearer error="insufficient_scope",
                         scope="files:write",
                         resource_metadata="https://mcp.example.com/.well-known/oauth-protected-resource",
                         error_description="File write permission required for this operation"
```

Server scope management (Authorization, Runtime Insufficient Scope Errors):

- The server is not required to include scopes the client was already granted. Accumulating scopes is the client's job.
- The server SHOULD put all scopes required for the current operation in one challenge, not one missing scope per retry.
- The server SHOULD be consistent in how it builds scope sets.
- Servers MUST account for scope hierarchies, where a broader scope implies narrower ones, when deciding whether a token is sufficient (Authorization, Step-Up Authorization Flow).

## Status codes

| Status | When (Authorization, Error Handling)                       | Bearer `error` (RFC 6750 §3.1)                         |
| ------ | ---------------------------------------------------------- | ------------------------------------------------------ |
| 401    | Authorization required, or the token is invalid or expired | none when no token was sent; `invalid_token` otherwise |
| 403    | Invalid scopes or insufficient permissions                 | `insufficient_scope`                                   |
| 400    | Malformed authorization request                            | `invalid_request`                                      |

A JSON error body can accompany the challenge; see the `problem-details` skill.

## Validating the token

On every request (Authorization, Token Handling):

1. Read the token only from `Authorization: Bearer`. Tokens MUST NOT come in the query string (Authorization, Token Requirements).
2. Validate it per OAuth 2.1 §5.2 (draft -13): signature and claims for a JWT, or the introspection response for an opaque token.
3. Validate the audience: the token MUST have been issued for this server (RFC 8707 §2). RFC 9728 §7.4 describes the same audience restriction. A token with another audience gets 401.
4. Reject expired tokens with 401.
5. Check scopes, including hierarchies, and send 403 when they are insufficient.
6. Accept only tokens valid for this server's own resources, and never accept or transit any other token.

A framework-neutral sketch:

```ts
type Verified = {
  clientId: string;
  scopes: string[];
  audience: string[];
  expiresAt: number;
};

async function authorize(
  req: Request,
  verify: (token: string) => Promise<Verified>,
  required: string[],
): Promise<Verified | Response> {
  const metadata =
    "https://mcp.example.com/.well-known/oauth-protected-resource";
  const header = req.headers.get("authorization") ?? "";
  const match = /^Bearer ([A-Za-z0-9\-._~+/]+=*)$/.exec(header);
  if (!match) {
    return new Response(null, {
      status: 401,
      headers: {
        "WWW-Authenticate": `Bearer resource_metadata="${metadata}", scope="${required.join(" ")}"`,
      },
    });
  }
  let token: Verified;
  try {
    token = await verify(match[1]);
  } catch {
    return new Response(null, {
      status: 401,
      headers: {
        "WWW-Authenticate": `Bearer error="invalid_token", resource_metadata="${metadata}"`,
      },
    });
  }
  const now = Math.floor(Date.now() / 1000);
  if (
    !token.audience.includes("https://mcp.example.com/mcp") ||
    token.expiresAt <= now
  ) {
    return new Response(null, {
      status: 401,
      headers: {
        "WWW-Authenticate": `Bearer error="invalid_token", resource_metadata="${metadata}"`,
      },
    });
  }
  const missing = required.filter((s) => !token.scopes.includes(s));
  if (missing.length > 0) {
    return new Response(null, {
      status: 403,
      headers: {
        "WWW-Authenticate": `Bearer error="insufficient_scope", scope="${required.join(" ")}", resource_metadata="${metadata}"`,
      },
    });
  }
  return token;
}
```

The `verify` function does the signature or introspection check. Replace the plain `includes` scope check with one that applies the server's scope hierarchy.

## Refresh tokens

From Authorization, Refresh Tokens: servers SHOULD NOT include `offline_access` in a `WWW-Authenticate` scope or in `scopes_supported`, because refresh tokens are not a resource requirement. Clients MUST keep refresh tokens confidential, SHOULD list `refresh_token` in their `grant_types`, MAY add `offline_access` when the authorization server lists it, and MUST NOT assume a refresh token will be issued.

## Calling upstream APIs

If the MCP server calls another API, it MUST NOT forward the token it received. It obtains a separate token for the upstream API (Authorization Security Considerations, Access Token Privilege Restriction). See `security.md` for the token passthrough risks.
