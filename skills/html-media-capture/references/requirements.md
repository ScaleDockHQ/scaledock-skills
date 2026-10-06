# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## HTML Media Capture

Source: https://www.w3.org/TR/html-media-capture/

The HTML Media Capture specification defines an HTML form extension that facilitates user access to a device's media capture mechanism , such as a camera, or microphone, from within a file upload control.

- **2. Conformance.** The key words MUST , MUST NOT , and SHOULD are to be interpreted as described in [ RFC2119 ].
- **5..** The capture IDL attribute MUST reflect the respective content attribute of the same name.
- **5..** When the capture attribute is specified, the user agent SHOULD invoke a file picker of the specific capture control type .
- **5..** When the capture attribute is specified, the user agent MUST NOT save the captured media to any data storage, local or remote.
- **5..** If the accept attribute's value is set to a MIME type that has no associated capture control type , the user agent MUST act as if there was no capture attribute.
- **2. Conformance.** Implementations that use ECMAScript to implement the APIs defined in this specification must implement them in a manner consistent with the ECMAScript Bindings defined in the Web IDL specification [ WEBIDL-1 ], as this specification uses that specification and terminology.
- **4..** Implementors should take care to prevent additional leakage of privacy-sensitive data from captured media.
