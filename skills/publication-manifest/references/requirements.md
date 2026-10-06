# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Publication Manifest

Source: https://www.w3.org/TR/pub-manifest/

This specification defines a general manifest format for expressing information about a digital publication. It uses [ schema.org ] metadata augmented to include various structural properties about publications, serialized in [ json-ld11 ], to enable interoperability between publishing formats while accommodating variances in the information that needs to be expressed.

- **1.3 JSON-LD Authoring and.** This means that the manifest SHOULD be expressed using only the syntactic constructions defined in this specification, as opposed to all the possibilities offered by the JSON-LD syntax.
- **3. Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , REQUIRED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **4.1 Requirements.** The following properties MUST be set in the manifest: context conformsTo The following properties are RECOMMENDED : type id The priority of all other properties and resource relations is OPTIONAL , but MAY be modified by implementations of the manifest format.
- **4.2.1 Literals.** When a manifest property expects a literal text string — one that is not language-dependent, such as a code value or date — as its value, the value MUST be expressed as a [ json ] string .
- **4.2.2 Numbers.** When a manifest property expects a number as its value, the value MUST be expressed as a [ json ] number .
- **4.2.3 Booleans.** When a manifest property expects a boolean as its value, the value MUST be expressed as an [ ecmascript ] Boolean value ( true or false ).
- **4.2.4.1 Localizable Strings.** When a manifest property expects a localizable text string as its value, the value MUST be expressed as one of: a [ json ] string value; or a LocalizableString .
- **4.2.4.2 Entities.** When a manifest property expects an entity (i.e., an individual or organization responsible for the various aspects of creation), its value MUST be expressed either as: a [ json ] string value; or an Entity .

## Audiobooks

Source: https://www.w3.org/TR/audiobooks/

This specification describes the requirements for the creation of audiobooks, using a profile of the Publication Manifest specification.

- **3. Conformance.** The key words MAY , MUST , MUST NOT , RECOMMENDED , REQUIRED , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **4.1 Primary Entry Page.** The primary entry page MUST include either a link to the manifest or embed the manifest [ pub-manifest ].
- **4.1 Primary Entry Page.** It also SHOULD contain the table of contents .
- **4.1 Primary Entry Page.** An Audiobook MUST include a primary entry page except when packaging allows alternative discovery of the manifest.
- **4.1 Primary Entry Page.** When present, the page MUST be included in the resource list .
- **4.2 Table of Contents.** This element MUST be identified by the role attribute [ html ] value "doc-toc" [ dpub-aria-1.0 ].
- **4.2 Table of Contents.** If the table of contents is located in the primary entry page , the table of contents MUST be the first element in the document — in document tree order [ dom ] — with that role value.
- **4.2 Table of Contents.** Otherwise, the manifest SHOULD identify the resource that contains the structure.
