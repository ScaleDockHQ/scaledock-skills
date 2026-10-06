# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Accessibility Conformance Testing (ACT) Rules Format 1.1

Source: https://www.w3.org/TR/act-rules-format-1.1/

Accessibility Conformance Testing (ACT) Rules Format 1.1 defines a format for writing accessibility test rules. The test rules can be used for developing automated testing tools and manual testing methodologies. This document provides a common format that allows anyone involved in accessibility testing to document and share their testing procedures in a robust and understandable manner. This enables transparency and harmonization of testing methods, including methods implemented by accessibility test tools.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **4. ACT Rule Structure.** An ACT Rule must consist of at least the following items: Descriptive Title Rule Identifier Rule Description Rule Type Accessibility Requirements Mapping Rule Input , which is one of the following: Input Aspects (for atomic rules) OR Input Rules (for composite rules) Applicability Expectations Background Assumptions Accessibility Support Related Rules (optional) Other Resources (optional)…
- **4. ACT Rule Structure.** However, ACT Rules must be written in a document that conforms to the Web Content Accessibility Guidelines [WCAG22] or a comparable accessibility standard.
- **4. ACT Rule Structure.** If any example contains accessibility issues listed in WCAG 2.2 Section 5.2.5 Non-Interference , users must be warned of this in advance.
- **4. ACT Rule Structure.** ACT Rules should use a localizable format, such that a rule can contain multiple language representations or so that translations of the rule can be created.
- **4.1. Rule Identifier.** An ACT Rule must have an identifier that is unique within its ruleset.
- **4.1. Rule Identifier.** Identifiers that are also used as filenames; They include a technology directory, followed by a handle that includes an element name or attribute: html+svg/video-alternative html+svg/meta-no-refresh html+svg/unique-id In addition to the identifier, each new release of an ACT Rule must be versioned with either a date or a number.
- **4.1. Rule Identifier.** A reference to the previous version of that rule must be available.

## Accessibility Conformance Testing (ACT) Rules Format 1.0

Source: https://www.w3.org/TR/act-rules-format-1.0/

The Accessibility Conformance Testing (ACT) Rules Format 1.0 defines a format for writing accessibility test rules. These test rules can be used for developing automated testing tools and manual testing methodologies. It provides a common format that allows any party involved in accessibility testing to document and share their testing procedures in a robust and understandable manner. This enables transparency and harmonization of testing methods, including methods implemented by accessibility test tools.

- **Conformance.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **4. ACT Rule Structure.** An ACT Rule must consist of at least the following items: Descriptive Title Rule Identifier Rule Description Rule Type Accessibility Requirements Mapping Rule Input , which is one of the following: Input Aspects (for atomic rules) OR Input Rules (for composite rules) Applicability Expectations Assumptions Accessibility Support Test Cases Change Log Glossary An ACT Rule MAY also contain: Issues…
- **4. ACT Rule Structure.** However, ACT Rules must be written in a document that conforms to the Web Content Accessibility Guidelines [WCAG] or a comparable accessibility standard.
- **4. ACT Rule Structure.** If any test case contains accessibility issues listed in WCAG 2.1 Section 5.2.5 Non-Interference , users must be warned of this in advance.
- **4.1. Rule Identifier.** This identifier must be unique when the rule is part of a ruleset.
- **4.1. Rule Identifier.** Example of identifiers that are also used as filenames; They include a technology directory, followed by a handle that includes an element name or attribute: html+svg/video-alternative html+svg/meta-no-refresh html+svg/unique-id In addition to the identifier, each new release of an ACT Rule must be versioned with either a date or a number.
- **4.1. Rule Identifier.** A reference to the previous version of that rule must be available.
- **4.1. Rule Identifier.** The identifier must not be changed when the rule is updated.
