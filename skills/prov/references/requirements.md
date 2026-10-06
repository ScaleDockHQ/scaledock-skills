# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## PROV-DM: The PROV Data Model

Source: https://www.w3.org/TR/prov-dm/

Provenance is information about entities, activities, and people involved in producing a piece of data or thing, which can be used to form assessments about its quality, reliability or trustworthiness. PROV-DM is the conceptual data model that forms a basis for the W3C provenance (PROV) family of specifications. PROV-DM distinguishes core structures, forming the essence of provenance information, from extended structures catering for more specific uses of provenance. PROV-DM is organized in six components, respectively dealing with: (1) entities and activities, and the time at which they were created, used, or ended; (2) derivations of entities from entities; (3) agents bearing responsibilit

- **1.3 Notational Conventions.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this document are to be interpreted as described in [ RFC2119 ].
- **5.1.3 Generation.** While each of id , activity , time , and attributes is OPTIONAL , at least one of them MUST be present.
- **5.1.4 Usage.** While each of id , entity , time , and attributes is OPTIONAL , at least one of them MUST be present.
- **5.1.6 Start.** While each of id , trigger , starter , time , and attributes is OPTIONAL , at least one of them MUST be present.
- **5.1.7 End.** While each of id , trigger , ender , time , and attributes is OPTIONAL , at least one of them MUST be present.
- **5.3.3 Association.** While each of id , agent , plan , and attributes is OPTIONAL , at least one of them MUST be present.
- **5.7.2.1 prov:label.** The value associated with the attribute prov:label MUST be a string.
- **5.7.2.2 prov:location.** The value associated with the attribute prov:location MUST be a PROV-DM Value , expected to denote a location.

## PROV-O: The PROV Ontology

Source: https://www.w3.org/TR/prov-o/

The PROV Ontology (PROV-O) expresses the PROV Data Model [ PROV-DM ] using the OWL2 Web Ontology Language (OWL2) [ OWL2-OVERVIEW ]. It provides a set of classes, properties, and restrictions that can be used to represent and interchange provenance information generated in different systems and under different contexts. It can also be specialized to create new classes and properties to model provenance information for different applications and domains. The PROV Document Overview describes the overall state of PROV, and should be read before other PROV documents. The namespace for all PROV-O terms is http://www.w3.org/ns/prov# . The OWL encoding of the PROV Ontology is available here .

- **Please Send Comments.** An individual who has actual knowledge of a patent which the individual believes contains Essential Claim(s) must disclose the information in accordance with section 6 of the W3C Patent Policy .
- **1.2 Notational Conventions.** The key words " must ", " must not ", " required ", " shall ", " shall not ", " should ", " should not ", " recommended ", " may ", and " optional " in this document are to be interpreted as described in [ RFC2119 ].
- **3.3 Qualified Terms.** prov:Communication , prov:Delegation , prov:End , prov:Revision , etc.) should be used when applicable.
- **3.3 Qualified Terms.** It is correct and acceptable for an implementer to use either qualified or unqualified forms as they choose (or both), and a consuming application should be prepared to recognize either form.
- **3.3 Qualified Terms.** Consuming applications should recognize both qualified and unqualified forms, and treat the qualified form as implying the unqualified form.
- **3.3 Qualified Terms.** Because the qualification form is more verbose, the unqualified form should be favored in cases where additional properties are not provided.
- **4. Cross reference for PROV-O classes and properties.** If the property can be qualified, the can be qualified with header indicates the qualifying property and influence class that should be used.
- **4.1 Starting Point Terms.** The more specific subproperties of prov:wasDerivedFrom (i.e., prov:wasQuotedFrom, prov:wasRevisionOf, prov:hadPrimarySource) should be used when applicable.

## PROV-N: The Provenance Notation

Source: https://www.w3.org/TR/prov-n/

Provenance is information about entities, activities, and people involved in producing a piece of data or thing, which can be used to form assessments about its quality, reliability or trustworthiness. PROV-DM is the conceptual data model that forms a basis for the W3C provenance (PROV) family of specifications. PROV-DM distinguishes core structures, forming the essence of provenance information, from extended structures catering for more specific uses of provenance. PROV-DM is organized in six components, respectively dealing with: (1) entities and activities, and the time at which they were created, used, or ended; (2) derivations of entities from entities; (3) agents bearing responsibilit

- **1.4 Notational Conventions.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this document are to be interpreted as described in [ RFC2119 ].
- **2.5 Identifiers and attributes.** Optional identifiers MUST be separated using a semi-colon ';', but where the identifiers are required, a regular comma ',' MUST be used.
- **3.1.3 Generation.** Note: Even though the production allows for expressions wasGeneratedBy(e2, -, -) and wasGeneratedBy(-; e2, -, -) , these expressions are not valid in PROV-N, since at least one of id , activity , time , and attributes MUST be present.
- **3.2.2 Revision.** Instead, a Revision MUST be expressed as a derivationExpression with attribute prov:type='prov:Revision' .
- **3.2.3 Quotation.** Instead, a Quotation MUST be expressed as a derivationExpression with attribute prov:type='prov:Quotation' .
- **3.2.4 Primary Source.** Instead, a PrimarySource MUST be expressed as a derivationExpression with attribute prov:type='prov:Primary-Source' .
- **3.3.1 Agent.** Instead, a Person, an Organization, or a SoftwareAgent MUST be expressed as an agentExpression with attribute prov:type='prov:Person' , prov:type='prov:Organization' , or prov:type='prov:SoftwareAgent' , respectively.
- **3.3.3 Association.** Instead, a Plan MUST be expressed as an entityExpression with attribute prov:type='prov:Plan' .
