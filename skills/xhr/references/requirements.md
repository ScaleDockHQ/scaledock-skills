# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## XMLHttpRequest Living Standard

Source: https://xhr.spec.whatwg.org/review-drafts/2026-08/

The XMLHttpRequest Standard defines an API that provides scripted client functionality for transferring data between a client and a server.

- **XMLHttpRequest.** Developers should refer to the Living Standard for the most current error corrections and other developments.
- **3.2. Garbage collection.** An XMLHttpRequest object must not be garbage collected if its state is either opened with send() invoked being true, headers received , or loading , and it has one or more event listeners registered whose type is one of readystatechange , progress , abort , error , load , timeout , and loadend .
- **3.2. Garbage collection.** If an XMLHttpRequest object is garbage collected while its connection is still open, the user agent must terminate the XMLHttpRequest object’s fetch controller .
- **3.3. Event handlers.** The following are the event handlers (and their corresponding event handler event types ) that must be supported on objects implementing an interface that inherits from XMLHttpRequestEventTarget as attributes: event handler event handler event type onloadstart loadstart onprogress progress onabort abort onerror error onload load ontimeout timeout onloadend loadend The following is the event…
- **3.5.1. The open() method.** (This is a long process that takes many years.) Developers must not pass false for the async argument when the current global object is a Window object.
