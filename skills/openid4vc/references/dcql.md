# DCQL: the Digital Credentials Query Language

DCQL is defined in OpenID4VP 1.0 §6 and §7. The verifier sends it as `dcql_query`, or as a `scope` that stands for a DCQL query, never both. The wallet evaluates it against the credentials it holds. Implementations ignore unknown properties (§6).

## Structure

| Level                   | Property                               | Rule                                                                                            |
| ----------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Top                     | `credentials`                          | REQUIRED. A non-empty array of credential queries.                                              |
| Top                     | `credential_sets`                      | OPTIONAL. A non-empty array of credential set queries.                                          |
| Credential query (§6.1) | `id`                                   | REQUIRED. Letters, digits, `_` or `-`. Unique in the request. It becomes the key in `vp_token`. |
|                         | `format`                               | REQUIRED. A format identifier from Appendix B.                                                  |
|                         | `meta`                                 | REQUIRED, but may be `{}`. Format-specific: `vct_values`, `doctype_value` or `type_values`.     |
|                         | `multiple`                             | OPTIONAL. Default `false`.                                                                      |
|                         | `trusted_authorities`                  | OPTIONAL. See below.                                                                            |
|                         | `require_cryptographic_holder_binding` | OPTIONAL. Default `true`.                                                                       |
|                         | `claims`                               | OPTIONAL. A non-empty array of claims queries. Do not point to the same claim twice.            |
|                         | `claim_sets`                           | OPTIONAL. Arrays of claim `id`s. Allowed only with `claims`.                                    |
| Claims query (§6.3)     | `id`                                   | REQUIRED when `claim_sets` is present.                                                          |
|                         | `path`                                 | REQUIRED. A claims path pointer (§7).                                                           |
|                         | `values`                               | OPTIONAL. Strings, integers or booleans that the claim must match exactly.                      |
| Credential set (§6.2)   | `options`                              | REQUIRED. Each option is a non-empty array of credential query ids.                             |
|                         | `required`                             | OPTIONAL. Default `true`.                                                                       |

### Trusted authorities (§6.1.1)

Each entry is `{ "type": ..., "values": [...] }`. Returned credentials SHOULD match at least one entry. The verifier still checks issuer trust itself; this feature mainly avoids revealing credentials that would be rejected.

| `type`              | Value                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| `aki`               | The base64url KeyIdentifier of an AuthorityKeyIdentifier (RFC 5280) in the credential's X.509 chain. |
| `etsi_tl`           | An ETSI TS 119 612 Trusted List identifier.                                                          |
| `openid_federation` | An Entity Identifier, usually a trust anchor.                                                        |

## Claims path pointers (§7)

A claims path pointer is a non-empty array.

- **JSON credentials** (SD-JWT VC, W3C VCDM):
  - A string selects an object key.
  - `null` selects every element of an array.
  - A non-negative integer selects one array index.
  - Processing fails if the selection becomes empty or a component meets the wrong type.
- **mdoc**: exactly two strings, `[namespace, data element identifier]`.

| Pointer                               | Selects                               |
| ------------------------------------- | ------------------------------------- |
| `["address", "street_address"]`       | A nested claim.                       |
| `["degrees", null, "type"]`           | `type` in every element of `degrees`. |
| `["nationalities", 1]`                | The second element.                   |
| `["org.iso.18013.5.1", "given_name"]` | An mdoc data element.                 |

## Selection rules (§6.4)

**Claims within one credential (§6.4.1):**

- If `claims` is absent, the wallet returns only the claims that are mandatory to present. For formats without selective disclosure, that is the full credential.
- If `claims` is present without `claim_sets`, all listed claims are requested.
- If `claim_sets` is present, one combination is requested. The order states the verifier's preference, and the wallet SHOULD return the first option it can satisfy. If none can be met, the wallet returns no claims.
- Put the least revealing option first, for example `age_over_18` before `birth_date`.
- If the wallet cannot deliver all requested claims for a credential, it does not return that credential.
- `values` is best effort, because the wallet may not see a value before consent. Verifiers MUST NOT rely on it for security.

**Credentials (§6.4.2):**

- Without `credential_sets`, every credential query is requested.
- With `credential_sets`, the wallet satisfies every set whose `required` is true or omitted, and optionally the others. One option fully satisfies a set.
- Credentials that do not match their query are treated as absent.
- If the wallet cannot deliver all non-optional credentials, it returns none.

The verifier MUST still check every returned credential and presentation itself (§14.9).

## Examples

An SD-JWT VC with three claims (§7.4):

```json
{
  "credentials": [
    {
      "id": "my_credential",
      "format": "dc+sd-jwt",
      "meta": {
        "vct_values": ["https://credentials.example.com/identity_credential"]
      },
      "claims": [
        { "path": ["last_name"] },
        { "path": ["first_name"] },
        { "path": ["address", "street_address"] }
      ]
    }
  ]
}
```

An mdoc (Appendix D):

```json
{
  "credentials": [
    {
      "id": "my_credential",
      "format": "mso_mdoc",
      "meta": { "doctype_value": "org.iso.7367.1.mVRC" },
      "claims": [
        { "path": ["org.iso.7367.1", "vehicle_holder"] },
        { "path": ["org.iso.18013.5.1", "first_name"] }
      ]
    }
  ]
}
```

Alternatives with `claim_sets`: `last_name` and `date_of_birth`, plus either `postal_code` or both `locality` and `region` (Appendix D):

```json
{
  "credentials": [
    {
      "id": "pid",
      "format": "dc+sd-jwt",
      "meta": {
        "vct_values": ["https://credentials.example.com/identity_credential"]
      },
      "claims": [
        { "id": "a", "path": ["last_name"] },
        { "id": "b", "path": ["postal_code"] },
        { "id": "c", "path": ["locality"] },
        { "id": "d", "path": ["region"] },
        { "id": "e", "path": ["date_of_birth"] }
      ],
      "claim_sets": [
        ["a", "c", "d", "e"],
        ["a", "b", "e"]
      ]
    }
  ]
}
```

Alternatives across credentials with `credential_sets`. The ID part may come from an mDL or a photo ID, and the address part is optional (Appendix D, shortened):

```json
{
  "credentials": [
    {
      "id": "mdl-id",
      "format": "mso_mdoc",
      "meta": { "doctype_value": "org.iso.18013.5.1.mDL" },
      "claims": [
        { "path": ["org.iso.18013.5.1", "given_name"] },
        { "path": ["org.iso.18013.5.1", "family_name"] }
      ]
    },
    {
      "id": "photo_card-id",
      "format": "mso_mdoc",
      "meta": { "doctype_value": "org.iso.23220.photoid.1" },
      "claims": [
        { "path": ["org.iso.18013.5.1", "given_name"] },
        { "path": ["org.iso.18013.5.1", "family_name"] }
      ]
    },
    {
      "id": "mdl-address",
      "format": "mso_mdoc",
      "meta": { "doctype_value": "org.iso.18013.5.1.mDL" },
      "claims": [{ "path": ["org.iso.18013.5.1", "resident_address"] }]
    },
    {
      "id": "photo_card-address",
      "format": "mso_mdoc",
      "meta": { "doctype_value": "org.iso.23220.photoid.1" },
      "claims": [{ "path": ["org.iso.18013.5.1", "resident_address"] }]
    }
  ],
  "credential_sets": [
    { "options": [["mdl-id"], ["photo_card-id"]] },
    { "required": false, "options": [["mdl-address"], ["photo_card-address"]] }
  ]
}
```

## Checklist

- [ ] Every credential query has a unique `id`, a `format` and a `meta` with the format's required member.
- [ ] Claims are requested by the narrowest path, and `claim_sets` lists the least revealing option first.
- [ ] `require_cryptographic_holder_binding: false` appears only where replay is an accepted risk, and then `state` is used (§5.3).
- [ ] Optional data sits in a `credential_sets` entry with `required: false`.
- [ ] The verifier re-checks every constraint on what it receives.
