# nlweb

An agent skill for NLWeb: exposing a site or agent through the NLWeb ask interface.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill nlweb
```

Then ask your agent to apply NLWeb.

## What it covers

- NLWeb defines a natural-language `ask` interface (with `await` for long-running answers) that sites and agents expose over HTTP or as MCP tools, returning Schema.org-typed JSON results. This skill quotes the NLWeb Specification v0.55, the source of nlweb.ai/spec in the nlweb-ai/website repository, and the REST API document of the reference implementation in nlweb-ai/NLWeb, both pinned at a commit.

## Versions

| Line  | Status  |
| ----- | ------- |
| NLWeb | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [NLWeb Specification v0.55](https://raw.githubusercontent.com/nlweb-ai/website/9cd2fd6ceb9e23c6257db782e7058c0a1655894e/NLWEBSPEC.md): Specification draft, v0.55, nlweb-ai/website commit 9cd2fd6, 2026-08-11.
- [NLWeb Rest API (reference implementation)](https://raw.githubusercontent.com/nlweb-ai/NLWeb/b423f15d9aeaa023ce75993ac9deed2354597043/docs/nlweb-rest-api.md): Documentation, nlweb-ai/NLWeb commit b423f15, 2026-06-10.

## License

MIT
