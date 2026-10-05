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

Further operator notes, each from that operator's page:

- **Anthropic** honours the non-standard `Crawl-delay` extension, asks site owners to add rules for every subdomain they want to opt out, and says blocking its IP addresses may not work as an opt-out because it stops the crawler reading robots.txt.
- **Apple**: if robots.txt does not mention `Applebot` but mentions `Googlebot`, Applebot follows the `Googlebot` rules. Applebot does not follow `Crawl-delay`. Opting out of generated "world knowledge" answers uses the `nosnippet` meta tag, not robots.txt.
- **Common Crawl** warns that other crawlers falsely identify as `CCBot`.
- **Google** says some of its crawlers have more than one token and a rule applies if one token matches, and that its list is not exhaustive.
- **OpenAI** says each token's setting is independent, that it may reuse one crawl for both uses when both are allowed, that search changes can take about 24 hours after a robots.txt update, and that its robots.txt fetches may carry a `robots.txt` marker in the User-Agent.

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
- Search-related tokens (`OAI-SearchBot`, `Claude-SearchBot`, `Applebot`) are not named, so they fall back to the `*` group.
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
- Operators document ways to verify their crawlers beyond the User-Agent: published IP ranges (Anthropic, Apple, Common Crawl, Google, OpenAI) and reverse DNS (Apple, Common Crawl, Google).
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
