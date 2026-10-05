# Implementation: servers, clients, intermediaries, user agents and tests

Read this when writing code that reads, forwards, sends or tests GPC. Sections refer to `WD-gpc-20260924`. The TypeScript is framework-neutral and uses only Fetch API types.

## Server: read the header (§ 3.3)

Apply the exact-match rule to every `Sec-GPC` field. When the framework hands repeated fields over as one comma-separated string, split it before comparing.

```ts
export function hasGpc(headers: Headers): boolean {
  const joined = headers.get("sec-gpc");
  if (joined === null) return false;
  return joined.split(",").some((value) => value.trim() === "1");
}
```

Splitting on commas is safe because the only meaningful value, `1`, contains none. Any other content (`0`, `true`, `yes`, `1;x=y`) is not `1` and is ignored (§ 3.3, § 3.3.1).

Treat a positive result as the person's standing preference for the interaction, not as a new opt-out request to log in full on every subresource: a page load sends the signal on dozens of requests, including to CDNs (Appendix A). Appendix A suggests processing the interaction as if the person had already asked for a do-not-sell-or-share preference on the site and it were active.

Decide what "honor" switches off with the inputs in `SKILL.md`: sale, sharing with third parties, and cross-context ad targeting (§ 2). Keep processing the spec leaves out of scope, such as first-party same-context use (§ 5.2), under its own rules.

The spec does not say how GPC interacts with HTTP caching. If a cached response differs depending on the header, apply HTTP's own rules for varying on a request header; this is outside the GPC text.

## Client script: read the property (§ 3.4)

```ts
export function gpcEnabled(): boolean {
  return (
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}

if (!gpcEnabled()) {
  loadThirdPartyAdTag();
}
```

- The same call works in a worker, where `navigator` is a `WorkerNavigator` (§ 3.4).
- The value is fixed for the life of the document (§ 3.2, § 3.4), so read it once at start-up; a change shows after the next top-level navigation.
- An iframe reads the top-level browsing context's value (§ 3.4).
- The spec's Example 2 shows the inverted check `if (!navigator.globalPrivacyControl)` guarding the selling path.

## Intermediaries: CDNs, proxies, edge functions (§ 3.3)

- Forward `Sec-GPC: 1` to the origin. Header allow-lists, request normalisation and cache-key stripping must not drop it.
- Dropping `Sec-GPC` fields with other values is allowed.
- Adding `Sec-GPC: 1` is allowed when the intermediary has reason to believe the person has the preference, for example a privacy proxy the person chose. Do not add any other value.

## User agents and extensions (§ 3.1 to § 3.4, § 5.3)

1. Store the person's preference. The spec does not say what must be shown before turning it on; jurisdictions differ on whether it may be on by default (§ 5.3).
2. At each top-level navigation, copy the preference into that top-level browsing context's `gpcAtNavigation` (§ 3.2).
3. For every request from that context, send `Sec-GPC: 1` when `gpcAtNavigation` is true, and nothing otherwise. Send it once, never in a trailer (§ 3.3).
4. Expose `globalPrivacyControl` on `Navigator` and `WorkerNavigator` with the same value (§ 3.4).
5. When the person changes the preference, list tabs whose `gpcAtNavigation` no longer matches and offer to reload them (§ 3.2).

## Testing with WebDriver (§ 8)

The spec defines two WebDriver extension commands.

| Command                    | Method | URI template                    | Body               | Result             |
| -------------------------- | ------ | ------------------------------- | ------------------ | ------------------ |
| Set Global Privacy Control | `POST` | `/session/{session id}/privacy` | `{"gpc": boolean}` | `{"gpc": boolean}` |
| Get Global Privacy Control | `GET`  | `/session/{session id}/privacy` | none               | `{"gpc": boolean}` |

- Set returns `invalid argument` when `gpc` is missing or not a boolean (§ 8.1).
- Set changes the session's preference; because of caching (§ 3.2), navigate after setting it before checking the header or property.

```ts
async function setGpc(
  webdriverUrl: string,
  sessionId: string,
  gpc: boolean,
): Promise<unknown> {
  const res = await fetch(`${webdriverUrl}/session/${sessionId}/privacy`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ gpc }),
  });
  return res.json();
}
```

How the `{"gpc": boolean}` result is wrapped in the HTTP response is defined by WebDriver, not by the GPC text.

A test then navigates to a page that echoes request headers and checks that `Sec-GPC: 1` arrived and that `navigator.globalPrivacyControl` is `true`; and the reverse with `{"gpc": false}`.

## Common mistakes

- Treating `Sec-GPC: 0` as an explicit "allow". It carries no meaning; the request is processed as if the header were absent (§ 3.3).
- Parsing the value or accepting `true`; the only valid value is `1` (§ 3.3, § 3.3.1).
- Reading `navigator.globalPrivacyControl` and expecting it to change live; it is fixed at navigation (§ 3.2).
- Stripping the header at the CDN, so the origin never sees it (§ 3.3).
- Running a full opt-out workflow with audit records for every request carrying the header (Appendix A).
- Using GPC as a deletion request or to stop first-party, same-context processing (§ 1, § 5.2).
- Writing legal conclusions into code comments or user-facing text as if the spec settled them; § 5 is non-normative and jurisdiction-dependent.
