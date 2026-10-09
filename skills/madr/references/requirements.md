# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. MADR is a template, not a specification with MUST or SHALL keywords, so these are the template's section guidance (the placeholder text inside braces) and the documented conventions, quoted as written. Apply the ones that match the record. Each is labelled with the template section or documentation heading it comes from.

## MADR 4.0.0 template

Source: https://raw.githubusercontent.com/adr/madr/2475fe1973f66a12aaf58a91d8fa7b42c0f5ea3d/template/adr-template.md

- **Front matter.** These are optional metadata elements.
- **Front matter: consulted.** list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication
- **Front matter: informed.** list everyone who is kept up-to-date on progress; and with whom there is a one-way communication
- **Title.** short title, representative of solved problem and found solution
- **Context and Problem Statement.** Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story.
- **Decision Outcome.** Chosen option: "{title of option 1}", because {justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force {force} | … | comes out best (see below)}.
- **Consequences.** Good, because {positive consequence, e.g., improvement of one or more desired qualities, …}
- **Consequences.** Bad, because {negative consequence, e.g., compromising one or more desired qualities, …}
- **Confirmation.** Describe how the implementation of/compliance with the ADR can/will be confirmed.
- **Pros and Cons of the Options.** use "neutral" if the given argument weights neither for good nor bad
- **More Information.** Links to other decisions and resources might appear here as well.

## MADR documentation

Source: https://raw.githubusercontent.com/adr/madr/2475fe1973f66a12aaf58a91d8fa7b42c0f5ea3d/docs/index.md

- **Introduction.** An Architectural Decision (AD) is a justified software design choice that addresses a functional or non-functional requirement of architectural significance.
- **Introduction.** This decision is documented in an Architectural Decision Record (ADR), which details a single AD and its underlying rationale.
- **Overview.** Since we believe that any (important) decision should be captured in a structured way, we offer the MADR template to capture any decision.
- **Create a new ADR § Manual approach.** `NNNN` is a consecutive number and we assume that there won't be more than 9,999 ADRs in one repository.
- **Create a new ADR § Manual approach.** The title is stored using dashes and lowercase, because [adr-tools] also does that.
- **Create a new ADR § Manual approach.** Decisions are placed in the subfolder `decisions/` to keep them close to the documentation but also separate the decisions from other documentation.
- **Using MADR in large projects and product developments.** MADR does not enforce any repository or directory organization structure.
- **Usage of categories.** As a consequence, numbers of ADRs are no longer unique throughout the repository, but locally within a category only.
