# xacml

An agent skill for XACML.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill xacml
```

Then ask the agent to apply XACML.

## What it covers

- when writing or evaluating attribute-based access policies
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                   | Status  |
| ---------------------- | ------- |
| XACML 3.0              | current |
| XACML JSON Profile 1.1 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [XACML 3.0](https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html): OASIS Standard, XACML 3.0 core, fetched 2026-10-06 (OASIS Standard, 2026-10-06).
- [XACML JSON Profile 1.1](https://docs.oasis-open.org/xacml/xacml-json-http/v1.1/xacml-json-http-v1.1.html): OASIS Standard, XACML JSON and HTTP profile 1.1, fetched 2026-10-06 (OASIS Standard, 2026-10-06).

## License

MIT
