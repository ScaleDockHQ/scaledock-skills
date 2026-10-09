# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. SP 800-53 states each control as an imperative outcome rather than with SHALL or MUST, so these are the control statements quoted as written (only line breaks and hyphenation from PDF layout were joined). Bracketed `[Assignment: ...]` and `[Selection: ...]` parts are organization-defined parameters to fill in. Apply the ones that match the role. Each is labelled with its control identifier.

## SP 800-53 Rev 5 controls

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf

- **AC-2.** Define and document the types of accounts allowed and specifically prohibited for use within the system;
- **AC-3.** Enforce approved authorizations for logical access to information and system resources in accordance with applicable access control policies.
- **AC-6.** Employ the principle of least privilege, allowing only authorized accesses for users (or processes acting on behalf of users) that are necessary to accomplish assigned organizational tasks.
- **AC-17.** Authorize each type of remote access to the system prior to allowing such connections.
- **AU-6.** Report findings to [Assignment: organization-defined personnel or roles]; and
- **AU-9.** Protect audit information and audit logging tools from unauthorized access, modification, and deletion; and
- **CM-2.** Develop, document, and maintain under configuration control, a current baseline configuration of the system; and
- **CM-7.** Configure the system to provide only [Assignment: organization-defined mission essential capabilities]; and
- **IA-2.** Uniquely identify and authenticate organizational users and associate that unique identification with processes acting on behalf of those users.
- **IA-2(1).** Implement multi-factor authentication for access to privileged accounts.
- **IR-4.** Implement an incident handling capability for incidents that is consistent with the incident response plan and includes preparation, detection and analysis, containment, eradication, and recovery;
- **PT-2.** Restrict the [Assignment: organization-defined processing] of personally identifiable information to only that which is authorized.
- **RA-5.** Monitor and scan for vulnerabilities in the system and hosted applications [Assignment: organization-defined frequency and/or randomly in accordance with organization-defined process] and when new vulnerabilities potentially affecting the system are identified and reported;
- **SA-8.** Apply the following systems security and privacy engineering principles in the specification, design, development, implementation, and modification of the system and system components: [Assignment: organization-defined systems security and privacy engineering principles].
- **SA-11.** Implement a verifiable flaw remediation process; and
- **SC-7.** Monitor and control communications at the external managed interfaces to the system and at key internal managed interfaces within the system;
- **SC-8.** Protect the [Selection (one or more): confidentiality; integrity] of transmitted information.
- **SC-12.** Establish and manage cryptographic keys when cryptography is employed within the system in accordance with the following key management requirements: [Assignment: organization-defined requirements for key generation, distribution, storage, access, and destruction].
- **SC-28.** Protect the [Selection (one or more): confidentiality; integrity] of the following information at rest: [Assignment: organization-defined information at rest].
- **SI-2.** Test software and firmware updates related to flaw remediation for effectiveness and potential side effects before installation;
- **SI-2.** Install security-relevant software and firmware updates within [Assignment: organization-defined time period] of the release of the updates; and
