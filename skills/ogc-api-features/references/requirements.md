# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## OGC API Features Part 1

Source: https://docs.ogc.org/is/17-069r4/17-069r4.html

External identifier of this OGC® document: http://www.opengis.net/doc/IS/ogcapi-features-1/1.0.1

- **OGC API - Features - Part 1: Core corrigendum.** ANY USE OF THE INTELLECTUAL PROPERTY SHALL BE MADE ENTIRELY AT THE USER’S OWN RISK.
- **OGC API - Features - Part 1: Core corrigendum.** IN NO EVENT SHALL THE COPYRIGHT HOLDER OR ANY CONTRIBUTOR OF INTELLECTUAL PROPERTY RIGHTS TO THE INTELLECTUAL PROPERTY BE LIABLE FOR ANY CLAIM, OR ANY DIRECT, SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES, OR ANY DAMAGES WHATSOEVER RESULTING FROM ANY ALLEGED INFRINGEMENT OR ANY LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR UNDER ANY OTHER LEGAL THEORY, ARISING OUT OF…
- **7.2.1. Operation.** Requirement 1 /req/core/root-op A The server SHALL support the HTTP GET operation at the path / .
- **7.2.2. Response.** Requirement 2 /req/core/root-success A A successful execution of the operation SHALL be reported as a response with a HTTP status code 200 .
- **7.2.2. Response.** B The content of that response SHALL be based upon the OpenAPI 3.0 schema landingPage.yaml and include at least links to the following resources: the API definition (relation type service-desc or service-doc ) /conformance (relation type conformance ) /collections (relation type data ) Recommendations 1 /req/core/root-links A A 200 -response SHOULD include the following links in the links…
- **7.3.1. Operation.** Requirement 3 /req/core/api-definition-op A The URIs of all API definitions referenced from the landing page SHALL support the HTTP GET method.
- **7.3.2. Response.** Requirement 4 /req/core/api-definition-success A A GET request to the URI of an API definition linked from the landing page (link relations service-desc or service-doc ) with an Accept header with the value of the link property type SHALL return a document consistent with the requested media type.
- **7.3.2. Response.** Recommendation 2 /rec/core/api-definition-oas A If the API definition document uses the OpenAPI Specification 3.0, the document SHOULD conform to the OpenAPI Specification 3.0 requirements class .
