# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id    | Line                   | Status  | Revision                                                                                                    | Posture | Summary                                                                         |
| ----- | ---------------------- | ------- | ----------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------- |
| `tap` | Trusted Agent Protocol | current | Merchant Specifications page read 2026-10-06 (unversioned); repository README at commit 16d59bd, 2025-10-28 |         | Agent recognition signature, consumer recognition object and payment container. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

Visa does not number the Trusted Agent Protocol specification. Treat the Merchant Specifications page as one living line and re-read it when refreshing this skill. The message signature itself follows RFC 9421; install the `http-message-signatures` and `web-bot-auth` skills for that layer.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
