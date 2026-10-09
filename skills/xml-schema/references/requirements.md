# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks were joined; the · marks around defined terms are kept as published). Apply the ones that match the role. Each is labelled with the section it comes from in the published document.

## XSD 1.1 Part 1: Structures

Source: https://www.w3.org/TR/xmlschema11-1/

- **Part 1 § 1.3.2.** Components and source declarations must not specify http://www.w3.org/2000/xmlns/ as their target namespace.
- **Part 1 § 1.5.** Except as otherwise specified, processors must distinguish error-free (conforming) schemas and schema documents used in ·assessment· from those with errors;
- **Part 1 § 1.5.** if a schema used in ·assessment· or a schema document used in constructing a schema is in error, processors must report the fact; if more than one is in error, it is ·implementation-dependent· whether more than one is reported as being in error.
- **Part 1 § 1.5.** Since deprecated features are part of the specification, processors must support them, although some processors may choose to issue warning messages when deprecated features are encountered.
- **Part 1 § 3.2.3.** default and fixed must not both be present.
- **Part 1 § 3.2.6.3.** The {name} of an attribute declaration must not match xmlns.
- **Part 1 § 3.2.6.4.** The {target namespace} of an attribute declaration, whether local or top-level, must not match http://www.w3.org/2001/XMLSchema-instance (unless it is one of the four built-in declarations given in the next section).
- **Part 1 § 3.4.1.** It follows that such abstract types must not be referenced from an xsi:type (§2.7.1) attribute in an instance document.
- **Part 1 § 3.8.6.4.** A content model must not contain two ·element particles· which ·compete· with each other, nor two ·wildcard particles· which ·compete· with each other.
- **Part 1 § 3.10.3.** In addition to the conditions imposed on `<any>` and `<anyAttribute>` element information items by the schema for schema documents, namespace and notNamespace attributes must not both be present.
- **Part 1 § 4.2.1.** The schemaLocation attributes on the `<include>`, `<override>`, and `<redefine>` elements in a schema document, on the other hand, are not hints: conforming processors must attempt to de-reference the schema document named by the attribute.
- **Part 1 § 4.2.1.** For non-empty `<redefine>` elements, it is an error for the attempt to fail; otherwise, the attempt must be made but it is not an error for it to fail.
- **Part 1 § 5.3.** In the case of element information items, processors must fall back to ·lax assessment·.
- **Part 1 § E.1.** An implementation-defined feature or behavior may vary among processors conforming to this specification; the precise behavior is not specified by this specification but must be specified by the implementor for each particular conforming implementation.

## XSD 1.1 Part 2: Datatypes

Source: https://www.w3.org/TR/xmlschema11-2/

- **Part 2 § 2.4.1.** The ·item type· of a list must not itself be a list datatype.
- **Part 2 § 2.4.1.3.** The ·transitive membership· of a ·union· must not contain the ·union· itself, nor any datatype ·derived· or ·constructed· from the ·union·.
- **Part 2 § 2.4.2.** As normatively specified elsewhere, conforming processors must support all the primitive datatypes defined in this specification; it is ·implementation-defined· whether other primitive datatypes are supported.
- **Part 2 § 2.4.3.** A datatype must not be ·derived· from itself.
- **Part 2 § 3.2.1.3.** When a new datatype is defined by ·facet-based restriction·, anySimpleType must not be used as the ·base type·.
- **Part 2 § 3.3.6.1.** The ·seconds· value must not be negative if the ·months· value is positive and must not be positive if the ·months· is negative.
- **Part 2 § 3.3.7.2.** Within a dateTimeLexicalRep, a dayFrag must not begin with the digit '3' or be '29' unless the value to which it would map would satisfy the value constraint on ·day· values
