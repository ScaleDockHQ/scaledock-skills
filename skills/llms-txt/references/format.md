# File format, location and scope

Read this when writing or parsing an `llms.txt` file. Rules come from the v2 proposal (sections Proposal, Format, Existing standards, Example) unless another source is named. The proposal is informal prose: it uses no RFC 2119 keywords, so "must" below means "the Format section lists it as the structure", not a normative MUST.

## Name, location and scope

- The file is named `llms.txt` and is markdown (Proposal, Format).
- It sits at the root path `/llms.txt` of a website, or at any subpath, for example `/docs/llms.txt` (Format).
- A file covers the URLs under its path: `/docs/llms.txt` covers everything in `/docs/` (Proposal, Format).
- Where more than one file applies to a URL, agents use the most specific one (Format).
- The location is a plain path, not a Well-Known URI. The proposal rejects `/.well-known/` (RFC 8615) because well-known URIs exist only at the origin root, while an author who controls only a path (for example a GitHub Pages project site) can still publish an `llms.txt` there (Existing standards).

## Structure

A conforming file contains these sections, in this order (Format):

| #   | Section         | Required         | Content                                                                                                                               |
| --- | --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Byte-order mark | no               | An optional BOM.                                                                                                                      |
| 2   | H1              | **yes**          | The name of the project or site. The only required section.                                                                           |
| 3   | Blockquote      | no               | A short summary of the project, "containing key information necessary for understanding the rest of the file".                        |
| 4   | Detail sections | no, zero or more | Markdown of any type **except headings** (paragraphs, lists, …): more detail about the project and how to interpret the linked files. |
| 5   | File lists      | no, zero or more | Sections delimited by H2 headers, each containing a "file list" of URLs where further detail is available.                            |

### File list entries

Each file list is a markdown list. Each item contains (Format):

- a required markdown hyperlink `[name](url)`;
- then, optionally, a `:` and notes about the file.

```markdown
- [FastHTML quick start](https://fastht.ml/docs/tutorials/quickstart_for_web_devs.html.md): A brief overview of many FastHTML features
- [Todo app](https://host/adv_app.py)
```

The H2 heading text is free: the examples use `Docs`, `Examples` and `Optional` (Format, Example). Links may point off-site; the FastHTML example links to GitHub and a gist (Example), and the proposal lists "URLs to external sites" as something a sitemap lacks but `llms.txt` can carry (Existing standards).

### The `## Optional` section

- v2: "used, by convention, for secondary information: links an agent can skip when a shorter context is needed" (Format). It has no mechanical semantics any more (Changes, v2).
- v1 gave it a "special meaning": tools could skip its URLs to build a shorter context. The `llms_txt2ctx` tool still does: it leaves out a section named exactly `Optional` unless asked to include it (`llms_txt/core.py`, `mk_ctx`). See [`validation.md`](validation.md#llms_txt2ctx-and-context-files).

## Mock example (Format)

```markdown
# Title

> Optional description goes here

Optional details go here

## Section name

- [Link title](https://link_url): Optional link details

## Optional

- [Link title](https://link_url)
```

## Full example (Example)

A cut-down version of the FastHTML file:

```markdown
# FastHTML

> FastHTML is a python library which brings together Starlette, Uvicorn, HTMX, and fastcore's `FT` "FastTags" into a library for creating server-rendered hypermedia applications.

Important notes:

- Although parts of its API are inspired by FastAPI, it is _not_ compatible with FastAPI syntax and is not targeted at creating API services
- FastHTML is compatible with JS-native web components and any vanilla JS library, but not with React, Vue, or Svelte.

## Docs

- [FastHTML quick start](https://fastht.ml/docs/tutorials/quickstart_for_web_devs.html.md): A brief overview of many FastHTML features
- [HTMX reference](https://github.com/bigskysoftware/htmx/blob/master/www/content/reference.md): Brief description of all HTMX attributes, CSS classes, headers, events, extensions, js lib methods, and config options

## Examples

- [Todo list application](https://github.com/AnswerDotAI/fasthtml/blob/main/examples/adv_app.py): Detailed walk-thru of a complete CRUD app in FastHTML showing idiomatic use of FastHTML and HTMX patterns.

## Optional

- [Starlette full documentation](https://gist.githubusercontent.com/jph00/809e4a4808d4510be0e3dc9565e9cbd3/raw/9b717589ca44cedc8aaf00b2b8cacef922964c0f/starlette-sml.md): A subset of the Starlette documentation useful for FastHTML development.
```

The proposal site's own file, `https://llmstxt.org/llms.txt`, is a second real example: an H1, a one-line blockquote and one `## Docs` list whose links point at `.md` pages.

## Data model

The reference parser (`llms_txt/miniparse.py`, `parse_llms_txt`) turns a file into:

| Key        | From                                                                                                              |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| `title`    | The H1 text.                                                                                                      |
| `summary`  | The first blockquote line, or absent.                                                                             |
| `info`     | Everything between the summary and the first H2.                                                                  |
| `sections` | A map from each H2 heading text to a list of `{title, url, desc}` items; `desc` is the text after `:`, or absent. |

## What it is not

- **Not a crawler permission or usage-preference mechanism.** robots.txt "lets automated tools know what access to a site is considered acceptable"; `llms.txt` is "used on demand, when an agent needs information about a topic while assisting a user" (Existing standards). The proposal says it "can complement robots.txt by providing context for allowed content" (Existing standards); it does not grant or deny anything. Use the `robots-txt` and `aipref` skills for access and usage preferences.
- **Not a sitemap.** A sitemap lists all indexable human-readable pages; it often lacks LLM-readable versions, omits external URLs, and covers more than fits in a context window (Existing standards).
- **Not a training-data signal by design.** The authors expected use mainly at inference time, "though training runs could take advantage of the information too" (Existing standards).
- **Not a standard.** It is a proposal "open for community input", hosted as "this informal overview" in a GitHub repository (Next steps).
