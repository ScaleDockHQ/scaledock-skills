# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## UMA 2.0 Grant

Source: https://docs.kantarainitiative.org/uma/wg/rec-oauth-uma-grant-2.0.html

This specification defines a means for a client, representing a requesting party, to use a permission ticket to request an OAuth 2.0 access token to gain access to a protected resource asynchronously from the time a resource owner authorizes access.

- **1.1 Notational Conventions.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC2119] .
- **1.1 Notational Conventions.** Any entity receiving or retrieving a JSON data structure SHOULD ignore extension parameters it is unable to understand.
- **2. Authorization Server Metadata.** The authorization server MUST make a discovery document available.
- **2. Authorization Server Metadata.** The structure of the discovery document MUST conform to that defined in [OAuthMeta] .
- **2. Authorization Server Metadata.** The discovery document MUST be available at an endpoint formed by concatenating the string /.well-known/uma2-configuration to the issuer metadata value defined in [OAuthMeta] , using the well-known URI syntax and semantics defined in [RFC5785] .
- **2. Authorization Server Metadata.** As discussed in Section 4 , an authorization server supporting a profile or extension related to UMA SHOULD supply the specification's identifying URI (if any) here.
- **2. Authorization Server Metadata.** If the authorization server supports dynamic client registration, it MUST allow client applications to register claims_redirect_uri metadata, as defined in Section 3.3.2 , using the following metadata field: claims_redirect_uris OPTIONAL.
- **3.2 Resource Server Responds to Client's Tokenless Access Attempt.** The resource server MUST obtain a permission ticket from the authorization server to provide in its response, but the means of doing so is outside the scope of this specification.

## UMA 2.0 Federated Authorization

Source: https://docs.kantarainitiative.org/uma/wg/rec-oauth-uma-federated-authz-2.0.html

This specification defines a means for an UMA-enabled authorization server and resource server to be loosely coupled, or federated, in a secure and authorized resource owner context.

- **1.1 Notational Conventions.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC2119] .
- **1.1 Notational Conventions.** Any entity receiving or retrieving a JSON data structure SHOULD ignore extension parameters it is unable to understand.
- **1.3 HTTP Usage, API Security, and Identity Context.** The authorization server MUST use TLS protection over its protection API endpoints, as governed by [BCP195] , which discusses deployment and adoption characteristics of different TLS versions.
- **1.3 HTTP Usage, API Security, and Identity Context.** The authorization server MUST use OAuth and require a valid PAT to secure its protection API endpoints.
- **1.3 HTTP Usage, API Security, and Identity Context.** The authorization server and the resource server (as an OAuth client) MUST support bearer usage of the PAT, as defined in [RFC6750] .
- **1.5 Protection API Summary.** The authorization server MUST declare its protection API endpoints in the discovery document (see Section 2 ).
- **2. Authorization Server Metadata.** In addition to the metadata defined in that specification and [OAuthMeta] , this specification defines the following metadata for inclusion in the discovery document: permission_endpoint REQUIRED.
- **2. Authorization Server Metadata.** resource_registration_endpoint REQUIRED.
