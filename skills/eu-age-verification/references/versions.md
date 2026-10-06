# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                 | Line                           | Status  | Revision                   | Posture | Summary                                                                              |
| ------------------ | ------------------------------ | ------- | -------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `eu-av-2026-09-02` | EU Age Verification 2026-09-02 | current | commit 8b97287, 2026-09-02 | build   | Main branch: ZKP presentation preferred, plain ISO mDoc as fallback, batch issuance. |
| `eu-av-1-0-6`      | EU Age Verification v1.0.6     | legacy  | tag v1.0.6, 2025-07-10     |         | Last tagged release; predates the zero-knowledge proof profile in Annex A § A.8.     |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The repository's last tag is v1.0.6 (2025-07-10). The text has kept changing on `main` since, including the zero-knowledge proof mechanism, so the current line is the pinned commit. It is a pilot blueprint, so its posture is build: implement it, and re-read the repository before release.

## Upgrading

From v1.0.6 to 2026-09-02: support the zero-knowledge proof presentation in Annex A § A.8 as the preferred mechanism, keep plain ISO mDoc as the fallback that § A.6 allows, and make relying parties verify both.
