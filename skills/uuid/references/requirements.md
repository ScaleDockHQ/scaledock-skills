# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 9562 Universally Unique IDentifiers (UUIDs)

Source: https://www.rfc-editor.org/rfc/rfc9562.html

This specification defines UUIDs (Universally Unique IDentifiers) -- also known as GUIDs (Globally Unique IDentifiers) -- and a Uniform Resource Name namespace for UUIDs. A UUID is 128 bits long and is intended to guarantee uniqueness across space and time. UUIDs were originally used in the Apollo Network Computing System (NCS), later in the Open Software Foundation's (OSF's) Distributed Computing Environment (DCE), and then in Microsoft Windows platforms. ¶ This specification is derived from the OSF DCE specification with the kind permission of the OSF (now known as "The Open Group"). Information from earlier versions of the OSF DCE specification have been incorporated into this document. T

- **abstract.** This specification defines UUIDs (Universally Unique IDentifiers) -- also known as GUIDs (Globally Unique IDentifiers) -- and a Uniform Resource Name namespace for UUIDs. A UUID is 128 bits long and is intended to guarantee uniqueness across space and time. UUIDs were originally used in the Apollo Network Computing System (NCS), later in the Open Software Foundation's (OSF's) Distributed Computing Environment (DCE), and then in Microsoft Windows platforms. ¶ This specification is derived from the OSF DCE specification with the kind permission of the OSF (now known as "The Open Group"). Information from earlier versions of the OSF DCE specification have been incorporated into this document. T

## RFC 4122 A Universally Unique IDentifier (UUID) URN Namespace

Source: https://www.rfc-editor.org/rfc/rfc4122.html

- **document.** The clock sequence MUST be originally (i.e., once in the lifetime of a system) initialized to a random number to minimize the correlation across systems.
- **document.** The initial value MUST NOT be correlated to the node identifier.
- **document.** If a system overruns the generator by requesting too many UUIDs within a single system time interval, the UUID service MUST either return an error, or stall the UUID generator until the system clock catches up.
- **document.** The requirements for these types of UUIDs are as follows: o The UUIDs generated at different times from the same name in the same namespace MUST be equal.
- **document.** Nothing in this document should be construed to override the DCE standards that defined UUIDs.
- **document.** When converting from a bit-oriented, in-memory representation of a UUID into a URN, care must be taken to strictly adhere to the byte order issues mentioned in the string representation section.
- **document.** If the previous value of the clock sequence is known, it can just be incremented; otherwise it should be set to a random or high-quality pseudo-random value.
- **document.** The multicast bit must be set in such addresses, in order that they will never conflict with addresses obtained from network cards.
