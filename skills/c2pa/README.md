# c2pa

An agent skill for the C2PA 2.4 Technical Specification (Content Credentials): building, signing and validating C2PA manifests, claims and assertions, and upgrading from earlier versions.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill c2pa
```

Then ask your agent to "add C2PA Content Credentials to our exported images" or "review our C2PA validator against the 2.4 validation algorithm".

## What it covers

- The C2PA Manifest Store in JUMBF, external `application/c2pa` stores, and standard, update and compressed manifests.
- Claim v2, hashed URIs, manifest labels, multiple step processing and redaction.
- Assertions: actions with `digitalSourceType` for AI-generated content, AI Disclosure, ingredients, data, box, BMFF and collection hash bindings, soft bindings and watermarks, thumbnails and metadata.
- COSE claim signatures, the X.509 certificate profile, RFC 3161 time-stamps, OCSP stapling, and the C2PA Trust List and TSA Trust List.
- The Well-Formed, Valid and Trusted states and the validation algorithm with its status codes.
- The Conformance Program's additional requirements and the C2PA guidance for AI and ML.

## Versions

| Line     | Status                |
| -------- | --------------------- |
| C2PA 2.4 | current               |
| C2PA 2.3 | supported             |
| C2PA 2.2 | supported             |
| C2PA 2.1 | legacy (upgrade from) |
| C2PA 2.0 | legacy (upgrade from) |
| C2PA 1.4 | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [C2PA Specifications index](https://spec.c2pa.org/specifications/specifications/2.4/index.html): Published, lists 2.4 as the newest version.
- [C2PA Technical Specification 2.4](https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html): Published, 2.4 (April 2026).
- [C2PA Technical Specification 2.3](https://spec.c2pa.org/specifications/specifications/2.3/specs/C2PA_Specification.html): Published, 2.3 (December 2025).
- [C2PA Technical Specification 2.2](https://spec.c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html): Published, 2.2 (May 2025).
- [C2PA Technical Specification 2.1](https://spec.c2pa.org/specifications/specifications/2.1/specs/C2PA_Specification.html): Published, 2.1 (September 2024).
- [C2PA Technical Specification 2.0](https://spec.c2pa.org/specifications/specifications/2.0/specs/C2PA_Specification.html): Published, 2.0 (January 2024).
- [C2PA Technical Specification 1.4](https://spec.c2pa.org/specifications/specifications/1.4/specs/C2PA_Specification.html): Published, 1.4 (November 2023).
- [C2PA Guidance for Artificial Intelligence and Machine Learning](https://spec.c2pa.org/specifications/specifications/2.4/ai-ml/ai_ml.html): Informative document, 2.4 site build.
- [c2pa-org/specifications](https://github.com/c2pa-org/specifications): Source repository, latest release 2.3.
- [C2PA Conformance](https://c2pa.org/conformance/): Program page.
- [C2PA Conformance Program](https://github.com/c2pa-org/conformance-public/blob/main/docs/v0.2/C2PA%20Conformance%20Program.md): v0.2, released 2026-07-31.
- [Additional Conformance Requirements](https://github.com/c2pa-org/conformance-public/blob/main/docs/v0.2/Additional%20Conformance%20Requirements%20Against%20the%20Content%20Credentials%20Specification.md): v0.2, 2026-07-31.
- [C2PA Trust List and TSA Trust List](https://github.com/c2pa-org/conformance-public/tree/main/trust-list): Published lists, issued 2026-08-05.

## License

MIT
