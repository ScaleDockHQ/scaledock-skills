# cedar

An agent skill for the Cedar policy language 4.5: writing authorization policies, schemas and entity data that validate and decide requests as intended.

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

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Cedar Policy Language Reference Guide](https://docs.cedarpolicy.com/): reference for language version 4.5, with its policy, authorization, schema, validation and security pages.
- [Cedar v4.13.0](https://github.com/cedar-policy/cedar/releases/tag/v4.13.0): Released, 2026-09-15.
- [Cedar repository](https://github.com/cedar-policy/cedar): Apache-2.0.

## License

MIT
