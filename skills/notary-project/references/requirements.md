# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Notation signature specification

Source: https://raw.githubusercontent.com/notaryproject/specifications/main/specs/signature-specification.md

- **[Signature Envelope](#signature-envelope)**: Describes the structure of the Notary Project signature.

- **document.** - For OCI artifacts, this MUST be a valid [OCI descriptor][oci-descriptor].
- **document.** - Descriptor MUST contain `mediaType`, `digest`, and `size` fields.
- **document.** - Descriptor MAY contain `annotations` and if present it MUST follow the [annotation rules][annotation-rules].
- **document.** - For Blob artifacts, the descriptor MUST describe the blob that is being signed - Descriptor MUST contain `mediaType`, `digest`, and `size` fields.
- **document.** - `digest` MUST be in the format of `:`.
- **document.** Example: `sha256:2f3a23b6373afb134ddcd864be8e037e34a662d090d33ee849471ff73c873345` - `digest algorithm` MUST be deduced from signing certificate's public key.
- **document.** An example can be `application/octet-stream` - `size` MUST be the raw size of the blob in bytes.
- **document.** - Blob descriptors MAY optionally contain `annotations` and if present it MUST follow the [annotation rules][annotation-rules].
