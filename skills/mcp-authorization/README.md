# mcp-authorization

An agent skill for the Model Context Protocol (MCP) authorization specification, targeting revision 2026-07-28 with support for 2025-11-25 and 2025-06-18 and upgrades from 2025-03-26: HTTP MCP servers as OAuth 2.1 resource servers, and MCP clients that discover, register and request audience-bound tokens.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill mcp-authorization
```

Then ask your agent to "add OAuth authorization to our MCP server" or "review our MCP client's authorization flow".

## What it covers

- Protected Resource Metadata (RFC 9728), `resource_metadata` in `WWW-Authenticate`, and 401 and 403 challenges with scopes.
- Token and audience validation (RFC 8707), and the ban on token passthrough.
- Authorization server discovery through RFC 8414 and OpenID Connect Discovery, with the `issuer` check.
- Client ID Metadata Documents, pre-registration, deprecated Dynamic Client Registration, and binding credentials to an issuer.
- PKCE with `S256`, the `resource` parameter, RFC 9207 `iss` validation, and step-up with scope accumulation.
- The Stable Enterprise-Managed Authorization extension (ID-JAG through RFC 8693 and RFC 7523).
- The MCP security best practices: confused deputy, SSRF, session handles, URL validation, mix-up, localhost redirects and scope minimization.
- What the MCP TypeScript SDK v2 provides, and what it leaves to the app.
- What changed in each revision's authorization rules, and checklists to upgrade between them.

## Versions

| Line           | Status                |
| -------------- | --------------------- |
| MCP draft      | preview (track)       |
| MCP 2026-07-28 | current               |
| MCP 2025-11-25 | supported             |
| MCP 2025-06-18 | supported             |
| MCP 2025-03-26 | legacy (upgrade from) |

`references/versions.md` says which revision to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [MCP Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization) and its discovery, client registration and security considerations pages: Current, 2026-07-28.
- [MCP Authorization (draft)](https://modelcontextprotocol.io/specification/draft/basic/authorization) and its [changelog](https://modelcontextprotocol.io/specification/draft/changelog): Draft, checked 2026-10-05.
- MCP Authorization and Key Changes for [2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization), [2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) and [2025-03-26](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization): Final.
- [MCP Security Best Practices](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices): 2026-07-28.
- [Enterprise-Managed Authorization](https://raw.githubusercontent.com/modelcontextprotocol/ext-auth/main/specification/stable/enterprise-managed-authorization.mdx): Stable, main at e5eef54.
- [MCP TypeScript SDK v2](https://ts.sdk.modelcontextprotocol.io/v2/): v2.2.0.
- OAuth 2.1 draft -13, Client ID Metadata Document draft -00 and Identity Assertion JWT Authorization Grant draft -04, as pinned by MCP.
- RFC 9728, RFC 8414, RFC 8707, RFC 9207, RFC 6750, RFC 7591, RFC 8693, RFC 7523 and OpenID Connect Discovery 1.0.

## License

MIT
