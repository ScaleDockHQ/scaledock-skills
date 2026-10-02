# Trust marks

Source: OpenID Federation 1.1 (Federation) § 7, § 8.4 to § 8.6, § 17.5. Federation 1.0 contains the same rules.

## What a trust mark is (Federation § 7)

- A trust mark is a signed JWT stating that an entity conforms to a set of requirements set by an accreditation authority. Entity Configurations carry trust marks in `trust_marks`.
- A Trust Mark Issuer signs it with one of its Federation Entity Keys, and every Trust Mark Issuer MUST be an entity in the federation. A federation MAY allow self-signed trust marks.
- The Trust Anchor's `trust_mark_issuers` claim says which issuers the federation accepts for each trust mark type.
- The header MUST include `kid`. `typ` MUST be `trust-mark+jwt`, unless the trust framework defines a more specific type. A trust mark without `typ`, or with an unrecognized value, MUST be rejected.

## Claims (Federation § 7.1)

| Claim             | Rule                                                                                                                                               |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `iss`             | REQUIRED. The issuer's Entity Identifier.                                                                                                          |
| `sub`             | REQUIRED. The Entity Identifier the trust mark applies to.                                                                                         |
| `trust_mark_type` | REQUIRED. MUST be collision-resistant across federations. Building it from a URL that identifies the federation or trust framework is RECOMMENDED. |
| `iat`             | REQUIRED.                                                                                                                                          |
| `exp`             | OPTIONAL. If absent, the trust mark does not expire.                                                                                               |
| `logo_uri`        | OPTIONAL. MUST point to a valid image.                                                                                                             |
| `ref`             | OPTIONAL. A URL with human-readable information about the issuance.                                                                                |
| `delegation`      | OPTIONAL. A trust mark delegation JWT from the trust mark owner.                                                                                   |

## Delegation (Federation § 7.2)

When the owner of a trust mark type is not its issuer, the owner signs a delegation JWT (`typ: trust-mark-delegation+jwt`) for the issuer. The Trust Anchor lists owners and their keys in `trust_mark_owners`.

To validate a delegation (Federation § 7.2.2), all of these MUST hold:

1. It is a signed JWT with `typ: trust-mark-delegation+jwt`, and its `alg` is acceptable and not `none`.
2. `sub` is the Trust Mark Issuer and `iss` is the Trust Mark Owner.
3. The current time is after `iat` and, if `exp` is present, before `exp`.
4. Its `trust_mark_type` equals the trust mark's `trust_mark_type`.
5. The signature validates with the owner's key identified by `kid`, from `trust_mark_owners` in the Trust Anchor's Entity Configuration.

## Validating a trust mark (Federation § 7.3)

First establish trust in the Trust Mark Issuer by resolving its trust chain (see [`trust-chains.md`](trust-chains.md)). If the issuer is not trusted, its trust marks are not trusted. The Trust Anchor below is the one used for that chain. Then all of these MUST hold:

1. It is a signed JWT with `typ: trust-mark+jwt`, and its `alg` is acceptable and not `none`.
2. `sub` equals the Entity Identifier of the entity whose Entity Configuration contains it.
3. The current time is after `iat` and before `exp`, with a small leeway.
4. The signature validates with the issuer's key identified by `kid`.
5. If the Trust Anchor's `trust_mark_owners` lists this `trust_mark_type`, the trust mark MUST contain a `delegation`, which is validated as above.

If any check fails, the trust mark is invalid.

- Trust marks without `exp` RECOMMEND a way to check them, such as the Trust Mark Status or Trust Marked Entities Listing endpoints.
- Instead of the steps above, an implementation MAY ask the Trust Mark Status endpoint whether the trust mark is valid and active.

## Which trust marks to use (Federation § 17.5)

- Syntax checks happen during Entity Statement validation (Federation § 3.2). Trust checks follow § 7.3.
- A federation MAY have a policy that only some trust marks are used. For example, the type must be in the Trust Anchor's `trust_mark_issuers` and the trust mark's `iss` must be in its list. An empty list means anyone may issue it.
- An entity MAY also use trust marks that the federation does not recognize, when an out-of-band mechanism establishes the accreditation authority.

## Trust mark endpoints

### Status (Federation § 8.4)

- Queries go to the Trust Mark Issuer's `federation_trust_mark_status_endpoint`, which MUST be published in its Entity Configuration.
- Request: HTTP POST with an `application/x-www-form-urlencoded` body containing `trust_mark`.
- Response: HTTP 200, `application/trust-mark-status-response+jwt`. It is a signed JWT with `typ: trust-mark-status-response+jwt`, which MUST be checked, and with `kid`.
- Claims: `iss`, `iat`, `trust_mark`, and `status`, which is `active`, `expired`, `revoked` or `invalid`. Additional status values MAY be defined.

```http
POST /federation_trust_mark_status_endpoint HTTP/1.1
Host: op.example.org
Content-Type: application/x-www-form-urlencoded

trust_mark=eyJ0eXAiOiJ0cnVzdC1tYXJrK2p3dCIs...
```

### Trust Marked Entities Listing (Federation § 8.5)

- Request: GET with `trust_mark_type` (REQUIRED) and `sub` (OPTIONAL).
- Response: HTTP 200, `application/json`, an array of Entity Identifiers that hold a valid trust mark of that type.

### Issuance (Federation § 8.6)

- Request: GET with `trust_mark_type` and `sub`, both REQUIRED.
- Response: HTTP 200, `application/trust-mark+jwt`. If the entity does not have that trust mark, the response is an error with HTTP 404.
- With client authentication, the endpoint MAY let an authenticated entity fetch another entity's trust mark.
