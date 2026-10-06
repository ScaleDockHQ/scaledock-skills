# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Consent Receipt Specification 1.1.0

Source: https://kantarainitiative.org/download/consent-receipt-specification/

The PDF prints line numbers in the margin; they were removed from the quotes.

- **§ 4.2.** A Consent Receipt MUST include the fields defined as REQUIRED below.
- **§ 4.2.** When using JSON, the Consent Receipt MUST also be valid per the Consent Receipt schema in Section 4.8.
- **§ 4.3.1.** The value MUST be “KI-CR-v1.1.0” for this version of the specification.
- **§ 4.3.2.** This field MUST contain a non-empty string describing the jurisdiction(s).
- **§ 4.3.3.** The JSON value MUST be expressed as the number of seconds since 1970-01-01 00:00:00 GMT.
- **§ 4.3.4.** Collection Method is a key field for context and determining what fields MUST be used for the Consent Receipt.
- **§ 4.3.5.** A unique number for each Consent Receipt. SHOULD use UUID-4 [RFC 4122]. This field MUST contain a non-empty string.
- **§ 4.4.1.** Consent is not possible without an identifier. This field MUST contain a non-empty string.
- **§ 4.4.3.** For Sensitive PII, the PII Controller MUST be specified with legally required explicit notice to the PII Principal.
- **§ 4.4.6.** The JSON value MUST follow the schema at https://schema.org/PostalAddress.
- **§ 4.4.8.** This field MUST follow RFC 3966 [RFC 5341].
- **§ 4.4.10.** If a privacy policy changes, the link SHOULD continue to point to the old policy until there is evidence of an updated consent from the PII Principal. This field MUST contain a non-empty string.
- **§ 4.5.2.** The name of the service for which consent for the collection, use, and disclosure of PII is being provided. This field MUST contain a non-empty string.
- **§ 4.5.6.** The field MUST contain a non-empty string and the default value is “EXPLICIT”.
- **§ 4.5.6.** If consent was not explicit, a description of the consent method MUST be provided.
- **§ 4.5.9.** Conditions for the termination of consent. Link to policy defining how consent or purpose is terminated. This field MUST contain a non-empty string.
- **§ 4.5.11.** MUST be supplied if Third Party Disclosure is TRUE and MUST contain a non-empty string.
- **§ 4.5.13.** The field MUST contain a non-empty string if Sensitive PII is TRUE.
- **§ 4.7.** Although a CR can be provisioned in any manner that is feasible or expected based on the context, a CR MUST be provided to the PII Principal in a human-readable format either on screen or delivered to the PII Principal, or both.
- **§ 5.3.1.** Since Consent Receipts can contain PII, it is a requirement that transmission of Consent Receipts does not take place in the clear and that secure communications be used, e.g., HTTPS.
- **§ 5.3.2.** If a receipt contains PII - a receipt without PII is not in scope here - and it is transmitted securely, the user must be able to manage the receipt interactions with:
