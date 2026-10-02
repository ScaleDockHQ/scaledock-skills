# scaledock-agent-permissions

An agent skill that gives AI agents least-privilege, auditable access in a ScaleDock product, with PermDock deciding every tool call, delegation and human approval across the agent protocols.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill scaledock-agent-permissions
```

It asks you to install the spec skills it builds on: `owasp-agentic` and `opentelemetry-genai`, the surfaces you use (`a2a`, `webmcp`, `ag-ui`, `ap2`, `web-bot-auth`), and `ocsf`, `eu-ai-act`, `openfeature` and `cedar` when they apply, plus PermDock's skills (`npx skills add ScaleDockHQ/PermDock`).

Then ask your agent to "let our AI agent call these tools safely", "publish an A2A Agent Card", "add human approval to agent payments", or "review our agents against the OWASP agentic top 10".

## Rules

- The spec skills decide protocol details; this skill maps them onto PermDock.
- The user is the principal and the agent is the actor; neither comes from model input.
- Agents get only what the user explicitly delegated.
- Destructive and money-moving actions need a distinct human approver.
- Every decision is recorded with principal, actor, permission, outcome and reason.

## References

- [`references/stack.md`](references/stack.md): each spec mapped to the PermDock adapter and the audit trail.

## License

MIT
