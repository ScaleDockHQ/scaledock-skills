# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## REUSE Specification – Version 3.3

Source: https://raw.githubusercontent.com/fsfe/reuse-website/82e32ee2de33979c46ca688a9dde52c709aff73e/site/content/en/spec-3.3.md

- **Covered and ignored Files.** Covered Files are any file which must contain Licensing Information.
- **License Files.** A Project MUST include a License File for every license under which Covered Files are licensed.
- **License Files.** Each License File MUST be placed in the `LICENSES/` directory in the root of the Project.
- **License Files.** The name of the License File MUST be the SPDX License Identifier of the license followed by an appropriate file extension (example: `LICENSES/GPL-3.0-or-later.txt`).
- **License Files.** The License File MUST be in plain text format.
- **License Files.** A Project MUST NOT include License Files for licenses under which none of the files in the Project are licensed.
- **License Files.** The `LICENSES/` directory MUST NOT include any other files.
- **Licensing Information.** Each Covered File MUST have Licensing Information associated with it.
- **Comment headers.** To implement this method, a Commentable File MUST declare the file's Licensing Information in a comment header.
- **Comment headers.** For Uncommentable Files, the comment header that declares the file's Licensing Information MUST be in an adjacent text file of the same name with the additional extension `.license` (example: `cat.jpg.license` if the original file is `cat.jpg`).
- **Comment headers.** The comment header MUST contain one or more Copyright Notices and one or more `SPDX-License-Identifier` tag-value pairs.
- **In-line Snippet comments.** Each SPDX snippet that is opened MUST be closed with `SPDX-SnippetEnd`.
- **Ignore block.** This technique MUST NOT be used to ignore valid Licensing Information.
- **REUSE.toml.** Licensing Information MAY be associated with a file through a `REUSE.toml` file, which MUST be a valid TOML file.
- **REUSE.toml.** The `version` key (REQUIRED) MUST have an integer value representing the schema version of the file.
- **REUSE.toml.** A path MUST use forward slashes as path separators.
- **REUSE.toml.** A path MUST point to a location in the `REUSE.toml` file's directory or deeper.
- **REUSE.toml.** Each string MUST be a valid SPDX License Expression describing the licensing of the table's Covered Files.
- **DEP5 (deprecated).** The DEP5 file MUST be named `dep5` and stored in the `.reuse/` directory in the root of the Project (i.e. `.reuse/dep5`).
- **Order of precedence.** If a Commentable File contains Licensing Information but also has an adjacent `.license` file, then the Licensing Information defined in the `.license` file takes precedence, and the Commentable File's contents are ignored.
- **Format of Copyright Notices.** A Copyright Notice MUST start with a tag, word or symbol (collectively: prefixes) from the following list:
- **Format of Copyright Notices.** The Copyright Notice MUST contain the name of the copyright holder.
