# OCSF 1.9.0 base attributes and core objects

Source: the schema server API for 1.9.0 (class and object definitions, attribute dictionary) and the white paper. Requirement flags are `required`, `recommended` and `optional`; the validator only reports missing recommended attributes when asked (white paper, requirement flags; schema API, `missing_recommended`).

## Base attributes

| Flag        | Attributes                                                                                                                                                                   |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Required    | `activity_id`, `category_uid`, `class_uid`, `metadata`, `severity_id`, `time`, `type_uid`                                                                                    |
| Recommended | `status_id`, `status`, `status_code`, `status_detail`, `message`, `timezone_offset`, `observables`, `action_id`, `disposition_id`, `is_alert`, `device`, `confidence_id`     |
| Optional    | `unmapped`, `raw_data`, `activity_name`, `class_name`, `category_name`, `type_name`, `count`, `duration`, `start_time`, `end_time`, `actor`, `api`, `enrichments` and others |

A class can raise an attribute's flag. For example API Activity makes `actor` and `src_endpoint` required.

## Rules for specific attributes

- `type_uid`: "Producers and mappers must compute this as class_uid * 100 + activity_id."
- `activity_id`: use 0 when the activity is unknown. 99 Other requires `activity_name`.
- `severity_id`: 0 Unknown, 1 Informational, 2 Low, 3 Medium, 4 High, 5 Critical, 6 Fatal, 99 Other.
- `status_id`: 0 Unknown, 1 Success, 2 Failure, 99 Other. Put the source's own status in `status` and a reason such as `invalid_password` in `status_detail`.
- `time`: the time the event occurred, as `timestamp_t` (milliseconds since the epoch). The Date/Time profile adds `datetime_t` (RFC 3339) siblings.
- `unmapped`: a container for source attributes that have no OCSF attribute. The preferred approach is a custom extension.
- Enum pairs: every `_id` enum has a string sibling (`activity_id` and `activity_name`, `status_id` and `status`). 0 is Unknown and 99 is Other; when 99 is used, the sibling string is required (white paper).

## Time attributes

The white paper separates four moments: `time` (the event occurred), `metadata.original_time` (the time as written in the source, unparsed), `metadata.logged_time` (the event was logged) and `metadata.processed_time` (the event was processed by a pipeline).

## `metadata`

| Flag        | Attributes                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Required    | `product`, `version`                                                                                                                       |
| Recommended | `tenant_uid`, `log_name`, `reporter`, `original_time`, `data_classification`                                                               |
| Optional    | `uid`, `original_event_uid`, `correlation_uid`, `profiles`, `extensions`, `logged_time`, `processed_time`, `sequence`, `labels` and others |

`version` is "the version of the OCSF schema, using Semantic Versioning". "Producers and mappers must populate metadata.product … and metadata.version."

## Objects used in audit events

| Object         | Constraint or key attributes                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| `product`      | `at_least_one` of `name`, `uid`; recommended `vendor_name`, `version`                                          |
| `user`         | `at_least_one` of `account`, `name`, `uid`; for example `email_addr`                                           |
| `actor`        | `at_least_one` of `process`, `user`, `iam_role`, `invoked_by`, `session`, `application`, `app_name`, `app_uid` |
| `iam_role`     | `at_least_one` of `name`, `uid`                                                                                |
| `src_endpoint` | network endpoint, for example `ip`                                                                             |
| `api`          | `operation` required; `request.uid` for the request ID                                                         |
| `session`      | `uid` for the session ID                                                                                       |

## Who is who

- `actor` is the party that performed the action. In User Management, an administrator assigning a role is the `actor.user`, and the account changed is `user`.
- In Authentication, `user` is the account signing in.
- In API Activity, `actor` is required: the caller.
