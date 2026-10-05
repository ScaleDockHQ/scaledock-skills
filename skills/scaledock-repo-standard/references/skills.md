# Skills

Which agent skills every repo installs, where they live, and how they are committed and kept current.

Location applies to every repo kind. The install list applies to product repos; library repos install `find-skills` and the entries that match their stack, and tooling repos install `find-skills` only.

## Location

- Skills live in `.agents/skills`, are symlinked from `.claude/skills` and `.cursor/skills`, and are pinned in `skills-lock.json`. Install with `pnpm dlx skills add <owner/repo> --skill <name> -y`; if a name moved, use find-skills.
- Commit `.agents/`, the `.claude/skills` and `.cursor/skills` symlinks, and `skills-lock.json`, so every teammate, cloud agent and CI run gets the same skills from a clone. Never add them to `.gitignore`; a skill installed only on one machine is missing for everyone else.
- Manage skills only with the CLI: `pnpm dlx skills add` to install, `pnpm dlx skills update -p -y` to update, `pnpm dlx skills remove` to remove. Never copy, edit or delete skill folders by hand, so `skills-lock.json` lists every installed skill.
- `.cursorignore` excludes bulky skill assets.
- **Repos that publish skills** (library repos and skills repos) commit installed skills the same way. `npx skills add <repo>` skips any skill in `.agents/skills`, `.claude/skills` or another agent folder that the repo's `skills-lock.json` tracks, so consumers are never offered them. A hand-copied skill is not in the lock and is offered, so the CLI-only rule is what keeps these repos safe. Never put a third-party skill in `skills/` or at the repo root; those hold the repo's own skills. After any skill change, run `pnpm dlx skills add . --list` and check that it lists only the repo's own skills.

## Install

- **Always:**
  - `vercel-labs/skills`: find-skills
  - `vercel/turborepo`: turborepo
  - `vercel/vercel`: vercel-cli
  - `vercel-labs/vercel-plugin`: env-vars, vercel-functions, vercel-services, routing-middleware, ai-gateway, flags-sdk, vercel-sandbox, queues
  - `vercel-labs/agent-skills`: deploy-to-vercel, writing-guidelines
  - `mattpocock/skills`: domain-modeling, tdd, writing-for-agents
  - `delexw/claude-code-misc`: oxlint
  - `brianlovin/agent-config`: knip
  - `vercel-labs/portless`: portless
  - `vercel-labs/agent-browser`: agent-browser (the CLI at 0.27 or later, for `--enable react-devtools`)
  - `currents-dev/playwright-best-practices-skill`: playwright-best-practices
  - `open-circle/agent-skills`: valibot
  - `wshobson/agents`: typescript-advanced-types
- **Next.js:**
  - `aurorascharff/nextjs-app-architecture-skill`: nextjs-app-architecture (latest version; in upgrade mode, update an older vendored copy)
  - `vercel/next.js`: next-dev-loop, next-cache-components-adoption, next-cache-components-optimizer, next-partial-prefetching-adoption, next-partial-prefetching-optimizer
  - The Next.js knowledge skills are retired: the managed AGENTS.md block points agents at the bundled docs instead. Remove any vendored copy, and `vercel-labs/vercel-plugin` next-cache-components, which is no longer published.
  - `vercel-labs/agent-skills`: vercel-react-best-practices, vercel-composition-patterns, web-design-guidelines
  - `pproenca/dot-skills`: nuqs
- **Expo:**
  - `expo/skills`: expo-overview, expo-project-structure, expo-router, expo-ui, expo-native-ui, expo-design-system, expo-animation, expo-data-fetching, expo-dev-client, expo-dom, expo-examples, expo-upgrade
  - `software-mansion/argent`: the argent simulator, device, debugger, profiler and QA-flow skills
  - `uni-stack/uniwind`: uniwind
  - `vercel-labs/agent-skills`: vercel-react-native-skills
- **UI:** `shadcn/ui` shadcn; ReUI (ReUI MCP `get_agent_skill`); `emilkowalski/skills` emil-design-eng.
- **AI:** `vercel/ai` ai-sdk; `vercel/ai-elements` ai-elements; `vercel/workflow` workflow; `vercel/chat` chat-sdk (only with a bot).
- **Database:** `supabase/agent-skills` supabase and supabase-postgres-best-practices; `supabase/server` supabase-server; the better-supabase skills (`npx skills add ScaleDockHQ/better-supabase`).
- **Permissions:** `npx skills add ScaleDockHQ/PermDock`.
- **API, MCP and CLI:** `middleapi/orpc` orpc, orpc-contract, orpc-openapi; `anthropics/skills` mcp-builder.
- **Standards** (`ScaleDockHQ/scaledock-skills`), per surface:
  - `api`: scaledock-http-api, http-semantics, openapi, json-schema, openapi-overlay, problem-details, ratelimit-headers, standard-schema.
  - `mcp`: scaledock-mcp-server, mcp, mcp-authorization, oauth, jwt, problem-details; mcp-apps when tools ship interactive views.
  - Agents (AI SDK or another agent runtime): scaledock-agent-permissions, owasp-agentic, opentelemetry-genai, plus a2a, webmcp, ag-ui or ap2 for the surfaces the product has.
  - Enterprise SSO or SCIM: scaledock-enterprise-identity, openid-connect, saml, webauthn, scim, shared-signals.
  - Web (`app`, `docs`, `marketing`): wcag, wai-aria, content-security-policy, http-cookies.
  - Repo (agent files, supply chain and security disclosure): agent-skills, agents-md, openssf-baseline, security-txt, slsa, cyclonedx, eu-cra.
  - Data (shared schemas, dates and messages): ecmascript-temporal, messageformat, json-schema.
  - Docs (`docs`): llms-txt.
  - Email (the product sends mail): dmarc, dkim, spf, list-unsubscribe.
  - Any other open spec the repo implements: install its spec skill by name (`pnpm dlx skills add ScaleDockHQ/scaledock-skills --list`).
- **Email:** `resend/react-email` react-email.
