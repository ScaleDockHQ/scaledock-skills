---
name: oci
description: >-
  OCI: This specification defines an OCI Image, consisting of an image manifest, an image index (optional), a set of filesystem layers, and a configuration. Covers OCI Image Spec 1.1.1, OCI Distribution Spec 1.1.1, OCI Runtime Spec 1.2.1. Use when building or distributing OCI images. Triggers: OCI, image spec, runtime spec.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# OCI

The Open Container Initiative specifications: the Image Format Specification (manifest, descriptor, image index and layer), the Distribution Specification (the registry HTTP API) and the Runtime Specification (runtime lifecycle and container configuration), read from the opencontainers repositories at their release tags.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Image builder or tool, registry or registry client, or container runtime.
- Target version: OCI Image Spec 1.1.1 (current); OCI Distribution Spec 1.1.1 (current); OCI Runtime Spec 1.2.1 (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **Image Manifest Property Descriptions, schemaVersion.** "For this version of the specification, this MUST be `2` to ensure backward compatibility with older versions of Docker."
2. **Image Manifest Property Descriptions, layers.** "Implementations storing or copying image manifests MUST NOT error on encountering a `mediaType` that is unknown to the implementation."
3. **Registered algorithms, SHA-256.** "Implementations MUST implement SHA-256 digest verification for use in descriptors."
4. **Registered algorithms, SHA-256.** "When the _algorithm identifier_ is `sha256`, the _encoded_ portion MUST match `/[a-f0-9]{64}/`."
5. **Embedded Content.** "Implementations MUST NOT populate the `data` field in situations where doing so would modify existing content identifiers."
6. **Conformance, Requirements.** "All registries conforming to this specification MUST support, at a minimum, all APIs in the **Pull** category."
7. **Pull, Pulling manifests.** "`<name>` refers to the namespace of the repository. `<reference>` MUST be either (a) the digest of the manifest or (b) a tag."
8. **Push, Pushing Manifests.** "The registry MUST store the manifest in the exact byte representation provided by the client."
9. **Backwards Compatibility.** "Client implementations MUST support registries that implement partial or older versions of the OCI Distribution Spec."
10. **Errors.** "Unless otherwise stated, generating an error MUST leave the state of the environment as if the operation were never attempted - modulo any possible trivial ancillary changes such as logging."
11. **Mounts.** "The runtime MUST mount entries in the listed order."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the section it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `dockerfile`, `compose-spec`, `notary-project`, `sigstore`, `cnab`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OCI Image Format Specification](https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/spec.md): Release, image-spec v1.1.1 (commit 147f9c1), checked 2026-10-06.
- [OCI Image Manifest Specification](https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/manifest.md): Release, image-spec v1.1.1 (commit 147f9c1), checked 2026-10-06.
- [OCI Content Descriptors](https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/descriptor.md): Release, image-spec v1.1.1 (commit 147f9c1), checked 2026-10-06.
- [OCI Image Index Specification](https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/image-index.md): Release, image-spec v1.1.1 (commit 147f9c1), checked 2026-10-06.
- [OCI Image Layer Filesystem Changeset](https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/layer.md): Release, image-spec v1.1.1 (commit 147f9c1), checked 2026-10-06.
- [OCI Distribution Specification](https://raw.githubusercontent.com/opencontainers/distribution-spec/a139cc423184af6078077b9b7ee336eddbd03f8f/spec.md): Release, distribution-spec v1.1.1 (commit a139cc4), checked 2026-10-06.
- [OCI Runtime Specification: runtime and lifecycle](https://raw.githubusercontent.com/opencontainers/runtime-spec/524fc0e1b8ab0180e2fc9abd31837a0f4ed1fd6b/runtime.md): Release, runtime-spec v1.2.1 (commit 524fc0e), checked 2026-10-06.
- [OCI Runtime Specification: configuration](https://raw.githubusercontent.com/opencontainers/runtime-spec/524fc0e1b8ab0180e2fc9abd31837a0f4ed1fd6b/config.md): Release, runtime-spec v1.2.1 (commit 524fc0e), checked 2026-10-06.
