# Fetching, caching and security

Read this when serving `/robots.txt` as a site operator, or implementing how a crawler fetches, caches and bounds it. Every rule cites RFC 9309 unless it says otherwise.

## Location

- The rules MUST be in a file named `/robots.txt`, all lowercase, in the top-level path of the service (§ 2.3).
- The URI is `scheme:[//authority]/robots.txt`, for example `https://www.example.com/robots.txt` or `ftp://ftp.example.com/robots.txt` (§ 2.3). The authority includes the host and port, so each host, subdomain and port has its own file, as in the 1996 draft's `http://www.bar.com:8001/robots.txt` example (draft-koster-robots-00 § 3.1).
- The file MUST be UTF-8 and of media type `text/plain` (§ 2.3).
- A file in a subdirectory, such as `/docs/robots.txt`, is not read by the protocol.

## Fetch outcomes

| Outcome                                    | Crawler behaviour                                                                                                     | Section   |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | --------- |
| Successful download (HTTP 2xx)             | MUST follow the parseable rules.                                                                                      | § 2.3.1.1 |
| Redirect (for example 301 or 302)          | SHOULD follow at least five consecutive redirects, even across authorities; apply the rules to the initial authority. | § 2.3.1.2 |
| More than five consecutive redirects       | MAY treat the file as unavailable.                                                                                    | § 2.3.1.2 |
| Unavailable (HTTP 4xx)                     | MAY access any resources on the server.                                                                               | § 2.3.1.3 |
| Unreachable (HTTP 5xx or network error)    | The file is undefined; MUST assume complete disallow.                                                                 | § 2.3.1.4 |
| Unreachable for a long time (e.g. 30 days) | MAY treat the file as unavailable (allow all), or keep using a cached copy.                                           | § 2.3.1.4 |

- For site operators, the status code is part of the policy: a missing file served as 404 allows everything, while a misconfigured 500 or 503 blocks every compliant crawler.
- Redirecting `http://` to `https://`, or `example.com` to `www.example.com`, is fine: the crawler applies the target file's rules to the host it started from (§ 2.3.1.2).
- If the site wants no crawling at all, serve `User-agent: *` with `Disallow: /` and a 2xx; do not rely on 401 or 403, which RFC 9309 treats as "unavailable" (§ 2.3.1.3).

## Parsing errors

- Crawlers MUST try to parse each line, and MUST use the rules they can parse (§ 2.3.1.5). One bad line does not invalidate the file.

## Caching

- Crawlers MAY cache the file's contents and MAY use standard HTTP cache control (RFC 9111) (§ 2.4).
- Crawlers SHOULD NOT use a cached copy for more than 24 hours, unless the file is unreachable (§ 2.4).
- For site operators: assume a change can take up to a day to reach a compliant crawler. Operators may document their own lag; see [`crawlers-and-ai.md`](crawlers-and-ai.md).

## Size limit

- Crawlers SHOULD impose a parsing limit, and it MUST be at least 500 kibibytes (§ 2.5).
- For site operators: keep the file under 500 KiB, since rules beyond the crawler's limit may be ignored.

## Security considerations

- The protocol is not a substitute for content security. Listing paths exposes them publicly and makes them discoverable. Control access with a security measure at the application layer, such as HTTP authentication (§ 3, § 1).
- Memory: the § 2.5 limit also protects the parser from running out of memory (§ 3).
- Invalid characters: § 2.2 defines the characters a parser can expect; out-of-bound characters should be rejected as invalid (§ 3).
- Untrusted content: treat the file as untrusted, following the application layer's security considerations, for HTTP those of RFC 9110 (§ 3).
- Spoofing and interception: the 1996 draft notes that robots.txt is fetched in separate, possibly unauthenticated transactions, so another party can impersonate the server or intercept the file, and that authentication and encryption may be used to reduce this risk (draft-koster-robots-00 § 6).
- Crawler identity: a User-Agent string can be spoofed, so a site that wants to treat crawlers differently at the server, not only in robots.txt, needs to verify them by other means; see [`crawlers-and-ai.md`](crawlers-and-ai.md#verifying-crawlers).

## Crawler implementation checklist

- [ ] Fetch `scheme://authority/robots.txt` for each authority before crawling it.
- [ ] Follow at least five consecutive redirects, then apply the result to the original authority (§ 2.3.1.2).
- [ ] 2xx: parse; 4xx: allow all; 5xx or network error: disallow all (§ 2.3.1).
- [ ] Stop parsing at a limit no smaller than 500 KiB (§ 2.5), and use every rule parsed up to it (§ 2.3.1.5).
- [ ] Re-fetch at least every 24 hours, except while the file is unreachable (§ 2.4).
- [ ] Reject characters outside the § 2.2 grammar instead of passing them on (§ 3).
