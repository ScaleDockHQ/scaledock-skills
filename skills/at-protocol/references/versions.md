# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id            | Line        | Status  | Revision                                                                     | Posture | Summary                                                                          |
| ------------- | ----------- | ------- | ---------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------- |
| `at-protocol` | AT Protocol | current | atproto.com/specs, bluesky-social/atproto-website commit 7937e9c, 2026-10-02 |         | The living specification set on atproto.com; the pages carry no version numbers. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The specification pages are revised in place and have no release numbers. Pin the website commit in [Sources](../SKILL.md#sources) and re-read the pages when refreshing. Versioned pieces live inside the pages: repositories are version 3, and Lexicon files declare `lexicon: 1`.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
