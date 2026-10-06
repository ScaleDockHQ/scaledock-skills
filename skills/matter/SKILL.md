---
name: matter
description: >-
  Matter: check Matter device and controller code against the cluster data model: cluster IDs, attributes, commands, access privileges, conformance and status codes. Covers the Matter 1.6 data model (1.6.1, current), Matter 1.5 and 1.4 (supported), Matter 1.3 and earlier as legacy, and tracks the Matter 1.7 draft as a preview; only the public data-model XML is pinned, not the Core Specification prose. Use when implementing or reviewing a Matter cluster server or client, commissioning (General Commissioning, Operational Credentials), Basic Information or On/Off. Triggers: Matter, CHIP, connectedhomeip, Matter cluster, data model XML, ArmFailSafe, AddNOC, CommissioningComplete, SpecificationVersion.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Matter data model

Matter is the Connectivity Standards Alliance (CSA) smart home standard. The connectedhomeip SDK publishes a machine-readable copy of the specification's data model: one XML file per cluster, with IDs, attributes, commands, fields, access privileges, quality flags and conformance. This skill quotes from those XML files.

**Scope.** The CSA hands out the Matter Core Specification prose only to members or after registration. This skill pins only the data-model XML in `project-chip/connectedhomeip/data_model`, which the SDK README describes as representing "the official specification data model at a certain revision". The XML carries the CSA copyright notice and licence for internal use, so the skill quotes short fragments only. Interaction model behaviour, security, commissioning flows and device type requirements outside the XML are out of scope.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Matter device (cluster server), controller or commissioner (cluster client), or a certification test author.
- Target version: Matter 1.6 (current); Matter 1.5 (supported); Matter 1.4 (supported); Matter 1.3 and earlier (legacy); Matter 1.7 (preview, posture: track). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **command ArmFailSafe.** `<command id="0x00" name="ArmFailSafe" direction="commandToServer" response="ArmFailSafeResponse"> <access invokePrivilege="admin"/> <mandatoryConform/> <field id="0" name="ExpiryLengthSeconds" type="uint16" default="900">`
2. **command CommissioningComplete.** `<command id="0x04" name="CommissioningComplete" direction="commandToServer" response="CommissioningCompleteResponse"> <access invokePrivilege="admin" fabricScoped="true"/>`
3. **CommissioningErrorEnum BusyWithOtherAdmin.** "Attempting to arm fail-safe or execute CommissioningComplete from a fabric different than the one associated with the current fail-safe context."
4. **command AddNOC.** `<command id="0x06" name="AddNOC" direction="commandToServer" response="NOCResponse"> <access invokePrivilege="admin"/> <mandatoryConform/> <field id="0" name="NOCValue" type="octstr"> <mandatoryConform/> <constraint> <maxLength value="400"/>`
5. **NodeOperationalCertStatusEnum FabricConflict.** "Trying to AddNOC instead of UpdateNOC against an existing Fabric."
6. **attribute VendorID.** `<attribute id="0x0002" name="VendorID" type="vendor-id" default="MS"> <access read="true" readPrivilege="view"/> <quality persistence="fixed"/> <mandatoryConform/>`
7. **attribute OnOff.** `<attribute id="0x0000" name="OnOff" type="bool"> <access read="true" readPrivilege="view"/> <quality scene="true" persistence="nonVolatile"/> <mandatoryConform/>`

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the section it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Every attribute and command the device exposes matches the ID, type, access privilege and conformance in the cluster XML of the version it declares in `SpecificationVersion`.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `x509-pkix`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [connectedhomeip data_model README](https://raw.githubusercontent.com/project-chip/connectedhomeip/bd73b5141729af92f3d021aeecaa53d9e0cadb89/data_model/README.md): Project CHIP SDK documentation, commit bd73b51, 2026-09-15, checked 2026-10-06.
- [Matter 1.6.1 Basic Information Cluster XML](https://raw.githubusercontent.com/project-chip/connectedhomeip/bd73b5141729af92f3d021aeecaa53d9e0cadb89/data_model/1.6.1/clusters/BasicInformationCluster.xml): CSA data model (SDK copy), data_model/1.6.1, cluster revision 6, checked 2026-10-06.
- [Matter 1.6.1 General Commissioning Cluster XML](https://raw.githubusercontent.com/project-chip/connectedhomeip/bd73b5141729af92f3d021aeecaa53d9e0cadb89/data_model/1.6.1/clusters/GeneralCommissioningCluster.xml): CSA data model (SDK copy), data_model/1.6.1, checked 2026-10-06.
- [Matter 1.6.1 Operational Credentials Cluster XML](https://raw.githubusercontent.com/project-chip/connectedhomeip/bd73b5141729af92f3d021aeecaa53d9e0cadb89/data_model/1.6.1/clusters/OperationalCredentialCluster.xml): CSA data model (SDK copy), data_model/1.6.1, checked 2026-10-06.
- [Matter 1.6.1 On/Off Cluster XML](https://raw.githubusercontent.com/project-chip/connectedhomeip/bd73b5141729af92f3d021aeecaa53d9e0cadb89/data_model/1.6.1/clusters/OnOff.xml): CSA data model (SDK copy), data_model/1.6.1, checked 2026-10-06.
