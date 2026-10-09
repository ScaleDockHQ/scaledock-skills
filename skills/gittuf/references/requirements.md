# Requirements from the pinned text

These sentences were read from the pinned source on 2026-10-06. The design document states its rules mostly with a lowercase "must", so those rules are quoted as written, together with the definitions of the policy and RSL references. Apply the ones that match the role. Each is labelled with the heading it appears under.

## gittuf Design Document

Source: https://raw.githubusercontent.com/gittuf/gittuf/v0.16.0/docs/design-document.md

- **Actors and Authentication.** This is done by verifying the digital signature attached to the action, which must match the trusted public key associated with the actor who is supposed to have made the change.
- **gittuf Policy.** There are two types of metadata used by gittuf, which are stored in a custom reference `refs/gittuf/policy`.
- **Root of Trust.** The root of trust metadata is signed by a threshold of root keys, and the initial set of root keys for a repository must be distributed using out-of-band mechanisms or rely on trust-on-first-use (TOFU).
- **Root of Trust.** This new version must be signed by a threshold of root keys trusted in the previous version.
- **Rule Files.** All repositories must contain a primary rule file (typically called "targets.json" to match TUF's behavior).
- **Rule Files.** The primary rule file derives its trust directly from the root of trust metadata; it must be signed by a threshold of actors trusted to manage the repository's primary rule file.
- **Rule Files.** As such, when verifying changes to unprotected namespaces, gittuf must allow any key to sign for these changes.
- **Reference State Log (RSL).** The entry is signed by the actor making the change to the ref.
- **Reference State Log (RSL).** The RSL is tracked at `refs/gittuf/reference-state-log`, and is implemented as a distinct commit graph.
- **RSL Annotation Entries.** Since the RSL history cannot be overwritten, an annotation entry must be used to communicate to gittuf clients to skip the corresponding entries.
- **Attestations for Authorization Records.** Each authorization must have the in-toto predicate type: `https://gittuf.dev/reference-authorization/v<VERSION>`.
- **RSLFetch: Receiving Remote RSL Changes.** This is because entries in the RSL must be made serially.
- **Regular Pushes.** When an actor pushes a change to a remote repository, this update to the corresponding ref (or refs) must be recorded in the RSL.
- **Verification Workflow.** First, the right policy state must be identified by walking back RSL entries to find the last change to that namespace.
- **Verification Workflow.** Next, authorized keys must be identified to verify that commit or RSL entry signatures are valid.
- **Identifying Authorized Signers for Protected Namespaces.** During this process, a principal must only be counted once even if they sign multiple times using different keys.
- **Recovery Mechanisms.** When gittuf verification fails, the following recovery workflow must be employed.
- **An Authorized Key is Compromised.** When a key authorized by gittuf policy is compromised, it must be revoked and rotated so that an attacker cannot use it to sign repository objects.
