# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Data Catalog Vocabulary (DCAT) - Version 3

Source: https://www.w3.org/TR/vocab-dcat-3/

DCAT is an RDF vocabulary designed to facilitate interoperability between data catalogs published on the Web. This document defines the schema and provides examples for its use. DCAT enables a publisher to describe datasets and data services in a catalog using a standard model and vocabulary that facilitates the consumption and aggregation of metadata from multiple catalogs. This can increase the discoverability of datasets and data services. It also makes it possible to have a decentralized approach to publishing data catalogs and makes federated search for datasets across catalogs in multiple sites possible using the same query mechanism and structure. Aggregated DCAT metadata can serve as

- **4. Conformance.** The key words MAY , MUST , MUST NOT , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **6.2.2 Element definitions.** The definitions (including domain and range) of terms outside the DCAT namespace are provided here only for convenience and MUST NOT be considered normative.
- **6.3.1 Property: homepage.** Range: foaf:Document Usage note: foaf:homepage is an inverse functional property (IFP) which means that it MUST be unique and precisely identify the Web-page for the resource.
- **6.4 Class: Cataloged Resource.** The instances of this class SHOULD be included in a catalog.
- **6.4.2 Property: conforms to.** Range: dcterms:Standard ("A basis for comparison; a reference point against which other things can be evaluated." [ DCTERMS ]) Usage note: This property SHOULD be used to indicate the model, schema, ontology, view or profile that the cataloged resource content conforms to.
- **6.4.7 Property: release date.** Usage note: This property SHOULD be set using the first known date of issuance.
- **6.4.9 Property: language.** This refers to the natural language used for textual metadata (i.e., titles, descriptions, etc.) of a cataloged resource (i.e., dataset or service) or the textual values of a dataset distribution Range: dcterms:LinguisticSystem Resources defined by the Library of Congress ( ISO 639-1 , ISO 639-2 ) SHOULD be used.
- **6.4.9 Property: language.** If a ISO 639-1 (two-letter) code is defined for language, then its corresponding IRI SHOULD be used; if no ISO 639-1 code is defined, then IRI corresponding to the ISO 639-2 (three-letter) code SHOULD be used.
