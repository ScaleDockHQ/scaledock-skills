# Permissions Policy

Read this when writing a `Permissions-Policy` or `Permissions-Policy-Report-Only` header, delegating a feature to an iframe with `allow`, or converting a `Feature-Policy` header. Section numbers are from Permissions Policy (W3C Working Draft, 22 September 2026) unless another spec is named. Sources are listed in [Sources](../SKILL.md#sources).

## Model

- A **policy-controlled feature** is an API or behaviour, named by a token such as `geolocation`, that a policy can enable or disable (§ 4.1). Browsers need not support every feature, and unknown tokens are ignored (§ 4.1, § 9.2).
- Each feature has a **default allowlist**, defined by the spec of that feature (§ 4.1, § 4.8):
  - `*`: allowed in top-level documents and in all child frames unless a container or header policy disallows it;
  - `'self'`: allowed in top-level documents and same-origin child frames, disallowed in cross-origin frames by default.
- A document's policy combines the **inherited policy** from its parent and the frame's container policy with the **declared policy** from its own header (§ 4.2 to § 4.5). A feature disabled by the parent cannot be re-enabled by the child (§ 9.6, § 9.7).
- Both the embedder's header and the iframe's `allow` attribute must allow an origin for a cross-origin frame to get a feature; Permissions Policy changed this from OR to AND (§ 9.7, § 13.1).

## The header

`Permissions-Policy` is a Structured Fields dictionary (§ 6.1). Each member name is a feature token; the value is an allowlist (§ 5.2):

| Member value                 | Meaning                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------- |
| `()`                         | Empty list: the feature is disabled everywhere, including nested documents (§ 2). |
| `*`                          | Every origin (§ 4.7, § 9.2).                                                      |
| `self`                       | The document's own origin (bare token, no quotes) (§ 9.2).                        |
| `"https://example.com"`      | A quoted origin string (§ 5.2).                                                   |
| `(self "https://a.example")` | An inner list of the above (§ 5.2).                                               |

```http
Permissions-Policy: fullscreen=(), geolocation=()
Permissions-Policy: geolocation=(self "https://example.com")
Permissions-Policy: geolocation=(self "https://example.com" "https://*.example.com")
Permissions-Policy: geolocation=(self "https://example.com:*")
```

The examples are from § 2. Details:

- Origin strings are CSP-style host source expressions, so `https://*.example.com` matches subdomains but not `https://example.com`, which must be listed too; `:*` matches any port (§ 2, § 4.7, § 5.1).
- `*` inside a list makes the whole allowlist `*` (§ 9.2).
- The only parameter is `report-to`, a token naming a reporting endpoint; other parameters are ignored (§ 5.2, § 9.2).
- A member value of any other form is ignored entirely; other items inside an inner list are dropped (§ 5.2).
- Structured Fields use commas between members, `=` between feature and allowlist, and parentheses for lists; this differs from both CSP and the old `Feature-Policy` syntax. The `http-semantics` skill covers field syntax.

## The iframe `allow` attribute

The attribute uses the ASCII serialization, with semicolons between directives and spaces between origins (§ 5.1, § 6.2):

```html
<iframe src="https://other.com/map" allow="geolocation"></iframe>
<iframe
  allow="camera https://app1.site.com https://app3.site.com;
         microphone https://app2.site.com https://app3.site.com"
  src="https://doc1.site.com"
  sandbox="allow-same-origin allow-scripts"
>
</iframe>
```

- A feature with no origins defaults to `'src'`, the origin of the iframe's `src` (§ 6.2, § 9.3).
- Allowed values are `*`, `'self'`, `'src'`, `'none'` and origins (§ 5.1).
- `allowfullscreen` grants `fullscreen` with `*` unless `allow` names `fullscreen`, in which case the stricter `allow` wins (§ 6.3.1, § 9.4).
- The `allowpaymentrequest` attribute was removed (§ 13.1).
- Permissions Policy works with iframe `sandbox`, not instead of it (§ 3).

Examples in § 2 show that geolocation, camera and microphone are disabled by default in cross-origin frames and must be delegated with `allow`.

## Report-only and reports

```http
Permissions-Policy-Report-Only: geolocation=();report-to=pp-endpoint
Reporting-Endpoints: pp-endpoint="https://reports.example.com/pp"
```

- `Permissions-Policy-Report-Only` has the same syntax and reports instead of enforcing (§ 8.1).
- Violations report as type `permissions-policy-violation` with `featureId`, `sourceFile`, `lineNumber`, `columnNumber` and `disposition` (§ 8, § 9.13). Frames that would be denied a feature at load produce `potential-permissions-policy-violation` reports that add `allowAttribute` and `srcAttribute` (§ 8, § 9.12, § 9.14).
- The endpoint name comes from the member's `report-to` parameter (§ 9.11), resolved through `Reporting-Endpoints` (Reporting § 3.2).

## Script introspection

`document.permissionsPolicy` and `iframe.permissionsPolicy` expose `allowsFeature(feature, origin?)`, `features()`, `allowedFeatures()` and `getAllowlistForFeature(feature)` (§ 7.1, § 7.2). The iframe view shows only what the embedder could already deduce, and does not reflect headers sent by the framed document (§ 12.1).

## Feature tokens

The companion list "Policy Controlled Features" is non-normative and names the spec that defines each feature (§ 4.1). Tokens it lists as standardized include `accelerometer`, `ambient-light-sensor`, `attribution-reporting`, `autoplay`, `bluetooth`, `camera`, `compute-pressure`, `cross-origin-isolated`, `display-capture`, `encrypted-media`, `fullscreen`, `geolocation`, `gyroscope`, `hid`, `identity-credentials-get`, `idle-detection`, `keyboard-map`, `magnetometer`, `microphone`, `midi`, `otp-credentials`, `payment`, `picture-in-picture`, `publickey-credentials-get`, `screen-wake-lock`, `serial`, `storage-access`, `sync-xhr`, `usb`, `web-share`, `window-management`, `xr-spatial-tracking`, and the `ch-ua*` client hint tokens. Check the list and the feature's own spec before relying on a token or its default allowlist; support differs per browser.

## Writing a lockdown policy

1. List the features the page and its iframes actually use.
2. Disable the rest that matter to the threat model with `()`.
3. Restrict used features to `self` or named origins.
4. Delegate to each iframe with `allow`, naming the frame's origin.
5. Ship it in `Permissions-Policy-Report-Only` first, then enforce.

```http
Permissions-Policy: camera=(), microphone=(), geolocation=(self), payment=(self "https://pay.example"), usb=()
```

## Security notes

- An embedder can switch features off in a frame without the frame's consent, which can break assumptions: a page that relies on synchronous XHR for a security check fails open if framed with `sync-xhr` disabled. Mitigate with framing protection (`frame-ancestors` or `X-Frame-Options`) and feature detection (§ 12.2).
- A frame can learn something about its embedder from the policy imposed on it (§ 12.3).
- Users grant permissions to the top-level site, so delegating to user-generated content with `allow` from your own origin lends it your permissions; host such content on separate top-level origins (§ 2).
