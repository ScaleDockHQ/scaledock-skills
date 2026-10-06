# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 4180 Common Format and MIME Type for Comma-Separated Values (CSV) Files

Source: https://www.rfc-editor.org/rfc/rfc4180.html

- **document.** This header will contain names corresponding to the fields in the file and should contain the same number of fields as the records in the rest of the file (the presence or absence of the header line should be indicated via the optional "header" parameter of this MIME type).
- **document.** Each line should contain the same number of fields throughout the file.
- **document.** Spaces are considered part of a field and should not be ignored.
- **document.** The last field in the record must not be followed by a comma.
- **document.** Fields containing line breaks (CRLF), double quotes, and commas should be enclosed in double-quotes.
- **document.** If double-quotes are used to enclose fields, then a double-quote appearing inside a field must be escaped by preceding it with another double quote.
- **document.** Implementors choosing not to use this parameter must make their own decisions as to whether the header line is present or absent.
- **document.** However, implementors should be aware that some implementations may use other values.
