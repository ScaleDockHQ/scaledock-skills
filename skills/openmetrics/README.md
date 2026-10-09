# openmetrics

An agent skill for OpenMetrics: exposing and ingesting metrics in the OpenMetrics format.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openmetrics
```

Then ask your agent to apply OpenMetrics.

## What it covers

- OpenMetrics 1.0, the metrics exposition format now maintained by the Prometheus project, read from `specification/OpenMetrics.md` in the prometheus/OpenMetrics repository (the Internet-Draft source, draft-richih-opsawg-openmetrics-01). The OpenMetrics 2.0 draft published in the prometheus/docs repository is tracked as a preview.

## Versions

| Line            | Status  |
| --------------- | ------- |
| OpenMetrics 1.0 | current |
| OpenMetrics 2.0 | preview |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OpenMetrics 1.0 specification](https://raw.githubusercontent.com/prometheus/OpenMetrics/42cbeb674d91064a1ca5cab72741d87159064550/specification/OpenMetrics.md): Internet-Draft source (OpenMetrics 1.0), 1.0 (draft-richih-opsawg-openmetrics-01), main at commit 42cbeb6.
- [OpenMetrics 2.0 specification (draft)](https://raw.githubusercontent.com/prometheus/docs/605cf81fefc2e8e91f8ba89bb1555ae52a43a318/docs/specs/om/open_metrics_spec_2_0.md): Experimental, 2.0.0-rc0 (Experimental, March 2026), prometheus/docs main at commit 605cf81.

## License

MIT
