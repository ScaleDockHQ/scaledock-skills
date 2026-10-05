---
name: llms-txt
description: >-
  llms.txt v2 proposal: write, validate and read /llms.txt files that give
  agents a curated markdown map of a site, with clean .md page versions and
  link-relation discovery. Use when adding or reviewing an llms.txt at a site
  root or subpath (/docs/llms.txt), structuring the H1, blockquote summary,
  detail text and H2 file lists of name/url/notes links, using the
  Optional section, publishing page.html.md, page.md or index.html.md
  versions, adding rel="alternate" type="text/markdown" and rel="describedby"
  links or Link headers, parsing llms.txt in an agent or client, running
  llms_txt2ctx or the reference parser, the Lighthouse llms.txt audit, or
  upgrading from llms.txt v1 (2024; llms-ctx.txt and llms-ctx-full.txt
  context files). Covers llmstxt.org by Jeremy Howard (Answer.AI), which is a
  proposal, not a standard. It does not control crawling or AI use; see
  robots-txt and aipref. Triggers: llms.txt, llmstxt.org, llms-full.txt,
  llms-ctx.txt, LLM-friendly docs, markdown version of docs.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# llms.txt

The /llms.txt proposal, written by Jeremy Howard and hosted by Answer.AI at llmstxt.org and in the `AnswerDotAI/llms-txt` repository, defines a markdown file that gives agents a short, curated overview of a site or path and links to LLM-friendly versions of its pages. With this skill the agent writes and validates `llms.txt` files, publishes markdown page versions with discovery links, and reads `llms.txt` as a consumer.

It is a proposal "open for community input", not a standard from a standards body. The proposal reports wide adoption (thousands of sites, documentation platforms generating files, a Chrome Lighthouse audit); say only that much, attributed to it. It is not a crawler permission or AI usage mechanism.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

Section cites use the proposal's headings: Proposal, Format, Existing standards and Example, plus the Changes page. The proposal is informal prose without RFC 2119 keywords.

## Inputs (fill in, or ask before starting)

- Role: publisher (a site that serves `llms.txt` and markdown pages), consumer (an agent or client that reads them), or both.
- Scope: the whole site (`/llms.txt`) or one path (for example `/docs/llms.txt`), and whether other `llms.txt` files exist above or below it.
- Content: which pages, docs or external resources an agent needs, and which are secondary.
- Markdown pages: whether the site can publish `.md` versions, and which URL form it already uses.
- Target version: llms.txt v2 (default, posture build: it is a proposal, so build it and re-check the pin when refreshing). llms.txt v1 is legacy: read it and upgrade from it, never author against it. No preview exists. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check `nbs/changes.qmd` and the commit history of `nbs/index.qmd` for a newer version, and update the pins.

## Invariants

1. **Name and location.** The file is named `llms.txt`, is markdown, and sits at `/llms.txt` or at any subpath (Format). It is a plain path, not a `/.well-known/` URI (Existing standards).
2. **Path scope.** A file covers the URLs under its path; where several apply, the most specific one wins (Format).
3. **Section order.** Optional BOM, then an H1 with the project or site name (the only required section), then an optional blockquote summary, then zero or more detail sections of any markdown type except headings, then zero or more H2-delimited file lists (Format).
4. **File list items.** Each H2 section is a markdown list; each item has a required `[name](https://…)` link, then optionally `:` and notes (Format).
5. **`## Optional` is a convention.** It holds secondary links an agent can skip when context is short. In v2 it has no mechanical meaning (Format; Changes).
6. **Small file, detail behind links.** The file stays small enough to fit in context, and its links point to LLM-friendly content such as markdown page versions (Proposal).
7. **Markdown page URLs.** A page's markdown version lives at the same URL with `.md` appended (`page.html.md`) or the extension replaced (`page.md`); URLs without a file name use `index.html.md` or `index.md` (Proposal).
8. **Discovery uses standard link relations.** `rel="alternate" type="text/markdown"` points to a page's markdown version and `rel="describedby"` to the covering `llms.txt`, as HTML `<link>` elements or an HTTP `Link:` header (Proposal; RFC 8288 § 3).
9. **Not permission.** robots.txt says what access is acceptable; `llms.txt` is guidance used on demand by agents (Existing standards). Never use it to allow or block crawling or AI use.
10. **No unsourced companions.** `llms-ctx.txt` and `llms-ctx-full.txt` are `llms_txt2ctx` output described only by v1; v2 dropped context expansion (Changes). No pinned source defines `llms-full.txt`.

## Workflow

1. **Pick the version.** Use llms.txt v2. If the site or tool follows v1 (context files, `Optional` as a hard skip rule), plan the upgrade (step 8).
   -> [`references/versions.md`](references/versions.md)
   ✓ The target is v2, and any v1 behaviour to change is listed.
2. **Choose scope and path.** Decide root or subpath, and check for other `llms.txt` files on the same host whose scope overlaps.
   -> [`references/format.md`](references/format.md)
   ✓ Each file's path covers exactly the pages it describes, and the most specific file for each page is the right one.
3. **Write the header.** One H1 with the project or site name, a short blockquote with the key facts needed to read the rest, then detail paragraphs or lists with no headings.
   -> [`references/authoring-and-markdown-pages.md`](references/authoring-and-markdown-pages.md)
   ✓ The H1 is the first content after an optional BOM; no heading appears before the first H2.
4. **Write the file lists.** Group links under H2 headings, one `- [name](https://…): notes` item per line, notes brief and informative. Put secondary links under `## Optional`.
   -> [`references/format.md`](references/format.md)
   ✓ Every H2 section contains only link items, and the file reads as a short map rather than a full sitemap.
5. **Publish markdown versions.** Serve clean markdown at `page.html.md` or `page.md` (and `index.html.md` or `index.md`), and point the file's links at them.
   -> [`references/authoring-and-markdown-pages.md`](references/authoring-and-markdown-pages.md)
   ✓ Each linked page's markdown URL returns the page content without navigation or scripts.
6. **Add discovery links.** Add `rel="alternate" type="text/markdown"` and `rel="describedby"` as `<link>` elements, or as a `Link:` header from the server or CDN, including on the `.md` responses.
   -> [`references/authoring-and-markdown-pages.md`](references/authoring-and-markdown-pages.md)
   ✓ Every `alternate` and `describedby` target resolves, and `describedby` names the most specific `llms.txt`.
7. **Validate, or consume.** Run the structural and link checks, parse with the reference parser, ask an agent questions using only the file, and check the Lighthouse audit sees no server error. As a consumer, find the most specific file, read it, then follow only the relevant links.
   -> [`references/validation.md`](references/validation.md)
   ✓ The file parses, every link resolves, `/llms.txt` returns 200 or 404 and never 5xx, and an agent answers core questions from it.
8. **Upgrade** (only when asked). Follow the v1 to v2 steps: keep the file and existing `.md` URLs, stop presenting context files as part of the proposal, add path scoping and discovery links.
   -> [`references/versions.md`](references/versions.md)
   ✓ The file still parses, and every URL a v1 consumer used still returns the same content.

## Verify before done

- [ ] The file is named `llms.txt`, at the root or a subpath that matches the pages it covers (Format).
- [ ] It starts with one H1 (after an optional BOM), then an optional blockquote, then heading-free detail text (Format).
- [ ] Every H2 section is a list of `[name](https://…)` items with optional `: notes`, using `-` bullets so the reference parser accepts it (Format; `miniparse.py`).
- [ ] Secondary links are under `## Optional`, and nothing depends on a tool skipping them (Format; Changes).
- [ ] Linked pages are markdown where available, at `.md` URLs of the same path (Proposal).
- [ ] Discovery links, if added, use `rel="alternate" type="text/markdown"` and `rel="describedby"` with valid RFC 8288 syntax (Proposal; RFC 8288 § 3).
- [ ] No text claims `llms.txt` is a standard, grants or denies crawling, or defines `llms-full.txt` (Existing standards; Next steps).

## Reference index

- **`references/versions.md`**: llms.txt v2 and v1, what v2 changed, and the v1 to v2 upgrade. Load for steps 1 and 8.
- **`references/format.md`**: location, path scope, the section structure, file list syntax, `## Optional`, examples, the parsed data model, and what `llms.txt` is not. Load for steps 2 and 4.
- **`references/authoring-and-markdown-pages.md`**: what to write, markdown page URLs, `alternate` and `describedby` discovery with HTML and `Link:` examples, and the context files. Load for steps 3, 5 and 6.
- **`references/validation.md`**: structural and link checks, the reference parser and its limits, a TypeScript checker, `llms_txt2ctx`, the Lighthouse audit, and how agents consume the file. Load for step 7.

## Related skills

- `robots-txt` for which crawlers may fetch which URLs: `npx skills add ScaleDockHQ/scaledock-skills --skill robots-txt`.
- `aipref` for declaring AI usage preferences such as training: `npx skills add ScaleDockHQ/scaledock-skills --skill aipref`.
- `agents-md` for instructions to coding agents inside a repository: `npx skills add ScaleDockHQ/scaledock-skills --skill agents-md`.
- `agent-skills` for packaging instructions and resources as installable agent skills: `npx skills add ScaleDockHQ/scaledock-skills --skill agent-skills`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [The /llms.txt file, v2 (llmstxt.org)](https://llmstxt.org/): Proposal (informal, open for community input), v2 `date-modified: 2026-08-10`, checked 2026-10-05.
- [llms.txt proposal source, nbs/index.qmd](https://github.com/AnswerDotAI/llms-txt/blob/main/nbs/index.qmd): Proposal source, commit `3700a0a` (2026-09-24; text last changed `6e55a65`, 2026-08-31), checked 2026-10-05.
- [Changes, nbs/changes.qmd](https://github.com/AnswerDotAI/llms-txt/blob/main/nbs/changes.qmd): Proposal change log, "v2 (August 2026)", checked 2026-10-05.
- [The /llms.txt file, v1 text](https://github.com/AnswerDotAI/llms-txt/blob/ab0d61d935207ccf8b87c3c76868205f4d90407c/nbs/index.qmd): Proposal, superseded by v2, `date: 2024-09-03` at commit `ab0d61d` (2026-06-09), checked 2026-10-05.
- [llmstxt.org/llms.txt](https://llmstxt.org/llms.txt): the proposal site's own llms.txt, served 2026-10-05, checked 2026-10-05.
- [AnswerDotAI/llms-txt repository](https://github.com/AnswerDotAI/llms-txt): Repository (README is `nbs/index.qmd`), release 0.0.7 (2026-09-24), checked 2026-10-05.
- [Python module & CLI (llms_txt2ctx)](https://llmstxt.org/intro.html.md): Tool documentation, llms-txt 0.0.7, checked 2026-10-05.
- [llms_txt package source (core.py, miniparse.py)](https://github.com/AnswerDotAI/llms-txt/tree/main/llms_txt): Reference implementation, commit `3700a0a`, checked 2026-10-05.
- [Parser tests, tests/test-parse.py](https://github.com/AnswerDotAI/llms-txt/blob/main/tests/test-parse.py): Reference tests, commit `3700a0a`, checked 2026-10-05.
- [Lighthouse llms.txt audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt): Tool documentation, last updated 2026-05-05, checked 2026-10-05.
- [RFC 8288: Web Linking](https://www.rfc-editor.org/rfc/rfc8288): RFC (Proposed Standard), RFC 8288, checked 2026-10-05.
- [IANA Link Relations registry](https://www.iana.org/assignments/link-relations/): IANA registry, last updated 2026-06-12, checked 2026-10-05.
