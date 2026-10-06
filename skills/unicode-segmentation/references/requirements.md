# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## UAX #29

Source: https://www.unicode.org/reports/tr29/

implementations can produce these divisions. However, it does provide conformance clauses to enable implementations to clearly describe their behavior in relation to the default behavior.

- **Contents.** The specification needs to allow the designation of large sets of characters sharing the same characteristics (for example, uppercase letters), while the implementation must provide quick access and matches to those large sets.
- **Contents.** The mechanism also must handle special features of the Unicode Standard, such as nonspacing marks and conjoining jamos.
- **Contents.** When this is done, the Common/Inherited values need to be handled properly, and the Script_Extensions property should be used instead of the Script property alone.
- **Contents.** This specification defines default mechanisms; more sophisticated implementations can and should tailor them for particular locales or environments and, for the purpose of claiming conformance, document the tailoring in the form of a profile.
- **Contents.** When limits on data size are desirable, they should be used together with word or character count limits.
- **Contents.** Word boundaries, line boundaries, and sentence boundaries should not occur within a grapheme cluster: in other words, a grapheme cluster should be an atomic unit with respect to the process of determining these other boundaries.
- **Contents.** For example, the text editing framework must know if a digraph is represented as a single glyph in the font, and therefore may not be able to position a cursor at the proper position separating its two components.
- **Contents.** That framework must also be able to determine display representation in cases where two glyphs overlap—this is true generally when a character is displayed together with a subsequent nonspacing mark, but must also be determined in detail for complex script rendering.
