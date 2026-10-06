---
name: oci
description: >-
  OCI: This specification defines an OCI Image, consisting of an image manifest, an image index (optional), a set of filesystem layers, and a configuration. Covers OCI Image Spec 1.1.1, OCI Distribution Spec 1.1.1, OCI Runtime Spec 1.2.1. Use when building or distributing OCI images. Triggers: OCI, image spec, runtime spec.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OCI

This specification defines an OCI Image, consisting of an image manifest, an image index (optional), a set of filesystem layers, and a configuration.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when building or distributing OCI images.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: OCI Image Spec 1.1.1 (default); OCI Distribution Spec 1.1.1 (default); OCI Runtime Spec 1.2.1 (default). See `references/versions.md`.
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "An implementation is not compliant if it fails to satisfy one or more of the MUST, MUST NOT, REQUIRED, SHALL, or SHALL NOT requirements for the protocols it implements."
2. **document.** "An implementation is compliant if it satisfies all the MUST, MUST NOT, REQUIRED, SHALL, and SHALL NOT requirements for the protocols it implements."
3. **document.** "### Table of Contents - [Notational Conventions](#notational-conventions) - [Overview](#overview) - [Understanding the Specification](#understanding-the-specification) - Media Types - Content Descriptors - Image Layout - Image Manifest - Image Index - Filesystem Layers - Image…"
4. **document.** "- [Image Manifest - a document describing the components that make up a container image - Image Index - an annotated list of manifests - Image Layout - a filesystem layout representing the contents of an image - Filesystem Layer - a changeset that describes a container's filesystem - Image Configuration - a document…"

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> `references/versions.md`
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in `references/requirements.md` and implement each one that applies to the role.
   -> `references/requirements.md`
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> `references/versions.md`
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in `references/requirements.md` holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OCI Image Spec 1.1.1](https://raw.githubusercontent.com/opencontainers/image-spec/v1.1.1/spec.md): Release, OCI image-spec v1.1.1, fetched 2026-10-06 (Release, 2026-10-06), checked 2026-10-06.
- [OCI Distribution Spec 1.1.1](https://raw.githubusercontent.com/opencontainers/distribution-spec/v1.1.1/spec.md): Release, OCI distribution-spec v1.1.1, fetched 2026-10-06 (Release, 2026-10-06), checked 2026-10-06.
- [OCI Runtime Spec 1.2.1](https://raw.githubusercontent.com/opencontainers/runtime-spec/v1.2.1/spec.md): Release, OCI runtime-spec v1.2.1, fetched 2026-10-06 (Release, 2026-10-06), checked 2026-10-06.
