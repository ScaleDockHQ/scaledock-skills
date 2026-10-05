# Versions and upgrades

Read this when choosing a target version, reading an `llms.txt` file or tool written against the 2024 text, or upgrading one. Sources: the v2 proposal text (`nbs/index.qmd` at the pinned commit, published at llmstxt.org), the v1 text (`nbs/index.qmd` at commit `ab0d61d`, the last revision before v2), and the "Changes" page (`nbs/changes.qmd`), listed in [Sources](../SKILL.md#sources).

The proposal has no version numbers beyond "v1" and "v2", no release tags for the text, and no conformance levels. Section names below are the proposal's own headings (Proposal, Format, Existing standards, Example). The `llms-txt` Python package has its own version (0.0.7 at the pin); it is a tool, not a version of the proposal.

## Version lines

| Id   | Line        | Status  | Revision                                                                                        | Posture | Summary                                                                                                                                             |
| ---- | ----------- | ------- | ----------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v2` | llms.txt v2 | current | v2, `date-modified: 2026-08-10`; AnswerDotAI/llms-txt commit `3700a0a` (2026-09-24)             | build   | Same file format as v1. Adds path scoping, `page.md` URLs, `rel="alternate"` and `rel="describedby"` discovery; drops context expansion from scope. |
| `v1` | llms.txt v1 | legacy  | `date: 2024-09-03`; last v1 text at commit `ab0d61d` (2026-06-09, which added the optional BOM) |         | The original proposal: root file, optional subpaths undefined, `page.html.md` only, `Optional` section with mechanical "skip" meaning.              |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

v2 is current with posture build because the only line with text is itself a proposal: it is "open for community input" and the repository hosts "this informal overview" (v2, Next steps). Build it now, but expect the text to move; re-read the pinned commit when refreshing.

## Which version to use

- Default to v2. Every v1 file that follows the v1 Format section is also a valid v2 file, because the section list and its order did not change.
- No line is supported. A v1-era consumer reads a v2 file without trouble; the v2 additions (link relations, `page.md` URLs) are ignored by tools that do not know them.
- Treat a v1-era deployment (for example `llms-ctx.txt` and `llms-ctx-full.txt` files built with `llms_txt2ctx`) as input to an upgrade, not as something to copy into new work.
- There is no preview line. The changes page describes v2 only; the repository has no draft of a v3.

## What changed

### llms.txt v2

From the "Changes" page ("v2 (August 2026)") and a diff of the two `index.qmd` texts:

- **Path scoping.** v1 said the file sits at `/llms.txt` "(or, optionally, in a subpath)" without saying what that meant. v2: a file covers the URLs under its path, and where more than one applies, agents use the most specific (v2, Format; Changes).
- **Markdown page URLs.** v1 allowed only `.md` appended to the full URL (`page.html.md`, or `index.html.md` for URLs without a file name). v2 also allows replacing the extension (`page.md`, or `index.md`) (v2, Proposal; Changes).
- **Discovery.** New: `rel="alternate" type="text/markdown"` points from a page to its markdown version, and `rel="describedby"` points to the `llms.txt` that covers it, as HTML `<link>` elements or an HTTP `Link:` header (v2, Proposal; Changes).
- **Consumption.** v1 made no recommendation on how to process the file and described FastHTML expanding it with `llms_txt2ctx` into `llms-ctx.txt` (without Optional URLs) and `llms-ctx-full.txt` (with them). v2 states the expectation instead: agents view or search the file, then follow the relevant links. Context-expansion tooling "is no longer part of the proposal" (v2, Proposal; Changes).
- **`## Optional`.** v1: a "special meaning", its URLs "can be skipped if a shorter context is needed". v2: still allowed, used "by convention" for secondary links, with no mechanical semantics (v2, Format; Changes).
- **Testing guidance.** v1: "Run a tool that expands your `llms.txt` file into an LLM context file and test a number of language models". v2: "Test your file by asking an agent questions about your content, giving it only your llms.txt as a starting point" (Example).
- **Existing standards.** v2 adds why the file is not a Well-Known URI (RFC 8615): well-known URIs exist only at the origin root, and an `llms.txt` describes the path where it sits (v2, Existing standards).
- **Unchanged.** The Format section list: optional BOM, H1 (the only required section), blockquote summary, non-heading detail sections, H2 file lists of `[name](url): notes` items.

### llms.txt v1

- Published 2024-09-03 by Jeremy Howard as "A proposal to standardise on using an `/llms.txt` file to provide information to help LLMs use a website at inference time" (v1 front matter).
- The optional byte-order mark was added to the Format list on 2026-06-09 (commit `ab0d61d`), before v2.

## Upgrading

### v1 to v2

1. Change the version marker: nothing in the file declares a version, so there is nothing to change in `llms.txt` itself. Update any documentation that describes the v1 behaviour of `## Optional` or context files.
2. Replace removed or renamed parts: stop presenting `llms-ctx.txt` and `llms-ctx-full.txt` as part of the proposal. You may keep publishing them for existing users, but they are a tool output, not something v2 defines. Keep `## Optional` only for links an agent can skip; do not rely on any tool skipping it.
3. Add what v2 introduced: if the file lives in a subpath, check it covers exactly the pages under that path; add `rel="alternate" type="text/markdown"` and `rel="describedby"` links (HTML or `Link:` header) to pages and markdown files; keep existing `page.html.md` URLs working (both forms are valid).
4. Validate against v2: the file still parses with the reference parser and every link resolves (see [`validation.md`](validation.md)).
5. Keep behaviour unchanged: every URL that a v1 consumer followed still returns the same content. An upgrade that breaks `page.html.md` URLs to switch to `page.md` is a regression.

## Preview

No preview line is listed. When the proposal publishes a new version (a "v3" heading on the changes page, or a new `title` in `nbs/index.qmd`): make it current with its own id, make v2 legacy or supported depending on whether files written for it stay valid, and add an upgrade section from the changes page. Re-read `nbs/changes.qmd` and the commit history of `nbs/index.qmd` when refreshing this skill.
