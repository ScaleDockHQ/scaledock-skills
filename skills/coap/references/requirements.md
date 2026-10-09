# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 7252 The Constrained Application Protocol (CoAP)

Source: https://www.rfc-editor.org/rfc/rfc7252.html

- **RFC 7252 § 3.** Messages with unknown version numbers MUST be silently ignored.
- **RFC 7252 § 3.** The presence of a marker followed by a zero-length payload MUST be processed as a message format error.
- **RFC 7252 § 3.2.** A recipient MUST be prepared to process values with leading zero bytes.
- **RFC 7252 § 4.2.** The Acknowledgement message MUST echo the Message ID of the Confirmable message and MUST carry a response or be Empty (see Sections 5.2.1 and 5.2.2).
- **RFC 7252 § 4.2.** The Reset message MUST echo the Message ID of the Confirmable message and MUST be Empty.
- **RFC 7252 § 4.2.** More generally, recipients of Acknowledgement and Reset messages MUST NOT respond with either Acknowledgement or Reset messages.
- **RFC 7252 § 4.3.** A Non-confirmable message MUST NOT be acknowledged by the recipient.
- **RFC 7252 § 4.4.** The same Message ID MUST NOT be reused (in communicating with the same endpoint) within the EXCHANGE_LIFETIME (Section 4.8.2).
- **RFC 7252 § 4.5.** The recipient SHOULD acknowledge each duplicate copy of a Confirmable message using the same Acknowledgement or Reset message but SHOULD process any request or response in the message only once.
- **RFC 7252 § 4.7.** In order not to cause congestion, clients (including proxies) MUST strictly limit the number of simultaneous outstanding interactions that they maintain to a given server (including proxies) to NSTART.
- **RFC 7252 § 4.8.1.** Configurations MUST NOT decrease ACK_TIMEOUT or increase NSTART without using mechanisms that ensure congestion control safety, either defined in the configuration or in future standards documents.
- **RFC 7252 § 5.3.1.** Every request carries a client-generated token that the server MUST echo (without modification) in any resulting response.
- **RFC 7252 § 5.3.1.** A client sending a request without using Transport Layer Security (Section 9) SHOULD use a nontrivial, randomized token to guard against spoofing of responses (Section 11.4).
- **RFC 7252 § 5.3.2.** In a piggybacked response, the Message ID of the Confirmable request and the Acknowledgement MUST match, and the tokens of the response and original request MUST match.
- **RFC 7252 § 5.4.1.** Upon reception, unrecognized options of class "elective" MUST be silently ignored.
- **RFC 7252 § 5.4.1.** Unrecognized options of class "critical" that occur in a Confirmable request MUST cause the return of a 4.02 (Bad Option) response.
- **RFC 7252 § 5.4.5.** An option that is not repeatable MUST NOT be included more than once in a message.
- **RFC 7252 § 5.6.1.** If an origin server wishes to prevent caching, it MUST explicitly include a Max-Age Option with a value of zero seconds.
- **RFC 7252 § 5.7.1.** A CoAP-to-CoAP proxy MUST forward to the origin server all Safe-to-Forward options that it does not recognize.
- **RFC 7252 § 5.10.1.** The value of a Uri-Path Option MUST NOT be "." or ".." (as the request URI must be resolved before parsing it into options).
- **RFC 7252 § 5.10.2.** The Proxy-Uri Option MUST take precedence over any of the Uri-Host, Uri-Port, Uri-Path or Uri-Query options (each of which MUST NOT be included in a request containing the Proxy-Uri Option).
- **RFC 7252 § 8.1.** To avoid an implosion of error responses, when a server is aware that a request arrived via multicast, it MUST NOT return a Reset message in reply to a Non-confirmable message.
- **RFC 7252 § 9.1.2.** This means the response to a DTLS secured request MUST always be DTLS secured using the same security session and epoch.
- **RFC 7252 § 11.2.** Unlike the "coap" scheme, responses to "coaps" identified requests are never "public" and thus MUST NOT be reused for shared caching, unless the cache is able to make equivalent access control decisions to the ones that led to the cached entry.
