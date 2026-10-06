# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Basic Information Cluster (0x0028)

Source: https://raw.githubusercontent.com/project-chip/connectedhomeip/bd73b5141729af92f3d021aeecaa53d9e0cadb89/data_model/1.6.1/clusters/BasicInformationCluster.xml

- **revisionHistory.** Updated conformance for UniqueID to mandatory
- **attribute VendorID.** `<attribute id="0x0002" name="VendorID" type="vendor-id" default="MS"> <access read="true" readPrivilege="view"/> <quality persistence="fixed"/> <mandatoryConform/>`
- **attribute SpecificationVersion.** `<attribute id="0x0015" name="SpecificationVersion" type="uint32" default="0">`

## General Commissioning Cluster (0x0030)

Source: https://raw.githubusercontent.com/project-chip/connectedhomeip/bd73b5141729af92f3d021aeecaa53d9e0cadb89/data_model/1.6.1/clusters/GeneralCommissioningCluster.xml

- **command ArmFailSafe.** `<command id="0x00" name="ArmFailSafe" direction="commandToServer" response="ArmFailSafeResponse"> <access invokePrivilege="admin"/> <mandatoryConform/> <field id="0" name="ExpiryLengthSeconds" type="uint16" default="900">`
- **command CommissioningComplete.** `<command id="0x04" name="CommissioningComplete" direction="commandToServer" response="CommissioningCompleteResponse"> <access invokePrivilege="admin" fabricScoped="true"/>`
- **CommissioningErrorEnum NoFailSafe.** Executed CommissioningComplete when there was no active Fail-Safe context.
- **CommissioningErrorEnum BusyWithOtherAdmin.** Attempting to arm fail-safe or execute CommissioningComplete from a fabric different than the one associated with the current fail-safe context.

## Operational Credentials Cluster (0x003E)

Source: https://raw.githubusercontent.com/project-chip/connectedhomeip/bd73b5141729af92f3d021aeecaa53d9e0cadb89/data_model/1.6.1/clusters/OperationalCredentialCluster.xml

- **command AddNOC.** `<command id="0x06" name="AddNOC" direction="commandToServer" response="NOCResponse"> <access invokePrivilege="admin"/> <mandatoryConform/> <field id="0" name="NOCValue" type="octstr"> <mandatoryConform/> <constraint> <maxLength value="400"/>`
- **NodeOperationalCertStatusEnum InvalidPublicKey.** Public Key in the NOC does not match the public key in the NOCSR
- **NodeOperationalCertStatusEnum FabricConflict.** Trying to AddNOC instead of UpdateNOC against an existing Fabric.

## On/Off Cluster (0x0006)

Source: https://raw.githubusercontent.com/project-chip/connectedhomeip/bd73b5141729af92f3d021aeecaa53d9e0cadb89/data_model/1.6.1/clusters/OnOff.xml

- **attribute OnOff.** `<attribute id="0x0000" name="OnOff" type="bool"> <access read="true" readPrivilege="view"/> <quality scene="true" persistence="nonVolatile"/> <mandatoryConform/>`
- **StartUpOnOffEnum Toggle.** If the previous value of the OnOff attribute is equal to FALSE, set the OnOff attribute to TRUE. If the previous value of the OnOff attribute is equal to TRUE, set the OnOff attribute to FALSE (toggle).
