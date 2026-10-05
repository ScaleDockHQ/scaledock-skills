# Security

Read this when reviewing an MCP server, client, proxy or host for security. Sources: the 2026-07-28 Security Best Practices page (cited by heading) and the security sections of the specification pages. OAuth-specific attacks (mix-up, localhost redirect impersonation, CIMD trust, scope minimization) are summarized only; use the `mcp-authorization` skill for them.

## Transport and connection

- Streamable HTTP servers MUST validate `Origin` (403 if invalid), SHOULD bind locally to `127.0.0.1`, and SHOULD authenticate every connection (Streamable HTTP, Security & Endpoint).
- HTTP servers SHOULD follow MCP Authorization; stdio servers SHOULD NOT, and take credentials from the environment instead (Base Protocol, Auth).
- Servers that read the body MUST check that mirrored headers match it, so gateways cannot be steered by forged headers. Do not mark secrets for header mirroring (Streamable HTTP, Server Validation; Tools, x-mcp-header).
- Servers MUST verify every inbound request and MUST NOT treat a state handle as authentication. Handles SHOULD be secure random values, SHOULD expire, and SHOULD be bound server-side to the authenticated user, for example `<user_id>:<handle>` with the user ID from the verified token (Security Best Practices, State Handle Hijacking).
- Never let `clientInfo`, `serverInfo` or tool annotations drive a security decision (Base Protocol, General fields; Tools, Data Types).

## Tokens and proxies

- MCP servers MUST NOT accept tokens that were not explicitly issued for them, and must not pass client tokens through to downstream APIs (Security Best Practices, Token Passthrough).
- MCP proxy servers that use a static client ID with a third-party authorization server MUST implement per-client consent before the third-party flow: keep a per-user registry of approved `client_id` values, and show a consent page that names the client, lists the scopes and the `redirect_uri`, has CSRF protection, and cannot be framed (Security Best Practices, Confused Deputy Problem).
- URL-mode elicitation for third-party credentials: credentials MUST NOT transit the client, and the server MUST bind the flow to the user who started it (Elicitation, Security Considerations).

## Server-side request forgery and URLs

- Clients deployed on servers MUST consider SSRF. Clients SHOULD require HTTPS for OAuth-related URLs, SHOULD block private and reserved IP ranges, and SHOULD validate redirect targets the same way (Security Best Practices, Server-Side Request Forgery (SSRF)).
- Clients MUST allow only `http://` and `https://` authorization URLs (`https://` in production), MUST reject `javascript:`, `data:`, `file:`, `vbscript:` and other dangerous schemes, MUST NOT open URLs through a shell, and MUST sanitize all URLs from servers. Web clients SHOULD use a Content Security Policy (Security Best Practices, OAuth Authorization URL Validation).
- Schemas: never auto-dereference a network `$ref`, and bound the cost of composition keywords (Base Protocol, `$ref` Resolution and Composition-Keyword Resource Use).
- Icons: reject unsafe schemes, fetch without credentials, check content by magic bytes (Base Protocol, `icons`).

## Local servers and stdio

- Clients with one-click local server configuration MUST show the exact, untruncated command, mark it as dangerous, require explicit approval and allow cancelling. They SHOULD highlight dangerous patterns, warn about sensitive paths and same-privilege execution, and run servers sandboxed with minimal privileges (Security Best Practices, Local MCP Server Compromise).
- Servers meant to run locally SHOULD use stdio, or restrict HTTP with an authorization token or a restricted IPC channel such as Unix domain sockets (same section).
- Proxy services that spawn stdio servers SHOULD sandbox them, restrict filesystem access, log all stdio usage and require extra authorization for dangerous commands (Security Best Practices, stdio Transport Security in Proxy Scenarios).
- stdio servers MUST NOT write non-MCP output to `stdout`; log to `stderr` (stdio, Sending Messages).

## Features

| Feature     | Rule                                                                                                                                | Source                                    |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Tools       | Servers MUST validate inputs, control access, rate limit and sanitize outputs. Keep a human able to deny invocations.               | Tools, Security Considerations            |
| Resources   | Servers MUST validate URIs and sanitize `file://` paths against traversal.                                                          | Resources, Security Considerations        |
| Prompts     | Validate inputs and outputs against injection and unauthorized access (MUST).                                                       | Prompts, Security                         |
| Completion  | Validate inputs, rate limit, control access to sensitive suggestions (MUST).                                                        | Completion, Security                      |
| Logging     | Log messages MUST NOT contain credentials, personal data or attack-relevant internals.                                              | Logging, Security                         |
| MRTR        | Treat `requestState` as attacker-controlled; integrity-protect it when it affects authorization or business logic.                  | Multi Round-Trip Requests, Security       |
| Elicitation | No secrets in form mode; URL mode consent, full URL display, no pre-fetch, user binding.                                            | Elicitation, Security Considerations      |
| Sampling    | Human in the loop; respect `maxTokens`; cap tool loops; do not retain messages.                                                     | Sampling, Security Considerations         |
| Roots       | Expose only permitted roots; roots are not access control.                                                                          | Roots, Security Considerations            |
| Caching     | `"private"` results MUST NOT cross authorization contexts; servers MUST NOT rely on `cacheScope` for access control.                | Caching, Security Considerations          |
| Tasks       | Unguessable task IDs; authorize every task request against the task.                                                                | Tasks extension, Security Considerations  |
| Skills      | Served skills are untrusted, origin-tagged, never silently shadow local skills, never execute host code without per-skill approval. | Skills extension, Security Considerations |
| server.json | Verify `fileSha256` for MCPB; avoid shell execution of argument values.                                                             | server.json reference                     |

## Review questions

1. Does every HTTP request get `Origin` validation and authentication, and does the server reject a token issued for another audience?
2. Can a mirrored header disagree with the body without being rejected?
3. Is any cross-request state reachable by an unauthenticated handle or a forgeable `requestState`?
4. Can a server-supplied URL, schema `$ref` or icon make the client fetch an internal address or open a dangerous scheme?
5. Can untrusted tool annotations, skill content or `serverInfo` change what the host allows?
