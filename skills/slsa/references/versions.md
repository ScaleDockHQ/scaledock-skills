# Versions and upgrades

Read this when choosing which SLSA version to claim levels against, reading provenance or VSAs written for an older format, upgrading, or checking the working draft. Sources: the SLSA specification index, the Specification Stages page, each version's What's new page, the change history of the Provenance and VSA formats, and the `slsa-framework/slsa` release branches and tags, listed in [Sources](../SKILL.md#sources).

## Version lines

SLSA has one version number for the core specification and the attestation formats together (Specification Stages, Versioning). The predicates carry their own major version in `predicateType`, so they are modelled as separate families: `provenance` and `vsa`. Stage terms are the site's own: Draft, Candidate, Approved and Retired.

| Id                | Line                 | Status  | Revision                                                    | Posture | Summary                                                                                       |
| ----------------- | -------------------- | ------- | ----------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `draft-preview`   | SLSA working draft   | preview | `/spec/draft`, `main` at 82b296d (2026-09-29)               | track   | Adds a Build Environment track and a Dependency track with a new predicate.                   |
| `1.2`             | SLSA v1.2            | current | Approved; tag `v1.2`, branch `releases/v1.2` at ae7fc76     |         | Adds the Source track (L1–L4) and Verified Properties; Build track unchanged from v1.1.       |
| `1.1`             | SLSA v1.1            | legacy  | Retired; tag `v1.1`                                         |         | Adds VSA verification steps and `verifier.version`; Build requirements unchanged from v1.0.   |
| `1.0`             | SLSA v1.0            | legacy  | Retired; tag `v1.0.0`                                       |         | First stable release: Build track L0–L3 only, provenance v1, verification guidance.           |
| `0.1`             | SLSA v0.1            | legacy  | Approved, superseded; tag `v0.1`                            |         | Single unnamed ladder SLSA 1–4 mixing source, build, provenance and common requirements.      |
| `provenance-v1`   | SLSA Provenance v1   | current | `https://slsa.dev/provenance/v1`, as published in SLSA v1.2 |         | `buildDefinition` and `runDetails`; the same predicate type through SLSA v1.0, v1.1 and v1.2. |
| `provenance-v0.2` | SLSA Provenance v0.2 | legacy  | `https://slsa.dev/provenance/v0.2`                          |         | `invocation`, `configSource`, `materials`, `buildConfig`; Statement v0.1.                     |
| `provenance-v0.1` | SLSA Provenance v0.1 | legacy  | `https://slsa.dev/provenance/v0.1`                          |         | First version, originally named `in-toto.io/Provenance`.                                      |
| `vsa-v1`          | SLSA VSA v1          | current | `https://slsa.dev/verification_summary/v1`, as in SLSA v1.2 |         | lowerCamelCase fields, `resolvedDependencies`, `slsaVersion`; 1.2 adds multi-track results.   |
| `vsa-v0.2`        | SLSA VSA v0.2        | legacy  | `https://slsa.dev/verification_summary/v0.2`                |         | Adds `resource_uri` and `input_attestations` to v0.1.                                         |
| `vsa-v0.1`        | SLSA VSA v0.1        | legacy  | `https://slsa.dev/verification_summary/v0.1`                |         | Initial VSA.                                                                                  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The version index (`www/_data/versions.yml`, rendered at https://slsa.dev/spec/) marks v1.2 Approved and current, v1.1 and v1.0 Retired, v0.1 Approved, v0.2 hidden except for its provenance and VSA pages, the v1.0, v1.1 and v1.2 release candidates Retired, and the draft Draft. SLSA v1.0 and v1.1 are listed as legacy because the site marks them Retired ("no longer maintained", Specification Stages, Retired). SLSA v0.1 is still labelled Approved, but v1.0 replaced it and removed its source and common requirements, so it is legacy here. The `slsa-framework/slsa` repository publishes tags (`v1.2`, `v1.1`, `v1.0.0`, `v0.1` and release candidates) and no GitHub Releases.

Note: `https://slsa.dev/provenance/v1` and `https://slsa.dev/verification_summary/v1` still redirect to the v1.1 pages as of 2026-10-05, while `/provenance/v1.2` goes to the v1.2 page. The predicate type string is the same either way.

## Which version to use

- Claim and require levels against SLSA v1.2, and write them as `SLSA Build L3 (v1.2)` or `SLSA Source L3 (v1.2)` when precision matters (Specification Stages, Versioning).
- Emit SLSA Provenance v1 (`https://slsa.dev/provenance/v1`) and SLSA VSA v1 (`https://slsa.dev/verification_summary/v1`), with the current v1.2 field rules. Set the VSA `slsaVersion` to `1.2`.
- A claim of `SLSA Build L1`–`L3` under v1.0 or v1.1 has the same requirements as under v1.2: the Build requirements text differs only editorially (diff of `releases/v1.0`, `releases/v1.1` and `releases/v1.2`). Accept such claims, but do not author new documents against v1.0 or v1.1.
- Treat SLSA v0.1 levels ("SLSA 1–4") and v0.1 or v0.2 predicates as input to an upgrade. A verifier can still read them, but each `predicateType` is a separate major version (in-toto Parsing rules), so never apply v1 field rules to them.
- Follow the draft only to see what is coming. Its posture is **track**: claim no Build Environment or Dependency levels and emit no `https://slsa.dev/dependency/v1` predicates.

## What changed

### SLSA v1.2

From SLSA v1.2 What's new:

- Adds the Source track: SLSA source levels, SCS and organization requirements, source provenance and Source VSAs. RC1 to the final release reorganized the levels so that L2 is history and provenance and L3 is continuous technical controls.
- Updates the threat model for Source track threats, and restructures the spec for multiple tracks: Build Track Basics, Build Requirements and Build Provenance replace Levels, Requirements and Provenance, and Assessing Build Platforms replaces Verifying Systems.
- Adds Verified Properties: `SLSA_SOURCE_TWO_PARTY_REVIEWED` and `SLSA_BUILD_REPRODUCED`.
- VSA 1.2: the `SlsaResult` definition covers new tracks and links to Verified Properties. The text now refers to `verificationResult`, where it had a `slsaResult` typo (Verification Summary, Change history).
- Provenance v1.2: an editorial note separating the provenance model diagram from the general build model (Build: Provenance, Change history). No field changes.

### SLSA v1.1

From SLSA v1.1 What's new:

- Attestation format schemas are informative; the SLSA and in-toto texts are canonical.
- VSA: adds the verification procedure and optional `verifier.version`, and RECOMMENDS `policy.digest`. `timeVerified` becomes optional (Verification Summary, Change history 1.1).
- Refines the threat model.

### SLSA v1.0

From SLSA v1.0 What's new:

- First stable release. It splits levels into tracks and defines only the Build track L0–L3, roughly v0.1 levels 1–3 without source requirements. It defers source requirements, hermetic builds (L4) and common requirements.
- Adds Distributing Provenance, Verifying Artifacts and Verifying Build Platforms.
- Swaps threat labels D and E relative to v0.1. In v1.2, D is external build parameters and E is the build process.
- Adopts semantic versioning: incompatible changes bump the major version, compatible changes the minor (Specification Stages, Versioning).
- Provenance v1 replaces v0.2, and VSA v1 replaces v0.2: lowerCamelCase, `resolvedDependencies` instead of `materials`, a relaxed `SlsaResult`, and a new `slsaVersion`.

### SLSA v0.1

A single ladder SLSA 1–4 combining source, build, provenance and common requirements; SLSA 4 required two-person review and hermetic, reproducible builds (v0.1 Security levels). It used provenance v0.1, later v0.2.

## Upgrading

### SLSA v1.1 (or v1.0) to SLSA v1.2

1. Change the version marker: claim levels as `(v1.2)` and set VSA `slsaVersion` to `1.2`. `predicateType` stays `https://slsa.dev/provenance/v1` and `https://slsa.dev/verification_summary/v1`.
2. Replace removed or renamed items:
   - Update links from `levels`, `requirements`, `provenance` and `verifying-systems` to `build-track-basics`, `build-requirements`, `build-provenance` and `assessing-build-platforms`.
   - VSA producers: put at most one level per track in `verifiedLevels`, using `SLSA_<TRACK>_LEVEL_<N>`. From v1.0, also set `policy.digest`, add `verifier.version` if useful, and treat `timeVerified` as optional.
3. Validate against the target. Build platforms need no change for the same Build level. Optionally adopt the Source track: pick an SCS that can reach the target level and issue Source VSAs.
4. Keep behaviour unchanged: existing provenance stays valid as Provenance v1.

### SLSA Provenance v0.2 to SLSA Provenance v1

1. Change the version marker: `predicateType` becomes `https://slsa.dev/provenance/v1` and the Statement `_type` becomes `https://in-toto.io/Statement/v1`.
2. Replace removed or renamed fields with the mapping in [`provenance.md`](provenance.md#migrating-from-v02):
   - `invocation.parameters` plus `configSource` become `externalParameters` and a `resolvedDependencies` entry.
   - `environment` becomes `internalParameters`, and `materials` becomes `resolvedDependencies`.
   - Metadata fields are renamed; `completeness` and `reproducible` are dropped.
   - `buildConfig` is moved or dropped.
3. Update the `buildType` to a version that explains the new inputs, and validate against the v1 field rules.
4. Keep behaviour unchanged: verifier expectations on source, entry point and parameters must still match the same builds. Rewrite each policy rule on `invocation.configSource` to target `externalParameters`.

### SLSA Provenance v0.1 to SLSA Provenance v1

Apply the v0.1 to v0.2 changes first: `recipe` becomes `invocation`, `invocation.type` moves to top-level `buildType`, `arguments` becomes `parameters`, and `definedInMaterial` and `entryPoint` become `configSource` (Build: Provenance, Change history v0.2). Then follow the v0.2 to v1 steps.

### SLSA VSA v0.2 (or v0.1) to SLSA VSA v1

1. Change the version marker: `predicateType` becomes `https://slsa.dev/verification_summary/v1` and the Statement `_type` becomes `https://in-toto.io/Statement/v1`.
2. Rename snake_case fields to lowerCamelCase, for example `resource_uri` to `resourceUri` and `input_attestations` to `inputAttestations`, and use `resolvedDependencies` terminology instead of `materials` (VSA Change history 1.0). v0.1 has neither field, so add `resourceUri`.
3. Add `slsaVersion`, `verifier.version` and `policy.digest`, and use `SlsaResult` values.
4. Keep behaviour unchanged: consumers that checked `resource_uri` now check `resourceUri` against the same expected value.

### SLSA v0.1 levels to SLSA v1.2

1. Change the version marker: re-express "SLSA 1–3" as Build L1–L3 and, where source controls exist, as Source levels. SLSA 4 has no Build equivalent; hermetic builds are a future direction.
2. Replace removed requirements: v0.1 producer requirements such as scripted builds were removed in v1.0 (Build Requirements, Producer). Source requirements now live in the Source track.
3. Validate against the v1.2 Build and Source requirements, then upgrade provenance as above.
4. Keep behaviour unchanged: a v0.1 claim does not carry over automatically; re-assess against v1.2.

## Preview: SLSA working draft

The working draft is built from `main` of `slsa-framework/slsa` and published at https://slsa.dev/spec/draft/ with Status: Draft, which is not suitable for reference or for implementation beyond experimentation (Specification Stages, Draft). Posture: **track**. As of `main` at 82b296d (2026-09-29) it adds:

- a **Build Environment track** (BuildEnv L0–L3): signed build image provenance, attested build environment instantiation, and a hardware-attested build environment;
- a **Dependency track** (Dep L0–L3: Inventoried, Controlled, Screened) for organizations that ingest third-party dependencies, with a Dependency Ingestion Provenance predicate `https://slsa.dev/dependency/v1` and a mapping to OpenSSF S2C2F.

Its What's new page still describes changes relative to v1.1. Claim no BuildEnv or Dep levels, emit no draft predicate, and watch the draft's tracks pages for a release candidate. When it ships as v1.3 or later: make it current, make v1.2 legacy if the site marks it Retired (otherwise supported), add a family for any new predicate, and add an upgrade section.
