# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 5545 Internet Calendaring and Scheduling Core Object Specification (iCalendar)

Source: https://www.rfc-editor.org/rfc/rfc5545.html

- **document.** Basic Grammar and Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** Lines of text SHOULD NOT be longer than 75 octets, excluding the line
- **document.** Long content lines SHOULD be split into a multiple line representations using a line "folding" technique.
- **document.** Desruisseaux Standards Track [Page 9] RFC 5545 iCalendar September 2009 When parsing a content line, folded lines MUST first be unfolded according to the unfolding procedure described above.
- **document.** The following notation defines the lines of content in an iCalendar object: contentline = name *(";" param ) ":" value CRLF ; This ABNF is just a general definition for an initial parsing ; of the content line into its property name, parameter list, ; and value string ; When parsing a content line, folded lines MUST first ; be unfolded according to the unfolding procedure ; described above.
- **document.** When generating a content line, lines ; longer than 75 octets SHOULD be folded according to ; the folding procedure described above.
- **document.** Values in a list of values MUST be separated by a COMMA character.
- **document.** These structured property values MUST have their value parts separated by a SEMICOLON character.

## RFC 7265 jCal: The JSON Format for iCalendar

Source: https://www.rfc-editor.org/rfc/rfc7265.html

- **document.** Conventions Used in This Document The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** Standards Track [Page 4] RFC 7265 jCal May 2014 When converting from iCalendar to jCal: First, iCalendar lines MUST be unfolded.
- **document.** Afterwards, any iCalendar escaping MUST be unescaped.
- **document.** Finally, JSON escaping, as described in Section 7 of [RFC7159] , MUST be applied.
- **document.** So, the following rules are applied when processing a property with the "ENCODING" property parameter set to "BASE64": o If the property value type is "BINARY", the base64 encoding MUST be preserved.
- **document.** o If the value type is not "BINARY", the "ENCODING" property parameter MUST be removed, and the value MUST be base64 decoded.
- **document.** When base64 encoding is used, it MUST conform to Section 4 of [RFC4648] , which is the base64 method used in [ RFC5545 ].
- **document.** In jCal, each individual iCalendar property MUST be represented by an array with three fixed elements, followed by one or more additional elements, depending on if the property is a multi-valued property as described in Section 3.1.2 of [RFC5545] .

## RFC 8984 JSCalendar: A JSON Representation of Calendar Data

Source: https://www.rfc-editor.org/rfc/rfc8984.html

This specification defines a data model and JSON representation of calendar data that can be used for storage and data exchange in a calendaring and scheduling environment. It aims to be an alternative and, over time, successor to the widely deployed iCalendar data format. It also aims to be unambiguous, extendable, and simple to process. In contrast to the jCal format, which is also based on JSON, JSCalendar is not a direct mapping from iCalendar but defines the data model independently and expands semantics where appropriate. ¶

- **abstract.** This specification defines a data model and JSON representation of calendar data that can be used for storage and data exchange in a calendaring and scheduling environment. It aims to be an alternative and, over time, successor to the widely deployed iCalendar data format. It also aims to be unambiguous, extendable, and simple to process. In contrast to the jCal format, which is also based on JSON, JSCalendar is not a direct mapping from iCalendar but defines the data model independently and expands semantics where appropriate. ¶
