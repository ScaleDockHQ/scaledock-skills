# Markdown twins and content negotiation

Read this for workflow step 5. A markdown twin is the markdown representation of an HTML page: same content, no navigation chrome, no scripts. ScaleDock serves it two ways: at its own `.md` URL, and on the page URL itself when the client asks for markdown. `llms-txt` owns the `.md` naming and the `/llms.txt` format; `http-semantics` owns negotiation, `Vary` and caching; `scaledock-repo-standard` (`references/nextjs.md`, `references/docs-site.md`, `references/performance.md`) owns the Next.js mechanics. This file says how they fit together.

## URLs

| Page URL        | Twin URL                                    |
| --------------- | ------------------------------------------- |
| `/pricing`      | `/pricing.md`                               |
| `/docs/install` | `/docs/install.md`                          |
| `/`             | `/index.md` (or `/index.html.md`)           |
| `/blog/`        | `/blog/index.md` (or `/blog/index.html.md`) |

- Pick one naming from those `llms-txt` allows and use it site-wide; `/llms.txt` links the twins with the same URLs.
- The twin has the same access rules as the page: a page behind sign-in has a twin behind sign-in, and a page that does not exist has a twin that returns 404.
- A redirected page redirects its twin to the new page's twin.

## Negotiation on the page URL

This is proactive negotiation: the server picks the representation from the request's `Accept` field (RFC 9110 § 12.1, § 12.5.1).

- Serve markdown when the `Accept` field ranks `text/markdown` above `text/html`, by quality value and then by specificity (RFC 9110 § 12.4.2, § 12.5.1). `Accept: text/markdown` and `Accept: text/markdown, text/html;q=0.9` get markdown; a browser's `text/html,...,*/*;q=0.8` gets HTML.
- A request without `Accept` has no preference (RFC 9110 § 12.4.1); serve HTML.
- Apply the same choice to `HEAD`, with the same headers as `GET`.
- Generate both representations from one source (MDX, CMS entry or the page's content model), never by hand, so they cannot drift. Make links absolute in the markdown so they survive copying.

## Response headers

Negotiated markdown response on `/pricing`:

```http
HTTP/1.1 200 OK
Content-Type: text/markdown; charset=utf-8
Vary: Accept
Content-Location: /pricing.md
Link: <https://example.com/pricing>; rel="canonical"
Cache-Control: public, max-age=300, stale-while-revalidate=86400
```

HTML response on `/pricing`:

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Vary: Accept
Link: <https://example.com/pricing.md>; rel="alternate"; type="text/markdown"
```

- **`Content-Type`.** `text/markdown` with `charset`, which RFC 7763 § 2 makes a required parameter with no default. `variant` is optional (RFC 7763 § 2); set it only when the twin really is that variant.
- **`Vary: Accept`** on **both** representations of a negotiated URL. It tells caches not to reuse a response for a request with a different `Accept` value and tells clients the response was negotiated (RFC 9110 § 12.5.5). Without it on the HTML response, a shared cache can hand HTML to an agent, or markdown to a browser.
- **`Content-Location`** on the negotiated markdown names the twin's own URL, which identifies a resource whose representation this is (RFC 9110 § 8.7). Agents can store and cite that URL.
- **The `.md` URL** has one representation, so it needs no `Vary: Accept`; it still sends `Content-Type: text/markdown; charset=utf-8` and the canonical `Link`.
- **`Cache-Control`.** Agent routes set `public, max-age, stale-while-revalidate` as `scaledock-repo-standard` `references/performance.md` says. Twins of signed-in pages are `private`, like the page.

## Links

- In the HTML `<head>`: `<link rel="alternate" type="text/markdown" href="https://example.com/pricing.md">`, the same target as the `Link` header. `llms-txt` also describes `rel="describedby"` to the covering `/llms.txt`.
- Keep `rel="canonical"` on the HTML page pointing at the page URL, and send `Link: <page URL>; rel="canonical"` on markdown responses, so search engines treat the twin as a copy of the page rather than a second page.
- `/llms.txt` lists the twins, and the sitemap lists the page URLs, not the twins.

## 406 or fall back to HTML

When the `Accept` field lists nothing the server has, RFC 9110 lets the origin either honor it with 406 (Not Acceptable) or disregard it and send a default representation (RFC 9110 § 12.4.1, § 15.5.7).

- **ScaleDock default: fall back.** Every page has an HTML representation, and agents read HTML. If a URL has no twin (an app screen, a form result) and the client asks only for `text/markdown`, send the HTML with `Vary: Accept`.
- **Use 406 only** where no default makes sense, for example a data endpoint that only offers JSON. A 406 SHOULD list the available representations and their URLs (RFC 9110 § 15.5.7).
- Never answer a markdown request with an empty body, a 200 error page or a redirect to sign-in that the HTML request would not get.

## Caching at the edge

- `Vary: Accept` keys the cache on the raw `Accept` value, which varies widely between clients. Decide markdown or HTML at the edge with the rewrite rule (a `has` condition on the `accept` header in Next.js `rewrites().beforeFiles`, as `scaledock-repo-standard` `references/nextjs.md` describes), so the cached variants stay two in practice.
- Purge or revalidate the page and its twin together when content changes.

## Checks

```bash
curl -sI https://example.com/pricing -H 'Accept: text/markdown'   # 200, text/markdown; charset=utf-8, Vary: Accept
curl -sI https://example.com/pricing                               # 200, text/html, Vary: Accept, Link rel="alternate"
curl -sI https://example.com/pricing.md                            # 200, text/markdown; charset=utf-8
curl -sI https://example.com/no-such-page.md                       # 404
curl -s  https://example.com/pricing -H 'Accept: text/markdown' | head -20   # starts with the page title, no HTML
```
