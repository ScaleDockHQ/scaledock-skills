# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 5545 Internet Calendaring and Scheduling Core Object Specification (iCalendar)

Source: https://www.rfc-editor.org/rfc/rfc5545.html

- **RFC 5545 § 3.1.** Lines of text SHOULD NOT be longer than 75 octets, excluding the line break.
- **RFC 5545 § 3.1.** When parsing a content line, folded lines MUST first be unfolded according to the unfolding procedure described above.
- **RFC 5545 § 3.1.1.** Property parameters with values containing a COLON character, a SEMICOLON character or a COMMA character MUST be placed in quoted text.
- **RFC 5545 § 3.2.** Property parameter values MUST NOT contain the DQUOTE character.
- **RFC 5545 § 3.2.** Applications MUST ignore x-param and iana-param values they don't recognize.
- **RFC 5545 § 3.3.5.** The "TZID" property parameter MUST NOT be applied to DATE-TIME properties whose time values are specified in UTC.
- **RFC 5545 § 3.3.10.** Compliant applications MUST accept rule parts ordered in any sequence, but to ensure backward compatibility with applications that pre-date this revision of iCalendar the FREQ rule part MUST be the first rule part specified in a RECUR value.
- **RFC 5545 § 3.3.10.** The value of the UNTIL rule part MUST have the same value type as the "DTSTART" property.
- **RFC 5545 § 3.3.10.** If the "DTSTART" property is specified as a date with UTC time or a date with local time and time zone reference, then the UNTIL rule part MUST be specified as a date with UTC time.
- **RFC 5545 § 3.3.10.** The BYSECOND, BYMINUTE and BYHOUR rule parts MUST NOT be specified when the associated "DTSTART" property has a DATE value type.
- **RFC 5545 § 3.3.11.** A BACKSLASH character in a "TEXT" property value MUST be escaped with another BACKSLASH character.
- **RFC 5545 § 3.3.11.** A COMMA character in a "TEXT" property value MUST be escaped with a BACKSLASH character.
- **RFC 5545 § 3.3.11.** A SEMICOLON character in a "TEXT" property value MUST be escaped with a BACKSLASH character.
- **RFC 5545 § 3.6.5.** An individual "VTIMEZONE" calendar component MUST be specified for each unique "TZID" parameter value specified in the iCalendar object.
- **RFC 5545 § 3.8.4.7.** The "UID" itself MUST be a globally unique identifier.

## RFC 7265 jCal: The JSON Format for iCalendar

Source: https://www.rfc-editor.org/rfc/rfc7265.html

- **RFC 7265 § 3.1.** When converting from iCalendar to jCal: First, iCalendar lines MUST be unfolded. Afterwards, any iCalendar escaping MUST be unescaped. Finally, JSON escaping, as described in Section 7 of [RFC7159], MUST be applied.
- **RFC 7265 § 3.4.** In jCal, each individual iCalendar property MUST be represented by an array with three fixed elements, followed by one or more additional elements, depending on if the property is a multi-valued property as described in Section 3.1.2 of [RFC5545].
- **RFC 7265 § 3.5.** The name of the parameter MUST be in lowercase; the original case of the parameter value MUST be preserved.
- **RFC 7265 § 4.** The VALUE parameter MUST be omitted for properties that have the jCal type identifier "unknown".

## RFC 8984 JSCalendar: A JSON Representation of Calendar Data

Source: https://www.rfc-editor.org/rfc/rfc8984.html

- **RFC 8984 § 3.** A JSCalendar object is a JSON object [RFC8259], which MUST be valid I-JSON (a stricter subset of JSON) [RFC7493].
- **RFC 8984 § 1.4.4.** This is a string in the "date-time" [RFC3339] format, with the further restrictions that any letters MUST be in uppercase, and the time offset MUST be the character "Z".
- **RFC 8984 § 1.4.9.** Implementations MUST reject a PatchObject in its entirety if any of its patches are invalid.
- **RFC 8984 § 3.3.** To avoid conflict, the names of these properties MUST be prefixed by a domain name controlled by the vendor followed by a colon, e.g., "example.com:customprop".
- **RFC 8984 § 4.1.2.** UUID version 4, described in Section 4.4 of [RFC4122], is RECOMMENDED.
