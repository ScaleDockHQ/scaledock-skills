# Auth across surfaces

How each surface signs the user in and verifies them. Supabase Auth is the only identity provider and the OAuth 2.1 authorization server. Every surface acts as the signed-in user, so RLS and PermDock apply everywhere.

| Surface        | How the user signs in                                                                                                            | What the server receives                                       | Verified by                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| App (web)      | Email and password, Google PKCE                                                                                                  | Session cookies (`@supabase/ssr`), refreshed only in the proxy | `getClaims()` in guards                                                                        |
| API            | Any of the clients below                                                                                                         | `Authorization: Bearer <access token>`                         | `@supabase/server` `createRequestSupabaseContext(request, { auth: "user" })` over JWKS (ES256) |
| MCP            | The client discovers the authorization server and registers itself (dynamic client registration), then authorization code + PKCE | Bearer access token                                            | `@supabase/server` plus Protected Resource Metadata                                            |
| CLI            | Authorization code + PKCE with a loopback redirect and a pre-registered public client                                            | Bearer access token                                            | Through the API                                                                                |
| Scalar         | Authorization code + PKCE with a pre-registered public client                                                                    | Bearer access token                                            | Through the API                                                                                |
| Cron, webhooks | None                                                                                                                             | `CRON_SECRET` or a provider signature                          | Constant-time compare or the provider SDK                                                      |

## Rules

- **Keys.** Only `sb_publishable_` and `sb_secret_` keys. Never use `anon`, `service_role`, `JWT_SECRET`, or `getSession()` on the server.
- **System work.** Cron, webhooks and workflow steps use `sb_secret_` only through a named `createAdminContext()` in `packages/supabase/server`, and never on a request path.
- **OAuth server.** In `config.toml`, set `[auth.oauth_server] enabled = true`, `authorization_url_path = "/oauth/consent"` and `allow_dynamic_registration = true`. Hosted projects mirror these settings. `site_url` is the app URL, and every Portless, preview and production callback is listed in `additional_redirect_urls`.
- **Pre-registered public clients**, one per environment:
  - Scalar: `API_DOCS_OAUTH_CLIENT_ID`, redirect `https://<api>/api/docs`.
  - CLI: `{{APP}}_CLI_OAUTH_CLIENT_ID`, redirect `http://127.0.0.1:<port>/callback`.

  `pnpm env:local` registers the local clients. Client IDs are public: the CLI compiles in the production ID and accepts an env override. Never emit the OpenAPI `oauth2` scheme without its client ID.

- **Authorization** comes from the user's permissions (PermDock and RLS), not from OAuth scopes.
  - Protected Resource Metadata advertises the scopes the authorization server issues. Enforce custom scopes (`mcp:read`, `mcp:write`) only once the server can issue them.
  - Verify the signature, issuer, expiry and audience. The audience is the resource URL when the server binds tokens to resources.
- **401 and 403.** A 401 always carries `WWW-Authenticate: Bearer resource_metadata="<PRM URL>"` (`unauthorizedResponse`). A 403 for a missing scope carries the scope challenge.
- **Errors.** `AuthError.code` maps to i18n keys. Raw auth messages never render.
