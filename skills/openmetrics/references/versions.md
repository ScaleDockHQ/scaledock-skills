# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                        | Line            | Status  | Revision                                                                     | Posture | Summary                                                                                                                                            |
| ------------------------- | --------------- | ------- | ---------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openmetrics`             | OpenMetrics 1.0 | current | 1.0 (draft-richih-opsawg-openmetrics-01), main at commit 42cbeb6             |         | Released format: content type `application/openmetrics-text; version=1.0.0`. Producers default to it unless the ingestor asks for another version. |
| `openmetrics-2.0-preview` | OpenMetrics 2.0 | preview | 2.0.0-rc0 (Experimental, March 2026), prometheus/docs main at commit 605cf81 | track   | Experimental release candidate of the next major version (`version=2.0.0`); read it to plan ahead, do not emit it by default.                      |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

OpenMetrics 1.0 is the only released line. The 2.0 draft is marked Experimental by its authors; read it to plan ahead, but do not emit `version=2.0.0` while its posture is track. The Prometheus text exposition format 0.0.4 is a separate, older format.

## Upgrading

From the Prometheus text format 0.0.4 to OpenMetrics 1.0: send the OpenMetrics content type (Text format § Overall Structure), end every exposition with `# EOF`, add the `_total` suffix to counter samples (Text format § Counter) and keep units as a name suffix (Data Model § Unit). Re-check the OpenMetrics 2.0 draft before adopting it; it is a preview.
