# Syntax and matching

Read this when writing or reviewing a robots.txt file, or building the parser and matcher of a crawler. Every rule cites RFC 9309 unless it says otherwise.

## Structure

- A **rule** is a key-value line that says how a crawler may access URIs; a **group** is one or more `user-agent` lines followed by one or more rules. A group ends at the next `user-agent` line or end of file. The last group may have no rules, which allows everything (§ 2.1).
- Empty lines may appear between `user-agent` lines and between rules; they do not end a group (§ 2.2 ABNF: `group = startgroupline *(startgroupline / emptyline) *(rule / emptyline)`).
- Field names `user-agent`, `allow` and `disallow` are ABNF quoted strings (§ 2.2), and ABNF strings are case-insensitive (RFC 5234 § 2.3), so `User-Agent:` and `Disallow:` are the same, as the § 5.1 example shows.
- Whitespace (space or tab) is optional around the `:` and at line start (§ 2.2 ABNF `*WS`); `Disallow:/` is valid (§ 5.1).
- Line endings are CR, LF or CRLF (§ 2.2 ABNF `NL`). A `#` starts a comment that runs to the end of the line, on its own line or after a rule (§ 2.2, § 2.2.3).
- Rules that are not in any group, such as rules before the first `user-agent` line, SHOULD be ignored (§ 2.2.2).

ABNF from § 2.2, abridged:

```text
robotstxt      = *(group / emptyline)
startgroupline = *WS "user-agent" *WS ":" *WS product-token EOL
rule           = *WS ("allow" / "disallow") *WS ":" *WS (path-pattern / empty-pattern) EOL
product-token  = identifier / "*"
path-pattern   = "/" *UTF8-char-noctl ; valid URI path pattern
empty-pattern  = *WS
identifier     = 1*(%x2D / %x41-5A / %x5F / %x61-7A)
EOL            = *WS [comment] NL
```

## User-agent and product tokens

- A product token MUST contain only letters (`a-z`, `A-Z`), `_` and `-` (§ 2.2.1). No digits, dots, slashes or version numbers.
- A crawler's token SHOULD be a substring of the identification string it sends, in HTTP the `User-Agent` header, and that string SHOULD describe the crawler's purpose, for example with a link (§ 2.2.1, Figure 1).
- Crawlers MUST match the group by product token case-insensitively (§ 2.2.1).
- If more than one group matches, their rules MUST be merged into one group (§ 2.2.1, Figure 2).
- If no group matches, crawlers MUST obey the `*` group if present (§ 2.2.1, Figure 3). If neither exists, or there are no groups, no rules apply (§ 2.2.1).
- Consequence for authors: a crawler with its own group does not also read the `*` group. Restrictions meant for everyone must be repeated in each named group.

## Allow and disallow

- A crawler MUST match the paths in `allow` and `disallow` rules against the URI, starting at the first octet of the path (§ 2.2.2).
- Matching SHOULD be case-sensitive (§ 2.2.2).
- The most specific match MUST be used: the matching rule with the most octets (§ 2.2.2).
- If an equivalent `allow` and `disallow` both match, `allow` SHOULD be used (§ 2.2.2).
- Duplicate rules in a group MAY be deduplicated (§ 2.2.2).
- No matching rule, or a group with no rules, means the URI is allowed (§ 2.2.2). An empty pattern (`Disallow:`) matches nothing.
- `/robots.txt` is implicitly allowed (§ 2.2.2).
- A rule matches if and only if the end of the rule's path is reached before a difference in octets (§ 2.2.2). That is prefix matching: `Disallow: /help` covers `/help.html` and `/help/x`, while `/help/` does not cover `/help.html` (same semantics as 1994 Format, Disallow).
- The path to match includes the query: `/foo/bar?baz=quz` is compared as is (§ 2.2.2, Figure 4).

## Special characters

Crawlers MUST support these (§ 2.2.3, Figure 5):

| Character | Meaning                                                | Example                      |
| --------- | ------------------------------------------------------ | ---------------------------- |
| `#`       | Line comment                                           | `allow: / # comment`         |
| `$`       | End of the match pattern                               | `allow: /this/path/exactly$` |
| `*`       | Zero or more instances of any character, including `/` | `allow: /this/*/exactly`     |

- To match `*` or `$` literally, percent-encode them: `/path/file-with-a-%2A.html`, `/path/foo-%24` (§ 2.2.3, Figure 6).
- `*` matches any character, including the otherwise-required leading `/` (§ 5.1 notes), so `Disallow: *.gif$` blocks every URL ending in `.gif`.

## Percent-encoding

- Octets outside ASCII, and octets in the RFC 3986 reserved set, MUST be percent-encoded in both the URI and the robots.txt path before comparison (§ 2.2.2).
- A percent-encoded ASCII octet in the URI MUST be decoded before comparison, unless it is a reserved character or outside the unreserved range (§ 2.2.2).
- Examples (§ 2.2.2, Figure 4): `https://foo.bar` in a query is matched as `https%3A%2F%2Ffoo.bar`; the UTF-8 character ツ is matched as `%E3%83%84`; `/foo/bar/%62%61%7A` is matched as `/foo/bar/baz`.
- If the file is not UTF-8, implementors MAY bridge the encoding mismatch (§ 2.2.2).

## Other records

- Crawlers MAY interpret records outside the protocol, for example `Sitemap` from the Sitemaps protocol, and MAY be lenient, for example accepting common misspellings (§ 2.2.4).
- Parsing other records MUST NOT interfere with the defined records; a `Sitemap` record MUST NOT end a group (§ 2.2.4). A parser that sees `Sitemap:` between rules keeps adding the following rules to the same group.
- `Crawl-delay` is not part of RFC 9309. Some operators document it as a non-standard extension they honour and others say they ignore it; see [`crawlers-and-ai.md`](crawlers-and-ai.md).
- `Content-Usage` is proposed by draft-ietf-aipref-attach and is a preview here; see [`versions.md`](versions.md#preview-draft-ietf-aipref-attach).

## Worked examples

From § 5.1:

```text
User-Agent: *
Disallow: *.gif$
Disallow: /example/
Allow: /publications/

User-Agent: foobot
Disallow:/
Allow:/example/page.html
Allow:/example/allowed.gif

User-Agent: barbot
User-Agent: bazbot
Disallow: /example/page.html

User-Agent: quxbot

EOF
```

- Crawlers with no named group: may fetch `/publications/`, not `/example/` and not any URL ending in `.gif`.
- `foobot`: only `/example/page.html` and `/example/allowed.gif` (the longer `Allow` beats `Disallow:/`).
- `barbot` and `bazbot`: everything except `/example/page.html`.
- `quxbot`: an empty group at the end, so everything is allowed.

Longest match, from § 5.2: with `Allow: /example/page/` and `Disallow: /example/page/disallowed.gif`, the URL `/example/page/disallowed.gif` is disallowed because the disallow rule is longer. (The published sentence misspells the URL; see erratum 7124 below.)

## Matching algorithm (crawler side)

1. Parse every line; keep the parseable rules (§ 2.3.1.5). Ignore rules outside a group (§ 2.2.2).
2. Collect every group whose `user-agent` matches your product token case-insensitively and merge them; if none, take the `*` group; if none, allow everything (§ 2.2.1).
3. Normalise the request path (path plus query): percent-encode non-ASCII and reserved octets, decode percent-encoded unreserved ASCII (§ 2.2.2). Normalise each rule path the same way.
4. For each rule, test a match from the first octet, with `*` as any run of characters and a trailing `$` as end of path (§ 2.2.3).
5. Pick the matching rule with the most octets; on a tie between allow and disallow, allow (§ 2.2.2). No match, or the path is `/robots.txt`: allow.

## Common mistakes

- Expecting a named group to inherit the `*` group (it does not, § 2.2.1).
- Expecting rule order to matter. Only length matters (§ 2.2.2).
- Putting digits or versions in a token, such as `ExampleBot/1.0` (§ 2.2.1).
- Using `Disallow` to hide a private area. The path becomes public knowledge (§ 3).
- Relying on a blank line to end a group, so rules after a later `Sitemap` or blank line are misread by a hand-written parser (§ 2.2, § 2.2.4).
- Writing a literal `*` or `$` in a path that should match those characters (§ 2.2.3).

## Reported errata

All four RFC 9309 errata are Reported, not Verified; the published text stands until the RFC Editor acts. Read them when a parser disagrees with an example:

- 7124 (§ 5.2): the URL should read `example.com/example/page/disallowed.gif`.
- 7128 (§ 2.2.2, Figure 4): the character for `%E3%83%84` is U+30C4, not "U+E38384".
- 7995 (§ 2.2): the ABNF requires a pattern to start with `/`, but § 5.1 uses `Disallow: *.gif$`; the report proposes allowing `*` as the first character. Authors can write `/*.gif$`, which matches the same URLs and fits the ABNF; parsers should accept both.
- 8895 (§ 2.3.1.5): proposes an optional comma-separated list of tokens in one `user-agent` line. Not part of RFC 9309: write one `user-agent` line per token.
