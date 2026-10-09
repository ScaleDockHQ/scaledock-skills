# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id        | Line    | Status  | Revision                                                                         | Posture | Summary                                                                                                                         |
| --------- | ------- | ------- | -------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `tcf-2.2` | TCF 2.2 | current | TCF v2 specifications at commit 703fc29 (2026-07-28), policy version 4 and later |         | TC String version 2 with policy version 4 or later; the Disclosed Vendors segment is mandatory since the 2.3 document revision. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The line is named after TCF 2.2, the framework release that set the policy version to 4. The pinned documents carry later revisions of the same v2 string format: document revision 2.3 (April 2025) made the Disclosed Vendors segment mandatory, and 2.4 (May 2026) added `StandardTexts` to the Global Vendor List. TCF v1.1 is deprecated and has no line here.

## Upgrading

From TC Strings created before the 2.3 document revision: add the Disclosed Vendors segment, and stop setting the Legitimate Interest bit for vendors that only declare Special Purposes (the consent string spec removed that workaround as of April 2026). From policy version 3: the consent string spec says a TC String with a policy version below 4 created after 30 September 2023 is invalid.
