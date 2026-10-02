# Docs (Fumadocs, for people and agents)

The docs app setup, the formats it serves, agent features, the API reference, required pages, SEO, content rules and drift checks.

Applies to product repos with the `docs` surface and to every library repo. Docs always run on Next.js, including when `app` is on Expo.

- **Setup:** Fumadocs on Next.js with Base UI, served at `/docs` through Services. `fumadocs-ui` is installed as `npm:@fumadocs/base-ui`, at the same version as `fumadocs-core`.
- **Formats:**
  - `/llms.txt` and `/llms-full.txt`.
  - Per-page `.md` or `.mdx` routes.
  - `Accept: text/markdown` negotiation, with `Vary: Accept`.
- **Every page** has a copy-as-Markdown button, view options and a last-updated date.
- **Agent features:**
  - The docs MCP (see [`mcp.md`](mcp.md)).
  - Ask AI at `/docs/api/chat`: the AI SDK through the Gateway, with a search tool.
  - A changelog page, rendered from the root `CHANGELOG.md` through `@fumadocs/local-md`.
- **API reference:**
  - `fumadocs-openapi` renders the committed spec. Scalar handles "try it".
  - Library repos add `fumadocs-typescript` and `fumadocs-twoslash`.
- **Required pages:**
  - Every public API.
  - Every CLI command.
  - "Connecting tools": MCP install links and OAuth consent, OpenAPI with Scalar auth, and CLI `login`.
- **SEO:** OG images, `sitemap.ts` and `robots.ts`.
- **Content rules:**
  - Frontmatter `title` and `description`; no `# h1`.
  - Page order comes from `meta.json`.
  - Links use `/docs/<path>`.
  - Fenced code has a language and a `title`.
  - No bare `{`, `}` or `<` in prose.
  - Unbuilt features get a "Coming soon" callout.
- **Drift:** `docs:drift` checks commands, doctor codes, entries and `meta.json` against the code.
