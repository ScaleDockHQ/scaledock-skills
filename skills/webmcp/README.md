# webmcp

An agent skill for WebMCP, the W3C Web Machine Learning Community Group draft that lets web pages register tools for AI agents through `document.modelContext`.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill webmcp
```

Then ask your agent to "expose the search and checkout actions of this page as WebMCP tools" or "review our WebMCP tools for security issues".

## What it covers

- `document.modelContext.registerTool()`, tool definitions, input schemas and the validation rules for names and descriptions.
- Tool annotations: `readOnlyHint`, `untrustedContentHint`, `consequentialHint`, `debugging`.
- Unregistering tools with an `AbortSignal`, execution and cancellation, `getTools()`, `executeTool()` and the tool events.
- The `tools` Permissions-Policy, iframe delegation, and cross-origin exposure with `exposedTo` and `fromOrigins`.
- The draft's security and privacy risks, with a review checklist.

The draft can change without notice. The skill pins one commit (build posture).

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [WebMCP (published report)](https://webmachinelearning.github.io/webmcp/): Draft Community Group Report, 30 September 2026.
- [WebMCP spec source, index.bs](https://raw.githubusercontent.com/webmachinelearning/webmcp/d61d0e6d297ddb6bff3510b1330dbb215c6ef43c/index.bs): commit d61d0e6.
- [WebMCP explainer](https://raw.githubusercontent.com/webmachinelearning/webmcp/d61d0e6d297ddb6bff3510b1330dbb215c6ef43c/README.md): commit d61d0e6.
- [WebMCP implementation status](https://raw.githubusercontent.com/webmachinelearning/webmcp/d61d0e6d297ddb6bff3510b1330dbb215c6ef43c/implementation-status.md): commit d61d0e6.
- [Pull request #184](https://github.com/webmachinelearning/webmcp/pull/184): the move from `navigator` to `document`.
- [Chrome: WebMCP](https://developer.chrome.com/docs/ai/webmcp), [Imperative API](https://developer.chrome.com/docs/ai/webmcp/imperative-api) and [tool security](https://developer.chrome.com/docs/ai/webmcp/secure-tools).

## License

MIT
