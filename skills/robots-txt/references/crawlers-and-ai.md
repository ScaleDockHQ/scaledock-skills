# Crawlers, AI crawlers and usage preferences

Read this when a site wants to treat AI crawlers differently from other crawlers, or when building an AI crawler. RFC 9309 has no AI-specific rules: AI crawlers are addressed like any other crawler, by product token (§ 2.2.1). The tokens below are copied from each operator's own documentation on the checked date in [Sources](../SKILL.md#sources). Operators add and rename tokens; re-read their pages before relying on this list.

## How a token is addressed

- Each crawler has a product token, matched case-insensitively against `user-agent` lines (RFC 9309 § 2.2.1).
- A crawler with a matching group does not use the `*` group (§ 2.2.1). A group for an AI crawler must therefore contain every rule it should follow.
- Several tokens can share one group by listing several `user-agent` lines before the rules (§ 2.1, § 5.1 `barbot` and `bazbot`).
- Some operators use a **control-only token**: a token that appears only in robots.txt and is never sent as a User-Agent, because the operator's normal crawler fetches the content and the token governs what the content may be used for. RFC 9309 says a token SHOULD be a substring of the User-Agent (§ 2.2.1); these tokens are a documented exception chosen by their operators.
- Some fetchers act on a user's request rather than crawling automatically, and their operators say robots.txt may not apply to them, or applies differently.

## Tokens documented by operators

| Operator     | Token               | What the operator says it controls                                                                                                             | Sent as User-Agent?                         |
| ------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Anthropic    | `ClaudeBot`         | Collecting web content that could contribute to model training; restricting it signals exclusion of future materials from training datasets.   | Yes                                         |
| Anthropic    | `Claude-User`       | Fetches made when users ask Claude questions; disabling it prevents retrieval in response to a user query.                                     | Yes                                         |
| Anthropic    | `Claude-SearchBot`  | Indexing to improve search result quality.                                                                                                     | Yes                                         |
| Apple        | `Applebot`          | Search features (Spotlight, Siri, Safari); crawled data may also be used to train Apple foundation models.                                     | Yes                                         |
| Apple        | `Applebot-Extended` | Whether content crawled by Applebot may be used to train Apple's foundation models; it does not crawl and does not affect search inclusion.    | No (control-only)                           |
| Common Crawl | `CCBot`             | Crawling for the Common Crawl open repository of web data.                                                                                     | Yes (`CCBot/2.0`)                           |
| Google       | `Google-Extended`   | Whether content Google crawls may be used to train future Gemini models and for grounding; does not affect Google Search inclusion or ranking. | No (control-only, standalone product token) |
| OpenAI       | `GPTBot`            | Crawling content that may be used to train generative AI foundation models; disallowing it indicates content should not be used for training.  | Yes                                         |
| OpenAI       | `OAI-SearchBot`     | Surfacing sites in ChatGPT search results.                                                                                                     | Yes                                         |
| OpenAI       | `ChatGPT-User`      | Visits made for user actions in ChatGPT and Custom GPTs; not used for automatic crawling, and robots.txt rules may not apply.                  | Yes                                         |
| Perplexity   | `PerplexityBot`     | Surfacing and linking sites in Perplexity search results; the operator says it is not used to crawl content for AI foundation models.          | Yes (`PerplexityBot/1.0`)                   |
| Perplexity   | `Perplexity-User`   | Fetches made when users ask Perplexity a question; not used for web crawling or training, and it generally ignores robots.txt rules.           | Yes (`Perplexity-User/1.0`)                 |

Further operator notes, each from that operator's page:

- **Anthropic** honours the non-standard `Crawl-delay` extension, asks site owners to add rules for every subdomain they want to opt out, and says blocking its IP addresses may not work as an opt-out because it stops the crawler reading robots.txt.
- **Apple**: if robots.txt does not mention `Applebot` but mentions `Googlebot`, Applebot follows the `Googlebot` rules. Applebot does not follow `Crawl-delay`. Opting out of generated "world knowledge" answers uses the `nosnippet` meta tag, not robots.txt.
- **Common Crawl** warns that other crawlers falsely identify as `CCBot`.
- **Google** says some of its crawlers have more than one token and a rule applies if one token matches, and that its list is not exhaustive.
- **OpenAI** says each token's setting is independent, that it may reuse one crawl for both uses when both are allowed, that search changes can take about 24 hours after a robots.txt update, and that its robots.txt fetches may carry a `robots.txt` marker in the User-Agent.
- **Perplexity** says each token's setting is independent, that changes can take up to 24 hours to take effect, that `Perplexity-User` generally ignores robots.txt because a user requested the fetch, and that it publishes the IP ranges of each token as JSON (`perplexitybot.json`, `perplexity-user.json`) for verification together with the User-Agent.

## Patterns

Opt out of the training-related tokens while staying in search and in every other crawler's normal rules:

```text
User-agent: *
Disallow: /private/

User-agent: GPTBot
User-agent: ClaudeBot
User-agent: CCBot
User-agent: Google-Extended
User-agent: Applebot-Extended
Disallow: /
```

- The named group replaces the `*` group for those tokens (§ 2.2.1); here `Disallow: /` covers `/private/` anyway. If a named group allows some paths, repeat `Disallow: /private/` in it.
- Search-related tokens (`OAI-SearchBot`, `Claude-SearchBot`, `Applebot`, `PerplexityBot`) are not named, so they fall back to the `*` group.
- Check what each token means before blocking it: blocking a search or user-initiated token can remove the site from that operator's search or assistant answers, according to those operators.

Allow one AI crawler only into a section:

```text
User-agent: GPTBot
Allow: /blog/
Disallow: /
```

`/blog/post` matches `Allow: /blog/` (6 octets) and `Disallow: /` (1 octet); the longer rule wins, so it is allowed (§ 2.2.2).

## Verifying crawlers

- robots.txt is a request to crawlers, not enforcement (§ 1, § 3). A crawler that ignores it, or spoofs a token, is not stopped by it.
- Operators document ways to verify their crawlers beyond the User-Agent: published IP ranges (Anthropic, Apple, Common Crawl, Google, OpenAI, Perplexity) and reverse DNS (Apple, Common Crawl, Google).
- For cryptographic crawler identity, see the `web-bot-auth` skill: `npx skills add ScaleDockHQ/scaledock-skills --skill web-bot-auth`.

## robots.txt and AI usage preferences

- RFC 9309 rules say which paths may be **crawled** (§ 2.2.2). They say nothing about what fetched content may be used for. The training opt-outs above are operator conventions attached to tokens, not RFC 9309 semantics.
- draft-ietf-aipref-attach-05 separates the two stages: `Allow` and `Disallow` govern acquisition, and a new `Content-Usage` rule governs usage preference, matched by the same longest-path rule; preferences apply only to paths that can be crawled (draft § 3.1). It also defines an HTTP `Content-Usage` response field that carries the same preferences per response (draft § 2).
- Example from draft § 3.4, showing the shape only:

  ```text
  User-Agent: *
  Allow: /
  Disallow: /never/
  Content-Usage: train-ai=n
  Content-Usage: /ai-ok/ train-ai=y
  ```

- The draft is a preview with posture **track** in this skill: do not emit `Content-Usage` yet. An RFC 9309 parser that meets one must not let it end or disturb the group (RFC 9309 § 2.2.4).
- The preference vocabulary (what `train-ai` and other categories mean, and how statements combine) is defined in a separate draft; see the `aipref` skill: `npx skills add ScaleDockHQ/scaledock-skills --skill aipref`.

## Non-RFC extension lines

Some publishers add lines to robots.txt that RFC 9309 does not define. To an RFC 9309 parser they are "other records": a crawler MAY interpret them, but parsing them MUST NOT interfere with the defined records, and such a line MUST NOT end a group (RFC 9309 § 2.2.4). A parser that does not understand a line skips it and keeps the current group open, so the `Allow` and `Disallow` lines after it still belong to the same `user-agent` lines.

### `Content-Signal` (Content Signals Policy)

- Defined by Cloudflare's CC0 Content Signals Policy (24 September 2025), not by an IETF or W3C document. It states preferences for how content may be **used after access**, alongside the access rules.
- The policy defines three signals: `search` (building a search index and returning links and short excerpts, not AI-generated summaries), `ai-input` (inputting content into AI models, such as retrieval-augmented generation and grounding) and `ai-train` (training or fine-tuning AI models). Each takes `yes` or `no` in a comma-separated list; a signal that is absent neither grants nor restricts that use.
- The policy text is a comment block that accompanies the line; its last paragraph says restrictions are reservations of rights under Article 4 of Directive (EU) 2019/790.
- The policy says signals are preferences, not technical countermeasures.
- Example from the policy announcement, showing the shape only:

  ```text
  User-Agent: *
  Content-Signal: search=yes, ai-train=no
  Allow: /
  ```

- For the full syntax, path-scoped signals and how a crawler applies them, see the `content-signals` skill: `npx skills add ScaleDockHQ/scaledock-skills --skill content-signals`.

### `License` (RSL)

- Defined by RSL 1.0 (Really Simple Licensing) § 4.4, which extends the Robots Exclusion Protocol with a `License` directive whose value is an absolute URI of an RSL license document (§ 4.4.1).
- Placement sets scope: outside any group it applies to all clients; inside a group it applies only to clients that select that group, and then the client ignores the global `License` lines (§ 4.4.2). A global `License` line therefore sits before the first `user-agent` line on purpose; an RSL-unaware RFC 9309 crawler ignores lines there (§ 2.2.2).
- `License` does not change what `Allow` and `Disallow` permit; it only identifies the governing license, which an RSL client must retrieve and interpret before accessing or processing content (§ 4.4.2).
- Example from § 4.4.4, showing the shape only:

  ```text
  User-agent: ExampleBot
  Allow: /
  License: https://example.com/examplebot-license.xml

  User-agent: *
  Allow: /
  License: https://example.com/default-license.xml
  ```

- For the RSL document, the other association methods and evaluation rules, see the `rsl` skill: `npx skills add ScaleDockHQ/scaledock-skills --skill rsl`.

### Writing and parsing extension lines

- Site operators: put extension lines inside the group they apply to (or at the top for a global RSL `License`), and keep the `user-agent` lines of a group together at its start so every parser sees the same groups.
- Parser implementers: recognise the defined records (`user-agent`, `allow`, `disallow`) and pass unknown lines through or drop them without closing the group; test with a file where `Content-Signal` or `License` sits between `User-agent` and `Disallow`.
- For text and data mining rights reservations under the W3C TDM Reservation Protocol, see the `tdmrep` skill: `npx skills add ScaleDockHQ/scaledock-skills --skill tdmrep`.
