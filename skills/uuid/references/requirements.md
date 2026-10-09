# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 9562 Universally Unique IDentifiers (UUIDs)

Source: https://www.rfc-editor.org/rfc/rfc9562.html

- **RFC 9562 § 4.1.** Specifically for UUIDs in this document, bits 64 and 65 of the UUID (bits 0 and 1 of octet 8) MUST be set to 1 and 0 as specified in row 2 of Table 1.
- **RFC 9562 § 5.1.** The clock sequence MUST be originally (i.e., once in the lifetime of a system) initialized to a random number to minimize the correlation across systems.
- **RFC 9562 § 5.1.** The initial value MUST NOT be correlated to the Node ID.
- **RFC 9562 § 5.3.** Where possible, UUIDv5 SHOULD be used in lieu of UUIDv3.
- **RFC 9562 § 5.6.** Systems that do not involve legacy UUIDv1 SHOULD use UUIDv7 (Section 5.7) instead.
- **RFC 9562 § 5.7.** Implementations SHOULD utilize UUIDv7 instead of UUIDv1 and UUIDv6 if possible.
- **RFC 9562 § 5.8.** UUIDv8's uniqueness will be implementation specific and MUST NOT be assumed.
- **RFC 9562 § 6.1.** If other timestamp sources or a custom timestamp Epoch are required, UUIDv8 MUST be used.
- **RFC 9562 § 6.1.** If a system overruns the generator by requesting too many UUIDs within a single system-time interval, the UUID service can return an error or stall the UUID generator until the system clock catches up and MUST NOT knowingly return duplicate values due to a counter rollover.
- **RFC 9562 § 6.2.** If present, a fixed bit-length counter MUST be positioned immediately after the embedded timestamp.
- **RFC 9562 § 6.2.** Counter rollovers MUST be handled by the application to avoid sorting issues.
- **RFC 9562 § 6.4.** The node id SHOULD NOT be an IEEE 802 MAC address per Section 8.
- **RFC 9562 § 6.5.** UUIDs generated at different times from the same name (using the same canonical format) in the same namespace MUST be equal.
- **RFC 9562 § 6.9.** Implementations SHOULD utilize a cryptographically secure pseudorandom number generator (CSPRNG) to provide values that are both difficult to predict ("unguessable") and have a low likelihood of collision ("unique").
- **RFC 9562 § 6.10.** After generating the 48-bit fully randomized node value, implementations MUST set the least significant bit of the first octet of the Node ID to 1.
- **RFC 9562 § 6.13.** Thus, where feasible, UUIDs SHOULD be stored within database applications as the underlying 128-bit binary value.
- **RFC 9562 § 8.** Implementations SHOULD NOT assume that UUIDs are hard to guess.
- **RFC 9562 § 8.** For example, they MUST NOT be used as security capabilities (identifiers whose mere possession grants access).
- **RFC 9562 § 8.** Implementations MUST NOT assume that it is easy to determine if a UUID has been slightly modified in order to redirect a reference to another object.
- **RFC 9562 § 8.** MAC addresses pose inherent security risks around privacy and SHOULD NOT be used within a UUID.

## RFC 4122 A Universally Unique IDentifier (UUID) URN Namespace

Source: https://www.rfc-editor.org/rfc/rfc4122.html

- **RFC 4122 § 4.2.1.2.** If a system overruns the generator by requesting too many UUIDs within a single system time interval, the UUID service MUST either return an error, or stall the UUID generator until the system clock catches up.
