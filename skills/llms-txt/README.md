# llms-txt

An agent skill for the /llms.txt proposal (llmstxt.org): writing, validating and reading `llms.txt` files, with markdown page versions and link-relation discovery, and upgrading from v1.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill llms-txt
```

Then ask your agent to "add an llms.txt for our docs" or "review our llms.txt and markdown pages".

## What it covers

- Where the file lives (`/llms.txt` or a subpath) and which pages each file covers.
- The structure: H1, blockquote summary, detail text, H2 file lists of `[name](https://…): notes` items, and the `## Optional` convention.
- Markdown versions of pages (`page.html.md`, `page.md`, `index.html.md`, `index.md`) and discovery with `rel="alternate"` and `rel="describedby"` links or `Link:` headers.
- Validation: structural and link checks, the reference parser and its limits, `llms_txt2ctx`, and the Lighthouse audit.
- How agents consume the file, and what it is not: a proposal rather than a standard, and not a crawler permission or AI usage mechanism.

## Versions

| Line        | Status                |
| ----------- | --------------------- |
| llms.txt v2 | current (build)       |
| llms.txt v1 | legacy (upgrade from) |

`references/versions.md` says what v2 changed and how to upgrade from v1.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [llmstxt.org](https://llmstxt.org/): the v2 proposal, date-modified 2026-08-10.
- [AnswerDotAI/llms-txt](https://github.com/AnswerDotAI/llms-txt): proposal source, changes page, v1 text, reference parser, tests and `llms_txt2ctx`, commit `3700a0a` (release 0.0.7).
- [llmstxt.org/llms.txt](https://llmstxt.org/llms.txt) and the [`llms_txt2ctx` docs](https://llmstxt.org/intro.html.md).
- [Lighthouse llms.txt audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt): last updated 2026-05-05.
- [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288) and the [IANA Link Relations registry](https://www.iana.org/assignments/link-relations/).

## License

MIT
