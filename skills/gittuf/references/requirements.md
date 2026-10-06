# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## gittuf

Source: https://raw.githubusercontent.com/gittuf/gittuf/main/docs/design-document.md

[attacks targeting Git metadata](https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/torres-arias).

- **document.** All changes to the main branch's state MUST have a corresponding entry in the repository's RSL signed by either Alice or Bob.
- **document.** This is done by verifying the digital signature attached to the action, which must match the trusted public key associated with the actor who is supposed to have made the change.
- **document.** #### Root of Trust gittuf's policy metadata includes root of trust metadata, which establishes why the policy must be trusted.
- **document.** The root of trust metadata is signed by a threshold of root keys, and the initial set of root keys for a repository must be distributed using out-of-band mechanisms or rely on trust-on-first-use (TOFU).
- **document.** This new version must be signed by a threshold of root keys trusted in the previous version.
- **document.** In this rule file, they can add the actors who must be trusted for the same (or a subset) of namespaces.
- **document.** All repositories must contain a primary rule file (typically called "targets.json" to match TUF's behavior).
- **document.** The primary rule file derives its trust directly from the root of trust metadata; it must be signed by a threshold of actors trusted to manage the repository's primary rule file.
