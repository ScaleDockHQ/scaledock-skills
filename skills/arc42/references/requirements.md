# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. arc42 is a template, not a specification with MUST or SHALL keywords, so these are the rules from its section help texts, quoted as written. Apply the ones that match the document. Each is labelled with the arc42 section it comes from.

## Section 1: Introduction and Goals

Source: https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/01_introduction_and_goals.adoc

- **§ 1.2 Quality Goals.** The top three (max five) quality goals for the architecture whose fulfillment is of highest importance to the major stakeholders.
- **§ 1.2 Quality Goals.** Make sure to be very concrete about these qualities, avoid buzzwords.
- **§ 1.3 Stakeholders.** Do not repeat stakeholders' functional and quality requirements.

## Section 2: Architecture Constraints

Source: https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/02_architecture_constraints.adoc

- **§ 2 Architecture Constraints.** Architects should know exactly where they are free in their design decisions and where they must adhere to constraints.
- **§ 2 Architecture Constraints.** Constraints must always be dealt with; they may be negotiable, though.

## Section 3: Context and Scope

Source: https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/03_context_and_scope.adoc

- **§ 3 Context and Scope.** If necessary, differentiate the business context (domain specific inputs and outputs) from the technical context (channels, protocols, hardware).
- **§ 3 Context and Scope.** The domain interfaces and technical interfaces to communication partners are among your system's most critical aspects.
- **§ 3.1 Business Context.** All kinds of diagrams that show the system as a black box and specify the domain interfaces to communication partners.

## Section 4: Solution Strategy

Source: https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/04_solution_strategy.adoc

- **§ 4 Solution Strategy.** Keep the explanations of such key decisions short.

## Section 5: Building Block View

Source: https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/05_building_block_view.adoc

- **§ 5 Building Block View.** This view is mandatory for every architecture documentation.
- **§ 5.2 Level 2.** Please prefer relevance over completeness.
- **§ 5.2 Level 2.** Specify important, surprising, risky, complex or volatile building blocks.

## Section 8: Cross-cutting Concepts

Source: https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/08_concepts.adoc

- **§ 8 Cross-cutting Concepts.** DO NOT ATTEMPT to cover all of the topics of the aforementioned diagram.

## Section 9: Architecture Decisions

Source: https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/09_architecture_decisions.adoc

- **§ 9 Architecture Decisions.** Important, expensive, large scale or risky architecture decisions including rationales.
- **§ 9 Architecture Decisions.** Refer to section 4, where you already captured the most important decisions of your architecture.
- **§ 9 Architecture Decisions.** Stakeholders of your system should be able to comprehend and retrace your decisions.

## Section 10: Quality Requirements

Source: https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/10_quality_requirements.adoc

- **§ 10 Quality Requirements.** The most important of these requirements have already been described in section 1.2. (quality goals), therefore they should only be referenced here.
- **§ 10.2 Quality Scenarios.** Ensure that your scenarios are specific and measurable.

## Section 11: Risks and Technical Debts

Source: https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/11_technical_risks.adoc

- **§ 11 Risks and Technical Debts.** A list of identified technical risks or technical debts, ordered by priority

## Section 12: Glossary

Source: https://raw.githubusercontent.com/arc42/arc42-template/32fd461c91b184777e14f7d66b4e46db936fd3e5/EN/adoc/12_glossary.adoc

- **§ 12 Glossary.** The most important domain and technical terms that your stakeholders use when discussing the system.
