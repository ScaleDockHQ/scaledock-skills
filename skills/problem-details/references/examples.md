# Examples

Section numbers refer to RFC 9457. The TypeScript uses only the web-standard `Request`, `Response` and `URL` classes, so it runs in any runtime that has them.

## The RFC's own examples

A typed problem with extensions (§ 3):

```http
HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
Content-Language: en

{
 "type": "https://example.com/probs/out-of-credit",
 "title": "You do not have enough credit.",
 "detail": "Your current balance is 30, but that costs 50.",
 "instance": "/account/12345/msgs/abc",
 "balance": 30,
 "accounts": ["/account/12345",
              "/account/67890"]
}
```

Several validation errors of one type (§ 3):

```http
HTTP/1.1 422 Unprocessable Content
Content-Type: application/problem+json
Content-Language: en

{
 "type": "https://example.net/validation-error",
 "title": "Your request is not valid.",
 "errors": [
             {
               "detail": "must be a positive integer",
               "pointer": "#/age"
             },
             {
               "detail": "must be 'green', 'red' or 'blue'",
               "pointer": "#/profile/color"
             }
          ]
}
```

## A plain status with about:blank

When the status code says everything, omit `type` (it defaults to `about:blank`) and use the status phrase as `title` (§ 4.2.1):

```http
HTTP/1.1 404 Not Found
Content-Type: application/problem+json

{
  "title": "Not Found",
  "status": 404
}
```

## A problem with Retry-After

A problem type MAY specify `Retry-After` (§ 4). For 429 responses with `RateLimit` and `RateLimit-Policy`, see the `ratelimit-headers` skill.

```http
HTTP/1.1 503 Service Unavailable
Content-Type: application/problem+json
Retry-After: 120

{
  "type": "https://api.example.com/problems/maintenance",
  "title": "Scheduled maintenance",
  "status": 503,
  "detail": "The API is in scheduled maintenance. Retry in two minutes."
}
```

## Producing problems in TypeScript

```ts
export interface ProblemFields {
  type?: string;
  title?: string;
  detail?: string;
  instance?: string;
  [extension: string]: unknown;
}

export interface ProblemDetails extends ProblemFields {
  status?: number;
}

const STATUS_PHRASES: Record<number, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  422: "Unprocessable Content",
  429: "Too Many Requests",
  500: "Internal Server Error",
  503: "Service Unavailable",
};

const EXTENSION_NAME = /^[A-Za-z][A-Za-z0-9_]{2,}$/;
const STANDARD_MEMBERS = new Set([
  "type",
  "title",
  "status",
  "detail",
  "instance",
]);

export function problemResponse(
  status: number,
  problem: ProblemFields = {},
  headers: HeadersInit = {},
): Response {
  for (const name of Object.keys(problem)) {
    if (!STANDARD_MEMBERS.has(name) && !EXTENSION_NAME.test(name)) {
      throw new Error(
        `Extension member "${name}" does not follow RFC 9457 section 4`,
      );
    }
  }
  const isBlank = problem.type === undefined || problem.type === "about:blank";
  const body: ProblemDetails = {
    ...problem,
    title: problem.title ?? (isBlank ? STATUS_PHRASES[status] : undefined),
    status,
  };
  const responseHeaders = new Headers(headers);
  responseHeaders.set("Content-Type", "application/problem+json");
  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders,
  });
}
```

`status` is always set from the same number as the response status, which is how § 3.1.2 is met. The naming check enforces the § 4 SHOULD; remove it only for extension members another specification defines with a different shape.

A 401 for an expired bearer token, with the header RFC 6750 § 3.1 asks for:

```ts
export function invalidToken(request: Request): Response {
  return problemResponse(
    401,
    {
      type: "https://api.example.com/problems/invalid-token",
      title: "Invalid access token",
      detail:
        "The access token is expired, revoked or malformed. Get a new token and retry.",
      instance: new URL(request.url).pathname,
    },
    { "WWW-Authenticate": 'Bearer realm="api", error="invalid_token"' },
  );
}
```

## Consuming problems in TypeScript

```ts
export interface ParsedProblem {
  type: string;
  status: number;
  title?: string;
  detail?: string;
  instance?: string;
  extensions: Record<string, unknown>;
}

function stringMember(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function resolveType(type: string, base: string): string {
  if (type === "about:blank") return type;
  try {
    return new URL(type, base || undefined).href;
  } catch {
    return type;
  }
}

export async function readProblem(
  response: Response,
): Promise<ParsedProblem | undefined> {
  const mediaType = response.headers
    .get("Content-Type")
    ?.split(";")[0]
    ?.trim()
    .toLowerCase();
  if (mediaType !== "application/problem+json") return undefined;

  const raw: unknown = await response.json();
  if (typeof raw !== "object" || raw === null || Array.isArray(raw))
    return undefined;
  const object = raw as Record<string, unknown>;

  const {
    type,
    title,
    status: _status,
    detail,
    instance,
    ...extensions
  } = object;
  return {
    type: resolveType(stringMember(type) ?? "about:blank", response.url),
    status: response.status,
    title: stringMember(title),
    detail: stringMember(detail),
    instance: stringMember(instance),
    extensions,
  };
}
```

What this follows:

- Members with the wrong JSON type are dropped, as if absent (§ 3.1).
- A relative `type` is resolved against the response URL before comparing (§ 3.1.1). Without a base URL it stays as sent, so compare it with the relative form you expect, which § 3.1.1 recommends carries the full path.
- The HTTP status code is used, not the `status` member, because intermediaries may change one and not the other (§ 5).
- `detail` is kept for display and logging, never parsed (§ 3.1.4).
- Unknown extensions stay in `extensions` and are ignored by default (§ 3.2).
- The client does not fetch the `type` URI (§ 3.1.1).

Switch on the resolved type, and fall back to the status code:

```ts
const problem = await readProblem(response);
if (problem?.type === "https://api.example.com/problems/invalid-token") {
  // refresh the token, then retry once
} else if (problem === undefined || problem.type === "about:blank") {
  // handle by response.status alone
}
```
