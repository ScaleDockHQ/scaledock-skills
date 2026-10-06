# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## GitHub Flavored Markdown

Source: https://github.github.com/gfm/

non-whitespace character after the list marker. However, that is not quite right.

- **GitHub Flavored Markdown Spec.** The idea is that a Markdown-formatted document should be publishable as-is, as plain text, without looking like it’s been marked up with tags or formatting instructions.
- **GitHub Flavored Markdown Spec.** It is natural to think that they, too, must be indented four spaces, but Markdown.pl does not require that.
- **GitHub Flavored Markdown Spec.** What should we do with a list like this?
- **GitHub Flavored Markdown Spec.** For example, how should the following be parsed?
- **GitHub Flavored Markdown Spec.** 2.3 Insecure characters For security reasons, the Unicode character U+0000 must be replaced with the REPLACEMENT CHARACTER ( U+FFFD ).
- **GitHub Flavored Markdown Spec.** The opening sequence of # characters must be followed by a space or by the end of line.
- **GitHub Flavored Markdown Spec.** The optional closing sequence of # s must be preceded by a space and may be followed by spaces only.
- **GitHub Flavored Markdown Spec.** However, the space was required by the original ATX implementation , and it helps prevent things like the following from being parsed as headings: Example 34 #5 bolt #hashtag <p>#5 bolt</p> <p>#hashtag</p> This is not a heading, because the first # is escaped: Example 35 \## foo <p>## foo</p> Contents are parsed as inlines: Example 36 # foo _bar_ \*baz\* <h1>foo <em>bar</em> _baz_</h1> Leading…
