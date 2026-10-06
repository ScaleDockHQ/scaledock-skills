# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## xRegistry 1.0-rc4

Source: https://raw.githubusercontent.com/xregistry/spec/main/core/spec.md

- [Implicit Creation of Parent Entities](#design-implicit-creation-of-parent-entities)

- **document.** ## Notations and Terminology ### Notational Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).
- **document.** Server-unknown extension attributes MUST be silently stored in the backing datastore.
- **document.** Specification-defined attributes and server-known extension attributes MUST generate an error if the corresponding feature is not supported or enabled.
- **document.** In the pseudo JSON format snippets `?` means the preceding item is OPTIONAL, `*` means the preceding item MAY appear zero or more times, and `+` means the preceding item MUST appear at least once.
- **document.** The following are used to denote an instance of one of the associated data types (see [Attributes and Extensions](#attributes-and-extensions) for more information about each data type): - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - one of the allowable data type names (MUST be in lower case) listed in [Attributes and…
- **document.** Each Resource MUST exist under a single Group and, similar to Groups, have a set of Registry metadata.
- **document.** Each Resource MUST have at least one Version associated with it.
- **document.** `http`(./http.md) MUST define at least one REQUIRED mechanism by which the model can be retrieved.
