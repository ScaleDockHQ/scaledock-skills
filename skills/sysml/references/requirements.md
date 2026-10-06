# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences the extractor found (shall or must). Apply the ones that match the role. Section headings are the nearest article, section or clause marker in the published document.

## SysML 2.0 Language

Source: https://www.omg.org/spec/SysML/2.0/Language/PDF

OMG Systems Modeling Language (SysML) Version 2.0, Part 1 Language Specification, document formal/2026-03-02, March 2026. Version 1.7, document formal/24-01-07, January 2024, is the previous published line.

- **2.0.** A SysML model shall conform to this specification only if it can be represented according to the syntactic requirements specified in Clause 8 .
- **9.2.6.** If a connection definition has more than one owned superclassification with other connection definitions, then it must declare a number of owned end features at least equal to the maximum number of end features of any of the general connection definitions.
- **8.2.3.** The compartment shall either be a textual compartment or a graphical compartment.
- **8.3.13.** ownedEndFeature->size() = 2 implies specializesFromLibrary('Interfaces::binaryInterfaces') checkInterfaceUsageSpecialization An InterfaceUsage must directly or indirectly specialize the InterfaceUsage Interfaces::interfaces from the Systems Model Library.
- **text.** owningType.oclIsKindOf(TransitionUsage) validateTransitionFeatureMembershipTriggerAction If the kind of a TransitionUsage is trigger, then its transitionFeature must be a kind of AcceptActionUsage.
- **text.** specializesFromLibrary('Views::renderings') checkRenderingUsageSubrenderingSpecialization A RenderingUsage whose owningType is a RenderingDefinition or RenderingUsage must directly or indirectly specialize the RenderingUsage Views::Rendering::subrenderings from the Systems Model Library.

## SysML 1.7

Source: https://www.omg.org/spec/SysML/1.7/PDF

OMG Systems Modeling Language (SysML) Version 2.0, Part 1 Language Specification, document formal/2026-03-02, March 2026. Version 1.7, document formal/24-01-07, January 2024, is the previous published line.

- **5.1.** SysML has three types of conformance, listed in Conformance Types, which shall all be supported to fully conform to SysML.
- **text.** self.base_Property.isComposite • 3_typed_by_classifierbehavior Properties to which ClassifierBehaviorProperty applied shall be typed by the classifier behavior of their owning block or a generalization of the classifier behavior.
- **text.** Association Ends • base_Port : Port [1] Constraints • 1_not_proxy Full ports shall not also be proxy ports.
- **text.** These shall be between zero and one inclusive, and add up to one for edges with same source at the time the probabilities are used.
- **2.1.** [2] SysMLActivityDiagram shall only be applied to a UMLActivityDiagram.The principal of an applied AdjunctProperty shall be a Connector, CallAction, ObjectNode, Variable, Parameter, submachine State, or InteractionUse.
- **4.7.4.** pkg [Package] HSUV Views [ Requirements and VnV views exposing model elements] Id = "2" Text = "The Hybrid SUV shall have the braking, acceleration, and off-road capability of a typical SUV, but have dramatically better fuel economy.
