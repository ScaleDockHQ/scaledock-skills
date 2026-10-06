# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## UAX #15

Source: https://www.unicode.org/reports/tr15/

When implementations keep strings in a normalized form, they can be assured that equivalent

- **1.1 Canonical and Compatibility Equivalence.** Canonical equivalence is a fundamental equivalency between characters or sequences of characters which represent the same abstract character, and which when correctly displayed should always have the same visual appearance and behavior.
- **1.2 Normalization Forms.** Normalization Forms KC and KD must not be blindly applied to arbitrary text.
- **3 Versioning and Stability.** That is, if a string that does not have any unassigned characters is normalized under one version of Unicode, it must remain normalized under all future versions of Unicode.
- **3 Versioning and Stability.** That is, Z must be a new character, and either X or Y must be a new character.
- **3 Versioning and Stability.** In addition to fixing the composition version, future versions of Unicode must be restricted in terms of the kinds of changes that can be made to character properties.
- **4 Conformance.** A process that purports to transform text into a Normalization Form must be able to produce the results of the conformance test specified in the NormalizationTest.txt data file [ Test15 ].
- **4 Conformance.** A process that purports to transform text into the Stream-Safe Text Format must do so according to the Stream-Safe Text Process defined in UAX15-D4 .
- **4 Conformance.** A process that purports to transform text according to the Normalization Process for Stabilized Strings must do so in accordance with the specifications in this annex.
