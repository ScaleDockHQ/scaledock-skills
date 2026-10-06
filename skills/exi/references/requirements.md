# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Efficient XML Interchange (EXI) Format 1.0 (Second Edition)

Source: https://www.w3.org/TR/exi/

This document is the specification of the Efficient XML Interchange (EXI) format. EXI is a very compact representation for the Extensible Markup Language (XML) Information Set that is intended to simultaneously optimize performance and the utilization of computational resources. The EXI format uses a hybrid approach drawn from the information and formal language theories, plus practical techniques verified by measurements, for entropy encoding XML information. Using a relatively simple algorithm, which is amenable to fast and compact implementation, and a small set of datatype representations, it reliably produces efficient encodings of XML event streams. The grammar production system and fo

- **1.2 Notational Conventions and Terminology.** The key words MUST, MUST NOT, REQUIRED, SHALL, SHALL NOT, SHOULD, SHOULD NOT, RECOMMENDED, MAY, and OPTIONAL, when they appear EMPHASIZED in this document, are to be interpreted as described in RFC 2119 [IETF RFC 2119] .
- **4. EXI Streams.** The uri of a NS event with its local-element-ns flag set to true MUST match the uri of the associated SE event.
- **4. EXI Streams.** As prescribed by Table B-2 and Table B-11 , [namespace attributes] representing namespace declarations are mapped to NS events and SHOULD NOT be represented by AT events.
- **4. EXI Streams.** This also implies that the following AT events SHOULD NOT occur in EXI streams: (1) AT events with qname whose uri is "http://www.w3.org/2000/xmlns/"; (2) AT events with qname which has empty uri ("") and local name either of the form "xmlns" or "xmlns:_", where "_" represents a string with 0 or more characters.
- **5.2 Distinguishing Bits.** 1 0 Unlike the optional EXI cookie that MAY occur to precede this field, the presence of Distinguishing Bits is REQUIRED in the EXI header.
- **5.3 EXI Format Version.** An EXI processor that implements a final version of the EXI format specification is REQUIRED to process EXI streams that have a version field with its first bit set to 0 followed by a version number that corresponds to the version of the EXI specification the processor implements.
- **5.3 EXI Format Version.** EXI processors conforming with the final version of this specification MUST use the 5-bit value 0 0000 as the version number.
- **5.4 EXI Options.** When EXI Options are present in the header, an EXI Processor MUST observe the specified options to process the EXI stream that follows.

## Efficient XML Interchange (EXI) Profile for limiting usage of dynamic memory

Source: https://www.w3.org/TR/exi-profile/

This document describes a set of parameters that can be used to define profiles of the EXI 1.0 format suited to applications involving devices with dynamic memory constraints.

- **3.1 Grammar Learning Disabling Mechanism.** If an element E already has an xsi:type attribute and grammar learning is disabled for the grammar representing the element E, the xsi:type attribute value MUST refer to a known schema-informed grammar that can represent the given element.
- **3.1 Grammar Learning Disabling Mechanism.** The xsi:type attribute event MUST always be represented by the AT(*) production whose event code length is 2.
- **3.1 Grammar Learning Disabling Mechanism.** Even in the case where no production will be inserted in grammar G, implementations MUST behave as if grammar G is instantiated.
- **3.1 Grammar Learning Disabling Mechanism.** As the cost of this second mechanism is generally higher than the first mechanism, this second mechanism SHOULD only be used if the first mechanism cannot be used.
- **3.2 Grammar Learning Disabling Parameters.** Whenever the parameters are set, the rules above MUST be properly applied.
- **6.2 EXI Profile Processor Conformance.** On the other hand, a fully conforming EXI profile stream decoder MUST support any EXI parameter set.
- **6.2 EXI Profile Processor Conformance.** A partially conforming EXI profile stream encoder and/or a partially conforming EXI profile stream decoder , in turn, MUST support at least one EXI parameter set.
- **2. Outline.** Some mechanisms to lower the memory usage are already available in the EXI 1.0 specification and should be considered in conjunction with the EXI profile (see B Guidelines ).

## Canonical EXI

Source: https://www.w3.org/TR/exi-c14n/

within an application context, but which vary in physical representation based on

- **document.** 1.1 Notational Conventions and Terminology The key words MUST, MUST NOT, REQUIRED, SHALL, SHALL NOT, SHOULD, SHOULD NOT, RECOMMENDED, MAY, and OPTIONAL, when they appear EMPHASIZED in this document, are to be interpreted as described in RFC 2119 [IETF RFC 2119] .
- **document.** The EXI header has the following structure: [ EXI Cookie ] Distinguishing Bits Presence Bit for EXI Options EXI Format Version [EXI Options] [Padding Bits] A Canonical EXI Header MUST NOT begin with the optional EXI Cookie, and padding bits (if any) MUST always be represented as a sequence of 0 (zero) bits.
- **document.** If the Canonical EXI Option omitOptionsDocument is equal to true the Presence Bit for EXI Options MUST be 0 (false) to indicate that the fifth part of the EXI Header, the EXI Options, is absent.
- **document.** If the Canonical EXI Option omitOptionsDocument is equal to false , the Presence Bit for the EXI Options MUST be 1 (true) to indicate the EXI Options are present.
- **document.** That said, the subsequently described canonicalization steps expect as input a set of EXI Options (or respectively an EXI options document) and produce as output a canonicalized set of EXI options that MUST be represented as 4.
- **document.** A canonical EXI Options document MUST respect the following constraints.
- **document.** An EXI Options element blockSize that matches the default value (i.e., <blockSize>1000000</blockSize>) MUST be omitted.
- **document.** The element blockSize MUST be omitted if neither compression nor pre-compress is present.
