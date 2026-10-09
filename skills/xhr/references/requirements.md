# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are conformance sentences and method-step statements from the published text, quoted as written (only line breaks were joined). Apply the ones that match the role. Each is labelled with the section it comes from in the published document.

## XMLHttpRequest Standard, Review Draft August 2026

Source: https://xhr.spec.whatwg.org/review-drafts/2026-08/

- **§ 3.2.** An XMLHttpRequest object must not be garbage collected if its state is either opened with send() invoked being true, headers received, or loading, and it has one or more event listeners registered whose type is one of readystatechange, progress, abort, error, load, timeout, and loadend.
- **§ 3.2.** If an XMLHttpRequest object is garbage collected while its connection is still open, the user agent must terminate the XMLHttpRequest object’s fetch controller.
- **§ 3.5.1.** Developers must not pass false for the async argument when the current global object is a Window object.
- **§ 3.5.1.** If method is not a method, then throw a "SyntaxError" DOMException.
- **§ 3.5.1.** If method is a forbidden method, then throw a "SecurityError" DOMException.
- **§ 3.5.1.** If parsedURL is failure, then throw a "SyntaxError" DOMException.
- **§ 3.5.1.** If async is false, the current global object is a Window object, and either this’s timeout is not 0 or this’s response type is not the empty string, then throw an "InvalidAccessError" DOMException.
- **§ 3.5.2.** If this’s state is not opened, then throw an "InvalidStateError" DOMException.
- **§ 3.5.2.** If name is not a header name or value is not a header value, then throw a "SyntaxError" DOMException.
- **§ 3.5.2.** If (name, value) is a forbidden request-header, then return.
- **§ 3.5.2.** Combine (name, value) in this’s author request headers.
- **§ 3.5.3.** If the current global object is a Window object and this’s synchronous is true, then throw an "InvalidAccessError" DOMException.
- **§ 3.5.4.** If this’s state is not unsent or opened, then throw an "InvalidStateError" DOMException.
- **§ 3.5.6.** If this’s request method is `GET` or `HEAD`, then set body to null.
- **§ 3.5.6.** If one or more event listeners are registered on this’s upload object, then set this’s upload listener to true.
- **§ 3.5.6.** If this’s cross-origin credentials is true, then "include"; otherwise "same-origin".
- **§ 3.5.6.** If not roughly 50ms have passed since these steps were last invoked, then return.
- **§ 3.5.6.** If req’s done flag is unset, then set this’s timed out to true and terminate this’s fetch controller.
- **§ 3.6.8.** If this’s state is loading or done, then throw an "InvalidStateError" DOMException.
