# scaledock-mcp-server

An agent skill that builds or hardens an MCP server the ScaleDock way: a correct OAuth 2.1 resource server under the MCP authorization spec, with PermDock deciding every tool call.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill scaledock-mcp-server
```

It asks you to install the spec skills it builds on: `mcp-authorization`, `oauth`, `jwt` and `problem-details`, plus PermDock's skills (`npx skills add ScaleDockHQ/PermDock`).

Then ask your agent to "add an MCP server to this repo", "protect these MCP tools", or "review our MCP server against the spec".

## Rules

- The spec skills decide protocol details; this skill maps them onto the ScaleDock stack.
- Every tool call is a PermDock decision, and authorization comes from the user, not from scopes.
- The subject comes from the verified token, never from tool arguments.
- Destructive tools need a human approval.
- Errors are RFC 9457 Problem Details everywhere.

## References

- [`references/stack.md`](references/stack.md): each spec requirement mapped to the ScaleDock stack and the PermDock adapter.

## License

MIT
