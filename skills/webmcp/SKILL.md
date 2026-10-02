---
name: webmcp
description: "WebMCP: expose web page tools to AI agents via document.modelContext, following the W3C Web Machine Learning Community Group draft. Use when adding, reviewing or testing in-page agent tools in a website or web app: registerTool with name, title, description, inputSchema (JSON Schema) and execute, tool annotations (readOnlyHint, untrustedContentHint, consequentialHint, debugging), unregistering with an AbortSignal, getTools and executeTool for in-page agents, toolchange, toolactivated and toolcancel events, cross-origin exposure with exposedTo and fromOrigins, the tools Permissions-Policy and the iframe allow attribute, and the security and privacy risks (tool poisoning, output injection, misrepresentation of intent, over-parameterization). Triggers: webmcp, web mcp, modelContext, navigator.modelContext, document.modelContext, browser agent tools, agent-ready website, Chrome WebMCP origin trial."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# WebMCP

WebMCP is a JavaScript API, incubated as a Draft Community Group Report in the W3C Web Machine Learning Community Group, that lets a web page register tools (functions with natural language descriptions and JSON Schema inputs) for agents, browser agents and assistive technologies to call. With this skill the agent registers, scopes, annotates and unregisters page tools, and reviews them against the draft's security and privacy considerations.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites (§ names refer to the WebMCP draft). When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

Draft posture: **build**, pinned to the Draft Community Group Report of 30 September 2026, commit `d61d0e6d297ddb6bff3510b1330dbb215c6ef43c`. The API can change without notice; feature-detect it and keep tool logic behind a thin registration layer.

## Inputs (fill in, or ask before starting)

- Role: tool owner (a page that registers tools), in-page agent (a page or iframe that discovers and executes tools), or reviewer.
- Embedding: top-level only, or same-origin or cross-origin iframes that register or consume tools.
- Revision: the pinned commit in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources), compare the repository's latest commit and the published report date with the pin, check the implementation status page, and update the pins.

## Invariants

1. **The entry point is `document.modelContext`** (§ Extensions to Document). Earlier drafts used `navigator.modelContext`; the getter moved to `Document` in pull request #184. Feature-detect with `"modelContext" in document`.
2. **Secure contexts only.** `modelContext`, `ModelContext` and the event interfaces are `[SecureContext]` (WebIDL in § API).
3. **Tool names are unique per document, 1 to 128 characters of ASCII alphanumerics, `_`, `-` or `.`**, and `description` is non-empty; otherwise `registerTool()` rejects with `InvalidStateError` (§ ModelContext Interface, registerTool steps).
4. **`inputSchema` must serialize to JSON**; serialization errors reject registration (registerTool steps). The schema is a JSON Schema object (§ ModelContextTool Dictionary).
5. **Unregister by aborting the `signal` passed at registration** (§ ModelContextRegisterToolOptions). Unregistering does not cancel an execution already in progress (§ unregister a tool, note).
6. **Results must be JSON-serializable.** The `execute` promise's value is serialized to a JSON string; a value that cannot be serialized fails the call (§ imperative execute steps).
7. **Access is gated by the `tools` policy-controlled feature with default allowlist `'self'`** (§ Permissions policy integration). Cross-origin iframes need `allow="tools"`; `Permissions-Policy: tools=()` disables WebMCP for a document and all its descendants (§ Mitigations).
8. **Tools are not exposed cross-origin unless listed** in `exposedTo`, which only accepts potentially trustworthy origins (registerTool steps; Chrome imperative API guide).
9. **Hints are hints.** Annotations do not enforce anything; the tool's `execute` callback must still validate inputs, authorization and preconditions (explainer, Best Practices).

## Workflow

1. **Decide which tools to expose.** One well-defined function per tool, few tools per page state, names and descriptions that say what the tool does.
   -> [`references/api.md`](references/api.md)
   ✓ Every tool has a valid unique name, a description, and an input schema with a `description` on each property.
2. **Register tools.** Call `document.modelContext.registerTool(tool, { signal })` after feature detection, inside a secure context.
   -> [`references/api.md`](references/api.md)
   ✓ Registration resolves; an `AbortController` per tool or per page state controls its lifetime.
3. **Annotate.** Set `readOnlyHint`, `untrustedContentHint` and `consequentialHint` from what the tool actually does.
   -> [`references/api.md`](references/api.md), [`references/security.md`](references/security.md)
   ✓ Read-only tools say so; tools that return user-generated or external content set `untrustedContentHint`; purchases, transfers and deletions set `consequentialHint`.
4. **Handle execution.** Validate inputs, check authorization against current state, honor `options.signal`, return JSON-serializable results and clear error messages, and update the visible UI.
   -> [`references/api.md`](references/api.md)
   ✓ Calls with stale or invalid arguments fail with an actionable message instead of acting.
5. **Scope embedding.** Set `Permissions-Policy` and iframe `allow` attributes; use `exposedTo` and `fromOrigins` only for origins you trust.
   -> [`references/security.md`](references/security.md)
   ✓ Documents that should not register tools send `Permissions-Policy: tools=()`; no tool is exposed to an origin you would not share the data with.
6. **Review security and privacy.** Check tool metadata, inputs and outputs against the draft's risk list.
   -> [`references/security.md`](references/security.md)
   ✓ No tool asks for parameters it does not need, and no tool path skips checks the UI path performs.

## Verify before done

- [ ] Code uses `document.modelContext`, not `navigator.modelContext`, and does nothing when the API is absent.
- [ ] Every tool name matches `^[A-Za-z0-9_.-]{1,128}$` and is unique in its document.
- [ ] Each `registerTool()` call either passes a `signal` or is meant to live for the whole document.
- [ ] `execute` returns JSON-serializable values and handles `options.signal`.
- [ ] Annotations match behavior: no `readOnlyHint: true` on a tool that changes state.
- [ ] The `tools` Permissions-Policy and iframe `allow` attributes match where tools should run.
- [ ] Tool inputs are validated and authorized in `execute`, as for any other client-side entry point.

## Reference index

- **`references/api.md`**: the WebIDL, every dictionary member, registration and unregistration rules, execution, discovery, events, and examples. Load for steps 1 to 4.
- **`references/security.md`**: Permissions-Policy, cross-origin exposure, annotations as mitigations, and the draft's prompt injection, misrepresentation, over-parameterization and private browsing risks. Load for steps 3, 5 and 6.

## Related skills

- `mcp-authorization` for authorization of server-side MCP tools, which WebMCP mirrors in the browser: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp-authorization`.
- `owasp-agentic` for reviewing tool misuse, goal hijack and human-in-the-loop controls: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-agentic`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [WebMCP (published report)](https://webmachinelearning.github.io/webmcp/): Draft Community Group Report (W3C Web Machine Learning CG), 30 September 2026, checked 2026-10-02. Draft posture: build.
- [WebMCP spec source, index.bs](https://raw.githubusercontent.com/webmachinelearning/webmcp/d61d0e6d297ddb6bff3510b1330dbb215c6ef43c/index.bs): Draft Community Group Report, commit d61d0e6 (2026-09-30), checked 2026-10-02. Draft posture: build.
- [WebMCP explainer, README.md](https://raw.githubusercontent.com/webmachinelearning/webmcp/d61d0e6d297ddb6bff3510b1330dbb215c6ef43c/README.md): Explainer (non-normative), commit d61d0e6 (2026-09-30), checked 2026-10-02.
- [WebMCP implementation status](https://raw.githubusercontent.com/webmachinelearning/webmcp/d61d0e6d297ddb6bff3510b1330dbb215c6ef43c/implementation-status.md): Informative, commit d61d0e6 (2026-09-30), checked 2026-10-02.
- [WebMCP pull request #184: Move the modelContext getter to Document](https://github.com/webmachinelearning/webmcp/pull/184): Merged change, commit c7b5c70 (2026-05-27), checked 2026-10-02.
- [Chrome for Developers: WebMCP](https://developer.chrome.com/docs/ai/webmcp): Origin trial documentation, last updated 2026-10-01, checked 2026-10-02.
- [Chrome for Developers: WebMCP Imperative API](https://developer.chrome.com/docs/ai/webmcp/imperative-api): Origin trial documentation, last updated 2026-09-21, checked 2026-10-02.
- [Chrome for Developers: WebMCP tool security](https://developer.chrome.com/docs/ai/webmcp/secure-tools): Origin trial documentation, last updated 2026-09-01, checked 2026-10-02.
