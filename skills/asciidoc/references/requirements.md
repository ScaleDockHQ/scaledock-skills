# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. The AsciiDoc Language documentation has no formal conformance keywords yet (it is pre-specification), so these are its syntax rules, quoted as written. Apply the ones that match the role. Each is labelled with the page and heading it comes from.

## Document Structure

Source: https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/ROOT/pages/document-structure.adoc

- **Document Structure § Lines.** Many aspects of the syntax must occupy a whole line.
- **Document Structure § Lines.** For example, a section title must be on a line by itself.
- **Document Structure § Blocks.** These metadata lines must be above and directly adjacent to the block itself.
- **Document Structure § Encodings and AsciiDoc files.** UTF-16 encodings are supported only if the file starts with a BOM.

## Key Concepts

Source: https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/ROOT/pages/key-concepts.adoc

- **Key Concepts § Macros.** In a block macro, the name and target are separated by two colons (`::`) and it must reside on a line by itself.
- **Key Concepts § Preprocessor directives.** Like a block macro, a preprocessor directive must be on a line by itself.

## Document Header

Source: https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/document/pages/header.adoc

- **Document Header § Document header structure.** In other words, the document must start with a document header if it has one.
- **Document Header § Header requirements per doctype.** A header is required when the document type is `manpage`.

## Section Titles and Levels

Source: https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/sections/pages/titles-and-levels.adoc

- **Section Titles and Levels.** Nested section levels must be sequential.
- **Section Titles and Levels § Section level syntax.** A section marker can range from two to six equal signs and must be followed by a space.
- **Section Titles and Levels § Section level syntax.** Section levels cannot be skipped when nesting sections (e.g., you can't nest a level 5 section directly inside a level 3 section; an intermediary level 4 section is required).

## Blocks

Source: https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/blocks/pages/index.adoc

- **Blocks § Block forms.** A block (including its metadata lines) should always be bounded by an empty line or document boundary on either side.

## Delimited Blocks

Source: https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/blocks/pages/delimited.adoc

- **Delimited Blocks § Linewise delimiters.** The opening and closing delimiter must match exactly, both in length and in sequence of characters.
- **Delimited Blocks § Nesting blocks.** Delimited blocks cannot be interleaved.

## Attribute Entries

Source: https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/attributes/pages/attribute-entries.adoc

- **Attribute Entries § What is an attribute entry?.** Each attribute entry must be entered on its own line.
- **Attribute Entries § What is an attribute entry?.** The value must be offset from the closing colon (`:`) by at least one space.
- **Attribute Entries § Where can an attribute entry be declared?.** An attribute entry should not be declared inside the boundaries of a delimited block.

## Attribute Entry Names and Values

Source: https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/attributes/pages/names-and-values.adoc

- **Attribute Entry Names and Values § Valid built-in names.** Built-in attribute names are reserved and can't be re-purposed for user-defined attribute names.
- **Attribute Entry Names and Values § Valid user-defined names.** A user-defined attribute name cannot contain dots (.) or spaces.

## Unordered Lists

Source: https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/lists/pages/unordered.adoc

- **Unordered Lists § Basic unordered list.** A list item's first line of text must be offset from the marker (`+*+`) by at least one space.
- **Unordered Lists § Basic unordered list.** Empty lines are required before and after a list.

## Text Formatting and Punctuation

Source: https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/text/pages/index.adoc

- **Text Formatting and Punctuation § Formatting marks and pairs.** Formatting pairs can be nested, but they cannot be overlapped.

## Includes

Source: https://gitlab.eclipse.org/eclipse/asciidoc-lang/asciidoc-lang/-/raw/68ed0b22e8d9b919897542d8ae14f03e7dbdd2e4/docs/modules/directives/pages/include.adoc

- **Includes § Include directive syntax.** An include directive must be placed on a line by itself with the following syntax:
- **Includes § Include directive syntax.** An absolute or relative path outside the directory of the outermost document will only be honored if the safe mode is unsafe.
