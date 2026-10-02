# MCP authorization security

Load this for a security review. It combines the normative Authorization Security Considerations page of MCP 2026-07-28 with the Security Best Practices page for the same revision. Both are cited by heading name.

## Confused deputy (MCP proxy servers)

An MCP proxy server connects MCP clients to a third-party API and acts as one OAuth client to the third-party authorization server.

The attack works when all four of these hold (Security Best Practices, Vulnerable Conditions):

1. The proxy uses one static client ID with the third-party authorization server.
2. The proxy lets MCP clients register dynamically, each with its own `client_id`.
3. The third-party authorization server sets a consent cookie after the first authorization.
4. The proxy does not ask for per-client consent before forwarding to the third party.

An attacker registers a client with a malicious `redirect_uri` and sends the user a link. The third party sees its consent cookie, skips the consent screen, and the code goes to the attacker (Security Best Practices, Attack Description).

The normative rule: MCP proxy servers using static client IDs MUST obtain user consent for each dynamically registered client before forwarding to third-party authorization servers (Authorization Security Considerations, Confused Deputy Problem). Security Best Practices, Required Protections, spells out what that means.

The proxy MUST:

- Keep a registry of approved `client_id` values per user, check it before starting the third-party flow, and store consent securely.
- Show a consent page that names the MCP client, lists the third-party scopes, shows the registered `redirect_uri`, has CSRF protection, and blocks framing with `frame-ancestors` or `X-Frame-Options: DENY`.
- If consent is tracked in cookies: use the `__Host-` prefix, set `Secure`, `HttpOnly` and `SameSite=Lax`, sign the cookie or use server-side sessions, and bind it to the `client_id`.
- Match `redirect_uri` exactly against the registered value, with no patterns or wildcards, and reject a changed `redirect_uri` without re-registration.
- Generate a cryptographically random `state` per request.
- Store `state` server-side only after consent is approved, and set the state cookie or session immediately before redirecting to the third party.
- At the callback, require an exact `state` match, reject a missing or wrong value, delete it after use, and expire it quickly (the page gives 10 minutes as an example).

## Token passthrough

Token passthrough means accepting a token that was not issued to the MCP server and forwarding it downstream. It is forbidden (Authorization, Token Handling). The Security Best Practices page, Token Passthrough, lists the risks:

- Security controls that depend on the token audience, such as rate limits and request validation, are bypassed.
- The server cannot tell clients apart, and downstream logs show the wrong caller.
- Trust boundaries break, and one compromised service can use the token at others.
- Adding security controls later becomes harder.

Mitigation: MCP servers MUST NOT accept any token that was not explicitly issued for them. For upstream calls, the server is an OAuth client and gets its own token (Authorization Security Considerations, Access Token Privilege Restriction).

## SSRF

A malicious MCP server controls URLs the client fetches: `resource_metadata`, `authorization_servers`, and the endpoints in authorization server metadata. It can point them at internal IPs, cloud metadata (`169.254.169.254`), localhost services, rebinding DNS names, or redirect chains (Security Best Practices, Server-Side Request Forgery).

MCP clients deployed to a server MUST consider SSRF and mitigate it. The page recommends:

- **HTTPS**: clients SHOULD require HTTPS for OAuth URLs in production and reject `http://` except for loopback during development.
- **Private ranges**: clients SHOULD block `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.0/8`, `::1`, `169.254.0.0/16`, `fc00::/7` and `fe80::/10` (RFC 9728 §7.7). Use a vetted library, not hand-written IP parsing.
- **Redirects**: clients SHOULD apply the same checks to every redirect hop.
- **Egress proxy**: server-side deployments SHOULD consider an egress proxy that blocks internal destinations.
- **DNS**: consider pinning the resolved address between check and use.

The same applies to authorization servers that fetch Client ID Metadata Documents, because the `client_id` URL comes from an unknown client (Security Best Practices, SSRF Against Authorization Servers; Authorization Security Considerations, Authorization Server Abuse Protection). CIMD -00 §6.6 recommends a 5 kilobyte maximum document size.

## State handles

MCP 2026-07-28 is stateless and has no protocol-level sessions. Servers that need cross-request state mint a handle and get it back as a tool argument (Security Best Practices, State Handle Hijacking).

- Servers that implement authorization MUST verify every inbound request and MUST NOT treat possession of a handle as authentication.
- Handles SHOULD be random and unguessable, and can expire.
- Handles SHOULD be bound server-side to the user from the verified token, for example by keying state as `<user_id>:<handle>`.

## Local MCP servers

If a client supports one-click local server configuration, it MUST get consent before running the command. The dialog MUST show the full command with arguments, mark it as code execution, require explicit approval and allow cancel (Security Best Practices, Local MCP Server Compromise). Clients SHOULD highlight dangerous patterns and run servers sandboxed. Local servers SHOULD prefer `stdio`, or restrict HTTP access with an authorization token or an IPC mechanism.

## Authorization URL validation

A malicious server can hand the client a `javascript:` URL or a shell-injection payload as the authorization endpoint (Security Best Practices, OAuth Authorization URL Validation). Clients:

- MUST allow only `https://`, plus `http://` for loopback during local development.
- MUST reject `javascript:`, `data:`, `file:`, `vbscript:` and other dangerous schemes, and SHOULD use an allowlist.
- MUST NOT open URLs through a shell (`cmd.exe`, `sh`, PowerShell), and SHOULD use a non-shell platform API.
- MUST sanitize and validate URLs from MCP servers. Web clients SHOULD set a Content Security Policy.

```ts
function safeAuthorizationUrl(raw: string): URL {
  const url = new URL(raw);
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (url.protocol === "https:") return url;
  if (url.protocol === "http:" && loopback) return url;
  throw new Error(`refusing authorization URL with scheme ${url.protocol}`);
}
```

Proxy services that spawn `stdio` servers SHOULD sandbox them, restrict file system access and log their use, because XSS in the client can otherwise escalate to code execution (Security Best Practices, stdio Transport Security in Proxy Scenarios).

## Mix-up attacks

A malicious authorization server tries to get the client to send it a code issued by an honest one (RFC 9207 §1). The mitigation is the `iss` check in `client-flow.md` (Authorization Security Considerations, Mix-Up Attacks). PKCE alone does not stop it, because the client sends the `code_verifier` to the attacker's token endpoint, and the check only helps when the honest server emits `iss` (Security Best Practices, Mix-Up Attacks).

## Localhost redirect impersonation

A CIMD proves control of a domain, not of the process listening on a `localhost` redirect URI. An attacker can present a real client's metadata URL as `client_id` with their own localhost port (Security Best Practices, Localhost Redirect URI Impersonation). Authorization servers SHOULD warn about localhost-only redirect URIs, MAY require attestation, and MUST clearly display the redirect URI hostname (Authorization Security Considerations, Localhost Redirect URI Risks).

## CIMD trust policies

Authorization servers MAY apply domain trust policies to URL-based client IDs: allowlists, accepting any HTTPS `client_id` on open servers, reputation checks, domain age or certificate checks, and showing the client hostnames prominently (Authorization Security Considerations, Trust Policies; Security Best Practices, CIMD Trust Policies; CIMD -00 §6.4 and §6.8).

## Token storage and lifetime

Clients and servers MUST store tokens securely per OAuth 2.1 §7.1. Authorization servers SHOULD issue short-lived access tokens and MUST rotate refresh tokens for public clients (Authorization Security Considerations, Token Theft).

## Scope minimization

From Security Best Practices, Scope Minimization:

- Start with a minimal scope set for low-risk operations, and elevate with targeted `scope` challenges when a privileged operation is first attempted.
- Servers should accept reduced-scope tokens; authorization servers MAY issue a subset.
- Servers choose how much to put in a challenge: the minimum for the operation, the recommended set of related scopes, or an extended set.
- Clients SHOULD compute the union of previously requested and newly challenged scopes, and cache recent failures to avoid elevation loops.

Common mistakes listed on the page: publishing every scope in `scopes_supported`, wildcard or omnibus scopes (`*`, `all`, `full-access`), bundling unrelated privileges, returning the whole catalog in every challenge, changing scope meaning without versioning, and treating the scopes in a token as enough without server-side authorization logic.
