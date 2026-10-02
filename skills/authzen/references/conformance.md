# Conformance: certification and interop vectors

Two working group artifacts in the AuthZEN repository support conformance testing. Both are pinned to commit `b304f68` in [Sources](../SKILL.md#sources). Neither is part of the Authorization API 1.0 specification, so re-check them before relying on details.

## Certification scenario

The scenario tests protocol conformance: a PDP must accept well-formed requests and return correctly structured responses. It does not judge the implementer's own policy logic. The only decision values the harness checks are the eight fixture decisions below (Cert § introduction, § c-1-4).

### Levels (Cert § certification-levels)

| Level     | Sub-level  | API                                 | Tests                                                        |
| --------- | ---------- | ----------------------------------- | ------------------------------------------------------------ |
| Basic     | Core       | Access Evaluation                   | A single decision using required fields only                 |
| Basic     | Properties | Access Evaluation                   | A single decision using entity properties                    |
| Batch     | Core       | Access Evaluations                  | Several decisions using required fields only                 |
| Batch     | Properties | Access Evaluations                  | Several decisions using properties and default value merging |
| Search    | Core       | Subject, Resource and Action Search | Searches using required fields only                          |
| Search    | Properties | Subject, Resource and Action Search | Searches using entity properties                             |
| Discovery | none       | PDP metadata                        | The well-known configuration endpoint                        |

- Prerequisites: Batch Core requires Basic Core, Batch Properties requires Basic Properties, and Search Properties requires Search Core.
- The response format, error handling, header handling and idempotency tests, and the transport requirements, apply to every sub-level (Cert § test-id-matrix).
- Discovery is independent and is not a prerequisite for the other levels (Cert § c-6).

### Required fixture (Cert § c-1)

| Kind                | Identifier | Properties              |
| ------------------- | ---------- | ----------------------- |
| Subject (`user`)    | `alice`    | none                    |
| Subject (`user`)    | `bob`      | `role: "admin"`         |
| Resource (`record`) | `record-1` | `status: "active"`      |
| Resource (`record`) | `record-2` | `status: "archived"`    |
| Action              | `read`     | none                    |
| Action              | `write`    | none                    |
| Action              | `delete`   | `soft: true` or `false` |

Required decisions (Cert § c-1-4):

| #   | Subject                      | Action                      | Resource                           | Decision |
| --- | ---------------------------- | --------------------------- | ---------------------------------- | -------- |
| 1   | `alice`                      | `read`                      | `record-1`                         | `true`   |
| 2   | `alice`                      | `write`                     | `record-1`                         | `true`   |
| 3   | `bob`                        | `read`                      | `record-1`                         | `true`   |
| 4   | `bob`                        | `write`                     | `record-1`                         | `false`  |
| 5   | `alice`                      | `write`                     | resource with `status: "archived"` | `false`  |
| 6   | subject with `role: "admin"` | `write`                     | resource with `status: "archived"` | `true`   |
| 7   | `alice`                      | `delete` with `soft: true`  | `record-1`                         | `true`   |
| 8   | `alice`                      | `delete` with `soft: false` | `record-1`                         | `false`  |

- Rules 1–4 are Core and use identifiers only. Rules 5–8 are Properties: the PDP MUST evaluate the `properties` the harness sends (Cert § c-1-6).
- The eight decisions MUST hold whether `context` is present or absent. Extra entities and policies are allowed (Cert § c-1-6).
- How the PDP implements the policy is up to the implementer (Cert § c-1-4).

Search fixture (Cert § c-1-5). The harness checks that the expected entities appear and accepts additional ones:

- **S1:** a Subject Search for `user` subjects that can `read` `record-1` includes `alice` and `bob`.
- **S2:** a Resource Search for `record` resources that `alice` can `read` includes `record-1`.
- **S3:** an Action Search for `alice` on `record-1` includes `read` and `write`.
- **S4:** a Subject Search for `user` subjects that can `write` `record-2` with `status: "archived"` includes `bob`.
- **S5:** a Resource Search for `record` resources that `bob` with `role: "admin"` can `write` includes `record-2`.
- **S6:** an Action Search for `bob` with `role: "admin"` on `record-2` with `status: "archived"` includes `write`.

### Behaviour the harness checks

- **Transport (Cert § c-5):** the PDP accepts HTTPS with `Content-Type: application/json`, returns `200` with `application/json` on success, returns `400` for missing required fields, echoes `X-Request-ID` when present, and ignores unknown request fields.
- **Basic errors (Cert § c-2-4):** missing fields or sub-fields, an invalid content type, malformed JSON, an empty body and invalid field types.
- **Batch (Cert § c-3):** the response array matches the request in length and order, each item has a `decision`, `execute_all` per-item errors are handled, and a missing or empty `evaluations` array falls back to a single evaluation.
- **Search (Cert § c-4):**
  - An unknown entity identifier or type returns an empty `results` array, not `400` (Cert § c-4-6).
  - A missing required entity returns `400` (Cert § c-4-7-1).
  - Every input entity MUST carry an `id`, so which sub-field is required depends on the endpoint (Cert § c-4-7-2).
- **Discovery (Cert § c-6):**
  - The metadata response includes `policy_decision_point`, matching the base URL used, and `access_evaluation_endpoint`.
  - Every endpoint URL present is HTTPS, `capabilities` is an array of strings, and any `signed_metadata` has a verifiable signature and an `iss` claim (Cert § c-6-3, § c-6-5).
  - A `404` fails Discovery. For the other levels the harness falls back to the default paths (Cert § c-6-6).

## Interop scenarios and test vectors

The `interop/` directory holds the working group's interop scenarios, sample applications and test data. It is non-normative.

| Path                                                                        | Content                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `interop/authzen-todo-backend/test/decisions-authorization-api-1_0-02.json` | Todo scenario vectors as `{ "evaluation": [...], "evaluations": [...] }`. Each entry has a `request` and an `expected` value: a boolean for an evaluation, or an array of Decision objects for a batch. Sibling files end in `-00` and `-01`. |
| `interop/authzen-api-gateways/test-harness/test/decisions.json`             | API gateway scenario vectors, with `route` resources and HTTP method actions.                                                                                                                                                                 |
| `interop/authzen-search-demo/test/{subject,resource,action}/results.json`   | Search scenario vectors. Each entry has a `request` and the `expected` search response.                                                                                                                                                       |
| `interop/authzen-idp/test-harness/`                                         | The identity provider scenario harness.                                                                                                                                                                                                       |
| `interop/authzen-interop-website/docs/scenarios/`                           | Scenario descriptions and per-implementer results for todo, todo-1.0-id, todo-1.1, api-gateway, idp and search.                                                                                                                               |

Use the vectors as a regression suite. Load the scenario's data into the PDP, replay each `request` against the matching endpoint, and compare the response with `expected`.

```ts
interface Vector<T> {
  request: Record<string, unknown>;
  expected: T;
}

async function replay(
  endpoint: string,
  vectors: Vector<boolean>[],
  call: (url: string, body: unknown) => Promise<Decision>,
): Promise<Vector<boolean>[]> {
  const failures: Vector<boolean>[] = [];
  for (const v of vectors) {
    const d = await call(endpoint, v.request);
    if (d.decision !== v.expected) failures.push(v);
  }
  return failures;
}
```
