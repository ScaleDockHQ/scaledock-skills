# MCP (`apps/mcp`)

The MCP SDK, transport, auth, tools from the contract, PermDock, resources, errors, the registry manifest, the docs MCP, and tests.

- **Packages.** `@modelcontextprotocol/server` and `@modelcontextprotocol/client`, latest major. Never the legacy `@modelcontextprotocol/sdk` package, `mcp-handler`, `orpc-mcp`, or a hand-written JSON-RPC switch. A library whose bundle budget rules out the SDK records an ADR.
- **Transport.**
  - `createMcpHandler(factory)` is mounted in the Hono shell: `app.all("/mcp", (c) => handler.fetch(c.req.raw, { authInfo }))`.
  - It serves the latest MCP spec revision and falls back for clients on older revisions; check the installed SDK docs for which revisions it supports. No session store.
  - DNS-rebinding protection uses `allowedHosts` for the production, preview and Portless hosts. `resource-origin.ts` resolves the public origin from `x-forwarded-proto` and the host.
- **Auth.**
  - `requireBearerAuth` (or `verifyBearerToken`) with a verifier backed by `@supabase/server`.
  - Serve Protected Resource Metadata at `/.well-known/oauth-protected-resource` and `/.well-known/oauth-protected-resource/mcp` through `resourceMetadataResponse`, with `authorization_servers`, `scopes_supported`, and `resource_documentation` pointing at the docs MCP page.
  - A 401 returns `unauthorizedResponse(request, { resourceMetadataUrl })`. The handler receives `authInfo`, and tools read it from `ctx.http.authInfo`.
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
  - a 401 with the Protected Resource Metadata header
  - a scope or permission denial
  - structured output
  - the approval path
- **Connect docs.** The docs MCP page has install links for Cursor, Claude and VS Code, plus the `.mcp.json` snippet.
