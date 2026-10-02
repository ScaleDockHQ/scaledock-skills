# Validating OCSF events

Source: the OCSF Schema API description (`https://schema.ocsf.io/doc/swagger.json`) and responses from the schema server on 2026-10-02.

## Schema server endpoints

| Endpoint                                                                                                     | Use                                                                                          |
| ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `GET /api/version`                                                                                           | Current schema version (`1.9.0` at the pin)                                                  |
| `GET /api/versions`                                                                                          | All versions the server hosts, including the next `-dev` version                             |
| `GET /api/1.9.0/categories`, `/classes/{name}`, `/objects/{name}`, `/profiles`, `/extensions`, `/data_types` | Definitions for a pinned version                                                             |
| `GET /schema/classes/{name}`                                                                                 | JSON Schema (draft-07) for a class; `?profiles=` adds profile attributes                     |
| `GET /export/v2/schema`                                                                                      | The whole schema                                                                             |
| `POST /api/v2/validate`                                                                                      | Validate one event; `?missing_recommended=true` also warns on missing recommended attributes |
| `POST /api/v2/validate_bundle`                                                                               | Validate a bundle of events                                                                  |

## Response format

```json
{
  "uid": "6f1c2b8e-7d4a-4b0e-9c1a-2f3e4d5c6b7a",
  "errors": [],
  "warnings": [
    {
      "warning": "attribute_recommended_missing",
      "message": "Recommended attribute \"is_remote\" is missing.",
      "attribute": "is_remote",
      "attribute_path": "is_remote"
    }
  ],
  "error_count": 0,
  "warning_count": 1
}
```

`uid` echoes `metadata.uid` when the event has one. Error codes seen from the validator include:

| Error                        | Cause                                                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `attribute_required_missing` | A required attribute is absent, for example `actor` in API Activity                                                                  |
| `constraint_failed`          | An `at_least_one` or `just_one` constraint is not met, for example `{"at_least_one": ["service", "dst_endpoint"]}` in Authentication |
| `type_uid_incorrect`         | `type_uid` does not equal `class_uid * 100 + activity_id`; the message gives the expected value                                      |
| `attribute_unknown`          | The attribute is not defined for the class or object                                                                                 |

## Example events that validate against 1.9.0

Each of these returned `error_count: 0` and `warning_count: 0` from `POST /api/v2/validate`.

Failed password sign-in (Authentication, Logon):

```json
{
  "class_uid": 3002,
  "category_uid": 3,
  "activity_id": 1,
  "type_uid": 300201,
  "severity_id": 1,
  "time": 1790950000000,
  "status_id": 2,
  "status": "Failure",
  "status_detail": "invalid_password",
  "auth_protocol_id": 99,
  "auth_protocol": "Password",
  "is_mfa": false,
  "message": "Login failed for user jane@example.com",
  "user": {
    "uid": "usr_123",
    "name": "jane@example.com",
    "email_addr": "jane@example.com"
  },
  "src_endpoint": { "ip": "203.0.113.10" },
  "service": { "name": "Example App" },
  "metadata": {
    "version": "1.9.0",
    "product": {
      "name": "Example App",
      "vendor_name": "Example Inc.",
      "version": "4.2.0"
    },
    "uid": "6f1c2b8e-7d4a-4b0e-9c1a-2f3e4d5c6b7a",
    "original_event_uid": "evt_01J"
  },
  "unmapped": { "tenant_plan": "pro" }
}
```

Project deleted through the API (API Activity, Delete):

```json
{
  "class_uid": 6003,
  "category_uid": 6,
  "activity_id": 4,
  "type_uid": 600304,
  "severity_id": 1,
  "time": 1790950000000,
  "status_id": 1,
  "status": "Success",
  "actor": { "user": { "uid": "usr_123", "name": "jane@example.com" } },
  "api": {
    "operation": "DELETE /v1/projects/{id}",
    "request": { "uid": "req_9f2" }
  },
  "src_endpoint": { "ip": "203.0.113.10" },
  "resources": [{ "uid": "prj_42", "type": "project" }],
  "metadata": {
    "version": "1.9.0",
    "product": { "name": "Example App", "vendor_name": "Example Inc." }
  }
}
```

Administrator assigns a role (User Management, Assign Roles):

```json
{
  "class_uid": 3007,
  "category_uid": 3,
  "activity_id": 16,
  "type_uid": 300716,
  "severity_id": 1,
  "time": 1790950000000,
  "status_id": 1,
  "actor": { "user": { "uid": "usr_admin", "name": "admin@example.com" } },
  "user": { "uid": "usr_123", "name": "jane@example.com" },
  "iam_roles": [{ "name": "editor", "uid": "role_editor" }],
  "metadata": {
    "version": "1.9.0",
    "product": { "name": "Example App", "vendor_name": "Example Inc." }
  }
}
```

Session granted privileges (Authorize Session, Assign Privileges):

```json
{
  "class_uid": 3003,
  "category_uid": 3,
  "activity_id": 1,
  "type_uid": 300301,
  "severity_id": 1,
  "time": 1790950000000,
  "status_id": 1,
  "user": { "uid": "usr_123", "name": "jane@example.com" },
  "privileges": ["project:read", "project:write"],
  "session": { "uid": "ses_77" },
  "metadata": {
    "version": "1.9.0",
    "product": { "name": "Example App", "vendor_name": "Example Inc." }
  }
}
```

## Producing events in TypeScript

```ts
type OcsfBase = {
  class_uid: number;
  category_uid: number;
  activity_id: number;
  type_uid: number;
  severity_id: number;
  time: number;
  metadata: {
    version: string;
    product: { name: string; vendor_name?: string; version?: string };
    uid?: string;
  };
  [attribute: string]: unknown;
};

const OCSF_VERSION = "1.9.0";

export function ocsfEvent(
  classUid: number,
  activityId: number,
  attributes: Record<string, unknown>,
  product: OcsfBase["metadata"]["product"],
): OcsfBase {
  return {
    class_uid: classUid,
    category_uid: Math.floor(classUid / 1000),
    activity_id: activityId,
    type_uid: classUid * 100 + activityId,
    severity_id: 1,
    time: Date.now(),
    metadata: { version: OCSF_VERSION, product, uid: crypto.randomUUID() },
    ...attributes,
  };
}

export async function validate(
  event: OcsfBase,
): Promise<{ error_count: number; errors: unknown[] }> {
  const response = await fetch("https://schema.ocsf.io/api/v2/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  return response.json();
}
```

`category_uid` is derived from `class_uid` here because every 1.9.0 class UID in the categories listing starts with its category number; check this against `/api/1.9.0/categories` when adding a class. Send production events to your own pipeline, not to the public validator.
