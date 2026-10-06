# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Conventional Commits 1.0.0

Source: https://www.conventionalcommits.org/en/v1.0.0/

The Conventional Commits specification is a lightweight convention on top of commit messages.

- **Specification.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119 .
- **Specification.** Commits MUST be prefixed with a type, which consists of a noun, feat , fix , etc., followed by the OPTIONAL scope, OPTIONAL !
- **Specification.** , and REQUIRED terminal colon and space.
- **Specification.** The type feat MUST be used when a commit adds a new feature to your application or library.
- **Specification.** The type fix MUST be used when a commit represents a bug fix for your application.
- **Specification.** A scope MUST consist of a noun describing a section of the codebase surrounded by parenthesis, e.g., fix(parser): A description MUST immediately follow the colon and space after the type/scope prefix.
- **Specification.** The body MUST begin one blank line after the description.
- **Specification.** Each footer MUST consist of a word token, followed by either a :<space> or <space># separator, followed by a string value (this is inspired by the git trailer convention ).
