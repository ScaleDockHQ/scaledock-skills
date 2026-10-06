---
name: content-security-policy
description: >-
  Content Security Policy Level 3: write strict CSP headers, plus the W3C
  Trusted Types, Permissions Policy and Fetch Metadata Request Headers a
  server sets and checks to lock down documents. Covers CSP Level 3 (current,
  Working Draft) with CSP Level 2 supported and CSP 1.0,
  X-Content-Security-Policy and X-WebKit-CSP legacy: directives, source lists,
  nonces and hashes, 'strict-dynamic', 'unsafe-hashes', report-to, report-uri,
  Report-Only, frame-ancestors and upgrade-insecure-requests. Trusted Types:
  require-trusted-types-for 'script' and the default policy. Permissions
  Policy: the structured header, allowlists and the iframe allow attribute,
  with Feature-Policy legacy. Fetch Metadata: Sec-Fetch-Site, -Mode, -Dest and
  -User for a resource isolation policy. Use when writing or reviewing
  security headers. Also CSP Embedded Enforcement, Mixed Content, Reporting
  API and Upgrade Insecure Requests.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.2.0"
  kind: standard
---

# Content Security Policy and companion headers

Content Security Policy (CSP), published by the W3C Web Application Security Working Group, is a response header that tells the browser which scripts, styles, frames and connections a document may use, and which origins may embed it. Three companion specifications from the same group lock down the same document from other angles: Trusted Types guards DOM injection sinks, Permissions Policy turns browser features on or off per origin, and Fetch Metadata Request Headers tell the server how a request was made so it can refuse cross-site ones. With this skill the agent writes, deploys and reviews those headers on the server side.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: server that sets the headers (an app, a framework middleware, a reverse proxy or CDN), reviewer of an existing policy, or collector of violation reports.
- Target version: CSP Level 3 (default, posture: build). CSP Level 2 is supported for a named consumer that cannot parse Level 3 keywords. CSP 1.0 and its `X-Content-Security-Policy` and `X-WebKit-CSP` headers are legacy: read and upgrade, never author. Trusted Types, Permissions Policy and Fetch Metadata Request Headers each have one current line (posture: build); Feature Policy and its `Feature-Policy` header are legacy. CSP Embedded Enforcement is the current line of its family, with posture track, because its only text is a Working Draft. Mixed Content (Candidate Recommendation Draft, 23 February 2023) and Upgrade Insecure Requests (Candidate Recommendation, 8 October 2015) are current with posture build. Reporting API (Working Draft, 11 June 2025) is current with posture track. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check the W3C TR pages for a newer Working Draft, Candidate Recommendation or Recommendation, and update the pins.
- Page inventory: how scripts reach the page (server templates, a bundler, third-party tags), whether HTML responses are cached, which origins frame the page, and which browser features the page or its iframes use.
- Report collector: the HTTPS URL that will receive violation reports, or none yet.

## Invariants

1. **Headers, not meta, for the full policy.** `Content-Security-Policy` enforces and `Content-Security-Policy-Report-Only` only monitors (CSP3 § 3.1, § 3.2). Report-only is not supported in a `meta` element, and a `meta` policy ignores `report-uri`, `frame-ancestors` and `sandbox` (CSP3 § 3.3, § 6.4.2).
2. **Every policy applies.** Several policies, from several headers, comma-separated in one header, or from `meta`, are all enforced; adding a policy can only restrict further (CSP3 § 8.1, § 2.2.2). Loosen by editing the one policy, never by adding another.
3. **Nonces are fresh and unguessable.** A server MUST generate a unique nonce each time it transmits a policy; it SHOULD be at least 128 bits from a cryptographically secure random generator (CSP3 § 7.1). A cached HTML response that replays a nonce breaks this.
4. **No `'unsafe-inline'` or `data:` for script.** Policies SHOULD cover script and plugins with `script-src` and `object-src`, or `default-src`, and SHOULD NOT allow `'unsafe-inline'` or `data:` (CSP3 § 6). A nonce or hash in the list disables `'unsafe-inline'` (CSP3 § 6.7.3.2).
5. **Strict CSP shape.** `script-src` uses only nonces and/or hashes with `'strict-dynamic'`, and `base-uri` is `'self'` or `'none'` (CSP3 § 8.5). With `'strict-dynamic'`, host and scheme sources, `'self'` and `'unsafe-inline'` are ignored for script, so they are only fallbacks for older browsers (CSP3 § 8.2).
6. **Hashes match exact bytes.** An inline hash is the base64 SHA-256, SHA-384 or SHA-512 of the UTF-8 script text (CSP3 § 6.7.3.3); an external script matches a hash only through its `integrity` metadata, and every listed item must match (CSP3 § 6.7.2.4, § 8.4). Hashes cover event handlers and `style` attributes only with `'unsafe-hashes'` (CSP3 § 6.7.3.3, § 8.3).
7. **`frame-ancestors` is explicit.** It does not fall back to `default-src`, MUST be ignored in `meta`, and an enforced `frame-ancestors` overrides `X-Frame-Options` (CSP3 § 6.4.2, § 6.4.2.2).
8. **Reports go to a declared HTTPS endpoint.** `report-to` names an endpoint from the `Reporting-Endpoints` header, whose URL MUST be potentially trustworthy (CSP3 § 6.5.2; Reporting § 3.2). `report-uri` is deprecated and ignored when `report-to` is present (CSP3 § 6.5.1). Report contents are attacker-controlled data (CSP3 § 7.5).
9. **Trusted Types needs both directives to be useful.** `require-trusted-types-for 'script'` makes DOM XSS sinks reject strings; `trusted-types` lists the policy names that may be created, and names are unique unless `'allow-duplicates'` is set (Trusted Types § 4.2.1, § 4.2.2, § 2.3.1).
10. **`Permissions-Policy` is a Structured Fields dictionary.** Member values are `*`, `self`, a quoted origin string, or an inner list of those; `()` disables the feature everywhere; unknown features are ignored (Permissions Policy § 5.2, § 6.1, § 2). The header and the iframe `allow` attribute both must allow a feature (Permissions Policy § 9.7, § 13.1).
11. **Fetch Metadata absence is not an attack.** User agents send `Sec-Fetch-*` only to potentially trustworthy URLs (Fetch Metadata § 3), and servers SHOULD ignore invalid values (§ 2.1 to § 2.3). Responses that depend on these headers carry `Vary` (§ 5.1).
12. **`upgrade-insecure-requests` is not HSTS.** It is ignored in report-only and does not replace `Strict-Transport-Security` (Upgrade Insecure Requests § 3.1, § 6.1, § 8.2). `block-all-mixed-content` is obsolete (Mixed Content § 6.1).

## Workflow

1. **Pick the version.** Target CSP Level 3 syntax and keep the CSP Level 2 fallbacks of step 3 in the same policy. Read an existing `X-Content-Security-Policy`, `X-WebKit-CSP` or `Feature-Policy` header as input to step 10.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target lines are recorded, and nothing legacy is authored.
2. **Inventory the document.** List inline scripts, inline event handlers, `javascript:` URLs, `eval()` and `new Function()`, external script origins, frames, form targets, `base` elements, and who embeds the page.
   -> [`references/csp-directives.md`](references/csp-directives.md)
   ✓ Each item maps to the directive that governs it.
3. **Write a strict CSP.** Nonce every script element (or hash static inline scripts), add `'strict-dynamic'`, `object-src 'none'` and `base-uri 'none'` or `'self'`, plus `'unsafe-inline' https:` as fallbacks the CSP Level 3 browser ignores.
   -> [`references/strict-csp-and-reporting.md`](references/strict-csp-and-reporting.md)
   ✓ No script runs without a nonce or hash, and the nonce changes on every response.
4. **Add the document and navigation directives.** Set `frame-ancestors`, `form-action` and, during an HTTPS migration, `upgrade-insecure-requests`. Add `default-src` when the goal includes limiting exfiltration (CSP3 § 8.6).
   -> [`references/csp-directives.md`](references/csp-directives.md)
   ✓ `frame-ancestors` is in the header, not in `meta`.
5. **Ship it report-only, then enforce.** Send the policy in `Content-Security-Policy-Report-Only` with `report-to` (and `report-uri` for older browsers), collect reports, fix the code, then move the same policy to `Content-Security-Policy`.
   -> [`references/strict-csp-and-reporting.md`](references/strict-csp-and-reporting.md)
   ✓ The report collector parses both `application/reports+json` and `application/csp-report`, escapes what it shows, and the enforced policy produces no unexpected reports.
6. **Turn on Trusted Types.** Route every DOM XSS sink through named policies, add `require-trusted-types-for 'script'` and `trusted-types <names>` in report-only first, and keep any `default` policy strict and temporary.
   -> [`references/trusted-types.md`](references/trusted-types.md)
   ✓ No `require-trusted-types-for` violation in report-only for the tested flows.
7. **Set `Permissions-Policy`.** Disable unused features with `()`, restrict the rest to `self` or named origins, and delegate to iframes with `allow`.
   -> [`references/permissions-policy.md`](references/permissions-policy.md)
   ✓ The header parses as a Structured Fields dictionary, and every iframe that needs a feature is allowed by both the header and `allow`.
8. **Add a resource isolation policy.** On the server or proxy, reject cross-site requests that are not navigations, keep exceptions explicit, and allow requests without `Sec-Fetch-Site`.
   -> [`references/fetch-metadata.md`](references/fetch-metadata.md)
   ✓ Same-origin, same-site, `none` and plain cross-site navigations still work; a cross-site `no-cors` request to an API is refused.
9. **Check every HTML response.** The policy belongs on each response that creates a document or worker, including error pages; policies sent with a subresource such as an image or script are discarded (CSP2 § 3.5).
   -> [`references/strict-csp-and-reporting.md`](references/strict-csp-and-reporting.md)
   ✓ A test fetches each route and asserts the headers.
10. **Upgrade** (only when asked). Follow the upgrade section for the source line: CSP 1.0 or the prefixed headers to CSP Level 3, CSP Level 2 to CSP Level 3, or `Feature-Policy` to `Permissions-Policy`.
    -> [`references/versions.md`](references/versions.md)
    ✓ The upgraded headers behave the same in report-only before enforcement.

## Verify before done

- [ ] `Content-Security-Policy` is a header on every HTML response, and `Content-Security-Policy-Report-Only` is never placed in `meta` (CSP3 § 3.3).
- [ ] Each response has a new nonce of at least 128 random bits, and that nonce appears only on intended elements (CSP3 § 7.1).
- [ ] `script-src` has no `'unsafe-inline'` without a nonce, hash or `'strict-dynamic'` that disables it, and no `data:` (CSP3 § 6, § 6.7.3.2).
- [ ] `object-src 'none'` and `base-uri` `'none'` or `'self'` are set (CSP3 § 6, § 8.5, § 7.3).
- [ ] `frame-ancestors` is set in a header when the page must not be framed by everyone (CSP3 § 6.4.2).
- [ ] `report-to` names an endpoint defined in `Reporting-Endpoints` with an `https:` URL (Reporting § 3.2).
- [ ] With Trusted Types, `trusted-types` lists every policy name the code creates, and the `default` policy is not a pass-through (Trusted Types § 2.3.4).
- [ ] `Permissions-Policy` uses Structured Fields syntax, not the `Feature-Policy` syntax (Permissions Policy § 5.2).
- [ ] The resource isolation policy allows requests without `Sec-Fetch-Site`, and varying responses include `Vary` (Fetch Metadata § 3, § 5.1).
- [ ] `Strict-Transport-Security` is sent alongside `upgrade-insecure-requests` (Upgrade Insecure Requests § 6.1).

## Reference index

- **`references/versions.md`**: every version line with status, which to use, what changed from CSP 1.0 to Level 2 to Level 3, and from Feature Policy to Permissions Policy, with upgrade steps. Load for steps 1 and 10.
- **`references/csp-directives.md`**: header grammar, source expressions and matching, every fetch, document, navigation and reporting directive, the fallback chains, and directives from other specs. Load for steps 2 and 4.
- **`references/strict-csp-and-reporting.md`**: nonce and hash strict CSP, `'strict-dynamic'`, `'unsafe-hashes'`, nonce attacks, the report-only rollout, `report-to`, `report-uri`, report formats, and a TypeScript middleware sketch. Load for steps 3, 5 and 9.
- **`references/trusted-types.md`**: the three types, policies, `createPolicy`, the default policy, both directives, `'trusted-types-eval'`, and rollout. Load for step 6.
- **`references/permissions-policy.md`**: the header and `allow` attribute syntax, allowlists, default allowlists, inheritance, report-only, and the feature list. Load for step 7.
- **`references/fetch-metadata.md`**: the four `Sec-Fetch-*` headers and their values, redirects, and a resource isolation policy with exceptions. Load for step 8.

## Related skills

- `hsts` for `Strict-Transport-Security`, which `upgrade-insecure-requests` does not replace: `npx skills add ScaleDockHQ/scaledock-skills --skill hsts`.
- `http-cookies` for `SameSite`, `Secure` and cookie prefixes that complement Fetch Metadata against CSRF: `npx skills add ScaleDockHQ/scaledock-skills --skill http-cookies`.
- `http-semantics` for header field syntax, `Vary` and caching of responses that carry nonces: `npx skills add ScaleDockHQ/scaledock-skills --skill http-semantics`.
- `owasp-asvs` for the verification requirements that call for these headers: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-asvs`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Content Security Policy Level 3](https://www.w3.org/TR/CSP3/): W3C Working Draft, WD-CSP3-20260916 (16 September 2026), checked 2026-10-05.
- [Content Security Policy Level 3 (Editor's Draft)](https://w3c.github.io/webappsec-csp/): Editor's Draft, 16 September 2026, same normative text as the Working Draft, checked 2026-10-05.
- [Content Security Policy Level 2](https://www.w3.org/TR/CSP2/): W3C Recommendation, REC-CSP2-20161215 (15 December 2016), checked 2026-10-05.
- [Content Security Policy 1.0](https://www.w3.org/TR/CSP1/): W3C Working Group Note (work discontinued), NOTE-CSP1-20150219 (19 February 2015), checked 2026-10-05.
- [Content Security Policy 1.0 (Candidate Recommendation)](https://www.w3.org/TR/2012/CR-CSP-20121115/): W3C Candidate Recommendation, superseded, CR-CSP-20121115 (15 November 2012), checked 2026-10-05.
- [Trusted Types](https://www.w3.org/TR/trusted-types/): W3C Working Draft, WD-trusted-types-20260623 (23 June 2026), checked 2026-10-05.
- [Permissions Policy](https://www.w3.org/TR/permissions-policy/): W3C Working Draft, WD-permissions-policy-1-20260922 (22 September 2026), checked 2026-10-05.
- [Policy Controlled Features](https://github.com/w3c/webappsec-permissions-policy/blob/10d8736ea4f13e38410fe0b7424ae04e513b528c/features.md): non-normative companion list, commit 10d8736 (2026-05-26), checked 2026-10-05.
- [Feature Policy](https://www.w3.org/TR/2019/WD-feature-policy-1-20190416/): W3C First Public Working Draft, superseded by Permissions Policy, WD-feature-policy-1-20190416 (16 April 2019), checked 2026-10-05.
- [Fetch Metadata Request Headers](https://www.w3.org/TR/fetch-metadata/): W3C Working Draft, WD-fetch-metadata-20260921 (21 September 2026), checked 2026-10-05.
- [Upgrade Insecure Requests](https://www.w3.org/TR/upgrade-insecure-requests/): W3C Candidate Recommendation, CR-upgrade-insecure-requests-20151008 (8 October 2015), checked 2026-10-05.
- [Mixed Content](https://www.w3.org/TR/mixed-content/): W3C Candidate Recommendation Draft, CRD-mixed-content-20230223 (23 February 2023), checked 2026-10-05.
- [Reporting API](https://www.w3.org/TR/reporting-1/): W3C Working Draft, WD-reporting-1-20250611 (11 June 2025), checked 2026-10-05.
- [Content Security Policy: Embedded Enforcement](https://www.w3.org/TR/csp-embedded-enforcement/): W3C Working Draft, 7 May 2026 (WD-csp-embedded-enforcement-20260507), checked 2026-10-06. Posture: track. Its abstract defines a way for a page to embed a document only if that document agrees to enforce a set of restrictions.
