# Tuples and the API

Relationship tuples, the OpenFGA API endpoints, model ids and consistency. Sources: `openfga/api` `openfga_service.proto`, `openfga.proto` and `openfga_service_consistency.proto` (rendered at the OpenFGA API reference), and the Concepts, Update Relationship Tuples, Relationship Queries, Contextual Tuples, Query Consistency Modes, Immutable Authorization Models and Managing Tuples and Invoking API Best Practices pages, listed in [Sources](../SKILL.md#sources).

## Relationship tuples

```json
{
  "user": "team:writers#member",
  "relation": "editor",
  "object": "document:meeting_notes.doc",
  "condition": {
    "name": "non_expired_grant",
    "context": { "grant_time": "2023-01-01T00:00:00Z", "grant_duration": "10m" }
  }
}
```

- `user` is `type:id`, a userset `type:id#relation`, or `type:*`; `object` is `type:id`; `condition` is optional (Concepts, What Is A Relationship Tuple?).
- `type:*` is allowed only as `user` and never inside a userset (Concepts, What Is Type Bound Public Access?).
- Field limits: `user` up to 512 bytes, `relation` up to 50 characters, `object` up to 256 characters (openfga.proto, `TupleKey`).
- A tuple is accepted only if the target model's type restrictions allow it, including the required condition (Configuration Language; Conditions).
- Use unique, stable ids, and keep personal or regulated data out of them (User Groups, caution; Managing Tuples and Invoking API Best Practices).
- Implicit tuples such as `document:1#viewer@document:1#viewer` hold by set theory and cannot be written (openfga_service.proto, Write and Check descriptions).

## Endpoints

All are under `/stores/{store_id}` (openfga_service.proto):

| RPC                                 | HTTP                                                             | Use                                                                                   |
| ----------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `Write`                             | `POST /write`                                                    | Add and delete tuples in one transaction.                                             |
| `Read`                              | `POST /read`                                                     | Stored tuples matching a filter. No model evaluation.                                 |
| `ReadChanges`                       | `GET /changes`                                                   | Paginated tuple additions and deletions, filterable by `type` and `start_time`.       |
| `Check`                             | `POST /check`                                                    | Does user U have relation R with object O?                                            |
| `BatchCheck`                        | `POST /batch-check`                                              | Many checks in one request.                                                           |
| `Expand`                            | `POST /expand`                                                   | The userset tree for a relation on an object; for debugging.                          |
| `ListObjects`                       | `POST /list-objects`                                             | Objects of a type the user has a relation with.                                       |
| `StreamedListObjects`               | `POST /streamed-list-objects`                                    | The same, streamed as results are found.                                              |
| `ListUsers`                         | `POST /list-users`                                               | Users of a type with a relation to an object.                                         |
| `WriteAuthorizationModel`           | `POST /authorization-models`                                     | Create a new model version; returns `authorization_model_id`.                         |
| `ReadAuthorizationModels`           | `GET /authorization-models`                                      | Model versions, newest first, 50 per page by default.                                 |
| `ReadAuthorizationModel`            | `GET /authorization-models/{id}`                                 | One model.                                                                            |
| `WriteAssertions`, `ReadAssertions` | `PUT`/`GET /assertions/{authorization_model_id}`                 | Up to 100 stored assertions per model.                                                |
| Stores                              | `POST /stores`, `GET /stores`, `GET`/`DELETE /stores/{store_id}` | Create, list, get and delete stores. `UpdateStore` (`PATCH`) is marked unimplemented. |

## Write

From openfga_service.proto (Write) and Update Relationship Tuples:

- `writes.tuple_keys` adds tuples and `deletes.tuple_keys` removes them; both in one request are one transaction.
- At most 100 unique tuples across writes and deletes per request. The same tuple twice in one request fails with `cannot_allow_duplicate_tuples_in_one_request`.
- Not idempotent by default: writing an existing tuple key (even with a different condition) or deleting a missing one is an error.
- `writes.on_duplicate: "ignore"` treats identical writes as no-ops; `deletes.on_missing: "ignore"` treats missing deletes as no-ops. Both need server v1.10.0 or later. A tuple with the same key but a different condition name or context is still a conflict, and the request fails with `409 Conflict`.
- If a request mixes ignore and error behaviour, error wins.
- With `authorization_model_id`, each written tuple is validated against that model; without it, against the latest model.

## Check and BatchCheck

From openfga_service.proto (Check, BatchCheck) and Relationship Queries:

- Request: `tuple_key {user, relation, object}`, optional `contextual_tuples.tuple_keys` (at most 100), `context` for conditions, `authorization_model_id`, `consistency`, and `trace`. Response: `allowed`.
- `user` may be a specific user, a userset (`group:marketing#member`) or `user:*`.
- Check answers "does user X have relation Y with object Z?". It does not answer who has access, what a user can access, or why (Relationship Queries, Check, Caveats).
- BatchCheck takes `checks[]`, each with `tuple_key`, `contextual_tuples`, `context` and a `correlation_id` matching `^[\w\d-]{1,36}$` that must be unique in the batch; results come back as a map keyed by `correlation_id`, each with `allowed` or `error`. The maximum batch size is the server setting `OPENFGA_MAX_CHECKS_PER_BATCH_CHECK`. For fewer than about 10 checks, parallel Check calls may be faster (Relationship Queries, Batch Check).
- Use BatchCheck to filter a page of search results or to decide which fields of a page to show.

## ListObjects and StreamedListObjects

- Request: `type`, `relation`, `user`, plus `contextual_tuples`, `context`, `authorization_model_id` and `consistency`. Response: `objects` as `type:id` strings, unsorted (openfga_service.proto, ListObjects).
- Results stop at the deadline (`OPENFGA_LIST_OBJECTS_DEADLINE`, default 3 s) or the maximum (`OPENFGA_LIST_OBJECTS_MAX_RESULTS`, default 1000), whichever comes first, so the list can be partial. StreamedListObjects is limited only by the deadline (Relationship Queries, ListObjects; openfga_service.proto, StreamedListObjects).
- Fits access-aware filtering of small collections. Use it to build a list of ids, then search; for large collections, search then BatchCheck (Relationship Queries, ListObjects).

## ListUsers

- Request: `object {type, id}`, `relation`, and `user_filters` with exactly one entry (`{type}` or `{type, relation}` for usersets), plus `contextual_tuples` (at most 100), `context`, `authorization_model_id` and `consistency` (openfga_service.proto, `ListUsersRequest`).
- Response: `users`, each a typed object, userset or type-bound public access, unsorted; limited by `OPENFGA_LIST_USERS_DEADLINE` and `OPENFGA_LIST_USERS_MAX_RESULTS` (defaults 3 s and 1000).
- A `user:*` result does not mean every user has access: an exclusion may remove some. Check individual users before relying on it (openfga_service.proto, ListUsers).

## Read, Expand and ReadChanges

- **Read** returns stored tuples only. `tuple_key` is optional (all tuples); if given, `object` is required and may be a type only (`document:`), in which case `user` is required. Order is not guaranteed. Read ignores the model: a writer who is also a reader through the model is not returned for `reader` (openfga_service.proto, Read; Relationship Queries, Read).
- **Expand** takes `relation` and `object` and returns a tree whose leaves are users and usersets, with union, intersection and difference as inner nodes. Expand leaves recursively to see the whole graph. Use it to debug why a user has access (openfga_service.proto, Expand; Relationship Queries, Expand).
- **ReadChanges** returns tuple changes in pages; filter by `type` and, since v1.8.0, `start_time` (openfga_service.proto, ReadChanges; CHANGELOG 1.8.0).

## Model ids

- Models are immutable; each write returns a new ULID `authorization_model_id` (Immutable Authorization Models).
- Pass `authorization_model_id` on Check, BatchCheck, ListObjects, ListUsers, Expand and Write. Without it the server uses the latest model, which costs a lookup and lets a bad model write break production (Immutable Authorization Models; Managing Tuples and Invoking API Best Practices).
- Store the id next to the store id in configuration, and roll out a new id deliberately, with shadow checks for large changes.

## Consistency

`consistency` on Check, BatchCheck, Expand, ListObjects, ListUsers and Read takes `MINIMIZE_LATENCY` (the default) or `HIGHER_CONSISTENCY` (openfga_service_consistency.proto; Query Consistency Modes):

- `MINIMIZE_LATENCY` serves from cache when possible, so a Check right after a Write may not see the new tuple.
- `HIGHER_CONSISTENCY` skips the cache and reads the datastore, at a latency cost. Do not set it on every request; decide at run time, for example when the resource changed within the cache TTL.
- Caching is disabled by default; with caching off, every query is strongly consistent whatever the mode.
- There is no Zookie-style consistency token yet.

## Choosing the query

| Need                                  | Use                      |
| ------------------------------------- | ------------------------ |
| Can user X do Y on object Z?          | Check                    |
| Many such questions at once           | BatchCheck               |
| Which objects of a type can X access? | ListObjects (small sets) |
| Which users can access object Z?      | ListUsers                |
| Which tuples are stored?              | Read                     |
| Why does X have access?               | Expand                   |
| What changed since T?                 | ReadChanges              |

Source: Relationship Queries, Summary.
