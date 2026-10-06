# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## UAX #31

Source: https://www.unicode.org/reports/tr31/

for the use of Unicode in the definitions of general-purpose identifiers, immutable identifiers, hashtag identifiers, and in

- **Contents.** To preserve the disjoint nature of the categories illustrated in Figure 1 , any character added to one of the categories must be subtracted from the others.
- **Contents.** In this case, the implementation should specify a minimum version of Unicode for the properties.
- **1.5 Notation.** Allowance for layout and format control characters, which should be ignored when parsing identifiers.
- **1.5 Notation.** Another such profile would be to include some set of the optional characters, for example: Start := XID_Start, plus some characters from Table 3 Continue := Start + XID_Continue, plus some characters from Table 3b Medial := some characters from Table 3a Note: Characters in the Medial class must not overlap with those in either the Start or Continue classes.
- **1.5 Notation.** Thus, any characters added to the Medial class from Table 3a must be be checked to ensure they do not also occur in either the newly defined Start class or Continue class.
- **1.5 Notation.** In so doing, care must be taken not to unintentionally include undesired characters, or to violate important invariants.
- **1.5 Notation.** An implementation should be careful when adding a property-based set to a profile.
- **1.5 Notation.** If the profile also needs stable identifiers (backwards compatible), then it must take additional measures.
