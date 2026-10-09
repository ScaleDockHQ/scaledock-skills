# scaledock-agent-ready-web

An agent skill that makes a ScaleDock website agent-ready: pages that mean the same thing as HTML, markdown and structured data, discoverable APIs and agent tools, and explicit rules for AI crawlers and content use.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill scaledock-agent-ready-web
```

It asks you to install the spec skills it builds on: `robots-txt`, `llms-txt`, `http-semantics`, `schema-org`, `json-ld`, `well-known-uris`, `sitemaps`, `security-txt`, `web-bot-auth`, `aipref`, `content-signals`, `rsl` and `tdmrep`, plus `webmcp`, `a2a` and `owasp-llm` when they apply.

Then ask your agent to "make our marketing site agent-ready", "add markdown versions of our docs pages", or "audit this site for AI agents".

## Rules

- The spec skills decide protocol details; this skill decides which apply and in what order.
- All meaning is in the first HTML payload; JavaScript only enhances.
- robots.txt states an explicit, per-crawler AI policy, and `/llms.txt` maps the site.
- Every page has a markdown twin at a `.md` URL and through `Accept: text/markdown`, with `Vary: Accept` and `text/markdown; charset=utf-8`.
- Every page has one schema.org JSON-LD `@graph`.
- Public APIs are listed at `/.well-known/api-catalog` (RFC 9727); WebMCP tools mirror plain HTTP endpoints; an A2A Agent Card describes any agent skills.
- Content rights say the same thing in `aipref`, Content Signals, RSL and TDMRep.
- Bots are identified by Web Bot Auth signatures, not User-Agent strings.
- A sitemap and `security.txt` are published, and no instruction to agents is hidden from people.

## References

- [`references/checklist.md`](references/checklist.md): one `curl`-based check per rule, with the expected result.
- [`references/content-negotiation.md`](references/content-negotiation.md): markdown twins, `Accept` negotiation, `Vary`, caching, alternate and canonical links, and 406 versus falling back to HTML.

## License

MIT
