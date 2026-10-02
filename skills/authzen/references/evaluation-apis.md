# Access Evaluation and Access Evaluations

## Access Evaluation API (AuthZEN § 6)

Answers one question, such as "Can Alice view document #123?" (AuthZEN § 3).

- **Request:** `subject`, `action` and `resource` are REQUIRED, and `context` is OPTIONAL (AuthZEN § 6.1).
- **Response:** a Decision (AuthZEN § 6.2).
- **Default path:** `/access/v1/evaluation`, or the `access_evaluation_endpoint` from metadata (AuthZEN § 10.1).

```http
POST /access/v1/evaluation HTTP/1.1
Host: pdp.example.com
Content-Type: application/json
Authorization: Bearer <token>
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

{
  "subject": { "type": "user", "id": "alice@example.com" },
  "resource": { "type": "account", "id": "123" },
  "action": { "name": "can_read", "properties": { "method": "GET" } },
  "context": { "time": "1985-10-26T01:22-07:00" }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

{ "decision": true }
```

## Access Evaluations API (AuthZEN § 7)

Sends several evaluations in one message ("boxcarring").

- **Request:** the PEP MAY add an `evaluations` array. Each item has the shape of an Access Evaluation request and is a separate, independent request. The PDP may run the items sequentially or in parallel (AuthZEN § 7.1).
- **Backwards compatibility:** with no `evaluations` array, or an empty one, the request behaves as a single Access Evaluation request (AuthZEN § 7.1).
- **Default path:** `/access/v1/evaluations`, or `access_evaluations_endpoint` from metadata (AuthZEN § 10.1).

### Default values (AuthZEN § 7.1.1)

- The top-level `subject`, `action`, `resource` and `context` are defaults for every item in `evaluations`.
- A key inside an item overrides the top-level default.
- Because `subject`, `action` and `resource` are required, any of them omitted from an item MUST be present at the top level. The top-level key MAY be omitted only when every item has it (AuthZEN § 7.1).

```json
{
  "subject": { "type": "user", "id": "alice@example.com" },
  "context": { "time": "2024-05-31T15:22-07:00" },
  "action": { "name": "can_read" },
  "evaluations": [
    { "resource": { "type": "document", "id": "boxcarring.md" } },
    { "resource": { "type": "document", "id": "subject-search.md" } },
    {
      "action": { "name": "can_edit" },
      "resource": { "type": "document", "id": "resource-search.md" }
    }
  ]
}
```

### Evaluation semantics (AuthZEN § 7.1.2, § 7.1.2.1)

`options` is an optional object for PEP-supplied execution metadata. `options.evaluations_semantic` takes exactly one of these values:

| Value                    | Behaviour                                                                                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `execute_all`            | The default. Every item runs, possibly in parallel, and every result is returned. A failure can be shown as `decision: false`, with a reason in `context`. |
| `deny_on_first_deny`     | Works like `&&`. The call short-circuits and returns at the first denial, whether an error or `decision: false`.                                           |
| `permit_on_first_permit` | Works like `\|\|`. The call short-circuits and returns at the first permit.                                                                                |

In the specification's example, `deny_on_first_deny` over three documents where the second is denied returns two decisions, and `permit_on_first_permit` where the first is permitted returns one (AuthZEN § 7.1.2.1.1).

### Response (AuthZEN § 7.2)

- `evaluations` lists Decisions in the same order as the request items.
- When `evaluations` is present, the top-level `decision` is RECOMMENDED to be omitted. If it is present, the PEP can ignore it.

### Errors (AuthZEN § 7.2.1)

- An error about the whole payload uses the transport: `4XX` and `5XX` status codes for the HTTPS binding.
- An error in one item is returned at the payload level. Decisions default to closed (`false`), and that item's `context` can describe the error.

```json
{
  "evaluations": [
    { "decision": true },
    {
      "decision": false,
      "context": { "error": { "status": 404, "message": "Resource not found" } }
    },
    {
      "decision": false,
      "context": { "reason": "Subject is a viewer of the resource" }
    }
  ]
}
```

## PEP sketch

```ts
type Semantic = "execute_all" | "deny_on_first_deny" | "permit_on_first_permit";

interface EvaluationsRequest extends Partial<EvaluationRequest> {
  evaluations?: Partial<EvaluationRequest>[];
  options?: { evaluations_semantic?: Semantic };
}

async function evaluate(
  endpoint: string,
  token: string,
  req: EvaluationRequest,
): Promise<Decision> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Request-ID": crypto.randomUUID(),
    },
    body: JSON.stringify(req),
  });
  // 400, 401, 403 and 500 describe the request, not the decision (AuthZEN § 10.1.2).
  if (res.status !== 200)
    throw new Error(`PDP error ${res.status}: ${await res.text()}`);
  return (await res.json()) as Decision;
}

function permitted(
  d: Decision,
  understood: (ctx: Record<string, unknown>) => boolean,
): boolean {
  if (!d.decision) return false;
  return d.context === undefined || understood(d.context);
}
```

The `permitted` helper applies AuthZEN § 5.5: `false` never goes forward, and the PEP MAY reject `true` when it does not understand the decision `context`. How the PEP enforces a thrown PDP error is its own policy; the specification only says such errors are distinct from a decision.

## PDP sketch

```ts
class BadRequest extends Error {}

function resolveItems(body: EvaluationsRequest): EvaluationRequest[] {
  const items = body.evaluations?.length ? body.evaluations : [{}];
  return items.map((item) => {
    const merged = {
      subject: item.subject ?? body.subject,
      action: item.action ?? body.action,
      resource: item.resource ?? body.resource,
      context: item.context ?? body.context,
    };
    if (!merged.subject?.type || !merged.subject.id)
      throw new BadRequest("subject");
    if (!merged.resource?.type || !merged.resource.id)
      throw new BadRequest("resource");
    if (!merged.action?.name) throw new BadRequest("action");
    return merged as EvaluationRequest;
  });
}

async function evaluations(
  body: EvaluationsRequest,
  decide: (r: EvaluationRequest) => Promise<Decision>,
): Promise<{ evaluations: Decision[] } | Decision> {
  const items = resolveItems(body);
  if (!body.evaluations?.length) return decide(items[0]);

  const semantic = body.options?.evaluations_semantic ?? "execute_all";
  if (semantic === "execute_all")
    return { evaluations: await Promise.all(items.map(decide)) };

  const out: Decision[] = [];
  for (const item of items) {
    const d = await decide(item);
    out.push(d);
    if (semantic === "deny_on_first_deny" && !d.decision) break;
    if (semantic === "permit_on_first_permit" && d.decision) break;
  }
  return { evaluations: out };
}
```

Map `BadRequest` to `400` with an error message string body (AuthZEN § 10.1.1, § 10.1.2). Inside `decide`, catch per-item failures and return `{ decision: false, context: { error: … } }` so one bad item does not fail the batch (AuthZEN § 7.2.1). Reject an `evaluations_semantic` value outside the three defined ones; the specification allows exactly one of them (AuthZEN § 7.1.2.1).
