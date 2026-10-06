# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Credential Management Level 1

Source: https://www.w3.org/TR/credential-management-1/

This specification describes an imperative API enabling a website to request a user’s credentials from a user agent, and to help the user agent correctly store user credentials for future use.

- **2.1. Infrastructure.** User agents MUST internally provide a credential store , which is a vendor-specific, opaque storage mechanism to record which credentials have been effective .
- **2.2.1. Credential Internal Methods.** Unless otherwise specified, each interface object created for interfaces which inherit from Credential MUST provide implementations for at least one of these internal methods, overriding Credential ’s default implementations, as appropriate for the credential type.
- **2.2.1.4. [[Create]] internal method.** This algorithm MUST be invoked from a task .
- **2.2.2. CredentialUserData Mixin.** This URL MUST be an potentially trustworthy URL .
- **2.3. navigator.credentials.** partial interface Navigator { [ SecureContext , SameObject ] readonly attribute CredentialsContainer credentials ; }; The credentials attribute MUST return the CredentialsContainer associated with the active document ’s browsing context .
- **2.3. navigator.credentials.** store(credential) When store() is called, the user agent MUST return the result of executing Store a Credential on credential .
- **2.3. navigator.credentials.** create(options) When create() is called, the user agent MUST return the result of executing Create a Credential on options .
- **2.3. navigator.credentials.** preventSilentAccess() When preventSilentAccess() is called, the user agent MUST return the result of executing Prevent Silent Access on the current settings object .

## A Well-Known URL for Changing Passwords

Source: https://www.w3.org/TR/change-password-url/

This specification defines a well-known URL that sites can use to make their change password forms discoverable by tools. This simple affordance provides a way for software to help the user find the way to change their password.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **3. Change Password URLs.** A change password url of an origin is a URL that points to a resource that clients can use to discover where a user should go to update their password on origin .
- **3. Change Password URLs.** Servers should redirect HTTP requests for an origin’s change password url to the actual page on which users may change their password by returning a response with a redirect status of 302, 303, or 307, and a Location header.
- **3. Change Password URLs.** [FETCH] [HTTP-SEMANTICS] Clients must handle such redirects when requesting a change password url .
- **3. Change Password URLs.** [HTML] Clients should handle such redirects when requesting a change password url .
- **3. Change Password URLs.** Servers must not locate the actual change password page at the change password url , per RFC8615 §1.1 Appropriate Use of Well-Known URIs .
- **3. Change Password URLs.** Clients must handle ok status responses when requesting a change password url .
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.

## A Well-Known URL for Relying Party Passkey Endpoints Level 1

Source: https://www.w3.org/TR/passkey-endpoints-1/

This specification defines a well-known URL which WebAuthn Relying Parties (RPs) can host to make their creation, management, and other informational endpoints discoverable by WebAuthn Clients and credential managers.

- **3. Passkey Endpoints URLs.** To advertise support for passkeys and/or provide direct endpoints for passkey creation and management, Relying Parties MUST host a JSON document at the path formed by concatenating the string .well-known/passkey-endpoints with the https scheme and relying party identifier as per [WELL-KNOWN] .
- **3.1. Server Response.** A successful response MUST use the 200 OK HTTP status code and return a JSON object using the application/json content type.
- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **4. Usage by WebAuthn Clients and Credential Managers.** RPs leveraging PRF should provide a dedicated informational page detailing how their passkeys are used beyond authentication and the implications of deletion.
- **4. Usage by WebAuthn Clients and Credential Managers.** This page’s URL should be the value of the prfUsageDetails key.
- **4. Usage by WebAuthn Clients and Credential Managers.** When this member is present, credential managers should display a warning during the passkey deletion flow, including a link to the RP’s informational page.
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.
