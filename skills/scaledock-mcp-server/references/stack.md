# Spec requirements on the ScaleDock stack

Each row names the spec skill that defines the requirement, and where it lives in a ScaleDock repo. Check option names against the installed packages before you use them.

| Requirement                                             | Spec skill                   | ScaleDock implementation                                                                                              |
| ------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Protected Resource Metadata                             | `mcp-authorization`          | `resourceMetadataResponse` at `/.well-known/oauth-protected-resource` and `/.well-known/oauth-protected-resource/mcp` |
| 401 with `WWW-Authenticate: Bearer resource_metadata=…` | `mcp-authorization`, `oauth` | `unauthorizedResponse(request, { resourceMetadataUrl })`                                                              |
| Authorization server discovery                          | `oauth`                      | Supabase Auth OAuth 2.1 server with dynamic registration enabled (`scaledock-repo-standard` `auth.md`)                |
| Token verification                                      | `jwt`                        | `@supabase/server` over JWKS; PermDock `subjectFromJwt` when the issuer is not Supabase                               |
| Audience bound to the MCP resource                      | `mcp-authorization`, `oauth` | The verifier checks `aud` against the resource URL from `resource-origin.ts`                                          |
| Scope challenge and step-up                             | `mcp-authorization`          | 403 with the scope challenge; PermDock's scope derivation only when the server can issue those scopes                 |
| Tool authorization                                      | none (PermDock)              | `createPermDock(policy, { subject, resource, requireAuthInfo: true }).protectServer(server)` from `permdock/mcp`      |
| Human approval                                          | `owasp-agentic`              | `approval` on the grant; the adapter turns `approval-required` into an elicitation                                    |
| Errors                                                  | `problem-details`            | One `problemResult()` helper; tool results carry `isError: true`                                                      |
| No token passthrough                                    | `mcp-authorization`          | Handlers call `services` with the request context, never `fetch` with the caller's token                              |

## When the issuer is not Supabase

Resolve the subject with `subjectFromJwt` from `permdock/jwt`: `discovery` set to the issuer, `audience` set to the MCP resource identifier, and algorithms from the `jwt` skill's allow-list. For RFC 7662 introspection, pass the response to `subjectFromIntrospection`; anything other than `active: true` is the anonymous subject.

## Agents behind the server

When the MCP client is an agent acting for a user, the agent is the `actor` and the user is the `principal`. PermDock's approval rules refuse the requester as approver by default; keep that default for anything that moves money, deletes data or changes access. Install `scaledock-agent-permissions` for the agent-side protocols.
