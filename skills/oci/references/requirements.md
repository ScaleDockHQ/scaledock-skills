# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## OCI Image Spec 1.1.1

Source: https://raw.githubusercontent.com/opencontainers/image-spec/v1.1.1/spec.md

This specification defines an OCI Image, consisting of an [image manifest](manifest.md), an [image index](image-index.md) (optional), a set of [filesystem layers](layer.md), and a [configuration](config.md).

- **document.** An implementation is not compliant if it fails to satisfy one or more of the MUST, MUST NOT, REQUIRED, SHALL, or SHALL NOT requirements for the protocols it implements.
- **document.** An implementation is compliant if it satisfies all the MUST, MUST NOT, REQUIRED, SHALL, and SHALL NOT requirements for the protocols it implements.
- **document.** ### Table of Contents - [Notational Conventions](#notational-conventions) - [Overview](#overview) - [Understanding the Specification](#understanding-the-specification) - [Media Types](media-types.md) - [Content Descriptors](descriptor.md) - [Image Layout](image-layout.md) - [Image Manifest](manifest.md) - [Image Index](image-index.md) - [Filesystem Layers](layer.md) - [Image…
- **document.** - [Image Manifest](manifest.md) - a document describing the components that make up a container image - [Image Index](image-index.md) - an annotated list of manifests - [Image Layout](image-layout.md) - a filesystem layout representing the contents of an image - [Filesystem Layer](layer.md) - a changeset that describes a container's filesystem - [Image Configuration](config.md) - a document…

## OCI Distribution Spec 1.1.1

Source: https://raw.githubusercontent.com/opencontainers/distribution-spec/v1.1.1/spec.md

The **Open Container Initiative Distribution Specification** (a.k.a. "OCI Distribution Spec") defines an API protocol to facilitate and standardize the distribution of content.

- **document.** These headers are OPTIONAL and clients SHOULD NOT depend on them.
- **document.** These error codes are OPTIONAL and clients SHOULD NOT depend on them.
- **document.** ## Notational Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119) (Bradner, S., "Key words for use in RFCs to Indicate Requirement Levels", BCP 14, RFC 2119, March 1997).
- **document.** **Content Management** - Clients are able to control the full life-cycle of the content stored in the registry All registries conforming to this specification MUST support, at a minimum, all APIs in the **Pull** category.
- **document.** Registries SHOULD also support the **Push**, **Content Discovery**, and **Content Management** categories.
- **document.** A registry claiming conformance with one of these specification categories MUST implement all APIs in the claimed category.
- **document.** ` ` MUST be either (a) the digest of the manifest or (b) a tag.
- **document.** The ` ` MUST NOT be in any other format.

## OCI Runtime Spec 1.2.1

Source: https://raw.githubusercontent.com/opencontainers/runtime-spec/v1.2.1/spec.md

The [Open Container Initiative][oci] develops specifications for standards on Operating System process and application containers.

- **document.** An implementation is not compliant for a given CPU architecture if it fails to satisfy one or more of the MUST, REQUIRED, or SHALL requirements for the [platforms](#platforms) it implements.
- **document.** An implementation is compliant for a given CPU architecture if it satisfies all the MUST, REQUIRED, and SHALL requirements for the [platforms](#platforms) it implements.
- **document.** # Table of Contents - [Introduction](spec.md) - [Notational Conventions](#notational-conventions) - [Container Principles](principles.md) - [Filesystem Bundle](bundle.md) - [Runtime and Lifecycle](runtime.md) - [Linux-specific Runtime and Lifecycle](runtime-linux.md) - [Configuration](config.md) - [Linux-specific Configuration](config-linux.md) - [Solaris-specific…
