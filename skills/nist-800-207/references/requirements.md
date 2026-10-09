# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. SP 800-207 states its tenets as defining rules and uses "must" and "should" in the explanation of each; the sentences are quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with its section and tenet number, or with its SP 800-207A recommendation identifier.

## SP 800-207: Zero Trust Architecture

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf

- **§ 1.** In this new paradigm, an enterprise must assume no implicit trust and continually analyze and evaluate the risks to its assets and business functions and then enact protections to mitigate these risks.
- **§ 2.** The system must ensure that the subject is authentic and the request is valid.
- **§ 2.** To allow the PDP/PEP to be as specific as possible, the implicit trust zone must be as small as possible.
- **§ 2.1 tenet 1.** All data sources and computing services are considered resources.
- **§ 2.1 tenet 2.** Access requests from assets located on enterprise-owned network infrastructure (e.g., inside a legacy network perimeter) must meet the same security requirements as access requests and communication from any other nonenterprise-owned network.
- **§ 2.1 tenet 2.** All communication should be done in the most secure manner available, protect confidentiality and integrity, and provide source authentication.
- **§ 2.1 tenet 3.** Access to individual enterprise resources is granted on a per-session basis.
- **§ 2.1 tenet 3.** Access should also be granted with the least privileges needed to complete the task.
- **§ 2.1 tenet 4.** Access to resources is determined by dynamic policy—including the observable state of client identity, application/service, and the requesting asset—and may include other behavioral and environmental attributes.
- **§ 2.1 tenet 5.** An enterprise implementing a ZTA should establish a continuous diagnostics and mitigation (CDM) or similar system to monitor the state of devices and applications and should apply patches/fixes as needed.
- **§ 2.1 tenet 6.** All resource authentication and authorization are dynamic and strictly enforced before access is allowed.
- **§ 2.1 tenet 7.** The enterprise collects as much information as possible about the current state of assets, network infrastructure and communications and uses it to improve its security posture.
- **§ 2.2.** Every asset must have its security posture evaluated via a PEP before a request is granted to an enterprise-owned resource (similar to tenet 6 above for assets as well as subjects).

## SP 800-207A: A Zero Trust Architecture Model for Access Control in Cloud-Native Applications in Multi-Location Environments

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207A.pdf

- **ID-SEG-REC-1.** Wherever they are located, communication between any two should be encrypted to ensure eavesdropping protection and message authenticity.
- **ID-SEG-REC-2.** Each service should present a short-lived cryptographically verifiable identity credential to other services that is authenticated per connection and reauthenticated regularly.
- **ID-SEG-REC-4.** This system should be used to issue a cryptographically verifiable runtime token that represents the user principal to the rest of the infrastructure (e.g., a JSON Web Token [JWT]), and services should authenticate the credential at each hop.
- **ID-SEG-REC-5.** The JWT libraries that process the token must be enabled to both decode (base64url encoding) and verify the signature.
