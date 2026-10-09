# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Signature Specification

Source: https://raw.githubusercontent.com/notaryproject/specifications/v1.1.0/specs/signature-specification.md

- **Payload.** The prefix `io.cncf.notary` in `annotations` key is reserved for use in Notary Project signature and MUST NOT be used outside this specification.
- **Signed Attributes.** Any metadata that is used to verify the payload itself, and establish trust MUST be stored separately from the payload itself, as signed attributes or claims.
- **Signed Attributes.** Claims that MUST be processed by a verifier MUST be marked as critical.
- **Extended attributes.** These attributes MAY be marked critical, i.e. the attribute MUST be understood and processed by a verifier, unknown critical attributes MUST cause signature verification to fail.
- **Unsigned Attributes.** The certificate chain MUST be authenticated against a trust store as part of signature validation.
- **Algorithm Selection.** The signing certificate's public key algorithm and size MUST be used to determine the signature algorithm.
- **Leaf Certificates.** For RSA public key, the key length MUST be 2048 bits or higher.
- **Other requirements.** Valid certificate chain MUST contain a root certificate.
- **Other requirements.** Any certificate in the certificate chain MUST NOT use SHA1WithRSA and ECDSAWithSHA1 signatures.
- **Other requirements.** The certificates in the certificate chain MUST be valid at signing time.
- **Signing time & Authentic Signing time.** The _Timestamp Signature_ unsigned attribute MUST NOT be used as an `authentic signing time`.

## Trust Store and Trust Policy Specification

Source: https://raw.githubusercontent.com/notaryproject/specifications/v1.1.0/specs/trust-store-trust-policy.md

- **Trust Store.** Implementation MUST validate that the named store directory or certificate files are not symlinks, and fail if it does not meet this condition.
- **Version 1.0.** To enable timestamp verification, type `tsa` MUST be configured.
- **Trust Policy Constraints.** Each trust policy MUST contain scope property `registryScopes` and the scope collection MUST contain at least one value.
- **Trust Policy Constraints.** The repository URI MUST NOT contain the asterisk character `*`.
- **Selecting a trust policy to verify a signed OCI artifact.** If there exists a trust policy whose scope contains the artifact's repository URI then the aforementioned policy MUST be used for signature evaluation.
- **Trusted Identities Constraints.** Each identity in `identities` list MUST contain country (C), state or province (ST or S), and organization (O) RDNs.
- **Trusted Identities Constraints.** `trustedIdentities` list items MUST NOT have overlapping values, they are considered overlapping if there exists a certificate for which multiple DNs evaluate true.
- **Revocation Checking with OCSP.** The OCSP signing certificate must be issued by the same CA as the certificate being verified or the OCSP response must be signed by the issuing CA.

## Signing and Verification Workflow

Source: https://raw.githubusercontent.com/notaryproject/specifications/v1.1.0/specs/signing-and-verification-workflow.md

- **Signing Steps.** If any of the above timestamping step failed, implementations MUST fail the signing process.
- **Verification Prerequisites.** The user must resolve the `latest` tag to a digest and construct a new artifact reference using the resolved digest `wabbit-networks.io/software@sha256:${digest}`.
- **Verification Steps.** If digests and custom annotations are equal, signature verification is considered successful.
