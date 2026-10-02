# Information model

Requests and responses use five entities: Subject, Action, Resource, Context and Decision (AuthZEN § 5).

## Subject (AuthZEN § 5.1)

The user or machine principal the API is invoked about.

| Key          | Requirement | Value                                                           |
| ------------ | ----------- | --------------------------------------------------------------- |
| `type`       | REQUIRED    | String: the type of the Subject.                                |
| `id`         | REQUIRED    | String: the unique identifier of the Subject, scoped to `type`. |
| `properties` | OPTIONAL    | Object: additional attributes.                                  |

Many PDPs are stateless and expect the PEP to pass every attribute the policy needs, such as department, group memberships, device identifier or IP address. A property value can be a string, number, boolean or null, or an array or object (AuthZEN § 5.1.1).

```json
{
  "type": "user",
  "id": "alice@example.com",
  "properties": {
    "ip_address": "172.217.22.14",
    "device_id": "8:65:ee:17:7e:0b"
  }
}
```

## Resource (AuthZEN § 5.2)

The target of the access request, built like a Subject: REQUIRED string `type` and `id` (scoped to `type`), and optional `properties`. Properties can carry attributes used in the evaluation or metadata about the resource (AuthZEN § 5.2.1).

```json
{
  "type": "book",
  "id": "123",
  "properties": {
    "library_record": { "title": "AuthZEN in Action", "isbn": "978-0593383322" }
  }
}
```

## Action (AuthZEN § 5.3)

The type of access the requester intends to perform: a REQUIRED string `name` and optional `properties`, for example the parameters of the action (AuthZEN § 5.3.1).

```json
{ "name": "extend-loan", "properties": { "period": "2W" } }
```

## Context (AuthZEN § 5.4)

An object describing the environment of the request, for example the time of day, where the request came from, capabilities of the PEP, or JSON Schema or JSON-LD definitions for the request.

```json
{
  "time": "1985-10-26T01:22-07:00",
  "schema": "https://schema.example.com/access-request.schema.json"
}
```

## Decision (AuthZEN § 5.5)

| Key        | Requirement | Value                                                        |
| ---------- | ----------- | ------------------------------------------------------------ |
| `decision` | REQUIRED    | Boolean: allow (`true`) or deny (`false`).                   |
| `context`  | OPTIONAL    | Object: information the PEP can use to enforce the decision. |

- `true`: the request may go forward. If the PEP does not understand the decision `context`, it MAY reject the decision.
- `false`: the request is denied and MUST NOT go forward.

The decision `context` can carry reasons, advice or obligations, hints for rendering UI state, step-up authentication instructions and environmental information (AuthZEN § 5.5.1). The specification gives only non-normative examples of its contents (AuthZEN § 5.5.2), so a PEP and PDP agree on the keys they use.

Reasons for administrators and end users, keyed by HTTP status code (AuthZEN § 5.5.2.1):

```json
{
  "decision": false,
  "context": {
    "reason_admin": { "403": "Request failed policy C076E82F" },
    "reason_user": {
      "403": "Insufficient privileges. Contact your administrator"
    }
  }
}
```

A step-up request that signals the `acr` and `amr` values the PDP expects (AuthZEN § 5.5.2.3):

```json
{
  "decision": false,
  "context": { "acr_values": "urn:com:example:loa:3", "amr_values": "mfa hwk" }
}
```

## TypeScript types

```ts
type Properties = Record<string, unknown>;

interface Subject {
  type: string;
  id: string;
  properties?: Properties;
}
interface Resource {
  type: string;
  id: string;
  properties?: Properties;
}
interface Action {
  name: string;
  properties?: Properties;
}
type Context = Record<string, unknown>;

interface EvaluationRequest {
  subject: Subject;
  action: Action;
  resource: Resource;
  context?: Context;
}

interface Decision {
  decision: boolean;
  context?: Record<string, unknown>;
}
```
