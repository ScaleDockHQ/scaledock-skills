# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## UTS #10

Source: https://www.unicode.org/reports/tr10/

supplies the Default Unicode Collation Element Table (DUCET) as the data specifying

- **1 Introduction.** Linguistically correct searching needs to use the same mechanisms: just as "ä" and "æ" sort as if they were the same base letter in Swedish, a loose search should pick up words with either one of them.
- **1 Introduction.** Collation implementations must deal with the complex linguistic conventions for ordering text in specific languages, and provide for common customizations based on user preferences.
- **1.1 Multi-Level Comparison.** In other situations, it should be ignored if there are any base, accent, or case differences.
- **1.2 Canonical Equivalence.** Sequences that are canonically equivalent must sort the same.
- **1.2 Canonical Equivalence.** The order of certain combining marks is also irrelevant in many cases, so such sequences must also be sorted the same, as shown in the second example.
- **1.5 Other Applications of Collation.** In particular, searching should behave consistently with sorting.
- **1.5 Other Applications of Collation.** For example, if two letters are treated as identical base letters for sorting, then those letters should also be treated as identical for searching.
- **Deterministic Comparison.** This means that collations must be carefully versioned.
