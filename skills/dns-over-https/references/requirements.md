# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 8484 DNS Queries over HTTPS (DoH)

Source: https://www.rfc-editor.org/rfc/rfc8484.html

In Section 6, "this media type" is application/dns-message.

- **RFC 8484 § 3.** A DoH client MUST NOT use a different URI simply because it was discovered outside of the client's configuration (such as through HTTP/2 server push) or because a server offers an unsolicited response that appears to be a valid answer to a DNS query.
- **RFC 8484 § 4.1.** DoH servers MUST implement both the POST and GET methods.
- **RFC 8484 § 4.1.** Irrespective of the value of the Accept request header field, the client MUST be prepared to process "application/dns-message" (as described in Section 6) responses but MAY also process other DNS-related media types it receives.
- **RFC 8484 § 4.1.** In order to maximize HTTP cache friendliness, DoH clients using media formats that include the ID field from the DNS message header, such as "application/dns-message", SHOULD use a DNS ID of 0 in every DNS request.
- **RFC 8484 § 5.** This protocol MUST be used with the https URI scheme [RFC7230].
- **RFC 8484 § 5.1.** The assigned freshness lifetime of a DoH HTTP response MUST be less than or equal to the smallest TTL in the Answer section of the DNS response.
- **RFC 8484 § 5.1.** If the DNS response has no records in the Answer section, and the DNS response has an SOA record in the Authority section, the response freshness lifetime MUST NOT be greater than the MINIMUM field from that SOA record (see [RFC2308]).
- **RFC 8484 § 5.1.** DoH clients MUST account for the Age response header field's value [RFC7234] when calculating the DNS TTL of a response.
- **RFC 8484 § 5.2.** HTTP/2 [RFC7540] is the minimum RECOMMENDED version of HTTP for use with DoH.
- **RFC 8484 § 5.3.** Before using DoH response data for DNS resolution, the client MUST establish that the HTTP request URI can be used for the DoH query.
- **RFC 8484 § 5.4.** In order to maximize interoperability, DoH clients and DoH servers MUST support the "application/dns-message" media type.
- **RFC 8484 § 6.** DoH servers using this media type MUST ignore the value given for the EDNS UDP payload size in DNS requests.
- **RFC 8484 § 6.** When using the GET method, the data payload for this media type MUST be encoded with base64url [RFC4648] and then provided as a variable named "dns" to the URI Template expansion.
- **RFC 8484 § 6.** Padding characters for base64url MUST NOT be included.
- **RFC 8484 § 6.** When using the POST method, the data payload for this media type MUST NOT be encoded and is used directly as the HTTP message body.
- **RFC 8484 § 8.2.** HTTP cookies SHOULD NOT be accepted by DOH clients unless they are explicitly required by a use case.

## RFC 9460 Service Binding and Parameter Specification via the DNS (SVCB and HTTPS Resource Records)

Source: https://www.rfc-editor.org/rfc/rfc9460.html

- **RFC 9460 § 2.2.** SvcParamKeys SHALL appear in increasing numeric order.
- **RFC 9460 § 2.2.** If any RRs are malformed, the client MUST reject the entire RRset and fall back to non-SVCB connection establishment.
- **RFC 9460 § 2.4.1.** If an RRset contains a record in AliasMode, the recipient MUST ignore any ServiceMode records in the set.
- **RFC 9460 § 2.4.2.** To avoid unbounded alias chains, clients and recursive resolvers MUST impose a limit on the total number of SVCB aliases they will follow for each resolution request.
- **RFC 9460 § 2.4.3.** Unless specified otherwise by the protocol mapping, clients MUST ignore any SvcParam that they do not recognize.
- **RFC 9460 § 2.4.3.** Clients MUST reject any RR whose recognized SvcParams are not self-consistent and MAY reject the entire RRset.
- **RFC 9460 § 4.3.** Recursive resolvers MUST be able to convey SVCB records with unrecognized SvcParamKeys.
- **RFC 9460 § 9.4.** Clients MUST NOT use an HTTPS RR response unless the client supports the TLS Server Name Indication (SNI) extension and indicates the origin name in the TLS ClientHello (which might be encrypted via a future specification such as [ECH]).
- **RFC 9460 § 12.** SVCB/HTTPS RRs permit distribution over untrusted channels, and clients are REQUIRED to verify that the alternative endpoint is authoritative for the service (similar to Section 2.1 of [AltSvc]).
