# Versions and upgrades

Read this when choosing which ATLAS release and data format to use, reading an older threat model, mapping or data file, or upgrading one. Sources: the ATLAS Data `CHANGELOG.md`, the release notes, `dist/manifest.yaml`, the README's Versioning section, and the migrated files in `dist/v6/` and `dist/legacy/`, listed in [Sources](../SKILL.md#sources).

ATLAS has two version axes since content release 2026.05 (README, Versioning; CHANGELOG 2026.05):

- **Content version**: the knowledge base release, `collection.version`, numbered `YYYY.MM` or `YYYY.MM.N` (for example `2026.09`, `2025.11.2`). Git tags and GitHub releases add a `v` (`v2026.09`).
- **Format version**: the shape of the YAML file, `format-version`, in semantic versioning (`6.0.0`).

Before 2026.05 one semver number (2.0.0 to 5.6.1) covered both. `dist/manifest.yaml` maps every content release to the files that hold it, by format version; for example content 2026.04 exists as `v6/ATLAS-2026.04.yaml` (format 6.0.0) and `legacy/ATLAS-5.6.0.yaml` (format 5.6.0).

## Version lines

| Id              | Line                     | Status  | Revision                                                  | Posture | Summary                                                                                                 |
| --------------- | ------------------------ | ------- | --------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `2026.09`       | ATLAS 2026.09            | current | content 2026.09, released 2026-09-15 (tag `v2026.09`)     |         | The default target: 16 tactics, 120 techniques, 88 sub-techniques, 40 mitigations, 73 case studies.     |
| `2026.06`       | ATLAS 2026.06            | legacy  | content 2021.12 to 2026.06 (semver 2.2.1 to 5.6.1)        |         | Before 2026.07 retired AML.T0019, AML.T0058 and AML.T0104 into AML.T0115 and renamed seven mitigations. |
| `2021.10`       | ATLAS 2021.10            | legacy  | content 2021.05 to 2021.10 (semver 2.0.0 to 2.2.0)        |         | Before 2021.12 gave tactics their own `AML.TA` IDs; tactics used ATT&CK IDs such as `TA0043`.           |
| `format-6`      | ATLAS YAML format 6.0.0  | current | format 6.0.0 (since content 2026.05)                      |         | Keyed maps plus a typed `relationships` map; `dist/ATLAS-latest.yaml` and `dist/v6/`.                   |
| `format-legacy` | ATLAS legacy YAML format | legacy  | formats 2.0.0 to 5.6.0; `dist/ATLAS.yaml` frozen at 5.6.0 |         | Lists under `matrices[]`, relationships embedded in objects. Deprecated, no new content.                |

The first three are the `content` family and the last two the `format` family; each family has one current line. Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. No line is supported: ATLAS publishes one living knowledge base, and the project only updates the latest release.

Content releases 2026.07 and 2026.08 belong to the current line: they are older monthly releases of it. An artifact pinned to them upgrades with the steps in [2026.07 or 2026.08 to 2026.09](#202607-or-202608-to-202609).

## Which version to use

- Cite technique, tactic and mitigation IDs from ATLAS 2026.09, and record that release in every threat model, mapping or detection rule (for example "ATLAS v2026.09").
- Parse ATLAS YAML format 6.0.0 from `dist/ATLAS-latest.yaml`, or pin `dist/v6/ATLAS-2026.09.yaml` (README, Distributed Versions). `dist/ATLAS-latest.yaml` always points to the latest content in the latest format.
- Do not build on `dist/ATLAS.yaml`. Its header says it is deprecated and no longer updated, and it stops at content 2026.04 (5.6.0) (README, Distributed Versions).
- For a historical release, prefer its `dist/v6/ATLAS-<release>.yaml` migration over the `dist/legacy/` original, so one parser reads every release.
- Treat an artifact on a legacy content line as input to an upgrade.
- There is no preview: no GitHub release of `mitre-atlas/atlas-data` is marked pre-release, and the changelog has no unreleased section.

## What changed

### ATLAS 2026.09 (content, released 2026-09-15)

From the 2026.09 release notes and changelog:

- New techniques: Triggers in Multimodal Inputs (AML.T0129), AI Agent Response Biasing (AML.T0130), Crafted AI Assistant Links (AML.T0131), Misconfigured or Publicly Exposed AI Services (AML.T0132), Discover AI Agent Runtime Capabilities (AML.T0133), AI Targeted Cloaking (AML.T0134).
- New sub-techniques: Search Open Technical Databases: Scan Databases (AML.T0000.003); Active Scanning: Enumerate Hosted AI Resources (AML.T0006.000), Query Platform Metadata APIs (AML.T0006.001), Scan for Exposed AI Infrastructure (AML.T0006.002) and Probe AI Agent Trigger Channels (AML.T0006.003).
- Updated: AML.T0000, AML.T0095, AML.T0006, AML.T0068, AML.T0051.001, AML.T0054, AML.T0077, AML.T0100.
- New mitigation AI Honeypots (AML.M0039); Generative AI Guardrails (AML.M0020) updated.
- New case study AML.CS0072; AML.CS0023, AML.CS0037, AML.CS0048 and AML.CS0070 updated.

### ATLAS 2026.08 (content, released 2026-08-31)

- Tactic AML.TA0001 renamed from "AI Attack Staging" to "AI Attack Adaptation". The ID is unchanged.
- Generalized and renamed, IDs unchanged: AML.T0072 "Reverse Shell" to "Cyber Communication Channel"; AML.T0075 "Cloud Service Discovery" to "Enterprise Resource Discovery"; AML.T0089 "Process Discovery" to "Enterprise Environment Discovery".
- New autonomous-operation techniques AML.T0116, AML.T0117, AML.T0118 (with `.000` and `.001`) and AML.T0124, plus AML.T0119 to AML.T0128 and sub-techniques AML.T0016.004, AML.T0017.001 and AML.T0017.002.
- New mitigations AI Agent Authority Expansion Controls (AML.M0037) and AI Agent Scope Drift Detection (AML.M0038).

### ATLAS 2026.07 (content, released 2026-07-31): the bulk change that ends `2026.06`

- Three technique IDs retired and folded into the new Publish Poisoned AI Artifacts (AML.T0115): AML.T0019 "Publish Poisoned Datasets" is now AML.T0115.000 Datasets; AML.T0058 "Publish Poisoned Models" is now AML.T0115.001 Models; AML.T0104 "Publish Poisoned AI Agent Tool" is now AML.T0115.002 AI Agent Tools. The old IDs are absent from the 2026.07 and later data files.
- AML.T0020 renamed from "Poison Training Data" to "Training Data Poisoning".
- Mitigations renamed, IDs unchanged: AML.M0002 to Predictive AI Output Obfuscation, AML.M0003 to Predictive AI Model Hardening, AML.M0004 to Limit AI Service Query Volume and Rate, AML.M0006 to Predictive AI Ensembles, AML.M0009 to Predictive AI Multi-Sensor Fusion, AML.M0010 to Predictive AI Input Restoration, AML.M0015 to Predictive AI Adversarial Input Detection.
- AI Agent Tool Poisoning (AML.T0110) gained sub-techniques `.000` Definition and Instructions, `.001` Implementation and `.002` Runtime Response; Manipulate AI Model gained AML.T0018.003. New mitigations AML.M0035 AI Red Team and AML.M0036.

### ATLAS 2026.05 and format 6.0.0

- Content and format versioning split. Every technique gained one or more `platforms`: Predictive AI, Generative AI, Agentic AI, Enterprise.
- Format 6.0.0: keyed maps for tactics, techniques, mitigations and case studies; one `relationships` map with the types `sequences`, `achieves`, `specializes`, `mitigates` and `employs`; UUIDs computed from IDs; strict object-type enums; Pydantic schemas; `dist/ATLAS.yaml` deprecated. All historical releases were migrated to `dist/v6/` and the originals kept in `dist/legacy/`.
- STIX, Navigator layer and Excel files moved from `mitre-atlas/atlas-navigator-data` (now deprecated) to `atlas-data` release assets.

### Earlier bulk changes inside the `2026.06` line

- 5.0.0 (content 2025.09): added technique `maturity` (Feasible, Demonstrated, Realized). AML.T0053 renamed from "LLM Plugin Compromise" to "AI Agent Tool Invocation".
- 4.9.0 (content 2025.04): names and descriptions moved from "ML / machine learning" to "AI / artificial intelligence", for example AML.TA0000 "ML Model Access" to "AI Model Access" and AML.T0010 "ML Supply Chain Compromise" to "AI Supply Chain Compromise". IDs unchanged. AML.T0018 renamed from "Backdoor ML Model" to "Manipulate AI Model".
- 4.5.0 (content 2023.10): AML.T0045 "ML Intellectual Property Theft" retired; it is now the sub-technique AML.T0048.004 of External Harms. AML.T0048 itself was "System Misuse for External Effect". Tactics Privilege Escalation (AML.TA0012) and Credential Access (AML.TA0013) added.

### ATLAS 2021.12 (2.2.1): the bulk change that ends `2021.10`

In 2.2.0 and earlier, ATT&CK-derived tactics used ATT&CK's own IDs (`TA0043` Reconnaissance, `TA0042` Resource Development, `TA0001` Initial Access, and so on); only ML Model Access and ML Attack Staging had `AML.TA` IDs. From 2.2.1, every tactic has an `AML.TA` ID, and Privilege Escalation, Credential Access, Lateral Movement and Command and Control left the matrix (they came back later as AML.TA0012 to AML.TA0015). The `dist/v6/` migrations of 2021.05 to 2021.10 keep the old numbers with an `AML.` prefix, so their `AML.TA0002` is Execution, not Reconnaissance.

## Upgrading

### 2026.07 or 2026.08 to 2026.09

1. Change the version marker: record ATLAS v2026.09 in the artifact.
2. Replace removed or renamed IDs: none were removed. Update the display name of AML.TA0001, AML.T0072, AML.T0075 and AML.T0089 if the artifact predates 2026.08.
3. Validate against the target: every ID in the artifact exists in `dist/v6/ATLAS-2026.09.yaml`. Re-check scope for the new AML.T0129 to AML.T0134 and the AML.T0006 sub-techniques, and consider AML.M0037 to AML.M0039.
4. Keep behaviour unchanged: a detection or test keeps the technique it covered; re-tag it only when a new, narrower sub-technique fits better.

### 2026.06 to 2026.09

1. Change the version marker: record ATLAS v2026.09.
2. Replace removed or renamed IDs: AML.T0019 becomes AML.T0115.000, AML.T0058 becomes AML.T0115.001, AML.T0104 becomes AML.T0115.002. Apply the 2026.07 and 2026.08 renames above. If the artifact predates 2025.04, replace "ML" names with the "AI" names; if it predates 2023.10, AML.T0045 becomes AML.T0048.004.
3. Validate against the target: look up every ID in `dist/v6/ATLAS-2026.09.yaml` and fail on any that is missing. Then re-run the 2026.07 to 2026.09 steps.
4. Keep behaviour unchanged: compare each mapped technique's tactics through `achieves` in both releases; a technique whose tactic set changed may move columns in a matrix view.

### 2021.10 to 2026.09

1. Change the version marker: record ATLAS v2026.09.
2. Replace removed or renamed IDs: map each tactic by its name, never by its number, to the current `AML.TA` ID (Reconnaissance AML.TA0002, Resource Development AML.TA0003, Initial Access AML.TA0004, Execution AML.TA0005, Persistence AML.TA0006, Defense Evasion AML.TA0007, Discovery AML.TA0008, Collection AML.TA0009, Exfiltration AML.TA0010, Impact AML.TA0011, Privilege Escalation AML.TA0012, Credential Access AML.TA0013, Command and Control AML.TA0014, Lateral Movement AML.TA0015, ML Model Access AML.TA0000, ML Attack Staging AML.TA0001). Re-map techniques by name and description; AML.T0006 then meant "Replicate ML Model", a different technique from today's Active Scanning.
3. Validate against the target: then follow the 2026.06 to 2026.09 steps.
4. Keep behaviour unchanged: review every mapping by hand. This line predates most of today's matrix, so a mechanical upgrade is not enough.

### Legacy YAML format to ATLAS YAML format 6.0.0

1. Change the version marker: read `format-version: 6.0.0` and `collection.version` instead of the top-level `version`.
2. Replace removed or renamed fields: tactics, techniques and mitigations move from lists under `matrices[0]` to ID-keyed maps at the top level, and `case-studies` to an ID-keyed map. `tactics` on a technique becomes `achieves` relationships; `subtechnique-of` (or `specializes` in the deprecated `dist/ATLAS.yaml`) becomes a `specializes` relationship; mitigation `techniques: [{id, use}]` becomes `mitigates` relationships whose `description` is the old `use`; case study `procedure` steps become `employs` relationships with `tactic`, `step-id` and `leads-to`. `ATT&CK-reference` becomes `attack-reference`; `created_date` and `modified_date` become `created-date` and `modified-date`; `ml-lifecycle` and `category` become `lifecycle-phases` and `categories` with AI wording; case study `summary`, `incident-date`, `incident-date-granularity` and `case-study-type` become `description`, `date`, `date-granularity` and `type`. Enum values change case: `realized` to `Realized`, `incident` to `Incident`, `DATE` to `Day`.
3. Validate against the target: load the file with `atlas.schemas.AtlasExport` or check it against [`data-format.md`](data-format.md). Every technique needs `platforms` and `maturity`.
4. Keep behaviour unchanged: count tactics, techniques, mitigations and relationships before and after for the same content release; the manifest names both files of each release.

## Preview

No preview line is listed. Releases of `mitre-atlas/atlas-data` are monthly and none is published as a pre-release. When the format moves past 6.0.0, add a format line here, make it current, and make `format-6` legacy once `dist/ATLAS-latest.yaml` points at the new format.
