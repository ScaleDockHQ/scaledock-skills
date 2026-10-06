# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## UTS #39

Source: https://www.unicode.org/reports/tr39/

the General Profile for Identifiers shall do so by conforming to either UTS-39-C1-1 or UTS-39-C1-2 .

- **Unicode Security Mechanisms.** Readers should be familiar with [ UTR36 ] before continuing.
- **Unicode Security Mechanisms.** 2 Conformance An implementation claiming conformance to this specification must do so in conformance to the following clauses: UTS-39-C1 .
- **Unicode Security Mechanisms.** Unicode Standard Annex #31, "Unicode Identifiers and Syntax" [ UAX31 ] provides a recommended method of determining which strings should qualify as identifiers.
- **Unicode Security Mechanisms.** Implementations of the General Profile for Identifiers that wish to retain ZWJ and ZWNJ should declare that they use a modification of the profile per Section 2, Conformance , and should ensure that they implement the restrictions described in Section 3.1.1, Joining Controls .
- **Unicode Security Mechanisms.** The default Identifier_Type property value should be Uncommon_Use if no other categories apply.
- **Unicode Security Mechanisms.** Thus users of this data should be prepared for changes in successive versions, such as by having a backward compatibility policy in place for previously supported characters or registrations.
- **Unicode Security Mechanisms.** Restricted characters should be treated with caution when considering possible use in identifiers, and should be disallowed unless there is good reason to allow them in the environment in question.
- **3.1.1 Joining Controls.** Identifier systems that attempt to provide more natural representations of terms in "modern, customary usage" should allow these characters in input and display, but limit them to contexts in which they are necessary.
