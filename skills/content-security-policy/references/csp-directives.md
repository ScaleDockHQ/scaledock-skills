# CSP directives and source lists

Read this when writing or reviewing the directives of a policy, deciding which directive governs a resource, or debugging why a source matched or did not. Section numbers are from Content Security Policy Level 3 unless another spec is named. Sources are listed in [Sources](../SKILL.md#sources).

## Header syntax

```text
Content-Security-Policy             = 1#serialized-policy        ; § 3.1
Content-Security-Policy-Report-Only = 1#serialized-policy        ; § 3.2
serialized-policy    = serialized-directive *( OWS ";" [ OWS serialized-directive ] )   ; § 2.2
serialized-directive = directive-name [ RWS directive-value ]                           ; § 2.3
directive-name       = 1*( ALPHA / DIGIT / "-" )
```

- Commas separate policies; semicolons separate directives inside one policy (§ 2.2). So `Content-Security-Policy: a, b` is two policies, both enforced.
- Directive names are case-insensitive. A repeated directive in the same policy is ignored after the first, and a policy with no valid directives is dropped (§ 2.2.1, § 2.2.2).
- Directive values cannot contain `;` or `,` (§ 2.3); percent-encode them in paths.
- The server MAY send different policies for different representations of the same resource (§ 3.1, § 3.2).

## Delivery

| Channel                                       | Enforces | Monitors | Limits                                                                                                                                                 |
| --------------------------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Content-Security-Policy` header              | yes      |          | Preferred mechanism (§ 3.1).                                                                                                                           |
| `Content-Security-Policy-Report-Only` header  |          | yes      | Reports, never blocks (§ 3.2). `upgrade-insecure-requests` and `sandbox` are ignored here (UIR § 3.1, § 6.3.2).                                        |
| `<meta http-equiv="Content-Security-Policy">` | yes      |          | No report-only; `report-uri`, `frame-ancestors` and `sandbox` are ignored; applies only to content after the element; later edits are ignored (§ 3.3). |

Policies of every channel are combined: a resource must pass all enforced policies (§ 8.1). Local-scheme documents (`about:blank`, `srcdoc`, `blob:`, `data:`) inherit a copy of the creator's policies, so a page cannot escape its policy by framing content it builds (§ 7.8). A policy sent with a subresource that creates no execution context, such as an image or a script fetched by `<script>`, has no effect (CSP2 § 3.5).

## Source expressions

```text
serialized-source-list = ( source-expression *( RWS source-expression ) ) / "'none'"   ; § 2.3.1
source-expression      = scheme-source / host-source / keyword-source / nonce-source / hash-source
scheme-source  = scheme-part ":"                                  ; https:  data:  wss:
host-source    = [ scheme-part "://" ] host-part [ ":" port-part ] [ path-part ]
host-part      = "*" / [ "*." ] 1*host-char *( "." 1*host-char ) [ "." ]
port-part      = 1*DIGIT / "*"
nonce-source   = "'nonce-" base64-value "'"
hash-source    = "'" ( "sha256" / "sha384" / "sha512" ) "-" base64-value "'"
base64-value   = 1*( ALPHA / DIGIT / "+" / "/" / "-" / "_" ) *2( "=" )
```

Keywords (§ 2.3.1), always single-quoted:

| Keyword                                                 | Effect                                                                                                                  |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `'none'`                                                | Matches nothing, and only when it is the sole expression (§ 6.7.2.7).                                                   |
| `'self'`                                                | The document's origin, plus its `https:`/`wss:` upgrade on the same host and default port; never `blob:` (§ 6.7.2.8).   |
| `'unsafe-inline'`                                       | All inline script or style; disabled by any nonce or hash, and for script by `'strict-dynamic'` (§ 6.7.3.2).            |
| `'unsafe-eval'`                                         | `eval()`, `Function()`, string `setTimeout`/`setInterval`, WebAssembly compilation, CSSOM parsing (§ 6.1.10, § 6.1.13). |
| `'wasm-unsafe-eval'`                                    | WebAssembly compilation only, not JavaScript eval (§ 6.1.10).                                                           |
| `'trusted-types-eval'`                                  | Eval of `TrustedScript` when Trusted Types are required (§ 4.4.1).                                                      |
| `'strict-dynamic'`                                      | Trust propagates to non-parser-inserted scripts; host, scheme, `'self'` and `'unsafe-inline'` ignored (§ 8.2).          |
| `'unsafe-hashes'`                                       | Hashes also match event handlers, `style` attributes and `javascript:` URLs (§ 8.3).                                    |
| `'report-sample'`                                       | Violation reports carry the first 40 characters of the inline code (§ 4.2.3).                                           |
| `'report-sha256'`, `'report-sha384'`, `'report-sha512'` | Send `csp-hash` reports with the hash of each loaded script (§ 4.1.4, § 5).                                             |
| `'unsafe-webtransport-hashes'`                          | Allows WebTransport certificate hashes under `connect-src` (§ 6.1.2).                                                   |
| `'unsafe-allow-redirects'`                              | In the grammar; the draft marks the name as still being bikeshedded (§ 2.3.1).                                          |

Matching rules worth remembering:

- Scheme upgrades are allowed and never downgrades: `http:` matches `https:`, `ws:` matches `wss:`, `http:` and `https:`; `https:` never matches `http:` (§ 6.7.2.9, § 7.7).
- A host without a scheme takes the page's scheme, with the same upgrade (§ 6.7.2.8).
- `*.example.com` matches subdomains at any depth but not `example.com` itself (§ 6.7.2.10).
- A missing port matches only the scheme's default port; `:*` matches any port (§ 6.7.2.11).
- A path ending in `/` matches the directory and below; otherwise it is an exact file. Paths are ignored after a redirect, to avoid leaking cross-origin paths (§ 6.7.2.12, § 7.6). Query strings never affect matching (CSP2 § 4.2.2.2).
- `*` matches any HTTP(S) URL and the page's own scheme; `data:`, `blob:` and custom schemes must be listed explicitly (§ 6.7.2.8).
- IP literals match only `127.0.0.1` (§ 2.3.1). Internationalized hosts MUST be Punycode (§ 2.3.1).
- Allowing `data:` in `script-src` or `default-src` is equivalent to `'unsafe-inline'`, and `blob:` to `'unsafe-eval'` (CSP2 § 4.2.2.1).

## Fetch directives and fallbacks

A fetch directive applies when present; otherwise the first present directive in its fallback list applies; with none present, the request is not restricted (§ 6.8.3, § 6.8.4). There is no merging: an explicit directive replaces `default-src` entirely for its type (§ 6.1.3).

| Directive         | Governs                                                                              | Fallback list                            |
| ----------------- | ------------------------------------------------------------------------------------ | ---------------------------------------- |
| `script-src`      | Script requests, inline scripts and handlers, eval, `javascript:` URLs (§ 6.1.10)    | `default-src`                            |
| `script-src-elem` | Script requests and `<script>` blocks, `javascript:` navigations (§ 6.1.11)          | `script-src`, `default-src`              |
| `script-src-attr` | Inline event handlers (§ 6.1.12)                                                     | `script-src`, `default-src`              |
| `style-src`       | Stylesheets (link, `@import`, `Link` header), inline style, CSSOM parsing (§ 6.1.13) | `default-src`                            |
| `style-src-elem`  | Stylesheets and `<style>` blocks (§ 6.1.14)                                          | `style-src`, `default-src`               |
| `style-src-attr`  | `style` attributes (§ 6.1.15)                                                        | `style-src`, `default-src`               |
| `img-src`         | Images (§ 6.1.6)                                                                     | `default-src`                            |
| `font-src`        | Fonts (§ 6.1.4)                                                                      | `default-src`                            |
| `media-src`       | Audio, video, text tracks (§ 6.1.8)                                                  | `default-src`                            |
| `connect-src`     | `fetch()`, XHR, WebSocket, EventSource, beacons, `<a ping>` (§ 6.1.2)                | `default-src`                            |
| `object-src`      | `<object>` and `<embed>`, including their navigations (§ 6.1.9)                      | `default-src`                            |
| `frame-src`       | Content of child frames (§ 6.1.5)                                                    | `child-src`, `default-src`               |
| `worker-src`      | Worker, SharedWorker, ServiceWorker scripts (§ 6.2.2)                                | `child-src`, `script-src`, `default-src` |
| `child-src`       | Frames and workers, as a shared fallback (§ 6.1.1)                                   | `default-src`                            |
| `manifest-src`    | Application manifests (§ 6.1.7)                                                      | `default-src`                            |

Notes:

- `'unsafe-eval'` is checked on `script-src` (or `default-src`), never on `script-src-elem` or `-attr` (§ 6.1.10, § 6.1.11).
- Prefetch and preconnect hints are allowed by the union of all source lists, and are unrestricted when there is no `default-src`. A policy without `default-src` cannot stop exfiltration, and one wildcard directive (`img-src *`) reopens it (§ 6.1.3, § 8.6).
- `object-src 'none'` also blocks plugin content that has no URL (§ 6.1.9).

## Other directives

| Directive                   | Value                                      | Rule                                                                                                                                                                                                                                           |
| --------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base-uri`                  | source list                                | Restricts `<base href>` (§ 6.3.1). Set it to `'none'` or `'self'`: an injected `<base>` retargets nonced relative scripts (§ 7.3). No fallback to `default-src`.                                                                               |
| `sandbox`                   | HTML sandbox tokens or empty               | Applies iframe-style sandbox flags to the document and workers; ignored in report-only and `meta` (§ 6.3.2).                                                                                                                                   |
| `form-action`               | source list                                | Restricts form submission targets (§ 6.4.1). No fallback to `default-src`.                                                                                                                                                                     |
| `frame-ancestors`           | `'none'`, `'self'`, scheme or host sources | Restricts who may embed the resource in `frame`, `iframe`, `object` or `embed` (§ 6.4.2). No fallback; ignored in `meta`; overrides `X-Frame-Options` when enforced. `'none'` is roughly `DENY` and `'self'` roughly `SAMEORIGIN` (§ 6.4.2.2). |
| `report-to`                 | one token                                  | Names a `Reporting-Endpoints` endpoint (§ 6.5.2).                                                                                                                                                                                              |
| `report-uri`                | URI references                             | Deprecated; ignored when `report-to` is present (§ 6.5.1).                                                                                                                                                                                     |
| `webrtc`                    | `'allow'` or `'block'`                     | `'block'` prevents WebRTC connections (§ 6.2.1).                                                                                                                                                                                               |
| `upgrade-insecure-requests` | empty                                      | Rewrites `http:` subresource requests, same-host navigations and form submissions to `https:` before CSP and mixed-content checks (UIR § 3.1, § 3.1.1, § 4.1).                                                                                 |
| `require-trusted-types-for` | `'script'`                                 | Defined by Trusted Types § 4.2.1; see [`trusted-types.md`](trusted-types.md).                                                                                                                                                                  |
| `trusted-types`             | policy names and keywords                  | Defined by Trusted Types § 4.2.2.                                                                                                                                                                                                              |
| `block-all-mixed-content`   | empty                                      | Obsolete: mixed content that cannot be auto-upgraded is now always blocked (Mixed Content § 6.1). Do not author it.                                                                                                                            |

`upgrade-insecure-requests` details (Upgrade Insecure Requests):

- Upgrades happen before mixed-content and CSP checks, so upgraded requests are not mixed content and `block-all-mixed-content` becomes a no-op (§ 3.1.1).
- There is no fallback: if the HTTPS URL does not answer, the request fails (§ 1.2.3).
- Cross-origin navigations are not upgraded, except form submissions (§ 4.1).
- Nested frames and workers inherit the setting (§ 3.3).
- Browsers send `Upgrade-Insecure-Requests: 1` on navigations; a server MAY redirect HTTP to HTTPS on it, and then SHOULD send `Vary: Upgrade-Insecure-Requests` or make the redirect uncacheable (§ 3.2.1).
- It does not replace HSTS; send `Strict-Transport-Security` too (§ 6.1, § 8.2). The `hsts` skill covers that header.

## Common mistakes

- Two `Content-Security-Policy` headers where the second was meant to add sources: both are enforced, so the stricter wins (§ 8.1).
- `default-src 'none'` expected to stop framing: `frame-ancestors` has no fallback (§ 6.4.2).
- `frame-ancestors` or `report-uri` in a `meta` policy: ignored (§ 3.3).
- `script-src 'self' 'unsafe-inline' 'nonce-…'` expected to allow all inline scripts: the nonce disables `'unsafe-inline'` (§ 6.7.3.2).
- Allowing a whole CDN host in `script-src`: host lists on shared origins are bypassable (§ 8.2); use nonces or hashes.
- `script-src https://example.com/js/app.js` expected to block a redirect to another path on an allowed host: paths are ignored after redirects (§ 7.6).
- Unquoted keywords (`self`, `none`): they parse as host names.
