# Versions and upgrades

Read this when choosing which MCP revision's authorization rules to build to, reading a server or client written for an older revision, upgrading one, or checking the draft for upcoming changes. Sources: the MCP Versioning page, the Authorization page and Key Changes page of each revision, and the draft Authorization and changelog pages, listed in [Sources](../SKILL.md#sources). MCP pages have no section numbers, so citations name the revision, the page and the heading.

## Version lines

MCP versions are date strings, the last date backwards-incompatible changes were made; a revision marked Current may still receive backwards-compatible changes, and past revisions are Final (Versioning, Revisions).

| Id              | Line           | Status    | Revision                                   | Posture | Summary                                                                                                 |
| --------------- | -------------- | --------- | ------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------- |
| `draft-preview` | MCP draft      | preview   | `/specification/draft`, checked 2026-10-05 | track   | The next revision in progress. Its authorization page matches 2026-07-28 and its changelog is empty.    |
| `2026-07-28`    | MCP 2026-07-28 | current   | 2026-07-28 (Current)                       |         | Stateless MCP; `iss` validation, issuer-bound credentials, deprecated DCR, split authorization pages.   |
| `2025-11-25`    | MCP 2025-11-25 | supported | 2025-11-25 (Final)                         |         | OpenID Connect Discovery, Client ID Metadata Documents, optional `WWW-Authenticate`, scope step-up.     |
| `2025-06-18`    | MCP 2025-06-18 | supported | 2025-06-18 (Final)                         |         | MCP servers become OAuth resource servers with RFC 9728 metadata and RFC 8707 resource indicators.      |
| `2025-03-26`    | MCP 2025-03-26 | legacy    | 2025-03-26 (Final)                         |         | First authorization spec: the MCP server is, or fronts, the authorization server; no resource metadata. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Revision 2024-11-05, the one before 2025-03-26, had no authorization specification: the 2025-03-26 Key Changes page lists the OAuth 2.1 based authorization framework as new (2025-03-26 Key Changes, Major changes). A 2024-11-05 server has no authorization to upgrade; add the 2026-07-28 rules from scratch.

## Which version to use

- Build servers and clients to MCP 2026-07-28. It is the revision the Versioning page names as current.
- Keep MCP 2025-11-25 or MCP 2025-06-18 authorization behaviour only where a named peer still speaks that revision. Clients and servers MAY support several protocol versions at once (Versioning, Negotiation); a server that does should meet the strictest rule of each. For example, MCP 2025-06-18 clients expect `resource_metadata` in every 401 (2025-06-18 Authorization, Authorization Server Location), so always send it.
- Treat MCP 2025-03-26 as input to an upgrade. Its authorization base URL and default endpoints (2025-03-26 Authorization, Server Metadata Discovery) are not used by any later revision.
- Follow the draft only to see what is coming. Its posture is **track**: emit nothing from it.

## What changed

### MCP draft

The draft changelog says changes since the most recent release accumulate there, and it lists none yet (draft Changelog). The draft Authorization page has the same text as 2026-07-28. One forward-looking note appears in both: a future revision is expected to raise authorization server inclusion of `iss` from SHOULD to MUST (Authorization, Authorization Response Validation).

### MCP 2026-07-28

From the 2026-07-28 Key Changes page and Authorization page:

- Authorization servers SHOULD include `iss` in authorization responses (RFC 9207), and clients MUST validate a present `iss` against the issuer recorded with the PKCE verifier before redeeming the code (Key Changes, Minor changes 7, SEP-2468; Authorization, Authorization Response Validation).
- Clients MUST key persisted credentials by issuer, MUST NOT reuse them with a different authorization server, and MUST re-register when it changes (Key Changes, Minor changes 9, SEP-2352; Client Registration, Authorization Server Binding).
- Clients MUST send an appropriate `application_type` in Dynamic Client Registration (Key Changes, Minor changes 8, SEP-837).
- Dynamic Client Registration is Deprecated in favour of Client ID Metadata Documents and kept for authorization servers that lack them (Key Changes, Deprecated 4; Authorization, Overview).
- Step-up computes the union of previously requested and newly challenged scopes; servers SHOULD put all scopes for an operation in one challenge, and MUST honour scope hierarchies (Authorization, Scope Challenge Handling and Step-Up Authorization Flow; SEP-2350). The 2025-11-25 "minimum, recommended, extended" server strategies are gone.
- A new Refresh Tokens section: clients MAY request `offline_access`, and servers SHOULD NOT put it in challenges or `scopes_supported` (Authorization, Refresh Tokens).
- Discovery, client registration and security considerations move to their own pages (Authorization, Authorization Server Discovery, Client Registration and Security Considerations).
- The protocol becomes stateless: no `initialize` handshake and no `Mcp-Session-Id`; every request carries its protocol version in `_meta` and, on Streamable HTTP, the `MCP-Protocol-Version` header (Key Changes, Major changes 1 and 2). The Authorization page drops "even if they are part of the same logical session" from the rule that every HTTP request carries the token (Authorization, Token Requirements).

### MCP 2025-11-25

From the 2025-11-25 Key Changes page and Authorization page:

- Authorization servers MUST offer RFC 8414 metadata or OpenID Connect Discovery, and clients MUST try both in a fixed order (Key Changes, Major changes 1, PR #797; Authorization, Authorization Server Metadata Discovery).
- Protected Resource Metadata may be found through `resource_metadata` in `WWW-Authenticate` or a well-known URI; servers implement one and clients support both (Key Changes, Minor changes 8, SEP-985; Authorization, Protected Resource Metadata Discovery Requirements).
- Client ID Metadata Documents become the recommended registration (SHOULD), with the order pre-registration, CIMD, DCR, then ask the user; DCR drops from SHOULD to MAY (Key Changes, Major changes 8, SEP-991; Authorization, Client Registration Approaches).
- `scope` in `WWW-Authenticate`, a scope selection strategy, and step-up on `403 insufficient_scope` (Key Changes, Major changes 3, SEP-835; Authorization, Scope Selection Strategy and Scope Challenge Handling).
- Clients MUST verify PKCE support through `code_challenge_methods_supported` and refuse to proceed without it, and MUST use `S256` when capable (Authorization, Authorization Code Protection).

### MCP 2025-06-18

From the 2025-06-18 Key Changes page and Authorization page:

- MCP servers are OAuth resource servers and MUST publish RFC 9728 Protected Resource Metadata listing at least one authorization server; the authorization server is a separate role (Key Changes, Major changes 3, PR #338; Authorization, Roles and Authorization Server Location).
- Servers MUST send `WWW-Authenticate` with the metadata URL on a 401 (Authorization, Authorization Server Location).
- Authorization servers MUST provide RFC 8414 metadata, and the authorization base URL and default endpoint fallbacks of 2025-03-26 are gone (Authorization, Overview).
- Clients MUST send RFC 8707 `resource` in authorization and token requests, and servers MUST validate the token audience (Key Changes, Major changes 4, PR #734; Authorization, Resource Parameter Implementation and Token Handling).
- Security considerations and a Security Best Practices page are added, including the ban on token passthrough (Key Changes, Major changes 5; Authorization, Access Token Privilege Restriction).
- Clients send `MCP-Protocol-Version` on later HTTP requests (Key Changes, Major changes 8, PR #548).

### MCP 2025-03-26

- Adds the first authorization framework, based on OAuth 2.1 (2025-03-26 Key Changes, Major changes 1, PR #133).
- The MCP server acts as the authorization server, or as both client and authorization server in front of a third-party one (2025-03-26 Authorization, Example: authorization code grant and Third-Party Authorization Flow).
- Clients find metadata at `/.well-known/oauth-authorization-server` on the authorization base URL, the server URL with its path removed, and fall back to `/authorize`, `/token` and `/register` (2025-03-26 Authorization, Server Metadata Discovery).
- DCR is a SHOULD and PKCE is required (2025-03-26 Authorization, Dynamic Client Registration and Implementation Requirements).
- There is no Protected Resource Metadata, no `resource` parameter and no audience rule.

## Upgrading

### MCP 2025-11-25 to MCP 2026-07-28

1. Change the version marker: send `2026-07-28` as the protocol version (in `_meta` and the `MCP-Protocol-Version` header) and stop depending on an `initialize` session for authorization state.
2. Replace removed or renamed behaviour:
   - Client: record the validated `issuer` with the PKCE verifier and `state`, and apply the RFC 9207 table to every authorization response, including errors, before redeeming the code (Authorization, Authorization Response Validation).
   - Client: key stored credentials by issuer and re-register when the authorization server changes (Client Registration, Authorization Server Binding).
   - Client: send `application_type` when DCR is used, and prefer CIMD over DCR (Key Changes, Minor changes 8; Deprecated 4).
   - Client: on step-up, request the union of previously requested and challenged scopes (Authorization, Step-Up Authorization Flow).
   - Server: put all scopes an operation needs in one challenge, account for scope hierarchies, and keep `offline_access` out of challenges and `scopes_supported` (Authorization, Scope Challenge Handling and Refresh Tokens).
   - Authorization server: include `iss` and advertise `authorization_response_iss_parameter_supported` (Authorization, Authorization Response Validation).
3. Validate against the target: run the Verify list in `SKILL.md` and the checks in [`client-flow.md`](client-flow.md) and [`resource-server.md`](resource-server.md).
4. Keep behaviour unchanged: the same tokens reach the same server with the same scopes. A callback that 2025-11-25 accepted is rejected only when its `iss` is wrong or missing where the metadata promised it.

### MCP 2025-06-18 to MCP 2025-11-25

1. Change the version marker: negotiate `2025-11-25` in `initialize` and send it in `MCP-Protocol-Version`.
2. Replace removed or renamed behaviour:
   - Client: try the RFC 8414 and OpenID Connect Discovery well-known URLs in the defined order, and probe the path and root Protected Resource Metadata URLs when the 401 has no `resource_metadata` (2025-11-25 Authorization, Authorization Server Metadata Discovery and Protected Resource Metadata Discovery Requirements).
   - Client: register in the order pre-registration, CIMD, DCR, then ask the user (2025-11-25 Authorization, Client Registration Approaches).
   - Client: refuse to proceed when `code_challenge_methods_supported` is absent (2025-11-25 Authorization, Authorization Code Protection).
   - Server: add `scope` to the 401 challenge and answer missing per-operation scopes with `403 insufficient_scope` (2025-11-25 Authorization, Scope Selection Strategy and Scope Challenge Handling).
3. Validate against the target: a client that starts from only the server URL reaches the authorization server through either discovery path, and a step-up challenge is honoured.
4. Keep behaviour unchanged: keep sending `resource_metadata` in every 401, which 2025-06-18 clients need.

### MCP 2025-03-26 to MCP 2025-06-18

1. Change the version marker: negotiate `2025-06-18` and send `MCP-Protocol-Version` on every later HTTP request (2025-06-18 Key Changes, Major changes 8).
2. Replace removed or renamed behaviour:
   - Server: publish RFC 9728 Protected Resource Metadata with `authorization_servers`, and send `WWW-Authenticate` with its URL on every 401 (2025-06-18 Authorization, Authorization Server Location).
   - Authorization server: serve RFC 8414 metadata at its own issuer. If the MCP server was its own authorization server, list itself in `authorization_servers`; if it proxied a third party, move toward listing that authorization server directly (2025-06-18 Authorization, Roles).
   - Client: drop the authorization base URL and default `/authorize`, `/token` and `/register` fallbacks; discover through Protected Resource Metadata, then RFC 8414 (2025-06-18 Authorization, Overview).
   - Client: send `resource` in authorization and token requests; server: validate the token audience and stop passing tokens through (2025-06-18 Authorization, Resource Parameter Implementation and Token Handling).
3. Validate against the target: a token issued for another resource is rejected with 401, and the client reaches the authorization server from the 401 alone.
4. Keep behaviour unchanged: existing users keep the same grants; re-issue tokens with the new audience rather than accepting old audience-less tokens indefinitely.

### MCP 2025-03-26 to MCP 2026-07-28

Apply the three checklists above in order. The steps that change the most are the move from the MCP server as authorization server to a separate authorization server found through RFC 9728 (2025-06-18), the addition of `resource` and audience validation (2025-06-18), registration through CIMD rather than DCR (2025-11-25 and 2026-07-28), and `iss` validation with issuer-bound credentials (2026-07-28). Validate the result against the 2026-07-28 Verify list in `SKILL.md`.

## Preview: MCP draft

The draft revision lives at `/specification/draft`. Posture: **track**. As of 2026-10-05 its Authorization page has the same text as MCP 2026-07-28 and its changelog lists no changes, so there is nothing new to build. Do not emit a draft protocol version string, and do not adopt draft text that is not in 2026-07-28. Watch the draft changelog and Authorization page for the expected change of `iss` inclusion from SHOULD to MUST. When the draft ships as a dated revision: add it as current, make 2026-07-28 supported, move the oldest supported revision to legacy if the Versioning page or Deprecated Features page warrants it, and add an upgrade section.
