# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from. RFC 4180 is Informational and contains no BCP 14 keywords, so this list quotes its defining format rules, ABNF grammar and media type parameters instead.

## RFC 4180 Common Format and MIME Type for Comma-Separated Values (CSV) Files

Source: https://www.rfc-editor.org/rfc/rfc4180.html

- **RFC 4180 § 2.** Each record is located on a separate line, delimited by a line break (CRLF).
- **RFC 4180 § 2.** The last record in the file may or may not have an ending line break.
- **RFC 4180 § 2.** There maybe an optional header line appearing as the first line of the file with the same format as normal record lines.
- **RFC 4180 § 2.** Each line should contain the same number of fields throughout the file.
- **RFC 4180 § 2.** Spaces are considered part of a field and should not be ignored.
- **RFC 4180 § 2.** The last field in the record must not be followed by a comma.
- **RFC 4180 § 2.** If fields are not enclosed with double quotes, then double quotes may not appear inside the fields.
- **RFC 4180 § 2.** Fields containing line breaks (CRLF), double quotes, and commas should be enclosed in double-quotes.
- **RFC 4180 § 2.** If double-quotes are used to enclose fields, then a double-quote appearing inside a field must be escaped by preceding it with another double quote.
- **RFC 4180 § 2.** file = [header CRLF] record *(CRLF record) [CRLF]
- **RFC 4180 § 2.** escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
- **RFC 4180 § 2.** TEXTDATA = %x20-21 / %x23-2B / %x2D-7E
- **RFC 4180 § 3.** The "header" parameter indicates the presence or absence of the header line. Valid values are "present" or "absent".
- **RFC 4180 § 3.** As per section 4.1.1. of RFC 2046 [3], this media type uses CRLF to denote line breaks. However, implementors should be aware that some implementations may use other values.
- **RFC 4180 § 3.** Implementors should "be conservative in what you do, be liberal in what you accept from others" (RFC 793 [8]) when processing CSV files.
