# openapi

An agent skill for the OpenAPI Specification 3.2, with 3.1 compatibility: writing, upgrading and validating OpenAPI Descriptions.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openapi
```

Then ask your agent to "write an OpenAPI 3.2 description for this API" or "upgrade our openapi.yaml from 3.1 to 3.2".

## What it covers

- Document structure, paths, operations, parameters, streaming media types and tags, with OAS 3.2.1 section references.
- Security schemes, OAuth 2.0 flows (including device authorization), `oauth2MetadataUrl` and security requirement semantics.
- Upgrading from 3.1, and the registered `x-oai-*` extensions that carry 3.2 fields in 3.1 documents.
- The OAI Extension and Namespace registries, and how to name and register extensions.
- Validation against the official OAS JSON Schemas, and what they cannot check.
- The 3.3 development line and the Security Profiles proposal, tracked but not used.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OpenAPI Specification v3.2.1](https://spec.openapis.org/oas/v3.2.1.html): Released, 3.2.1.
- [OAS 3.2.0 release notes](https://github.com/OAI/OpenAPI-Specification/releases/tag/3.2.0): Released, 3.2.0.
- [OpenAPI Specification v3.1.2](https://spec.openapis.org/oas/v3.1.2.html): Released, 3.1.2.
- [Upgrading from OpenAPI 3.1 to 3.2](https://learn.openapis.org/upgrading/v3.1-to-v3.2.html): OAI guide.
- [OAS versions and schema iterations](https://spec.openapis.org/oas/): schemas 3.2 iteration 2026-08-30, 3.1 iteration 2026-08-03.
- [OAS `v3.3-dev` branch](https://raw.githubusercontent.com/OAI/OpenAPI-Specification/aa2f6c0975ef85e24fd05ab2d7b8b57b04f108c4/src/oas.md): in development, commit aa2f6c0.
- [Security Profiles proposal](https://github.com/OAI/sig-security/discussions/50): proposal, design notes 2026-05-05.
- [OAI registries](https://spec.openapis.org/registry/): Extension and Namespace registries.

## License

MIT
