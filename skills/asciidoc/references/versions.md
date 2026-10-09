# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id         | Line     | Status  | Revision                                                                             | Posture | Summary                                                                                       |
| ---------- | -------- | ------- | ------------------------------------------------------------------------------------ | ------- | --------------------------------------------------------------------------------------------- |
| `asciidoc` | AsciiDoc | current | AsciiDoc Language documentation, pre-spec (asciidoc-lang commit 68ed0b2, 2026-08-22) |         | The AsciiDoc language as documented before the first AsciiDoc Language Specification release. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The Eclipse AsciiDoc Language project is writing a formal specification; its documentation is labelled "pre-spec" until then. Asciidoctor implements the documented language. Re-check the asciidoc-lang repository for a released specification when refreshing.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
