# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. SCVS states its verification requirements as control statements without MUST or SHALL keywords; each is quoted as written from the requirement table. Apply the ones that match the role and the chosen level (L1, L2 or L3, shown in the source table). Each is labelled with its requirement id.

## V1: Inventory

Source: https://raw.githubusercontent.com/OWASP/Software-Component-Verification-Standard/1.0/en/0x10-V1-Inventory.md

- **V1.1.** All direct and transitive components and their versions are known at completion of a build
- **V1.3.** An accurate inventory of all third-party components is available in a machine-readable format
- **V1.7.** Components are uniquely identified in a consistent, machine-readable format

## V2: Software Bill of Materials

Source: https://raw.githubusercontent.com/OWASP/Software-Component-Verification-Standard/1.0/en/0x11-V2-Software_Bill_of_Materials.md

- **V2.1.** A structured, machine readable software bill of materials (SBOM) format is present
- **V2.3.** Each SBOM has a unique identifier
- **V2.4.** SBOM has been signed by publisher, supplier, or certifying authority
- **V2.9.** SBOM contains a complete and accurate inventory of all components the SBOM describes
- **V2.14.** Components defined in SBOM have accurate license information

## V3: Build Environment

Source: https://raw.githubusercontent.com/OWASP/Software-Component-Verification-Standard/1.0/en/0x12-V3-Build_Environment.md

- **V3.1.** Application uses a repeatable build
- **V3.4.** Application build pipeline prohibits alteration of build outside of the job performing the build
- **V3.7.** Application build pipeline may only perform builds of source code maintained in version control systems
- **V3.11.** Application build pipeline enforces authorization and defaults to deny
- **V3.18.** Checksums of all first-party and third-party components are documented for every build

## V4: Package Management

Source: https://raw.githubusercontent.com/OWASP/Software-Component-Verification-Standard/1.0/en/0x13-V4-Package_Management.md

- **V4.1.** Binary components are retrieved from a package repository
- **V4.13.** Package manager verifies the integrity of packages when they are retrieved from remote repository
- **V4.16.** Package manager validates TLS certificate chain to repository and fails securely when validation fails
- **V4.18.** Package manager does not execute component code

## V5: Component Analysis

Source: https://raw.githubusercontent.com/OWASP/Software-Component-Verification-Standard/1.0/en/0x14-V5-Component_Analysis.md

- **V5.4.** An automated process of identifying all publicly disclosed vulnerabilities in third-party and open source components is used
- **V5.7.** An automated process of identifying out-of-date components is used

## V6: Pedigree and Provenance

Source: https://raw.githubusercontent.com/OWASP/Software-Component-Verification-Standard/1.0/en/0x15-V6-Pedigree_and_Provenance.md

- **V6.1.** Point of origin is verifiable for source code and binary components
- **V6.3.** Provenance of modified components is known and documented
