# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Linked Web Storage Protocol 1.0

Source: https://www.w3.org/TR/lws10-core/

The Linked Web Storage Protocol specification aims to provide applications with secure and permissioned access to externally stored data in an interoperable way.

- **2.3 Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , REQUIRED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2.3 Conformance.** A LWS Server is an HTTP server [ rfc9112 ] that complies with all of the relevant " MUST " statements in this specification.
- **2.3 Conformance.** Specifically, the relevant normative " MUST " statements in 9.
- **2.3 Conformance.** Operations of this document MUST be respected.
- **2.3 Conformance.** An LWS Client is an HTTP client [ rfc9112 ] that complies with all of the relevant " MUST " statements in this specification.
- **4.1 Authentication Credential Data Model.** An authentication credential MUST include tamper evident claims about a subject, including: subject REQUIRED — an identifier for an end user.
- **4.1 Authentication Credential Data Model.** issuer REQUIRED — an identifier for the entity that issued the authentication credential .
- **4.1 Authentication Credential Data Model.** client REQUIRED — an identifier for a client application.

## LWS 1.0 Authentication Suite: OpenID Connect

Source: https://www.w3.org/TR/lws10-authn-openid/

This document defines an OpenID Connect-based authentication suite for the Linked Web Storage (LWS) protocol, enabling LWS applications to integrate with OpenID providers.

- **2. Conformance.** The key words MUST , MUST NOT , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **4. Authentication Credential Serialization.** The ID Token MUST NOT use "none" as the signing algorithm.
- **4. Authentication Credential Serialization.** The ID Token MUST use the sub (subject) claim for the LWS subject identifier.
- **4. Authentication Credential Serialization.** The ID Token MUST use the iss (issuer) claim for the LWS issuer identifier.
- **4. Authentication Credential Serialization.** The ID Token MUST use the azp (authorized party) claim for the LWS client identifier.
- **4. Authentication Credential Serialization.** Any audience restriction in the ID Token MUST use the aud (audience) claim.
- **4. Authentication Credential Serialization.** The aud claim SHOULD include the client identifier and any additional target audience such as an authorization server.
- **5. Authentication Credential Validation.** In the absence of a pre-existing trust relationship, the validator MUST dereference the sub (subject) claim in the authentication credential .

## LWS 1.0 Authentication Suite: SAML 2.0

Source: https://www.w3.org/TR/lws10-authn-saml/

This document defines a SAML-based authentication suite for the Linked Web Storage (LWS) protocol, enabling LWS applications to integrate with SAML 2.0 identity providers.

- **2. Conformance.** The key words MUST and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **4. Authentication Credential Serialization.** SAML tokens used as authentication credentials MUST be signed.
- **4. Authentication Credential Serialization.** In addition, a valid SAML token MUST include the following assertions: The SAML token MUST use the saml:NameID assertion for the LWS subject identifier.
- **4. Authentication Credential Serialization.** The SAML token MUST use the saml:Issuer assertion for the LWS issuer identifier.
- **4. Authentication Credential Serialization.** The SAML token MUST use the Recipient parameter within a saml:SubjectConfirmationData assertion for the LWS client identifier.
- **4. Authentication Credential Serialization.** Any audience restriction in the SAML token MUST use the saml:Audience assertion.
- **4. Authentication Credential Serialization.** The saml:Audience assertion SHOULD include a client identifier and any additional target audience such as an authorization server.
- **5. Authentication Credential Validation.** Using a trust relationship with an issuer, the signature of the credential MUST be validated as described in SAML Core, section 5 [ SAML2-CORE ].

## LWS 1.0 Authentication Suite: Self-signed Identity using Controlled Identifiers

Source: https://www.w3.org/TR/lws10-authn-ssi-cid/

This document defines an authentication suite for the Linked Web Storage (LWS) protocol, enabling clients that are able to sign their own identity tokens to integrate with LWS.

- **2. Conformance.** The key words MAY , MUST , and MUST NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **4. Authentication Credential Serialization.** The JWT MUST NOT use "none" as the signing algorithm.
- **4. Authentication Credential Serialization.** The JWT MUST use the sub (subject) claim for the LWS subject identifier.
- **4. Authentication Credential Serialization.** The JWT MUST use the iss (issuer) claim for the LWS issuer identifier.
- **4. Authentication Credential Serialization.** The JWT MUST use the client_id (client ID) claim for the LWS client identifier.
- **4. Authentication Credential Serialization.** The claims sub , iss , and client_id MUST all use the same URI value.
- **4. Authentication Credential Serialization.** Any audience restriction in the ID Token MUST use the aud (audience) claim.
- **4. Authentication Credential Serialization.** The aud claim MUST include the target authorization server.

## Linked Web Storage Use Cases

Source: https://www.w3.org/TR/lws-ucs/

User stories and use cases for the Linked Web Storage ( LWS ) spec.

- **4. Requirements.** Authorized Entities SHOULD be able to detect whether data has been tampered with or corrupted (whether at rest or in transit).
- **4. Requirements.** An Entity SHOULD be able to impose additional conditions on Resource access based on contexts such as time windows, location, and group membership status, among others.
- **4. Requirements.** Issues: #17 , #65 , #179 Stories: Context-Aware Access Policies Trusted Identity Providers — The protocol shall enable Storage Providers to establish trust relationships with Identity Providers of their choosing, rather than blindly accepting any identity source (though such blind acceptance SHOULD also be a configurable option).
- **4. Requirements.** The protocol should also allow for group hierarchies (which may also be thought of as nested groups), e.g., Solid-admin can be defined as a subset of Solid-contributors, so all permissions given to Solid-contributors also apply to Solid-admin.
- **4. Requirements.** Servers should provide a discoverable description of their supported protocol versions, extensions, and features.
- **4. Requirements.** This should not impede the ability of an Entity to operate or self-host such a service.
- **4. Requirements.** Clients should be able to experience a single coherent Storage view even if data is split or migrated across providers, supporting scenarios like jurisdictional partitioning or provider failover.
- **4. Requirements.** While HTTP(S) is expected, the protocol's semantics must be mappable to alternative or future transports (e.g., gRPC, GraphQL over WebSocket, local IPC) without changing its fundamental model.

## Linked Web Storage Vocabulary

Source: https://www.w3.org/TR/lws10-vocab/

This document describes the Linked Web Storage Vocabulary , i.e., the RDFS [ RDF-SCHEMA ] vocabulary used by the Linked Web Storage Protocol [ lws-core ] . Alternate versions of the vocabulary definition exist in Turtle and JSON-LD . Published: 2026-07-14 Version Info: 1.0 See Also: https://www.w3.org/TR/lws-protocol/

- **abstract.** This document describes the Linked Web Storage Vocabulary , i.e., the RDFS [ RDF-SCHEMA ] vocabulary used by the Linked Web Storage Protocol [ lws-core ] . Alternate versions of the vocabulary definition exist in Turtle and JSON-LD . Published: 2026-07-14 Version Info: 1.0 See Also: https://www.w3.org/TR/lws-protocol/
