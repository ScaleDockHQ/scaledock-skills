# SCIM schema (RFC 7643)

Load this when modelling SCIM resources or reviewing a schema. All section numbers are RFC 7643 unless stated.

## Roles and terms (§1.2)

- **Service provider**: an HTTP application that provides identity information through SCIM.
- **Client**: an application that uses SCIM to manage identity data at the service provider and initiates the requests.
- **Provisioning domain**: the administrative domain of the client, external to the service provider. `externalId` belongs to it.
- **Resource type**: the name, endpoint, schemas and metadata for a kind of resource, such as `User` or `Group`.

## Attributes (§2.1, §2.2)

- **Names.** Attribute names are case insensitive and match `ATTRNAME = ALPHA *(nameChar)`, where `nameChar = "$" / "-" / "_" / DIGIT / ALPHA`.
- **Defaults.** Unless the schema says otherwise, an attribute has these characteristics:

| Characteristic | Default     | Other values (§7)                                                             |
| -------------- | ----------- | ----------------------------------------------------------------------------- |
| `required`     | `false`     | `true`                                                                        |
| `caseExact`    | `false`     | `true`                                                                        |
| `mutability`   | `readWrite` | `readOnly`, `immutable`, `writeOnly`                                          |
| `returned`     | `default`   | `always`, `never`, `request`                                                  |
| `uniqueness`   | `none`      | `server`, `global`                                                            |
| `type`         | `string`    | `boolean`, `decimal`, `integer`, `dateTime`, `binary`, `reference`, `complex` |

- **Mutability (§7).** `readOnly` SHALL NOT be modified. `immutable` MAY be set at creation or replacement and SHALL NOT be updated after that. `writeOnly` values SHALL NOT be returned.
- **Returned (§7).** `always` is returned regardless of `attributes`. `never` is never returned. `default` is returned unless `attributes` narrows the set. `request` is returned only when named in `attributes`, or after a write that specified it.
- **Uniqueness (§7).** `server` SHOULD be unique within the endpoint or tenancy. `global` SHOULD be unique everywhere. A server MAY reject a duplicate with 400, but RFC 7644 §3.3 requires 409 `uniqueness` on create.
- **caseExact (§7).** It drives filter comparison. For case-exact attributes the server SHALL preserve the submitted case.

## Data types (§2.3)

- **New types.** Extensions SHOULD NOT introduce new data types (§2.3).
- **Integer.** MUST NOT contain fractional or exponent parts (§2.3.4).
- **DateTime.** MUST be a valid `xsd:dateTime` with both date and time, for example `2008-01-23T04:56:22Z` (§2.3.5).
- **Binary.** MUST be base64 encoded; base64url only when the attribute definition says so (§2.3.6).
- **Reference.** A reference is an absolute or relative URI, is case exact, and MUST be HTTP-addressable. Relative URIs resolve against the base URI up to, but not including, the endpoint (§2.3.7).

## Multi-valued attributes (§2.4, §2.5)

- **Default sub-attributes.** `type`, `primary`, `display`, `value` and `$ref`.
- **`primary`.** `primary: true` MUST appear at most once and defaults to `false`.
- **Duplicates.** Service providers SHOULD NOT return the same (`type`, `value`) pair twice.
- **`$ref`.** Versioned and unversioned URIs compare equal: `https://example.com/Users/12345` equals `https://example.com/v2/Users/12345`.
- **Unassigned values.** Unassigned, `null` and an empty array are equivalent. Setting `null` or `[]` makes an attribute unassigned (§2.5).

## Resources and common attributes (§3, §3.1)

- **`schemas`.** A resource's `schemas` is a non-empty array of URIs. It MUST contain only the `schema` and `schemaExtensions` of its resource type, with no duplicates, and order MUST NOT matter (§3).
- **Extension attributes.** These sit inside a JSON object named by the extension URI (§3.3).

| Attribute    | Rules                                                                                                                                                                                                                                                                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`         | Assigned by the service provider. Non-empty, unique across the whole service provider, stable, never reassigned. MUST NOT be specified by the client. `bulkId` is reserved and MUST NOT appear in an identifier. `caseExact`, `readOnly`, returned `always`.                             |
| `externalId` | Assigned by the provisioning client. The service provider MUST NOT set it and MUST interpret it as scoped to the provisioning domain. `caseExact`, `readWrite`, OPTIONAL.                                                                                                                |
| `meta`       | All sub-attributes `readOnly`, set by the service provider, and ignored when a client sends them: `resourceType`, `created`, `lastModified` (equal to `created` until first modified), `location` (equal to `Content-Location`), `version` (equal to the ETag, prefixed `W/` when weak). |

## User (§4.1)

Schema URI `urn:ietf:params:scim:schemas:core:2.0:User`.

- **`userName`.** REQUIRED, non-empty, unique across all Users of the service provider, case insensitive.
- **Other singular attributes.** `name` (with `formatted`, `familyName`, `givenName`, `middleName`, `honorificPrefix` and `honorificSuffix`), `displayName`, `nickName`, `profileUrl`, `title`, `userType`, `preferredLanguage`, `locale`, `timezone`, `active` and `password`.
- **`active`.** The administrative status. Its exact meaning is set by the service provider; typically `false` means the account is suspended.
- **`password`.** `writeOnly` and returned `never`. The service provider SHOULD hash it. A value passed to another system MUST go over a secured connection, and a value persisted temporarily MUST be protected.
- **Multi-valued attributes (§4.1.2).** `emails`, `phoneNumbers`, `ims`, `photos`, `addresses`, `groups`, `entitlements`, `roles` and `x509Certificates`.
- **`groups`.** `readOnly`. Membership changes MUST be made through the Group resource.

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "userName": "bjensen@example.com",
  "externalId": "701984",
  "name": { "givenName": "Barbara", "familyName": "Jensen" },
  "emails": [
    { "value": "bjensen@example.com", "type": "work", "primary": true }
  ],
  "active": true
}
```

## Group (§4.2)

- **Schema URI.** `urn:ietf:params:scim:schemas:core:2.0:Group`.
- **`displayName`.** REQUIRED.
- **`members`.** Values MAY be added or removed, but the sub-attributes of a member are `immutable`. `value` is the member's `id`, `$ref` is its URI, and a member can be a User or a Group (nested groups).
- **Meaning.** The semantics of membership are defined by the service provider.

## Enterprise User extension (§4.3)

- **Schema URI.** `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`.
- **Attributes.** `employeeNumber`, `costCenter`, `organization`, `division`, `department`, and `manager` (with `value`, `$ref`, and a `readOnly` `displayName`).

```json
{
  "schemas": [
    "urn:ietf:params:scim:schemas:core:2.0:User",
    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
  ],
  "userName": "bjensen@example.com",
  "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
    "employeeNumber": "701984",
    "manager": { "value": "26118915-6090-4610-87e4-49d8ca9f808d" }
  }
}
```

## Schema definitions (§7)

- **Schema resources.** `Schema` resources use `urn:ietf:params:scim:schemas:core:2.0:Schema`. They are read-only, and their `id` is the schema URI.
- **Attribute definitions.** Each entry in `attributes` has `name`, `type`, `subAttributes` (for `complex`), `multiValued`, `description`, `required`, `canonicalValues`, `caseExact`, `mutability`, `returned`, `uniqueness` and `referenceTypes`.
- **`referenceTypes`.** A resource type name, `external`, or `uri`.

## Privacy (§9.3)

- **Everything is sensitive.** All SCIM attributes are treated as sensitive personal information.
- **Least data.** Clients send only what the service provider needs, and service providers accept only what they need.
- **Identifier correlation.** Where possible, bind identifiers to tenants or clients so separate domains cannot correlate them, and restrict `externalId` access to the domain that set it.
