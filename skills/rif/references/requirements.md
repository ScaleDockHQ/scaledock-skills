# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RIF Core Dialect (Second Edition)

Source: https://www.w3.org/TR/rif-core/

This document, developed by the Rule Interchange Format (RIF) Working Group , specifies RIF-Core, a common subset of RIF-BLD and RIF-PRD based on RIF-DTB 1.0. The RIF-Core presentation syntax and semantics are specified by restriction in two different ways. First, RIF-Core is specified by restricting the syntax and semantics of RIF-BLD, and second, by restricting RIF-PRD. The XML serialization syntax of RIF-Core is specified by a mapping from the presentation syntax. A normative XML schema is also provided.

- **11 Appendix: RIF Media Type Registration.** RIF consuming systems SHOULD implement reasonable defenses against these attacks.
- **1 Overview.** However, it should be kept in mind that RIF is designed to enable interoperability among rule languages in general, and its uses are not limited to the Web.
- **2.4 Annotations and Documents.** The frame formulas that are allowed as part of an annotation must be syntactically correct for RIF-Core.
- **7 Conformance Clauses.** A conformant Core consumer must reject any document containing features it does not support.
- **11 Appendix: RIF Media Type Registration.** Before being installed on systems which consume untrusted RIF documents, these external functions should be closely reviewed for their own vulnerabilities and for the vulnerabilities that may occur when they are used in unexpected combinations, like "cross-site scripting" attacks.

## RIF Basic Logic Dialect (Second Edition)

Source: https://www.w3.org/TR/rif-bld/

This document, developed by the Rule Interchange Format (RIF) Working Group , specifies the Basic Logic Dialect, RIF-BLD, a format that allows logic rules to be exchanged between rule systems. The RIF-BLD presentation syntax and semantics are specified both directly and as specializations of the RIF Framework for Logic Dialects , or RIF-FLD. The XML serialization syntax of RIF-BLD is specified via a mapping from the presentation syntax. A normative XML schema is also provided.

- **4.1 XML for the Condition Language.** A compliant implementation MUST ignore the xml:lang attribute if the type of the Const is not rdf:plainLiteral .
- **1 Overview.** However, it should be kept in mind that RIF is designed to enable interoperability among rule languages in general, and its uses are not limited to the Web.
- **1 Overview.** Intuitively, the fact Mary buys LeRif from John should be logically derivable from the above premises.
- **1 Overview.** Whenever a RIF-BLD document falls into the Core subset or can be translated to it, the document should be produced in RIF-Core to allow its interchange with a maximum number of RIF consumers.
- **2.1 Alphabet of RIF-BLD.** The argument names in ArgNames are written as Unicode strings that must not start with a question mark, " ?
- **2.3 Formulas.** The Base directive, if present, must be first, followed by any number of Prefix directives, followed by any number of Import directives.
- **2.5 Well-formed Formulas.** if &phi; is a document formula and &Delta;' 1 , ..., &Delta;' k are all of its imported documents, then every non- rif:local constant symbol mentioned in &phi; or any of the imported &Delta;' i s must occur in exactly one context (in all of the &Delta;' i s).
- **2.5 Well-formed Formulas.** whenever a formula contains a term or a subformula of the form External(t) , t must be an instantiation of a schema in the coherent set of external schemas (Section Schemas for Externally Defined Terms of [ RIF-DTB ]) associated with the language of RIF-BLD .

## RIF Production Rule Dialect (Second Edition)

Source: https://www.w3.org/TR/rif-prd/

This document, developed by the Rule Interchange Format (RIF) Working Group , specifies the production rule dialect of the W3C rule interchange format (RIF-PRD), a standard XML serialization format for production rule languages.

- **6 Built-in functions, predicates and actions.** However, their formal semantics is trivial: action built-ins behave like predicates that are always true, since action built-ins, in RIF-PRD, MUST NOT affect the semantics of the rules.
- **6.1.1 act:print.** Side effects: The value of the argument MUST be printed to an output stream, to be determined by the user implementation.
- **7.2 Conformance Clauses.** ☐ In addition, conformant RIF-PRD producers and consumers SHOULD preserve annotations.
- **7.3 Interoperability.** To maximize interoperability with RIF-Core and its non-RIF-PRD extensions, a conformant RIF-PRD consumer SHOULD produce valid [ RIF-Core ] documents whenever possible.
- **7.3 Interoperability.** Specifically, a conformant RIF-PRD producer SHOULD use only valid [ RIF-Core ] XML syntax to serialize a rule set that satisfies all of the following: the conflict resolution strategy is effectively equivalent to the stratagy that RIF-PRD identifies by the IRI rif:forwardChaining , no condition formula contains a negation, in any rule in the rule set, no rule in the rule set has an action block…
- **8.3.1.1 Const.** A compliant implementation MUST ignore the xml:lang attribute if the type of the Const is not rdf:plainLiteral .
- **8.3.1.3 List.** The order of the sub-elements is significant and MUST be preserved.
- **8.3.1.4 External.** The order of the args sub-elements is, therefore, significant and MUST be preserved.
