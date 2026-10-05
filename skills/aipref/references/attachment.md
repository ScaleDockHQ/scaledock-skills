# Attaching preferences to HTTP content

Read this when publishing preferences for a site, CDN or API, or when writing the code that extracts them from responses and robots.txt. Sources: `draft-ietf-aipref-attach-05` (cited as §), RFC 9309 for robots.txt, RFC 9651 for field parsing, and the IANA HTTP Field Name registry, listed in [Sources](../SKILL.md#sources).

The draft defines two attachment methods for content obtained over HTTP; a server can use either or both (§ 1, § 1.2). It defines no way to embed preferences in content formats and no registry, though it expects both to complement these methods (§ 1.3.1, § 1.3.2).

## The `Content-Usage` header field (§ 2)

```http
HTTP/1.1 200 OK
Date: Wed, 23 Apr 2025 04:48:02 GMT
Content-Type: text/plain
Content-Usage: train-ai=n

This is some content.
```

- The value is a Structured Fields Dictionary following the vocabulary's syntax and processing rules (§ 2; vocab § 6).
- It is representation metadata applying to the representation data: the preferences are about the content of this message, not the resource (§ 2). Different representations of one resource can carry different preferences.
- Clients can use a message's preferences to guide their use of its content, which lets servers state preferences for the assets they serve (§ 2).
- A server can use preferences attached to request content, for example a PUT, when that content later answers requests, such as by copying them to the GET responses. This requires the server or resource to understand the field (§ 2). Since -05 this is a "can", not a MUST.
- The field has no special effect on caching (§ 2).
- Multiple field lines are combined into one comma-separated value before parsing (RFC 9651 § 4.2), so a Dictionary can be split across lines, but one member must not be split. A field value that fails to parse is ignored as if absent (RFC 9651 § 4.2), which leaves every category unknown.
- The draft asks IANA to register `Content-Usage` as permanent with Structured Type Dictionary (§ 5). The registry, last updated 2026-08-28, did not yet list it when read on 2026-10-05.

## The robots.txt `Content-Usage` rule (§ 3)

### Syntax (§ 3, Figure 1)

The draft extends the RFC 9309 `rule` production (RFC 9309 § 2.2):

```abnf
rule =/ content-usage
content-usage = *WS "content-usage" *WS ":" *WS
                [ path-pattern 1*WS ] usage-pref EOL
usage-pref    = <usage preference vocabulary from [VOCAB]>
```

- A group contains zero or more `Content-Usage` rules. Each has an optional path and a statement of preference, separated by SP or HTAB when a path is present (§ 3).
- The statement is not ABNF; it is the vocabulary's Dictionary syntax (§ 3).
- Rule order carries no meaning, so `Content-Usage` can be interleaved with Allow and Disallow (§ 3.1).

### Extracting the value (§ 3.2)

1. Find lines labelled `Content-Usage`, ignoring SP and HTAB before and after the label and around the `:`.
2. The rule value runs to the first CR, LF or `#`. `#` always starts a comment, since fragments cannot appear in robots.txt paths.
3. If the value starts with `/`, the path runs to the first SP or HTAB and the rest is the statement. Otherwise the path is absent and the whole value is the statement.
4. Encode the statement as bytes and process it with the vocabulary rules (vocab § 6.3, § 6.5).

Paths use the same percent-encoding as Allow and Disallow; in particular SP and HTAB in a path must be written `%20` and `%09` (§ 3.1).

### Semantics (§ 3.1)

- Group selection is unchanged from RFC 9309: the crawler finds the groups matching its product token case-insensitively, merges them, and falls back to the `*` group only if none matches (RFC 9309 § 2.2.1). A crawler with its own group does not read `Content-Usage` from the `*` group.
- Two stages: Allow and Disallow decide acquisition; `Content-Usage` decides usage preferences (§ 3.1).
- `Content-Usage` rules match paths with the same rules as Allow and Disallow: the longest match, counted in bytes of the encoded path, wins (§ 3.1; RFC 9309 § 2.2.2). RFC 9309 § 2.2.3 defines the `*` and `$` special characters for those patterns. In the § 3.4 example, a rule with no path applies to every crawlable path that no longer rule matches.
- Preferences apply only to paths the crawler may crawl. A disallowed path has no associated preferences (§ 3, § 3.1).
- Rules with identical paths and conflicting preferences each apply, combined by the vocabulary's most-restrictive rule. This is the opposite of Allow and Disallow, where an equivalent conflict resolves to the permissive Allow (§ 3.1; RFC 9309 § 2.2.2).

### Example (§ 3.4)

```text
User-Agent: *
Allow: /
Disallow: /never/
Content-Usage: train-ai=n
Content-Usage: /ai-ok/ train-ai=y

User-Agent: ExampleBot
Allow: /
Content-Usage: train-ai=y
```

`ExampleBot` uses only the second group: it may crawl everything and gets `train-ai=y` everywhere. Every other crawler uses the first group:

| Path          | Crawl | Usage preference |
| ------------- | ----- | ---------------- |
| `/test`       | yes   | `train-ai=n`     |
| `/never/test` | no    | none             |
| `/ai-ok/test` | yes   | `train-ai=y`     |

The draft's prose under this example says ExampleBot gets "ai=y"; the file in Figure 2 says `train-ai=y`, which is what applies.

### Timing and caching (§ 3.1, § 3.3)

- A crawler applies the robots.txt that is current when it fetches the resource. Changes do not apply retroactively: they take effect for a resource only after the crawler has fetched the new robots.txt and then the resource again (§ 3.3).
- Crawlers may cache robots.txt and should not use a cached copy for more than 24 hours unless it is unreachable (RFC 9309 § 2.4), so updates may stay invisible for that long (§ 3.1).

## Publisher checklist

1. Write the statement once per policy, in vocab-08 labels only.
2. For a site-wide policy, add a path-less `Content-Usage` rule to the `*` group and to every crawler-specific group, because a crawler with its own group ignores `*`.
3. For exceptions, add path-scoped rules; check that the more specific path is longer in bytes than the general one.
4. Make sure every path that should carry preferences is crawlable; Disallow removes preferences along with access.
5. If you also send the header, make it consistent with robots.txt. Where they differ, consumers combine them and the more restrictive value wins (vocab § 5.1).
6. Keep robots.txt under 500 KiB, the minimum parsing limit crawlers must support (§ 4; RFC 9309 § 2.5).

## Common mistakes

- Adding `Content-Usage` only to `User-Agent: *` and expecting named crawlers with their own groups to see it (RFC 9309 § 2.2.1).
- Using `Disallow` for paths that should be crawlable but not trained on; Disallow stops crawling, and preferences then do not apply at all (§ 3.1).
- Writing `Content-Usage: train-ai = n` or `Train-AI=n`: whitespace around `=` and uppercase keys fail Dictionary parsing (RFC 9651 § 3.2), so every category becomes unknown.
- Expecting a change to robots.txt to cover content already fetched (§ 3.3).
- Treating the header as applying to the whole resource or site; it applies to that message's content (§ 2).
