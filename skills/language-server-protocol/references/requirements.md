# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## LSP 3.17

Source: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/

This document describes the previous 3.17.x version of the language server protocol. An implementation for node of the 3.17.x version of the protocol can be found here .

- **Response Message.** * This member MUST NOT exist if there was an error invoking the method.
- **Content Part.** If a server or client receives a header with a different encoding than utf-8 it should respond with an error.
- **Request Message.** Every processed request must send a response back to the sender of the request.
- **Response Message.** The result property of the ResponseMessage should be set to null in this case to signal a successful request.
- **Response Message.** No LSP error codes should * be defined between the start and end range.
- **Response Message.** The error * message should contain human readable information about why * the request failed.
- **Response Message.** This error code should * only be used for requests that explicitly support being * server cancellable.
- **Response Message.** A server should * NOT send this error code if it detects a content change * in its unprocessed messages.

## LSP 3.18

Source: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.18/specification/

This document describes the current 3.18.x version of the language server protocol. An implementation for node of the 3.18.x version of the protocol can be found here .

- **Response Message.** * This member MUST NOT exist if there was an error invoking the method.
- **Completion Request ( ).** This * means when clients add support for new/future fields in completion * items the MUST also support merge for them if those fields are * defined in `CompletionList.applyKind`.
- **Content Part.** If a server or client receives a header with a different encoding than utf-8 it should respond with an error.
- **Base Protocol JSON structures.** The protocol currently does not support JSON-RPC batch messages; protocol clients and servers must not send JSON-RPC requests.
- **Request Message.** Every processed request must send a response back to the sender of the request.
- **Response Message.** The result property of the ResponseMessage should be set to null in this case to signal a successful request.
- **Response Message.** No LSP error codes should * be defined between the start and end range.
- **Response Message.** The error * message should contain human readable information about why * the request failed.
