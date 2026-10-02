# MCP (`apps/mcp`)

The MCP SDK, transport, auth, tools from the contract, PermDock, resources, errors, the registry manifest, the docs MCP, and tests.

Applies to repos with the `mcp` surface, and the docs MCP to every repo with a docs site.

The `scaledock-mcp-server` skill builds on this reference, and the `mcp-authorization`, `oauth`, `jwt` and `problem-details` spec skills own the protocol rules (see [`skills.md`](skills.md)). When this page and a spec skill disagree on a protocol detail, the spec skill wins.

- **Packages.** `@modelcontextprotocol/server` and `@modelcontextprotocol/client`, latest major. Never the legacy `@modelcontextprotocol/sdk` package, `mcp-handler`, `orpc-mcp`, or a hand-written JSON-RPC switch. A library whose bundle budget rules out the SDK records an ADR.
- **Transport.**
  - `createMcpHandler(factory)` is mounted in the Hono shell: `app.all("/mcp", (c) => handler.fetch(c.req.raw, { authInfo }))`.
  - It serves the latest MCP spec revision, whose core is stateless: there is no initialize handshake, and every request carries its own envelope. Keep `legacy: "stateless"` so clients on the 2025 revisions still connect; check the installed SDK docs for which revisions it supports. No session store.
  - Handlers read the caller and protocol details from `ctx.mcpReq.envelope`, never from module state.
  - Never offer the HTTP+SSE transport; it is deprecated.
  - The MCP app's tsconfig lists `types: ["node"]`, which the server package needs.
  - DNS-rebinding protection uses `allowedHosts` for the production, preview and Portless hosts. `resource-origin.ts` resolves the public origin from `x-forwarded-proto` and the host.
- **Auth.** `@supabase/server` owns the resource server, so there is no hand-written verifier or metadata route.
  - Wrap the MCP handler as `withOAuthProtectedResource({ resourceServer, authorizationServer }, withSupabase({ auth: "user" }, handleMcp))`. Use this nested form; the `pipeline` form from `@supabase/middleware` is alpha. Check the installed `@supabase/server` docs for option names and the paths it serves.
  - `withOAuthProtectedResource` serves the Protected Resource Metadata and adds the `WWW-Authenticate: Bearer resource_metadata=…` challenge to every 401. `resourceServer` is the public MCP URL from `resource-origin.ts`. Make sure `/.well-known/oauth-protected-resource` and `/.well-known/oauth-protected-resource/mcp` resolve to that metadata, and that it lists `scopes_supported` and `resource_documentation` pointing at the docs MCP page.
  - `withSupabase({ auth: "user" })` verifies the access token over JWKS and hands the handler the claims and an RLS-scoped client. It accepts product session tokens and OAuth access tokens; only OAuth tokens carry `client_id`. Map them into `authInfo`, and tools read it from `ctx.http.authInfo`.
  - The consent screen and the OAuth server settings are in [`auth.md`](auth.md).
- **Server factory per request.** `new McpServer({ name, version })`, with `version` from `package.json`. `instructions` is one paragraph: what the tools cover, how tenancy works, and how to pick an organization.
- **Tools come from the contract.**
  - `packages/contract/src/mcp.ts` lists the curated subset. Each tool has a `snake_case` name, a title, a description, Valibot input and output, and annotations (`readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`).
  - `inputSchema` and `outputSchema` are the Valibot schemas wrapped with `toStandardJsonSchema`.
  - Handlers call `services` (never `fetch` the API) and return `structuredContent` plus a short text summary.
  - Read tools cover workspace reads. Write tools are opt-in per procedure. Destructive tools go through PermDock `approval-required` with a durable approval store.
- **Permissions.**
  - Register tools through `createPermDock(policy, { subject, resource, requireAuthInfo: true }).protectServer(server)`, with one `permission` per tool.
  - PermDock filters `tools/list`, fills in annotations, validates arguments and audits calls.
  - Check the installed `permdock/mcp` docs for the scope-derivation option, and turn it on only when the authorization server can issue the derived scopes.
- **Resources** use templates such as `{{app}}://<entity>/{id}`, and only for records a model reads by ID.
- **Errors** are Problem Details built by one `problemResult()` helper. Never leak stack traces.
- **Registry.** `server.json` at the root lists the remote `streamable-http` endpoints (product MCP and docs MCP), with the same version as the product.
- **Docs MCP** (`apps/docs/app/mcp/route.ts`), public and read-only:

  ```ts
  const handler = createMcpHandler(() => {
    const mcp = new McpServer(
      { name: "{{app}}-docs", version },
      { instructions: "..." },
    );
    registerSourceTools(mcp, source, docsLlms); // fumadocs-core/mcp
    registerSearchTool(mcp, docsSearch);
    return mcp;
  });
  export const GET = (request: Request) => handler.fetch(request); // and POST, DELETE
  ```

- **Tests.** Run `app.fetch` in-process with `@modelcontextprotocol/client` and cover:
  - `tools/list` for each role
  - a 401 with the Protected Resource Metadata header, and the metadata document itself
  - a scope or permission denial
  - structured output
  - the approval path
- **Connect docs.** The docs MCP page has install links for Cursor, Claude and VS Code, plus the `.mcp.json` snippet.
