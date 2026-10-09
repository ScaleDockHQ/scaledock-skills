# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                   | Line       | Status    | Revision                                           | Posture | Summary                                                                                                              |
| -------------------- | ---------- | --------- | -------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `fhir-r5`            | FHIR R5    | current   | FHIR v5.0.0 (R5)                                   |         | Current release; the quoted requirements come from its pages.                                                        |
| `fhir-r4`            | FHIR R4    | supported | FHIR v4.0.1 (R4, mixed Normative and STU)          |         | Widely deployed release; still a valid target when a named server or regulation requires R4.                         |
| `fhir-r4b`           | FHIR R4B   | supported | FHIR v4.3.0 (R4B, STU)                             |         | Interim release between R4 and R5; target it only for a named consumer that needs it.                                |
| `fhir-draft-preview` | FHIR draft | preview   | FHIR continuous integration build (build.fhir.org) | track   | The next release under development; HL7 says it will be incorrect or inconsistent at times. Read it, do not emit it. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

Only the R5 pages are quoted. The R4, R4B and continuous build lines are pinned to their landing pages; when targeting one of them, read the same pages (http.html, references.html, search.html and so on) under that line's base URL, because the rules differ in detail between releases.

## Upgrading

From R4 or R4B to R5: re-read the R5 RESTful API, References and Search pages, re-check each resource against its R5 definition (several resources were renamed, split or restructured), and update the `fhirVersion` in the CapabilityStatement. Record the target release on the artifact.
