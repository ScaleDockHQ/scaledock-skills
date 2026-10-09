# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Requests

Source: https://raw.githubusercontent.com/grpc/grpc/cf61c7d62a1a7f43b9d2ea6488186bc14fc41a8c/doc/PROTOCOL-HTTP2.md

- **Requests.** Additionally implementations should send **Timeout** immediately after the reserved headers and they should send the **Call-Definition** headers before sending **Custom-Metadata**.
- **Requests.** If **Timeout** is omitted a server should assume an infinite timeout.
- **Requests.** If **Content-Type** does not begin with "application/grpc", gRPC servers SHOULD respond with HTTP status of 415 (Unsupported Media Type).
- **Requests.** Header names starting with "grpc-" but not listed here are reserved for future GRPC use and should not be used by applications as **Custom-Metadata**.
- **Requests.** Implementations MUST accept padded and un-padded values and should emit un-padded values.
- **Requests.** Implementations must split **Binary-Header**s on "," before decoding the Base64-encoded values.
- **Requests.** Implementations must not error due to receiving an invalid **ASCII-Value** that's a valid **field-value** in HTTP, but the precise behavior is not strictly defined: they may throw the value away or accept the value.
- **Requests.** Compression contexts are NOT maintained over message boundaries, implementations must create a new context for each message in the stream.
- **Requests.** If the **Message-Encoding** header is omitted then the **Compressed-Flag** must be 0.
- **Requests.** In scenarios where the **Request** stream needs to be closed but no data remains to be sent implementations MUST send an empty DATA frame with this flag set.

## Responses

Source: https://raw.githubusercontent.com/grpc/grpc/cf61c7d62a1a7f43b9d2ea6488186bc14fc41a8c/doc/PROTOCOL-HTTP2.md

- **Responses.** Status must be sent in **Trailers** even if the status code is OK.
- **Responses.** Implementations must synthesize a **Status** & **Status-Message** to propagate to the application layer when this occurs.
- **Responses.** When decoding invalid values, implementations MUST NOT error or throw away the message.
- **Responses.** **Status-Details** is allowed only if **Status** is not OK.
- **Responses.** If it contains a status code field, it MUST NOT contradict the **Status** header.

## HTTP2 Transport Mapping

Source: https://raw.githubusercontent.com/grpc/grpc/cf61c7d62a1a7f43b9d2ea6488186bc14fc41a8c/doc/PROTOCOL-HTTP2.md

- **Data Frames.** DATA frame boundaries have no relation to **Length-Prefixed-Message** boundaries and implementations should make no assumptions about their alignment.
- **Errors.** RPC runtime implementations should interpret RST_STREAM as immediate full-closure of the stream and should propagate an error up to the calling application layer.
- **GOAWAY Frame.** Clients should consider any stream initiated after the last successfully accepted stream as UNAVAILABLE and retry the call elsewhere.
- **GOAWAY Frame.** Servers should send GOAWAY before terminating a connection to reliably inform clients which work has been accepted by the server and is being executed.
- **PING Frame.** Both clients and servers can send a PING frame that the peer must respond to by precisely echoing what they received.
