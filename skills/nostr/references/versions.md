# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id       | Line   | Status  | Revision                                               | Posture | Summary                                               |
| -------- | ------ | ------- | ------------------------------------------------------ | ------- | ----------------------------------------------------- |
| `nip-01` | NIP-01 | current | NIP-01, nostr-protocol/nips commit a79e21d, 2026-10-05 |         | The basic protocol every client and relay implements. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

NIPs have no version numbers; NIP-01 is edited in place in the nostr-protocol/nips repository. Pin the commit in [Sources](../SKILL.md#sources) and diff 01.md against it when refreshing.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
