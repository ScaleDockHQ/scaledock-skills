# OCSF 1.9.0 categories, classes and activities

Source: the schema server API for 1.9.0 (`/api/1.9.0/categories`, `/api/1.9.0/classes/{name}`) and the 1.9.0 release notes. Check the schema server for the full list before mapping a class not shown here.

## Categories

| `category_uid` | Category                     | Class UIDs                                                                                                                                                                                                                  |
| -------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1              | System Activity              | 1001 to 1012                                                                                                                                                                                                                |
| 2              | Findings                     | 2001 Security Finding, 2002 Vulnerability Finding, 2003 Compliance Finding, 2004 Detection Finding, 2005 Incident Finding, 2006 Data Security Finding, 2007 Application Security Posture Finding, 2008 IAM Analysis Finding |
| 3              | Identity & Access Management | 3001 to 3008, below                                                                                                                                                                                                         |
| 4              | Network Activity             | 4001 to 4014, including 4002 HTTP Activity                                                                                                                                                                                  |
| 5              | Discovery                    | See `/api/1.9.0/categories`                                                                                                                                                                                                 |
| 6              | Application Activity         | 6001 to 6008, below                                                                                                                                                                                                         |
| 7              | Remediation                  | See `/api/1.9.0/categories`                                                                                                                                                                                                 |
| 8              | Unmanned Systems             | See `/api/1.9.0/categories`                                                                                                                                                                                                 |

## Identity & Access Management (category 3)

| `class_uid` | Class                  | Status in 1.9.0                                                 |
| ----------- | ---------------------- | --------------------------------------------------------------- |
| 3001        | Account Change         | Deprecated since 1.9.0: "Use the user_management class instead" |
| 3002        | Authentication         | Current                                                         |
| 3003        | Authorize Session      | Current                                                         |
| 3004        | Entity Management      | Current                                                         |
| 3005        | User Access Management | Deprecated since 1.9.0: "Use the user_management class instead" |
| 3006        | Group Management       | Current                                                         |
| 3007        | User Management        | New in 1.9.0                                                    |
| 3008        | Role Management        | New in 1.9.0                                                    |

### Authentication (3002)

Required: `user`. Constraint: `at_least_one` of `service` or `dst_endpoint`. Recommended include `actor`, `src_endpoint`, `session`, `auth_protocol_id`, `is_mfa`, `logon_type_id` and `is_remote`.

| `activity_id` | Activity               |
| ------------- | ---------------------- |
| 0             | Unknown                |
| 1             | Logon                  |
| 2             | Logoff                 |
| 3             | Authentication Ticket  |
| 4             | Service Ticket Request |
| 5             | Service Ticket Renew   |
| 6             | Preauth                |
| 7             | Account Switch         |
| 99            | Other                  |

`auth_protocol_id`: 1 NTLM, 2 Kerberos, 3 Digest, 4 OpenID, 5 SAML, 6 OAUTH 2.0, 7 PAP, 8 CHAP, 9 EAP, 10 RADIUS, 11 Basic Authentication, 12 LDAP, 99 Other (set `auth_protocol`, for example `"Password"`).

### Authorize Session (3003)

Required: `user`. Constraint: `at_least_one` of `privileges`, `groups` or `iam_roles`. The class associates `session` with `user`.

| `activity_id` | Activity          |
| ------------- | ----------------- |
| 1             | Assign Privileges |
| 2             | Assign Groups     |
| 3             | Assign Roles      |

### User Management (3007)

Required: `user`. Recommended include `actor`, `iam_roles`, `privileges`, `policies`, `updated_user` and `resources`.

| `activity_id` | Activity                        |
| ------------- | ------------------------------- |
| 1             | Create                          |
| 2             | Update                          |
| 3             | Delete                          |
| 4             | Enable                          |
| 5             | Disable                         |
| 6             | Lock                            |
| 7             | Unlock                          |
| 8             | Password Change                 |
| 9             | Password Reset                  |
| 10            | Attach Policies                 |
| 11            | Detach Policies                 |
| 12            | Enable MFA Factors              |
| 13            | Disable MFA Factors             |
| 14            | Assign Privileges               |
| 15            | Remove Privileges               |
| 16            | Assign Roles                    |
| 17            | Remove Roles                    |
| 18            | Add Programmatic Credentials    |
| 19            | Remove Programmatic Credentials |

### Role Management (3008)

Required: `iam_role`. Activities: 1 Create, 2 Update, 3 Delete, 4 Assign Privileges, 5 Remove Privileges, 6 Assign Resources, 7 Remove Resources, 8 Attach Policies, 9 Detach Policies, 10 and 11 add and remove programmatic credentials.

### Entity Management (3004)

Required: `entity`. Activities 1 to 13: Create, Read, Update, Delete, Move, Enroll, Unenroll, Enable, Disable, Activate, Deactivate, Suspend, Resume.

## Application Activity (category 6)

| `class_uid` | Class                        |
| ----------- | ---------------------------- |
| 6001        | Web Resources Activity       |
| 6002        | Application Lifecycle        |
| 6003        | API Activity                 |
| 6004        | Web Resource Access Activity |
| 6005        | Datastore Activity           |
| 6006        | File Hosting Activity        |
| 6007        | Scan Activity                |
| 6008        | Application Error            |

### API Activity (6003)

Required: `actor`, `api` (with `api.operation` required) and `src_endpoint`. Recommended include `resources`, `http_request` and `http_response`. Activities: 1 Create, 2 Read, 3 Update, 4 Delete.

## Mapping application audit events

| Audit event                                    | Class                  | `activity_id`    | `type_uid`             |
| ---------------------------------------------- | ---------------------- | ---------------- | ---------------------- |
| Sign-in succeeded or failed                    | Authentication 3002    | 1 Logon          | 300201                 |
| Sign-out                                       | Authentication 3002    | 2 Logoff         | 300202                 |
| Switch account or impersonate                  | Authentication 3002    | 7 Account Switch | 300207                 |
| Session granted roles or privileges at sign-in | Authorize Session 3003 | 1, 2 or 3        | 300301 to 300303       |
| User created, disabled, deleted                | User Management 3007   | 1, 5, 3          | 300701, 300705, 300703 |
| Password reset, MFA enrolled                   | User Management 3007   | 9, 12            | 300709, 300712         |
| Role assigned to or removed from a user        | User Management 3007   | 16, 17           | 300716, 300717         |
| API token issued or revoked for a user         | User Management 3007   | 18, 19           | 300718, 300719         |
| Role defined or its permissions changed        | Role Management 3008   | 1, 4, 5          | 300801, 300804, 300805 |
| API call that changes a resource               | API Activity 6003      | 1 to 4           | 600301 to 600304       |

Use `status_id` 1 Success or 2 Failure for the outcome rather than a different class. A failed sign-in is still Authentication with `activity_id` 1.
