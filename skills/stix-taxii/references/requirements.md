# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## STIX 2.1

Source: https://docs.oasis-open.org/cti/stix/v2.1/stix-v2.1.html

https://docs.oasis-open.org/cti/stix/v2.1/errata01/csd01/stix-v2.1-errata01-csd01-complete.md

- **Key words:.** The key words “ MUST ”, “ MUST NOT ”, “ REQUIRED ”, “ SHALL ”, “ SHALL NOT ”, “ SHOULD ”, “ SHOULD NOT ”, “ RECOMMENDED ”, “ NOT RECOMMENDED ”, “ MAY ”, and “ OPTIONAL ” in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2. Common Data Types.** The phrasing “ list of type <type> ” is used to indicate that all values within the list MUST conform to the specified type.
- **2.1 Binary.** In order to allow pattern matching on custom objects, for all properties that use the binary type, the property name MUST end with _bin .
- **2.1 Binary.** Other serializations SHOULD use a native binary type, if available.
- **2.2 Boolean.** Properties with this type MUST have a value of true or false .
- **2.3 Dictionary.** Dictionary keys MUST be unique in each dictionary, MUST be in ASCII, and are limited to the characters a-z (lowercase ASCII), A-Z (uppercase ASCII), numerals 0-9, hyphen (-), and underscore (_).
- **2.3 Dictionary.** Dictionary keys MUST be no longer than 250 ASCII characters in length and SHOULD be lowercase.
- **2.3 Dictionary.** Empty dictionaries are prohibited in STIX and MUST NOT be used as a substitute for omitting the property if it is optional.

## TAXII 2.1

Source: https://docs.oasis-open.org/cti/taxii/v2.1/taxii-v2.1.html

by John Wunder, Mark Davidson, and Bret Jordan. Latest stage: http://docs.oasis-open.org/cti/taxii/v2.0/taxii-v2.0.html .

- **document.** IN NO EVENT SHALL THE UNITED STATES GOVERNMENT OR ITS CONTRACTORS OR SUBCONTRACTORS BE LIABLE FOR ANY DAMAGES, INCLUDING, BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL DAMAGES, ARISING OUT OF, RESULTING FROM, OR IN ANY WAY CONNECTED WITH THESE STANDARDS OR THEIR COMPONENT PARTS OR ANY PROVIDED DOCUMENTATION, WHETHER OR NOT BASED UPON WARRANTY, CONTRACT, TORT, OR OTHERWISE,…
- **1.2 Terminology.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " NOT RECOMMENDED ", " MAY ", and " OPTIONAL " in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2.** Properties with this type MUST have a literal (unquoted) value of true or false .
- **2.** The UUID MUST be generated according to the algorithm(s) defined in RFC 4122, section 4.4 (Version 4 UUID) [ RFC4122 ].
- **2.** Unless otherwise specified, all integers MUST be capable of being represented as a signed 54-bit value� ([-(2**53)+1, (2**53)-1]) as defined in [ RFC7493 ].
- **2.** The phrasing � list of type <type> � is used to indicate that all values within the list MUST conform to the specified type.
- **2.** This specification does not specify the maximum number of allowed values in a list , however every instance of a list MUST have at least one value.
- **2.** Empty lists are prohibited in TAXII and MUST NOT be used as a substitute for omitting optional properties.
