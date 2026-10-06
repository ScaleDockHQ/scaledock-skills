# fhir

An agent skill for FHIR.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill fhir
```

Then ask the agent to apply FHIR.

## What it covers

- when exchanging healthcare data
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line       | Status          |
| ---------- | --------------- |
| FHIR R5    | current         |
| FHIR R4    | supported       |
| FHIR R4B   | supported       |
| FHIR draft | preview (track) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [FHIR R5](https://www.hl7.org/fhir/R5/): Standard, FHIR R5, fetched 2026-10-06 (Standard, 2026-10-06).
- [FHIR R4](https://www.hl7.org/fhir/R4/): Standard, FHIR R4, fetched 2026-10-06 (Standard, 2026-10-06).
- [FHIR R4B](https://www.hl7.org/fhir/R4B/): Standard, FHIR R4B, fetched 2026-10-06 (Standard, 2026-10-06).
- [FHIR draft](https://build.fhir.org/): Continuous build, FHIR continuous build, fetched 2026-10-06 (Continuous build, 2026-10-06).

## License

MIT
