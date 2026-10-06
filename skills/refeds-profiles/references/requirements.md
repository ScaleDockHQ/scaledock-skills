# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## MFA Profile 1.2

Source: https://zenodo.org/records/10135577

- **§ 4.** An IdP MUST NOT do so when a bypass or omission of one or more factors occurs (e.g., failing “open” for reliability of local services).
- **§ 4.1.** The authentication of the user’s current session MUST use a combination of at least two of the four distinct types of factors, that is something an entity has (e.g., a hardware device containing a credential), something an entity knows (e.g., password), something an entity is (e.g., biometric), something an entity does (e.g., behavioural).
- **§ 4.2.** Subsequently, the factors used MUST be independent; this includes processes to recover, replace, or add authentication factors.
- **§ 4.2.** The combination of the factors MUST mitigate risks related to attacks such as phishing, offline cracking, online guessing and theft of a (single) factor.
- **§ 5.1.1.** When this identifier is used in the <RequestedAuthnContext> element in an SP’s request (Section 3.4.1 of [SAMLCore]), the SP indicates a requirement that the IdP MUST authenticate the subject in accordance with the requirements in Section 4.
- **§ 5.1.2.1.** An IdP responding with the REFEDS MFA Profile context class reference SHOULD set AuthnInstant (Section 2.7.2 of [SAMLCore]) to the earliest time at which the user was authenticated with any of the factors used to satisfy the MFA requirements.
- **§ 5.1.2.2.** If the IdP is unable to process the immediate and explicit authentication challenges described above, the IdP SHOULD return an error response to the SP when responding to a SAML authentication request with ForceAuthn set to true.
- **§ 5.1.3.4.** Finally, an SP must always be prepared to handle a SAML response that contains an error status rather than an assertion (see third example in Section 5.1.4 for SAML response indicating failure).
- **§ 5.2.1.** When this identifier is used in an RP’s request (Section 5.5 of [OIDC]), the RP indicates a requirement that the OP MUST authenticate the subject in accordance with the requirements in Section 4.
- **§ 5.2.1.** The use of the acr_values parameter MUST NOT be used for this purpose, because it signals a non-essential or voluntary claim requirement, and cannot cause the OP to enforce the use of the Profile.

## SFA Profile 1.0

Source: https://zenodo.org/records/5113499

- **§ 4.** Authentication secrets at rest and in online transit must be cryptographically protected.
- **§ 4.** An existing secret must not be sent to the user (e.g. a stored password).

## Assurance Framework 2.0

Source: https://zenodo.org/records/10277233

- **§ 3.** If a CSP is releasing any other assurance values in this framework for a Person it MUST also release: https://refeds.org/assurance
- **§ 5.** CSPs MUST send the version 2 claim if they also send an IAP high claim based on RAF 2.0.
- **§ 5.1.1.** A unique identifier MUST represent one and only one Person in the CSP’s system.
- **§ 5.1.1.** A non-reassignable identifier is attached to only one Person, i.e., once created, it MUST NOT be repurposed to represent another Person at any time, even when the Person associated with the identifier no longer exists in the issuing identity system.
- **§ 5.2.1.** A CSP asserting an IAP value of “high” for a user MUST also assert the IAP values “medium” and “low” for that user.
- **§ 5.2.1.** A CSP asserting an IAP value of “medium” for a user MUST also assert the IAP value “low” for that user.
- **§ 5.3.** A CSP which asserts https://refeds.org/assurance/ATP/ePA-1d MUST also assert https://refeds.org/assurance/ATP/ePA-1m for a given user.
- **§ 6.** If a CSP signals espresso, the CSP MUST signal both cappuccino and espresso.

## Sirtfi 1.0

Source: https://zenodo.org/records/1256531

- **§ 2.1.** [OS1] Security patches in operating system and application software are applied in a timely manner.
- **§ 2.1.** [OS4] A user’s access rights can be suspended, modified or terminated in a timely manner.
- **§ 2.2.** [IR1] Provide security incident response contact information as may be requested by an R&E federation to which your organization belongs.
- **§ 2.2.** [IR6] Respect and use the Traffic Light Protocol [TLP] information disclosure policy.
- **§ 2.3.** [TR1] Relevant system generated information, including accurate timestamps and identifiers of system components and actors, are retained and available for use in security incident response procedures.
- **§ 2.4.** [PR1] The participant has an Acceptable Use Policy (AUP).

## Research and Scholarship 1.3

Source: https://zenodo.org/records/4700413

- **§ 5.** For SAML 2.0 the [SAMLAttr] profile MUST be used.
- **§ 7.** An Identity Provider that does not release all of the required elements of the R&S attribute bundle (defined in section 5), for any reason, SHALL NOT exhibit the R&S entity attribute in its metadata.

## Personalized Access v2

Source: https://zenodo.org/records/7684449

- **§ 4.** The federation registrar MUST remove the Entity Category if the Service Provider indicates a change in conformance.
- **§ 5.1.** The requirement to support the REFEDS Assurance Framework implies that at least one value, 'https://refeds.org/assurance' MUST be supplied, but no others are specifically required unless the IdP deems them to be applicable.
