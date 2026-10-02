# SCIM security events (RFC 9967)

Load this when a SCIM service provider publishes change events, or a client needs asynchronous request completion. RFC 9967 (May 2026) profiles Security Event Tokens (SETs, RFC 8417) for SCIM and updates RFC 7643 and RFC 7644. Delivery uses RFC 8935 (push) or RFC 8936 (poll).

## Event shape (§2, §2.1, §2.2)

- **Event URIs.** Events use the prefix `urn:ietf:params:scim:event`, in the namespaces `feed` and `prov`, plus `misc:asyncresp`.
- **Subject.** It MUST be in the top-level `sub_id` claim (RFC 9493), never inside `events`. `sub` MUST NOT be used.
- **`sub_id` contents.**
  - `format` is `scim`.
  - `uri` MUST be present and holds the relative path, such as `/Users/{id}`.
  - `externalId` is included if known.
  - `id` MAY be included.
  - Other attributes with `uniqueness` of `server` or `global` MAY be added when needed.
- **`txn`.** Identifies the originating transaction and stays the same across retransmissions. It is REQUIRED for asynchronous requests, coordinated provisioning and replication.
- **`version`.** The resource ETag after the event.
- **Payload.** Exactly one of `data` (the full resource or command) or `attributes` (the changed attribute paths) is present.

```json
{
  "jti": "4d3559ec67504aaba65d40b0363faad8",
  "iat": 1458496404,
  "iss": "https://scim.example.com",
  "aud": ["https://scim.example.com/Feeds/98d52461fa5bbc879593b7754"],
  "txn": "b7b953f11cc6489bbfb87834747cc4c1",
  "sub_id": {
    "format": "scim",
    "uri": "/Users/44f6142df96bd6ab61e7521d9",
    "externalId": "jdoe"
  },
  "events": {
    "urn:ietf:params:scim:event:prov:patch:notice": {
      "attributes": ["emails", "name.familyName"]
    }
  }
}
```

## Event types (§2.3, §2.4)

| URI                                | Meaning                                                                                                           |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `feed:add`, `feed:remove`          | The resource joined or left the feed. This does not mean it was created or deleted.                               |
| `prov:create:{notice\|full}`       | Resource created. `full` carries `data`, including the assigned `id`.                                             |
| `prov:patch:{notice\|full}`        | Resource patched.                                                                                                 |
| `prov:put:{notice\|full}`          | Resource replaced.                                                                                                |
| `prov:delete`                      | Resource deleted and removed from the feed. No payload and no qualifier; no separate `feed:remove` SHALL be sent. |
| `prov:activate`, `prov:deactivate` | The account is ready for use, or disabled. The exact meaning SHOULD be agreed by the publisher and receiver.      |

`full` events MUST carry `data`; `notice` events carry `attributes` (§2.4).

## Asynchronous requests (§2.5.1, §3)

1. **Request.** The client sends a normal POST, PUT, PATCH or DELETE with `Prefer: respond-async` (RFC 7240). The service provider SHOULD support the `wait` preference.
2. **Response.** The service provider returns either the normal response or `202 Accepted` with:
   - no body;
   - `Set-Txn: <value>`, which MUST match the later SET's `txn`;
   - `Preference-Applied`;
   - `Location` pointing either to the completion SET or to the normal resource location.
3. **Completion.** A `misc:asyncresp` event signals completion. Its payload is the same as one Bulk response operation (RFC 7644 §3.7.3). On error, it MUST include `response` with the SCIM Error body.
4. **Bulk.** For an asynchronous Bulk request, one completion event MUST be sent per operation, with `txn` set to `<Set-Txn value>:<zero-based index>` in the original order. `bulkId` MUST NOT be used for this.

```http
HTTP/1.1 202 Accepted
Set-Txn: 734f0614e3274f288f93ac74119dcf78
Preference-Applied: respond-async
Location: https://scim.example.com/Events/734f0614e3274f288f93ac74119dcf78
```

`Set-Txn` MUST be used whenever `202` is returned with no body. Intermediaries SHOULD NOT change it (§3).

## Discovery (§4)

`/ServiceProviderConfig` MAY carry `securityEvents` with:

- **`asyncRequest`.** `none`, `long` (the server goes asynchronous at its own discretion) or `request` (when the client asks).
- **`eventUris`.** The event URIs the service provider can deliver.

## Security (§5)

- **TLS.** SETs with personal data MUST be protected in transit with TLS.
- **Persistence.** Receivers MUST persist events before acknowledging them.
- **Recovery and forwarding.** Access to event recovery and forwarding MUST be limited to the parties that need it.
- **Signatures.** When the publisher does not talk to the receiver directly, receivers MUST verify the SET's JWS signature.
- **Large groups.** Prefer PATCH, or `put:notice` and `patch:notice` with later GETs, over full PUT payloads.
- **Async result endpoint.** It MUST be protected with authorization.
