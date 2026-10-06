# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## State Chart XML (SCXML): State Machine Notation for Control Abstraction

Source: https://www.w3.org/TR/scxml/

This document describes SCXML, or the "State Chart extensible Markup Language". SCXML provides a generic state-machine based execution environment based on CCXML and Harel State Tables.

- **1 Terminology.** The key words MUST , MUST NOT , REQUIRED , SHALL , SHALL NOT , SHOULD , SHOULD NOT , RECOMMENDED , MAY , and OPTIONAL in this specification are to be interpreted as described in [RFC 2119] .
- **3.2.1 Attribute.** xmlns true none URI none The value MUST be "http://www.w3.org/2005/07/scxml".
- **3.2.1 Attribute.** version true none decimal none The value MUST be "1.0" datamodel false none NMTOKEN platform-specific "null", "ecmascript", "xpath" or other platform-defined values.
- **3.2.2 Children.** The SCXML processor MUST terminate processing when the state machine reaches this state.
- **3.2.2 Children.** 5.8 <script> A conformant SCXML document MUST have at least one <state>, <parallel> or <final> child.
- **3.2.2 Children.** At system initialization time, the SCXML Processor MUST enter the states specified by the 'initial' attribute, if it is present.
- **3.2.2 Children.** If it is not present, the Processor MUST enter the first state in document order.
- **3.2.2 Children.** Platforms SHOULD document their default data model.
