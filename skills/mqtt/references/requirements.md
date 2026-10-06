# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## MQTT 5.0

Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html

http://docs.oasis-open.org/mqtt/mqtt/v5.0/cos01/mqtt-v5.0-cos01.docx (Authoritative)

- **1.2.** Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this specification are to be interpreted as described in IETF RFC 2119 [RFC2119] , except where they appear in text that is marked as non-normative.
- **1.5.4 UTF-8 Encoded String.** The character data in a UTF-8 Encoded String MUST be well-formed UTF-8 as defined by the Unicode specification [Unicode] and restated in RFC 3629 [RFC3629] .
- **1.5.4 UTF-8 Encoded String.** In particular, the character data MUST NOT include encodings of code points between U+D800 and U+DFFF [MQTT-1.5.4-1] .
- **1.5.4 UTF-8 Encoded String.** A UTF-8 Encoded String MUST NOT include an encoding of the null character U+0000.
- **1.5.4 UTF-8 Encoded String.** The data SHOULD NOT include encodings of the Unicode [Unicode] code points listed below.
- **1.5.4 UTF-8 Encoded String.** � U+0001..U+001F control characters � U+007F..U+009F control characters � Code points defined in the Unicode specification [Unicode] to be non-characters (for example U+0FFFF) A UTF-8 encoded sequence 0xEF 0xBB 0xBF is always interpreted as U+FEFF ("ZERO WIDTH NO-BREAK SPACE") wherever it appears in a string and MUST NOT be skipped over or stripped off by a packet receiver [MQTT-1.5.4-3] .
- **1.5.5 Variable Byte Integer.** The encoded value MUST use the minimum number of bytes necessary to represent the value [MQTT-1.5.5-1].
- **1.5.7.** Both strings MUST comply with the requirements for UTF-8 Encoded Strings [MQTT-1.5.7-1] .

## MQTT 3.1.1

Source: https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html

http://docs.oasis-open.org/mqtt/mqtt-nist-cybersecurity/v1.0/mqtt-nist-cybersecurity-v1.0.html .

- **1.2 Terminology.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this specification are to be interpreted as described in IETF RFC 2119 [RFC2119] .
- **Figure 1.1.** The character data in a UTF-8 encoded string MUST be well-formed UTF-8 as defined by the Unicode specification [ Unicode ] and restated in RFC 3629 [ RFC3629 ] .
- **Figure 1.1.** In particular this data MUST NOT include encodings of code points between U+D800 and U+DFFF.
- **Figure 1.1.** If a Server or Client receives a Control Packet containing ill-formed UTF-8 it MUST close the Network Connection [MQTT-1.5.3-1] .
- **Figure 1.1.** A UTF-8 encoded string MUST NOT include an encoding of the null character U+0000.
- **Figure 1.1.** If a receiver (Server or Client) receives a Control Packet containing U+0000 it MUST close the Network Connection [MQTT-1.5.3-2] .
- **Figure 1.1.** The data SHOULD NOT include encodings of the Unicode [ Unicode ] code points listed below.
- **2.2.2 Flags.** Where a flag bit is marked as �Reserved� in Table 2.2 - Flag Bits , it is reserved for future use and MUST be set to the value listed in that table [MQTT-2.2.2-1] .
