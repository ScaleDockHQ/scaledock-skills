# SCIM pagination

Load this when paging through `/Users`, `/Groups` or `/.search` results. Index pagination is RFC 7644 §3.4.2.4. Cursor pagination is RFC 9865, which updates RFC 7643 and RFC 7644.

## Index pagination (RFC 7644 §3.4.2.4)

| Parameter    | Rule                                                                                                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `startIndex` | 1-based index of the first result, default 1. A value below 1 SHALL be treated as 1.                                                                                   |
| `count`      | Desired maximum per page. Negative SHALL be treated as 0; 0 returns only `totalResults`. The service provider MUST NOT return more than `count`, and MAY return fewer. |

The response carries `totalResults`, `itemsPerPage` and `startIndex`. Index pagination is not stateful, so clients MUST be prepared for results that change between pages.

```http
GET /Users?startIndex=11&count=10 HTTP/1.1
Host: example.com
Accept: application/scim+json
```

## Cursor pagination (RFC 9865)

### Request (§2)

- **`cursor`.** It MUST be empty or omitted for the first page, for example `GET /Users?filter=userName%20sw%20J&cursor&count=10`. On later pages it is the `nextCursor` or `previousCursor` value, which uses only RFC 3986 unreserved characters.
- **`count`.** Same rules as index pagination.
- **Identical queries.** Every page request MUST repeat the original query with identical parameters, except `cursor`.

### Response (§2)

| Attribute        | Rule                                                                              |
| ---------------- | --------------------------------------------------------------------------------- |
| `nextCursor`     | MUST be in every page except the last. Its absence means there are no more pages. |
| `previousCursor` | OPTIONAL. MUST NOT be returned on the first page.                                 |
| `totalResults`   | Should be accurate; MAY be omitted when the service provider cannot estimate it.  |

```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
  "totalResults": 100,
  "itemsPerPage": 10,
  "nextCursor": "VZUTiyhEQJ94IR",
  "Resources": []
}
```

### Errors (§2.1)

Errors are 400 with `scimType`:

- **`invalidCursor`.** The cursor value is invalid.
- **`expiredCursor`.** The cursor is older than the `cursorTimeout`.
- **`invalidCount`.** `count` is outside `0..maxPageSize`, or differs from the first request.

### Choosing a method (§2.3, §2.4)

- **Cursor only.** A service provider MAY require cursors by returning `nextCursor` even when the request had no `cursor`.
- **Both methods.** A service provider that supports both MUST pick a default. One that is adding cursors to existing index support should keep index as the default.
- **Discovery.** Clients read the `pagination` attribute of `/ServiceProviderConfig` (see `discovery.md`). They MUST NOT read a missing value as "no limit" or "no default".

### POST /.search (§3)

`cursor` and `count` go in the `SearchRequest` body, with `"cursor": ""` for the first page.

### Security (§5.2, §5.3)

- **Confidentiality.**
  - Results MUST be confined to what the current actor may access, even with a cursor obtained by another actor.
  - Authorization MUST be checked on every page.
  - Cursors SHOULD be invalidated when the actor's permissions change.
- **Opaque cursors.** Cursors should be obfuscated so clients cannot read or forge them, and forged cursors should get `invalidCursor`.
- **Errors.** Error handling MUST NOT expose sensitive data. Unauthorized and nonexistent pages should get identical errors.
- **Availability.** Rate-limit cursor requests, cap the number of open cursors or set `maxPageSize`, and keep cursor invalidation cheap.

## Client loop

```ts
type ListResponse<T> = {
  totalResults?: number;
  Resources?: T[];
  nextCursor?: string;
};

async function listAll<T>(
  base: string,
  path: string,
  token: string,
): Promise<T[]> {
  const out: T[] = [];
  let cursor = "";
  for (;;) {
    const url = new URL(path, base);
    url.searchParams.set("cursor", cursor);
    url.searchParams.set("count", "100");
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/scim+json",
      },
    });
    if (!res.ok) throw new Error(`SCIM list failed: ${res.status}`);
    const page = (await res.json()) as ListResponse<T>;
    out.push(...(page.Resources ?? []));
    if (!page.nextCursor) return out;
    cursor = page.nextCursor;
  }
}
```
