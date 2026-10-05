---
name: robots-txt
description: >-
  robots.txt RFC 9309 Robots Exclusion Protocol: write, parse and review
  robots.txt files and crawler logic with correct matching, fetching and
  caching. Use when writing or auditing a site's /robots.txt, building or
  reviewing a crawler, robots.txt parser or matcher, or deciding how to address
  AI crawlers: user-agent groups and product tokens, allow and disallow rules,
  longest-match precedence, the * and $ special characters, percent-encoding,
  4xx (allow all) versus 5xx (disallow all) handling, redirects, the 24-hour
  cache, the 500 KiB parsing limit, Sitemap and other records, Crawl-delay, and
  why robots.txt is not access control. Covers RFC 9309 (current), the 1994 A
  Standard for Robot Exclusion and the 1996 draft-koster-robots-00 (legacy,
  upgrade from), and tracks the draft-ietf-aipref-attach Content-Usage rule as
  a preview. Triggers: robots.txt, robots exclusion protocol, REP, RFC 9309,
  user-agent, disallow, GPTBot, Google-Extended, ClaudeBot, CCBot,
  Applebot-Extended, block AI crawlers, Content-Usage.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# robots.txt (Robots Exclusion Protocol)

RFC 9309, an IETF Standards Track RFC from September 2022, specifies the Robots Exclusion Protocol that Martijn Koster first defined in 1994: a `/robots.txt` file of user-agent groups and allow and disallow rules that crawlers are requested to honor. With this skill the agent writes and reviews robots.txt files, builds conforming crawler-side fetching, parsing and matching, and addresses AI crawlers by their documented product tokens.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: site operator (writes `/robots.txt`), crawler or parser implementer (fetches, parses and matches), or reviewer.
- Target version: RFC 9309 (default). A Standard for Robot Exclusion (1994) and draft-koster-robots-00 are legacy: read files and code written for them and upgrade, never author against them. draft-ietf-aipref-attach is a preview (posture: track): do not emit `Content-Usage` rules or depend on them yet. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check the RFC Editor entry and errata for RFC 9309, check Datatracker for a newer draft-ietf-aipref-attach revision or an RFC that updates RFC 9309, re-read each crawler operator's page, and update the pins.
- Crawlers to address: the product tokens of the crawlers the operator wants to treat differently, for example AI training or AI search crawlers, taken from each operator's own documentation.
- Hosts: every scheme, host and port that serves content, because each has its own `/robots.txt` (§ 2.3).

## Invariants

1. **Location and format.** The rules live at `/robots.txt` (all lowercase) in the top-level path of the service, `scheme:[//authority]/robots.txt`, UTF-8 encoded, as `text/plain` (§ 2.3).
2. **Product tokens.** A `user-agent` value contains only letters, `_` and `-` (§ 2.2.1), or is `*` (§ 2.2). A crawler's token SHOULD be a substring of the User-Agent it sends (§ 2.2.1).
3. **Group selection.** Crawlers MUST match the group case-insensitively by product token; all groups that match MUST be merged into one; only when none matches does the `*` group apply; with neither, no rules apply (§ 2.2.1).
4. **Longest match wins.** Matching starts at the first octet of the path; the rule with the most matching octets MUST be used; on an equivalent allow and disallow, allow SHOULD win; no match means allowed; `/robots.txt` is always allowed (§ 2.2.2).
5. **Percent-encoding before comparison.** Non-ASCII and reserved octets MUST be percent-encoded in both the URI and the rule; percent-encoded unreserved ASCII in the URI MUST be decoded before comparison (§ 2.2.2).
6. **Special characters.** Crawlers MUST support `#` (comment), `$` (end of pattern) and `*` (zero or more of any character); a literal `*` or `$` in a path is written `%2A` or `%24` (§ 2.2.3).
7. **Other records do not break groups.** Crawlers MAY read records such as `Sitemap`, but parsing them MUST NOT interfere with defined records; a `Sitemap` line MUST NOT end a group (§ 2.2.4).
8. **Fetch outcomes.** Success: follow the parseable rules (§ 2.3.1.1). Follow at least five redirects, applying the result to the initial authority (§ 2.3.1.2). 4xx: the crawler MAY access anything (§ 2.3.1.3). 5xx or network error: MUST assume complete disallow (§ 2.3.1.4).
9. **Parse leniently.** Crawlers MUST try to parse every line and MUST use the parseable rules (§ 2.3.1.5); rules before the first `user-agent` line SHOULD be ignored (§ 2.2.2).
10. **Cache at most 24 hours.** A cached copy SHOULD NOT be used for more than 24 hours unless the file is unreachable (§ 2.4).
11. **Parse at least 500 KiB.** Crawlers SHOULD impose a parsing limit, and it MUST be at least 500 kibibytes (§ 2.5).
12. **Not access control.** The rules are not a form of access authorization (§ 1); listing a path makes it discoverable, so protect private paths with real security such as HTTP authentication (§ 3).

## Workflow

1. **Pick the version.** Use RFC 9309. If the file or crawler follows the 1994 or 1996 text, plan the upgrade (step 8).
   -> [`references/versions.md`](references/versions.md)
   ✓ The target is RFC 9309, and no `Content-Usage` rule is emitted while the preview posture is track.
2. **Decide what robots.txt is for here.** Crawl control only. Anything that must stay private gets authentication or another access control, not a `Disallow` line (§ 1, § 3).
   -> [`references/syntax-and-matching.md`](references/syntax-and-matching.md)
   ✓ No path is listed in robots.txt as its only protection, and no secret path is revealed by listing it.
3. **Write the groups and rules.** One group per crawler or set of crawlers with the same policy; a `*` group for everyone else. Remember a crawler with its own group ignores the `*` group, so repeat the restrictions it should keep (§ 2.2.1).
   -> [`references/syntax-and-matching.md`](references/syntax-and-matching.md)
   ✓ Every pattern starts with `/` (or is empty), every token is letters, `_` and `-` only, and each test URL resolves to the expected allow or disallow under longest match.
4. **Address AI crawlers by documented token.** Look up each operator's token and what it controls (training, search, user-initiated fetches), then write a group per token.
   -> [`references/crawlers-and-ai.md`](references/crawlers-and-ai.md)
   ✓ Each token used is spelled as the operator documents it, and the operator page and checked date are recorded.
5. **Serve the file correctly.** Serve `/robots.txt` on every host as UTF-8 `text/plain` with a 2xx, keep it under 500 KiB, and make it return 4xx (not 5xx) when you mean "no rules" (§ 2.3, § 2.3.1, § 2.5).
   -> [`references/fetching-and-caching.md`](references/fetching-and-caching.md)
   ✓ A request for `/robots.txt` on each host returns the intended status, and a 5xx is never the steady state.
6. **Implement the crawler side** (crawler role). Fetch, follow up to five redirects, map the status to allow-all, rules or disallow-all, cache up to 24 hours, cap parsing at no less than 500 KiB, and match with longest match after percent-normalization.
   -> [`references/fetching-and-caching.md`](references/fetching-and-caching.md), [`references/syntax-and-matching.md`](references/syntax-and-matching.md)
   ✓ The RFC 9309 § 5 examples give the expected results, and 404, 503 and a redirect loop each give the outcome in invariant 8.
7. **Review security.** Treat the file as untrusted input, reject out-of-bound characters, bound memory, and remember that User-Agent strings can be spoofed (§ 3).
   -> [`references/fetching-and-caching.md`](references/fetching-and-caching.md), [`references/crawlers-and-ai.md`](references/crawlers-and-ai.md)
   ✓ The parser has a size cap of at least 500 KiB and no crawler identity is trusted from the User-Agent alone.
8. **Upgrade** (only when asked). Follow the legacy-to-RFC 9309 steps: re-check rule order, literal `*` and `$`, blank-line grouping, error handling and cache lifetime.
   -> [`references/versions.md`](references/versions.md)
   ✓ Every test URL gets the same intended result under RFC 9309 as the author meant under the old text.

## Verify before done

- [ ] `/robots.txt` is at the top-level path of each host, lowercase, UTF-8, `text/plain` (§ 2.3).
- [ ] Every `user-agent` value is `*` or matches `[A-Za-z_-]+` (§ 2.2, § 2.2.1).
- [ ] Every crawler-specific group repeats the `*` restrictions it should still follow (§ 2.2.1).
- [ ] Every allow and disallow pattern starts with `/` or is empty, and literal `*` or `$` are written `%2A` or `%24` (§ 2.2, § 2.2.3).
- [ ] Sample URLs were checked against the rules with longest match, allow winning ties (§ 2.2.2).
- [ ] No rule appears before the first `user-agent` line (§ 2.2.2).
- [ ] The file is under 500 KiB; crawlers parse at least that much (§ 2.5).
- [ ] Crawlers treat 4xx as allow-all and 5xx or unreachable as disallow-all, follow at least five redirects, and cache no longer than 24 hours (§ 2.3.1, § 2.4).
- [ ] Nothing sensitive relies on robots.txt for protection (§ 3).
- [ ] No `Content-Usage` rule is emitted while draft-ietf-aipref-attach stays at posture track.

## Reference index

- **`references/versions.md`**: RFC 9309, the 1994 convention, the 1996 draft and the draft-ietf-aipref-attach preview, what changed, and upgrade steps. Load for steps 1 and 8.
- **`references/syntax-and-matching.md`**: the ABNF, groups and merging, product tokens, allow and disallow, longest match, `*` and `$`, percent-encoding, other records, the § 5 examples and reported errata. Load for steps 2, 3 and 6.
- **`references/fetching-and-caching.md`**: file location, status handling, redirects, caching, the size limit and parser security. Load for steps 5, 6 and 7.
- **`references/crawlers-and-ai.md`**: addressing AI crawlers by product token as their operators document them, user-initiated fetchers, control-only tokens, and how robots.txt relates to AI usage preferences and `Content-Usage`. Load for step 4.

## Related skills

- `aipref` for the AI usage preference vocabulary and attaching preferences with `Content-Usage`: `npx skills add ScaleDockHQ/scaledock-skills --skill aipref`.
- `web-bot-auth` for crawlers that prove their identity with HTTP Message Signatures instead of a spoofable User-Agent: `npx skills add ScaleDockHQ/scaledock-skills --skill web-bot-auth`.
- `http-semantics` for status codes, redirects and RFC 9111 caching used when serving and fetching `/robots.txt`: `npx skills add ScaleDockHQ/scaledock-skills --skill http-semantics`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [RFC 9309: Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html): RFC (Proposed Standard), RFC 9309 (September 2022), checked 2026-10-05.
- [RFC 9309 errata](https://www.rfc-editor.org/errata/rfc9309): RFC Editor errata, four Reported and none Verified, checked 2026-10-05.
- [A Standard for Robot Exclusion](https://www.robotstxt.org/orig.html): community convention (robots mailing list consensus), 30 June 1994, checked 2026-10-05.
- [A Method for Web Robots Control (draft-koster-robots-00)](https://www.robotstxt.org/norobots-rfc.txt): expired Internet-Draft, Informational, December 1996, checked 2026-10-05. Datatracker has no record of it.
- [Associating AI Usage Preferences with Content in HTTP (draft-ietf-aipref-attach)](https://datatracker.ietf.org/doc/draft-ietf-aipref-attach/): Internet-Draft (aipref WG document), draft-ietf-aipref-attach-05 (19 August 2026), checked 2026-10-05.
- [RFC 5234: Augmented BNF for Syntax Specifications: ABNF](https://www.rfc-editor.org/rfc/rfc5234): RFC (Internet Standard, STD 68), RFC 5234, checked 2026-10-05. Read for the case-insensitivity of ABNF strings.
- [Google's common crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers): crawler operator documentation, last updated 2026-07-14, checked 2026-10-05.
- [Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots): crawler operator documentation, undated, checked 2026-10-05.
- [Does Anthropic crawl data from the web, and how can site owners block the crawler?](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler): crawler operator documentation, April 7, 2026, checked 2026-10-05.
- [About Applebot](https://support.apple.com/en-us/119829): crawler operator documentation, published September 04, 2026, checked 2026-10-05.
- [Common Crawl CCBot](https://commoncrawl.org/ccbot): crawler operator documentation, undated, checked 2026-10-05.
