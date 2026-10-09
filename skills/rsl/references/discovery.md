# Associating and discovering RSL licenses

Read this when attaching a license to content, or when a crawler or agent must find the license that governs an asset. "§" refers to RSL-SPEC-1.0 with errata.

## Mechanisms

All mechanisms are functionally equivalent and clients MUST honor whichever is provided; clients MUST check all available association points (§ 4.2).

| Mechanism     | Where                                                                                | Rules                                                                                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| robots.txt    | `License: https://example.com/license.xml`                                           | `license-directive = "License" ":" OWS absolute-URI OWS`; may repeat; global or inside a `User-agent` group (§ 4.4).                                                                                              |
| HTTP `Link`   | `Link: <https://example.com/license.xml>; rel="license"; type="application/rsl+xml"` | `rel` MUST be `license`, `type` MUST be `application/rsl+xml`, target MUST be absolute; works for any media type (§ 4.5).                                                                                         |
| HTML linked   | `<link rel="license" type="application/rsl+xml" href="https://...">`                 | Same rules as `Link`. Applies to the parent element and descendants; in `<head>` it covers the document. The linked document may use `<content url="">` to mean "the scope of this association" (§ 4.6, § 4.6.1). |
| HTML inline   | `<script type="application/rsl+xml"><rsl ...>...</rsl></script>`                     | Exactly one `<content>`; `url=""` means the placement scope; a non-empty `url` must be a stable canonical URL when the license must travel with copies (§ 4.6.2).                                                 |
| RSS           | `<rsl:content>` inside `<item>`                                                      | Root declares `xmlns:rsl="https://rslstandard.org/rsl"`; all RSL elements use the `rsl:` prefix; `url` must be on the feed's own origin; clients parse it per item before downloading (§ 4.7).                    |
| Embedded file | XMP, ID3 or atoms, EPUB `<metadata>`, PNG `iTXt`                                     | An `<rsl:rsl>` wrapper declaring the namespace, exactly one `<rsl:content>` with a non-empty stable canonical `url` (§ 4.8).                                                                                      |

`<link>` outside `<head>` is an RSL client extension; for element-scoped licensing in conforming HTML use the inline form (§ 4.6.1).

## robots.txt scoping

From § 4.4.2 and § 4.4.3:

1. Select the `User-agent` group under RFC 9309 rules.
2. If that group contains `License` lines, they are the candidate set and global `License` lines are ignored.
3. Otherwise, global `License` lines (outside any group) are the candidate set.
4. `License` never changes `Allow` or `Disallow`; a disallowed path stays disallowed.
5. With no valid `License`, try the other mechanisms; if none succeeds, the resource is unlicensed for RSL purposes.

```text
User-agent: ExampleBot
Allow: /
License: https://example.com/examplebot-license.xml

User-agent: *
Allow: /
License: https://example.com/default-license.xml
```

An RFC 9309 parser that does not know `License` must not let it end or disturb a group (RFC 9309 § 2.2.4); see the `robots-txt` skill.

## Precedence across channels

From § 4.9:

- A group-scoped robots.txt `License` beats a global one.
- The most specific license (page or element) beats broader site-level licenses.
- Conflicting terms resolve to the most restrictive combination of rights.
- Publishers SHOULD keep channels consistent.

## Client algorithm

From § 3.2.1, § 4 and § 4.3:

1. Before access, look for every association: robots.txt (group, then global), `Link` headers on responses, HTML `<link>` and inline scripts, RSS items, and embedded metadata in files.
2. Fetch each referenced document over HTTPS (§ 8). Accept it whatever its `Content-Type`, as long as the namespace is right (§ 2.2).
3. Validate it: XML 1.0, RSL namespace, no unknown RSL-namespace elements (§ 3).
4. Compute the effective license for the asset (see `document.md`) and apply § 4.9 across documents.
5. If a `server` is set, obtain a License Token before access, even for `free` (§ 3.3, § 5).
6. Honor usage, user and geo restrictions, and meet payment, attribution and reporting before accessing, copying or processing (§ 4.3).
7. If no valid document can be obtained, treat the asset as unlicensed (§ 4.3).
8. Cache both the document and the association, and revalidate both within `max-age` days (default 30) using a refetch, `ETag`/`Last-Modified` or a sitemap `lastmod`; if an association now points elsewhere, fetch and evaluate the new document before relying on it (§ 3.2.1).

## Server responses

A server MAY answer `401` or `402` when access depends on a license, with either a `Link rel="license"` header or an inline `application/rsl+xml` body (§ 4.10). See `protocols.md` for the CAP form with `WWW-Authenticate: License`.
