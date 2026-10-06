# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Architecture Document 3.1: technical compatibility

Source: https://gitlab.com/gaia-x/technical-committee/architecture-working-group/architecture-document/-/raw/3.1/docs/gaia-x_technical_compatibility_specifications.md

- **Defining Technical Compatibility.** In case a Gaia-X Technical Compatibility (test) kit (GX-TCK) is available, this must additionally be demonstrated by passing all (test) cases and requirements of the GX-TCK associated with the respective version of the Architecture Document.
- **Verifying Gaia-X Credentials.** To ensure a Gaia-X Credential's integrity and authenticity, its claims MUST be cryptographically signed by the Issuer to prevent tampering and enable verification of the origin of the claims.
- **Verifying Gaia-X Credentials.** The publicKeyJwk property MUST include either the RFC7517 x5c (X.509 Certificate Chain) parameter or RFC7517 x5u (X.509 URL) parameter.
- **Verifying Gaia-X Credentials.** To ensure the correct cryptographic tools are used with the public key, the alg property MUST be specified, and the value must comply with the JSON Web Algorithms RFC7518 alg.
- **Gaia-X Schema.** To ensure compliance with Gaia-X and/or specific ecosystem extensions, this data graph must be validated against the given SHACL shapes graph according to the SHACL specification.
- **Checking JWT Headers.** The JWT headers must be checked to ensure the content-type and type fields conform to the specification.
- **Verifying and Decoding JWT.** The aforementioned verification method in the `kid` retrieved from the DID document must also contain a certificate delivered from a Trust Service Provider.

## ICAM 25.11: Gaia-X Credentials

Source: https://gitlab.com/gaia-x/technical-committee/identity-credentials-and-access-management-working-group/icam/-/raw/25.11/docs/gaia-x_credentials.md

- **Identifiers.** The `@id` MUST be present and unique for a given `issuer`.
- **Type Property.** The `@type` property MUST be present in Verifiable Presentation and Verifiable Credentials.
- **Type Property.** For compliance with Gaia-X and/or a different ecosystem, this _data graph_ MUST be validated against the given _shapes graph_ according to the [SHACL specification](https://www.w3.org/TR/shacl/#validation-definition).
- **Header.** The VC-JWT header MUST contain the following fields:
- **VC-JWT Payload.** The `vc` and `vp` payload claims MUST NOT be present.
- **VC-JWT Payload.** If the `@type` is "VerifiableCredential", the property `credentialSubject` MUST be defined.
- **Credential Subject.** Each credential subject MUST have an [`@id`](#identifiers).
- **Standard Verifiable Presentation.** The value of `verifiableCredential` property MUST be an array of one or more [Enveloped Verifiable Credentials](#enveloped-verifiable-credential).
- **Issuer Requirements.** The `issuer` property MUST be present in a Verifiable Credential and a Verifiable Presentation.
- **Issuer Requirements.** The value of the `issuer` property MUST be a resolvable URI.

## ICAM 25.11: Digital identities

Source: https://gitlab.com/gaia-x/technical-committee/identity-credentials-and-access-management-working-group/icam/-/raw/25.11/docs/digital_identities.md

- **Binding Digital Identities to Claims.** When an issuer provides a claim, the issuer’s digital identity MUST be verified to ensure that the claim originates from a trusted and authorized source.
- **DID Resolution.** If the credential relies on an X.509 certificate chain, the verifier MUST validate that the chain terminates at a root certificate authority recognised by the ecosystem’s Registry.
- **Verification Method (JSON Web Key).** A subject’s identity record (such as a DID document or equivalent reference) MUST publish a publicKeyJwk parameter or reference a jwks_uri that resolves to a JSON Web Key Set (JWKS).
- **Self-Sovereign Identity (SSI) Implementation.** When implementing SSI with verifiable credentials, all claims MUST be bound to a single keypair rather than multiple keypairs to maintain cryptographic integrity and clear accountability.
- **Legal Requirements for Human Sign-off.** When a legally binding signature is needed (e.g., signing a contract or consent), the workflow MUST pause and hand off to the user to sign with their personal credentials.

## Compliance Document 4.0.0: Trust Anchors and overarching rules

Source: https://gitlab.com/gaia-x/policy-rules-committee/compliance-document/-/raw/4.0.0/docs/Gaia-X_Trust_Anchors.md

The last quote is from the overarching rules page: https://gitlab.com/gaia-x/policy-rules-committee/compliance-document/-/raw/4.0.0/docs/overarching_rules.md

- **Trust Service Provider.** The Trust Service Providers (TSP) accredited by Gaia-X must be entities issuing cryptographic material based on documented Know Your Business/Know Your Customer [(KYB/KYC)](https://en.wikipedia.org/wiki/Know_your_customer) processes.
- **Trusted Data Sources and Notaries.** A Gaia-X Notary must be a Gaia-X participant capable of translating an unsigned evidence to a signed machine readable evidence.
- **Trusted Data Sources and Notaries.** For signing, the Gaia-X Notary must use a cryptographic material issued by a Trust Anchor.
- **Inheritance mechanism.** To achieve Gaia-X Standard Compliance each service listed as dependency must also meet the criteria for Gaia-X Standard Compliance.
