# owasp-scvs

An agent skill for OWASP SCVS: verifying software components, SBOMs, build pipelines and package management against the OWASP Software Component Verification Standard.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-scvs
```

Then ask your agent to apply OWASP SCVS.

## What it covers

- The OWASP Software Component Verification Standard (SCVS) 1.0: verification requirements V1 to V6 (inventory, SBOM, build environment, package management, component analysis, pedigree and provenance), read from the project's Markdown source at the 1.0 release tag.

## Versions

| Line       | Status  |
| ---------- | ------- |
| OWASP SCVS | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [V1: Inventory](https://raw.githubusercontent.com/OWASP/Software-Component-Verification-Standard/1.0/en/0x10-V1-Inventory.md): OWASP Standard, Tag 1.0 (2020-06-25).
- [V2: Software Bill of Materials](https://raw.githubusercontent.com/OWASP/Software-Component-Verification-Standard/1.0/en/0x11-V2-Software_Bill_of_Materials.md): OWASP Standard, Tag 1.0 (2020-06-25).
- [V3: Build Environment](https://raw.githubusercontent.com/OWASP/Software-Component-Verification-Standard/1.0/en/0x12-V3-Build_Environment.md): OWASP Standard, Tag 1.0 (2020-06-25).
- [V4: Package Management](https://raw.githubusercontent.com/OWASP/Software-Component-Verification-Standard/1.0/en/0x13-V4-Package_Management.md): OWASP Standard, Tag 1.0 (2020-06-25).
- [V5: Component Analysis](https://raw.githubusercontent.com/OWASP/Software-Component-Verification-Standard/1.0/en/0x14-V5-Component_Analysis.md): OWASP Standard, Tag 1.0 (2020-06-25).
- [V6: Pedigree and Provenance](https://raw.githubusercontent.com/OWASP/Software-Component-Verification-Standard/1.0/en/0x15-V6-Pedigree_and_Provenance.md): OWASP Standard, Tag 1.0 (2020-06-25).

## License

MIT
