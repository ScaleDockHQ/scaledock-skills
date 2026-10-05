# in-toto

An agent skill for in-toto: producing and verifying signed software supply chain attestations with the in-toto Attestation Framework, and securing a pipeline with in-toto layouts and links.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill in-toto
```

Then ask your agent to "emit an in-toto attestation for our build output" or "verify this .intoto.jsonl bundle before deploying".

## What it covers

- The Statement layer: `_type`, `subject` ResourceDescriptors with DigestSets, `predicateType` and `predicate`, plus the parsing rules and the monotonic principle.
- DSSE envelopes, the in-toto payload types, file naming, media types and `.intoto.jsonl` Bundles.
- The vetted predicate catalog (SLSA Provenance, VSA, SPDX, CycloneDX, Link, Test Result, SVR, Vulnerabilities, Reference, Release and others) and conventions for new predicates.
- Supply chain layouts: keys, steps, thresholds, inspections, artifact rules, link metadata and sublayouts.
- The attestation validation model and the layout verification workflow.
- Upgrading from Statement v0.1 and in-toto 0.9, and the draft ITE-10 and ITE-11 layout extensions.

## Versions

| Line                               | Status                |
| ---------------------------------- | --------------------- |
| in-toto Attestation Framework v1.2 | current (attestation) |
| in-toto Attestation Framework v0.1 | legacy (upgrade from) |
| in-toto specification v1.0         | current (layouts)     |
| in-toto specification v0.9         | legacy (upgrade from) |
| ITE-10 layouts for attestations    | preview (track)       |
| ITE-11 attribute rules             | preview (track)       |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [in-toto Attestation Framework v1.2.0](https://github.com/in-toto/attestation/tree/v1.2.0/spec): tagged release, 2026-03-18, with its predicates, validation model and v0.1.0 spec.
- [in-toto specification v1.0](https://github.com/in-toto/specification/blob/v1.0/in-toto-spec.md): stable, 1.0.0, plus the `master` and `v0.9` texts.
- [in-toto Enhancements](https://github.com/in-toto/ITE): ITE-5 and ITE-6 (Accepted), ITE-10 and ITE-11 (Draft).
- [DSSE v1.0.2](https://github.com/secure-systems-lab/dsse/blob/v1.0.2/protocol.md): released, protocol and envelope.
- [in-toto.io](https://in-toto.io/): project site and Specifications page.

## License

MIT
