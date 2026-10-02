# Specs on the ScaleDock stack

Check option names against the installed packages and the PermDock docs MCP (`https://permdock.dev/mcp`) before you use them.

## Surfaces

| Surface               | Spec skill          | PermDock                                                                                                                          |
| --------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| AI SDK tools          | `owasp-agentic`     | `createPermDock` from `permdock/ai-sdk`: `toolApproval` into `generateText` or `ToolLoopAgent`, `capabilityMiddleware` per caller |
| Claude, OpenAI, Eve   | `owasp-agentic`     | `permdock/claude-agent` (`canUseTool`), `permdock/openai`, `permdock/eve`                                                         |
| MCP                   | `mcp-authorization` | `permdock/mcp`; see `scaledock-mcp-server`                                                                                        |
| A2A agent             | `a2a`               | `agentCard`, `extendedAgentCard` and `protectSkill` from `permdock/a2a`; identity from transport auth only                        |
| WebMCP page tools     | `webmcp`            | `registerTools(document.modelContext, ...)` from `permdock/webmcp`; a client entry, never the policy                              |
| Chat UI approvals     | `ag-ui`             | Render `approval-required` as the AG-UI human-in-the-loop interrupt and resume with the approval token                            |
| Agent payments        | `ap2`               | `pay` and `approve` are separate permissions with `approval: { by }`; the mandate is evidence on the approval                     |
| Bot traffic over HTTP | `web-bot-auth`      | `webBotAuth: { verify: true, keys: discoverViaSignatureAgent({ allow }) }` on the HTTP adapter fills `actor`                      |
| Approvals             | `owasp-agentic`     | `approvalsHandler` and a durable `ApprovalStore` from `permdock/approvals`; resume with `PermDock-Approval`                       |

## Audit trail

| Need                         | Spec skill            | Implementation                                                                                 |
| ---------------------------- | --------------------- | ---------------------------------------------------------------------------------------------- |
| Spans for tool calls         | `opentelemetry-genai` | `instrument(permdock, ...)` from `permdock/otel`; the decision span nests under `execute_tool` |
| SIEM events                  | `ocsf`                | Project decision events onto the OCSF class the `ocsf` skill names for authorization           |
| Event envelope               | `cloudevents`         | Wrap decision events leaving the app in CloudEvents when a consumer expects it                 |
| Record-keeping and oversight | `eu-ai-act`           | Map the logging and human-oversight obligations to decision events and approvals               |

## Flags and external policy

- **OpenFeature.** Read a flag in the PermDock `subject` or `context` function with the subject's id and organization as evaluation context, and use the result to select a declared role or plan. Never put a flag inside a grant.
- **Cedar.** When a gateway in front of the product (for example a hosted policy store) evaluates Cedar, keep it coarse (which tools a client may reach) and keep row-level and approval decisions in PermDock. Both combine with deny-overrides-permit, so a deny in either stops the call.
