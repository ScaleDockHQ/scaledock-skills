# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## ODRL Information Model 2.2

Source: https://www.w3.org/TR/odrl-model/

The Open Digital Rights Language (ODRL) is a policy expression language that provides a flexible and interoperable information model, vocabulary, and encoding mechanisms for representing statements about the usage of content and services. The ODRL Information Model describes the underlying concepts, entities, and relationships that form the foundational basis for the semantics of the ODRL policies. Policies are used to represent permitted and prohibited actions over a certain asset, as well as the obligations required to be meet by stakeholders. In addition, policies may be limited by constraints (e.g., temporal or spatial constraints) and duties (e.g. payments) may be imposed on permissions

- **1.2 Conformance.** The key words MAY , MUST , MUST NOT , RECOMMENDED , SHOULD , and SHOULD NOT are to be interpreted as described in [ RFC2119 ].
- **2. ODRL Information Model.** The Permission MAY also have the duty property that expresses an agreed Action that MUST be exercised (as a pre-condition to be granted the Permission).
- **2.1 Policy Class.** The Policy class has the following properties: A Policy MUST have one uid property value (of type IRI [ rfc3987 ]) to identify the Policy.
- **2.1 Policy Class.** A Policy MUST have at least one permission , prohibition , or obligation property values of type Rule.
- **2.1 Policy Class.** In the latter case, the profile property MUST be used to indicate the IRIs of the ODRL Profile(s).
- **2.1 Policy Class.** (The Examples in this document will use ODRL Profile identifiers for illustrative purposes only.) An ODRL Policy MAY be subclassed to more precisely describe the context of use of the Policy that MAY include additional constraints that ODRL processors MUST understand.
- **2.1 Policy Class.** A Policy class MUST be disjoint will all Policy subclasses (except for Set).
- **2.1.2 Offer Class.** An ODRL Policy of subclass Offer : MUST have one assigner property value (of type Party) to indicate the functional role in the same Rules.

## ODRL Vocabulary & Expression 2.2

Source: https://www.w3.org/TR/odrl-vocab/

The Open Digital Rights Language (ODRL) is a policy expression language that provides a flexible and interoperable information model, vocabulary, and encoding mechanisms for representing statements about the usage of content and services. The ODRL Vocabulary and Expression describes the terms used in ODRL policies and how to encode them.

- **2. Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , REQUIRED , and SHOULD are to be interpreted as described in [ RFC2119 ].
- **3.2.1 Agreement.** Label: Agreement Identifier: http://www.w3.org/ns/odrl/2/Agreement Note: An Agreement Policy MUST contain at least one Permission or Prohibition rule, a Party with Assigner function, and a Party with Assignee function (in the same Permission or Prohibition).
- **3.2.2 Offer.** Label: Offer Identifier: http://www.w3.org/ns/odrl/2/Offer Note: An Offer Policy MUST contain at least one Permission or Prohibition rule and a Party with Assigner function (in the same Permission or Prohibition).
- **3.2.2 Offer.** The Offer Policy MAY contain a Party with Assignee function, but MUST not grant any privileges to that Party.
- **3.2.3 Set.** Label: Set Identifier: http://www.w3.org/ns/odrl/2/Set Note: A Set Policy MUST contain a target Asset, and at least one Rule.
- **3.5.2 Target Policy.** Label: Target Policy Identifier: http://www.w3.org/ns/odrl/2/hasPolicy Note: The Asset being identified MUST be inferred to be the target Asset of all of the Rules of the Policy.
- **3.7.3 Assignee Of.** Label: Assignee Of Identifier: http://www.w3.org/ns/odrl/2/assigneeOf Note: When assigneeOf has been asserted between a metadata expression and an ODRL Policy, the Party being identified MUST be inferred to undertake the assignee functional role of all the Rules of that Policy.
- **3.7.4 Assigner Of.** Label: Assigner Of Identifier: http://www.w3.org/ns/odrl/2/assignerOf Note: When assignerOf has been asserted between a metadata expression and an ODRL Policy, the Party being identified MUST be inferred to undertake the assigner functional role of all the Rules of that Policy.
