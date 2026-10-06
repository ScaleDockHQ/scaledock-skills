# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 6901 JavaScript Object Notation (JSON) Pointer

Source: https://www.rfc-editor.org/rfc/rfc6901.html

- **document.** Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** Standards Track [Page 3] RFC 6901 JSON Pointer April 2013 o If the currently referenced value is a JSON array, the reference token MUST contain either: * characters comprised of digits (see ABNF below; note that leading zeros are not allowed) that represent an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index identified by the token, or *…
- **document.** Per [RFC4627], Section 2.5 , all instances of quotation mark '"' (%x22), reverse solidus '\' (%x5C), and control (%x00-1F) characters MUST be escaped.
- **document.** An application of JSON Pointer SHOULD specify the impact and handling of each type of error.
- **document.** Code Components extracted from this document must include Simplified BSD License text as described in Section 4.e of the Trust Legal Provisions and are provided without warranty as described in the Simplified BSD License.
- **document.** Note that before processing a JSON string as a JSON Pointer, backslash escape sequences must be unescaped.
- **document.** Therefore, applications using JSON Pointer should anticipate this situation by defining how a pointer that does not resolve ought to be handled.
