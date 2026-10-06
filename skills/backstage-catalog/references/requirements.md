# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Backstage catalog descriptor

Source: https://backstage.io/docs/features/software-catalog/descriptor-format/

Descriptor Format of Catalog Entities | Backstage Software Catalog and Developer Platform

- **apiVersion and kind [required] ​.** The version is used for being able to evolve the format, and the tuple of apiVersion and kind should be enough for a parser to know how to interpret the contents of the rest of the data.
- **name [required] ​.** Names must be unique per kind, within a given namespace (if specified), at any point in time.
- **namespace [optional] ​.** Namespaces must be sequences of [a-zA-Z0-9] , possibly separated by - , at most 63 characters in total.
- **uid [output] ​.** Note that uid values are not to be seen as stable, and should not be used as external references to an entity.
- **uid [output] ​.** If you want to refer to an entity by some form of an identifier, you should always use string-form entity reference instead.
- **description [optional] ​.** More detailed explanations and documentation should be placed elsewhere.
- **labels [optional] ​.** The prefix, if present, must be a valid lowercase domain name, at most 253 characters in total.
- **labels [optional] ​.** The name part must be sequences of [a-zA-Z0-9] separated by any of [-_.] , at most 63 characters in total.
