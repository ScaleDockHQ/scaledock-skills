# slsa

An agent skill for SLSA (Supply-chain Levels for Software Artifacts) v1.2: Build and Source track levels, SLSA Provenance v1 and Verification Summary Attestations v1, artifact verification, and the supply chain threat model, with upgrades from SLSA v1.1, v1.0 and v0.1 and from the v0.2 and v0.1 predicates.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill slsa
```

Then ask your agent to "add SLSA Build L3 provenance to our release pipeline" or "write a verifier that checks SLSA provenance against our expectations".

## What it covers

- The Build track (L0–L3) and Source track (L1–L4), with the requirements for producers, build platforms, organizations and source control systems.
- The SLSA Provenance v1 predicate: `buildDefinition`, `runDetails`, `builder.id`, `externalParameters`, `resolvedDependencies`, extension fields and parsing rules.
- Distributing provenance alongside artifacts.
- Verifying artifacts: roots of trust, expectations, recursive dependency checks and where verification runs.
- Verification Summary Attestations, Source VSAs and verified properties.
- Threats A–I, dependency, availability and verification threats, and which level mitigates each.
- What changed in each SLSA version and predicate version, and how to upgrade.

## Versions

| Line                 | Status                |
| -------------------- | --------------------- |
| SLSA working draft   | preview (track)       |
| SLSA v1.2            | current               |
| SLSA v1.1            | legacy (upgrade from) |
| SLSA v1.0            | legacy (upgrade from) |
| SLSA v0.1            | legacy (upgrade from) |
| SLSA Provenance v1   | current               |
| SLSA Provenance v0.2 | legacy (upgrade from) |
| SLSA Provenance v0.1 | legacy (upgrade from) |
| SLSA VSA v1          | current               |
| SLSA VSA v0.2        | legacy (upgrade from) |
| SLSA VSA v0.1        | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [SLSA specification](https://slsa.dev/spec/) and [SLSA v1.2](https://slsa.dev/spec/v1.2/): Approved, v1.2, with its Build, Source, provenance, verification, VSA, verified properties and threats pages.
- [SLSA Provenance v1](https://slsa.dev/provenance/v1) and [v0.2](https://slsa.dev/provenance/v0.2).
- [SLSA v1.1](https://slsa.dev/spec/v1.1/) and [SLSA v1.0](https://slsa.dev/spec/v1.0/): Retired; [SLSA v0.1](https://slsa.dev/spec/v0.1/): superseded.
- [SLSA Working Draft](https://slsa.dev/spec/draft/): Draft, `main` at 82b296d.
- [Specification Stages and Versioning](https://slsa.dev/spec-stages) and the [slsa-framework/slsa](https://github.com/slsa-framework/slsa) tags.
- [in-toto Attestation Framework](https://github.com/in-toto/attestation/blob/main/spec/v1/README.md) v1.2: Statement layer and validation model.

## License

MIT
