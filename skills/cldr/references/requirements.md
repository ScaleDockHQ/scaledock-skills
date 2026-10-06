# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## UTS #35 LDML

Source: https://www.unicode.org/reports/tr35/

This document describes an XML format ( vocabulary ) for the exchange of structured locale data. This format is used in the Unicode Common Locale Data Repository .

- **U Extension Data Files.** <!ELEMENT keyword ( key* )> <!ELEMENT key ( type* )> <!ATTLIST key extension NMTOKEN #IMPLIED> <!ATTLIST key name NMTOKEN #REQUIRED> <!ATTLIST key description CDATA #IMPLIED> <!ATTLIST key deprecated ( true | false ) "false"> <!ATTLIST key preferred NMTOKEN #IMPLIED> <!ATTLIST key alias NMTOKEN #IMPLIED> <!ATTLIST key valueType (single | multiple | incremental | any) #IMPLIED > <!ATTLIST key…
- **Validity Data.** <!ELEMENT idValidity (id*) > <!ELEMENT id ( #PCDATA ) > <!ATTLIST id type NMTOKEN #REQUIRED > <!ATTLIST id idStatus NMTOKEN #REQUIRED > The directory common/validity contains machine-readable data for validating the language, region, script, and variant subtags, as well as currency, subdivisions and measure units.
- **Parent Locales.** <!ELEMENT parentLocales ( parentLocale* ) > <!ATTLIST parentLocales component NMTOKENS #IMPLIED > <!ELEMENT parentLocale EMPTY > <!ATTLIST parentLocale parent NMTOKEN #REQUIRED > <!ATTLIST parentLocale localeRules NMTOKENS #IMPLIED > <!ATTLIST parentLocale locales NMTOKENS #REQUIRED > When the component does not occur, that is referred to as the ‘main’ component.
- **Likely Subtags.** <!ELEMENT likelySubtag EMPTY > <!ATTLIST likelySubtag from NMTOKEN #REQUIRED> <!ATTLIST likelySubtag to NMTOKEN #REQUIRED> There are a number of situations where it is useful to be able to find the most likely language, script, or region.
- **Language Matching.** <!ELEMENT languageMatching ( languageMatches* ) > <!ELEMENT languageMatches ( paradigmLocales*, matchVariable*, languageMatch* ) > <!ATTLIST languageMatches type NMTOKEN #REQUIRED > <!ELEMENT languageMatch EMPTY > <!ATTLIST languageMatch desired CDATA #REQUIRED > <!ATTLIST languageMatch supported CDATA #REQUIRED > <!ATTLIST languageMatch percent NMTOKEN #REQUIRED > <!ATTLIST languageMatch…
- **XML Format.** An element that has value attributes MUST NOT also have have child elements.
- **Element alias.** <!ELEMENT alias (special*) > <!ATTLIST alias source NMTOKEN #REQUIRED > <!ATTLIST alias path CDATA #IMPLIED> The contents of any element in root can be replaced by an alias, which points to the path where the data can be found.
- **Introduction.** Implementations should consider converting LDML data into a more compact format prior to use.
