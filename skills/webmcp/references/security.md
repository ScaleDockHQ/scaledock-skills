# WebMCP security and privacy

The draft's "Security and Privacy Considerations" section is non-normative. It assigns responsibilities to site authors, agent providers, user agents and end users, and says it cannot define the exact mitigations agents and user agents must provide (§ Approach to Risk Assessment and Mitigations). This file lists what a site author controls.

## Baseline assumptions (§ Agent Baseline Capabilities)

The draft assumes agents can:

- inherit the user's identity and authentication state from the browser (cookies, sessions);
- access personalization data, browsing history and payment information;
- correlate information across sites.

So a tool call runs with the user's session, and anything a tool asks for may be filled from the agent's knowledge of the user.

## Permissions policy (§ Permissions policy integration, § Mitigations)

- The `tools` policy-controlled feature gates every WebMCP API; its default allowlist is `'self'`.
- Top-level and same-origin documents may register tools by default; cross-origin iframes may not unless delegated with `allow="tools"` (Chrome WebMCP overview and imperative API guide).
- To switch WebMCP off for a document and every descendant frame, same-origin and cross-origin, send:

```http
Permissions-Policy: tools=()
```

The user agent enforces this before page script runs, so injected scripts and compromised dependencies cannot register tools (§ Disabling WebMCP with Permissions Policy). Send it on every page that is not meant to expose tools.

```html
<!-- Delegate tool registration to a trusted cross-origin iframe only. -->
<iframe src="https://widgets.example.net/checkout" allow="tools"></iframe>
```

## Cross-origin exposure

- Tools are unavailable to cross-origin documents by default (Chrome tool security guide).
- `exposedTo` lists the secure origins a tool is exposed to, both when they are embedded in your page and when your page is embedded in theirs (Chrome tool security guide; § ModelContextRegisterToolOptions). Non-trustworthy origins reject with `SecurityError` (registerTool steps).
- A consumer must also name the hosting origin in `getTools({ fromOrigins })` (Chrome imperative API guide).
- Expose a read-only tool only to origins you would share its data with directly, and a read-write tool only to origins you trust to act for your user (Chrome tool security guide).
- Browser extensions with host permissions can query and execute page tools through content scripts (Chrome tool security guide). Treat every tool as callable by any agent the user runs.

## Annotations as mitigations (§ Mitigations; Chrome tool security guide)

| Annotation             | Mitigates                   | Use it when                                                                                                                  |
| ---------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `untrustedContentHint` | Output injection            | The tool returns user-generated content or external data. The client can sanitize, spotlight or hide that payload.           |
| `consequentialHint`    | Misrepresentation of intent | The tool books, buys, transfers, deletes or does anything non-reversible. Agents and browsers can require user confirmation. |
| `readOnlyHint`         | Unnecessary confirmations   | The tool changes no state.                                                                                                   |

None of these is enforced by the API. Server-side authorization still decides whether the action happens.

## Risks to review (§ Key Security and Privacy Risks)

### Prompt injection

Three vectors:

1. **Metadata or description attacks (tool poisoning).** Instructions hidden in a tool's name, description or parameter descriptions steer the agent. Threat actor: a malicious site. Review: descriptions say what the tool does and nothing else.
2. **Output injection.** Instructions in a tool's return value steer later actions. Threat actors: a malicious site, or anyone who can post content the tool returns (reviews, forum posts). Review: tools that return third-party content set `untrustedContentHint`.
3. **Tools as attack targets.** An agent under an attacker's control calls a high-value tool (password reset, transactions). The draft notes that a tool path may have different validation than the UI path for the same action. Review: the tool calls the same server endpoint with the same checks as the UI.

### Misrepresentation of intent

A tool's description is not proof of its behavior, and the user's session lets it make purchases, transfer funds, change settings, share data or delete content. Misalignment can be deliberate (fraud that shifts blame to the agent) or accidental (vague descriptions, undocumented side effects). Review: descriptions mention every side effect; consequential tools set `consequentialHint`; "finalize" actions are separate tools from "prepare" actions (explainer, Best Practices: precise verbs).

### Privacy leakage through over-parameterization

Agents try to fill every requested parameter, possibly from personalization data, history or other sites, so a tool that asks for age, location or health details can silently profile the user and enable cross-site tracking and discrimination. Review: every parameter is needed for the action, and nothing personal is requested "for personalization".

### Same-origin boundaries and private browsing

The draft's same-origin section is still a TODO. For private browsing it says user agents are responsible for keeping private-mode activity from leaking to agents (§ Interaction with Private Browsing Modes).

## Size budgets

The draft enforces only the 128-character name limit and leaves other limits open (§ Restricting maximum input lengths, issue #73). Chrome recommends, subject to change: 500 characters per tool description, 150 per parameter description, 30 per tool or parameter name, and 1,500 per tool output (Chrome tool security guide).

## Review checklist

- [ ] Pages that do not need tools send `Permissions-Policy: tools=()`.
- [ ] Only trusted iframes get `allow="tools"`; `exposedTo` lists only trusted HTTPS origins.
- [ ] Descriptions contain no instructions to the agent beyond what the tool does.
- [ ] Tools returning third-party content set `untrustedContentHint`.
- [ ] Consequential tools set `consequentialHint`, and the server still checks authorization and intent (for example a confirmation step).
- [ ] No tool requests personal attributes it does not need.
- [ ] Tool handlers call the same validated server endpoints as the UI.
