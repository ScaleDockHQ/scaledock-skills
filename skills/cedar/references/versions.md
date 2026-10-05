# Versions and upgrades

Read this when choosing a target version, reading policies or schemas written for an older Cedar, upgrading, or checking for an unreleased language version. Sources: the Cedar document history (the language version table) and the `cedar-policy` SDK changelog, listed in [Sources](../SKILL.md#sources).

Cedar has two version numbers. The language version (4.5) is what policies, schemas and entity data are written in; the SDK version (4.13.0) is the `cedar-policy` crate. A breaking change to the Rust API may or may not break the language, so the two differ (Document history). From SDK 3.2.4 on, the changelog marks language-breaking changes with a star (SDK changelog). The lines below follow the SDK major, which is also the language major.

## Version lines

| Id    | Line      | Status  | Revision                                                                               | Posture | Summary                                                                              |
| ----- | --------- | ------- | -------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `4.x` | Cedar 4.x | current | language 4.5 (April 23, 2026), SDK 4.10.0 to 4.13.0; pinned to SDK 4.13.0 (2026-09-15) |         | The default target. Entity tags, enumerated entity types, datetime, trailing commas. |
| `3.x` | Cedar 3.x | legacy  | language 3.4 (August 19, 2024), SDK 3.3.0 to 3.4.3                                     |         | The `is` operator, stricter validation, the Cedar schema format. Superseded by 4.x.  |
| `2.x` | Cedar 2.x | legacy  | language 2.2 (April 1, 2024), SDK 2.4.5 to 2.5.1                                       |         | The first open-source release line. Superseded by 3.x.                               |

Statuses: **current** is the default target; **legacy** is superseded, read and upgraded from but never authored. The SDK changelog still lists patch releases on older lines (3.4.3 on 2026-06-22, 2.5.1 on 2025-11-25); they fix the SDK and do not add language features, so new policies still target 4.x.

## Which version to use

- Default to Cedar 4.x at language 4.5, with the latest SDK that supports it; the document history recommends the latest SDK for your language version because later SDKs contain bug fixes.
- When a deployment is pinned to an older language version, write only features listed at or below that version in the document history.
- Treat 3.x and 2.x policies, schemas and entity data as input to an upgrade.
- No preview exists (see [Preview](#preview)).

## What changed

Each entry cites the document history row and, where named there, the RFC (`rfc#`) or issue (`cedar#`).

### Cedar 4.x

- 4.5: extended `has` in the JSON policy format, cedar#1889 (Document history, 4.5). Since SDK 4.13.0 a chained `has` converts to one JSON node whose `attr` is an array ([`policies.md`](policies.md)).
- 4.4: trailing commas in Cedar policies, rfc#71, for policies only (Document history, 4.4).
- 4.3: enumerated entity types, rfc#53; the datetime extension, rfc#80; entity slice validation, rfc#76 (Document history, 4.3).
- 4.2: the `isEmpty` operator, cedar#1358; extended `has`, rfc#62; datetime as experimental, rfc#80; schema annotations, rfc#48 (Document history, 4.2).
- 4.1: entity tags, rfc#82; annotations without values, cedar#1231 (Document history, 4.1).
- 4.0, breaking: `__cedar` is reserved, rfc#52; the unspecified entity is removed, rfc#55; shadowing definitions in the empty namespace is disallowed, rfc#70; JSON schemas accept `EntityOrCommon`, cedar#1060; `Bool`, `Boolean`, `Entity`, `Extension`, `Long`, `Record`, `Set` and `String` are not allowed as common type names, cedar#1150 (Document history, 4.0). The SDK changelog for 4.0.0 adds, as language changes: validation rejects comparisons and conditionals between record types that differ in whether an attribute is required, and JSON schemas that reference an unknown extension type fail to parse.

### Cedar 3.x

- 3.4: the JSON format for policy sets, cedar#549 (Document history, 3.4).
- 3.3: references between common types, cedar#154 (Document history, 3.3).
- 3.2: the general multiplication operator, rfc#57 (Document history, 3.2).
- 3.1: the Cedar schema format, rfc#24 (Document history, 3.1).
- 3.0, breaking: the `is` operator, rfc#5; stricter validation, rfc#19; duplicate keys in records disallowed, rfc#20; request validation, cedar#191; entity validation, cedar#360 (Document history, 3.0). The SDK changelog for 3.0.0 also records that equality on IP ranges changed (`ip("192.168.0.1/24") == ip("192.168.0.3/24")` was `true` and is now `false`), that the `__expr` escape was removed from the JSON formats, and that permissive validation moved behind an experimental feature flag.

### Cedar 2.x

- 2.2: the general multiplication operator backported, rfc#57 (Document history, 2.2).
- 2.1: whitespace in namespaces disallowed, rfc#9 (Document history, 2.1).
- 2.0: initial release of the Cedar policy language (Document history, 2.0).

## Upgrading

### 3.x to 4.x

From the 4.0 row of the document history and the starred entries of SDK 4.0.0:

1. Move to an SDK that supports language 4.5 (4.10.0 to 4.13.0).
2. Rename any namespace, entity type, common type or action whose name contains `__cedar` (rfc#52).
3. Give every request a concrete principal, action and resource; the unspecified entity is gone, and the SDK's `Request::new` no longer takes optional entity types (rfc#55).
4. Remove a name defined both in the empty namespace and in a non-empty namespace (rfc#70), and rename common types called `Bool`, `Boolean`, `Entity`, `Extension`, `Long`, `Record`, `Set` or `String` (cedar#1150).
5. Fix JSON schemas that reference an unknown extension type, which no longer parse.
6. Run the validator against the schema and fix every error, including comparisons or conditionals between records that differ in an optional attribute ([`validation-evaluation.md`](validation-evaluation.md)).
7. In code, follow the SDK renames: "natural" and "human-readable" APIs are now "Cedar" APIs (for example `Schema::from_str_natural` became `Schema::from_cedarschema_str`), and `Schema` parsed from a string reads the Cedar schema format; use `from_json_str` for JSON (SDK changelog, 4.0.0).
8. Keep behaviour unchanged: rerun the allow, deny and forbid-override tests and compare decisions and determining policies.

### 2.x to 3.x

From the 3.0 row of the document history and SDK 3.0.0:

1. Move to an SDK on the 3.x line (3.3.0 to 3.4.3 for language 3.4).
2. Remove whitespace from namespaces if the policies predate 2.1 (rfc#9).
3. Remove duplicate keys from record literals, request `context` and entity attributes; they are now errors (rfc#20).
4. Rewrite JSON entity data that uses the removed `__expr` escape in the current JSON entity format ([`schema-entities.md`](schema-entities.md)).
5. Check policies that compare IP ranges with `==`, which can now be `false` where it was `true`. Equality on single addresses and `.isInRange()` behave as before.
6. Re-validate under the stricter rules (rfc#19), and if you relied on permissive validation, note that it is now experimental.
7. Validate requests and entities against the schema where the SDK offers it (cedar#191, cedar#360).
8. Keep behaviour unchanged, then continue with 3.x to 4.x.

### 2.x to 4.x

Apply the 2.x to 3.x steps, then the 3.x to 4.x steps, validating in between. There is no direct path that skips the 3.0 changes.

## Preview

None is listed. The SDK changelog's Unreleased section gives the Cedar language version as "TBD", and the document history lists no language version after 4.5. When a new language version appears in the document history, add it as a line; if a release candidate with a language version is published first, add it as a `-preview` line with posture track.
