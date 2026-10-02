# Search APIs

The Search APIs return the subjects, resources or actions that would be permitted in a given context, rather than checking one request. The PEP sends the usual entities but omits the identifier of the entity it is searching for (AuthZEN § 8). Examples: "Which documents can Alice view?", "Who can view document 123?", "What actions can Alice perform on document 123?" (AuthZEN § 3).

## Semantics (AuthZEN § 8.1)

- A search result, used in a later Access Evaluation call, SHOULD produce `decision: true`. This is not guaranteed, because evaluation can depend on other variables such as time.
- Searches are RECOMMENDED to be transitive. If user U is in group G and G can view document D, a search for users who can view D includes U.

## Requests

| API             | Default path                 | Metadata parameter         | Request                                                                                                                                                                   |
| --------------- | ---------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Subject Search  | `/access/v1/search/subject`  | `search_subject_endpoint`  | `subject` (REQUIRED, with `type`; `id` SHOULD be omitted and MUST be ignored if present), `action` (REQUIRED), `resource` (REQUIRED), `context`, `page` (AuthZEN § 8.4.1) |
| Resource Search | `/access/v1/search/resource` | `search_resource_endpoint` | `subject` (REQUIRED), `action` (REQUIRED), `resource` (REQUIRED, with `type`; `id` SHOULD be omitted and MUST be ignored if present), `context`, `page` (AuthZEN § 8.5.1) |
| Action Search   | `/access/v1/search/action`   | `search_action_endpoint`   | `subject` (REQUIRED), `resource` (REQUIRED), `context`, `page`. There is no `action` key (AuthZEN § 8.6.1).                                                               |

Paths and parameters come from AuthZEN § 10.1, Table 1.

```json
{
  "subject": { "type": "user", "id": "alice@example.com" },
  "action": { "name": "can_read" },
  "resource": { "type": "account" }
}
```

## Response (AuthZEN § 8.3)

| Key       | Requirement | Value                                                                                                          |
| --------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `page`    | OPTIONAL    | Pagination information. It is RECOMMENDED as the first key, so a PEP can use `count` for a progress indicator. |
| `context` | OPTIONAL    | Additional information for the PEP.                                                                            |
| `results` | REQUIRED    | Zero or more entities, only of the searched type.                                                              |

```json
{
  "page": { "count": 2, "total": 102 },
  "context": { "query_execution_time_ms": 42 },
  "results": [
    { "type": "account", "id": "123" },
    { "type": "account", "id": "456" }
  ]
}
```

## Pagination (AuthZEN § 8.2)

A PDP MAY support pagination.

**Request `page`** (AuthZEN § 8.2.1):

- `token`: OPTIONAL. The opaque `next_token` from the previous response.
- `limit`: OPTIONAL. A non-negative integer maximum number of results.
- `properties`: OPTIONAL. Implementation-specific attributes, such as sorting and filtering.
- Apart from `token`, every value in the request MUST stay identical across pages. The PDP SHOULD return an error if one changes.
- Other keys in `page` MUST be defined in a specification referenced in the AuthZEN PDP Capabilities Registry, and the PDP MUST declare the matching capability URN in its metadata (AuthZEN § 8.2.1, § 12.3). See the naming note in [`metadata-transport.md`](metadata-transport.md).

**Response `page`** (AuthZEN § 8.2.2):

- A response MAY include `page`, and MUST include it when it does not contain the entire result set.
- `next_token`: REQUIRED. An opaque string for the next page, and an empty string when there are no more results.
- `count`: OPTIONAL. The number of results in this response.
- `total`: OPTIONAL. The total number of matching results at request time. It may differ from the sum across pages if the data changes.
- `properties`: OPTIONAL. Additional attributes, such as estimated totals.

## PEP sketch

```ts
interface SearchResponse<T> {
  page?: { next_token: string; count?: number; total?: number };
  context?: Record<string, unknown>;
  results: T[];
}

async function* searchAll<T>(
  endpoint: string,
  token: string,
  body: Record<string, unknown>,
  limit = 50,
): AsyncGenerator<T> {
  let pageToken: string | undefined;
  do {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...body,
        page: { limit, ...(pageToken ? { token: pageToken } : {}) },
      }),
    });
    if (res.status !== 200)
      throw new Error(`PDP error ${res.status}: ${await res.text()}`);
    const data = (await res.json()) as SearchResponse<T>;
    yield* data.results;
    pageToken = data.page?.next_token || undefined;
  } while (pageToken);
}
```

The loop keeps `body` and `limit` unchanged across pages, as AuthZEN § 8.2.1 requires, and stops when `page` is absent or `next_token` is empty.
