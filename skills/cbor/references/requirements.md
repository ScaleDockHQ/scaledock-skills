# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 8949 Concise Binary Object Representation (CBOR)

Source: https://www.rfc-editor.org/rfc/rfc8949.html

The Concise Binary Object Representation (CBOR) is a data format whose design goals include the possibility of extremely small code size, fairly small message size, and extensibility without the need for version negotiation. These design goals make it different from earlier binary serializations such as ASN.1 and MessagePack. ¶ This document obsoletes RFC 7049, providing editorial improvements, new details, and errata fixes while keeping full compatibility with the interchange format of RFC 7049. It does not create a new version of the format. ¶

- **abstract.** The Concise Binary Object Representation (CBOR) is a data format whose design goals include the possibility of extremely small code size, fairly small message size, and extensibility without the need for version negotiation. These design goals make it different from earlier binary serializations such as ASN.1 and MessagePack. ¶ This document obsoletes RFC 7049, providing editorial improvements, new details, and errata fixes while keeping full compatibility with the interchange format of RFC 7049. It does not create a new version of the format. ¶

## RFC 8610 Concise Data Definition Language (CDDL): A Notational Convention to Express Concise Binary Object Representation (CBOR) and JSON Data Structures

Source: https://www.rfc-editor.org/rfc/rfc8610.html

- **document.** Requirements Notation The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **document.** Similar considerations apply to Unicode character classes; where these are used, the specification that employs CDDL SHOULD identify which Unicode versions are addressed.
- **document.** Also, this definition makes it clear that several ext-values are allowed (by definition with different member names); RFC 7071 could be read to forbid the repetition of ext-value ("A specific reputon-element MUST NOT appear more than once" is ambiguous).
- **document.** Code Components extracted from this document must include Simplified BSD License text as described in Section 4.e of the Trust Legal Provisions and are provided without warranty as described in the Simplified BSD License.
- **document.** How this is used should be evident from the prelude (Appendix D): a hash mark ("#") optionally followed by a number from 0 to 7 identifying the major type, which then can be followed by a dot and a number specifying the additional information.
- **document.** (Note that there is no way to use a group as a root -- it must be a type.) Birkholz, et al.
- **document.** If unprefixed, the string is interpreted as with a text string, except that single quotes must be escaped and that the resulting UTF-8 bytes are marked as a byte string (major type 2).
- **document.** full-address = [[+ label], ip4, ip6] ip4 = bstr .size 4 ip6 = bstr .size 16 label = bstr .size (1..63) Figure 8: Control for Size in Bytes When applied to an unsigned integer, the ".size" control restricts the range of that integer by giving a maximum number of bytes that should be needed in a computer representation of that unsigned integer.

## RFC 9165 Additional Control Operators for the Concise Data Definition Language (CDDL)

Source: https://www.rfc-editor.org/rfc/rfc9165.html

The Concise Data Definition Language (CDDL), standardized in RFC 8610, provides "control operators" as its main language extension point. ¶ The present document defines a number of control operators that were not yet ready at the time RFC 8610 was completed: .plus , .cat , and .det for the construction of constants; .abnf / .abnfb for including ABNF (RFC 5234 and RFC 7405) in CDDL specifications; and .feature for indicating the use of a non-basic feature in an instance. ¶

- **abstract.** The Concise Data Definition Language (CDDL), standardized in RFC 8610, provides "control operators" as its main language extension point. ¶ The present document defines a number of control operators that were not yet ready at the time RFC 8610 was completed: .plus , .cat , and .det for the construction of constants; .abnf / .abnfb for including ABNF (RFC 5234 and RFC 7405) in CDDL specifications; and .feature for indicating the use of a non-basic feature in an instance. ¶
