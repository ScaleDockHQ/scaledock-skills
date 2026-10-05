# openapi

An agent skill for the OpenAPI Specification 3.0 to 3.2: writing, upgrading and validating OpenAPI Descriptions, with Swagger 2.0 upgrades and the 3.3 development line tracked.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openapi
```

Then ask your agent to "write an OpenAPI 3.2 description for this API" or "upgrade our swagger.yaml to OpenAPI 3.2".

## What it covers

- Document structure, paths, operations, parameters, streaming media types and tags, with OAS 3.2.1 section references.
- Security schemes, OAuth 2.0 flows (including device authorization), `oauth2MetadataUrl` and security requirement semantics.
- Upgrading from Swagger 2.0, OpenAPI 3.0 and 3.1, and the registered `x-oai-*` extensions that carry 3.2 fields in 3.1 documents.
- The OAI Extension and Namespace registries, and how to name and register extensions.
- Validation against the official OAS JSON Schemas, and what they cannot check.
- The 3.3 development line and the Security Profiles proposal, tracked but not used.

## Versions

| Line        | Status                |
| ----------- | --------------------- |
| OpenAPI 3.3 | preview (track)       |
| OpenAPI 3.2 | current               |
| OpenAPI 3.1 | supported             |
| OpenAPI 3.0 | supported             |
| Swagger 2.0 | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OpenAPI Specification v3.2.1](https://spec.openapis.org/oas/v3.2.1.html): Released, 3.2.1.
- [OAS 3.2.0 release notes](https://github.com/OAI/OpenAPI-Specification/releases/tag/3.2.0): Released, 3.2.0.
- [OpenAPI Specification v3.1.2](https://spec.openapis.org/oas/v3.1.2.html): Released, 3.1.2.
- [OpenAPI Specification v3.0.4](https://spec.openapis.org/oas/v3.0.4.html): Released, 3.0.4.
- [OpenAPI Specification v2.0](https://spec.openapis.org/oas/v2.0.html): Released (Swagger 2.0, superseded), 2.0.
- [Upgrading from OpenAPI 3.1 to 3.2](https://learn.openapis.org/upgrading/v3.1-to-v3.2.html): OAI guide.
- [Upgrading from OpenAPI 3.0 to 3.1](https://learn.openapis.org/upgrading/v3.0-to-v3.1.html): OAI guide.
- [OAS versions and schema iterations](https://spec.openapis.org/oas/): schemas 3.2 iteration 2026-08-30, 3.1 iteration 2026-08-03, 3.0 iteration 2024-10-18, 2.0 iteration 2017-08-27.
- [OAS `v3.3-dev` branch](https://raw.githubusercontent.com/OAI/OpenAPI-Specification/aa2f6c0975ef85e24fd05ab2d7b8b57b04f108c4/src/oas.md): in development, commit aa2f6c0.
- [Security Profiles proposal](https://github.com/OAI/sig-security/discussions/50): proposal, design notes 2026-05-05.
- [OAI registries](https://spec.openapis.org/registry/): Extension and Namespace registries.

## License

MIT
