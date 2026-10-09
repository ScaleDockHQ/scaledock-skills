# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from NIST IR 7695, which uses RFC 2119 key words in upper case, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the section, clause or control it comes from in the published document.

## NIST IR 7695: CPE Naming Specification Version 2.3

Source: https://nvlpubs.nist.gov/nistpubs/Legacy/IR/nistir7695.pdf

- **§ 4.** An implementation MUST make an explicit claim of conformance to this specification in any documentation provided to end users.
- **§ 4.** If the implementation produces (i.e., generates as an output) CPE names, it MUST produce syntactically correct formatted string bindings as needed to describe or identify applications, operating systems, and hardware devices (cf. 6.2).
- **§ 4.** If the implementation produces CPE names in URI form, it MUST produce URIs that adhere to the syntax rules specified in Figure 6-1, and it SHOULD produce URIs that adhere to the more constrained rules specified in Figure 6-2.
- **§ 5.1.** Lexical case SHALL NOT distinguish attributes from one another, e.g., the attributes Foo, foo, FOO, etc., SHALL be considered equivalent.
- **§ 5.2.** If an attribute is not used in a WFN, it is said to be unspecified, and its value SHALL default to the logical value ANY (cf. 5.3.1).
- **§ 5.3.2.** The underscore (x5f) MAY be used, and it SHOULD be used in place of whitespace characters (which SHALL NOT be used).
- **§ 5.3.2.** A single asterisk MUST NOT be used by itself as an attribute value.
- **§ 5.3.2.** All other printable non-alphanumeric characters (i.e., all punctuation marks, brackets, delimiters and other special purpose symbols, except for the special characters defined above) MUST be quoted when embedded in value strings.
- **§ 5.3.2.** A quoted hyphen MUST NOT be used by itself as a value string.
- **§ 5.3.3.1.** The part attribute SHALL have one of these three string values:
- **§ 5.3.3.10.** Values for this attribute SHALL be valid language tags as defined by [RFC5646], and SHOULD be used to define the language supported in the user interface of the product being described.
- **§ 6.1.1.** To ensure full backward compatibility with [CPE22], any implementation that consumes URIs and claims to be conformant with this Naming specification MUST accept as valid input any URI that obeys the full syntax shown in Figure 6-1.
- **§ 6.1.2.1.1.** The logical value ANY SHALL bind to what [CPE22] calls a "blank" (i.e., an empty component, indicated by two sequential colons) in the URI.
- **§ 6.1.2.1.1.** The logical value NA SHALL bind to a single hyphen.
- **§ 6.2.1.** All other non-alphanumeric characters, if used, MUST be quoted (preceded by the backslash).
- **§ 6.2.1.** Note that all eleven (11) attribute values MUST appear in the formatted string binding.
