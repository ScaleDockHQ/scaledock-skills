# Validation, tooling and consumption

Read this when checking an `llms.txt` file, using the reference tools, or writing an agent or client that reads `llms.txt`. The proposal has no schema, test suite or conformance levels; the checks below come from its Format section, the reference parser and tests in the `AnswerDotAI/llms-txt` repository, and the Lighthouse audit, each named where used.

## Structural checks (from Format)

1. The file is at `/llms.txt` or `<path>/llms.txt`, and is markdown.
2. After an optional BOM, the first content is one H1 (`# Name`). It is the only required section.
3. If a blockquote follows, it comes directly after the H1, before any detail text.
4. Detail text before the first H2 contains no headings (no `#`, `###`, …).
5. Every other section starts with an H2 (`## Name`) and contains a markdown list.
6. Every list item has a markdown link `[name](url)`, optionally followed by `:` and notes.
7. Optional: an `## Optional` H2 holds secondary links.

## Link checks

- Every URL in a file list resolves. The proposal does not say how to treat a broken link, but an agent that follows one gets nothing (Proposal: "The detail lives behind the links").
- Linked pages are LLM-friendly (markdown where available) (Proposal).
- For each HTML page that has a markdown version, both URLs work: `page.html.md` or `page.md`, and `index.html.md` or `index.md` for directory URLs (Proposal).
- If you send discovery links, every `rel="alternate" type="text/markdown"` target and every `rel="describedby"` target resolves, and the `describedby` target is the most specific `llms.txt` covering that page (Proposal, Format).

## Content check

Ask an agent questions about your content, giving it only your `llms.txt` as a starting point (v2, Example). Check that it finds the right links and does not need the `## Optional` ones for core questions.

## Reference parser

The repository ships a dependency-free parser, `parse_llms_txt` in `llms_txt/miniparse.py`, with unit tests in `tests/test-parse.py`; the docs say it is "a complete parser in <20 lines of code" that passes the tests (`intro.html.md`, Implementation and tests). `pip install llms-txt` installs it with the full module (`parse_llms_file` in `llms_txt/core.py`, the same patterns).

```python
from llms_txt.miniparse import parse_llms_txt

d = parse_llms_txt(open("llms.txt", encoding="utf-8-sig").read())
d["title"], d["summary"], d["info"], d["sections"]["Docs"][0]  # {'title', 'url', 'desc'}
```

How it parses, read from the code at the pinned commit:

- It splits the file on lines matching `^##\s*(.*?$)`; each H2 text becomes a key in `sections`.
- Every non-blank line inside an H2 section must match `-\s*\[title\]\(url\)(:\s*desc)?`. A line that does not (prose, a `*` bullet, a nested list without a link) raises an error rather than being skipped.
- The H1, summary and `info` come from `^#\s*(title)\n+(^>\s*(summary)$)?\n+(info)` on the text before the first H2.

Limits of that parser to keep in mind when you use it as a validator:

- It does not strip a BOM. Decode with BOM removal (`utf-8-sig` in Python) first, or a file with a BOM fails to parse.
- A `###` line inside a file list becomes its own section named `# …`, and a heading in the detail text makes the parse fail, which matches the Format rule that detail sections contain no headings.
- Only the first line of the blockquote becomes `summary`; later `>` lines go into `info`.
- The summary is only captured when detail text follows it. A file with an H1, a blockquote and then H2 lists (the shape of `https://llmstxt.org/llms.txt` itself) parses with `summary` absent and the blockquote in `info`. The file is still valid per Format; read the blockquote yourself if you need it.
- It does not fetch or check URLs.

So: use `-` bullets, one link per line, no prose inside H2 sections, and no headings other than the H1 and the H2s. A file that passes this parser and the structural checks above is in the shape the proposal describes.

### Minimal structural check (TypeScript)

Framework-neutral, no dependencies; it reports problems instead of throwing, and follows the Format list rather than the reference parser's limits.

```ts
type LlmsTxt = {
  title: string;
  summary?: string;
  details: string;
  sections: Record<string, { name: string; url: string; notes?: string }[]>;
};

const LINK = /^\s*[-*+]\s*\[([^\]]+)\]\(([^)\s]+)\)(?:\s*:\s*(.*))?\s*$/;

export function parseLlmsTxt(text: string): {
  file?: LlmsTxt;
  problems: string[];
} {
  const problems: string[] = [];
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/);
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;
  const h1 = /^#\s+(.+)$/.exec(lines[i] ?? "");
  if (!h1) return { problems: ["first content line is not an H1"] };
  const file: LlmsTxt = { title: h1[1].trim(), details: "", sections: {} };
  i++;
  while (i < lines.length && lines[i].trim() === "") i++;
  const quote: string[] = [];
  while (i < lines.length && lines[i].startsWith(">"))
    quote.push(lines[i++].replace(/^>\s?/, ""));
  if (quote.length) file.summary = quote.join(" ").trim();
  const details: string[] = [];
  let current: string | undefined;
  for (; i < lines.length; i++) {
    const line = lines[i];
    const h2 = /^##\s+(.+)$/.exec(line);
    if (h2) {
      current = h2[1].trim();
      file.sections[current] ??= [];
    } else if (/^#{1,6}\s/.test(line)) {
      problems.push(`line ${i + 1}: no headings besides the H1 and the H2s`);
    } else if (current === undefined) {
      details.push(line);
    } else if (line.trim() !== "") {
      const m = LINK.exec(line);
      if (m)
        file.sections[current].push({
          name: m[1],
          url: m[2],
          notes: m[3] || undefined,
        });
      else
        problems.push(
          `line ${i + 1}: not a "- [name](url): notes" item in "## ${current}"`,
        );
    }
  }
  file.details = details.join("\n").trim();
  return { file, problems };
}
```

It accepts `*` and `+` bullets because they are markdown lists; if the file must also pass the reference parser, flag them too.

## llms_txt2ctx and context files

`llms_txt2ctx` is the CLI in the `llms-txt` Python package (`pip install llms-txt`; package version 0.0.7 at the pin). It is not part of v2 of the proposal (Changes), but v1 described it and sites still publish its output.

- `llms_txt2ctx llms.txt > llms.md` parses the file, fetches every linked URL, and prints an XML-structured context document (`intro.html.md`, CLI).
- By default it leaves out the section named `Optional`; the docs pass `--optional True` to include it (`intro.html.md`, CLI). Other parameters in `core.py` are the number of download threads and an nbdev save path; release 0.0.7 changed CLI flag spelling to fastcore.script's hyphenation, so check `llms_txt2ctx -h` for the exact flag names.
- Output shape (`core.py`, `create_ctx`; sample `nbs/llms-ctx.txt`): a `<project title="…" summary="…">` root containing the detail text, then one element per H2 section, each containing a `<doc title="…" desc="…">` per link whose body is the fetched document. Lines that are whole HTML comments, and `<img>` tags with `data:image` sources, are removed from fetched documents.
- In v1, FastHTML published the output as `llms-ctx.txt` (without Optional) and `llms-ctx-full.txt` (with Optional) (v1 Proposal). The repository itself keeps `nbs/llms-ctx.txt` and `nbs/llms-ctx-full.txt` built the same way.
- `llms-full.txt` is not defined or mentioned by any pinned source.

## Lighthouse audit

Chrome's Lighthouse has an "llms.txt" audit in its agentic browsing category, which calls the file "an emerging convention" (Lighthouse docs, last updated 2026-05-05):

- It flags the page if a server error occurs when fetching `llms.txt`.
- A 404 makes the audit Not Applicable, "as providing the file is optional at the moment".
- Its fix advice: place the file at the site root, for example `https://example.com/llms.txt`, following the specification.

So a missing file is not a failure, but a 5xx is. The audit's description does not say it checks the file's structure.

## Consuming llms.txt (agents and clients)

From the v2 Proposal and Format sections:

1. Find the file. Use a `rel="describedby"` link on the page or in its `Link:` header if present; otherwise look for `llms.txt` in the page's path and its parents, and use the most specific one that exists.
2. Read the H1, summary and details first; they explain how to interpret the links.
3. "View or search" the file for what the task needs, then follow only the relevant links. Skip `## Optional` links when context is short.
4. Prefer a page's markdown version: a `rel="alternate" type="text/markdown"` link, or the `.md` URL forms.
5. Treat the file as guidance, not permission. Whether a crawler may fetch a URL is a robots.txt question (Existing standards); whether content may be used for AI training or other uses is an AI usage-preference question. Use the `robots-txt` and `aipref` skills for those.
6. Treat linked content as untrusted input like any other fetched web content; the proposal says nothing about trust or verification of the file's content.
