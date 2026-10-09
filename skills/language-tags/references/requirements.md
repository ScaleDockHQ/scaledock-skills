# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 5646 Tags for Identifying Languages

Source: https://www.rfc-editor.org/rfc/rfc5646.html

- **RFC 5646 § 2.1.1.** At all times, language tags and their subtags, including private use and extensions, are to be treated as case insensitive: there exist conventions for the capitalization of some of the subtags, but these MUST NOT be taken to carry meaning.
- **RFC 5646 § 2.2.** Sequences of private use and extension subtags MUST occur at the end of the sequence of subtags and MUST NOT be interspersed with subtags defined elsewhere in this document.
- **RFC 5646 § 2.2.3.** There MUST be at most one script subtag in a language tag, and the script subtag SHOULD be omitted when it adds no distinguishing value to the tag or when the primary or extended language subtag's record in the subtag registry includes a 'Suppress-Script' field listing the applicable script subtag.
- **RFC 5646 § 2.2.4.** There MUST be at most one region subtag in a language tag and the region subtag MAY be omitted, as when it adds no distinguishing value to the tag.
- **RFC 5646 § 2.2.5.** Variant subtags MUST be registered with IANA according to the rules in Section 3.5 of this document before being used to form language tags.
- **RFC 5646 § 2.2.5.** The same variant subtag MUST NOT be used more than once within a language tag.
- **RFC 5646 § 2.2.6.** The singleton MUST be one allocated to a registration authority via the mechanism described in Section 3.7 and MUST NOT be the letter 'x', which is reserved for private use subtag sequences.
- **RFC 5646 § 2.2.6.** Each singleton subtag MUST appear at most one time in each tag (other than as a private use subtag).
- **RFC 5646 § 2.2.6.** Each singleton MUST be followed by at least one extension subtag.
- **RFC 5646 § 2.2.7.** Another way of saying this is that all subtags following the singleton 'x' MUST be considered private use.
- **RFC 5646 § 2.2.7.** Private use subtags are NOT RECOMMENDED where alternatives exist or for general interchange.
- **RFC 5646 § 2.2.9.** A tag is considered "well-formed" if it conforms to the ABNF (Section 2.1).
- **RFC 5646 § 2.2.9.** Users MUST NOT assign language tags that use subtags that do not appear in the registry other than in private use sequences (such as the subtag 'personal' in the tag "en-x-personal").
- **RFC 5646 § 3.1.2.** Future versions of this document might add additional fields to the registry; implementations SHOULD ignore fields found in the registry that are not defined in this document.
- **RFC 5646 § 3.1.6.** Although valid in language tags, subtags and tags with a 'Deprecated' field are deprecated, and validating processors SHOULD NOT generate these subtags.
- **RFC 5646 § 4.1.** If a tag or subtag has a 'Preferred-Value' field in its registry entry, then the value of that field SHOULD be used to form the language tag in preference to the tag or subtag in which the preferred value appears.
- **RFC 5646 § 4.4.1.** Protocols or specifications that specify limited buffer sizes for language tags MUST allow for language tags of at least 35 characters.
- **RFC 5646 § 4.4.2.** This means that applications or protocols that truncate tags MUST do so by progressively removing subtags along with their preceding "-" from the right side of the language tag until the tag is short enough for the given buffer.
- **RFC 5646 § 4.5.** Since a particular language tag can be used by many processes, language tags SHOULD always be created or generated in canonical form.
- **RFC 5646 § 4.5.** All comparisons MUST be performed in a case-insensitive manner.
- **RFC 5646 § 6.** To prevent denial-of-service attacks, applications SHOULD NOT depend on either the Language Subtag Registry or the Language Tag Extensions Registry being always accessible.

## RFC 4647 Matching of Language Tags

Source: https://www.rfc-editor.org/rfc/rfc4647.html

- **RFC 4647 § 2.** In a language range, each subtag MUST either be a sequence of ASCII alphanumeric characters or the single character '*' (%x2A, ASTERISK).
- **RFC 4647 § 2.** Matching of language tags to language ranges MUST be done in a case-insensitive manner.
- **RFC 4647 § 3.** Protocols and specifications requiring conformance to this specification MUST clearly indicate the particular mechanism used in selecting or matching language tags.
- **RFC 4647 § 3.4.1.** Each application, protocol, or specification that uses lookup MUST define the defaulting behavior when no tag matches the language priority list.
