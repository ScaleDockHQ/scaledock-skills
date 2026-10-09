# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 9113 HTTP/2

Source: https://www.rfc-editor.org/rfc/rfc9113.html

- **RFC 9113 § 3.3.** HTTP/2 connections over TLS MUST use protocol negotiation in TLS [TLS-ALPN].
- **RFC 9113 § 3.4.** Clients and servers MUST treat an invalid connection preface as a connection error (Section 5.4.1) of type PROTOCOL_ERROR.
- **RFC 9113 § 3.4.** The server connection preface consists of a potentially empty SETTINGS frame (Section 6.5) that MUST be the first frame the server sends in the HTTP/2 connection.
- **RFC 9113 § 4.1.** Implementations MUST ignore and discard frames of unknown types.
- **RFC 9113 § 4.2.** All implementations MUST be capable of receiving and minimally processing frames up to 2^14 octets in length, plus the 9-octet frame header (Section 4.1).
- **RFC 9113 § 4.3.** Field blocks MUST be transmitted as a contiguous sequence of frames, with no interleaved frames of any other type or from any other stream.
- **RFC 9113 § 4.3.** A decoding error in a field block MUST be treated as a connection error (Section 5.4.1) of type COMPRESSION_ERROR.
- **RFC 9113 § 5.1.1.** Streams initiated by a client MUST use odd-numbered stream identifiers; those initiated by the server MUST use even-numbered stream identifiers.
- **RFC 9113 § 5.1.1.** The identifier of a newly established stream MUST be numerically greater than all streams that the initiating endpoint has opened or reserved.
- **RFC 9113 § 5.1.** In the absence of more specific rules, implementations SHOULD treat the receipt of a frame that is not expressly permitted in the description of a state as a connection error (Section 5.4.1) of type PROTOCOL_ERROR.
- **RFC 9113 § 5.2.1.** A sender MUST respect flow-control limits imposed by a receiver.
- **RFC 9113 § 5.4.2.** To avoid looping, an endpoint MUST NOT send a RST_STREAM in response to a RST_STREAM frame.
- **RFC 9113 § 5.5.** Implementations MUST ignore unknown or unsupported values in all extensible protocol elements.
- **RFC 9113 § 6.5.2.** A client MUST treat receipt of a SETTINGS frame with SETTINGS_ENABLE_PUSH set to 1 as a connection error (Section 5.4.1) of type PROTOCOL_ERROR.
- **RFC 9113 § 6.7.** Receivers of a PING frame that does not include an ACK flag MUST send a PING frame with the ACK flag set in response, with an identical frame payload.
- **RFC 9113 § 6.9.1.** A sender MUST NOT allow a flow-control window to exceed 2^31-1 octets.
- **RFC 9113 § 8.1.1.** Malformed requests or responses that are detected MUST be treated as a stream error (Section 5.4.2) of type PROTOCOL_ERROR.
- **RFC 9113 § 8.2.** Field names MUST be converted to lowercase when constructing an HTTP/2 message.
- **RFC 9113 § 8.2.1.** A field value MUST NOT contain the zero value (ASCII NUL, 0x00), line feed (ASCII LF, 0x0a), or carriage return (ASCII CR, 0x0d) at any position.
- **RFC 9113 § 8.2.2.** An endpoint MUST NOT generate an HTTP/2 message containing connection-specific header fields.
- **RFC 9113 § 8.3.1.** All HTTP/2 requests MUST include exactly one valid value for the ":method", ":scheme", and ":path" pseudo-header fields, unless they are CONNECT requests (Section 8.5).
- **RFC 9113 § 8.3.1.** Clients MUST NOT generate a request with a Host header field that differs from the ":authority" pseudo-header field.
- **RFC 9113 § 9.2.** Implementations of HTTP/2 MUST use TLS version 1.2 [TLS12] or higher for HTTP/2 over TLS.
- **RFC 9113 § 9.2.1.** A deployment of HTTP/2 over TLS 1.2 MUST disable compression.
- **RFC 9113 § 9.2.1.** A deployment of HTTP/2 over TLS 1.2 MUST disable renegotiation.
