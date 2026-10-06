# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## gRPC over HTTP/2

Source: https://raw.githubusercontent.com/grpc/grpc/master/doc/PROTOCOL-HTTP2.md

This document serves as a detailed description for an implementation of gRPC carried over HTTP2 framing . It assumes familiarity with the HTTP2 specification.

- **document.** If **Content-Type** does not begin with "application/grpc", gRPC servers SHOULD respond with HTTP status of 415 (Unsupported Media Type).
- **document.** Implementations MUST accept padded and un-padded values and should emit un-padded values.
- **document.** In scenarios where the **Request** stream needs to be closed but no data remains to be sent implementations MUST send an empty DATA frame with this flag set.
- **document.** When decoding invalid values, implementations MUST NOT error or throw away the message.
- **document.** If it contains a status code field, it MUST NOT contradict the **Status** header.
- **document.** Additionally implementations should send **Timeout** immediately after the reserved headers and they should send the **Call-Definition** headers before sending **Custom-Metadata**.
- **document.** If **Timeout** is omitted a server should assume an infinite timeout.
- **document.** Header names starting with "grpc-" but not listed here are reserved for future GRPC use and should not be used by applications as **Custom-Metadata**.
