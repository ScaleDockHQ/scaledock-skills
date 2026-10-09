# Requirements from the pinned text

These sentences were read from the pinned source on 2026-10-06. S2C2F has no MUST or SHALL keywords: each requirement is a short imperative title in the framework's requirements table, quoted as written. Each is labelled with its requirement id and its maturity level (L1 is the entry level, L4 is aspirational). Implement every requirement at or below the target level.

## Practice 1: Ingest It

Source: https://raw.githubusercontent.com/ossf/s2c2f/d0f0a7fbbc6cc6cb6a248cbc9e98c3d8cf3b189a/specification/framework.md

- **ING-1 (L1).** Use public package managers trusted by your organization (i.e. NuGet.org, npmjs.com, PyPi.org, etc.)
- **ING-2 (L1).** Use an OSS binary repository manager solution (i.e. JFrog Artifactory, Azure Artifacts, etc.)
- **ING-3 (L3).** Have a Deny List capability to block known malicious OSS from being consumed
- **ING-4 (L3).** Mirror a copy of all OSS source code to an internal location

## Practice 2: Scan It

Source: https://raw.githubusercontent.com/ossf/s2c2f/d0f0a7fbbc6cc6cb6a248cbc9e98c3d8cf3b189a/specification/framework.md

- **SCA-1 (L1).** Scan OSS for known vulnerabilities (i.e. CVEs, GitHub Advisories, etc.)
- **SCA-2 (L1).** Scan OSS for licenses
- **SCA-3 (L2).** Scan OSS to determine if its end-of-life
- **SCA-4 (L3).** Scan OSS for malware
- **SCA-5 (L3).** Perform proactive security analysis of OSS

## Practice 3: Inventory It

Source: https://raw.githubusercontent.com/ossf/s2c2f/d0f0a7fbbc6cc6cb6a248cbc9e98c3d8cf3b189a/specification/framework.md

- **INV-1 (L1).** Maintain an automated inventory of all OSS used in development
- **INV-2 (L2).** Have an OSS Incident Response Plan

## Practice 4: Update It

Source: https://raw.githubusercontent.com/ossf/s2c2f/d0f0a7fbbc6cc6cb6a248cbc9e98c3d8cf3b189a/specification/framework.md

- **UPD-1 (L1).** Update vulnerable OSS manually
- **UPD-2 (L2).** Enable automated OSS updates
- **UPD-3 (L2).** Display OSS vulnerabilities in developer contribution flow (i.e. Pull Requests).

## Practice 5: Audit It

Source: https://raw.githubusercontent.com/ossf/s2c2f/d0f0a7fbbc6cc6cb6a248cbc9e98c3d8cf3b189a/specification/framework.md

- **AUD-1 (L3).** Verify the provenance of your OSS
- **AUD-2 (L2).** Audit that developers are consuming OSS through the approved ingestion method
- **AUD-3 (L2).** Validate integrity of the OSS that you consume into your build
- **AUD-4 (L4).** Validate SBOMs of OSS that you consume into your build

## Practice 6: Enforce It

Source: https://raw.githubusercontent.com/ossf/s2c2f/d0f0a7fbbc6cc6cb6a248cbc9e98c3d8cf3b189a/specification/framework.md

- **ENF-1 (L2).** Securely configure your package source files (i.e. nuget.config, .npmrc, pip.conf, pom.xml, etc.)
- **ENF-2 (L3).** Enforce usage of a curated OSS feed that enhances the trust of your OSS

## Practice 7: Rebuild It

Source: https://raw.githubusercontent.com/ossf/s2c2f/d0f0a7fbbc6cc6cb6a248cbc9e98c3d8cf3b189a/specification/framework.md

- **REB-1 (L4).** Rebuild the OSS in a trusted build environment, or validate that it is reproducibly built.
- **REB-2 (L4).** Digitally sign the OSS you rebuild
- **REB-3 (L4).** Generate SBOMs for OSS that you rebuild
- **REB-4 (L4).** Digitally sign the SBOMs you produce

## Practice 8: Fix It + Upstream

Source: https://raw.githubusercontent.com/ossf/s2c2f/d0f0a7fbbc6cc6cb6a248cbc9e98c3d8cf3b189a/specification/framework.md

- **FIX-1 (L4).** Implement a change in the code to address a zero-day vulnerability, rebuild, deploy to your organization, and confidentially contribute the fix to the upstream maintainer
