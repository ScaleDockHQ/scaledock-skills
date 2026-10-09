# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks were joined). Apply the ones that match the role. Each is labelled with the section it comes from in the published document.

## ODRL Information Model 2.2

Source: https://www.w3.org/TR/odrl-model/

- **§ 2.1.** A Policy MUST have one uid property value (of type IRI [rfc3987]) to identify the Policy.
- **§ 2.1.** A Policy MUST have at least one permission, prohibition, or obligation property values of type Rule.
- **§ 2.1.2.** MUST have one assigner property value (of type Party) to indicate the functional role in the same Rules.
- **§ 2.1.3.** MUST have one assignee property value (of type Party) to indicate the functional role in the same Rules.
- **§ 2.4.** Action terms MUST be defined using the includedIn property referring to an encompassing Action and either use or transfer as the top-level parent term by transitive means.
- **§ 2.5.** When multiple Constraints apply to the same Rule, Action, Party/Asset Collection, then they are interpreted as conjunction and all MUST be satisfied.
- **§ 2.5.1.** A Constraint MUST have one leftOperand property value of type LeftOperand.
- **§ 2.5.1.** A Constraint MUST have one operator property value of type Operator.
- **§ 2.5.1.** Only one of rightOperand or rightOperandReference MUST appear in the Constraint.
- **§ 2.5.2.** The operand MUST only be of the sub-properties; or, xone, and, andSequence.
- **§ 2.5.2.** When using a logical operand that needs to be evaluated in sequence, such as andSequence, the serialisations MUST preserve the order of the members of the list.
- **§ 2.5.5.** Note that when using the refinement property, the uid property MUST NOT be used to identify the AssetCollection.
- **§ 2.6.** A Rule MUST have one action property value of type Action.
- **§ 2.6.1.** A Permission MUST have one target property value of type Asset.
- **§ 2.6.2.** A Prohibition MUST have one target property value of type Asset.
- **§ 2.6.3.** Note that the consequence property MUST NOT be used on a Duty that is already a consequence for a Permission duty or Policy obligation.
- **§ 2.6.7.** A remedy MUST NOT refer to a Duty that includes a consequence Duty.
- **§ 2.7.1.** These shared properties MUST NOT be interpreted as Policy-level properties (such as those defined in the Policy Class section).
- **§ 2.8.** If a Policy has the dc:isReplacedBy property, then a processor MUST consider the first Policy void and MUST retrieve and process the identified Policy.
- **§ 2.10.** If a Policy has multiple conflict property values (for example, after a Policy merge or inheritance) and there are conflicting Rules then the entire Policy MUST be void.
- **§ 3.2.** If the ODRL Processing system does not recognise the ODRL Profile identifier(s) then it MUST stop processing the policy.

## ODRL Vocabulary & Expression 2.2

Source: https://www.w3.org/TR/odrl-vocab/

- **§ 3.2.1.** An Agreement Policy MUST contain at least one Permission or Prohibition rule, a Party with Assigner function, and a Party with Assignee function (in the same Permission or Prohibition).
- **§ 3.2.2.** The Offer Policy MAY contain a Party with Assignee function, but MUST not grant any privileges to that Party.
- **§ 3.2.3.** A Set Policy MUST contain a target Asset, and at least one Rule.
- **§ 5.** Implementations of ODRL expressions must be serialised using the UTF-8 character encoding.
