# Content-Signal syntax and processing

Read this when writing Content-Signal lines or parsing them. "Policy" is the Cloudflare announcement of 24 September 2025; "site" is contentsignals.org.

## Signals

| Signal     | Covers                                                                                                                                                | Excludes                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `search`   | Building a search index and providing search results (for example hyperlinks and short excerpts).                                                     | AI-generated search summaries. |
| `ai-input` | Inputting content into one or more AI models (for example retrieval-augmented generation, grounding, real-time use for generative AI search answers). |                                |
| `ai-train` | Training or fine-tuning AI models.                                                                                                                    |                                |

Meaning of values (Policy, clauses a to c):

- `yes`: you may collect content for the corresponding use.
- `no`: you may not collect content for the corresponding use.
- absent: the operator neither grants nor restricts permission via content signal for that use.

## Line syntax

```text
Content-Signal: search=yes, ai-train=no
Content-Signal: /blog/ ai-train=no, search=yes, ai-input=no
```

- Comma-delimited `signal=value` pairs after `Content-Signal:` (Policy).
- An optional path before the pairs scopes the signals to that path (site, Protect Specific Pages).
- The line goes inside a `User-Agent` group with `Allow`/`Disallow` (site).

## The policy comment block

Publish it as `#` comments above the signals (Policy):

```text
# As a condition of accessing this website, you agree to abide by the following content signals:
# (a)  If a content-signal = yes, you may collect content for the corresponding use.
# (b)  If a content-signal = no, you may not collect content for the corresponding use.
# (c)  If the website operator does not include a content signal for a corresponding use, the website operator neither grants nor restricts permission via content signal with respect to the corresponding use.
# The content signals and their meanings are:
# search: building a search index and providing search results (e.g., returning hyperlinks and short excerpts from your website's contents).  Search does not include providing AI-generated search summaries.
# ai-input: inputting content into one or more AI models (e.g., retrieval augmented generation, grounding, or other real-time taking of content for generative AI search answers).
# ai-train: training or fine-tuning AI models.
# ANY RESTRICTIONS EXPRESSED VIA CONTENT SIGNALS ARE EXPRESS RESERVATIONS OF RIGHTS UNDER ARTICLE 4 OF THE EUROPEAN UNION DIRECTIVE 2019/790 ON COPYRIGHT AND RELATED RIGHTS IN THE DIGITAL SINGLE MARKET.
```

## Presets

The site's generator offers four presets:

| Preset                               | Signals                                  | Note from the site                            |
| ------------------------------------ | ---------------------------------------- | --------------------------------------------- |
| Disallow All                         | access disallowed for any purpose        | May cause search engines to exclude the site. |
| Allow Search Only                    | `search=yes, ai-input=no, ai-train=no`   | No permission for AI input or training.       |
| Allow Search & AI Input              | `search=yes, ai-input=yes, ai-train=no`  | No permission to train.                       |
| Allow Search, AI Input & AI Training | `search=yes, ai-input=yes, ai-train=yes` | Permits all three.                            |

## Examples

Named search crawlers may index but not train (site, Targeting Specific User-Agents):

```text
User-Agent: googlebot
Content-Signal: ai-train=no, search=yes, ai-input=no
Allow: /

User-Agent: OAI-Searchbot
Content-Signal: ai-train=no, search=yes, ai-input=no
Allow: /
```

Different signals per path, and one path not fetched at all (site, Protect Specific Pages):

```text
User-Agent: *
Content-Signal: /about ai-train=yes, search=yes, ai-input=yes
Allow: /about

User-Agent: *
Content-Signal: /blog/ ai-train=no, search=yes, ai-input=no
Allow: /blog/

User-Agent: *
Disallow: /dashboard/
```

RFC 9309 merges groups with the same product token (RFC 9309 § 2.2.1), so the three `User-Agent: *` groups above act as one group.

## Parsing as a consumer

1. Parse robots.txt per RFC 9309 and select the group for your product token. `Content-Signal` is not an RFC 9309 rule: it must not end or disturb the group (RFC 9309 § 2.2.4).
2. Check access first: if `Disallow` wins for the path, do not fetch; signals do not apply to content you may not access (RFC 9309 § 2.2.2).
3. Among the group's `Content-Signal` lines, use the one whose path applies to the URL; a line without a path covers the group. The policy defines no tie-break between overlapping paths: choose the longest matching path, consistent with robots.txt matching, and record that as your own rule.
4. Read each pair. `yes` and `no` are the only defined values; treat anything else, and any unknown key, as unstated.
5. Treat an unstated signal as "no statement via content signals", not as permission and not as refusal (Policy).
6. Remember the limits: signals are preferences; some crawlers ignore them, and the site says courts and regulators may not treat robots.txt as an enforceable obligation.

## Combining with other signals

The policy defines no combination rule. A reasonable, documented choice:

- If any applicable source (Content-Signal, aipref `Content-Usage`, an RSL `<prohibits>`, TDMRep `tdm-reservation: 1`) refuses a use, do not perform it.
- Record which source decided, and the version of each file read.

RSL's own rule for its documents is prohibition over permission and most restrictive across channels (see the `rsl` skill); aipref combines its statements most-restrictively (see the `aipref` skill).
