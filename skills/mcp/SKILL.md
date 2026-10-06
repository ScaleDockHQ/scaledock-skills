---
name: mcp
description: >-
  Model Context Protocol (MCP) 2026-07-28: build and review MCP servers and
  clients against the base protocol, transports and features. Use when
  implementing or reviewing an MCP server, client, host, gateway or proxy:
  JSON-RPC messages and error codes, per-request _meta, server/discover and
  version negotiation, stdio and Streamable HTTP with Mcp-Method, Mcp-Name and
  x-mcp-header headers, multi round-trip requests (InputRequiredResult),
  subscriptions/listen, cancellation, progress, tools, resources, prompts,
  completion, pagination, caching hints, elicitation, deprecated sampling,
  roots and logging, security best practices, the Tasks and Skills over MCP
  extensions, and MCP Registry server.json. Targets MCP 2026-07-28; supports
  MCP 2025-11-25 and MCP 2025-06-18, upgrades from 2025-03-26 and 2024-11-05,
  tracks the MCP draft, and covers the MCP Tasks extension 2026-07-28, the
  Skills over MCP extension (stable) and server.json 2025-12-11.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# Model Context Protocol (MCP)

The Model Context Protocol connects LLM applications (hosts and their clients) to servers that expose tools, resources and prompts, over JSON-RPC 2.0 on stdio or Streamable HTTP. This skill pins MCP revision 2026-07-28, the stateless revision with per-request metadata and no handshake, and produces a server, client or review that meets its MUST-level rules. Authorization is covered by the `mcp-authorization` skill; MCP Apps (interactive UI) by the `mcp-apps` skill.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the page and heading it cites. MCP pages have no stable section numbers, so rules cite the page and heading name. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: MCP server, MCP client or host, or an intermediary (gateway, proxy, aggregator) that does both.
- Transport: stdio, Streamable HTTP, or a custom transport.
- Features: which of tools, resources, prompts, completion, subscriptions and elicitation are in scope, and whether deprecated sampling, roots or logging must be kept for existing peers.
- Extensions and registry: whether the Tasks extension, the Skills extension, or publishing a `server.json` to the MCP Registry is in scope.
- Target version: MCP 2026-07-28 (current, the default; the revision the MCP Versioning page marks Current). MCP 2025-11-25 and MCP 2025-06-18 are supported: keep their handshake behaviour only for a named peer on that revision (a dual-era implementation). MCP 2025-03-26 and MCP 2024-11-05 are legacy: read them and upgrade from them, never author them. The MCP draft is a preview (posture: track): never emit it. Families: MCP Tasks extension 2026-07-28, Skills over MCP extension (stable) and server.json 2025-12-11 are each the current line of their family. See [`references/versions.md`](references/versions.md).
- Sources: when refreshing this skill or when a rule looks out of date, re-read the MCP Versioning page for a newer Current revision, then that revision's Key Changes and Deprecated Features pages, the draft changelog, the extension repositories and the latest registry release, then every URL in [Sources](#sources). Update the pins and bump the version.

## Invariants

1. **JSON-RPC 2.0, UTF-8, fixed directions.** Request IDs are strings or integers, never `null`, never reused while in flight; notifications get no response. Clients send requests; servers MUST NOT initiate JSON-RPC requests (Base Protocol, Messages; Message Patterns, Overview).
2. **Every result has `resultType`.** It is `"complete"`, `"input_required"` or an advertised extension value; unknown values are invalid and a missing value from an older server means `"complete"` (Base Protocol, Result Responses).
3. **No connection state.** Every request carries `io.modelcontextprotocol/protocolVersion` and `io.modelcontextprotocol/clientCapabilities` in `_meta`; servers MUST NOT rely on earlier requests on the connection and MUST reference cross-request state by an explicit identifier (Base Protocol, Statelessness and General fields: `_meta`).
4. **Unsupported version and missing capability have their own errors.** Return `-32022` with `data.supported` and `data.requested` for an unsupported version, and `-32021` with `data.requiredCapabilities` for an undeclared client capability. Do not emit `-32002` or `-32042`, or undefined codes in `-32020` to `-32099` (Versioning and Compatibility; Base Protocol, Error Codes).
5. **Servers implement `server/discover`** and advertise every implemented feature and extension in its `capabilities` (Discovery; Architecture, Capability Negotiation).
6. **stdio carries only MCP on stdout and stdin.** One message per line, no embedded newlines; logs go to `stderr` (stdio, Sending Messages and Receiving Messages).
7. **Streamable HTTP validates and mirrors.** Servers MUST validate `Origin` (403 on failure). Every POST sends `MCP-Protocol-Version` and `Mcp-Method`, plus `Mcp-Name` where required, and servers that read the body MUST reject headers that disagree with it with 400 and `-32020`. Closing a response stream is cancellation (Streamable HTTP, Security & Endpoint, Standard Request Headers, Server Validation and Cancellation).
8. **Only three methods may ask for input.** `tools/call`, `prompts/get` and `resources/read` MAY return `InputRequiredResult`; the client retries with `inputResponses`, echoes `requestState` unchanged and uses a new request ID. Servers MUST treat `requestState` as attacker-controlled (Multi Round-Trip Requests).
9. **Lists do not vary per connection.** `tools/list`, `resources/list` and `prompts/list` MUST NOT vary per connection or as a side effect of other requests; they MAY vary by authorization. Cursors are opaque (Tools, Resources and Prompts, Capabilities; Pagination).
10. **Cacheable results carry hints.** Complete results of `server/discover`, the list methods and `resources/read` MUST include `ttlMs` and `cacheScope`; `"private"` results MUST NOT be shared across authorization contexts, and servers MUST NOT rely on `cacheScope` for access control (Caching).
11. **Tool results separate protocol errors from execution errors.** Unknown tools and malformed requests are JSON-RPC errors; execution failures are `isError: true` results. With `outputSchema`, `structuredContent` MUST conform. Annotations from untrusted servers MUST be treated as untrusted (Tools, Error Handling and Data Types).
12. **Secrets never go through form elicitation.** Passwords, API keys, tokens and payment credentials MUST use URL mode; clients MUST NOT pre-fetch or open the URL without consent and MUST show it in full (Elicitation, Capabilities, URL Mode Elicitation for Sensitive Data and Safe URL Handling).
13. **Deprecated features stay opt-in.** Sampling, roots and logging are Deprecated in 2026-07-28; new implementations SHOULD NOT adopt them, and the earliest removal is the first revision on or after 2027-07-28 (Deprecated Features; Sampling, Roots and Logging).
14. **Extensions are negotiated.** Use an extension only when both sides advertise it; if only one side does, that side MUST fall back to core behaviour or reject (Versioning and Compatibility, Extension Negotiation).
15. **No token passthrough.** Servers MUST NOT accept tokens not issued for them, and MCP proxy servers MUST obtain per-client consent (Security Best Practices, Token Passthrough and Confused Deputy Problem).

## Workflow

1. **Scope the work and pick the version.** Confirm role, transport and features from Inputs. Target MCP 2026-07-28; list any peers that still speak a supported older revision and decide whether to be dual-era.
   -> [`references/versions.md`](references/versions.md)
   ✓ The design names the role, transport, target revision and any legacy peers, and it is not a legacy or draft revision.
2. **Build the message layer.** Implement JSON-RPC framing, `resultType`, the error codes, the `_meta` keys and `server/discover`.
   -> [`references/lifecycle-and-transports.md`](references/lifecycle-and-transports.md)
   ✓ A request without `protocolVersion` in `_meta` gets `-32602`, and an unsupported version gets `-32022` with `data.supported`.
3. **Implement the transport.** For stdio, framing, shutdown and the discover probe; for Streamable HTTP, `Origin` checks, the `Accept` rule, JSON or SSE responses, standard headers and `x-mcp-header`.
   -> [`references/lifecycle-and-transports.md`](references/lifecycle-and-transports.md)
   ✓ A `tools/call` whose `Mcp-Name` differs from `params.name` gets 400 with `-32020`.
4. **Add the server features.** Tools, resources, prompts, completion, pagination and caching hints, with the per-connection list rule and error codes.
   -> [`references/server-features.md`](references/server-features.md)
   ✓ An unknown resource returns `-32602`, never empty `contents`; a failing tool returns `isError: true`.
5. **Add input requests and subscriptions.** Return `InputRequiredResult` where needed with protected `requestState`; serve `subscriptions/listen` with the acknowledgement first; honour cancellation and progress.
   -> [`references/server-features.md`](references/server-features.md), [`references/lifecycle-and-transports.md`](references/lifecycle-and-transports.md)
   ✓ A tampered `requestState` is rejected, and the first message on a listen stream is `notifications/subscriptions/acknowledged`.
6. **Build the client side.** Declare capabilities per request, answer input requests, implement elicitation (form and URL), and cache by method and parameters.
   -> [`references/client-features.md`](references/client-features.md)
   ✓ The retry carries the original parameters, `inputResponses`, the unchanged `requestState` and a new ID, and is not cached.
7. **Add extensions or a registry entry if in scope.** Negotiate the Tasks or Skills extension; write a `server.json` for the registry.
   -> [`references/extensions-and-registry.md`](references/extensions-and-registry.md)
   ✓ No `CreateTaskResult` is sent to a request that did not declare the Tasks extension, and `server.json` validates against the 2025-12-11 schema.
8. **Review security.** Go through transport, tokens and proxies, SSRF and URLs, local servers and the per-feature rules.
   -> [`references/security.md`](references/security.md)
   ✓ Each review question in the security reference has an answer or a reason it does not apply.
9. **Upgrade.** When the code targets an older revision or extension version, apply the checklist for each adjacent pair, oldest first.
   -> [`references/versions.md`](references/versions.md)
   ✓ No `initialize`, session ID, batch or server-initiated request remains outside an explicit dual-era code path.

## Verify before done

- [ ] Target is MCP 2026-07-28; 2025-11-25 and 2025-06-18 behaviour appears only on a dual-era path; nothing is authored for 2025-03-26, 2024-11-05 or the draft.
- [ ] Every request carries `protocolVersion` and `clientCapabilities` in `_meta`; every result carries `resultType`.
- [ ] `server/discover` lists the supported versions, capabilities and extensions, with caching hints.
- [ ] stdio writes only MCP to stdout; Streamable HTTP validates `Origin` and the standard and `Mcp-Param` headers.
- [ ] Lists are identical across connections for the same authorization, paginate with opaque cursors and carry `ttlMs` and `cacheScope`.
- [ ] Only `tools/call`, `prompts/get` and `resources/read` return `InputRequiredResult`, and `requestState` is integrity-protected where it matters.
- [ ] Tool execution errors use `isError: true`; `structuredContent` matches `outputSchema`.
- [ ] No secrets go through form elicitation; URL elicitation follows the consent and display rules.
- [ ] Deprecated sampling, roots and logging are absent, or kept deliberately for existing peers.
- [ ] Extensions are used only when both sides advertise them.
- [ ] Authorization, if any, was checked with the `mcp-authorization` skill.

## Reference index

| File                                                                               | Read when                                                                                    |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`references/versions.md`](references/versions.md)                                 | Choosing a revision or family version, reading older code, upgrading, or checking the draft. |
| [`references/lifecycle-and-transports.md`](references/lifecycle-and-transports.md) | Messages, errors, `_meta`, versioning, stdio, Streamable HTTP, subscriptions, cancellation.  |
| [`references/server-features.md`](references/server-features.md)                   | Tools, resources, prompts, completion, pagination, caching hints, MRTR, logging, icons.      |
| [`references/client-features.md`](references/client-features.md)                   | Client capabilities, answering MRTR, elicitation, sampling, roots, client caching.           |
| [`references/extensions-and-registry.md`](references/extensions-and-registry.md)   | Extension negotiation, the Tasks and Skills extensions, `server.json`.                       |
| [`references/security.md`](references/security.md)                                 | Reviewing a server, client, proxy or host for security.                                      |

## Related skills

- `mcp-authorization`: OAuth authorization for HTTP MCP servers and clients. Install with `npx skills add ScaleDockHQ/scaledock-skills --skill mcp-authorization`.
- `mcp-apps`: interactive UI for MCP servers (the `io.modelcontextprotocol/ui` extension), once published. Install with `npx skills add ScaleDockHQ/scaledock-skills --skill mcp-apps`.
- `json-rpc`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill json-rpc`
- `server-sent-events`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill server-sent-events`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [MCP Versioning](https://modelcontextprotocol.io/specification/versioning): Specification page, lists 2026-07-28 as Current, checked 2026-10-05.
- [MCP Specification 2026-07-28 (overview and architecture)](https://modelcontextprotocol.io/specification/2026-07-28): Current, 2026-07-28 (modelcontextprotocol main at 75db1e9), checked 2026-10-05.
- [MCP Base Protocol](https://modelcontextprotocol.io/specification/2026-07-28/basic): Current, 2026-07-28, checked 2026-10-05.
- [MCP Versioning and Compatibility](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning): Current, 2026-07-28, checked 2026-10-05.
- [MCP Discovery](https://modelcontextprotocol.io/specification/2026-07-28/server/discover): Current, 2026-07-28, checked 2026-10-05.
- [MCP Transports](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports), [stdio](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio) and [Streamable HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http): Current, 2026-07-28, checked 2026-10-05.
- [MCP Message Patterns](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns), [Multi Round-Trip Requests](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr), [Subscriptions](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions), [Cancellation](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/cancellation) and [Progress](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/progress): Current, 2026-07-28, checked 2026-10-05.
- [MCP Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools), [Resources](https://modelcontextprotocol.io/specification/2026-07-28/server/resources) and [Prompts](https://modelcontextprotocol.io/specification/2026-07-28/server/prompts): Current, 2026-07-28, checked 2026-10-05.
- [MCP Completion](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/completion), [Logging](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/logging) (Deprecated feature), [Pagination](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/pagination) and [Caching](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/caching): Current, 2026-07-28, checked 2026-10-05.
- [MCP Sampling](https://modelcontextprotocol.io/specification/2026-07-28/client/sampling) (Deprecated feature), [Elicitation](https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation) and [Roots](https://modelcontextprotocol.io/specification/2026-07-28/client/roots) (Deprecated feature): Current, 2026-07-28, checked 2026-10-05.
- [MCP Key Changes 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28/changelog) and [Deprecated Features](https://modelcontextprotocol.io/specification/2026-07-28/deprecated): Current, 2026-07-28, checked 2026-10-05.
- [MCP schema 2026-07-28](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/schema/2026-07-28/schema.ts): Current, main at 75db1e9, checked 2026-10-05.
- [MCP Specification (draft)](https://modelcontextprotocol.io/specification/draft) and [draft Key Changes](https://modelcontextprotocol.io/specification/draft/changelog): Draft, main at 75db1e9 (changelog empty), checked 2026-10-05.
- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25), its [Key Changes](https://modelcontextprotocol.io/specification/2025-11-25/changelog), [Lifecycle](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle) and [Transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports): Final, 2025-11-25, checked 2026-10-05.
- [MCP Key Changes 2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18/changelog): Final, 2025-06-18, checked 2026-10-05.
- [MCP Key Changes 2025-03-26](https://modelcontextprotocol.io/specification/2025-03-26/changelog): Final, 2025-03-26, checked 2026-10-05.
- [MCP Specification 2024-11-05](https://modelcontextprotocol.io/specification/2024-11-05): Final, 2024-11-05, checked 2026-10-05.
- [MCP Security Best Practices](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices): documentation for the Current revision, 2026-07-28, checked 2026-10-05.
- [MCP Extensions Overview](https://modelcontextprotocol.io/extensions/overview): documentation page, main at 75db1e9, checked 2026-10-05.
- [MCP Tasks extension specification 2026-07-28](https://raw.githubusercontent.com/modelcontextprotocol/ext-tasks/main/specification/2026-07-28/tasks.md): Stable, main at 5246bc3 (release v0.2.2), checked 2026-10-05.
- [Skills over MCP extension specification](https://raw.githubusercontent.com/modelcontextprotocol/ext-skills/main/specification/stable/skills.mdx): Final (SEP-2640), stable at main 167da6c, checked 2026-10-05.
- [MCP Registry release v1.8.1](https://github.com/modelcontextprotocol/registry/releases/tag/v1.8.1): Released, v1.8.1 (2026-08-06), checked 2026-10-05.
- [server.json schema 2025-12-11](https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json): Released, 2025-12-11, checked 2026-10-05.
- [server.json format reference](https://raw.githubusercontent.com/modelcontextprotocol/registry/v1.8.1/docs/reference/server-json/generic-server-json.md), [server.json CHANGELOG](https://raw.githubusercontent.com/modelcontextprotocol/registry/v1.8.1/docs/reference/server-json/CHANGELOG.md) and [Official MCP Registry requirements](https://raw.githubusercontent.com/modelcontextprotocol/registry/v1.8.1/docs/reference/server-json/official-registry-requirements.md): Released, registry v1.8.1, checked 2026-10-05.
