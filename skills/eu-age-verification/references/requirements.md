# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Operational, Security, Product, and Architecture Specifications

Source: https://raw.githubusercontent.com/eu-digital-identity-wallet/av-doc-technical-specification/8b9728752bd8d8eede6077ade4be8900949de2d9/docs/architecture-and-technical-specifications.md

- **§ 3.2.4.** To distinguish an authorised AP from an unauthorised one, all APs MUST be registered with the EU and included in a centrally maintained trusted list.
- **§ 3.3.** The identity proofing must rely on notified eID means or on evidence based on official documents (such as a passport, national ID card, or equivalent), but it does not necessarily require in-person presence.
- **§ 3.3.2.** The Age Verification App shall interface with physical identity documents compliant with ICAO Doc 9303 specifications for Machine Readable Travel Documents (MRTDs), including:
- **§ 3.4.1.** Since neither the Attestation Provider nor the Age Verification App Instance can determine, at issuance time, whether the fallback presentation mechanism will be required, the system SHALL support the issuance of attestations in batches so that the User has several attestations available.
- **§ 3.4.4.** The Trust Anchor (Service Digital Identifier) shall be used by Relying Parties to validate the attestation.
- **§ 3.4.4.** A Proof of Age Attestation Provider (AP) SHALL either acquire a document signer certificate compliant with ETSI EN 319 411-1 NCP policy from a certified QTSP or operate its own trust anchor CA compliant with ETSI EN 319 411-1 NCP policy, dedicated to the issuance of document signer certificates for signing proof of age attestations.
- **§ 4.2.** Where a Proof of Age attestation is presented as a plain ISO mDoc, the Age Verification App SHALL use a Proof of Age attestation only once and SHALL then remove it from the batch of the issued attestations.
- **§ 6.1.** The implementor SHALL be responsible for validating a National eID's and ePassport's authenticity against a national IACA and/or Schengen masterlist.
- **§ 6.1.** The QR code and/or token shall be based on the Pre-Authorized Code Flow of OpenID4VCI.
- **§ 6.2.** The issuing service SHALL support batch issuing for the age over nn attestation in accordance with Section 3.4.1.
- **§ 6.2.** Consequently, when an individual reaches the age of nn, they must obtain a new proof of age attestation.
- **§ 6.3.** The service SHALL include an mdoc trust manager to verify the MSO validity and authenticity.

## Annex A: Age Verification Profile

Source: https://raw.githubusercontent.com/eu-digital-identity-wallet/av-doc-technical-specification/8b9728752bd8d8eede6077ade4be8900949de2d9/docs/annexes/annex-A/annex-A-av-profile.md

- **§ A.4.** A Proof of Age attestation SHALL comply with this data model.
- **§ A.4.1.** The document type for Proof of Age attestation SHALL be `eu.europa.ec.av.1`.
- **§ A.4.2.** A Proof of Age Attestation SHALL NOT include any other attribute.
- **§ A.5.** As a way to invoke the AVI, at least a custom URL scheme av-vci:// MUST be supported.
- **§ A.6.** A plain ISO mDoc presentation SHALL be used as the fallback where, and only where, either (a) the User's device does not support Zero-Knowledge Proof generation, or (b) the OpenID for Verifiable Presentations transport is used.
- **§ A.6.** As a way to invoke the Age Verification App, at least a custom URL scheme av:// MUST be supported.
- **§ A.6.** The `request` and `request_uri` parameters MUST NOT be used (i.e., support for JAR is not required)
- **§ A.6.** A request MUST specify the nonce parameter
- **§ A.7.** All entities MUST support P-256 (secp256r1) as a key type with ES256 JWT algorithm for signing and signature validation whenever this profile requires to do so.
- **§ A.7.** SHA256 MUST be supported by all the entities as the hash algorithm to generate and validate the digests in the MDOC VC.
- **§ A.8.** An RP SHALL verify that the Zero-Knowledge Proof was generated using an accepted circuit, by verifying the circuit hash against the set of circuits accepted for the purposes of this profile, before verifying the proof.
- **§ A.8.** An RP SHALL reject a presentation generated using a circuit that is not among the accepted circuits.
- **§ A.8.** The RP SHALL be able to verify both a Zero-Knowledge Proof presentation and the plain ISO mDoc fallback presentation.
- **§ A.9.** A Relying Party SHALL NOT reject a presentation solely on the ground that it uses the plain ISO mDoc fallback mechanism.
