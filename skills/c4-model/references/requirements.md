# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. The C4 model has no MUST or SHALL keywords, so these are its defining rules and notation recommendations, quoted as written. Apply the ones that match the diagram. Each is labelled with the page and heading it comes from.

## Abstractions: Software system

Source: https://raw.githubusercontent.com/simonbrowndotje/c4model/10c44932ac3be0afa1ead165d581868222f60170/abstractions/01-software-system.md

- **Software system.** A software system is the highest level of abstraction and describes something that delivers value to its users, whether they are human or not.
- **Software system.** Things that are not usually software systems in the C4 model include product domains, bounded contexts, business capabilities, feature teams, tribes, or squads.

## Abstractions: Container

Source: https://raw.githubusercontent.com/simonbrowndotje/c4model/10c44932ac3be0afa1ead165d581868222f60170/abstractions/02-container.md

- **Container.** A container is essentially a runtime boundary around some code that is being executed or some data that is being stored.
- **Container § Is a Java JAR, C# assembly, DLL, module, etc a container?.** A container is a runtime construct, like an application; whereas Java JAR files, C# assemblies, DLLs, modules, etc are used to organise the code within those applications.
- **Container § Should data storage services be shown as software systems or containers?.** For this reason, treat them as containers because they are an integral part of your software architecture, although they are hosted elsewhere.

## Abstractions: Component

Source: https://raw.githubusercontent.com/simonbrowndotje/c4model/10c44932ac3be0afa1ead165d581868222f60170/abstractions/03-component.md

- **Component.** a component is a grouping of related functionality encapsulated behind a well-defined interface.
- **Component.** In other words, all components inside a container execute in the same process space.

## Diagrams: System context diagram

Source: https://raw.githubusercontent.com/simonbrowndotje/c4model/10c44932ac3be0afa1ead165d581868222f60170/diagrams/01-system-context.md

- **System context diagram § Supporting elements.** People (e.g. users, actors, roles, or personas) and software systems (external dependencies) that are directly connected to the software system in scope.
- **System context diagram § Recommended?.** Yes, a system context diagram is recommended for all software development teams.

## Diagrams: Container diagram

Source: https://raw.githubusercontent.com/simonbrowndotje/c4model/10c44932ac3be0afa1ead165d581868222f60170/diagrams/02-container.md

- **Container diagram § Recommended?.** Yes, a container diagram is recommended for all software development teams.
- **Container diagram § Notes.** This diagram says very little about deployment aspects such as clustering, load balancers, replication, failover, etc because it will likely vary across different environments (e.g. production, staging, development, etc).

## Diagrams: Notation

Source: https://raw.githubusercontent.com/simonbrowndotje/c4model/10c44932ac3be0afa1ead165d581868222f60170/diagrams/11-notation.md

- **Notation § Diagrams.** Every diagram should have a title describing the diagram type and scope (e.g. "System Context diagram for My Software System").
- **Notation § Diagrams.** Every diagram should have a key/legend explaining the notation being used (e.g. shapes, colours, border styles, line types, arrow heads, etc).
- **Notation § Diagrams.** Acronyms and abbreviations (business/domain or technology) should be understandable by all audiences, or explained in the diagram key/legend.
- **Notation § Elements.** The type of every element should be explicitly specified (e.g. Person, Software System, Container or Component).
- **Notation § Elements.** Every element should have a short description, to provide an "at a glance" view of key responsibilities.
- **Notation § Elements.** Every container and component should have a technology explicitly specified.
- **Notation § Relationships.** Every line should represent a unidirectional relationship.
- **Notation § Relationships.** Every line should be labelled, the label being consistent with the direction and intent of the relationship (e.g. dependency or data flow).
- **Notation § Relationships.** Relationships between containers (typically these represent inter-process communication) should have a technology/protocol explicitly labelled.
- **Notation § Colours.** Just make sure that any colour coding is consistent (within and across diagrams) and be careful of things like black and white printers, color blindness, etc.
- **Notation § Diagram key/legend.** Any notation used should be as self-describing as possible, but all diagrams should have a key/legend to make the notation explicit.
