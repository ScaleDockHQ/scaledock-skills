# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                   | Line                   | Status    | Revision                                                         | Posture | Summary                                                                    |
| -------------------- | ---------------------- | --------- | ---------------------------------------------------------------- | ------- | -------------------------------------------------------------------------- |
| `matter-1-6`         | Matter 1.6             | current   | data_model/1.6.1, spec tag 1.6.1-attempt-4, spec sha 49f70c101b  |         | Latest released data model; SDK release v1.6.1.0 (2026-09-25).             |
| `matter-1-5`         | Matter 1.5             | supported | data_model/1.5.1, spec tag 1.5.1, spec sha aaf6d680e3            |         | Previous release data model; validate devices that declare 1.5 against it. |
| `matter-1-4`         | Matter 1.4             | supported | data_model/1.4.2, spec tag 1.4.2-mve-1, spec sha e2c3ff019a      |         | Earlier release data model; validate devices that declare 1.4 against it.  |
| `matter-1-3`         | Matter 1.3 and earlier | legacy    | data_model/1.0 to 1.3                                            |         | Read only to support older devices; do not build new devices against them. |
| `matter-1-7-preview` | Matter 1.7             | preview   | data_model/1.7, spec tag 0.9-1.7-winter2027, spec sha 214e40c9d5 | track   | Draft data model for the next release; watch it, do not ship it.           |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

A device states its version in the Basic Information `SpecificationVersion` attribute. The SDK test harness maps that value to a `data_model/<version>` directory, so validate a device against the directory of the version it declares.

## Upgrading

Between versions, compare the cluster `revision` attribute and its `revisionHistory` in the XML; each revision entry summarises what changed (for example Basic Information revision 4: "Updated conformance for UniqueID to mandatory").
