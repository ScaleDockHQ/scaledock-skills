# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## UAX #9

Source: https://www.unicode.org/reports/tr9/

This annex describes specifications for the positioning of characters in text containing characters flowing from right

- **1 Introduction.** In all other respects they should be ignored—they have no effect on the comparison of text or on word breaks, parsing, or numeric analysis.
- **2 Directional Formatting Characters.** On web pages, the explicit directional formatting characters (of all types &ndash; embedding, override, and isolate) should be replaced by other mechanisms suitable for HTML and CSS.
- **2.7 Markup and Formatting Characters.** The explicit formatting characters introduce state into the plain text, which must be maintained when editing or displaying the text.
- **2.7 Markup and Formatting Characters.** Where available, markup should be used instead of the explicit formatting characters: for more information, see [ UnicodeXML ].
- **2.7 Markup and Formatting Characters.** PDF PDI <bdo dir = "ltr"> direction:ltr; unicode-bidi:isolate-override Unlike HTML4.0, HTML5 does not provide exact equivalents for LRE, RLE, LRO, and RLO, although the dir attribute and the BDO element as outlined above should in most cases work as well or better than those formatting characters.
- **2.7 Markup and Formatting Characters.** Whenever plain text is produced from a document containing markup, the equivalent formatting characters should be introduced, so that the correct ordering is not lost.
- **2.7 Markup and Formatting Characters.** For example, whenever cut and paste results in plain text this transformation should occur.
- **3.1.2 Matching Explicit Directional Formatting Characters.** It is maximal in the sense that if the first character of the first level run in the sequence is a PDI, it must not match any isolate initiator, and if the last character of the last level run in the sequence is an isolate initiator, it must not have a matching PDI.
