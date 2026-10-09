# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                           | Line                       | Status  | Revision                           | Posture | Summary                                                                                             |
| ---------------------------- | -------------------------- | ------- | ---------------------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| `kubernetes-api-conventions` | Kubernetes API conventions | current | main at commit 3bc2da6, 2026-10-06 |         | Living convention document; the repository has no numbered releases, so the commit is the revision. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The conventions are a single living document without release numbers. Pin the commit in [Sources](../SKILL.md#sources) and re-read it when refreshing; API versions of individual resources (v1alpha1, v1beta1, v1) are a separate topic covered by the API changes guide.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
