# Access rights and RAR

GNAP describes what a token allows with an `access` array (RFC 9635 § 8). It is deliberately analogous to the `authorization_details` structure of OAuth 2.0 Rich Authorization Requests (RFC 9396), so API designers can describe rights once and use them in both protocols.

## The `access` array (RFC 9635 § 8)

- The root is a JSON array. Each element is either an object or a string, and the token's access is the union of all elements.
- An object MUST have `type` (REQUIRED). The type decides which other fields are allowed, and different types are not expected to interoperate.
- The AS controls type values. It compares them by exact byte match, with no collation or normalization, and MUST ensure types do not collide. Use URIs for general-purpose APIs.
- Common fields, each optional and defined per type:

| Field        | Meaning                                                           |
| ------------ | ----------------------------------------------------------------- |
| `actions`    | Array of actions, such as `read` or `write`.                      |
| `locations`  | Array of resource server locations, usually URIs.                 |
| `datatypes`  | Array of kinds of data, such as `metadata` or `images`.           |
| `identifier` | A string naming one specific resource, such as an account number. |
| `privileges` | Array of privilege levels, such as `admin`.                       |

- Within one object, access is the cross product of the fields: every listed action at every listed location for every listed data type. For combinations that differ, use separate objects.

```json
"access": [
  {
    "type": "https://photos.example.com/api",
    "actions": ["read", "write"],
    "locations": ["https://server.example.net/"],
    "datatypes": ["metadata", "images"]
  },
  {
    "type": "https://photos.example.com/api",
    "actions": ["delete"],
    "locations": ["https://server.example.net/"],
    "datatypes": ["metadata"]
  },
  "dolphin-metadata"
]
```

## References by string (RFC 9635 § 8.1)

- An element can be a string the AS understands, such as `"dolphin-metadata"`. It is opaque to the client and may be any valid JSON string.
- This works like an OAuth scope value, but is not limited to OAuth's scope characters. Objects and strings can be mixed in one array.
- When developers will read the strings, choose values that are hard to confuse.
- A resource server can hand the client an opaque reference in its `WWW-Authenticate: GNAP` challenge (`access=…`). The client passes it unchanged into its request (§ 9.1).

## Granted versus requested

- The `access` in a token response MUST reflect the rights of the issued token, which MAY differ from what was requested (RFC 9635 § 3.2.1). Clients read it instead of assuming the request was granted in full.
- The rights of one token are a subset of the rights of the grant (RFC 9767 § 2.1.6).
- An introspection response returns the token's `access`, possibly filtered for the calling resource server, or an empty array (RFC 9767 § 3.3).

## Relationship with RAR

| Aspect                       | GNAP `access` (RFC 9635 § 8)                                                                                   | RAR `authorization_details` (RFC 9396)                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Container                    | JSON array                                                                                                     | JSON array (§ 2)                                                    |
| Elements                     | Objects or reference strings                                                                                   | Objects only (§ 2)                                                  |
| `type`                       | REQUIRED, AS-controlled, exact match                                                                           | REQUIRED (§ 2), AS-controlled, collision-resistant (§ 2.1)          |
| Common fields                | `actions`, `locations`, `datatypes`, `identifier`, `privileges`                                                | The same five (§ 2.2)                                               |
| Combination within an object | Cross product                                                                                                  | Product of the values (§ 2.2)                                       |
| Scope-like strings           | Reference strings in the same array (§ 8.1)                                                                    | Separate `scope` parameter, processed together with details (§ 3.1) |
| Unknown input                | At introspection, an AS that cannot process part of `access` MUST NOT report the token active (RFC 9767 § 3.3) | Refused with `invalid_authorization_details` (§ 5)                  |
| String comparison            | Exact byte match, no normalization (§ 8)                                                                       | No normalization (§ 12)                                             |

Practical consequences:

- A type definition written for RAR can be reused as a GNAP access type, and the other way round.
- When migrating, move OAuth scope values into GNAP reference strings, and RAR objects into GNAP objects unchanged.
- In a deployment that supports both, keep one registry of types and one policy engine that evaluates both structures.
