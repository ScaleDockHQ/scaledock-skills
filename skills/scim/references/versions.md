# Versions and upgrades

Read this when choosing a target version, talking to a SCIM 1.1 client or service provider, upgrading one to SCIM 2.0, or deciding whether to use a draft. Sources: RFC 7643, RFC 7644 and their updates for SCIM 2.0, the SCIM Core Schema 1.1 and SCIM Protocol 1.1 texts on simplecloud.info for SCIM 1.1, and the simplecloud.info specification index, all listed in [Sources](../SKILL.md#sources). "Core 1.1" and "Protocol 1.1" below refer to the two 1.1 documents.

## Version lines

| Id    | Line     | Status  | Revision                                                                                  | Posture | Summary                                                                          |
| ----- | -------- | ------- | ----------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------- |
| `2.0` | SCIM 2.0 | current | RFC 7643 and RFC 7644 (September 2015), updated by RFC 9865 and RFC 9967                  |         | The default target. IETF standard with `urn:ietf:params:scim` URNs and `/v2`.    |
| `1.1` | SCIM 1.1 | legacy  | Core Schema 1.1 and Protocol 1.1, drafts dated 9 July 2012, published on simplecloud.info |         | Superseded by 2.0. JSON or XML, `urn:scim:schemas:core:1.0`, `/v1`, merge PATCH. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The simplecloud.info index calls SCIM 1.1 the second official release, released in July 2012, compatible with 1.0 and containing clean-ups and clarifications from interop testing. It lists SCIM 1.0 (December 2011, then "Simple Cloud Identity Management") as deprecated. Treat a 1.0 peer as a 1.1 peer: both use the `urn:scim:schemas:core:1.0` URI. RFC 9865 (cursor pagination) and RFC 9967 (security events) update the 2.0 line; they are not new lines.

## Which version to use

- Default to SCIM 2.0: RFC 7643 and RFC 7644, with RFC 9865 and RFC 9967 where used.
- Treat a SCIM 1.1 client or service provider as input to an upgrade. Never build a new 1.1 endpoint. If a 1.1 peer cannot be upgraded yet, put a translation layer in front of a 2.0 implementation instead of writing 1.1 natively.
- The IPSIE AL and FastFed SCIM documents are profiles of SCIM 2.0, not SCIM lines; see [`profiles.md`](profiles.md).

## What changed

### SCIM 2.0

Against SCIM 1.1:

- **Schema URIs.** 1.1 identifies User, Group, the Service Provider Configuration and Resource Schema all with `urn:scim:schemas:core:1.0`, and the enterprise extension with `urn:scim:schemas:extension:enterprise:1.0` (Core 1.1 §6 to §10). 2.0 uses one URI per schema under the IETF `urn:ietf:params:scim` namespace: `urn:ietf:params:scim:schemas:core:2.0:User`, `...:core:2.0:Group` and `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User` (RFC 7643 §4.1, §4.2, §4.3, §10.2).
- **`schemas` on every resource.** Core 1.1 says `schemas` is REQUIRED (§5.2) but also that it is not necessary for resources fully defined by the core schema (§5.1). In 2.0 every resource carries `schemas` (RFC 7643 §3).
- **Message URIs.** 1.1 list responses carry `totalResults` and `Resources` under the core schema URI (Protocol 1.1 §3.2.2). 2.0 defines message schemas: `urn:ietf:params:scim:api:messages:2.0:ListResponse`, `SearchRequest`, `PatchOp`, `BulkRequest`, `BulkResponse` and `Error` (RFC 7644 §3.1, §3.4.2, §3.4.3, §3.5.2, §3.7, §3.12).
- **Version segment.** The only valid identifier is `v1` in 1.1 (Protocol 1.1 §3.10), and `v2` in 2.0 (RFC 7644 §3.13).
- **Discovery.** 1.1 has `/ServiceProviderConfigs` and `/Schemas` (Protocol 1.1 §3, Table 1). 2.0 has `/ServiceProviderConfig` (singular), `/ResourceTypes` and `/Schemas` (RFC 7644 §4; RFC 7643 §5, §6, §7). `meta.resourceType` is new (RFC 7643 §3.1).
- **Attribute characteristics.** 1.1 marks only READ-ONLY attributes (Core 1.1 §3). 2.0 defines `required`, `caseExact`, `mutability`, `returned` and `uniqueness` for every attribute, and a `reference` type (RFC 7643 §2.2, §2.3.7).
- **PATCH.** In 1.1 the body is a partial resource that is merged into the stored one; attributes are removed by listing them in `meta.attributes`, and multi-valued values by adding `"operation": "delete"` (Protocol 1.1 §3.3.2; Core 1.1 §3.2, §5.1). In 2.0 the body is a `PatchOp` message with an ordered `Operations` array of `add`, `remove` and `replace` operations, each with an optional `path`, applied atomically (RFC 7644 §3.5.2).
- **Errors.** 1.1 returns `{"Errors": [{"description": ..., "code": "404"}]}` (Protocol 1.1 §3.9). 2.0 returns one `Error` message with `schemas`, `status` as a string, `scimType` for defined 400 cases, and `detail` (RFC 7644 §3.12).
- **Filters.** 1.1 has `eq`, `co`, `sw`, `pr`, `gt`, `ge`, `lt`, `le`, `and`, `or` and parentheses, and an unknown operator gets a 400 with a human-readable message (Protocol 1.1 §3.2.2.1). 2.0 adds `ne`, `ew`, `not` and value paths in brackets such as `emails[type eq "work"]`, and an unknown operator gets 400 `invalidFilter` (RFC 7644 §3.4.2.2).
- **Formats.** 1.1 supports JSON, and optionally XML, with `application/json` and `.json` or `.xml` suffixes (Protocol 1.1 §3.6; Core 1.1 §12). 2.0 is JSON only, with `application/scim+json` as the default and a `.scim` suffix (RFC 7644 §3.8, §8.1). The 1.1 `xmlDataFormat` configuration option is gone (Core 1.1 §9; RFC 7643 §5).
- **Multi-valued shorthand.** 1.1 lets an attribute with a `value` sub-attribute be sent as an array of primitives, for example `"emails": ["a@example.com"]` (Core 1.1 §3.2). In 2.0 each attribute's schema says whether it holds primitives or objects, and `emails` holds objects (RFC 7643 §2.4, §4.1.2).
- **Bulk status.** A 1.1 bulk operation status is an object such as `{"code": "201"}` (Protocol 1.1 §3.5). In 2.0 `status` is the HTTP status code as a string, such as `"201"` (RFC 7644 §3.7.3).
- **Method override and search.** 1.1 lets clients tunnel PUT, PATCH and DELETE through POST with `X-HTTP-Method-Override` (Protocol 1.1 §3.12). RFC 7644 does not define that header; it adds POST to `/.search` for queries (RFC 7644 §3.4.3).
- **New in 2.0.** The `/Me` alias (RFC 7644 §3.11), `attributes` and `excludedAttributes` (RFC 7644 §3.4.2.5), multi-tenancy guidance (RFC 7644 §6), and TLS 1.2 support as a MUST (RFC 7644 §7.2). 1.1 required TLS but named TLS 1.0 as the most widely deployed (Protocol 1.1 §4).
- **Later updates.** RFC 9865 adds cursor pagination and RFC 9967 adds security events and asynchronous requests; see [`pagination.md`](pagination.md) and [`events.md`](events.md).

### SCIM 1.1

The first line covered here, and the last before the IETF work. It clarified SCIM 1.0 after interop testing and stayed compatible with it (simplecloud.info index).

## Upgrading

### 1.1 to 2.0

1. Change the version marker:
   - Move endpoints from `/v1/...` to `/v2/...`, or serve both during the transition (Protocol 1.1 §3.10; RFC 7644 §3.13).
   - Replace `urn:scim:schemas:core:1.0` with the per-resource URIs, and `urn:scim:schemas:extension:enterprise:1.0` with `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`. Put enterprise attributes under that URI as an object (RFC 7643 §3.3, §4.3).
   - Send `schemas` on every resource and message (RFC 7643 §3; RFC 7644 §3.1).
   - Send and accept `application/scim+json` (RFC 7644 §3.8).
2. Replace removed or renamed fields:
   - Wrap list responses as `ListResponse` messages (RFC 7644 §3.4.2).
   - Rewrite PATCH bodies as `PatchOp` messages. A merged attribute becomes `add` or `replace`; each `meta.attributes` entry becomes a `remove` with a `path`; an `"operation": "delete"` value becomes a `remove` with a value filter path such as `members[value eq "id"]` (Protocol 1.1 §3.3.2; RFC 7644 §3.5.2).
   - Rewrite error bodies as `Error` messages with a string `status`, and add `scimType` where RFC 7644 defines one, for example `uniqueness` on 409 and `invalidFilter` on a bad filter (Protocol 1.1 §3.9; RFC 7644 §3.12).
   - Rename `/ServiceProviderConfigs` to `/ServiceProviderConfig`, drop `xmlDataFormat`, and add `/ResourceTypes` (RFC 7644 §4; RFC 7643 §5, §6).
   - Replace primitive-array shorthand with objects carrying `value` (RFC 7643 §2.4).
   - Replace bulk `status` objects with string codes (RFC 7644 §3.7.3).
   - Replace `X-HTTP-Method-Override` with the real HTTP method, and use POST `/.search` where GET URLs are a problem (RFC 7644 §3.4.3, §7.5.2).
   - Drop XML.
3. Validate against the target: set every attribute's characteristics (RFC 7643 §2.2), then run the checks in [Verify before done](../SKILL.md#verify-before-done) and the reference files: [`schema.md`](schema.md), [`protocol.md`](protocol.md) and [`discovery.md`](discovery.md).
4. Keep behaviour unchanged:
   - `id` and `externalId` values carry over unchanged (Core 1.1 §5.1; RFC 7643 §3.1).
   - A user that was active stays active, and group memberships are the same after the move.
   - Filters that matched in 1.1 still match. Both versions compare strings case-insensitively unless the attribute is `caseExact` (Protocol 1.1 §3.2.2.1; RFC 7644 §3.4.2.2).

## Preview

No preview is listed. The IETF SCIM working group has no draft of a SCIM line after 2.0: its active drafts (as listed on 2026-10-05) are extensions of 2.0, namely `draft-ietf-scim-device-model` (device schema extensions), `draft-ietf-scim-roles-entitlements` (roles and entitlements extension) and `draft-ietf-scim-use-cases-reloaded` (definitions and use cases). This skill does not pin them; do not emit their schemas. Work on the 2.0 line arrives as RFCs that update RFC 7643 and RFC 7644, such as RFC 9865 and RFC 9967, which this skill pins as part of 2.0. The IPSIE AL and FastFed drafts are profiles of 2.0, tracked in [`profiles.md`](profiles.md).

When a draft of a next SCIM line is published, add it here as a preview with its posture. When it ships, make it current, make 2.0 supported, and add a "2.0 to next" upgrade section.
