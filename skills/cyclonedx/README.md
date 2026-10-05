# cyclonedx

An agent skill for OWASP CycloneDX, the Bill of Materials standard published as ECMA-424, targeting CycloneDX 1.7 (ECMA-424 2nd edition) with support for 1.6 and upgrades from 1.5, 1.4 and 1.0-1.3: producing, validating, signing and consuming SBOMs, SaaSBOMs, HBOMs, CBOMs, ML-BOMs, OBOMs, MBOMs, VDRs and VEX documents.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill cyclonedx
```

Then ask your agent to "generate a CycloneDX 1.7 SBOM in CI and validate it" or "write a CycloneDX VEX for this CVE".

## What it covers

- The BOM object model: metadata, components, services, dependencies, compositions, vulnerabilities, formulation, annotations, declarations, definitions, citations and properties.
- BOM types (SBOM, SaaSBOM, HBOM, CBOM, ML-BOM, OBOM, MBOM, BOV, VDR, VEX, CDXA) and lifecycle phases.
- Identifiers: purl, CPE, SWID, OmniBOR, SWHID, hashes, `bom-ref` and BOM-Link (`urn:cdx:`), external references, media types and file names.
- Vulnerabilities with VEX analysis states, justifications and responses, inline or as a standalone VEX linked by BOM-Link.
- Validation against the JSON Schema, XSD and Protobuf schema, the semantic checks schemas miss, and JSF signing and verification.
- Producing BOMs in CI and consuming them as a conformant consumer.
- What changed in each version and checklists to upgrade between them.

## Versions

| Line                | Status                |
| ------------------- | --------------------- |
| CycloneDX 2.0 draft | preview (track)       |
| CycloneDX 1.7       | current               |
| CycloneDX 1.6       | supported             |
| CycloneDX 1.5       | legacy (upgrade from) |
| CycloneDX 1.4       | legacy (upgrade from) |
| CycloneDX 1.0-1.3   | legacy (upgrade from) |

`references/versions.md` says which version to use and how to upgrade between them. ECMA-424 1st edition (June 2024) is CycloneDX 1.6; the 2nd edition (December 2025) is CycloneDX 1.7.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [ECMA-424](https://ecma-international.org/publications-and-standards/standards/ecma-424/): Ecma Standard, 2nd edition (December 2025) and 1st edition (June 2024).
- [CycloneDX specification](https://github.com/CycloneDX/specification/releases): schemas at tags 1.7.2, 1.6.2 and 1.5.1, and the release notes of every version.
- [CycloneDX Specification Overview](https://cyclonedx.org/specification/overview/), [v1.7 JSON Reference](https://cyclonedx.org/docs/1.7/json/), and the [BOM-Link](https://cyclonedx.org/capabilities/bomlink/), [VEX](https://cyclonedx.org/capabilities/vex/) and [VDR](https://cyclonedx.org/capabilities/vdr/) pages.
- [JSF: JSON Signature Format](https://cyberphone.github.io/doc/security/jsf.html): version 0.82.
- [CycloneDX CLI](https://github.com/CycloneDX/cyclonedx-cli): v0.33.1.
- [CycloneDX 2.0 schemas](https://github.com/CycloneDX/specification/tree/2.0-dev/schema/2.0): `2.0-dev` branch, tracked.

## License

MIT
