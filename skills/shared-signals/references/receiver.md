# Receiver (SSF 1.0 with RFC 8935 and RFC 8936)

Section numbers refer to SSF 1.0 (Final, 29 August 2025) unless another document is named.

## 1. Discover the transmitter (§7.2)

1. Build the URL by inserting `/.well-known/ssf-configuration` between the host and the path of the configured issuer, then `GET` it (§7.2.1).
2. Check that the `issuer` in the response equals the issuer you started from. If not, stop (§7.2.4).
3. Record `jwks_uri`, `delivery_methods_supported`, the management endpoints and `authorization_schemes`.
4. If `spec_version` is missing, treat the transmitter as `1_0-ID1` (§7.1).

## 2. Create the stream (§8.1.1.1)

```http
POST /ssf/mgmt/stream HTTP/1.1
Host: tr.example.com
Authorization: Bearer eyJ0b2tlbiI6ImV4YW1wbGUifQo=
Content-Type: application/json

{
  "delivery": { "method": "urn:ietf:rfc:8935", "endpoint_url": "https://receiver.example.com/events" },
  "events_requested": [
    "https://schemas.openid.net/secevent/caep/event-type/session-revoked",
    "https://schemas.openid.net/secevent/caep/event-type/credential-change"
  ],
  "description": "Session and credential events"
}
```

- Expect `201 Created`. Check that the response `iss` matches the discovered issuer.
- Store `stream_id`, `aud` and `events_delivered`. Rely on `events_delivered`, not on `events_requested`, for what will arrive.
- On 409, the transmitter allows only one stream per receiver: `GET` it, then `PATCH` or `PUT` it.
- Omitting `delivery` asks for poll. The transmitter then returns the poll `endpoint_url`.
- Request only the events you understand and can act on.

Then trigger verification: `POST` to the verification endpoint with `{ "stream_id": "...", "state": "<random>" }`. Expect 204, and later a verification SET that echoes the same `state` (§8.1.4). Do not depend on it arriving synchronously or in any order. Respect `min_verification_interval`.

## 3. Validate every SET

Run these checks before acting on the event. They come from RFC 8935 §2, RFC 8417 and SSF §4.

1. Parse the compact JWS. The header `typ` must be `secevent+jwt` (RFC 8417 §2.3, SSF §4.1.1).
2. Verify the signature with a key from the transmitter's `jwks_uri` (SSF §4.1.4). Reject `none`.
3. `iss` equals the stream's `iss` and the discovery issuer (§4.1.6).
4. `aud` contains this receiver's audience from the stream configuration (§4.1.8).
5. `jti` and `iat` are present (RFC 8417 §2.2), and `sub_id` is present (§3.1). There is no `sub` (§4.1.2).
6. `events` has exactly one member (§4.2.1). Its type is in `events_delivered`, or is an SSF stream event.
7. Complex subjects contain no critical member the receiver cannot process (§3.6).
8. Ignore unknown members (§4.2.3).
9. For verification events, the `state` matches; otherwise the error is `invalid_state` (§8.1.4.1).

Replays: a transmitter may send the same SET more than once. Respond as if it were new, and make processing idempotent on `jti` (RFC 8935 §2).

## 4a. Push endpoint (RFC 8935)

- The request is `POST` with `Content-Type: application/secevent+jwt`, and the body is the SET (§2.1).
- Authenticate the transmitter. SSF lets the receiver supply an `authorization_header` in the delivery config for this (SSF §6.1.1).
- Validate and persist, then answer `202 Accepted` with an empty body (§2.2). Run business logic asynchronously.
- On failure, answer `400` with `Content-Type: application/json` and `{ "err": "<code>", "description": "<text>" }` (§2.3). Codes (§2.4):
  - `invalid_request`
  - `invalid_key`
  - `invalid_issuer`
  - `invalid_audience`
  - `authentication_failed`
  - `access_denied`
  - `invalid_state` (added by SSF for verification)

## 4b. Poll loop (RFC 8936)

POST JSON to the transmitter's `endpoint_url`.

Request members (§2.2):

- `maxEvents`: optional; `0` makes an acknowledge-only request.
- `returnImmediately`: optional; the default `false` means long poll.
- `ack`: the `jti` values processed successfully.
- `setErrs`: an object of `jti` to `{ "err", "description" }`.

Response members (§2.3):

- `sets`: an object of `jti` to SET string.
- `moreAvailable`: a boolean.

```json
{
  "ack": ["3d0c3cf797584bd193bd0fb1bd4e7d30"],
  "setErrs": {
    "4d3559ec67504aaba65d40b0363faad8": {
      "err": "authentication_failed",
      "description": "The SET could not be authenticated"
    }
  },
  "returnImmediately": true
}
```

Acknowledge every SET you received, either in `ack` or in `setErrs`. Unacknowledged SETs are sent again (§2.3).

## Framework-neutral TypeScript

The signature check is passed in, so any JOSE library can be used.

```ts
type SetError =
  | "invalid_request"
  | "invalid_key"
  | "invalid_issuer"
  | "invalid_audience"
  | "authentication_failed"
  | "access_denied"
  | "invalid_state";

interface StreamConfig {
  iss: string;
  aud: string;
  eventsDelivered: Set<string>;
  criticalSubjectMembers: string[];
}

interface VerifiedJwt {
  header: { typ?: string };
  payload: Record<string, unknown>;
}

const SSF_EVENTS = new Set([
  "https://schemas.openid.net/secevent/ssf/event-type/verification",
  "https://schemas.openid.net/secevent/ssf/event-type/stream-updated",
]);

export function validateSet(
  jwt: VerifiedJwt | null, // null when the signature did not verify against jwks_uri keys
  stream: StreamConfig,
):
  | { ok: true; type: string; event: Record<string, unknown> }
  | { ok: false; err: SetError } {
  if (!jwt) return { ok: false, err: "authentication_failed" };
  const { header, payload } = jwt;
  if (header.typ !== "secevent+jwt")
    return { ok: false, err: "invalid_request" };
  if (payload.iss !== stream.iss) return { ok: false, err: "invalid_issuer" };
  const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!aud.includes(stream.aud)) return { ok: false, err: "invalid_audience" };
  if (typeof payload.jti !== "string" || typeof payload.iat !== "number")
    return { ok: false, err: "invalid_request" };
  if (
    typeof payload.sub_id !== "object" ||
    payload.sub_id === null ||
    "sub" in payload
  ) {
    return { ok: false, err: "invalid_request" };
  }
  const events = payload.events as
    Record<string, Record<string, unknown>> | undefined;
  const types = events ? Object.keys(events) : [];
  if (types.length !== 1) return { ok: false, err: "invalid_request" };
  const [type] = types;
  if (!stream.eventsDelivered.has(type) && !SSF_EVENTS.has(type))
    return { ok: false, err: "invalid_request" };
  return { ok: true, type, event: events![type] };
}

export async function handlePush(
  body: string,
  contentType: string | undefined,
  verify: (compact: string) => Promise<VerifiedJwt | null>,
  stream: StreamConfig,
  persist: (jti: string, compact: string) => Promise<void>,
): Promise<{ status: 202 | 400; body?: string }> {
  if (contentType?.split(";")[0].trim() !== "application/secevent+jwt") {
    return {
      status: 400,
      body: JSON.stringify({
        err: "invalid_request",
        description: "unexpected content type",
      }),
    };
  }
  const jwt = await verify(body);
  const result = validateSet(jwt, stream);
  if (!result.ok)
    return {
      status: 400,
      body: JSON.stringify({ err: result.err, description: "SET rejected" }),
    };
  await persist(jwt!.payload.jti as string, body); // idempotent on jti; act on the event asynchronously
  return { status: 202 };
}
```

The critical-member check (SSF §3.6) and the verification `state` check depend on local data; add them where `validateSet` returns `ok`.

## Subjects and privacy (§8.1.3, §9)

- Add subjects with `POST` to the add-subject endpoint. A 200 does not prove the subject exists or that events will follow (§9.1).
- After removing a subject, events about it may still arrive for a while. Tolerate them (§9.3).
- Request only the events you need, and keep the event data under your own retention policy (§10).

## Checklist

- [ ] The discovery `issuer` check and the stream-create `iss` check are both in place.
- [ ] Every validation step above has a test that fails the SET.
- [ ] Push answers 202 with no body, or 400 with `err`.
- [ ] Poll acknowledges or reports every received `jti`.
- [ ] Processing is idempotent on `jti` and runs after the acknowledgement.
- [ ] A verification round trip succeeds with a matching `state`.
