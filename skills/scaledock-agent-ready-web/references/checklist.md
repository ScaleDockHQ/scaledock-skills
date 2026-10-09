# Agent-readiness checklist

Read this for workflow steps 2 and 10. One check per invariant, run against production or a preview deployment. Set `SITE` to the origin and `PAGE` to a sample page URL, and repeat the page checks for every page type and every host. Each check names the spec skill whose Verify list goes deeper.

```bash
SITE=https://example.com
PAGE=$SITE/pricing
```

## 1. First payload (no JavaScript)

```bash
curl -s "$PAGE" | grep -c '<h1'                       # at least 1
curl -s "$PAGE" | grep -o 'Plan prices start at'      # a sentence from the body text
curl -s "$PAGE" | grep -c 'application/ld+json'       # exactly 1
```

- Expected: the heading, body text, primary links and JSON-LD are in the raw response. Text that appears only in the browser is loaded by script; move it into the server render.

## 2. robots.txt (`robots-txt`)

```bash
curl -sI "$SITE/robots.txt"                           # 200, Content-Type: text/plain
curl -s  "$SITE/robots.txt"
```

- Expected: a group for every AI token the policy treats differently, spelled as the `robots-txt` crawler table spells it; each group repeats the `*` rules it should keep; a `Sitemap:` line; `Content-Signal` and `License` lines inside their groups.
- For each named token and sample path, the longest-match result is the one in the policy table.

## 3. Content rights (`aipref`, `content-signals`, `rsl`, `tdmrep`)

```bash
curl -sI "$PAGE" | grep -i '^content-usage'           # aipref header, if the policy uses it
curl -s  "$SITE/robots.txt" | grep -i '^content-signal'
curl -s  "$SITE/robots.txt" | grep -i '^license'      # RSL license URL, if any
curl -sI "$PAGE" | grep -i '^link:.*license'          # RSL Link association, if used
curl -s  "$SITE/.well-known/tdmrep.json"              # TDMRep, if used
curl -sI "$PAGE" | grep -i '^tdm-'                    # TDMRep headers, if used
```

- Expected: every channel present gives the same answer for search, AI input and AI training as the policy table. A missing channel is fine; a contradicting one is not.
- Every syntax used is one the relevant skill's posture allows you to emit.

## 4. Markdown twin and negotiation (`llms-txt`, `http-semantics`)

```bash
curl -sI -H 'Accept: text/markdown' "$PAGE"           # 200, Content-Type: text/markdown; charset=utf-8, Vary: Accept
curl -sI "$PAGE"                                       # 200, text/html, Vary: Accept, Link: <...md>; rel="alternate"; type="text/markdown"
curl -sI "$PAGE.md"                                    # 200, Content-Type: text/markdown; charset=utf-8
curl -s  "$PAGE" | grep -o '<link[^>]*text/markdown[^>]*>'
curl -s -o /dev/null -w '%{http_code}\n' -H 'Accept: text/markdown' "$SITE/no-such-page"   # 404
diff <(curl -s -H 'Accept: text/markdown' "$PAGE") <(curl -s "$PAGE.md")                   # no difference
```

- Expected: both representations of the page URL carry `Vary: Accept`; the twin has the same content as the HTML. Details in [`content-negotiation.md`](content-negotiation.md).

## 5. llms.txt (`llms-txt`)

```bash
curl -sI "$SITE/llms.txt"                             # 200, text/markdown or text/plain
curl -s  "$SITE/llms.txt" | head -20                  # H1, blockquote summary, H2 link lists
```

- Expected: every link in the file resolves to a `.md` twin with a 200.

## 6. Structured data (`schema-org`, `json-ld`)

```bash
curl -s "$PAGE" | sed -n 's/.*<script type="application\/ld+json">\(.*\)<\/script>.*/\1/p' | jq '."@graph" | map(."@type")'
```

- Expected: one graph that parses, with Organization, WebSite, WebPage and the page's main entity, stable `@id`s, and values that match the visible page.

## 7. API catalog (`well-known-uris`, `http-semantics`)

```bash
curl -s  -H 'Accept: application/linkset+json' "$SITE/.well-known/api-catalog" | jq .
curl -sI "$SITE/.well-known/api-catalog" | grep -i '^link:.*api-catalog'
```

- Expected: `GET` returns `application/linkset+json` (with `profile="https://www.rfc-editor.org/info/rfc9727"`) linking each public API's OpenAPI document (`service-desc`) and docs (`service-doc`); `HEAD` carries a `Link` with `rel="api-catalog"` (RFC 9727 § 2, § 4.2). Skip when the site has no public API.

## 8. WebMCP and A2A (`webmcp`, `a2a`)

```bash
curl -s "$SITE/.well-known/agent-card.json" | jq '{name, skills: [.skills[].id]}'
```

- Expected: an Agent Card that validates per `a2a`, when the site offers agent skills.
- In the code: list every WebMCP tool registration and the HTTP endpoint each one calls. A tool with no endpoint is a gap. Call each endpoint with `curl` using the tool's inputs and check it returns the same result.

## 9. Bot identity (`web-bot-auth`)

```bash
curl -sI -A 'GPTBot' "$PAGE"                          # same treatment as an unknown client
```

- Expected: a spoofed User-Agent gets no bot-specific allowance or exemption. In the edge config, every bot rule depends on a verified signature or the operator's published verification method.

## 10. Sitemap and security.txt (`sitemaps`, `security-txt`)

```bash
curl -sI "$SITE/sitemap.xml"                          # 200, XML
curl -s  "$SITE/.well-known/security.txt"             # Contact: and a future Expires:
```

## 11. No hidden instructions (`owasp-llm`)

```bash
curl -s "$PAGE" | grep -i -E 'ignore (all|previous)|as an ai|language model|assistant:|<!--.*(agent|llm|ai)'
```

- Expected: no matches. Also search the templates for `display:none`, `visibility:hidden`, `aria-hidden`, off-screen positioning and same-colour text that holds sentences addressed to agents, and compare the HTML and the twin for content that appears in only one of them.
