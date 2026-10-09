# model-signing

An agent skill for Model signing: signing and verifying machine learning models with the OpenSSF Model Signing (OMS) format.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill model-signing
```

Then ask your agent to apply Model signing.

## What it covers

- The OpenSSF Model Signing (OMS) specification 1.0: a Sigstore bundle wrapping a DSSE envelope whose payload is an in-toto Statement listing every model file and its digest. Read from the specification's Markdown at a pinned commit, with the CLI rules of the sigstore/model-transparency reference implementation at release v1.1.1.

## Versions

| Line          | Status  |
| ------------- | ------- |
| Model signing | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OpenSSF Model Signing (OMS) Specification](https://raw.githubusercontent.com/ossf/model-signing-spec/91bf841e8ccf97a3ed97309387e9298d1ac18ba2/spec/v1.0.md): OpenSSF specification, Version 1.0, commit 91bf841e8ccf (2026-09-18).
- [sigstore/model-transparency README](https://raw.githubusercontent.com/sigstore/model-transparency/v1.1.1/README.md): Reference implementation, Release v1.1.1 (2025-10-10).
- [sigstore/model-transparency: Model Signing Format](https://raw.githubusercontent.com/sigstore/model-transparency/v1.1.1/docs/model_signing_format.md): Reference implementation, Release v1.1.1 (2025-10-10).

## License

MIT
