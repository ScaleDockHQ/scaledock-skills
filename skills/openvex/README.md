# openvex

An agent skill for OpenVEX v0.2.0: write, validate and consume VEX documents that tell scanners whether a product is affected by a vulnerability, and upgrade from OpenVEX v0.0.2.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openvex
```

Then ask your agent to "write an OpenVEX statement that CVE-2023-12345 does not affect our image" or "attest our VEX document with in-toto".

## What it covers

- The document and statement fields, the product, component and vulnerability structs, and purl, CPE and hash identifiers.
- The four status labels, the five `not_affected` justifications, and impact, action and status notes.
- Timestamp and product inheritance, and updating or merging documents without changing older statements.
- Validation against the OpenVEX JSON Schema, and where the spec text, examples and schema disagree.
- Embedding OpenVEX as an in-toto attestation predicate, signing, and how consumers apply statements.
- How OpenVEX fields map to the CISA Minimum Requirements for VEX.

## Versions

| Line           | Status                |
| -------------- | --------------------- |
| OpenVEX v0.2.0 | current               |
| OpenVEX v0.0.2 | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them. No newer draft exists yet.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OpenVEX Specification](https://github.com/openvex/spec/blob/main/OPENVEX-SPEC.md): draft specification, v0.2.0 at commit 61b5f88.
- [OpenVEX spec releases](https://github.com/openvex/spec/releases): v0.2.0 latest (2023-08-22).
- [OpenVEX Specification v0.0.2](https://github.com/openvex/spec/blob/v0.0.2/OPENVEX-SPEC.md): released, superseded.
- [Attesting OpenVEX Documents](https://github.com/openvex/spec/blob/main/ATTESTING.md): draft, commit 61b5f88.
- [OpenVEX JSON Schema](https://github.com/openvex/spec/blob/main/openvex_json_schema.json) and [JSON-LD context v0.2.0](https://github.com/openvex/spec/blob/main/ns/v0.2.0/context.json): commit 61b5f88.
- [openvex.dev](https://openvex.dev): project site.
- [OPEV-0014](https://github.com/openvex/community/blob/main/enhancements/opev-0014.md) and [OPEV-0015](https://github.com/openvex/community/blob/main/enhancements/opev-0015.md): accepted enhancements behind v0.2.0.
- [CISA Minimum Requirements for VEX](https://www.cisa.gov/sites/default/files/2023-04/minimum-requirements-for-vex-508c.pdf): version 1.0.0, April 2023.

## License

MIT
