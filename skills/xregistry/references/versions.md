# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                  | Line              | Status  | Revision                                                      | Posture | Summary                                                                                  |
| ------------------- | ----------------- | ------- | ------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `xregistry-1.0-rc4` | xRegistry 1.0-rc4 | current | 1.0-rc4 (tagged v1.0-rc4, 2026-08-19), main at commit 508cd27 | build   | Fourth release candidate of 1.0 and the only published line; `specversion` is `1.0-rc4`. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

xRegistry has no final 1.0 yet; 1.0-rc4 is the newest release candidate (rc1 2025-04, rc2 2025-06, rc3 2026-06, rc4 2026-08). Earlier release candidates are superseded and are not targets. Build against rc4 and set `specversion` to `1.0-rc4`. The HTTP binding (`core/http.md`) and model format (`core/model.md`) are companion documents and are not quoted here.

## Upgrading

From an earlier release candidate to 1.0-rc4: update `specversion` and the `specversions` capability to `1.0-rc4`, then re-check the `epoch`, `xid` and `defaultversionid` rules quoted in [`requirements.md`](requirements.md).
