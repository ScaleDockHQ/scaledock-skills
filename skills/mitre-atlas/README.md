# mitre-atlas

An agent skill for MITRE ATLAS, the knowledge base of adversary tactics and techniques against AI-enabled systems: ATLAS-mapped threat models, red team plans, detection tags, and code that reads the ATLAS data.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill mitre-atlas
```

Then ask your agent to "threat-model our RAG agent with MITRE ATLAS", "tag these detections with ATLAS technique IDs" or "load the ATLAS 2026.09 data and list the mitigations for AML.T0051".

## What it covers

- The ATLAS matrix: 16 tactics (`AML.TA*`), 120 techniques and 88 sub-techniques (`AML.T*`) with maturity and platforms, including the agentic AI techniques of 2026.09.
- The 40 mitigations (`AML.M*`), their categories and lifecycle phases, and coverage queries.
- Case studies (`AML.CS*`) as attack paths, and how ATLAS links to MITRE ATT&CK through `attack-reference`.
- The ATLAS YAML format 6.0.0 (`dist/ATLAS-latest.yaml`), its ID patterns, typed relationships and computed UUIDs, plus the STIX, Navigator and Excel release assets.
- Threat modeling, the AI red team phases of AML.M0035, and detection mapping.
- Retired and renamed IDs, and upgrading from older releases and the deprecated `ATLAS.yaml`.

## Versions

| Line                     | Status                |
| ------------------------ | --------------------- |
| ATLAS 2026.09            | current (content)     |
| ATLAS 2026.06            | legacy (upgrade from) |
| ATLAS 2021.10            | legacy (upgrade from) |
| ATLAS YAML format 6.0.0  | current (format)      |
| ATLAS legacy YAML format | legacy (upgrade from) |

`references/versions.md` says which release and format to use, what each release changed, and how to upgrade.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [MITRE ATLAS website](https://atlas.mitre.org/): Data v2026.09.
- [mitre-atlas/atlas-data](https://github.com/mitre-atlas/atlas-data/blob/v2026.09/README.md): tag v2026.09, with `dist/v6/ATLAS-2026.09.yaml`, the CHANGELOG, the release manifest, `atlas/schemas.py`, `atlas/enums.py` and `tools/atlas_to_stix.py`.
- [ATLAS release v2026.09](https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09): released 2026-09-15.
- [Deprecated ATLAS.yaml](https://github.com/mitre-atlas/atlas-data/blob/v2026.09/dist/ATLAS.yaml): legacy format, 5.6.0.
- [mitre-atlas/atlas-navigator-data](https://github.com/mitre-atlas/atlas-navigator-data): deprecated.

## License

MIT
