# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Unicode 18.0.0

Source: https://www.unicode.org/versions/Unicode18.0.0/

STATUS: This is a preliminary draft page for an upcoming release. Some details may be missing or incorrect, and some links may be wrong or broken. During the beta review period, feedback about errors on this page will be helpful and appreciated.

- **Version References.** Version 18.0.0 of the Unicode Standard should be referenced as: The Unicode Consortium.
- **Numeric Property Issues.** Specialist implementations dealing with cuneiform text should be aware of these characters, which also pose challenges for formatting and for font design.
- **Collation-related Changes.** Implementations of UCA should be aware of this change.

## Unicode 17.0.0

Source: https://www.unicode.org/versions/Unicode17.0.0/

STATUS: This is a preliminary draft page for an upcoming release. Some details may be missing or incorrect, and some links may be wrong or broken. During the alpha review period, errors are expected and feedback is not necessary. During the beta review period, feedback about errors on this page will be helpful and appreciated.

- **Version References.** Version 17.0.0 of the Unicode Standard should be referenced as: The Unicode Consortium.
- **Numeric Property Issues.** Implementations of numeric values and numeric formatting should take this new set into account.

## Unicode 16.0.0

Source: https://www.unicode.org/versions/Unicode16.0.0/

STATUS: This is a preliminary draft page for an upcoming release. Some details may be missing or incorrect, and some links may be wrong or broken. During the beta review period, feedback on errors will be helpful and appreciated.

- **New Data Files for Unicode 16.0.** This is a new file that collects information about characters or character sequences that should not be emitted or generated in newly authored text and for which a suitable alternative sequence exists.
- **Version References.** Version 16.0.0 of the Unicode Standard should be referenced as: The Unicode Consortium.
- **G. Changes in the Unicode Standard Annexes.** UAX #31 Unicode Identifiers and Syntax A clarification was added that NFD must be applied before toNFKC_Casefold in order to correctly meet requirements UAX31-R4 and UAX-R5 with NFKC and full case folding.
- **General Character Property Issues.** Software that needs to identify nuktas in Brahmic scripts should check for Indic_Syllabic_Category=Nukta.
- **Segmentation.** Implementations should take note that GCB=V and HST=V are no longer coextensive.
- **Numeric Property Issues.** Implementations of numeric values and numeric formatting should take these new sets into account.

## Unicode 15.1.0

Source: https://www.unicode.org/versions/Unicode15.1.0/

STATUS: This is a preliminary draft page for an upcoming release. Some details may be missing or incorrect, and some links may be wrong or broken. During the alpha review period, errors are expected and feedback is not necessary. During the beta review period, feedback on errors will be helpful and appreciated.

- **Version References.** Version 15.1.0 of the Unicode Standard should be referenced as: The Unicode Consortium.
- **CJK/Unihan Changes.** Implementers should check carefully for any hard-coded assumptions about CJK ranges.
- **CJK/Unihan Changes.** Implementers should also check that their code does not assume that CJK extensions all occur in alphabetic order by the extension letter.
