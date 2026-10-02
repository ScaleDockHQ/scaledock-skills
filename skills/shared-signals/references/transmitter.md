# Transmitter (SSF 1.0)

Section numbers refer to the OpenID Shared Signals Framework 1.0 (Final, 29 August 2025) unless another document is named.

## Transmitter metadata (§7.1, §7.2)

Serve the metadata at `GET /.well-known/ssf-configuration`, inserted between the host and any path of the issuer (§7.2). For example, the issuer `https://tr.example.com/issuer1` serves it at `https://tr.example.com/.well-known/ssf-configuration/issuer1`. Older receivers may also look for `/.well-known/risc-configuration` (§7.2.2).

| Field                                                                                                                   | Requirement                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `spec_version`                                                                                                          | OPTIONAL. `1_0` for this version. When absent, receivers assume `1_0-ID1`.                                                                            |
| `issuer`                                                                                                                | REQUIRED. An https URL with no query or fragment. It equals the discovery issuer and every SET `iss` (§7.2.4).                                        |
| `jwks_uri`                                                                                                              | OPTIONAL. The transmitter's JWK Set.                                                                                                                  |
| `delivery_methods_supported`                                                                                            | RECOMMENDED. Values are `urn:ietf:rfc:8935` (push) and `urn:ietf:rfc:8936` (poll).                                                                    |
| `configuration_endpoint`, `status_endpoint`, `add_subject_endpoint`, `remove_subject_endpoint`, `verification_endpoint` | OPTIONAL. Each one, if present, is an https URL.                                                                                                      |
| `critical_subject_members`                                                                                              | OPTIONAL. Complex subject members that receivers must understand (§3.6).                                                                              |
| `authorization_schemes`                                                                                                 | OPTIONAL. An array of objects, each with a REQUIRED `spec_urn` naming how the management API is authorized, for example `urn:ietf:rfc:6749` (§7.1.1). |
| `default_subjects`                                                                                                      | OPTIONAL. `ALL` or `NONE`: whether new streams include all subjects or none until subjects are added.                                                 |

Example (§7.2.3, Figure 19):

```json
{
  "spec_version": "1_0",
  "issuer": "https://tr.example.com",
  "jwks_uri": "https://tr.example.com/jwks.json",
  "delivery_methods_supported": ["urn:ietf:rfc:8935", "urn:ietf:rfc:8936"],
  "configuration_endpoint": "https://tr.example.com/ssf/mgmt/stream",
  "status_endpoint": "https://tr.example.com/ssf/mgmt/status",
  "add_subject_endpoint": "https://tr.example.com/ssf/mgmt/subject:add",
  "remove_subject_endpoint": "https://tr.example.com/ssf/mgmt/subject:remove",
  "verification_endpoint": "https://tr.example.com/ssf/mgmt/verification",
  "critical_subject_members": ["tenant", "user"],
  "authorization_schemes": [
    { "spec_urn": "urn:ietf:rfc:6749" },
    { "spec_urn": "urn:ietf:rfc:8705" }
  ],
  "default_subjects": "NONE"
}
```

## Stream configuration (§8.1.1)

| Property                    | Supplied by           | Notes                                                                                          |
| --------------------------- | --------------------- | ---------------------------------------------------------------------------------------------- |
| `stream_id`                 | Transmitter, REQUIRED | Unique among non-deleted streams.                                                              |
| `iss`                       | Transmitter, REQUIRED | Identical to the SET `iss`.                                                                    |
| `aud`                       | Transmitter, REQUIRED | A string or array; cannot be updated.                                                          |
| `events_supported`          | Transmitter, OPTIONAL | Event types offered to this receiver.                                                          |
| `events_requested`          | Receiver, OPTIONAL    | Unknown values are ignored. It SHOULD NOT be empty.                                            |
| `events_delivered`          | Transmitter, REQUIRED | A subset of the intersection of supported and requested. The receiver relies on it.            |
| `delivery`                  | REQUIRED              | An object whose `method` is the delivery URI (§6.1).                                           |
| `min_verification_interval` | Transmitter, OPTIONAL | Minimum seconds between verification requests; faster requests may get 429.                    |
| `description`               | Receiver, OPTIONAL    |                                                                                                |
| `inactivity_timeout`        | Transmitter, OPTIONAL | Seconds without receiver activity after which the transmitter may pause or disable the stream. |

Delivery objects (§6.1):

- Push: `{ "method": "urn:ietf:rfc:8935", "endpoint_url": "<receiver URL>", "authorization_header": "<optional>" }`. The receiver supplies `endpoint_url`.
- Poll: `{ "method": "urn:ietf:rfc:8936", "endpoint_url": "<transmitter URL>" }`. The transmitter supplies `endpoint_url`.

## Stream management API (§8)

The management endpoints require HTTP authentication, per `authorization_schemes`. The API itself is RECOMMENDED, not mandatory.

| Operation                 | Request                                                                          | Success                                              | Notes                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Create (§8.1.1.1)         | `POST` configuration endpoint with `events_requested`, `delivery`, `description` | `201 Created` with the full configuration            | Without `delivery`, assume poll and return the poll `endpoint_url`. Answer 409 if multiple streams per receiver are not allowed. |
| Read (§8.1.1.2)           | `GET ?stream_id=...`, or without `stream_id` to list                             | `200 OK`                                             |                                                                                                                                  |
| Update (§8.1.1.3)         | `PATCH` with `stream_id` and the properties to change                            | `200 OK`, or `202` if accepted but not yet processed | Missing properties stay unchanged. Transmitter-supplied properties, if sent, must match, or the answer is 400.                   |
| Replace (§8.1.1.4)        | `PUT` with `stream_id` and all receiver-supplied properties                      | `200 OK`, or `202` if accepted but not yet processed | Missing receiver-supplied properties are reset.                                                                                  |
| Delete (§8.1.1.5)         | `DELETE ?stream_id=...`                                                          | `204 No Content`                                     |                                                                                                                                  |
| Read status (§8.1.2.1)    | `GET` status endpoint `?stream_id=...`                                           | `200 OK` with `stream_id`, `status`, `reason`        |                                                                                                                                  |
| Update status (§8.1.2.2)  | `POST` status endpoint with `stream_id`, `status`, `reason`                      | `200 OK`, or `202` if the decision is pending        | 403 if the receiver may not change status.                                                                                       |
| Add subject (§8.1.3.2)    | `POST` add-subject endpoint with `stream_id`, `subject`, `verified`              | `200 OK`                                             | May return 200 even when events will not flow (§9.1).                                                                            |
| Remove subject (§8.1.3.3) | `POST` remove-subject endpoint with `stream_id`, `subject`                       | `204 No Content`                                     |                                                                                                                                  |
| Verify (§8.1.4.2)         | `POST` verification endpoint with `stream_id` and optional `state`               | `204 No Content`                                     | 400 if invalid, 401 if unauthorized, 404 for an unknown stream, 429 if too frequent.                                             |

Error codes in general: 400 for an invalid request, 401 for missing or failed authorization, 403 when the operation is not allowed, 404 for an unknown stream, 409 for a conflict.

## Stream status (§8.1.2, §8.1.5)

| Status     | Behaviour                                                                                                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`  | Transmit events by the configured delivery method.                                                                                                                                            |
| `paused`   | Do not transmit, and SHOULD hold events to send on re-enable. Held events for the same subject are sent in the order generated, or only the latest ones that make earlier events unnecessary. |
| `disabled` | Do not transmit, and do not hold events.                                                                                                                                                      |

When the transmitter changes status on its own, it sends `stream-updated`. It MUST do so before going from `enabled` to `paused` or `disabled`, and upon re-enabling (§8.1.5).

## Subjects (§8.1.3)

- `default_subjects` sets whether new streams start with all subjects or none.
- `verified` on add-subject is optional. `true` says the receiver has verified the subject claim; `false` says it has not.
- Treat add and remove as hints. Do not reveal whether a subject exists: an add can succeed with no events following (§9.1).

## Verification (§8.1.4)

- Answer a verification request with 204. The event may be sent asynchronously (§8.1.4.2).
- Send a SET with the verification event type. Its `sub_id` is `{ "format": "opaque", "id": "<stream_id>" }`, and it echoes `state` if the receiver sent one.
- A transmitter may also send verification events on its own, without `state`. It may pause or disable a stream that fails verification (§8.1.4.1).

## Delivering events

- **Push (RFC 8935 §2).** POST each SET to the receiver's `endpoint_url` with `Content-Type: application/secevent+jwt` and `Accept: application/json`, adding `authorization_header` if configured. 202 means accepted. On 400, read `err` and `description`. Retransmit only when a failure may be recoverable, such as a network outage, and delay retries (RFC 8935 §2). A structural error such as `invalid_request` will fail again; `access_denied` may succeed after refreshing credentials (RFC 8935 §4).
- **Poll (RFC 8936 §2).** Answer the receiver's POST to the transmitter's `endpoint_url` with `{ "sets": { "<jti>": "<SET>" }, "moreAvailable": <bool> }`. Keep each SET until it is acknowledged by `jti` or reported in `setErrs`.
- One event per SET (§4.2.1). Set `txn` to correlate related SETs (§4.1.9).

## Checklist

- [ ] The well-known document is served at the right path, and `issuer` equals the SET `iss`.
- [ ] Stream create returns 201 with `events_delivered` and `delivery`; with no delivery given, poll is assumed.
- [ ] PATCH, PUT and DELETE behave as in the table, and `aud` cannot be changed.
- [ ] Status changes made by the transmitter emit `stream-updated` first.
- [ ] Verification returns 204 and later delivers a verification SET with the right `sub_id` and `state`.
- [ ] Add-subject responses do not reveal whether the subject exists.
