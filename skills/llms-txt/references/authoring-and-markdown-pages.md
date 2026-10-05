# Authoring, markdown pages and discovery

Read this when writing an `llms.txt` file's content, publishing markdown versions of pages, or wiring up discovery links. Rules come from the v2 proposal (Proposal, Format, Example) unless another source is named.

## What goes in the file

- Brief background information, guidance, and links to detailed markdown files (Proposal).
- The file "stays small enough to fit in context. The detail lives behind the links, and is fetched only when needed" (Proposal).
- Links point to LLM-friendly content, such as the markdown versions of pages (Proposal).
- The blockquote carries the key information needed to understand the rest of the file (Format).
- Detail sections explain the project and how to interpret the linked files (Format). The FastHTML example uses them for "Important notes" that stop an agent from making a known mistake (FastAPI syntax, React compatibility) (Example).

Guidelines the proposal gives (Example):

- Use concise, clear language.
- When linking to resources, include brief, informative descriptions.
- Avoid ambiguous terms or unexplained jargon.
- Test your file by asking an agent questions about your content, giving it only your `llms.txt` as a starting point.

Uses the proposal names: mostly software documentation for coding agents; also a business outlining its structure and policies, a personal site answering questions about someone's CV, a school providing course information (Proposal).

## Choosing the path

- Put the file at the root when it describes the whole site; put it in a subpath when it describes only that part, for example `/docs/llms.txt` for documentation (Proposal, Format). FastHTML places its file at `/docs/` "to cover just the documentation pages" (Proposal).
- Several files can coexist; an agent uses the most specific one for a URL (Format). Because an agent may read only that one, make each file self-contained for its path.

## Markdown versions of pages

Pages "with information that agents might need" provide a clean markdown version at the same URL as the original page (Proposal):

| Original URL            | v2 markdown URL (either form)                                                  |
| ----------------------- | ------------------------------------------------------------------------------ |
| `/docs/page.html`       | `/docs/page.html.md` (append `.md`) or `/docs/page.md` (replace the extension) |
| `/docs/` (no file name) | `/docs/index.html.md` or `/docs/index.md`                                      |

- v1 allowed only the append form (`page.html.md`, `index.html.md`); a v1 consumer guesses that form, so keep it working if you already publish it (v1 Proposal; Changes).
- Examples: `https://www.fastht.ml/docs/tutorials/by_example.html` and `…/by_example.html.md`; `https://fastcore.fast.ai/docments.html` and `…/docments.html.md` (Proposal). nbdev projects create `.md` versions of all pages by default (Proposal).
- "Clean markdown" means the page content without the navigation, ads and JavaScript that make HTML hard to convert (Background).

## Discovery with link relations (v2)

The proposal recommends standard link relations so a client can find the files without guessing (Proposal; Changes):

| Relation                                      | Points from                      | Points to                     |
| --------------------------------------------- | -------------------------------- | ----------------------------- |
| `rel="alternate"` with `type="text/markdown"` | a page                           | its markdown version          |
| `rel="describedby"`                           | a page (or its markdown version) | the `llms.txt` that covers it |

Both relations are registered in the IANA Link Relations registry: `alternate` ("Refers to a substitute for this context", defined by HTML) and `describedby` ("Refers to a resource providing information about the link's context", defined by POWDER).

As HTML `<link>` elements in the page head:

```html
<link rel="alternate" type="text/markdown" href="/docs/page.html.md" />
<link rel="describedby" href="/docs/llms.txt" />
```

As an HTTP `Link:` response header (Proposal):

```http
Link: </docs/page.html.md>; rel="alternate"; type="text/markdown", </docs/llms.txt>; rel="describedby"
```

- The header form also works for non-HTML resources, such as the markdown files themselves, and can be added in web server or CDN configuration without changing pages (Proposal).
- Header syntax follows RFC 8288 § 3: `Link = #link-value`, each value `<URI-Reference>` followed by `;`-separated parameters; `rel` and `type` are defined parameters (RFC 8288 § 3, § 3.4.1). Relative targets resolve against the request URL (§ 3.1). Several links can go in one comma-separated field or in separate `Link` fields; the two are equivalent (§ 3.5).
- Because the proposal names markdown files as a use for the header form, a `.md` response can carry `rel="describedby"` to its `llms.txt` even though it has no `<head>`.

## Related files you may meet

- **`llms-ctx.txt` and `llms-ctx-full.txt`.** In v1, FastHTML expanded its `llms.txt` into these two files with `llms_txt2ctx`: the first without the Optional URLs, the second with them (v1 Proposal). v2 removed context expansion from the proposal (Changes). Publishing them is a site's own choice; see [`validation.md`](validation.md#llms_txt2ctx-and-context-files) for how the tool builds them.
- **`llms-full.txt`.** None of the pinned sources defines or mentions a file with this name. Do not describe it as part of the proposal; if a site or a documentation tool publishes one, treat it as that tool's convention.

## Writing checklist

- [ ] One H1 naming the project or site, then a one-paragraph blockquote.
- [ ] Detail text uses paragraphs and lists only, no headings.
- [ ] Each H2 holds only list items of the form `- [name](url)` or `- [name](url): notes`.
- [ ] Every link points to markdown or another LLM-friendly format where one exists.
- [ ] Secondary links sit under `## Optional`.
- [ ] Each linked page has a `.md` version at the same URL, and the page links to it and to the covering `llms.txt`.
