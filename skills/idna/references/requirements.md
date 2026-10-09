# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are conformance sentences and processing steps from the published text, quoted as written (only line breaks were joined). Apply the ones that match the role. Each is labelled with the section it comes from in the published document.

## UTS #46: Unicode IDNA Compatibility Processing

Source: https://www.unicode.org/reports/tr46/

- **UTS #46 § 3.** Given a version of Unicode and a Unicode String, a conformant implementation of Nontransitional Processing shall replicate the results given by applying the Nontransitional Processing algorithm specified by Section 4, Processing.
- **UTS #46 § 4.** Normalize the domain_name string to Unicode Normalization Form C.
- **UTS #46 § 4.** If the label contains any non-ASCII code point (i.e., a code point greater than U+007F), record that there was an error, and continue with the next label.
- **UTS #46 § 4.** If the label is empty, or if the label contains only ASCII code points, record that there was an error.
- **UTS #46 § 4.1.** The label must be in Unicode Normalization Form NFC.
- **UTS #46 § 4.1.** If CheckHyphens, the label must not contain a U+002D HYPHEN-MINUS character in both the third and fourth positions.
- **UTS #46 § 4.1.** If not CheckHyphens, the label must not begin with “xn--”.
- **UTS #46 § 4.1.** The label must not begin with a combining mark, that is: General_Category=Mark.
- **UTS #46 § 4.1.** For Nontransitional Processing, each value must be either valid or deviation.
- **UTS #46 § 4.1.** In addition, if UseSTD3ASCIIRules=true and the code point is an ASCII code point (U+0000..U+007F), then it must be a lowercase letter (a-z), a digit (0-9), or a hyphen-minus (U+002D).
- **UTS #46 § 4.1.** If CheckBidi, and if the domain name is a Bidi domain name, then the label must satisfy all six of the numbered conditions in [IDNA2008] RFC 5893, Section 2.
- **UTS #46 § 4.2.** The length of the domain name, excluding the root label and its dot, is from 1 to 253.
- **UTS #46 § 4.2.** If an error was recorded in steps 1-4, then the operation has failed and a failure value is returned. No DNS lookup should be done.

## RFC 5890: IDNA Definitions

Source: https://www.rfc-editor.org/rfc/rfc5890.html

- **RFC 5890 § 2.3.1.** Because LDH labels (and, indeed, any DNS label) must not be more than 63 octets in length, the portion of an XN-label derived from the Punycode algorithm is limited to no more than 59 ASCII characters.
- **RFC 5890 § 2.3.2.1.** While that constraint may be tested in any of several ways, an A-label A1 must be capable of being produced by conversion from a U-label U1, and that U-label U1 must be capable of being produced by conversion from A-label A1.

## RFC 5891: IDNA Protocol

Source: https://www.rfc-editor.org/rfc/rfc5891.html

- **RFC 5891 § 3.1.** A pair of A-labels MUST be compared as case-insensitive ASCII (as with all comparisons of ASCII DNS labels).
- **RFC 5891 § 3.1.** U-labels MUST be compared as-is, without case folding or other intermediate steps.
- **RFC 5891 § 3.2.** IDNs actually appearing in DNS queries or responses MUST be A-labels.
- **RFC 5891 § 4.1.** Entities responsible for zone files ("registries") MUST accept only the exact string for which registration is requested, free of any mappings or local adjustments.
- **RFC 5891 § 4.2.2.** The candidate Unicode string MUST NOT contain characters that appear in the "DISALLOWED" and "UNASSIGNED" lists specified in the Tables document [RFC5892].
- **RFC 5891 § 4.2.3.1.** The Unicode string MUST NOT contain "--" (two consecutive hyphens) in the third and fourth character positions and MUST NOT start or end with a "-" (hyphen).
- **RFC 5891 § 5.3.** If the label is converted to Unicode (i.e., to U-label form) using the Punycode decoding algorithm, then the processing specified in those two sections MUST be performed, and the label MUST be rejected if the resulting label is not identical to the original.
- **RFC 5891 § 5.4.** This requirement means that the application must use a list of unassigned characters that is matched to the version of Unicode that is being used for the other requirements in this section.
