# SCIM interoperability profiles

Load this when the integration must meet the IPSIE Account Lifecycle levels or the FastFed Enterprise SCIM profile. Both are drafts with posture `track`: build to RFC 7643 and RFC 7644 first, and treat each profile rule as a requirement only when a party commits to that profile. Both profiles make the identity provider the SCIM client and the application the SCIM service provider.

## IPSIE AL SCIM 2.0 Profile, Draft 00

Pinned at the editor's copy of 2026-09-08 (commit 1a9985f). The document header calls it `draft-openid-ipsie-al-scim-profile-latest` and it is not yet listed on openid.net, so expect changes. It defines three cumulative levels: AL1 (User Deprovisioning), AL2 (User and Group Management) and AL3 (Role Management, not yet defined). Sections are cited by heading name.

### Shared prerequisites (Shared Prerequisites)

- **OAuth 2.0 for every request.** Both parties MUST use OAuth 2.0 for authentication and authorization of all SCIM requests.
- **Token request.** Use the `client_credentials` grant with RFC 7523 §2.2 JWT client authentication. The identity provider then sends `Authorization: Bearer` on every SCIM request.
- **Scope.** The access token MUST include the `scim` scope and grant nothing broader.
- **Metadata.** Both parties MUST publish RFC 8414 authorization server metadata. The application's metadata MUST include `token_endpoint`; the identity provider's MUST include `jwks_uri` so the application can verify its JWTs.
- **Interoperability.** Implementations MUST also conform to the SCIM 2.0 Interoperability Profile (`draft-zollner-scim-interop-profile`), which this skill does not cover.
- **No local changes.** Local modifications to Users or Groups in the application are prohibited.
- **Rate limits.** The application MUST enforce rate limits and answer `429` with `Retry-After`. It MUST support at least 25 SCIM requests per second, per tenant for multi-tenant applications.
- **Bulk and PATCH.** Both parties MUST support `/Bulk`. The application MUST support PATCH with multiple attributes. The identity provider SHOULD batch changes and SHOULD use `/Bulk` above 100 resources in 5 minutes.

### AL1: User Deprovisioning

- **Deactivation.** Deactivation and reactivation use `PATCH /Users/{id}`, typically on `active`.
  - The identity provider SHOULD propagate deactivation within 5 minutes.
  - The application SHOULD revoke access, including active sessions, within 5 minutes.
  - All access mechanisms MUST be deactivated: web sessions, API tokens, refresh tokens, personal access tokens, SSH keys and device credentials.
  - Reactivation MUST be allowed.
- **Deletion.** Deletion via `DELETE /Users/{id}` is MAY in the AL1 section, while the Compliance Statement says the application SHALL support it. After deletion, a new user with the same username MUST be allowed.
- **Get by id.** `GET /Users/{id}` MUST be supported.
- **Filters.** These MUST be supported: `userName eq`, `externalId eq`, `emails[value eq …]` and `emails[type eq "work" and value eq …]`. The draft writes `username`; SCIM attribute names are case insensitive (RFC 7644 §3.4.2.2).

```http
PATCH /Users/2819c223-7f76-453a-919d-413861904646 HTTP/1.1
Host: app.example.com
Content-Type: application/scim+json
Authorization: Bearer <access token with scope scim>

{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"replace","path":"active","value":false}]}
```

### AL2: User and Group Management

- **Local accounts.** The application MUST accept creation and updates from the identity provider, MUST prohibit local creation of managed users, and MUST support mapping identity provider groups to application roles.
- **User schema.** It MUST include `userName`, `displayName` and `active`, and support `externalId`.
- **Credentials.** The application MUST NOT support `password`, and neither party may send credentials. The application MUST NOT define credential attributes in custom schemas.
- **User operations.** `POST /Users`, `PATCH /Users/{id}` and `GET /Users` MUST be supported. Pages SHOULD hold at most 1,000 users, and cursor pagination is RECOMMENDED.
- **Groups.** Group support is optional; if implemented:
  - The schema MUST include `displayName`, `members` and `externalId`. `displayName` SHOULD be unique.
  - Groups with zero members MUST be allowed.
  - The identity provider SHOULD list groups with `excludedAttributes=members`.
  - These filters MUST be supported: `displayName eq`, `externalId eq` and `members[value eq …]`.
  - PATCH MUST accept at least 50 member add or remove operations per request.

### Security and compliance (Security Considerations, Compliance Statement)

- **Error handling.** Errors SHALL use the SCIM error format without leaking internal details.
- **Replay resistance.** Access tokens SHALL expire, and nonces SHALL be validated.
- **Audit logging.** Every create, delete and modify SHALL be logged.
- **Rate limiting.** All endpoints SHALL enforce rate limits with `429`.
- **Compliance.** The application SHALL enforce RFC 7523 at AL1 and AL2.

### Known inconsistencies in this draft

- **Client authentication.** The draft requires RFC 7523 §2.2 JWT client authentication, which carries `client_assertion` in the request body. It also requires HTTP Basic in the `Authorization` header and prohibits credentials such as `client_assertion` in the body. These cannot all hold. Confirm the intended method with the counterparty.
- **Wrong citation.** The draft cites `/Bulk` as "RFC 7643 section 3.7"; Bulk is RFC 7644 §3.7.
- **DELETE.** It is MAY in the AL1 section and SHALL in the Compliance Statement.

## FastFed Enterprise SCIM Profile 1.0, draft 03

The FastFed working group is archived. Draft 03 (2020-10-07) is identical to the most recent Implementer's Draft (ID1). Sections are cited by number.

- **Roles (§2.1).** The identity provider is the SCIM client and pushes Users and Groups to the application.
- **Client authentication (§2.2, §3.2.1.1, §3.2.2.1, §5).** The client uses the RFC 7523 JWT authorization grant.
  - The identity provider shares a `jwks_uri` during the FastFed handshake.
  - The application returns `scim_service_uri`, `token_endpoint` and `scope`.
  - The identity provider posts `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer` with `assertion=<signed JWT>` and uses the access token as a bearer token.
  - On `401` it repeats the grant.
- **Profile URN (§3.1.1).** `urn:ietf:params:fastfed:1.0:provisioning:scim:2.0:enterprise`.
- **Application metadata (§3.1.2).**
  - Required user attributes are `externalId`, `userName` and `active`.
  - With groups, `displayName` and `externalId` are required and `members` is optional.
  - `can_support_nested_groups` defaults to false.
  - `max_group_membership_changes` is 100 to 1000, default 100.
- **No `groups` on User (§4.1).** A User resource MUST NOT include the `groups` attribute.
- **Users (§4.2).**
  - The application MUST support all user operations. The identity provider SHOULD replicate within 60 minutes.
  - Create: §4.2.1 says `PUT /Users` but its example is `POST /Users`; RFC 7644 §3.5.1 forbids creating with PUT, so use POST.
  - With multiple `emails`, `phoneNumbers` or `addresses`, one MUST be `primary`.
  - Update and deactivate with `PATCH /Users/{id}`. Deactivation SHOULD propagate within 5 minutes, and reactivation MUST be allowed (§4.2.3).
  - After `DELETE`, the same `userName` MUST be reusable (§4.2.4).
  - Filters `userName eq`, `externalId eq` and `emails[value eq …]` MUST be supported (§4.2.6).
- **Groups (§4.3).**
  - Before group provisioning, the identity provider MUST check `/ResourceTypes`.
  - `POST /Groups` without `members`, and member changes never in the same PATCH as other attributes.
  - Deactivate a group by removing all members (`op: remove`, `path: members`, no `value`), which the application MUST support.
  - Reads use `excludedAttributes=members`, and the `displayName eq` filter MUST be supported.
- **Membership PATCH (§4.3.7).**
  - `add` uses `path: members` with `value` entries.
  - `remove` uses `members` or `members[value eq "{id}"]` with no `value`.
  - Changes MUST NOT exceed `max_group_membership_changes`; a remove-all counts as one change and MUST come first.
  - No resource id may appear twice. Adding an existing member or removing a non-member MUST succeed idempotently.
- **Metadata endpoints (§4.4).** The application MUST host `/ResourceTypes` (including Users), `/ServiceProviderConfig` and `/Schemas`, with a schema for every desired attribute.
