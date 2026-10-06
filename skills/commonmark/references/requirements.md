# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## CommonMark 0.31.2

Source: https://spec.commonmark.org/0.31.2/

<p>[foo<a href="https://example.com/?search=%5D(uri)">https://example.com/?search=](uri)</a></p>

- **CommonMark Spec.** The idea is that a Markdown-formatted document should be publishable as-is, as plain text, without looking like it’s been marked up with tags or formatting instructions.
- **CommonMark Spec.** It is natural to think that they, too, must be indented four spaces, but Markdown.pl does not require that.
- **CommonMark Spec.** What should we do with a list like this?
- **CommonMark Spec.** For example, how should the following be parsed?
- **CommonMark Spec.** 2.3 Insecure characters For security reasons, the Unicode character U+0000 must be replaced with the REPLACEMENT CHARACTER ( U+FFFD ).
- **CommonMark Spec.** The opening sequence of # characters must be followed by spaces or tabs, or by the end of line.
- **CommonMark Spec.** The optional closing sequence of # s must be preceded by spaces or tabs and may be followed by spaces or tabs only.
- **CommonMark Spec.** However, the space was required by the original ATX implementation , and it helps prevent things like the following from being parsed as headings: Example 64 Try It #5 bolt #hashtag <p>#5 bolt</p> <p>#hashtag</p> This is not a heading, because the first # is escaped: Example 65 Try It \## foo <p>## foo</p> Contents are parsed as inlines: Example 66 Try It # foo _bar_ \*baz\* <h1>foo <em>bar</em>…
