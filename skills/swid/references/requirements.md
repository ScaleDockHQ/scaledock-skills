# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative guidelines from NIST IR 8060, which uses RFC 2119 key words in upper case, quoted as written (only line breaks and hyphenation from PDF layout were joined). Guidelines marked [Auth] in the report apply to authoritative tag creators and [Non-Auth] to non-authoritative ones. Apply the ones that match the role. Each is labelled with its guideline identifier (GEN general, COR corpus, PRI primary, PAT patch, SUP supplemental).

## NIST IR 8060 guidelines

Source: https://nvlpubs.nist.gov/nistpubs/ir/2016/NIST.IR.8060.pdf

- **GEN-1.** When producing SWID tags, tag creators MUST produce SWID tags that conform to all requirements defined in the ISO/IEC 19770-2:2015 specification.
- **GEN-2.** The `<SoftwareIdentity>` element MUST specify an @xml:lang attribute with a non-blank value to indicate the default human language used for expressing all language-dependent attribute values.
- **GEN-4.** Every `<Entity>` element MUST provide an explicit (i.e., non-default) @regid attribute value.
- **GEN-7.** All `<Entity>` elements that provide the same @regid attribute value MUST provide the same @role attribute values.
- **GEN-9.** Authoritative tag creators MUST provide an `<Entity>` element where the @role attribute contains the value "softwareCreator".
- **GEN-13.** Any XPath query used within a `<Link>` @href element MUST be designed in such a way that it can used by a system to iterate over a set of SWID tags and identify matching tags by applying the XPath query to each tag and checking for a non-empty result.
- **GEN-14.** Every `<File>` element provided within a `<Payload>` or `<Evidence>` element MUST include a value for the @size attribute that specifies the size of the file in bytes.
- **GEN-16.** Every `<File>` element within a `<Payload>` element MUST include a hash value.
- **GEN-19.** Whenever a `<Payload>` element is included in a tag, every `<File>` element contained therein MUST provide a hash value based on the SHA-256 hash function.
- **GEN-26.** When it is necessary to update a tag to correct errors in or add data elements to that tag, the tag's `<SoftwareIdentity>` @tagVersion attribute MUST be changed.
- **COR-1.** If the value of the `<SoftwareIdentity>` @corpus attribute is set to "true", then the values of @patch and @supplemental MUST be set to "false".
- **COR-4.** A corpus tag MUST contain a `<Payload>` element that enumerates every file that is included in the tagged installation media.
- **PRI-1.** To indicate that a tag is a primary tag, the `<SoftwareIdentity>` @corpus, @patch, and @supplemental attributes MUST be set to "false".
- **PRI-2.** If a software product has been assigned a version by the software provider, that version MUST be specified in the `<SoftwareIdentity>` @version attribute of the product's primary tag.
- **PRI-3.** If a primary tag contains a value for the `<SoftwareIdentity>` @version attribute, it MUST also contain a value for the `<SoftwareIdentity>` @versionScheme attribute which accurately reflects the versioning scheme used in the @version attribute.
- **PRI-9.** If a `<Payload>` element is provided, it MUST list every machine instruction file comprising the product described by the tag.
- **PAT-1.** If the value of the `<SoftwareIdentity>` @patch attribute is set to "true", then the values of @corpus and @supplemental MUST be set to "false".
- **SUP-2.** A supplemental tag MUST contain a `<Link>` element to associate itself with the individual tag that it supplements.
- **SUP-2.** The @rel attribute of this `<Link>` element MUST be set to "supplemental".
- **SUP-3.** If a supplemental tag provides a data value that conflicts with corresponding data values in the tag being supplemented, the data value in the supplemented tag MUST be considered to be the correct value.
