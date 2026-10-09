# fhir

An agent skill for FHIR: exchanging healthcare data as FHIR resources over the RESTful API.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill fhir
```

Then ask your agent to apply FHIR.

## What it covers

- HL7 FHIR (Fast Healthcare Interoperability Resources): the RESTful API, resource identity and metadata, references between resources, the JSON representation, base conformance rules and search, read from the FHIR R5 (v5.0.0) pages published by HL7.

## Versions

| Line       | Status    |
| ---------- | --------- |
| FHIR R5    | current   |
| FHIR R4    | supported |
| FHIR R4B   | supported |
| FHIR draft | preview   |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [FHIR R5: RESTful API](https://hl7.org/fhir/R5/http.html): Standard, FHIR v5.0.0 (R5).
- [FHIR R5: Resource](https://hl7.org/fhir/R5/resource.html): Standard, FHIR v5.0.0 (R5).
- [FHIR R5: References](https://hl7.org/fhir/R5/references.html): Standard, FHIR v5.0.0 (R5).
- [FHIR R5: JSON Representation](https://hl7.org/fhir/R5/json.html): Standard, FHIR v5.0.0 (R5).
- [FHIR R5: Conformance Rules](https://hl7.org/fhir/R5/conformance-rules.html): Standard, FHIR v5.0.0 (R5).
- [FHIR R5: Search](https://hl7.org/fhir/R5/search.html): Standard, FHIR v5.0.0 (R5).
- [FHIR R4](https://www.hl7.org/fhir/R4/): Standard, FHIR v4.0.1 (R4, mixed Normative and STU).
- [FHIR R4B](https://www.hl7.org/fhir/R4B/): Standard, FHIR v4.3.0 (R4B, STU).
- [FHIR draft](https://build.fhir.org/): Continuous build, FHIR continuous integration build (build.fhir.org).

## License

MIT
