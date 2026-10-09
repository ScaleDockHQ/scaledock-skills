# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## App Launch: Launch and Authorization

Source: https://hl7.org/fhir/smart-app-launch/STU2.2/app-launch.html

- **App protection.** Apps SHALL ensure that when protocol steps include transmission of sensitive information (authentication secrets, authorization codes, tokens), transmission is ONLY to authenticated servers, over TLS-secured channels.
- **App protection.** An app SHALL NOT forward values passed back to its redirect URL to any other arbitrary or user-provided URL (a practice known as an "open redirector").
- **App protection.** An app SHALL NOT store bearer tokens in cookies that are transmitted as clear text.
- **Considerations for PKCE Support.** All SMART apps SHALL support Proof Key for Code Exchange (PKCE).
- **Considerations for PKCE Support.** SMART servers SHALL support the S256 code_challenge_method and SHALL NOT support the plain method.
- **Obtain authorization code, Request.** The app SHALL use an unpredictable value for the state parameter with at least 122 bits of entropy (e.g., a properly configured random uuid is suitable).
- **Obtain authorization code, Request.** Note on PKCE Support: the EHR SHALL ensure that the code_verifier is present and valid when the code is exchanged for an access token.
- **Obtain authorization code, Request.** For the current release, servers SHALL support the aud parameter and MAY support a resource parameter as a synonym for aud
- **Obtain authorization code, Response.** The app SHALL validate the value of the state parameter upon return to the redirect URL and SHALL ensure that the state value is securely tied to the user's current session (e.g., by relating the state value to a session identifier issued by the app).
- **Obtain access token, Response.** The authorization server's response SHALL include the HTTP "Cache-Control" response header field with a value of "no-store," as well as the "Pragma" response header field with a value of "no-cache."
- **Access FHIR API, Response.** The resource server SHALL validate the access token and ensure that it has not expired and that its scope covers the requested resource.
- **Refresh access token.** A refresh token SHALL be bound to the same client_id and SHALL contain the same or a subset of the claims authorized for the access token with which it is associated.

## Scopes and Launch Context

Source: https://hl7.org/fhir/smart-app-launch/STU2.2/scopes-and-launch-context.html

- **Scopes for requesting identity data.** The EHR SHALL support the inclusion of SMART's fhirUser claim within the id_token issued for any requests that grant the openid and fhirUser scopes.
- **Scopes for requesting identity data.** The EHR SHALL support Signing ID Tokens with RSA SHA-256.
- **Scopes for requesting identity data.** A SMART app SHALL NOT pass the auth_time claim or max_age parameter to a server that does not support receiving them.

## Asymmetric (public key) client authentication

Source: https://hl7.org/fhir/smart-app-launch/STU2.2/client-confidential-asymmetric.html

- **Registering a client (communicating public keys).** The client SHALL protect the associated private key from unauthorized disclosure and corruption.
- **Registering a client (communicating public keys).** The client SHALL support both RS384 and ES384 for the JSON Web Algorithm (JWA) header parameter
- **Registering a client (communicating public keys).** The FHIR authorization server SHALL be capable of validating signatures with at least one of RS384 or ES384
- **Authenticating to the Token endpoint, Signature Verification.** If an error is encountered during the authentication process, the server SHALL respond with an invalid_client error as defined by the OAuth 2.0 specification
- **Authenticating to the Token endpoint, Signature Verification.** The FHIR authorization server SHALL NOT cache a JWKS for longer than the client's cache-control header indicates.

## Conformance

Source: https://hl7.org/fhir/smart-app-launch/STU2.2/conformance.html

- **FHIR Authorization Endpoint and Capabilities Discovery using a Well-Known Uniform Resource Identifiers (URIs).** FHIR endpoints requiring authorization SHALL serve a JSON document at the location formed by appending /.well-known/smart-configuration to their base URL.
- **FHIR Authorization Endpoint and Capabilities Discovery using a Well-Known Uniform Resource Identifiers (URIs).** All endpoint URLs in the response document SHALL be absolute URLs.
- **Metadata.** The S256 method SHALL be included in this list, and the plain method SHALL NOT be included in this list.

## Backend Services

Source: https://hl7.org/fhir/smart-app-launch/STU2.2/backend-services.html

- **Obtain access token, Evaluate Requested Access.** Once the client has been authenticated, the FHIR authorization server SHALL mediate the request to assure that the scope requested is within the scope pre-authorized to the client.
- **Obtain access token, Issue Access Token.** Access tokens issued under this profile SHALL be short-lived
