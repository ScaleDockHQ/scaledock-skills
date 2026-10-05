# Versions and upgrades

Read this when choosing the `metadata.version` to emit, reading events written for an older OCSF release, upgrading a mapping, or deciding whether to use the development schema. Sources: the OCSF schema CHANGELOG, the GitHub releases of `ocsf/ocsf-schema`, the schema server's `/api/versions`, and the white paper's section on versions, listed in [Sources](../SKILL.md#sources).

## Version lines

OCSF uses SemVer. After 1.0.0 the major version stays the same while the schema stays backwards compatible; a minor release adds classes, attributes, objects and profiles; a patch release holds corrections that do not break the schema (white paper, Metadata). Every 1.x release so far is a `.0` minor, so each line below is one minor.

| Id             | Line            | Status    | Revision                       | Posture | Summary                                                                                                                   |
| -------------- | --------------- | --------- | ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `1.10-preview` | OCSF 1.10.0-dev | preview   | `1.10.0-dev` on schema.ocsf.io | track   | Unreleased: likelihood attributes, declared incidents, job progress, log facility, ICMP fields and stricter type regexes. |
| `1.9`          | OCSF 1.9        | current   | 1.9.0 (2026-08-03)             |         | User Management (3007) and Role Management (3008); Account Change (3001) and User Access Management (3005) deprecated.    |
| `1.8`          | OCSF 1.8        | supported | 1.8.0 (2026-03-18)             |         | `ai_operation` profile, `ai_model`, `message_context` and `token` objects; `file_hash_t` regex removed.                   |
| `1.7`          | OCSF 1.7        | legacy    | 1.7.0 (2025-11-14)             |         | Peripheral Activity class; `reporter`, `function_invocation` objects; more `metadata` fields.                             |
| `1.6`          | OCSF 1.6        | legacy    | 1.6.0 (2025-08-01)             |         | IAM Analysis Finding class.                                                                                               |
| `1.5`          | OCSF 1.5        | legacy    | 1.5.0 (2025-04-28)             |         | Application Security Posture Finding and Live Evidence Info classes; Device Config State deprecated.                      |
| `1.4`          | OCSF 1.4        | legacy    | 1.4.0 (2025-02-05)             |         | Unmanned Systems category, Script Activity, Application Error and other classes; `incident` profile.                      |
| `1.3`          | OCSF 1.3        | legacy    | 1.3.0 (2024-08-01)             |         | Remediation category, Event Log Activity class, `osint` profile.                                                          |
| `1.2`          | OCSF 1.2        | legacy    | v1.2.0 (2024-04-23)            |         | Data Security Finding class, `data_classification` profile.                                                               |
| `1.1`          | OCSF 1.1        | legacy    | v1.1.0 (2024-01-25)            |         | User Inventory Info class, Network Proxy profile; Security Finding split into specific finding classes.                   |
| `1.0`          | OCSF 1.0        | legacy    | v1.0.0 (2023-09-29)            |         | Initial release of OCSF.                                                                                                  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Revision dates are the GitHub release dates. The CHANGELOG headings sometimes differ by a few days (for example it dates v1.8.0 to 16 March 2026 and v1.4.0 to 31 January 2025). The schema server also hosts `1.0.0-rc.2` and `1.0.0-rc.3`, release candidates of 1.0 that are not lines.

## Which version to use

- Default to OCSF 1.9: `metadata.version` is `1.9.0`, the version `https://schema.ocsf.io/api/version` returns.
- Emit OCSF 1.8 only for a named consumer (a SIEM or data lake) that cannot ingest 1.9 yet. A 1.8 mapping cannot use User Management (3007) or Role Management (3008).
- Treat events written for OCSF 1.0 to OCSF 1.7 as input to an upgrade. Because 1.x minors are backwards compatible, an older event usually still validates against 1.9, with `version_earlier` and deprecation warnings.
- Never emit OCSF 1.10.0-dev: see [Preview](#preview-ocsf-1100-dev).

## What changed

Each entry cites the CHANGELOG section for that release and the pull request number. Only the changes that matter for audit-log mapping are listed in full; read the CHANGELOG for the rest.

### OCSF 1.9

- Added the `user_management` (3007) and `role_management` (3008) classes, the `iam_role` object, and `updated_user`, `updated_role`, `updated_group` attributes (CHANGELOG v1.9.0, Added, #1603).
- Deprecated the `account_change` (3001) and `user_access_management` (3005) classes in favour of `user_management`, and `user_result` in favour of `updated_user` (CHANGELOG v1.9.0, Deprecated, #1603).
- Deprecated `resource` in Group Management in favour of `resources`, and `user` in favour of `users` (Deprecated, #1603, #1666).
- Deprecated `app_name` and `app_uid` on `actor` in favour of the `application` object (Deprecated, #1702).
- Added the `record_integrity` profile and `attestation` object for signed, chained events, the `ai_agent` object, and the `delegation` object on the `ai_operation` profile (Added, #1661, #1641, #1665).
- Every `@deprecated` annotation now carries a machine-readable `superseded_by` field (Misc, #1707).

### OCSF 1.8

- Added the `ai_operation` profile with the `ai_model` and `message_context` objects (CHANGELOG v1.8.0, Added, #1488).
- Added the `token` object and `api.token` for API tokens and keys (Added, #1429).
- Removed the regex constraint on `file_hash_t`, listed as a breaking change for some tooling (Breaking changes, #1564).
- Moved `auid`, `egid` and `euid` from the `linux` extension into the base dictionary (Improved, Dictionary Attributes, #1538).
- Deprecated `file.signature` in favour of `file.signatures` (Deprecated, #1546).

### OCSF 1.7

- Added the Peripheral Activity class and the `reporter`, `function_invocation` and `parameter` objects (CHANGELOG v1.7.0, Added, #1471, #1476, #1497).
- Added `source`, `type`, `log_source`, `original_event_uid`, `log_format` and `transmit_time` to `metadata` (Improved, Objects, #1483).

### OCSF 1.6

- Added the IAM Analysis Finding class (CHANGELOG v1.6.0, Added, #1389).
- Deprecated `user.credential_uid` in favour of `programmatic_credentials`, and `account.type_id` values 3 and 4 in favour of `user.type_id` (Deprecated, #1389).

### OCSF 1.5

- Added the Application Security Posture Finding and Live Evidence Info classes (CHANGELOG v1.5.0, Added, #1357, #1382).
- Deprecated the Device Config State class in favour of Compliance Finding, and `resource` in `user_access` in favour of `resources` (Deprecated, #1369, #1374).

### OCSF 1.4

- Added the Unmanned Systems category, and the OSINT Inventory Info, Script Activity, Startup Item Query, Drone Flights Activity, Cloud Resources Inventory Info, Airborne Broadcast Activity and Application Error classes (CHANGELOG v1.4.0, Added).
- Added the `incident` profile (Added, #1293).
- Deprecated `product_uid` in favour of the `product` object, `policy` in favour of `policies` in Account Change, and `email_file_activity` and `email_url_activity` in favour of `email_activity` (Deprecated, #1271, #1282, #1259).

### OCSF 1.3

- Added the Remediation category, the Event Log Activity class and the `osint` profile (CHANGELOG v1.3.0, Added, #1066, #1014, #992).

### OCSF 1.2

- Added the Data Security Finding class and the `data_classification` profile (CHANGELOG v1.2.0, Added, #953, #998).
- Deprecated `actor.invoked_by` in favour of `app_name` (Deprecated, #979).

### OCSF 1.1

- Added the User Inventory Info class and the Network Proxy profile (CHANGELOG v1.1.0, Added, #667, #705).
- Deprecated the Security Finding class in favour of Vulnerability, Compliance, Detection and Incident Finding, the `finding` object in favour of `finding_info`, and `http_status` in favour of `http_response.code` (Deprecated, #877, #769, #767).
- Changed the data type of `type_uid` from `int_t` to `long_t` (Misc, #928).

### OCSF 1.0

- The initial release of OCSF (CHANGELOG v1.0.0).

## Upgrading

The schema server validates against any hosted version at `POST https://schema.ocsf.io/<version>/api/v2/validate`, for example `/1.8.0/api/v2/validate`. Validating an older event against a newer schema adds a `version_earlier` warning and deprecation warnings such as `class_deprecated`, each with the release that deprecated it in `since`.

### 1.8 to 1.9

1. Change the version marker: set `metadata.version` to `1.9.0`.
2. Replace deprecated classes and attributes. Map Account Change (3001) and User Access Management (3005) events to User Management (3007) and recompute `type_uid` as `class_uid * 100 + activity_id` with the 3007 activity IDs in [`classes.md`](classes.md#user-management-3007). Move role definitions and permission changes to Role Management (3008). Replace `user_result` with `updated_user`, Group Management `resource` with `resources` and `user` with `users`, and `actor.app_name` or `actor.app_uid` with `actor.application`.
3. Validate against the target: `POST https://schema.ocsf.io/1.9.0/api/v2/validate` returns `error_count: 0` and no `class_deprecated` or `version_earlier` warning.
4. Keep behaviour unchanged: the same source event still produces one OCSF event with the same actor, target, outcome and time, and downstream queries that filtered on 3001 or 3005 are updated to 3007.

### Any 1.x minor to a later 1.x minor

Use this for OCSF 1.0 to OCSF 1.7 events, one release at a time or in one step.

1. Change the version marker: set `metadata.version` to the target release, for example `1.9.0`.
2. Replace deprecated items: for every release between the source and the target, read the CHANGELOG `Deprecated` section and move each mapping to the named replacement. From 1.9.0 the schema's `superseded_by` field names it, and the validator's deprecation warnings point to it.
3. Validate against the target with `POST https://schema.ocsf.io/<target>/api/v2/validate`, first plain and then with `missing_recommended=true`, until `error_count` is 0 and no deprecation warning remains.
4. Keep behaviour unchanged: compare a sample of events before and after, field by field, and record any value that moved to a new attribute.

## Preview: OCSF 1.10.0-dev

The schema server lists `1.10.0-dev` in `/api/versions` and serves it at `https://schema.ocsf.io/1.10.0-dev/api/`, while `/api/version` still returns `1.9.0`. Its content is the CHANGELOG's `Unreleased` section: `likelihood`, `likelihood_id` and `likelihood_score` on Detection Finding (#1715); `is_declared_incident` and `resolved_time` on findings (#1740); job progress attributes (#1722); `log_facility` on `metadata` and `logger` (#1720); ICMP fields on `network_connection_info` (#1719); and `related_events` and `finding_info` additions (#1744). Its bug fixes raise optional attributes that take part in `at_least_one` or `just_one` constraints, including `user.account`, to recommended (#1766, #1767), and tighten the `ip_t` and `email_t` regexes (#1769).

Posture: track. Do not emit `metadata.version` `1.10.0-dev`, and do not use attributes that exist only in it. Validating a 1.9.0 event against `1.10.0-dev` is a useful early warning: values that pass 1.9.0 but fail the stricter regexes are already wrong.

When 1.10.0 is released: make OCSF 1.10 current and `1.10` its id, make OCSF 1.9 supported and OCSF 1.8 legacy, move the Unreleased entries into a "What changed" section, and add a 1.9 to 1.10 upgrade section.
