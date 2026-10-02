# Auth across surfaces

How each surface signs the user in and verifies them. Supabase Auth is the only identity provider and the OAuth 2.1 authorization server. Every surface acts as the signed-in user, so RLS and PermDock apply everywhere. Which package verifies tokens is in [`data-permissions.md`](data-permissions.md).

Applies to product repos with Database set to yes.

The `oauth`, `jwt`, `openid-connect` and `mcp-authorization` spec skills own the protocol rules behind this table. For enterprise SSO, SCIM provisioning and Shared Signals revocation, use the `scaledock-enterprise-identity` skill (see [`skills.md`](skills.md)).

| Surface        | How the user signs in                                                                                                            | What the server receives                                                               | Verified by                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| App (web)      | Email and password, Google PKCE                                                                                                  | Session cookies (`@supabase/ssr`), refreshed only in the proxy                         | `getClaims()` in guards                                                                        |
| Expo (native)  | Email and password, Google PKCE through `expo-web-browser`, Sign in with Apple on iOS                                            | Its own reads go to Supabase under RLS; commands send a bearer access token to the API | RLS, and the API as below                                                                      |
| API            | Any of the clients below                                                                                                         | `Authorization: Bearer <access token>`                                                 | `@supabase/server` `createRequestSupabaseContext(request, { auth: "user" })` over JWKS (ES256) |
| MCP            | The client discovers the authorization server and registers itself (dynamic client registration), then authorization code + PKCE | Bearer access token                                                                    | `@supabase/server` `withOAuthProtectedResource` and `withSupabase({ auth: "user" })`           |
| CLI            | Authorization code + PKCE with a loopback redirect and a pre-registered public client                                            | Bearer access token                                                                    | Through the API                                                                                |
| Scalar         | Authorization code + PKCE with a pre-registered public client                                                                    | Bearer access token                                                                    | Through the API                                                                                |
| Cron, webhooks | None                                                                                                                             | `CRON_SECRET` or a provider signature                                                  | Constant-time compare or the provider SDK                                                      |

## Rules

- **Keys.** Only `sb_publishable_` and `sb_secret_` keys. Never use `anon`, `service_role`, `JWT_SECRET`, or `getSession()` on the server.
- **System work.** Cron, webhooks and workflow steps use `sb_secret_` only through a named `createAdminContext()` in `packages/supabase/server`, and never on a request path.
- **OAuth server.** In `config.toml`, set `[auth.oauth_server] enabled = true`, `authorization_url_path = "/oauth/consent"` and `allow_dynamic_registration = true`. Recent CLI versions already write an `[auth.oauth_server]` section; edit it rather than adding a second one. Hosted projects get the same settings through `supabase config push`, and `pnpm supabase:pull` brings dashboard changes back. `site_url` is the app URL, and every Portless, preview and production callback is listed in `additional_redirect_urls`. The project signs with an asymmetric key (ES256); the OAuth server and `@supabase/server` reject legacy HS256 tokens.
- **Consent screen.** The app serves `/oauth/consent` from the Supabase Library OAuth Consent block (`npx shadcn@latest add @supabase/oauth-consent-nextjs`), adapted to the app shell, i18n and the existing Supabase clients instead of the block's own copies.
  - The proxy lets signed-out requests reach `/oauth/consent`; the page sends them to sign-in with the consent URL in `next`.
  - Every sign-in path (password and Google) returns to `next` after validating that it is a same-origin relative path.
  - The app also lists and revokes the user's granted clients.
- **Expo.** The code exchange runs only in `.native.ts` twins, after `expo-web-browser` returns the redirect; a universal app's web build never calls `exchangeCodeForSession` itself. The session is encrypted with a key kept in `expo-secure-store` and stored in `expo-sqlite/kv-store`, because a session can exceed the secure store's size limit. Each variant's scheme (`{{app}}://`, `{{app}}-dev://`) is in `additional_redirect_urls`. iOS offers Sign in with Apple whenever it offers Google, as App Store review requires.
- **Pre-registered public clients**, one per environment:
  - Scalar: `API_DOCS_OAUTH_CLIENT_ID`, redirect `https://<api>/api/docs`.
  - CLI: `{{APP}}_CLI_OAUTH_CLIENT_ID`, redirect `http://127.0.0.1:<port>/callback`.

  `pnpm env:local` registers the local clients. Client IDs are public: the CLI compiles in the production ID and accepts an env override. Never emit the OpenAPI `oauth2` scheme without its client ID.

- **Authorization** comes from the user's permissions (PermDock and RLS), not from OAuth scopes.
  - Protected Resource Metadata advertises the scopes the authorization server issues. Enforce custom scopes (`mcp:read`, `mcp:write`) only once the server can issue them.
  - Verify the signature, issuer, expiry and audience. The audience is the resource URL when the server binds tokens to resources.
- **401 and 403.** A 401 always carries `WWW-Authenticate: Bearer resource_metadata="<PRM URL>"` (`withOAuthProtectedResource` on the MCP surface). A 403 for a missing scope carries the scope challenge.
- **Errors.** `AuthError.code` maps to i18n keys. Raw auth messages never render.
