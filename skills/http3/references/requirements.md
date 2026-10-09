# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 9114 HTTP/3

Source: https://www.rfc-editor.org/rfc/rfc9114.html

- **RFC 9114 § 3.1.** Upon receiving a server certificate in the TLS handshake, the client MUST verify that the certificate is an acceptable match for the URI's origin server using the process described in Section 4.3.4 of [HTTP].
- **RFC 9114 § 3.2.** After the QUIC connection is established, a SETTINGS frame MUST be sent by each endpoint as the initial frame of their respective HTTP control stream.
- **RFC 9114 § 4.1.** A client MUST send only a single request on a given stream.
- **RFC 9114 § 4.1.** Receipt of an invalid sequence of frames MUST be treated as a connection error of type H3_FRAME_UNEXPECTED.
- **RFC 9114 § 4.1.** Transfer codings (see Section 7 of [HTTP/1.1]) are not defined for HTTP/3; the Transfer-Encoding header field MUST NOT be used.
- **RFC 9114 § 4.1.2.** Malformed requests or responses that are detected MUST be treated as a stream error of type H3_MESSAGE_ERROR.
- **RFC 9114 § 4.2.** Characters in field names MUST be converted to lowercase prior to their encoding.
- **RFC 9114 § 4.2.** An endpoint MUST NOT generate an HTTP/3 field section containing connection-specific fields; any message containing connection-specific fields MUST be treated as malformed.
- **RFC 9114 § 4.3.1.** All HTTP/3 requests MUST include exactly one value for the :method, :scheme, and :path pseudo-header fields, unless the request is a CONNECT request; see Section 4.4.
- **RFC 9114 § 5.2.** Endpoints MUST NOT initiate new requests or promise new pushes on the connection after receipt of a GOAWAY frame from the peer.
- **RFC 9114 § 6.2.** The recipient MUST NOT consider unknown stream types to be a connection error of any kind.
- **RFC 9114 § 6.2.1.** The sender MUST NOT close the control stream, and the receiver MUST NOT request that the sender close the control stream.
- **RFC 9114 § 8.** Because new error codes can be defined without negotiation (see Section 9), use of an error code in an unexpected context or receipt of an unknown error code MUST be treated as equivalent to H3_NO_ERROR.
- **RFC 9114 § 10.9.** The anti-replay mitigations in [HTTP-REPLAY] MUST be applied when using HTTP/3 with 0-RTT.

## RFC 9000 QUIC: A UDP-Based Multiplexed and Secure Transport

Source: https://www.rfc-editor.org/rfc/rfc9000.html

- **RFC 9000 § 7.** Endpoints MUST explicitly negotiate an application protocol.
- **RFC 9000 § 8.1.** Prior to validating the client address, servers MUST NOT send more than three times as many bytes as the number of bytes they have received.
- **RFC 9000 § 8.1.** Clients MUST ensure that UDP datagrams containing Initial packets have UDP payloads of at least 1200 bytes, adding PADDING frames as necessary.
- **RFC 9000 § 9.** An endpoint MUST perform path validation (Section 8.2) if it detects any change to a peer's address, unless it has previously validated that address.
- **RFC 9000 § 12.3.** A QUIC endpoint MUST NOT reuse a packet number within the same packet number space in one connection.
- **RFC 9000 § 14.** UDP datagrams MUST NOT be fragmented at the IP layer.

## RFC 9001 Using TLS to Secure QUIC

Source: https://www.rfc-editor.org/rfc/rfc9001.html

- **RFC 9001 § 4.2.** Clients MUST NOT offer TLS versions older than 1.3.
- **RFC 9001 § 4.4.** A client MUST authenticate the identity of the server.
- **RFC 9001 § 5.6.** A client therefore MUST NOT use 0-RTT for application data unless specifically requested by the application that is in use.
- **RFC 9001 § 6.** Endpoints MUST NOT send a TLS KeyUpdate message.

## RFC 9002 QUIC Loss Detection and Congestion Control

Source: https://www.rfc-editor.org/rfc/rfc9002.html

- **RFC 9002 § 6.2.** A PTO timer expiration event does not indicate packet loss and MUST NOT cause prior unacknowledged packets to be marked as lost.
