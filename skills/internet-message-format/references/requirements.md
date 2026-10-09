# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 5322 Internet Message Format

Source: https://www.rfc-editor.org/rfc/rfc5322.html

- **RFC 5322 § 2.1.1.** Each line of characters MUST be no more than 998 characters, and SHOULD be no more than 78 characters, excluding the CRLF.
- **RFC 5322 § 2.2.** A field name MUST be composed of printable US-ASCII characters (i.e., characters that have values between 33 and 126, inclusive), except colon.
- **RFC 5322 § 2.2.** A field body MUST NOT include CR and LF except when used in "folding" and "unfolding", as described in section 2.2.3.
- **RFC 5322 § 2.3.** CR and LF MUST only occur together as CRLF; they MUST NOT appear independently in the body.
- **RFC 5322 § 3.2.2.** However, where CFWS occurs in this specification, it MUST NOT be inserted in such a way that any line of a folded header field is made up entirely of WSP characters and nothing else.
- **RFC 5322 § 3.3.** A date-time specification MUST be semantically valid.
- **RFC 5322 § 3.6.** More importantly, the trace header fields and resent header fields MUST NOT be reordered, and SHOULD be kept in blocks prepended to the message.
- **RFC 5322 § 3.6.2.** If the from field contains more than one mailbox specification in the mailbox-list, then the sender field, containing the field name "Sender" and a single mailbox specification, MUST appear in the message.
- **RFC 5322 § 3.6.4.** Though listed as optional in the table in section 3.6, every message SHOULD have a "Message-ID:" field.
- **RFC 5322 § 3.6.4.** The message identifier (msg-id) itself MUST be a globally unique identifier for a message.
- **RFC 5322 § 3.6.6.** When resent fields are used, the "Resent-From:" and "Resent-Date:" fields MUST be sent.
- **RFC 5322 § 4.** Though these syntactic forms MUST NOT be generated according to the grammar in section 3, they MUST be accepted and parsed by a conformant receiver.

## RFC 2045 Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet Message Bodies

Source: https://www.rfc-editor.org/rfc/rfc2045.html

- **RFC 2045 § 6.7.** Octets with values of 9 and 32 MAY be represented as US-ASCII TAB (HT) and SPACE characters, respectively, but MUST NOT be so represented at the end of an encoded line.
- **RFC 2045 § 6.7.** Any TAB (HT) or SPACE characters on an encoded line MUST thus be followed on that line by a printable character.

## RFC 2046 Multipurpose Internet Mail Extensions (MIME) Part Two: Media Types

Source: https://www.rfc-editor.org/rfc/rfc2046.html

- **RFC 2046 § 4.1.1.** The canonical form of any MIME "text" subtype MUST always represent a line break as a CRLF sequence.
- **RFC 2046 § 5.1.** The boundary delimiter MUST NOT appear inside any of the encapsulated parts, on a line by itself or as the prefix of any line.
- **RFC 2046 § 5.1.1.** The boundary delimiter MUST occur at the beginning of a line, i.e., following a CRLF, and the initial CRLF is considered to be attached to the boundary delimiter line rather than part of the preceding part.
- **RFC 2046 § 5.2.3.** The encapsulated headers in ALL "message/external-body" entities MUST include a Content-ID header field to give a unique identifier by which to reference the data.

## RFC 2047 MIME (Multipurpose Internet Mail Extensions) Part Three: Message Header Extensions for Non-ASCII Text

Source: https://www.rfc-editor.org/rfc/rfc2047.html

- **RFC 2047 § 5.** An 'encoded-word' MUST NOT appear in any portion of an 'addr-spec'.
- **RFC 2047 § 5.** An 'encoded-word' MUST NOT appear within a 'quoted-string'.
- **RFC 2047 § 5.** Each 'encoded-word' MUST represent an integral number of characters.
- **RFC 2047 § 6.3.** However, a mail reader MUST NOT prevent the display or handling of a message because an 'encoded-word' is incorrectly formed.

## RFC 2049 Multipurpose Internet Mail Extensions (MIME) Part Five: Conformance Criteria and Examples

Source: https://www.rfc-editor.org/rfc/rfc2049.html

- **RFC 2049 § 2.** Conforming user agents MUST include proper MIME labelling when sending anything other than plain text in the US-ASCII character set.

## RFC 6838 Media Type Specifications and Registration Procedures

Source: https://www.rfc-editor.org/rfc/rfc6838

- **RFC 6838 § 4.4.** All registered media types MUST employ a single, canonical data format, regardless of registration tree.
- **RFC 6838 § 4.2.8.** By the same token, media types MUST NOT be given names incorporating suffixes for structured syntaxes they do not actually employ.
