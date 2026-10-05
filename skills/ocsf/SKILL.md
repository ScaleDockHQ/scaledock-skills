---
name: ocsf
description: "OCSF 1.9.0: map application audit logs to Open Cybersecurity Schema Framework events, with categories, classes, objects, profiles, extensions and schema validation. OCSF 1.9 is current, OCSF 1.8 supported, OCSF 1.0 to 1.7 upgraded from, and the 1.10.0-dev preview tracked. Use when emitting security or audit events for a SIEM or data lake, mapping login, authorization, API, user or role changes to OCSF, picking a class_uid and activity_id, computing type_uid, filling metadata.version and metadata.product, applying profiles, or validating events against schema.ocsf.io. Triggers: OCSF, Open Cybersecurity Schema Framework, Authentication 3002, Authorize Session 3003, API Activity 6003, User Management 3007, Role Management 3008, Account Change deprecated, class_uid, type_uid, severity_id, status_id, unmapped, OCSF validator."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# Open Cybersecurity Schema Framework (OCSF)

OCSF is an open, vendor-neutral schema for security events, published by the OCSF project and licensed Apache 2.0. Events are JSON objects that belong to one class inside one category, built from shared objects and attributes, and optionally extended with profiles and extensions. With this skill the agent maps application audit logs to valid OCSF 1.9.0 events and validates them.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer (an application emitting OCSF), mapper (converting existing logs), or consumer (querying or validating OCSF).
- Source events: the audit log entries to map, for example logins, permission grants, API calls, user and role changes.
- Target version: OCSF 1.9 (default). OCSF 1.8 is supported for a named consumer that cannot ingest 1.9. OCSF 1.0, OCSF 1.1, OCSF 1.2, OCSF 1.3, OCSF 1.4, OCSF 1.5, OCSF 1.6 and OCSF 1.7 are legacy: read and upgrade their events, never author them. OCSF 1.10.0-dev is a preview (posture: track): never emit it. See [`references/versions.md`](references/versions.md).
- Revision: OCSF 1.9.0, the version `https://schema.ocsf.io/api/version` returns, unless the user names another. `metadata.version` carries this value.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, call `https://schema.ocsf.io/api/version` and the GitHub releases page for a newer release, and update the pins.

## Invariants

1. **Every event has the required base attributes**: `activity_id`, `category_uid`, `class_uid`, `metadata`, `severity_id`, `time` and `type_uid` (schema API, class definitions).
2. **`type_uid` is computed.** Producers and mappers compute it as `class_uid * 100 + activity_id` (schema API, `type_uid` attribute). The validator reports `type_uid_incorrect` otherwise.
3. **`metadata.version` and `metadata.product` are always set.** `metadata.version` is the OCSF schema version in SemVer; `product` needs at least one of `name` or `uid` (schema API, `metadata` and `product` objects).
4. **Enums use 0 for Unknown and 99 for Other.** When the `_id` is 99, the sibling string (for example `activity_name` or `auth_protocol`) carries the source value (white paper, enum conventions; schema API, `activity_id`).
5. **Class-specific required attributes and constraints hold.** For example, Authentication requires `user` and at least one of `service` or `dst_endpoint`; API Activity requires `actor`, `api` and `src_endpoint` (schema API, class definitions).
6. **Do not use deprecated classes for new mappings.** In 1.9.0, Account Change (3001) and User Access Management (3005) are deprecated in favour of User Management (3007) (schema API, 1.9.0 release notes).
7. **`time` is the time the event occurred**, as a `timestamp_t` in milliseconds since the epoch (schema API, `time` attribute and `timestamp_t` type). `original_time`, `logged_time` and `processed_time` record the other moments (white paper).
8. **Source fields with no OCSF attribute go in `unmapped`**, or better, in a registered extension (schema API, `unmapped`; white paper, extensions).
9. **Applied profiles are listed in `metadata.profiles`**, and their attributes then follow the profile's requirements (white paper, profiles).

## Workflow

1. **Pick the version.** Use OCSF 1.9 unless a named consumer needs OCSF 1.8, and note the `metadata.version` of any existing OCSF events.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target `metadata.version` is recorded, and it is not a legacy or `-dev` version.
2. **Inventory the source events.** List each audit event type with its fields: who acted, on whom or what, outcome, time, source address and product.
   ✓ Every event type has a one-line description and a sample record.
3. **Pick the category, class and activity.** Map each event type to a 1.9.0 class and an `activity_id`, and prefer the non-deprecated class.
   -> [`references/classes.md`](references/classes.md)
   ✓ Each event type has `category_uid`, `class_uid`, `activity_id` and a computed `type_uid`.
4. **Fill the base and class attributes.** Set the required attributes, then the recommended ones you have data for (`status_id`, `status`, `message`, `actor`, `src_endpoint`, `session` and others).
   -> [`references/attributes.md`](references/attributes.md)
   ✓ Required attributes and `at_least_one` constraints are satisfied for every class used.
5. **Set `metadata`.** Fill `version`, `product`, and where available `uid`, `original_event_uid`, `correlation_uid`, `tenant_uid` and `log_name`.
   -> [`references/attributes.md`](references/attributes.md)
   ✓ `metadata.version` is the target version (`1.9.0` by default) and `metadata.product.name` or `uid` is set.
6. **Decide on profiles and extensions.** Apply a profile only when you fill its attributes; put leftover source fields in `unmapped` or an extension.
   -> [`references/profiles-extensions.md`](references/profiles-extensions.md)
   ✓ `metadata.profiles` lists every applied profile; no field is silently dropped.
7. **Validate.** Send each sample event to the schema server's validator, first plain and then with `missing_recommended=true`.
   -> [`references/validation.md`](references/validation.md)
   ✓ `error_count` is 0 for every sample; remaining warnings are known and accepted.
8. **Upgrade** (only when asked). Move events or mappings from an older 1.x release to the target, for example Account Change (3001) to User Management (3007) for 1.8 to 1.9.
   -> [`references/versions.md`](references/versions.md)
   ✓ Upgraded events validate at `https://schema.ocsf.io/<target>/api/v2/validate` with no deprecation or `version_earlier` warnings, and carry the same facts as before.

## Verify before done

- [ ] Every event validates with `error_count: 0` at `POST https://schema.ocsf.io/api/v2/validate`.
- [ ] `type_uid` equals `class_uid * 100 + activity_id` in every event.
- [ ] `metadata.version` is the pinned OCSF version and `metadata.product` is set.
- [ ] No new mapping uses Account Change (3001) or User Access Management (3005).
- [ ] Enum values of 99 carry the matching string attribute.
- [ ] `time` is in milliseconds since the epoch.
- [ ] Personal data in `message`, `unmapped` and `raw_data` has been reviewed before the events leave the application.

## Reference index

- **`references/versions.md`**: every 1.x release with its status, which one to emit, what each minor changed, the 1.8 to 1.9 and general 1.x upgrade checklists, and the 1.10.0-dev preview. Load for steps 1 and 8.
- **`references/classes.md`**: categories, the Identity & Access Management and Application Activity classes, activity IDs, deprecations in 1.9.0, and an audit-event-to-class mapping table. Load for step 3.
- **`references/attributes.md`**: required, recommended and optional base attributes, the enums for `severity_id` and `status_id`, and the `metadata`, `product`, `user`, `actor` and `iam_role` objects. Load for steps 4 and 5.
- **`references/profiles-extensions.md`**: the 1.9.0 profiles, how to apply them, extensions and their registry, and `unmapped`. Load for step 6.
- **`references/validation.md`**: the schema server API, the validator's response format and error codes, and four example events that validate against 1.9.0. Load for step 7.

## Related skills

- `cloudevents` to carry OCSF events in a CloudEvents envelope: `npx skills add ScaleDockHQ/scaledock-skills --skill cloudevents`.
- `opentelemetry-genai` for the OpenTelemetry side of AI agent activity: `npx skills add ScaleDockHQ/scaledock-skills --skill opentelemetry-genai`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OCSF Schema 1.9.0 release](https://github.com/ocsf/ocsf-schema/releases/tag/1.9.0): Released, 1.9.0 (published 2026-08-03), checked 2026-10-02.
- [OCSF Schema releases](https://github.com/ocsf/ocsf-schema/releases): Released, v1.0.0 (2023-09-29) to 1.9.0 (2026-08-03), checked 2026-10-05.
- [OCSF Schema 1.8.0 release](https://github.com/ocsf/ocsf-schema/releases/tag/1.8.0): Released, 1.8.0 (published 2026-03-18), checked 2026-10-05.
- [OCSF Schema 1.0.0 release](https://github.com/ocsf/ocsf-schema/releases/tag/v1.0.0): Released, v1.0.0 (published 2023-09-29), checked 2026-10-05.
- [OCSF schema CHANGELOG](https://github.com/ocsf/ocsf-schema/blob/main/CHANGELOG.md): changelog, main branch (v1.0.0 to v1.9.0 and Unreleased), checked 2026-10-05.
- [OCSF schema server: hosted versions](https://schema.ocsf.io/api/versions): schema server API, default 1.9.0, lists 1.10.0-dev and 1.0.0 to 1.9.0, checked 2026-10-05.
- [OCSF 1.10.0-dev schema](https://schema.ocsf.io/1.10.0-dev/api/version): schema server API, development version, 1.10.0-dev (draft posture: track), checked 2026-10-05.
- [OCSF schema server: current version](https://schema.ocsf.io/api/version): schema server API, 1.9.0, checked 2026-10-05.
- [OCSF 1.9.0 categories](https://schema.ocsf.io/api/1.9.0/categories): schema server API, 1.9.0, checked 2026-10-02.
- [OCSF 1.9.0 Authentication class](https://schema.ocsf.io/api/1.9.0/classes/authentication): schema server API, 1.9.0, checked 2026-10-02.
- [OCSF 1.9.0 metadata object](https://schema.ocsf.io/api/1.9.0/objects/metadata): schema server API, 1.9.0, checked 2026-10-02.
- [OCSF 1.9.0 profiles](https://schema.ocsf.io/api/1.9.0/profiles): schema server API, 1.9.0, checked 2026-10-02.
- [OCSF Schema API (OpenAPI)](https://schema.ocsf.io/doc/swagger.json): schema server API description, served alongside 1.9.0, checked 2026-10-02.
- [Understanding the Open Cybersecurity Schema Framework](https://raw.githubusercontent.com/ocsf/ocsf-docs/main/overview/understanding-ocsf.md): white paper, main branch, checked 2026-10-05.
- [OCSF extensions registry](https://raw.githubusercontent.com/ocsf/ocsf-schema/main/extensions.md): registry, main branch, checked 2026-10-02.
