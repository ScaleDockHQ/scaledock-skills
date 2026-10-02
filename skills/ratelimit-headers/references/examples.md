# Examples

Bare section numbers refer to `draft-ietf-httpapi-ratelimit-headers-11`. The TypeScript uses only web-standard `Headers` and `Response`, so it runs in any runtime that has them.

## A normal response with quota information

From Appendix B.2.1: 99 units left for the next 50 seconds, under a policy of 100 per minute.

```http
HTTP/1.1 200 OK
Content-Type: application/json
RateLimit: "fixedwindow";r=99;t=50
RateLimit-Policy: "fixedwindow";q=100;w=60

{"hello": "world"}
```

Two policies, reporting only the one closest to exhaustion (Appendix B.3.1):

```http
HTTP/1.1 200 OK
Content-Type: application/json
RateLimit-Policy: "hour";q=1000;w=3600, "day";q=5000;w=86400
RateLimit: "day";r=100;t=36000
```

## A throttled response

Status 429 with `Retry-After`, the RateLimit fields and a problem details body, after Appendix B.1.4 and § 5.1:

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/problem+json
Retry-After: 5
RateLimit-Policy: "default";q=100;w=60
RateLimit: "default";r=0;t=5

{
  "type": "https://iana.org/assignments/http-problem-types#quota-exceeded",
  "title": "Quota Exceeded",
  "status": 429,
  "detail": "The default policy allows 100 requests per 60 seconds. Retry in 5 seconds.",
  "violated-policies": ["default"]
}
```

- `Retry-After` is not earlier than the end of the effective window (§ 6).
- The body explains the condition, as RFC 6585 § 4 asks.
- `status` equals the response code (RFC 9457 § 3.1.2).

## The draft's problem types (§ 5)

All three define the extension member `violated-policies`: an array of strings naming the policies whose quota was exceeded.

| Type URI                                                                     | Title (§ 10.2)             | Recommended status | Use                                                                                                                                           |
| ---------------------------------------------------------------------------- | -------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `https://iana.org/assignments/http-problem-types#quota-exceeded`             | Quota Exceeded             | 429                | Requests exceed one or more quota policies (§ 5.1).                                                                                           |
| `https://iana.org/assignments/http-problem-types#temporary-reduced-capacity` | Temporary Reduced Capacity | 503                | Requests cannot be served because of a temporary capacity reduction; the server MAY send a `RateLimit-Policy` with the lowered quota (§ 5.2). |
| `https://iana.org/assignments/http-problem-types#abnormal-usage-detected`    | Abnormal Usage Detected    | 429                | The server detected a request pattern that suggests unintentional or malicious behavior (§ 5.3).                                              |

Caveats, as of 2026-10-02:

- These URIs are requested in § 10.2 but are not yet in the IANA HTTP Problem Types registry, which lists registrations only once the document is approved. Under the build posture, use them as the pinned revision defines them, and re-check the registry at every refresh.
- `violated-policies` contains a hyphen, which RFC 9457 § 4 recommends against for extension names. Use the name exactly as the draft defines it; do not rename it to match the RFC 9457 guideline.
- A server MAY use these types (§ 5.1 to § 5.3); a plain RFC 9457 body of your own type is equally valid.

Do not copy these typos from the pinned revision: the § 5.1 example's status line reads `429 Bad Request`, the Appendix B.1.4 JSON lacks a comma after `type`, and the § 5.3 title misspells "satisfied".

## Serializing the fields in TypeScript

```ts
export interface QuotaPolicy {
  name: string;
  quota: number;
  windowSeconds?: number;
  unit?: "requests" | "content-bytes" | "concurrent-requests";
}

export interface ServiceLimit {
  policy: string;
  remaining: number;
  resetSeconds?: number;
}

const MAX_SF_INTEGER = 999_999_999_999_999;

function sfString(value: string): string {
  if (!/^[\x20-\x7e]*$/.test(value)) {
    throw new Error(
      `"${value}" is not a Structured Fields String (printable ASCII only)`,
    );
  }
  return `"${value.replace(/[\\"]/g, (char) => `\\${char}`)}"`;
}

function sfNonNegativeInteger(value: number): string {
  if (!Number.isInteger(value) || value < 0 || value > MAX_SF_INTEGER) {
    throw new Error(`${value} is not a non-negative Structured Fields Integer`);
  }
  return String(value);
}

export function serializeRateLimitPolicy(policies: QuotaPolicy[]): string {
  if (policies.length === 0)
    throw new Error("RateLimit-Policy must not be empty");
  return policies
    .map((policy) => {
      let item = `${sfString(policy.name)};q=${sfNonNegativeInteger(policy.quota)}`;
      if (policy.unit !== undefined && policy.unit !== "requests") {
        item += `;qu=${sfString(policy.unit)}`;
      }
      if (policy.windowSeconds !== undefined) {
        if (policy.windowSeconds === 0)
          throw new Error("w must be greater than zero");
        item += `;w=${sfNonNegativeInteger(policy.windowSeconds)}`;
      }
      return item;
    })
    .join(", ");
}

export function serializeRateLimit(limits: ServiceLimit[]): string {
  return limits
    .map((limit) => {
      let item = `${sfString(limit.policy)};r=${sfNonNegativeInteger(limit.remaining)}`;
      if (limit.resetSeconds !== undefined) {
        item += `;t=${sfNonNegativeInteger(Math.ceil(limit.resetSeconds))}`;
      }
      return item;
    })
    .join(", ");
}

export function tooManyRequests(
  policy: QuotaPolicy,
  resetSeconds: number,
): Response {
  const retryAfter = Math.ceil(resetSeconds);
  const headers = new Headers({
    "Content-Type": "application/problem+json",
    "Retry-After": String(retryAfter),
    "RateLimit-Policy": serializeRateLimitPolicy([policy]),
    RateLimit: serializeRateLimit([
      { policy: policy.name, remaining: 0, resetSeconds: retryAfter },
    ]),
  });
  const body = {
    type: "https://iana.org/assignments/http-problem-types#quota-exceeded",
    title: "Quota Exceeded",
    status: 429,
    detail: `Quota exhausted for policy ${policy.name}. Retry in ${retryAfter} seconds.`,
    "violated-policies": [policy.name],
  };
  return new Response(JSON.stringify(body), { status: 429, headers });
}
```

`Retry-After` and `t` share one rounded-up value, so `Retry-After` never points earlier than the end of the effective window (§ 6). Add jitter to `resetSeconds` before calling, to avoid synchronized retries (§ 8.5). Partition keys are left out here; add `pk` as a Byte Sequence (`:base64:`) if you use them (§ 3.1.4, § 4.1.3).

## Parsing the fields in TypeScript

A small parser for the subset of RFC 9651 Lists these fields use. It returns `undefined` for anything malformed, because § 7 and RFC 9651 § 4.2 require the whole field to be ignored then. Prefer a complete RFC 9651 library when one is available.

```ts
type BareItem =
  string | number | boolean | { token: string } | { bytes: string };

interface Item {
  value: BareItem;
  params: Map<string, BareItem>;
}

export interface ParsedLimit {
  policy: string;
  remaining: number;
  resetSeconds?: number;
  partitionKey?: string;
}

class Cursor {
  constructor(
    private readonly input: string,
    public position = 0,
  ) {}
  peek(): string {
    return this.input[this.position] ?? "";
  }
  done(): boolean {
    return this.position >= this.input.length;
  }
  match(pattern: RegExp): string | undefined {
    pattern.lastIndex = this.position;
    const result = pattern.exec(this.input);
    if (!result) return undefined;
    this.position += result[0].length;
    return result[0];
  }
}

const INTEGER_OR_DECIMAL = /-?[0-9]+(\.[0-9]+)?/y;
const TOKEN = /[A-Za-z*][!#$%&'*+\-.^_`|~0-9A-Za-z:/]*/y;
const BYTES = /:([A-Za-z0-9+/=]*):/y;
const KEY = /[a-z*][a-z0-9_\-.*]*/y;
const OWS = /[ \t]*/y;
const SP = / */y;

function parseBareItem(cursor: Cursor): BareItem | undefined {
  const char = cursor.peek();
  if (char === '"') {
    cursor.position++;
    let output = "";
    while (!cursor.done()) {
      const next = cursor.peek();
      cursor.position++;
      if (next === "\\") {
        const escaped = cursor.peek();
        if (escaped !== '"' && escaped !== "\\") return undefined;
        output += escaped;
        cursor.position++;
      } else if (next === '"') {
        return output;
      } else if (next < "\x20" || next > "\x7e") {
        return undefined;
      } else {
        output += next;
      }
    }
    return undefined;
  }
  if (char === "-" || (char >= "0" && char <= "9")) {
    const text = cursor.match(INTEGER_OR_DECIMAL);
    if (text === undefined) return undefined;
    const [integerPart, fraction] = text.replace("-", "").split(".");
    if (
      fraction === undefined
        ? integerPart.length > 15
        : integerPart.length > 12 || fraction.length > 3
    ) {
      return undefined;
    }
    return Number(text);
  }
  if (char === ":") {
    const text = cursor.match(BYTES);
    return text === undefined ? undefined : { bytes: text.slice(1, -1) };
  }
  if (char === "?") {
    const text = cursor.match(/\?[01]/y);
    return text === undefined ? undefined : text === "?1";
  }
  const token = cursor.match(TOKEN);
  return token === undefined ? undefined : { token };
}

function parseList(field: string): Item[] | undefined {
  const cursor = new Cursor(field);
  cursor.match(SP);
  const items: Item[] = [];
  while (!cursor.done()) {
    const value = parseBareItem(cursor);
    if (value === undefined) return undefined;
    const params = new Map<string, BareItem>();
    while (cursor.peek() === ";") {
      cursor.position++;
      cursor.match(SP);
      const key = cursor.match(KEY);
      if (key === undefined) return undefined;
      let paramValue: BareItem | undefined = true;
      if (cursor.peek() === "=") {
        cursor.position++;
        paramValue = parseBareItem(cursor);
        if (paramValue === undefined) return undefined;
      }
      params.set(key, paramValue);
    }
    items.push({ value, params });
    cursor.match(OWS);
    if (cursor.done()) return items;
    if (cursor.peek() !== ",") return undefined;
    cursor.position++;
    cursor.match(OWS);
    if (cursor.done()) return undefined;
  }
  return items;
}

function nonNegativeInteger(value: BareItem | undefined): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

export function parseRateLimit(headers: Headers): ParsedLimit[] | undefined {
  const field = headers.get("RateLimit");
  if (field === null) return undefined;
  const items = parseList(field);
  if (items === undefined) return undefined;
  const limits: ParsedLimit[] = [];
  for (const { value, params } of items) {
    const r = params.get("r");
    const t = params.get("t");
    const pk = params.get("pk");
    if (typeof value !== "string" || !nonNegativeInteger(r)) return undefined;
    if (t !== undefined && !nonNegativeInteger(t)) return undefined;
    if (pk !== undefined && (typeof pk !== "object" || !("bytes" in pk)))
      return undefined;
    limits.push({
      policy: value,
      remaining: r,
      resetSeconds: t,
      partitionKey: pk?.bytes,
    });
  }
  return limits;
}
```

`Headers.get` joins repeated field lines with `", "`, which is the combination RFC 9651 § 4.2 requires before parsing. `RateLimit-Policy` parses the same way, with `q` required instead of `r` and `w` greater than zero.

## Deciding how long to wait

```ts
export function retryAfterSeconds(
  headers: Headers,
  now = Date.now(),
): number | undefined {
  const value = headers.get("Retry-After")?.trim();
  if (!value) return undefined;
  if (/^[0-9]+$/.test(value)) return Number(value);
  const date = Date.parse(value);
  return Number.isNaN(date)
    ? undefined
    : Math.max(0, Math.ceil((date - now) / 1000));
}

const MAX_WAIT_SECONDS = 600;

export function waitBeforeNextRequest(response: Response): number {
  const retryAfter = retryAfterSeconds(response.headers);
  if (retryAfter !== undefined) return Math.min(retryAfter, MAX_WAIT_SECONDS);
  const exhausted = parseRateLimit(response.headers)?.find(
    (limit) => limit.remaining === 0,
  );
  return Math.min(exhausted?.resetSeconds ?? 0, MAX_WAIT_SECONDS);
}
```

- `Retry-After` takes precedence over the effective window (§ 7), and accepts both RFC 9110 § 10.2.3 forms.
- The cap reflects § 8.5.1: clients set thresholds for implausible values. Ten minutes matches the draft's example; tune it per client.
- A client should also skip this logic for responses served from cache (§ 7.3).
