# openadr

An agent skill for OpenADR 3: building OpenADR 3 VTNs, VENs and business logic clients.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openadr
```

Then ask your agent to apply OpenADR 3.

## What it covers

- OpenADR 3 is the OpenADR Alliance's REST API between a Virtual Top Node (VTN) and Virtual End Nodes (VENs) and business logic (BL) clients for demand response and price signals. This skill reads the OpenAPI definition `openadr3.yaml` and the Alliance's enumeration schemas.
- The OpenADR Alliance hands out the Definition and User Guide only after account registration. This skill pins only the machine-readable parts: the OpenAPI YAML (which declares the Apache License 2.0 in its `info.license`), taken from the `grid-coordination/openadr3-specification` public copy at a fixed commit, and the Alliance's own `oadr3-org/openadr3-schemas` enumeration repository. Behaviour that the YAML defers to the User Guide (`See User Guide`) is out of scope; read the Alliance documents for it.

## Versions

| Line          | Status    |
| ------------- | --------- |
| OpenADR 3.1.0 | current   |
| OpenADR 3.0.1 | supported |
| OpenADR 3.0.0 | legacy    |
| OpenADR 2.0b  | legacy    |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OpenADR 3.1.0 OpenAPI definition (openadr3.yaml)](https://raw.githubusercontent.com/grid-coordination/openadr3-specification/17b91725e0f07203574ddc946e28def31cb11e44/3.1.0/openadr3.yaml): OpenADR Alliance Final Specification, public copy, OpenADR 3.1.0, mirror commit 17b9172.
- [OpenADR 3.0.1 OpenAPI definition (openadr3.yaml)](https://raw.githubusercontent.com/grid-coordination/openadr3-specification/17b91725e0f07203574ddc946e28def31cb11e44/3.0.1/openadr3.yaml): OpenADR Alliance release, public copy, OpenADR 3.0.1, mirror commit 17b9172.
- [OpenADR 3 enumeration schemas: event interval payloads](https://raw.githubusercontent.com/oadr3-org/openadr3-schemas/80b67b43e698a70256ae76298935396b3c9fe13e/OpenADR_Alliance/event-interval-payloads.schema.yaml): OpenADR Alliance repository, oadr3-org/openadr3-schemas commit 80b67b4, 2026-10-05.

## License

MIT
