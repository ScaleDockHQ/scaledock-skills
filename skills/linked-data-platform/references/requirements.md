# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Linked Data Platform 1.0

Source: https://www.w3.org/TR/ldp/

Linked Data Platform (LDP) defines a set of rules for HTTP operations on web resources, some based on RDF , to provide an architecture for read-write Linked Data on the web.

- **3. Conformance.** The key words MAY , MUST , MUST NOT , RECOMMENDED , SHOULD , and SHOULD NOT are to be interpreted as described in [ RFC2119 ].
- **4.2.1.4 LDP servers.** exposing LDPRs MUST advertise their LDP support by exposing a HTTP Link header with a target URI of http://www.w3.org/ns/ldp#Resource , and a link relation type of type (that is, rel="type" ) in all responses to requests made to an LDPR 's HTTP Request-URI [ RFC5988 ].
- **4.2.1.6 LDP servers MUST.** The appropriate context URI can vary based on the request's semantics and method; unless the response is otherwise constrained, the default (the effective request URI) SHOULD be used.
- **4.2.4.1 If a HTTP PUT is accepted on an existing resource,.** LDP servers MUST replace the entire persistent state of the identified resource with the entity representation in the body of the request.
- **4.2.4.1 If a HTTP PUT is accepted on an existing resource,.** Any LDP servers that wish to support a more sophisticated merge of data provided by the client with existing state stored on the server for a resource MUST use HTTP PATCH , not HTTP PUT .
- **4.2.4.3.** If an otherwise valid HTTP PUT request is received that attempts to change properties the server does not allow clients to modify , LDP servers MUST fail the request by responding with a 4xx range status code (typically 409 Conflict).
- **4.2.4.3.** LDP servers SHOULD provide a corresponding response body containing information about which properties could not be persisted.
- **4.2.4.4.** unknown content, LDP servers MUST respond with an appropriate 4xx range status code [ RFC7231 ].
