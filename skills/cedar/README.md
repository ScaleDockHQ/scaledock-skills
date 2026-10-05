# cedar

An agent skill for the Cedar policy language: writing authorization policies, schemas and entity data that validate and decide requests as intended, on Cedar 4.x (language 4.5), and upgrading from Cedar 3.x and 2.x.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill cedar
```

Then ask your agent to "write Cedar policies for our sharing model" or "explain why this Cedar request is denied".

## What it covers

- Policy structure, scope forms, conditions, annotations and operators.
- Policy templates, template-linked policies and their lifecycle.
- The Cedar and JSON schema formats, entity and context JSON, and PARC requests.
- The authorization algorithm: default deny, forbid overrides permit and skip on error.
- Validation checks, validation soundness, the SDK 4.13.0 warning change, and security practices.
- What changed in each language version, and upgrades from 2.x to 3.x and 3.x to 4.x.

## Versions

| Line      | Status                             |
| --------- | ---------------------------------- |
| Cedar 4.x | current (language 4.5, SDK 4.13.0) |
| Cedar 3.x | legacy (upgrade from)              |
| Cedar 2.x | legacy (upgrade from)              |

`references/versions.md` says which line to use and how to upgrade between them. No preview is listed: no unreleased language version is published.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Cedar Policy Language Reference Guide](https://docs.cedarpolicy.com/): reference for language version 4.5, with its policy, authorization, schema, validation and security pages.
- [Cedar document history](https://docs.cedarpolicy.com/other/doc-history.html): the language version table, 2.0 to 4.5.
- [Cedar v4.13.0](https://github.com/cedar-policy/cedar/releases/tag/v4.13.0): Released, 2026-09-15.
- [cedar-policy SDK changelog](https://github.com/cedar-policy/cedar/blob/main/cedar-policy/CHANGELOG.md): entries 2.0.0 to 4.13.0.
- [Cedar repository](https://github.com/cedar-policy/cedar): Apache-2.0.

## License

MIT
