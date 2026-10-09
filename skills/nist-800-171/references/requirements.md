# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. SP 800-171 states each security requirement as an imperative outcome rather than with SHALL or MUST, so these are the requirement statements quoted as written (only line breaks and hyphenation from PDF layout were joined). Bracketed `[Assignment: ...]` and `[Selection: ...]` parts are organization-defined parameters (ODPs). Apply the ones that match the role. Each is labelled with its security requirement number.

## SP 800-171 Rev 3 security requirements

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-171r3.pdf

- **§ 2.2.** If ODP values for selected security requirements are not formally established or assigned by a federal agency or a consortium of federal agencies, nonfederal organizations must assign those values to complete the requirements.
- **03.01.02.** Enforce approved authorizations for logical access to CUI and system resources in accordance with applicable access control policies.
- **03.01.05.** Allow only authorized system access for users (or processes acting on behalf of users) that is necessary to accomplish assigned organizational tasks.
- **03.01.08.** Enforce a limit of [Assignment: organization-defined number] consecutive invalid logon attempts by a user during a [Assignment: organization-defined time period].
- **03.03.01.** Specify the following event types selected for logging within the system: [Assignment: organization-defined event types].
- **03.03.08.** Protect audit information and audit logging tools from unauthorized access, modification, and deletion.
- **03.04.01.** Develop and maintain under configuration control, a current baseline configuration of the system.
- **03.04.06.** Disable or remove functions, ports, protocols, connections, and services that are unnecessary or nonsecure.
- **03.05.03.** Implement multi-factor authentication for access to privileged and non-privileged accounts.
- **03.05.07.** Verify that passwords are not found on the list of commonly used, expected, or compromised passwords when users create or update passwords.
- **03.05.07.** Store passwords in a cryptographically protected form.
- **03.06.02.** Report suspected incidents to the organizational incident response capability within [Assignment: organization-defined time period].
- **03.08.03.** Sanitize system media that contain CUI prior to disposal, release out of organizational control, or release for reuse.
- **03.11.02.** Remediate system vulnerabilities within [Assignment: organization-defined response times].
- **03.13.01.** Implement subnetworks for publicly accessible system components that are physically or logically separated from internal networks.
- **03.13.08.** Implement cryptographic mechanisms to prevent the unauthorized disclosure of CUI during transmission and while in storage.
- **03.13.11.** Implement the following types of cryptography when used to protect the confidentiality of CUI: [Assignment: organization-defined types of cryptography].
- **03.14.01.** Install security-relevant software and firmware updates within [Assignment: organization-defined time period] of the release of the updates.
- **03.16.01.** Apply the following systems security engineering principles to the development or modification of the system and system components: [Assignment: organization-defined systems security engineering principles].
- **03.17.01.** Develop a plan for managing supply chain risks associated with the research and development, design, manufacturing, acquisition, delivery, integration, operations, maintenance, and disposal of the system, system components, or system services.
