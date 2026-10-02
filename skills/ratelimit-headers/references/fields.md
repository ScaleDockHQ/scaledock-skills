# The RateLimit-Policy and RateLimit fields

Bare section numbers refer to `draft-ietf-httpapi-ratelimit-headers-11`. Structured Fields rules come from RFC 9651.

## Terms (§ 2)

- **Quota**: an allocation of capacity, measured in quota units, that a client may consume within a time window.
- **Quota unit**: the unit that measures client activity.
- **Quota partition**: a division of server capacity across clients, users and owned resources.
- **Quota policy**: what the server enforces for one partition: a quota in units over a time window. Servers may advertise policies but are not required to, and more than one policy can affect one request.
- **Service limit**: the quota currently available under one policy and, if defined, the effective window in which the client can use no more than that.

## RateLimit-Policy (§ 3)

A response header field whose value is a non-empty List of quota policy Items. Each Item's value MUST be a String: the policy name (§ 3). The value SHOULD stay consistent across responses; that is what distinguishes it from `RateLimit`, which MAY change on every request (§ 3). The list can be split over several `RateLimit-Policy` field lines (§ 3).

```http
RateLimit-Policy: "burst";q=100;w=60,"daily";q=1000;w=86400
```

| Parameter | Required | Type                       | Meaning                                                                                                            |
| --------- | -------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `q`       | Yes      | non-negative Integer       | The quota allocated by this policy, in quota units (§ 3.1, § 3.1.1).                                               |
| `qu`      | No       | String                     | The quota unit. Default `requests` (§ 3.1). Allowed values come from the RateLimit Quota Units registry (§ 3.1.2). |
| `w`       | No       | Integer, greater than zero | The time window in seconds, like `delay-seconds`; no sub-second precision (§ 3.1.3).                               |
| `pk`      | No       | Byte Sequence              | The partition key for the request; quotas are allocated per partition key (§ 3.1.4).                               |

Quota units defined by the draft (§ 3.1.2):

- `requests`: requests processed; whether a given request consumes a unit is implementation-specific.
- `content-bytes`: content bytes processed.
- `concurrent-requests`: concurrent requests processed.

Other parameters are allowed and can be treated as comments. Service-specific parameters SHOULD carry a vendor prefix, such as `acme-burst` (§ 3.1).

Examples from § 3.2:

```http
RateLimit-Policy: "default";q=100;w=10
RateLimit-Policy: "permin";q=50;w=60,"perhr";q=1000;w=3600
RateLimit-Policy: "peruser";q=100;w=60;pk=:cHsdsRa894==:
RateLimit-Policy: "peruser";q=65535;qu="content-bytes";w=10;pk=:sdfjLJUOUH==:
```

## RateLimit (§ 4)

A response header field whose value is a List of service limit Items. Each Item identifies the quota policy it reports on (§ 4.1); use the same String the policy uses in `RateLimit-Policy`. The list can be split over several field lines (§ 4).

```http
RateLimit: "default";r=50;t=30
```

| Parameter | Required | Type                 | Meaning                                                                                                      |
| --------- | -------- | -------------------- | ------------------------------------------------------------------------------------------------------------ |
| `r`       | Yes      | non-negative Integer | The available quota under the policy, in quota units (§ 4.1, § 4.1.1).                                       |
| `t`       | No       | non-negative Integer | The effective window in seconds: the time within which the client can use no more than `r` (§ 4.1, § 4.1.2). |
| `pk`      | No       | Byte Sequence        | The partition key for the request (§ 4.1.3).                                                                 |

`t` uses seconds rather than a timestamp because it needs no clock synchronization and spreads clients out instead of sending them all back at one instant (§ 4.1.2).

Other parameters are allowed and can be treated as comments; service-specific ones SHOULD carry a vendor prefix (§ 4.1).

Examples from § 4.2:

```http
RateLimit: "default";r=50;t=30
RateLimit: "default";r=999;pk=:dHJpYWwxMjEzMjM=:
RateLimit: "default";r=300000000;t=60;pk=:QXBwLTk5OQ==:
```

## Neither field in trailers

Both fields MUST NOT appear in a trailer section (§ 3.1, § 4.1).

## Structured Fields rules that matter here (RFC 9651)

- **Lists** separate members with a comma and optional whitespace (§ 3.1). An empty List is expressed by omitting the field (§ 3.1), which is why `RateLimit-Policy`, a non-empty List, is simply left out when there is nothing to say.
- **Parameters** follow an Item, separated by `;`. Keys are unique per Item and cannot contain uppercase letters (§ 3.1.2).
- **Integers** have at most 15 digits, signed (§ 3.3.1). A quota above 999,999,999,999,999 cannot be sent as an Integer.
- **Strings** are printable ASCII only, `%x20` to `%x7E`, in double quotes with `"` and `\` escaped by a backslash (§ 3.3.3). Serialization fails on any other character (§ 4.1.6), so policy names must be ASCII.
- **Byte Sequences** are base64 between colons, for example `:cHJldGVuZA==:` (§ 3.3.5).
- **Splitting**: List members can be spread over several field lines, but one member cannot be split across lines (§ 3.1, § 4.2).
- **Parse failure**: if parsing fails, the whole field value MUST be ignored, or the whole message treated as malformed (§ 4.2). Field specifications cannot loosen this.

## Mapping from X-RateLimit-* headers

The draft's informative section "RateLimit header fields currently used on the web" lists `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset` and their variants, and notes that the reset value means different things across implementations (seconds, milliseconds, UNIX timestamps or dates). This section is marked for removal before RFC publication.

| Legacy header           | Replacement                                        |
| ----------------------- | -------------------------------------------------- |
| `X-RateLimit-Limit`     | `q` in `RateLimit-Policy`, with `w` for the window |
| `X-RateLimit-Remaining` | `r` in `RateLimit`                                 |
| `X-RateLimit-Reset`     | `t` in `RateLimit`, always in seconds from now     |

When migrating, convert any timestamp-based reset into delay seconds for `t` (§ 4.1.2).

## Known inconsistencies in the pinned revision

- § 3.1 and § 3.1.2 name the default unit `requests`, while the registry table in § 10.3 lists `request`. Omit `qu` for request-based policies so the default applies, and use `requests` if you must write it.
- The IANA HTTP Field Name registry, read 2026-10-02, has no `RateLimit` or `RateLimit-Policy` entry; § 10.1 only requests them. The fields are draft-defined until the RFC is published.
