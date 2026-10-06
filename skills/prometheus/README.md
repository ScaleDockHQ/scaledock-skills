# prometheus

An agent skill for Prometheus.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill prometheus
```

Then ask the agent to apply Prometheus.

## What it covers

- when exposing Prometheus metrics or using remote write
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                          | Status  |
| ----------------------------- | ------- |
| Prometheus exposition formats | current |
| Prometheus remote write 2.0   | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Prometheus exposition formats](https://prometheus.io/docs/instrumenting/exposition_formats/): Documentation, Prometheus exposition formats, fetched 2026-10-06 (Documentation, 2026-10-06).
- [Prometheus remote write 2.0](https://prometheus.io/docs/specs/remote_write_spec_2_0/): Specification, Prometheus remote write 2.0, fetched 2026-10-06 (Specification, 2026-10-06).

## License

MIT
