# matter

An agent skill for Matter data model: checking Matter clusters against the data model.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill matter
```

Then ask your agent to apply Matter data model.

## What it covers

- Matter is the Connectivity Standards Alliance (CSA) smart home standard. The connectedhomeip SDK publishes a machine-readable copy of the specification's data model: one XML file per cluster, with IDs, attributes, commands, fields, access privileges, quality flags and conformance. This skill quotes from those XML files.
- The CSA hands out the Matter Core Specification prose only to members or after registration. This skill pins only the data-model XML in `project-chip/connectedhomeip/data_model`, which the SDK README describes as representing "the official specification data model at a certain revision". The XML carries the CSA copyright notice and licence for internal use, so the skill quotes short fragments only. Interaction model behaviour, security, commissioning flows and device type requirements outside the XML are out of scope.

## Versions

| Line                   | Status    |
| ---------------------- | --------- |
| Matter 1.6             | current   |
| Matter 1.5             | supported |
| Matter 1.4             | supported |
| Matter 1.3 and earlier | legacy    |
| Matter 1.7             | preview   |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [connectedhomeip data_model README](https://raw.githubusercontent.com/project-chip/connectedhomeip/bd73b5141729af92f3d021aeecaa53d9e0cadb89/data_model/README.md): Project CHIP SDK documentation, commit bd73b51, 2026-09-15.
- [Matter 1.6.1 Basic Information Cluster XML](https://raw.githubusercontent.com/project-chip/connectedhomeip/bd73b5141729af92f3d021aeecaa53d9e0cadb89/data_model/1.6.1/clusters/BasicInformationCluster.xml): CSA data model (SDK copy), data_model/1.6.1, cluster revision 6.
- [Matter 1.6.1 General Commissioning Cluster XML](https://raw.githubusercontent.com/project-chip/connectedhomeip/bd73b5141729af92f3d021aeecaa53d9e0cadb89/data_model/1.6.1/clusters/GeneralCommissioningCluster.xml): CSA data model (SDK copy), data_model/1.6.1.
- [Matter 1.6.1 Operational Credentials Cluster XML](https://raw.githubusercontent.com/project-chip/connectedhomeip/bd73b5141729af92f3d021aeecaa53d9e0cadb89/data_model/1.6.1/clusters/OperationalCredentialCluster.xml): CSA data model (SDK copy), data_model/1.6.1.
- [Matter 1.6.1 On/Off Cluster XML](https://raw.githubusercontent.com/project-chip/connectedhomeip/bd73b5141729af92f3d021aeecaa53d9e0cadb89/data_model/1.6.1/clusters/OnOff.xml): CSA data model (SDK copy), data_model/1.6.1.

## License

MIT
