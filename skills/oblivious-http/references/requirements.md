# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 9458 Oblivious HTTP

Source: https://www.rfc-editor.org/rfc/rfc9458.html

- **RFC 9458 § 3.** In order to ensure that Clients do not encapsulate messages that other entities can intercept, the key configuration MUST be authenticated and have integrity protection.
- **RFC 9458 § 3.2.** Differences in how key configurations are recovered might be exploited to segregate Clients, so Clients MUST discard incorrectly encoded key configuration collections.
- **RFC 9458 § 5.** The Oblivious Relay Resource MUST NOT add information to the request without the Client being aware of the type of information that might be added; see Section 6.2 for more information on relay responsibilities.
- **RFC 9458 § 5.1.** Clients MUST NOT construct a request that includes a 100-continue expectation; the Oblivious Gateway Resource MUST generate an error if a 100-continue expectation is received.
- **RFC 9458 § 5.2.** A server that receives an invalid message for any reason MUST generate an HTTP response with a 4xx status code.
- **RFC 9458 § 5.2.** Errors detected by the Oblivious Gateway Resource after successfully removing encapsulation and errors detected by the Target Resource MUST be sent in an Encapsulated Response.
- **RFC 9458 § 6.** Requests from the Client to Oblivious Relay Resource and from Oblivious Relay Resource to Oblivious Gateway Resource MUST use HTTPS in order to provide unlinkability in the presence of a network observer.
- **RFC 9458 § 6.1.** Because Clients do not authenticate the Target Resource when using Oblivious HTTP, Clients MUST have some mechanism to authorize an Oblivious Gateway Resource for use with a Target Resource.
- **RFC 9458 § 6.1.** Clients MUST generate a new HPKE context for every request, using a good source of entropy [RANDOM] for generating keys.
- **RFC 9458 § 6.1.** The request that carries the Encapsulated Request and that is sent to the Oblivious Relay Resource MUST NOT include identifying information unless the Client can trust that this information is removed by the relay.
- **RFC 9458 § 6.2.** For Oblivious HTTP, an Oblivious Relay Resource SHOULD NOT forward unknown fields.
- **RFC 9458 § 6.2.** A relay MUST NOT add information when forwarding requests that might be used to identify Clients, except for information that a Client is aware of; see Section 6.2.1.
- **RFC 9458 § 6.3.** Moreover, the Oblivious Gateway Resource SHOULD have some mechanism to ensure that the Oblivious Gateway Resource is not misused as a relay for HTTP messages to an arbitrary Target Resource, such as an allowlist.
- **RFC 9458 § 6.4.** A server MUST ensure that the HPKE keys it uses are not valid for any other protocol that uses HPKE with the "message/bhttp request" label.
- **RFC 9458 § 6.5.** A Client or Oblivious Relay Resource MUST NOT automatically attempt to retry a failed request unless it receives a positive signal indicating that the request was not processed or forwarded.
- **RFC 9458 § 6.5.1.** Clients SHOULD include a Date header field in Encapsulated Requests, unless the Client has prior knowledge that indicates that the Oblivious Gateway Resource does not use Date for anti-replay purposes.
- **RFC 9458 § 6.5.2.** When retrying a request, the Client MUST create a fresh encryption of the modified request, using a new HPKE context.
- **RFC 9458 § 6.5.2.** Therefore, Clients MUST NOT retry a request with an adjusted date more than once.
- **RFC 9458 § 6.5.2.** Clients MUST NOT use the date provided by the Oblivious Gateway Resource for any other purpose, including future requests to any resource.
- **RFC 9458 § 7.** Applications using this design MUST provide accommodations to mitigate tracking using Client configurations.
