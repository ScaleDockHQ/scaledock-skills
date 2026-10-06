# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Dockerfile

Source: https://docs.docker.com/reference/dockerfile/

| :------------------------------------- | :---------------------------------------------------------- |

- **document.** A Dockerfile **must begin with a `FROM` instruction**.
- **document.** Therefore, all parser directives must be at the top of a Dockerfile.
- **document.** Values for a directive are case-sensitive and must be written in the appropriate case for the directive.
- **document.** For example, `#check=skip=jsonargsrecommended` is invalid because the check name must use Pascal case, not lowercase.
- **document.** ### Exec form The exec form is parsed as a JSON array, which means that you must use double-quotes (") around words, not single-quotes (').
- **document.** #### Backslashes In exec form, you must escape backslashes.
- **document.** As such, a valid Dockerfile must start with a `FROM` instruction.
- **document.** Cache mounts should only be used for better
