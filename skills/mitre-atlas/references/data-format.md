# Data format

Read this when you parse, generate, validate or convert ATLAS data. Sources: the ATLAS Data README (Distributed ATLAS Data, ATLAS Data Format), `atlas/schemas.py`, `atlas/enums.py`, `atlas/constants.py`, `dist/manifest.yaml`, `tools/atlas_to_stix.py` and the v2026.09 release assets, listed in [Sources](../SKILL.md#sources). Format 6.0.0 is current; the legacy format is covered at the end.

## Files

| File                              | What it is                                                                                                                                                                                                                                                                                                             |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dist/ATLAS-latest.yaml`          | Symlink to the latest content in the latest format (today `v6/ATLAS-latest.yaml`, which links to `v6/ATLAS-2026.09.yaml`).                                                                                                                                                                                             |
| `dist/v6/ATLAS-<release>.yaml`    | Every content release since 2021.05, migrated to format 6.0.0.                                                                                                                                                                                                                                                         |
| `dist/legacy/ATLAS-<semver>.yaml` | Releases 2.0.0 to 5.6.0 in their original format.                                                                                                                                                                                                                                                                      |
| `dist/ATLAS.yaml`                 | Deprecated; frozen at 5.6.0 with a header comment saying so.                                                                                                                                                                                                                                                           |
| `dist/manifest.yaml`              | For each `release`: `release-date` and `versions[]` of `{format-version, path}`.                                                                                                                                                                                                                                       |
| `dist/schemas/*.json`             | JSON Schemas for the legacy output, contributions and website case studies. Format 6.0.0 is defined by the Pydantic models, not these files.                                                                                                                                                                           |
| Release assets                    | `ATLAS-<release>.yaml`; `stix-atlas.json`; `stix-atlas-attack-enterprise.json`; `stix-atlas-realized.json` and `stix-atlas-realized-attack-enterprise.json`; `navigator-atlas_layer_matrix.json`, `navigator-atlas_case_study_frequency.json` and one `navigator-AML.CS####.json` per case study; `excel-atlas*.xlsx`. |

Pin a release by file name or tag (`v2026.09`) for reproducible work. Use `ATLAS-latest.yaml` only for tooling that should follow new releases.

## Top level (format 6.0.0)

`AtlasExport` has exactly these keys: `format-version`, `collection`, `matrix`, `tactics`, `techniques`, `mitigations`, `case-studies`, `relationships`.

- `format-version`: a semver string, `6.0.0` (`ATLAS_FORMAT_VERSION`).
- `collection`: `id` is always `ATLAS-collection`; `version` is the content release (`"2026.09"`); plus the common fields.
- `matrix`: `id` is always `ATLAS-matrix`.
- `tactics`, `techniques`, `mitigations`, `case-studies`: maps keyed by object ID. The key equals the object's `id`.
- `relationships`: a map from source object ID to a map from relationship type to a list of relationships.

Field names are kebab-case (`created-date`, `attack-reference`, `lifecycle-phases`); the models derive them from snake_case.

## Common object fields

Every object has `id`, `name`, `description`, `references` (list, may be empty), `created-date`, `modified-date` (`YYYY-MM-DD`), `uuid` and `object-type`.

- `name` matches `^[ -~]*$` (printable ASCII); `description` matches `^[ -~\n]*$` and is Markdown that links other objects by site path, for example `[AI Attack Adaptation](/tactics/AML.TA0001)`.
- `references[]`: `{id, title, url}`, where `id` is kebab-case (`^[a-z][a-z0-9-]*$`) and `url` is an HTTP URL.
- `object-type` is one of `collection`, `matrix`, `tactic`, `technique`, `mitigation`, `case-study`, and must agree with the ID pattern.
- `uuid` is computed, not assigned: UUIDv5 of the `id` in the namespace `UUID("atlas.mitre.org.".encode().hex())`. The validator rejects a file whose `uuid` differs. For example `AML.T0051` gives `6ff098e9-2864-579e-bebb-a0f1c92ec772`.

## ID patterns

| Object                | Pattern                                             |
| --------------------- | --------------------------------------------------- |
| Collection            | `ATLAS-collection`                                  |
| Matrix                | `ATLAS-matrix`                                      |
| Tactic                | `^AML\.TA[0-9]{4}$`                                 |
| Technique             | `^AML\.T[0-9]{4}$`                                  |
| Sub-technique         | `^AML\.T[0-9]{4}\.[0-9]{3}$`                        |
| Mitigation            | `^AML\.M[0-9]{4}$`                                  |
| Case study            | `^AML\.CS[0-9]{4}$`                                 |
| Case study step       | `^S[0-9]{2}$`                                       |
| `attack-reference.id` | ATT&CK `TA####`, `T####` or `T####.###`, or `M####` |

## Per-type fields

- **Tactic**: optional `attack-reference` `{id, url}`.
- **Technique** (parent and sub-technique alike): `maturity` (`Feasible`, `Demonstrated`, `Realized`); `platforms` with at least one of `Predictive AI`, `Generative AI`, `Agentic AI`, `Enterprise`; optional `attack-reference`. A sub-technique is told apart by its ID and its `specializes` relationship, not by a field.
- **Mitigation**: `categories` (at least one of `Policy`, `Technical - AI`, `Technical - Cyber`), `lifecycle-phases` (at least one, see [`mitigations.md`](mitigations.md)), optional `attack-reference`.
- **Case study**: `type` (`Incident` or `Exercise`), `actor`, `target`, `date`, `date-granularity` (`Year`, `Month`, `Day`), optional `reporter`. An `Exercise` must not have a `reporter`. `date` accepts `YYYY`, `YYYY-MM` or `YYYY-MM-DD` on input and is written as a full date; `date-granularity` says how much of it is meaningful.

## Relationships

Each relationship has `source`, `target` and `relationship-type`, and optionally `description`, `tactic`, `step-id`, `leads-to` and `position`.

| Type          | Source to target                         | Extra fields                                              |
| ------------- | ---------------------------------------- | --------------------------------------------------------- |
| `sequences`   | matrix to tactic                         | `position` (1-based column order)                         |
| `achieves`    | technique or sub-technique to tactic     | optional `description`                                    |
| `specializes` | sub-technique to parent technique        | optional `description`                                    |
| `mitigates`   | mitigation to technique or sub-technique | `description`: how it applies                             |
| `employs`     | case study to technique                  | `tactic` (required), `step-id`, `leads-to`, `description` |

Rules the data follows:

- Read a technique's tactics from its `achieves` list, never from the column it appears in on a web page.
- `employs` steps form a graph: `step-id` names the step, `leads-to` lists the next steps. The list order in the file is not the attack order; sort by following `leads-to` from the step no other step leads to.
- Retired IDs are removed from later releases, not flagged as deprecated. A missing ID means "look it up in [`versions.md`](versions.md)", not "drop it silently".

Minimal example, abbreviated from the 2026.09 file:

```yaml
format-version: 6.0.0
collection:
  id: ATLAS-collection
  object-type: collection
  version: "2026.09"
techniques:
  AML.T0051.001:
    id: AML.T0051.001
    object-type: technique
    name: Indirect
    maturity: Demonstrated
    platforms: [Generative AI, Agentic AI]
    uuid: 59e47398-ebf9-5606-857a-94da5ee0079d
relationships:
  AML.T0051.001:
    achieves:
      - {
          source: AML.T0051.001,
          target: AML.TA0005,
          relationship-type: achieves,
        }
    specializes:
      - {
          source: AML.T0051.001,
          target: AML.T0051,
          relationship-type: specializes,
        }
```

## Validating

- With the project's tooling: `AtlasExport.model_validate(yaml.safe_load(f))` from `atlas.schemas` (README, Quick Start). It enforces the ID patterns, enums, required lists, the computed `uuid` and `object-type`, and the case study reporter rule.
- Without it, check at least: `format-version` is `6.0.0`; every map key equals its object's `id`; every `source`, `target` and `tactic` in `relationships` exists; every technique has `maturity`, one or more `platforms`, and one or more `achieves` edges; every sub-technique has exactly one `specializes` edge to an existing parent.

## STIX, Navigator and Excel

From `tools/atlas_to_stix.py` and the release assets:

- Tactics become `x-mitre-tactic`, techniques `attack-pattern` (`x_mitre_is_subtechnique: true` for sub-techniques, `x_mitre_platforms` from `platforms`), mitigations `course-of-action`, and case studies `campaign` when `--include-case-studies` is set. IDs are `<type>--<uuid>` using the ATLAS UUID.
- The ATLAS ID is in `external_references` with `source_name: mitre-atlas` and `external_id`; an `attack-reference` adds an entry with `source_name: mitre-attack`. Kill chain phases use `kill_chain_name: mitre-atlas` and the tactic name as a slug for `phase_name`.
- Relationships become STIX `subtechnique-of`, `mitigates` and `uses` (campaign to technique).
- ATLAS objects carry `x_mitre_domains: ["ATLAS"]`. In the combined bundle, ATT&CK Enterprise objects get `atlas-atlas` added to their domains, which is the domain the ATLAS Navigator uses.
- `--maturity-threshold` filters techniques: `feasible` keeps all, `demonstrated` keeps Demonstrated and Realized, `realized` keeps only Realized and only `Incident` case studies. The `stix-atlas-realized*.json` assets are the realized cut.
- Navigator layers target ATT&CK Navigator 5.3.2 with layer format 4.5 and the `atlas-atlas` domain (README, Generate ATLAS Navigator layers).
- `mitre-atlas/atlas-navigator-data` is deprecated; take STIX and layers from `atlas-data` releases.

## Reading the legacy format

Legacy files (formats 2.0.0 to 5.6.0) differ as follows. The mapping to 6.0.0 is in [`versions.md`](versions.md#legacy-yaml-format-to-atlas-yaml-format-600).

- Top level `id: ATLAS`, `name`, `version` (the semver), `matrices[]` and `case-studies[]`. From 4.0.0, `tactics`, `techniques` and `mitigations` are lists inside `matrices[0]`; in 3.x and earlier they sit at the top level.
- Techniques carry `tactics: [AML.TA…]` (parents only) and `subtechnique-of: AML.T…` (sub-techniques). The deprecated `dist/ATLAS.yaml` uses `specializes` instead of `subtechnique-of`; accept both.
- `ATT&CK-reference`, `created_date`, `modified_date`; lowercase `maturity` (5.0.0 and later only); no `platforms`, no `uuid`.
- Mitigations: `techniques: [{id, use}]`, `ml-lifecycle`, `category`.
- Case studies: `summary`, `incident-date`, `incident-date-granularity` (`YEAR`, `MONTH`, `DATE`), `case-study-type` (`incident`, `exercise`), `procedure: [{tactic, technique, description}]` in attack order.
