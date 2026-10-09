# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from. RFC 6901 has only three BCP 14 sentences, so this list also quotes its defining syntax and evaluation rules.

## RFC 6901 JavaScript Object Notation (JSON) Pointer

Source: https://www.rfc-editor.org/rfc/rfc6901.html

- **RFC 6901 § 3.** A JSON Pointer is a Unicode string (see [RFC4627], Section 3) containing a sequence of zero or more reference tokens, each prefixed by a '/' (%x2F) character.
- **RFC 6901 § 3.** Because the characters '~' (%x7E) and '/' (%x2F) have special meanings in JSON Pointer, '~' needs to be encoded as '~0' and '/' needs to be encoded as '~1' when these characters appear in a reference token.
- **RFC 6901 § 3.** It is an error condition if a JSON Pointer value does not conform to this syntax (see Section 7).
- **RFC 6901 § 4.** Evaluation of each reference token begins by decoding any escaped character sequence. This is performed by first transforming any occurrence of the sequence '~1' to '/', and then transforming any occurrence of the sequence '~0' to '~'.
- **RFC 6901 § 4.** The member name is equal to the token if it has the same number of Unicode characters as the token and their code points are byte-by-byte equal.
- **RFC 6901 § 4.** No Unicode character normalization is performed.
- **RFC 6901 § 4.** If a referenced member name is not unique in an object, the member that is referenced is undefined, and evaluation fails (see below).
- **RFC 6901 § 4.** If the currently referenced value is a JSON array, the reference token MUST contain either: * characters comprised of digits (see ABNF below; note that leading zeros are not allowed) that represent an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index identified by the token, or * exactly the single character "-", making the new referenced value the (nonexistent) member after the last array element.
- **RFC 6901 § 4.** Implementations will evaluate each reference token against the document's contents and will raise an error condition if it fails to resolve a concrete value for any of the JSON pointer's reference tokens.
- **RFC 6901 § 4.** Any error condition for which a specific action is not defined by the JSON Pointer application results in termination of evaluation.
- **RFC 6901 § 5.** Per [RFC4627], Section 2.5, all instances of quotation mark '"' (%x22), reverse solidus '\' (%x5C), and control (%x00-1F) characters MUST be escaped.
- **RFC 6901 § 6.** A JSON Pointer can be represented in a URI fragment identifier by encoding it into octets using UTF-8 [RFC3629], while percent-encoding those characters not allowed by the fragment rule in [RFC3986].
- **RFC 6901 § 7.** An application of JSON Pointer SHOULD specify the impact and handling of each type of error.
