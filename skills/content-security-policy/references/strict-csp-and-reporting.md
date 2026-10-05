# Strict CSP, deployment and reporting

Read this when writing a nonce- or hash-based policy, rolling a policy out through report-only, setting up `report-to` or `report-uri`, or building a report collector. Section numbers are from Content Security Policy Level 3 unless another spec is named. Sources are listed in [Sources](../SKILL.md#sources).

## Strict CSP

CSP Level 3 calls a policy **Strict CSP** when `script-src` uses only nonces and/or hashes with `'strict-dynamic'`, and `base-uri` is `'self'` or `'none'` (§ 8.5). It recommends adding the `https:` scheme source for backwards compatibility (§ 8.5), and § 6 asks for `object-src` coverage. The policy this skill writes:

```http
Content-Security-Policy: script-src 'nonce-{RANDOM}' 'strict-dynamic' 'unsafe-inline' https:;
                         object-src 'none';
                         base-uri 'none'
```

How each browser generation reads it (§ 8.2):

| Browser supports | Effective script rule        | Why                                                                              |
| ---------------- | ---------------------------- | -------------------------------------------------------------------------------- |
| CSP Level 3      | `'nonce-…' 'strict-dynamic'` | `'strict-dynamic'` makes it ignore `https:`, `'self'`, `'unsafe-inline'`.        |
| CSP Level 2      | `'nonce-…' https:`           | The nonce disables `'unsafe-inline'` (§ 6.7.3.2); `'strict-dynamic'` is unknown. |
| CSP 1.0          | `'unsafe-inline' https:`     | Nonces are unknown.                                                              |

Hash-based variant, for static pages whose inline scripts never change (§ 8.5):

```http
Content-Security-Policy: script-src 'sha256-{HASH}' 'strict-dynamic' 'unsafe-inline' https:;
                         object-src 'none';
                         base-uri 'none'
```

### Nonces

- Generate a new value for every response that carries the policy, from a cryptographically secure generator, at least 128 bits before encoding (§ 7.1).
- Encode it with the `base64-value` characters (`A-Z a-z 0-9 + / - _`, optional `=` padding). The browser compares the nonce as an exact string and never decodes it (§ 2.3.1, § 6.7.2.3).
- Put the same value in the header and in the `nonce` attribute of every `<script>` (and `<style>` if `style-src` uses it). Nonces match inline and external script and style elements, not event handlers or `javascript:` URLs (§ 6.7.3.3).
- A cached HTML response replays its nonce to everyone who receives it, which breaks the "unique each time it transmits a policy" rule (§ 7.1). Do not serve nonced HTML from a shared cache; use hashes for pages that must be cached. The `http-semantics` skill covers `Cache-Control`.
- A nonce is weaker than no inline script at all: whoever learns it can run any script (§ 7.1). The browser hides nonces from non-script channels such as CSS selectors (§ 7.2.2), and refuses to honour a nonce on a `<script>` whose attributes contain `<script` or `<style`, a dangling-markup sign (§ 6.7.3.1, § 7.2.1). Set `base-uri`, because an injected `<base>` retargets nonced relative URLs (§ 7.3).

### Hashes

- An inline hash is `'<alg>-<base64 digest>'` of the script text after UTF-8 encoding, with SHA-256, SHA-384 or SHA-512 (§ 6.7.3.3). Whitespace counts: hash exactly what is between the tags.
- `base64url` values are accepted and normalized for hashes (§ 2.3.1, § 6.7.3.3).
- An external script is allowed by hash only through its `integrity` attribute, and only if every recognized item in its integrity metadata is in the policy (§ 6.7.2.4, § 8.4). The SRI hash is over the fetched bytes, so it can differ from the inline hash of the same text (§ 8.4).
- Event handlers and `style` attributes match hashes only with `'unsafe-hashes'` (§ 8.3).

### `'strict-dynamic'`

- A script allowed by nonce or hash may add scripts with `createElement('script')` and similar non-parser-inserted APIs; `document.write()` scripts are parser-inserted and stay blocked (§ 8.2).
- It is honoured in `script-src` and `default-src` (§ 8.2) and applies to script only (§ 6.7.3.2).
- Risk: if an attacker controls the URL a trusted script loads, they can load anything. Audit every dynamic script loader for untrusted input (§ 8.2). Trusted Types `createScriptURL` policies close this gap; see [`trusted-types.md`](trusted-types.md).
- § 8.5 notes that `'strict-dynamic'` "should be avoided when possible": prefer nonces on every script when the page can provide them.

### `'unsafe-hashes'`

For legacy markup with event handlers that cannot be moved to script yet:

```http
Content-Security-Policy: script-src 'unsafe-hashes' 'sha256-jzgBGA4UWFFmpOBq0JpdsySukE1FrEN5bUpoK8Z29fY='
```

This allows exactly the handler `doSubmit()` (§ 8.3). It is for legacy sites. An attacker can still inject that same handler code as a `<script>` once its hash is allowed, so allow only harmless handlers (§ 8.3).

### Eval

`eval()`, `new Function()`, and string arguments to `setTimeout` and `setInterval` need `'unsafe-eval'` (or `'trusted-types-eval'` with Trusted Types); WebAssembly needs `'wasm-unsafe-eval'` or `'unsafe-eval'`; blocked eval reports the resource `eval` (§ 4.4.1, § 4.5.1, § 6.1.10). Prefer `'wasm-unsafe-eval'` when only WebAssembly needs it.

## Rollout through report-only

1. Send the candidate policy in `Content-Security-Policy-Report-Only` (§ 3.2). It is not supported in `meta` (§ 3.3).
2. While an older policy is enforced, send both headers: the browser enforces one and monitors the other (CSP 1.0 CR § 3.3; CSP3 § 2.2.2).
3. Collect and triage reports; fix code rather than widening the policy where possible.
4. Move the same policy text to `Content-Security-Policy` once legitimate flows produce no reports (§ 3.2).
5. Keep `report-to` in the enforced policy to detect attacks and regressions (§ 1.2 goal 4).

`upgrade-insecure-requests` has no effect in report-only; to find insecure URLs, monitor `default-src https:` instead (Upgrade Insecure Requests § 3.1, § 3.4).

## Reporting configuration

```http
Reporting-Endpoints: csp-endpoint="https://reports.example.com/csp"
Content-Security-Policy: script-src 'nonce-{RANDOM}' 'strict-dynamic' 'unsafe-inline' https:;
                         object-src 'none'; base-uri 'none';
                         report-to csp-endpoint;
                         report-uri https://reports.example.com/csp-legacy
```

- `Reporting-Endpoints` is a Structured Fields dictionary; each value is a string URI-reference, and the URL MUST be potentially trustworthy, so non-HTTPS endpoints are ignored. Parameters are ignored (Reporting § 3.2, § 3.3).
- `report-to` takes one endpoint name (§ 6.5.2). `report-uri` takes URLs and is deprecated; sending both keeps older browsers reporting, and browsers that know `report-to` ignore `report-uri` (§ 6.5.1, § 5.5).
- Report-only policies report the same way, with `disposition` set to `report` (§ 5.5).

## Report formats

### `report-to` (Reporting API)

Delivered in batches as `POST` with `Content-Type: application/reports+json`, a JSON array of reports with `age`, `type`, `url`, `user_agent` and `body` (Reporting § 2.2, § 2.4). The request uses mode `cors` and credentials `same-origin`; a `2xx` answer is success, and `410 Gone` removes the endpoint (Reporting § 3.5.2). Delivery is not guaranteed (Reporting § 2.3).

| Report type     | Body fields                                                                                                                                                                                                                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `csp-violation` | `documentURL`, `referrer`, `blockedURL`, `effectiveDirective`, `originalPolicy`, `sourceFile`, `sample`, `disposition`, `statusCode`, `lineNumber`, `columnNumber` (§ 5).                                                                                                                               |
| `csp-hash`      | `documentURL`, `subresourceURL`, `hash`, `destination`, `type` `subresource`; the § 5 example serializes them as `document_url`, `subresource_url`, `hash`, `type`, `destination`. Sent only for `'report-sha*'` policies, and the hash is empty for responses that are not CORS-same-origin (§ 4.1.4). |

Parse field names defensively: the § 5 example and the IDL use different spellings.

### `report-uri` (deprecated)

One `POST` per violation with `Content-Type: application/csp-report`, credentials `same-origin`, redirects treated as errors, and the response ignored (§ 5.5). The body is `{"csp-report": {…}}` with `document-uri`, `referrer`, `blocked-uri`, `effective-directive`, `violated-directive`, `original-policy`, `disposition`, `status-code`, `script-sample`, and, when known, `source-file`, `line-number`, `column-number` (§ 5.3). `violated-directive` equals `effective-directive` in Level 3 (§ 5.3).

### What reports contain

- `blocked-uri`/`blockedURL` is the original request URL, never the redirect target, and non-HTTP(S) URLs are reduced to their scheme (§ 2.4.2, § 5.4, § 7.5).
- Inline violations report `inline`; eval reports `eval`; WebAssembly reports `wasm-eval`; Trusted Types reports `trusted-types-sink` or `trusted-types-policy` (§ 2.4).
- `sample` holds the first 40 characters only with `'report-sample'` (§ 4.2.3).
- Reports are attacker-controlled. Escape every field before rendering it in a dashboard, especially `sample` and `script-sample`, and protect the dashboard itself with CSP (§ 7.5).
- Browser extensions inject scripts that may cause reports; the spec asks browsers not to apply page policies to them, but expect noise (§ 9.1).

## Server sketch (TypeScript)

Framework-neutral; adapt the request and response types to the server in use.

```ts
import { createHash, randomBytes } from "node:crypto";

export function newNonce(): string {
  return randomBytes(16).toString("base64"); // 128 bits, CSP3 § 7.1
}

export function inlineScriptHash(scriptText: string): string {
  const digest = createHash("sha256")
    .update(scriptText, "utf8")
    .digest("base64");
  return `'sha256-${digest}'`; // CSP3 § 6.7.3.3
}

export function strictCsp(nonce: string, endpoint = "csp-endpoint"): string {
  return [
    `script-src 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline' https:`,
    "object-src 'none'",
    "base-uri 'none'",
    "frame-ancestors 'self'",
    `report-to ${endpoint}`,
  ].join("; ");
}

export function securityHeaders(
  nonce: string,
  reportOnly: boolean,
): Record<string, string> {
  const name = reportOnly
    ? "Content-Security-Policy-Report-Only"
    : "Content-Security-Policy";
  return {
    [name]: strictCsp(nonce),
    "Reporting-Endpoints": 'csp-endpoint="https://reports.example.com/csp"',
    "Cache-Control": "no-store", // a nonce must not be replayed from a cache
  };
}
```

Render the page with the same `nonce` on every `<script nonce="…">` element. Never take the nonce from the request, and never reflect it anywhere else in the page.

## Checks

- Every HTML route, including error and redirect pages, returns the header; static assets need none (CSP2 § 3.5).
- Two requests to the same page return different nonces.
- The enforced and report-only policies differ only where the rollout intends.
- The collector accepts both report formats and rejects bodies over a size limit it sets.
