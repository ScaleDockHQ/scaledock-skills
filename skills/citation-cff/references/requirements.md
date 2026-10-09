# Requirements from the pinned text

These sentences were read from the pinned source on 2026-10-06. The schema guide states few rules with MUST or SHOULD, so these are its structural rules, key definitions and guidance, quoted as written. Apply the ones that match the role. Each is labelled with the heading of the schema guide it comes from. Whether a key is required is stated in the guide's key entries and in `schema.json`.

## Guide to Citation File Format schema version 1.2.0

Source: https://raw.githubusercontent.com/citation-file-format/citation-file-format/396f738fb025b1d8acdb02a56ffc923f95dc8999/schema-guide.md

- **General structure of a CITATION.cff file.** must be named `CITATION.cff` (note the capitalization);
- **General structure of a CITATION.cff file.** are valid YAML 1.2
- **Minimal example.** A minimal example of a valid `CITATION.cff` file, that contains only the required keys, could look like this:
- **Referencing other work.** When your software or data builds on what others have already done, it is good practice to add a `references` section to your `CITATION.cff` file.
- **Credit redirection.** For this case, your `CITATION.cff` should contain metadata about the software at the root of the `CITATION.cff` file, but additionally, you can add a `preferred-citation` key with the metadata of the paper (or other work) you want people to cite.
- **Valid keys § cff-version.** The Citation File Format schema version that the `CITATION.cff` file adheres to for providing the citation metadata.
- **Valid keys § date-released.** Format is 4-digit year, 2-digit month, 2-digit day of month, separated by dashes.
- **Valid keys § license.** When there are multiple licenses, it is assumed their relationship is OR, not AND.
- **Valid keys § message.** A message to the human reader of the `CITATION.cff` file to let them know what to do with the citation metadata.
- **Valid keys § preferred-citation.** Adding a different preferred citation may result in a violation of the respective primary principle, "Importance", when others cite this work.
- **Valid keys § type.** The type of the work that is being described by this `CITATION.cff` file.
- **Definitions.** `definitions` and its subkeys like `definitions.alias` or `definitions.entity.alias` should not be used as keys in `CITATION.cff` files:
- **Definitions § definitions.date.** Note to tool implementers: it is necessary to cast YAML `date` objects to `string` objects when validating against the schema.
- **How to deal with unknown individual authors?.** To enable credit for the individuals that have created a work, it is good practice to cite the respective individuals as authors.
- **How to deal with unknown individual authors?.** If the authors of a work are truly anonymous, you can represent this in the same way:
