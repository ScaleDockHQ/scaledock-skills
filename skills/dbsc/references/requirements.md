# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Device Bound Session Credentials Level 1

Source: https://www.w3.org/TR/dbsc-1/

Device Bound Sessions Credentials (DBSC) aims to prevent hijacking via cookie theft by building a protocol and infrastructure that allows a user agent to assert possession of a securely-stored private key. DBSC is a Web API and a protocol between user agents and servers to achieve this binding.

- **3. Privacy Considerations.** As such, we require that browsers MUST clear sessions and keys when clearing other site data (like cookies).
- **8.11. Create session key pair.** User agents SHOULD place an upper limit on the number of registrable origin labels in "relying_origins" to prevent abuse.
- **9.1. `Secure-Session-Registration` HTTP header field.** Its ABNF is: SecureSessionRegistration = sf-list Each item in the list must be an inner list, and each item in the inner list MUST be an sf-token representing a supported algorithm (ES256, RS256).
- **9.2.1. `Secure-Session-Challenge` structured header serialization.** Challenges MUST have an sf-parameter named "id" , whose value MUST be a string representing a session identifier .
- **9.2.1. `Secure-Session-Challenge` structured header serialization.** Any other sf-parameter s SHOULD be ignored.
- **9.3. `Secure-Session-Response` HTTP header field.** Its ABNF is: SecureSessionResponse = sf-string This string MUST only contain the DBSC proof JWT.
- **9.4. `Sec-Secure-Session-Id` HTTP header field.** Its ABNF is: SecSecureSessionId = sf-string This string MUST only contain the session identifier.
- **9.5. `Secure-Session-Skipped` HTTP header field.** Its ABNF is: SecureSessionSkipped = sf-list Each item in the list MUST be an sf-token representing a coarse-grained reason for skipping cookie refresh.
