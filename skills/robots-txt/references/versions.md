# Versions and upgrades

Read this when choosing a target version, reading a robots.txt file or crawler written for the 1994 or 1996 text, upgrading one, or deciding whether to use the `Content-Usage` rule. Sources: RFC 9309 and its errata, A Standard for Robot Exclusion (robotstxt.org, 1994), draft-koster-robots-00 (robotstxt.org copy, 1996) and draft-ietf-aipref-attach-05, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                       | Line                                  | Status  | Revision                                         | Posture | Summary                                                                                                    |
| ------------------------ | ------------------------------------- | ------- | ------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------- |
| `aipref-attach-preview`  | draft-ietf-aipref-attach              | preview | draft-ietf-aipref-attach-05 (19 August 2026)     | track   | Adds a `Content-Usage` rule to robots.txt groups and an HTTP `Content-Usage` field; would update RFC 9309. |
| `rfc9309`                | RFC 9309                              | current | RFC 9309, Proposed Standard (September 2022)     |         | The default target: longest match, `*` and `$`, error handling, 24-hour caching, 500 KiB limit.            |
| `draft-koster-robots-00` | draft-koster-robots-00                | legacy  | draft-koster-robots-00, Informational (Dec 1996) |         | Adds `Allow`, first-match order, 401/403 as full restriction, 7-day default cache. Expired, never an RFC.  |
| `norobots-1994`          | A Standard for Robot Exclusion (1994) | legacy  | robots mailing list consensus, 30 June 1994      |         | The original convention: `User-agent` and `Disallow` prefixes only, records separated by blank lines.      |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

RFC 9309 cites the robotstxt.org pages as the origin of the rules it specifies (RFC 9309 § 1, [ROBOTSTXT]). The 1994 document says it "is not an official standard backed by a standards body" (Status of this document). The 1996 draft was never published as an RFC, and Datatracker has no record of `draft-koster-robots`; the copy read here is the one on robotstxt.org.

## Which version to use

- Write files and crawlers to RFC 9309. It is the only line published by a standards body.
- No other line is supported. A 1994 or 1996 file is input to an upgrade; most such files still parse under RFC 9309, but some change meaning (see below).
- Follow draft-ietf-aipref-attach only to see what is coming. Its posture is **track**: do not emit `Content-Usage` rules in robots.txt and do not build crawler behaviour that depends on them. An RFC 9309 crawler that does not know the rule must not let it interfere with the defined records (RFC 9309 § 2.2.4), so a file that already has one still parses.

## What changed

### RFC 9309

Compared with draft-koster-robots-00:

- Precedence is the most specific (longest, in octets) match, with allow winning an equivalent tie (§ 2.2.2). The 1996 draft used the first match in file order (draft § 3.2.2).
- `*` matches zero or more of any character and `$` anchors the end of the pattern; both MUST be supported (§ 2.2.3). Neither had a special meaning before.
- All groups that match a crawler are merged into one (§ 2.2.1). The 1996 draft used the first matching record (draft § 3.2.1); 1994 allowed only one `*` record (Format, User-agent).
- Groups end at the next `user-agent` line after rules, or end of file; empty lines may appear inside a group (§ 2.1, § 2.2 ABNF). In 1994, records were separated by blank lines (Format).
- Product tokens are letters, `_` and `-` only, matched case-insensitively (§ 2.2.1). The 1996 draft used a substring match of the name token in the `User-agent` value (draft § 3.2.1).
- Every 4xx means the crawler MAY access anything (§ 2.3.1.3). The 1996 draft recommended treating 401 and 403 as complete restriction (draft § 3.1).
- 5xx and network errors mean complete disallow, with an option after a long outage (for example 30 days) to treat the file as unavailable or keep a cached copy (§ 2.3.1.4). The 1996 draft recommended deferring visits (draft § 3.1).
- At least five consecutive redirects SHOULD be followed, even across authorities, and the rules apply to the initial authority (§ 2.3.1.2). The 1996 draft said to follow redirects until a resource is found (draft § 3.1).
- Cached copies SHOULD NOT be used for more than 24 hours unless the file is unreachable (§ 2.4). The 1996 draft defaulted to 7 days without cache-control directives (draft § 3.4).
- A parsing limit of at least 500 KiB (§ 2.5), UTF-8 encoding (§ 2.3), and other records such as Sitemaps that MUST NOT end a group (§ 2.2.4).
- Percent-decoding before comparison is generalised: the 1996 draft decoded every `%xx` except `%2F` (draft § 3.2.2); RFC 9309 percent-encodes non-ASCII and reserved octets and decodes only unreserved ASCII (§ 2.2.2).

### draft-koster-robots-00

Compared with the 1994 convention: the `Allow` line, a formal BNF, defined handling of HTTP status codes, an expiry section and security considerations (draft § 3, § 3.4, § 5.1, § 6). The draft notes that a robot ignoring `Allow` is safe, because it only crawls less (draft § 5.1).

### Errata

The RFC Editor lists four Reported errata for RFC 9309 and none Verified, so the published text stands. They are summarised in [`syntax-and-matching.md`](syntax-and-matching.md#reported-errata).

## Upgrading

### norobots-1994 to rfc9309

1. Change the version marker: robots.txt has none. Record in comments or documentation that the file targets RFC 9309.
2. Replace removed or renamed fields: none were removed. Check every `User-agent` value is a product token of letters, `_` and `-`, or `*`; remove version numbers from names (1994 Format, User-agent; RFC 9309 § 2.2.1).
3. Re-check grouping: a blank line no longer ends a group. Make sure each group starts with its `user-agent` lines and that no rule sits before the first `user-agent` line (§ 2.2, § 2.2.2).
4. Escape literal `*` and `$` in paths as `%2A` and `%24` (§ 2.2.3); under RFC 9309 they are wildcards.
5. Validate: run test URLs through an RFC 9309 matcher and compare with the intended result.

### draft-koster-robots-00 to rfc9309

1. Do steps 2 to 4 above.
2. Re-check precedence: list every pair of overlapping `Allow` and `Disallow` rules. Under first match the earlier rule won; under RFC 9309 the longer one wins (§ 2.2.2). For the § 4 example in the draft, `Disallow: /org/plans.html` still wins over `Allow: /org/` because it is longer.
3. Re-check merged groups: if several records name the same robot, RFC 9309 merges them instead of using only the first (§ 2.2.1).
4. Crawler side: change 401 and 403 handling to "may access anything" (§ 2.3.1.3), 5xx to complete disallow (§ 2.3.1.4), the default cache lifetime from 7 days to at most 24 hours (§ 2.4), and add the redirect limit (§ 2.3.1.2) and a parsing limit of at least 500 KiB (§ 2.5).
5. Keep behaviour unchanged: a site that relied on 401 or 403 to block all crawling now needs `Disallow: /` served with a 2xx.

## Preview: draft-ietf-aipref-attach

draft-ietf-aipref-attach-05 (19 August 2026, aipref WG document, intended Proposed Standard) says it updates RFC 9309 if approved. It defines:

- A `Content-Usage` rule in a robots.txt group: `content-usage = *WS "content-usage" *WS ":" *WS [ path-pattern 1*WS ] usage-pref EOL` (draft § 3). The path is optional; a value not starting with `/` has no path (draft § 3.2).
- Matching by the same longest path prefix as `Allow` and `Disallow`; preferences apply only to paths that may be crawled (draft § 3.1).
- Rule order in a group carries no meaning; identical paths with conflicting preferences are combined by the vocabulary draft, not resolved toward the permissive option (draft § 3.1).
- A crawler uses the robots.txt copy current at fetch time; changes are not retroactive (draft § 3.3).
- An HTTP `Content-Usage` response field, a structured-field dictionary that applies to the content of the message (draft § 2).
- No increase to the 500 KiB limit (draft § 4).

Posture **track**: do not emit or rely on it yet. Watch the Datatracker page for a new revision, WG last call, or publication as an RFC. When it ships: add it as a line or as an RFC 9309 update, make its rules current, move the rule details out of this section, and add an upgrade section. The preference vocabulary itself (for example `train-ai=n`) belongs to the `aipref` skill.
