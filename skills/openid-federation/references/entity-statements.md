# Entity Statements and Entity Configurations

Sources: OpenID Federation 1.1 (Federation), OpenID Federation for OpenID Connect 1.1 (Federation Connect). Federation 1.0 contains the same rules in one document.

## Terms (Federation § 1.2)

- **Entity Statement:** a signed JWT with the information an entity needs to take part in a federation.
- **Entity Configuration:** an Entity Statement an entity issues about itself, so `iss` equals `sub`.
- **Subordinate Statement:** an Entity Statement a Superior issues about an Immediate Subordinate.
- **Trust Anchor, Intermediate, Leaf:** the top, middle and bottom of a trust hierarchy. A Leaf has no Subordinates.
- **Resolved Metadata:** the subject's metadata after the chain's metadata policy is applied. This is what peers use.

## JOSE header (Federation § 3)

- `typ` MUST be `entity-statement+jwt`. A statement without `typ`, or with another value, MUST be rejected.
- The statement is a JWS signed with one of the issuer's Federation Entity Keys. Federations SHOULD specify mandatory-to-implement algorithms. Statements in one chain can use different algorithms.
- `kid` MUST be present and identify the signing key.
- Entity Configurations and Subordinate Statements MUST NOT carry the `trust_chain` or `peer_trust_chain` header parameters (Federation § 4.3, § 4.4).

## Claims

### In both kinds of statement (Federation § 3.1.1)

| Claim      | Rule                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `iss`      | REQUIRED. The issuer's Entity Identifier.                                                                                                                                                                                                                                                                                                                                                 |
| `sub`      | REQUIRED. The subject's Entity Identifier.                                                                                                                                                                                                                                                                                                                                                |
| `iat`      | REQUIRED. Issue time.                                                                                                                                                                                                                                                                                                                                                                     |
| `exp`      | REQUIRED. After this time the statement MUST NOT be accepted.                                                                                                                                                                                                                                                                                                                             |
| `jwks`     | REQUIRED in Subordinate Statements, in Trust Anchor and Intermediate Entity Configurations, and in Leaf Entity Configurations unless a profile allows it to be absent. Holds the subject's Federation Entity public keys. Every `kid` is unique, and the SHA-256 JWK Thumbprint is RECOMMENDED as `kid`. These keys SHOULD NOT be used in other protocols.                                |
| `metadata` | OPTIONAL. An object keyed by Entity Type Identifier. An Entity Configuration MUST include a member for each Entity Type the entity has, even if its value is `{}`. In a Subordinate Statement, it applies only to the subject and only to Entity Types present in the subject's Entity Configuration. It overrides parameters with the same name and is applied before `metadata_policy`. |
| `crit`     | OPTIONAL. Names of extension claims that MUST be understood and processed. Claims defined by Federation MUST NOT be listed.                                                                                                                                                                                                                                                               |

Metadata values MUST NOT be `null` (Federation § 5).

### Only in Entity Configurations (Federation § 3.1.2)

| Claim                | Rule                                                                                                                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authority_hints`    | REQUIRED for entities with a Superior, such as Leaves and Intermediates. Lists the Immediate Superiors' Entity Identifiers and MUST NOT be `[]`. MUST NOT appear in a Trust Anchor without Superiors. |
| `trust_anchor_hints` | OPTIONAL. Trust Anchors the entity trusts. MUST NOT be `[]`. MUST NOT appear in a Trust Anchor without Superiors.                                                                                     |
| `trust_marks`        | OPTIONAL. An array of `{trust_mark_type, trust_mark}` objects. `trust_mark_type` MUST equal the `trust_mark_type` claim inside the trust mark JWT.                                                    |
| `trust_mark_issuers` | OPTIONAL, Trust Anchor only, ignored elsewhere. Maps each trust mark type to the issuers the federation accepts for it. An empty array means anyone MAY issue it.                                     |
| `trust_mark_owners`  | OPTIONAL, Trust Anchor only, ignored elsewhere. Maps each trust mark type to `{sub, jwks}` of its owner. A Federation Operator who knows the owner differs from the issuer MUST express it here.      |

### Only in Subordinate Statements (Federation § 3.1.3)

| Claim                  | Rule                                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `constraints`          | OPTIONAL. Applies to the subject and all its Subordinates. See [`trust-chains.md`](trust-chains.md).                                                          |
| `metadata_policy`      | OPTIONAL. Applies to the subject and all its Subordinates. See [`metadata-policy.md`](metadata-policy.md).                                                    |
| `metadata_policy_crit` | OPTIONAL. Non-standard operators that MUST be understood. MUST NOT be `[]`. If any listed operator is not supported, the statement and its chain are invalid. |
| `source_endpoint`      | OPTIONAL. The fetch endpoint URL that issued the statement, so it can be refreshed without fetching the issuer's Entity Configuration first.                  |

## Validation (Federation § 3.2)

An Entity Statement MUST pass all of these. The order can change if the result is the same.

1. It is a signed JWT with `typ: entity-statement+jwt`, and its `alg` is acceptable and not `none`.
2. `sub` equals the Entity Identifier the statement is about, and `iss` is a valid Entity Identifier.
3. If `iss` differs from `sub`, it is a Subordinate Statement, and `iss` MUST be one of the subject's `authority_hints`.
4. The current time is after `iat` and before `exp`, with a small leeway for clock skew.
5. `jwks` is present and is a valid JWK Set.
6. The issuer's Entity Configuration is obtained, from the chain or the well-known URL. `kid` is a non-empty string that exactly matches a key in its `jwks`, and the signature validates with that key.
7. Every claim in `crit` is understood.
8. Claims are in the right kind of statement: `authority_hints`, `trust_anchor_hints`, `trust_marks`, `trust_mark_issuers` and `trust_mark_owners` only in Entity Configurations, and `metadata_policy`, `metadata_policy_crit`, `constraints` and `source_endpoint` only in Subordinate Statements. Each is syntactically valid.
9. `metadata` has no `null` values.
10. A `trust_chain` header, if present, is a syntactically valid chain whose first entry is this entity's Entity Configuration. The Trust Anchor at its end SHOULD be one of the deployment's Trust Anchors. The same applies to `peer_trust_chain`, without the first-entry rule.

If any step fails, the statement MUST be rejected. Checking trust marks for trust is a separate step (Federation § 7.3).

## The well-known URL (Federation § 9)

- Trust Anchors and Intermediates MUST publish their Entity Configuration at their configuration endpoint. Leaves SHOULD.
- The URL is the Entity Identifier with any trailing `/` removed, plus `/.well-known/openid-federation`. For `https://entity.example`, it is `https://entity.example/.well-known/openid-federation`.
- Any Entity Configuration that includes the `federation_entity` Entity Type MUST be published there.
- A Leaf that gives its Entity Configuration to the server during registration, as with Explicit Registration, MAY skip publishing it.
- A successful response is HTTP 200 with `application/entity-statement+jwt`. Intermediates and Trust Anchors MUST include `federation_entity` metadata (Federation § 9.2). Errors use the format in [`endpoints.md`](endpoints.md).

```ts
function entityConfigurationUrl(entityId: string): string {
  const u = new URL(entityId);
  if (u.protocol !== "https:" || u.search || u.hash)
    throw new Error("invalid Entity Identifier");
  return entityId.replace(/\/$/, "") + "/.well-known/openid-federation";
}
```

## federation_entity metadata (Federation § 5.1.1)

| Parameter                                    | Rule                                                              |
| -------------------------------------------- | ----------------------------------------------------------------- |
| `federation_fetch_endpoint`                  | Intermediates and Trust Anchors MUST publish it. Leaves MUST NOT. |
| `federation_list_endpoint`                   | Intermediates and Trust Anchors MUST publish it. Leaves MUST NOT. |
| `federation_resolve_endpoint`                | Any Federation Entity MAY publish it.                             |
| `federation_trust_mark_status_endpoint`      | Trust Mark Issuers SHOULD publish it.                             |
| `federation_trust_mark_list_endpoint`        | OPTIONAL.                                                         |
| `federation_trust_mark_endpoint`             | OPTIONAL.                                                         |
| `federation_historical_keys_endpoint`        | OPTIONAL.                                                         |
| `endpoint_auth_signing_alg_values_supported` | OPTIONAL. MUST NOT contain `none`.                                |

Every endpoint URL MUST use `https` and MUST NOT have a fragment. Entities that use any of these parameters MUST use the `federation_entity` Entity Type.

When an Entity Configuration uses more than one of `jwks`, `jwks_uri` and `signed_jwks_uri` in protocol metadata, the key sets SHOULD be the same and MUST be made consistent in a timely manner. Using only one is RECOMMENDED (Federation § 5.2.1.1).

## Entity Types for OpenID Connect and OAuth 2.0 (Federation Connect § 5.1)

| Entity Type Identifier       | Metadata                                                           | Federation-specific parameters                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openid_relying_party`       | Dynamic Client Registration § 2 parameters and RP Metadata Choices | `client_registration_types` (RECOMMENDED): `automatic`, `explicit`                                                                                                                    |
| `openid_provider`            | Discovery § 3 parameters                                           | `issuer` MUST match the Entity Identifier. `client_registration_types_supported` (RECOMMENDED). `federation_registration_endpoint`, REQUIRED when Explicit Registration is supported. |
| `oauth_authorization_server` | OAuth 2.0 authorization server metadata                            |                                                                                                                                                                                       |
| `oauth_client`               | OAuth 2.0 client metadata                                          |                                                                                                                                                                                       |
| `oauth_resource`             | OAuth 2.0 protected resource metadata                              |                                                                                                                                                                                       |

## Media types (Federation § 15, Federation Connect § 15)

| Media type                                       | Used for                                                                   |
| ------------------------------------------------ | -------------------------------------------------------------------------- |
| `application/entity-statement+jwt`               | Entity Configurations and Subordinate Statements                           |
| `application/trust-mark+jwt`                     | Trust marks                                                                |
| `application/resolve-response+jwt`               | Resolve responses                                                          |
| `application/trust-chain+json`                   | A chain as a JSON array, for example an Explicit Registration request body |
| `application/trust-mark-delegation+jwt`          | Trust mark delegations                                                     |
| `application/jwk-set+jwt`                        | Signed historical keys                                                     |
| `application/trust-mark-status-response+jwt`     | Trust mark status responses                                                |
| `application/explicit-registration-response+jwt` | Explicit Registration responses (Federation Connect)                       |
