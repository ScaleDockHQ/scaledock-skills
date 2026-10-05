# The GPC support resource: `/.well-known/gpc.json`

Read this when publishing, redirecting or reading an origin's GPC support statement. Sections refer to `WD-gpc-20260924`.

## What it is (§ 4)

- An origin MAY serve a resource at `/.well-known/gpc.json`, relative to the origin (RFC 8615 well-known URIs), to state that it abides by GPC requests, at least where required to.
- It conveys the origin's awareness of and support for GPC on pages served from the origin. It does not say whether the origin honors the GPC requests of the user agent fetching it.
- Without the resource, the origin's support is **unknown**.
- A valid `GET` gets either a successful response with the representation, or a chain of redirects to it. The target MAY be on another origin.

## Representation (§ 4.1)

- MUST be served as `application/json` (RFC 8259); otherwise support is unknown.
- MUST be a JSON object; otherwise support is unknown.
- Members not listed below have no meaning and MUST be ignored.

| Member       | Value                                                                                                                                                                   | If invalid                     |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `gpc`        | `true`: intends to abide by GPC requests at least as far as legally obligated. `false`: does not.                                                                       | Support is unknown.            |
| `lastUpdate` | RFC 3339 full-date (`YYYY-MM-DD`) or date-time (`YYYY-MM-DDTHH:mm:ss.sssZ`): when the statement was made, so later changes to the spec do not change its legal reading. | The date and time are unknown. |

## Example (§ 4.1, Example 3)

```http
GET /.well-known/gpc.json HTTP/1.1
Host: example.org
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "gpc": true,
  "lastUpdate": "2025-04-15"
}
```

## Publishing

1. Decide what the statement means for this origin: `true` only when pages served from it honor GPC at least where the law requires (§ 4.1).
2. Serve the file at exactly `/.well-known/gpc.json` with `Content-Type: application/json`, or redirect there to a representation on another origin (§ 4).
3. Set `lastUpdate` to the date the statement was made, and change it when the statement changes (§ 4.1).
4. Serve it on every origin it applies to; the statement covers pages served from that origin (§ 4).

## Reading

A consumer (crawler, auditor, browser feature) follows redirects, then decides:

```ts
type GpcSupport =
  { kind: "unknown" } | { kind: "known"; gpc: boolean; lastUpdate?: string };

const RFC3339_DATE = /^\d{4}-\d{2}-\d{2}$/;
const RFC3339_DATE_TIME =
  /^\d{4}-\d{2}-\d{2}[Tt]\d{2}:\d{2}:\d{2}(\.\d+)?([Zz]|[+-]\d{2}:\d{2})$/;

export async function readGpcSupport(origin: string): Promise<GpcSupport> {
  const res = await fetch(new URL("/.well-known/gpc.json", origin), {
    redirect: "follow",
  });
  if (!res.ok) return { kind: "unknown" };
  const mediaType = res.headers
    .get("content-type")
    ?.split(";")[0]
    .trim()
    .toLowerCase();
  if (mediaType !== "application/json") return { kind: "unknown" };

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    return { kind: "unknown" };
  }
  if (typeof body !== "object" || body === null || Array.isArray(body))
    return { kind: "unknown" };

  const { gpc, lastUpdate } = body as Record<string, unknown>;
  if (typeof gpc !== "boolean") return { kind: "unknown" };
  const validDate =
    typeof lastUpdate === "string" &&
    (RFC3339_DATE.test(lastUpdate) || RFC3339_DATE_TIME.test(lastUpdate));
  return { kind: "known", gpc, lastUpdate: validDate ? lastUpdate : undefined };
}
```

The regular expressions check the shape of an RFC 3339 full-date or date-time only; a strict reader also checks that the calendar date and time exist.

## Common mistakes

- Serving the file as `text/plain` or `application/octet-stream`: support becomes unknown (§ 4.1).
- `"gpc": "true"` or `"gpc": 1`: not a boolean, so support is unknown (§ 4.1).
- Keeping the community draft's `"version": 1` instead of `lastUpdate`: `version` is ignored, and the statement has no date (§ 4.1; see [`versions.md`](versions.md)).
- Reading `gpc: true` as proof that a given visitor's signal was honored: the resource does not say that (§ 4).
- Publishing `true` on one origin and assuming it covers other origins or subdomains: it covers pages served from the origin that serves it (§ 4).
