# authzen

An agent skill for the OpenID AuthZEN Authorization API: Policy Enforcement Points asking a Policy Decision Point for access decisions, and PDPs that implement the API.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill authzen
```

Then ask your agent to "add AuthZEN access evaluation calls to this API gateway" or "make this PDP pass AuthZEN Basic and Batch certification".

## What it covers

- The subject, resource, action and context information model, and decisions with decision context.
- The Access Evaluation API and the Access Evaluations batch API, with default values and `evaluations_semantic`.
- Subject, Resource and Action Search, with pagination.
- PDP metadata at `/.well-known/authzen-configuration`, `signed_metadata` and the default endpoint paths.
- The HTTPS JSON binding, error codes, `X-Request-ID` and security considerations.
- The certification levels and fixture, and the working group's interop test vectors.
- Upgrading a PEP or PDP from the 1.0 Implementer's Draft to the Final.

## Versions

| Line                                                | Status                |
| --------------------------------------------------- | --------------------- |
| AuthZEN Authorization API 1.0                       | current (Final)       |
| AuthZEN Authorization API 1.0 Implementer's Draft 1 | legacy (upgrade from) |

`references/versions.md` says which line to use, what changed between the Implementer's Draft and the Final, and how to upgrade. No preview is listed: the current editors' draft has the same text as the Final.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Authorization API 1.0](https://openid.net/specs/authorization-api-1_0.html): Final, published 11 January 2026.
- [Authorization API 1.0 – draft 01](https://openid.net/specs/authorization-api-1_0-01.html): Implementer's Draft, 6 September 2024, with [draft 02](https://openid.net/specs/authorization-api-1_0-02.html) and [draft 03](https://openid.net/specs/authorization-api-1_0-03.html): superseded.
- [AuthZEN Working Group – Specifications](https://openid.net/wg/authzen/specifications/) and the [current editors' draft](https://openid.github.io/authzen/): index and editors' draft.
- [AuthZEN Authorization API 1.0 Certification Scenario](https://raw.githubusercontent.com/openid/authzen/b304f68cb206e8be3dfde093142005296582c509/certification/authorization-api-1_0-scenario.md): working group draft, commit b304f68.
- [AuthZEN interop scenarios and test vectors](https://github.com/openid/authzen/tree/b304f68cb206e8be3dfde093142005296582c509/interop): working group repository, commit b304f68.

## License

MIT
