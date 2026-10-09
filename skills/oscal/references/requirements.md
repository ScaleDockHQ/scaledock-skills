# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences, quoted as written, from the OSCAL Profile Resolution specification (which uses RFC 2119 key words in upper case) and from the OSCAL concepts pages. Apply the ones that match the role. Profile Resolution quotes are labelled with the specification's requirement identifier (`req-...`); concepts quotes with the page section.

## OSCAL concepts: layers and models

Source: https://raw.githubusercontent.com/usnistgov/OSCAL-Pages/4e5c578e1459db44f616a612c01e6e7bbe352935/src/content/learn/concepts/layer/_index.md

- **Control Layer Overview.** Controls used in any other OSCAL model must first be defined in this model.
- **Control Layer Overview.** A control used in the implementation, assessment, and assessment results layers must first be imported by a profile.
- **Well-formed Data and Valid OSCAL.** Per our guidance, OSCAL-enabled tools must check OSCAL document instances to ensure they are well-formed and valid based upon the models in these layers.

## OSCAL concepts: identifier use

Source: https://raw.githubusercontent.com/usnistgov/OSCAL-Pages/4e5c578e1459db44f616a612c01e6e7bbe352935/src/content/learn/concepts/identifier-use/_index.md

- **Uniqueness.** As implied by the category name, locally-unique identifiers must be unique within the current document, whereas globally-unique identifiers are guaranteed to be unique across all other identifiers.
- **Uniqueness.** Human-oriented identifiers must be defined and managed organizationally and are more susceptible to identifier duplication or collisions.
- **Consistency.** Identifier (value) must be managed across revisions of the same document.

## OSCAL Profile Resolution specification

Source: https://raw.githubusercontent.com/usnistgov/OSCAL/v1.2.3/src/specifications/profile-resolution/profile-resolution-specml.xml

The specification carries a notice that it is a work in progress and subject to change; it is published with the OSCAL v1.2.3 release.

- **req-uri-error.** In the case that acquiring a resource fails, the tool MUST cease processing and provide an error.
- **req-circular-error.** If a processor encounters a circular import as described above (self-imports are inherently circular), the processor MUST cease processing and generate an error.
- **req-include-all.** When an import provides the include-all directive, ALL controls and groups in the referenced document (including nested controls) MUST be included.
- **req-with-child-controls-none.** If no with-child-controls is provided, the processor MUST consider the directive as being equivalent to one having with-child-controls:no.
- **req-exclude.** Any control designated to be both included and excluded, MUST be excluded.
- **req-merge-combine.** Note that "merge: combine" is deprecated, and MUST be considered undefined behavior when encountered.
- **req-merge-none.** If no merge directive is given in the profile, or if a merge is given without a combine, merge conflicts MUST be treated as if method: keep was given.
- **req-merge-flat.** Profiles with the "flat" merge directive MUST be resolved as unstructured catalogs, with no grouping or nesting of controls.
- **req-modify-param-multi.** If more than one set-parameter directive is given for the same parameter, all MUST BE applied, in the sequence given in the profile.
- **req-modify-alter-add-explicit-id-ignore.** If by-id does not correspond to such a value, the add directive MUST be considered inoperative and ignored.
- **req-backmatter-dupe.** If a given resource has the same uuid as a resource that has already been added, the previous resource MUST be removed, and the more recent one added, unless superseded by other requirements.
- **req-meta-version.** The value of metadata:version in the target MUST be set with a string that identifies the version of that document.
- **req-meta-source-profile.** A child prop object with name:source-profile MUST be created.
- **req-prune-keep.** Any object that has a child prop with a name of "keep" and a value of "always" MUST NOT be pruned.
- **req-multiformat-differ.** A different serialization format of any given input MUST NOT result in a differing output catalog.
- **req-output-json.** The final Catalog output, if using JSON, MUST be valid as defined by the JSON model documentation for the OSCAL Catalog.
