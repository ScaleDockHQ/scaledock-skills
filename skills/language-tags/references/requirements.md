# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 5646 Tags for Identifying Languages

Source: https://www.rfc-editor.org/rfc/rfc5646.html

- **document.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** Formatting of Language Tags At all times, language tags and their subtags, including private use and extensions, are to be treated as case insensitive: there exist conventions for the capitalization of some of the subtags, but these MUST NOT be taken to carry meaning.
- **document.** Implementers SHOULD specify a locale-neutral casing operation to ensure that case folding of subtags does not produce this value, which is illegal in language tags.
- **document.** Sequences of private use and extension subtags MUST occur at the end of the sequence of subtags and MUST NOT be interspersed with subtags defined elsewhere in this document.
- **document.** Future registrations of this type are discouraged: an attempt to register any new proposed primary language MUST be made to the ISO 639 registration authority.
- **document.** Other values MUST NOT be assigned to the primary subtag except by revision or update of this document.
- **document.** In order to avoid instability in the canonical form of tags, if a two-character code is added to ISO 639-1 for a language for which a three-character code was already included in either ISO 639-2 or ISO 639-3, the two-character code MUST NOT be registered.
- **document.** Extended language subtag records MUST include exactly one 'Prefix' field indicating an appropriate subtag or sequence of subtags for that extended language subtag.

## RFC 4647 Matching of Language Tags

Source: https://www.rfc-editor.org/rfc/rfc4647.html

- **document.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** In a language range, each subtag MUST either be a sequence of ASCII alphanumeric characters or the single character '*' (%x2A, ASTERISK).
- **document.** Language tags and thus language ranges are to be treated as case- insensitive: there exist conventions for the capitalization of some of the subtags, but these MUST NOT be taken to carry meaning.
- **document.** Matching of language tags to language ranges MUST be done in a case- insensitive manner.
- **document.** Protocols and specifications requiring conformance to this specification MUST clearly indicate the particular mechanism used in selecting or matching language tags.
- **document.** When specifying a protocol operation using matching, the protocol MUST specify: o Which type(s) of language tag matching it uses o Whether the operation returns a single result (lookup) or a possibly empty set of results (filtering) o For lookup, what the default item is (or the sequence of operations or configuration information used to determine the default) when no matching tag is found.
- **document.** Applications, protocols, or specifications that canonicalize ranges MUST either perform matching operations with both the canonical and original (unmodified) form of the range or MUST also canonicalize each tag for the purposes of comparison.
- **document.** An application, protocol, or specification MUST choose to a) map extended language ranges to basic ranges using the algorithm below, b) reject any extended language ranges in the language priority list that are not valid basic language ranges, or c) treat each extended language range as if it were a basic language range, which will have the same result as ignoring them, since these ranges will…
