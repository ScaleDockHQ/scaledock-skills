# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                 | Line                           | Status    | Revision                                                             | Posture | Summary                                                                                                                          |
| ------------------ | ------------------------------ | --------- | -------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `refeds-mfa-2-0`   | REFEDS MFA Profile 2.0         | current   | Version 2.0, published at refeds.org/profile/mfa (text not pinned)   |         | General MFA (the 1.2 semantics) plus Phishing-Resistant MFA. Only the General MFA rules are pinned here.                         |
| `refeds-mfa-1-2`   | REFEDS MFA Profile 1.2         | supported | Version 1.2, final 2023-09-26                                        |         | Pinned text for https://refeds.org/profile/mfa; 2.0 keeps these semantics.                                                       |
| `refeds-sfa-1-0`   | REFEDS SFA Profile 1.0         | current   | Version 1.0, 2018-08-28                                              |         | Single-factor authentication context https://refeds.org/profile/sfa.                                                             |
| `refeds-raf-2-0`   | REFEDS Assurance Framework 2.0 | current   | Version 2.0, 2023-12-05                                              |         | Identifier uniqueness, IAP, ATP and the cappuccino and espresso profiles, signalled with https://refeds.org/assurance/version/2. |
| `refeds-raf-1-0`   | REFEDS Assurance Framework 1.0 | supported | Version 1.0                                                          |         | Still accepted; RAF 2.0 claims are expressed the same way, without the version 2 value.                                          |
| `sirtfi-2-0`       | Sirtfi 2.0                     | current   | Version 2.0, published at refeds.org/sirtfi (text not pinned)        |         | Current Sirtfi framework; read it on refeds.org before attesting.                                                                |
| `sirtfi-1-0`       | Sirtfi 1.0                     | supported | Version 1.0, 2015-12-14                                              |         | Pinned text; v1 and v2 attestations coexist in metadata.                                                                         |
| `refeds-rands-1-3` | Research and Scholarship 1.3   | current   | Version 1.3, 2016-09-16                                              |         | Entity category http://refeds.org/category/research-and-scholarship.                                                             |
| `refeds-access-v2` | Access entity categories v2    | current   | Personalized and Pseudonymous v2 2023-02-13, Anonymous v2 2021-03-15 |         | https://refeds.org/category/personalized, /pseudonymous and /anonymous.                                                          |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

Each REFEDS document has its own version line. MFA 2.0 and Sirtfi 2.0 are published on refeds.org, which this repo cannot fetch; their lines are listed, but the pinned rules come from MFA 1.2 and Sirtfi 1.0. The [REFEDS MFA wiki page](https://wiki.refeds.org/spaces/PRO/pages/22544394/MFA) states that the website text is authoritative and lists 1.2 as the previous version.

## Upgrading

MFA 1.2 to 2.0: keep https://refeds.org/profile/mfa for General MFA; read the 2.0 text on refeds.org before requesting or asserting Phishing-Resistant MFA. RAF 1.0 to 2.0: meet the process-based IAP criteria in RAF 2.0 § 5.2.1 and also release https://refeds.org/assurance/version/2.
