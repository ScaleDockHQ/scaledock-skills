# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                   | Line       | Status    | Revision                                                                 | Posture | Publisher                   |
| -------------------- | ---------- | --------- | ------------------------------------------------------------------------ | ------- | --------------------------- |
| `fhir-r5`            | FHIR R5    | current   | FHIR R5, fetched 2026-10-06 (Standard, 2026-10-06)                       |         | Standard 2026-10-06         |
| `fhir-r4`            | FHIR R4    | supported | FHIR R4, fetched 2026-10-06 (Standard, 2026-10-06)                       |         | Standard 2026-10-06         |
| `fhir-r4b`           | FHIR R4B   | supported | FHIR R4B, fetched 2026-10-06 (Standard, 2026-10-06)                      |         | Standard 2026-10-06         |
| `fhir-draft-preview` | FHIR draft | preview   | FHIR continuous build, fetched 2026-10-06 (Continuous build, 2026-10-06) | track   | Continuous build 2026-10-06 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### FHIR R5

- Publisher status on 2026-10-06: Standard (2026-10-06).
- Pinned text: https://www.hl7.org/fhir/R5/
- Revision token: FHIR R5, fetched 2026-10-06 (Standard, 2026-10-06)

### FHIR R4

- Publisher status on 2026-10-06: Standard (2026-10-06).
- Pinned text: https://www.hl7.org/fhir/R4/
- Revision token: FHIR R4, fetched 2026-10-06 (Standard, 2026-10-06)

### FHIR R4B

- Publisher status on 2026-10-06: Standard (2026-10-06).
- Pinned text: https://www.hl7.org/fhir/R4B/
- Revision token: FHIR R4B, fetched 2026-10-06 (Standard, 2026-10-06)

### FHIR draft

- Publisher status on 2026-10-06: Continuous build (2026-10-06).
- Pinned text: https://build.fhir.org/
- Revision token: FHIR continuous build, fetched 2026-10-06 (Continuous build, 2026-10-06)

## Upgrading

### fhir-r4 to fhir-r5

1. Treat documents that cite FHIR R4 (FHIR R4, fetched 2026-10-06 (Standard, 2026-10-06)) as input.
2. Re-read FHIR R5 at https://www.hl7.org/fhir/R5/.
3. Keep behavior that FHIR R5 still requires, and replace behavior that only FHIR R4 required.
4. Record the target revision on the artifact.

### fhir-r4b to fhir-r5

1. Treat documents that cite FHIR R4B (FHIR R4B, fetched 2026-10-06 (Standard, 2026-10-06)) as input.
2. Re-read FHIR R5 at https://www.hl7.org/fhir/R5/.
3. Keep behavior that FHIR R5 still requires, and replace behavior that only FHIR R4B required.
4. Record the target revision on the artifact.

## Preview: FHIR draft

`fhir-draft-preview` is a Continuous build dated 2026-10-06, pinned at https://build.fhir.org/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
