# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 8484 DNS Queries over HTTPS (DoH)

Source: https://www.rfc-editor.org/rfc/rfc8484.html

- **document.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **document.** A DoH client MUST NOT use a different URI simply because it was discovered outside of the client's configuration (such as through HTTP/2 server push) or because a server offers an unsolicited response that appears to be a valid answer to a DNS query.
- **document.** Future specifications for new media types for DoH MUST define the variables used for URI Template processing with this protocol.
- **document.** DoH servers MUST implement both the POST and GET methods.
- **document.** The DoH client SHOULD include an HTTP Accept request header field to indicate what type of content can be understood in response.
- **document.** Irrespective of the value of the Accept request header field, the client MUST be prepared to process "application/dns-message" (as described in Section 6 ) responses but MAY also process other DNS- related media types it receives.
- **document.** In order to maximize HTTP cache friendliness, DoH clients using media formats that include the ID field from the DNS message header, such as "application/dns-message", SHOULD use a DNS ID of 0 in every DNS request.
- **document.** A DoH server MUST be able to process "application/dns-message" request messages.

## RFC 9460 Service Binding and Parameter Specification via the DNS (SVCB and HTTPS Resource Records)

Source: https://www.rfc-editor.org/rfc/rfc9460.html

This document specifies the "SVCB" ("Service Binding") and "HTTPS" DNS resource record (RR) types to facilitate the lookup of information needed to make connections to network services, such as for HTTP origins. SVCB records allow a service to be provided from multiple alternative endpoints, each with associated parameters (such as transport protocol configuration), and are extensible to support future uses (such as keys for encrypting the TLS ClientHello). They also enable aliasing of apex domains, which is not possible with CNAME. The HTTPS RR is a variation of SVCB for use with HTTP (see RFC 9110, "HTTP Semantics"). By providing more information to the client before it attempts to establi

- **abstract.** This document specifies the "SVCB" ("Service Binding") and "HTTPS" DNS resource record (RR) types to facilitate the lookup of information needed to make connections to network services, such as for HTTP origins. SVCB records allow a service to be provided from multiple alternative endpoints, each with associated parameters (such as transport protocol configuration), and are extensible to support future uses (such as keys for encrypting the TLS ClientHello). They also enable aliasing of apex domains, which is not possible with CNAME. The HTTPS RR is a variation of SVCB for use with HTTP (see RFC 9110, "HTTP Semantics"). By providing more information to the client before it attempts to establi
