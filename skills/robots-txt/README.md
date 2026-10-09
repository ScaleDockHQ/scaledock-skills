# robots-txt

An agent skill for RFC 9309, the Robots Exclusion Protocol: writing and reviewing `/robots.txt`, building conforming crawler-side fetching and matching, addressing AI crawlers by token, and upgrading from the 1994 and 1996 texts.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill robots-txt
```

Then ask your agent to "review our robots.txt against RFC 9309", "block AI training crawlers but stay in search", or "implement robots.txt handling in our crawler".

## What it covers

- File location, encoding and media type, and one file per scheme, host and port.
- User-agent groups and product tokens, group merging and the `*` fallback.
- Allow and disallow rules, longest-match precedence, `*` and `$`, and percent-encoding.
- Other records such as `Sitemap`, and the reported RFC 9309 errata.
- Fetch outcomes (4xx allow all, 5xx or unreachable disallow all, redirects), 24-hour caching and the 500 KiB limit.
- Security considerations: robots.txt is not access control, and User-Agent strings can be spoofed.
- AI crawler tokens as documented by their operators (Anthropic, Apple, Common Crawl, Google, OpenAI and Perplexity), and how robots.txt relates to AI usage preferences and the proposed `Content-Usage` rule.
- Non-RFC extension lines (`Content-Signal` from the Content Signals Policy and RSL's `License` directive): what they mean and why an RFC 9309 parser must not let them end a group.

## Versions

| Line                                  | Status                |
| ------------------------------------- | --------------------- |
| draft-ietf-aipref-attach              | preview (track)       |
| RFC 9309                              | current               |
| draft-koster-robots-00                | legacy (upgrade from) |
| A Standard for Robot Exclusion (1994) | legacy (upgrade from) |

`references/versions.md` says what RFC 9309 changed and how to upgrade from the older texts.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html): RFC (Proposed Standard), RFC 9309, and its [errata](https://www.rfc-editor.org/errata/rfc9309) (four Reported, none Verified).
- [A Standard for Robot Exclusion](https://www.robotstxt.org/orig.html): community convention, June 1994.
- [draft-koster-robots-00](https://www.robotstxt.org/norobots-rfc.txt): expired Internet-Draft, December 1996.
- [draft-ietf-aipref-attach](https://datatracker.ietf.org/doc/draft-ietf-aipref-attach/): Internet-Draft, revision -05.
- [RFC 5234](https://www.rfc-editor.org/rfc/rfc5234): ABNF, Internet Standard.
- Crawler operator pages: [Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers), [OpenAI](https://developers.openai.com/api/docs/bots), [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Apple](https://support.apple.com/en-us/119829), [Common Crawl](https://commoncrawl.org/ccbot) and [Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).
- [Content Signals Policy](https://blog.cloudflare.com/content-signals-policy/): Cloudflare announcement and policy text (CC0), 24 September 2025.
- [RSL 1.0](https://rslstandard.org/rsl): Recommendation, RSL-SPEC-1.0, § 4.4 robots.txt License Association.

## License

MIT
