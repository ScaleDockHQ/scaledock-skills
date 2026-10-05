# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the spec text of each line and the publisher's release notes, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id            | Line        | Status  | Revision           | Posture | Summary                      |
| ------------- | ----------- | ------- | ------------------ | ------- | ---------------------------- |
| `2.0-preview` | My Spec 2.0 | preview | draft, YYYY-MM-DD  | track   | What the next line is about. |
| `1.1`         | My Spec 1.1 | current | 1.1.0 (YYYY-MM-DD) |         | The default target.          |
| `1.0`         | My Spec 1.0 | legacy  | 1.0.0 (YYYY-MM-DD) |         | Superseded by 1.1.           |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

## Which version to use

- Default to the current line, at its latest patch.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

## What changed

### My Spec 1.1

- A change, with the section that defines it (§ 4.2).

## Upgrading

### 1.0 to 1.1

1. Change the version marker.
2. Replace removed or renamed fields.
3. Validate against the 1.1 schema or conformance rules.
4. Keep behaviour unchanged: an upgrade that validates but means something else is a regression.

## Preview: My Spec 2.0

What the draft contains today, its posture, what must not be emitted, and where to watch for movement. When it ships: make it current, make the old current line supported (or legacy), and add an upgrade section.
