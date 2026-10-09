# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. The schema describes each catalog field; the directive's required actions bind Federal Civilian Executive Branch agencies and are a reference timeline for everyone else. Quotes are given as written. Apply the ones that match the role. Schema quotes are labelled with the field name; directive quotes with the directive and its section.

## KEV catalog JSON schema

Source: https://raw.githubusercontent.com/cisagov/kev-data/b244ed1a640323565afba92100d7308d51c6614e/known_exploited_vulnerabilities_schema.json

- **cveID.** The CVE ID of the vulnerability in the format CVE-YYYY-NNNN, note that the number portion can have more than 4 digits
- **dateAdded.** The date the vulnerability was added to the catalog in the format YYYY-MM-DD
- **requiredAction.** The required action to address the vulnerability
- **dueDate.** The date the required action is due in the format YYYY-MM-DD
- **knownRansomwareCampaignUse.** 'Known' if this vulnerability is known to have been leveraged as part of a ransomware campaign; 'Unknown' if CISA lacks confirmation that the vulnerability has been utilized for ransomware
- **forensicTriage.** 'Yes' if this vulnerability requires forensic triage per BOD 26-04; 'No' if forensic triage is not required per BOD 26-04
- **cwes.** CWEs are in the format CWE-NNNN; note that the number portion can have any number of digits

## BOD 26-04: Prioritizing Security Updates Based on Risk

Source: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk

- **BOD 26-04 Background.** Asset Exposure: Is the vulnerable asset publicly exposed?
- **BOD 26-04 Background.** Exploit Automation: Is an adversary able to automate all the steps necessary to exploit the vulnerability?
- **BOD 26-04 Phase I.** Establish a process for ongoing remediation of vulnerabilities that CISA identifies, through inclusion in the KEV Catalog, as carrying significant risk to the federal enterprise within a time frame set by CISA pursuant to this Directive.
- **BOD 26-04 Phase I.** Monitor KEV Catalog updates and aggressively mitigate vulnerabilities in accordance with the KEV remediation timelines.
- **BOD 26-04 Phase III.** Remediate each vulnerability as quickly as possible and no later than the timelines set forth in Table 1: Remediation Timelines.
- **BOD 26-04 CISA Actions.** Update the catalog as quickly as possible and ensure it can publish updates at a pace that matches the rate at which CISA identifies new KEVs.
- **BOD 26-04 Appendix A.** The text “& forensic triage” means that the agency must complete remediation or mitigation action within the timeline (three days) and carry out a forensic triage of the asset to assess whether the system is compromised.
- **BOD 26-04 Appendix A.** However, if CISA adds a vulnerability to the KEV that was not in the KEV, the timeline for action will shorten according to Table 1.
- **BOD 26-04 Appendix A.** Whichever event occurs first starts the remediation timeline.
- **BOD 26-04 Appendix A.** The criteria for CISA to include a vulnerability in the KEV Catalog remain unchanged.

## BOD 22-01 (revoked): Frequently Asked Questions

Source: https://www.cisa.gov/news-events/directives/bod-22-01-reducing-significant-risk-known-exploited-vulnerabilities

BOD 22-01 is revoked, but BOD 26-04 keeps its KEV inclusion criteria unchanged. These FAQ answers state those criteria and how the catalog is meant to be used.

- **BOD 22-01 FAQ.** There are three criteria for adding a vulnerability to the KEV: (1) a CVE ID; (2) clear remediation guidance, and (3) reliable evidence of exploitation in the wild.
- **BOD 22-01 FAQ.** CISA will only remove a vulnerability if the vendor’s security update for that vulnerability causes a significant unforeseen issue with greater impact than the vulnerability itself.
- **BOD 22-01 FAQ.** Addition of a vulnerability to the KEV Catalog does not indicate that CISA is observing current active exploitation.
- **BOD 22-01 FAQ.** Organizations should use the KEV Catalog as an input to their vulnerability management prioritization framework.
