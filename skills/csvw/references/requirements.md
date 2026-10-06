# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Model for Tabular Data and Metadata on the Web

Source: https://www.w3.org/TR/tabular-data-model/

Tabular data is routinely transferred on the web in a variety of formats, including variants on CSV, tab-delimited files, fixed field formats, spreadsheets, HTML tables, and SQL dumps. This document outlines a data model, or infoset, for tabular data and metadata about that tabular data that can be used as a basis for validation, display, or creating other formats. It also contains some non-normative guidance for publishing tabular data as CSV and how that maps into the tabular data model. An annotated model of tabular data can be supplemented by separate metadata about the table. This specification defines how implementations should locate that metadata, given a file containing tabular data

- **2. Conformance.** The key words MAY , MUST , MUST NOT , SHOULD , and SHOULD NOT are to be interpreted as described in [ RFC2119 ].
- **4. Tabular Data Models.** String values within the tabular data model (such as column titles or cell string values) MUST contain only Unicode characters.
- **4.1 Table groups.** A group of tables MUST have one or more tables.
- **4.2 Tables.** A table MUST have one or more columns and the order of the columns within the list is significant and MUST be preserved by applications.
- **4.2 Tables.** A table MUST have one or more rows and the order of the rows within the list is significant and MUST be preserved by applications.
- **4.3 Columns.** A column MUST contain one cell from each row in the table.
- **4.3 Columns.** The order of the cells in the list MUST match the order of the rows in which they appear within the rows for the associated table .
- **4.3 Columns.** required — a boolean that indicates that values of cells in this column MUST NOT be empty.

## Metadata Vocabulary for Tabular Data

Source: https://www.w3.org/TR/tabular-metadata/

Validation, conversion, display, and search of tabular data on the web requires additional metadata that describes how the data should be interpreted. This document defines a vocabulary for metadata that annotates tabular data. This can be used to provide metadata at various levels, from groups of tables and how they relate to each other down to individual cells within a table. The metadata defined in this specification is used to provide annotations on an annotated table or group of tables , as defined in [ tabular-data-model ]. Annotated tables form the basis for all further processing, such as validating, converting, or displaying the tables.

- **2. Conformance.** The key words MAY , MUST , MUST NOT , SHOULD , and SHOULD NOT are to be interpreted as described in [ RFC2119 ].
- **2. Conformance.** All applications that conform to this specification (including validators and applications that read or convert tabular data) MUST read the JSON-based format described in this document.
- **2. Conformance.** Tabular data MUST conform to the description from [ tabular-data-model ].
- **2. Conformance.** In particular note that each row MUST contain the same number of cells (although some of these cells may be empty).
- **4. Annotating Tables.** All compliant applications MUST create annotated tables based on the algorithm defined here.
- **4. Annotating Tables.** All compliant applications MUST generate errors and stop processing if a metadata document: does not use valid JSON syntax defined by [ RFC7159 ].
- **4. Annotating Tables.** Compliant applications MUST ignore properties (aside from common properties ) which are not defined in this specification and MUST generate a warning when they are encoutered.
- **4. Annotating Tables.** If a property has a value that is not permitted by this specification, then if a default value is provided for that property, compliant applications MUST generate a warning and use that default value.

## Generating JSON from Tabular Data on the Web

Source: https://www.w3.org/TR/csv2json/

This document defines the procedures and rules to be applied when converting tabular data into JSON. Tabular data may be complemented with metadata annotations that describe its structure, the meaning of its content and how it may form part of a collection of interrelated tabular data. This document specifies the effect of this metadata on the resulting JSON.

- **1. Introduction.** This document describes the processing of tabular data to create a set of nested objects that MUST be serialized as JSON [ RFC7159 ].
- **1. Introduction.** Conversion applications MUST provide at least two modes of operation: standard and minimal .
- **2. Conformance.** The key words MAY , MUST , and SHOULD are to be interpreted as described in [ RFC2119 ].
- **2. Conformance.** Tabular data MUST conform to the description from [ tabular-data-model ].
- **2. Conformance.** In particular note that each row MUST contain the same number of cells (although some of these cells may be empty).
- **4.2 Generating JSON.** A conformant JSON conversion application MUST produce output conforming to this algorithm according to the chosen mode of conversion: standard or minimal .
- **4.2 Generating JSON.** The [ tabular-data-model ] specifies that string values within tabular data (such as column titles or cell string values ) MUST contain only Unicode characters.
- **4.3 Generating Objects.** Else, if the cell value is a list that is not empty, then the cell value provides a sequence of values for inclusion within the JSON output; insert an array A v containing each value V of the sequence into object S i : name N value A v Each of the values V derived from the sequence MUST be expressed in the JSON output according to the datatype of V as defined below in section 4.5 Interpreting datatypes .

## Generating RDF from Tabular Data on the Web

Source: https://www.w3.org/TR/csv2rdf/

This document defines the procedures and rules to be applied when converting tabular data into RDF. Tabular data may be complemented with metadata annotations that describe its structure, the meaning of its content and how it may form part of a collection of interrelated tabular data. This document specifies the effect of this metadata on the resulting RDF.

- **1. Introduction.** Conversion applications MUST provide at least two modes of operation: standard and minimal .
- **1. Introduction.** Downstream applications SHOULD be aware of the potential for inconsistencies and take appropriate action.
- **2. Conformance.** The key words MAY , MUST , and SHOULD are to be interpreted as described in [ RFC2119 ].
- **2. Conformance.** Tabular data MUST conform to the description from [ tabular-data-model ].
- **2. Conformance.** In particular note that each row MUST contain the same number of cells (although some of these cells may be empty).
- **4.2 Generating RDF.** A conformant RDF conversion application MUST emit triples conforming to those described in this algorithm according to the chosen mode of conversion: standard or minimal .
- **4.2 Generating RDF.** The [ tabular-data-model ] specifies that string values within tabular data (such as column titles or cell string values ) MUST contain only Unicode characters.
- **4.2 Generating RDF.** If the group of tables has an identifier then node G MUST be identified accordingly; else if identifier is null , then node G MUST be a new blank node .
