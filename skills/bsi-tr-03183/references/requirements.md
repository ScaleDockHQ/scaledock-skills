# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Part 1: General requirements

Source: https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-1_v1_0_0.pdf?__blob=publicationFile

- **§ 5.8.1.1.3.** The manufacturer MUST identify all assets of the PwDE.
- **§ 5.8.1.2.3.** The manufacturer MUST identify the threats to the assets and the potentially affected components of the PwDE.
- **§ 5.9.3.** The manufacturer MUST analyse the risks of the PwDE in regard to their likelihood and potential impact.
- **§ 5.10.3.** The manufacturer MUST evaluate whether the analysed risks of the PwDE can be accepted or not.
- **§ 5.11.2.3.** The manufacturer MUST select and document applicable essential cybersecurity requirements from Annex I Part I (2) based on the selected controls.
- **§ 5.11.2.3.** The manufacturer MUST document and justify any non-applicable essential cybersecurity requirements from Annex I Part I (2) based on the associated risks.
- **§ 5.12.3.** The manufacturer MUST document the results of the risk assessment in a comprehensive manner.
- **§ 5.13.3.** The manufacturer MUST update the risk assessment when the risk context of the PwDE changes and treat new unaccepted risks accordingly.

## Part 2: Software Bill of Materials (SBOM)

Source: https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-2_v2_1_0.pdf?__blob=publicationFile

- **§ 3.1.** An SBOM MUST contain certain minimum information (see section 5).
- **§ 3.1.** A separate SBOM MUST be generated for each software version.
- **§ 3.1.** An SBOM MUST NOT contain vulnerability information, because SBOM data is static with respect to software that is not changing.
- **§ 4.** A newly generated or updated SBOM MUST be in JSON-or XML-format and a valid SBOM according to one of the following specifications in one of the specified versions:
- **§ 4.** CycloneDX9, version 1.6 or higher
- **§ 4.** Only officially released versions of these specifications MUST be used.
- **§ 5.1.** If the primary component depends on multiple instances of a component which have different meta-information, all these instances MUST be listed separately with their individual meta-information.
- **§ 5.2.1.** Each SBOM MUST contain at least the following information:
- **§ 5.2.2.** For each component included in an SBOM, at least the following information MUST be provided:
- **§ 5.2.2.** If no version is assigned this MUST be the modification date of the file expressed as date-time according to RFC 333913 section 5.6.
- **§ 6.1.** Licences MUST be referred to (in the sense of “named”) by their appropriate SPDX licence identifier or licence expression based on such an identifier.
- **§ 6.1.** While the SPDX and CycloneDX specifications allow for including licence text of components in SBOMs, this MUST NOT be used as a substitute for a licence identifier.
- **§ 8.2.** Components without any own “dependencies” MUST be declared as empty elements within the dependency graph.

## Part 3: Vulnerability Reports and Notifications

Source: https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-3_v1_0_0.pdf?__blob=publicationFile

- **§ 4.1.1.** The manufacturer MUST operate a website to publicly provide at least security related information about itself and its products.
- **§ 4.2.** To make it easier for the reporting entity to find the right contact for vulnerability reports, a security.txt in accordance with RFC 9116 MUST be created and made available on the manufacturer's website.
- **§ 4.2.1.** The manufacturer MUST create a file with the name security.txt directly in the path /.well-known/ (e.g. /.well-known/security.txt).
- **§ 4.2.2.** This canonical URI MUST reflect the true location of the authoritative file and MUST be accessible without redirects.
- **§ 4.2.6.** At least the language tag for English (en) MUST be specified.
- **§ 4.2.9.** The manufacturer MUST check the information in the security.txt at least quarterly and correct or supplement it if necessary.
- **§ 4.2.10.** The manufacturer MUST digitally sign its security.txt using OpenPGP according to RFC 958022.
- **§ 4.3.1.** The manufacturer MUST create at least two roles of responsible cybersecurity contacts, its PSIRT and its CSIRT.
- **§ 4.3.3.** This web form MUST allow to anonymously submit vulnerability reports.
- **§ 4.4.1.** The manufacturer MUST review the CVD policy at least yearly to ensure that it is up to date.
- **§ 4.4.4.** The manufacturer MUST NOT require the reporting entity to sign a non-disclosure agreement (NDA).
- **§ 4.4.8.** The manufacturer MUST ensure that a simple response to a vulnerability report or an update of an existing report is provided within five working days, unless a vulnerability was reported anonymously.
- **§ 4.4.8.** This simple response MUST NOT be an automated response.
- **§ 4.4.8.** The manufacturer MUST ensure that detailed feedback after further analysis is provided within ten working days, unless a vulnerability was reported anonymously.
- **§ 4.4.10.** The manufacturer MUST ensure that validated and verified vulnerabilities are publicly disclosed within 90 days, unless the manufacturer becomes aware of a vulnerability and fixes it before the affected product is placed on the market.
- **§ 4.5.1.** This web page MUST be accessible at least via an easy-to-find link on the home page of the manufacturer’s website without activated JavaScript or other client-side executed scripts.
