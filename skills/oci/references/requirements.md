# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Image Format Specification

Source: https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/spec.md

- **Notational Conventions.** An implementation is compliant if it satisfies all the MUST, MUST NOT, REQUIRED, SHALL, and SHALL NOT requirements for the protocols it implements.

## Image Manifest

Source: https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/manifest.md

- **Image Manifest Property Descriptions, schemaVersion.** For this version of the specification, this MUST be `2` to ensure backward compatibility with older versions of Docker.
- **Image Manifest Property Descriptions, mediaType.** When used, this field MUST contain the media type `application/vnd.oci.image.manifest.v1+json`.
- **Image Manifest Property Descriptions, layers.** Implementations storing or copying image manifests MUST NOT error on encountering a `mediaType` that is unknown to the implementation.
- **Guidelines for Artifact Usage.** If the `config.mediaType` is set to the empty value, the `artifactType` MUST be defined.

## Content Descriptors

Source: https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/descriptor.md

- **Digests, Verification.** Before consuming content targeted by a descriptor from untrusted sources, the byte content SHOULD be verified against the digest string.
- **Registered algorithms, SHA-256.** Implementations MUST implement SHA-256 digest verification for use in descriptors.
- **Registered algorithms, SHA-256.** When the _algorithm identifier_ is `sha256`, the _encoded_ portion MUST match `/[a-f0-9]{64}/`.
- **Embedded Content.** Implementations MUST NOT populate the `data` field in situations where doing so would modify existing content identifiers.

## Image Index

Source: https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/image-index.md

- **Image Index Property Descriptions, manifests.** An encountered `mediaType` that is unknown to the implementation MUST NOT generate an error.

## Image Layer Filesystem Changeset

Source: https://raw.githubusercontent.com/opencontainers/image-spec/147f9c13cedb47a0c4d9a11a222961073d585877/layer.md

- **Whiteouts, Opaque Whiteout.** Implementations SHOULD generate layers using _explicit whiteout_ files, but MUST accept both.

## Distribution Specification

Source: https://raw.githubusercontent.com/opencontainers/distribution-spec/a139cc423184af6078077b9b7ee336eddbd03f8f/spec.md

- **Conformance, Requirements.** All registries conforming to this specification MUST support, at a minimum, all APIs in the **Pull** category.
- **Pull, Pulling manifests.** `<name>` refers to the namespace of the repository. `<reference>` MUST be either (a) the digest of the manifest or (b) a tag.
- **Push, Pushing a blob in chunks.** Chunks MUST be uploaded in order, with the first byte of a chunk being the last chunk's `<end-of-range>` plus one.
- **Push, Pushing a blob in chunks.** The closing `PUT` request MUST include the `<digest>` of the whole blob (not the final chunk) as a query parameter.
- **Push, Pushing Manifests.** If a manifest includes a `mediaType` field, clients MUST set the `Content-Type` header to the value specified by the `mediaType` field.
- **Push, Pushing Manifests.** The registry MUST store the manifest in the exact byte representation provided by the client.
- **Content Discovery, Listing Referrers.** If the registry supports the referrers API, the registry MUST NOT return a `404 Not Found` to a referrers API requests.
- **Backwards Compatibility.** Client implementations MUST support registries that implement partial or older versions of the OCI Distribution Spec.

## Runtime Specification: runtime and lifecycle

Source: https://raw.githubusercontent.com/opencontainers/runtime-spec/524fc0e1b8ab0180e2fc9abd31837a0f4ed1fd6b/runtime.md

- **Errors.** Unless otherwise stated, generating an error MUST leave the state of the environment as if the operation were never attempted - modulo any possible trivial ancillary changes such as logging.
- **Operations, Start.** This operation MUST generate an error if `process` was not set.

## Runtime Specification: configuration

Source: https://raw.githubusercontent.com/opencontainers/runtime-spec/524fc0e1b8ab0180e2fc9abd31837a0f4ed1fd6b/config.md

- **Root.** A directory MUST exist at the path declared by the field.
- **Mounts.** The runtime MUST mount entries in the listed order.
- **POSIX-platform Hooks.** Hooks MUST be called in the listed order.
