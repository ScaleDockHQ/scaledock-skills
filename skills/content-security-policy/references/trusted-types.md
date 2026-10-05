# Trusted Types

Read this when enabling Trusted Types with `require-trusted-types-for` and `trusted-types`, writing or reviewing policies, deciding whether to use a default policy, or reading Trusted Types violation reports. Section numbers are from Trusted Types (W3C Working Draft, 23 June 2026) unless another spec is named. Sources are listed in [Sources](../SKILL.md#sources).

## What it protects

Trusted Types targets DOM-based XSS: attacker-controlled strings reaching injection sinks such as `Element.innerHTML`, `outerHTML`, `document.write`, `DOMParser.parseFromString()`, `HTMLScriptElement.src` and `.text`, `eval`, and navigation to `javascript:` URLs (§ 1, § 2.1.1). When enforced, those sinks reject plain strings and accept only typed values created by named policies, so review can focus on the policies (§ 1, § 2.3).

Not in scope (§ 1.2): server-side injection into generated markup (use templating and CSP `script-src`), exfiltration, subresource loading in general, cross-origin execution through `data:` URL documents, and malicious first-party code.

## Types

| Type               | Created by        | For sinks that                              |
| ------------------ | ----------------- | ------------------------------------------- |
| `TrustedHTML`      | `createHTML`      | parse and insert HTML (§ 2.2.1)             |
| `TrustedScript`    | `createScript`    | execute an uncompiled script body (§ 2.2.2) |
| `TrustedScriptURL` | `createScriptURL` | load an external script by URL (§ 2.2.3)    |

Each is an immutable wrapper around a string, stringifies to that string, and has no public constructor (§ 2.2, § 2.3). Because sinks stringify, code can pass typed values before enforcement is turned on (§ 2.2).

## Policies

```ts
const scriptUrls = trustedTypes.createPolicy("cdn-scripts", {
  createScriptURL(url: string) {
    const parsed = new URL(url, document.baseURI);
    if (parsed.origin === "https://mycdn.example") return url;
    throw new TypeError("invalid URL");
  },
});
```

The example follows § 2.3. Rules:

- `trustedTypes.createPolicy(name, options)` throws `TypeError` when `trusted-types` does not allow the name, or when the name was already used and `'allow-duplicates'` is absent (§ 2.3.1, § 3.1).
- A missing `create*` callback throws `TypeError` when called (§ 3.3). A callback that returns `null` or `undefined` produces an empty string (§ 3.2).
- A policy object is a capability: whoever holds the reference can mint values. Keep lax policies private through modules or closures (§ 2.3).
- Make policies self-contained; anything that can change their decision is part of the policy and must be reviewed with it (§ 5.4).
- `isHTML()`, `isScript()`, `isScriptURL()`, `emptyHTML`, `emptyScript`, `getAttributeType()`, `getPropertyType()` and `defaultPolicy` are on the factory (§ 2.3.1).

## The default policy

A policy named `default` is called automatically when a string reaches a sink, with the value, the expected type name and the sink name (§ 2.3.4, § 3.5):

```js
// Content-Security-Policy: trusted-types default; require-trusted-types-for 'script'
trustedTypes.createPolicy("default", {
  createScriptURL: (value, type, sink) => {
    console.log("Please refactor.");
    return (
      value +
      "?default-policy-used&type=" +
      encodeURIComponent(type) +
      "&sink=" +
      encodeURIComponent(sink)
    );
  },
});
```

- If there is no default policy, or its callback returns `null` or `undefined`, a violation is reported; enforced mode throws, report-only lets the original value through (§ 2.3.4, § 3.4).
- Only one `default` policy can exist (§ 3.1).
- A no-op default policy defeats Trusted Types. Use it in a transition only, to find and rewrite callers, then remove it (§ 2.3.4).

## CSP directives

```text
require-trusted-types-for = "require-trusted-types-for" RWS "'script'"           ; § 4.2.1
trusted-types             = "trusted-types" [ RWS tt-expression *( RWS tt-expression ) ]   ; § 4.2.2
tt-expression  = tt-policy-name / "'allow-duplicates'" / "'none'" / "*"
tt-policy-name = 1*( ALPHA / DIGIT / "-" / "#" / "=" / "_" / "/" / "@" / "." / "%" )
```

| Policy                                                      | Effect                                                                                |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `require-trusted-types-for 'script'`                        | DOM XSS sinks require typed values (§ 4.2.1).                                         |
| `require-trusted-types-for 'script'; trusted-types one two` | Enforced, and only policies `one` and `two` may be created (§ 4.2.2).                 |
| `trusted-types; require-trusted-types-for 'script'`         | No policies at all: no DOM XSS sink can be used (§ 4.2.2).                            |
| `trusted-types 'none'; require-trusted-types-for 'script'`  | Same, stated explicitly; `'none'` is ignored next to names (§ 4.2.2, § 4.2.5).        |
| `trusted-types one default`                                 | Allows the default policy named `default` (§ 4.2.2).                                  |
| `trusted-types * 'allow-duplicates'`                        | Any name, duplicates allowed; omitting `trusted-types` has the same effect (§ 4.2.5). |

- `trusted-types` alone restricts policy creation; it does not make sinks require types. Use both directives.
- With `require-trusted-types-for 'script'`, a `javascript:` navigation is passed through the default policy's `createScript`, and is blocked if that fails (§ 4.2.1.1).
- Under Trusted Types, `eval()` of a `TrustedScript` still needs a CSP keyword: `'trusted-types-eval'` allows it only when Trusted Types are required, while `'unsafe-eval'` allows any string (CSP3 § 4.4.1).

## Rollout

1. Find sink uses; route each through a narrow named policy or a safe API.
2. Send `Content-Security-Policy-Report-Only: require-trusted-types-for 'script'; trusted-types <names>; report-to <endpoint>` (§ 2.4.1, § 1.3).
3. Read reports: sink violations have `effectiveDirective` `require-trusted-types-for`, resource `trusted-types-sink`, and a sample of `<sink>|<first 40 characters>`; policy-creation violations have `effectiveDirective` `trusted-types`, resource `trusted-types-policy`, and the policy name as sample (§ 4.2.4, § 4.2.5).
4. Enforce with `Content-Security-Policy` once reports stop.
5. Keep `trusted-types` to the reviewed names, and gate changes to policy files with extra review (§ 1.3).

## Security notes

- A restricted document can collude with an unrestricted one (another window, a `Blob` it navigates to); CSP inheritance for local-scheme documents partly limits this (§ 5.1; CSP3 § 7.8).
- Script gadgets that react to benign DOM can still fire, but need a typed value to cause DOM XSS (§ 5.3).
- Trusted Types reports carry up to 40 characters of the sink input; treat them like any CSP report (§ 6; CSP3 § 7.5).
