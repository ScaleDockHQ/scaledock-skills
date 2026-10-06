# Versions and upgrades

Read this when choosing which CSP level to write, reading a policy written for an older level or a prefixed header, upgrading one, or checking the status of the companion specifications. Sources: CSP Level 3 (§ 1.3 lists its changes), CSP Level 2 (§ 1.1 lists its changes), the CSP 1.0 Note and Candidate Recommendation, Trusted Types, Permissions Policy (§ 13.1 lists its changes since Feature Policy), the Feature Policy draft and Fetch Metadata Request Headers, listed in [Sources](../SKILL.md#sources). Section numbers below are from the spec named in each bullet.

## Version lines

The skill covers five families. Embedded Enforcement is its own family. CSP has three levels; Trusted Types, Permissions Policy and Fetch Metadata are separately versioned W3C specifications with one line each.

| Id                         | Line                           | Status    | Revision                                      | Posture | Summary                                                                                                                |
| -------------------------- | ------------------------------ | --------- | --------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| `csp3`                     | CSP Level 3                    | current   | W3C Working Draft, 16 September 2026          | build   | Rewritten on Fetch; `'strict-dynamic'`, `'unsafe-hashes'`, `report-to`, `worker-src`, `-elem` and `-attr`.             |
| `csp2`                     | CSP Level 2                    | supported | W3C Recommendation, 15 December 2016          |         | Nonces, hashes, `frame-ancestors`, `base-uri`, `form-action`, `child-src`, paths. CSP Level 3 will obsolete it.        |
| `csp1`                     | CSP 1.0                        | legacy    | W3C Note, 19 February 2015 (CR of 2012)       |         | Work discontinued. Host lists only, no nonces or hashes. Shipped as `X-Content-Security-Policy`/`X-WebKit-CSP`.        |
| `trusted-types`            | Trusted Types                  | current   | W3C Working Draft, 23 June 2026               | build   | `require-trusted-types-for 'script'`, `trusted-types`, policies and the default policy.                                |
| `permissions-policy`       | Permissions Policy             | current   | W3C Working Draft, 22 September 2026          | build   | `Permissions-Policy` Structured Fields header, `allow` attribute, report-only header.                                  |
| `feature-policy`           | Feature Policy                 | legacy    | W3C First Public Working Draft, 16 April 2019 |         | The earlier name of Permissions Policy, with the `Feature-Policy` header and a different syntax.                       |
| `fetch-metadata`           | Fetch Metadata Request Headers | current   | W3C Working Draft, 21 September 2026          | build   | `Sec-Fetch-Dest`, `Sec-Fetch-Mode`, `Sec-Fetch-Site`, `Sec-Fetch-User` request headers.                                |
| `csp-embedded-enforcement` | CSP Embedded Enforcement       | current   | W3C Working Draft, 7 May 2026                 | track   | A page embeds a document only if it agrees to enforce restrictions. The only line is a draft, so the posture is track. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Posture **build** on the current lines: CSP Level 3, Trusted Types, Permissions Policy and Fetch Metadata are all W3C Working Drafts "intended to become a W3C Recommendation" (status sections of each), yet they are the texts the platform implements. Build to them now, and keep the CSP Level 2 fallbacks so older browsers degrade safely. CSP Level 2 stays supported: it is a W3C Recommendation, and CSP Level 3 is still a Working Draft. No CSP Level 4 draft was published. CSP Embedded Enforcement is current with posture track.

## Which version to use

- Write CSP Level 3 policies. Its keywords degrade in older browsers by design: `'unsafe-inline' https: 'nonce-…' 'strict-dynamic'` acts as `'unsafe-inline' https:` in CSP 1.0 browsers, as `https: 'nonce-…'` in CSP Level 2 browsers and as `'nonce-…' 'strict-dynamic'` in CSP Level 3 browsers (CSP3 § 8.2).
- Stay inside CSP Level 2 syntax only when a named consumer rejects Level 3 tokens. Remember that CSP Level 2 allows one `Content-Security-Policy` header field per representation (CSP2 § 3.1).
- Treat a CSP 1.0 policy, or an `X-Content-Security-Policy` or `X-WebKit-CSP` header, as input to an upgrade. The CSP 1.0 Note says the work "should not be referenced or used as a basis for implementation" (CSP1, Status).
- Send `Permissions-Policy`, never `Feature-Policy`, for new work.
- Use Trusted Types and Fetch Metadata as specified; each has a single line.

## What changed

### CSP Level 3

From CSP3 § 1.3 and the text:

- Rewritten in terms of Fetch, with pre-request, post-request, inline, navigation and initialization checks per directive (§ 1.3 item 1, § 2.3).
- `frame-src` is undeprecated and falls back to `child-src`, then `default-src`; `worker-src` is new and falls back to `child-src`, `script-src`, `default-src` (§ 1.3 item 2, § 6.8.3).
- `script-src-elem`, `script-src-attr`, `style-src-elem` and `style-src-attr` split elements from attributes (§ 6.1.11, § 6.1.12, § 6.1.14, § 6.1.15).
- Insecure schemes and ports match their secure variants, and `'self'` matches `https:` and `wss:` on the same host (§ 1.3 item 3, § 6.7.2.8, § 6.7.2.9).
- `*` matches HTTP(S) and the page's own scheme only; other schemes must be listed (§ 1.3 item 9, § 6.7.2.8).
- `manifest-src` is new (§ 1.3 item 5); `report-uri` is deprecated in favour of `report-to` and the Reporting API (§ 1.3 item 6, § 6.5).
- `'strict-dynamic'` lets trusted scripts load non-parser-inserted scripts (§ 1.3 item 7, § 8.2), and `'unsafe-hashes'` lets hashes match event handlers, `style` attributes and `javascript:` URLs (§ 1.3 item 8, § 8.3).
- Hashes can allow external scripts through `integrity` metadata (§ 1.3 item 10, § 8.4).
- Inline violations report `inline`, eval violations `eval`; `'report-sample'` adds a 40-character sample (§ 1.3 items 4 and 11, § 2.4).
- New keywords: `'wasm-unsafe-eval'`, `'trusted-types-eval'`, `'report-sha256'`/`'report-sha384'`/`'report-sha512'` (csp-hash reports), `'unsafe-webtransport-hashes'`, `'unsafe-allow-redirects'` (§ 2.3.1), and the `webrtc` directive (§ 6.2.1).
- One header may carry several comma-separated policies (§ 3.1, § 2.2), and `base64url` hash values are accepted (§ 2.3.1).
- `plugin-types` is gone: it is not in the CSP Level 3 directive registry (§ 10.1).

### CSP Level 2

From CSP2 § 1.1:

- Breaking: source-expression paths are ignored after a redirect (§ 4.2.2.3); Workers are controlled by `child-src`, not `script-src`; Workers get their own policy (§ 5.1).
- New directives: `base-uri`, `child-src` (replacing `frame-src`), `form-action`, `frame-ancestors` (to supplant `X-Frame-Options`), `plugin-types`.
- Nonces and hashes for inline script and style (§ 4.2.4, § 4.2.5), with the 128-bit random nonce rule (§ 4.2).
- `SecurityPolicyViolationEvent`, and new report fields `effective-directive`, `status-code`, `source-file`, `line-number`, `column-number` (§ 4.4, § 6).
- `meta` delivery, with `report-uri`, `frame-ancestors` and `sandbox` removed from `meta` policies (§ 3.3).
- `*` no longer matches `blob:`, `data:` or `filesystem:` (§ 4.2.2).

### CSP 1.0

- Directives `default-src`, `script-src`, `object-src`, `style-src`, `img-src`, `media-src`, `frame-src`, `font-src`, `connect-src`, `sandbox` (optional) and `report-uri` (CR § 4).
- Source expressions are schemes, hosts, ports, `'self'`, `'unsafe-inline'` and `'unsafe-eval'`; paths are reserved and ignored (CR § 3.2.2, § 5.1). No nonces or hashes.
- Delivered by header only; a server may send several `Content-Security-Policy` fields (CR § 3.1.1).
- Before standardization, Firefox and Chrome implemented drafts as `X-Content-Security-Policy` and `X-WebKit-CSP` (CSP1 Note, Status).

### Trusted Types

The single published line: `TrustedHTML`, `TrustedScript`, `TrustedScriptURL`, `trustedTypes.createPolicy`, the `default` policy, and the `require-trusted-types-for` and `trusted-types` CSP directives (Trusted Types § 2.2, § 2.3, § 4.2). CSP Level 3 adds `'trusted-types-eval'` so `eval()` can run with `TrustedScript` under Trusted Types (CSP3 § 4.4.1).

### Permissions Policy

From Permissions Policy § 13.1 (changes since the Feature Policy FPWD):

- Renamed from Feature Policy, and `Permissions-Policy` is defined as a Structured Fields dictionary.
- Header and attribute combine with AND semantics instead of OR.
- The same-origin-domain check became same-origin, and `allowpaymentrequest` was removed.
  Comparing the two texts also shows:

- Feature Policy had violation reports of type `feature-policy-violation` but no report-only header (Feature Policy § 8). Permissions Policy reports as `permissions-policy-violation` and adds `Permissions-Policy-Report-Only` and the `report-to` parameter (Permissions Policy § 8, § 8.1, § 5.2).
- Feature Policy allowlists held serialized origins (Feature Policy § 5.1). Permissions Policy allowlists hold CSP-style source expressions, so `https://*.example.com` and `https://example.com:*` work (Permissions Policy § 2, § 4.7, § 5.1).

### Fetch Metadata Request Headers

The single published line: `Sec-Fetch-Dest`, `Sec-Fetch-Mode`, `Sec-Fetch-Site` and `Sec-Fetch-User`, all Structured Fields (Fetch Metadata § 2). An earlier design used one `Sec-Metadata` dictionary header; it was replaced by the four headers (§ 5.2).

## Upgrading

### CSP 1.0 and prefixed headers to CSP Level 3

1. Change the version marker: rename `X-Content-Security-Policy` and `X-WebKit-CSP` to `Content-Security-Policy`, and remove the prefixed headers.
2. Replace removed or renamed behaviour:
   - Add `object-src 'none'` and `base-uri 'none'` (or `'self'`), which CSP 1.0 lacked (CSP3 § 6, § 8.5).
   - Replace `'unsafe-inline'` for script with nonces or hashes plus `'strict-dynamic'`, keeping `'unsafe-inline' https:` only as fallbacks (CSP3 § 8.2, § 8.5).
   - Add `frame-ancestors` in place of `X-Frame-Options` when framing must be limited (CSP3 § 6.4.2.2).
   - Check bare `*` sources: under Level 3, `data:`, `blob:` and custom schemes need explicit listing (CSP3 § 6.7.2.8).
   - Add `report-to` with a `Reporting-Endpoints` header, keeping `report-uri` for older browsers (CSP3 § 6.5.1).
3. Validate against the target: deploy the new policy in `Content-Security-Policy-Report-Only` next to the old enforced one, and read reports.
4. Keep behaviour unchanged: enforce only when the report-only policy shows no violations on legitimate flows.

### CSP Level 2 to CSP Level 3

1. Change the version marker: none; the header names are the same. Several policies may now share one header, comma-separated (CSP3 § 3.1).
2. Replace removed or renamed behaviour:
   - Move worker rules into `worker-src`; `frame-src` is valid again (CSP3 § 6.2.2, § 6.1.5).
   - Remove `plugin-types`; use `object-src 'none'`.
   - Add `'strict-dynamic'` next to the nonces, and drop host allowlists for script if every script is nonced (CSP3 § 8.2).
   - Replace inline event handlers, or allow specific ones with `'unsafe-hashes'` and their hashes (CSP3 § 8.3).
   - Add `report-to` alongside `report-uri`; reports change to `application/reports+json` with type `csp-violation` (CSP3 § 5, § 5.5).
   - Add `'wasm-unsafe-eval'` instead of `'unsafe-eval'` where only WebAssembly needs it (CSP3 § 6.1.10).
3. Validate against the target: run the new policy report-only and compare `effectiveDirective` values with the CSP Level 2 reports.
4. Keep behaviour unchanged: the secure-scheme upgrades of § 6.7.2.9 only widen matching to HTTPS and WSS, so no previously allowed resource is blocked by them.

### Feature Policy to Permissions Policy

1. Change the version marker: replace the `Feature-Policy` header with `Permissions-Policy`.
2. Replace removed or renamed behaviour: rewrite each directive into Structured Fields syntax.
   - `Feature-Policy: fullscreen 'none'; geolocation 'none'` becomes `Permissions-Policy: fullscreen=(), geolocation=()` (Feature Policy § 2; Permissions Policy § 2).
   - `geolocation 'self' https://example.com` becomes `geolocation=(self "https://example.com")`: `self` is a bare token and origins are quoted strings (Permissions Policy § 5.2).
   - Directives are separated by commas, not semicolons; the iframe `allow` attribute keeps the semicolon syntax (Permissions Policy § 5.1, § 5.2).
   - Drop `allowpaymentrequest` (Permissions Policy § 13.1).
3. Validate against the target: parse the header as a Structured Fields dictionary; a member of the wrong form is ignored (Permissions Policy § 5.2).
4. Keep behaviour unchanged: an iframe now needs both the header and its `allow` attribute to grant a feature (AND semantics, § 13.1), so check every delegated iframe.

## Preview

No preview line is listed. The CSP Level 3 Editor's Draft carries the same date as the Working Draft (16 September 2026), and no later level or companion draft was found on the W3C TR pages. When CSP Level 3 becomes a Recommendation, drop its posture and decide whether CSP Level 2 stays supported. When a CSP Level 4 or other next-line draft is published, add it as a `-preview` entry with a posture and an upgrade section.
