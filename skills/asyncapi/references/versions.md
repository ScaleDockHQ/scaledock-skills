# Versions and upgrades

Read this when choosing the `asyncapi` value, reading a 3.0 or 2.x document, upgrading, or checking whether a next major line exists. Sources: the AsyncAPI 3.1.0, 3.0.0 and 2.6.0 texts at their tags, the 3.1.0, 3.0.0 and 2.6.0 releases, the 3.1.0 release notes, the "Migrating to v3" guide and the spec-json-schemas repository, listed in [Sources](../SKILL.md#sources). The specification has no numbered sections, so citations name the object or heading.

## Version lines

| Id    | Line         | Status    | Revision           | Posture | Summary                                                                                      |
| ----- | ------------ | --------- | ------------------ | ------- | -------------------------------------------------------------------------------------------- |
| `3.1` | AsyncAPI 3.1 | current   | 3.1.0 (2026-01-31) |         | The default target. Adds the ROS 2 bindings to 3.0, with no breaking changes.                |
| `3.0` | AsyncAPI 3.0 | supported | 3.0.0 (2023-12-05) |         | The 3.x model: separate channels, operations with `send` and `receive`, explicit references. |
| `2.6` | AsyncAPI 2.6 | legacy    | 2.6.0 (2023-02-01) |         | The last 2.x release; stands for the whole 2.x line. Read it and upgrade from it.            |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Tooling ignores the patch version (§ AsyncAPI Version String). The 3.0.1 release made no change to the specification; it only updated a converter library (3.0.1 release). The 2.x line runs from 2.0.0 to 2.6.0 as minor releases, and `2.6` covers all of them. AsyncAPI 1.x (1.0.0 to 1.2.0) is obsolete and not listed: its JSON Schemas remain in spec-json-schemas, but this skill does not read or upgrade 1.x documents.

## Which version to use

- Default to `asyncapi: 3.1.0`.
- Write `asyncapi: 3.0.0` only for a named tool or consumer that cannot read 3.1.0, and then use no `ros2` binding.
- Never author 2.x. Read a 2.x document as input to an upgrade to 3.1.
- Validate each document with the schema for its exact `asyncapi` value; each schema fixes the version with `const` ([`validation.md`](validation.md)).

## What changed

### AsyncAPI 3.1

From the 3.1.0 release, its release notes and a comparison of the tagged 3.0.0 and 3.1.0 texts:

- A `ros2` key in the Server, Channel, Operation and Message Bindings Objects (§ Server Bindings Object, § Channel Bindings Object, § Operation Bindings Object, § Message Bindings Object).
- The default schema format is the AsyncAPI 3.1.0 Schema Object, `application/vnd.aai.asyncapi;version=3.1.0` (§ Multi Format Schema Object).
- An Operation Trait Object MAY contain any Operation Object property except `action`, `channel`, `messages` and `traits`; 3.0.0 did not exclude `messages` (§ Operation Trait Object).
- The release notes state there are no breaking changes: switching `asyncapi` from `3.0.0` to `3.1.0` is enough (3.1.0 release notes).

### AsyncAPI 3.0

A new major line with breaking changes from 2.6.0 (3.0.0 release, "Migrating to v3"). The full table with before and after YAML is in [`migration-from-2.md`](migration-from-2.md). In short:

- Channels, messages and operations are separate; root `operations` reference channels, and `publish` and `subscribe` are replaced by `action: send` or `action: receive` from the application's point of view (§ Operation Object).
- A channel key is an ID and the topic or path goes in `address` (§ Channel Object); multiple messages use the channel's `messages` map instead of `oneOf` (§ Messages Object).
- A server has `host` and `pathname` instead of `url` (§ Server Object).
- References are explicit, server and operation `security` lists hold schemes or references, and scopes move onto the scheme (§ Server Object, § Security Scheme Object).
- Traits no longer override the object (§ Traits Merge Mechanism), and non-default payload formats use a Multi Format Schema Object (§ Multi Format Schema Object).
- Request-reply is described with an Operation Reply Object (§ Operation Reply Object).

### AsyncAPI 2.6

The last 2.x minor. 2.6.0 added the Pulsar bindings and protocol (2.6.0 release; AsyncAPI 2.6.0, § Server Bindings Object). A 2.x document describes channels keyed by address, with `publish` and `subscribe` operations nested in each channel item (AsyncAPI 2.6.0, § Channel Item Object).

## Upgrading

### 3.0 to 3.1

1. Change `asyncapi` from `3.0.0` to `3.1.0` (3.1.0 release notes).
2. Replace removed or renamed fields: none were removed. Move any `messages` property out of Operation Trait Objects onto the operation itself (§ Operation Trait Object).
3. Validate against the 3.1.0 schema from spec-json-schemas v6.11.1 ([`validation.md`](validation.md)).
4. Keep behaviour unchanged: the same servers, channels, operations and messages, with a `ros2` binding added only as a separate change.

### 2.6 to 3.0

1. Run the converter with `--target-version=3.0.0`, which sets `asyncapi: 3.0.0` ("Migrating to v3").
2. Replace removed or renamed fields with the table and review checklist in [`migration-from-2.md`](migration-from-2.md): no `url`, `publish`, `subscribe`, `oneOf` message lists or implicit references remain.
3. Validate against the 3.0.0 schema, then check the rules the schema cannot express ([`validation.md`](validation.md)).
4. Keep behaviour unchanged: every 2.x `subscribe` is now a `send` and every `publish` a `receive`, so the application sends and receives exactly what it did before.

### 2.6 to 3.1 (legacy to current)

1. Follow 2.6 to 3.0 above.
2. Then follow 3.0 to 3.1, changing `asyncapi` to `3.1.0`.
3. Validate the result against the 3.1.0 schema.
4. Compare the operations list with the 2.x channel items once more, so that no direction was flipped.

## Preview

No preview is listed. On 2026-10-05 the asyncapi/spec repository has no 4.0 branch, tag, pre-release or specification text: its newest releases are 3.1.0 and 3.0.1, its pre-releases are the 2023 `3.0.0-next-major-spec` series, and the `next-major-spec` branch still holds the 3.0.0 text (asyncapi/spec releases). The 3.1.0 release notes name next topics (late or out-of-sequence events, AND logic for multiple security schemes, a discriminator aligned with OpenAPI), but these are agenda items without text. When a 4.0 pre-release with text appears, add it here as `4.0-preview` with posture track.
