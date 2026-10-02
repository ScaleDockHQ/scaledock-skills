# CAEP Interoperability Profile and SSF conformance tests

Two revisions matter:

| Revision                         | Status              | Date             | Builds on                                                             |
| -------------------------------- | ------------------- | ---------------- | --------------------------------------------------------------------- |
| ID1 (document labelled draft 00) | Implementer's Draft | 25 June 2024     | SSF and CAEP Implementer's Drafts (`spec_version` `1_0-ID2` or later) |
| draft 01                         | WG draft            | 1 September 2026 | SSF 1.0 and CAEP 1.0 Final (`spec_version` `1_0` or later)            |

Posture: build to ID1, and track draft 01. The OpenID SSF conformance tests already follow draft 01 (see the end of this file), so prefer its rules wherever they are compatible with ID1.

## Common requirements (ID1 §2; draft 01 §2)

**Transport (§2.1)**

- Transmitters offer TLS-protected endpoints and connect to other servers over TLS 1.2 or later.
- Receivers check the transmitter's certificate signature, chain, expiry and revocation status (RFC 6125).
- TLS guidance: RFC 7525 in ID1, RFC 9325 in draft 01.

**Transmitter metadata MUST include (§2.3):**

- `spec_version`: `1_0-ID2` or greater in ID1, `1_0` or greater in draft 01.
- `delivery_methods_supported`.
- `jwks_uri`, which resolves to the current signing keys.
- `configuration_endpoint`, supporting Create Stream with `POST`.
- `status_endpoint`:
  - ID1: `GET` and `POST`, supporting `enabled`, `paused` and `disabled`. Limits on held events for paused streams are documented offline.
  - draft 01: Read Stream Status with `GET`.
- `verification_endpoint`.
- `authorization_schemes`, containing `{ "spec_urn": "urn:ietf:rfc:6749" }`.

**Streams, transmitter side (§2.3.8)**

- Accept Create Stream with push (`urn:ietf:rfc:8935`) or poll (`urn:ietf:rfc:8936`).
- Every stream configuration includes `delivery` with one of the two.
- Support Create, Read Configuration, Read Status and Verification. Draft 01 also requires Delete Stream.

**Receivers (§2.4)**

- Delivery: ID1 receivers accept both push and poll. Draft 01 receivers accept at least one of them.
- Assume every subject is implicitly in the stream, without Add Subject calls.
- Draft 01 adds:
  - Receivers MUST get keys from `jwks_uri`.
  - Receivers MUST use OAuth 2.0 for management calls.
  - Receivers MUST be able to create, read, check status of, verify and delete streams. Create Stream either names push or poll, or omits `delivery` to mean poll.

**Subjects (§2.5)**

- Formats `email` and `iss_sub`, plus `opaque` for verification events only.
- Receivers accept all three.
- Transmitters can send at least one of `email` and `iss_sub`.

**Signatures (§2.6)**

- All events are signed with RS256 using keys of at least 2048 bits.
- This differs from FAPI 2.0, which does not allow RS256. Keep separate algorithm allowlists for SETs and for FAPI traffic.

**OAuth (ID1 §2.7; draft 01 §2.7)**

- The transmitter is the resource server and the receiver is the client.
- The AS issues short-lived tokens through the client credentials grant or the authorization code grant. Draft 01 defines short-lived as at most 60 minutes. ID1 gives `exp` no more than 60 minutes after `nbf` as an example.
- The transmitter:
  - Accepts tokens only in the `Authorization` header (RFC 6750 §2.1), never in the query.
  - Verifies validity, integrity, expiry, revocation and sufficiency.
  - Returns RFC 6750 §3.1 errors.
- Scopes:
  - ID1: use OAuth Protected Resource Metadata (RFC 9728) if the transmitter publishes it. Otherwise, `ssf.manage` covers management operations and `ssf.read` covers reads. The `ssf` prefix is reserved, and finer suffixes such as `ssf.manage.create` are allowed.
  - draft 01: `ssf.read` allows Read Stream Configuration and Get Stream Status. `ssf.manage` includes `ssf.read` plus Create Stream, Delete Stream and Verification. Scopes starting with `ssf.` are reserved for SSF specifications.

**SETs (§2.8)**: the `events` claim contains exactly one event.

## Use cases (§3)

Draft 01 requires at least one use case. ID1 lets an implementation support a subset.

| Use case                                 | Event                      | Requirements                                                                                                                              |
| ---------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Session revocation / logout (§3.1)       | `session-revoked`          | `reason_admin` is non-empty.                                                                                                              |
| Credential change (§3.2)                 | `credential-change`        | Receivers interpret every `change_type` and `credential_type` value. Transmitters fill `reason_admin`.                                    |
| Device compliance change (draft 01 §3.3) | `device-compliance-change` | Receivers interpret every `previous_status` and `current_status` value. Transmitters fill `reason_admin`.                                 |
| Risk level change (draft 01 §3.4)        | `risk-level-change`        | Receivers interpret every `principal` and level value, and treat a missing `previous_level` as unknown. Transmitters fill `reason_admin`. |

ID1 says `reason_admin` is a non-empty string, while CAEP 1.0 Final defines it as an object of language-tagged messages (CAEP §2). Draft 01 aligns with CAEP 1.0 and requires a non-empty object. Send an object such as `{ "en": "..." }`.

## OpenID SSF conformance tests (OpenID Shared Signals conformance testing page)

The page says the tests are an alpha release and may be incomplete.

The suite runs at `https://www.certification.openid.net`, and it uses the CAEP Interoperability Profile 1.0 working copy (draft 01) as its profile.

**Transmitter plan**

- "OpenID Shared Signals Framework 1.0 Final/CAEP Interop Profile: Transmitter", with variants `ssf_profile=caep_interop` and `delivery_methods=push` or `poll`. A transmitter that supports both runs the plan once per method.
- Certification only covers transmitters whose access tokens come from the OAuth client credentials grant.
- The suite emulates a receiver and tests metadata, stream management, verification and push or poll delivery.
- A "Transmitter metadata suffix" handles tenant paths: issuer `https://ssf.issuer.com` with suffix `/tenants/my-tenant-id` is looked up at `https://ssf.issuer.com/.well-known/ssf-configuration/tenants/my-tenant-id`.
- For push, the suite exposes `https://www.certification.openid.net/test/a/<alias>/ssf-push`.

**Receiver plan**

- "OpenID Shared Signals Framework 1.0 Final/CAEP Interop Profile: Receiver test". Variants:
  - `delivery_methods`: `push` or `poll`. Run each one separately.
  - `ssf_auth_mode`: `static` (a pre-shared bearer token) or `dynamic` (the suite emulates an AS issuing tokens by client credentials).
  - `client_auth_type`, used only in dynamic mode: `client_secret_basic`, `client_secret_post`, `client_secret_jwt` or `private_key_jwt`.
- The suite issues tokens scoped `ssf.read` and `ssf.manage` as each operation requires.
- It tests stream creation and deletion, receiver-initiated and transmitter-initiated verification, and handling of the supported events. Stream update and status operations are not exercised for the CAEP Interop profile.

## Checklist

- [ ] Metadata has every field the profile requires, including the RFC 6749 authorization scheme.
- [ ] Push and poll stream creation both work on the transmitter.
- [ ] Events are RS256-signed with keys of 2048 bits or more, and carry `email` or `iss_sub` subjects.
- [ ] Management tokens are short-lived, header-only, and scoped `ssf.read` or `ssf.manage`.
- [ ] Each supported use case fills `reason_admin` with a non-empty object.
- [ ] The conformance test plan for the role and delivery variant passes.
