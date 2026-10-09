# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 6455 The WebSocket Protocol

Source: https://www.rfc-editor.org/rfc/rfc6455.html

- **RFC 6455 § 3.** Fragment identifiers are meaningless in the context of WebSocket URIs and MUST NOT be used on these URIs.
- **RFC 6455 § 4.1.** Clients MUST use the Server Name Indication extension in the TLS handshake [RFC6066].
- **RFC 6455 § 4.1.** The method of the request MUST be GET, and the HTTP version MUST be at least 1.1.
- **RFC 6455 § 4.1.** The request MUST include a header field with the name |Sec-WebSocket-Key|.
- **RFC 6455 § 4.1.** The value of this header field MUST be a nonce consisting of a randomly selected 16-byte value that has been base64-encoded (see Section 4 of [RFC4648]).
- **RFC 6455 § 4.1.** The request MUST include a header field with the name |Origin| [RFC6454] if the request is coming from a browser client.
- **RFC 6455 § 4.1.** If the response lacks a |Sec-WebSocket-Accept| header field or the |Sec-WebSocket-Accept| contains a value other than the base64-encoded SHA-1 of the concatenation of the |Sec-WebSocket-Key| (as a string, not base64-decoded) with the string "258EAFA5-E914-47DA-95CA-C5AB0DC85B11" but ignoring any leading and trailing whitespace, the client MUST _Fail the WebSocket Connection_.
- **RFC 6455 § 9.** A server MUST NOT respond with any extension not requested by the client.
- **RFC 6455 § 5.1.** To avoid confusing network intermediaries (such as intercepting proxies) and for security reasons that are further discussed in Section 10.3, a client MUST mask all frames that it sends to the server (see Section 5.3 for further details).
- **RFC 6455 § 5.1.** A server MUST NOT mask any frames that it sends to the client.
- **RFC 6455 § 5.2.** If an unknown opcode is received, the receiving endpoint MUST _Fail the WebSocket Connection_.
- **RFC 6455 § 5.2.** Note that in all cases, the minimal number of bytes MUST be used to encode the length, for example, the length of a 124-byte-long string can't be encoded as the sequence 126, 0, 124.
- **RFC 6455 § 5.3.** When preparing a masked frame, the client MUST pick a fresh masking key from the set of allowed 32-bit values.
- **RFC 6455 § 5.4.** An endpoint MUST be capable of handling control frames in the middle of a fragmented message.
- **RFC 6455 § 5.5.** All control frames MUST have a payload length of 125 bytes or less and MUST NOT be fragmented.
- **RFC 6455 § 5.5.1.** If an endpoint receives a Close frame and did not previously send a Close frame, the endpoint MUST send a Close frame in response.
- **RFC 6455 § 5.5.2.** Upon receipt of a Ping frame, an endpoint MUST send a Pong frame in response, unless it already received a Close frame.
- **RFC 6455 § 5.6.** Note that a particular text frame might include a partial UTF-8 sequence; however, the whole message MUST contain valid UTF-8.
- **RFC 6455 § 7.4.1.** 1005 is a reserved value and MUST NOT be set as a status code in a Close control frame by an endpoint.
- **RFC 6455 § 8.1.** When an endpoint is to interpret a byte stream as UTF-8 but finds that the byte stream is not, in fact, a valid UTF-8 stream, that endpoint MUST _Fail the WebSocket Connection_.
- **RFC 6455 § 10.2.** Servers that are not intended to process input from any web page but only for certain sites SHOULD verify the |Origin| field is an origin they expect.
- **RFC 6455 § 10.4.** Implementations that have implementation-and/or platform-specific limitations regarding the frame size or total message size after reassembly from multiple frames MUST protect themselves against exceeding those limits.

## RFC 8441 Bootstrapping WebSockets with HTTP/2

Source: https://www.rfc-editor.org/rfc/rfc8441.html

- **RFC 8441 § 3.** A sender MUST NOT send a SETTINGS_ENABLE_CONNECT_PROTOCOL parameter with the value of 0 after previously sending a value of 1.
- **RFC 8441 § 5.** The :protocol pseudo-header field MUST be included in the CONNECT request, and it MUST have a value of "websocket" to initiate a WebSocket connection on an HTTP/2 stream.
- **RFC 8441 § 5.** The scheme of the target URI (Section 5.1 of [RFC7230]) MUST be "https" for "wss"-schemed WebSockets and "http" for "ws"-schemed WebSockets.
