# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## GS1 Digital Link URI Syntax

Source: https://ref.gs1.org/standards/digital-link/uri-syntax/

Enabling consistent representation of GS1 identification keys within web addresses to link to online information and services

- **Conformance to GS1 Digital Link URI Syntax.** Applications SHALL NOT assume that a URL that follows the syntax defined in this standard will point to a resolver.
- **GS1 Digital Link URI Syntax.** It has no negation option (string SHALL NOT contain “xyz”) and it does not support non-greedy matching.
- **GS1 Digital Link URI Syntax.** This means that the value of a GTIN-8, GTIN-12 or GTIN-13 SHALL be prefixed with leading zeroes serving as filler digits to reach a total of 14 digits, exactly as explained in section 2.1.1.10 of the GS1 General Specifications.
- **GS1 Digital Link URI Syntax.** Important :For reasons of backwards compatibility, only existing infrastructure for GS1 Digital Link SHOULD continue to support legacy expressions of GS1 Digital Link URIs.
- **Primary identification key formats.** gtin-value = 14DIGIT ; GTIN-8, GTIN-12 and GTIN-13 SHALL be expressed as 14 digits, with leading zeroes serving as filler digits itip-value = 14DIGIT 2DIGIT 2DIGIT ; 14 digits then 2 digits then 2 digits gmn-value = 1*25 XCHAR ; 1-25 characters from 82-chr subset cpid-value = 1*30 YCHAR ; 1-30 characters from 39-chr subset gln-value = 13DIGIT ; exactly 13 digits payTo-value = 13DIGIT ; exactly 13…
- **Data attributes.** Data attributes and their values SHALL be expressed via the URI query string as key=value pairs.
- **Data attributes.** Where it is necessary to encode more than one GS1 identifier in a single GS1 Digital Link URI, one GS1 identifier SHALL be expressed as the primary identification key (with any relevant key qualifiers) in the path and the remaining GS1 identifier (with any relevant key qualifiers) SHALL be expressed as a data attribute in the query string.
- **Extension mechanism and reserved keywords.** Any key=value pairs used for extension data SHALL NOT use all-numeric keys to avoid conflict with existing and future keys used for GS1 Application Identifiers either in terms of semantics or syntax; nor should they be used to express a value (such as a value for net weight) if that value can be expressed using GS1 Application Identifiers as data attributes.
