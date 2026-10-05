# Fetch Metadata and resource isolation

Read this when a server, proxy or CDN should accept or refuse requests based on how the browser made them, or when reviewing a resource isolation policy. Section numbers are from Fetch Metadata Request Headers (W3C Working Draft, 21 September 2026). Sources are listed in [Sources](../SKILL.md#sources).

## The headers

Browsers add these request headers; the server reads them. All are Structured Fields (RFC 9651) (§ 2).

| Header           | Type    | Values                                                                                                                                              | Meaning                                                         |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `Sec-Fetch-Site` | token   | `same-origin`, `same-site`, `cross-site`, `none`                                                                                                    | Relation between the initiator's origin and the target (§ 2.3). |
| `Sec-Fetch-Mode` | token   | `cors`, `navigate`, `no-cors`, `same-origin`, `websocket`                                                                                           | The request's mode (§ 2.2).                                     |
| `Sec-Fetch-Dest` | token   | Fetch request destinations, with `empty` for the empty destination: for example `document`, `iframe`, `image`, `script`, `style`, `worker`, `empty` | Where the response will be used (§ 2.1).                        |
| `Sec-Fetch-User` | boolean | `?1`, or absent                                                                                                                                     | Sent only on navigations triggered by user activation (§ 2.4).  |

Examples (§ 1.1):

```http
Sec-Fetch-Dest: image
Sec-Fetch-Mode: no-cors
Sec-Fetch-Site: cross-site
```

```http
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1
```

Rules for servers:

- The headers are sent only to potentially trustworthy URLs (§ 3), so plain HTTP requests, older browsers and non-browser clients arrive without them.
- Servers SHOULD ignore a header with an invalid value, for forward compatibility (§ 2.1, § 2.2, § 2.3).
- `none` marks a navigation the user caused directly, such as the address bar or a bookmark (§ 2.3, § 4.3).
- `Sec-Fetch-Site` covers the whole redirect chain: one cross-site hop makes the rest `cross-site`, and `none` is kept through redirects (§ 4.1).
- The `Sec-` prefix makes them forbidden header names that page script cannot set, so a malicious site cannot make the browser lie (§ 4.2). This protects against browsers being steered; it says nothing about non-browser clients, which can send any value.
- Extension requests may carry `same-origin` or `cross-site` depending on the extension's access (§ 4.4).
- When a response depends on these headers, include them in `Vary` so caches keep the variants apart, for example `Vary: Accept-Encoding, Sec-Fetch-Site` (§ 5.1).

## Why a resource isolation policy

Endpoints that reveal user data or act for the user are reachable from any site, with the user's cookies attached. Some attacks are hard to stop otherwise ("simple" CSRF) and some are nearly impossible (cross-site search, timing and length leaks). Fetch Metadata lets the server reject such requests before they reach the application, even at a reverse proxy or CDN (§ 1).

The specification defines the headers and that goal, not a specific policy. The policy below follows from the header definitions; adjust the exceptions to the application.

## A resource isolation policy

1. **No `Sec-Fetch-Site`: allow.** The client did not send metadata (§ 3). Other defences such as cookies with `SameSite` still apply; the `http-cookies` skill covers them.
2. **`same-origin`, `same-site` or `none`: allow.** These come from the site itself, a sibling subdomain, or the user directly (§ 2.3, § 4.3). Use `same-origin` only, if sibling subdomains are not trusted.
3. **Cross-site top-level navigation: allow** when `Sec-Fetch-Mode` is `navigate` and the method is `GET` or `HEAD`, so links from other sites keep working. A cross-site `POST` navigation is a form submission from another site, the classic CSRF case (§ 1).
4. **Explicit exceptions: allow.** Endpoints meant for cross-site use, such as public CORS APIs, public static assets loaded by other sites, embeddable widgets and callback URLs that receive cross-site form posts.
5. **Everything else: reject**, for example with `403`, and log `Sec-Fetch-Site`, `Sec-Fetch-Mode`, `Sec-Fetch-Dest` and the path.

Start in log-only mode, read the logs, add exceptions, then enforce.

```ts
type Decision = "allow" | "reject";

const SAFE_SITES = new Set(["same-origin", "same-site", "none"]);
const SAFE_METHODS = new Set(["GET", "HEAD"]);

export function isolationPolicy(
  method: string,
  headers: Headers,
  isCrossSiteEndpoint: (path: string) => boolean,
  path: string,
): Decision {
  const site = headers.get("sec-fetch-site");
  if (site === null) return "allow"; // § 3: only sent to potentially trustworthy URLs
  if (!["same-origin", "same-site", "cross-site", "none"].includes(site))
    return "allow"; // § 2.3: ignore invalid values
  if (SAFE_SITES.has(site)) return "allow";

  const mode = headers.get("sec-fetch-mode");
  if (mode === "navigate" && SAFE_METHODS.has(method.toUpperCase()))
    return "allow";

  if (isCrossSiteEndpoint(path)) return "allow";
  return "reject";
}
```

When the response differs by these headers, send `Vary: Sec-Fetch-Site, Sec-Fetch-Mode` (§ 5.1).

## Using `Sec-Fetch-Dest` and `Sec-Fetch-User`

- `Sec-Fetch-Dest` lets an endpoint refuse a context it never serves, for example an API that is never loaded as `image`, `script` or `iframe`. Unknown destinations should be ignored, not rejected (§ 2.1).
- `Sec-Fetch-User: ?1` appears only on user-activated navigations and is otherwise absent (§ 2.4). Treat its absence as "not known to be user-activated", not as an attack.

## Relation to the other headers

- CSP `frame-ancestors` controls who may frame a response; Fetch Metadata lets the server see `Sec-Fetch-Dest: iframe` before responding. Use `frame-ancestors` for framing and Fetch Metadata for cross-site request rejection.
- Fetch Metadata does not replace CSRF tokens or `SameSite` cookies for clients that send no metadata (§ 3).
