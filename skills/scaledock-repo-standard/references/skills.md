# Skills

Which agent skills every repo installs, where they live, and when a repo must not vendor them.

## Location

- Skills live in `.agents/skills`, are symlinked from `.claude/skills` and `.cursor/skills`, and are pinned in `skills-lock.json`. Install with `pnpm dlx skills add <owner/repo> --skill <name> -y`; if a name moved, use find-skills.
- `.cursorignore` excludes bulky skill assets.
- **Library repos** (they ship their own consumer skills) never vendor third-party skills in `.agents/skills`, `.claude/skills` or `skills/`, because those are `npx skills add` discovery roots. Their maintainers install third-party skills at user level.

## Install

- **Always:**
  - `vercel-labs/skills`: find-skills
  - `vercel/turborepo`: turborepo
  - `vercel/vercel`: vercel-cli
  - `vercel-labs/vercel-plugin`: env-vars, vercel-functions, routing-middleware, ai-gateway, flags-sdk, vercel-sandbox, vercel-queues
  - `vercel-labs/agent-skills`: deploy-to-vercel, writing-guidelines
  - `mattpocock/skills`: domain-modeling, tdd, writing-for-agents
  - `delexw/claude-code-misc`: oxlint
  - `brianlovin/agent-config`: knip
  - `vercel-labs/portless`: portless
  - `vercel-labs/agent-browser`: agent-browser
  - `currents-dev/playwright-best-practices-skill`: playwright-best-practices
  - `open-circle/agent-skills`: valibot
  - `wshobson/agents`: typescript-advanced-types
- **Next.js:**
  - `aurorascharff/nextjs-app-architecture-skill`: nextjs-app-architecture (latest version; in upgrade mode, update an older vendored copy)
  - `vercel/next.js`: next-dev-loop, next-cache-components-adoption, next-cache-components-optimizer, next-partial-prefetching-adoption, next-partial-prefetching-optimizer
  - `vercel-labs/vercel-plugin`: next-cache-components
  - `vercel-labs/agent-skills`: vercel-react-best-practices, vercel-composition-patterns, web-design-guidelines
  - `pproenca/dot-skills`: nuqs
- **UI:** `shadcn/ui` shadcn; ReUI (ReUI MCP `get_agent_skill`); `emilkowalski/skills` emil-design-eng.
- **AI:** `vercel/ai` ai-sdk; `vercel/ai-elements` ai-elements; `vercel/workflow` workflow; `vercel/chat` chat-sdk (only with a bot).
- **Database:** `supabase/agent-skills` supabase and supabase-postgres-best-practices; `supabase/server` supabase-server; the better-supabase skills (`npx skills add ScaleDockHQ/better-supabase`).
- **Permissions:** `npx skills add ScaleDockHQ/PermDock`.
- **API, MCP and CLI:** `middleapi/orpc` orpc, orpc-contract, orpc-openapi; `anthropics/skills` mcp-builder.
- **Email:** `resend/react-email` react-email.
